# AMAT Pre-delivery Repository v0.1

## 這套 repository 的用途

這是一套在 AMAT 正式 kickoff 前可直接啟動的企業再生能源採購顧問 delivery system。它不是對 AMAT 現況的斷言，也不是空白模板集合。它把目前能合理設計的方法、第一版客戶成果、內部控制、模型、工作節奏與訓練方法先建立，並把必須與客戶確認的事項留在可管理的位置。

**Build status：18 / 18 workstreams QA PASS；Final QA：12 PASS · 0 PARTIAL · 0 FAIL。** Repository 可供 internal use 與 kickoff calibration；不代表任何 AMAT-specific fact、market offer、legal conclusion 或採購決策已獲確認。

## 先讀哪裡

1. `01_MASTER_DELIVERY_BLUEPRINT.md`：18 項 workstream 的整體設計、依賴與 handoff。
2. `02_EXECUTIVE_REVIEW.md`：給 Founder / Zac 連續閱讀的 management document。
3. `03_BUILD_STATUS.md`：目前完成度、下一步與中斷續跑入口。
4. `04_ARTIFACT_INDEX.md`：artifact、路徑、用途與 intended user。
5. `05_FINAL_QA_REPORT.md`：最終 PASS / PARTIAL / FAIL 與原因。
6. `06_UNRESOLVED_ISSUES.md`：仍須由 AMAT、Optimum 或後續 research 解決的事項。

Founder / Zac 第一次 review 建議優先閱讀三份 DOCX：`01_MASTER_DELIVERY_BLUEPRINT.docx`、`02_EXECUTIVE_REVIEW.docx`、`05_FINAL_QA_REPORT.docx`。

## 中文成果 Menu

本區以中文顯示成果名稱，但保留實際英文檔名。這樣可以快速找檔，同時避免改名造成既有連結、build scripts、QA 紀錄與版本追蹤失效。

### 我現在想做什麼？

| 使用情境 | 先開這份 | 接著開 |
|---|---|---|
| 從管理層角度理解整個案子 | [管理層完整閱讀文件](02_EXECUTIVE_REVIEW.docx) | [18 項交付藍圖](01_MASTER_DELIVERY_BLUEPRINT.docx) → [最終品質檢查](05_FINAL_QA_REPORT.docx) |
| 下週要開 Kickoff | [1.1 工作包](workstreams/01_1.1_kickoff/01_WORK_PACKAGE.md) | [專案章程與工作方式](workstreams/01_1.1_kickoff/PROJECT_CHARTER_AND_WAYS_OF_WORKING.docx) → [Kickoff 簡報](workstreams/01_1.1_kickoff/Kickoff_Deck.pptx) |
| 要向 AMAT 發資料需求 | [1.2 工作包](workstreams/02_1.2_data-requirements/01_WORK_PACKAGE.md) | [資料需求指南](workstreams/02_1.2_data-requirements/DATA_REQUEST_GUIDE.docx) → [資料需求追蹤表](workstreams/02_1.2_data-requirements/Data_Request_Tracker.xlsx) |
| 要準備台灣市場工作坊 | [1.3 工作包](workstreams/03_1.3_taiwan-market-workshop/01_WORK_PACKAGE.md) | [工作坊設計與主持指南](workstreams/03_1.3_taiwan-market-workshop/WORKSHOP_DESIGN_AND_FACILITATOR_GUIDE.docx) → [工作坊簡報](workstreams/03_1.3_taiwan-market-workshop/Taiwan_Market_Workshop_Deck.pptx) |
| 要開始算 RE100 gap | [1.4 工作包](workstreams/04_1.4_re100-gap-analysis/01_WORK_PACKAGE.md) | [Gap 方法文件](workstreams/04_1.4_re100-gap-analysis/GAP_ANALYSIS_METHODOLOGY.docx) → [Gap 模型](workstreams/04_1.4_re100-gap-analysis/Gap_Analysis_Model.xlsx) |
| 要比較採購組合 | [1.5 工作包](workstreams/05_1.5_portfolio-scenario-analysis/01_WORK_PACKAGE.md) | [Portfolio 方法文件](workstreams/05_1.5_portfolio-scenario-analysis/PORTFOLIO_METHODOLOGY.docx) → [Scenario 模型](workstreams/05_1.5_portfolio-scenario-analysis/Scenario_Model.xlsx) |
| 要安排 roadmap 或進市場 | [1.6 工作包](workstreams/06_1.6_alignment-roadmap/01_WORK_PACKAGE.md) | [Alignment / Roadmap 文件](workstreams/06_1.6_alignment-roadmap/ALIGNMENT_ROADMAP.docx) → [Roadmap 簡報](workstreams/06_1.6_alignment-roadmap/Roadmap_Deck.pptx) |
| 要交工作給新人 | [新人交付指南](training/NEW_HIRE_DELIVERY_GUIDE.docx) | [任務簡報模板](training/TASK_BRIEF_TEMPLATE.docx) → 對應 workstream 的工作包 |
| 要找任一成果 | [完整成果索引](04_ARTIFACT_INDEX.md) | [目前狀態](03_BUILD_STATUS.md) → [未解決事項](06_UNRESOLVED_ISSUES.md) |

