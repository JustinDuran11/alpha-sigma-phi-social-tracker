/* ==========================================================================
   ALPHA SIG SOCIAL HUB — SCRIPT
   ==========================================================================
   HOW TO ADD A NEW EVENT:
   Just add another object to the EVENTS array below. Everything else
   (calendar, cards, filters, modal, voting, top picks) is generated
   dynamically from this one array — you never need to touch the HTML.

   Required fields on every event object:
     id          unique number or string
     name        event title
     date        "YYYY-MM-DD" (must fall within Sept–Dec 2026 to show on
                 the calendar; events outside that range will still show
                 in the Event Ideas grid, just not on a calendar tile)
     category    one of: tailgate, social, party, brotherhood, date,
                 philanthropy, theme, sports   (see CATEGORIES below)
     status      one of: idea, voting, planned, confirmed
     partner     text, e.g. "TBD" or a chapter name
     attendance  free text, e.g. "50-100"
     budget      free text, e.g. "$$"
     description short sentence for the card + modal
     ideas       array of short bullet strings
     sampleVotes { mustDo: <number>, interested: <number> }
                 Starting/placeholder chapter-wide vote counts used to seed
                 the "Top Chapter Picks" ranking before real votes exist.
                 These are NOT connected to localStorage — see the VOTING
                 section further down for how real votes are handled.
   ========================================================================== */

const EVENTS = [
  {
    id: 1,
    name: "Football Tailgate",
    date: "2026-09-12",
    category: "tailgate",
    status: "confirmed",
    partner: "Panhellenic (TBD)",
    attendance: "50-100",
    budget: "$$",
    description: "Tailgate before the CSU football game — grill out, music, and yard games, with a possible joint fraternity/sorority turnout.",
    ideas: [
      "Grill and cook out",
      "Live or DJ music",
      "Yard games (cornhole, spikeball)",
      "Open it up as a joint tailgate"
    ],
    sampleVotes: { mustDo: 34, interested: 22 }
  },
  {
    id: 2,
    name: "Western Night",
    date: "2026-09-19",
    category: "theme",
    status: "voting",
    partner: "TBD",
    attendance: "40-80",
    budget: "$$",
    description: "Cowboy and western theme night with country music, boots and hats, and western-style decorations.",
    ideas: [
      "Cowboy boots & hats encouraged",
      "Country music playlist",
      "Western-style decorations",
      "Possible joint social with a sorority"
    ],
    sampleVotes: { mustDo: 18, interested: 27 }
  },
  {
    id: 3,
    name: "Casino Night",
    date: "2026-09-26",
    category: "party",
    status: "idea",
    partner: "TBD",
    attendance: "40-70",
    budget: "$$$",
    description: "A dressier social with blackjack, poker, and roulette tables using fake money, and prizes for the top chip counts.",
    ideas: [
      "Blackjack, poker & roulette tables",
      "Fake casino money",
      "Prizes for top chip counts",
      "Dressier social — encourage nicer attire"
    ],
    sampleVotes: { mustDo: 21, interested: 19 }
  },
  {
    id: 4,
    name: "Jersey Night",
    date: "2026-10-03",
    category: "sports",
    status: "voting",
    partner: "TBD",
    attendance: "50-90",
    budget: "$",
    description: "Everyone reps their favorite sports jersey for a night of team competitions, drinking games, and sports-themed decorations.",
    ideas: [
      "Wear your favorite jersey",
      "Team-based competitions",
      "Sports-themed decorations",
      "Tailgate-style games"
    ],
    sampleVotes: { mustDo: 16, interested: 24 }
  },
  {
    id: 5,
    name: "Blackout / Neon Night",
    date: "2026-10-17",
    category: "theme",
    status: "idea",
    partner: "TBD",
    attendance: "50-100",
    budget: "$$",
    description: "An all-black-clothing party lit up with LED and neon decorations, blacklights, and glow sticks.",
    ideas: [
      "All-black dress code",
      "Blacklights & neon decorations",
      "Glow sticks for guests",
      "DJ or curated playlist"
    ],
    sampleVotes: { mustDo: 25, interested: 20 }
  },
  {
    id: 6,
    name: "Halloween Mixer",
    date: "2026-10-31",
    category: "theme",
    status: "planned",
    partner: "Partner org TBD",
    attendance: "70-120",
    budget: "$$$",
    description: "A costume party for Halloween weekend, with a costume contest and full Halloween decorations.",
    ideas: [
      "Costume contest with a prize",
      "Halloween decorations",
      "Photo backdrop",
      "Partner organization still being decided"
    ],
    sampleVotes: { mustDo: 42, interested: 31 }
  },
  {
    id: 7,
    name: "Fall Date Night",
    date: "2026-11-07",
    category: "date",
    status: "planned",
    partner: "N/A — bring a date",
    attendance: "30-60 (couples)",
    budget: "$$$",
    description: "A semi-formal date event with dinner, photos, and music — dates encouraged.",
    ideas: [
      "Semi-formal dress code",
      "Sit-down or catered dinner",
      "Photo setup",
      "Music for after dinner"
    ],
    sampleVotes: { mustDo: 29, interested: 33 }
  },
  {
    id: 8,
    name: "Football Tailgate",
    date: "2026-11-14",
    category: "tailgate",
    status: "confirmed",
    partner: "Panhellenic (TBD)",
    attendance: "50-100",
    budget: "$$",
    description: "A second CSU football tailgate this semester, with a chance to open it up to another chapter.",
    ideas: [
      "Grill and cook out",
      "Yard games",
      "Joint chapter opportunity",
      "Music"
    ],
    sampleVotes: { mustDo: 20, interested: 18 }
  },
  {
    id: 9,
    name: "Friendsgiving",
    date: "2026-11-21",
    category: "brotherhood",
    status: "confirmed",
    partner: "Brothers only",
    attendance: "40-70",
    budget: "$$",
    description: "A Thanksgiving-themed brotherhood dinner to celebrate the semester with food and guests.",
    ideas: [
      "Potluck-style Thanksgiving food",
      "Open to guests or brothers-only",
      "Thanksgiving decorations",
      "Casual, low-key vibe"
    ],
    sampleVotes: { mustDo: 15, interested: 26 }
  },
  {
    id: 10,
    name: "Holiday Social",
    date: "2026-12-05",
    category: "theme",
    status: "voting",
    partner: "TBD",
    attendance: "50-90",
    budget: "$$",
    description: "A Christmas and holiday-themed social with ugly sweaters, decorations, and photos.",
    ideas: [
      "Ugly sweater contest",
      "Holiday decorations",
      "Photo backdrop",
      "Holiday music playlist"
    ],
    sampleVotes: { mustDo: 23, interested: 20 }
  },
  {
    id: 11,
    name: "End of Semester Celebration",
    date: "2026-12-12",
    category: "brotherhood",
    status: "idea",
    partner: "Chapter only",
    attendance: "All active members",
    budget: "$$",
    description: "A chapter-wide celebration for finishing the semester, with awards, recognition, food, and music.",
    ideas: [
      "End-of-semester awards",
      "Food and music",
      "Recognize new members & achievements",
      "Casual chapter hangout"
    ],
    sampleVotes: { mustDo: 12, interested: 19 }
  }
];

