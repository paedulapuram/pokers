"use strict";

const { randomBytes, randomUUID } = require("node:crypto");
const { Pool } = require("pg");
const {
  RESERVED_ACCOUNTS,
  createUserStoreError,
  hashPassword,
  isReservedAccount,
  isUserActive,
  normalizeAccountRole,
  normalizePlayerName,
  normalizeProfileImage,
  normalizeUserId,
  passwordMatches,
  toPublicUser,
  validatePassword,
} = require("./userStore");

class PostgresUserStore {
  constructor(connectionString, options = {}) {
    if (!connectionString) {
      throw new Error("PostgresUserStore requires DATABASE_URL.");
    }
    this.pool =
      options.pool ||
      new Pool({
        connectionString,
        ssl: shouldUseSsl(connectionString)
          ? { rejectUnauthorized: false }
          : false,
      });
  }

  async init() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS poker_users (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL UNIQUE,
        player_name TEXT NOT NULL,
        role TEXT NOT NULL,
        reserved_role TEXT,
        active BOOLEAN NOT NULL DEFAULT TRUE,
        profile_image TEXT,
        password_algorithm TEXT NOT NULL,
        password_salt TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ
      );
    `);
  }

  async healthCheck() {
    await this.pool.query("SELECT 1");
    return { storage: "postgres" };
  }

  async createUser(input = {}) {
    const userId = normalizeUserId(input.userId);
    const playerName = normalizePlayerName(input.playerName);
    const role = normalizeAccountRole(input.role);
    const password = validatePassword(input.password, role, userId);
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
      updatedAt: null,
    };

    try {
      const result = await this.pool.query(
        `
          INSERT INTO poker_users (
            id, user_id, player_name, role, reserved_role, active, profile_image,
            password_algorithm, password_salt, password_hash, created_at, updated_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING *
        `,
        [
          user.id,
          user.userId,
          user.playerName,
          user.role,
          user.reservedRole,
          user.active,
          user.profileImage,
          user.passwordAlgorithm,
          user.passwordSalt,
          user.passwordHash,
          user.createdAt,
          user.updatedAt,
        ],
      );
      return toPublicUser(fromRow(result.rows[0]));
    } catch (error) {
      if (error.code === "23505") {
        throw createUserStoreError(409, "That user ID is already registered.");
      }
      throw error;
    }
  }

  async authenticate(userIdInput, passwordInput) {
    const userId = normalizeUserId(userIdInput);
    const password = String(passwordInput || "");
    const user = await this.findByUserId(userId);

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
    const result = await this.pool.query(
      `
        UPDATE poker_users
        SET player_name = $2,
            profile_image = $3,
            updated_at = NOW()
        WHERE id = $1
        RETURNING *
      `,
      [String(userId), playerName, profileImage],
    );
    if (!result.rows.length) {
      throw createUserStoreError(404, "Registered user was not found.");
    }
    return toPublicUser(fromRow(result.rows[0]));
  }

  async ensureReservedAccounts() {
    for (const reserved of RESERVED_ACCOUNTS) {
      let user = await this.findByUserId(reserved.userId);
      if (!user) {
        const passwordSalt = randomBytes(16).toString("hex");
        const passwordHash = await hashPassword(reserved.password, passwordSalt);
        await this.pool.query(
          `
            INSERT INTO poker_users (
              id, user_id, player_name, role, reserved_role, active,
              password_algorithm, password_salt, password_hash, created_at
            )
            VALUES ($1, $2, $3, $4, $5, TRUE, 'scrypt', $6, $7, NOW())
          `,
          [
            randomUUID(),
            reserved.userId,
            reserved.playerName,
            reserved.role,
            reserved.reservedRole,
            passwordSalt,
            passwordHash,
          ],
        );
        continue;
      }

      const passwordIsCorrect = await passwordMatches(reserved.password, user);
      if (
        user.role !== reserved.role ||
        user.reservedRole !== reserved.reservedRole ||
        (reserved.userId === "admin" && !isUserActive(user)) ||
        !passwordIsCorrect
      ) {
        const passwordSalt = randomBytes(16).toString("hex");
        const passwordHash = await hashPassword(reserved.password, passwordSalt);
        await this.pool.query(
          `
            UPDATE poker_users
            SET role = $2,
                reserved_role = $3,
                active = TRUE,
                password_algorithm = 'scrypt',
                password_salt = $4,
                password_hash = $5,
                updated_at = NOW()
            WHERE id = $1
          `,
          [user.id, reserved.role, reserved.reservedRole, passwordSalt, passwordHash],
        );
      }
    }

    return this.listUsers();
  }

  async listUsers() {
    const result = await this.pool.query("SELECT * FROM poker_users");
    return this.listPublicUsers(result.rows.map(fromRow));
  }

  async setUsersActive(userIdsInput, activeInput) {
    const userIds = [...new Set(Array.isArray(userIdsInput) ? userIdsInput.map(String) : [])];
    if (typeof activeInput !== "boolean") {
      throw createUserStoreError(400, "Active status must be true or false.");
    }
    if (!userIds.length) {
      throw createUserStoreError(400, "Select at least one registered user.");
    }

    const users = await this.findByIds(userIds);
    if (users.length !== userIds.length) {
      throw createUserStoreError(404, "One or more registered users were not found.");
    }
    if (!activeInput && users.some((user) => isReservedAccount(user, "admin"))) {
      throw createUserStoreError(403, "The reserved Admin account cannot be deactivated.");
    }

    await this.pool.query(
      "UPDATE poker_users SET active = $2, updated_at = NOW() WHERE id = ANY($1::text[])",
      [userIds, activeInput],
    );
    return this.listUsers();
  }

  listPublicUsers(users) {
    return users
      .map(toPublicUser)
      .sort((a, b) => {
        const priority = { admin: 0, host: 1, player: 2 };
        return priority[a.role] - priority[b.role] || a.playerName.localeCompare(b.playerName);
      });
  }

  async findByUserId(userId) {
    const result = await this.pool.query("SELECT * FROM poker_users WHERE user_id = $1", [userId]);
    return result.rows[0] ? fromRow(result.rows[0]) : null;
  }

  async findByIds(userIds) {
    const result = await this.pool.query("SELECT * FROM poker_users WHERE id = ANY($1::text[])", [
      userIds,
    ]);
    return result.rows.map(fromRow);
  }
}

function getReservedSignupRole(role, userId) {
  const reserved = RESERVED_ACCOUNTS.find(
    (account) => account.role === role && account.userId === userId,
  );
  return reserved?.reservedRole || null;
}

function fromRow(row) {
  return {
    id: row.id,
    userId: row.user_id,
    playerName: row.player_name,
    role: row.role,
    reservedRole: row.reserved_role,
    active: row.active,
    profileImage: row.profile_image,
    passwordAlgorithm: row.password_algorithm,
    passwordSalt: row.password_salt,
    passwordHash: row.password_hash,
    createdAt: toIsoString(row.created_at),
    updatedAt: toIsoString(row.updated_at),
  };
}

function toIsoString(value) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function shouldUseSsl(connectionString) {
  if (process.env.PGSSLMODE === "disable") return false;
  if (process.env.PGSSLMODE === "require") return true;
  return /^postgres(?:ql)?:\/\//.test(connectionString) && !/localhost|127\.0\.0\.1/.test(connectionString);
}

module.exports = {
  PostgresUserStore,
};
