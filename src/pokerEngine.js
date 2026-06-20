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
    },
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

function createPlayer({ id, name, profileImage, type, platformRole, stack, seat }) {
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
    settleAfterAction(table, rng);
    return table;
  }

  if (action === "call") {
    if (callAmount <= 0) {
      player.acted = true;
      player.lastAction = "Check";
      table.events.push(`${player.name} checked.`);
    } else {
      const committed = commitChips(player, callAmount);
      player.acted = true;
      player.lastAction = player.allIn && committed < callAmount ? `All in ${committed}` : `Call ${committed}`;
      table.events.push(`${player.name} called ${committed}.`);
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

function chooseBotAction(table, bot, rng) {
  const legal = getLegalActions(table, table.currentPlayerIndex);
  const strength = estimateStrength(bot, table.community);
  const pressure = legal.callAmount / Math.max(1, bot.stack + bot.bet);
  const roll = rng();

  if (legal.callAmount > 0) {
    if (legal.callAmount >= bot.stack) {
      return strength > 0.55 || roll > 0.7 ? { action: "call" } : { action: "fold" };
    }

    if (strength > 0.82 && legal.canRaise && roll > 0.25) {
      return { action: "raise", amount: Math.min(legal.maxBet, legal.minRaiseTo) };
    }

    if (strength < 0.35 && pressure > 0.18 && roll < 0.72) {
      return { action: "fold" };
    }

    return { action: "call" };
  }

  if (strength > 0.76 && legal.canBet && roll > 0.35) {
    const target = Math.min(legal.maxBet, Math.max(legal.minBet, Math.floor(totalPot(table) * 0.55)));
    return { action: "bet", amount: target };
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
    },
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
    legalActions: getLegalActions(table, isViewerTurn ? table.currentPlayerIndex : -1),
    players: table.players.map((player, index) => ({
      id: player.id,
      name: player.name,
      profileImage: player.profileImage || null,
      type: player.type,
      platformRole: player.platformRole,
      actorRole: player.actorRole,
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
  serializePokerTable,
  getLegalActions,
  evaluateBestHand,
  compareRanks,
};
