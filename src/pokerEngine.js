"use strict";

const { randomUUID } = require("node:crypto");
const {
  ROLE_PERMISSIONS,
  getRoleDetails,
  normalizeRole,
} = require("./rolePermissions");

const SUITS = [
  { code: "S", symbol: "♠", name: "Spades", color: "black" },
  { code: "H", symbol: "♥", name: "Hearts", color: "red" },
  { code: "D", symbol: "♦", name: "Diamonds", color: "red" },
  { code: "C", symbol: "♣", name: "Clubs", color: "black" },
];

const RANKS = [
  { code: "2", label: "2", value: 2 },
  { code: "3", label: "3", value: 3 },
  { code: "4", label: "4", value: 4 },
  { code: "5", label: "5", value: 5 },
  { code: "6", label: "6", value: 6 },
  { code: "7", label: "7", value: 7 },
  { code: "8", label: "8", value: 8 },
  { code: "9", label: "9", value: 9 },
  { code: "10", label: "10", value: 10 },
  { code: "J", label: "J", value: 11 },
  { code: "Q", label: "Q", value: 12 },
  { code: "K", label: "K", value: 13 },
  { code: "A", label: "A", value: 14 },
];

const RANK_BY_CODE = new Map(RANKS.map((rank) => [rank.code, rank]));
const SUIT_BY_CODE = new Map(SUITS.map((suit) => [suit.code, suit]));
const HAND_LABELS = [
  "High card",
  "One pair",
  "Two pair",
  "Three of a kind",
  "Straight",
  "Flush",
  "Full house",
  "Four of a kind",
  "Straight flush",
];

const BOT_NAMES = ["Mira", "Dev", "Asha", "Noor", "Kai", "Ira", "Zed", "Lina"];
const TABLE_MODES = ["masked", "unmasked"];
const BOT_PERSONALITIES = Object.freeze({
  adaptive: {
    label: "Adaptive",
    description: "Reads the practice session and changes pressure.",
    allInCallStrength: 0.55,
    allInCallRollAbove: 0.7,
    raiseStrength: 0.82,
    raiseRollAbove: 0.25,
    foldStrength: 0.35,
    pressureFold: 0.18,
    foldRollBelow: 0.72,
    betStrength: 0.76,
    betRollAbove: 0.35,
    betPotRatio: 0.55,
    bluffChance: 0.02,
  },
  balanced: {
    label: "Balanced",
    description: "Mixes calls, folds, value bets, and light bluffs.",
    allInCallStrength: 0.55,
    allInCallRollAbove: 0.7,
    raiseStrength: 0.82,
    raiseRollAbove: 0.25,
    foldStrength: 0.35,
    pressureFold: 0.18,
    foldRollBelow: 0.72,
    betStrength: 0.76,
    betRollAbove: 0.35,
    betPotRatio: 0.55,
    bluffChance: 0.02,
  },
  tight: {
    label: "Tight",
    description: "Folds more often and attacks mostly with strong hands.",
    allInCallStrength: 0.68,
    allInCallRollAbove: 0.84,
    raiseStrength: 0.88,
    raiseRollAbove: 0.35,
    foldStrength: 0.48,
    pressureFold: 0.1,
    foldRollBelow: 0.86,
    betStrength: 0.84,
    betRollAbove: 0.45,
    betPotRatio: 0.48,
    bluffChance: 0.01,
  },
  aggressive: {
    label: "Aggressive",
    description: "Bets and raises wider to pressure the player.",
    allInCallStrength: 0.48,
    allInCallRollAbove: 0.52,
    raiseStrength: 0.68,
    raiseRollAbove: 0.16,
    foldStrength: 0.25,
    pressureFold: 0.34,
    foldRollBelow: 0.45,
    betStrength: 0.62,
    betRollAbove: 0.18,
    betPotRatio: 0.78,
    bluffChance: 0.12,
  },
  "calling-station": {
    label: "Calling",
    description: "Calls wider, folds less, and rarely raises without value.",
    allInCallStrength: 0.42,
    allInCallRollAbove: 0.45,
    raiseStrength: 0.92,
    raiseRollAbove: 0.65,
    foldStrength: 0.18,
    pressureFold: 0.45,
    foldRollBelow: 0.22,
    betStrength: 0.88,
    betRollAbove: 0.65,
    betPotRatio: 0.4,
    bluffChance: 0.03,
  },
});
const TEST_ROLE_PASSWORD = process.env.POKER_ROLE_PASSWORD || "poker-test";

function createPokerTable(options = {}, rng = Math.random) {
  const seatCount = clamp(Number(options.seatCount || 4), 2, 9);
  const smallBlind = clamp(Number(options.smallBlind || 10), 5, 500);
  const bigBlind = Math.max(smallBlind * 2, clamp(Number(options.bigBlind || smallBlind * 2), 10, 1000));
  const startingStack = clamp(Number(options.startingStack || 1500), bigBlind * 20, 100_000);
  const gameType = options.gameType === "tournament" ? "tournament" : "cash";
  const playerName = cleanName(options.playerName || "You");
  const requestedRole = normalizeRole(options.userRole, "player");
  const userRole = requestedRole === "guest" ? "player" : requestedRole;
  const mode = normalizeTableMode(options.mode || options.visibilityMode || options.cardMode);
  const botStyle = normalizeBotStyle(options.botStyle || options.practiceBotStyle);
  const liveLearningMode = Boolean(options.liveLearningMode || options.learningMode);
  const isPractice = Boolean(options.isPractice || options.practiceTable);
  const hostAsSpectator = Boolean(options.hostAsSpectator);
  const fillWithBots = options.fillWithBots !== false;

  if (requiresRolePassword(userRole) && String(options.rolePassword || "") !== TEST_ROLE_PASSWORD) {
    throw createPokerError(403, "Host/Admin test password is required.");
  }

  const table = {
    id: randomUUID(),
    name: cleanTableName(options.tableName || "Velvet Room"),
    variant: "Texas Hold'em",
    mode,
    chipMode: "virtual-chips",
    status: "playing",
    createdAt: new Date().toISOString(),
    handNumber: 0,
    config: {
      seatCount,
      smallBlind,
      bigBlind,
      startingStack,
      gameType,
      mode,
      chipMode: "virtual-chips",
      botStyle,
      liveLearningMode,
      isPractice,
    },
    botTraining: createBotTrainingState(botStyle),
    tournament:
      gameType === "tournament"
        ? {
            startedAt: null,
            activeLevelIndex: 0,
            levelDurationSeconds: clamp(
              Number(options.blindLevelMinutes || 10) * 60,
              60,
              3600,
            ),
            schedule: buildTournamentBlindSchedule(smallBlind, bigBlind),
          }
        : null,
    roles: {
      platform: Object.keys(ROLE_PERMISSIONS),
      gameActors: ["player", "spectator", "dealer_system"],
      userRole,
      current: getRoleDetails(userRole),
      catalog: ROLE_PERMISSIONS,
      dealer: {
        id: "dealer-system",
        name: "Dealer System",
        actorRole: "dealer_system",
      },
    },
    players: hostAsSpectator
      ? []
      : [
          createPlayer({
            id: options.playerId || "human-1",
            name: playerName,
            profileImage: options.profileImage,
            type: "human",
            platformRole: userRole,
            stack: startingStack,
            seat: 1,
          }),
        ],
    dealerIndex: -1,
    smallBlindIndex: null,
    bigBlindIndex: null,
    currentPlayerIndex: null,
    deck: [],
    community: [],
    pot: 0,
    currentBet: 0,
    minRaise: bigBlind,
    phase: "waiting",
    winners: [],
    showdown: [],
    message: "",
    events: [],
  };

  const firstBotIndex = hostAsSpectator ? 0 : 1;
  for (let index = firstBotIndex; index < seatCount; index += 1) {
    table.players.push(
      createPlayer({
        id: fillWithBots ? `bot-${index}` : `open-${index + 1}`,
        name: fillWithBots
          ? BOT_NAMES[hostAsSpectator ? index : index - 1] || `Bot ${index + 1}`
          : `Open Seat ${index + 1}`,
        type: fillWithBots ? "bot" : "open",
        platformRole: "player",
        stack: fillWithBots ? startingStack : 0,
        seat: index + 1,
        personality: fillWithBots ? botStyle : null,
      }),
    );
  }

  table.events.push(`${table.name} opened with ${seatCount} seats.`);
  table.events.push(`${capitalize(mode)} card mode selected.`);
  if (table.tournament) {
    table.events.push(
      `Tournament structure selected: ${table.tournament.levelDurationSeconds / 60} minute blind levels.`,
    );
  }
  table.events.push(`${table.roles.dealer.name} is assigned as dealer_system.`);
  startNextPokerHand(table, rng);
  return table;
}

