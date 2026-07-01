"use strict";

const els = {
  topbarStats: document.querySelector("#topbarStats"),
  authStatus: document.querySelector("#authStatus"),
  profileSummary: document.querySelector("#profileSummary"),
  profileSummaryMeta: document.querySelector("#profileSummaryMeta"),
  profileSummaryStats: document.querySelector("#profileSummaryStats"),
  topbarAvatar: document.querySelector("#topbarAvatar"),
  signInLink: document.querySelector("#signInLink"),
  signUpLink: document.querySelector("#signUpLink"),
  guestLink: document.querySelector("#guestLink"),
  quizLink: document.querySelector("#quizLink"),
  signOutButton: document.querySelector("#signOutButton"),
  soundToggleButton: document.querySelector("#soundToggleButton"),
  setupPanel: document.querySelector("#setupPanel"),
  tableForm: document.querySelector("#tableForm"),
  authPanel: document.querySelector("#authPanel"),
  authPanelTitle: document.querySelector("#authPanelTitle"),
  authCloseButton: document.querySelector("#authCloseButton"),
  authUserIdGroup: document.querySelector("#authUserIdGroup"),
  authUserId: document.querySelector("#authUserId"),
  authNameGroup: document.querySelector("#authNameGroup"),
  authName: document.querySelector("#authName"),
  authRoleGroup: document.querySelector("#authRoleGroup"),
  authRole: document.querySelector("#authRole"),
  authPasswordGroup: document.querySelector("#authPasswordGroup"),
  authPassword: document.querySelector("#authPassword"),
  authPhotoGroup: document.querySelector("#authPhotoGroup"),
  guestPracticeOptions: document.querySelector("#guestPracticeOptions"),
  profilePhotoInput: document.querySelector("#profilePhotoInput"),
  profilePhotoPreview: document.querySelector("#profilePhotoPreview"),
  removeProfilePhotoButton: document.querySelector("#removeProfilePhotoButton"),
  profileDialog: document.querySelector("#profileDialog"),
  profileCloseButton: document.querySelector("#profileCloseButton"),
  profileDisplayName: document.querySelector("#profileDisplayName"),
  profileEditPreview: document.querySelector("#profileEditPreview"),
  profileEditPhotoInput: document.querySelector("#profileEditPhotoInput"),
  profileEditRemoveButton: document.querySelector("#profileEditRemoveButton"),
  profileSaveButton: document.querySelector("#profileSaveButton"),
  profileNotice: document.querySelector("#profileNotice"),
  profileHandsPlayed: document.querySelector("#profileHandsPlayed"),
  profileHandsWon: document.querySelector("#profileHandsWon"),
  photoLightbox: document.querySelector("#photoLightbox"),
  photoLightboxBackdrop: document.querySelector("#photoLightboxBackdrop"),
  photoLightboxClose: document.querySelector("#photoLightboxClose"),
  photoLightboxImage: document.querySelector("#photoLightboxImage"),
  photoLightboxName: document.querySelector("#photoLightboxName"),
  authSubmitButton: document.querySelector("#authSubmitButton"),
  authNotice: document.querySelector("#authNotice"),
  setupNotice: document.querySelector("#setupNotice"),
  setupEyebrow: document.querySelector("#setupEyebrow"),
  setupTitle: document.querySelector("#setupTitle"),
  roleHome: document.querySelector("#roleHome"),
  roleHomeEyebrow: document.querySelector("#roleHomeEyebrow"),
  roleHomeTitle: document.querySelector("#roleHomeTitle"),
  roleHomeGrid: document.querySelector("#roleHomeGrid"),
  leaderboardPanel: document.querySelector("#leaderboardPanel"),
  leaderboardList: document.querySelector("#leaderboardList"),
  rankingsRefreshButton: document.querySelector("#rankingsRefreshButton"),
  rankingsNotice: document.querySelector("#rankingsNotice"),
  quizPanel: document.querySelector("#quizPanel"),
  quizBackButton: document.querySelector("#quizBackButton"),
  quizStreetSummary: document.querySelector("#quizStreetSummary"),
  quizCategoryTabs: document.querySelector("#quizCategoryTabs"),
  quizLevelLabel: document.querySelector("#quizLevelLabel"),
  quizDecisionLabel: document.querySelector("#quizDecisionLabel"),
  quizOpponents: document.querySelector("#quizOpponents"),
  quizBoardCards: document.querySelector("#quizBoardCards"),
  quizPot: document.querySelector("#quizPot"),
  quizHeroPosition: document.querySelector("#quizHeroPosition"),
  quizHeroCards: document.querySelector("#quizHeroCards"),
  quizCategoryLabel: document.querySelector("#quizCategoryLabel"),
  quizQuestionTitle: document.querySelector("#quizQuestionTitle"),
  quizStakes: document.querySelector("#quizStakes"),
  quizScenario: document.querySelector("#quizScenario"),
  quizChoices: document.querySelector("#quizChoices"),
  quizFeedback: document.querySelector("#quizFeedback"),
  quizPrevButton: document.querySelector("#quizPrevButton"),
  quizNextButton: document.querySelector("#quizNextButton"),
  quizProgressLabel: document.querySelector("#quizProgressLabel"),
  quizNavigatorHint: document.querySelector("#quizNavigatorHint"),
  playerIdentityGroup: document.querySelector("#playerIdentityGroup"),
  createTableSection: document.querySelector("#createTableSection"),
  tournamentOptions: document.querySelector("#tournamentOptions"),
  createStayButton: document.querySelector("#createStayButton"),
  hostRoomsSection: document.querySelector("#hostRoomsSection"),
  hostDashboardStats: document.querySelector("#hostDashboardStats"),
  hostRoomsRefreshButton: document.querySelector("#hostRoomsRefreshButton"),
  hostRoomList: document.querySelector("#hostRoomList"),
  hostRoomsNotice: document.querySelector("#hostRoomsNotice"),
  tournamentLobbySection: document.querySelector("#tournamentLobbySection"),
  tournamentsRefreshButton: document.querySelector("#tournamentsRefreshButton"),
  tournamentList: document.querySelector("#tournamentList"),
  tournamentsNotice: document.querySelector("#tournamentsNotice"),
  joinTableSection: document.querySelector("#joinTableSection"),
  joinTableTitle: document.querySelector("#joinTableTitle"),
  adminPanel: document.querySelector("#adminPanel"),
  adminRefreshButton: document.querySelector("#adminRefreshButton"),
  adminSelectAll: document.querySelector("#adminSelectAll"),
  adminActivateButton: document.querySelector("#adminActivateButton"),
  adminDeactivateButton: document.querySelector("#adminDeactivateButton"),
  adminSummary: document.querySelector("#adminSummary"),
  adminRoleFilters: document.querySelector("#adminRoleFilters"),
  adminUserSearch: document.querySelector("#adminUserSearch"),
  adminUsersBody: document.querySelector("#adminUsersBody"),
  adminNotice: document.querySelector("#adminNotice"),
  openTableButton: document.querySelector("#openTableButton"),
  roomCodeInput: document.querySelector("#roomCodeInput"),
  joinTableButton: document.querySelector("#joinTableButton"),
  playerName: document.querySelector("#playerName"),
  playerConsole: document.querySelector(".player-console"),
  viewerConsole: document.querySelector("#viewerConsole"),
  viewerRoleLabel: document.querySelector("#viewerRoleLabel"),
  viewerEyebrow: document.querySelector("#viewerEyebrow"),
  viewerTitle: document.querySelector("#viewerTitle"),
  viewerMessage: document.querySelector("#viewerMessage"),
  seatPickerConsole: document.querySelector("#seatPickerConsole"),
  seatPickerButtons: document.querySelector("#seatPickerButtons"),
  seatPickerNotice: document.querySelector("#seatPickerNotice"),
  tablePanel: document.querySelector("#tablePanel"),
  tableTitle: document.querySelector("#tableTitle"),
  roomCodeLabel: document.querySelector("#roomCodeLabel"),
  potTotal: document.querySelector("#potTotal"),
  phaseLabel: document.querySelector("#phaseLabel"),
  roleLabel: document.querySelector("#roleLabel"),
  modeLabel: document.querySelector("#modeLabel"),
  tournamentBanner: document.querySelector("#tournamentBanner"),
  tournamentLevel: document.querySelector("#tournamentLevel"),
  tournamentBlinds: document.querySelector("#tournamentBlinds"),
  tournamentClock: document.querySelector("#tournamentClock"),
  tournamentNextBlinds: document.querySelector("#tournamentNextBlinds"),
  tournamentNotice: document.querySelector("#tournamentNotice"),
  roleGuideTitle: document.querySelector("#roleGuideTitle"),
  leaveButton: document.querySelector("#leaveButton"),
  feltHandLabel: document.querySelector("#feltHandLabel"),
  feltStreetLabel: document.querySelector("#feltStreetLabel"),
  feltBlindLabel: document.querySelector("#feltBlindLabel"),
  feltGameId: document.querySelector("#feltGameId"),
  playersGrid: document.querySelector("#playersGrid"),
  communityRow: document.querySelector("#communityRow"),
  centerPot: document.querySelector("#centerPot"),
  tableMessage: document.querySelector("#tableMessage"),
  eventLog: document.querySelector("#eventLog"),
  showdownList: document.querySelector("#showdownList"),
  handStatus: document.querySelector("#handStatus"),
  humanWinChance: document.querySelector("#humanWinChance"),
  humanCards: document.querySelector("#humanCards"),
  actionConsole: document.querySelector("#actionConsole"),
  learningCoachPanel: document.querySelector("#learningCoachPanel"),
  learningCoachBadge: document.querySelector("#learningCoachBadge"),
  learningCoachTitle: document.querySelector("#learningCoachTitle"),
  learningCoachRecommendation: document.querySelector("#learningCoachRecommendation"),
  learningCoachTips: document.querySelector("#learningCoachTips"),
  amountInput: document.querySelector("#amountInput"),
  amountOutput: document.querySelector("#amountOutput"),
  foldButton: document.querySelector("#foldButton"),
  checkButton: document.querySelector("#checkButton"),
  callButton: document.querySelector("#callButton"),
  betButton: document.querySelector("#betButton"),
  raiseButton: document.querySelector("#raiseButton"),
  allInButton: document.querySelector("#allInButton"),
  nextHandButton: document.querySelector("#nextHandButton"),
  actionNotice: document.querySelector("#actionNotice"),
};

const REGISTERED_SESSION_STORAGE_KEY = "pokerRegisteredSessionV1";
const GUEST_SESSION_STORAGE_KEY = "pokerGuestSessionV1";
const RAISE_SLIDER_MIN = 0;
const RAISE_SLIDER_MAX = 100;
const RAISE_SLIDER_STEP = 1;
const RAISE_SLIDER_STOPS = [
  { preset: "2", label: "2x", position: 0 },
  { preset: "3", label: "3x", position: 33 },
  { preset: "5", label: "5x", position: 67 },
  { preset: "all-in", label: "All In", position: 100 },
];
const OPEN_SLIDER_STOPS = [
  { preset: "min", label: "Min", position: 0 },
  { preset: "2", label: "2x", position: 25 },
  { preset: "3", label: "3x", position: 50 },
  { preset: "5", label: "5x", position: 75 },
  { preset: "all-in", label: "All In", position: 100 },
];
const CLIENT_ROLE_PERMISSIONS = {
  guest: ["practice_with_bots", "choose_practice_visibility", "play_hand", "update_guest_profile"],
  player: ["join_cash_table", "join_tournament", "claim_seat", "play_hand", "view_rankings", "update_profile"],
  host: ["create_cash_table", "create_tournament", "view_table", "view_own_tables", "close_own_table"],
  admin: ["view_table", "manage_users", "view_diagnostics"],
};
const ROLE_HOME_CONTENT = {
  guest: {
    eyebrow: "Guest practice",
    title: "Practice against bot seats",
    cards: [
      ["Mode", "Masked or unmasked", "Pick visibility before Play Game"],
      ["Table", "Bot practice", "Temporary room with virtual chips"],
      ["Profile", "Optional photo", "Saved only for this guest session"],
    ],
  },
  player: {
    eyebrow: "Player lobby",
    title: "Find a table and pick your seat",
    cards: [
      ["Tables", "Cash and private rooms", "Join from lobby cards or room code"],
      ["Tournaments", "Active and waiting", "Click Join Tournament and choose a seat"],
      ["Profile", "Stats and photo", "Hands played and wins stay visible"],
    ],
  },
  host: {
    eyebrow: "Host dashboard",
    title: "Create rooms and keep them active",
    cards: [
      ["Create", "Cash or tournament", "Open now or Create & Stay in lobby"],
      ["Manage", "Active rooms", "View room codes, seats, waiting players"],
      ["Control", "Close tables", "Hosts watch and manage without taking seats"],
    ],
  },
  admin: {
    eyebrow: "Admin dashboard",
    title: "Manage account access",
    cards: [
      ["Users", "Active and inactive", "Filter by role and status"],
      ["Access", "Bulk controls", "Activate or deactivate selected users"],
      ["View", "Table observer", "Admins can view rooms without seats"],
    ],
  },
  visitor: {
    eyebrow: "Role workspace",
    title: "Choose how you want to enter",
    cards: [
      ["Guest", "Practice quickly", "Masked or unmasked bot game"],
      ["Player", "Join real rooms", "Cash tables and tournaments"],
      ["Host/Admin", "Run the room", "Create tables or manage access"],
    ],
  },
};
const QUIZ_CATEGORIES = [
  { id: "preflop", label: "Pre-flop", summary: "Ranges, position, blinds, and 3-bet decisions before the board." },
  { id: "flop", label: "Flop", summary: "Board texture, continuation bets, protection, and value." },
  { id: "turn", label: "Turn", summary: "Second-barrel pressure, equity, and draw decisions." },
  { id: "river", label: "River", summary: "Value bets, bluff catchers, blockers, and final pot odds." },
];
const QUIZ_TABLE_POSITIONS = [
  { id: "button", label: "Dealer", short: "D", defaultName: "Mia", avatar: "M", status: "On button" },
  { id: "small-blind", label: "Small Blind", short: "SB", defaultName: "Ari", avatar: "A", status: "Posts 10" },
  { id: "big-blind", label: "Big Blind", short: "BB", defaultName: "Ben", avatar: "B", status: "Posts 20" },
  { id: "under-the-gun", label: "Under the Gun", short: "UTG", defaultName: "Noah", avatar: "N", status: "Waiting" },
  { id: "hijack", label: "Hijack", short: "HJ", defaultName: "Ivy", avatar: "I", status: "Waiting" },
  { id: "cutoff", label: "Cutoff", short: "CO", defaultName: "Cruz", avatar: "C", status: "Waiting" },
];
const QUIZ_QUESTIONS = {
  preflop: [
    {
      level: "Starter hand",
      decision: "Small blind 3-bet spot",
      title: "You are in the small blind. What is your play?",
      stakes: "10 / 20",
      pot: 90,
      heroPosition: "Small Blind",
      heroCards: [
        quizCard("A", "spade"),
        quizCard("Q", "heart"),
      ],
      board: [],
      opponents: [
        { name: "Cutoff", action: "Opens to 60" },
        { name: "Button", action: "Folds" },
        { name: "Big Blind", action: "Still to act" },
      ],
      scenario:
        "Six-handed cash game. The cutoff opens to 60, the button folds, and you look down at A-Q offsuit in the small blind. The big blind is a regular who defends wide.",
      positionLens: [
        {
          position: "Big Blind",
          recommendation: "Call more often, mix in 3-bets",
          note:
            "You close the action and get a better price, so A-Q can defend as a call more comfortably than it can from the small blind.",
        },
        {
          position: "Button",
          recommendation: "3-bet for value",
          note:
            "With position after the flop, A-Q can pressure cutoff opens and still navigate well when called.",
        },
        {
          position: "Under the Gun",
          recommendation: "Open-raise, do not limp",
          note:
            "When first in, A-Q is strong enough to raise. Limping gives up initiative and invites pressure behind you.",
        },
      ],
      choices: [
        {
          id: "fold",
          label: "Fold",
          result: "Not ideal",
          feedback:
            "A-Q is too strong to fold here. Folding gives up a hand that blocks strong ace and queen holdings and performs well against a cutoff open.",
        },
        {
          id: "call",
          label: "Call",
          result: "Playable, but soft",
          feedback:
            "Calling keeps the pot smaller, but you will be out of position and invite the big blind to realize equity. A more assertive line is usually better.",
        },
        {
          id: "raise",
          label: "Re-raise to 220",
          result: "Best answer",
          best: true,
          feedback:
            "A-Q has strong blockers and enough value against a cutoff opening range. 3-betting applies pressure, narrows the field, and avoids playing a bloated multiway pot out of position.",
        },
        {
          id: "all-in",
          label: "All in",
          result: "Too much",
          feedback:
            "All-in risks far too much for the stack depth in this spot. You want pressure and initiative, not a shove that mostly gets called by better hands.",
        },
      ],
    },
    {
      level: "Blind defense",
      decision: "Big blind suited broadway",
      title: "You are in the big blind. Defend or fight back?",
      stakes: "10 / 20",
      pot: 80,
      heroPosition: "Big Blind",
      heroCards: [
        quizCard("K", "spade"),
        quizCard("J", "spade"),
      ],
      board: [],
      opponents: [
        { name: "Cutoff", action: "Folds" },
        { name: "Button", action: "Opens to 50" },
        { name: "Small Blind", action: "Folds" },
      ],
      scenario:
        "The button opens to 50 and the small blind folds. You are closing the action in the big blind with K-J suited against a player who steals often.",
      positionLens: [
        {
          position: "Small Blind",
          recommendation: "Prefer 3-bet or fold",
          note:
            "Calling from the small blind leaves you out of position and lets the big blind enter cheaply, so suited broadways often work better as pressure hands.",
        },
        {
          position: "Cutoff",
          recommendation: "Open-raise",
          note:
            "If folded to you, K-J suited is strong enough to attack the blinds and can make top pair, straights, and flushes.",
        },
        {
          position: "Under the Gun",
          recommendation: "Mostly fold at tough tables",
          note:
            "K-J suited looks pretty, but early position faces too many players left to act and can be dominated by A-K, K-Q, and A-J.",
        },
      ],
      choices: [
        {
          id: "fold",
          label: "Fold",
          result: "Too tight",
          feedback:
            "K-J suited is too playable to fold against a button steal. You have position disadvantage, but you are closing the action and getting a good price.",
        },
        {
          id: "call",
          label: "Call",
          result: "Best answer",
          best: true,
          feedback:
            "Calling is the cleanest defense. K-J suited realizes equity well, can make strong top pairs and flushes, and does not need to turn into a large pot out of position.",
        },
        {
          id: "three-bet",
          label: "3-bet to 190",
          result: "Aggressive option",
          feedback:
            "A 3-bet can work against a frequent opener, but this hand also plays well as a call. Use the 3-bet more often when villain folds too much or your image is tight.",
        },
        {
          id: "all-in",
          label: "All in",
          result: "Too much",
          feedback:
            "Shoving turns a strong playable hand into a high-variance bluff. At normal cash-game stack depth, this is far too large.",
        },
      ],
    },
    {
      level: "Opening range",
      decision: "Under the gun discipline",
      title: "You are under the gun. Should this hand enter the pot?",
      stakes: "10 / 20",
      pot: 30,
      heroPosition: "Under the Gun",
      heroCards: [
        quizCard("A", "club"),
        quizCard("10", "diamond"),
      ],
      board: [],
      opponents: [
        { name: "Hijack", action: "Still to act" },
        { name: "Cutoff", action: "Still to act" },
        { name: "Button", action: "Still to act" },
      ],
      scenario:
        "Six-handed table, 100 big blinds deep. You are first to act with A-10 offsuit. The players behind you are capable of 3-betting light.",
      positionLens: [
        {
          position: "Cutoff",
          recommendation: "Open-raise more often",
          note:
            "With fewer players behind, A-10 offsuit becomes a reasonable steal/value open, especially if the button and blinds are not attacking enough.",
        },
        {
          position: "Button",
          recommendation: "Open-raise",
          note:
            "On the button you have position for the rest of the hand, so A-10 offsuit gains a lot of playability.",
        },
        {
          position: "Big Blind",
          recommendation: "Defend selectively",
          note:
            "Against a late-position open, A-10 can call or sometimes 3-bet. Against an early-position open, it is often dominated and should be folded more.",
        },
      ],
      choices: [
        {
          id: "limp",
          label: "Limp",
          result: "Weak plan",
          feedback:
            "Open-limping gives away initiative and lets stronger ranges attack you. If a hand is not strong enough to open, it is usually not strong enough to limp.",
        },
        {
          id: "raise",
          label: "Raise to 50",
          result: "Borderline loose",
          feedback:
            "A-10 offsuit can look pretty, but from under the gun it is easily dominated by A-J, A-Q, A-K, and strong broadways behind you.",
        },
        {
          id: "fold",
          label: "Fold",
          result: "Best answer",
          best: true,
          feedback:
            "Best discipline. Under the gun needs tighter opening standards because every other player still has position or action behind you.",
        },
        {
          id: "all-in",
          label: "All in",
          result: "Massive overplay",
          feedback:
            "A-10 offsuit does not want to risk an entire stack before the flop. When called, you are usually dominated or flipping badly.",
        },
      ],
    },
    {
      level: "Steal spot",
      decision: "Cutoff suited connector",
      title: "Folded to you in the cutoff. What is the best plan?",
      stakes: "10 / 20",
      pot: 30,
      heroPosition: "Cutoff",
      heroCards: [
        quizCard("9", "spade"),
        quizCard("8", "spade"),
      ],
      board: [],
      opponents: [
        { name: "Under the Gun", action: "Folds" },
        { name: "Hijack", action: "Folds" },
        { name: "Button", action: "Tight player" },
        { name: "Blinds", action: "Fold too much" },
      ],
      scenario:
        "Action folds to you in the cutoff with 9-8 suited. The button is tight and both blinds have been over-folding to late-position opens.",
      positionLens: [
        {
          position: "Button",
          recommendation: "Open-raise frequently",
          note:
            "This hand loves position. On the button, suited connectors can steal blinds and realize equity well when called.",
        },
        {
          position: "Under the Gun",
          recommendation: "Fold",
          note:
            "From early position, too many players are left to act. 9-8 suited is not strong enough to open by default.",
        },
        {
          position: "Big Blind",
          recommendation: "Call versus small late opens",
          note:
            "If the price is good and the open comes from late position, 9-8 suited can defend and play flops well.",
        },
      ],
      choices: [
        {
          id: "fold",
          label: "Fold",
          result: "Too cautious",
          feedback:
            "Folding gives up a profitable steal spot. Suited connectors gain value when you can open first in and pressure tight players behind.",
        },
        {
          id: "limp",
          label: "Limp",
          result: "No initiative",
          feedback:
            "Limping lets the button and blinds see cheap flops and removes your fold equity. If you play this hand here, open-raise it.",
        },
        {
          id: "raise",
          label: "Raise to 50",
          result: "Best answer",
          best: true,
          feedback:
            "Best answer. You can win the blinds immediately, and when called you have a hand that can make disguised straights and flushes.",
        },
        {
          id: "all-in",
          label: "All in",
          result: "Unnecessary",
          feedback:
            "A normal open already attacks the blinds. Shoving risks too much and removes the postflop upside of a suited connector.",
        },
      ],
    },
    {
      level: "Facing a 3-bet",
      decision: "Button pocket pair",
      title: "You opened the button and got 3-bet. What now?",
      stakes: "10 / 20",
      pot: 260,
      heroPosition: "Button",
      heroCards: [
        quizCard("8", "heart"),
        quizCard("8", "club"),
      ],
      board: [],
      opponents: [
        { name: "Under the Gun", action: "Folds" },
        { name: "Cutoff", action: "Folds" },
        { name: "You", action: "Open to 50" },
        { name: "Small Blind", action: "3-bets to 190" },
      ],
      scenario:
        "You open the button with pocket eights. The small blind, a solid regular, 3-bets to 190. You both started the hand with about 1,800 chips.",
      positionLens: [
        {
          position: "Cutoff",
          recommendation: "Call tighter versus 3-bets",
          note:
            "You have one more player behind pre-flop and less positional certainty, so pocket eights should continue a little more carefully.",
        },
        {
          position: "Under the Gun",
          recommendation: "Open, then respect big 3-bets",
          note:
            "Pocket eights can open early, but if a tight player 3-bets, you need deeper stacks or a clear plan before calling.",
        },
        {
          position: "Big Blind",
          recommendation: "Call versus late opens",
          note:
            "When defending against a button or cutoff open, pocket eights are usually strong enough to call and sometimes 3-bet for value/protection.",
        },
      ],
      choices: [
        {
          id: "fold",
          label: "Fold",
          result: "Too tight",
          feedback:
            "Pocket eights have enough equity and playability in position to continue against this sizing when stacks are deep enough.",
        },
        {
          id: "call",
          label: "Call",
          result: "Best answer",
          best: true,
          feedback:
            "Calling uses your position and keeps dominated bluffs in villain's range. You can set mine, navigate many flops, and avoid turning a medium pair into a bluff.",
        },
        {
          id: "four-bet",
          label: "4-bet to 470",
          result: "Too thin",
          feedback:
            "A 4-bet can force folds, but pocket eights do not love getting shoved on. This hand performs better as a call in position.",
        },
        {
          id: "all-in",
          label: "All in",
          result: "Overplay",
          feedback:
            "Shoving risks a deep stack with a medium pair. When called, you are often flipping or crushed by higher pairs.",
        },
      ],
    },
  ],
  flop: {
    level: "Starter hand",
    decision: "Dry-board continuation bet",
    title: "Top pair on a dry flop. What is your play?",
    stakes: "10 / 20",
    pot: 130,
    heroPosition: "Button",
    heroCards: [
      quizCard("K", "spade"),
      quizCard("Q", "spade"),
    ],
    board: [
      quizCard("Q", "heart"),
      quizCard("7", "diamond"),
      quizCard("2", "club"),
    ],
    opponents: [
      { name: "Big Blind", action: "Checks" },
    ],
    scenario:
      "You raised on the button with K-Q suited and the big blind called. The flop is Q-7-2 rainbow. Villain checks to you.",
    choices: [
      {
        id: "check",
        label: "Check back",
        result: "Too passive",
        feedback:
          "Checking is safe, but it misses value from weaker queens, sevens, pocket pairs, and ace-high floats. You also let overcards realize equity for free.",
      },
      {
        id: "bet-small",
        label: "Bet 45",
        result: "Best answer",
        best: true,
        feedback:
          "This dry board favors the preflop raiser, and top pair good kicker wants value. A smaller c-bet pressures weak hands while keeping worse pairs in.",
      },
      {
        id: "bet-pot",
        label: "Bet 130",
        result: "Too large",
        feedback:
          "A pot-sized bet can force out many worse hands. On this dry texture, a smaller bet usually gets the job done with better risk-reward.",
      },
      {
        id: "fold",
        label: "Fold",
        result: "Invalid idea",
        feedback:
          "Villain checked. You have top pair with a good kicker, so folding is not part of the decision tree here.",
      },
    ],
  },
  turn: {
    level: "Starter hand",
    decision: "Semi-bluff second barrel",
    title: "You picked up pressure equity. What is your play?",
    stakes: "10 / 20",
    pot: 260,
    heroPosition: "Cutoff",
    heroCards: [
      quizCard("A", "club"),
      quizCard("J", "club"),
    ],
    board: [
      quizCard("K", "club"),
      quizCard("7", "diamond"),
      quizCard("3", "club"),
      quizCard("2", "spade"),
    ],
    opponents: [
      { name: "Big Blind", action: "Checks again" },
    ],
    scenario:
      "You opened cutoff, the big blind called, and your flop c-bet on K-7-3 with two clubs was called. The turn is the 2 of spades and villain checks again.",
    choices: [
      {
        id: "check",
        label: "Check",
        result: "Reasonable, but lower pressure",
        feedback:
          "Checking realizes your draw, but it gives up fold equity. With the nut-flush draw and an ace blocker, betting keeps pressure on pairs and weaker draws.",
      },
      {
        id: "barrel",
        label: "Bet 170",
        result: "Best answer",
        best: true,
        feedback:
          "You can fold out some one-pair hands while still having strong equity when called. This is a clean semi-bluff barrel, not a pure bluff.",
      },
      {
        id: "fold",
        label: "Fold",
        result: "Not available",
        feedback:
          "Villain checked, so there is no bet to fold to. Your decision is whether to apply pressure or take the free card.",
      },
      {
        id: "shove",
        label: "All in",
        result: "Overplay",
        feedback:
          "The draw is strong, but shoving usually folds out worse and gets called by strong kings, sets, and stubborn two-pair holdings. A sized barrel keeps your range healthier.",
      },
    ],
  },
  river: {
    level: "Starter hand",
    decision: "Thin value river bet",
    title: "River checks to you. What is your play?",
    stakes: "10 / 20",
    pot: 480,
    heroPosition: "Button",
    heroCards: [
      quizCard("A", "spade"),
      quizCard("J", "spade"),
    ],
    board: [
      quizCard("A", "diamond"),
      quizCard("J", "club"),
      quizCard("6", "spade"),
      quizCard("5", "heart"),
      quizCard("2", "club"),
    ],
    opponents: [
      { name: "Big Blind", action: "Checks river" },
    ],
    scenario:
      "You raised button with A-J suited, value-bet flop and turn, and the big blind called both streets. The river bricks with the 2 of clubs and villain checks.",
    choices: [
      {
        id: "check",
        label: "Check back",
        result: "Too cautious",
        feedback:
          "Checking wins often, but it leaves value behind. Worse aces and stubborn two-pair/pair-plus-draw hands can still pay a river bet.",
      },
      {
        id: "bet",
        label: "Bet 320",
        result: "Best answer",
        best: true,
        feedback:
          "Top two pair is strong on this runout, and the river did not complete obvious draws. A value bet targets worse aces and bluff-catchers.",
      },
      {
        id: "all-in",
        label: "All in",
        result: "Too polar",
        feedback:
          "A shove makes the range look very polarized and can chase away exactly the worse hands you want calling. A medium value size is cleaner.",
      },
      {
        id: "fold",
        label: "Fold",
        result: "Not available",
        feedback:
          "Villain checked, so folding is not a legal response. The question is whether to value bet or check back.",
      },
    ],
  },
};

