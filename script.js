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

   Vote counts (Must Do / Interested) are NOT stored here — they live in
   Firestore and are shared live across the whole chapter. See the VOTING
   section further down.
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
    description: "Tailgate this Saturday from 12–5 PM, then head over to the CSU football game together. Grill out, music, and yard games, with a possible joint fraternity/sorority turnout.",
    ideas: [
      "Tailgate 12–5 PM, then walk over to the CSU football game",
      "Grill and cook out",
      "Live or DJ music",
      "Yard games (cornhole, spikeball)",
      "Open it up as a joint tailgate"
    ],
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
  },

  /* ---- Fall 2026 Rush / Recruitment week ---- */
  {
    id: 12,
    name: "Meet the Brothers",
    date: "2026-09-09",
    category: "rush",
    status: "confirmed",
    partner: "Open to potential new members",
    attendance: "PNMs + brothers",
    budget: "$",
    description: "Rush kickoff — come by from 7–9 PM to meet the brothers, hang out, and hear about the chapter. Casual, no pressure.",
    ideas: [
      "7–9 PM",
      "Casual hangout — food and drinks provided",
      "Brothers on hand to answer questions",
      "Bring a friend who might be interested"
    ],
  },
  {
    id: 13,
    name: "ASig Cookout",
    date: "2026-09-13",
    category: "rush",
    status: "confirmed",
    partner: "Open to potential new members",
    attendance: "PNMs + brothers",
    budget: "$$",
    description: "Rush cookout — burgers, dogs, and yard games with the chapter. Come eat and get to know everyone.",
    ideas: [
      "Grill out",
      "Yard games (cornhole, spikeball)",
      "Music",
      "Great one to bring friends to"
    ],
  },
  {
    id: 14,
    name: "Field Day",
    date: "2026-09-16",
    category: "rush",
    status: "confirmed",
    partner: "Open to potential new members",
    attendance: "PNMs + brothers",
    budget: "$",
    description: "Rush field day at the CSU IM Fields from 5–8 PM — pickup games and team competitions with the brothers.",
    ideas: [
      "5–8 PM at the CSU IM Fields",
      "Flag football, soccer, ultimate",
      "Team competitions",
      "Wear athletic clothes"
    ],
  },
  {
    id: 15,
    name: "Steaks, Stogies & Poker",
    date: "2026-09-20",
    category: "rush",
    status: "confirmed",
    partner: "Open to potential new members",
    attendance: "PNMs + brothers",
    budget: "$$$",
    description: "Rush event — grilled steaks, cigars, and a casual poker night with the chapter.",
    ideas: [
      "Steak dinner",
      "Cigars",
      "Low-stakes / for-fun poker tables",
      "Dress a little nicer"
    ],
  },
  {
    id: 16,
    name: "Invite-Only Dinner",
    date: "2026-09-23",
    category: "rush",
    status: "planned",
    partner: "Invited PNMs only",
    attendance: "Invited PNMs + brothers",
    budget: "$$$",
    description: "Closing rush event — a sit-down dinner for invited potential new members. Details still being finalized.",
    ideas: [
      "Invite only",
      "Sit-down dinner",
      "Time and venue TBD",
      "Bids / next steps discussed after"
    ],
  },

  /* ---- Joint events with Phi Kappa Theta (ASig x Phi Kap) ---- */
  {
    id: 17,
    name: "Joint Tailgate — ASig x Phi Kap",
    date: "2026-09-19",
    category: "tailgate",
    status: "planned",
    partner: "Phi Kappa Theta",
    attendance: "100-180",
    budget: "$$",
    description: "Joint tailgate with Phi Kappa Theta — targeting roughly two weeks out, date to be matched to a CSU home game. Combine both chapters for a bigger cookout and turnout.",
    ideas: [
      "Target ~2 weeks out — align to a CSU home game",
      "Split grill / supplies with Phi Kap",
      "Shared yard games and music",
      "Lock the date with Phi Kap's social chair"
    ],
  },
  {
    id: 18,
    name: "Joint Party — ASig x Phi Kap",
    date: "2026-10-24",
    category: "party",
    status: "idea",
    partner: "Phi Kappa Theta",
    attendance: "120-200",
    budget: "$$$",
    description: "A joint party with Phi Kappa Theta later in the semester — bigger venue, shared cost, theme still open.",
    ideas: [
      "Later in the semester (date flexible)",
      "Bigger off-campus venue",
      "Split cost and guest list with Phi Kap",
      "Theme TBD — could tie into a calendar theme vote"
    ]
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
  sports:       { label: "Sports",           icon: "🏀", color: "var(--cat-sports)" },
  rush:         { label: "Rush",             icon: "⭐", color: "var(--cat-rush)" },
  other:        { label: "Other",            icon: "✨", color: "var(--cat-other)" }
};