function joinPokerTable(table, options = {}) {
  const playerId = String(options.playerId || "").trim();
  const playerName = cleanName(options.playerName || "Player");
  const hasRequestedSeat = options.seat !== undefined && options.seat !== null;
  const requestedSeat = Number(options.seat);

  if (!playerId) {
    throw createPokerError(400, "Player identity is required.");
  }
  if (hasRequestedSeat && !Number.isInteger(requestedSeat)) {
    throw createPokerError(400, "Choose a valid available seat.");
  }

  const existingPlayer = table.players.find((player) => player.id === playerId);
  if (existingPlayer) {
    return existingPlayer;
  }

  const openSeat = hasRequestedSeat
    ? table.players.find(
        (player) =>
          player.seat === requestedSeat && (player.type === "bot" || player.type === "open"),
      )
    : table.players.find((player) => player.type === "bot" || player.type === "open");
  if (!openSeat) {
    throw createPokerError(
      409,
      hasRequestedSeat
        ? `Seat ${requestedSeat} is no longer available. Choose another open seat.`
        : "This table has no open player seats.",
    );
  }

  const oldName = openSeat.name;
  openSeat.id = playerId;
  openSeat.name = playerName;
  openSeat.profileImage = normalizeProfileImage(options.profileImage);
  openSeat.type = "human";
  openSeat.platformRole = "player";
  openSeat.stack = table.config.startingStack;
  openSeat.folded = table.status === "playing";
  openSeat.lastAction = table.status === "playing" ? "Sitting out until next hand" : "";
  table.events.push(
    oldName.startsWith("Open Seat")
      ? `${playerName} joined seat ${openSeat.seat}.`
      : `${playerName} joined seat ${openSeat.seat}, replacing ${oldName}.`,
  );
  if (table.status === "waiting" && table.players.filter(canReceiveCards).length >= 2) {
    startNextPokerHand(table);
  }
  setTurnMessage(table);
  return openSeat;
}

function createPlayer({ id, name, profileImage, type, platformRole, stack, seat, personality }) {
  return {
    id,
    name,
    profileImage: normalizeProfileImage(profileImage),
    type,
    platformRole,
    actorRole: "player",
    seat,
    stack,
    hole: [],
    bet: 0,
    totalCommitted: 0,
    folded: false,
    allIn: false,
    acted: false,
    lastAction: "",
    handRank: null,
    personality: type === "bot" ? normalizeBotStyle(personality) : null,
  };
}

function normalizeProfileImage(value) {
  const profileImage = String(value || "");
  return /^data:image\/(?:jpeg|png|webp);base64,[a-z0-9+/=]+$/i.test(profileImage)
    ? profileImage
    : null;
}

function startNextPokerHand(table, rng = Math.random) {
  const eligiblePlayers = table.players.filter((player) => player.stack > 0);

  if (eligiblePlayers.length < 2) {
    table.status = "waiting";
    table.phase = "waiting";
    table.currentPlayerIndex = null;
    table.message = "At least two funded seats are needed for the next hand.";
    table.events.push("The table is waiting for more funded seats.");
    return table;
  }

  syncTournamentClock(table, Date.now(), true);
  table.status = "playing";
  table.phase = "preflop";
  table.handNumber += 1;
  table.deck = shuffle(buildDeck(), rng);
  table.community = [];
  table.pot = 0;
  table.currentBet = 0;
  table.minRaise = table.config.bigBlind;
  table.winners = [];
  table.showdown = [];

  for (const player of table.players) {
    player.hole = [];
    player.bet = 0;
    player.totalCommitted = 0;
    player.folded = player.stack <= 0;
    player.allIn = false;
    player.acted = false;
    player.lastAction = player.folded ? "Sitting out" : "";
    player.handRank = null;
  }

  table.dealerIndex = nextSeatIndex(table, table.dealerIndex, (player) => player.stack > 0);
  const activeCount = countContenders(table);
  table.smallBlindIndex =
    activeCount === 2 ? table.dealerIndex : nextSeatIndex(table, table.dealerIndex, canReceiveCards);
  table.bigBlindIndex = nextSeatIndex(table, table.smallBlindIndex, canReceiveCards);

  for (let round = 0; round < 2; round += 1) {
    for (let offset = 1; offset <= table.players.length; offset += 1) {
      const index = (table.dealerIndex + offset) % table.players.length;
      const player = table.players[index];
      if (canReceiveCards(player)) {
        player.hole.push(table.deck.pop());
      }
    }
  }

  postBlind(table, table.smallBlindIndex, table.config.smallBlind, "small blind");
  postBlind(table, table.bigBlindIndex, table.config.bigBlind, "big blind");
  table.currentBet = Math.max(...table.players.map((player) => player.bet));

  table.currentPlayerIndex = nextActionableIndex(table, table.bigBlindIndex);
  table.events.push(`Hand ${table.handNumber} started.`);
  setTurnMessage(table);

  return table;
}

function performPokerAction(table, actionPayload = {}, rng = Math.random, actorPlayerId = null) {
  if (table.status !== "playing") {
    throw createPokerError(409, "Start a new hand before acting.");
  }

  const player = table.players[table.currentPlayerIndex];
  if (!player || player.type !== "human") {
    throw createPokerError(409, "The table is waiting on another seat.");
  }
  if (actorPlayerId && player.id !== actorPlayerId) {
    throw createPokerError(403, "It is not your turn.");
  }

  applyAction(table, actionPayload, rng);
  return table;
}

function performNextPokerBotAction(table, rng = Math.random) {
  if (table.status !== "playing") {
    return table;
  }

  const bot = table.players[table.currentPlayerIndex];
  if (!bot || bot.type !== "bot") {
    return table;
  }

  const action = chooseBotAction(table, bot, rng);
  applyAction(table, action, rng);
  return table;
}

