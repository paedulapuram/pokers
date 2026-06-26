"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const {
  buildDeck,
  buildTournamentBlindSchedule,
  chooseBotAction,
  compareRanks,
  createCard,
  createPokerTable,
  evaluateBestHand,
  getBotPersonalityDetails,
  joinPokerTable,
  performNextPokerBotAction,
  performPokerAction,
  playPokerBots,
  serializePokerTable,
  syncTournamentClock,
} = require("../src/pokerEngine");

test("buildDeck creates a standard 52-card poker deck", () => {
  const deck = buildDeck();
  assert.equal(deck.length, 52);
  assert.equal(new Set(deck.map((card) => card.id)).size, 52);
});

test("evaluateBestHand picks the strongest five-card hand from seven cards", () => {
  const straightFlush = evaluateBestHand([
    createCard("A", "S"),
    createCard("K", "S"),
    createCard("Q", "S"),
    createCard("J", "S"),
    createCard("10", "S"),
    createCard("2", "D"),
    createCard("2", "C"),
  ]);
  const quads = evaluateBestHand([
    createCard("9", "S"),
    createCard("9", "H"),
    createCard("9", "D"),
    createCard("9", "C"),
    createCard("A", "D"),
    createCard("3", "S"),
    createCard("2", "C"),
  ]);

  assert.equal(straightFlush.label, "Straight flush");
  assert.equal(quads.label, "Four of a kind");
  assert.equal(compareRanks(straightFlush.rank, quads.rank) > 0, true);
});

test("evaluateBestHand supports ace-low wheel straights", () => {
  const hand = evaluateBestHand([
    createCard("A", "S"),
    createCard("2", "H"),
    createCard("3", "D"),
    createCard("4", "C"),
    createCard("5", "S"),
    createCard("K", "D"),
    createCard("9", "C"),
  ]);

  assert.equal(hand.label, "Straight");
  assert.deepEqual(hand.rank, [4, 5]);
});

test("createPokerTable exposes platform roles and dealer system actor", () => {
  const table = createPokerTable({
    playerName: "Alex",
    userRole: "host",
    rolePassword: "poker-test",
    seatCount: 2,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1000,
  });
  const serialized = serializePokerTable(table);

  assert.equal(serialized.roles.userRole, "host");
  assert.equal(serialized.roles.current.label, "Host");
  assert.equal(serialized.roles.current.actorRole, "spectator");
  assert.equal(serialized.roles.current.permissions.includes("create_cash_table"), true);
  assert.equal(serialized.roles.current.permissions.includes("play_hand"), false);
  assert.equal(serialized.roles.catalog.admin.permissions.includes("manage_users"), true);
  assert.deepEqual(serialized.roles.gameActors, ["player", "spectator", "dealer_system"]);
  assert.equal(serialized.players[0].name, "Alex");
  assert.equal(serialized.players[0].actorRole, "player");
});

test("createPokerTable requires the test password for Host and Admin roles", () => {
  assert.throws(
    () =>
      createPokerTable({
        playerName: "Alex",
        userRole: "admin",
        seatCount: 2,
        smallBlind: 10,
        bigBlind: 20,
        startingStack: 1000,
      }),
    (error) => error.status === 403 && /test password/.test(error.message),
  );
});

test("createPokerTable supports nine-seat tables", () => {
  const table = createPokerTable({
    playerName: "Alex",
    seatCount: 9,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1500,
  });
  const serialized = serializePokerTable(table);

  assert.equal(serialized.config.seatCount, 9);
  assert.equal(serialized.players.length, 9);
  assert.equal(serialized.players.at(-1).name, "Lina");
});

test("tournament tables expose a timed blind schedule", () => {
  const table = createPokerTable({
    playerId: "host-controller",
    playerName: "Host",
    userRole: "host",
    rolePassword: "poker-test",
    hostAsSpectator: true,
    fillWithBots: false,
    gameType: "tournament",
    blindLevelMinutes: 5,
    seatCount: 4,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1500,
  });
  const serialized = serializePokerTable(table);

  assert.equal(serialized.config.gameType, "tournament");
  assert.equal(serialized.tournament.levelDurationSeconds, 300);
  assert.equal(serialized.tournament.startedAt, null);
  assert.deepEqual(serialized.tournament.currentLevel, {
    level: 1,
    smallBlind: 10,
    bigBlind: 20,
  });
});