/* --------------------------------------------------------------------
   CATEGORY + STATUS METADATA
   Colors reference the CSS custom properties defined in styles.css.
   -------------------------------------------------------------------- */
const CATEGORIES = {
  tailgate:     { label: "Tailgate",         icon: "🏈", color: "var(--cat-tailgate)" },
  social:       { label: "Sorority Social",  icon: "🤝", color: "var(--cat-social)" },
  party:        { label: "Party",            icon: "🎉", color: "var(--cat-party)" },
  brotherhood:  { label: "Brotherhood",      icon: "🦅", color: "var(--cat-brotherhood)" },
  date:         { label: "Date / Formal",    icon: "👔", color: "var(--cat-date)" },
  philanthropy: { label: "Philanthropy",     icon: "🏆", color: "var(--cat-philanthropy)" },
  theme:        { label: "Theme",            icon: "🎃", color: "var(--cat-theme)" },
  sports:       { label: "Sports",           icon: "🏀", color: "var(--cat-sports)" }
};

const STATUSES = {
  idea:      { label: "Idea" },
  voting:    { label: "Voting" },
  planned:   { label: "Planned" },
  confirmed: { label: "Confirmed" }
};

/*
  Filter chips shown above the Event Ideas grid.
  Note: the brief's filter list omitted a "Sports" chip even though Sports
  is one of the eight calendar categories (used by Jersey Night). It's
  added here so every category can actually be filtered to — remove it
  if you'd rather match the original 7-filter list exactly.
*/
const FILTERS = [
  { key: "all",          label: "All" },
  { key: "tailgate",     label: "Tailgates" },
  { key: "social",       label: "Socials" },
  { key: "party",        label: "Parties" },
  { key: "brotherhood",  label: "Brotherhood" },
  { key: "date",         label: "Dates / Formal" },
  { key: "philanthropy", label: "Philanthropy" },
  { key: "theme",        label: "Themes" },
  { key: "sports",       label: "Sports" }
];