QUIZ_QUESTIONS.flop.positionLens = quizLens([
  [
    "Big Blind",
    "Check-call more often",
    "With K-Q on Q-7-2 from the blind, you usually let the raiser continue betting and keep weaker hands in.",
  ],
  [
    "Cutoff",
    "Bet for value",
    "Against the blinds, top pair good kicker still wants value, but you can size smaller on the dry board.",
  ],
  [
    "Small Blind",
    "Lead less, check more",
    "Out of position against the pre-flop raiser, checking protects your range and avoids bloating the pot too early.",
  ],
]);
QUIZ_QUESTIONS.turn.positionLens = quizLens([
  [
    "Button",
    "Barrel more comfortably",
    "In position, the nut-flush draw can pressure one-pair hands and still take a free river line when needed.",
  ],
  [
    "Big Blind",
    "Prefer check-call",
    "From the blind you have less fold equity, so realizing equity is usually better than building a huge pot.",
  ],
  [
    "Small Blind",
    "Use selective aggression",
    "Out of position, semi-bluff only when villain can fold. Otherwise, check-call and keep the pot playable.",
  ],
]);
QUIZ_QUESTIONS.river.positionLens = quizLens([
  [
    "Big Blind",
    "Check-raise rarely",
    "With top two from the blind, you often get value by calling or leading smaller rather than forcing folds.",
  ],
  [
    "Cutoff",
    "Value bet similar",
    "In late position, A-J on this runout still targets worse aces and sticky bluff-catchers.",
  ],
  [
    "Small Blind",
    "Size down out of position",
    "When you are first to act, a smaller value bet gets called by more one-pair hands and avoids isolating yourself against stronger ranges.",
  ],
]);

QUIZ_QUESTIONS.preflop.push(
  quizQuestion({
    level: "Blind discipline",
    decision: "Small blind versus early open",
    title: "You are in the small blind facing an early open. Continue?",
    stakes: "10 / 20",
    pot: 90,
    heroPosition: "Small Blind",
    heroCards: [quizCard("K", "diamond"), quizCard("Q", "club")],
    board: [],
    opponents: [
      { name: "Under the Gun", action: "Opens to 60" },
      { name: "Hijack", action: "Folds" },
      { name: "Cutoff", action: "Folds" },
      { name: "Button", action: "Folds" },
      { name: "Big Blind", action: "Still to act" },
    ],
    scenario:
      "Under the gun opens to 60 and it folds to you in the small blind with K-Q offsuit. Stacks are 100 big blinds deep.",
    positionLens: quizLens([
      ["Button", "Call or 3-bet sometimes", "Position makes K-Q offsuit much easier to realize, especially against later opens."],
      ["Big Blind", "Call versus wider opens", "Closing the action gives you a better price, but against UTG you still need discipline."],
      ["Cutoff", "Open-raise if folded to", "When first in from cutoff, K-Q offsuit is strong enough to attack the blinds."],
    ]),
    choices: [
      quizChoice("call", "Call", "Trouble spot", "Calling from the small blind against an early range creates dominated top-pair spots and invites the big blind in."),
      quizChoice("fold", "Fold", "Best answer", "K-Q offsuit is often dominated by an early-position opening range. Folding protects you from tough out-of-position pots.", true),
      quizChoice("three-bet", "3-bet to 220", "Too ambitious", "A 3-bet can work as a bluff sometimes, but K-Q offsuit blocks calls and gets punished by stronger early-position continues."),
      quizChoice("all-in", "All in", "Massive overplay", "Shoving turns a marginal continue into a high-risk play that mostly gets called by much stronger hands."),
    ],
  }),
  quizQuestion({
    level: "Premium pair",
    decision: "Under the gun pocket jacks",
    title: "You are first to act with pocket jacks. What is your plan?",
    stakes: "10 / 20",
    pot: 30,
    heroPosition: "Under the Gun",
    heroCards: [quizCard("J", "diamond"), quizCard("J", "club")],
    board: [],
    opponents: [
      { name: "Hijack", action: "Still to act" },
      { name: "Cutoff", action: "Still to act" },
      { name: "Button", action: "Still to act" },
      { name: "Blinds", action: "Posted" },
    ],
    scenario:
      "Six-handed table. You are under the gun with pocket jacks and no one has entered the pot yet.",
    positionLens: quizLens([
      ["Button", "Open-raise confidently", "On the button, pocket jacks are a premium open and can call or 4-bet depending on the 3-bettor."],
      ["Big Blind", "Defend strongly", "Against a late open, jacks are strong enough to 3-bet for value very often."],
      ["Small Blind", "3-bet for value", "From the small blind, avoid flatting too often and build the pot while your hand is ahead."],
    ]),
    choices: [
      quizChoice("limp", "Limp", "Too passive", "Pocket jacks are far too strong to limp. You want value and initiative."),
      quizChoice("raise", "Raise to 50", "Best answer", "Open-raising builds value, protects your range, and avoids inviting the whole table in cheaply.", true),
      quizChoice("fold", "Fold", "Too tight", "Jacks are a premium starting hand, even from early position."),
      quizChoice("all-in", "All in", "Too much", "A normal open gets value without risking an entire stack before anyone has shown interest."),
    ],
  }),
  quizQuestion({
    level: "Wheel ace",
    decision: "Cutoff suited ace steal",
    title: "Folded to you in cutoff with A-5 suited. What now?",
    stakes: "10 / 20",
    pot: 30,
    heroPosition: "Cutoff",
    heroCards: [quizCard("A", "club"), quizCard("5", "club")],
    board: [],
    opponents: [
      { name: "Under the Gun", action: "Folds" },
      { name: "Hijack", action: "Folds" },
      { name: "Button", action: "Regular" },
      { name: "Blinds", action: "Average defenders" },
    ],
    scenario:
      "Action folds to you in the cutoff with A-5 suited. The button is not overly aggressive and the blinds defend normally.",
    positionLens: quizLens([
      ["Button", "Open very often", "A-5 suited is an excellent button open because it blocks aces and can make strong flushes and wheels."],
      ["Small Blind", "3-bet bluff sometimes", "Against late opens, A-5 suited is a useful blocker hand for 3-bet pressure."],
      ["Under the Gun", "Mostly fold", "Early position reduces the value of suited wheel aces because too many stronger ranges remain behind."],
    ]),
    choices: [
      quizChoice("fold", "Fold", "Too tight", "A-5 suited has blocker value, flush potential, and steal value from the cutoff."),
      quizChoice("limp", "Limp", "Weak plan", "Limping gives up initiative and lets the button attack."),
      quizChoice("raise", "Raise to 50", "Best answer", "Open-raising uses your fold equity and gives the hand a clean path to win pre-flop or play in position.", true),
      quizChoice("all-in", "All in", "Unnecessary", "A suited wheel ace is playable, but not worth risking a full stack as an open shove."),
    ],
  }),
  quizQuestion({
    level: "Suited connector defense",
    decision: "Big blind versus UTG",
    title: "You are in the big blind with 7-6 suited versus UTG. Defend?",
    stakes: "10 / 20",
    pot: 90,
    heroPosition: "Big Blind",
    heroCards: [quizCard("7", "spade"), quizCard("6", "spade")],
    board: [],
    opponents: [
      { name: "Under the Gun", action: "Opens to 60" },
      { name: "Hijack", action: "Folds" },
      { name: "Cutoff", action: "Folds" },
      { name: "Button", action: "Folds" },
      { name: "Small Blind", action: "Folds" },
    ],
    scenario:
      "Under the gun opens to 60 and everyone folds to you in the big blind with 7-6 suited. The opener is tight.",
    positionLens: quizLens([
      ["Button", "Open if folded to", "On the button, 7-6 suited becomes a profitable steal and plays well postflop."],
      ["Cutoff", "Open selectively", "Cutoff can open this hand when the button and blinds are not aggressive."],
      ["Small Blind", "Mostly fold", "Out of position without closing action, small suited connectors lose much of their value."],
    ]),
    choices: [
      quizChoice("call", "Call", "Tempting, but loose", "The hand is pretty, but a tight UTG range and poor position reduce its value."),
      quizChoice("fold", "Fold", "Best answer", "Against a tight early open, folding avoids dominated low-equity spots out of position.", true),
      quizChoice("three-bet", "3-bet to 220", "Low credibility", "This hand has little blocker value and gets called by a range that performs well against it."),
      quizChoice("all-in", "All in", "Wild overplay", "A suited connector is not a stack-off hand against an early-position open."),
    ],
  }),
  quizQuestion({
    level: "Squeeze spot",
    decision: "Button A-K suited",
    title: "Hijack opens, cutoff calls, and you have A-K suited on the button.",
    stakes: "10 / 20",
    pot: 130,
    heroPosition: "Button",
    heroCards: [quizCard("A", "spade"), quizCard("K", "spade")],
    board: [],
    opponents: [
      { name: "Under the Gun", action: "Folds" },
      { name: "Hijack", action: "Opens to 60" },
      { name: "Cutoff", action: "Calls" },
      { name: "Blinds", action: "Still to act" },
    ],
    scenario:
      "Hijack opens to 60, cutoff calls, and you pick up A-K suited on the button. Both blinds are capable of squeezing if you only call.",
    positionLens: quizLens([
      ["Small Blind", "3-bet larger", "Out of position, use a larger squeeze size to reduce callers and build value."],
      ["Big Blind", "Squeeze for value", "A-K suited is strong enough to attack dead money and deny equity to both players."],
      ["Under the Gun", "Open-raise", "First in, A-K suited is a premium open and can continue strongly versus 3-bets."],
    ]),
    choices: [
      quizChoice("fold", "Fold", "Never here", "A-K suited is one of the strongest pre-flop hands and has blockers plus equity."),
      quizChoice("call", "Call", "Playable, but misses value", "Calling keeps dominated hands in, but it invites the blinds and misses a strong squeeze spot."),
      quizChoice("three-bet", "3-bet to 240", "Best answer", "Squeezing builds value, attacks the caller's capped range, and can win the pot immediately.", true),
      quizChoice("all-in", "All in", "Too much at depth", "Unless stacks are shallow, shoving loses value from worse hands that would call or 4-bet smaller."),
    ],
  }),
);

