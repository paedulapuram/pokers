"use strict";

const ROLE_PERMISSIONS = Object.freeze({
  guest: Object.freeze({
    label: "Guest",
    actorRole: "player",
    permissions: Object.freeze([
      "practice_with_bots",
      "choose_practice_visibility",
      "play_hand",
      "advance_practice_table",
      "update_guest_profile",
    ]),
  }),
  player: Object.freeze({
    label: "Player",
    actorRole: "player",
    permissions: Object.freeze([
      "join_cash_table",
      "join_tournament",
      "claim_seat",
      "play_hand",
      "view_rankings",
      "update_profile",
    ]),
  }),
  host: Object.freeze({
    label: "Host",
    actorRole: "spectator",
    permissions: Object.freeze([
      "create_cash_table",
      "create_tournament",
      "view_table",
      "view_own_tables",
      "close_own_table",
      "advance_own_table",
    ]),
  }),
  admin: Object.freeze({
    label: "Admin",
    actorRole: "spectator",
    permissions: Object.freeze([
      "view_table",
      "manage_users",
      "view_diagnostics",
    ]),
  }),
});

const ACCOUNT_ROLES = Object.freeze(["host", "player", "admin"]);
const SESSION_ROLES = Object.freeze(["guest", ...ACCOUNT_ROLES]);

function normalizeRole(role, fallback = "player") {
  const normalized = String(role || fallback).trim().toLowerCase();
  return SESSION_ROLES.includes(normalized) ? normalized : fallback;
}

function getRoleDetails(role) {
  return ROLE_PERMISSIONS[normalizeRole(role)] || ROLE_PERMISSIONS.player;
}

function hasPermission(role, permission) {
  return getRoleDetails(role).permissions.includes(permission);
}

module.exports = {
  ACCOUNT_ROLES,
  ROLE_PERMISSIONS,
  SESSION_ROLES,
  getRoleDetails,
  hasPermission,
  normalizeRole,
};