/* Maps the Submit form's "Event Type" select values to CATEGORIES keys.
   Most are 1:1; "formal" folds into the existing Date/Formal category. */
const EVENT_TYPE_TO_CATEGORY = {
  tailgate: "tailgate",
  social: "social",
  party: "party",
  brotherhood: "brotherhood",
  date: "date",
  formal: "date",
  philanthropy: "philanthropy",
  sports: "sports",
  other: "other"
};

const LOCATION_TYPE_LABELS = {
  "chapter-house": "Chapter House",
  "off-campus-venue": "Off-Campus Venue",
  outdoor: "Outdoor / Park",
  campus: "On Campus",
  tbd: "TBD"
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
  { key: "sports",       label: "Sports" },
  { key: "rush",         label: "Rush" },
  { key: "other",        label: "Other" }
];

/* Months shown in the semester calendar (JS months are 0-indexed). */
const SEMESTER_MONTHS = [
  { year: 2026, month: 8,  label: "September 2026", shortLabel: "Sept" },
  { year: 2026, month: 9,  label: "October 2026",   shortLabel: "Oct" },
  { year: 2026, month: 10, label: "November 2026",  shortLabel: "Nov" },
  { year: 2026, month: 11, label: "December 2026",  shortLabel: "Dec" }
];

/* --------------------------------------------------------------------
   VOTING (Firestore — shared live with the whole chapter)
   --------------------------------------------------------------------
   Every vote (event Interested/Must Do/Not Interested, and theme-poll
   picks) is one document in Firestore, keyed by "<eventId or pollId>__
   <voterId>" so re-voting overwrites your own prior vote instead of
   adding a duplicate. voterId is a random id generated once per browser
   (see getVoterId) — there's no login system, so it's the only way to
   tell "your" vote apart from everyone else's; someone could clear their
   browser data and vote again, same trust level as the rest of this
   site. Every visitor holds one live listener on each collection and
   recomputes counts client-side — plenty cheap at chapter scale.
   -------------------------------------------------------------------- */
const STORAGE_KEYS = {
  VOTER_ID: "asf_voter_id"
};

function getVoterId() {
  try {
    let id = localStorage.getItem(STORAGE_KEYS.VOTER_ID);
    if (!id) {
      id = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
      localStorage.setItem(STORAGE_KEYS.VOTER_ID, id);
    }
    return id;
  } catch (err) {
    console.warn("Could not access localStorage for voter id:", err);
    return `anon-${Math.random().toString(36).slice(2)}`;
  }
}

let voteCounts = {};   // eventId (string) -> { mustDo, interested, notInterested }
let myVotes = {};      // eventId (string) -> vote type

function getVoteCounts(ev) {
  return voteCounts[String(ev.id)] || { mustDo: 0, interested: 0, notInterested: 0 };
}

function getUserVote(eventId) {
  return myVotes[String(eventId)] || null;
}

/* Clicking the same vote again removes it (un-vote). Updates local state
   immediately so the UI feels instant; the live listener reconciles
   moments later once Firestore confirms the write. */
function setUserVote(eventId, type) {
  if (typeof db === "undefined") return;
  const key = String(eventId);
  const voterId = getVoterId();
  const ref = db.collection("votes").doc(`${key}__${voterId}`);

  if (myVotes[key] === type) {
    delete myVotes[key];
    ref.delete().catch((err) => console.warn("Could not remove vote:", err));
  } else {
    myVotes[key] = type;
    ref.set({ eventId: key, voterId, type }).catch((err) => console.warn("Could not save vote:", err));
  }
  renderCards();
  renderTopPicks();
  refreshOpenModal(eventId);
}

