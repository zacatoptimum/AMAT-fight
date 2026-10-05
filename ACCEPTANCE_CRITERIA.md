# AMAT Pre-delivery Repository v0.1 Acceptance Criteria

## 文件目的

本文件是 repository 的共同驗收基準。Architecture QA、work package QA、cross-workstream audit 與 final QA 都必須逐項回到本文件判斷，不以「檔案存在」作為完成標準。

## 資訊狀態標籤

所有 AMAT、台灣市場與交易相關內容，必須使用下列狀態之一：

- **KNOWN**：已有可靠證據或由客戶正式確認。
- **HYPOTHESIS**：合理推定，但必須在正式專案中驗證。
- **TBD WITH CLIENT**：只有客戶能決定或確認。
- **SYNTHETIC / DEMO DATA**：只為測試方法、模型或流程使用的假資料，不得被視為客戶數據。
- **RESEARCH REQUIRED**：目前沒有足夠可靠資料，需另行研究並記錄來源與日期。

## A Scope completeness

驗收條件：

- 1.1 至 3.6 共 18 個 work package 全部存在，並各有獨立資料夾。
- recurring project management / reporting、training、confidentiality、market conduct 皆有可使用成果。
- 根目錄人類閱讀文件齊全，可不逐一打開 18 個資料夾便掌握整體狀況。
- 每項 scope 都清楚指出其前置條件、decision、output 與下一階段 handoff。

判定方式：18 項逐項清點；缺任何一項即不得判定 PASS。

## B Artifact completeness

驗收條件：

- 每個 work package 都有 `01_WORK_PACKAGE.md`，涵蓋 Purpose、Client question、Intended decision、Client audience、Optimum owner / supporting role、Inputs、Activities、Outputs、Dependencies、Known、Hypotheses、TBD with client、Key risks、MVP sequence、Definition of Done。
- 每個 work package 至少有一份具 first-pass substance 的成果，不得只有 TODO、標題或空表格。
- 需要計算或追蹤的成果以 XLSX 實作；需要客戶討論的成果以 DOCX 或 PPTX 實作；需要後續 AI 維護的成果保留 Markdown companion。
- 重要 deck 有 `DECK_CONTENT.md`；重要 workbook 有 `MODEL_README.md`。

## C Client usability

驗收條件：

- artifact 明確寫出 client question、intended decision、audience 與 intended use。
- client-facing draft 不混入未標示的內部推測；未知資訊有明確的確認問題。
- 成果可直接支持 kickoff、workshop、decision discussion、supplier engagement、negotiation 或 implementation，而非僅描述方法。
- 重要輸出精煉、decision-oriented，避免把 supporting detail 塞入 deck。

## D Internal usability

驗收條件：

- Optimum owner、supporting role、reviewer 與 escalation point 清楚。
- 每個 artifact 有 version / review 規則、inputs、依賴與下一步。
- 研究、判斷與假設可追溯到 source log、assumption log 或 decision log。
- Founder / Project Lead 的參與集中於客戶期待、高判斷密度、commercial judgement 與 final quality control。

## E New-hire usability

驗收條件：

- 新人可只依 task brief 與 work package 開始第一個 MVP，不需先接受長時間口頭說明。
- 1.x 明確訓練 expected output confirmation 與 defined problem execution。
- 2.x 開始要求 analyst 先提問題、方法、假設、preliminary judgement 與 first draft。
- 文件清楚說明何時自己研究、何時詢問 Zac / project lead、如何接受 client-style review。

## F Conciseness

驗收條件：

- 每一 artifact 都能回答「刪除後 delivery system 會少掉什麼」。回答不出時應合併或刪除。
- document 優先；deck 只用於需要同步討論、對齊或高階溝通的情境。
- kickoff 約 6–10 頁、workshop 約 12–20 頁、decision deck 約 5–12 頁為 soft target；超出時 QA 必須說明必要性。
- 同一結論不在多份 artifact 重複維護；主檔負責計算或記錄，其他文件僅引用。

## G Confidentiality

驗收條件：

- 有明確資訊分類、need-to-know、檔案處理、AI / SaaS 使用、匿名化、外洩應變規則。
- 未經確認不得將 AMAT 身分、需求量、site 資料、commercial terms 或供應商報價放入外部工具或對外訊息。
- 正式 NDA、客戶 NDA 與資訊安全要求列為專案啟動後必須確認事項。
- 合成資料不得與真實客戶資料混淆。

## H Market conduct

驗收條件：

- 市場接觸遵循 information minimisation、neutrality、no false commitment、no gossip 與 no cross-supplier disclosure。
- 市場 scan、supplier outreach、RFQ 與 negotiation 階段的資訊邊界一致。
- 任何客戶身分或 volume disclosure 都有授權與記錄。
- 文件反映核心原則：**We participate in the market without unnecessarily becoming a market position.**

## I Known Hypothesis TBD separation

驗收條件：

- AMAT-specific facts 沒有被推定成已知。
- 每個 work package 都分列 Known、Hypotheses、TBD with client；必要時另列 Synthetic / Demo Data 與 Research Required。
- public market information 記錄來源、日期、範圍與限制。
- 模型輸入欄位可辨識客戶資料、外部資料、假設與計算結果。

## J Cross-workstream consistency

驗收條件：

- 1.2 請求的資料足以支撐 1.4、1.5、1.6。
- 1.3 workshop 使參與者能理解並參與 1.5、1.6 與 2.x 決策。
- 1.4 gap 進入 1.5 portfolio；1.5 形成 1.6 roadmap；1.6 定義 2.x procurement activities。
- 2.1 欄位進入 2.2–2.6；2.5 response schema 能直接進入 2.6 evaluation。
- 2.6 shortlist 與風險進入 3.1；3.1 條件進入 3.2；3.2 issue list 進入 3.3。
- 3.3 / 3.4 決策進入 3.5；3.5 readiness 與 owner handoff 進入 3.6。

## K Resumability

驗收條件：

- `03_BUILD_STATUS.md` 在每個重要階段或 workstream 完成後更新。
- 狀態只使用 NOT STARTED、IN PROGRESS、DRAFT COMPLETE、QA PENDING、QA PASS、BLOCKED。
- 每個未完成項目都有 current state、next action、blocking issue 與主要檔案位置。
- 中斷後可從第一個非 QA PASS 項目續跑，不必重做已完成成果。

## L No placeholder-only package

驗收條件：

- 每個 package 至少包含一個已填入的 example、demo、decision logic、question set、checklist、script、model calculation 或具體 recommendation framework。
- 空白模板只能作為成果的一部分，不能是唯一成果。
- workbook 至少有可運作公式、資料驗證或追蹤邏輯；要求 demo 的 model 必須能跑 synthetic data。
- deck 至少有完整 storyline、message title、page-level content、visual concept 與 discussion point。

## QA 判定規則

- **PASS**：相關條件全部滿足，僅有不影響使用的 minor note。
- **PARTIAL**：有可用成果，但仍缺少一項重要輸入、驗證或 handoff；必須列出 owner 與下一步。
- **FAIL**：缺 scope、只有 placeholder、無法支持 intended decision，或違反 confidentiality / market conduct / information truthfulness。

任何 FAIL 都阻止 repository final QA PASS。PARTIAL 可以保留，但必須進入 `06_UNRESOLVED_ISSUES.md` 並在 kickoff 後有明確校準計畫。
