import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const fontFamily = "Arial";
const navy = "#17365D";
const blue = "#DDEBF7";
const paleBlue = "#EAF2F8";
const paleGray = "#F3F5F7";
const border = "#D9D9D9";
const green = "#E2F0D9";
const amber = "#FFF2CC";
const red = "#FCE4D6";
const gray = "#E7E6E6";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const qaRoot = path.join(repoRoot, "_qa", "xlsx");

function baseSheet(sheet, title, widthCols = 10) {
  sheet.showGridLines = false;
  sheet.getRange(`A1:${columnLetter(widthCols)}1`).format.rowHeight = 8;
  sheet.getRange("A2").values = [[title]];
  sheet.getRange("A2").format.font = { name: fontFamily, size: 14, bold: true, color: "#000000" };
  sheet.getRange(`A3:${columnLetter(widthCols)}3`).format.borders = {
    bottom: { style: "thin", color: navy },
  };
  const used = sheet.getUsedRange();
  if (used) used.format.verticalAlignment = "center";
}

function columnLetter(n) {
  let s = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function writeTable(sheet, startRow, headers, rows, tableName, widths = []) {
  const startCol = 1;
  const endCol = headers.length;
  const endRow = startRow + rows.length;
  const matrix = [headers, ...rows];
  sheet.getRangeByIndexes(startRow - 1, startCol - 1, matrix.length, endCol).values = matrix;
  const headerRange = sheet.getRange(`${columnLetter(startCol)}${startRow}:${columnLetter(endCol)}${startRow}`);
  headerRange.format = {
    fill: navy,
    font: { name: fontFamily, size: 10, bold: true, color: "#FFFFFF" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "all", style: "thin", color: "#FFFFFF" },
  };
  const bodyRange = sheet.getRange(`${columnLetter(startCol)}${startRow + 1}:${columnLetter(endCol)}${Math.max(endRow, startRow + 1)}`);
  bodyRange.format.font = { name: fontFamily, size: 10, color: "#000000" };
  bodyRange.format.verticalAlignment = "center";
  bodyRange.format.wrapText = true;
  bodyRange.format.borders = { preset: "all", style: "thin", color: border };
  rows.forEach((_, idx) => {
    if (idx % 2 === 1) {
      sheet.getRange(`${columnLetter(startCol)}${startRow + 1 + idx}:${columnLetter(endCol)}${startRow + 1 + idx}`).format.fill = paleBlue;
    }
  });
  widths.forEach((w, idx) => {
    sheet.getRange(`${columnLetter(idx + 1)}:${columnLetter(idx + 1)}`).format.columnWidth = w;
  });
  const table = sheet.tables.add(`${columnLetter(startCol)}${startRow}:${columnLetter(endCol)}${endRow}`, true, tableName);
  table.style = "TableStyleMedium2";
  table.showFilterButton = true;
  sheet.freezePanes.freezeRows(startRow);
  return { table, endRow };
}

function addStatusValidation(sheet, range) {
  sheet.getRange(range).dataValidation = {
    rule: { type: "list", values: ["Not Started", "In Progress", "Draft Complete", "QA Pending", "QA Pass", "Blocked", "Open", "Closed", "Complete", "Deferred"] },
  };
  const r = sheet.getRange(range);
  r.conditionalFormats.add("containsText", { text: "Blocked", format: { fill: red, font: { color: "#9C0006", bold: true } } });
  r.conditionalFormats.add("containsText", { text: "Amber", format: { fill: amber, font: { color: "#9C6500", bold: true } } });
  r.conditionalFormats.add("containsText", { text: "QA Pass", format: { fill: green, font: { color: "#006100", bold: true } } });
  r.conditionalFormats.add("containsText", { text: "Complete", format: { fill: green, font: { color: "#006100" } } });
  r.conditionalFormats.add("containsText", { text: "Closed", format: { fill: gray, font: { color: "#666666" } } });
}

function addRagValidation(sheet, range) {
  sheet.getRange(range).dataValidation = { rule: { type: "list", values: ["Green", "Amber", "Red", "Gray"] } };
  const r = sheet.getRange(range);
  r.conditionalFormats.add("containsText", { text: "Green", format: { fill: green, font: { color: "#006100", bold: true } } });
  r.conditionalFormats.add("containsText", { text: "Amber", format: { fill: amber, font: { color: "#9C6500", bold: true } } });
  r.conditionalFormats.add("containsText", { text: "Red", format: { fill: red, font: { color: "#9C0006", bold: true } } });
  r.conditionalFormats.add("containsText", { text: "Gray", format: { fill: gray, font: { color: "#666666" } } });
}

async function buildProjectControl() {
  const workbook = Workbook.create();
  const sheetNames = ["Status", "Minutes", "Actions", "Risks", "Issues", "Decisions", "Assumptions", "Changes", "Sources", "Stakeholders", "Client Questions", "Deliverables", "Schedule"];
  const sheets = Object.fromEntries(sheetNames.map((name) => [name, workbook.worksheets.add(name)]));

  const status = sheets.Status;
  baseSheet(status, "AMAT project status and decisions", 9);
  status.tabColor = navy;
  status.getRange("A4:B9").values = [
    ["Status as of", new Date("2026-09-27")],
    ["Overall status", "Gray"],
    ["Open actions", null],
    ["Open risks", null],
    ["Open issues", null],
    ["Deliverables QA Pass", null],
  ];
  status.getRange("A4:A9").format = { fill: paleGray, font: { name: fontFamily, size: 10, bold: true } };
  status.getRange("B4:B9").format.font = { name: fontFamily, size: 10 };
  status.getRange("B4").format.numberFormat = "yyyy-mm-dd";
  status.getRange("B6").formulas = [["=COUNTIFS(Actions!$F$5:$F$204,\"<>Complete\",Actions!$A$5:$A$204,\"<>\")"]];
  status.getRange("B7").formulas = [["=COUNTIFS(Risks!$J$5:$J$204,\"<>Closed\",Risks!$A$5:$A$204,\"<>\")"]];
  status.getRange("B8").formulas = [["=COUNTIFS(Issues!$H$5:$H$204,\"<>Closed\",Issues!$A$5:$A$204,\"<>\")"]];
  status.getRange("B9").formulas = [["=COUNTIFS(Deliverables!$I$5:$I$204,\"QA Pass\")"]];
  addRagValidation(status, "B5");
  writeTable(status, 11,
    ["Decision / gate", "Evidence required", "Owner", "Needed by", "Status", "Next action"],
    [
      ["G0 Kickoff alignment", "Charter, RACI, ways of working, first data request", "TBD WITH CLIENT", null, "Not Started", "Validate sponsor, decision rights and scope"],
      ["G1 Data readiness", "Data tracker, dictionary, quality review and approved assumptions", "TBD WITH CLIENT", null, "Not Started", "Assign data owners and transfer route"],
      ["G2 Shared market understanding", "Workshop decisions, questions and actions", "TBD WITH CLIENT", null, "Not Started", "Confirm audience and learning objectives"],
      ["G3 Baseline accepted", "Gap model, quality flags and management summary", "TBD WITH CLIENT", null, "Not Started", "Confirm reporting boundary and target definition"],
    ], "StatusGateTable", [22, 34, 20, 14, 14, 36]);
  addStatusValidation(status, "E12:E15");
  writeTable(status, 18,
    ["ID", "Top risk / issue", "Impact", "Response / containment", "Owner", "Next check", "RAG"],
    [
      ["R-001", "Decision rights may remain unclear after kickoff", "Approval delay and rework", "Validate sponsor, decision body and gate owners in 1.1", "Project Lead", null, "Amber"],
      ["R-002", "Site and consumption data may not support intended analysis grain", "Gap and scenario precision may be limited", "Profile completeness early and agree assumption policy", "Data Lead", null, "Amber"],
      ["R-003", "Market disclosure authority is not yet defined", "Outreach may expose client information or reduce response quality", "Obtain written disclosure boundary before 2.2", "Project Lead", null, "Amber"],
    ], "StatusRiskTable", [12, 34, 28, 38, 18, 14, 10]);
  addRagValidation(status, "G19:G21");
  status.getRange("A:Z").format.font = { name: fontFamily, size: 10 };
  status.getRange("A:A").format.columnWidth = 22;
  status.getRange("B:B").format.columnWidth = 18;

  baseSheet(sheets.Minutes, "Meeting minutes register", 10);
  writeTable(sheets.Minutes, 4,
    ["Meeting ID", "Date", "Title", "Participants / roles", "Objective", "Conclusion", "Decision IDs", "Action IDs", "Note owner", "Status"],
    [["MTG-DEMO-001", new Date("2026-10-01"), "SYNTHETIC kickoff preparation example", "Project Lead; Sustainability owner", "Confirm success definition and first data request", "Demo only. Replace after client meeting.", "D-DEMO-001", "ACT-DEMO-001", "PMO", "Not Started"]],
    "MinutesTable", [16, 13, 28, 30, 34, 40, 18, 18, 18, 14]);
  sheets.Minutes.getRange("B5:B5").format.numberFormat = "yyyy-mm-dd";
  addStatusValidation(sheets.Minutes, "J5:J5");

  baseSheet(sheets.Actions, "Action log", 9);
  writeTable(sheets.Actions, 4,
    ["Action ID", "Action", "Workstream", "Owner", "Due date", "Status", "Dependency", "Evidence", "Notes"],
    [
      ["ACT-PRE-001", "Confirm client sponsor, decision body and day-to-day owner", "1.1", "Project Lead", null, "Not Started", "Kickoff scheduling", "", "TBD WITH CLIENT"],
      ["ACT-PRE-002", "Confirm approved file transfer and AI / SaaS rules", "1.1 / Shared", "Project Lead", null, "Not Started", "Client security contact", "", "TBD WITH CLIENT"],
      ["ACT-PRE-003", "Approve information disclosure boundary before supplier outreach", "2.2", "Project Lead", null, "Not Started", "AMAT Procurement / Legal", "", "TBD WITH CLIENT"],
    ], "ActionsTable", [16, 42, 14, 20, 14, 16, 28, 28, 24]);
  sheets.Actions.getRange("E5:E7").format.numberFormat = "yyyy-mm-dd";
  addStatusValidation(sheets.Actions, "F5:F7");

  baseSheet(sheets.Risks, "Risk log", 10);
  writeTable(sheets.Risks, 4,
    ["Risk ID", "Cause", "Risk event", "Impact", "Likelihood", "Impact level", "Rating", "Response", "Owner", "Status"],
    [
      ["R-001", "Decision roles are not confirmed", "Approvals stall or feedback conflicts", "Delay and rework", "Medium", "High", "High", "Validate RACI and gate owners in 1.1", "Project Lead", "Open"],
      ["R-002", "Client data grain and quality are unknown", "Baseline cannot support requested analysis", "Reduced precision or scope change", "Medium", "High", "High", "Use 1.2 quality review and agreed assumption policy", "Data Lead", "Open"],
      ["R-003", "Disclosure authority is not documented", "Market outreach shares too much or too little", "Confidentiality or market response risk", "Medium", "High", "High", "Approve disclosure ladder before 2.2", "Project Lead", "Open"],
    ], "RisksTable", [14, 30, 32, 28, 13, 13, 12, 40, 20, 12]);
  addStatusValidation(sheets.Risks, "J5:J7");

  baseSheet(sheets.Issues, "Issue log", 8);
  writeTable(sheets.Issues, 4,
    ["Issue ID", "Fact pattern", "Impact", "Containment", "Resolution plan", "Owner", "Target date", "Status"],
    [["I-DEMO-001", "SYNTHETIC / DEMO DATA: required consumption file arrives without meter IDs", "Cannot reconcile site baseline", "Pause model refresh and preserve raw file", "Request mapping table and validate duplicates", "Data Lead", null, "Deferred"]],
    "IssuesTable", [14, 40, 30, 34, 38, 18, 14, 14]);
  sheets.Issues.getRange("G5:G5").format.numberFormat = "yyyy-mm-dd";
  addStatusValidation(sheets.Issues, "H5:H5");

  baseSheet(sheets.Decisions, "Decision log", 9);
  writeTable(sheets.Decisions, 4,
    ["Decision ID", "Date", "Decision", "Decision maker", "Options considered", "Rationale", "Conditions", "Affected artifacts", "Status"],
    [["D-ARCH-001", new Date("2026-09-27"), "Use a document-first, gate-based delivery architecture for repository v0.1", "Optimum pre-delivery build", "Deck-heavy; document-first; minimal placeholders", "Supports concise client decisions and reusable internal method", "Client-specific expectations remain TBD WITH CLIENT", "Master Blueprint; Architecture", "Complete"]],
    "DecisionsTable", [16, 13, 40, 24, 34, 38, 36, 34, 14]);
  sheets.Decisions.getRange("B5:B5").format.numberFormat = "yyyy-mm-dd";
  addStatusValidation(sheets.Decisions, "I5:I5");

  baseSheet(sheets.Assumptions, "Assumption log", 9);
  writeTable(sheets.Assumptions, 4,
    ["Assumption ID", "Statement", "Basis", "Affected output", "Impact if wrong", "Validation method", "Owner", "Review date", "Status"],
    [
      ["A-001", "Core stakeholders may include Taiwan sustainability, Procurement, Facilities, Finance, Legal and regional / global owners", "HYPOTHESIS based on typical enterprise procurement governance", "1.1; 1.3; 1.6", "Wrong audience or approval path", "Validate stakeholder map at kickoff", "Project Lead", null, "Open"],
      ["A-002", "Annual residual gap is the first planning basis; finer granularity depends on data availability", "HYPOTHESIS for pre-delivery model design", "1.4; 1.5", "Model may require redesign", "Review data grain in 1.2", "Data Lead", null, "Open"],
    ], "AssumptionsTable", [16, 46, 36, 22, 32, 34, 18, 14, 14]);
  sheets.Assumptions.getRange("H5:H6").format.numberFormat = "yyyy-mm-dd";
  addStatusValidation(sheets.Assumptions, "I5:I6");

  baseSheet(sheets.Changes, "Scope and change log", 9);
  writeTable(sheets.Changes, 4,
    ["Change ID", "Date raised", "Request", "Requester", "Scope / time / quality impact", "Recommendation", "Decision", "Decision date", "Status"],
    [["CHG-DEMO-001", new Date("2026-10-10"), "SYNTHETIC / DEMO DATA: add hourly matching analysis", "Client stakeholder", "Requires interval data and added model scope", "Assess data availability before acceptance", "No decision. Demo only.", null, "Deferred"]],
    "ChangesTable", [16, 14, 38, 20, 38, 34, 30, 14, 14]);
  sheets.Changes.getRange("B5:B5").format.numberFormat = "yyyy-mm-dd";
  sheets.Changes.getRange("H5:H5").format.numberFormat = "yyyy-mm-dd";
  addStatusValidation(sheets.Changes, "I5:I5");

  baseSheet(sheets.Sources, "Source log", 11);
  writeTable(sheets.Sources, 4,
    ["Source ID", "Type", "Title / description", "Publisher / owner", "Publication date", "Location / URL", "Access date", "Reliability", "Scope / limitations", "Used in", "Status"],
    [["SRC-001", "Internal brief", "User-provided AMAT pre-delivery repository brief", "Project requester", new Date("2026-09-27"), "Project request", new Date("2026-09-27"), "Primary task definition", "Does not confirm AMAT-specific facts", "Repository architecture and acceptance criteria", "Active"]],
    "SourcesTable", [14, 16, 40, 24, 14, 34, 14, 22, 42, 34, 14]);
  sheets.Sources.getRange("E5:E5").format.numberFormat = "yyyy-mm-dd";
  sheets.Sources.getRange("G5:G5").format.numberFormat = "yyyy-mm-dd";

  baseSheet(sheets.Stakeholders, "Stakeholder map", 10);
  writeTable(sheets.Stakeholders, 4,
    ["Stakeholder ID", "Role hypothesis", "Function", "Influence", "Interest", "Decision role", "Information need", "Engagement plan", "Status label", "Validation status"],
    [
      ["STK-001", "Taiwan sustainability / RE100 owner", "Sustainability", "High", "High", "Baseline / roadmap owner", "Gap, options, reporting implications", "Kickoff interview and workshop", "HYPOTHESIS", "TBD WITH CLIENT"],
      ["STK-002", "Procurement", "Procurement", "High", "High", "Market process and commercial approval", "Supplier universe, process, terms", "Kickoff interview; 2.x governance", "HYPOTHESIS", "TBD WITH CLIENT"],
      ["STK-003", "Facilities / site energy owners", "Operations", "Medium", "High", "Data and implementation owner", "Meters, load, wheeling and operational needs", "Data interview and workshop", "HYPOTHESIS", "TBD WITH CLIENT"],
      ["STK-004", "Finance", "Finance", "High", "Medium", "Budget / risk / approval", "Cost, settlement, credit and accounting", "Scenario and decision reviews", "HYPOTHESIS", "TBD WITH CLIENT"],
      ["STK-005", "Legal", "Legal", "High", "Medium", "Legal advice and contract approval", "NDA, risk allocation, contracting", "Boundary review; 3.x", "HYPOTHESIS", "TBD WITH CLIENT"],
      ["STK-006", "Regional / global sustainability and procurement", "Regional / Global", "High", "Medium", "Policy and final alignment", "RE100 policy, global approvals, portfolio fit", "Targeted interviews and gates", "HYPOTHESIS", "TBD WITH CLIENT"],
    ], "StakeholdersTable", [16, 34, 20, 12, 12, 28, 36, 34, 16, 18]);

  baseSheet(sheets["Client Questions"], "Client question log", 8);
  writeTable(sheets["Client Questions"], 4,
    ["Question ID", "Question", "Why needed", "Answer owner", "Needed by", "Status", "Answer / evidence", "Affected workstreams"],
    [
      ["Q-001", "Who is the sponsor, day-to-day owner and decision body for each gate?", "RACI, cadence and approvals", "TBD WITH CLIENT", "Kickoff", "Open", "", "1.1; all"],
      ["Q-002", "What sites, meters, periods and data grain define the analysis boundary?", "Baseline and model design", "Facilities / data owner", "Before G1", "Open", "", "1.2; 1.4; 1.5"],
      ["Q-003", "How does AMAT define eligible renewable procurement and target years for this project?", "Residual gap and option eligibility", "Sustainability / RE100 owner", "Before G3", "Open", "", "1.4; 1.5; 2.x"],
      ["Q-004", "What client identity and volume information may Optimum disclose at each market stage?", "Confidentiality and response quality", "Sponsor / Procurement / Legal", "Before 2.2", "Open", "", "2.1; 2.2; 2.5"],
      ["Q-005", "Which legal counsel provides formal legal advice and who owns contract redlines?", "Commercial / legal interface", "AMAT Legal", "Before 3.2", "Open", "", "3.2–3.5"],
    ], "ClientQuestionsTable", [16, 48, 34, 24, 14, 14, 38, 24]);
  addStatusValidation(sheets["Client Questions"], "F5:F9");

  baseSheet(sheets.Deliverables, "Deliverable register", 11);
  const deliverableRows = [
    ["DEL-ARCH", "Architecture", "Acceptance criteria, architecture and master blueprint", "Founder / Project Lead", "Repository author", "Project Lead", null, "v0.1", "QA Pass", "Architecture QA", "Root / shared"],
    ["DEL-SHARED", "Shared", "Project controls, confidentiality and market conduct", "Project team", "Repository author", "Project Lead", null, "v0.1", "In Progress", "Shared QA", "shared"],
    ["DEL-TRAIN", "Training", "New hire guide and task brief", "New hires / reviewers", "Repository author", "Project Lead", null, "v0.1", "In Progress", "Training usability QA", "training"],
  ];
  const workstreamNames = ["1.1 Kickoff", "1.2 Data requirements", "1.3 Taiwan market workshop", "1.4 RE100 gap analysis", "1.5 Portfolio scenario analysis", "1.6 Alignment roadmap", "2.1 Market scan", "2.2 Market engagement", "2.3 Short-term procurement", "2.4 Long-term procurement", "2.5 Targeted RFQ", "2.6 Evaluation and DD", "3.1 Commercial alignment", "3.2 Contract review", "3.3 Negotiation round 1", "3.4 Negotiation decision", "3.5 Signing readiness", "3.6 Execution tracking"];
  workstreamNames.forEach((name, idx) => deliverableRows.push([`DEL-${String(idx + 1).padStart(2, "0")}`, name.split(" ")[0], name, "TBD WITH CLIENT", "TBD WITH OPTIMUM", "Project Lead", null, "v0.1", "Not Started", "Workstream Definition of Done", `workstreams/${String(idx + 1).padStart(2, "0")}`]));
  writeTable(sheets.Deliverables, 4,
    ["Deliverable ID", "Workstream", "Artifact / package", "Audience", "Owner", "Reviewer", "Due date", "Version", "Status", "Acceptance basis", "Location"],
    deliverableRows, "DeliverablesTable", [16, 16, 42, 28, 22, 20, 14, 12, 16, 32, 26]);
  sheets.Deliverables.getRange("G5:G25").format.numberFormat = "yyyy-mm-dd";
  addStatusValidation(sheets.Deliverables, "I5:I25");

  baseSheet(sheets.Schedule, "Master schedule and decision gates", 10);
  const gates = [
    ["M-G0", "1.1", "G0 Kickoff alignment", "Project Lead", null, null, "", "G0", "Charter and governance accepted", "Not Started"],
    ["M-G1", "1.2", "G1 Data readiness", "Data Lead", null, null, "M-G0", "G1", "Data quality and assumption policy accepted", "Not Started"],
    ["M-G2", "1.3", "G2 Shared market understanding", "Project Lead", null, null, "M-G0", "G2", "Workshop learnings and actions accepted", "Not Started"],
    ["M-G3", "1.4", "G3 Baseline accepted", "Client RE100 owner", null, null, "M-G1; M-G2", "G3", "Residual gap and quality flags accepted", "Not Started"],
    ["M-G4", "1.5", "G4 Portfolio direction", "Steering group", null, null, "M-G3", "G4", "Portfolio direction selected", "Not Started"],
    ["M-G5", "1.6", "G5 Market engagement authority", "Sponsor / Procurement / Legal", null, null, "M-G4", "G5", "Roadmap and disclosure boundary approved", "Not Started"],
    ["M-G6", "2.5", "G6 RFQ launch", "Procurement", null, null, "M-G5", "G6", "Bidder list, package and evaluation rules approved", "Not Started"],
    ["M-G7", "2.6", "G7 Shortlist", "Decision body", null, null, "M-G6", "G7", "Shortlist and open DD approved", "Not Started"],
    ["M-G8", "3.1", "G8 Negotiation mandate", "Authorized decision makers", null, null, "M-G7", "G8", "Objectives and authority approved", "Not Started"],
    ["M-G9", "3.4", "G9 Preferred terms", "Approval body", null, null, "M-G8", "G9", "Residual risks and terms accepted", "Not Started"],
    ["M-G10", "3.5", "G10 Signing readiness", "Contract owner", null, null, "M-G9", "G10", "Signing and implementation readiness confirmed", "Not Started"],
    ["M-G11", "3.6", "G11 BAU transition", "Operations owner", null, null, "M-G10", "G11", "Governance and BAU handover accepted", "Not Started"],
  ];
  writeTable(sheets.Schedule, 4,
    ["Milestone ID", "Workstream", "Milestone", "Owner", "Start", "Finish", "Predecessor", "Gate", "Exit evidence", "Status"],
    gates, "ScheduleTable", [16, 14, 34, 26, 14, 14, 20, 10, 42, 16]);
  sheets.Schedule.getRange("E5:F16").format.numberFormat = "yyyy-mm-dd";
  addStatusValidation(sheets.Schedule, "J5:J16");

  for (const name of sheetNames) {
    const s = sheets[name];
    const used = s.getUsedRange();
    if (used) {
      used.format.font = { name: fontFamily, size: 10 };
      used.format.verticalAlignment = "center";
      used.format.autofitRows();
    }
  }

  workbook.recalculate();
  const inspect = await workbook.inspect({ kind: "table", range: "Status!A1:I24", include: "values,formulas", tableMaxRows: 30, tableMaxCols: 12, maxChars: 12000 });
  console.log(inspect.ndjson);
  const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!", options: { useRegex: true, maxResults: 100 }, summary: "project control formula error scan" });
  console.log(errors.ndjson);

  await fs.mkdir(path.join(qaRoot, "project_control"), { recursive: true });
  for (const name of sheetNames) {
    const preview = await workbook.render({ sheetName: name, autoCrop: "all", scale: 1.25, format: "png" });
    await fs.writeFile(path.join(qaRoot, "project_control", `${name.replaceAll(" ", "_")}.png`), new Uint8Array(await preview.arrayBuffer()));
  }
  const output = await SpreadsheetFile.exportXlsx(workbook);
  await output.save(path.join(repoRoot, "shared", "Project_Control_Register.xlsx"));
  console.log("BUILT shared/Project_Control_Register.xlsx");
}

async function saveWorkbookWithQa(workbook, outputPath, qaFolder, sheetNames, inspectRange) {
  workbook.recalculate();
  if (inspectRange) {
    const inspect = await workbook.inspect({ kind: "table", range: inspectRange, include: "values,formulas", tableMaxRows: 40, tableMaxCols: 18, maxChars: 16000 });
    console.log(inspect.ndjson);
  }
  const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!", options: { useRegex: true, maxResults: 100 }, summary: "formula error scan" });
  console.log(errors.ndjson);
  const qaDir = path.join(qaRoot, qaFolder);
  await fs.mkdir(qaDir, { recursive: true });
  for (const name of sheetNames) {
    const preview = await workbook.render({ sheetName: name, autoCrop: "all", scale: 1.2, format: "png" });
    await fs.writeFile(path.join(qaDir, `${name.replaceAll(" ", "_")}.png`), new Uint8Array(await preview.arrayBuffer()));
  }
  const output = await SpreadsheetFile.exportXlsx(workbook);
  await output.save(outputPath);
  console.log(`BUILT ${path.relative(repoRoot, outputPath).replaceAll("\\", "/")}`);
}

async function buildDataRequestTracker() {
  const workbook = Workbook.create();
  const sheetNames = ["Instructions", "Request Log", "Completeness", "Data Gap Log", "Interview Plan"];
  const sheets = Object.fromEntries(sheetNames.map((name) => [name, workbook.worksheets.add(name)]));

  const instructions = sheets.Instructions;
  baseSheet(instructions, "Data request tracker — instructions and status rules", 6);
  instructions.getRange("A4:F4").values = [["Rule", "Required practice", "Truth status", "Classification", "Status", "Decision effect"]];
  instructions.getRange("A5:F9").values = [
    ["One row per request", "Keep request ID stable; link every file and gap to it", "KNOWN / HYPOTHESIS / TBD / SYNTHETIC / RESEARCH REQUIRED", "Public / Internal / Client Confidential / Highly Restricted", "Requested / In Progress / Received / Accepted / Superseded / Not Available", "Shows whether G1 can proceed"],
    ["Minimum necessary", "Request only fields used by a named decision or model", "TBD if client-specific", "Use higher level when unsure", "Requested", "Avoids excess confidentiality exposure"],
    ["Raw versus working", "Never overwrite the client source; record version and transform", "KNOWN method", "Client Confidential by default", "Received", "Preserves lineage"],
    ["Quality", "Use Pass / Pass with condition / Fail / Not tested", "Threshold TBD WITH CLIENT", "Same as source", "Accepted only after review", "Controls assumptions and caveats"],
    ["Demo rows", "All seeded examples are fictional and must be replaced or retained as demo", "SYNTHETIC / DEMO DATA", "Internal", "Demo", "Not client evidence"],
  ];
  instructions.getRange("A4:F4").format = { fill: navy, font: { name: fontFamily, size: 10, bold: true, color: "#FFFFFF" }, wrapText: true, borders: { preset: "all", style: "thin", color: "#FFFFFF" } };
  instructions.getRange("A5:F9").format = { font: { name: fontFamily, size: 10 }, wrapText: true, borders: { preset: "all", style: "thin", color: border } };
  [26, 48, 34, 34, 34, 38].forEach((w, i) => instructions.getRange(`${columnLetter(i + 1)}:${columnLetter(i + 1)}`).format.columnWidth = w);
  instructions.getRange("A4:F9").format.autofitRows();

  const requestRows = [
    ["DR-DEMO-001", "Site / meter", "SYNTHETIC site and meter master", "site_id; meter_id; valid_from; valid_to; included_flag", "meter", "current + history", "Client Confidential", "Define denominator and prevent duplicate mapping", "Facilities data owner — TBD", null, "Requested", "Not tested", "1.4; 1.5; 3.6", "Demo only"],
    ["DR-DEMO-002", "Consumption", "SYNTHETIC monthly consumption", "site_id; period_start; period_end; mwh; actual_estimate; gross_net", "site-month", "36 months", "Client Confidential", "Baseline and seasonality", "Facilities data owner — TBD", null, "Received", "Pass with condition", "1.4; 1.5", "One demo period intentionally missing"],
    ["DR-DEMO-003", "Forecast", "SYNTHETIC demand forecast", "site_id; year; scenario; mwh; version; owner", "site-year-scenario", "target horizon", "Client Confidential", "Target-year gap and sensitivity", "Finance / Facilities — TBD", null, "In Progress", "Not tested", "1.4; 1.5; 1.6", "Demo only"],
    ["DR-DEMO-004", "Target / policy", "Target boundary and eligible instrument policy", "boundary; target_year; target_pct; eligibility; evidence_owner", "policy version", "target horizon", "Client Confidential", "Numerator / denominator and option eligibility", "Sustainability owner — TBD", null, "Requested", "Not tested", "1.4; 1.5; 1.6", "TBD WITH CLIENT"],
    ["DR-DEMO-005", "Existing procurement", "SYNTHETIC contract / certificate summary", "instrument_id; start; end; mwh; technology; allocation; certificate_treatment", "instrument-year-site", "contract life", "Highly Restricted", "Existing coverage and expiry", "Procurement — TBD", null, "Requested", "Not tested", "1.4; 1.5; 3.x", "Need-to-know"],
    ["DR-DEMO-006", "Commercial", "SYNTHETIC electricity cost components", "site_id; period; component; amount; currency; unit", "site-month-component", "24 months", "Highly Restricted", "Cost baseline and scenario comparison", "Finance — TBD", null, "Not Available", "Not tested", "1.5; 3.1", "Assess range / re-scope"],
  ];
  baseSheet(sheets["Request Log"], "Data request log", 14);
  writeTable(sheets["Request Log"], 4,
    ["Request ID", "Category", "File / data", "Required fields", "Grain", "Period", "Classification", "Purpose / decision use", "Owner", "Due date", "Status", "Quality status", "Downstream use", "Notes"],
    requestRows, "DataRequestTable", [16, 20, 38, 58, 24, 20, 22, 42, 28, 14, 18, 22, 24, 30]);
  sheets["Request Log"].getRange("J5:J10").format.numberFormat = "yyyy-mm-dd";
  sheets["Request Log"].getRange("K5:K10").dataValidation = { rule: { type: "list", values: ["Requested", "In Progress", "Received", "Accepted", "Superseded", "Not Available"] } };
  sheets["Request Log"].getRange("L5:L10").dataValidation = { rule: { type: "list", values: ["Pass", "Pass with condition", "Fail", "Not tested"] } };

  const comp = sheets.Completeness;
  baseSheet(comp, "Data completeness and G1 readiness", 10);
  comp.getRange("A4:B7").values = [["Metric", "Value"], ["Total requests", null], ["Received / accepted", null], ["Completion ratio", null]];
  comp.getRange("A4:B4").format = { fill: navy, font: { name: fontFamily, size: 10, bold: true, color: "#FFFFFF" }, borders: { preset: "all", style: "thin", color: "#FFFFFF" } };
  comp.getRange("A5:A7").format = { fill: paleGray, font: { name: fontFamily, size: 10, bold: true }, borders: { preset: "all", style: "thin", color: border } };
  comp.getRange("B5:B7").format = { font: { name: fontFamily, size: 10 }, borders: { preset: "all", style: "thin", color: border } };
  comp.getRange("B5").formulas = [["=COUNTA('Request Log'!$A$5:$A$10)"]];
  comp.getRange("B6").formulas = [["=COUNTIF('Request Log'!$K$5:$K$10,\"Received\")+COUNTIF('Request Log'!$K$5:$K$10,\"Accepted\")"]];
  comp.getRange("B7").formulas = [["=IF(B5=0,0,B6/B5)"]];
  comp.getRange("B7").format.numberFormat = "0%";
  comp.getRange("A:A").format.columnWidth = 26; comp.getRange("B:B").format.columnWidth = 18;
  const categories = ["Site / meter", "Consumption", "Forecast", "Target / policy", "Existing procurement", "Commercial"];
  const mat = ["Critical", "Critical", "High", "Critical", "Critical", "Medium"];
  const treatments = ["Resolve mapping before baseline", "Quantify missing periods; range if minor", "Use approved scenario range", "Cannot proceed without owner-approved definition", "Separate contracted / expected / eligible", "Use component range or re-scope cost output"];
  const rows = categories.map((cat, i) => [cat, null, null, null, mat[i], treatments[i], i < 5 ? "Condition G1 until resolved / approved" : "Condition cost comparison only", "SYNTHETIC / DEMO DATA"]);
  writeTable(comp, 10, ["Category", "Requests", "Received / accepted", "Coverage", "Materiality", "Default treatment", "G1 implication", "Truth status"], rows, "CompletenessTable", [22, 12, 18, 14, 14, 42, 40, 24]);
  rows.forEach((_, idx) => {
    const r = 11 + idx;
    comp.getRange(`B${r}`).formulas = [[`=COUNTIF('Request Log'!$B$5:$B$10,A${r})`]];
    comp.getRange(`C${r}`).formulas = [[`=COUNTIFS('Request Log'!$B$5:$B$10,A${r},'Request Log'!$K$5:$K$10,\"Received\")+COUNTIFS('Request Log'!$B$5:$B$10,A${r},'Request Log'!$K$5:$K$10,\"Accepted\")`]];
    comp.getRange(`D${r}`).formulas = [[`=IF(B${r}=0,0,C${r}/B${r})`]];
    comp.getRange(`D${r}`).format.numberFormat = "0%";
  });

  baseSheet(sheets["Data Gap Log"], "Data gap and assumption treatment log", 11);
  writeTable(sheets["Data Gap Log"], 4,
    ["Gap ID", "Request ID", "Gap / quality issue", "Affected period / rows", "Decision impact", "Impact range", "Treatment", "Approval owner", "Due date", "Status", "Affected outputs"],
    [
      ["GAP-DEMO-001", "DR-DEMO-002", "SYNTHETIC one site-month is missing", "Site-D / 2025-02", "May understate baseline", "0–120 MWh demo range", "Use range pending source extract", "Facilities owner — TBD", null, "Open", "1.4; 1.5"],
      ["GAP-DEMO-002", "DR-DEMO-004", "Target eligibility definition not yet supplied", "All target years", "Could change residual gap and option eligibility", "Material / not quantifiable yet", "Resolve; do not assume silently", "Sustainability owner — TBD", null, "Open", "1.4; 1.5; 1.6"],
    ], "DataGapTable", [16, 16, 42, 26, 38, 28, 36, 26, 14, 14, 24]);
  sheets["Data Gap Log"].getRange("I5:I6").format.numberFormat = "yyyy-mm-dd";
  sheets["Data Gap Log"].getRange("J5:J6").dataValidation = { rule: { type: "list", values: ["Open", "In Progress", "Approved assumption", "Closed", "Re-scoped"] } };

  baseSheet(sheets["Interview Plan"], "Stakeholder interview plan", 9);
  writeTable(sheets["Interview Plan"], 4,
    ["Interview ID", "Role hypothesis", "Objective", "Key questions", "Evidence requested", "Optimum owner", "Target date", "Output / decision", "Status"],
    [
      ["INT-DEMO-001", "Taiwan sustainability / RE100 owner", "Confirm target / claim boundary", "What policy version, boundary and evidence define success?", "Policy extract; target table; owner confirmation", "Project Lead", null, "Approved calculation boundary", "Not Started"],
      ["INT-DEMO-002", "Facilities / site data owner", "Confirm consumption lineage and forecast", "What systems, keys, estimates and site changes affect load?", "Site / meter map; reconciliation total; forecast version", "Data Lead", null, "Data-quality treatment", "Not Started"],
      ["INT-DEMO-003", "Procurement / Finance / Legal", "Confirm commercial data, approvals and disclosure", "What cost, approval, NDA and market-contact rules apply?", "Process map; authorization; cost components", "Project Lead", null, "Roadmap / engagement constraints", "Not Started"],
    ], "InterviewPlanTable", [16, 34, 34, 52, 44, 20, 14, 34, 16]);
  sheets["Interview Plan"].getRange("G5:G7").format.numberFormat = "yyyy-mm-dd";
  addStatusValidation(sheets["Interview Plan"], "I5:I7");

  for (const name of sheetNames) {
    const used = sheets[name].getUsedRange();
    if (used) { used.format.font = { name: fontFamily, size: 10 }; used.format.verticalAlignment = "center"; used.format.autofitRows(); }
  }
  await saveWorkbookWithQa(workbook, path.join(repoRoot, "workstreams", "02_1.2_data-requirements", "Data_Request_Tracker.xlsx"), "1.2_data_request_tracker", sheetNames, "Completeness!A1:H16");
}

async function buildDataDictionary() {
  const workbook = Workbook.create();
  const sheetNames = ["Dictionary", "Mapping Demo", "Quality Rules"];
  const sheets = Object.fromEntries(sheetNames.map((name) => [name, workbook.worksheets.add(name)]));
  baseSheet(sheets.Dictionary, "Standard data dictionary", 14);
  const dictionaryRows = [
    ["site_id", "Stable analysis site identifier", "text", "n/a", "site", "Yes", "No", "Unique stable ID", "Client Confidential", "Site master", "1.4;1.5;1.6", "TBD WITH CLIENT", "Do not use name as key", "Active"],
    ["meter_id", "Stable meter / account identifier", "text", "n/a", "meter", "Conditional", "No", "Unique within validity period", "Highly Restricted", "Meter master", "1.4;3.6", "TBD WITH CLIENT", "Pseudonymise outside need-to-know", "Active"],
    ["period_start", "Inclusive period start", "date", "yyyy-mm-dd", "site-period", "Yes", "No", "Valid date", "Client Confidential", "Consumption", "1.4;1.5", "TBD WITH CLIENT", "Timezone / billing cycle documented", "Active"],
    ["period_end", "Exclusive or inclusive period end — must be declared", "date", "yyyy-mm-dd", "site-period", "Yes", "No", "Valid date > start", "Client Confidential", "Consumption", "1.4;1.5", "TBD WITH CLIENT", "Convention TBD", "Active"],
    ["consumption_mwh", "Electricity consumed for defined site and period", "decimal", "MWh", "site-period", "No", "No", ">=0 unless correction explained", "Client Confidential", "Consumption", "1.4;1.5", "TBD WITH CLIENT", "Original unit retained", "Active"],
    ["actual_estimate_flag", "Whether value is actual, estimate or forecast", "enum", "n/a", "site-period", "No", "No", "Actual; Estimate; Forecast", "Client Confidential", "Consumption / forecast", "1.4;1.5", "TBD WITH CLIENT", "Never blend without disclosure", "Active"],
    ["target_pct", "Renewable electricity target ratio for period and boundary", "decimal", "0–1", "boundary-year", "No", "No", "0 to 1", "Client Confidential", "Target policy", "1.4;1.5", "TBD WITH CLIENT", "Formal source required", "Active"],
    ["eligible_procurement_mwh", "Procurement volume accepted under agreed eligibility rule", "decimal", "MWh", "instrument-site-year", "No", "Yes", ">=0; no unexplained overlap", "Highly Restricted", "Contracts / certificates", "1.4;1.5", "TBD WITH CLIENT", "Separate committed / expected / delivered", "Active"],
    ["technology", "Generation technology category", "enum", "n/a", "instrument / asset", "No", "Conditional", "Allowed list TBD", "Client Confidential", "Contract / certificate", "1.5;2.x", "TBD WITH CLIENT", "Map source label", "Active"],
    ["commercial_price", "Price or price component under stated structure", "decimal", "currency/unit", "offer / contract-period", "No", "Yes", "Currency and unit required", "Highly Restricted", "Finance / contract", "1.5;2.x;3.x", "TBD WITH CLIENT", "Do not compare blended values without normalization", "Active"],
  ];
  writeTable(sheets.Dictionary, 4,
    ["Field ID", "Business definition", "Data type", "Unit / format", "Grain", "Primary key", "Nullable", "Allowed / validation", "Classification", "Source hypothesis", "Downstream use", "Truth status", "Notes", "Status"],
    dictionaryRows, "DictionaryTable", [22, 52, 16, 18, 24, 14, 14, 34, 22, 28, 24, 20, 40, 14]);

  baseSheet(sheets["Mapping Demo"], "Synthetic source-to-standard field mapping", 10);
  writeTable(sheets["Mapping Demo"], 4,
    ["Mapping ID", "Source file", "Source field", "Standard field", "Transform rule", "Example raw", "Example mapped", "Exception count", "Reviewer", "Status"],
    [
      ["MAP-DEMO-001", "SYNTHETIC_Load.csv", "PlantCode", "site_id", "Trim; uppercase; lookup stable ID", " p01 ", "P01", 0, "TBD", "Demo"],
      ["MAP-DEMO-002", "SYNTHETIC_Load.csv", "kWh", "consumption_mwh", "Numeric(kWh) / 1000", "125000", 125, 0, "TBD", "Demo"],
      ["MAP-DEMO-003", "SYNTHETIC_Target.csv", "RenewableTarget", "target_pct", "If source is percentage, divide by 100", "50%", 0.5, 0, "TBD", "Demo"],
    ], "MappingDemoTable", [18, 28, 24, 24, 44, 22, 22, 18, 18, 14]);

  baseSheet(sheets["Quality Rules"], "Data quality rule catalogue", 11);
  writeTable(sheets["Quality Rules"], 4,
    ["Rule ID", "Dimension", "Field / dataset", "Test", "Threshold", "Failure action", "Decision impact", "Evidence", "Owner", "Status", "Truth status"],
    [
      ["DQ-001", "Completeness", "site-period consumption", "Every included site has every required period", "TBD WITH CLIENT", "Log gap; request extract; quantify range", "May condition G1", "coverage matrix", "Data Lead", "Not tested", "RESEARCH / CLIENT INPUT REQUIRED"],
      ["DQ-002", "Uniqueness", "site_id + meter_id + period", "No unexplained duplicate key", "0 unexplained duplicates", "Investigate aggregation / duplication", "Could overstate denominator", "duplicate report", "Data Lead", "Not tested", "KNOWN method"],
      ["DQ-003", "Reconciliation", "consumption total", "Tie analysis extract to owner-approved total", "TBD WITH CLIENT", "Explain variance; obtain approval", "May alter gap", "variance report", "Data Lead", "Not tested", "TBD WITH CLIENT"],
      ["DQ-004", "Validity", "target_pct", "Value in 0–1 and supported by formal source", "100%", "Reject / correct", "Could invalidate numerator / denominator", "policy source", "Sustainability owner", "Not tested", "KNOWN method"],
      ["DQ-005", "Lineage", "all decision outputs", "Source ID, version and transform trace exist", "100% material fields", "Do not use as decision evidence", "Evidence quality", "lineage log", "Workstream owner", "Not tested", "KNOWN method"],
    ], "QualityRulesTable", [16, 18, 28, 48, 22, 42, 34, 24, 22, 16, 30]);

  for (const name of sheetNames) {
    const used = sheets[name].getUsedRange();
    if (used) { used.format.font = { name: fontFamily, size: 10 }; used.format.verticalAlignment = "center"; used.format.autofitRows(); }
  }
  await saveWorkbookWithQa(workbook, path.join(repoRoot, "workstreams", "02_1.2_data-requirements", "Data_Dictionary.xlsx"), "1.2_data_dictionary", sheetNames, "Dictionary!A1:N14");
}

async function buildGapAnalysisModel() {
  const workbook = Workbook.create();
  const sheetNames = ["Read Me", "Assumptions", "Site Load", "Existing Procurement", "Gap Analysis", "Sensitivity", "Management Summary"];
  const sheets = Object.fromEntries(sheetNames.map((name) => [name, workbook.worksheets.add(name)]));

  const readme = sheets["Read Me"];
  baseSheet(readme, "RE100 gap analysis model — v0.1", 6);
  readme.getRange("A4:F4").values = [["Rule", "Required practice", "Truth status", "Owner", "Decision effect", "Current v0.1"]];
  readme.getRange("A5:F10").values = [
    ["Demo boundary", "Replace all site, target and procurement rows before client use", "SYNTHETIC / DEMO DATA", "Analysis Lead", "Prevents demo values becoming facts", "Two fictional sites; 2026–2030"],
    ["Target", "Use formal policy source and named owner approval", "TBD WITH CLIENT", "Sustainability owner", "Controls required renewable MWh", "Illustrative curve only"],
    ["Existing coverage", "Separate contracted, expected, delivered, eligible and claimed", "TBD WITH CLIENT", "Procurement / Sustainability", "Controls numerator", "Planning eligible = contracted × factors"],
    ["Data quality", "Record source, version, gaps, reconciliation and disposition", "KNOWN method", "Data Lead", "Determines whether G3 is conditional", "Demo rows marked Pass / condition"],
    ["Sensitivity", "Use client evidence to replace demo factors", "HYPOTHESIS", "Finance / Facilities", "Shows planning range", "+5% load; -10% delivery demo"],
    ["Approval", "Record approve / conditional / reject in decision log", "TBD WITH CLIENT", "G3 decision body", "Authorizes handoff to 1.5", "No client approval yet"],
  ];
  readme.getRange("A4:F4").format = { fill: navy, font: { name: fontFamily, size: 10, bold: true, color: "#FFFFFF" }, wrapText: true, borders: { preset: "all", style: "thin", color: "#FFFFFF" } };
  readme.getRange("A5:F10").format = { font: { name: fontFamily, size: 10 }, wrapText: true, borders: { preset: "all", style: "thin", color: border } };
  [24, 54, 26, 24, 40, 34].forEach((w, i) => readme.getRange(`${columnLetter(i + 1)}:${columnLetter(i + 1)}`).format.columnWidth = w);
  readme.getRange("A12:B17").values = [
    ["Refresh sequence", ""],
    ["1", "Confirm boundary and target owner"],
    ["2", "Replace demo load / procurement rows"],
    ["3", "Recalculate and reconcile totals"],
    ["4", "Review sensitivities and quality conditions"],
    ["5", "Record G3 decision and handoff range to 1.5"],
  ];
  readme.getRange("A12:B12").format = { fill: navy, font: { name: fontFamily, size: 10, bold: true, color: "#FFFFFF" } };
  readme.getRange("A13:B17").format = { borders: { preset: "all", style: "thin", color: border }, wrapText: true };

  const assumptions = sheets.Assumptions;
  baseSheet(assumptions, "Target and model assumptions — all demo values", 8);
  const assumptionRows = [
    [2026, 0.50, 0.00, "Calendar year", "SYNTHETIC / DEMO DATA", "TBD WITH CLIENT", "Open", "Replace with formal policy"],
    [2027, 0.75, 0.03, "Calendar year", "SYNTHETIC / DEMO DATA", "TBD WITH CLIENT", "Open", "Illustrative target step"],
    [2028, 1.00, 0.03, "Calendar year", "SYNTHETIC / DEMO DATA", "TBD WITH CLIENT", "Open", "Illustrative 100% target"],
    [2029, 1.00, 0.03, "Calendar year", "SYNTHETIC / DEMO DATA", "TBD WITH CLIENT", "Open", "Illustrative only"],
    [2030, 1.00, 0.03, "Calendar year", "SYNTHETIC / DEMO DATA", "TBD WITH CLIENT", "Open", "Illustrative only"],
  ];
  writeTable(assumptions, 4, ["Year", "Target %", "Load growth reference", "Period basis", "Truth status", "Approval owner", "Status", "Notes"], assumptionRows, "GapAssumptionsTable", [12, 14, 22, 20, 26, 24, 14, 36]);
  assumptions.getRange("B5:C9").format.numberFormat = "0.0%";
  assumptions.getRange("B5:C9").format.fill = amber;
  assumptions.getRange("G5:G9").dataValidation = { rule: { type: "list", values: ["Open", "Approved", "Approved with condition", "Rejected"] } };

  const siteLoad = sheets["Site Load"];
  baseSheet(siteLoad, "Synthetic site load / forecast inputs", 9);
  const siteRows = [
    ["LOAD-DEMO-001", 2026, "Demo Site A", 60000, "Actual", "SRC-DEMO-LOAD", "Pass", "SYNTHETIC / DEMO DATA", "Fictional"],
    ["LOAD-DEMO-002", 2026, "Demo Site B", 40000, "Actual", "SRC-DEMO-LOAD", "Pass with condition", "SYNTHETIC / DEMO DATA", "One fictional quality condition"],
    ["LOAD-DEMO-003", 2027, "Demo Site A", 61800, "Forecast", "SRC-DEMO-FCST", "Pass", "SYNTHETIC / DEMO DATA", "3% growth demo"],
    ["LOAD-DEMO-004", 2027, "Demo Site B", 41200, "Forecast", "SRC-DEMO-FCST", "Pass", "SYNTHETIC / DEMO DATA", "3% growth demo"],
    ["LOAD-DEMO-005", 2028, "Demo Site A", 63600, "Forecast", "SRC-DEMO-FCST", "Pass", "SYNTHETIC / DEMO DATA", "Rounded demo"],
    ["LOAD-DEMO-006", 2028, "Demo Site B", 41400, "Forecast", "SRC-DEMO-FCST", "Pass", "SYNTHETIC / DEMO DATA", "Rounded demo"],
    ["LOAD-DEMO-007", 2029, "Demo Site A", 65500, "Forecast", "SRC-DEMO-FCST", "Pass", "SYNTHETIC / DEMO DATA", "Rounded demo"],
    ["LOAD-DEMO-008", 2029, "Demo Site B", 42600, "Forecast", "SRC-DEMO-FCST", "Pass", "SYNTHETIC / DEMO DATA", "Rounded demo"],
    ["LOAD-DEMO-009", 2030, "Demo Site A", 67500, "Forecast", "SRC-DEMO-FCST", "Pass", "SYNTHETIC / DEMO DATA", "Rounded demo"],
    ["LOAD-DEMO-010", 2030, "Demo Site B", 43900, "Forecast", "SRC-DEMO-FCST", "Pass", "SYNTHETIC / DEMO DATA", "Rounded demo"],
  ];
  writeTable(siteLoad, 4, ["Load ID", "Year", "Site ID", "Gross load MWh", "Actual / Forecast", "Source ID", "Quality status", "Truth status", "Notes"], siteRows, "SiteLoadTable", [18, 12, 22, 20, 20, 20, 22, 26, 34]);
  siteLoad.getRange("D5:D14").format.numberFormat = "#,##0";
  siteLoad.getRange("D5:D14").format.fill = amber;

  const procurement = sheets["Existing Procurement"];
  baseSheet(procurement, "Synthetic existing procurement treatment", 11);
  const procurementRows = [
    ["PROC-DEMO-A", 2026, "Demo retailer supply", 30000, 0.95, 1.00, null, "SRC-DEMO-CONTRACT", "Pass", "SYNTHETIC / DEMO DATA", "Fictional"],
    ["PROC-DEMO-B", 2026, "Demo T-REC holding", 10000, 1.00, 0.80, null, "SRC-DEMO-CERT", "Pass with condition", "SYNTHETIC / DEMO DATA", "Eligibility factor illustrative"],
    ["PROC-DEMO-A", 2027, "Demo retailer supply", 35000, 0.95, 1.00, null, "SRC-DEMO-CONTRACT", "Pass", "SYNTHETIC / DEMO DATA", "Fictional"],
    ["PROC-DEMO-B", 2027, "Demo T-REC holding", 12000, 1.00, 0.80, null, "SRC-DEMO-CERT", "Pass with condition", "SYNTHETIC / DEMO DATA", "Fictional"],
    ["PROC-DEMO-C", 2028, "Demo offsite project", 55000, 0.95, 1.00, null, "SRC-DEMO-PROJECT", "Pass with condition", "SYNTHETIC / DEMO DATA", "COD / delivery not verified"],
    ["PROC-DEMO-C", 2029, "Demo offsite project", 60000, 0.95, 1.00, null, "SRC-DEMO-PROJECT", "Pass with condition", "SYNTHETIC / DEMO DATA", "Fictional"],
    ["PROC-DEMO-C", 2030, "Demo offsite project", 60000, 0.95, 1.00, null, "SRC-DEMO-PROJECT", "Pass with condition", "SYNTHETIC / DEMO DATA", "Fictional"],
  ];
  writeTable(procurement, 4, ["Instrument ID", "Year", "Instrument", "Contracted MWh", "Delivery factor", "Eligibility factor", "Planning eligible MWh", "Source ID", "Quality status", "Truth status", "Notes"], procurementRows, "ExistingProcurementTable", [20, 12, 30, 20, 18, 20, 24, 22, 22, 26, 34]);
  for (let r = 5; r <= 11; r++) procurement.getRange(`G${r}`).formulas = [[`=D${r}*E${r}*F${r}`]];
  procurement.getRange("D5:D11").format.numberFormat = "#,##0";
  procurement.getRange("E5:F11").format.numberFormat = "0%";
  procurement.getRange("G5:G11").format.numberFormat = "#,##0";
  procurement.getRange("D5:F11").format.fill = amber;

  const gap = sheets["Gap Analysis"];
  baseSheet(gap, "Annual residual gap — formula-driven demo", 10);
  const gapRows = [2026, 2027, 2028, 2029, 2030].map((year) => [year, null, null, null, null, null, null, null, "DRAFT — DEMO", "SYNTHETIC / DEMO DATA"]);
  writeTable(gap, 4, ["Year", "Total load MWh", "Target %", "Target renewable MWh", "Existing eligible MWh", "Residual gap MWh", "Coverage %", "Over-coverage MWh", "Decision status", "Truth status"], gapRows, "GapAnalysisTable", [12, 20, 14, 24, 24, 22, 16, 22, 24, 26]);
  for (let r = 5; r <= 9; r++) {
    gap.getRange(`B${r}`).formulas = [[`=SUMIF('Site Load'!$B$5:$B$14,A${r},'Site Load'!$D$5:$D$14)`]];
    gap.getRange(`C${r}`).formulas = [[`=SUMIF(Assumptions!$A$5:$A$9,A${r},Assumptions!$B$5:$B$9)`]];
    gap.getRange(`D${r}`).formulas = [[`=B${r}*C${r}`]];
    gap.getRange(`E${r}`).formulas = [[`=SUMIF('Existing Procurement'!$B$5:$B$11,A${r},'Existing Procurement'!$G$5:$G$11)`]];
    gap.getRange(`F${r}`).formulas = [[`=MAX(D${r}-E${r},0)`]];
    gap.getRange(`G${r}`).formulas = [[`=IF(D${r}=0,0,MIN(E${r}/D${r},1))`]];
    gap.getRange(`H${r}`).formulas = [[`=MAX(E${r}-D${r},0)`]];
  }
  gap.getRange("B5:B9").format.numberFormat = "#,##0";
  gap.getRange("C5:C9").format.numberFormat = "0%";
  gap.getRange("D5:F9").format.numberFormat = "#,##0";
  gap.getRange("G5:G9").format.numberFormat = "0%";
  gap.getRange("H5:H9").format.numberFormat = "#,##0";
  gap.getRange("F5:F9").format.fill = amber;
  gap.getRange("G5:G9").conditionalFormats.add("colorScale", { colors: [red, amber, green] });

  const sensitivity = sheets.Sensitivity;
  baseSheet(sensitivity, "Gap sensitivity — demo factors", 10);
  const cases = [
    ["Base", 1.00, 1.00, "Current demo inputs"],
    ["Higher load", 1.05, 1.00, "+5% load — illustrative"],
    ["Lower delivery", 1.00, 0.90, "-10% existing delivery — illustrative"],
    ["Combined stress", 1.05, 0.90, "Both illustrative stresses"],
  ];
  const sensitivityRows = [];
  for (const year of [2026, 2027, 2028, 2029, 2030]) {
    for (const [caseName, loadFactor, existingFactor, note] of cases) sensitivityRows.push([year, caseName, loadFactor, existingFactor, null, null, null, null, null, note]);
  }
  writeTable(sensitivity, 4, ["Year", "Case", "Load factor", "Existing delivery factor", "Base target MWh", "Base existing eligible MWh", "Case target MWh", "Case existing MWh", "Residual gap MWh", "Notes"], sensitivityRows, "GapSensitivityTable", [12, 22, 16, 24, 22, 26, 22, 24, 22, 36]);
  for (let r = 5; r <= 24; r++) {
    sensitivity.getRange(`E${r}`).formulas = [[`=SUMIF('Gap Analysis'!$A$5:$A$9,A${r},'Gap Analysis'!$D$5:$D$9)`]];
    sensitivity.getRange(`F${r}`).formulas = [[`=SUMIF('Gap Analysis'!$A$5:$A$9,A${r},'Gap Analysis'!$E$5:$E$9)`]];
    sensitivity.getRange(`G${r}`).formulas = [[`=E${r}*C${r}`]];
    sensitivity.getRange(`H${r}`).formulas = [[`=F${r}*D${r}`]];
    sensitivity.getRange(`I${r}`).formulas = [[`=MAX(G${r}-H${r},0)`]];
  }
  sensitivity.getRange("C5:D24").format.numberFormat = "0%";
  sensitivity.getRange("E5:I24").format.numberFormat = "#,##0";
  sensitivity.getRange("C5:D24").format.fill = amber;
  sensitivity.getRange("I5:I24").format.fill = paleBlue;

  const summary = sheets["Management Summary"];
  baseSheet(summary, "G3 management summary — decision draft", 8);
  summary.getRange("A4:B10").values = [
    ["Metric", "Value"],
    ["First 100% target year", 2028],
    ["Base gap in first 100% year", null],
    ["Combined-stress gap in first 100% year", null],
    ["Base coverage in first 100% year", null],
    ["Boundary status", "TBD WITH CLIENT"],
    ["Truth status", "SYNTHETIC / DEMO DATA"],
  ];
  summary.getRange("A4:B4").format = { fill: navy, font: { name: fontFamily, size: 10, bold: true, color: "#FFFFFF" }, borders: { preset: "all", style: "thin", color: "#FFFFFF" } };
  summary.getRange("A5:A10").format = { fill: paleGray, font: { name: fontFamily, size: 10, bold: true }, borders: { preset: "all", style: "thin", color: border } };
  summary.getRange("B5:B10").format = { font: { name: fontFamily, size: 10 }, borders: { preset: "all", style: "thin", color: border } };
  summary.getRange("B6").formulas = [["=SUMIF('Gap Analysis'!$A$5:$A$9,B5,'Gap Analysis'!$F$5:$F$9)"]];
  summary.getRange("B7").formulas = [["=SUMIFS(Sensitivity!$I$5:$I$24,Sensitivity!$A$5:$A$24,B5,Sensitivity!$B$5:$B$24,\"Combined stress\")"]];
  summary.getRange("B8").formulas = [["=SUMIF('Gap Analysis'!$A$5:$A$9,B5,'Gap Analysis'!$G$5:$G$9)"]];
  summary.getRange("B6:B7").format.numberFormat = "#,##0 \"MWh\"";
  summary.getRange("B8").format.numberFormat = "0%";
  summary.getRange("A:A").format.columnWidth = 42; summary.getRange("B:B").format.columnWidth = 30;
  writeTable(summary, 13, ["G3 decision", "Required evidence", "Owner", "Status", "Handoff if approved"], [
    ["Approve calculation boundary", "entity / site / load / period card", "TBD WITH CLIENT", "Open", "Locks denominator"],
    ["Approve target curve and policy source", "formal policy + version", "Sustainability owner — TBD", "Open", "Locks required MWh"],
    ["Approve existing procurement treatment", "contract / delivery / eligibility evidence", "Procurement + Sustainability — TBD", "Open", "Locks numerator"],
    ["Approve gap range for 1.5", "base + stress + quality conditions", "G3 decision body — TBD", "Open", "Annual demand input to scenarios"],
  ], "G3DecisionTable", [38, 44, 30, 16, 38]);
  summary.getRange("D14:D17").dataValidation = { rule: { type: "list", values: ["Open", "Approved", "Approved with condition", "Rejected"] } };
  summary.getRange("A20:B23").values = [
    ["Management note", ""],
    ["What the demo proves", "Formulas, handoffs and sensitivity logic run end-to-end."],
    ["What it does not prove", "No AMAT load, target, policy, site or procurement fact is established."],
    ["Next action", "Replace demo rows, reconcile totals and obtain named G3 approvals."],
  ];
  summary.getRange("A20:B20").format = { fill: navy, font: { name: fontFamily, size: 10, bold: true, color: "#FFFFFF" } };
  summary.getRange("A21:B23").format = { wrapText: true, borders: { preset: "all", style: "thin", color: border } };

  for (const name of sheetNames) {
    const used = sheets[name].getUsedRange();
    if (used) { used.format.font = { name: fontFamily, size: 10 }; used.format.verticalAlignment = "center"; used.format.autofitRows(); }
  }
  await saveWorkbookWithQa(workbook, path.join(repoRoot, "workstreams", "04_1.4_re100-gap-analysis", "Gap_Analysis_Model.xlsx"), "1.4_gap_analysis", sheetNames, "Gap Analysis!A1:J9");
}

async function buildScenarioModel() {
  const workbook = Workbook.create();
  const sheetNames = ["Read Me", "Option Inputs", "Scenario Mix", "Criteria Scores", "Management Summary"];
  const sheets = Object.fromEntries(sheetNames.map((name) => [name, workbook.worksheets.add(name)]));

  baseSheet(sheets["Read Me"], "Procurement portfolio scenario model — v0.1", 6);
  sheets["Read Me"].getRange("A4:F9").values = [
    ["Rule", "Required practice", "Truth status", "Owner", "Decision effect", "Current v0.1"],
    ["Gap", "Use G3-approved 1.4 gap / range", "SYNTHETIC / DEMO DATA", "Analysis Lead", "Controls volume need", "2028–2030 demo values"],
    ["Cost", "Normalize included components and validity", "SYNTHETIC / DEMO DATA", "Finance / Procurement — TBD", "Controls comparison", "Not market quotes"],
    ["Criteria", "Define anchors, weights and hard constraints", "TBD WITH CLIENT", "G4 decision body", "Controls judgement", "Illustrative weights"],
    ["Scenario", "Make archetypes materially different", "HYPOTHESIS", "Analysis Lead", "Creates real choices", "Balanced / Speed / Long-term"],
    ["Approval", "Record G4 outcome and conditions", "TBD WITH CLIENT", "Sponsor / steering — TBD", "Authorizes roadmap", "No client approval yet"],
  ];
  sheets["Read Me"].getRange("A4:F4").format = { fill: navy, font: { name: fontFamily, size: 10, bold: true, color: "#FFFFFF" }, wrapText: true, borders: { preset: "all", style: "thin", color: "#FFFFFF" } };
  sheets["Read Me"].getRange("A5:F9").format = { wrapText: true, borders: { preset: "all", style: "thin", color: border } };
  [22, 50, 26, 30, 34, 34].forEach((w, i) => sheets["Read Me"].getRange(`${columnLetter(i + 1)}:${columnLetter(i + 1)}`).format.columnWidth = w);
  sheets["Read Me"].getRange("A12:B17").values = [["Refresh sequence", ""], ["1", "Approve 1.4 gap / range"], ["2", "Replace demo option evidence and costs"], ["3", "Confirm criteria / weights / hard constraints"], ["4", "Recalculate and test sensitivities"], ["5", "Record G4 decision and roadmap handoff"]];
  sheets["Read Me"].getRange("A12:B12").format = { fill: navy, font: { name: fontFamily, size: 10, bold: true, color: "#FFFFFF" } };

  const options = sheets["Option Inputs"];
  baseSheet(options, "Synthetic option catalogue and comparable cost", 12);
  writeTable(options, 4, ["Option", "Comparable cost NTD/MWh", "Start / lead time", "Tenor", "Technology / source", "Flexibility", "Execution risk 1–5", "Market risk 1–5", "Dependency", "Evidence needed", "Truth status", "Notes"], [
    ["Onsite", 3000, "Site-dependent", "TBD", "Solar / TBD", "Medium", 3, 2, "Site / EPC / meter", "Site feasibility + cost", "SYNTHETIC / DEMO DATA", "Not AMAT feasibility"],
    ["Short-term certificates", 4500, "Potentially shorter", "1–3y demo", "T-REC / TBD", "High", 2, 4, "Availability + policy", "Eligibility + quote", "SYNTHETIC / DEMO DATA", "Not market price"],
    ["Retailer-enabled", 3800, "Medium", "3–5y demo", "Portfolio / TBD", "Medium", 3, 3, "Retailer + supply", "Proposal + terms", "SYNTHETIC / DEMO DATA", "Not market price"],
    ["Long-term offsite", 3200, "COD-dependent", "10–20y demo", "Project / TBD", "Low", 5, 3, "Project + wheeling + credit", "Maturity + term sheet", "SYNTHETIC / DEMO DATA", "Not market price"],
  ], "ScenarioOptionTable", [24, 24, 22, 18, 24, 16, 20, 18, 34, 32, 26, 28]);
  options.getRange("B5:B8").format.numberFormat = "#,##0";
  options.getRange("B5:B8").format.fill = amber;

  const mix = sheets["Scenario Mix"];
  baseSheet(mix, "Synthetic scenario-year portfolio mix", 15);
  const years = [2028, 2029, 2030];
  const gaps = { 2028: 52750, 2029: 51100, 2030: 54400 };
  const rows = [];
  for (const year of years) {
    const g = gaps[year];
    rows.push(["Balanced", year, g, 5000, year === 2028 ? 7750 : year === 2029 ? 6100 : 9400, 15000, 25000, null, null, null, null, null, "PASS", "SYNTHETIC / DEMO DATA", "Diversified demo"]);
    rows.push(["Speed / Flexibility", year, g, 3000, g - 33000, 20000, 10000, null, null, null, null, null, "PASS", "SYNTHETIC / DEMO DATA", "Higher short-term share"]);
    rows.push(["Long-term Core", year, g, 5000, g - 50000, 10000, 35000, null, null, null, null, null, "PASS", "SYNTHETIC / DEMO DATA", "Higher long-term concentration"]);
  }
  writeTable(mix, 4, ["Scenario", "Year", "Approved gap MWh", "Onsite MWh", "Short-term MWh", "Retailer MWh", "Long-term MWh", "Total procured MWh", "Coverage %", "Annual cost NTD", "Weighted NTD/MWh", "Largest-option concentration", "Hard constraint", "Truth status", "Notes"], rows, "ScenarioMixTable", [24, 12, 22, 18, 20, 18, 20, 22, 16, 24, 22, 26, 18, 26, 30]);
  for (let r = 5; r <= 13; r++) {
    mix.getRange(`H${r}`).formulas = [[`=SUM(D${r}:G${r})`]];
    mix.getRange(`I${r}`).formulas = [[`=IF(C${r}=0,0,MIN(H${r}/C${r},1))`]];
    mix.getRange(`J${r}`).formulas = [[`=D${r}*'Option Inputs'!$B$5+E${r}*'Option Inputs'!$B$6+F${r}*'Option Inputs'!$B$7+G${r}*'Option Inputs'!$B$8`]];
    mix.getRange(`K${r}`).formulas = [[`=IF(H${r}=0,0,J${r}/H${r})`]];
    mix.getRange(`L${r}`).formulas = [[`=IF(H${r}=0,0,MAX(D${r}:G${r})/H${r})`]];
    mix.getRange(`M${r}`).formulas = [[`=IF(I${r}<1,"FAIL","PASS")`]];
  }
  mix.getRange("C5:H13").format.numberFormat = "#,##0";
  mix.getRange("I5:I13").format.numberFormat = "0%";
  mix.getRange("J5:J13").format.numberFormat = "#,##0";
  mix.getRange("K5:K13").format.numberFormat = "#,##0";
  mix.getRange("L5:L13").format.numberFormat = "0%";
  mix.getRange("C5:G13").format.fill = amber;
  mix.getRange("M5:M13").conditionalFormats.add("containsText", { text: "FAIL", format: { fill: red, font: { color: "#9C0006", bold: true } } });

  const scores = sheets["Criteria Scores"];
  baseSheet(scores, "Criteria weights and synthetic scenario scores", 10);
  scores.getRange("A4:H5").values = [["Criterion", "Volume / timing", "Cost", "Flexibility", "Execution", "Concentration", "Dependency", "Claim relevance"], ["Weight", 0.20, 0.15, 0.15, 0.15, 0.15, 0.10, 0.10]];
  scores.getRange("A4:H4").format = { fill: navy, font: { name: fontFamily, size: 10, bold: true, color: "#FFFFFF" }, wrapText: true, borders: { preset: "all", style: "thin", color: "#FFFFFF" } };
  scores.getRange("A5:H5").format = { borders: { preset: "all", style: "thin", color: border }, fill: amber };
  scores.getRange("B5:H5").format.numberFormat = "0%";
  writeTable(scores, 8, ["Scenario", "Volume / timing", "Cost", "Flexibility", "Execution", "Concentration", "Dependency", "Claim relevance", "Weighted score", "Truth status"], [
    ["Balanced", 4, 3, 4, 3, 4, 4, 3, null, "SYNTHETIC / DEMO DATA"],
    ["Speed / Flexibility", 5, 2, 5, 4, 3, 3, 2, null, "SYNTHETIC / DEMO DATA"],
    ["Long-term Core", 3, 4, 2, 2, 2, 2, 4, null, "SYNTHETIC / DEMO DATA"],
  ], "ScenarioScoreTable", [24, 18, 14, 16, 16, 20, 16, 20, 20, 28]);
  for (let r = 9; r <= 11; r++) scores.getRange(`I${r}`).formulas = [[`=SUMPRODUCT(B${r}:H${r},$B$5:$H$5)`]];
  scores.getRange("B9:H11").format.fill = amber;
  scores.getRange("I9:I11").format.numberFormat = "0.00";
  scores.getRange("A14:B18").values = [["Anchor", "Definition"], ["1", "Does not meet / high risk / evidence insufficient"], ["3", "Feasible with material conditions"], ["5", "Strong fit with sufficient evidence"], ["Rule", "Hard constraint failure cannot be offset by score"]];
  scores.getRange("A14:B14").format = { fill: navy, font: { name: fontFamily, size: 10, bold: true, color: "#FFFFFF" } };
  scores.getRange("A14:B18").format.wrapText = true;
  scores.getRange("A:A").format.columnWidth = 24; scores.getRange("B:B").format.columnWidth = 52;

  const summary = sheets["Management Summary"];
  baseSheet(summary, "G4 management summary — portfolio direction draft", 9);
  const summaryRows = [["Balanced", null, null, null, null, null, null, "Conditional — demo", "SYNTHETIC / DEMO DATA"], ["Speed / Flexibility", null, null, null, null, null, null, "Conditional — demo", "SYNTHETIC / DEMO DATA"], ["Long-term Core", null, null, null, null, null, null, "Conditional — demo", "SYNTHETIC / DEMO DATA"]];
  writeTable(summary, 4, ["Scenario", "3-year gap MWh", "3-year procured MWh", "3-year cost NTD", "Weighted NTD/MWh", "Average concentration", "Criteria score", "Preliminary status", "Truth status"], summaryRows, "PortfolioSummaryTable", [24, 22, 24, 24, 22, 24, 18, 24, 28]);
  for (let r = 5; r <= 7; r++) {
    summary.getRange(`B${r}`).formulas = [[`=SUMIF('Scenario Mix'!$A$5:$A$13,A${r},'Scenario Mix'!$C$5:$C$13)`]];
    summary.getRange(`C${r}`).formulas = [[`=SUMIF('Scenario Mix'!$A$5:$A$13,A${r},'Scenario Mix'!$H$5:$H$13)`]];
    summary.getRange(`D${r}`).formulas = [[`=SUMIF('Scenario Mix'!$A$5:$A$13,A${r},'Scenario Mix'!$J$5:$J$13)`]];
    summary.getRange(`E${r}`).formulas = [[`=IF(C${r}=0,0,D${r}/C${r})`]];
    summary.getRange(`F${r}`).formulas = [[`=AVERAGEIF('Scenario Mix'!$A$5:$A$13,A${r},'Scenario Mix'!$L$5:$L$13)`]];
    summary.getRange(`G${r}`).formulas = [[`=SUMIF('Criteria Scores'!$A$9:$A$11,A${r},'Criteria Scores'!$I$9:$I$11)`]];
  }
  summary.getRange("B5:D7").format.numberFormat = "#,##0";
  summary.getRange("E5:E7").format.numberFormat = "#,##0";
  summary.getRange("F5:F7").format.numberFormat = "0%";
  summary.getRange("G5:G7").format.numberFormat = "0.00";
  writeTable(summary, 10, ["G4 decision", "Required confirmation", "Owner", "Status", "Downstream"], [
    ["Select direction / acceptable range", "approved gap + scenario trade-offs", "G4 body — TBD", "Open", "1.6 roadmap"],
    ["Approve hard constraints", "coverage / timing / tenor / policy / concentration", "Cross-functional — TBD", "Open", "2.x screens"],
    ["Approve market tests", "availability / price / COD / delivery / terms", "Procurement — TBD", "Open", "2.1–2.4"],
    ["Approve disclosure boundary", "identity / site / volume / timing / recipients", "Procurement + Legal — TBD", "Open", "2.2 / 2.5"],
  ], "G4DecisionTable", [40, 48, 30, 16, 26]);
  summary.getRange("D11:D14").dataValidation = { rule: { type: "list", values: ["Open", "Approved", "Approved with condition", "Rejected"] } };
  summary.getRange("A17:B20").values = [["Preliminary judgement", ""], ["Demo result", "Balanced has the middle cost / concentration profile and highest synthetic score."], ["Boundary", "This is not an AMAT recommendation and uses no market quotes."], ["Next", "Replace evidence, test sensitivities and obtain G4 approval."]];
  summary.getRange("A17:B17").format = { fill: navy, font: { name: fontFamily, size: 10, bold: true, color: "#FFFFFF" } };
  summary.getRange("A18:B20").format = { wrapText: true, borders: { preset: "all", style: "thin", color: border } };
  summary.getRange("A:A").format.columnWidth = 34; summary.getRange("B:B").format.columnWidth = 70;

  for (const name of sheetNames) {
    const used = sheets[name].getUsedRange();
    if (used) { used.format.font = { name: fontFamily, size: 10 }; used.format.verticalAlignment = "center"; used.format.autofitRows(); }
  }
  await saveWorkbookWithQa(workbook, path.join(repoRoot, "workstreams", "05_1.5_portfolio-scenario-analysis", "Scenario_Model.xlsx"), "1.5_scenario_model", sheetNames, "Management Summary!A1:I20");
}

const target = process.argv[2] ?? "project-control";
if (target === "project-control" || target === "all") {
  await buildProjectControl();
}
if (target === "1.2" || target === "all") {
  await buildDataRequestTracker();
  await buildDataDictionary();
}
if (target === "1.4" || target === "all") {
  await buildGapAnalysisModel();
}
if (target === "1.5" || target === "all") {
  await buildScenarioModel();
}
