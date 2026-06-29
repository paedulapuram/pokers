"use strict";

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

const {
  createPokerTable,
  joinPokerTable,
  performNextPokerBotAction,
  performPokerAction,
  serializePokerTable,
  startNextPokerHand,
  syncTournamentClock,
} = require("./src/pokerEngine");
const {
  canAdvanceTable,
  canClaimSeat,
  canCloseOwnTable,
  canCreateTable,
  canPerformPlayerAction,
  canUseRoomAccess,
  isViewOnlyRole,
} = require("./src/accessControl");
const { hasPermission } = require("./src/rolePermissions");
const { buildPublicSession } = require("./src/sessionModel");
const { UserStore } = require("./src/userStore");
const { PostgresUserStore } = require("./src/postgresUserStore");

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const APP_MOUNT = "/poker";
const DATABASE_URL = process.env.DATABASE_URL || "";
const USERS_FILE = process.env.POKER_USERS_FILE || path.join(__dirname, "data", "users.json");
const ROLE_TEST_PASSWORD = process.env.POKER_ROLE_PASSWORD || "poker-test";
const pokerTables = new Map();
const pokerSessions = new Map();
const tableIdsByRoomCode = new Map();
const tableIdsByRoomName = new Map();
const spectatorTableIdsByPlayer = new Map();
const playerStats = new Map();
const nextHandTimers = new Map();
const userStore = createUserStore();
const publicFiles = new Set([
  "index.html",
  "styles.css",
  "app.js",
  "assets/poker-aces-welcome.png",
]);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

async function handleAuthApi(req, res, url) {
  if (url.pathname === "/api/auth/signup" && req.method === "POST") {
    const body = await readJson(req);
    if (String(body.role || "").toLowerCase() === "guest") {
      const session = createPokerSession({
        playerName: body.playerName,
        accountType: "guest",
        role: "guest",
        profileImage: body.profileImage,
      });
      sendJson(res, 201, sessionWithStats(session));
      return;
    }

    const user = await userStore.createUser(body);
    const session = createPokerSession({
      playerId: user.id,
      playerName: user.playerName,
      accountType: "account",
      userId: user.userId,
      role: user.role,
      active: user.active,
      reservedRole: user.reservedRole,
      profileImage: user.profileImage,
    });
    sendJson(res, 201, sessionWithStats(session));
    return;
  }

  if (url.pathname === "/api/auth/signin" && req.method === "POST") {
    const body = await readJson(req);
    const user = await userStore.authenticate(body.userId, body.password);
    const session = createPokerSession({
      playerId: user.id,
      playerName: user.playerName,
      accountType: "account",
      userId: user.userId,
      role: user.role,
      active: user.active,
      reservedRole: user.reservedRole,
      profileImage: user.profileImage,
    });
    sendJson(res, 200, sessionWithStats(session));
    return;
  }

  if (url.pathname === "/api/auth/guest" && req.method === "POST") {
    const body = await readJson(req);
    const session = createPokerSession({
      playerName: body.playerName,
      accountType: "guest",
      role: "guest",
      profileImage: body.profileImage,
    });
    sendJson(res, 201, sessionWithStats(session));
    return;
  }

  if (url.pathname === "/api/auth/session" && req.method === "GET") {
    sendJson(res, 200, sessionWithStats(getPokerSession(req)));
    return;
  }

  if (url.pathname === "/api/auth/rankings" && req.method === "GET") {
    sendJson(res, 200, { rankings: getRankings() });
    return;
  }

  if (url.pathname === "/api/auth/profile" && req.method === "PATCH") {
    const session = getPokerSession(req);
    const body = await readJson(req);
    let playerName;
    let profileImage;

    if (session.accountType === "account") {
      const user = await userStore.updateProfile(session.playerId, body);
      playerName = user.playerName;
      profileImage = user.profileImage;
    } else {
      playerName = normalizePlayerName(body.playerName);
      profileImage = normalizeProfileImage(body.profileImage);
    }

    updatePlayerIdentity(session.playerId, playerName, profileImage);
    updateSessionsForPlayer(session.playerId, playerName, profileImage);
    sendJson(res, 200, sessionWithStats(pokerSessions.get(session.token)));
    return;
  }

  if (url.pathname === "/api/auth/signout" && req.method === "POST") {
    const token = getBearerToken(req);
    if (token) {
      const session = pokerSessions.get(token);
      if (session) {
        spectatorTableIdsByPlayer.delete(session.playerId);
      }
      pokerSessions.delete(token);
    }
    sendJson(res, 200, { signedOut: true });
    return;
  }

  if (url.pathname === "/api/auth/users" && req.method === "GET") {
    requireAdminSession(req);
    sendJson(res, 200, { users: await userStore.listUsers() });
    return;
  }

  if (url.pathname === "/api/auth/users/status" && req.method === "PATCH") {
    requireAdminSession(req);
    const body = await readJson(req);
    const users = await userStore.setUsersActive(body.userIds, body.active);
    if (body.active === false) {
      revokeSessionsForPlayers(new Set(body.userIds.map(String)));
    }
    sendJson(res, 200, { users });
    return;
  }

  sendJson(res, 404, { error: "Authentication API route not found." });
}

