import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const here = path.dirname(fileURLToPath(import.meta.url));
const workspaceDir = path.dirname(here);
const SKILL_DIR = "C:\\Users\\hp\\.codex\\plugins\\cache\\openai-primary-runtime\\presentations\\26.923.10815\\skills\\presentations";
const RUNTIME_PYTHON = "C:\\Users\\hp\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe";
const { makeNativeBulletParagraphs, finalizePresentation } = await import(
  pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href,
);

const FONT = "Microsoft JhengHei";
const C = {
  navy: "#17395F", blue: "#256B9D", teal: "#1B8A8F", green: "#4C956C",
  amber: "#D59B32", red: "#B64D55", ink: "#182433", gray: "#536171",
  pale: "#EAF1F6", pale2: "#F5F8FA", white: "#FFFFFF", line: "#D2DCE5",
};

function addShape(slide, left, top, width, height, fill, radius = 0) {
  return slide.shapes.add({
    geometry: radius ? "roundRect" : "rect",
    position: { left, top, width, height },
    fill,
    line: { fill: "none", width: 0 },
    ...(radius ? { radius } : {}),
  });
}

function addText(slide, text, left, top, width, height, opts = {}) {
  const s = slide.shapes.add({
    geometry: "textbox",
    position: { left, top, width, height },
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  s.text = text;
  s.text.style = {
    typeface: FONT,
    fontSize: opts.fontSize ?? 22,
    bold: opts.bold ?? false,
    color: opts.color ?? C.ink,
    autoFit: "none",
    alignment: opts.alignment ?? "left",
    verticalAlignment: opts.verticalAlignment ?? "middle",
  };
  return s;
}

function addBullets(slide, items, left, top, width, height, opts = {}) {
  const s = slide.shapes.add({
    geometry: "textbox",
    position: { left, top, width, height },
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  s.text = makeNativeBulletParagraphs(items, {
    marginLeftPoints: opts.marginLeftPoints ?? 18,
    hangingPoints: opts.hangingPoints ?? 9,
    spaceAfterPoints: opts.spaceAfterPoints ?? 8,
  });
  s.text.style = {
    typeface: FONT,
    fontSize: opts.fontSize ?? 22,
    color: opts.color ?? C.ink,
    autoFit: "none",
  };
  return s;
}

function addHeader(slide, title, num, section) {
  addText(slide, title, 64, 35, 1120, 80, { fontSize: 34, bold: true, color: C.navy });
  addText(slide, section, 66, 112, 980, 30, { fontSize: 15, bold: true, color: C.teal });
  addText(slide, String(num).padStart(2, "0"), 1160, 42, 58, 34, { fontSize: 15, bold: true, color: C.gray, alignment: "right" });
  addShape(slide, 64, 148, 1152, 3, C.teal);
}

function addFooter(slide, text = "Discussion draft | PRE-KICKOFF | AMAT-specific facts TBD") {
  addText(slide, text, 64, 684, 1050, 18, { fontSize: 11, color: C.gray });
}

function addCover(p, title, subtitle, pathway, note) {
  const s = p.slides.add();
  s.background.fill = C.white;
  addShape(s, 0, 0, 1280, 720, C.navy);
  addShape(s, 0, 0, 24, 720, C.teal);
  addText(s, "OPTIMUM / AMAT", 72, 62, 400, 30, { fontSize: 16, bold: true, color: "#87D0CE" });
  addText(s, title, 72, 160, 1020, 160, { fontSize: 46, bold: true, color: C.white });
  addText(s, subtitle, 76, 330, 930, 55, { fontSize: 22, color: "#D9E5EE" });
  const steps = pathway;
  const w = 244;
  steps.forEach((step, i) => {
    addShape(s, 76 + i * 265, 470, w, 72, i === 0 ? C.teal : "#2A5278");
    addText(s, step, 90 + i * 265, 486, w - 28, 40, { fontSize: 19, bold: true, color: C.white, alignment: "center" });
  });
  addText(s, "PRE-KICKOFF DRAFT · 2026-09-27", 76, 642, 500, 25, { fontSize: 13, color: "#B9CAD8" });
  s.speakerNotes.textFrame.setText(note);
}

function addFourCards(slide, cards, top = 190) {
  const gap = 22;
  const w = (1152 - gap * 3) / 4;
  cards.forEach((c, i) => {
    const x = 64 + i * (w + gap);
    addShape(slide, x, top, w, 330, i % 2 === 0 ? C.pale : C.pale2);
    addShape(slide, x, top, w, 12, c.color ?? C.teal);
    addText(slide, c.title, x + 20, top + 30, w - 40, 60, { fontSize: 24, bold: true, color: C.navy });
    addBullets(slide, c.items, x + 18, top + 104, w - 36, 190, { fontSize: 17, spaceAfterPoints: 7 });
  });
}

function addThreeCards(slide, cards, top = 190, height = 330) {
  const gap = 26;
  const w = (1152 - gap * 2) / 3;
  cards.forEach((c, i) => {
    const x = 64 + i * (w + gap);
    addShape(slide, x, top, w, height, i % 2 === 0 ? C.pale : C.pale2);
    addShape(slide, x, top, w, 11, c.color ?? C.teal);
    addText(slide, c.title, x + 22, top + 28, w - 44, 58, { fontSize: 24, bold: true, color: C.navy, alignment: c.center ? "center" : "left" });
    addBullets(slide, c.items, x + 20, top + 98, w - 40, height - 120, { fontSize: c.fontSize ?? 18, spaceAfterPoints: 7 });
  });
}

function addTwoColumns(slide, leftTitle, leftItems, rightTitle, rightItems, opts = {}) {
  const top = opts.top ?? 184;
  const height = opts.height ?? 390;
  addShape(slide, 72, top, 540, height, C.pale);
  addShape(slide, 668, top, 540, height, C.pale2);
  addShape(slide, 72, top, 540, 12, opts.leftColor ?? C.teal);
  addShape(slide, 668, top, 540, 12, opts.rightColor ?? C.blue);
  addText(slide, leftTitle, 96, top + 25, 492, 48, { fontSize: opts.titleFontSize ?? 26, bold: true, color: C.navy });
  addText(slide, rightTitle, 692, top + 25, 492, 48, { fontSize: opts.titleFontSize ?? 26, bold: true, color: C.navy });
  addBullets(slide, leftItems, 94, top + 86, 492, height - 105, { fontSize: opts.fontSize ?? 19, spaceAfterPoints: opts.spaceAfterPoints ?? 8 });
  addBullets(slide, rightItems, 690, top + 86, 492, height - 105, { fontSize: opts.fontSize ?? 19, spaceAfterPoints: opts.spaceAfterPoints ?? 8 });
}

function addRows(slide, rows, top = 184, widths = [300, 260, 510], header = null) {
  const total = widths.reduce((a, b) => a + b, 0);
  const left = (1280 - total) / 2;
  if (header) {
    addShape(slide, left, top, total, 48, C.navy);
    let x = left;
    header.forEach((h, i) => { addText(slide, h, x + 8, top + 5, widths[i] - 16, 38, { fontSize: 16, bold: true, color: C.white, alignment: "center" }); x += widths[i]; });
    top += 56;
  }
  rows.forEach((row, r) => {
    const h = 58;
    addShape(slide, left, top + r * (h + 5), total, h, r % 2 ? C.pale2 : C.pale);
    let x = left;
    row.forEach((v, i) => { addText(slide, String(v), x + 12, top + r * (h + 5) + 7, widths[i] - 24, h - 14, { fontSize: 16, bold: i === 0, color: i === 0 ? C.navy : C.ink, alignment: i === 1 && optsCenter(row) ? "center" : "left" }); x += widths[i]; });
  });
}

function optsCenter() { return false; }

async function finalizeDeck(presentation, finalPath, expectedSlides, stagingName) {
  const stagingDir = path.join(workspaceDir, "_qa", "pptx", stagingName);
  await fs.mkdir(stagingDir, { recursive: true });
  await fs.mkdir(path.dirname(finalPath), { recursive: true });
  const candidatePath = path.join(stagingDir, "candidate.pptx");
  await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
  const result = await finalizePresentation({
    explicitTotalSlideCount: expectedSlides,
    requiredNativeTableOwnerSlides: [],
    requiredNativeChartOwnerSlides: [],
    workspaceDir,
    candidatePath,
    finalPath,
    pythonExecutable: RUNTIME_PYTHON,
    integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
    layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
    layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-bullet-geometry", "--validate-heading-fit"],
    fontPolicy: { basis: "design", families: [FONT] },
    verifyArtifactToolImport: true,
    receiptPath: path.join(stagingDir, `${path.basename(finalPath)}.validation.json`),
  });
  console.log(JSON.stringify(result, null, 2));
}

async function buildKickoff() {
  const p = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  addCover(
    p,
    "A shared decision system will move the project from requirements to execution",
    "AMAT Taiwan Renewable Electricity Advisory | Kickoff discussion draft",
    ["DEFINE", "EVALUATE", "NEGOTIATE", "EXECUTE"],
    "Purpose: align objectives, decisions, roles, working rhythm and immediate launch actions. No AMAT-specific facts are assumed.",
  );

  let s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "We will define success through the decisions AMAT must make, not through document volume", 2, "OUTCOMES");
  addFourCards(s, [
    { title: "Requirements / portfolio", items: ["Agree boundary and residual gap", "Choose scenarios to pursue"], color: C.teal },
    { title: "Market / shortlist", items: ["Authorize disclosure and engagement", "Select credible counterparties"], color: C.blue },
    { title: "Commercial / contract", items: ["Set mandate and risk position", "Resolve terms with legal advice"], color: C.amber },
    { title: "Go-live / BAU", items: ["Confirm readiness and ownership", "Track delivery and certificates"], color: C.green },
  ]);
  addText(s, "Success evidence: a named decision owner, traceable inputs, comparable options, explicit risk acceptance and a complete handoff at every gate.", 80, 555, 1120, 80, { fontSize: 21, bold: true, color: C.navy, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: What are the three to five decisions AMAT most needs this project to enable?");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Ten gates keep analysis from outrunning authority or evidence", 3, "DELIVERY JOURNEY");
  const gates = ["G0\nKickoff", "G1\nRequirements", "G2\nPortfolio", "G3\nMarket launch", "G4\nRFQ", "G5\nShortlist", "G6\nMandate", "G7\nSelect / Sign", "G8\nGo-live", "G9\nPerformance"];
  gates.forEach((g, i) => {
    const x = 55 + i * 119;
    const fill = i <= 2 ? C.teal : i <= 5 ? C.blue : C.navy;
    addShape(s, x, 240, 104, 110, fill);
    addText(s, g, x + 6, 258, 92, 70, { fontSize: 14, bold: true, color: C.white, alignment: "center" });
    if (i < gates.length - 1) addShape(s, x + 104, 288, 15, 10, C.line);
  });
  addText(s, "1.x DEFINE / ALIGN", 55, 390, 342, 42, { fontSize: 18, bold: true, color: C.teal, alignment: "center" });
  addText(s, "2.x MARKET / EVALUATE", 412, 390, 342, 42, { fontSize: 18, bold: true, color: C.blue, alignment: "center" });
  addText(s, "3.x NEGOTIATE / EXECUTE", 769, 390, 472, 42, { fontSize: 18, bold: true, color: C.navy, alignment: "center" });
  addText(s, "Every gate needs: decision requested · evidence · open assumptions · approver · conditions · handoff", 100, 505, 1080, 55, { fontSize: 23, bold: true, color: C.ink, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: Which gates require Taiwan, regional or global approval? Gate names are methodology hypotheses until validated.");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Cross-functional participation changes by decision; one standing audience is not enough", 4, "STAKEHOLDER HYPOTHESIS");
  const roles = [
    ["Success / scope", "Sponsor · Sustainability · Procurement"],
    ["Baseline / load", "Facilities · Sustainability · Finance"],
    ["Portfolio", "Sponsor · Procurement · Sustainability · Finance"],
    ["Market / RFQ", "Procurement · Legal · Optimum"],
    ["Contract / sign", "Authorized approvers · Procurement · Legal"],
    ["Execution", "Facilities · Sustainability · Procurement · BAU owners"],
  ];
  roles.forEach((r, i) => {
    const y = 180 + i * 72;
    addShape(s, 80, y, 250, 54, i % 2 ? C.pale2 : C.pale);
    addText(s, r[0], 98, y + 8, 214, 38, { fontSize: 19, bold: true, color: C.navy });
    addShape(s, 350, y, 830, 54, C.white);
    addText(s, r[1], 370, y + 8, 790, 38, { fontSize: 19, color: C.ink });
  });
  addText(s, "HYPOTHESIS — named people, authority limits and required consultation must be confirmed at G0 / G1.", 80, 628, 1100, 38, { fontSize: 17, bold: true, color: C.red });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: Who is accountable, who must be consulted, and who only needs to be informed for each decision?");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Define → MVP → Review → Correct → Expand is the default working rhythm", 5, "WAYS OF WORKING");
  const loop = ["DEFINE\nquestion + use", "MVP\nsmallest reviewable", "REVIEW\nclient lens", "CORRECT\nmethod / assumptions", "EXPAND\nonly after alignment"];
  loop.forEach((t, i) => {
    const x = 72 + i * 237;
    addShape(s, x, 228, 205, 112, i === 2 ? C.amber : C.teal);
    addText(s, t, x + 12, 246, 181, 76, { fontSize: 19, bold: true, color: C.white, alignment: "center" });
  });
  addShape(s, 120, 420, 480, 96, C.pale);
  addText(s, "Working review\nBiweekly starting hypothesis\nResolve data, assumptions and design", 145, 435, 430, 66, { fontSize: 19, bold: true, color: C.navy, alignment: "center" });
  addShape(s, 680, 420, 480, 96, C.pale2);
  addText(s, "Steering / gate review\nMonthly or at gate starting hypothesis\nApprove, condition, defer or stop", 705, 435, 430, 66, { fontSize: 19, bold: true, color: C.navy, alignment: "center" });
  addText(s, "Silence is not approval: any deferred decision must retain an owner, missing evidence and latest-needed date.", 140, 570, 1000, 52, { fontSize: 20, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: What review turnaround and urgent escalation route can AMAT support?");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "The first four weeks should lock governance, data ownership, market understanding and the gap method", 6, "INITIAL WORKPLAN — TIMING TBD");
  const weeks = [
    ["W0", "Kickoff", "Charter + owners", "G0"],
    ["W1", "Data / interviews", "Request + tracker", "Owners / dates"],
    ["W2", "Taiwan workshop", "Learning + decisions", "Workshop outputs"],
    ["W3", "Gap MVP", "Synthetic model + mapping", "G1 method"],
    ["W4", "Portfolio preview", "2–3 scenarios", "Prepare G2"],
  ];
  weeks.forEach((w, i) => {
    const x = 66 + i * 238;
    addText(s, w[0], x, 180, 210, 42, { fontSize: 24, bold: true, color: C.teal, alignment: "center" });
    addShape(s, x, 225, 210, 260, i % 2 ? C.pale2 : C.pale);
    addText(s, w[1], x + 14, 248, 182, 50, { fontSize: 22, bold: true, color: C.navy, alignment: "center" });
    addText(s, "Client objective", x + 18, 320, 174, 26, { fontSize: 14, bold: true, color: C.gray, alignment: "center" });
    addText(s, w[2], x + 18, 350, 174, 65, { fontSize: 18, color: C.ink, alignment: "center" });
    addText(s, w[3], x + 18, 435, 174, 28, { fontSize: 16, bold: true, color: C.blue, alignment: "center" });
  });
  addText(s, "Actual sequencing depends on fixed dates, data access, stakeholder calendars and agreed scope.", 120, 565, 1040, 48, { fontSize: 21, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: Which dates or constraints should change the proposed sequence?");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Early visibility of unknowns is a control, not a weakness", 7, "ASSUMPTIONS AND RISKS");
  const rows = [
    ["Success / scope", "TBD WITH CLIENT", "Decision-led expectation questions + SOW check"],
    ["Site / target boundary", "TBD WITH CLIENT", "G1 definition + data dictionary"],
    ["Stakeholders / authority", "HYPOTHESIS", "RACI validation + named approvers"],
    ["Market disclosure", "TBD WITH CLIENT", "Authorization record before 2.2"],
    ["Data completeness", "UNKNOWN", "Quality flags + range / sensitivity"],
    ["Legal / procurement process", "TBD WITH CLIENT", "Client counsel / procurement ownership"],
  ];
  addShape(s, 70, 168, 1120, 50, C.navy);
  addText(s, "Issue", 80, 175, 300, 36, { fontSize: 17, bold: true, color: C.white, alignment: "center" });
  addText(s, "Status", 400, 175, 230, 36, { fontSize: 17, bold: true, color: C.white, alignment: "center" });
  addText(s, "Control", 650, 175, 530, 36, { fontSize: 17, bold: true, color: C.white, alignment: "center" });
  rows.forEach((r, i) => {
    const y = 224 + i * 62;
    const fill = i % 2 ? C.pale2 : C.pale;
    addShape(s, 70, y, 1120, 54, fill);
    addText(s, r[0], 88, y + 7, 292, 40, { fontSize: 17, bold: true, color: C.navy });
    addText(s, r[1], 407, y + 7, 218, 40, { fontSize: 16, bold: true, color: r[1] === "HYPOTHESIS" ? C.amber : C.red, alignment: "center" });
    addText(s, r[2], 668, y + 7, 504, 40, { fontSize: 17, color: C.ink });
  });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: Which assumption must be corrected immediately? Unknown does not mean unmanaged.");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Today's decisions launch data collection and workshop design", 8, "KICKOFF DECISIONS");
  const decisions = [
    "Outcome and success definition",
    "Scope / non-scope and fixed dates",
    "Sponsor, owners and decision authority",
    "Cadence, review SLA and escalation route",
    "Repository, confidentiality and tool rules",
    "1.2 data owners and first due dates",
    "1.3 participants, objectives and workshop timing",
    "Provisional G1 / G2 decision dates",
  ];
  decisions.forEach((d, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i % 4;
    const x = 70 + col * 590;
    const y = 180 + row * 94;
    addShape(s, x, y, 550, 72, row % 2 ? C.pale2 : C.pale);
    addShape(s, x + 18, y + 20, 30, 30, C.teal);
    addText(s, "✓", x + 18, y + 18, 30, 30, { fontSize: 19, bold: true, color: C.white, alignment: "center" });
    addText(s, d, x + 64, y + 11, 460, 50, { fontSize: 19, bold: true, color: C.navy });
  });
  addText(s, "Decision options: APPROVE · APPROVE WITH CONDITIONS · DEFER · RE-SCOPE", 110, 585, 1060, 52, { fontSize: 22, bold: true, color: C.teal, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Close by naming owner and date for every item not approved today. Within 48 hours, update charter, decision log, questions, schedule, and launch packs.");

  const finalPath = path.join(workspaceDir, "workstreams", "01_1.1_kickoff", "Kickoff_Deck_v2.pptx");
  await finalizeDeck(p, finalPath, 8, "kickoff");
}

async function buildWorkshop() {
  const p = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  const officialNote = "Official references accessed 2026-09-27: T-REC documents https://www.trec.org.tw/documents ; T-REC regulations https://www.trec.org.tw/index.php/en/regulations ; Taipower wheeling/direct supply operating rules https://service.taipower.com.tw/powerwheeling/static/file/1130318%E8%BD%89%E7%9B%B4%E4%BE%9B%E7%87%9F%E9%81%8B%E8%A6%8F%E7%AB%A0.pdf . Verify latest versions before client delivery. This workshop is not legal advice.";
  addCover(p,
    "Understanding the interfaces is the prerequisite to choosing a Taiwan procurement strategy",
    "Taiwan Renewable Electricity Procurement Workshop | Decision-preparation draft",
    ["WHY", "HOW", "OPTIONS", "DECISIONS"],
    `Purpose: build a shared language and convert market understanding into AMAT decisions and inputs. ${officialNote}`,
  );

  let s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Today's goal is decision readiness, not a complete regulatory course", 2, "WORKSHOP OUTCOME");
  addTwoColumns(s, "We will", ["Build one language for roles and flows", "Compare option trade-offs", "Identify hard constraints and evidence needs", "Assign decisions, owners and dates"], "We will not", ["Invent AMAT facts or preferences", "Provide legal advice", "Select a supplier without evidence", "Treat signing a contract as proof of delivery or claims"], { rightColor: C.red, fontSize: 19 });
  addText(s, "Outputs → 1.4 gap boundary · 1.5 scenario criteria · 1.6 roadmap / gates", 115, 592, 1050, 44, { fontSize: 22, bold: true, color: C.teal, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Open by confirming what must be decided today and what belongs in later legal, technical or supplier sessions.");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "The right participants change by the decision being prepared", 3, "PARTICIPANT HYPOTHESIS");
  addRows(s, [
    ["Target / claim", "Sustainability", "Regional / global sustainability · Legal"],
    ["Load / implementation", "Facilities", "Sustainability · Procurement"],
    ["Market / RFQ", "Procurement", "Legal · Sustainability · Optimum"],
    ["Cost / risk", "Finance", "Procurement · Legal · Sponsor"],
    ["Contract / sign", "Authorized approver", "Procurement · Legal · Finance"],
    ["Roadmap / resources", "Sponsor", "All affected owners"],
  ], 178, [300, 260, 510], ["Decision", "Likely accountable", "Must consult"]);
  addText(s, "HYPOTHESIS — validate named people, authority and required segments before invitations are sent.", 110, 624, 1060, 38, { fontSize: 18, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: Who is missing, who is optional, and who owns each decision? Do not present this as AMAT's known organization.");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Taiwan procurement involves five interfaces that AMAT must coordinate", 4, "MARKET PARTICIPANTS");
  const nodes = [
    ["Generator / developer", 75, 205, C.green], ["Renewable retailer", 75, 405, C.blue],
    ["Corporate buyer", 500, 300, C.teal], ["Grid / Taipower", 925, 205, C.navy], ["T-REC / verification", 925, 405, C.amber],
  ];
  nodes.forEach(([t,x,y,c]) => { addShape(s, x, y, 280, 105, c); addText(s, t, x + 14, y + 22, 252, 60, { fontSize: 22, bold: true, color: C.white, alignment: "center" }); });
  addShape(s, 355, 250, 145, 10, C.line); addShape(s, 355, 450, 145, 10, C.line);
  addShape(s, 780, 250, 145, 10, C.line); addShape(s, 780, 450, 145, 10, C.line);
  addText(s, "Advisor / counsel / verifier support the interfaces — they do not replace client authority.", 160, 565, 960, 48, { fontSize: 20, bold: true, color: C.navy, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText(`Discussion: Who inside AMAT owns each interface? ${officialNote}`);

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Electricity, contracts and certificates move through different but linked systems", 5, "THREE FLOWS");
  const lanes = [
    ["1 · ELECTRICITY / OPERATIONS", C.green, ["Generation", "Grid / direct connection", "Buyer meter / account"]],
    ["2 · CONTRACT / MONEY", C.blue, ["PPA / retail / service", "Price / volume / settlement", "Credit / change / default"]],
    ["3 · CERTIFICATE / CLAIM", C.amber, ["Verification / issuance", "Transfer / ownership", "Use / claim record"]],
  ];
  lanes.forEach((lane, i) => {
    const y = 182 + i * 142;
    addText(s, lane[0], 70, y, 270, 80, { fontSize: 18, bold: true, color: lane[1] });
    lane[2].forEach((v, j) => { const x=350+j*280; addShape(s,x,y,240,80,j===2?C.pale2:C.pale); addText(s,v,x+12,y+14,216,52,{fontSize:17,bold:true,color:C.navy,alignment:"center"}); if(j<2)addShape(s,x+240,y+35,40,10,lane[1]); });
  });
  addText(s, "A contract signature does not by itself prove physical delivery or complete claim evidence.", 135, 610, 1010, 36, { fontSize: 21, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText(`Discussion: Which flow is least clear today? ${officialNote}`);

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Onsite generation trades scale for site control and visible implementation", 6, "OPTION 1 — ONSITE");
  addThreeCards(s, [
    { title: "Potential role", items: ["Cover part of site load", "Visible site-level action", "Possible portfolio diversification"], color: C.green },
    { title: "Tests before analysis", items: ["Roof / land and site tenure", "Load and generation profile", "Capex / opex / ownership model"], color: C.teal },
    { title: "Interfaces to confirm", items: ["Self-use / export treatment", "Meter / data availability", "Certificate ownership and claim"], color: C.amber },
  ], 190, 345);
  addText(s, "No AMAT site feasibility conclusion is implied — first collect the site conditions that could change the answer.", 110, 570, 1060, 48, { fontSize: 20, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText(`Discussion: Which site conditions are worth collecting first? ${officialNote}`);

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Offsite procurement requires coordinated delivery interfaces", 7, "OPTION 2 — OFFSITE / RETAILER-ENABLED");
  const chain = ["Project / asset", "COD + generation", "Grid / wheeling", "Retail / settlement", "Buyer + T-REC"];
  chain.forEach((v,i)=>{const x=66+i*238; addShape(s,x,240,210,100,i<2?C.green:i===2?C.navy:i===3?C.blue:C.teal); addText(s,v,x+12,258,186,64,{fontSize:18,bold:true,color:C.white,alignment:"center"}); if(i<4)addShape(s,x+210,283,28,10,C.line);});
  addThreeCards(s, [
    { title: "Supply", items: ["Maturity / COD", "Volume / profile", "Curtailment / delivery"], color: C.green, fontSize: 15 },
    { title: "Commercial", items: ["Price / tenor", "Credit / guarantee", "Change / termination"], color: C.blue, fontSize: 15 },
    { title: "Execution", items: ["Wheeling / meters", "Certificate timing", "Internal approvals"], color: C.amber, fontSize: 15 },
  ], 385, 200);
  addFooter(s); s.speakerNotes.textFrame.setText(`Discussion: Which dependency would become a hard constraint for AMAT? ${officialNote}`);

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Certificate-only procurement can fill timing gaps but must pass policy and evidence tests", 8, "OPTION 3 — T-REC / CERTIFICATE-ONLY");
  const life = ["Facility / energy verified", "Certificate issued", "Ownership transferred", "Used / claimed", "Evidence retained"];
  life.forEach((v,i)=>{const x=70+i*238; addShape(s,x,230,210,95,i===3?C.amber:C.pale); addText(s,v,x+12,246,186,62,{fontSize:17,bold:true,color:i===3?C.white:C.navy,alignment:"center"}); if(i<4)addShape(s,x+210,272,28,10,C.teal);});
  addTwoColumns(s, "Use case to test", ["Near-term residual gap", "Small or variable requirement", "Bridge until longer-term supply starts"], "Controls to confirm", ["Eligibility and vintage", "Ownership / transfer / claim status", "Availability, price and evidence", "Global / regional policy acceptance"], { rightColor: C.red, fontSize: 15, titleFontSize: 21, top: 380, height: 200, spaceAfterPoints: 3 });
  addFooter(s); s.speakerNotes.textFrame.setText(`Discussion: What policy conditions must be satisfied? ${officialNote}`);

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "A portfolio combines tools because no single option optimizes every objective", 9, "ILLUSTRATIVE HORIZON — NOT A RECOMMENDATION");
  addThreeCards(s, [
    { title: "Near term", items: ["Close residual timing gaps", "Prioritize speed and flexibility", "Verify claim eligibility"], color: C.amber },
    { title: "Medium term", items: ["Bridge contract expiries / COD", "Build market and data readiness", "Reduce transition risk"], color: C.blue },
    { title: "Long term", items: ["Core volume / project linkage", "Accept longer tenor selectively", "Manage concentration and execution"], color: C.green },
  ], 190, 330);
  addText(s, "SYNTHETIC portfolio archetype only — actual volumes, dates and tools require 1.4 / 1.5 analysis.", 130, 565, 1020, 44, { fontSize: 20, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: Which horizon is most constrained by an external deadline? Do not infer AMAT volume or target dates.");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Option comparison must make trade-offs explicit before any scoring", 10, "DECISION CRITERIA");
  addRows(s, [
    ["Volume / profile", "Coverage and fit", "Hard minimum or preference?"],
    ["Timing / COD", "Start date and confidence", "Latest acceptable date?"],
    ["Tenor / flexibility", "Commitment, exit, change", "What flexibility has value?"],
    ["Price / settlement", "Structure and volatility", "Which cost metric supports approval?"],
    ["Risk / concentration", "Project, counterparty, market", "What cannot be concentrated?"],
    ["Execution / claim", "Wheeling, meters, T-REC, resources", "What is operationally feasible?"],
  ], 178, [300, 430, 340], ["Criterion", "What it means", "Question before scoring"]);
  addText(s, "Define the scale and evidence first; scores without shared definitions create false precision.", 120, 624, 1040, 34, { fontSize: 18, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: Which criteria are hard constraints and which are preferences? Who approves the definitions and weights?");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Taiwan constraints need evidence-based decomposition", 11, "CONSTRAINTS — SOURCE BEFORE CONCLUSION");
  addRows(s, [
    ["Supply / maturity", "Project documents + market evidence", "Volume / timing feasibility"],
    ["Network / wheeling", "Official process + site / meter facts", "Lead time / execution"],
    ["Certificate timing", "T-REC rule + verified status", "Claim / reconciliation"],
    ["Contract / credit", "Bid / term sheet + counsel", "Risk / approval"],
    ["Profile / technology", "Generation + load data", "Portfolio fit"],
    ["Internal readiness", "Client owner / process evidence", "Critical path"],
  ], 190, [300, 430, 340], ["Constraint", "Evidence source", "Decision effect"]);
  addText(s, "Label each statement: official rule · supplier statement · public evidence · Optimum analysis · client decision.", 105, 624, 1070, 36, { fontSize: 18, bold: true, color: C.teal, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText(`Discussion: Which constraints need official research, supplier evidence or client input? ${officialNote}`);

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "AMAT's strategy may depend as much on internal readiness as on external supply", 12, "CRITICAL PATH HYPOTHESIS");
  addTwoColumns(s, "External readiness", ["Supply / project maturity", "Network / wheeling process", "Certificate issuance / transfer", "Counterparty / commercial terms"], "Internal readiness", ["Boundary / load / forecast data", "Decision authority and budget", "Legal mandate / procurement process", "Site implementation and claim governance"], { leftColor: C.blue, rightColor: C.teal, fontSize: 19 });
  addText(s, "All AMAT readiness statements remain TBD WITH CLIENT; the workshop should identify the longest lead time, not assume it.", 95, 592, 1090, 44, { fontSize: 19, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: Which internal lead time is most likely to control the schedule?");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "The next analysis needs a clear residual-gap boundary and an approved criteria set", 13, "HANDOFF TO 1.4–1.6");
  const stages=[
    ["1.2 INPUTS","Sites · load · target · existing procurement",C.gray],
    ["1.4 GAP","Baseline · target · coverage · residual gap",C.teal],
    ["1.5 PORTFOLIO","Scenarios · cost · risk · constraints",C.blue],
    ["1.6 ROADMAP","Gates · owners · timing · transition to 2.x",C.navy],
  ];
  stages.forEach((v,i)=>{const x=70+i*295; addShape(s,x,230,260,170,v[2]); addText(s,v[0],x+16,250,228,40,{fontSize:21,bold:true,color:C.white,alignment:"center"}); addText(s,v[1],x+22,310,216,70,{fontSize:17,color:C.white,alignment:"center"}); if(i<3)addShape(s,x+260,310,35,10,C.line);});
  addText(s, "Required approvals: calculation boundary · assumption treatment · criteria / weights · scenarios · roadmap gates", 100, 490, 1080, 60, { fontSize: 22, bold: true, color: C.navy, alignment: "center" });
  addText(s, "Every handoff retains owner, evidence, truth status and decision date.", 150, 570, 980, 38, { fontSize: 19, bold: true, color: C.teal, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: Who approves the boundary, assumptions, criteria and scenario set?");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Market engagement should start only after AMAT approves what can be disclosed", 14, "INFORMATION BOUNDARY");
  const ladder=[
    ["DESKTOP SCAN","Public sources only","No external contact"],
    ["ANONYMOUS SOUNDING","Fictional / rounded band","No identity or exact site"],
    ["NAMED OUTREACH","Authorized identity + range","No false commitment"],
    ["RFQ / NEGOTIATION","Approved bidder information","No cross-supplier disclosure"],
  ];
  ladder.forEach((v,i)=>{const x=78+i*295; const y=410-i*65; addShape(s,x,y,260,155,i===3?C.navy:i===2?C.blue:i===1?C.teal:C.gray); addText(s,v[0],x+12,y+18,236,36,{fontSize:17,bold:true,color:C.white,alignment:"center"}); addText(s,v[1],x+16,y+62,228,32,{fontSize:16,color:C.white,alignment:"center"}); addText(s,v[2],x+16,y+104,228,30,{fontSize:14,bold:true,color:C.white,alignment:"center"});});
  addText(s, "Client authorization must define identity · volume · site · timing · recipients · permitted use.", 105, 590, 1070, 40, { fontSize: 20, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: At which stage may identity, volume, site and timing be disclosed? Apply the Market Conduct and Information Boundary guide.");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Close with decisions, owners and dates that unlock 1.4–1.6", 15, "WORKSHOP DECISIONS");
  const decisions=["Success priority","Gap / target boundary","Options for first-pass scenario","Hard constraints","Criteria / evidence","Market disclosure boundary","Data / research owners","G1 / G2 decision dates"];
  decisions.forEach((d,i)=>{const col=i<4?0:1;const row=i%4;const x=72+col*590;const y=180+row*92;addShape(s,x,y,550,70,row%2?C.pale2:C.pale);addShape(s,x+16,y+18,32,32,C.teal);addText(s,String(i+1),x+16,y+18,32,32,{fontSize:16,bold:true,color:C.white,alignment:"center"});addText(s,d,x+65,y+10,455,48,{fontSize:19,bold:true,color:C.navy});});
  addText(s, "APPROVE · APPROVE WITH CONDITIONS · DEFER WITH OWNER / DATE · RE-SCOPE", 100, 580, 1080, 52, { fontSize: 21, bold: true, color: C.teal, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Within 48 hours, update the decision, action, assumption, question and data-request logs; then feed approved inputs to 1.4–1.6.");

  const finalPath = path.join(workspaceDir, "workstreams", "03_1.3_taiwan-market-workshop", "Taiwan_Market_Workshop_Deck_v3.pptx");
  await finalizeDeck(p, finalPath, 15, "workshop");
}

async function buildRoadmap() {
  const p = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  addCover(
    p,
    "A gate-based roadmap turns analysis into authorized action",
    "Cross-functional alignment & RE100 roadmap | discussion draft",
    ["ALIGN", "AUTHORIZE", "SOURCE", "EXECUTE"],
    "Purpose: align decision gates, evidence, owners and launch conditions. All AMAT-specific dates, targets, owners and portfolio choices are TBD WITH CLIENT.",
  );

  let s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Three horizons separate immediate decisions from long-term commitments", 2, "ROADMAP LOGIC");
  addThreeCards(s, [
    { title: "Near term — define", items: ["Close boundary and data gaps", "Approve criteria and scenarios", "Set market disclosure authority"], color: C.teal },
    { title: "Medium term — source", items: ["Test availability and conditions", "Run comparable RFQ / DD", "Approve shortlist and mandate"], color: C.blue },
    { title: "Long term — execute", items: ["Resolve contract allocation", "Confirm signing / implementation readiness", "Transition delivery and claims to BAU"], color: C.navy },
  ], 190, 330);
  addText(s, "Actual timing and overlap depend on client deadlines, approval lead times and market evidence.", 95, 560, 1090, 44, { fontSize: 21, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: Which external deadline or internal approval is most likely to control the critical path?");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Nine gates prevent the team from outrunning evidence or authority", 3, "DECISION GATES G3–G11");
  addRows(s, [
    ["G3 / G4", "Baseline + portfolio direction", "Approved gap, assumptions, criteria and scenario"],
    ["G5", "Market engagement authority", "Scope, disclosure boundary, resources and approver"],
    ["G6 / G7", "RFQ launch + shortlist", "Bidder set, evaluation rules, scorecard and DD"],
    ["G8 / G9", "Mandate + preferred terms", "Walk-away logic, residual risks and commercial impact"],
    ["G10", "Signing readiness", "Final documents, CPs, funding and implementation owner"],
    ["G11", "BAU transition", "Delivery, certificate and reconciliation governance"],
  ], 182, [220, 350, 500], ["Gate", "Decision", "Minimum exit evidence"]);
  addText(s, "Gate owner and authority are HYPOTHESIS / TBD WITH CLIENT — deferral needs an owner, condition and date.", 95, 624, 1090, 34, { fontSize: 17, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: Who can approve each gate, and which gates require regional or global participation?");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "The critical path is the slower of market readiness and client readiness", 4, "DEPENDENCY LOGIC");
  addTwoColumns(s, "External evidence", ["Supplier / project maturity", "COD and supply profile", "Wheeling / meter prerequisites", "Certificate issuance and transfer", "Counterparty and commercial terms"], "Internal authority", ["Boundary, load and forecast data", "Policy and eligibility interpretation", "Procurement / budget / credit process", "Legal mandate and approval", "Site implementation and claim owner"], { top: 182, height: 360, leftColor: C.blue, rightColor: C.teal, fontSize: 18 });
  addText(s, "At every status review: identify the longest lead time, its evidence, owner, fallback and escalation date.", 100, 575, 1080, 50, { fontSize: 21, bold: true, color: C.navy, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: Which internal readiness item may control the launch or signing date?");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Prove the decision system before scaling market outreach", 5, "FIRST 90-DAY MVP SEQUENCE");
  addRows(s, [
    ["Weeks 1–2", "G0, data owners, interview / workshop plan", "Sponsor / PM review"],
    ["Weeks 2–5", "Quality profile, workshop, gap boundary MVP", "G1 / G2"],
    ["Weeks 4–7", "Gap and one-year portfolio scenarios", "G3 / G4"],
    ["Weeks 6–9", "Roadmap, desktop scan, research log", "G5 preparation"],
    ["Weeks 8–12", "Authorized sounding / outreach MVP", "Market feedback review"],
  ], 190, [230, 520, 320], ["Planning archetype", "First MVP", "Review point"]);
  addText(s, "These are planning ranges, not AMAT commitments; expand only after the preceding decision is explicit.", 95, 580, 1090, 50, { fontSize: 20, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Discussion: What cadence is realistic given AMAT owner availability and approval lead time?");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Market disclosure increases only with written client authority", 6, "DISCLOSURE STAIRCASE");
  const levels = [
    ["DESKTOP", "Public sources", "No external contact", C.gray],
    ["ANONYMOUS", "Rounded / abstracted need", "No identity or exact site", C.teal],
    ["NAMED", "Authorized identity + range", "No false commitment", C.blue],
    ["RFQ / NEGOTIATION", "Approved bidder package", "No cross-supplier disclosure", C.navy],
  ];
  levels.forEach((v, i) => { const x = 70 + i * 300; const y = 425 - i * 65; addShape(s, x, y, 270, 150, v[3]); addText(s, v[0], x + 12, y + 18, 246, 35, { fontSize: 17, bold: true, color: C.white, alignment: "center" }); addText(s, v[1], x + 16, y + 62, 238, 30, { fontSize: 16, color: C.white, alignment: "center" }); addText(s, v[2], x + 16, y + 105, 238, 26, { fontSize: 14, bold: true, color: C.white, alignment: "center" }); });
  addText(s, "Authority must define identity · site · volume · timing · recipients · permitted use.", 100, 590, 1080, 38, { fontSize: 20, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Decision: approve the highest disclosure level currently allowed and record conditions in the decision log.");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "G5 is ready only when the market question and information boundary are precise", 7, "LAUNCH READINESS");
  addTwoColumns(s, "Required before launch", ["Approved / conditional portfolio range", "Specific market questions", "Comparable information fields", "Supplier categories and screening logic", "Disclosure level and contact protocol"], "Control conditions", ["Named owner and reviewer", "First small-universe MVP", "Record and source rules", "Stop / red-flag triggers", "Review date and expansion decision"], { top: 185, height: 360, leftColor: C.teal, rightColor: C.amber, fontSize: 18 });
  addText(s, "If any element is missing, label the activity conditional — do not treat silence as approval.", 100, 575, 1080, 48, { fontSize: 21, bold: true, color: C.red, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Decision: approve, approve with conditions, defer with owner/date, or re-scope G5.");

  s = p.slides.add(); s.background.fill = C.white;
  addHeader(s, "Close alignment with decisions, owners and dates — not a longer action list", 8, "CLIENT DECISIONS");
  addRows(s, [
    ["Boundary / gap", "Approve or condition G3", "Sustainability / decision body TBD"],
    ["Portfolio direction", "Approve scenarios and hard constraints", "Steering / Finance / Procurement TBD"],
    ["Market authority", "Approve disclosure level and recipients", "Sponsor / Procurement / Legal TBD"],
    ["Critical path", "Name longest lead-time owner and fallback", "Project Lead + client owner TBD"],
    ["Next review", "Set G5 evidence date and expansion rule", "Decision body TBD"],
  ], 188, [260, 500, 310], ["Topic", "Decision requested", "Accountability hypothesis"]);
  addText(s, "APPROVE · APPROVE WITH CONDITIONS · DEFER WITH OWNER / DATE · RE-SCOPE", 95, 580, 1090, 52, { fontSize: 21, bold: true, color: C.teal, alignment: "center" });
  addFooter(s); s.speakerNotes.textFrame.setText("Within 48 hours update decisions, actions, assumptions, questions and the master schedule; then launch only the authorized 2.x MVP.");

  const finalPath = path.join(workspaceDir, "workstreams", "06_1.6_alignment-roadmap", "Roadmap_Deck.pptx");
  await finalizeDeck(p, finalPath, 8, "roadmap");
}

async function buildBidderBriefing() {
  const p = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  addCover(p, "Comparable proposals require common assumptions and explicit evidence", "Targeted renewable electricity RFQ / RFP | bidder briefing draft", ["UNDERSTAND", "RESPOND", "EVIDENCE", "SUBMIT"], "External-facing structure draft. Actual buyer identity, requirements, dates, contacts and process status are TBD WITH CLIENT and require Procurement / Legal approval.");
  let s=p.slides.add();s.background.fill=C.white;addHeader(s,"Respond to the issued assumptions and expose every dependency",2,"REQUIREMENT BOUNDARY");addTwoColumns(s,"Use the issued basis",["Volume / profile / start range","Common units, currency and base date","Tenor and flexibility definitions","Wheeling / meter boundary","Certificate / claim requirements"],"State every exception",["Alternative assumption","Dependency and owner","Price / timing effect","Evidence status and validity","Requested clarification"],{top:185,height:360,fontSize:18,leftColor:C.teal,rightColor:C.amber});addText(s,"A blank means NOT PROVIDED — never assume zero or acceptance.",130,575,1020,44,{fontSize:22,bold:true,color:C.red,alignment:"center"});addFooter(s,"Bidder briefing draft | Process status and dates TBD WITH CLIENT");s.speakerNotes.textFrame.setText("Question: Which issued assumption cannot be met, and what comparable alternative is proposed?");
  s=p.slides.add();s.background.fill=C.white;addHeader(s,"Separate the contracting entity, route and underlying assets",3,"OFFER ARCHITECTURE");addThreeCards(s,[{title:"Contracting chain",items:["Legal entity and role","Retailer / generator / developer","Parent / guarantor","Authority and conflicts"],color:C.teal},{title:"Commercial route",items:["Offer and route IDs","Electricity / settlement interface","Wheeling / meter responsibilities","Substitution / aggregation"],color:C.blue},{title:"Asset evidence",items:["Asset ID and control","Technology / location band","Maturity / COD / volume","No duplicate allocation"],color:C.navy}],190,330);addText(s,"Company capability is not asset availability; each material claim needs an evidence ID and as-of date.",90,560,1100,46,{fontSize:20,bold:true,color:C.red,alignment:"center"});addFooter(s,"Bidder briefing draft | Process status and dates TBD WITH CLIENT");s.speakerNotes.textFrame.setText("Question: Can the bidder trace every offered MWh and certificate to a controlled / committed supply block?");
  s=p.slides.add();s.background.fill=C.white;addHeader(s,"Price must reconcile from components to an all-in view",4,"PRICING COMPARABILITY");addRows(s,[["Energy / premium","NTD/MWh + base date","Index / escalation"],["Wheeling / service","Separate component","Tariff / pass-through"],["Certificate","Bundled or separate","Vintage / replacement"],["Implementation","One-off NTD","System / meter / setup"],["Credit / security","Explicit cost / assumption","Guarantee / collateral"]],190,[300,380,390],["Component","Required response","Dependency / sensitivity"]);addText(s,"State currency, unit, tax, fees, losses, caps / floors, exclusions, validity and sensitivity.",100,580,1080,42,{fontSize:20,bold:true,color:C.navy,alignment:"center"});addFooter(s,"Bidder briefing draft | Process status and dates TBD WITH CLIENT");s.speakerNotes.textFrame.setText("Question: Can the bidder reconcile its component prices to the submitted all-in example?");
  s=p.slides.add();s.background.fill=C.white;addHeader(s,"Delivery and certificate claims require dated evidence",5,"EXECUTION EVIDENCE");addTwoColumns(s,"Delivery evidence",["COD / start milestones","Volume / profile / allocation","Delay and shortfall treatment","Wheeling / meter prerequisites","Implementation owner / resources"],"Certificate evidence",["Issuance and transfer path","Ownership and timing","No double claim / allocation","Invalid / late replacement","Reconciliation and reporting"],{top:185,height:370,fontSize:18,leftColor:C.blue,rightColor:C.green});addText(s,"Mark evidence: provided now · available in DD · unavailable · not applicable.",100,585,1080,40,{fontSize:21,bold:true,color:C.teal,alignment:"center"});addFooter(s,"Bidder briefing draft | Process status and dates TBD WITH CLIENT");s.speakerNotes.textFrame.setText("Question: Which material evidence will not be available by the response deadline?");
  s=p.slides.add();s.background.fill=C.white;addHeader(s,"One Q&A channel preserves equal information and a clean record",6,"Q&A AND ADDENDA");addThreeCards(s,[{title:"Ask",items:["Use the designated channel","Reference question / assumption ID","Identify confidential context","Meet the stated deadline"],color:C.teal},{title:"Answer",items:["Clarify common assumptions","Separate bidder-specific confidentiality","Do not infer side conversations","Record response owner / date"],color:C.blue},{title:"Amend",items:["Number every addendum","Share material common changes","Require acknowledgement","Preserve original versions"],color:C.navy}],190,330);addText(s,"No side-channel lobbying and no access to another bidder's confidential offer.",110,570,1060,44,{fontSize:21,bold:true,color:C.red,alignment:"center"});addFooter(s,"Bidder briefing draft | Process status and dates TBD WITH CLIENT");s.speakerNotes.textFrame.setText("Question: Does any ambiguity require a common addendum before submission?");
  s=p.slides.add();s.background.fill=C.white;addHeader(s,"Evaluation starts with compliance, then value and due diligence",7,"EVALUATION PATH");const stages=[["1 COMPLIANCE","Mandatory fields · hard constraints",C.gray],["2 VALUE","Normalized commercial · fit · flexibility",C.teal],["3 DD","Project · execution · certificate · credit",C.blue],["4 SHORTLIST","Conditions · fallback · mandate",C.navy]];stages.forEach((v,i)=>{const x=64+i*300;addShape(s,x,245,270,170,v[2]);addText(s,v[0],x+15,265,240,40,{fontSize:19,bold:true,color:C.white,alignment:"center"});addText(s,v[1],x+20,325,230,65,{fontSize:16,color:C.white,alignment:"center"});});addText(s,"The lowest headline price does not guarantee selection; final weights and authority are TBD WITH CLIENT.",85,500,1110,58,{fontSize:21,bold:true,color:C.red,alignment:"center"});addFooter(s,"Bidder briefing draft | Process status and dates TBD WITH CLIENT");s.speakerNotes.textFrame.setText("Question: Does the bidder understand which missing evidence may make an offer conditional or non-compliant?");
  s=p.slides.add();s.background.fill=C.white;addHeader(s,"Submit a complete, traceable response by the approved deadline",8,"SUBMISSION CHECKLIST");addTwoColumns(s,"Before submission",["Profile and authorized contact","Offer / route / asset IDs","Pricing reconciliation","Risk / term deviations","Evidence index and confidentiality","Validity and conflicts"],"Process details — TBD",["Issue / briefing date","Question deadline","Addendum cutoff","Submission deadline + time zone","Approved channel / file naming","Single point of contact"],{top:185,height:370,fontSize:18,leftColor:C.teal,rightColor:C.amber});addText(s,"Actual dates, buyer identity, contacts and legal process terms appear only in the client-approved issued package.",90,585,1100,44,{fontSize:19,bold:true,color:C.red,alignment:"center"});addFooter(s,"Bidder briefing draft | Process status and dates TBD WITH CLIENT");s.speakerNotes.textFrame.setText("Close: restate non-binding / issued-process status and direct all questions to the approved contact.");
  const finalPath=path.join(workspaceDir,"workstreams","11_2.5_targeted-rfq","Bidder_Briefing_Deck.pptx");await finalizeDeck(p,finalPath,8,"bidder_briefing");
}

async function buildDecisionPack() {
  const p=Presentation.create({slideSize:{width:1280,height:720}});
  addCover(p,"A bounded decision is needed before terms or alternatives change","Negotiation decision pack | internal client decision draft",["DELTA","SCENARIOS","RISK","AUTHORITY"],"All counterparties, economics, dates, authorities and recommendations are HYPOTHESIS / TBD WITH CLIENT or SYNTHETIC / DEMO DATA. This pack is not legal advice and does not authorize commitment.");
  let s=p.slides.add();s.background.fill=C.white;addHeader(s,"The demo package has moved, but evidence and protection gaps remain",2,"MATERIAL DELTA ONLY");addRows(s,[["Volume / allocation","Schedule promised; not evidenced","Condition preferred status on dated evidence"],["Delivery / COD","Longstop discussed; remedy open","Counter with remedy ladder and fallback"],["Certificates","Transfer concept improved; replacement open","Require validity, timing and replacement"],["Price / index","Index clearer; cap open","Model bounded pass-through scenarios"]],190,[290,390,390],["Term","Latest demo delta","Decision implication"]);addText(s,"Do not convert discussion language into an agreed term; use the controlled issue tracker and final documents.",90,585,1100,44,{fontSize:19,bold:true,color:C.red,alignment:"center"});addFooter(s,"Internal decision draft | No client-specific facts asserted");s.speakerNotes.textFrame.setText("Decision: confirm which deltas are accepted facts, which are proposals, and which still need written evidence.");
  s=p.slides.add();s.background.fill=C.white;addHeader(s,"Remaining issues differ in value, risk and approval need",3,"OPEN-ISSUE HEATMAP");addRows(s,[["Allocation evidence","HIGH","Coverage / claim integrity","Risk condition or exclusion"],["Delay remedy","HIGH","Bridge cost / start certainty","Commercial + risk authority"],["Certificate replacement","HIGH","RE100 claim validity","Policy + legal + risk authority"],["Price cap","MEDIUM","Budget volatility","Budget authority"]],190,[310,150,330,290],["Issue","Priority","Exposure","Approval / next move"]);addText(s,"Priority is not the same as sequence: resolve the items that control authority and value first.",110,580,1060,42,{fontSize:20,bold:true,color:C.navy,alignment:"center"});addFooter(s,"Internal decision draft | Positions are demo only");s.speakerNotes.textFrame.setText("Decision: assign an owner and authority route to every high-priority open issue.");
  s=p.slides.add();s.background.fill=C.white;addHeader(s,"Three scenarios expose cost, timing and risk trade-offs",4,"SCENARIO COMPARISON");addThreeCards(s,[{title:"PREFERRED",items:["Target terms","No unresolved pass-through","Evidence conditions closed","Value: calculate with client data"],color:C.teal},{title:"COUNTER",items:["Limited bounded movement","Explicit give / get","Cap, remedy and evidence","Authority expires by date"],color:C.blue},{title:"FALLBACK",items:["Retain alternate / bridge","Known trigger and validity","Avoid forced acceptance","Cost and gap quantified"],color:C.navy}],188,350);addText(s,"Workbook values are synthetic. The decision is the acceptable boundary, not the demo number.",100,575,1080,48,{fontSize:20,bold:true,color:C.red,alignment:"center"});addFooter(s,"Internal draft | Finance validation required");s.speakerNotes.textFrame.setText("Decision: select preferred / counter / fallback boundary and name the authorized messenger.");
  s=p.slides.add();s.background.fill=C.white;addHeader(s,"Residual risk acceptance must name the accountable approver",5,"RISK ACCEPTANCE");addTwoColumns(s,"Never imply acceptance",["Unverified allocation","Unremedied delay exposure","Invalid / late certificate risk","Unbounded index or pass-through","Missing document / authority"],"Required record",["Risk event and evidence","Likelihood / impact","Mitigation or condition","Named risk acceptor","Authority evidence + date"],{top:185,height:365,leftColor:C.red,rightColor:C.teal,fontSize:18});addText(s,"Silence, meeting attendance or a model score is not risk acceptance.",120,585,1040,42,{fontSize:21,bold:true,color:C.navy,alignment:"center"});addFooter(s,"Internal decision draft | Legal advice remains separate");s.speakerNotes.textFrame.setText("Decision: accept, mitigate, transfer, avoid or defer each material residual risk.");
  s=p.slides.add();s.background.fill=C.white;addHeader(s,"Advance only with conditions and a signing-readiness path",6,"RECOMMENDATION");addTwoColumns(s,"Conditional recommendation",["Continue / counter — demo only","Keep fallback live","Close high evidence gaps","Bound concessions and expiry","Preserve non-binding status"],"Before G10",["Final document set","Approval and signer authority","Commercial issue closure","CP / obligation owners","System, data and BAU plan"],{top:185,height:370,leftColor:C.teal,rightColor:C.amber,fontSize:18});addText(s,"Possible outcomes: ACCEPT · COUNTER · CONTINUE · FALLBACK · PAUSE · STOP",95,585,1090,42,{fontSize:20,bold:true,color:C.red,alignment:"center"});addFooter(s,"Internal draft | Decision authority TBD");s.speakerNotes.textFrame.setText("Decision: choose the outcome and state every condition, owner and expiry date.");
  s=p.slides.add();s.background.fill=C.white;addHeader(s,"Close with one authorized message, owners and expiry",7,"DECISION RECORD");addRows(s,[["Decision","Accept / counter / continue / fallback / pause / stop","Authorized body — TBD"],["External message","Exact approved position and non-binding caveat","Negotiation lead"],["Conditions","Evidence, clauses, approvals and CPs","Named issue owners"],["Expiry","Offer, mandate and fallback validity","Project Lead"],["Next gate","G10 signing readiness evidence","Legal / Procurement / Implementation"]],188,[260,540,310],["Record field","Required content","Accountability"]);addText(s,"Update the decision log, position tracker, issue tracker and controlled document set within 48 hours.",95,585,1090,44,{fontSize:19,bold:true,color:C.teal,alignment:"center"});addFooter(s,"Internal decision draft | Decision/date remain TBD WITH CLIENT");s.speakerNotes.textFrame.setText("Final decision: record the chosen path, authority evidence, authorized message, owners, dates and next review.");
  const finalPath=path.join(workspaceDir,"workstreams","16_3.4_negotiation-decision","Negotiation_Decision_Pack.pptx");await finalizeDeck(p,finalPath,7,"negotiation_decision");
}

const target = process.argv[2];
if (target === "kickoff") await buildKickoff();
else if (target === "workshop") await buildWorkshop();
else if (target === "roadmap") await buildRoadmap();
else if (target === "bidder") await buildBidderBriefing();
else if (target === "decision") await buildDecisionPack();
else throw new Error(`Unknown target: ${target}`);