function initVotes() {
  if (typeof db === "undefined") {
    console.warn("Firestore not configured — see firebase-config.js. Voting is disabled.");
    return;
  }
  const voterId = getVoterId();
  db.collection("votes").onSnapshot(
    (snapshot) => {
      const counts = {};
      const mine = {};
      snapshot.forEach((doc) => {
        const { eventId, voterId: vId, type } = doc.data();
        if (!eventId || !type) return;
        counts[eventId] = counts[eventId] || { mustDo: 0, interested: 0, notInterested: 0 };
        counts[eventId][type] = (counts[eventId][type] || 0) + 1;
        if (vId === voterId) mine[eventId] = type;
      });
      voteCounts = counts;
      myVotes = mine;
      renderCards();
      renderTopPicks();
      refreshOpenModalVotes();
    },
    (err) => console.warn("Could not load votes:", err)
  );
}

/* --------------------------------------------------------------------
   THEME POLLS (calendar day theme voting)
   --------------------------------------------------------------------
   Some calendar days are NOT a set event yet — they're an open slot
   with a few theme ideas the chapter votes between. Each poll below
   shows up on its date as a "Vote on the theme" button instead of a
   solid event pill, so nothing looks locked in before people weigh in.

   Fields per poll:
     id      unique string
     date    "YYYY-MM-DD" (same Sept–Dec 2026 calendar window)
     label   short title shown at the top of the vote box
     note    optional one-liner under the title
     options array of { id, label, blurb }

   Vote counts per option are live from Firestore (see the VOTING
   section above) — not stored on the poll itself.
   -------------------------------------------------------------------- */
const THEME_POLLS = [
  {
    id: "theme-2026-09-19",
    date: "2026-09-19",
    label: "Sept 19 Social — pick the theme",
    note: "Open slot with a sorority TBD. Vote for what sounds most fun.",
    options: [
      { id: "western",     label: "Western Night",     blurb: "Boots, hats, country music" },
      { id: "highlighter", label: "Highlighter Party", blurb: "White tees + markers, blacklights" },
      { id: "jersey",      label: "Jersey Night",      blurb: "Rep your favorite team" },
      { id: "toga",        label: "Toga Night",        blurb: "Classic sheets-and-laurels" }
    ]
  },
  {
    id: "theme-2026-10-17",
    date: "2026-10-17",
    label: "Oct 17 Social — pick the theme",
    note: "Nothing locked in yet — vote on the vibe.",
    options: [
      { id: "blackout",     label: "Blackout / Neon",     blurb: "All black + blacklights & glow sticks" },
      { id: "adam-sandler", label: "Adam Sandler Night",  blurb: "Cargo shorts, baggy jerseys, hoops" },
      { id: "camo",         label: "Camo & Cowboys",      blurb: "Camo meets western" },
      { id: "decades",      label: "Decades (80s/90s)",   blurb: "Pick a decade and commit" }
    ]
  },
  {
    id: "theme-2026-12-05",
    date: "2026-12-05",
    label: "Dec 5 Holiday Social — pick the theme",
    note: "End-of-semester social. Vote for the theme.",
    options: [
      { id: "ugly-sweater", label: "Ugly Sweater",       blurb: "Tackiest sweater wins a prize" },
      { id: "santa",        label: "Santa's Workshop",   blurb: "Red & green, Santa hats" },
      { id: "winter",       label: "Winter Wonderland",  blurb: "Dress up, white & silver" }
    ]
  }
];

function getThemePoll(pollId) {
  return THEME_POLLS.find((p) => p.id === pollId) || null;
}

function themePollForDate(isoDate) {
  return THEME_POLLS.find((p) => p.date === isoDate) || null;
}

let themeVoteCounts = {}; // pollId -> { optionId: count }
let myThemeVotes = {};    // pollId -> optionId

function getThemeVote(pollId) {
  return myThemeVotes[pollId] || null;
}