### 18 個 workstreams 中文索引

| 編號 | 中文工作名稱 | 工作說明 | 主要成果 |
|---|---|---|---|
| 1.1 | 專案啟動與工作方式確認 | [工作包](workstreams/01_1.1_kickoff/01_WORK_PACKAGE.md) | [專案章程](workstreams/01_1.1_kickoff/PROJECT_CHARTER_AND_WAYS_OF_WORKING.docx) · [Kickoff 簡報](workstreams/01_1.1_kickoff/Kickoff_Deck.pptx) |
| 1.2 | 資料與需求蒐集 | [工作包](workstreams/02_1.2_data-requirements/01_WORK_PACKAGE.md) | [資料需求指南](workstreams/02_1.2_data-requirements/DATA_REQUEST_GUIDE.docx) · [需求追蹤表](workstreams/02_1.2_data-requirements/Data_Request_Tracker.xlsx) · [資料字典](workstreams/02_1.2_data-requirements/Data_Dictionary.xlsx) |
| 1.3 | 台灣市場與再生能源採購工作坊 | [工作包](workstreams/03_1.3_taiwan-market-workshop/01_WORK_PACKAGE.md) | [設計與主持指南](workstreams/03_1.3_taiwan-market-workshop/WORKSHOP_DESIGN_AND_FACILITATOR_GUIDE.docx) · [工作坊簡報](workstreams/03_1.3_taiwan-market-workshop/Taiwan_Market_Workshop_Deck.pptx) |
| 1.4 | 需求與 RE100 缺口分析 | [工作包](workstreams/04_1.4_re100-gap-analysis/01_WORK_PACKAGE.md) | [方法文件](workstreams/04_1.4_re100-gap-analysis/GAP_ANALYSIS_METHODOLOGY.docx) · [Gap 模型](workstreams/04_1.4_re100-gap-analysis/Gap_Analysis_Model.xlsx) |
| 1.5 | 採購組合與情境分析 | [工作包](workstreams/05_1.5_portfolio-scenario-analysis/01_WORK_PACKAGE.md) | [方法文件](workstreams/05_1.5_portfolio-scenario-analysis/PORTFOLIO_METHODOLOGY.docx) · [Scenario 模型](workstreams/05_1.5_portfolio-scenario-analysis/Scenario_Model.xlsx) |
| 1.6 | 跨部門對齊與 RE100 路徑圖 | [工作包](workstreams/06_1.6_alignment-roadmap/01_WORK_PACKAGE.md) | [Roadmap 文件](workstreams/06_1.6_alignment-roadmap/ALIGNMENT_ROADMAP.docx) · [Roadmap 簡報](workstreams/06_1.6_alignment-roadmap/Roadmap_Deck.pptx) |
| 2.1 | 市場掃描與供應商盤點 | [工作包](workstreams/07_2.1_market-scan/01_WORK_PACKAGE.md) | [市場掃描方法](workstreams/07_2.1_market-scan/MARKET_SCAN_METHODOLOGY.docx) · [市場全貌表](workstreams/07_2.1_market-scan/Market_Landscape.xlsx) |
| 2.2 | 初步市場接觸與供應條件確認 | [工作包](workstreams/08_2.2_market-engagement/01_WORK_PACKAGE.md) | [市場接觸規範](workstreams/08_2.2_market-engagement/MARKET_ENGAGEMENT_PROTOCOL.docx) · [互動追蹤表](workstreams/08_2.2_market-engagement/Interaction_Tracker.xlsx) |
| 2.3 | 短期補充型採購方案評估 | [工作包](workstreams/09_2.3_short-term-procurement/01_WORK_PACKAGE.md) | [短期方案評估](workstreams/09_2.3_short-term-procurement/SHORT_TERM_PROCUREMENT_ASSESSMENT.docx) · [方案比較模型](workstreams/09_2.3_short-term-procurement/Short_Term_Option_Comparison.xlsx) |
| 2.4 | 中長期主力型採購方案評估 | [工作包](workstreams/10_2.4_long-term-procurement/01_WORK_PACKAGE.md) | [長期方案評估](workstreams/10_2.4_long-term-procurement/LONG_TERM_PROCUREMENT_ASSESSMENT.docx) · [商業比較模型](workstreams/10_2.4_long-term-procurement/Long_Term_Commercial_Comparison.xlsx) |
| 2.5 | 定向提案／報價徵詢 | [工作包](workstreams/11_2.5_targeted-rfq/01_WORK_PACKAGE.md) | [RFQ / RFP 文件](workstreams/11_2.5_targeted-rfq/RFQ_RFP_PACKAGE.docx) · [供應商回覆模板](workstreams/11_2.5_targeted-rfq/Supplier_Response_Template.xlsx) · [Bidder Briefing](workstreams/11_2.5_targeted-rfq/Bidder_Briefing_Deck.pptx) |
| 2.6 | 方案評估、盡職調查與候選名單 | [工作包](workstreams/12_2.6_evaluation-due-diligence/01_WORK_PACKAGE.md) | [評估與決策文件](workstreams/12_2.6_evaluation-due-diligence/EVALUATION_AND_DECISION_MEMO.docx) · [評分表](workstreams/12_2.6_evaluation-due-diligence/Scorecard.xlsx) |
| 3.1 | 最終需求與商業條件對齊 | [工作包](workstreams/13_3.1_commercial-alignment/01_WORK_PACKAGE.md) | [商業條件對齊備忘錄](workstreams/13_3.1_commercial-alignment/COMMERCIAL_ALIGNMENT_MEMO.docx) · [商業條件追蹤表](workstreams/13_3.1_commercial-alignment/Commercial_Term_Tracker.xlsx) |
| 3.2 | 合約與交易條件審閱 | [工作包](workstreams/14_3.2_contract-review/01_WORK_PACKAGE.md) | [合約審閱手冊](workstreams/14_3.2_contract-review/CONTRACT_REVIEW_PLAYBOOK.docx) · [商業／法律議題表](workstreams/14_3.2_contract-review/Commercial_Legal_Issue_Tracker.xlsx) |
| 3.3 | 第一輪談判與修正 | [工作包](workstreams/15_3.3_negotiation-round-1/01_WORK_PACKAGE.md) | [談判策略備忘錄](workstreams/15_3.3_negotiation-round-1/NEGOTIATION_STRATEGY_MEMO.docx) · [談判追蹤表](workstreams/15_3.3_negotiation-round-1/Negotiation_Tracker.xlsx) |
| 3.4 | 後續談判與內部決策 | [工作包](workstreams/16_3.4_negotiation-decision/01_WORK_PACKAGE.md) | [談判決策備忘錄](workstreams/16_3.4_negotiation-decision/NEGOTIATION_DECISION_MEMO.docx) · [立場追蹤表](workstreams/16_3.4_negotiation-decision/Position_Tracker.xlsx) · [決策簡報](workstreams/16_3.4_negotiation-decision/Negotiation_Decision_Pack.pptx) |
| 3.5 | 簽約與執行準備 | [工作包](workstreams/17_3.5_signing-readiness/01_WORK_PACKAGE.md) | [簽約準備檢查表](workstreams/17_3.5_signing-readiness/SIGNING_READINESS_CHECKLIST.docx) · [先決條件追蹤表](workstreams/17_3.5_signing-readiness/Conditions_Precedent_Tracker.xlsx) |
| 3.6 | 採購方案落地與執行追蹤 | [工作包](workstreams/18_3.6_execution-tracking/01_WORK_PACKAGE.md) | [執行治理文件](workstreams/18_3.6_execution-tracking/EXECUTION_GOVERNANCE.docx) · [落地追蹤表](workstreams/18_3.6_execution-tracking/Implementation_Tracker.xlsx) |

