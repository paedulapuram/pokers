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
const storedSession = loadStoredSession();

const state = {
  table: null,
  authMode: "signin",
  account: storedSession ? accountFromSession(storedSession) : null,
  session: storedSession,
  setupNotice: "",
  actionNotice: "",
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
};

const BOT_THINK_DELAY_MS = 3000;
const THINKING_TICK_MS = 420;
const TABLE_POLL_MS = 1000;
const TOURNAMENT_POLL_MS = 5000;

els.signInLink.addEventListener("click", () => showAuthPanel("signin"));
els.signUpLink.addEventListener("click", () => showAuthPanel("signup"));
els.guestLink.addEventListener("click", () => showAuthPanel("guest"));
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
  state.hostTablesLoaded = false;
  state.tournamentsLoaded = false;
  render();
});

els.amountInput.addEventListener("input", () => {
  els.amountOutput.textContent = chips(Number(els.amountInput.value));
  renderAmountActionLabels();
});

els.foldButton.addEventListener("click", () => sendAction("fold"));
els.checkButton.addEventListener("click", () => sendAction("check"));
els.callButton.addEventListener("click", () => sendAction("call"));
els.betButton.addEventListener("click", () => sendAction("bet", Number(els.amountInput.value)));
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

  els.setupPanel.classList.toggle("is-hidden", hasTable);
  els.leaderboardPanel.classList.toggle("is-hidden", hasTable);
  els.tablePanel.classList.toggle("is-hidden", !hasTable);
  renderAuthState();
  renderSoundState();
  renderSetupNotice();

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
          </div>
        </div>
      </div>
      <div class="seat-outside-row">
        <span class="seat-win-badge ${player.winChance?.percent == null ? "is-hidden-chance" : ""}">
          <span>Win</span><strong>${escapeHtml(formatWinChance(player.winChance))}</strong>
        </span>
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
  const presets = {
    2: [
      { x: 50, y: 82 },
      { x: 50, y: 18 },
    ],
    3: [
      { x: 50, y: 82 },
      { x: 20, y: 34 },
      { x: 80, y: 34 },
    ],
    4: [
      { x: 50, y: 82 },
      { x: 18, y: 50 },
      { x: 50, y: 18 },
      { x: 82, y: 50 },
    ],
    5: [
      { x: 50, y: 82 },
      { x: 17, y: 58 },
      { x: 28, y: 22 },
      { x: 72, y: 22 },
      { x: 83, y: 58 },
    ],
    6: [
      { x: 50, y: 82 },
      { x: 18, y: 62 },
      { x: 18, y: 32 },
      { x: 50, y: 18 },
      { x: 82, y: 32 },
      { x: 82, y: 62 },
    ],
    7: [
      { x: 50, y: 84 },
      { x: 22, y: 68 },
      { x: 15, y: 44 },
      { x: 35, y: 18 },
      { x: 65, y: 18 },
      { x: 85, y: 44 },
      { x: 78, y: 68 },
    ],
    8: [
      { x: 50, y: 84 },
      { x: 22, y: 70 },
      { x: 14, y: 50 },
      { x: 22, y: 30 },
      { x: 50, y: 16 },
      { x: 78, y: 30 },
      { x: 86, y: 50 },
      { x: 78, y: 70 },
    ],
    9: [
      { x: 50, y: 84 },
      { x: 27, y: 77 },
      { x: 10, y: 56 },
      { x: 12, y: 31 },
      { x: 34, y: 19 },
      { x: 66, y: 19 },
      { x: 88, y: 31 },
      { x: 90, y: 54 },
      { x: 73, y: 77 },
    ],
  };
  const preset = presets[totalSeats];

  if (preset?.[index]) {
    return preset[index];
  }

  return { x: 50, y: 50 };
}

function renderCommunity(cards) {
  const rendered = cards.map(renderCard);
  while (rendered.length < 5) {
    rendered.push('<div class="card empty" aria-hidden="true"><span></span><span class="card-mid">·</span><span></span></div>');
  }
  return rendered.join("");
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
  els.actionConsole.classList.toggle("is-action-ready", canAct);
  const maxBet = Math.max(0, legal.maxBet || human?.stack || 0);
  const minAmount = Math.max(0, legal.canRaise ? legal.minRaiseTo : legal.minBet || table.config.bigBlind);
  const step = Math.max(1, table.config.smallBlind);

  els.amountInput.min = String(Math.min(minAmount, maxBet || minAmount));
  els.amountInput.max = String(Math.max(maxBet, minAmount));
  els.amountInput.step = String(step);

  const currentAmount = Number(els.amountInput.value);
  if (!Number.isFinite(currentAmount) || currentAmount < Number(els.amountInput.min) || currentAmount > Number(els.amountInput.max)) {
    els.amountInput.value = String(Number(els.amountInput.min));
  }
  els.amountOutput.textContent = chips(Number(els.amountInput.value));

  els.amountInput.disabled = !canAct || (!legal.canBet && !legal.canRaise);
  els.foldButton.disabled = !canAct || !legal.canFold;
  els.checkButton.disabled = !canAct || !legal.canCheck;
  els.callButton.disabled = !canAct || !legal.canCall;
  els.betButton.disabled = !canAct || !legal.canBet;
  els.raiseButton.disabled = !canAct || (!legal.canRaise && !legal.canBet);
  els.allInButton.disabled = !canAct || !legal.canAllIn;
  els.callButton.textContent = legal.callAmount > 0 ? `Call ${chips(legal.callAmount)}` : "Call";
  renderAmountActionLabels(table);
  els.nextHandButton.classList.toggle("is-hidden", table.status === "playing" || !table.isHost);
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
  const amount = Number(els.amountInput.value);
  if (legal.canRaise) {
    sendAction("raise", amount);
    return;
  }
  if (legal.canBet) {
    sendAction("bet", amount);
  }
}

function renderAmountActionLabels(table = state.table) {
  const legal = table?.legalActions || {};
  const amount = chips(Number(els.amountInput.value));

  els.betButton.textContent = legal.canBet ? `Bet ${amount}` : "Bet";
  if (legal.canRaise) {
    els.raiseButton.textContent = `Raise ${amount}`;
  } else if (legal.canBet) {
    els.raiseButton.textContent = `Open ${amount}`;
  } else {
    els.raiseButton.textContent = "Raise";
  }
}

function renderCard(card) {
  if (card.hidden) {
    return `
      <div class="card back" aria-label="Hidden card">
        <span></span>
        <span class="card-mid">◆</span>
        <span></span>
      </div>
    `;
  }

  const colorClass = card.color === "red" ? "red" : "black";
  return `
    <div class="card ${colorClass}" aria-label="${escapeHtml(card.display)}">
      <span>${escapeHtml(card.label)}</span>
      <span class="card-mid">${escapeHtml(card.suitSymbol)}</span>
      <span class="card-bottom">${escapeHtml(card.label)}</span>
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