/* Clicking your current pick again clears it (un-vote). */
function setThemeVote(pollId, optionId) {
  if (typeof db === "undefined") return;
  const voterId = getVoterId();
  const ref = db.collection("themeVotes").doc(`${pollId}__${voterId}`);

  if (myThemeVotes[pollId] === optionId) {
    delete myThemeVotes[pollId];
    ref.delete().catch((err) => console.warn("Could not remove theme vote:", err));
  } else {
    myThemeVotes[pollId] = optionId;
    ref.set({ pollId, voterId, optionId }).catch((err) => console.warn("Could not save theme vote:", err));
  }
  renderCalendar(currentMonthIndex);
  refreshOpenThemePoll(pollId);
}

function initThemeVotes() {
  if (typeof db === "undefined") return;
  const voterId = getVoterId();
  db.collection("themeVotes").onSnapshot(
    (snapshot) => {
      const counts = {};
      const mine = {};
      snapshot.forEach((doc) => {
        const { pollId, voterId: vId, optionId } = doc.data();
        if (!pollId || !optionId) return;
        counts[pollId] = counts[pollId] || {};
        counts[pollId][optionId] = (counts[pollId][optionId] || 0) + 1;
        if (vId === voterId) mine[pollId] = optionId;
      });
      themeVoteCounts = counts;
      myThemeVotes = mine;
      renderCalendar(currentMonthIndex);
      refreshOpenThemePollAny();
    },
    (err) => console.warn("Could not load theme votes:", err)
  );
}

function themeOptionCount(poll, optionId) {
  return (themeVoteCounts[poll.id] && themeVoteCounts[poll.id][optionId]) || 0;
}

function themeLeaderId(poll) {
  let leader = null;
  let best = -1;
  poll.options.forEach((opt) => {
    const c = themeOptionCount(poll, opt.id);
    if (c > best) { best = c; leader = opt.id; }
  });
  return leader;
}

/* --------------------------------------------------------------------
   MEMBER-SUBMITTED EVENTS (Firestore — shared with the whole chapter)
   --------------------------------------------------------------------
   Unlike votes (which stay local to each browser), submitted events are
   written to the "submissions" Firestore collection via firebase-config.js
   and read back here in real time, so every visitor sees them — not just
   the person who submitted. See README.md for the one-time Firebase setup
   and the Firestore security rules to paste in.
   -------------------------------------------------------------------- */
let memberEvents = [];

/* Converts a Firestore submission doc into the same shape as an EVENTS
   entry so it can reuse the calendar/card/modal/voting rendering code. */
function submissionToEvent(id, data) {
  const ideas = [];
  if (data.theme) ideas.push(`Theme: ${data.theme}`);
  if (data.locationType) ideas.push(`Location: ${LOCATION_TYPE_LABELS[data.locationType] || data.locationType}`);
  if (data.additionalIdeas) ideas.push(data.additionalIdeas);
  if (!ideas.length) ideas.push("No extra details provided yet.");

  return {
    id,
    name: data.eventName || "Untitled Idea",
    date: data.suggestedDate || "",
    category: EVENT_TYPE_TO_CATEGORY[data.eventType] || "other",
    status: data.status && STATUSES[data.status] ? data.status : "idea",
    partner: data.partner || "TBD",
    attendance: data.attendance || "TBD",
    budget: data.budget || "",
    description: data.description || "Submitted by a chapter member.",
    ideas,
    isMemberSubmitted: true
  };
}

/* --------------------------------------------------------------------
   MANAGE SUBMISSIONS (promote to the calendar, or delete)
   --------------------------------------------------------------------
   No login system on this site, so these are open to any visitor —
   not restricted to chapter officers. See README.md.
   -------------------------------------------------------------------- */
function updateSubmissionStatus(id, status) {
  if (typeof db === "undefined") return;
  db.collection("submissions").doc(String(id)).update({ status })
    .catch((err) => console.warn("Could not update submission status:", err));
}

function deleteSubmission(id) {
  if (typeof db === "undefined") return;
  if (!confirm("Delete this submitted idea? This can't be undone.")) return;
  db.collection("submissions").doc(String(id)).delete()
    .then(() => {
      const row = dom.modalContent.querySelector(".modal-vote-row");
      if (!dom.modalOverlay.hidden && row && row.dataset.eventId === String(id)) closeModal();
    })
    .catch((err) => console.warn("Could not delete submission:", err));
}

