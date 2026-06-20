"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const {
  canAdvanceTable,
  canClaimSeat,
  canCloseOwnTable,
  canCreateTable,
  canPerformPlayerAction,
  canUseRoomAccess,
  isViewOnlyRole,
} = require("../src/accessControl");

function session(role, playerId = `${role}-id`) {
  return {
    role,
    playerId,
    accountType: role === "guest" ? "guest" : "account",
  };
}

function table(gameType = "cash", hostPlayerId = "host-id") {
  return {
    hostPlayerId,
    config: { gameType },
    players: [
      { id: "player-id", type: "human" },
      { id: "guest-id", type: "human" },
    ],
  };
}

test("table creation is limited to Host permissions by format", () => {
  assert.equal(canCreateTable(session("host"), "cash"), true);
  assert.equal(canCreateTable(session("host"), "tournament"), true);
  assert.equal(canCreateTable(session("player"), "cash"), false);
  assert.equal(canCreateTable(session("admin"), "tournament"), false);
  assert.equal(canCreateTable(session("guest"), "cash"), false);
});

test("room access distinguishes view-only roles from seat-capable players", () => {
  const cashTable = table("cash");
  const tournamentTable = table("tournament");

  assert.equal(canUseRoomAccess(session("host"), cashTable), true);
  assert.equal(canUseRoomAccess(session("admin"), tournamentTable), true);
  assert.equal(isViewOnlyRole(session("host")), true);
  assert.equal(isViewOnlyRole(session("admin")), true);

  assert.equal(canUseRoomAccess(session("player"), cashTable), true);
  assert.equal(canUseRoomAccess(session("player"), tournamentTable), true);
  assert.equal(canClaimSeat(session("player"), cashTable), true);
  assert.equal(canClaimSeat(session("player"), tournamentTable), true);

  assert.equal(canUseRoomAccess(session("guest"), cashTable), false);
  assert.equal(canClaimSeat(session("host"), cashTable), false);
  assert.equal(canClaimSeat(session("admin"), tournamentTable), false);
});

test("table close and advancement require ownership plus the right permission", () => {
  const hostOwnedTable = table("cash", "host-id");
  const guestPracticeTable = table("cash", "guest-id");

  assert.equal(canCloseOwnTable(session("host", "host-id"), hostOwnedTable), true);
  assert.equal(canCloseOwnTable(session("guest", "guest-id"), guestPracticeTable), false);
  assert.equal(canCloseOwnTable(session("admin", "admin-id"), hostOwnedTable), false);

  assert.equal(canAdvanceTable(session("host", "host-id"), hostOwnedTable), true);
  assert.equal(canAdvanceTable(session("guest", "guest-id"), guestPracticeTable), true);
  assert.equal(canAdvanceTable(session("player", "player-id"), hostOwnedTable), false);
});

test("player actions require both play permission and an occupied table seat", () => {
  const cashTable = table("cash");

  assert.equal(canPerformPlayerAction(session("player", "player-id"), cashTable), true);
  assert.equal(canPerformPlayerAction(session("guest", "guest-id"), cashTable), true);
  assert.equal(canPerformPlayerAction(session("host", "host-id"), cashTable), false);
  assert.equal(canPerformPlayerAction(session("admin", "admin-id"), cashTable), false);
  assert.equal(canPerformPlayerAction(session("player", "missing-player"), cashTable), false);
});