function playPokerBots(table, rng = Math.random) {
  let guard = 0;

  while (table.status === "playing" && table.players[table.currentPlayerIndex]?.type === "bot" && guard < 80) {
    guard += 1;
    performNextPokerBotAction(table, rng);
  }

  return table;
}

function applyAction(table, actionPayload = {}, rng = Math.random) {
  const player = table.players[table.currentPlayerIndex];
  if (!player || player.folded || player.allIn) {
    throw createPokerError(409, "That seat cannot act right now.");
  }

  const action = String(actionPayload.action || "").toLowerCase();
  const amount = Number(actionPayload.amount || 0);
  const callAmount = amountToCall(table, player);

  if (action === "fold") {
    player.folded = true;
    player.acted = true;
    player.lastAction = "Fold";
    table.events.push(`${player.name} folded.`);
    recordBotTrainingAction(table, player, "fold");
    settleAfterAction(table, rng);
    return table;
  }

  if (action === "check") {
    if (callAmount > 0) {
      throw createPokerError(409, "Checking is only available when there is nothing to call.");
    }
    player.acted = true;
    player.lastAction = "Check";
    table.events.push(`${player.name} checked.`);
    recordBotTrainingAction(table, player, "check");
    settleAfterAction(table, rng);
    return table;
  }

  if (action === "call") {
    if (callAmount <= 0) {
      player.acted = true;
      player.lastAction = "Check";
      table.events.push(`${player.name} checked.`);
      recordBotTrainingAction(table, player, "check");
    } else {
      const committed = commitChips(player, callAmount);
      player.acted = true;
      player.lastAction = player.allIn && committed < callAmount ? `All in ${committed}` : `Call ${committed}`;
      table.events.push(`${player.name} called ${committed}.`);
      recordBotTrainingAction(table, player, "call");
    }
    settleAfterAction(table, rng);
    return table;
  }

  if (action === "bet") {
    if (table.currentBet > 0 || callAmount > 0) {
      throw createPokerError(409, "Use raise when there is already a live bet.");
    }

    const targetBet = Math.floor(amount);
    if (!Number.isFinite(targetBet) || targetBet <= 0) {
      throw createPokerError(400, "Bet amount is required.");
    }
    if (targetBet < table.config.bigBlind && targetBet < player.bet + player.stack) {
      throw createPokerError(400, `The minimum bet is ${table.config.bigBlind}.`);
    }

    commitChips(player, targetBet - player.bet);
    table.currentBet = player.bet;
    table.minRaise = Math.max(table.config.bigBlind, player.bet);
    resetOtherActors(table, player);
    player.acted = true;
    player.lastAction = player.allIn ? `All in ${player.bet}` : `Bet ${player.bet}`;
    table.events.push(`${player.name} bet ${player.bet}.`);
    recordBotTrainingAction(table, player, "bet");
    settleAfterAction(table, rng);
    return table;
  }

  if (action === "raise") {
    const targetBet = Math.floor(amount);
    const maxBet = player.bet + player.stack;
    const minRaiseTo = table.currentBet + table.minRaise;

    if (!Number.isFinite(targetBet) || targetBet <= table.currentBet) {
      throw createPokerError(400, "Raise amount must be higher than the current bet.");
    }
    if (targetBet < minRaiseTo && targetBet < maxBet) {
      throw createPokerError(400, `The minimum raise is to ${minRaiseTo}.`);
    }

    const previousBet = table.currentBet;
    commitChips(player, targetBet - player.bet);

    if (player.bet > previousBet) {
      table.currentBet = player.bet;
      table.minRaise = Math.max(table.config.bigBlind, player.bet - previousBet);
      resetOtherActors(table, player);
    }

    player.acted = true;
    player.lastAction = player.allIn ? `All in ${player.bet}` : `Raise to ${player.bet}`;
    table.events.push(`${player.name} raised to ${player.bet}.`);
    recordBotTrainingAction(table, player, "raise");
    settleAfterAction(table, rng);
    return table;
  }

  if (action === "all-in" || action === "allin") {
    const previousBet = table.currentBet;
    const committed = commitChips(player, player.stack);

    if (player.bet > previousBet) {
      table.currentBet = player.bet;
      table.minRaise = Math.max(table.config.bigBlind, player.bet - previousBet);
      resetOtherActors(table, player);
    }

    player.acted = true;
    player.lastAction = `All in ${committed}`;
    table.events.push(`${player.name} moved all in for ${committed}.`);
    recordBotTrainingAction(table, player, "all-in");
    settleAfterAction(table, rng);
    return table;
  }

  throw createPokerError(400, "Unknown poker action.");
}

function settleAfterAction(table, rng) {
  if (countUnfolded(table) === 1) {
    awardFoldedPot(table);
    return;
  }

  if (shouldFastForwardShowdown(table)) {
    collectBets(table);
    dealRemainingBoard(table);
    awardShowdown(table);
    return;
  }

  if (isBettingRoundComplete(table)) {
    advanceStreet(table, rng);
    return;
  }

  table.currentPlayerIndex = nextActionableIndex(table, table.currentPlayerIndex);
  setTurnMessage(table);
}

function advanceStreet(table, rng) {
  collectBets(table);

  if (table.phase === "river") {
    awardShowdown(table);
    return;
  }

  if (table.phase === "preflop") {
    table.community.push(table.deck.pop(), table.deck.pop(), table.deck.pop());
    table.phase = "flop";
    table.events.push(`Flop: ${table.community.map(cardLabel).join(" ")}.`);
  } else if (table.phase === "flop") {
    table.community.push(table.deck.pop());
    table.phase = "turn";
    table.events.push(`Turn: ${cardLabel(table.community[3])}.`);
  } else if (table.phase === "turn") {
    table.community.push(table.deck.pop());
    table.phase = "river";
    table.events.push(`River: ${cardLabel(table.community[4])}.`);
  }

  table.currentBet = 0;
  table.minRaise = table.config.bigBlind;
  for (const player of table.players) {
    if (!player.folded && !player.allIn) {
      player.acted = false;
    }
  }

  if (shouldFastForwardShowdown(table)) {
    dealRemainingBoard(table);
    awardShowdown(table);
    return;
  }

  table.currentPlayerIndex = firstPostFlopActor(table);
  setTurnMessage(table);

  if (!table.players[table.currentPlayerIndex]) {
    awardShowdown(table);
  }
}

function chooseBotAction(table, bot, rng = Math.random) {
  const legal = getLegalActions(table, table.currentPlayerIndex);
  const strength = estimateStrength(bot, table.community);
  const pressure = legal.callAmount / Math.max(1, bot.stack + bot.bet);
  const personality = resolveBotPersonality(table, bot);
  const roll = rng();

  if (legal.callAmount > 0) {
    if (legal.callAmount >= bot.stack) {
      return strength > personality.allInCallStrength || roll > personality.allInCallRollAbove
        ? { action: "call" }
        : { action: "fold" };
    }

    if (strength > personality.raiseStrength && legal.canRaise && roll > personality.raiseRollAbove) {
      return { action: "raise", amount: Math.min(legal.maxBet, legal.minRaiseTo) };
    }

    if (
      strength < personality.foldStrength &&
      pressure > personality.pressureFold &&
      roll < personality.foldRollBelow
    ) {
      return { action: "fold" };
    }

    return { action: "call" };
  }

  if (strength > personality.betStrength && legal.canBet && roll > personality.betRollAbove) {
    const potTarget = Math.floor(Math.max(totalPot(table), table.config.bigBlind) * personality.betPotRatio);
    const target = Math.min(legal.maxBet, Math.max(legal.minBet, potTarget));
    return { action: "bet", amount: target };
  }

  if (legal.canBet && roll < personality.bluffChance) {
    return { action: "bet", amount: Math.min(legal.maxBet, legal.minBet) };
  }

  return { action: "check" };
}