function initMemberEvents() {
  if (typeof db === "undefined") {
    console.warn("Firestore not configured — see firebase-config.js. Member submissions are disabled.");
    return;
  }
  db.collection("submissions").orderBy("submittedAt", "desc").onSnapshot(
    (snapshot) => {
      memberEvents = snapshot.docs.map((doc) => submissionToEvent(doc.id, doc.data()));
      renderCalendar(currentMonthIndex);
      renderCards();
      renderTopPicks();
    },
    (err) => console.warn("Could not load member-submitted events:", err)
  );
}

/* Curated EVENTS plus live member submissions — every render function
   below reads from this instead of EVENTS directly. */
function getAllEvents() {
  return [...EVENTS, ...memberEvents];
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
    formError: document.getElementById("formError"),
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
  if (!dateStr) return "Date TBD";
  return parseISODate(dateStr).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  });
}

function toISODate(year, month0, day) {
  return `${year}-${String(month0 + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function chapterScore(ev) {
  const counts = getVoteCounts(ev);
  return counts.mustDo * 2 + counts.interested;
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
  return getAllEvents().filter((ev) => ev.date === iso);
}

function renderCalendar(monthIndex) {
  const { year, month } = SEMESTER_MONTHS[monthIndex];
  const cells = buildCalendarCells(year, month);

  dom.calendarGrid.innerHTML = cells.map((day) => {
    if (day === null) return `<div class="cal-cell is-blank"></div>`;

    const iso = toISODate(year, month, day);

    // Only confirmed/planned events render as a solid pill — an "idea" or
    // "voting" event isn't shown on the calendar as if it were locked in.
    const dayEvents = eventsOnDate(year, month, day)
      .filter((ev) => ev.status === "confirmed" || ev.status === "planned");

    const pills = dayEvents.map((ev) => `
      <button class="cal-pill" data-id="${ev.id}"
              style="background-color:${CATEGORIES[ev.category].color}"
              title="${escapeHtml(ev.name)}">
        <span>${CATEGORIES[ev.category].icon}</span>
        <span class="pill-label">${escapeHtml(ev.name)}</span>
      </button>
    `).join("");

    // Open slot with theme ideas to vote between.
    const poll = themePollForDate(iso);
    let voteBtn = "";
    if (poll) {
      const myPick = getThemeVote(poll.id);
      const picked = poll.options.find((o) => o.id === myPick);
      voteBtn = `
        <button class="cal-themevote ${picked ? "has-pick" : ""}" data-poll="${poll.id}"
                title="Vote on the theme for this day">
          🗳 <span class="cal-themevote-label">${picked ? "Theme: " + escapeHtml(picked.label) : "Vote on theme"}</span>
        </button>
      `;
    }

    const hasContent = dayEvents.length || poll;
    return `
      <div class="cal-cell ${hasContent ? "has-events" : ""}">
        <span class="cal-daynum">${day}</span>
        ${voteBtn}
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
    const voteBtn = e.target.closest(".cal-themevote");
    if (voteBtn) {
      openThemePoll(voteBtn.dataset.poll);
      return;
    }
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
  const sorted = [...getAllEvents()].sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"));
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

      ${ev.isMemberSubmitted ? `<span class="card-member-badge">🙋 Submitted by a member</span>` : ""}

      <div class="card-meta">
        <span>📅 ${formatDateLong(ev.date)}</span>
        <span>🤝 Partner: ${escapeHtml(ev.partner || "TBD")}</span>
      </div>

      <p class="card-desc">${escapeHtml(ev.description)}</p>

      <ul class="card-ideas">
        ${ev.ideas.slice(0, 3).map((i) => `<li>${escapeHtml(i)}</li>`).join("")}
      </ul>

      ${ev.isMemberSubmitted ? manageRowTemplate(ev) : ""}

      <div class="card-footer">
        <button class="vote-btn ${userVote === "interested" ? "is-active" : ""}" data-id="${ev.id}" data-vote="interested">👍 Interested</button>
        <button class="vote-btn ${userVote === "mustDo" ? "is-active" : ""}" data-id="${ev.id}" data-vote="mustDo">🔥 Must Do</button>
        <button class="card-details-btn" data-id="${ev.id}">View Details</button>
      </div>
    </article>
  `;
}

/* Anyone can promote a submitted idea onto the real calendar (by changing
   its status) or delete it — there's no login system on this site, so
   this is open to any visitor, not just chapter officers. */
function manageRowTemplate(ev) {
  return `
    <div class="manage-row">
      <label class="manage-status">
        Status
        <select data-manage-status="${ev.id}">
          ${Object.entries(STATUSES).map(([key, s]) => `
            <option value="${key}" ${ev.status === key ? "selected" : ""}>${s.label}</option>
          `).join("")}
        </select>
      </label>
      <button class="manage-delete-btn" data-manage-delete="${ev.id}">🗑 Delete</button>
    </div>
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
    const deleteBtn = e.target.closest("[data-manage-delete]");
    if (deleteBtn) {
      deleteSubmission(deleteBtn.dataset.manageDelete);
      return;
    }
    const detailsBtn = e.target.closest(".card-details-btn");
    if (detailsBtn) {
      openModal(detailsBtn.dataset.id);
    }
  });

  dom.cardsGrid.addEventListener("change", (e) => {
    const statusSelect = e.target.closest("[data-manage-status]");
    if (statusSelect) {
      updateSubmissionStatus(statusSelect.dataset.manageStatus, statusSelect.value);
    }
  });
}