async function handlePokerApi(req, res, url) {
  if (url.pathname === "/api/poker/sessions" && req.method === "POST") {
    const body = await readJson(req);
    const session = createPokerSession({
        playerName: body.playerName,
        accountType: "guest",
        role: "guest",
        profileImage: body.profileImage,
    });
    sendJson(res, 201, sessionWithStats(session));
    return;
  }

  if (url.pathname === "/api/poker/tables") {
    if (req.method === "GET") {
      const session = getPokerSession(req, false);
      sendJson(
        res,
        200,
        [...pokerTables.values()].map((table) =>
          serializePokerTable(table, {
            viewerPlayerId: session?.playerId,
            publicView: !session,
          }),
        ),
      );
      return;
    }

    if (req.method === "POST") {
      const session = getPokerSession(req);
      const body = await readJson(req);
      if (!canCreateTable(session, body.gameType)) {
        throw createHttpError(403, "Only a Host account can create a poker table.");
      }
      const roomNameKey = normalizeRoomName(body.tableName);
      if (tableIdsByRoomName.has(roomNameKey)) {
        throw createHttpError(409, "That room name is already in use.");
      }
      const table = createPokerTable({
        ...body,
        mode: "masked",
        seatCount: 9,
        playerId: session.playerId,
        playerName: session.playerName,
        profileImage: session.profileImage,
        userRole: "host",
        rolePassword: ROLE_TEST_PASSWORD,
        hostAsSpectator: true,
        fillWithBots: false,
      });
      table.roomCode = makeRoomCode();
      table.hostPlayerId = session.playerId;
      pokerTables.set(table.id, table);
      tableIdsByRoomCode.set(table.roomCode, table.id);
      tableIdsByRoomName.set(roomNameKey, table.id);
      addSpectatorTable(session.playerId, table.id);
      sendJson(res, 201, serializeForSession(table, session));
      return;
    }
  }

  if (url.pathname === "/api/poker/tables/guest" && req.method === "POST") {
    const session = getPokerSession(req);
    requirePermission(session, "practice_with_bots", "Quick play is available for Guest sessions.");
    const body = await readJson(req);
    const practiceMode = body.mode === "unmasked" ? "unmasked" : "masked";
    const botStyle = String(body.botStyle || "adaptive");
    const liveLearningMode = body.liveLearningMode === true || body.liveLearningMode === "true";
    closePracticeTablesForPlayer(session.playerId);
    const table = createPokerTable({
      playerId: session.playerId,
      playerName: session.playerName,
      profileImage: session.profileImage,
      tableName: `${session.playerName}'s Game`,
      seatCount: 4,
      smallBlind: 10,
      bigBlind: 20,
      startingStack: 1500,
      mode: practiceMode,
      botStyle,
      liveLearningMode,
      isPractice: true,
      userRole: "player",
    });
    table.roomCode = makeRoomCode();
    table.hostPlayerId = session.playerId;
    pokerTables.set(table.id, table);
    tableIdsByRoomCode.set(table.roomCode, table.id);
    sendJson(res, 201, serializeForSession(table, session));
    return;
  }

  if (url.pathname === "/api/poker/host/tables" && req.method === "GET") {
    const session = getPokerSession(req);
    requirePermission(session, "view_own_tables", "Only a Host account can manage active rooms.");
    const tables = [...pokerTables.values()]
      .filter((table) => table.hostPlayerId === session.playerId)
      .map((table) => {
        const tournament = syncTournamentClock(table);
        const seatedPlayers = table.players.filter((player) => player.type === "human").length;
        return {
          id: table.id,
          name: table.name,
          roomCode: table.roomCode,
          status: table.status,
          phase: table.phase,
          gameType: table.config.gameType || "cash",
          blinds: {
            smallBlind: table.config.smallBlind,
            bigBlind: table.config.bigBlind,
          },
          tournament,
          seatedPlayers,
          waitingPlayers: countWaitingPlayers(table.id),
          openSeats: Math.max(0, table.config.seatCount - seatedPlayers),
          seatCount: table.config.seatCount,
          createdAt: table.createdAt,
        };
      })
      .sort((first, second) => second.createdAt.localeCompare(first.createdAt));
    sendJson(res, 200, { tables });
    return;
  }

  if (url.pathname === "/api/poker/tournaments" && req.method === "GET") {
    const session = getPokerSession(req);
    requirePermission(session, "join_tournament", "Tournament registration is available to Player accounts.");
    const tournaments = [...pokerTables.values()]
      .filter((table) => table.config.gameType === "tournament")
      .map((table) => {
        const tournament = syncTournamentClock(table);
        const seatedPlayers = table.players.filter((player) => player.type === "human").length;
        const waitingPlayers = countWaitingPlayers(table.id);
        return {
          id: table.id,
          name: table.name,
          status: table.status === "waiting" ? "waiting" : "active",
          seatedPlayers,
          waitingPlayers,
          openSeats: Math.max(0, table.config.seatCount - seatedPlayers),
          seatCount: table.config.seatCount,
          startingStack: table.config.startingStack,
          mode: table.mode,
          tournament,
          joined: table.players.some((player) => player.id === session.playerId),
          waitingForSeat: Boolean(
            spectatorTableIdsByPlayer.get(session.playerId)?.has(table.id),
          ),
        };
      })
      .sort((first, second) => {
        if (first.status !== second.status) return first.status === "waiting" ? -1 : 1;
        return first.name.localeCompare(second.name);
      });
    sendJson(res, 200, { tournaments });
    return;
  }

  if (url.pathname === "/api/poker/player/tables" && req.method === "GET") {
    const session = getPokerSession(req);
    requirePermission(session, "join_cash_table", "Cash table access is available to Player accounts.");
    const tables = [...pokerTables.values()]
      .filter((table) => table.config.gameType !== "tournament" && !isPracticeTable(table))
      .map((table) => {
        const seatedPlayers = table.players.filter((player) => player.type === "human").length;
        const waitingPlayers = countWaitingPlayers(table.id);
        return {
          id: table.id,
          name: table.name,
          roomCode: table.roomCode,
          status: table.status === "waiting" ? "waiting" : "active",
          seatedPlayers,
          waitingPlayers,
          openSeats: Math.max(0, table.config.seatCount - seatedPlayers),
          seatCount: table.config.seatCount,
          smallBlind: table.config.smallBlind,
          bigBlind: table.config.bigBlind,
          startingStack: table.config.startingStack,
          joined: table.players.some((player) => player.id === session.playerId),
          waitingForSeat: Boolean(
            spectatorTableIdsByPlayer.get(session.playerId)?.has(table.id),
          ),
          createdAt: table.createdAt,
        };
      })
      .sort((first, second) => {
        if (first.openSeats !== second.openSeats) return second.openSeats - first.openSeats;
        return first.name.localeCompare(second.name);
      });
    sendJson(res, 200, { tables });
    return;
  }

  if (url.pathname === "/api/poker/tables/join" && req.method === "POST") {
    const session = getPokerSession(req);
    const body = await readJson(req);
    const requestedTableId = String(body.tableId || "").trim();
    const roomAccess = String(body.roomAccess || body.roomName || body.roomCode || "").trim();
    if (!requestedTableId && roomAccess.length < 2) {
      throw createHttpError(400, "Enter a room name or room code.");
    }
    const roomNameId = roomAccess
      ? tableIdsByRoomName.get(normalizeRoomName(roomAccess))
      : null;
    const roomCodeId = roomAccess ? tableIdsByRoomCode.get(roomAccess.toUpperCase()) : null;
    const tableId = requestedTableId || roomNameId || roomCodeId;
    const table = tableId ? pokerTables.get(tableId) : null;

    if (!table) {
      throw createHttpError(404, "Poker room name or code was not found.");
    }
    if (!canUseRoomAccess(session, table)) {
      throw createHttpError(403, "Guest access uses Play Game with bot opponents.");
    }

    if (isViewOnlyRole(session)) {
      addSpectatorTable(session.playerId, table.id);
    } else {
      const existingPlayer = table.players.find((player) => player.id === session.playerId);
      if (!existingPlayer && body.seatNumber == null) {
        addSpectatorTable(session.playerId, table.id);
      } else if (!existingPlayer) {
        if (!canClaimSeat(session, table)) {
          throw createHttpError(403, "This role cannot claim a player seat at this table.");
        }
        joinPokerTable(table, {
          playerId: session.playerId,
          playerName: session.playerName,
          profileImage: session.profileImage,
          seat: Number(body.seatNumber),
        });
        removeSpectatorTable(session.playerId, table.id);
      }
    }
    sendJson(res, 200, serializeForSession(table, session));
    return;
  }

  const match = url.pathname.match(/^\/api\/poker\/tables\/([^/]+)(?:\/([^/]+))?$/);
  if (!match) {
    sendJson(res, 404, { error: "Poker API route not found." });
    return;
  }

  const [, tableId, action] = match;
  const table = pokerTables.get(tableId);

  if (!table) {
    sendJson(res, 404, { error: "Poker table not found." });
    return;
  }

  if (req.method === "GET" && !action) {
    const session = getPokerSession(req);
    const isParticipant = table.players.some((player) => player.id === session.playerId);
    const isSpectator = spectatorTableIdsByPlayer.get(session.playerId)?.has(table.id);
    if (!isParticipant && !isSpectator && !hasPermission(session.role, "view_table")) {
      throw createHttpError(403, "Join this table before viewing it.");
    }
    sendJson(res, 200, serializeForSession(table, session));
    return;
  }

  if (req.method === "DELETE" && !action) {
    const session = requireTableOwnerSession(req, table);
    if (!canCloseOwnTable(session, table)) {
      throw createHttpError(403, "Only the table Host can close this table.");
    }
    closePokerTable(table);
    sendJson(res, 200, { closed: true, tableId, hostPlayerId: session.playerId });
    return;
  }

  if (req.method === "POST" && action === "actions") {
    const session = getPokerSession(req);
    if (!canPerformPlayerAction(session, table)) {
      throw createHttpError(403, "This role cannot perform player actions.");
    }
    const body = await readJson(req);
    performPokerAction(table, body, Math.random, session.playerId);
    processCompletedHand(table);
    sendJson(res, 200, serializeForSession(table, session));
    return;
  }

  if (req.method === "POST" && action === "bot-turn") {
    const session = requireTableOwnerSession(req, table);
    if (!canAdvanceTable(session, table)) {
      throw createHttpError(403, "This role cannot advance the table.");
    }
    performNextPokerBotAction(table);
    processCompletedHand(table);
    sendJson(res, 200, serializeForSession(table, session));
    return;
  }

  if (req.method === "POST" && action === "new-hand") {
    const session = requireTableOwnerSession(req, table);
    if (!canAdvanceTable(session, table)) {
      throw createHttpError(403, "This role cannot advance the table.");
    }
    clearNextHandTimer(table.id);
    startNextPokerHand(table);
    sendJson(res, 200, serializeForSession(table, session));
    return;
  }

  sendJson(res, 404, { error: "Poker API route not found." });
}