function estimateStrength(player, community) {
  if (community.length >= 3 && player.hole.length + community.length >= 5) {
    const best = evaluateBestHand([...player.hole, ...community]);
    return Math.min(0.98, 0.18 + best.rank[0] / 8 + best.rank[1] / 100);
  }

  const [first, second] = player.hole;
  if (!first || !second) {
    return 0.4;
  }

  let score = 0.22;
  const high = Math.max(first.rankValue, second.rankValue);
  const low = Math.min(first.rankValue, second.rankValue);
  score += high / 28;

  if (first.rank === second.rank) {
    score += 0.34 + high / 80;
  }
  if (first.suit === second.suit) {
    score += 0.08;
  }
  if (Math.abs(first.rankValue - second.rankValue) <= 1) {
    score += 0.07;
  }
  if (low >= 10) {
    score += 0.12;
  }

  return Math.min(0.94, score);
}

function createBotTrainingState(botStyle) {
  const selectedStyle = normalizeBotStyle(botStyle);
  return {
    enabled: selectedStyle === "adaptive",
    selectedStyle,
    currentStyle: "balanced",
    read: selectedStyle === "adaptive" ? "Collecting your tendencies." : "",
    counts: {
      actions: 0,
      folds: 0,
      calls: 0,
      checks: 0,
      bets: 0,
      raises: 0,
      allIns: 0,
    },
  };
}

function recordBotTrainingAction(table, player, action) {
  if (!table.botTraining?.enabled || player.type !== "human") {
    return;
  }

  const counts = table.botTraining.counts;
  counts.actions += 1;

  if (action === "fold") counts.folds += 1;
  if (action === "call") counts.calls += 1;
  if (action === "check") counts.checks += 1;
  if (action === "bet") counts.bets += 1;
  if (action === "raise") counts.raises += 1;
  if (action === "all-in") counts.allIns += 1;

  const previousStyle = table.botTraining.currentStyle;
  const nextStyle = getAdaptiveCounterStyle(table.botTraining);
  table.botTraining.currentStyle = nextStyle;
  table.botTraining.read = describeAdaptiveRead(table.botTraining, nextStyle);

  if (previousStyle !== nextStyle && counts.actions >= 3) {
    table.events.push(`Adaptive bots shifted to ${BOT_PERSONALITIES[nextStyle].label.toLowerCase()} pressure.`);
  }
}

function getAdaptiveCounterStyle(training) {
  const counts = training?.counts || {};
  const actions = Math.max(0, Number(counts.actions) || 0);

  if (actions < 3) {
    return "balanced";
  }

  const aggressionRate = ((counts.bets || 0) + (counts.raises || 0) + (counts.allIns || 0)) / actions;
  const foldRate = (counts.folds || 0) / actions;
  const passiveRate = ((counts.calls || 0) + (counts.checks || 0)) / actions;
  const callRate = (counts.calls || 0) / actions;

  if (foldRate >= 0.42) {
    return "aggressive";
  }
  if (aggressionRate >= 0.38) {
    return "tight";
  }
  if (passiveRate >= 0.68) {
    return "aggressive";
  }
  if (callRate >= 0.42 && aggressionRate < 0.22) {
    return "tight";
  }
  return "balanced";
}

function describeAdaptiveRead(training, style) {
  const actions = training?.counts?.actions || 0;
  if (actions < 3) {
    return "Collecting your tendencies.";
  }
  if (style === "aggressive") {
    return "You are giving up or playing passively, so bots are applying pressure.";
  }
  if (style === "tight") {
    return "You are attacking or calling often, so bots are waiting for stronger spots.";
  }
  return "Your decisions look balanced, so bots are mixing their lines.";
}

function resolveBotPersonality(table, bot = {}) {
  const selectedStyle = normalizeBotStyle(bot.personality || table.config?.botStyle);
  const effectiveStyle =
    selectedStyle === "adaptive"
      ? getAdaptiveCounterStyle(table.botTraining)
      : selectedStyle;
  const details = getBotPersonalityDetails(effectiveStyle);

  if (selectedStyle === "adaptive" && table.botTraining) {
    table.botTraining.currentStyle = effectiveStyle;
    table.botTraining.read = describeAdaptiveRead(table.botTraining, effectiveStyle);
    return {
      ...details,
      selectedStyle,
      effectiveStyle,
      label: `Adaptive: ${details.label}`,
      description: table.botTraining.read,
    };
  }

  return {
    ...details,
    selectedStyle,
    effectiveStyle,
  };
}

function postBlind(table, playerIndex, amount, label) {
  const player = table.players[playerIndex];
  const committed = commitChips(player, amount);
  player.acted = false;
  player.lastAction = `${capitalize(label)} ${committed}`;
  table.events.push(`${player.name} posted ${label} ${committed}.`);
}

function commitChips(player, amount) {
  const chips = Math.max(0, Math.min(player.stack, Math.floor(amount)));
  player.stack -= chips;
  player.bet += chips;
  player.totalCommitted += chips;
  if (player.stack === 0) {
    player.allIn = true;
  }
  return chips;
}

function collectBets(table) {
  const liveBets = table.players.reduce((sum, player) => sum + player.bet, 0);
  table.pot += liveBets;

  for (const player of table.players) {
    player.bet = 0;
  }

  table.currentBet = 0;
}

function awardFoldedPot(table) {
  collectBets(table);
  const winner = table.players.find((player) => !player.folded);
  if (!winner) {
    return;
  }

  winner.stack += table.pot;
  table.winners = [
    {
      playerId: winner.id,
      name: winner.name,
      amount: table.pot,
      handLabel: "Won by fold",
    },
  ];
  table.events.push(`${winner.name} won ${table.pot} after everyone else folded.`);
  table.message = `${winner.name} wins the pot.`;
  table.pot = 0;
  table.status = "hand-complete";
  table.phase = "showdown";
  table.currentPlayerIndex = null;
}