/* Months shown in the semester calendar (JS months are 0-indexed). */
const SEMESTER_MONTHS = [
  { year: 2026, month: 8,  label: "September 2026", shortLabel: "Sept" },
  { year: 2026, month: 9,  label: "October 2026",   shortLabel: "Oct" },
  { year: 2026, month: 10, label: "November 2026",  shortLabel: "Nov" },
  { year: 2026, month: 11, label: "December 2026",  shortLabel: "Dec" }
];

/* --------------------------------------------------------------------
   VOTING (localStorage)
   --------------------------------------------------------------------
   IMPORTANT: Votes stored here live ONLY in the current browser, on the
   current device. They are NOT shared with other chapter members and
   are wiped if the user clears their browser data. The numbers shown
   in "Top Chapter Picks" (sampleVotes above) are separate, hardcoded
   placeholder totals — a user's own vote never changes that number.

   To make voting shared across the whole chapter, swap the
   loadVotes/saveVotes functions below for calls to Google Sheets,
   Firebase, or Supabase. Every other function in this file calls only
   loadVotes()/saveVotes()/getUserVote()/setUserVote(), so that's the
   only place you'd need to change.
   -------------------------------------------------------------------- */
const STORAGE_KEYS = {
  VOTES: "asf_votes",
  SUBMISSIONS: "asf_submissions"
};

function loadVotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VOTES);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn("Could not read votes from localStorage:", err);
    return {};
  }
}

function saveVotes(votes) {
  try {
    localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votes));
  } catch (err) {
    console.warn("Could not save votes to localStorage:", err);
  }
}

function getUserVote(eventId) {
  const votes = loadVotes();
  return votes[String(eventId)] || null;
}

/* Clicking the same vote again removes it (un-vote). */
function setUserVote(eventId, type) {
  const votes = loadVotes();
  const key = String(eventId);
  if (votes[key] === type) {
    delete votes[key];
  } else {
    votes[key] = type;
  }
  saveVotes(votes);
  renderCards();
  renderTopPicks();
  refreshOpenModal(eventId);
}

function loadSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Could not read submissions from localStorage:", err);
    return [];
  }
}

function saveSubmissions(submissions) {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  } catch (err) {
    console.warn("Could not save submission to localStorage:", err);
  }
}

/* --------------------------------------------------------------------
   STATE
   -------------------------------------------------------------------- */
let currentMonthIndex = 0;
let activeFilter = "all";

/* --------------------------------------------------------------------
   DOM REFERENCES (populated in init)
   -------------------------------------------------------------------- */
let dom = {};

function cacheDom() {
  dom = {
    navToggle: document.getElementById("navToggle"),
    navLinks: document.getElementById("navLinks"),
    monthTabs: document.getElementById("monthTabs"),
    calendarGrid: document.getElementById("calendarGrid"),
    calendarLegend: document.getElementById("calendarLegend"),
    filterRow: document.getElementById("filterRow"),
    cardsGrid: document.getElementById("cardsGrid"),
    emptyState: document.getElementById("emptyState"),
    picksList: document.getElementById("picksList"),
    ideaForm: document.getElementById("ideaForm"),
    formSuccess: document.getElementById("formSuccess"),
    modalOverlay: document.getElementById("modalOverlay"),
    modalContent: document.getElementById("modalContent"),
    modalClose: document.getElementById("modalClose")
  };
}

/* --------------------------------------------------------------------
   HELPERS
   -------------------------------------------------------------------- */
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}

/* Parses a "YYYY-MM-DD" string using local date parts (avoids the
   timezone-shift bug that can happen with `new Date("YYYY-MM-DD")`). */
function parseISODate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDateLong(dateStr) {
  return parseISODate(dateStr).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  });
}

