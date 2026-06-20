"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { SESSION_SCHEMA_VERSION, buildPublicSession } = require("../src/sessionModel");

test("buildPublicSession exposes normalized identity, account, profile, role, and stats", () => {
  const session = buildPublicSession(
    {
      token: "token-1",
      playerId: "player-1",
      playerName: "Prashu",
      accountType: "account",
      userId: "prashu",
      role: "player",
      active: true,
      reservedRole: null,
      profileImage: "data:image/png;base64,aGVsbG8=",
    },
    { handsPlayed: 7, handsWon: 2 },
  );

  assert.equal(session.schemaVersion, SESSION_SCHEMA_VERSION);
  assert.equal(session.identity.playerId, "player-1");
  assert.equal(session.identity.displayName, "Prashu");
  assert.equal(session.identity.userId, "prashu");
  assert.deepEqual(session.account, {
    type: "account",
    userId: "prashu",
    active: true,
    reservedRole: null,
  });
  assert.equal(session.profile.displayName, "Prashu");
  assert.equal(session.profile.image, "data:image/png;base64,aGVsbG8=");
  assert.equal(session.roleDetails.label, "Player");
  assert.equal(session.permissions.includes("claim_seat"), true);
  assert.deepEqual(session.stats, { handsPlayed: 7, handsWon: 2 });
});

test("buildPublicSession keeps guest sessions active and permissioned for practice", () => {
  const session = buildPublicSession({
    token: "guest-token",
    playerId: "guest-1",
    playerName: "Guest One",
    accountType: "guest",
    role: "guest",
  });

  assert.equal(session.account.type, "guest");
  assert.equal(session.account.active, true);
  assert.equal(session.account.userId, null);
  assert.equal(session.profile.image, null);
  assert.equal(session.permissions.includes("practice_with_bots"), true);
  assert.deepEqual(session.stats, { handsPlayed: 0, handsWon: 0 });
});