function awardShowdown(table) {
  collectBets(table);

  const contenders = table.players.filter((player) => !player.folded);
  for (const player of contenders) {
    const best = evaluateBestHand([...player.hole, ...table.community]);
    player.handRank = {
      label: best.label,
      rank: best.rank,
      cards: best.cards,
    };
  }

  const bestRank = contenders
    .map((player) => player.handRank.rank)
    .sort(compareRanks)
    .at(-1);
  const winners = contenders.filter((player) => compareRanks(player.handRank.rank, bestRank) === 0);
  const share = Math.floor(table.pot / winners.length);
  let remainder = table.pot - share * winners.length;

  for (const winner of winners) {
    const payout = share + (remainder > 0 ? 1 : 0);
    remainder -= remainder > 0 ? 1 : 0;
    winner.stack += payout;
  }

  table.winners = winners.map((winner) => ({
    playerId: winner.id,
    name: winner.name,
    amount: share,
    handLabel: winner.handRank.label,
  }));
  table.showdown = contenders.map((player) => ({
    playerId: player.id,
    name: player.name,
    handLabel: player.handRank.label,
    cards: player.handRank.cards.map(serializeCard),
  }));
  table.message =
    winners.length === 1
      ? `${winners[0].name} wins with ${winners[0].handRank.label}.`
      : `${winners.map((winner) => winner.name).join(" and ")} split the pot.`;
  table.events.push(table.message);
  table.pot = 0;
  table.status = "hand-complete";
  table.phase = "showdown";
  table.currentPlayerIndex = null;
}

function dealRemainingBoard(table) {
  while (table.community.length < 5) {
    table.community.push(table.deck.pop());
  }
  table.phase = "river";
  table.events.push(`Board ran out: ${table.community.map(cardLabel).join(" ")}.`);
}

function isBettingRoundComplete(table) {
  const actors = table.players.filter((player) => !player.folded && !player.allIn);

  if (actors.length === 0) {
    return true;
  }

  return actors.every((player) => player.acted && player.bet === table.currentBet);
}

function shouldFastForwardShowdown(table) {
  return countUnfolded(table) > 1 && table.players.filter((player) => !player.folded && !player.allIn).length <= 1;
}

function resetOtherActors(table, actor) {
  for (const player of table.players) {
    if (player !== actor && !player.folded && !player.allIn) {
      player.acted = false;
    }
  }
}

function firstPostFlopActor(table) {
  return nextActionableIndex(table, table.dealerIndex);
}

function nextActionableIndex(table, fromIndex) {
  return nextSeatIndex(table, fromIndex, (player) => !player.folded && !player.allIn && player.stack > 0);
}

function nextSeatIndex(table, fromIndex, predicate) {
  for (let offset = 1; offset <= table.players.length; offset += 1) {
    const index = (fromIndex + offset + table.players.length) % table.players.length;
    if (predicate(table.players[index], index)) {
      return index;
    }
  }
  return null;
}

function canReceiveCards(player) {
  return player.stack > 0;
}

function countContenders(table) {
  return table.players.filter(canReceiveCards).length;
}

function countUnfolded(table) {
  return table.players.filter((player) => !player.folded).length;
}

function amountToCall(table, player) {
  return Math.max(0, table.currentBet - player.bet);
}

function totalPot(table) {
  return table.pot + table.players.reduce((sum, player) => sum + player.bet, 0);
}

function setTurnMessage(table) {
  const player = table.players[table.currentPlayerIndex];
  if (!player) {
    table.message = "The hand is settling.";
    return;
  }

  table.message = player.type === "bot" ? `${player.name} is thinking...` : `${player.name}'s turn.`;
}

function getLegalActions(table, playerIndex = table.currentPlayerIndex) {
  const player = table.players[playerIndex];
  if (!player || table.status !== "playing" || player.folded || player.allIn) {
    return {
      canFold: false,
      canCheck: false,
      canCall: false,
      canBet: false,
      canRaise: false,
      canAllIn: false,
      callAmount: 0,
      minBet: table.config.bigBlind,
      minRaiseTo: table.currentBet + table.minRaise,
      maxBet: 0,
      currentBet: table.currentBet,
      potTotal: totalPot(table),
    };
  }

  const callAmount = amountToCall(table, player);
  const maxBet = player.bet + player.stack;
  const minRaiseTo = table.currentBet + table.minRaise;

  return {
    canFold: callAmount > 0,
    canCheck: callAmount === 0,
    canCall: callAmount > 0 && player.stack > 0,
    canBet: callAmount === 0 && table.currentBet === 0 && player.stack > 0,
    canRaise: table.currentBet > 0 && maxBet > table.currentBet,
    canAllIn: player.stack > 0,
    callAmount,
    minBet: Math.min(maxBet, table.config.bigBlind),
    minRaiseTo: Math.min(maxBet, minRaiseTo),
    maxBet,
    currentBet: table.currentBet,
    potTotal: totalPot(table),
  };
}

function buildWinChanceMap(table, revealOpponents, viewerPlayerId = null) {
  const chances = new Map();

  for (const player of table.players) {
    chances.set(player.id, createWinChance(null, "hidden"));
    if (player.folded) {
      chances.set(player.id, createWinChance(0, "folded"));
    }
  }

  if (table.status !== "playing") {
    return buildFinalWinChanceMap(table, chances);
  }

  const contenders = table.players.filter((player) => !player.folded && player.hole.length === 2);
  if (contenders.length === 0) {
    return chances;
  }

  if (contenders.length === 1) {
    chances.set(contenders[0].id, createWinChance(100, "locked"));
    return chances;
  }

  if (revealOpponents) {
    return estimateKnownWinChances(table, contenders, chances);
  }

  // Masked mode should not leak opponent hole-card strength through percentages.
  const viewer =
    contenders.find((player) => player.id === viewerPlayerId) ||
    (!viewerPlayerId ? contenders.find((player) => player.type === "human") : null);
  if (viewer) {
    chances.set(
      viewer.id,
      createWinChance(estimateHumanChanceAgainstUnknown(table, viewer, contenders.length), "estimated"),
    );
  }

  return chances;
}

function buildFinalWinChanceMap(table, chances) {
  if (!table.winners.length) {
    return chances;
  }

  for (const player of table.players) {
    chances.set(player.id, createWinChance(0, "final"));
  }

  const values = distributeRoundedPercentages(
    table.winners.map((winner) => ({
      id: winner.playerId,
      value: 100 / table.winners.length,
    })),
  );

  for (const [playerId, percent] of values.entries()) {
    chances.set(playerId, createWinChance(percent, "final"));
  }

  return chances;
}

function estimateKnownWinChances(table, contenders, chances) {
  const missingBoardCards = Math.max(0, 5 - table.community.length);
  const remainingCards = remainingDeckCards(table);
  const maxSamples = missingBoardCards <= 2 ? 1_200 : 96;
  const boardCompletions = sampleBoardCompletions(remainingCards, missingBoardCards, maxSamples);
  const wins = new Map(contenders.map((player) => [player.id, 0]));

  for (const completion of boardCompletions) {
    const board = [...table.community, ...completion];
    const ranks = contenders.map((player) => ({
      player,
      rank: evaluateBestHand([...player.hole, ...board]).rank,
    }));
    const bestRank = ranks.map((entry) => entry.rank).sort(compareRanks).at(-1);
    const winners = ranks.filter((entry) => compareRanks(entry.rank, bestRank) === 0);
    const share = 1 / winners.length;

    for (const winner of winners) {
      wins.set(winner.player.id, wins.get(winner.player.id) + share);
    }
  }

  const values = distributeRoundedPercentages(
    contenders.map((player) => ({
      id: player.id,
      value: (wins.get(player.id) / boardCompletions.length) * 100,
    })),
  );

  for (const player of contenders) {
    chances.set(player.id, createWinChance(values.get(player.id) || 0, "estimated"));
  }

  return chances;
}

