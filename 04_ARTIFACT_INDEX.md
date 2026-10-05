# AMAT Pre-delivery Repository v0.1 — Artifact Index

Last updated: 2026-09-27  
Scope: canonical working artifacts only；`_qa/` render / inspection files 與 `tools/` build scripts 不列入交付索引。

## 使用方式

- 每個 workstream 先讀其 01_WORK_PACKAGE，再依 decision need 開啟方法文件、模型或 deck。
- `.md` 是可搜尋與後續 AI / human editing 的 source；`.docx`、`.pptx`、`.xlsx` 是實際工作格式。
- 每份 MODEL_README 說明 workbook 的 inputs、calculation、outputs、synthetic data 與 client-data mapping。
- 本索引列的是 v0.1。真正 client-facing issued copy 必須依 `shared/VERSION_REVIEW_RULE.md` 控制。

## Root management layer

| Artifact | File path | Purpose | Intended user |
|---|---|---|---|
| Repository guide | `00_README.md` | 說明定位、閱讀順序、truth labels 與續跑方式 | 全體使用者 |
| Master Delivery Blueprint | `01_MASTER_DELIVERY_BLUEPRINT.md`；`01_MASTER_DELIVERY_BLUEPRINT.docx` | 一次看完 18 workstreams、dependencies、questions 與 handoffs | Founder / Project Lead |
| Executive Review | `02_EXECUTIVE_REVIEW.md`；`02_EXECUTIVE_REVIEW.docx` | 連續閱讀整體 client journey、delivery logic、每包成果與風險 | Founder / Zac / senior reviewer |
| Build Status | `03_BUILD_STATUS.md` | 記錄完成度、QA evidence、下一個 resume point | Builder / Project Lead |
| Artifact Index | `04_ARTIFACT_INDEX.md` | 導航 canonical artifacts、用途與使用者 | 全體使用者 |
| Final QA Report | `05_FINAL_QA_REPORT.md`；`05_FINAL_QA_REPORT.docx` | 對 Acceptance Criteria A–L 出具 PASS / PARTIAL / FAIL | Founder / quality reviewer |
| Unresolved Issues | `06_UNRESOLVED_ISSUES.md` | 管理必須由 client、Optimum 或 research 解決的未知 | Project Lead / client owners |
| Acceptance Criteria | `ACCEPTANCE_CRITERIA.md` | 定義 scope、artifact、usability、boundary 與 resumability 驗收標準 | Builder / reviewer |

## Shared project control, boundaries and training

| Area | Artifact | File path | Purpose | Intended user |
|---|---|---|---|---|
| Architecture | Architecture design / QA | `shared/00_ARCHITECTURE.md`；`shared/00_ARCHITECTURE_QA.md` | 定義 scope map、artifact strategy、dependency logic 與 architecture QA | Project Lead / builder |
| Cross audit | Cross-workstream audit | `shared/CROSS_WORKSTREAM_AUDIT.md` | 驗證資料、decision、ID lineage 與 handoff chain | Founder / Project Lead |
| Project control | Project Control Guide | `shared/PROJECT_CONTROL_GUIDE.md`；`shared/PROJECT_CONTROL_GUIDE.docx` | 定義 action / risk / issue / decision / assumption / change 等控制方式 | PM / workstream leads |
| Project control | Master register | `shared/Project_Control_Register.xlsx` | 集中管理 13 類 project-control registers | PM / Project Lead |
| Reporting | Biweekly / monthly / minutes | `shared/BIWEEKLY_STATUS_REPORT_TEMPLATE.md`；`shared/MONTHLY_REPORT_TEMPLATE.md`；`shared/MEETING_MINUTES_TEMPLATE.md` | 產生 decision-oriented recurring reporting | PM / client team |
| Versioning | Version / review rule | `shared/VERSION_REVIEW_RULE.md` | 區隔 working、reviewed、client draft 與 issued status | 所有 artifact owners |
| Confidentiality | Confidentiality and Research Hygiene | `shared/CONFIDENTIALITY_AND_RESEARCH_HYGIENE.md`；`shared/CONFIDENTIALITY_AND_RESEARCH_HYGIENE.docx` | 管理分類、tool / file / research 使用與 incident response | 全體團隊 |
| Market conduct | Market Conduct and Information Boundary | `shared/MARKET_CONDUCT_AND_INFORMATION_BOUNDARY.md`；`shared/MARKET_CONDUCT_AND_INFORMATION_BOUNDARY.docx` | 管理 neutral supplier engagement、disclosure ladder 與 escalation | Market-facing team / Project Lead |
| Training | New Hire Delivery Guide | `training/NEW_HIRE_DELIVERY_GUIDE.md`；`training/NEW_HIRE_DELIVERY_GUIDE.docx` | 訓練 task framing、MVP、evidence、judgement 與 review | 新人 / coach |
| Training | Task Brief Template | `training/TASK_BRIEF_TEMPLATE.md`；`training/TASK_BRIEF_TEMPLATE.docx` | 固定 Objective 到 Definition of Done；含 1.4 worked example | Assignee / reviewer |