QUIZ_QUESTIONS.flop = [
  QUIZ_QUESTIONS.flop,
  quizQuestion({
    level: "Combo draw",
    decision: "Big blind check-raise",
    title: "You flopped a pairless combo draw in the big blind. What is best?",
    stakes: "10 / 20",
    pot: 110,
    heroPosition: "Big Blind",
    heroCards: [quizCard("8", "club"), quizCard("7", "club")],
    board: [quizCard("9", "club"), quizCard("6", "diamond"), quizCard("2", "club")],
    opponents: [
      { name: "Button", action: "Bets 60" },
      { name: "Small Blind", action: "Folds" },
    ],
    scenario:
      "Button opened, you defended the big blind, and the flop comes 9-club 6-diamond 2-club. Button c-bets 60 into 110.",
    positionLens: quizLens([
      ["Button", "Bet aggressively", "In position this draw can c-bet and barrel many turns."],
      ["Small Blind", "Check-raise selectively", "Out of position, the hand benefits from fold equity but needs enough stack depth."],
      ["Cutoff", "Bet when checked to", "With position and strong equity, applying pressure is better than taking a free card too often."],
    ]),
    choices: [
      quizChoice("fold", "Fold", "Far too tight", "You have straight and flush equity, so folding to one small c-bet gives up too much."),
      quizChoice("call", "Call", "Reasonable", "Calling realizes equity, but it lets overcards and better draws continue cheaply."),
      quizChoice("raise", "Check-raise to 220", "Best answer", "The draw has enough equity to apply pressure and can win immediately or continue on many turns.", true),
      quizChoice("all-in", "All in", "Too large", "A shove risks too much and folds out hands you could pressure over multiple streets."),
    ],
  }),
  quizQuestion({
    level: "Set value",
    decision: "Small blind set versus c-bet",
    title: "You flopped bottom set out of position. Slow play or raise?",
    stakes: "10 / 20",
    pot: 150,
    heroPosition: "Small Blind",
    heroCards: [quizCard("5", "heart"), quizCard("5", "club")],
    board: [quizCard("A", "spade"), quizCard("K", "diamond"), quizCard("5", "spade")],
    opponents: [
      { name: "Under the Gun", action: "Bets 90" },
      { name: "Big Blind", action: "Folds" },
    ],
    scenario:
      "UTG opened, you called small blind with pocket fives, and the flop is A-K-5 with two spades. UTG bets 90.",
    positionLens: quizLens([
      ["Button", "Raise sometimes, call sometimes", "In position, you can trap more comfortably because you control later streets."],
      ["Big Blind", "Check-raise more", "Out of position on a wet broadway board, raising charges top pair and draws."],
      ["Cutoff", "Value raise often", "Against early strength, sets still want value before scary turns slow action."],
    ]),
    choices: [
      quizChoice("fold", "Fold", "Impossible", "A set is far too strong to fold to one flop bet."),
      quizChoice("call", "Call", "Playable trap", "Calling hides your hand, but the board is draw-heavy and many turns can kill action."),
      quizChoice("raise", "Check-raise to 280", "Best answer", "Raise for value against strong aces, kings, and spade draws while the board is still favorable.", true),
      quizChoice("minraise", "Min-raise", "Too small", "A tiny raise gives draws a great price and fails to build the pot with a monster."),
    ],
  }),
  quizQuestion({
    level: "Broadway draw",
    decision: "Button nut overcards plus flush draw",
    title: "You have A-K suited on J-T-2 two-tone. What is your play?",
    stakes: "10 / 20",
    pot: 150,
    heroPosition: "Button",
    heroCards: [quizCard("A", "club"), quizCard("K", "club")],
    board: [quizCard("J", "club"), quizCard("10", "club"), quizCard("2", "diamond")],
    opponents: [
      { name: "Big Blind", action: "Checks" },
    ],
    scenario:
      "You opened button, big blind called, and the flop gives you two overcards, a royal-flush draw, and a gutshot. Big blind checks.",
    positionLens: quizLens([
      ["Big Blind", "Check-raise sometimes", "Out of position, this much equity can pressure a c-bet instead of only calling."],
      ["Cutoff", "Bet often", "In position versus the blinds, your range and equity both support betting."],
      ["Small Blind", "Check-call or check-raise", "Without position, choose between realizing equity and using fold equity based on villain."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Too passive", "Checking is allowed, but this hand has huge equity and benefits from fold equity."),
      quizChoice("bet", "Bet 70", "Best answer", "A smaller c-bet pressures folds while building a pot for many strong turn cards.", true),
      quizChoice("pot", "Bet 150", "Too large", "You do not need pot size to apply pressure with this much equity."),
      quizChoice("fold", "Fold", "Not an option", "Villain checked, and your draw is extremely strong."),
    ],
  }),
  quizQuestion({
    level: "Two pair protection",
    decision: "Top two facing a donk bet",
    title: "Big blind leads into your top two. What is the best response?",
    stakes: "10 / 20",
    pot: 150,
    heroPosition: "Cutoff",
    heroCards: [quizCard("Q", "diamond"), quizCard("J", "diamond")],
    board: [quizCard("Q", "club"), quizCard("J", "spade"), quizCard("8", "spade")],
    opponents: [
      { name: "Big Blind", action: "Bets 90" },
      { name: "Button", action: "Folds" },
    ],
    scenario:
      "You opened cutoff, big blind called, and the flop is Q-J-8 with two spades. Big blind leads 90.",
    positionLens: quizLens([
      ["Button", "Raise for value", "In position, top two can punish draws and worse made hands."],
      ["Small Blind", "Check-raise when possible", "Out of position, build value before straight and flush cards arrive."],
      ["Big Blind", "Lead or check-raise", "As defender, top two can take aggressive lines on wet boards."],
    ]),
    choices: [
      quizChoice("fold", "Fold", "Too tight", "Top two is a premium made hand on the flop."),
      quizChoice("call", "Call", "Allows too much equity", "Calling is playable, but many turn cards can reduce your value or kill action."),
      quizChoice("raise", "Raise to 280", "Best answer", "Raise for value and protection against spades, straight draws, and pair-plus-draw hands.", true),
      quizChoice("all-in", "All in", "Too polar", "A shove may only get called by very strong hands and huge draws."),
    ],
  }),
  quizQuestion({
    level: "Overpair multiway",
    decision: "Aces on a wet board",
    title: "You raised UTG with aces and got two callers. What now?",
    stakes: "10 / 20",
    pot: 240,
    heroPosition: "Under the Gun",
    heroCards: [quizCard("A", "heart"), quizCard("A", "diamond")],
    board: [quizCard("K", "spade"), quizCard("9", "spade"), quizCard("4", "club")],
    opponents: [
      { name: "Hijack", action: "Still to act" },
      { name: "Button", action: "Still to act" },
      { name: "Big Blind", action: "Checks" },
    ],
    scenario:
      "You opened UTG with aces, hijack and button called, and big blind came along. Big blind checks K-spade 9-spade 4-club.",
    positionLens: quizLens([
      ["Button", "Bet for value", "In position, aces can value bet and control later streets more easily."],
      ["Big Blind", "Check-call often", "As defender, one pair wants pot control against multiple ranges."],
      ["Cutoff", "Bet but size carefully", "Overpairs need value but multiway pots require stronger betting discipline."],
    ]),
    choices: [
      quizChoice("check", "Check", "Too cautious", "Checking multiway can be okay sometimes, but this board has many draws and worse kings to charge."),
      quizChoice("bet", "Bet 170", "Best answer", "Betting charges draws and gets value from K-x while avoiding an oversized commitment.", true),
      quizChoice("overbet", "Bet 400", "Too large", "Overbetting into multiple players isolates you against strong kings, sets, and big draws."),
      quizChoice("fold", "Fold", "Not available", "No one has bet yet, and aces are far too strong."),
    ],
  }),
  quizQuestion({
    level: "Top pair defense",
    decision: "Big blind weak ace",
    title: "You defended A-4 and flopped top pair. Button c-bets.",
    stakes: "10 / 20",
    pot: 110,
    heroPosition: "Big Blind",
    heroCards: [quizCard("A", "heart"), quizCard("4", "heart")],
    board: [quizCard("A", "club"), quizCard("9", "diamond"), quizCard("3", "spade")],
    opponents: [
      { name: "Button", action: "Bets 45" },
    ],
    scenario:
      "Button opened, you defended the big blind, and the flop comes A-9-3 rainbow. Button bets 45.",
    positionLens: quizLens([
      ["Button", "Bet small for value", "In position, top pair weak kicker can get value but should avoid huge pots."],
      ["Small Blind", "Check-call", "Out of position, keep worse hands in and avoid being raised off equity."],
      ["Cutoff", "Bet cautiously", "Top pair weak kicker wants value from worse pairs but cannot stack off blindly."],
    ]),
    choices: [
      quizChoice("fold", "Fold", "Too tight", "Top pair is too strong to fold to a small continuation bet."),
      quizChoice("call", "Call", "Best answer", "Calling keeps bluffs and worse aces in while controlling the pot with a weak kicker.", true),
      quizChoice("raise", "Raise to 160", "Overplays kicker", "A raise mostly folds worse and gets called by stronger aces."),
      quizChoice("all-in", "All in", "Huge overplay", "Top pair weak kicker is not a stack-off hand here."),
    ],
  }),
  quizQuestion({
    level: "Range disadvantage",
    decision: "Underpair on Broadway board",
    title: "You have pocket sixes on K-Q-J. Continue betting?",
    stakes: "10 / 20",
    pot: 130,
    heroPosition: "Button",
    heroCards: [quizCard("6", "spade"), quizCard("6", "diamond")],
    board: [quizCard("K", "heart"), quizCard("Q", "heart"), quizCard("J", "club")],
    opponents: [
      { name: "Big Blind", action: "Checks" },
    ],
    scenario:
      "You opened button with pocket sixes and the big blind called. The flop is K-Q-J with two hearts, and villain checks.",
    positionLens: quizLens([
      ["Big Blind", "Check-fold often", "As defender, sixes have little equity and poor blockers on this texture."],
      ["Cutoff", "Check more multiway", "With more ranges involved, small pairs perform even worse on Broadway boards."],
      ["Small Blind", "Avoid bluffing", "Out of position, this hand lacks equity and credible blockers."],
    ]),
    choices: [
      quizChoice("bet", "Bet 45", "Low equity bluff", "You can bluff sometimes, but this hand has poor blockers and little turn playability."),
      quizChoice("check", "Check back", "Best answer", "Take the free card. Your hand has showdown slivers but not enough equity or blockers to bet often.", true),
      quizChoice("pot", "Bet pot", "Too expensive", "Large bets need equity or strong blockers. Pocket sixes have neither here."),
      quizChoice("all-in", "All in", "Wild bluff", "A shove risks far too much with almost no equity when called."),
    ],
  }),
  quizQuestion({
    level: "Nut-flush draw",
    decision: "Cutoff c-bet with ace-high draw",
    title: "You opened cutoff and flop the nut-flush draw. What is best?",
    stakes: "10 / 20",
    pot: 130,
    heroPosition: "Cutoff",
    heroCards: [quizCard("A", "spade"), quizCard("10", "spade")],
    board: [quizCard("7", "spade"), quizCard("4", "spade"), quizCard("2", "club")],
    opponents: [
      { name: "Big Blind", action: "Checks" },
    ],
    scenario:
      "You opened cutoff with A-10 suited and the big blind called. The flop comes 7-4-2 with two spades and villain checks.",
    positionLens: quizLens([
      ["Button", "Bet frequently", "In position, the nut draw can apply pressure and barrel many turns."],
      ["Big Blind", "Check-call or check-raise", "As defender, the nut draw can either realize equity or attack small c-bets."],
      ["Small Blind", "Check more often", "Out of position, betting into the raiser is less natural without fold equity reads."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Playable", "Checking realizes equity, but misses fold equity on a board that can hit your opening range."),
      quizChoice("bet", "Bet 55", "Best answer", "A small bet can fold out overcards and builds a pot for when the nut flush arrives.", true),
      quizChoice("overbet", "Bet 180", "Too large", "You do not need to overbet to pressure weak hands with this much equity."),
      quizChoice("fold", "Fold", "Not legal", "Villain checked, and your draw is strong."),
    ],
  }),
  quizQuestion({
    level: "Middle pair plus draw",
    decision: "Small blind facing c-bet",
    title: "You have nines on T-8-7 with a gutshot. What do you do?",
    stakes: "10 / 20",
    pot: 150,
    heroPosition: "Small Blind",
    heroCards: [quizCard("9", "heart"), quizCard("9", "diamond")],
    board: [quizCard("10", "club"), quizCard("8", "club"), quizCard("7", "diamond")],
    opponents: [
      { name: "Cutoff", action: "Bets 85" },
      { name: "Big Blind", action: "Folds" },
    ],
    scenario:
      "Cutoff opened, you called small blind, and the flop is T-8-7 with two clubs. You have pocket nines and face an 85 bet.",
    positionLens: quizLens([
      ["Button", "Call more comfortably", "In position, this hand can realize equity and control the pot better."],
      ["Big Blind", "Check-call often", "Closing action makes a call attractive with pair plus straight equity."],
      ["Cutoff", "Bet for protection", "As opener, nines on this texture often need protection from overcards and draws."],
    ]),
    choices: [
      quizChoice("fold", "Fold", "Too tight", "You have a pair plus straight equity and enough immediate value to continue."),
      quizChoice("call", "Call", "Best answer", "Calling keeps the pot manageable while realizing equity with a pair and straight draw.", true),
      quizChoice("raise", "Raise to 300", "High variance", "A raise can work, but you often get called by stronger pairs, sets, and big draws."),
      quizChoice("all-in", "All in", "Too much", "You have equity, but not enough to pile in stacks on the flop by default."),
    ],
  }),
  quizQuestion({
    level: "Board lock",
    decision: "Monotone flop caution",
    title: "You have top pair on a monotone flop. What is the best line?",
    stakes: "10 / 20",
    pot: 130,
    heroPosition: "Button",
    heroCards: [quizCard("K", "diamond"), quizCard("Q", "club")],
    board: [quizCard("K", "heart"), quizCard("8", "heart"), quizCard("3", "heart")],
    opponents: [
      { name: "Big Blind", action: "Checks" },
    ],
    scenario:
      "You opened button with K-Q offsuit, big blind called, and the flop is K-8-3 all hearts. You have no heart and villain checks.",
    positionLens: quizLens([
      ["Big Blind", "Check-call some", "As defender, top pair no heart can continue but should avoid huge pots."],
      ["Cutoff", "Bet small", "In position, a small value/protection bet is enough on a locked texture."],
      ["Small Blind", "Check often", "Out of position without a heart, pot control becomes more important."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Reasonable", "Checking controls the pot, but misses some value from worse kings and heartless pairs."),
      quizChoice("bet-small", "Bet 45", "Best answer", "Small betting gets value and protection without overcommitting on a monotone board.", true),
      quizChoice("bet-pot", "Bet 130", "Too large", "A large bet isolates you against flushes, strong hearts, and better made hands."),
      quizChoice("all-in", "All in", "Massive overplay", "Top pair without a heart does not want to play for stacks here."),
    ],
  }),
].slice(0, 10);

QUIZ_QUESTIONS.turn = [
  QUIZ_QUESTIONS.turn,
  quizQuestion({
    level: "Value barrel",
    decision: "Top pair second street",
    title: "Your top pair got called on the flop. Do you keep betting?",
    stakes: "10 / 20",
    pot: 220,
    heroPosition: "Button",
    heroCards: [quizCard("K", "spade"), quizCard("Q", "diamond")],
    board: [quizCard("Q", "heart"), quizCard("7", "diamond"), quizCard("2", "club"), quizCard("4", "spade")],
    opponents: [
      { name: "Big Blind", action: "Checks" },
    ],
    scenario:
      "You c-bet Q-7-2 rainbow and the big blind called. The turn is a blank 4 of spades and villain checks again.",
    positionLens: quizLens([
      ["Big Blind", "Check-call", "As defender, top pair can let the aggressor keep bluffing while controlling pot size."],
      ["Cutoff", "Bet again", "In position against the blinds, top pair good kicker still gets value on blank turns."],
      ["Small Blind", "Bet smaller or check", "Out of position, use more cautious sizing because you act first on the river."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Too cautious", "Checking gives free equity to worse pairs and overcards that may call another bet."),
      quizChoice("bet", "Bet 160", "Best answer", "The blank turn keeps you ahead of many calling hands, so continue value betting.", true),
      quizChoice("overbet", "Bet 400", "Too large", "You want worse queens and pairs to call, not fold."),
      quizChoice("fold", "Fold", "Not available", "Villain checked, so folding is not a response."),
    ],
  }),
  quizQuestion({
    level: "Draw pressure",
    decision: "Combo draw after flop raise",
    title: "Your flop check-raise was called. Fire the turn?",
    stakes: "10 / 20",
    pot: 550,
    heroPosition: "Big Blind",
    heroCards: [quizCard("8", "club"), quizCard("7", "club")],
    board: [quizCard("9", "club"), quizCard("6", "diamond"), quizCard("2", "club"), quizCard("K", "spade")],
    opponents: [
      { name: "Button", action: "Called flop raise" },
    ],
    scenario:
      "You check-raised a combo draw on the flop and button called. The turn is the K of spades, an overcard that favors your aggressive story.",
    positionLens: quizLens([
      ["Button", "Bet when checked to", "In position, the same draw can keep pressure and deny equity."],
      ["Small Blind", "Barrel selectively", "Out of position, barrel when the turn helps your perceived range."],
      ["Cutoff", "Use pressure", "As aggressor, strong draws can continue on scare cards that attack one-pair hands."],
    ]),
    choices: [
      quizChoice("check", "Check", "Gives up pressure", "Checking realizes equity, but the king is a strong card to keep applying pressure."),
      quizChoice("bet", "Bet 320", "Best answer", "The king helps your represented range, and your draw has outs when called.", true),
      quizChoice("fold", "Fold", "Not available", "No one bet yet, and your equity remains strong."),
      quizChoice("all-in", "All in", "Too much", "Shoving can be useful at shallow stacks, but here a sized barrel keeps bluffs and value balanced."),
    ],
  }),
  quizQuestion({
    level: "Made flush",
    decision: "Nut flush completes",
    title: "You turn the nut flush. How do you get paid?",
    stakes: "10 / 20",
    pot: 260,
    heroPosition: "Cutoff",
    heroCards: [quizCard("A", "club"), quizCard("5", "club")],
    board: [quizCard("J", "club"), quizCard("8", "diamond"), quizCard("3", "club"), quizCard("2", "club")],
    opponents: [
      { name: "Big Blind", action: "Checks" },
    ],
    scenario:
      "You opened cutoff, c-bet the flop with the nut-flush draw, and the big blind called. The turn completes your nut flush and villain checks.",
    positionLens: quizLens([
      ["Button", "Value bet", "In position, bet now before the board pairs or action dies."],
      ["Big Blind", "Check-raise sometimes", "As defender with the nut flush, trapping can work against aggressive opponents."],
      ["Small Blind", "Lead small sometimes", "Out of position, a small lead can get called by pairs and lower clubs."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Misses value", "Checking hides strength but risks losing a street from worse clubs and made hands."),
      quizChoice("bet", "Bet 220", "Best answer", "Bet for value while worse flushes, sets, and pairs with clubs can still call.", true),
      quizChoice("overbet", "Bet 700", "Too polar", "An overbet can be good sometimes, but it may fold out the worse hands you want calling."),
      quizChoice("fold", "Fold", "Not possible", "You have the nuts and face no bet."),
    ],
  }),
  quizQuestion({
    level: "Pot odds",
    decision: "Open-ender facing a bet",
    title: "You have an open-ended straight draw on the turn. Call?",
    stakes: "10 / 20",
    pot: 300,
    heroPosition: "Small Blind",
    heroCards: [quizCard("10", "heart"), quizCard("9", "diamond")],
    board: [quizCard("Q", "club"), quizCard("J", "spade"), quizCard("4", "diamond"), quizCard("2", "heart")],
    opponents: [
      { name: "Cutoff", action: "Bets 160" },
      { name: "Big Blind", action: "Folds" },
    ],
    scenario:
      "You called from the small blind and check-called flop. The turn bricks, you check, and cutoff bets 160 into 300.",
    positionLens: quizLens([
      ["Button", "Float more often", "In position, the draw can call and realize implied odds more easily."],
      ["Big Blind", "Call with price", "Closing action improves the call, especially if stacks behind are deep."],
      ["Cutoff", "Semi-bluff when checked to", "As aggressor, T-9 can apply fold equity instead of only drawing."],
    ]),
    choices: [
      quizChoice("fold", "Fold", "Too tight with odds", "You have eight clean straight outs and some implied odds."),
      quizChoice("call", "Call", "Best answer", "The price plus implied odds make calling reasonable, while raising may run into strong value.", true),
      quizChoice("raise", "Check-raise", "Too ambitious", "Without fold equity reads, raising risks too much with a draw that can call profitably."),
      quizChoice("all-in", "All in", "Overplay", "A shove mostly gets called by strong hands and better draws."),
    ],
  }),
  quizQuestion({
    level: "Set value",
    decision: "Top set on safe turn",
    title: "You flopped top set and the turn is safe. What sizing?",
    stakes: "10 / 20",
    pot: 300,
    heroPosition: "Button",
    heroCards: [quizCard("7", "heart"), quizCard("7", "club")],
    board: [quizCard("7", "diamond"), quizCard("5", "spade"), quizCard("2", "club"), quizCard("Q", "heart")],
    opponents: [
      { name: "Big Blind", action: "Checks" },
    ],
    scenario:
      "You opened button, big blind called, and your flop bet with top set was called. The turn queen is safe and villain checks.",
    positionLens: quizLens([
      ["Big Blind", "Check-raise for value", "As defender, a set can punish second barrels and build the pot."],
      ["Cutoff", "Keep betting", "In position, sets should build the pot before action-killing rivers."],
      ["Small Blind", "Bet bigger", "Out of position, charge draws and pair-plus-draw hands before the river."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Too slow", "You risk missing value from queens, pairs, and draws."),
      quizChoice("bet", "Bet 220", "Best answer", "Use a strong value size to build the pot and charge worse made hands.", true),
      quizChoice("tiny", "Bet 40", "Too small", "A tiny bet leaves too much value behind."),
      quizChoice("fold", "Fold", "Not available", "Villain checked and you have a monster."),
    ],
  }),
  quizQuestion({
    level: "Two pair trap",
    decision: "Defender improves on turn",
    title: "You defend big blind and turn two pair. Villain barrels.",
    stakes: "10 / 20",
    pot: 260,
    heroPosition: "Big Blind",
    heroCards: [quizCard("A", "diamond"), quizCard("9", "club")],
    board: [quizCard("A", "club"), quizCard("9", "diamond"), quizCard("3", "spade"), quizCard("K", "heart")],
    opponents: [
      { name: "Button", action: "Bets 180" },
    ],
    scenario:
      "Button opened, you defended, and check-called A-9-3. The turn is K, giving you two pair, and button bets 180.",
    positionLens: quizLens([
      ["Button", "Value bet", "As aggressor, two pair can bet for value and protection."],
      ["Small Blind", "Check-raise", "Out of position, raising can get value from strong aces and draws."],
      ["Cutoff", "Raise versus loose barrels", "In position, raising denies equity and builds value against aggressive opponents."],
    ]),
    choices: [
      quizChoice("fold", "Fold", "Way too tight", "Two pair is much too strong to fold to one turn barrel."),
      quizChoice("call", "Call", "Playable", "Calling keeps bluffs in, but many rivers can reduce action or create scary runouts."),
      quizChoice("raise", "Check-raise to 520", "Best answer", "Raise for value against strong aces, kings, and draws while stacks can still go in.", true),
      quizChoice("minraise", "Min-raise", "Too small", "A tiny raise gives draws and one-pair hands too good a price."),
    ],
  }),
  quizQuestion({
    level: "Showdown value",
    decision: "Pocket queens under an ace",
    title: "You c-bet queens on an ace-high flop and got called. Turn bricks.",
    stakes: "10 / 20",
    pot: 260,
    heroPosition: "Under the Gun",
    heroCards: [quizCard("Q", "heart"), quizCard("Q", "club")],
    board: [quizCard("A", "spade"), quizCard("8", "diamond"), quizCard("4", "club"), quizCard("2", "spade")],
    opponents: [
      { name: "Big Blind", action: "Checks" },
    ],
    scenario:
      "You opened UTG, big blind called, and you c-bet A-8-4. Villain called. The turn is 2 of spades and villain checks.",
    positionLens: quizLens([
      ["Button", "Check back more", "In position, queens can realize showdown value and bluff-catch rivers."],
      ["Big Blind", "Check-call selectively", "As defender, queens are a bluff-catcher, not a value hand."],
      ["Cutoff", "Check often", "Once called on ace-high, queens do not need to turn into a big bluff by default."],
    ]),
    choices: [
      quizChoice("bet", "Bet 180", "Too thin", "You mostly get called by aces and fold out hands you already beat."),
      quizChoice("check", "Check back", "Best answer", "Preserve showdown value and avoid bloating the pot against ace-heavy calls.", true),
      quizChoice("overbet", "Bet 500", "Bad bluff candidate", "Queens block some folds and have showdown value, making them a poor large bluff."),
      quizChoice("fold", "Fold", "Not available", "Villain checked, so no fold decision exists."),
    ],
  }),
  quizQuestion({
    level: "Pair plus draw",
    decision: "Turn equity with J-T",
    title: "You picked up a straight draw with middle pair. Apply pressure?",
    stakes: "10 / 20",
    pot: 240,
    heroPosition: "Cutoff",
    heroCards: [quizCard("J", "spade"), quizCard("10", "spade")],
    board: [quizCard("10", "club"), quizCard("8", "club"), quizCard("3", "diamond"), quizCard("Q", "spade")],
    opponents: [
      { name: "Big Blind", action: "Checks" },
    ],
    scenario:
      "You opened cutoff, c-bet T-8-3, and got called. The turn queen gives you pair plus open-ended straight draw, and villain checks.",
    positionLens: quizLens([
      ["Button", "Bet often", "In position, pair plus draw has value, equity, and fold pressure."],
      ["Big Blind", "Check-call", "As defender, avoid turning a medium-strength hand into a bloated pot too often."],
      ["Small Blind", "Check more", "Out of position, you lose river control if raised."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Reasonable", "Checking realizes equity, but gives up pressure against weak pairs and draws."),
      quizChoice("bet", "Bet 180", "Best answer", "You can get value from draws, fold some better hands, and improve on many rivers.", true),
      quizChoice("all-in", "All in", "Too much", "The hand is strong but not a stack-off by default."),
      quizChoice("fold", "Fold", "Not available", "Villain checked and you have equity."),
    ],
  }),
  quizQuestion({
    level: "Give-up spot",
    decision: "Missed overcards on bad turn",
    title: "Your flop c-bet was called and the turn misses. Keep bluffing?",
    stakes: "10 / 20",
    pot: 260,
    heroPosition: "Button",
    heroCards: [quizCard("A", "heart"), quizCard("K", "diamond")],
    board: [quizCard("9", "diamond"), quizCard("8", "diamond"), quizCard("5", "spade"), quizCard("2", "club")],
    opponents: [
      { name: "Big Blind", action: "Checks" },
    ],
    scenario:
      "You opened button with A-K, c-bet 9-8-5 two-tone, and the big blind called. The turn is a blank 2 of clubs.",
    positionLens: quizLens([
      ["Big Blind", "Check-fold often", "As defender, ace-high without a draw has little reason to continue."],
      ["Cutoff", "Give up more", "Against ranges that connect with 9-8-5, A-K without a draw is a poor barrel."],
      ["Small Blind", "Avoid big bluffs", "Out of position, this hand has low equity and few credible blockers."],
    ]),
    choices: [
      quizChoice("barrel", "Bet 190", "Too stubborn", "This turn does not improve your story, and villain's flop calls connect well."),
      quizChoice("check", "Check back", "Best answer", "Take the free card and give up often unimproved. You lack equity and useful blockers.", true),
      quizChoice("overbet", "Bet 600", "Spewy", "Big bluffs need strong blockers or range advantage. This spot has neither."),
      quizChoice("all-in", "All in", "Massive punt", "You are risking stacks with ace-high and poor fold equity."),
    ],
  }),
  quizQuestion({
    level: "Turn scare card",
    decision: "Overcard improves your range",
    title: "The ace turns after your flop c-bet was called. Fire again?",
    stakes: "10 / 20",
    pot: 250,
    heroPosition: "Button",
    heroCards: [quizCard("K", "heart"), quizCard("J", "heart")],
    board: [quizCard("10", "spade"), quizCard("6", "diamond"), quizCard("2", "club"), quizCard("A", "club")],
    opponents: [
      { name: "Big Blind", action: "Checks" },
    ],
    scenario:
      "You opened button with K-J suited, c-bet T-6-2, and got called. The ace of clubs hits the turn and villain checks.",
    positionLens: quizLens([
      ["Cutoff", "Barrel often", "The ace favors the pre-flop raiser and gives broadway hands more equity."],
      ["Big Blind", "Check-fold more", "As defender, many weak pairs struggle when the ace favors the aggressor."],
      ["Small Blind", "Use smaller pressure", "Out of position, keep bluffs sized so you can still navigate rivers."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Misses pressure", "Checking realizes equity, but the ace is a strong card for your range."),
      quizChoice("bet", "Bet 160", "Best answer", "You gain fold equity from the ace and have a gutshot to Broadway when called.", true),
      quizChoice("pot", "Bet pot", "Too large", "A medium barrel pressures weak pairs without risking too much."),
      quizChoice("fold", "Fold", "Not available", "Villain checked."),
    ],
  }),
].slice(0, 10);

QUIZ_QUESTIONS.river = [
  QUIZ_QUESTIONS.river,
  quizQuestion({
    level: "Missed draw bluff",
    decision: "Nut blockers on river",
    title: "Your club draw missed. Should you bluff the river?",
    stakes: "10 / 20",
    pot: 620,
    heroPosition: "Button",
    heroCards: [quizCard("A", "club"), quizCard("K", "club")],
    board: [quizCard("Q", "club"), quizCard("7", "club"), quizCard("2", "diamond"), quizCard("9", "spade"), quizCard("3", "heart")],
    opponents: [
      { name: "Big Blind", action: "Checks river" },
    ],
    scenario:
      "You bet flop and turn with the nut-club draw. The river bricks, big blind checks, and you hold the ace of clubs blocker.",
    positionLens: quizLens([
      ["Big Blind", "Check mostly", "As defender, missed A-K has showdown only rarely and poor lead credibility."],
      ["Cutoff", "Bluff some", "In position with nut blockers, this hand can pressure one-pair bluff-catchers."],
      ["Small Blind", "Bluff less", "Out of position, missed draws get called more often without positional leverage."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Too give-up heavy", "Checking surrenders with ace-high after telling a strong story."),
      quizChoice("bet", "Bet 420", "Best answer", "The ace-club blocker removes nut flushes, and your line credibly represents strong value.", true),
      quizChoice("tiny", "Bet 80", "Too small", "A tiny bluff gives pairs an easy call."),
      quizChoice("all-in", "All in", "Too polar", "A shove may work sometimes, but a large non-all-in bet risks less while pressuring bluff-catchers."),
    ],
  }),
  quizQuestion({
    level: "Bluff catcher",
    decision: "Top pair facing river bet",
    title: "You have K-Q on a paired low river and face a bet.",
    stakes: "10 / 20",
    pot: 420,
    heroPosition: "Big Blind",
    heroCards: [quizCard("K", "club"), quizCard("Q", "heart")],
    board: [quizCard("K", "diamond"), quizCard("7", "club"), quizCard("2", "spade"), quizCard("4", "heart"), quizCard("2", "club")],
    opponents: [
      { name: "Button", action: "Bets 260" },
    ],
    scenario:
      "Button opened, you defended, and check-called flop and turn. The river pairs the 2 and button bets 260.",
    positionLens: quizLens([
      ["Button", "Value bet thinly", "In position, K-Q can target worse kings when checked to."],
      ["Small Blind", "Call selectively", "Out of position, top pair is a bluff-catcher and depends on villain frequency."],
      ["Cutoff", "Bet smaller for value", "As aggressor, use a size worse kings can call."],
    ]),
    choices: [
      quizChoice("fold", "Fold", "Too tight versus button", "Button has missed draws and worse kings. Folding top pair good kicker too often is exploitable."),
      quizChoice("call", "Call", "Best answer", "You block strong K-Q value and beat enough bluffs and thinner value hands for this price.", true),
      quizChoice("raise", "Check-raise", "Overplays hand", "Raising folds bluffs and gets called by stronger value."),
      quizChoice("all-in", "All in", "Bad conversion", "Turning top pair into a bluff is unnecessary and risky."),
    ],
  }),
  quizQuestion({
    level: "Nut value",
    decision: "River nut flush",
    title: "You river the nut flush. How much value?",
    stakes: "10 / 20",
    pot: 700,
    heroPosition: "Cutoff",
    heroCards: [quizCard("A", "club"), quizCard("5", "club")],
    board: [quizCard("J", "club"), quizCard("8", "diamond"), quizCard("3", "club"), quizCard("2", "club"), quizCard("9", "heart")],
    opponents: [
      { name: "Big Blind", action: "Checks river" },
    ],
    scenario:
      "You bet flop and turn after making the nut flush. The river bricks and big blind checks a third time.",
    positionLens: quizLens([
      ["Button", "Value bet big", "In position, the nut flush wants to target lower flushes and stubborn two-pair hands."],
      ["Big Blind", "Check-raise versus bettors", "As defender, the nuts can trap aggressive opponents."],
      ["Small Blind", "Lead if checks risk back", "Out of position, lead when villain will check back too often."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Leaves value", "You have the nuts and should not miss a river value bet."),
      quizChoice("bet", "Bet 520", "Best answer", "A large value bet targets lower flushes, sets, and sticky bluff-catchers.", true),
      quizChoice("tiny", "Bet 80", "Too small", "The nuts want more value than a token bet."),
      quizChoice("fold", "Fold", "Not possible", "Villain checked and you hold the nuts."),
    ],
  }),
  quizQuestion({
    level: "Top two value",
    decision: "Paired river with strong two pair",
    title: "You have Q-J on Q-J-8-2-2. Value bet?",
    stakes: "10 / 20",
    pot: 520,
    heroPosition: "Button",
    heroCards: [quizCard("Q", "diamond"), quizCard("J", "spade")],
    board: [quizCard("Q", "club"), quizCard("J", "heart"), quizCard("8", "spade"), quizCard("2", "diamond"), quizCard("2", "club")],
    opponents: [
      { name: "Big Blind", action: "Checks river" },
    ],
    scenario:
      "You raised button, bet flop and turn with top two, and the river pairs the deuce. Big blind checks.",
    positionLens: quizLens([
      ["Cutoff", "Value bet", "In position, top two still beats many queens and jacks."],
      ["Big Blind", "Check-call often", "As defender, this hand bluff-catches or value owns worse two-pair less often."],
      ["Small Blind", "Bet smaller", "Out of position, size where worse queens can still call."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Too cautious", "The paired deuce rarely changes the best hand, and worse queens can call."),
      quizChoice("bet", "Bet 340", "Best answer", "Bet for value against Q-x, J-x, and stubborn bluff-catchers.", true),
      quizChoice("all-in", "All in", "Too polar", "A shove may fold exactly the worse hands you want paid by."),
      quizChoice("fold", "Fold", "Not available", "Villain checked."),
    ],
  }),
  quizQuestion({
    level: "Flush completes",
    decision: "Overpair facing river lead",
    title: "You have aces and the flush completes. Villain leads big.",
    stakes: "10 / 20",
    pot: 620,
    heroPosition: "Under the Gun",
    heroCards: [quizCard("A", "heart"), quizCard("A", "diamond")],
    board: [quizCard("K", "spade"), quizCard("9", "spade"), quizCard("4", "club"), quizCard("6", "spade"), quizCard("2", "diamond")],
    opponents: [
      { name: "Big Blind", action: "Bets 520" },
    ],
    scenario:
      "You bet flop and checked back the spade turn. The river bricks low, and big blind now leads 520 into 620.",
    positionLens: quizLens([
      ["Button", "Call slightly more", "Position gives more information, but no-spade aces remain a bluff-catcher."],
      ["Big Blind", "Value bet flushes", "As defender, completed flushes can lead big into capped overpairs."],
      ["Cutoff", "Fold versus tight leads", "Without a spade, aces struggle against large river leads from passive players."],
    ]),
    choices: [
      quizChoice("call", "Call", "Hero call only", "Calling can beat bluffs, but this line is heavily weighted toward flushes."),
      quizChoice("fold", "Fold", "Best answer", "Without a spade blocker and facing a large lead, overpair shrinks to a bluff-catcher.", true),
      quizChoice("raise", "Raise", "Bad idea", "Raising folds bluffs and gets called by flushes."),
      quizChoice("all-in", "All in", "Overplay", "You cannot credibly turn no-spade aces into value here."),
    ],
  }),
  quizQuestion({
    level: "Missed draw decision",
    decision: "Combo draw misses river",
    title: "Your big draw missed. Is this a good bluff card?",
    stakes: "10 / 20",
    pot: 650,
    heroPosition: "Big Blind",
    heroCards: [quizCard("8", "club"), quizCard("7", "club")],
    board: [quizCard("9", "club"), quizCard("6", "diamond"), quizCard("2", "club"), quizCard("K", "spade"), quizCard("A", "heart")],
    opponents: [
      { name: "Button", action: "Called turn" },
    ],
    scenario:
      "You check-raised flop and barreled the king turn with a combo draw. Button called. The river ace arrives and your draw misses.",
    positionLens: quizLens([
      ["Button", "Bluff more", "In position, missed draws can use blockers and final action better."],
      ["Small Blind", "Choose blockers carefully", "Out of position, bluff missed draws mostly when river favors your value range."],
      ["Cutoff", "Pressure capped ranges", "As aggressor, the ace can be a strong final barrel if villain has many one-pair hands."],
    ]),
    choices: [
      quizChoice("check", "Check", "Gives up", "Checking accepts losing to many pairs after showing aggression."),
      quizChoice("bet", "Bet 520", "Best answer", "The ace is a strong scare card for your line, and you can fold out many one-pair hands.", true),
      quizChoice("tiny", "Bet 100", "Too small", "Small bluffs rarely fold out the hands you need to fold."),
      quizChoice("all-in", "All in", "Too risky", "A huge shove may be credible, but it risks too much without key blockers."),
    ],
  }),
  quizQuestion({
    level: "Showdown control",
    decision: "Weak showdown on river",
    title: "You have pocket sixes on K-Q-J-3-2. Bluff or check?",
    stakes: "10 / 20",
    pot: 300,
    heroPosition: "Button",
    heroCards: [quizCard("6", "spade"), quizCard("6", "diamond")],
    board: [quizCard("K", "heart"), quizCard("Q", "heart"), quizCard("J", "club"), quizCard("3", "diamond"), quizCard("2", "club")],
    opponents: [
      { name: "Big Blind", action: "Checks river" },
    ],
    scenario:
      "You checked back flop and turn after opening button. The river bricks and big blind checks again.",
    positionLens: quizLens([
      ["Big Blind", "Check", "As defender, pocket sixes have showdown value against missed hands but poor bluff blockers."],
      ["Cutoff", "Check often", "Small pairs are not ideal river bluffs without blockers to strong hands."],
      ["Small Blind", "Avoid bluffing", "Out of position, this hand has low fold equity and can sometimes win at showdown."],
    ]),
    choices: [
      quizChoice("bet", "Bet 240", "Poor blockers", "You do not block K-x, Q-x, J-x, or straights, so this bluff is low quality."),
      quizChoice("check", "Check back", "Best answer", "Take showdown. Pocket sixes beat some missed draws and are a weak bluff candidate.", true),
      quizChoice("all-in", "All in", "Too much", "A huge bluff without blockers is not necessary."),
      quizChoice("tiny", "Bet 40", "No purpose", "A tiny bet gets called by better and folds worse."),
    ],
  }),
  quizQuestion({
    level: "Straight value",
    decision: "Rivered straight",
    title: "You river the straight after barreling. How do you size?",
    stakes: "10 / 20",
    pot: 600,
    heroPosition: "Cutoff",
    heroCards: [quizCard("10", "heart"), quizCard("9", "diamond")],
    board: [quizCard("Q", "club"), quizCard("J", "spade"), quizCard("4", "diamond"), quizCard("2", "heart"), quizCard("8", "club")],
    opponents: [
      { name: "Big Blind", action: "Checks river" },
    ],
    scenario:
      "You opened cutoff, barreled turn with the open-ender, and the river 8 completes your straight. Big blind checks.",
    positionLens: quizLens([
      ["Button", "Value bet big", "In position, the straight targets two pair, sets, and stubborn top pair."],
      ["Big Blind", "Check-raise sometimes", "As defender, a rivered straight can trap aggressive opponents."],
      ["Small Blind", "Lead often", "Out of position, lead when villain may check back too many strong one-pair hands."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Misses value", "You made a strong hand and should target worse made hands."),
      quizChoice("bet", "Bet 480", "Best answer", "A large value bet gets paid by sets, two pair, and strong queens.", true),
      quizChoice("tiny", "Bet 60", "Too small", "The hand is strong enough to seek real value."),
      quizChoice("fold", "Fold", "Not available", "Villain checked."),
    ],
  }),
  quizQuestion({
    level: "Thin value",
    decision: "Second pair checks through",
    title: "You have second pair and river checks to you. Value bet thin?",
    stakes: "10 / 20",
    pot: 260,
    heroPosition: "Button",
    heroCards: [quizCard("Q", "spade"), quizCard("10", "spade")],
    board: [quizCard("K", "diamond"), quizCard("10", "club"), quizCard("4", "heart"), quizCard("4", "spade"), quizCard("2", "diamond")],
    opponents: [
      { name: "Big Blind", action: "Checks river" },
    ],
    scenario:
      "You opened button and checked back flop. Turn checked through. River bricks, and big blind checks a third time.",
    positionLens: quizLens([
      ["Cutoff", "Thin value sometimes", "In position, second pair can target worse tens and small pairs after passive lines."],
      ["Big Blind", "Check-call selectively", "As defender, second pair is mostly a bluff-catcher."],
      ["Small Blind", "Check more", "Out of position, thin value gets harder because raises are uncomfortable."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Safe, but misses thin value", "Checking wins often, but worse tens and pocket pairs may call small."),
      quizChoice("bet", "Bet 90", "Best answer", "A small thin value bet targets worse tens and stubborn pairs after villain showed weakness.", true),
      quizChoice("pot", "Bet 260", "Too large", "A pot-sized bet folds the worse hands you target."),
      quizChoice("all-in", "All in", "Wild", "Second pair is not a stack-pressure hand here."),
    ],
  }),
  quizQuestion({
    level: "Blocker bluff",
    decision: "Missed straight with ace blocker",
    title: "You miss Broadway but block top pair. Bluff river?",
    stakes: "10 / 20",
    pot: 440,
    heroPosition: "Cutoff",
    heroCards: [quizCard("A", "diamond"), quizCard("10", "diamond")],
    board: [quizCard("K", "club"), quizCard("Q", "spade"), quizCard("7", "heart"), quizCard("4", "club"), quizCard("2", "spade")],
    opponents: [
      { name: "Big Blind", action: "Checks river" },
    ],
    scenario:
      "You opened cutoff and bet flop with a Broadway draw. Turn checked through, river bricks, and big blind checks.",
    positionLens: quizLens([
      ["Button", "Bluff sometimes", "In position, A-T blocks A-K and A-Q and can pressure weak pairs."],
      ["Big Blind", "Check-fold often", "As defender, missed Broadway has poor showdown value and little lead credibility."],
      ["Small Blind", "Bluff less", "Out of position, failed draws without a strong story get called more often."],
    ]),
    choices: [
      quizChoice("check", "Check back", "Too passive if villain over-folds", "Ace-high rarely wins, and you have blockers to strong top-pair calls."),
      quizChoice("bet", "Bet 300", "Best answer", "A-T blocks strong K-A and Q-A continues and can fold out weak pairs.", true),
      quizChoice("tiny", "Bet 50", "Too small", "A small bluff does not create enough pressure."),
      quizChoice("all-in", "All in", "Too much", "You have blockers, but not enough reason to risk the full stack."),
    ],
  }),
].slice(0, 10);

const storedSession = loadStoredSession();

const state = {
  table: null,
  authMode: "signin",
  account: storedSession ? accountFromSession(storedSession) : null,
  session: storedSession,
  setupNotice: "",
  actionNotice: "",
  raiseComposerActive: false,
  raiseComposerTurnKey: "",
  selectedRaisePreset: "",
  selectedRaiseAmount: 0,
  seatClaimBusy: false,
  botTurnTimer: null,
  botTurnKey: "",
  botTurnBusy: false,
  thinkingTickTimer: null,
  thinkingTickKey: "",
  soundEnabled: true,
  audioContext: null,
  actionSoundKeys: new Map(),
  actionSoundTableKey: "",
  tablePollTimer: null,
  tablePollBusy: false,
  adminUsers: [],
  adminSelectedUserIds: new Set(),
  adminUsersBusy: false,
  adminUsersLoaded: false,
  adminNotice: "",
  adminRoleFilter: "all",
  adminSearchTerm: "",
  pendingProfileImage: null,
  profileDraftImage: null,
  hostTables: [],
  hostTablesBusy: false,
  hostTablesLoaded: false,
  hostRoomsNotice: "",
  tournaments: [],
  tournamentsBusy: false,
  tournamentsLoaded: false,
  tournamentsNotice: "",
  playerCashTables: [],
  playerCashTablesLoaded: false,
  tournamentPollTimer: null,
  rankings: [],
  rankingsBusy: false,
  rankingsLoaded: false,
  rankingsNotice: "",
  lastStatsHandKey: "",
  quizOpen: false,
  quizCategory: "preflop",
  quizQuestionIndexByCategory: {
    preflop: 0,
    flop: 0,
    turn: 0,
    river: 0,
  },
  quizAnswers: {},
  quizSelectedChoice: "",
};

const BOT_THINK_DELAY_MS = 3000;
const THINKING_TICK_MS = 420;
const TABLE_POLL_MS = 1000;
const TOURNAMENT_POLL_MS = 5000;

els.signInLink.addEventListener("click", () => showAuthPanel("signin"));
els.signUpLink.addEventListener("click", () => showAuthPanel("signup"));
els.guestLink.addEventListener("click", () => showAuthPanel("guest"));
els.quizLink.addEventListener("click", openQuiz);
els.quizBackButton.addEventListener("click", closeQuiz);
els.signOutButton.addEventListener("click", signOut);
els.topbarAvatar.addEventListener("click", toggleProfileDialog);
els.profileCloseButton.addEventListener("click", closeProfileDialog);
els.profileEditPhotoInput.addEventListener("change", handleProfileEditPhoto);
els.profileDisplayName.addEventListener("input", renderProfileEditPreview);
els.profileEditRemoveButton.addEventListener("click", () => {
  state.profileDraftImage = null;
  els.profileEditPhotoInput.value = "";
  renderProfileEditPreview();
});
els.profileSaveButton.addEventListener("click", saveProfile);
els.profileEditPreview.addEventListener("click", openPhotoLightbox);
els.photoLightboxBackdrop.addEventListener("click", closePhotoLightbox);
els.photoLightboxClose.addEventListener("click", closePhotoLightbox);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePhotoLightbox();
  }
});
els.soundToggleButton.addEventListener("click", () => {
  state.soundEnabled = !state.soundEnabled;
  if (state.soundEnabled) {
    ensureAudio();
  } else {
    stopThinkingTick();
  }
  renderSoundState();
});
els.authCloseButton.addEventListener("click", () => {
  els.authPanel.classList.add("is-hidden");
  els.authNotice.textContent = "";
  renderRoleGuide();
});
els.authSubmitButton.addEventListener("click", applyAuthProfile);
els.profilePhotoInput.addEventListener("change", handleProfilePhoto);
els.removeProfilePhotoButton.addEventListener("click", () => {
  state.pendingProfileImage = null;
  els.profilePhotoInput.value = "";
  renderProfilePhotoPreview();
});
els.authRole.addEventListener("change", () => {
  renderAuthRoleFields();
  renderAuthRoleNotice();
  renderRoleGuide();
});
els.authPanel.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    applyAuthProfile();
  }
});

els.tableForm.addEventListener("submit", (event) => {
  event.preventDefault();
  ensureAudio();
  createTable();
});
els.tableForm.querySelectorAll('input[name="gameType"]').forEach((input) => {
  input.addEventListener("change", renderTournamentCreationOptions);
});
els.openTableButton.addEventListener("click", () => {
  ensureAudio();
  createTable();
});
els.createStayButton.addEventListener("click", () => {
  ensureAudio();
  createTable({ stayInLobby: true });
});
els.joinTableButton.addEventListener("click", () => {
  ensureAudio();
  joinTable();
});
els.hostRoomsRefreshButton.addEventListener("click", loadHostTables);
els.tournamentsRefreshButton.addEventListener("click", loadTournaments);
els.rankingsRefreshButton.addEventListener("click", loadRankings);
els.quizCategoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-quiz-category]");
  if (button instanceof HTMLButtonElement) {
    state.quizCategory = button.dataset.quizCategory || "preflop";
    state.quizSelectedChoice = getCurrentQuizAnswerId();
    renderQuiz();
  }
});
els.quizChoices.addEventListener("click", (event) => {
  const button = event.target.closest("[data-quiz-choice]");
  if (button instanceof HTMLButtonElement) {
    state.quizSelectedChoice = button.dataset.quizChoice || "";
    state.quizAnswers[getQuizAnswerKey()] = state.quizSelectedChoice;
    renderQuiz();
  }
});
els.quizPrevButton.addEventListener("click", () => moveQuizQuestion(-1));
els.quizNextButton.addEventListener("click", () => moveQuizQuestion(1));
els.hostRoomList.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-host-view]");
  const closeButton = event.target.closest("[data-host-close]");
  if (viewButton instanceof HTMLButtonElement) {
    viewHostTable(viewButton.dataset.hostView);
  } else if (closeButton instanceof HTMLButtonElement) {
    closeHostTable(closeButton.dataset.hostClose);
  }
});
els.tournamentList.addEventListener("click", (event) => {
  const joinButton = event.target.closest("[data-tournament-join]");
  const tableButton = event.target.closest("[data-player-table-join]");
  if (joinButton instanceof HTMLButtonElement) {
    joinTournament(joinButton.dataset.tournamentJoin);
  } else if (tableButton instanceof HTMLButtonElement) {
    joinPlayerTable(tableButton.dataset.playerTableJoin);
  }
});
els.roomCodeInput.addEventListener("input", () => {
  els.roomCodeInput.value = els.roomCodeInput.value.slice(0, 36);
});
els.adminRefreshButton.addEventListener("click", loadAdminUsers);
els.adminSelectAll.addEventListener("change", () => {
  const selectableUsers = getFilteredAdminUsers().filter((user) => !user.protected);
  state.adminSelectedUserIds = els.adminSelectAll.checked
    ? new Set(selectableUsers.map((user) => user.id))
    : new Set();
  renderAdminUsers();
});
els.adminActivateButton.addEventListener("click", () => updateSelectedAdminUsers(true));
els.adminDeactivateButton.addEventListener("click", () => updateSelectedAdminUsers(false));
els.adminRoleFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-admin-role-filter]");
  if (button instanceof HTMLButtonElement) {
    state.adminRoleFilter = button.dataset.adminRoleFilter || "all";
    state.adminSelectedUserIds.clear();
    renderAdminUsers();
  }
});
els.adminUserSearch.addEventListener("input", () => {
  state.adminSearchTerm = els.adminUserSearch.value.trim().toLowerCase();
  state.adminSelectedUserIds.clear();
  renderAdminUsers();
});
els.adminUsersBody.addEventListener("change", (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;

  const userId = input.dataset.userId;
  if (!userId) return;

  if (input.matches("[data-admin-select]")) {
    if (input.checked) {
      state.adminSelectedUserIds.add(userId);
    } else {
      state.adminSelectedUserIds.delete(userId);
    }
    renderAdminUsers();
    return;
  }

  if (input.matches("[data-admin-toggle]")) {
    updateAdminUserStatus([userId], input.checked);
  }
});

els.leaveButton.addEventListener("click", () => {
  stopTablePolling();
  clearBotTurnTimer();
  stopThinkingTick();
  state.table = null;
  state.actionNotice = "";
  state.raiseComposerActive = false;
  state.raiseComposerTurnKey = "";
  state.selectedRaisePreset = "";
  state.selectedRaiseAmount = 0;
  state.hostTablesLoaded = false;
  state.tournamentsLoaded = false;
  render();
});

els.amountInput.addEventListener("input", () => {
  state.raiseComposerActive = true;
  state.selectedRaisePreset = getRaisePresetForPosition(Number(els.amountInput.value));
  state.selectedRaiseAmount = calculateRaiseAmountForSlider(Number(els.amountInput.value));
  els.amountOutput.textContent = chips(state.selectedRaiseAmount);
  renderAmountActionLabels();
  renderRaisePresets();
});

els.actionConsole.addEventListener("click", (event) => {
  const presetButton = event.target.closest("[data-raise-preset]");
  if (presetButton instanceof HTMLButtonElement) {
    applyRaisePreset(presetButton.dataset.raisePreset || "");
  }
});

els.foldButton.addEventListener("click", () => sendAction("fold"));
els.checkButton.addEventListener("click", () => sendAction("check"));
els.callButton.addEventListener("click", () => sendAction("call"));
els.betButton.addEventListener("click", () => sendAction("bet", getSelectedRaiseAmount()));
els.raiseButton.addEventListener("click", () => sendIncreaseAction());
els.allInButton.addEventListener("click", () => sendAction("all-in"));
els.nextHandButton.addEventListener("click", startNextHand);
els.seatPickerButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-seat-number]");
  if (button instanceof HTMLButtonElement) {
    claimSeat(Number(button.dataset.seatNumber));
  }
});
els.playersGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-open-seat-number]");
  if (button instanceof HTMLButtonElement) {
    claimSeat(Number(button.dataset.openSeatNumber));
  }
});

async function createTable(options = {}) {
  clearBotTurnTimer();
  stopThinkingTick();
  const formData = new FormData(els.tableForm);
  const [smallBlind, bigBlind] = String(formData.get("blindPreset")).split(":").map(Number);
  const tableName = String(formData.get("tableName") || "").trim();
  if (!canCurrentUser("create_cash_table") && !canCurrentUser("create_tournament")) {
    state.setupNotice = "Only the Host account can create a poker table.";
    renderSetupNotice();
    return;
  }
  if (tableName.length < 2) {
    state.setupNotice = "Enter a room name before opening the table.";
    renderSetupNotice();
    return;
  }

  state.setupNotice = options.stayInLobby ? "Creating room..." : "Opening table...";
  renderSetupNotice();

  try {
    await ensurePlayerSession();
    const table = await apiFetch("/api/poker/tables", {
      method: "POST",
      body: {
        playerName: formData.get("playerName"),
        tableName,
        mode: "masked",
        gameType: formData.get("gameType"),
        seatCount: Number(formData.get("seatCount")),
        smallBlind,
        bigBlind,
        blindLevelMinutes: Number(formData.get("blindLevelMinutes")),
        startingStack: Number(formData.get("startingStack")),
      },
    });
    els.tableForm.querySelector("#tableName").value = "";
    state.hostTablesLoaded = false;
    if (options.stayInLobby) {
      state.setupNotice = `${table.name} is active. Room code ${table.roomCode}.`;
      state.actionNotice = "";
      await loadHostTables({ silent: true });
    } else {
      state.table = table;
      state.setupNotice = "";
      state.actionNotice = "";
      resetActionSoundTracking(state.table);
      startTablePolling();
    }
    render();
  } catch (error) {
    state.setupNotice = error.message;
    renderSetupNotice();
  }
}

async function loadHostTables(options = {}) {
  if (!canCurrentUser("view_own_tables") || state.hostTablesBusy) return;
  state.hostTablesBusy = true;
  if (!options.silent) state.hostRoomsNotice = "Loading active tables...";
  renderHostTables();

  try {
    const payload = await apiFetch("/api/poker/host/tables");
    state.hostTables = payload.tables || [];
    state.hostTablesLoaded = true;
    if (!options.silent) {
      state.hostRoomsNotice = state.hostTables.length ? "" : "No active tables yet.";
    }
  } catch (error) {
    state.hostRoomsNotice = error.message;
  } finally {
    state.hostTablesBusy = false;
    renderHostTables();
  }
}

async function viewHostTable(tableId) {
  if (!tableId) return;
  state.hostRoomsNotice = "Opening table...";
  renderHostTables();
  try {
    state.table = await apiFetch(`/api/poker/tables/${tableId}`);
    state.actionNotice = "";
    resetActionSoundTracking(state.table);
    startTablePolling();
    render();
  } catch (error) {
    state.hostRoomsNotice = error.message;
    renderHostTables();
  }
}

async function closeHostTable(tableId) {
  if (!tableId) return;
  state.hostRoomsNotice = "Closing table...";
  renderHostTables();
  try {
    await apiFetch(`/api/poker/tables/${tableId}`, { method: "DELETE" });
    state.hostTables = state.hostTables.filter((table) => table.id !== tableId);
    state.hostRoomsNotice = state.hostTables.length ? "Table closed." : "Table closed. No active tables remain.";
    renderHostTables();
  } catch (error) {
    state.hostRoomsNotice = error.message;
    renderHostTables();
  }
}

function renderHostTables() {
  els.hostRoomsNotice.textContent = state.hostRoomsNotice;
  els.hostRoomsRefreshButton.disabled = state.hostTablesBusy;
  renderHostDashboardStats();
  if (!state.hostTables.length) {
    els.hostRoomList.innerHTML = renderEmptyState(
      state.hostTablesBusy ? "Loading active rooms" : "No active rooms",
      state.hostTablesBusy
        ? "Refreshing the Host dashboard."
        : "Create a cash game or tournament to see it here.",
    );
    return;
  }
  els.hostRoomList.innerHTML = state.hostTables
    .map(
      (table) => {
        const isTournament = table.gameType === "tournament";
        const seatState = tableSeatState({ ...table, joined: false, waitingForSeat: false });
        return `
        <article class="host-room-item ${table.openSeats === 0 ? "is-full" : ""}">
          <div class="host-room-main">
            <div class="host-room-title">
              <div>
                <div class="card-badges">
                  <span class="type-chip ${isTournament ? "is-tournament" : "is-cash"}">${isTournament ? "Tournament" : "Cash"}</span>
                  <span class="status-chip ${table.status === "waiting" ? "is-waiting" : "is-active"}">${escapeHtml(titleCase(table.status))}</span>
                  <span class="seat-state-chip ${seatState.className}">${escapeHtml(seatState.label)}</span>
                </div>
                <strong>${escapeHtml(table.name)}</strong>
              </div>
            </div>
            <span>${renderHostTableStructure(table)}</span>
            <div class="host-room-metrics">
              <span><small>Code</small><strong>${escapeHtml(table.roomCode)}</strong></span>
              <span><small>Seated</small><strong>${table.seatedPlayers}/${table.seatCount}</strong></span>
              <span><small>Open</small><strong>${table.openSeats ?? Math.max(0, table.seatCount - table.seatedPlayers)}</strong></span>
              <span><small>Waiting</small><strong>${table.waitingPlayers || 0}</strong></span>
            </div>
          </div>
          <div class="host-room-actions">
            <button type="button" data-host-view="${escapeHtml(table.id)}">View</button>
            <button class="danger-button" type="button" data-host-close="${escapeHtml(table.id)}">Close</button>
          </div>
        </article>
      `;
      },
    )
    .join("");
}

function renderHostDashboardStats() {
  if (!els.hostDashboardStats) return;
  const totals = state.hostTables.reduce(
    (summary, table) => {
      summary.rooms += 1;
      if (table.gameType === "tournament") summary.tournaments += 1;
      summary.seated += table.seatedPlayers || 0;
      summary.waiting += table.waitingPlayers || 0;
      summary.open += table.openSeats ?? Math.max(0, (table.seatCount || 0) - (table.seatedPlayers || 0));
      return summary;
    },
    { rooms: 0, tournaments: 0, seated: 0, waiting: 0, open: 0 },
  );

  els.hostDashboardStats.innerHTML = [
    ["Rooms", totals.rooms],
    ["Tournaments", totals.tournaments],
    ["Seated", totals.seated],
    ["Open seats", totals.open],
    ["Waiting", totals.waiting],
  ]
    .map(
      ([label, value]) =>
        `<span><small>${escapeHtml(label)}</small><strong>${value}</strong></span>`,
    )
    .join("");
}

function renderHostTableStructure(table) {
  if (table.gameType !== "tournament" || !table.tournament) {
    return `Cash game · ${chips(table.blinds?.smallBlind)} / ${chips(table.blinds?.bigBlind)}`;
  }
  const level = table.tournament.currentLevel;
  const clock = table.tournament.startedAt
    ? formatTournamentClock(table.tournament.secondsRemaining)
    : "waiting to start";
  return `Tournament · Level ${level.level} · ${chips(level.smallBlind)} / ${chips(level.bigBlind)} · ${clock}`;
}

async function loadTournaments() {
  if (!canCurrentUser("join_tournament") || state.tournamentsBusy || state.table) return;
  state.tournamentsBusy = true;
  if (!state.tournamentsLoaded) {
    state.tournamentsNotice = "Loading tournaments...";
    renderTournaments();
  }

  try {
    const [payload, cashPayload] = await Promise.all([
      apiFetch("/api/poker/tournaments"),
      canCurrentUser("join_cash_table")
        ? apiFetch("/api/poker/player/tables")
        : Promise.resolve({ tables: [] }),
    ]);
    state.tournaments = payload.tournaments || [];
    state.playerCashTables = cashPayload.tables || [];
    state.playerCashTablesLoaded = true;
    state.tournamentsLoaded = true;
    const availableCount = state.tournaments.length + state.playerCashTables.length;
    state.tournamentsNotice = availableCount
      ? ""
      : "No player tables are open yet. Refresh when a Host creates one.";
  } catch (error) {
    state.tournamentsNotice = error.message;
  } finally {
    state.tournamentsBusy = false;
    renderTournaments();
  }
}

function renderTournaments() {
  els.tournamentsRefreshButton.disabled = state.tournamentsBusy;
  els.tournamentsNotice.textContent = state.tournamentsNotice;
  const cashCards = state.playerCashTables.map(renderCashTableCard).join("");
  const tournamentCards = state.tournaments
    .map((tournament) => {
      const level = tournament.tournament.currentLevel;
      const clock = tournament.tournament.startedAt
        ? formatTournamentClock(tournament.tournament.secondsRemaining)
        : "Starts with first hand";
      const isFull = tournament.openSeats === 0;
      const buttonLabel = tournament.joined
        ? "Return to Table"
        : tournament.waitingForSeat
          ? "Choose a Seat"
          : isFull
            ? "Join Waitlist"
            : "Join Tournament";
      const seatState = tableSeatState(tournament);
      return `
        <article class="tournament-card ${isFull ? "is-full" : ""}">
          <div class="tournament-card-head">
            <div>
              <div class="card-badges">
                <span class="type-chip is-tournament">Tournament</span>
                <span class="status-chip ${tournament.status === "active" ? "is-active" : "is-waiting"}">${escapeHtml(titleCase(tournament.status))}</span>
                <span class="seat-state-chip ${seatState.className}">${escapeHtml(seatState.label)}</span>
              </div>
              <h3>${escapeHtml(tournament.name)}</h3>
            </div>
            <strong><small>Blinds</small>${chips(level.smallBlind)} / ${chips(level.bigBlind)}</strong>
          </div>
          <div class="tournament-card-stats">
            <span><small>Level</small><strong>${level.level}</strong></span>
            <span><small>Clock</small><strong>${escapeHtml(clock)}</strong></span>
            <span><small>Players</small><strong>${tournament.seatedPlayers}/${tournament.seatCount}</strong></span>
            <span><small>Open seats</small><strong>${tournament.openSeats}</strong></span>
            <span><small>Waiting</small><strong>${tournament.waitingPlayers}</strong></span>
          </div>
          <button class="primary-action" type="button" data-tournament-join="${escapeHtml(tournament.id)}">${buttonLabel}</button>
        </article>
      `;
    })
    .join("");
  if (!cashCards && !tournamentCards) {
    els.tournamentList.innerHTML = renderEmptyState(
      state.tournamentsBusy ? "Loading player tables" : "No tables available",
      state.tournamentsBusy
        ? "Checking cash tables and tournaments."
        : "Ask a Host to create a room, then refresh this lobby.",
    );
    return;
  }
  els.tournamentList.innerHTML = `
    ${cashCards ? `<div class="player-lobby-group"><span class="eyebrow">Cash and private tables</span>${cashCards}</div>` : ""}
    ${tournamentCards ? `<div class="player-lobby-group"><span class="eyebrow">Tournaments</span>${tournamentCards}</div>` : ""}
  `;
}

function renderCashTableCard(table) {
  const isFull = table.openSeats === 0;
  const buttonLabel = table.joined
    ? "Return to Table"
    : table.waitingForSeat
      ? "Choose a Seat"
      : isFull
        ? "Join Waitlist"
        : "Join Table";
  const seatState = tableSeatState(table);
  return `
    <article class="tournament-card ${isFull ? "is-full" : ""}">
      <div class="tournament-card-head">
        <div>
          <div class="card-badges">
            <span class="type-chip is-cash">Cash</span>
            <span class="status-chip ${table.status === "active" ? "is-active" : "is-waiting"}">${escapeHtml(titleCase(table.status))}</span>
            <span class="seat-state-chip ${seatState.className}">${escapeHtml(seatState.label)}</span>
          </div>
          <h3>${escapeHtml(table.name)}</h3>
        </div>
        <strong><small>Blinds</small>${chips(table.smallBlind)} / ${chips(table.bigBlind)}</strong>
      </div>
      <div class="tournament-card-stats">
        <span><small>Code</small><strong>${escapeHtml(table.roomCode)}</strong></span>
        <span><small>Players</small><strong>${table.seatedPlayers}/${table.seatCount}</strong></span>
        <span><small>Open seats</small><strong>${table.openSeats}</strong></span>
        <span><small>Waiting</small><strong>${table.waitingPlayers}</strong></span>
        <span><small>Stack</small><strong>${chips(table.startingStack)}</strong></span>
      </div>
      <button class="primary-action" type="button" data-player-table-join="${escapeHtml(table.id)}">${buttonLabel}</button>
    </article>
  `;
}

function tableSeatState(table) {
  if (table.joined) return { label: "Joined", className: "is-joined" };
  if (table.waitingForSeat) return { label: "Seat pending", className: "is-pending" };
  if (table.openSeats === 0) return { label: "Full", className: "is-full" };
  return { label: `${table.openSeats} open`, className: "is-open" };
}

async function joinTournament(tableId) {
  if (!tableId) return;
  state.tournamentsNotice = "Opening tournament...";
  renderTournaments();
  try {
    state.table = await apiFetch("/api/poker/tables/join", {
      method: "POST",
      body: { tableId },
    });
    state.tournamentsNotice = "";
    state.actionNotice = "";
    stopTournamentPolling();
    resetActionSoundTracking(state.table);
    startTablePolling();
    render();
  } catch (error) {
    state.tournamentsNotice = error.message;
    renderTournaments();
  }
}

async function joinPlayerTable(tableId) {
  if (!tableId) return;
  state.tournamentsNotice = "Opening table...";
  renderTournaments();
  try {
    state.table = await apiFetch("/api/poker/tables/join", {
      method: "POST",
      body: { tableId },
    });
    state.tournamentsNotice = "";
    state.actionNotice = "";
    resetActionSoundTracking(state.table);
    startTablePolling();
    render();
  } catch (error) {
    state.tournamentsNotice = error.message;
    renderTournaments();
  }
}

async function joinTable() {
  clearBotTurnTimer();
  stopThinkingTick();
  const roomAccess = String(els.roomCodeInput.value || "").trim();

  if (roomAccess.length < 2) {
    state.setupNotice = "Enter the room name or room code.";
    renderSetupNotice();
    return;
  }

  state.setupNotice = "Joining table...";
  renderSetupNotice();

  try {
    await ensurePlayerSession();
    state.table = await apiFetch("/api/poker/tables/join", {
      method: "POST",
      body: { roomAccess },
    });
    state.setupNotice = "";
    state.actionNotice = "";
    resetActionSoundTracking(state.table);
    startTablePolling();
    render();
  } catch (error) {
    state.setupNotice = error.message;
    renderSetupNotice();
  }
}

async function claimSeat(seatNumber) {
  if (!state.table?.name || !Number.isInteger(seatNumber)) return;
  if (state.seatClaimBusy) return;
  state.seatClaimBusy = true;
  state.actionNotice = `Claiming seat ${seatNumber}...`;
  els.seatPickerNotice.textContent = state.actionNotice;
  disableSeatPicker(true);
  render();

  try {
    state.table = await apiFetch("/api/poker/tables/join", {
      method: "POST",
      body: { roomName: state.table.name, seatNumber },
    });
    state.actionNotice = "";
    els.seatPickerNotice.textContent = "";
    resetActionSoundTracking(state.table);
    render();
  } catch (error) {
    state.actionNotice = error.message;
    els.seatPickerNotice.textContent = error.message;
    await refreshTable();
  } finally {
    state.seatClaimBusy = false;
    disableSeatPicker(false);
    if (state.table?.viewerMode === "seat-selection") {
      render();
    } else {
      renderNotice();
    }
  }
}

async function sendAction(action, amount) {
  if (!state.table) return;

  ensureAudio();
  clearBotTurnTimer();
  stopThinkingTick();
  state.actionNotice = "Sending action...";
  renderNotice();

  try {
    state.table = await apiFetch(`/api/poker/tables/${state.table.id}/actions`, {
      method: "POST",
      body: { action, amount },
    });
    state.actionNotice = "";
    render();
  } catch (error) {
    state.actionNotice = error.message;
    renderNotice();
  }
}

async function startNextHand() {
  if (!state.table) return;

  ensureAudio();
  clearBotTurnTimer();
  stopThinkingTick();
  state.actionNotice = "Shuffling...";
  renderNotice();

  try {
    state.table = await apiFetch(`/api/poker/tables/${state.table.id}/new-hand`, {
      method: "POST",
      body: {},
    });
    state.actionNotice = "";
    resetActionSoundTracking(state.table);
    render();
  } catch (error) {
    state.actionNotice = error.message;
    renderNotice();
  }
}

function render() {
  const hasTable = Boolean(state.table);
  const showQuiz = state.quizOpen;

  els.setupPanel.classList.toggle("is-hidden", hasTable || showQuiz);
  els.leaderboardPanel.classList.toggle("is-hidden", hasTable || showQuiz);
  els.tablePanel.classList.toggle("is-hidden", !hasTable || showQuiz);
  els.quizPanel.classList.toggle("is-hidden", !showQuiz);
  renderAuthState();
  renderSoundState();
  renderSetupNotice();

  if (showQuiz) {
    els.topbarStats.innerHTML = "<span>Quiz</span><strong>Decision lab</strong>";
    renderQuiz();
    return;
  }

  if (!hasTable) {
    stopThinkingTick();
    els.topbarStats.innerHTML = "<span>Lobby</span><strong>Roles first</strong>";
    renderLobbyAccess();
    renderRoleGuide();
    if (!state.rankingsLoaded && !state.rankingsBusy) loadRankings();
    return;
  }

  stopTournamentPolling();
  renderTable();
}

function openQuiz() {
  stopTablePolling();
  stopTournamentPolling();
  clearBotTurnTimer();
  stopThinkingTick();
  state.table = null;
  state.actionNotice = "";
  state.quizOpen = true;
  state.quizCategory = "preflop";
  state.quizQuestionIndexByCategory.preflop = 0;
  state.quizSelectedChoice = getCurrentQuizAnswerId("preflop", 0);
  render();
}

function closeQuiz() {
  state.quizOpen = false;
  state.quizSelectedChoice = "";
  render();
}

function renderQuiz() {
  const category = QUIZ_CATEGORIES.find((item) => item.id === state.quizCategory) || QUIZ_CATEGORIES[0];
  const questions = getQuizQuestionList(category.id);
  const questionIndex = getQuizQuestionIndex(category.id);
  const question = questions[questionIndex] || questions[0];
  const selectedChoiceId = getCurrentQuizAnswerId(category.id, questionIndex);
  const selectedChoice = question.choices.find((choice) => choice.id === selectedChoiceId);

  els.quizStreetSummary.textContent = category.summary;
  els.quizLevelLabel.textContent = `${question.level} · ${questionIndex + 1}/${questions.length}`;
  els.quizDecisionLabel.textContent = question.decision;
  els.quizCategoryTabs.innerHTML = QUIZ_CATEGORIES.map(
    (item) => {
      const questionCount = getQuizQuestionList(item.id).length;
      return `
        <button
          class="${item.id === category.id ? "active" : ""}"
          type="button"
          data-quiz-category="${escapeHtml(item.id)}"
          aria-pressed="${item.id === category.id}"
        >
          <span>${escapeHtml(item.label)}</span>
          <small>${questionCount} ${questionCount === 1 ? "spot" : "spots"}</small>
        </button>
      `;
    },
  ).join("");
  els.quizOpponents.innerHTML = renderQuizSeatMap(question);
  els.quizBoardCards.innerHTML = renderCommunity(question.board);
  els.quizHeroCards.innerHTML = question.heroCards.map(renderCard).join("");
  els.quizPot.textContent = chips(question.pot);
  els.quizHeroPosition.textContent = question.heroPosition;
  els.quizCategoryLabel.textContent = category.label;
  els.quizQuestionTitle.textContent = question.title;
  els.quizStakes.textContent = question.stakes;
  els.quizScenario.textContent = question.scenario;
  els.quizChoices.innerHTML = question.choices.map(
    (choice) => `
      <button
        class="${choice.best ? "best-choice" : ""} ${choice.id === selectedChoiceId ? "selected" : ""}"
        type="button"
        data-quiz-choice="${escapeHtml(choice.id)}"
      >
        <span>${escapeHtml(choice.label)}</span>
      </button>
    `,
  ).join("");
  if (selectedChoice) {
    els.quizFeedback.classList.remove("is-hidden");
    els.quizFeedback.classList.toggle("is-best", Boolean(selectedChoice.best));
    els.quizFeedback.innerHTML = `
      <span>${escapeHtml(selectedChoice.result)}</span>
      <p>${escapeHtml(selectedChoice.feedback)}</p>
      ${renderQuizPositionLens(question)}
    `;
  } else {
    els.quizFeedback.classList.add("is-hidden");
    els.quizFeedback.classList.remove("is-best");
    els.quizFeedback.innerHTML = "";
  }
  renderQuizNavigator(category.id, questionIndex, questions.length, selectedChoice);
}

function renderQuizPositionLens(question) {
  if (!Array.isArray(question.positionLens) || !question.positionLens.length) {
    return "";
  }

  return `
    <section class="quiz-position-lens" aria-label="Same cards from other positions">
      <strong>Same cards, different seat</strong>
      <div>
        ${question.positionLens.map(
          (item) => `
            <article>
              <span>${escapeHtml(item.position)}</span>
              <b>${escapeHtml(item.recommendation)}</b>
              <p>${escapeHtml(item.note)}</p>
            </article>
          `,
        ).join("")}
      </div>
    </section>
  `;
}

function renderQuizSeatMap(question) {
  const heroPositionId = normalizeQuizPosition(question.heroPosition);
  const actionByPosition = new Map();

  question.opponents.forEach((opponent) => {
    normalizeQuizOpponentTargets(opponent.name, heroPositionId).forEach((positionId) => {
      actionByPosition.set(positionId, opponent.action);
    });
  });

  return QUIZ_TABLE_POSITIONS.map((position, index) => {
    const isHero = position.id === heroPositionId;
    const action = isHero ? getQuizHeroStatus(actionByPosition.get(position.id)) : actionByPosition.get(position.id) || position.status;
    const statusClass = getQuizStatusClass(action, isHero);
    const seatName = isHero ? "You" : position.defaultName;
    const cards = isHero
      ? `<div class="quiz-seat-cards" aria-label="Hero cards">${question.heroCards.map(renderCard).join("")}</div>`
      : "";

    return `
      <article class="quiz-seat quiz-seat--${escapeHtml(position.id)} ${isHero ? "is-hero" : ""} ${statusClass}">
        <span class="quiz-seat-badge">${escapeHtml(position.short)}</span>
        <span class="quiz-avatar quiz-avatar--${(index % 6) + 1}" aria-hidden="true">${escapeHtml(position.avatar)}</span>
        <div class="quiz-seat-copy">
          <strong>${escapeHtml(seatName)}</strong>
          <span>${escapeHtml(position.label)}</span>
        </div>
        <small>${escapeHtml(action)}</small>
        ${cards}
      </article>
    `;
  }).join("");
}

function normalizeQuizOpponentTargets(name, heroPositionId) {
  const normalized = normalizeQuizPosition(name);
  if (normalized === "you") return [heroPositionId];
  if (normalized === "blinds") return ["small-blind", "big-blind"];
  return QUIZ_TABLE_POSITIONS.some((position) => position.id === normalized) ? [normalized] : [];
}

function normalizeQuizPosition(value) {
  const normalized = String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const aliases = {
    bb: "big-blind",
    big: "big-blind",
    "big-blind": "big-blind",
    blinds: "blinds",
    button: "button",
    dealer: "button",
    "dealer-button": "button",
    co: "cutoff",
    cutoff: "cutoff",
    hijack: "hijack",
    hj: "hijack",
    sb: "small-blind",
    small: "small-blind",
    "small-blind": "small-blind",
    utg: "under-the-gun",
    "under-the-gun": "under-the-gun",
    you: "you",
  };
  return aliases[normalized] || normalized;
}

function getQuizHeroStatus(previousAction) {
  if (previousAction && !/still to act/i.test(previousAction)) return `${previousAction} · Decide`;
  return "Your decision";
}

function getQuizStatusClass(action, isHero) {
  if (isHero) return "is-decision";
  if (/fold/i.test(action)) return "is-folded";
  if (/3-bet|raise|open|bet|call/i.test(action)) return "is-aggressor";
  if (/post/i.test(action)) return "is-posted";
  return "is-waiting";
}

function renderQuizNavigator(categoryId, questionIndex, questionCount, selectedChoice) {
  const isFirst = questionIndex === 0;
  const isLast = questionIndex >= questionCount - 1;
  els.quizProgressLabel.textContent = `Question ${questionIndex + 1} of ${questionCount}`;
  els.quizPrevButton.disabled = isFirst;
  els.quizNextButton.disabled = !selectedChoice || isLast;
  els.quizNextButton.textContent = isLast ? "Done" : "Next";
  if (!selectedChoice) {
    els.quizNavigatorHint.textContent = "Answer this spot to unlock the next question.";
  } else if (isLast) {
    els.quizNavigatorHint.textContent =
      categoryId === "preflop" ? "Pre-flop set complete. Pick another category or review previous spots." : "Street starter complete.";
  } else {
    els.quizNavigatorHint.textContent = "Nice. Move to the next pre-flop spot or review your answer.";
  }
}

function moveQuizQuestion(direction) {
  const categoryId = state.quizCategory;
  const questions = getQuizQuestionList(categoryId);
  const currentIndex = getQuizQuestionIndex(categoryId);
  const selectedChoiceId = getCurrentQuizAnswerId(categoryId, currentIndex);
  if (direction > 0 && !selectedChoiceId) return;

  const nextIndex = Math.min(questions.length - 1, Math.max(0, currentIndex + direction));
  if (nextIndex === currentIndex) return;

  state.quizQuestionIndexByCategory[categoryId] = nextIndex;
  state.quizSelectedChoice = getCurrentQuizAnswerId(categoryId, nextIndex);
  renderQuiz();
}

function getQuizQuestionList(categoryId = state.quizCategory) {
  const questions = QUIZ_QUESTIONS[categoryId] || QUIZ_QUESTIONS.preflop;
  return Array.isArray(questions) ? questions : [questions];
}

function getQuizQuestionIndex(categoryId = state.quizCategory) {
  const questions = getQuizQuestionList(categoryId);
  const index = Number(state.quizQuestionIndexByCategory[categoryId] || 0);
  if (!Number.isFinite(index)) return 0;
  return Math.min(questions.length - 1, Math.max(0, index));
}

function getQuizAnswerKey(categoryId = state.quizCategory, questionIndex = getQuizQuestionIndex(categoryId)) {
  return `${categoryId}:${questionIndex}`;
}

function getCurrentQuizAnswerId(categoryId = state.quizCategory, questionIndex = getQuizQuestionIndex(categoryId)) {
  return state.quizAnswers[getQuizAnswerKey(categoryId, questionIndex)] || "";
}

function renderTable() {
  const table = state.table;
  const isPlayer = table.viewerMode === "player";
  const isSeatSelection = table.viewerMode === "seat-selection";
  const isWaiting = table.viewerMode === "waiting";
  const isSpectator = table.viewerMode === "spectator";
  const human = table.players.find((player) => player.isYou);
  const displayPlayers = table.players.filter((player) => player.type !== "open");
  const seatLayout = buildNineSeatLayout(
    displayPlayers,
    table.config.seatCount,
    human?.seat || 1,
  );
  const visualSeatCount = 9;

  els.topbarStats.innerHTML = `<span>${escapeHtml(table.variant)} · ${escapeHtml(titleCase(table.mode))}</span><strong>${escapeHtml(table.status)}</strong>`;
  els.tableTitle.textContent = table.name;
  els.roomCodeLabel.textContent = table.roomCode || "------";
  els.potTotal.textContent = chips(table.potTotal);
  els.centerPot.textContent = chips(table.potTotal);
  els.phaseLabel.textContent = titleCase(table.phase);
  const activeBlinds = table.tournament?.currentLevel || table.config || {};
  els.feltHandLabel.textContent = `Hand #${table.handNumber || "--"}`;
  els.feltStreetLabel.textContent = titleCase(table.phase || table.status);
  els.feltBlindLabel.textContent = `NLH · ${chips(activeBlinds.smallBlind || 0)} / ${chips(activeBlinds.bigBlind || 0)}`;
  els.feltGameId.textContent = `Game ID: ${table.roomCode || table.id || "------"}`;
  els.roleLabel.textContent = table.roles.current?.label || titleCase(table.roles.userRole);
  els.modeLabel.textContent = titleCase(table.mode);
  renderTournamentStatus(table);
  els.playerConsole.classList.toggle("is-hidden", !isPlayer);
  els.actionConsole.classList.toggle("is-hidden", !isPlayer);
  els.seatPickerConsole.classList.add("is-hidden");
  els.viewerConsole.classList.toggle("is-hidden", !(isSpectator || isWaiting));
  if (isWaiting) {
    els.viewerEyebrow.textContent = "Waiting for a seat";
    els.viewerTitle.textContent = "All player seats are occupied";
    els.viewerMessage.textContent =
      "You joined in view mode. You are next; please wait to be seated when a seat becomes available.";
  } else {
    els.viewerEyebrow.textContent = "View room";
    els.viewerTitle.innerHTML = `Watching as <span id="viewerRoleLabel">${escapeHtml(titleCase(table.roles.userRole))}</span>`;
    els.viewerMessage.textContent =
      "You can follow the hand and table activity, but you do not occupy a seat or receive player actions.";
  }
  els.tableMessage.textContent =
    isSeatSelection
      ? "Choose an open seat directly on the table."
      : table.status === "hand-complete"
      ? `${table.message} Next hand starts automatically in a few seconds.`
      : table.message;
  if (table.status === "hand-complete") refreshStatsAfterHand(table);
  els.handStatus.textContent = human?.handRank?.label || (table.isHumanTurn ? "Action on you" : "Hole cards");
  els.humanWinChance.textContent = `Win chance ${formatWinChance(human?.winChance)}`;

  els.playersGrid.innerHTML = [
    ...seatLayout.occupied.map(({ player, slotIndex, seatNumber }) =>
      renderSeat(player, slotIndex, visualSeatCount, seatNumber),
    ),
    ...seatLayout.open.map(({ slotIndex, seatNumber }) =>
      renderOpenSeat(slotIndex, seatNumber, isSeatSelection && table.availableSeats?.includes(seatNumber)),
    ),
  ].join("");
  const ownSeat = els.playersGrid.querySelector(".seat.is-you");
  if (ownSeat) {
    ownSeat.appendChild(els.actionConsole);
  }
  els.communityRow.innerHTML = renderCommunity(table.community);
  els.humanCards.innerHTML = (human?.hole || []).map(renderCard).join("");
  els.eventLog.innerHTML = table.events.map((event) => `<li>${escapeHtml(event)}</li>`).join("");
  els.showdownList.innerHTML = renderShowdown(table);

  renderControls(table, human);
  renderLearningCoach(table);
  playActionSounds(table);
  scheduleBotTurn(table);
  renderNotice();
}

function renderTournamentCreationOptions() {
  const gameType = els.tableForm.querySelector('input[name="gameType"]:checked')?.value;
  els.tournamentOptions.classList.toggle("is-hidden", gameType !== "tournament");
}

function renderTournamentStatus(table) {
  const tournament = table.tournament;
  els.tournamentBanner.classList.toggle("is-hidden", !tournament);
  if (!tournament) return;

  const active = tournament.currentLevel;
  const next = tournament.nextLevel;
  els.tournamentLevel.textContent = `Level ${active.level}`;
  els.tournamentBlinds.textContent = `${chips(active.smallBlind)} / ${chips(active.bigBlind)}`;
  els.tournamentClock.textContent = tournament.startedAt
    ? formatTournamentClock(tournament.secondsRemaining)
    : "Not started";
  els.tournamentNextBlinds.textContent = next
    ? `${chips(next.smallBlind)} / ${chips(next.bigBlind)}`
    : "Final level";

  if (!tournament.startedAt) {
    els.tournamentNotice.textContent = "The clock starts when the first hand is dealt.";
  } else if (tournament.pendingLevelChange) {
    els.tournamentNotice.textContent = `Level ${tournament.scheduledLevel.level} is ready and applies on the next hand.`;
  } else {
    els.tournamentNotice.textContent = `${Math.round(tournament.levelDurationSeconds / 60)} minute blind levels · increases apply between hands.`;
  }
}

function formatTournamentClock(seconds) {
  if (seconds == null) return "Final level";
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function renderSeatPicker(table) {
  const availableSeats = Array.isArray(table.availableSeats) ? table.availableSeats : [];
  const availableSeatSet = new Set(availableSeats);
  const seatCount = Math.min(9, Math.max(2, Number(table.config?.seatCount || 9)));
  const occupiedBySeat = new Map(
    (table.players || [])
      .filter((player) => player.type !== "open" && Number.isInteger(player.seat))
      .map((player) => [player.seat, player]),
  );
  const seats = Array.from({ length: seatCount }, (_, index) => {
    const seatNumber = index + 1;
    const position = getSeatPosition(index, seatCount);
    const player = occupiedBySeat.get(seatNumber);
    const isAvailable = availableSeatSet.has(seatNumber);
    const label = player ? player.name : isAvailable ? "Available" : "Locked";
    const className = isAvailable ? "is-available" : player ? "is-occupied" : "is-locked";
    const content = `<span>Seat ${seatNumber}</span><strong>${escapeHtml(label)}</strong><small>${isAvailable ? "Pick seat" : player ? "Occupied" : "Unavailable"}</small>`;

    return isAvailable
      ? `<button class="seat-map-node ${className}" type="button" data-seat-number="${seatNumber}" style="--seat-x: ${position.x}%; --seat-y: ${position.y}%;">${content}</button>`
      : `<span class="seat-map-node ${className}" style="--seat-x: ${position.x}%; --seat-y: ${position.y}%;">${content}</span>`;
  }).join("");

  els.seatPickerButtons.innerHTML = `
    <div class="seat-picker-map" aria-label="Seat map">
      <div class="seat-picker-felt">
        <span>Choose seat</span>
        <strong>${availableSeats.length} open</strong>
      </div>
      ${seats}
    </div>
  `;
}

function disableSeatPicker(disabled) {
  els.seatPickerButtons.querySelectorAll("button").forEach((button) => {
    button.disabled = disabled;
  });
}

function buildNineSeatLayout(players, configuredSeatCount, viewerSeat = 1) {
  const configuredSeats = Math.min(9, Math.max(2, Number(configuredSeatCount || 2)));
  if (configuredSeats === 9) {
    const occupiedBySeat = new Map(players.map((player) => [player.seat, player]));
    const occupied = [];
    const open = [];

    for (let seatNumber = 1; seatNumber <= 9; seatNumber += 1) {
      const slotIndex = (seatNumber - viewerSeat + 9) % 9;
      const player = occupiedBySeat.get(seatNumber);
      if (player) {
        occupied.push({ player, slotIndex, seatNumber });
      } else {
        open.push({ slotIndex, seatNumber });
      }
    }
    return { occupied, open };
  }

  const slotPresets = {
    2: [0, 5],
    3: [0, 3, 6],
    4: [0, 2, 4, 7],
    5: [0, 2, 3, 5, 7],
    6: [0, 2, 3, 5, 6, 7],
    7: [0, 1, 2, 3, 5, 6, 7],
    8: [0, 1, 2, 3, 4, 5, 6, 7],
    9: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  };
  const occupied = players.map((player) => ({
    player,
    slotIndex: slotPresets[configuredSeats][player.seat - 1],
    seatNumber: player.seat,
  }));
  const usedSlots = new Set(occupied.map((seat) => seat.slotIndex));
  const open = [];
  const occupiedSeatNumbers = new Set(occupied.map((seat) => seat.seatNumber));

  for (let seatNumber = 1; seatNumber <= configuredSeats; seatNumber += 1) {
    if (!occupiedSeatNumbers.has(seatNumber)) {
      const slotIndex = slotPresets[configuredSeats][seatNumber - 1];
      usedSlots.add(slotIndex);
      open.push({ slotIndex, seatNumber });
    }
  }

  let nextOpenSeatNumber = configuredSeats + 1;

  for (let slotIndex = 0; slotIndex < 9; slotIndex += 1) {
    if (!usedSlots.has(slotIndex)) {
      open.push({
        slotIndex,
        seatNumber: nextOpenSeatNumber,
      });
      nextOpenSeatNumber += 1;
    }
  }

  return { occupied, open };
}

function showAuthPanel(mode) {
  state.authMode = mode;
  state.pendingProfileImage = null;
  els.profilePhotoInput.value = "";
  if (mode === "guest") {
    els.authRole.value = "guest";
    els.authName.value = els.playerName.value || "";
  } else if (mode === "signup") {
    els.authRole.value = "player";
    els.authUserId.value = "";
    els.authName.value = "";
  }
  els.authPanel.classList.remove("is-hidden");
  els.authPanelTitle.textContent =
    mode === "signup" ? "Create Account" : mode === "guest" ? "Guest Play" : "Sign In";
  els.authPassword.value = "";
  renderAuthRoleFields();
  renderProfilePhotoPreview();
  renderAuthRoleNotice();
  renderRoleGuide();
  window.requestAnimationFrame(() => {
    const input = mode === "guest" ? els.authName : els.authUserId;
    input.focus();
  });
}

function renderAuthRoleFields() {
  const selectedRole = state.authMode === "guest" ? "guest" : els.authRole.value;
  const isSignin = state.authMode === "signin";
  const isGuest = !isSignin && selectedRole === "guest";

  els.authRoleGroup.classList.toggle("is-hidden", state.authMode !== "signup");
  els.authUserIdGroup.classList.toggle("is-hidden", isGuest);
  els.authNameGroup.classList.toggle("is-hidden", isSignin);
  els.authPasswordGroup.classList.toggle("is-hidden", isGuest);
  els.authPhotoGroup.classList.toggle("is-hidden", isSignin || isGuest);
  els.guestPracticeOptions.classList.toggle("is-hidden", !isGuest);
  els.authPassword.autocomplete = state.authMode === "signup" ? "new-password" : "current-password";
  const reservedRole = getReservedRoleCredentials(selectedRole);
  els.authPassword.placeholder =
    state.authMode === "signup" && reservedRole
      ? `${reservedRole.label} role requires password "${reservedRole.password}"`
      : "At least 8 characters";
  els.authPanelTitle.textContent =
    state.authMode === "signin"
      ? "Sign In"
      : selectedRole === "guest"
        ? "Guest Access"
        : "Create Account";
  els.authSubmitButton.textContent =
    state.authMode === "signin"
      ? "Sign In"
      : selectedRole === "guest"
        ? "Play Game"
        : reservedRole
          ? `Sign In as ${reservedRole.label}`
          : "Create Account";

  if (state.authMode === "signup" && reservedRole) {
    els.authUserId.value = reservedRole.label;
    els.authName.value = reservedRole.label;
  } else if (state.authMode === "signup") {
    if (["Host", "Admin"].includes(els.authUserId.value)) els.authUserId.value = "";
    if (["Host", "Admin"].includes(els.authName.value)) els.authName.value = "";
  }
}

function renderAuthRoleNotice() {
  if (state.authMode === "signin") {
    els.authNotice.textContent = "Enter the user ID and password used during signup.";
    return;
  }

  const selectedRole = state.authMode === "guest" ? "guest" : els.authRole.value;
  const reservedRole = getReservedRoleCredentials(selectedRole);
  if (reservedRole) {
    els.authNotice.textContent =
      `${reservedRole.label} requires user ID "${reservedRole.label}" and password "${reservedRole.password}".`;
  } else if (selectedRole === "guest") {
    els.authNotice.textContent =
      "Enter a player name, choose visibility, bot behavior, and learning support, then practice against bots.";
  } else {
    els.authNotice.textContent = "Use a 3-24 character user ID and a password of at least 8 characters.";
  }
}

async function applyAuthProfile() {
  const userId = String(els.authUserId.value || "").trim();
  const name = String(els.authName.value || "").trim().slice(0, 24);
  const password = String(els.authPassword.value || "");
  const selectedRole = state.authMode === "guest" ? "guest" : els.authRole.value;
  const guestMode =
    els.guestPracticeOptions.querySelector('input[name="guestMode"]:checked')?.value || "masked";
  const guestBotStyle =
    els.guestPracticeOptions.querySelector('input[name="guestBotStyle"]:checked')?.value || "adaptive";
  const guestLiveLearning = Boolean(
    els.guestPracticeOptions.querySelector('input[name="guestLiveLearning"]')?.checked,
  );

  if (state.authMode !== "signin" && name.length < 2) {
    els.authNotice.textContent = "Enter a display name with at least 2 characters.";
    return;
  }

  const routes = {
    signin: "/api/auth/signin",
    signup: "/api/auth/signup",
    guest: "/api/auth/guest",
  };
  const reservedRole = getReservedRoleCredentials(selectedRole);
  const body =
    state.authMode === "signin"
      ? { userId, password }
      : state.authMode === "signup"
        ? reservedRole
          ? { userId, password }
          : {
              userId,
              playerName: name,
              password,
              role: selectedRole,
              profileImage: state.pendingProfileImage,
            }
        : { playerName: name, profileImage: state.pendingProfileImage };

  els.authSubmitButton.disabled = true;
  els.authNotice.textContent =
    state.authMode === "signup"
      ? "Creating account..."
      : state.authMode === "guest"
        ? "Starting guest session..."
        : "Signing in...";

  try {
    const route = state.authMode === "signup" && reservedRole ? routes.signin : routes[state.authMode];
    const session = await apiFetch(route, {
      method: "POST",
      body,
      auth: false,
    });
    setAuthenticatedSession(session);
    if (state.authMode === "guest") {
      state.table = await apiFetch("/api/poker/tables/guest", {
        method: "POST",
        body: { mode: guestMode, botStyle: guestBotStyle, liveLearningMode: guestLiveLearning },
      });
      resetActionSoundTracking(state.table);
      startTablePolling();
    }
    els.authPanel.classList.add("is-hidden");
    els.authNotice.textContent = "";
    state.setupNotice =
      state.authMode === "signup"
        ? reservedRole
          ? `${reservedRole.label} signed in.`
          : "Account created and signed in."
        : state.authMode === "guest"
          ? "Guest game ready."
          : "Signed in successfully.";
    if (state.table) {
      render();
      return;
    }
    renderAuthState();
    renderLobbyAccess();
    renderRoleGuide();
    renderSetupNotice();
  } catch (error) {
    els.authNotice.textContent = error.message;
  } finally {
    els.authSubmitButton.disabled = false;
  }
}

function getReservedRoleCredentials(role) {
  if (role === "host") return { label: "Host", password: "Host" };
  if (role === "admin") return { label: "Admin", password: "Admin" };
  return null;
}

function renderAuthState() {
  if (state.account) {
    const roleMatchesName =
      state.account.name.trim().toLowerCase() === String(state.account.role || "").toLowerCase();
    const accountLabel =
      state.account.accountType === "guest"
        ? "Guest"
        : roleMatchesName
          ? `@${state.account.userId}`
          : `${titleCase(state.account.role)} · @${state.account.userId}`;
    const stats = state.session?.stats || {};
    els.authStatus.textContent = state.account.name;
    els.profileSummaryMeta.textContent = accountLabel;
    els.profileSummaryStats.textContent = `${stats.handsWon || 0} won · ${stats.handsPlayed || 0} played`;
    els.profileSummary.classList.remove("is-hidden");
    els.signInLink.classList.add("is-hidden");
    els.signUpLink.classList.add("is-hidden");
    els.guestLink.classList.add("is-hidden");
    els.signOutButton.classList.remove("is-hidden");
    els.playerName.value = state.account.name;
    els.playerName.readOnly = true;
    renderAvatar(els.topbarAvatar, state.account.profileImage, state.account.name);
    els.topbarAvatar.classList.add("is-visible");
    return;
  }

  els.authStatus.textContent = "Not signed in";
  els.profileSummaryMeta.textContent = "Choose a role";
  els.profileSummaryStats.textContent = "0 won · 0 played";
  els.profileSummary.classList.add("is-hidden");
  els.signInLink.classList.remove("is-hidden");
  els.signUpLink.classList.remove("is-hidden");
  els.guestLink.classList.remove("is-hidden");
  els.signOutButton.classList.add("is-hidden");
  els.playerName.readOnly = false;
  els.topbarAvatar.classList.remove("is-visible");
  closeProfileDialog();
}

function renderSeat(player, slotIndex, totalSeats, seatNumber) {
  const classes = ["seat"];
  if (player.isCurrent) classes.push("is-current");
  if (player.isCurrent && player.type === "bot") classes.push("is-thinking");
  if (player.isCurrent && player.isYou) classes.push("is-human-turn");
  if (player.isYou) classes.push("is-you");
  if (player.folded) classes.push("is-folded");
  const actionState = getSeatActionState(player);

  const roleBadges = [
    player.isDealer ? '<span class="badge">D</span>' : "",
    player.isSmallBlind ? '<span class="badge blue">SB</span>' : "",
    player.isBigBlind ? '<span class="badge blue">BB</span>' : "",
  ].join("");
  const cards = player.hole.map(renderCard).join("");
  const position = getSeatPosition(slotIndex, 9);
  const botStyleChip =
    player.type === "bot" && player.personality?.label
      ? `<small class="bot-style-chip" title="${escapeHtml(player.personality.description || "")}">${escapeHtml(player.personality.label)}</small>`
      : "";

  return `
    <article
      class="${classes.join(" ")}"
      data-seat-index="${slotIndex}"
      data-table-seat="${seatNumber}"
      data-seat-count="${totalSeats}"
      style="--seat-x: ${position.x}%; --seat-y: ${position.y}%;"
    >
      <div class="seat-player">
        <span class="seat-role-strip ${roleBadges ? "" : "is-empty"}" aria-label="Seat role badges">${roleBadges}</span>
        <div class="seat-identity-pillar">
          <div class="seat-portrait">
            ${renderAvatarMarkup(player.profileImage, player.name)}
          </div>
          <span class="seat-player-name">
            ${escapeHtml(player.name)}
            ${player.isYou ? '<small class="you-label">You</small>' : ""}
            ${botStyleChip}
          </span>
        </div>
        <div class="seat-hud">
          <div class="seat-nameplate">
            <div class="seat-main-info">
              <div class="seat-title-row">
                <span class="badge seat-number" aria-label="Seat ${seatNumber}" title="Seat ${seatNumber}">${seatNumber}</span>
              </div>
            </div>
          </div>
          <div class="seat-meta" aria-label="${escapeHtml(player.name)} seat status">
            <span class="seat-stack-line"><span class="seat-stack-value" aria-label="Total chips ${chips(player.stack)}"><span class="chip-icon" aria-hidden="true"></span><strong>${chips(player.stack)}</strong></span></span>
            <span><span class="metric-label">Bet</span><strong>${chips(player.bet)}</strong></span>
            <span class="seat-win-inline ${player.winChance?.percent == null ? "is-hidden-chance" : ""}"><span class="metric-label">Win</span><strong>${escapeHtml(formatWinChance(player.winChance))}</strong></span>
          </div>
        </div>
      </div>
      <div class="seat-outside-row">
        <span class="seat-action ${escapeHtml(actionState.className)}">
          <span class="action-dot" aria-hidden="true"></span>
          <strong>${escapeHtml(actionState.label)}</strong>
        </span>
      </div>
      <div class="seat-cards">${cards}</div>
    </article>
  `;
}

function renderOpenSeat(slotIndex, seatNumber, canClaim = false) {
  const position = getSeatPosition(slotIndex, 9);
  const tagName = canClaim ? "button" : "div";
  const typeAttribute = canClaim ? ' type="button"' : "";
  const claimAttribute = canClaim ? ` data-open-seat-number="${seatNumber}"` : "";
  const disabledAttribute = canClaim && state.seatClaimBusy ? " disabled" : "";
  const className = canClaim ? "open-seat is-clickable" : "open-seat";
  const label = canClaim ? "Pick seat" : "Open";

  return `
    <${tagName}
      class="${className}"
      data-seat-index="${slotIndex}"
      data-table-seat="${seatNumber}"
      ${claimAttribute}
      style="--seat-x: ${position.x}%; --seat-y: ${position.y}%;"
      aria-label="Seat ${seatNumber} ${label.toLowerCase()}"
      ${typeAttribute}
      ${disabledAttribute}
    >
      <strong>Seat ${seatNumber}</strong>
      <span>${label}</span>
    </${tagName}>
  `;
}

function getSeatActionState(player) {
  const rawAction = String(player.lastAction || "").trim();
  const action = rawAction.toLowerCase();

  if (player.isCurrent) {
    return {
      className: "action-turn",
      label: player.isYou ? "Your turn" : player.type === "bot" ? "Thinking" : "Playing",
    };
  }

  if (player.folded || action === "fold") {
    return { className: "action-fold", label: "Fold" };
  }

  if (player.allIn || action.startsWith("all in")) {
    return { className: "action-all-in", label: compactActionLabel(rawAction || "All in") };
  }

  if (action.startsWith("raise")) {
    return { className: "action-raise", label: compactActionLabel(rawAction) };
  }

  if (action.startsWith("bet")) {
    return { className: "action-bet", label: compactActionLabel(rawAction) };
  }

  if (action.startsWith("call")) {
    return { className: "action-call", label: compactActionLabel(rawAction) };
  }

  if (action.startsWith("check")) {
    return { className: "action-check", label: "Check" };
  }

  if (action.startsWith("small blind")) {
    return { className: "action-blind", label: compactActionLabel(rawAction) };
  }

  if (action.startsWith("big blind")) {
    return { className: "action-blind", label: compactActionLabel(rawAction) };
  }

  if (action.startsWith("sitting out")) {
    return { className: "action-waiting", label: "Sitting out" };
  }

  return { className: "action-waiting", label: "Waiting" };
}

function compactActionLabel(action) {
  return String(action || "Waiting")
    .replace(/^Small blind\s+/i, "SB ")
    .replace(/^Big blind\s+/i, "BB ")
    .replace(/^Raise to\s+/i, "Raise ")
    .replace(/^Bet\s+/i, "Bet ")
    .replace(/^Call\s+/i, "Call ")
    .replace(/^All in\s+/i, "All in ");
}

function getSeatPosition(index, totalSeats) {
  const seatCount = Math.min(9, Math.max(2, Number(totalSeats || 9)));
  const slotIndex = ((Number(index) || 0) % seatCount + seatCount) % seatCount;
  const radius = {
    2: { x: 0, y: 34 },
    3: { x: 31, y: 33 },
    4: { x: 35, y: 34 },
    5: { x: 38, y: 34 },
    6: { x: 39, y: 34 },
    7: { x: 40, y: 34 },
    8: { x: 40, y: 34 },
    9: { x: 40, y: 34 },
  }[seatCount];
  const angle = (90 + slotIndex * (360 / seatCount)) * (Math.PI / 180);
  const round = (value) => Math.round(value * 10) / 10;

  return {
    x: round(50 + radius.x * Math.cos(angle)),
    y: round(50 + radius.y * Math.sin(angle)),
  };
}

function renderCommunity(cards) {
  const rendered = cards.map(renderCard);
  while (rendered.length < 5) {
    rendered.push('<div class="card empty" aria-hidden="true"><span class="card-mid">·</span></div>');
  }
  return rendered.join("");
}

function quizCard(label, suit) {
  const suitData = {
    club: { symbol: "♣", color: "black", name: "clubs" },
    diamond: { symbol: "♦", color: "red", name: "diamonds" },
    heart: { symbol: "♥", color: "red", name: "hearts" },
    spade: { symbol: "♠", color: "black", name: "spades" },
  }[suit] || { symbol: "♣", color: "black", name: "clubs" };
  return {
    label,
    suitSymbol: suitData.symbol,
    color: suitData.color,
    display: `${label} of ${suitData.name}`,
  };
}

function quizQuestion(question) {
  return question;
}

function quizChoice(id, label, result, feedback, best = false) {
  return {
    id,
    label,
    result,
    feedback,
    ...(best ? { best: true } : {}),
  };
}

function quizLens(entries) {
  return entries.map(([position, recommendation, note]) => ({ position, recommendation, note }));
}

function renderShowdown(table) {
  if (!table.showdown.length) {
    return '<p>No reveal yet</p>';
  }

  return table.showdown
    .map(
      (item) => `
        <div class="showdown-item">
          <strong>${escapeHtml(item.name)} · ${escapeHtml(item.handLabel)}</strong>
          <div class="rank-cards">${item.cards.map(renderCard).join("")}</div>
        </div>
      `,
    )
    .join("");
}

function renderControls(table, human) {
  const legal = table.legalActions;
  const canAct = table.isViewerTurn && table.status === "playing";
  const canChooseAmount = canAct && (legal.canBet || legal.canRaise);
  const raiseComposerTurnKey = getRaiseComposerTurnKey(table);
  if (state.raiseComposerTurnKey !== raiseComposerTurnKey) {
    state.raiseComposerTurnKey = raiseComposerTurnKey;
    state.raiseComposerActive = false;
    state.selectedRaisePreset = "";
    state.selectedRaiseAmount = 0;
  }
  if (!canChooseAmount) {
    state.raiseComposerActive = false;
    state.selectedRaisePreset = "";
    state.selectedRaiseAmount = 0;
  }
  els.actionConsole.classList.toggle("is-action-ready", canAct);
  els.actionConsole.classList.toggle("has-raise-range", canChooseAmount);
  els.actionConsole.classList.toggle("is-raise-composer-active", canChooseAmount && state.raiseComposerActive);
  const { min, max } = getRaiseAmountBounds(legal, table, human);

  els.amountInput.min = String(RAISE_SLIDER_MIN);
  els.amountInput.max = String(RAISE_SLIDER_MAX);
  els.amountInput.step = String(RAISE_SLIDER_STEP);

  const currentPosition = Number(els.amountInput.value);
  if (!Number.isFinite(currentPosition) || currentPosition < RAISE_SLIDER_MIN || currentPosition > RAISE_SLIDER_MAX) {
    els.amountInput.value = String(RAISE_SLIDER_MIN);
  }
  if (!Number.isFinite(state.selectedRaiseAmount) || state.selectedRaiseAmount < min || state.selectedRaiseAmount > max) {
    const defaultPreset = getDefaultRaisePreset(legal);
    state.selectedRaisePreset = defaultPreset;
    state.selectedRaiseAmount = calculateRaisePresetAmount(defaultPreset, legal, table, human);
    els.amountInput.value = String(getRaisePresetPosition(defaultPreset, legal));
  }
  const amountLabel = els.amountInput.closest(".amount-control")?.querySelector("label");
  if (amountLabel) {
    amountLabel.textContent = legal.canRaise ? "Raise to" : legal.canBet ? "Open to" : "Amount";
  }
  const selectedAmount = getSelectedRaiseAmount(legal, table, human);
  const sliderStartLabel = legal.canBet && !legal.canRaise ? "minimum" : "2x";
  els.amountInput.title = `Slide from ${sliderStartLabel} to all-in ${chips(max)}`;
  els.amountInput.setAttribute("aria-label", `${legal.canRaise ? "Raise" : "Bet"} amount from ${sliderStartLabel} to all-in ${chips(max)}`);
  els.amountInput.setAttribute("aria-valuetext", chips(selectedAmount));
  els.amountOutput.textContent = chips(selectedAmount);

  els.amountInput.disabled = !canChooseAmount;
  els.foldButton.disabled = !canAct || !legal.canFold;
  els.checkButton.disabled = !canAct || !legal.canCheck;
  els.callButton.disabled = !canAct || !legal.canCall;
  els.betButton.disabled = !canAct || !legal.canBet;
  els.raiseButton.disabled = !canAct || (!legal.canRaise && !legal.canBet);
  els.allInButton.disabled = !canAct || !legal.canAllIn;
  els.callButton.textContent = legal.callAmount > 0 ? `Call ${chips(legal.callAmount)}` : "Call";
  renderAmountActionLabels(table);
  renderRaisePresets(table, legal, canChooseAmount);
  els.nextHandButton.classList.toggle("is-hidden", table.status === "playing" || !table.isHost);
}

function getRaiseComposerTurnKey(table) {
  if (!table) return "";
  return [
    table.id,
    table.handNumber,
    table.currentPlayerIndex,
    table.viewerPlayerId || "",
    table.legalActions?.currentBet || 0,
  ].join(":");
}

function renderLearningCoach(table) {
  const coach = table.learningCoach;
  const visible = table.viewerMode === "player" && coach?.enabled;
  els.learningCoachPanel.classList.toggle("is-hidden", !visible);
  if (!visible) return;

  els.learningCoachBadge.textContent = coach.badge || "Table coach";
  els.learningCoachTitle.textContent = coach.title || "Live Learning Mode";
  els.learningCoachRecommendation.textContent = coach.recommendation || "";
  els.learningCoachTips.innerHTML = (coach.tips || [])
    .map((tip) => `<li>${escapeHtml(tip)}</li>`)
    .join("");
}

function sendIncreaseAction() {
  if (!state.table) return;

  const legal = state.table.legalActions || {};
  const amount = getSelectedRaiseAmount(legal, state.table);
  if (legal.canRaise || legal.canBet) {
    if (!state.raiseComposerActive) {
      openRaiseComposer();
      return;
    }
  }
  if (legal.canRaise) {
    state.raiseComposerActive = false;
    state.selectedRaisePreset = "";
    sendAction("raise", amount);
    return;
  }
  if (legal.canBet) {
    state.raiseComposerActive = false;
    state.selectedRaisePreset = "";
    sendAction("bet", amount);
  }
}

function openRaiseComposer() {
  if (!state.table) return;

  const legal = state.table.legalActions || {};
  const defaultPreset = getDefaultRaisePreset(legal);
  state.raiseComposerTurnKey = getRaiseComposerTurnKey(state.table);
  state.raiseComposerActive = true;
  state.selectedRaisePreset = defaultPreset;
  state.selectedRaiseAmount = calculateRaisePresetAmount(defaultPreset, legal, state.table);
  els.amountInput.value = String(getRaisePresetPosition(defaultPreset, legal));
  render();
}

function applyRaisePreset(preset) {
  if (!state.table) return;

  const legal = state.table.legalActions || {};
  if (!legal.canRaise && !legal.canBet) return;

  state.raiseComposerTurnKey = getRaiseComposerTurnKey(state.table);
  state.raiseComposerActive = true;
  state.selectedRaisePreset = preset;
  state.selectedRaiseAmount = calculateRaisePresetAmount(preset, legal, state.table);
  els.amountInput.value = String(getRaisePresetPosition(preset, legal));
  els.amountOutput.textContent = chips(state.selectedRaiseAmount);
  renderAmountActionLabels();
  render();
}

function getDefaultRaisePreset(legal = state.table?.legalActions || {}) {
  return legal.canBet && !legal.canRaise ? "min" : "2";
}

function getRaiseSliderStops(legal = state.table?.legalActions || {}) {
  return legal.canBet && !legal.canRaise ? OPEN_SLIDER_STOPS : RAISE_SLIDER_STOPS;
}

function getRaiseAmountBounds(legal = state.table?.legalActions || {}, table = state.table, human = null) {
  const fallbackBlind = table?.config?.bigBlind || 0;
  const rawMin = Math.max(0, legal.canRaise ? legal.minRaiseTo : legal.minBet || fallbackBlind);
  const rawMax = Math.max(0, legal.maxBet || human?.stack || rawMin);
  const min = Math.min(rawMin, rawMax || rawMin);
  const max = Math.max(rawMax, min);
  const step = Math.max(1, table?.config?.smallBlind || 1);
  return { min, max, step };
}

function calculateRaisePresetAmount(preset, legal = state.table?.legalActions || {}, table = state.table, human = null) {
  const { min, max, step } = getRaiseAmountBounds(legal, table, human);
  if (preset === "min") return min;
  if (preset === "all-in") return max;

  const multiplier = Number(preset);
  if (!Number.isFinite(multiplier)) return min;

  const base = Math.max(
    Number(legal.currentBet || 0),
    Number(legal.callAmount || 0),
    Number(table?.config?.bigBlind || 0),
  );
  return roundAmountToStep(base * multiplier, min, max, step);
}

function getRaiseAmountStops(legal = state.table?.legalActions || {}, table = state.table, human = null) {
  return getRaiseSliderStops(legal).map((stop) => ({
    ...stop,
    amount: calculateRaisePresetAmount(stop.preset, legal, table, human),
  }));
}

function calculateRaiseAmountForSlider(position, legal = state.table?.legalActions || {}, table = state.table, human = null) {
  const { min, max, step } = getRaiseAmountBounds(legal, table, human);
  const safePosition = Math.min(RAISE_SLIDER_MAX, Math.max(RAISE_SLIDER_MIN, Number(position || 0)));
  const stops = getRaiseAmountStops(legal, table, human);
  const exactStop = stops.find((stop) => Math.abs(stop.position - safePosition) < 0.5);
  if (exactStop) return roundAmountToStep(exactStop.amount, min, max, step);

  const nextIndex = stops.findIndex((stop) => safePosition < stop.position);
  if (nextIndex <= 0) return roundAmountToStep(stops[0]?.amount ?? min, min, max, step);
  if (nextIndex === -1) return roundAmountToStep(stops.at(-1)?.amount ?? max, min, max, step);

  const previousStop = stops[nextIndex - 1];
  const nextStop = stops[nextIndex];
  const span = Math.max(1, nextStop.position - previousStop.position);
  const progress = (safePosition - previousStop.position) / span;
  const rawAmount = previousStop.amount + (nextStop.amount - previousStop.amount) * progress;
  return roundAmountToStep(rawAmount, min, max, step);
}

function getSelectedRaiseAmount(legal = state.table?.legalActions || {}, table = state.table, human = null) {
  const { min, max, step } = getRaiseAmountBounds(legal, table, human);
  if (!Number.isFinite(state.selectedRaiseAmount)) {
    state.selectedRaiseAmount = calculateRaiseAmountForSlider(Number(els.amountInput.value), legal, table, human);
  }
  state.selectedRaiseAmount = roundAmountToStep(state.selectedRaiseAmount, min, max, step);
  return state.selectedRaiseAmount;
}

function getRaisePresetPosition(preset, legal = state.table?.legalActions || {}) {
  return getRaiseSliderStops(legal).find((stop) => stop.preset === preset)?.position ?? RAISE_SLIDER_MIN;
}

function getRaisePresetForPosition(position, legal = state.table?.legalActions || {}) {
  return getRaiseSliderStops(legal).find((stop) => Math.abs(stop.position - Number(position)) < 0.5)?.preset || "";
}

function roundAmountToStep(value, min, max, step) {
  const safeStep = Math.max(1, Number(step || 1));
  const bounded = Math.min(Math.max(Number(value || min), min), max);
  return Math.min(max, Math.max(min, min + Math.round((bounded - min) / safeStep) * safeStep));
}

function renderRaisePresets(table = state.table, legal = table?.legalActions || {}, canChooseAmount = false) {
  const buttons = els.actionConsole.querySelectorAll("[data-raise-preset]");
  const stops = getRaiseAmountStops(legal, table);
  els.actionConsole.style.setProperty("--amount-preset-count", String(stops.length || 4));
  const stepLabels = els.actionConsole.querySelectorAll(".amount-steps span");
  stepLabels.forEach((label, index) => {
    const stop = stops[index];
    label.hidden = !stop;
    label.textContent = stop?.label || "";
  });
  buttons.forEach((button, index) => {
    const stop = stops[index];
    if (!stop) {
      button.hidden = true;
      button.disabled = true;
      button.classList.remove("active");
      button.textContent = "";
      button.removeAttribute("aria-label");
      button.removeAttribute("title");
      return;
    }
    button.hidden = false;
    const preset = stop.preset;
    button.dataset.raisePreset = preset;
    button.textContent = stop.label;
    const amount = calculateRaisePresetAmount(preset, legal, table);
    button.disabled = !canChooseAmount;
    button.classList.toggle("active", state.selectedRaisePreset === preset);
    button.title =
      preset === "all-in" ? `All in ${chips(amount)}` : `${stop.label} to ${chips(amount)}`;
    button.setAttribute("aria-label", button.title);
  });
}

function renderAmountActionLabels(table = state.table) {
  const legal = table?.legalActions || {};
  const amount = chips(getSelectedRaiseAmount(legal, table));

  els.betButton.textContent = legal.canBet ? `Bet ${amount}` : "Bet";
  if (legal.canRaise) {
    els.raiseButton.textContent = "Raise";
  } else if (legal.canBet) {
    els.raiseButton.textContent = "Open";
  } else {
    els.raiseButton.textContent = "Raise";
  }
}

function renderCard(card) {
  if (card.hidden) {
    return `
      <div class="card back" aria-label="Hidden card">
        <span class="card-mid">◆</span>
      </div>
    `;
  }

  const colorClass = card.color === "red" ? "red" : "black";
  const label = escapeHtml(card.label);
  const suit = escapeHtml(card.suitSymbol);
  return `
    <div class="card ${colorClass}" aria-label="${escapeHtml(card.display)}">
      <span class="card-corner card-top">${label}</span>
      <span class="card-mid" aria-hidden="true">${suit}</span>
      <span class="card-corner card-bottom">${label}</span>
    </div>
  `;
}

function renderSetupNotice() {
  els.setupNotice.textContent = state.setupNotice;
}

function renderNotice() {
  const turnPrompt = state.table?.isViewerTurn && state.table?.status === "playing" ? "Your turn" : "";
  els.actionNotice.textContent = state.actionNotice || turnPrompt;
}

function renderSoundState() {
  els.soundToggleButton.textContent = state.soundEnabled ? "Sound On" : "Sound Off";
  els.soundToggleButton.setAttribute("aria-pressed", String(state.soundEnabled));
  els.soundToggleButton.classList.toggle("is-off", !state.soundEnabled);
}

function ensureAudio() {
  if (!state.soundEnabled) {
    return null;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  if (!state.audioContext) {
    state.audioContext = new AudioContextClass();
  }

  if (state.audioContext.state === "suspended") {
    state.audioContext.resume().catch(() => {});
  }

  return state.audioContext;
}

function playActionSounds(table) {
  const tableKey = `${table.id}:${table.handNumber}`;
  if (state.actionSoundTableKey !== tableKey) {
    resetActionSoundTracking(table);
    return;
  }

  for (const player of table.players) {
    const key = getActionSoundKey(player);
    const previousKey = state.actionSoundKeys.get(player.id);
    if (previousKey && previousKey !== key) {
      const sound = getSoundForAction(player.lastAction);
      if (sound) {
        playTableSound(sound);
      }
    }
    state.actionSoundKeys.set(player.id, key);
  }
}

function resetActionSoundTracking(table) {
  state.actionSoundTableKey = table ? `${table.id}:${table.handNumber}` : "";
  state.actionSoundKeys.clear();

  if (!table) {
    return;
  }

  for (const player of table.players) {
    state.actionSoundKeys.set(player.id, getActionSoundKey(player));
  }
}

function getActionSoundKey(player) {
  return [
    player.lastAction || "",
    player.stack,
    player.bet,
    player.totalCommitted,
    player.folded,
    player.allIn,
    player.acted,
  ].join(":");
}

function getSoundForAction(actionValue) {
  const action = String(actionValue || "").toLowerCase();
  if (!action) return "";
  if (action.startsWith("fold")) return "fold";
  if (
    action.startsWith("call") ||
    action.startsWith("bet") ||
    action.startsWith("raise") ||
    action.startsWith("all in") ||
    action.startsWith("small blind") ||
    action.startsWith("big blind")
  ) {
    return "chips";
  }
  return "";
}

function startThinkingTick(tickKey) {
  if (!state.soundEnabled) {
    return;
  }

  if (state.thinkingTickKey === tickKey && state.thinkingTickTimer) {
    return;
  }

  stopThinkingTick();
  state.thinkingTickKey = tickKey;
  playTableSound("tick");
  state.thinkingTickTimer = window.setInterval(() => playTableSound("tick"), THINKING_TICK_MS);
}

function stopThinkingTick() {
  if (state.thinkingTickTimer) {
    window.clearInterval(state.thinkingTickTimer);
  }
  state.thinkingTickTimer = null;
  state.thinkingTickKey = "";
}

function playTableSound(type) {
  const audio = ensureAudio();
  if (!audio) {
    return;
  }

  if (type === "tick") {
    playTone(audio, { frequency: 940, duration: 0.025, gain: 0.045, type: "square" });
    playTone(audio, { frequency: 1420, start: 0.018, duration: 0.018, gain: 0.02, type: "triangle" });
    return;
  }

  if (type === "chips") {
    playTone(audio, { frequency: 760, duration: 0.045, gain: 0.07, type: "triangle" });
    playTone(audio, { frequency: 1180, start: 0.035, duration: 0.04, gain: 0.052, type: "square" });
    playTone(audio, { frequency: 540, start: 0.078, duration: 0.05, gain: 0.05, type: "triangle" });
    playNoise(audio, { start: 0.01, duration: 0.08, gain: 0.035 });
    return;
  }

  if (type === "fold") {
    playTone(audio, { frequency: 190, duration: 0.09, gain: 0.07, type: "sawtooth" });
    playTone(audio, { frequency: 95, start: 0.055, duration: 0.12, gain: 0.045, type: "sine" });
    playNoise(audio, { start: 0.02, duration: 0.055, gain: 0.025 });
  }
}

function playTone(audio, options) {
  const startTime = audio.currentTime + (options.start || 0);
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.type = options.type || "sine";
  oscillator.frequency.setValueAtTime(options.frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(options.gain, startTime + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + options.duration);

  oscillator.connect(gain);
  gain.connect(audio.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + options.duration + 0.02);
}

function playNoise(audio, options) {
  const sampleRate = audio.sampleRate;
  const frameCount = Math.max(1, Math.floor(sampleRate * options.duration));
  const buffer = audio.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < frameCount; index += 1) {
    data[index] = (Math.random() * 2 - 1) * (1 - index / frameCount);
  }

  const source = audio.createBufferSource();
  const gain = audio.createGain();
  const filter = audio.createBiquadFilter();
  const startTime = audio.currentTime + (options.start || 0);

  filter.type = "highpass";
  filter.frequency.setValueAtTime(620, startTime);
  gain.gain.setValueAtTime(options.gain, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + options.duration);

  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);
  source.start(startTime);
  source.stop(startTime + options.duration + 0.02);
}

function scheduleBotTurn(table) {
  const currentPlayer = table.players[table.currentPlayerIndex];
  const shouldRun = table.isHost && table.status === "playing" && currentPlayer?.type === "bot";

  if (!shouldRun) {
    clearBotTurnTimer();
    stopThinkingTick();
    return;
  }

  const botKey = [
    table.id,
    table.handNumber,
    table.phase,
    table.currentPlayerIndex,
    table.currentBet,
    table.potTotal,
    table.events.length,
  ].join(":");

  state.actionNotice = `${currentPlayer.name} is thinking...`;

  if (state.botTurnBusy || (state.botTurnTimer && state.botTurnKey === botKey)) {
    startThinkingTick(botKey);
    return;
  }

  clearBotTurnTimer();
  state.botTurnKey = botKey;
  state.botTurnTimer = window.setTimeout(() => runBotTurn(botKey, table.id), BOT_THINK_DELAY_MS);
  startThinkingTick(botKey);
}

function clearBotTurnTimer() {
  if (state.botTurnTimer) {
    window.clearTimeout(state.botTurnTimer);
  }
  state.botTurnTimer = null;
  state.botTurnKey = "";
}

async function runBotTurn(botKey, tableId) {
  if (!state.table || state.table.id !== tableId || state.botTurnKey !== botKey) {
    return;
  }

  const currentPlayer = state.table.players[state.table.currentPlayerIndex];
  state.botTurnTimer = null;
  stopThinkingTick();
  state.botTurnBusy = true;
  state.actionNotice = currentPlayer ? `${currentPlayer.name} is acting...` : "Opponent is acting...";
  renderNotice();

  try {
    const table = await apiFetch(`/api/poker/tables/${tableId}/bot-turn`, {
      method: "POST",
      body: {},
    });

    if (!state.table || state.table.id !== tableId) {
      state.botTurnBusy = false;
      return;
    }

    state.table = table;
    state.botTurnBusy = false;
    state.botTurnKey = "";
    state.actionNotice = "";
    render();
  } catch (error) {
    state.botTurnBusy = false;
    state.actionNotice = error.message;
    renderNotice();
  }
}

function renderRoleGuide() {
  const role =
    state.account?.role ||
    (state.authMode === "signup" && !els.authPanel.classList.contains("is-hidden")
      ? els.authRole.value
      : "player");
  els.roleGuideTitle.textContent = titleCase(role);

  document.querySelectorAll("[data-role-card]").forEach((card) => {
    card.classList.toggle("active", card.dataset.roleCard === role);
  });
}

function renderLobbyAccess() {
  const role = state.account?.role || "";
  const isSignedIn = Boolean(state.account);
  const isHost = canCurrentUser("create_cash_table") || canCurrentUser("create_tournament");
  const isAdmin = canCurrentUser("manage_users");
  const isGuest = role === "guest";
  const isPlayer = canCurrentUser("join_tournament");
  const canJoinOrViewTables = canCurrentUser("join_cash_table") || canCurrentUser("view_table");
  renderTournamentCreationOptions();
  renderRoleHome(role || "visitor");

  els.playerIdentityGroup.classList.toggle("is-hidden", !isSignedIn);
  els.createTableSection.classList.toggle("is-hidden", !isHost);
  els.hostRoomsSection.classList.toggle("is-hidden", !isHost);
  els.tournamentLobbySection.classList.toggle("is-hidden", !isPlayer);
  els.joinTableSection.classList.toggle("is-hidden", !isSignedIn || !canJoinOrViewTables);
  const isViewerRole = canCurrentUser("view_table") && !canCurrentUser("claim_seat");
  els.joinTableTitle.textContent = isViewerRole
    ? "View an existing table"
    : "Join a cash or private table";
  els.joinTableButton.textContent = isViewerRole ? "View Room" : "Join Table";
  els.adminPanel.classList.toggle("is-hidden", !isAdmin);
  els.setupPanel.classList.toggle("admin-mode", isAdmin);
  if (isAdmin && !state.adminUsersLoaded && !state.adminUsersBusy) {
    loadAdminUsers();
  }
  if (isHost && !state.hostTablesLoaded && !state.hostTablesBusy) {
    loadHostTables();
  }
  if (isPlayer) {
    startTournamentPolling();
    if (!state.tournamentsLoaded && !state.tournamentsBusy) loadTournaments();
  } else {
    stopTournamentPolling();
  }

  if (!isSignedIn) {
    els.setupEyebrow.textContent = "Player access";
    els.setupTitle.textContent = "Sign in, sign up, or continue as a guest";
  } else if (isHost) {
    els.setupEyebrow.textContent = "Host lobby";
    els.setupTitle.textContent = "Create a room or view an existing table";
  } else if (isAdmin) {
    els.setupEyebrow.textContent = "Admin access";
    els.setupTitle.textContent = "Manage registered users or view a poker table";
  } else {
    els.setupEyebrow.textContent = `${titleCase(role)} access`;
    els.setupTitle.textContent = "Choose a tournament or join a cash table";
  }
}

function renderRoleHome(role) {
  if (!els.roleHomeGrid) return;
  const content = ROLE_HOME_CONTENT[role] || ROLE_HOME_CONTENT.visitor;
  els.roleHome.dataset.role = role;
  els.roleHomeEyebrow.textContent = content.eyebrow;
  els.roleHomeTitle.textContent = content.title;
  els.roleHomeGrid.innerHTML = content.cards
    .map(
      ([label, title, detail]) => `
        <article class="role-home-card">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(title)}</strong>
          <small>${escapeHtml(detail)}</small>
        </article>
      `,
    )
    .join("");
}

async function loadRankings() {
  if (state.rankingsBusy) return;
  state.rankingsBusy = true;
  state.rankingsNotice = "Loading rankings...";
  renderRankings();
  try {
    const payload = await apiFetch("/api/auth/rankings", { auth: false });
    state.rankings = payload.rankings || [];
    state.rankingsLoaded = true;
    state.rankingsNotice = state.rankings.length ? "" : "Complete a hand to appear in the rankings.";
  } catch (error) {
    state.rankingsNotice = error.message;
  } finally {
    state.rankingsBusy = false;
    renderRankings();
  }
}

function renderRankings() {
  els.rankingsRefreshButton.disabled = state.rankingsBusy;
  els.rankingsNotice.textContent = state.rankingsNotice;
  if (!state.rankings.length) {
    els.leaderboardList.innerHTML = renderEmptyState(
      state.rankingsBusy ? "Loading rankings" : "No ranked hands yet",
      state.rankingsBusy
        ? "Refreshing session leaderboard."
        : "Completed hands will appear here with wins and hands played.",
    );
    return;
  }
  els.leaderboardList.innerHTML = state.rankings
    .map(
      (player) => `
        <article class="leaderboard-row">
          <strong class="leaderboard-rank">#${player.rank}</strong>
          ${renderAvatarMarkup(player.profileImage, player.playerName)}
          <div>
            <strong>${escapeHtml(player.playerName)}</strong>
            <span>${player.handsWon} won · ${player.handsPlayed} played</span>
          </div>
          <strong>${player.handsWon}</strong>
        </article>
      `,
    )
    .join("");
}

async function refreshStatsAfterHand(table) {
  const handKey = `${table.id}:${table.handNumber}`;
  if (state.lastStatsHandKey === handKey) return;
  state.lastStatsHandKey = handKey;
  try {
    if (state.session?.token) {
      setAuthenticatedSession(await apiFetch("/api/auth/session"));
    }
    state.rankingsLoaded = false;
    loadRankings();
  } catch {
    // Statistics refresh does not interrupt the current table.
  }
}

async function loadAdminUsers() {
  if (!canCurrentUser("manage_users") || state.adminUsersBusy) return;

  state.adminUsersBusy = true;
  state.adminNotice = "Loading registered users...";
  renderAdminUsers();
  try {
    const payload = await apiFetch("/api/auth/users");
    state.adminUsers = payload.users;
    state.adminUsersLoaded = true;
    state.adminSelectedUserIds = new Set(
      [...state.adminSelectedUserIds].filter((id) =>
        state.adminUsers.some((user) => user.id === id && !user.protected),
      ),
    );
    state.adminNotice = `${state.adminUsers.length} registered users.`;
  } catch (error) {
    state.adminNotice = error.message;
  } finally {
    state.adminUsersBusy = false;
    renderAdminUsers();
  }
}

function renderAdminUsers() {
  if (!els.adminUsersBody) return;
  renderAdminSummary();
  const visibleUsers = getFilteredAdminUsers();

  els.adminUsersBody.innerHTML = visibleUsers.length
    ? visibleUsers
    .map((user) => {
      const selected = state.adminSelectedUserIds.has(user.id);
      const statusLabel = user.active ? "Active" : "Inactive";
      const reservedLabel = user.reservedRole
        ? `<small>Reserved ${escapeHtml(titleCase(user.reservedRole))}</small>`
        : "";
      return `
        <tr class="${user.active ? "" : "is-inactive"}">
          <td>
            <input
              type="checkbox"
              data-admin-select
              data-user-id="${escapeHtml(user.id)}"
              aria-label="Select ${escapeHtml(user.playerName)}"
              ${selected ? "checked" : ""}
              ${user.protected ? "disabled" : ""}
            />
          </td>
          <td>
            <strong>${escapeHtml(user.playerName)}</strong>
            <small>@${escapeHtml(user.userId)}</small>
            ${reservedLabel}
          </td>
          <td><span class="role-chip">${escapeHtml(titleCase(user.role))}</span></td>
          <td><span class="status-chip ${user.active ? "is-active" : "is-inactive"}">${statusLabel}</span></td>
          <td>
            <label class="status-switch">
              <input
                type="checkbox"
                data-admin-toggle
                data-user-id="${escapeHtml(user.id)}"
                aria-label="${user.active ? "Deactivate" : "Activate"} ${escapeHtml(user.playerName)}"
                ${user.active ? "checked" : ""}
                ${user.protected ? "disabled" : ""}
              />
              <span aria-hidden="true"></span>
            </label>
          </td>
        </tr>
      `;
    })
    .join("")
    : `<tr><td colspan="5">${renderEmptyState(
        state.adminUsersBusy ? "Loading users" : "No users match",
        state.adminUsersBusy ? "Refreshing registered accounts." : "Change the role filter or search text.",
      )}</td></tr>`;

  const selectableIds = visibleUsers.filter((user) => !user.protected).map((user) => user.id);
  const selectedCount = selectableIds.filter((id) => state.adminSelectedUserIds.has(id)).length;
  els.adminSelectAll.checked = selectableIds.length > 0 && selectedCount === selectableIds.length;
  els.adminSelectAll.indeterminate = selectedCount > 0 && selectedCount < selectableIds.length;
  els.adminActivateButton.disabled = state.adminUsersBusy || selectedCount === 0;
  els.adminDeactivateButton.disabled = state.adminUsersBusy || selectedCount === 0;
  els.adminRefreshButton.disabled = state.adminUsersBusy;
  els.adminNotice.textContent = state.adminNotice;
}

function renderAdminSummary() {
  if (!els.adminSummary || !els.adminRoleFilters) return;
  const summary = state.adminUsers.reduce(
    (totals, user) => {
      totals.total += 1;
      totals[user.role] = (totals[user.role] || 0) + 1;
      if (user.active) totals.active += 1;
      else totals.inactive += 1;
      return totals;
    },
    { total: 0, active: 0, inactive: 0, admin: 0, host: 0, player: 0 },
  );

  els.adminSummary.innerHTML = [
    ["Users", summary.total],
    ["Active", summary.active],
    ["Inactive", summary.inactive],
    ["Admins", summary.admin],
    ["Hosts", summary.host],
    ["Players", summary.player],
  ]
    .map(
      ([label, value]) =>
        `<span><small>${escapeHtml(label)}</small><strong>${value}</strong></span>`,
    )
    .join("");

  const filters = [
    ["all", "All", summary.total],
    ["admin", "Admin", summary.admin],
    ["host", "Host", summary.host],
    ["player", "Player", summary.player],
    ["inactive", "Inactive", summary.inactive],
  ];
  els.adminRoleFilters.innerHTML = filters
    .map(
      ([value, label, count]) =>
        `<button type="button" class="${state.adminRoleFilter === value ? "active" : ""}" data-admin-role-filter="${value}">${label} <span>${count}</span></button>`,
    )
    .join("");
}

function getFilteredAdminUsers() {
  const filteredByRole =
    state.adminRoleFilter === "inactive"
      ? state.adminUsers.filter((user) => !user.active)
      : ["admin", "host", "player"].includes(state.adminRoleFilter)
        ? state.adminUsers.filter((user) => user.role === state.adminRoleFilter)
        : state.adminUsers;
  if (!state.adminSearchTerm) return filteredByRole;
  return filteredByRole.filter((user) => {
    const haystack = `${user.playerName} ${user.userId} ${user.role}`.toLowerCase();
    return haystack.includes(state.adminSearchTerm);
  });
}

function renderEmptyState(title, detail) {
  return `
    <article class="empty-state">
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(detail)}</span>
    </article>
  `;
}

function updateSelectedAdminUsers(active) {
  updateAdminUserStatus([...state.adminSelectedUserIds], active);
}

async function updateAdminUserStatus(userIds, active) {
  if (!userIds.length || state.adminUsersBusy) {
    state.adminNotice = "Select at least one registered user.";
    renderAdminUsers();
    return;
  }

  state.adminUsersBusy = true;
  state.adminNotice = active ? "Activating selected users..." : "Deactivating selected users...";
  renderAdminUsers();
  try {
    const payload = await apiFetch("/api/auth/users/status", {
      method: "PATCH",
      body: { userIds, active },
    });
    state.adminUsers = payload.users;
    state.adminUsersLoaded = true;
    state.adminSelectedUserIds.clear();
    state.adminNotice = active ? "Selected users are active." : "Selected users are inactive.";
  } catch (error) {
    state.adminNotice = error.message;
  } finally {
    state.adminUsersBusy = false;
    renderAdminUsers();
  }
}

function loadStoredSession() {
  return (
    readStoredSession(localStorage, REGISTERED_SESSION_STORAGE_KEY, "account") ||
    readStoredSession(sessionStorage, GUEST_SESSION_STORAGE_KEY, "guest")
  );
}

function readStoredSession(storage, key, expectedType) {
  try {
    const stored = JSON.parse(storage.getItem(key) || "null");
    const accountType = stored?.account?.type || stored?.accountType;
    return stored?.token && stored?.playerId && accountType === expectedType ? stored : null;
  } catch {
    return null;
  }
}

function accountFromSession(session) {
  const identity = session.identity || {};
  const account = session.account || {};
  const profile = session.profile || {};
  const role = session.role || (account.type === "guest" || session.accountType === "guest" ? "guest" : "player");
  return {
    name: profile.displayName || identity.displayName || session.playerName,
    role,
    roleDetails: session.roleDetails || null,
    permissions: Array.isArray(session.permissions) ? session.permissions : null,
    accountType: account.type || session.accountType,
    userId: account.userId || identity.userId || session.userId,
    active: account.active !== false,
    reservedRole: account.reservedRole || session.reservedRole || null,
    profileImage: profile.image || session.profileImage || null,
  };
}

function canCurrentUser(permission) {
  const role = state.account?.role || "";
  const permissions = Array.isArray(state.account?.permissions)
    ? state.account.permissions
    : Array.isArray(state.account?.roleDetails?.permissions)
      ? state.account.roleDetails.permissions
    : CLIENT_ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

async function handleProfilePhoto() {
  const file = els.profilePhotoInput.files?.[0];
  if (!file) return;
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    els.authNotice.textContent = "Choose a JPG, PNG, or WebP image.";
    els.profilePhotoInput.value = "";
    return;
  }

  els.authNotice.textContent = "Preparing photo...";
  try {
    state.pendingProfileImage = await resizeProfilePhoto(file);
    renderProfilePhotoPreview();
    renderAuthRoleNotice();
  } catch (error) {
    state.pendingProfileImage = null;
    els.profilePhotoInput.value = "";
    els.authNotice.textContent = error.message;
  }
}

function toggleProfileDialog() {
  if (!state.account) return;
  if (els.profileDialog.classList.contains("is-hidden")) {
    openProfileDialog();
  } else {
    closeProfileDialog();
  }
}

function openProfileDialog() {
  state.profileDraftImage = state.account.profileImage || null;
  els.profileDisplayName.value = state.account.name;
  els.profileHandsPlayed.textContent = String(state.session?.stats?.handsPlayed || 0);
  els.profileHandsWon.textContent = String(state.session?.stats?.handsWon || 0);
  els.profileEditPhotoInput.value = "";
  els.profileNotice.textContent = "";
  renderProfileEditPreview();
  els.profileDialog.classList.remove("is-hidden");
  els.topbarAvatar.setAttribute("aria-expanded", "true");
  window.requestAnimationFrame(() => els.profileDisplayName.focus());
}

function closeProfileDialog() {
  closePhotoLightbox();
  els.profileDialog.classList.add("is-hidden");
  els.topbarAvatar.setAttribute("aria-expanded", "false");
  els.profileNotice.textContent = "";
}

async function handleProfileEditPhoto() {
  const file = els.profileEditPhotoInput.files?.[0];
  if (!file) return;
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    els.profileNotice.textContent = "Choose a JPG, PNG, or WebP image.";
    els.profileEditPhotoInput.value = "";
    return;
  }

  els.profileNotice.textContent = "Preparing photo...";
  try {
    state.profileDraftImage = await resizeProfilePhoto(file);
    renderProfileEditPreview();
    els.profileNotice.textContent = "";
  } catch (error) {
    els.profileEditPhotoInput.value = "";
    els.profileNotice.textContent = error.message;
  }
}

async function saveProfile() {
  const playerName = String(els.profileDisplayName.value || "").trim().slice(0, 24);
  if (playerName.length < 2) {
    els.profileNotice.textContent = "Display name must be at least 2 characters.";
    return;
  }

  els.profileSaveButton.disabled = true;
  els.profileNotice.textContent = "Saving profile...";
  try {
    const session = await apiFetch("/api/auth/profile", {
      method: "PATCH",
      body: { playerName, profileImage: state.profileDraftImage },
    });
    setAuthenticatedSession(session);
    if (state.table) {
      state.table = await apiFetch(`/api/poker/tables/${state.table.id}`);
    }
    state.setupNotice = "Profile updated.";
    render();
    closeProfileDialog();
  } catch (error) {
    els.profileNotice.textContent = error.message;
  } finally {
    els.profileSaveButton.disabled = false;
  }
}

function renderProfileEditPreview() {
  renderAvatar(els.profileEditPreview, state.profileDraftImage, els.profileDisplayName.value || "Player");
  els.profileEditRemoveButton.classList.toggle("is-hidden", !state.profileDraftImage);
  els.profileEditPreview.classList.toggle("can-enlarge", Boolean(state.profileDraftImage));
  els.profileEditPreview.disabled = !state.profileDraftImage;
}

function openPhotoLightbox() {
  if (!state.profileDraftImage) return;
  els.photoLightboxImage.innerHTML = `<img src="${escapeHtml(state.profileDraftImage)}" alt="Profile photo for ${escapeHtml(els.profileDisplayName.value || "player")}" />`;
  els.photoLightboxName.textContent = els.profileDisplayName.value || "Profile photo";
  els.photoLightbox.classList.remove("is-hidden");
  els.photoLightboxClose.focus();
}

function closePhotoLightbox() {
  els.photoLightbox.classList.add("is-hidden");
  els.photoLightboxImage.innerHTML = "";
}

function resizeProfilePhoto(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const size = Math.min(image.naturalWidth, image.naturalHeight);
      const sourceX = (image.naturalWidth - size) / 2;
      const sourceY = (image.naturalHeight - size) / 2;
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext("2d");
      context.drawImage(image, sourceX, sourceY, size, size, 0, 0, 256, 256);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("That photo could not be read."));
    };
    image.src = objectUrl;
  });
}

function renderProfilePhotoPreview() {
  renderAvatar(
    els.profilePhotoPreview,
    state.pendingProfileImage,
    els.authName.value || els.authUserId.value || "Player",
  );
  els.removeProfilePhotoButton.classList.toggle("is-hidden", !state.pendingProfileImage);
}

function renderAvatar(element, profileImage, name) {
  element.innerHTML = renderAvatarContent(profileImage, name);
  element.classList.toggle("has-photo", Boolean(profileImage));
}

function renderAvatarMarkup(profileImage, name) {
  return `<span class="profile-avatar seat-avatar ${profileImage ? "has-photo" : ""}" aria-hidden="true">${renderAvatarContent(profileImage, name)}</span>`;
}

function renderAvatarContent(profileImage, name) {
  if (profileImage) {
    return `<img src="${escapeHtml(profileImage)}" alt="" />`;
  }
  const initial = String(name || "P").trim().charAt(0).toUpperCase() || "P";
  return `<span class="profile-avatar-fallback">${escapeHtml(initial)}</span>`;
}

function setAuthenticatedSession(session) {
  clearStoredSession();
  state.session = session;
  state.account = accountFromSession(session);
  state.tournaments = [];
  state.tournamentsLoaded = false;
  state.tournamentsNotice = "";
  state.playerCashTables = [];
  state.playerCashTablesLoaded = false;
  const accountType = session.account?.type || session.accountType;
  const storage = accountType === "account" ? localStorage : sessionStorage;
  const key =
    accountType === "account" ? REGISTERED_SESSION_STORAGE_KEY : GUEST_SESSION_STORAGE_KEY;
  storage.setItem(key, JSON.stringify(session));
}

function clearStoredSession() {
  localStorage.removeItem(REGISTERED_SESSION_STORAGE_KEY);
  sessionStorage.removeItem(GUEST_SESSION_STORAGE_KEY);
  sessionStorage.removeItem("pokerPlayerSession");
}

async function signOut() {
  if (state.session?.token) {
    try {
      await apiFetch("/api/auth/signout", { method: "POST", body: {} });
    } catch {
      // Local sign-out still succeeds if the server session has already expired.
    }
  }

  stopTablePolling();
  stopTournamentPolling();
  clearBotTurnTimer();
  stopThinkingTick();
  closeProfileDialog();
  clearStoredSession();
  state.table = null;
  state.account = null;
  state.session = null;
  state.raiseComposerActive = false;
  state.raiseComposerTurnKey = "";
  state.selectedRaisePreset = "";
  state.selectedRaiseAmount = 0;
  state.adminUsers = [];
  state.adminSelectedUserIds.clear();
  state.adminUsersLoaded = false;
  state.adminNotice = "";
  state.adminSearchTerm = "";
  if (els.adminUserSearch) els.adminUserSearch.value = "";
  state.hostTables = [];
  state.hostTablesLoaded = false;
  state.hostRoomsNotice = "";
  state.tournaments = [];
  state.tournamentsLoaded = false;
  state.tournamentsNotice = "";
  state.playerCashTables = [];
  state.playerCashTablesLoaded = false;
  state.setupNotice = "Signed out.";
  state.actionNotice = "";
  render();
}

async function ensurePlayerSession() {
  if (state.session?.token) {
    return state.session;
  }

  showAuthPanel("guest");
  throw new Error("Sign in, create an account, or continue as a guest first.");
}

async function validateStoredSession() {
  if (!state.session?.token) return;

  try {
    const session = await apiFetch("/api/auth/session");
    setAuthenticatedSession(session);
    renderAuthState();
    renderLobbyAccess();
  } catch {
    clearStoredSession();
    state.account = null;
    state.session = null;
    state.setupNotice = "Your previous session expired. Sign in again or use guest mode.";
    render();
  }
}

function startTablePolling() {
  stopTablePolling();
  state.tablePollTimer = window.setInterval(refreshTable, TABLE_POLL_MS);
}

function stopTablePolling() {
  if (state.tablePollTimer) {
    window.clearInterval(state.tablePollTimer);
  }
  state.tablePollTimer = null;
  state.tablePollBusy = false;
}

function startTournamentPolling() {
  if (state.tournamentPollTimer || !canCurrentUser("join_tournament") || state.table) return;
  state.tournamentPollTimer = window.setInterval(loadTournaments, TOURNAMENT_POLL_MS);
}

function stopTournamentPolling() {
  if (state.tournamentPollTimer) {
    window.clearInterval(state.tournamentPollTimer);
  }
  state.tournamentPollTimer = null;
}

async function refreshTable() {
  if (!state.table || state.tablePollBusy || state.botTurnBusy) {
    return;
  }

  const tableId = state.table.id;
  state.tablePollBusy = true;
  try {
    const table = await apiFetch(`/api/poker/tables/${tableId}`);
    if (state.table?.id === tableId) {
      state.table = table;
      render();
    }
  } catch (error) {
    if (error.message === "Poker table not found.") {
      stopTablePolling();
      state.table = null;
      state.setupNotice = "This table was closed by the Host.";
      render();
      return;
    }
    state.actionNotice = error.message;
    renderNotice();
  } finally {
    state.tablePollBusy = false;
  }
}

async function apiFetch(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (options.auth !== false && state.session?.token) {
    headers.Authorization = `Bearer ${state.session.token}`;
  }

  const response = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || "Request failed.");
  }

  return payload;
}

function chips(value) {
  return new Intl.NumberFormat("en-US").format(Number(value || 0));
}

function formatWinChance(winChance) {
  return winChance?.percent == null ? "--" : `${winChance.percent}%`;
}

function titleCase(value) {
  return String(value || "")
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

render();
validateStoredSession();