function estimateHumanChanceAgainstUnknown(table, human, contenderCount) {
  const baseline = 1 / Math.max(1, contenderCount);
  const progressWeight = 0.56 + table.community.length * 0.08;
  const centeredStrength = (estimateStrength(human, table.community) - 0.5) * progressWeight;
  return clamp(Math.round((baseline + centeredStrength) * 100), 1, 99);
}

function buildLiveLearningCoach(table, options = {}) {
  if (!table.config?.liveLearningMode || !options.human) {
    return null;
  }

  const human = options.human;
  const legal = options.legalActions || getLegalActions(table, table.currentPlayerIndex);
  const winChance = options.winChance || createWinChance(null, "hidden");
  const strength = estimateStrength(human, table.community);
  const activeBotPersonalities = new Set(
    table.players
      .filter((player) => player.type === "bot")
      .map((player) => serializeBotPersonality(table, player).label),
  );
  const callAmount = legal.callAmount || amountToCall(table, human);
  const potTotal = totalPot(table);
  const potOdds = callAmount > 0 ? Math.round((callAmount / Math.max(1, potTotal + callAmount)) * 100) : 0;
  const tips = [
    `Hand read: ${describeHandStrength(strength)} for ${table.phase}.`,
    callAmount > 0
      ? `Pot odds: call ${callAmount} to chase a pot of ${potTotal}; you need about ${potOdds}% equity.`
      : "No bet to call right now, so checking controls the pot and betting applies pressure.",
  ];

  if (winChance.percent != null) {
    tips.push(`Current win chance estimate is ${winChance.percent}%.`);
  } else if (table.mode === "masked") {
    tips.push("Masked mode hides opponent cards, so treat win chance as an estimate rather than a full read.");
  }

  if (table.botTraining?.enabled) {
    tips.push(table.botTraining.read || "Adaptive bots are collecting your tendencies.");
  } else if (activeBotPersonalities.size) {
    tips.push(`Bot table style: ${Array.from(activeBotPersonalities).join(", ")}.`);
  }

  return {
    enabled: true,
    title: "Live Learning Mode",
    badge: options.isViewerTurn ? "Decision coach" : "Table coach",
    recommendation: buildLearningRecommendation(table, human, legal, strength, winChance, potOdds),
    tips,
  };
}

function describeHandStrength(strength) {
  if (strength >= 0.78) return "strong";
  if (strength >= 0.58) return "playable";
  if (strength >= 0.42) return "speculative";
  return "weak";
}

function buildLearningRecommendation(table, human, legal, strength, winChance, potOdds) {
  if (table.status === "hand-complete") {
    const wonHand = table.winners.some((winner) => winner.playerId === human.id);
    return wonHand
      ? "Review why this hand won before the next hand starts."
      : "Review the showdown and note whether the losing decision was preflop, flop, turn, or river.";
  }

  if (!legal.canFold && !legal.canCheck && !legal.canCall && !legal.canBet && !legal.canRaise) {
    const currentPlayer = table.players[table.currentPlayerIndex];
    return currentPlayer?.type === "bot"
      ? `Watch ${currentPlayer.name}'s action and compare it with the pot size.`
      : "Watch the action and prepare your next decision.";
  }

  if (legal.callAmount > 0) {
    if (winChance.percent != null && winChance.percent >= potOdds + 10) {
      return "Calling is reasonable because your estimated equity is above the price of the call.";
    }
    if (strength >= 0.72 && legal.canRaise) {
      return "Raising can build value with a strong hand, especially against calling bots.";
    }
    if (strength < 0.42 && legal.callAmount > table.config.bigBlind) {
      return "Folding is reasonable when a weak hand faces meaningful pressure.";
    }
    return "Calling keeps you in the hand; folding protects chips if the story does not make sense.";
  }

  if (strength >= 0.74 && (legal.canBet || legal.canRaise)) {
    return "Consider betting for value because your hand is ahead often enough to charge weaker hands.";
  }
  if (strength <= 0.4 && legal.canCheck) {
    return "Checking is a low-risk choice with a weak or uncertain hand.";
  }
  if (legal.canBet) {
    return "A small bet can win the pot now, but checking keeps the pot controlled.";
  }
  return "Choose the action that fits your hand strength, position, and pot odds.";
}

function remainingDeckCards(table) {
  const knownCardIds = new Set();
  for (const card of table.community) {
    knownCardIds.add(card.id);
  }
  for (const player of table.players) {
    for (const card of player.hole) {
      knownCardIds.add(card.id);
    }
  }
  return buildDeck().filter((card) => !knownCardIds.has(card.id));
}

function sampleBoardCompletions(cards, size, maxSamples) {
  if (size <= 0) {
    return [[]];
  }

  if (combinationCount(cards.length, size) <= maxSamples) {
    return combinations(cards, size);
  }

  const samples = [];
  const seen = new Set();
  let attempt = 0;

  while (samples.length < maxSamples && attempt < maxSamples * 25) {
    const pool = [...cards];
    const picked = [];
    let seed = (0x9e3779b9 ^ (attempt * 0x85ebca6b) ^ (cards.length << 8) ^ size) >>> 0;

    for (let pickIndex = 0; pickIndex < size; pickIndex += 1) {
      seed = nextSampleSeed(seed);
      const swapIndex = pickIndex + (seed % (pool.length - pickIndex));
      [pool[pickIndex], pool[swapIndex]] = [pool[swapIndex], pool[pickIndex]];
      picked.push(pool[pickIndex]);
    }

    const key = picked.map((card) => card.id).sort().join("|");
    if (picked.length === size && !seen.has(key)) {
      seen.add(key);
      samples.push(picked);
    }
    attempt += 1;
  }

  return samples.length ? samples : [cards.slice(0, size)];
}

function nextSampleSeed(seed) {
  return (seed * 1_664_525 + 1_013_904_223) >>> 0;
}

function combinationCount(total, size) {
  if (size < 0 || size > total) {
    return 0;
  }

  const selected = Math.min(size, total - size);
  let count = 1;
  for (let index = 1; index <= selected; index += 1) {
    count = (count * (total - selected + index)) / index;
  }
  return count;
}

function distributeRoundedPercentages(values) {
  if (!values.length) {
    return new Map();
  }

  const floors = values.map((entry) => ({
    id: entry.id,
    floor: Math.floor(entry.value),
    remainder: entry.value - Math.floor(entry.value),
  }));
  let remaining = 100 - floors.reduce((sum, entry) => sum + entry.floor, 0);
  const byRemainder = [...floors].sort((first, second) => second.remainder - first.remainder);

  for (const entry of byRemainder) {
    if (remaining <= 0) break;
    entry.floor += 1;
    remaining -= 1;
  }

  return new Map(floors.map((entry) => [entry.id, clamp(entry.floor, 0, 100)]));
}

function createWinChance(percent, confidence) {
  return {
    percent,
    label: percent == null ? "--" : `${percent}%`,
    confidence,
  };
}

