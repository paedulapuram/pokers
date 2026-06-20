"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const { randomBytes, randomUUID, scrypt, timingSafeEqual } = require("node:crypto");
const { promisify } = require("node:util");
const { ACCOUNT_ROLES } = require("./rolePermissions");

const scryptAsync = promisify(scrypt);
const PASSWORD_KEY_LENGTH = 64;
const RESERVED_ACCOUNTS = [
  { userId: "host", playerName: "Host", password: "Host", role: "host", reservedRole: "host" },
  { userId: "admin", playerName: "Admin", password: "Admin", role: "admin", reservedRole: "admin" },
];
const ACCOUNT_ROLE_SET = new Set(ACCOUNT_ROLES);

class UserStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.writeQueue = Promise.resolve();
  }

  async createUser(input = {}) {
    const userId = normalizeUserId(input.userId);
    const playerName = normalizePlayerName(input.playerName);
    const role = normalizeAccountRole(input.role);
    const password = validatePassword(input.password, role, userId);

    return this.enqueueWrite(async () => {
      const data = await this.readData();
      if (data.users.some((user) => user.userId === userId)) {
        throw createUserStoreError(409, "That user ID is already registered.");
      }

      const passwordSalt = randomBytes(16).toString("hex");
      const passwordHash = await hashPassword(password, passwordSalt);
      const user = {
        id: randomUUID(),
        userId,
        playerName,
        role,
        reservedRole: getReservedSignupRole(role, userId),
        active: true,
        profileImage: normalizeProfileImage(input.profileImage),
        passwordAlgorithm: "scrypt",
        passwordSalt,
        passwordHash,
        createdAt: new Date().toISOString(),
      };

      data.users.push(user);
      await this.writeData(data);
      return toPublicUser(user);
    });
  }

  async authenticate(userIdInput, passwordInput) {
    const userId = normalizeUserId(userIdInput);
    const password = String(passwordInput || "");
    const data = await this.readData();
    const user = data.users.find((candidate) => candidate.userId === userId);

    if (!user || !(await passwordMatches(password, user))) {
      throw createUserStoreError(401, "User ID or password is incorrect.");
    }
    if (!isUserActive(user)) {
      throw createUserStoreError(403, "This account is inactive. Contact the Admin.");
    }

    return toPublicUser(user);
  }

  async updateProfile(userId, input = {}) {
    const playerName = normalizePlayerName(input.playerName);
    const profileImage = normalizeProfileImage(input.profileImage);

    return this.enqueueWrite(async () => {
      const data = await this.readData();
      const user = data.users.find((candidate) => candidate.id === String(userId));
      if (!user) {
        throw createUserStoreError(404, "Registered user was not found.");
      }

      user.playerName = playerName;
      user.profileImage = profileImage;
      user.updatedAt = new Date().toISOString();
      await this.writeData(data);
      return toPublicUser(user);
    });
  }

  async ensureReservedAccounts() {
    return this.enqueueWrite(async () => {
      const data = await this.readData();
      let changed = false;

      for (const reserved of RESERVED_ACCOUNTS) {
        let user = data.users.find((candidate) => candidate.userId === reserved.userId);
        if (!user) {
          user = {
            id: randomUUID(),
            userId: reserved.userId,
            playerName: reserved.playerName,
            role: reserved.role,
            reservedRole: reserved.reservedRole,
            active: true,
            createdAt: new Date().toISOString(),
          };
          data.users.push(user);
          changed = true;
        }

        const passwordIsCorrect = await passwordMatches(reserved.password, user);
        if (
          user.role !== reserved.role ||
          user.reservedRole !== reserved.reservedRole ||
          (reserved.userId === "admin" && !isUserActive(user)) ||
          !passwordIsCorrect
        ) {
          const passwordSalt = randomBytes(16).toString("hex");
          user.role = reserved.role;
          user.reservedRole = reserved.reservedRole;
          user.active = true;
          user.passwordAlgorithm = "scrypt";
          user.passwordSalt = passwordSalt;
          user.passwordHash = await hashPassword(reserved.password, passwordSalt);
          changed = true;
        }
      }

      if (changed) {
        await this.writeData(data);
      }
      return this.listPublicUsers(data.users);
    });
  }

  async listUsers() {
    const data = await this.readData();
    return this.listPublicUsers(data.users);
  }

  async setUsersActive(userIdsInput, activeInput) {
    const userIds = [...new Set(Array.isArray(userIdsInput) ? userIdsInput.map(String) : [])];
    if (typeof activeInput !== "boolean") {
      throw createUserStoreError(400, "Active status must be true or false.");
    }
    const active = activeInput;
    if (!userIds.length) {
      throw createUserStoreError(400, "Select at least one registered user.");
    }

    return this.enqueueWrite(async () => {
      const data = await this.readData();
      const users = userIds.map((id) => data.users.find((user) => user.id === id));
      if (users.some((user) => !user)) {
        throw createUserStoreError(404, "One or more registered users were not found.");
      }
      if (!active && users.some((user) => isReservedAccount(user, "admin"))) {
        throw createUserStoreError(403, "The reserved Admin account cannot be deactivated.");
      }

      for (const user of users) {
        user.active = active;
        user.updatedAt = new Date().toISOString();
      }
      await this.writeData(data);
      return this.listPublicUsers(data.users);
    });
  }

  listPublicUsers(users) {
    return users
      .map(toPublicUser)
      .sort((a, b) => {
        const priority = { admin: 0, host: 1, player: 2 };
        return priority[a.role] - priority[b.role] || a.playerName.localeCompare(b.playerName);
      });
  }

  async readData() {
    try {
      const raw = await fs.readFile(this.filePath, "utf8");
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.users)) {
        throw new Error("User file must contain a users array.");
      }
      return parsed;
    } catch (error) {
      if (error.code === "ENOENT") {
        return { version: 1, users: [] };
      }
      throw error;
    }
  }

  enqueueWrite(operation) {
    const result = this.writeQueue.then(operation, operation);
    this.writeQueue = result.catch(() => {});
    return result;
  }

  async writeData(data) {
    const directory = path.dirname(this.filePath);
    const temporaryPath = `${this.filePath}.${process.pid}.${randomUUID()}.tmp`;
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(temporaryPath, `${JSON.stringify(data, null, 2)}\n`, {
      encoding: "utf8",
      mode: 0o600,
    });
    await fs.rename(temporaryPath, this.filePath);
    await fs.chmod(this.filePath, 0o600);
  }
}

