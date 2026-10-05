# Taiwan Renewable Electricity Market Scan Methodology v0.1

> `PRE-KICKOFF DRAFT`。本文件不宣稱任何 AMAT 需求、供應商能力或市場報價。Workbook 中的 entity、project、score 與 availability 均為 `SYNTHETIC / DEMO DATA`；真實 market scan 必須逐欄附 source / as-of date。

## 1. Decision first

2.1 不是蒐集越多公司越好。它要回答：哪些 market pathways 與 counterparties 值得用有限的 client disclosure 與團隊時間進一步驗證？G5 decision 應為：`contact`、`research more`、`defer` 或 `exclude with rationale`。

## 2. Unit of analysis

不要把 supplier、contracting entity 與 project 混為一列。最低建議三層：

| Layer | Stable key | 需要回答 |
|---|---|---|
| Organisation | Entity ID | 角色、能力、關聯方、公開紀錄、contact route |
| Commercial route | Route ID | retailer / generator / developer / intermediary 如何形成 electricity、contract、certificate interface |
| Project / supply block | Asset ID | technology、location range、status、COD range、volume/profile、evidence、dependencies |

若尚無 asset-level evidence，只能把 availability 標為 `UNVERIFIED`，不可從 company capability 推導可交付供應。

## 3. Category framework

- **Retailer / 售電業介面**：contracting、billing / settlement、aggregation、customer service、wheeling coordination。
- **Developer / Generator**：project pipeline、ownership / control、development maturity、generation risk、COD evidence。
- **Project / Asset**：technology、commercial operation / development stage、volume / shape、site / network dependency。
- **Certificate / service interface**：T-REC issuance / transfer、meter / registry / reconciliation、advisory / technology service。

分類是 research lens，不代表任何實體已具備特定資格；資格與現況需要官方／公司／交易文件驗證。

## 4. Comparable information fields

至少包含：stable ID、entity / asset category、contracting role、technology、location band、status / maturity、COD / start range、annual MWh / profile range、tenor range、price structure（不是未經授權的 quote）、wheeling / meter dependency、certificate treatment、credit / guarantee signal、evidence source、source date、confidence、truth status、unknown、next verification。

## 5. Evidence hierarchy

1. **Primary official**：主管機關、Taipower、T-REC 官方資料與正式登記；記錄版本／發布日期。
2. **Primary counterparty**：supplier written response、project documents、term sheet；仍屬 supplier statement，需 DD。
3. **Audited / formal corporate**：年報、投資人資料、正式公告；確認涵蓋期間與 entity。
4. **Reputable secondary**：只作 discovery / corroboration，不單獨支持高風險結論。
5. **Anecdote / market conversation**：記為 lead，不能當 fact；禁止 gossip。

每項 conclusion 應標註：`KNOWN`（由可靠證據支持）、`HYPOTHESIS`、`TBD WITH CLIENT`、`RESEARCH REQUIRED`。已過期來源保留但不得代表 current state。

## 6. Screening logic

### Hard screens

- 無法形成所需 procurement / certificate route；
- start / COD 明顯不符 approved time window；
- volume / technology / geography 不符 hard constraint；
- evidence / conflict / confidentiality red flag 未解除；
- counterparty 明確不接受必要的 process boundary。

Hard-screen 結果須附 evidence 與 reviewer；不得由 weighted score 抵銷。

### Priority scoring

通過 hard screen 後，才依 client-approved criteria 比較，例如：volume / timing fit、project maturity、commercial fit、execution / wheeling、certificate / claim fit、counterparty / credit、flexibility、evidence confidence。`Market_Landscape.xlsx` 的權重與 demo scores 只是模型測試，不是 AMAT judgement。

## 7. Research protocol

1. 寫明 research question 與 intended decision。
2. 先查 primary / official；search result 只作線索。
3. 對每個 material fact 記 URL / file、publisher、title、as-of / accessed date、摘要、evidence grade。
4. 將 fact 與 interpretation 分欄；若不同來源衝突，兩者都保留並開 issue。
5. 只蒐集 decision-useful information；敏感 client 資料不進 public search prompt。
6. 先用抽象問題研究，例如「台灣多據點買方轉供 meter prerequisites」，不輸入 client 名稱、site 或 volume。
7. 每次 shortlist review 檢查 stale evidence、duplicate entity / project、unverified supplier claim 與 conflict。

## 8. Preliminary market scan summary

目前能形成的第一版 judgement 是**研究架構**而非供應建議：AMAT 的可行路徑可能同時依賴 contracting counterparty、underlying project、wheeling / meter interface 與 certificate treatment。單純供應商名單不足以支持 shortlist；2.1 應以「route + asset evidence + dependencies」為比較單位。

`HYPOTHESIS`：先用 public desktop scan 建立 category universe，再以小範圍、經授權的 2.2 sounding 驗證 availability / maturity / commercial structure，可兼顧 information minimisation 與速度。

## 9. G5 review page

Project Lead 應用一頁回答：

- approved need / portfolio range 是什麼；
- universe 哪些類別已覆蓋、哪些仍是 research gap；
- hard-screen 適用何種 evidence；
- priority tier 為何，哪些只是 demo / hypothesis；
- client disclosure 到哪一層；
- 2.2 第一個 contact MVP 是誰／幾家／問什麼；
- 哪個 red flag 會立即停止或升級。

## 10. Handoff

2.2 取得的 written supplier feedback 回填同一 stable ID 與 source log；2.3 / 2.4 只使用通過 evidence boundary 的 option rows；2.5 bidder list 必須由 G5 / G6 approval 形成；2.6 scorecard 欄位與本 workstream 的 comparable fields 對齊。