function createPokerSession(options = {}) {
  const playerName = String(options.playerName || "").trim().replace(/\s+/g, " ").slice(0, 24);
  if (playerName.length < 2) {
    throw createHttpError(400, "Player name must be at least 2 characters.");
  }

  const session = {
    token: randomUUID(),
    playerId: options.playerId || randomUUID(),
    playerName,
    accountType: options.accountType === "account" ? "account" : "guest",
    userId: options.userId || null,
    role: normalizeSessionRole(options.role, options.accountType),
    active: options.active !== false,
    reservedRole: options.reservedRole || null,
    profileImage: normalizeProfileImage(options.profileImage),
  };
  pokerSessions.set(session.token, session);
  ensurePlayerStats(session);
  return session;
}

function ensurePlayerStats(session) {
  if (!playerStats.has(session.playerId)) {
    playerStats.set(session.playerId, {
      playerId: session.playerId,
      playerName: session.playerName,
      profileImage: session.profileImage || null,
      handsPlayed: 0,
      handsWon: 0,
    });
  }
  return playerStats.get(session.playerId);
}

function sessionWithStats(session) {
  const stats = ensurePlayerStats(session);
  return buildPublicSession(session, stats);
}

function processCompletedHand(table) {
  if (table.status !== "hand-complete" || table.statsRecordedHand === table.handNumber) return;
  table.statsRecordedHand = table.handNumber;
  const winnerIds = new Set(table.winners.map((winner) => winner.playerId));

  for (const player of table.players) {
    if (player.type !== "human" || player.hole.length !== 2) continue;
    const stats = playerStats.get(player.id) || {
      playerId: player.id,
      playerName: player.name,
      profileImage: player.profileImage || null,
      handsPlayed: 0,
      handsWon: 0,
    };
    stats.playerName = player.name;
    stats.profileImage = player.profileImage || null;
    stats.handsPlayed += 1;
    if (winnerIds.has(player.id)) stats.handsWon += 1;
    playerStats.set(player.id, stats);
  }
  scheduleNextHand(table);
}

