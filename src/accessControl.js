"use strict";

const { hasPermission } = require("./rolePermissions");

function canCreateTable(session, gameType) {
  return hasPermission(
    session?.role,
    gameType === "tournament" ? "create_tournament" : "create_cash_table",
  );
}

function canUseRoomAccess(session, table) {
  if (!session || !table) return false;
  if (hasPermission(session.role, "view_table")) return true;
  return table.config?.gameType === "tournament"
    ? hasPermission(session.role, "join_tournament")
    : hasPermission(session.role, "join_cash_table");
}

function canClaimSeat(session, table) {
  if (!session || !table || !hasPermission(session.role, "claim_seat")) return false;
  return table.config?.gameType === "tournament"
    ? hasPermission(session.role, "join_tournament")
    : hasPermission(session.role, "join_cash_table");
}

function isViewOnlyRole(session) {
  return hasPermission(session?.role, "view_table") && !hasPermission(session?.role, "claim_seat");
}

function canCloseOwnTable(session, table) {
  return ownsTable(session, table) && hasPermission(session.role, "close_own_table");
}

function canAdvanceTable(session, table) {
  if (!ownsTable(session, table)) return false;
  return (
    hasPermission(session.role, "advance_own_table") ||
    hasPermission(session.role, "advance_practice_table")
  );
}

function canPerformPlayerAction(session, table) {
  return (
    Boolean(session && table) &&
    hasPermission(session.role, "play_hand") &&
    table.players.some((player) => player.id === session.playerId)
  );
}

function ownsTable(session, table) {
  return Boolean(session?.playerId && table?.hostPlayerId === session.playerId);
}

module.exports = {
  canAdvanceTable,
  canClaimSeat,
  canCloseOwnTable,
  canCreateTable,
  canPerformPlayerAction,
  canUseRoomAccess,
  isViewOnlyRole,
  ownsTable,
};