function serializePokerTable(table, options = {}) {
  const tournament = syncTournamentClock(table);
  const mode = normalizeTableMode(table.mode);
  const spectatorView = Boolean(options.spectatorView);
  const viewerMode = options.viewerMode || (spectatorView ? "spectator" : "player");
  const revealAll = table.status !== "playing" || options.revealAll;
  const revealOpponents = revealAll || mode === "unmasked";
  const viewerPlayerId = spectatorView ? null : options.viewerPlayerId || null;
  const winChances = buildWinChanceMap(table, revealOpponents, viewerPlayerId);
  const userRole = normalizeRole(options.viewerRole || table.roles?.userRole);
  const currentPlayer = table.players[table.currentPlayerIndex];
  const isViewerTurn =
    !spectatorView &&
    table.status === "playing" &&
    currentPlayer?.type === "human" &&
    (!viewerPlayerId || currentPlayer.id === viewerPlayerId);
  const viewer = viewerPlayerId ? table.players.find((player) => player.id === viewerPlayerId) : null;
  const legalActions = getLegalActions(table, isViewerTurn ? table.currentPlayerIndex : -1);

  return {
    id: table.id,
    roomCode: table.roomCode || "",
    name: table.name,
    variant: table.variant,
    mode,
    chipMode: table.chipMode || "virtual-chips",
    status: table.status,
    phase: table.phase,
    handNumber: table.handNumber,
    config: {
      ...table.config,
      mode,
      chipMode: table.config?.chipMode || table.chipMode || "virtual-chips",
      botStyle: normalizeBotStyle(table.config?.botStyle),
      liveLearningMode: Boolean(table.config?.liveLearningMode),
    },
    botTraining: serializeBotTraining(table),
    learningCoach: buildLiveLearningCoach(table, {
      human: viewer,
      isViewerTurn,
      legalActions,
      winChance: viewer ? winChances.get(viewer.id) : null,
    }),
    tournament,
    roles: {
      ...table.roles,
      userRole,
      current: getRoleDetails(userRole),
      catalog: ROLE_PERMISSIONS,
    },
    dealerIndex: table.dealerIndex,
    smallBlindIndex: table.smallBlindIndex,
    bigBlindIndex: table.bigBlindIndex,
    currentPlayerIndex: table.currentPlayerIndex,
    currentPlayerName: currentPlayer?.name || "",
    viewerPlayerId,
    viewerMode,
    availableSeats: table.players
      .filter((player) => player.type === "bot" || player.type === "open")
      .map((player) => player.seat)
      .sort((a, b) => a - b),
    isHost: Boolean(
      (options.controllerPlayerId || viewerPlayerId) &&
        table.hostPlayerId === (options.controllerPlayerId || viewerPlayerId),
    ),
    isViewerTurn,
    isHumanTurn: isViewerTurn,
    community: table.community.map(serializeCard),
    pot: table.pot,
    potTotal: totalPot(table),
    currentBet: table.currentBet,
    legalActions,
    players: table.players.map((player, index) => ({
      id: player.id,
      name: player.name,
      profileImage: player.profileImage || null,
      type: player.type,
      platformRole: player.platformRole,
      actorRole: player.actorRole,
      personality: player.type === "bot" ? serializeBotPersonality(table, player) : null,
      seat: player.seat,
      stack: player.stack,
      bet: player.bet,
      totalCommitted: player.totalCommitted,
      folded: player.folded,
      allIn: player.allIn,
      acted: player.acted,
      lastAction: player.lastAction,
      cardCount: player.hole.length,
      isYou: Boolean(viewerPlayerId && player.id === viewerPlayerId),
      winChance: winChances.get(player.id) || createWinChance(null, "hidden"),
      hole:
        player.id === viewerPlayerId ||
        (!viewerPlayerId && !options.publicView && player.type === "human") ||
        revealOpponents
          ? player.hole.map(serializeCard)
          : player.hole.map(() => ({ hidden: true })),
      handRank: player.handRank
        ? {
            label: player.handRank.label,
            cards: player.handRank.cards.map(serializeCard),
          }
        : null,
      isDealer: index === table.dealerIndex,
      isSmallBlind: index === table.smallBlindIndex,
      isBigBlind: index === table.bigBlindIndex,
      isCurrent: index === table.currentPlayerIndex,
    })),
    winners: table.winners,
    showdown: table.showdown,
    message: isViewerTurn ? "Your turn. Choose a table action." : table.message,
    events: table.events.slice(-12),
  };
}

function serializeBotTraining(table) {
  if (!table.botTraining) {
    return null;
  }
  if (table.botTraining.enabled) {
    table.botTraining.currentStyle = getAdaptiveCounterStyle(table.botTraining);
    table.botTraining.read = describeAdaptiveRead(table.botTraining, table.botTraining.currentStyle);
  }

  return {
    enabled: Boolean(table.botTraining.enabled),
    selectedStyle: normalizeBotStyle(table.botTraining.selectedStyle),
    currentStyle: normalizeBotStyle(table.botTraining.currentStyle),
    read: table.botTraining.read || "",
    actions: table.botTraining.counts?.actions || 0,
    counts: {
      folds: table.botTraining.counts?.folds || 0,
      calls: table.botTraining.counts?.calls || 0,
      checks: table.botTraining.counts?.checks || 0,
      bets: table.botTraining.counts?.bets || 0,
      raises: table.botTraining.counts?.raises || 0,
      allIns: table.botTraining.counts?.allIns || 0,
    },
  };
}

function serializeBotPersonality(table, player) {
  const details = resolveBotPersonality(table, player);
  return {
    style: details.selectedStyle,
    effectiveStyle: details.effectiveStyle,
    label: details.label,
    description: details.description,
  };
}

function buildTournamentBlindSchedule(startingSmallBlind, startingBigBlind) {
  const multipliers = [1, 1.5, 2.5, 5, 7.5, 10, 15, 20, 30, 40, 60, 100];
  return multipliers.map((multiplier, index) => {
    const smallBlind = roundBlind(startingSmallBlind * multiplier);
    const bigBlind = Math.max(smallBlind * 2, roundBlind(startingBigBlind * multiplier));
    return {
      level: index + 1,
      smallBlind,
      bigBlind,
    };
  });
}

function syncTournamentClock(table, now = Date.now(), applyBlinds = false) {
  const tournament = table.tournament;
  if (!tournament) return null;

  if (!tournament.startedAt) {
    if (!applyBlinds) {
      return serializeTournamentState(table, 0, null);
    }
    tournament.startedAt = new Date(now).toISOString();
  }

  const startedAtMs = Date.parse(tournament.startedAt);
  const durationMs = tournament.levelDurationSeconds * 1000;
  const elapsedMs = Math.max(0, now - startedAtMs);
  const scheduledLevelIndex = Math.min(
    tournament.schedule.length - 1,
    Math.floor(elapsedMs / durationMs),
  );

  if (applyBlinds && scheduledLevelIndex !== tournament.activeLevelIndex) {
    tournament.activeLevelIndex = scheduledLevelIndex;
    const activeLevel = tournament.schedule[scheduledLevelIndex];
    table.config.smallBlind = activeLevel.smallBlind;
    table.config.bigBlind = activeLevel.bigBlind;
    table.events.push(
      `Tournament Level ${activeLevel.level}: blinds ${activeLevel.smallBlind} / ${activeLevel.bigBlind}.`,
    );
  }

  const levelEndsAt =
    scheduledLevelIndex === tournament.schedule.length - 1
      ? null
      : new Date(startedAtMs + (scheduledLevelIndex + 1) * durationMs).toISOString();
  return serializeTournamentState(table, scheduledLevelIndex, levelEndsAt, now);
}

