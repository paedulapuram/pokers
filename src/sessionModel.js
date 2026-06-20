"use strict";

const { getRoleDetails } = require("./rolePermissions");

const SESSION_SCHEMA_VERSION = 2;

function buildPublicSession(session, stats = {}) {
  const role = session.role || (session.accountType === "guest" ? "guest" : "player");
  const roleDetails = getRoleDetails(role);
  const profileImage = session.profileImage || null;
  const playerName = session.playerName || session.displayName || "Player";
  const accountType = session.accountType === "account" ? "account" : "guest";

  return {
    ...session,
    schemaVersion: SESSION_SCHEMA_VERSION,
    playerName,
    role,
    roleDetails,
    permissions: [...roleDetails.permissions],
    profileImage,
    identity: {
      playerId: session.playerId,
      displayName: playerName,
      userId: session.userId || null,
    },
    account: {
      type: accountType,
      userId: session.userId || null,
      active: session.active !== false,
      reservedRole: session.reservedRole || null,
    },
    profile: {
      displayName: playerName,
      image: profileImage,
    },
    stats: {
      handsPlayed: Number(stats.handsPlayed || 0),
      handsWon: Number(stats.handsWon || 0),
    },
  };
}

module.exports = {
  SESSION_SCHEMA_VERSION,
  buildPublicSession,
};