function scheduleNextHand(table) {
  clearNextHandTimer(table.id);
  nextHandTimers.set(
    table.id,
    setTimeout(() => {
      nextHandTimers.delete(table.id);
      if (!pokerTables.has(table.id) || table.status !== "hand-complete") return;
      startNextPokerHand(table);
    }, 4000),
  );
}

function clearNextHandTimer(tableId) {
  const timer = nextHandTimers.get(tableId);
  if (timer) clearTimeout(timer);
  nextHandTimers.delete(tableId);
}

function getRankings() {
  return [...playerStats.values()]
    .filter((stats) => stats.handsPlayed > 0)
    .sort(
      (first, second) =>
        second.handsWon - first.handsWon ||
        second.handsPlayed - first.handsPlayed ||
        first.playerName.localeCompare(second.playerName),
    )
    .map((stats, index) => ({ ...stats, rank: index + 1 }));
}

function normalizeProfileImage(value) {
  const profileImage = String(value || "");
  if (!profileImage) return null;
  if (
    profileImage.length > 400_000 ||
    !/^data:image\/(?:jpeg|png|webp);base64,[a-z0-9+/=]+$/i.test(profileImage)
  ) {
    throw createHttpError(400, "Profile photo must be a valid JPG, PNG, or WebP image.");
  }
  return profileImage;
}