## 1.x — Define the problem and align the client

| Workstream | Artifact | File path | Purpose | Intended user |
|---|---|---|---|---|
| 1.1 | Work package | `workstreams/01_1.1_kickoff/01_WORK_PACKAGE.md` | 定義 kickoff 的目的、inputs、risks、MVP 與 DoD | Project Lead / assignee |
| 1.1 | Project Charter & Ways of Working | `workstreams/01_1.1_kickoff/PROJECT_CHARTER_AND_WAYS_OF_WORKING.md`；`workstreams/01_1.1_kickoff/PROJECT_CHARTER_AND_WAYS_OF_WORKING.docx` | 校準 scope、roles、RACI、cadence、decision process 與 initial questions | Sponsor / client PM / core team |
| 1.1 | Kickoff Deck | `workstreams/01_1.1_kickoff/KICKOFF_DECK_CONTENT.md`；`workstreams/01_1.1_kickoff/Kickoff_Deck.pptx` | 以 8 頁引導 G0 client expectation / working agreement 討論 | Kickoff participants |
| 1.2 | Work package | `workstreams/02_1.2_data-requirements/01_WORK_PACKAGE.md` | 定義 data discovery、quality、gap process 與 G1 | Data workstream owner |
| 1.2 | Data Request Guide | `workstreams/02_1.2_data-requirements/DATA_REQUEST_GUIDE.md`；`workstreams/02_1.2_data-requirements/DATA_REQUEST_GUIDE.docx` | 將資料要求連到 decision use、stakeholder interview 與 gap recovery | Client data owners / analyst |
| 1.2 | Data trackers and dictionary | `workstreams/02_1.2_data-requirements/Data_Request_Tracker.xlsx`；`workstreams/02_1.2_data-requirements/Data_Dictionary.xlsx`；`workstreams/02_1.2_data-requirements/MODEL_README.md` | 管理 request、owner、quality、field definition 與 mapping | Analyst / client data owners |
| 1.3 | Work package | `workstreams/03_1.3_taiwan-market-workshop/01_WORK_PACKAGE.md` | 定義 workshop audience hypothesis、decisions 與 DoD | Workshop lead |
| 1.3 | Workshop Design & Facilitator Guide | `workstreams/03_1.3_taiwan-market-workshop/WORKSHOP_DESIGN_AND_FACILITATOR_GUIDE.md`；`workstreams/03_1.3_taiwan-market-workshop/WORKSHOP_DESIGN_AND_FACILITATOR_GUIDE.docx` | 設計 participant、agenda、facilitation、questions、decisions 與 follow-up | Facilitator / Project Lead |
| 1.3 | Workshop Deck | `workstreams/03_1.3_taiwan-market-workshop/WORKSHOP_DECK_CONTENT.md`；`workstreams/03_1.3_taiwan-market-workshop/Taiwan_Market_Workshop_Deck.pptx` | 以 15 頁建立 Taiwan procurement 共通語言並導向 AMAT decisions | Cross-functional client audience |
| 1.4 | Work package | `workstreams/04_1.4_re100-gap-analysis/01_WORK_PACKAGE.md` | 定義 baseline / target / residual gap 的分析與核准方式 | Sustainability / analyst |
| 1.4 | Gap Analysis Methodology | `workstreams/04_1.4_re100-gap-analysis/GAP_ANALYSIS_METHODOLOGY.md`；`workstreams/04_1.4_re100-gap-analysis/GAP_ANALYSIS_METHODOLOGY.docx` | 說明 boundary、coverage、sensitivity、data quality 與 management output | Project Lead / analyst / client owner |
| 1.4 | Gap Analysis Model | `workstreams/04_1.4_re100-gap-analysis/Gap_Analysis_Model.xlsx`；`workstreams/04_1.4_re100-gap-analysis/MODEL_README.md` | 以 synthetic data 實跑 baseline、target、existing procurement、gap 與 sensitivity | Analyst / reviewer |
| 1.5 | Work package | `workstreams/05_1.5_portfolio-scenario-analysis/01_WORK_PACKAGE.md` | 定義 portfolio question、constraints、MVP 與 G4 | Portfolio analyst / Project Lead |
| 1.5 | Portfolio Methodology | `workstreams/05_1.5_portfolio-scenario-analysis/PORTFOLIO_METHODOLOGY.md`；`workstreams/05_1.5_portfolio-scenario-analysis/PORTFOLIO_METHODOLOGY.docx` | 定義 volume / cost / timing / tenor / technology / risk 比較方法 | Project Lead / client decision team |
| 1.5 | Scenario Model | `workstreams/05_1.5_portfolio-scenario-analysis/Scenario_Model.xlsx`；`workstreams/05_1.5_portfolio-scenario-analysis/MODEL_README.md` | 以三個 demo archetypes 計算 coverage、cost、concentration 與 weighted view | Analyst / Finance / Sustainability |
| 1.6 | Work package | `workstreams/06_1.6_alignment-roadmap/01_WORK_PACKAGE.md` | 定義 alignment、decision gates、roadmap 與 2.x transition | Project Lead |
| 1.6 | Alignment Roadmap | `workstreams/06_1.6_alignment-roadmap/ALIGNMENT_ROADMAP.md`；`workstreams/06_1.6_alignment-roadmap/ALIGNMENT_ROADMAP.docx` | 整合 short / medium / long-term roadmap、owners、dependencies 與 approvals | Sponsor / cross-functional owners |
| 1.6 | Roadmap Deck | `workstreams/06_1.6_alignment-roadmap/ROADMAP_DECK_CONTENT.md`；`workstreams/06_1.6_alignment-roadmap/Roadmap_Deck.pptx` | 以 8 頁取得 G3–G5 對齊與 2.x launch readiness | Client decision meeting |