### 共用控制與保護機制

| 類型 | 中文入口 |
|---|---|
| 專案控制 | [專案控制指南](shared/PROJECT_CONTROL_GUIDE.docx) · [專案總控表](shared/Project_Control_Register.xlsx) |
| 雙週／月報／會議 | [雙週報模板](shared/BIWEEKLY_STATUS_REPORT_TEMPLATE.md) · [月報模板](shared/MONTHLY_REPORT_TEMPLATE.md) · [會議紀錄模板](shared/MEETING_MINUTES_TEMPLATE.md) |
| 版本控制 | [版本與審閱規則](shared/VERSION_REVIEW_RULE.md) |
| 保密 | [保密與研究衛生規範](shared/CONFIDENTIALITY_AND_RESEARCH_HYGIENE.docx) |
| 市場行為 | [市場行為與資訊邊界](shared/MARKET_CONDUCT_AND_INFORMATION_BOUNDARY.docx) |
| 新人訓練 | [新人交付指南](training/NEW_HIRE_DELIVERY_GUIDE.docx) · [任務簡報模板](training/TASK_BRIEF_TEMPLATE.docx) |

### 檔案格式怎麼選

- 想快速閱讀與理解：先開 DOCX。
- 想修改文字或讓 AI 搜尋：開對應 MD。
- 想輸入資料、計算或追蹤：開 XLSX，並先讀同資料夾的 MODEL_README。
- 要主持會議或對外討論：開 PPTX；要修改 storyline，先讀同資料夾的 DECK_CONTENT MD。

## 工作原則

所有重要工作在開始前要先定義 Objective、Expected Output、Intended Use、Approach、Inputs、Unknowns / Assumptions、First MVP 與 Review Point。高不確定性工作採用 Define → MVP → Review → Correct → Expand。

## 資訊真實性

本 repository 使用五種標籤：KNOWN、HYPOTHESIS、TBD WITH CLIENT、SYNTHETIC / DEMO DATA、RESEARCH REQUIRED。未標示的 AMAT-specific 數字、組織、偏好、預算、site 狀況或 commercial terms 不得被推定為事實。

## 資料夾

- `shared/`：project control、architecture、confidentiality、market conduct 與共用規則。
- `training/`：新人 guide 與 task brief。
- `workstreams/`：1.1–3.6 共 18 個 work package，保持平坦。
- `_qa/`：render、inspection 與自動化檢查產物，只供內部 QA，不是 client deliverable。

## 中斷後如何續跑

先讀 `03_BUILD_STATUS.md`，從第一個不是 QA PASS 的項目開始。現在所有 build area 均為 QA PASS；下一輪應從 kickoff calibration 開始，而不是重做 v0.1。先完成正在做的 artifact，再更新 status 與 unresolved issues。