function normalizePlayerName(value) {
  const playerName = String(value || "").trim().replace(/\s+/g, " ").slice(0, 24);
  if (playerName.length < 2) {
    throw createHttpError(400, "Display name must be at least 2 characters.");
  }
  return playerName;
}

function normalizeRoomName(value) {
  const roomName = String(value || "").trim().replace(/\s+/g, " ");
  if (roomName.length < 2 || roomName.length > 36) {
    throw createHttpError(400, "Room name must be between 2 and 36 characters.");
  }
  return roomName.toLowerCase();
}

function updateSessionsForPlayer(playerId, playerName, profileImage) {
  for (const session of pokerSessions.values()) {
    if (session.playerId === playerId) {
      session.playerName = playerName;
      session.profileImage = profileImage;
    }
  }
  const stats = playerStats.get(playerId);
  if (stats) {
    stats.playerName = playerName;
    stats.profileImage = profileImage;
  }
}

function updatePlayerIdentity(playerId, playerName, profileImage) {
  for (const table of pokerTables.values()) {
    const player = table.players.find((candidate) => candidate.id === playerId);
    if (player) {
      player.name = playerName;
      player.profileImage = profileImage;
    }
  }
}

function normalizeSessionRole(role, accountType) {
  if (accountType !== "account") {
    return "guest";
  }
  return ["host", "player", "admin"].includes(role) ? role : "player";
}