## 2.x — Convert hypotheses into comparable market evidence

| Workstream | Artifact | File path | Purpose | Intended user |
|---|---|---|---|---|
| 2.1 | Work package | `workstreams/07_2.1_market-scan/01_WORK_PACKAGE.md` | 定義 market universe、research boundary、screening 與 DoD | Market analyst / Project Lead |
| 2.1 | Market Scan Methodology | `workstreams/07_2.1_market-scan/MARKET_SCAN_METHODOLOGY.md`；`workstreams/07_2.1_market-scan/MARKET_SCAN_METHODOLOGY.docx` | 定義 entity / route / asset、source grading、screening 與 research protocol | Market analyst / reviewer |
| 2.1 | Market Landscape | `workstreams/07_2.1_market-scan/Market_Landscape.xlsx`；`workstreams/07_2.1_market-scan/MODEL_README.md` | 管理 supplier / developer / retailer、sources、evidence 與 preliminary screen | Market analyst |
| 2.2 | Work package | `workstreams/08_2.2_market-engagement/01_WORK_PACKAGE.md` | 定義 small-universe sounding、disclosure 與 red flags | Engagement lead |
| 2.2 | Engagement Protocol | `workstreams/08_2.2_market-engagement/MARKET_ENGAGEMENT_PROTOCOL.md`；`workstreams/08_2.2_market-engagement/MARKET_ENGAGEMENT_PROTOCOL.docx` | 提供 questionnaire、email / meeting script、information boundary 與 feedback memo | Market-facing team |
| 2.2 | Interaction Tracker | `workstreams/08_2.2_market-engagement/Interaction_Tracker.xlsx`；`workstreams/08_2.2_market-engagement/MODEL_README.md` | 留存 contact、question、response、commitment status、evidence 與 flags | Engagement owner / PM |
| 2.3 | Work package | `workstreams/09_2.3_short-term-procurement/01_WORK_PACKAGE.md` | 定義 bridge-option 評估與 decision | Analyst / Project Lead |
| 2.3 | Short-term Assessment | `workstreams/09_2.3_short-term-procurement/SHORT_TERM_PROCUREMENT_ASSESSMENT.md`；`workstreams/09_2.3_short-term-procurement/SHORT_TERM_PROCUREMENT_ASSESSMENT.docx` | 比較 availability、price、tenor、certificate、flexibility 與 risk | Sustainability / Procurement / Finance |
| 2.3 | Option Comparison | `workstreams/09_2.3_short-term-procurement/Short_Term_Option_Comparison.xlsx`；`workstreams/09_2.3_short-term-procurement/MODEL_README.md` | 以 demo options 計算 coverage、all-in cost、concentration 與 score | Analyst / decision team |
| 2.4 | Work package | `workstreams/10_2.4_long-term-procurement/01_WORK_PACKAGE.md` | 定義主力型長約的 commercial / execution 評估 | Analyst / Project Lead |
| 2.4 | Long-term Assessment | `workstreams/10_2.4_long-term-procurement/LONG_TERM_PROCUREMENT_ASSESSMENT.md`；`workstreams/10_2.4_long-term-procurement/LONG_TERM_PROCUREMENT_ASSESSMENT.docx` | 評估 structure、maturity、COD、profile、credit、wheeling、T-REC 與 risk allocation | Procurement / Finance / Sustainability |
| 2.4 | Commercial Comparison | `workstreams/10_2.4_long-term-procurement/Long_Term_Commercial_Comparison.xlsx`；`workstreams/10_2.4_long-term-procurement/MODEL_README.md` | 比較 project-level evidence、risk-adjusted economics 與 fallback | Analyst / decision team |
| 2.5 | Work package | `workstreams/11_2.5_targeted-rfq/01_WORK_PACKAGE.md` | 定義 RFQ issue、governance、comparability 與 G6 | Procurement / Project Lead |
| 2.5 | RFQ / RFP Package | `workstreams/11_2.5_targeted-rfq/RFQ_RFP_PACKAGE.md`；`workstreams/11_2.5_targeted-rfq/RFQ_RFP_PACKAGE.docx` | 提供 bidder instruction、scope、assumptions、Q&A / addenda、deadlines 與 boundary | Bidders / Procurement / Legal |
| 2.5 | Supplier Response Template | `workstreams/11_2.5_targeted-rfq/Supplier_Response_Template.xlsx`；`workstreams/11_2.5_targeted-rfq/MODEL_README.md` | 以固定 schema 蒐集 offer、pricing、risk、terms、evidence 與 compliance | Bidders / evaluation team |
| 2.5 | Bidder Briefing Deck | `workstreams/11_2.5_targeted-rfq/BIDDER_BRIEFING_DECK_CONTENT.md`；`workstreams/11_2.5_targeted-rfq/Bidder_Briefing_Deck.pptx` | 以 8 頁說明 process、response rules 與 evidence expectations | Invited bidders |
| 2.6 | Work package | `workstreams/12_2.6_evaluation-due-diligence/01_WORK_PACKAGE.md` | 定義 intake、hard screen、scoring、DD、risk 與 G7 | Evaluation lead |
| 2.6 | Evaluation & Decision Memo | `workstreams/12_2.6_evaluation-due-diligence/EVALUATION_AND_DECISION_MEMO.md`；`workstreams/12_2.6_evaluation-due-diligence/EVALUATION_AND_DECISION_MEMO.docx` | 說明 shortlist logic、strengths、risks、conditions 與 dissent | Authorized decision body |
| 2.6 | Scorecard | `workstreams/12_2.6_evaluation-due-diligence/Scorecard.xlsx`；`workstreams/12_2.6_evaluation-due-diligence/MODEL_README.md` | 管理 offer intake、criteria、independent scores、DD、risk 與 shortlist | Evaluators / Project Lead |

