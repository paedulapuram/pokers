"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");

const { UserStore } = require("../src/userStore");

test("UserStore persists a hashed password and authenticates the user", async (t) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "poker-users-"));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const filePath = path.join(directory, "users.json");
  const store = new UserStore(filePath);

  const created = await store.createUser({
    userId: "Test_Player",
    playerName: "Test Player",
    password: "correct-horse",
    role: "player",
  });
  const stored = JSON.parse(await fs.readFile(filePath, "utf8"));
  const signedIn = await store.authenticate("test_player", "correct-horse");

  assert.equal(created.userId, "test_player");
  assert.equal(signedIn.id, created.id);
  assert.equal(stored.users[0].userId, "test_player");
  assert.equal(stored.users[0].role, "player");
  assert.equal(signedIn.role, "player");
  assert.equal(signedIn.active, true);
  assert.equal(stored.users[0].password, undefined);
  assert.notEqual(stored.users[0].passwordHash, "correct-horse");
  assert.equal(stored.users[0].passwordAlgorithm, "scrypt");
});

test("UserStore persists an optional profile photo with the public user", async (t) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "poker-users-"));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const filePath = path.join(directory, "users.json");
  const store = new UserStore(filePath);
  const profileImage = "data:image/jpeg;base64,aGVsbG8=";

  const created = await store.createUser({
    userId: "photo_player",
    playerName: "Photo Player",
    password: "correct-horse",
    role: "player",
    profileImage,
  });
  const signedIn = await store.authenticate("photo_player", "correct-horse");

  assert.equal(created.profileImage, profileImage);
  assert.equal(signedIn.profileImage, profileImage);
});

test("UserStore updates a registered display name and profile photo", async (t) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "poker-users-"));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const store = new UserStore(path.join(directory, "users.json"));
  const created = await store.createUser({
    userId: "editable_player",
    playerName: "Before Name",
    password: "correct-horse",
    role: "player",
  });
  const profileImage = "data:image/png;base64,aGVsbG8=";

  const updated = await store.updateProfile(created.id, {
    playerName: "After Name",
    profileImage,
  });
  const signedIn = await store.authenticate("editable_player", "correct-horse");

  assert.equal(updated.playerName, "After Name");
  assert.equal(signedIn.playerName, "After Name");
  assert.equal(signedIn.profileImage, profileImage);
});

test("UserStore rejects duplicate IDs and incorrect passwords", async (t) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "poker-users-"));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const store = new UserStore(path.join(directory, "users.json"));
  const input = {
    userId: "alex_01",
    playerName: "Alex",
    password: "very-secret",
    role: "player",
  };

  await store.createUser(input);

  await assert.rejects(
    store.createUser(input),
    (error) => error.status === 409 && /already registered/.test(error.message),
  );
  await assert.rejects(
    store.authenticate(input.userId, "wrong-password"),
    (error) => error.status === 401 && /incorrect/.test(error.message),
  );
});

test("UserStore reserves Host signup for the exact Host credentials", async (t) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "poker-users-"));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const store = new UserStore(path.join(directory, "users.json"));

  await assert.rejects(
    store.createUser({
      userId: "another-host",
      playerName: "Another Host",
      password: "Host",
      role: "host",
    }),
    (error) => error.status === 403 && /Host registration/.test(error.message),
  );

  const host = await store.createUser({
    userId: "Host",
    playerName: "Host",
    password: "Host",
    role: "host",
  });
  const signedIn = await store.authenticate("Host", "Host");

  assert.equal(host.userId, "host");
  assert.equal(host.role, "host");
  assert.equal(host.reservedRole, "host");
  assert.equal(signedIn.role, "host");
});

test("UserStore provisions reserved accounts and protects Admin status", async (t) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "poker-users-"));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const store = new UserStore(path.join(directory, "users.json"));

  const users = await store.ensureReservedAccounts();
  const host = users.find((user) => user.userId === "host");
  const admin = users.find((user) => user.userId === "admin");

  assert.equal(host.role, "host");
  assert.equal(admin.role, "admin");
  assert.equal(host.reservedRole, "host");
  assert.equal(admin.reservedRole, "admin");
  assert.equal(admin.protected, true);
  assert.equal((await store.authenticate("Admin", "Admin")).role, "admin");
  await assert.rejects(
    store.setUsersActive([admin.id], false),
    (error) => error.status === 403 && /cannot be deactivated/.test(error.message),
  );
});

test("UserStore keeps role separate from reserved system identity", async (t) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "poker-users-"));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const filePath = path.join(directory, "users.json");
  await fs.writeFile(
    filePath,
    JSON.stringify(
      {
        version: 1,
        users: [
          {
            id: "floor-admin-id",
            userId: "floor_admin",
            playerName: "Floor Admin",
            role: "admin",
            active: true,
            createdAt: "2026-01-01T00:00:00.000Z",
          },
        ],
      },
      null,
      2,
    ),
  );
  const store = new UserStore(filePath);

  let users = await store.listUsers();
  const floorAdmin = users.find((user) => user.userId === "floor_admin");
  assert.equal(floorAdmin.role, "admin");
  assert.equal(floorAdmin.reservedRole, null);
  assert.equal(floorAdmin.protected, false);

  users = await store.setUsersActive([floorAdmin.id], false);
  const inactiveFloorAdmin = users.find((user) => user.id === floorAdmin.id);
  assert.equal(inactiveFloorAdmin.active, false);
});

test("UserStore blocks inactive accounts until Admin reactivates them", async (t) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "poker-users-"));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const store = new UserStore(path.join(directory, "users.json"));
  const player = await store.createUser({
    userId: "inactive_player",
    playerName: "Inactive Player",
    password: "player-password",
    role: "player",
  });

  let users = await store.setUsersActive([player.id], false);
  assert.equal(users.find((user) => user.id === player.id).active, false);
  await assert.rejects(
    store.authenticate("inactive_player", "player-password"),
    (error) => error.status === 403 && /inactive/.test(error.message),
  );

  users = await store.setUsersActive([player.id], true);
  assert.equal(users.find((user) => user.id === player.id).active, true);
  assert.equal((await store.authenticate("inactive_player", "player-password")).active, true);
});