function getPokerSession(req, required = true) {
  const token = getBearerToken(req);
  const session = pokerSessions.get(token);

  if (!session && required) {
    throw createHttpError(401, "Start or restore a player session first.");
  }

  return session || null;
}

function getBearerToken(req) {
  const authorization = String(req.headers.authorization || "");
  return authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
}

function requireTableOwnerSession(req, table) {
  const session = getPokerSession(req);
  if (table.hostPlayerId !== session.playerId) {
    throw createHttpError(403, "Only the table owner can perform this action.");
  }
  return session;
}

function requireAdminSession(req) {
  const session = getPokerSession(req);
  if (
    session.accountType !== "account" ||
    !hasPermission(session.role, "manage_users")
  ) {
    throw createHttpError(403, "Only an Admin account can manage users.");
  }
  return session;
}

function requirePermission(session, permission, message) {
  if (!hasPermission(session.role, permission)) {
    throw createHttpError(403, message || "This role does not have permission for that action.");
  }
}

function revokeSessionsForPlayers(userIds) {
  for (const [token, session] of pokerSessions) {
    if (userIds.has(session.playerId)) {
      spectatorTableIdsByPlayer.delete(session.playerId);
      pokerSessions.delete(token);
    }
  }
}

function serializeForSession(table, session) {
  const isSeated = table.players.some((player) => player.id === session.playerId);
  const isSpectator =
    !isSeated && spectatorTableIdsByPlayer.get(session.playerId)?.has(table.id);
  const availableSeats = table.players.filter(
    (player) => player.type === "bot" || player.type === "open",
  );
  const viewerMode = isSeated
    ? "player"
    : isSpectator && hasPermission(session.role, "view_table") && !hasPermission(session.role, "claim_seat")
      ? "spectator"
      : isSpectator && availableSeats.length
        ? "seat-selection"
        : isSpectator
          ? "waiting"
          : "spectator";
  return serializePokerTable(table, {
    viewerPlayerId: isSpectator ? null : session.playerId,
    controllerPlayerId: session.playerId,
    viewerRole: session.role,
    spectatorView: isSpectator,
    viewerMode,
    publicView: isSpectator,
  });
}

function addSpectatorTable(playerId, tableId) {
  const tableIds = spectatorTableIdsByPlayer.get(playerId) || new Set();
  tableIds.add(tableId);
  spectatorTableIdsByPlayer.set(playerId, tableIds);
}

function removeSpectatorTable(playerId, tableId) {
  const tableIds = spectatorTableIdsByPlayer.get(playerId);
  if (!tableIds) return;
  tableIds.delete(tableId);
  if (!tableIds.size) {
    spectatorTableIdsByPlayer.delete(playerId);
  }
}

function countWaitingPlayers(tableId) {
  const waitingPlayerIds = new Set();
  for (const session of pokerSessions.values()) {
    if (
      hasPermission(session.role, "join_tournament") &&
      spectatorTableIdsByPlayer.get(session.playerId)?.has(tableId)
    ) {
      waitingPlayerIds.add(session.playerId);
    }
  }
  return waitingPlayerIds.size;
}

function isPracticeTable(table) {
  return Boolean(table?.config?.isPractice);
}

function closePracticeTablesForPlayer(playerId) {
  for (const table of pokerTables.values()) {
    if (table.hostPlayerId === playerId && isPracticeTable(table)) {
      closePokerTable(table);
    }
  }
}