## 3.x — Convert a shortlist into an executable agreement and operating control

| Workstream | Artifact | File path | Purpose | Intended user |
|---|---|---|---|---|
| 3.1 | Work package | `workstreams/13_3.1_commercial-alignment/01_WORK_PACKAGE.md` | 定義 final requirement、term hierarchy、authority 與 G8 | Commercial lead |
| 3.1 | Commercial Alignment Memo | `workstreams/13_3.1_commercial-alignment/COMMERCIAL_ALIGNMENT_MEMO.md`；`workstreams/13_3.1_commercial-alignment/COMMERCIAL_ALIGNMENT_MEMO.docx` | 對齊 volume / timeline / structure、must-have、tradeable 與 negotiation objectives | Client decision team |
| 3.1 | Commercial Term Tracker | `workstreams/13_3.1_commercial-alignment/Commercial_Term_Tracker.xlsx`；`workstreams/13_3.1_commercial-alignment/MODEL_README.md` | 留存 assumptions、positions、authority、issues 與 alignment summary | Commercial lead / owners |
| 3.2 | Work package | `workstreams/14_3.2_contract-review/01_WORK_PACKAGE.md` | 定義 commercial review 與 legal advice 邊界 | Commercial lead / Legal interface |
| 3.2 | Contract Review Playbook | `workstreams/14_3.2_contract-review/CONTRACT_REVIEW_PLAYBOOK.md`；`workstreams/14_3.2_contract-review/CONTRACT_REVIEW_PLAYBOOK.docx` | 提供 clause、risk allocation、settlement、delivery、default 等 review framework | Commercial team / qualified counsel |
| 3.2 | Commercial / Legal Issue Tracker | `workstreams/14_3.2_contract-review/Commercial_Legal_Issue_Tracker.xlsx`；`workstreams/14_3.2_contract-review/MODEL_README.md` | 連結 document / clause / issue / counsel question / negotiation agenda | Commercial lead / Legal |
| 3.3 | Work package | `workstreams/15_3.3_negotiation-round-1/01_WORK_PACKAGE.md` | 定義第一輪談判目標、authority 與 record | Negotiation lead |
| 3.3 | Negotiation Strategy Memo | `workstreams/15_3.3_negotiation-round-1/NEGOTIATION_STRATEGY_MEMO.md`；`workstreams/15_3.3_negotiation-round-1/NEGOTIATION_STRATEGY_MEMO.docx` | 準備 issue objectives、walk-away / escalation、concession 與 roles | Negotiation team / authority holder |
| 3.3 | Negotiation Tracker | `workstreams/15_3.3_negotiation-round-1/Negotiation_Tracker.xlsx`；`workstreams/15_3.3_negotiation-round-1/MODEL_README.md` | 管理 brief、issue positions、give/get、meeting record 與 post-meeting summary | Negotiation team |
| 3.4 | Work package | `workstreams/16_3.4_negotiation-decision/01_WORK_PACKAGE.md` | 定義 latest-position review、risk acceptance 與 G9 | Project Lead / decision owner |
| 3.4 | Negotiation Decision Memo | `workstreams/16_3.4_negotiation-decision/NEGOTIATION_DECISION_MEMO.md`；`workstreams/16_3.4_negotiation-decision/NEGOTIATION_DECISION_MEMO.docx` | 壓縮 material delta、scenarios、remaining issues 與 required decision | Authorized decision body |
| 3.4 | Position Tracker | `workstreams/16_3.4_negotiation-decision/Position_Tracker.xlsx`；`workstreams/16_3.4_negotiation-decision/MODEL_README.md` | 比較 baseline / latest、open issues、scenario impact 與 risk acceptance | Commercial / Finance / Legal |
| 3.4 | Decision Pack | `workstreams/16_3.4_negotiation-decision/DECISION_PACK_CONTENT.md`；`workstreams/16_3.4_negotiation-decision/Negotiation_Decision_Pack.pptx` | 以 7 頁支持 accept / counter / continue / fallback / pause / stop | Executive decision meeting |
| 3.5 | Work package | `workstreams/17_3.5_signing-readiness/01_WORK_PACKAGE.md` | 定義 signing 與 go-live readiness 的分離控制 | Signing / implementation lead |
| 3.5 | Signing Readiness Checklist | `workstreams/17_3.5_signing-readiness/SIGNING_READINESS_CHECKLIST.md`；`workstreams/17_3.5_signing-readiness/SIGNING_READINESS_CHECKLIST.docx` | 檢查 final documents、authority、CP、systems、contacts 與 transition | Legal / signer / implementation owners |
| 3.5 | Conditions Precedent Tracker | `workstreams/17_3.5_signing-readiness/Conditions_Precedent_Tracker.xlsx`；`workstreams/17_3.5_signing-readiness/MODEL_README.md` | 管理 document set、CP / obligations、responsibility、system-data 與 transition | PM / Legal / functional owners |
| 3.6 | Work package | `workstreams/18_3.6_execution-tracking/01_WORK_PACKAGE.md` | 定義 go-live、recurring controls、reporting 與 BAU gate | Implementation lead |
| 3.6 | Execution Governance | `workstreams/18_3.6_execution-tracking/EXECUTION_GOVERNANCE.md`；`workstreams/18_3.6_execution-tracking/EXECUTION_GOVERNANCE.docx` | 定義 cadence、source-of-truth、delivery / certificate / invoice / issue governance | Client BAU owners / Project Lead |
| 3.6 | Implementation Tracker | `workstreams/18_3.6_execution-tracking/Implementation_Tracker.xlsx`；`workstreams/18_3.6_execution-tracking/MODEL_README.md` | 追蹤 milestones、actual vs expected、certificates、reconciliation、commercial issues 與 BAU acceptance | Operations / Finance / Sustainability |

## Format inventory

Canonical formats are deliberately mixed：documents carry methodology and rationale；workbooks carry repeatable data / calculation / control；decks are limited to kickoff、workshop、roadmap、bidder briefing and executive decision discussions。Exact final counts and QA evidence are recorded in `05_FINAL_QA_REPORT.md`.