function normalizeUserId(value) {
  const userId = String(value || "").trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9_-]{2,23}$/.test(userId)) {
    throw createUserStoreError(
      400,
      "User ID must be 3-24 characters using letters, numbers, underscores, or hyphens.",
    );
  }
  return userId;
}

function normalizePlayerName(value) {
  const playerName = String(value || "").trim().replace(/\s+/g, " ").slice(0, 24);
  if (playerName.length < 2) {
    throw createUserStoreError(400, "Display name must be at least 2 characters.");
  }
  return playerName;
}

function normalizeAccountRole(value) {
  const role = String(value || "player").trim().toLowerCase();
  if (!ACCOUNT_ROLE_SET.has(role)) {
    throw createUserStoreError(400, "Choose Host, Player, or Admin for a saved account.");
  }
  return role;
}

function validatePassword(value, role, userId) {
  const password = String(value || "");
  if (role === "host" || role === "admin") {
    const reserved = RESERVED_ACCOUNTS.find((account) => account.role === role);
    if (!reserved || userId !== reserved.userId || password !== reserved.password) {
      throw createUserStoreError(
        403,
        `${reserved.playerName} registration requires the user ID "${reserved.playerName}" and password "${reserved.password}".`,
      );
    }
    return password;
  }

  if (password.length < 8 || password.length > 128) {
    throw createUserStoreError(400, "Password must be between 8 and 128 characters.");
  }
  return password;
}

async function hashPassword(password, salt) {
  const derivedKey = await scryptAsync(password, salt, PASSWORD_KEY_LENGTH);
  return Buffer.from(derivedKey).toString("hex");
}

async function passwordMatches(password, user) {
  if (
    user.passwordAlgorithm !== "scrypt" ||
    typeof user.passwordSalt !== "string" ||
    typeof user.passwordHash !== "string"
  ) {
    return false;
  }

  const candidate = Buffer.from(await hashPassword(password, user.passwordSalt), "hex");
  const expected = Buffer.from(user.passwordHash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

function toPublicUser(user) {
  return {
    id: user.id,
    userId: user.userId,
    playerName: user.playerName,
    role: normalizeStoredRole(user.role),
    active: isUserActive(user),
    reservedRole: getReservedAccountRole(user),
    protected: isReservedAccount(user, "admin"),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt || null,
    profileImage: normalizeProfileImage(user.profileImage),
  };
}

function normalizeProfileImage(value) {
  const profileImage = String(value || "");
  if (!profileImage) return null;
  if (
    profileImage.length > 400_000 ||
    !/^data:image\/(?:jpeg|png|webp);base64,[a-z0-9+/=]+$/i.test(profileImage)
  ) {
    throw createUserStoreError(400, "Profile photo must be a valid JPG, PNG, or WebP image.");
  }
  return profileImage;
}

function isUserActive(user) {
  return user.active !== false;
}

function normalizeStoredRole(role) {
  return ACCOUNT_ROLE_SET.has(role) ? role : "player";
}

function getReservedSignupRole(role, userId) {
  const reserved = RESERVED_ACCOUNTS.find(
    (account) => account.role === role && account.userId === userId,
  );
  return reserved?.reservedRole || null;
}

function getReservedAccountRole(user) {
  if (user.reservedRole) {
    const reserved = RESERVED_ACCOUNTS.find(
      (account) => account.reservedRole === user.reservedRole && account.userId === user.userId,
    );
    return reserved ? reserved.reservedRole : null;
  }
  const reserved = RESERVED_ACCOUNTS.find(
    (account) => account.userId === user.userId && account.role === normalizeStoredRole(user.role),
  );
  return reserved?.reservedRole || null;
}

function isReservedAccount(user, reservedRole) {
  return getReservedAccountRole(user) === reservedRole;
}

function createUserStoreError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

module.exports = {
  UserStore,
  normalizeAccountRole,
  normalizeUserId,
};
