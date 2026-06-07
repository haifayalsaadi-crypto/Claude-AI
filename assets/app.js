/* ===== Procurement Governance Platform — prototype interactions ===== */
(function () {
  "use strict";

  const SAMPLES = {
    it:    { name: "Managed IT Services RFP",        score: 58, from: 58, to: 86 },
    cyber: { name: "Cybersecurity Operations SOW",   score: 61, from: 61, to: 88 },
    cloud: { name: "Cloud Platform Technical Spec",  score: 54, from: 54, to: 84 }
  };

  const CATEGORIES = [
    { name: "Duplicated scope items",        count: 6, sev: "high", ico: "⧉" },
    { name: "Overlap with previous docs",    count: 2, sev: "high", ico: "≈" },
    { name: "Weak requirements",             count: 5, sev: "high", ico: "▤" },
    { name: "Vague / unclear wording",       count: 4, sev: "medium", ico: "✎" },
    { name: "Unnecessary activities",        count: 3, sev: "medium", ico: "⊘" },
    { name: "Missing requirements",          count: 3, sev: "high", ico: "＋" },
    { name: "Missing deliverables",          count: 2, sev: "medium", ico: "▣" },
    { name: "Missing KPIs",                  count: 3, sev: "high", ico: "📈" },
    { name: "Missing SLAs",                  count: 2, sev: "high", ico: "⏱" },
    { name: "Missing acceptance criteria",   count: 1, sev: "medium", ico: "✓" },
    { name: "Governance gaps",               count: 3, sev: "medium", ico: "⚖" },
    { name: "Cost optimisation",             count: 5, sev: "low", ico: "₵" }
  ];

  const FINDINGS = [
    { sev: "high", cat: "Missing SLA", loc: "Section 6.2 — Service Levels",
      title: "No service level agreement defined for incident response",
      desc: "The document requires the supplier to 'respond promptly to incidents' but defines no measurable response or resolution times, severity tiers, or service credits.",
      rec: "Add tiered SLAs (e.g. P1 response ≤ 15 min, resolution ≤ 4 h) with measurement method and service credits for breaches." },
    { sev: "high", cat: "Duplicated scope", loc: "Sections 4.1 & 4.6",
      title: "Backup and disaster-recovery scope is specified twice",
      desc: "Near-identical backup and DR responsibilities appear in both the infrastructure and operations sections, creating ambiguity over ownership and risk of double-charging.",
      rec: "Consolidate into a single Disaster Recovery scope item and cross-reference, removing the duplicate in 4.6." },
    { sev: "high", cat: "Missing KPI", loc: "Section 5 — Performance",
      title: "No KPIs for system availability or service quality",
      desc: "The scope describes the service but sets no measurable performance targets, making objective supplier accountability impossible.",
      rec: "Define KPIs such as ≥ 99.9% monthly availability, ≤ 2% change failure rate, and ≥ 95% CSAT, each with a reporting cadence." },
    { sev: "high", cat: "Overlap (previous docs)", loc: "Section 4.3",
      title: "Network monitoring overlaps with Framework Agreement FA-2024-019",
      desc: "The network monitoring scope substantially overlaps with services already contracted under an existing framework agreement.",
      rec: "Reuse the existing framework where possible and narrow this scope to avoid duplicate procurement and spend." },
    { sev: "high", cat: "Weak requirement", loc: "Section 4.4",
      title: "'Provide adequate security' is not enforceable",
      desc: "The requirement is subjective and cannot be evaluated or tested at acceptance.",
      rec: "Replace with specific, testable controls (e.g. alignment to a named security standard, MFA, encryption at rest and in transit)." },
    { sev: "medium", cat: "Vague wording", loc: "Section 3.2",
      title: "Undefined term 'business hours'",
      desc: "'Support during business hours' is used without defining the hours, time zone, or public-holiday treatment.",
      rec: "Specify exact coverage windows, time zone and holiday handling to prevent disputes." },
    { sev: "medium", cat: "Missing deliverable", loc: "Section 7 — Transition",
      title: "No transition-out / exit deliverables",
      desc: "The document covers onboarding but omits exit and knowledge-transfer deliverables at contract end.",
      rec: "Add an exit plan, data return/destruction, and knowledge-transfer deliverables with timelines." },
    { sev: "medium", cat: "Governance gap", loc: "Section 8 — Governance",
      title: "No defined governance forum or reporting cadence",
      desc: "Roles, escalation paths and review meetings are not specified, weakening oversight of supplier performance.",
      rec: "Define a governance structure with monthly service reviews, escalation matrix and named accountable roles." },
    { sev: "medium", cat: "Unnecessary activity", loc: "Section 4.7",
      title: "Weekly on-site presence not justified by scope",
      desc: "A mandatory weekly on-site requirement adds cost without a clear operational need for a largely remote service.",
      rec: "Make on-site attendance event-driven rather than fixed weekly, reducing cost." },
    { sev: "low", cat: "Cost optimisation", loc: "Section 4.2",
      title: "Consolidate licensing across lots",
      desc: "Licensing is procured separately per lot; volume consolidation is likely to reduce unit cost.",
      rec: "Aggregate licensing volumes across lots and request tiered pricing from bidders." },
    { sev: "low", cat: "Missing acceptance criteria", loc: "Section 9 — Acceptance",
      title: "Deliverable acceptance criteria not stated",
      desc: "Deliverables are listed without objective criteria for acceptance or rejection.",
      rec: "Add measurable acceptance criteria and a sign-off process for each major deliverable." }
  ];

  const DIFFS = [
    {
      label: "Scope item · Incident management",
      before: "The supplier shall respond promptly to incidents and resolve issues in a timely manner to keep systems running.",
      after: 'The supplier shall operate a 24×7 incident management service with the following service levels: <span class="add">P1 response ≤ 15 minutes, resolution ≤ 4 hours</span>; <span class="add">P2 response ≤ 1 hour, resolution ≤ 8 hours</span>. Performance shall be measured monthly, reported in the service review, and <span class="add">service credits shall apply for any breach</span>.'
    },
    {
      label: "Requirement · Security",
      before: "The supplier must provide adequate security for all systems and data.",
      after: 'The supplier shall implement security controls aligned to <span class="add">the Ministry\'s information-security standard</span>, including <span class="add">multi-factor authentication, encryption of data at rest and in transit, role-based access control, and quarterly vulnerability assessments</span>. Compliance shall be <span class="add">evidenced at acceptance and audited annually</span>.'
    },
    {
      label: "Performance · Added KPIs (new content)",
      before: "— No measurable performance targets were defined in the original document. —",
      after: 'Added measurable KPIs: <span class="add">system availability ≥ 99.9% per month</span>, <span class="add">change failure rate ≤ 2%</span>, <span class="add">customer satisfaction ≥ 95%</span>, and <span class="add">monthly KPI reporting with a defined remediation process</span> where targets are missed.'
    }
  ];

  // ---- helpers ----
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));
  const steps = $$(".step");
  const views = { upload:"view-upload", analysing:"view-analysing", analysis:"view-analysis",
                  findings:"view-findings", improve:"view-improve", report:"view-report" };
  let current = "upload";
  let activeSample = SAMPLES.it;

  function showView(key, opts) {
    opts = opts || {};
    $$(".view").forEach(v => v.classList.remove("is-active"));
    const el = document.getElementById(views[key]);
    if (el) el.classList.add("is-active");
    // stepper state (analysing maps to upload step visually)
    const stepKey = key === "analysing" ? "upload" : key;
    const order = ["upload","analysis","findings","improve","report"];
    const idx = order.indexOf(stepKey);
    steps.forEach(s => {
      const si = order.indexOf(s.dataset.view);
      s.classList.toggle("is-active", s.dataset.view === stepKey);
      s.classList.toggle("is-done", idx > -1 && si > -1 && si < idx);
    });
    if (!opts.noScroll) window.scrollTo({ top: 0, behavior: "smooth" });
    current = key;
  }

  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 2600);
  }

  // ---- stepper nav (only allow if analysis already run, except upload) ----
  let analysed = false;
  steps.forEach(s => s.addEventListener("click", () => {
    const v = s.dataset.view;
    if (v !== "upload" && !analysed) { toast("Upload or load a document first"); return; }
    showView(v);
    if (v === "analysis") animateScores();
  }));
  $$("[data-goto]").forEach(b => b.addEventListener("click", () => {
    showView(b.dataset.goto);
    if (b.dataset.goto === "analysis") animateScores();
  }));

  // ---- upload interactions ----
  $("#browseBtn").addEventListener("click", () => $("#fileInput").click());
  $("#fileInput").addEventListener("change", e => {
    if (e.target.files && e.target.files.length) startAnalysis({ name: e.target.files[0].name, from:57, to:85, score:57 });
  });
  const dz = $("#dropzone");
  ["dragenter","dragover"].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.add("drag"); }));
  ["dragleave","drop"].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.remove("drag"); }));
  dz.addEventListener("drop", e => {
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    startAnalysis(f ? { name:f.name, from:57, to:85, score:57 } : activeSample);
  });
  $$(".sample").forEach(b => b.addEventListener("click", () => startAnalysis(SAMPLES[b.dataset.sample])));

  // ---- analysis simulation ----
  function startAnalysis(sample) {
    activeSample = sample;
    $("#analysingDoc").textContent = "Analysing: " + sample.name;
    const items = $$("#analysingSteps li");
    items.forEach(i => i.classList.remove("active","done"));
    showView("analysing");
    let i = 0;
    const tick = () => {
      if (i > 0) items[i-1].classList.remove("active"), items[i-1].classList.add("done");
      if (i < items.length) { items[i].classList.add("active"); i++; setTimeout(tick, 620); }
      else { finishAnalysis(sample); }
    };
    setTimeout(tick, 400);
  }

  function finishAnalysis(sample) {
    analysed = true;
    $("#analysisDocName").textContent = sample.name;
    $("#reportDocName").textContent = sample.name;
    $("#upFrom").textContent = sample.from;
    $("#upTo").textContent = sample.to;
    buildCategories();
    buildFindings("all");
    buildDiff();
    showView("analysis");
    animateScores(sample.score);
  }

  // ---- score animations ----
  function animateScores(score) {
    if (typeof score !== "number") score = activeSample.score;
    // gauge
    const circ = 2 * Math.PI * 52; // ~327
    const fg = $("#gaugeFg");
    fg.style.strokeDashoffset = circ;
    requestAnimationFrame(() => { fg.style.strokeDashoffset = circ * (1 - score/100); });
    countTo($("#scoreNum"), score, 1100);
    // tag colour by score
    const tag = $("#scoreTag");
    if (score < 65) { tag.textContent = "Needs improvement"; }
    else if (score < 80) { tag.textContent = "Acceptable — improvable"; }
    else { tag.textContent = "Strong"; }
    // stat counters
    $$(".stat-num").forEach(el => countTo(el, parseInt(el.dataset.count,10), 1000));
  }

  function countTo(el, target, dur) {
    const start = performance.now();
    const from = 0;
    function frame(now) {
      const p = Math.min(1, (now - start)/dur);
      const eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(from + (target-from)*eased);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // ---- builders ----
  function buildCategories() {
    const map = { high:"sev-high", medium:"sev-med", low:"sev-low" };
    $("#catGrid").innerHTML = CATEGORIES.map(c => `
      <div class="cat ${map[c.sev]}" data-sev="${c.sev}">
        <div class="cat-ico">${c.ico}</div>
        <div class="cat-body">
          <div class="cat-name">${c.name}</div>
          <div class="cat-meta">${c.sev === "high" ? "High priority" : c.sev === "medium" ? "Medium priority" : "Opportunity"}</div>
        </div>
        <div class="cat-count">${c.count}</div>
      </div>`).join("");
    $$("#catGrid .cat").forEach(card => card.addEventListener("click", () => {
      showView("findings");
      const sev = card.dataset.sev;
      setFilter(sev);
    }));
  }

  function buildFindings(sev) {
    const list = sev === "all" ? FINDINGS : FINDINGS.filter(f => f.sev === sev);
    $("#findings").innerHTML = list.map(f => `
      <div class="finding ${f.sev}">
        <div class="finding-top">
          <span class="sev-badge ${f.sev}">${f.sev}</span>
          <span class="finding-cat">${f.cat}</span>
          <span class="finding-loc">${f.loc}</span>
        </div>
        <div class="finding-title">${f.title}</div>
        <div class="finding-desc">${f.desc}</div>
        <div class="finding-rec"><b>Recommended action:</b> ${f.rec}</div>
      </div>`).join("") || `<p class="muted">No findings at this severity.</p>`;
  }

  function setFilter(sev) {
    $$(".filter").forEach(f => f.classList.toggle("is-active", f.dataset.sev === sev));
    buildFindings(sev);
  }
  $$(".filter").forEach(f => f.addEventListener("click", () => setFilter(f.dataset.sev)));

  function buildDiff() {
    $("#diff").innerHTML = DIFFS.map(d => `
      <div class="diff-card">
        <div class="diff-head">${d.label}</div>
        <div class="diff-cols">
          <div class="diff-col diff-before"><h4>Original</h4><div class="diff-box">${d.before}</div></div>
          <div class="diff-col diff-after"><h4>Improved by AI</h4><div class="diff-box">${d.after}</div></div>
        </div>
      </div>`).join("");
  }

  // ---- misc buttons ----
  $("#downloadBtn").addEventListener("click", () => toast("Improved document prepared (prototype)"));
  $("#exportReport").addEventListener("click", () => toast("Executive report exported (prototype)"));
  $("#restartBtn").addEventListener("click", () => { analysed = false; showView("upload"); });

  // init
  showView("upload", { noScroll: true });
})();