test("tournament blinds advance between hands", () => {
  const table = createPokerTable({
    playerName: "Alex",
    gameType: "tournament",
    blindLevelMinutes: 1,
    seatCount: 2,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1500,
  });
  const startedAt = Date.parse(table.tournament.startedAt);

  const duringHand = syncTournamentClock(table, startedAt + 61_000);
  assert.equal(duringHand.pendingLevelChange, true);
  assert.equal(table.config.smallBlind, 10);
  assert.equal(table.config.bigBlind, 20);

  const nextHand = syncTournamentClock(table, startedAt + 61_000, true);
  assert.equal(nextHand.pendingLevelChange, false);
  assert.equal(table.config.smallBlind, 15);
  assert.equal(table.config.bigBlind, 30);
});

test("tournament blind schedules increase in level order", () => {
  const schedule = buildTournamentBlindSchedule(25, 50);

  assert.equal(schedule.length, 12);
  assert.deepEqual(schedule[0], { level: 1, smallBlind: 25, bigBlind: 50 });
  assert.equal(schedule.every((level, index) => index === 0 || level.bigBlind > schedule[index - 1].bigBlind), true);
});

test("createPokerTable can reserve every seat for players while Host watches", () => {
  const table = createPokerTable({
    playerId: "host-controller",
    playerName: "Host",
    userRole: "host",
    rolePassword: "poker-test",
    hostAsSpectator: true,
    seatCount: 4,
  });

  assert.equal(table.players.length, 4);
  assert.equal(table.players.every((player) => player.type === "bot"), true);
  assert.equal(table.players.some((player) => player.id === "host-controller"), false);
});

test("human-only rooms start empty and begin when two players choose seats", () => {
  const table = createPokerTable({
    playerId: "host-controller",
    playerName: "Host",
    userRole: "host",
    rolePassword: "poker-test",
    hostAsSpectator: true,
    fillWithBots: false,
    seatCount: 4,
  });

  assert.equal(table.status, "waiting");
  assert.equal(table.players.every((player) => player.type === "open"), true);
  assert.deepEqual(serializePokerTable(table).availableSeats, [1, 2, 3, 4]);

  joinPokerTable(table, { playerId: "player-one", playerName: "Player One", seat: 2 });
  assert.equal(table.status, "waiting");
  joinPokerTable(table, { playerId: "player-two", playerName: "Player Two", seat: 4 });

  assert.equal(table.status, "playing");
  assert.equal(table.players.find((player) => player.seat === 2).type, "human");
  assert.equal(table.players.find((player) => player.seat === 4).type, "human");
  assert.deepEqual(serializePokerTable(table).availableSeats, [1, 3]);
});