function closePokerTable(table) {
  clearNextHandTimer(table.id);
  pokerTables.delete(table.id);
  tableIdsByRoomCode.delete(table.roomCode);
  tableIdsByRoomName.delete(normalizeRoomName(table.name));
  for (const [playerId, tableIds] of spectatorTableIdsByPlayer) {
    tableIds.delete(table.id);
    if (!tableIds.size) {
      spectatorTableIdsByPlayer.delete(playerId);
    }
  }
}

function makeRoomCode() {
  let code;
  do {
    code = Math.random().toString(36).slice(2, 8).toUpperCase();
  } while (tableIdsByRoomCode.has(code));
  return code;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(createHttpError(413, "Request body is too large."));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(createHttpError(400, "Request body must be valid JSON."));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function serveStatic(req, res, url) {
  if (url.pathname === "/") {
    res.writeHead(302, { Location: `${APP_MOUNT}/` });
    res.end();
    return;
  }

  if (url.pathname === APP_MOUNT) {
    res.writeHead(302, { Location: `${APP_MOUNT}/` });
    res.end();
    return;
  }

  const relativePath = getStaticPath(url.pathname);
  if (!relativePath) {
    sendJson(res, 404, { error: "Not found." });
    return;
  }

  const resolvedPath = path.normalize(path.join(__dirname, relativePath));
  if (!isInsideRoot(resolvedPath, __dirname)) {
    sendJson(res, 403, { error: "Forbidden." });
    return;
  }

  fs.readFile(resolvedPath, (error, contents) => {
    if (error) {
      sendJson(res, 404, { error: "File not found." });
      return;
    }

    const extension = path.extname(resolvedPath);
    res.writeHead(200, {
      "Content-Type": contentTypes[extension] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(contents);
  });
}

function getStaticPath(pathname) {
  let relativePath = "";

  if (pathname === `${APP_MOUNT}/`) {
    return "index.html";
  }

  if (pathname.startsWith(`${APP_MOUNT}/`)) {
    relativePath = decodeURIComponent(pathname.slice(APP_MOUNT.length + 1)) || "index.html";
  } else if (!pathname.startsWith("/api/")) {
    relativePath = decodeURIComponent(pathname.slice(1)) || "index.html";
  }

  return publicFiles.has(relativePath) ? relativePath : null;
}

function isInsideRoot(filePath, rootPath) {
  const relative = path.relative(rootPath, filePath);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  Promise.resolve()
    .then(async () => {
      if ((url.pathname === "/api/health" || url.pathname === "/health") && req.method === "GET") {
        const storage = await getStorageHealth();
        sendJson(res, 200, {
          status: "ok",
          app: "poker-room",
          uptimeSeconds: Math.round(process.uptime()),
          storage,
        });
        return null;
      }
      if (url.pathname.startsWith("/api/auth/")) {
        return handleAuthApi(req, res, url);
      }
      if (url.pathname.startsWith("/api/poker/")) {
        return handlePokerApi(req, res, url);
      }
      serveStatic(req, res, url);
      return null;
    })
    .catch((error) => {
      const status = error.status || 500;
      sendJson(res, status, {
        error: status === 500 ? "Internal server error." : error.message,
      });
      if (status === 500) {
        console.error(error);
      }
    });
});

async function startServer() {
  if (typeof userStore.init === "function") {
    await userStore.init();
  }
  await userStore.ensureReservedAccounts();
  server.listen(PORT, HOST, () => {
    console.log(`Poker server listening on http://${HOST}:${PORT}${APP_MOUNT}/`);
  });
}

function createUserStore() {
  if (DATABASE_URL) {
    return new PostgresUserStore(DATABASE_URL);
  }
  return new UserStore(USERS_FILE);
}

async function getStorageHealth() {
  if (typeof userStore.healthCheck === "function") {
    return userStore.healthCheck();
  }
  return { storage: "file" };
}

startServer().catch((error) => {
  console.error("Unable to start Poker server.", error);
  process.exitCode = 1;
});