function serializeTournamentState(table, scheduledLevelIndex, levelEndsAt, now = Date.now()) {
  const tournament = table.tournament;
  const activeLevel = tournament.schedule[tournament.activeLevelIndex];
  const scheduledLevel = tournament.schedule[scheduledLevelIndex];
  const nextLevel = tournament.schedule[scheduledLevelIndex + 1] || null;
  return {
    startedAt: tournament.startedAt,
    levelDurationSeconds: tournament.levelDurationSeconds,
    currentLevel: activeLevel,
    scheduledLevel,
    nextLevel,
    levelEndsAt,
    secondsRemaining: levelEndsAt
      ? Math.max(0, Math.ceil((Date.parse(levelEndsAt) - now) / 1000))
      : null,
    pendingLevelChange: scheduledLevelIndex !== tournament.activeLevelIndex,
  };
}

function roundBlind(value) {
  return Math.max(5, Math.round(value / 5) * 5);
}

function buildDeck() {
  const deck = [];

  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: `${rank.code}-${suit.code}`,
        type: "standard",
        rank: rank.code,
        label: rank.label,
        rankValue: rank.value,
        suit: suit.code,
        suitSymbol: suit.symbol,
        suitName: suit.name,
        color: suit.color,
      });
    }
  }

  return deck;
}

function shuffle(cards, rng = Math.random) {
  const copy = cards.map(cloneCard);

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function cloneCard(card) {
  return { ...card };
}

function createCard(rankCode, suitCode) {
  const rank = RANK_BY_CODE.get(rankCode);
  const suit = SUIT_BY_CODE.get(suitCode);

  if (!rank || !suit) {
    throw new Error(`Unknown poker card ${rankCode}${suitCode}`);
  }

  return {
    id: `${rank.code}-${suit.code}`,
    type: "standard",
    rank: rank.code,
    label: rank.label,
    rankValue: rank.value,
    suit: suit.code,
    suitSymbol: suit.symbol,
    suitName: suit.name,
    color: suit.color,
  };
}

function evaluateBestHand(cards) {
  if (!Array.isArray(cards) || cards.length < 5) {
    throw new Error("At least five cards are required to evaluate a poker hand.");
  }

  let best = null;
  const combos = combinations(cards, 5);

  for (const combo of combos) {
    const evaluated = evaluateFiveCardHand(combo);
    if (!best || compareRanks(evaluated.rank, best.rank) > 0) {
      best = evaluated;
    }
  }

  return best;
}

function evaluateFiveCardHand(cards) {
  const values = cards.map((card) => card.rankValue).sort((a, b) => b - a);
  const counts = countBy(values);
  const groups = [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((first, second) => second.count - first.count || second.value - first.value);
  const flush = cards.every((card) => card.suit === cards[0].suit);
  const straightHigh = getStraightHigh(values);

  if (flush && straightHigh) {
    return buildEvaluation(8, [straightHigh], cards);
  }

  if (groups[0].count === 4) {
    const kicker = groups.find((group) => group.count === 1).value;
    return buildEvaluation(7, [groups[0].value, kicker], cards);
  }

  if (groups[0].count === 3 && groups[1]?.count === 2) {
    return buildEvaluation(6, [groups[0].value, groups[1].value], cards);
  }

  if (flush) {
    return buildEvaluation(5, values, cards);
  }

  if (straightHigh) {
    return buildEvaluation(4, [straightHigh], cards);
  }

  if (groups[0].count === 3) {
    const kickers = groups.filter((group) => group.count === 1).map((group) => group.value);
    return buildEvaluation(3, [groups[0].value, ...kickers], cards);
  }

  if (groups[0].count === 2 && groups[1]?.count === 2) {
    const pairs = groups.filter((group) => group.count === 2).map((group) => group.value);
    const kicker = groups.find((group) => group.count === 1).value;
    return buildEvaluation(2, [...pairs, kicker], cards);
  }

  if (groups[0].count === 2) {
    const kickers = groups.filter((group) => group.count === 1).map((group) => group.value);
    return buildEvaluation(1, [groups[0].value, ...kickers], cards);
  }

  return buildEvaluation(0, values, cards);
}

function buildEvaluation(category, tiebreakers, cards) {
  return {
    label: HAND_LABELS[category],
    rank: [category, ...tiebreakers],
    cards: [...cards].sort((first, second) => second.rankValue - first.rankValue),
  };
}

function compareRanks(first, second) {
  const length = Math.max(first.length, second.length);

  for (let index = 0; index < length; index += 1) {
    const difference = (first[index] || 0) - (second[index] || 0);
    if (difference !== 0) {
      return difference;
    }
  }

  return 0;
}

function getStraightHigh(values) {
  const unique = [...new Set(values)].sort((a, b) => b - a);

  if (unique.includes(14)) {
    unique.push(1);
  }

  for (let index = 0; index <= unique.length - 5; index += 1) {
    const window = unique.slice(index, index + 5);
    if (window.every((value, offset) => offset === 0 || value === window[offset - 1] - 1)) {
      return window[0];
    }
  }

  return 0;
}

function combinations(items, size) {
  const output = [];

  function walk(start, picked) {
    if (picked.length === size) {
      output.push(picked);
      return;
    }

    for (let index = start; index <= items.length - (size - picked.length); index += 1) {
      walk(index + 1, [...picked, items[index]]);
    }
  }

  walk(0, []);
  return output;
}

function countBy(values) {
  const counts = new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return counts;
}

function serializeCard(card) {
  return {
    id: card.id,
    rank: card.rank,
    label: card.label,
    rankValue: card.rankValue,
    suit: card.suit,
    suitSymbol: card.suitSymbol,
    suitName: card.suitName,
    color: card.color,
    display: cardLabel(card),
  };
}

function cardLabel(card) {
  return `${card.label}${card.suitSymbol}`;
}

function cleanName(value) {
  return String(value || "You").trim().slice(0, 24) || "You";
}

function cleanTableName(value) {
  return String(value || "Velvet Room").trim().slice(0, 36) || "Velvet Room";
}

function normalizeTableMode(value) {
  const mode = String(value || "masked").trim().toLowerCase();
  return TABLE_MODES.includes(mode) ? mode : "masked";
}

function normalizeBotStyle(value) {
  const style = String(value || "balanced").trim().toLowerCase();
  return Object.prototype.hasOwnProperty.call(BOT_PERSONALITIES, style) ? style : "balanced";
}

function getBotPersonalityDetails(value) {
  const style = normalizeBotStyle(value);
  return {
    style,
    ...BOT_PERSONALITIES[style],
  };
}

function requiresRolePassword(role) {
  return role === "host" || role === "admin";
}

function capitalize(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

function createPokerError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

module.exports = {
  BOT_PERSONALITIES,
  buildDeck,
  shuffle,
  createCard,
  createPokerTable,
  buildTournamentBlindSchedule,
  joinPokerTable,
  startNextPokerHand,
  syncTournamentClock,
  performPokerAction,
  performNextPokerBotAction,
  playPokerBots,
  chooseBotAction,
  serializePokerTable,
  getBotPersonalityDetails,
  getLegalActions,
  evaluateBestHand,
  compareRanks,
};