function toISODate(year, month0, day) {
  return `${year}-${String(month0 + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function chapterScore(ev) {
  return ev.sampleVotes.mustDo * 2 + ev.sampleVotes.interested;
}

/* --------------------------------------------------------------------
   NAVIGATION
   -------------------------------------------------------------------- */
function initNav() {
  dom.navToggle.addEventListener("click", () => {
    const isOpen = dom.navLinks.classList.toggle("is-open");
    dom.navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  dom.navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      dom.navLinks.classList.remove("is-open");
      dom.navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* --------------------------------------------------------------------
   CALENDAR
   -------------------------------------------------------------------- */
function renderMonthTabs() {
  dom.monthTabs.innerHTML = SEMESTER_MONTHS.map((m, i) => `
    <button class="month-tab ${i === currentMonthIndex ? "is-active" : ""}"
            data-index="${i}" role="tab" aria-selected="${i === currentMonthIndex}">
      ${m.shortLabel}
    </button>
  `).join("");
}

function buildCalendarCells(year, month0) {
  const startWeekday = new Date(year, month0, 1).getDay();
  const daysInMonth = new Date(year, month0 + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function eventsOnDate(year, month0, day) {
  const iso = toISODate(year, month0, day);
  return EVENTS.filter((ev) => ev.date === iso);
}

function renderCalendar(monthIndex) {
  const { year, month } = SEMESTER_MONTHS[monthIndex];
  const cells = buildCalendarCells(year, month);

  dom.calendarGrid.innerHTML = cells.map((day) => {
    if (day === null) return `<div class="cal-cell is-blank"></div>`;

    const dayEvents = eventsOnDate(year, month, day);
    const pills = dayEvents.map((ev) => `
      <button class="cal-pill" data-id="${ev.id}"
              style="background-color:${CATEGORIES[ev.category].color}"
              title="${escapeHtml(ev.name)}">
        <span>${CATEGORIES[ev.category].icon}</span>
        <span class="pill-label">${escapeHtml(ev.name)}</span>
      </button>
    `).join("");

    return `
      <div class="cal-cell ${dayEvents.length ? "has-events" : ""}">
        <span class="cal-daynum">${day}</span>
        ${pills}
      </div>
    `;
  }).join("");
}

function renderLegend() {
  dom.calendarLegend.innerHTML = Object.values(CATEGORIES).map((cat) => `
    <span class="legend-item">
      <span class="legend-dot" style="background-color:${cat.color}"></span>
      ${cat.icon} ${cat.label}
    </span>
  `).join("");
}

function initCalendarEvents() {
  dom.monthTabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".month-tab");
    if (!btn) return;
    currentMonthIndex = Number(btn.dataset.index);
    renderMonthTabs();
    renderCalendar(currentMonthIndex);
  });

  dom.calendarGrid.addEventListener("click", (e) => {
    const pill = e.target.closest(".cal-pill");
    if (!pill) return;
    openModal(pill.dataset.id);
  });
}

/* --------------------------------------------------------------------
   FILTERS + EVENT CARDS
   -------------------------------------------------------------------- */
function renderFilters() {
  dom.filterRow.innerHTML = FILTERS.map((f) => `
    <button class="filter-chip ${f.key === activeFilter ? "is-active" : ""}"
            data-key="${f.key}" role="tab" aria-selected="${f.key === activeFilter}">
      ${f.label}
    </button>
  `).join("");
}

function getFilteredEvents() {
  const sorted = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  return activeFilter === "all" ? sorted : sorted.filter((ev) => ev.category === activeFilter);
}

function cardTemplate(ev) {
  const cat = CATEGORIES[ev.category];
  const status = STATUSES[ev.status];
  const userVote = getUserVote(ev.id);

  return `
    <article class="event-card">
      <div class="card-top">
        <span class="card-category" style="background-color:${cat.color}">${cat.icon} ${cat.label}</span>
        <span class="status-badge status-${ev.status}">${status.label}</span>
      </div>

      <h3 class="card-title">${escapeHtml(ev.name)}</h3>

      <div class="card-meta">
        <span>📅 ${formatDateLong(ev.date)}</span>
        <span>🤝 Partner: ${escapeHtml(ev.partner)}</span>
      </div>

      <p class="card-desc">${escapeHtml(ev.description)}</p>

      <ul class="card-ideas">
        ${ev.ideas.slice(0, 3).map((i) => `<li>${escapeHtml(i)}</li>`).join("")}
      </ul>

      <div class="card-footer">
        <button class="vote-btn ${userVote === "interested" ? "is-active" : ""}" data-id="${ev.id}" data-vote="interested">👍 Interested</button>
        <button class="vote-btn ${userVote === "mustDo" ? "is-active" : ""}" data-id="${ev.id}" data-vote="mustDo">🔥 Must Do</button>
        <button class="card-details-btn" data-id="${ev.id}">View Details</button>
      </div>
    </article>
  `;
}

function renderCards() {
  const list = getFilteredEvents();
  dom.emptyState.hidden = list.length > 0;
  dom.cardsGrid.innerHTML = list.map(cardTemplate).join("");
}

function initFilterEvents() {
  dom.filterRow.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    activeFilter = chip.dataset.key;
    renderFilters();
    renderCards();
  });
}

function initCardEvents() {
  dom.cardsGrid.addEventListener("click", (e) => {
    const voteBtn = e.target.closest(".vote-btn");
    if (voteBtn) {
      setUserVote(voteBtn.dataset.id, voteBtn.dataset.vote);
      return;
    }
    const detailsBtn = e.target.closest(".card-details-btn");
    if (detailsBtn) {
      openModal(detailsBtn.dataset.id);
    }
  });
}

/* --------------------------------------------------------------------
   TOP CHAPTER PICKS
   -------------------------------------------------------------------- */
function renderTopPicks() {
  const ranked = [...EVENTS].sort((a, b) => chapterScore(b) - chapterScore(a));
  const maxScore = chapterScore(ranked[0]) || 1;

  const voteTagLabels = {
    interested: "👍 Interested",
    mustDo: "🔥 Must Do",
    notInterested: "😐 Not Interested"
  };

  dom.picksList.innerHTML = ranked.map((ev, i) => {
    const pct = Math.round((chapterScore(ev) / maxScore) * 100);
    const userVote = getUserVote(ev.id);

    return `
      <li class="pick-item">
        <span class="pick-rank">${i + 1}</span>
        <div class="pick-body">
          <div class="pick-top-row">
            <span class="pick-name">${CATEGORIES[ev.category].icon} ${escapeHtml(ev.name)}</span>
            <span class="pick-votes">
              <span>🔥 ${ev.sampleVotes.mustDo} Must Do</span>
              <span>👍 ${ev.sampleVotes.interested} Interested</span>
            </span>
          </div>
          <div class="pick-bar-track"><div class="pick-bar-fill" style="width:${pct}%"></div></div>
          ${userVote ? `<span class="pick-your-vote">Your vote: ${voteTagLabels[userVote]}</span>` : ""}
        </div>
      </li>
    `;
  }).join("");
}

/* --------------------------------------------------------------------
   EVENT DETAIL MODAL
   -------------------------------------------------------------------- */
function openModal(eventId) {
  const ev = EVENTS.find((e) => String(e.id) === String(eventId));
  if (!ev) return;

  const cat = CATEGORIES[ev.category];
  const status = STATUSES[ev.status];
  const userVote = getUserVote(ev.id);

  dom.modalContent.innerHTML = `
    <h3 class="modal-title" id="modalTitle">${escapeHtml(ev.name)}</h3>

    <div class="modal-badges">
      <span class="card-category" style="background-color:${cat.color}">${cat.icon} ${cat.label}</span>
      <span class="status-badge status-${ev.status}">${status.label}</span>
    </div>

    <div class="modal-meta">
      <div><strong>Date</strong>${formatDateLong(ev.date)}</div>
      <div><strong>Partner</strong>${escapeHtml(ev.partner)}</div>
      <div><strong>Est. Attendance</strong>${escapeHtml(ev.attendance)}</div>
      <div><strong>Est. Budget</strong>${escapeHtml(ev.budget)}</div>
    </div>

    <p class="modal-desc">${escapeHtml(ev.description)}</p>

    <ul class="modal-ideas">
      ${ev.ideas.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}
    </ul>

    <div class="modal-vote-row" data-event-id="${ev.id}">
      <button class="vote-btn ${userVote === "interested" ? "is-active" : ""}" data-id="${ev.id}" data-vote="interested">👍 Interested</button>
      <button class="vote-btn ${userVote === "mustDo" ? "is-active" : ""}" data-id="${ev.id}" data-vote="mustDo">🔥 Must Do</button>
      <button class="vote-btn ${userVote === "notInterested" ? "is-active" : ""}" data-id="${ev.id}" data-vote="notInterested">😐 Not Interested</button>
    </div>
  `;

  dom.modalOverlay.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  dom.modalOverlay.hidden = true;
  document.body.style.overflow = "";
}

/* If the modal is open for the event that was just voted on, refresh it
   so its vote buttons reflect the new state. */
function refreshOpenModal(eventId) {
  if (dom.modalOverlay.hidden) return;
  const row = dom.modalContent.querySelector(".modal-vote-row");
  if (row && row.dataset.eventId === String(eventId)) {
    openModal(eventId);
  }
}

function initModalEvents() {
  dom.modalClose.addEventListener("click", closeModal);

  dom.modalOverlay.addEventListener("click", (e) => {
    if (e.target === dom.modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !dom.modalOverlay.hidden) closeModal();
  });

  dom.modalContent.addEventListener("click", (e) => {
    const voteBtn = e.target.closest(".vote-btn");
    if (voteBtn) setUserVote(voteBtn.dataset.id, voteBtn.dataset.vote);
  });
}

/* --------------------------------------------------------------------
   SUBMIT AN IDEA
   -------------------------------------------------------------------- */
function handleFormSubmit(e) {
  e.preventDefault();
  const form = dom.ideaForm;

  // Looked up by id (rather than the form's named-property shorthand, e.g.
  // form.eventName) for the widest possible browser/tooling compatibility.
  const field = (id) => document.getElementById(id);

  const data = {
    id: Date.now(),
    submittedAt: new Date().toISOString(),
    eventName: field("eventName").value.trim(),
    eventType: field("eventType").value,
    suggestedDate: field("suggestedDate").value,
    partner: field("partner").value.trim(),
    theme: field("theme").value.trim(),
    attendance: field("attendance").value.trim(),
    budget: field("budget").value,
    locationType: field("locationType").value,
    description: field("description").value.trim(),
    additionalIdeas: field("additionalIdeas").value.trim()
  };

  if (!data.eventName || !data.eventType) {
    form.reportValidity();
    return;
  }

  /* ----------------------------------------------------------------
     FUTURE INTEGRATION — GOOGLE FORMS / GOOGLE SHEETS
     Right now, submissions are only saved to this browser's
     localStorage (see saveSubmissions() above). To send them
     somewhere the whole chapter can see, uncomment ONE of the two
     options below (and remove the localStorage lines if you no
     longer want a local copy too).

     OPTION A — Google Forms
     (replace YOUR_FORM_ID and each entry.NNNNNNNNN with the real
     field IDs from "Get pre-filled link" on your Google Form):

       fetch("https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse", {
         method: "POST",
         mode: "no-cors",
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
         body: new URLSearchParams({
           "entry.111111111": data.eventName,
           "entry.222222222": data.eventType,
           "entry.333333333": data.suggestedDate,
           "entry.444444444": data.partner,
           "entry.555555555": data.theme,
           "entry.666666666": data.attendance,
           "entry.777777777": data.budget,
           "entry.888888888": data.locationType,
           "entry.999999999": data.description,
           "entry.101010101": data.additionalIdeas
         })
       });

     OPTION B — Google Sheets via an Apps Script Web App
     (deploy a script bound to your Sheet as a Web App, then POST here):

       fetch("https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data)
       });
  ---------------------------------------------------------------- */

  const submissions = loadSubmissions();
  submissions.push(data);
  saveSubmissions(submissions);

  form.reset();
  dom.formSuccess.hidden = false;
  dom.formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });

  window.clearTimeout(handleFormSubmit._hideTimer);
  handleFormSubmit._hideTimer = window.setTimeout(() => {
    dom.formSuccess.hidden = true;
  }, 7000);
}

function initFormEvents() {
  dom.ideaForm.addEventListener("submit", handleFormSubmit);
}

/* --------------------------------------------------------------------
   INIT
   -------------------------------------------------------------------- */
function init() {
  cacheDom();

  renderMonthTabs();
  renderCalendar(currentMonthIndex);
  renderLegend();
  renderFilters();
  renderCards();
  renderTopPicks();

  initNav();
  initCalendarEvents();
  initFilterEvents();
  initCardEvents();
  initModalEvents();
  initFormEvents();
}

document.addEventListener("DOMContentLoaded", init);
