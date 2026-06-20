"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const {
  ROLE_PERMISSIONS,
  hasPermission,
  normalizeRole,
} = require("../src/rolePermissions");

test("role permissions keep Host and Admin view-only at player seats", () => {
  assert.equal(ROLE_PERMISSIONS.host.actorRole, "spectator");
  assert.equal(ROLE_PERMISSIONS.admin.actorRole, "spectator");
  assert.equal(hasPermission("host", "create_tournament"), true);
  assert.equal(hasPermission("host", "advance_own_table"), true);
  assert.equal(hasPermission("host", "claim_seat"), false);
  assert.equal(hasPermission("admin", "manage_users"), true);
  assert.equal(hasPermission("admin", "claim_seat"), false);
});

test("Player and Guest permissions preserve gameplay access", () => {
  assert.equal(hasPermission("player", "join_tournament"), true);
  assert.equal(hasPermission("player", "claim_seat"), true);
  assert.equal(hasPermission("guest", "practice_with_bots"), true);
  assert.equal(hasPermission("guest", "choose_practice_visibility"), true);
  assert.equal(hasPermission("guest", "advance_practice_table"), true);
  assert.equal(hasPermission("guest", "join_cash_table"), false);
});

test("unknown roles normalize to Player by default", () => {
  assert.equal(normalizeRole("unknown"), "player");
  assert.equal(hasPermission("unknown", "claim_seat"), true);
});