test("nine-seat human rooms expose every seat in numeric order", () => {
  const table = createPokerTable({
    playerId: "host-controller",
    playerName: "Host",
    userRole: "host",
    rolePassword: "poker-test",
    hostAsSpectator: true,
    fillWithBots: false,
    seatCount: 9,
  });

  assert.deepEqual(serializePokerTable(table).availableSeats, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("masked poker mode keeps opponent hole cards hidden during betting", () => {
  const table = createPokerTable({
    playerName: "Alex",
    mode: "masked",
    seatCount: 2,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1000,
  });
  const serialized = serializePokerTable(table);
  const bot = serialized.players.find((player) => player.type === "bot");

  assert.equal(serialized.status, "playing");
  assert.equal(serialized.mode, "masked");
  assert.equal(serialized.config.mode, "masked");
  assert.deepEqual(bot.hole, [{ hidden: true }, { hidden: true }]);
  assert.equal(typeof serialized.players[0].winChance.percent, "number");
  assert.equal(bot.winChance.percent, null);
});

test("unmasked poker mode reveals opponent hole cards during betting", () => {
  const table = createPokerTable({
    playerName: "Alex",
    mode: "unmasked",
    seatCount: 2,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1000,
  });
  const serialized = serializePokerTable(table);
  const bot = serialized.players.find((player) => player.type === "bot");

  assert.equal(serialized.status, "playing");
  assert.equal(serialized.mode, "unmasked");
  assert.equal(serialized.config.mode, "unmasked");
  assert.equal(bot.hole.length, 2);
  assert.equal(bot.hole.some((card) => card.hidden), false);
  assert.equal(typeof bot.hole[0].rank, "string");
  assert.equal(serialized.players.every((player) => typeof player.winChance.percent === "number"), true);
  assert.equal(
    serialized.players.reduce((sum, player) => sum + player.winChance.percent, 0),
    100,
  );
});

test("guest practice tables expose selected bot personality details", () => {
  const table = createPokerTable({
    playerName: "Alex",
    botStyle: "adaptive",
    seatCount: 2,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1000,
  });
  const serialized = serializePokerTable(table);
  const bot = serialized.players.find((player) => player.type === "bot");

  assert.equal(serialized.config.botStyle, "adaptive");
  assert.equal(serialized.botTraining.enabled, true);
  assert.equal(bot.personality.style, "adaptive");
  assert.equal(bot.personality.effectiveStyle, "balanced");
  assert.match(bot.personality.label, /Adaptive/);
  assert.equal(getBotPersonalityDetails("aggressive").label, "Aggressive");
});

test("bot personalities make different decisions under pressure", () => {
  const createDecisionTable = (personality) => {
    const bot = {
      id: `bot-${personality}`,
      name: "Bot",
      type: "bot",
      personality,
      stack: 1000,
      bet: 0,
      folded: false,
      allIn: false,
      hole: [createCard("2", "C"), createCard("7", "D")],
    };

    return {
      status: "playing",
      phase: "preflop",
      config: { bigBlind: 20, botStyle: personality },
      currentPlayerIndex: 0,
      currentBet: 200,
      minRaise: 200,
      pot: 300,
      community: [],
      players: [bot],
    };
  };

  const tightTable = createDecisionTable("tight");
  const callingTable = createDecisionTable("calling-station");

  assert.deepEqual(chooseBotAction(tightTable, tightTable.players[0], () => 0.2), { action: "fold" });
  assert.deepEqual(chooseBotAction(callingTable, callingTable.players[0], () => 0.2), { action: "call" });
});

test("adaptive bots adjust style from observed player actions", () => {
  const table = createPokerTable({
    playerName: "Alex",
    botStyle: "adaptive",
    seatCount: 2,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1000,
  });

  table.botTraining.counts = {
    actions: 5,
    folds: 4,
    calls: 0,
    checks: 1,
    bets: 0,
    raises: 0,
    allIns: 0,
  };

  const serialized = serializePokerTable(table);
  const bot = serialized.players.find((player) => player.type === "bot");

  assert.equal(serialized.botTraining.currentStyle, "aggressive");
  assert.equal(bot.personality.effectiveStyle, "aggressive");
  assert.match(bot.personality.description, /pressure/);
});

test("live learning mode adds guest practice coaching advice", () => {
  const table = createPokerTable({
    playerId: "guest-player",
    playerName: "Alex",
    botStyle: "adaptive",
    liveLearningMode: true,
    seatCount: 2,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1000,
  });
  const serialized = serializePokerTable(table, { viewerPlayerId: "guest-player" });

  assert.equal(serialized.config.liveLearningMode, true);
  assert.equal(serialized.learningCoach.enabled, true);
  assert.equal(serialized.learningCoach.title, "Live Learning Mode");
  assert.equal(serialized.learningCoach.tips.some((tip) => /Hand read/.test(tip)), true);
  assert.equal(serialized.learningCoach.recommendation.length > 0, true);
});

test("live learning mode stays off unless explicitly enabled", () => {
  const table = createPokerTable({
    playerId: "guest-player",
    playerName: "Alex",
    seatCount: 2,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1000,
  });
  const serialized = serializePokerTable(table, { viewerPlayerId: "guest-player" });

  assert.equal(serialized.config.liveLearningMode, false);
  assert.equal(serialized.learningCoach, null);
});

test("performPokerAction pauses on bot turns before continuing", () => {
  const table = createPokerTable({
    playerName: "Alex",
    seatCount: 2,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1000,
  });

  assert.equal(serializePokerTable(table).isHumanTurn, true);
  performPokerAction(table, { action: "call" }, () => 0.5);

  let serialized = serializePokerTable(table);
  assert.equal(serialized.isHumanTurn, false);
  assert.equal(serialized.currentPlayerName, "Mira");

  const eventCount = serialized.events.length;
  performNextPokerBotAction(table, () => 0.5);
  serialized = serializePokerTable(table);
  assert.equal(serialized.events.length > eventCount, true);

  playPokerBots(table, () => 0.5);

  serialized = serializePokerTable(table);
  assert.equal(["playing", "hand-complete"].includes(serialized.status), true);
  assert.equal(serialized.status === "hand-complete" || serialized.isHumanTurn, true);
});

test("joinPokerTable replaces a bot seat with a second human player", () => {
  const profileImage = "data:image/jpeg;base64,aGVsbG8=";
  const table = createPokerTable({
    playerId: "host-player",
    playerName: "Host",
    profileImage,
    seatCount: 3,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1000,
  });

  const joined = joinPokerTable(table, {
    playerId: "guest-player",
    playerName: "Guest",
    profileImage,
  });

  assert.equal(joined.id, "guest-player");
  assert.equal(joined.name, "Guest");
  assert.equal(joined.profileImage, profileImage);
  assert.equal(joined.type, "human");
  assert.equal(
    serializePokerTable(table, { viewerPlayerId: "guest-player" }).players.find(
      (player) => player.id === "guest-player",
    ).profileImage,
    profileImage,
  );
  assert.equal(table.players.filter((player) => player.type === "human").length, 2);
  assert.match(table.events.at(-1), /Guest joined seat/);
});

test("joinPokerTable claims the selected available seat", () => {
  const table = createPokerTable({
    playerId: "host-player",
    playerName: "Host",
    seatCount: 4,
  });

  const joined = joinPokerTable(table, {
    playerId: "seat-picker",
    playerName: "Seat Picker",
    seat: 3,
  });

  assert.equal(joined.seat, 3);
  assert.equal(joined.id, "seat-picker");
  assert.throws(
    () =>
      joinPokerTable(table, {
        playerId: "late-player",
        playerName: "Late Player",
        seat: 3,
      }),
    /Seat 3 is no longer available/,
  );
});

test("serialized player views only reveal the viewer's private cards", () => {
  const table = createPokerTable({
    playerId: "host-player",
    playerName: "Host",
    mode: "masked",
    seatCount: 2,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1000,
  });
  joinPokerTable(table, {
    playerId: "guest-player",
    playerName: "Guest",
  });

  const hostView = serializePokerTable(table, { viewerPlayerId: "host-player" });
  const guestView = serializePokerTable(table, { viewerPlayerId: "guest-player" });
  const publicView = serializePokerTable(table, { publicView: true });
  const hostInHostView = hostView.players.find((player) => player.id === "host-player");
  const guestInHostView = hostView.players.find((player) => player.id === "guest-player");
  const hostInGuestView = guestView.players.find((player) => player.id === "host-player");
  const guestInGuestView = guestView.players.find((player) => player.id === "guest-player");

  assert.equal(hostInHostView.hole.some((card) => card.hidden), false);
  assert.equal(guestInHostView.hole.every((card) => card.hidden), true);
  assert.equal(hostInGuestView.hole.every((card) => card.hidden), true);
  assert.equal(guestInGuestView.hole.some((card) => card.hidden), false);
  assert.equal(hostInHostView.isYou, true);
  assert.equal(guestInGuestView.isYou, true);
  assert.equal(publicView.players.filter((player) => player.type === "human").every(
    (player) => player.hole.every((card) => card.hidden),
  ), true);
});

test("spectator views do not occupy a seat or receive player actions", () => {
  const table = createPokerTable({
    playerId: "table-host",
    playerName: "Table Host",
    mode: "masked",
    seatCount: 3,
  });
  const playerCount = table.players.length;
  const view = serializePokerTable(table, {
    viewerRole: "admin",
    spectatorView: true,
    publicView: true,
  });

  assert.equal(table.players.length, playerCount);
  assert.equal(view.viewerMode, "spectator");
  assert.equal(view.viewerPlayerId, null);
  assert.equal(view.roles.userRole, "admin");
  assert.equal(view.isViewerTurn, false);
  assert.equal(view.legalActions.canFold, false);
  assert.equal(view.players.some((player) => player.isYou), false);
  assert.equal(view.players.every((player) => player.hole.every((card) => card.hidden)), true);
});

test("performPokerAction rejects a different human player acting out of turn", () => {
  const table = createPokerTable({
    playerId: "host-player",
    playerName: "Host",
    seatCount: 2,
    smallBlind: 10,
    bigBlind: 20,
    startingStack: 1000,
  });
  joinPokerTable(table, {
    playerId: "guest-player",
    playerName: "Guest",
  });

  const currentPlayer = table.players[table.currentPlayerIndex];
  const wrongPlayerId = currentPlayer.id === "host-player" ? "guest-player" : "host-player";

  assert.throws(
    () => performPokerAction(table, { action: "call" }, () => 0.5, wrongPlayerId),
    (error) => error.status === 403 && /not your turn/.test(error.message),
  );
});