/* --------------------------------------------------------------------
   TOP CHAPTER PICKS
   -------------------------------------------------------------------- */
function renderTopPicks() {
  const ranked = [...getAllEvents()].sort((a, b) => chapterScore(b) - chapterScore(a));
  const maxScore = chapterScore(ranked[0]) || 1;

  const voteTagLabels = {
    interested: "👍 Interested",
    mustDo: "🔥 Must Do",
    notInterested: "😐 Not Interested"
  };

  dom.picksList.innerHTML = ranked.map((ev, i) => {
    const pct = Math.round((chapterScore(ev) / maxScore) * 100);
    const userVote = getUserVote(ev.id);
    const counts = getVoteCounts(ev);

    return `
      <li class="pick-item">
        <span class="pick-rank">${i + 1}</span>
        <div class="pick-body">
          <div class="pick-top-row">
            <span class="pick-name">${CATEGORIES[ev.category].icon} ${escapeHtml(ev.name)}</span>
            <span class="pick-votes">
              <span>🔥 ${counts.mustDo} Must Do</span>
              <span>👍 ${counts.interested} Interested</span>
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
  const ev = getAllEvents().find((e) => String(e.id) === String(eventId));
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

    ${ev.isMemberSubmitted ? `<span class="card-member-badge">🙋 Submitted by a member</span>` : ""}

    <div class="modal-meta">
      <div><strong>Date</strong>${formatDateLong(ev.date)}</div>
      <div><strong>Partner</strong>${escapeHtml(ev.partner || "TBD")}</div>
      <div><strong>Est. Attendance</strong>${escapeHtml(ev.attendance || "TBD")}</div>
      <div><strong>Est. Budget</strong>${escapeHtml(ev.budget || "Not sure yet")}</div>
    </div>

    <p class="modal-desc">${escapeHtml(ev.description)}</p>

    <ul class="modal-ideas">
      ${ev.ideas.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}
    </ul>

    ${ev.isMemberSubmitted ? manageRowTemplate(ev) : ""}

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

/* Same as refreshOpenModal, but for the votes listener, which doesn't know
   which specific event just changed — could be anyone's vote on any event. */
function refreshOpenModalVotes() {
  if (dom.modalOverlay.hidden) return;
  const row = dom.modalContent.querySelector(".modal-vote-row");
  if (row) openModal(row.dataset.eventId);
}

/* --------------------------------------------------------------------
   THEME POLL MODAL
   -------------------------------------------------------------------- */
function openThemePoll(pollId) {
  const poll = getThemePoll(pollId);
  if (!poll) return;

  const myPick = getThemeVote(poll.id);
  const leaderId = themeLeaderId(poll);

  const optionsHtml = poll.options.map((opt) => {
    const count = themeOptionCount(poll, opt.id);
    const isMine = myPick === opt.id;
    const isLeader = leaderId === opt.id;
    return `
      <button class="theme-opt ${isMine ? "is-picked" : ""}" data-poll="${poll.id}" data-option="${opt.id}">
        <span class="theme-opt-main">
          <span class="theme-opt-label">${escapeHtml(opt.label)}${isLeader ? ` <span class="theme-opt-lead">Leading</span>` : ""}</span>
          <span class="theme-opt-blurb">${escapeHtml(opt.blurb)}</span>
        </span>
        <span class="theme-opt-count">${count}<small>votes</small></span>
      </button>
    `;
  }).join("");

  dom.modalContent.innerHTML = `
    <h3 class="modal-title" id="modalTitle">${escapeHtml(poll.label)}</h3>

    <div class="modal-badges">
      <span class="card-category" style="background-color:var(--cat-rush)">🗳 Theme Vote</span>
      <span class="status-badge status-voting">${formatDateLong(poll.date)}</span>
    </div>

    ${poll.note ? `<p class="modal-desc">${escapeHtml(poll.note)}</p>` : ""}

    <div class="theme-opts" data-poll-id="${poll.id}">
      ${optionsHtml}
    </div>

    <p class="picks-note" style="margin-top:14px;">
      Tap an option to cast your vote (tap again to undo). Counts are live and
      shared across the whole chapter.
    </p>
  `;

  dom.modalOverlay.hidden = false;
  document.body.style.overflow = "hidden";
}

/* If the theme poll modal is open for the poll just voted on, re-render it. */
function refreshOpenThemePoll(pollId) {
  if (dom.modalOverlay.hidden) return;
  const box = dom.modalContent.querySelector(".theme-opts");
  if (box && box.dataset.pollId === pollId) {
    openThemePoll(pollId);
  }
}

/* Same as refreshOpenThemePoll, but for the theme-votes listener, which
   doesn't know which specific poll just changed. */
function refreshOpenThemePollAny() {
  if (dom.modalOverlay.hidden) return;
  const box = dom.modalContent.querySelector(".theme-opts");
  if (box) openThemePoll(box.dataset.pollId);
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
    if (voteBtn) {
      setUserVote(voteBtn.dataset.id, voteBtn.dataset.vote);
      return;
    }
    const themeOpt = e.target.closest(".theme-opt");
    if (themeOpt) {
      setThemeVote(themeOpt.dataset.poll, themeOpt.dataset.option);
      return;
    }
    const deleteBtn = e.target.closest("[data-manage-delete]");
    if (deleteBtn) {
      deleteSubmission(deleteBtn.dataset.manageDelete);
    }
  });

  dom.modalContent.addEventListener("change", (e) => {
    const statusSelect = e.target.closest("[data-manage-status]");
    if (statusSelect) {
      updateSubmissionStatus(statusSelect.dataset.manageStatus, statusSelect.value);
    }
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

  if (typeof db === "undefined") {
    dom.formSuccess.hidden = true;
    dom.formError.hidden = false;
    console.warn("Firestore not configured — see firebase-config.js.");
    return;
  }

  data.submittedAt = firebase.firestore.FieldValue.serverTimestamp();

  const submitBtn = form.querySelector(".btn-submit");
  submitBtn.disabled = true;
  dom.formError.hidden = true;

  // Firestore treats a bad/unreachable project as a transient error and
  // retries quietly rather than rejecting right away, which would otherwise
  // leave the button stuck on "disabled" forever with no feedback. This
  // timeout guarantees the form always resolves one way or the other.
  const timeout = new Promise((_, reject) =>
    window.setTimeout(() => reject(new Error("Timed out saving to Firestore")), 10000)
  );

  Promise.race([db.collection("submissions").add(data), timeout])
    .then(() => {
      form.reset();
      dom.formSuccess.hidden = false;
      dom.formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });

      window.clearTimeout(handleFormSubmit._hideTimer);
      handleFormSubmit._hideTimer = window.setTimeout(() => {
        dom.formSuccess.hidden = true;
      }, 7000);
    })
    .catch((err) => {
      console.warn("Could not save submission to Firestore:", err);
      dom.formError.hidden = false;
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
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
  initMemberEvents();
  initVotes();
  initThemeVotes();
}

document.addEventListener("DOMContentLoaded", init);
