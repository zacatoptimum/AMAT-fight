# AMAT Pre-delivery Repository Build Status

Last updated: 2026-09-27

## Resume rule

下次執行先讀本檔，從第一個不是 `QA PASS` 的項目繼續。先完成該 artifact，再更新本檔與 `06_UNRESOLVED_ISSUES.md`。不要重做已 QA PASS 的項目。

## Status legend

NOT STARTED · IN PROGRESS · DRAFT COMPLETE · QA PENDING · QA PASS · BLOCKED

## Overall progress

| Area | Status | Completed evidence | Next action |
|---|---|---|---|
| Architecture | QA PASS | Acceptance criteria、scope map、artifact strategy、folder plan、dependency logic、Architecture QA | 正式 kickoff 後以 G0 校準 client reality |
| Shared PM | QA PASS | Project control guide、biweekly / monthly / minutes templates、version rule、13-sheet master register；公式與 13 sheets render QA 通過 | 正式 kickoff 後填 client owners / cadence |
| Training | QA PASS | NEW_HIRE_DELIVERY_GUIDE、TASK_BRIEF_TEMPLATE（含 1.4 worked example）MD / DOCX；render QA 通過 | 以 1.x 實際 coaching 回饋迭代 |
| Confidentiality | QA PASS | CONFIDENTIALITY_AND_RESEARCH_HYGIENE MD / DOCX；Stop / Report / Contain / Document 與工具邊界完整；render QA 通過 | 正式 kickoff 後對照 NDA / InfoSec 要求 |
| Market Conduct | QA PASS | MARKET_CONDUCT_AND_INFORMATION_BOUNDARY MD / DOCX；disclosure ladder、可接受 / 不可接受行為與升級規則；render QA 通過 | 2.2 啟動前取得 client disclosure authorization |
| 1.1 | QA PASS | Work package、7-page charter / ways of working MD+DOCX、8-slide kickoff deck + content source；PPTX validator、逐頁 DOCX/PPTX render、cross-handoff QA 通過 | Kickoff 後以 client answers 升版為 v1 |
| 1.2 | QA PASS | Work package、7-page Data Request Guide MD+DOCX、5-sheet Data Request Tracker、3-sheet Data Dictionary、MODEL_README；synthetic examples、working formulas、8-sheet render與 DOCX逐頁 QA 通過 | Kickoff 後指派 data owners、替換 demo rows、作 G1 readiness review |
| 1.3 | QA PASS | Work package、6-page workshop design / facilitator guide MD+DOCX、15-slide workshop deck + content source；stakeholder hypotheses、three-flow teaching frame、decisions / follow-up、official source protocol完整；DOCX/PPTX逐頁與 validator QA 通過 | Kickoff後確認 audience、segments、policy / market facts並升版 |
| 1.4 | QA PASS | Work package、5-page gap methodology MD+DOCX、7-sheet Gap Analysis Model、MODEL_README；synthetic dataset、target / coverage / residual gap / sensitivities formulas可運算，7 sheets與DOCX逐頁QA通過 | 取得 client data後替換 demo rows、reconcile並取得G3核准 |
| 1.5 | QA PASS | Work package、3-page portfolio methodology MD+DOCX、5-sheet Scenario Model、MODEL_README；三種synthetic archetypes可重算coverage / cost / concentration / weighted score，formula scan、5 sheets與DOCX逐頁QA通過 | 以G3 gap與market evidence替換demo、核准criteria / constraints並取得G4決策 |
| 1.6 | QA PASS | Work package、4-page Alignment / Roadmap MD+DOCX、8-slide Roadmap deck + content source；G3–G11 gates、90-day MVP、critical path、disclosure staircase與2.x launch readiness完整；DOCX/PPTX逐頁與validator QA通過 | Kickoff後確認decision authority、deadline、owners與G5條件並升版 |
| 2.1 | QA PASS | Work package、3-page Market Scan Methodology MD+DOCX、5-sheet Market Landscape、MODEL_README；route/entity/asset framework、source protocol、hard-screen與synthetic weighted screening可重算，formula scan與逐頁/逐sheet QA通過 | G5後以primary sources替換demo universe，核准small-universe 2.2 contact MVP |
| 2.2 | QA PASS | Work package、2-page Engagement Protocol MD+DOCX、5-sheet Interaction Tracker、MODEL_README；questionnaire、email / meeting script、disclosure boundary、red flags、feedback memo與working counts完整，逐頁/逐sheet QA通過 | G5書面授權後執行small-universe sounding並回填evidence |
| 2.3 | QA PASS | Work package、2-page Short-term Assessment MD+DOCX、5-sheet Option Comparison、MODEL_README；3個synthetic archetypes、coverage / cost / concentration / scoring formulas與decision brief可跑，formula scan與QA通過 | 以1.4 gap、client eligibility與2.2 evidence替換demo後取得bridge decision |
| 2.4 | QA PASS | Work package、2-page Long-term Assessment MD+DOCX、5-sheet Commercial Comparison、MODEL_README；project maturity、all-in cost、COD downside、risk allocation與decision brief完整，formula scan與QA通過 | 取得real asset / offer evidence後核准RFQ structure / risk boundary |
| 2.5 | QA PASS | Work package、2-page RFQ/RFP Package MD+DOCX、7-sheet Supplier Response Template、MODEL_README、8-slide Bidder Briefing deck + content source；response comparability、Q&A/addenda、evidence index與compliance checks完整，PPTX validator及逐頁/逐sheet QA通過 | G6前由Procurement/Legal鎖定bidder list、process status、dates、legal language與weights |
| 2.6 | QA PASS | Work package、2-page Evaluation / DD / Decision Memo MD+DOCX、7-sheet Scorecard、MODEL_README；hard screen、independent scoring、DD、risk assessment與shortlist conditions可追溯，修正SUMPRODUCT後formula scan與逐頁/逐sheet QA通過 | 以issued responses / DD替換demo，由authorized body做G7 decision並移交3.1 |
| 3.1 | QA PASS | Work package、2-page Commercial Alignment Memo MD+DOCX、5-sheet Commercial Term Tracker、MODEL_README；assumption / term / authority / issue IDs 與 G8 summary 可追溯，formula scan、逐頁/逐sheet QA 通過 | 以 G7 shortlist 與 client mandate 替換 demo / TBD，核准 negotiation authority |
| 3.2 | QA PASS | Work package、2-page Contract Review Playbook MD+DOCX、5-sheet Commercial / Legal Issue Tracker、MODEL_README；commercial review vs legal advice、document control、clause / issue / counsel / agenda lineage 完整，逐頁/逐sheet QA 通過 | 由 qualified counsel 確認法律問題與 redline；以 final draft 版本更新 issue mapping |
| 3.3 | QA PASS | Work package、2-page Negotiation Strategy Memo MD+DOCX、5-sheet Negotiation Tracker、MODEL_README；issue position、give/get、authority、meeting record與post-meeting summary完整，formula scan、逐頁/逐sheet QA 通過 | 實際談判前核准 mandate / roles；會後依 controlled record 更新3.2/3.4 |
| 3.4 | QA PASS | Work package、1-page Negotiation & Internal Decision Memo MD+DOCX、5-sheet Position Tracker、7-slide Decision Pack + content source、MODEL_README；delta / scenario / residual risk / decision record完整，workbook formulas與逐頁/逐sheet QA通過；deck validator PASS並逐頁檢視 | 以真實latest positions / validity / economics建立G9 decision，明確記錄accept / counter / fallback / pause / stop |
| 3.5 | QA PASS | Work package、2-page Signing Readiness Checklist MD+DOCX、6-sheet Conditions Precedent Tracker、MODEL_README；document / authority / CP / responsibility / system-data / transition controls完整，逐頁/逐sheet QA通過 | Client Legal / authorized signer核准final set；所有critical owner / evidence於G10前關閉或正式接受 |
| 3.6 | QA PASS | Work package、2-page Execution Governance MD+DOCX、8-sheet Implementation Tracker、MODEL_README；milestone、delivery、certificate、invoice reconciliation、issue / reporting / BAU controls含synthetic dry run，formula scan、逐頁/逐sheet QA通過 | 以signed baseline與live data替換demo；經穩定cycles與G11 acceptance後轉BAU |
| Cross audit | QA PASS | `shared/CROSS_WORKSTREAM_AUDIT.md` 逐鏈驗證 1.2→1.4/1.5/1.6 至 3.5→3.6；完成唯一一次 cross revision | Kickoff 後在各 gate 以真實 evidence 重驗 |
| Executive Review | QA PASS | 27 sections、29-page MD / DOCX；delivery logic、18 workstreams、controls、training、boundaries與risks完整；逐頁 render QA 通過 | Founder / Zac 依 recommended sequence review client judgement |
| Artifact Index | QA PASS | `04_ARTIFACT_INDEX.md` 列 root、shared、training 與 18 workstreams 的 artifact、path、purpose、intended user | 新增或升版 artifact 時同步更新 |
| Final QA | QA PASS | `05_FINAL_QA_REPORT.md` / `.docx`；A–L 為 12 PASS / 0 PARTIAL / 0 FAIL；8-page DOCX逐頁render QA通過 | Release v0.1 for internal use and kickoff calibration |

## Current next action

BUILD COMPLETE：AMAT Pre-delivery Repository v0.1 已可供 internal use 與 kickoff calibration。下一步不是重建 repository；應先完成 G0 client expectation / authority / information-rule validation，再依 `06_UNRESOLVED_ISSUES.md` 與各 workstream next action 將相關 artifact 升為 client-calibrated v1。
