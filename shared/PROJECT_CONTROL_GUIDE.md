# AMAT Project Control Guide v0.1

## Purpose

本 guide 定義專案期間如何記錄狀態、會議、actions、risks、issues、decisions、assumptions、changes、sources、stakeholders、client questions、deliverables 與 schedule。`Project_Control_Register.xlsx` 是唯一結構化主檔；報告模板只引用主檔，不建立另一套狀態。

## Control principles

1. **One record one ID**：每筆 action、risk、issue、decision、assumption、change、question、deliverable、milestone 都有固定 ID。
2. **Separate risk from issue**：risk 尚未發生；issue 已發生並影響 scope、time、quality、cost、relationship 或 compliance。
3. **Decision evidence**：重要 decision 記錄 decision maker、date、options considered、rationale、conditions 與 affected artifacts。
4. **Assumption expiry**：assumption 必須有 validation owner 與 review date；到期未驗證即升級為 risk / issue。
5. **Source hygiene**：source 記錄 title、publisher / owner、date、URL / location、access date、reliability、scope、limitations 與 used-in artifacts。
6. **No hidden changes**：scope、timeline、deliverable、method或client request的變更進入 change log，再決定 absorb、defer、reject 或 formal change。
7. **Short status**：biweekly / monthly report 只呈現 decisions、exceptions、next milestones，不複製全部 log。

## Workbook sheets and ownership

| Sheet | Purpose | Minimum fields | Update owner | Review cadence |
|---|---|---|---|---|
| Status | 一頁專案 health 與 upcoming decisions | as-of、phase、overall status、progress、next gates、top risks / issues、help needed | PMO | Biweekly |
| Minutes | 會議目的、結論、決策與 actions | meeting ID、date、participants、objective、summary、decision IDs、action IDs | Meeting owner | Within 24h |
| Actions | 可執行承諾 | ID、action、owner、due、status、dependency、evidence | Assigned owner | Weekly |
| Risks | 未發生的不確定事件 | ID、cause-event-impact、likelihood、impact、rating、response、owner、trigger | Risk owner | Biweekly |
| Issues | 已發生問題 | ID、fact pattern、impact、containment、resolution、owner、target | Issue owner | Weekly |
| Decisions | 正式決策紀錄 | ID、decision、maker、date、options、rationale、conditions、affected items | PMO | On decision |
| Assumptions | 暫用判斷 | ID、statement、basis、impact、validation method、owner、review date、status | Analyst | Weekly |
| Changes | scope / method / time 變更 | ID、request、requester、impact、recommendation、decision、date | Project Lead | As raised |
| Sources | 證據與引用 | ID、type、title、owner / publisher、date、location、access date、reliability、limitations、used in | Analyst | On use |
| Stakeholders | role and engagement | ID、role、function、influence、interest、decision role、engagement plan、status | Project Lead | Monthly |
| Client Questions | 對客戶待確認事項 | ID、question、why needed、answer owner、needed by、status、answer / evidence | Workstream owner | Weekly |
| Deliverables | output register | ID、workstream、artifact、audience、owner、reviewer、due、version、status、acceptance | PMO | Weekly |
| Schedule | milestones and dependencies | ID、workstream、milestone、start、finish、owner、predecessor、gate、status | PMO | Weekly |

## Status definitions

- **NOT STARTED**：尚未開始，inputs 或 owner 可以已知。
- **IN PROGRESS**：正在建立 MVP 或收集必要 inputs。
- **DRAFT COMPLETE**：第一版內容完整，可進行 client-style review。
- **QA PENDING**：內容 review 已完成，等待 formula / render / cross-check 或 owner approval。
- **QA PASS**：通過適用 acceptance criteria，剩餘事項不影響 intended use。
- **BLOCKED**：無法安全或有意義地前進；必須填 blocker、owner、needed action 與 escalation date。

## RAG logic

- **Green**：current gate 可按時完成，沒有未處理的 high risk / issue。
- **Amber**：仍可恢復，但需要在指定日期前取得 decision / data / mitigation。
- **Red**：已影響 committed milestone、scope、quality、compliance 或 client relationship，需要 sponsor / Project Lead action。
- **Gray**：尚無足夠 evidence 判斷，不以 Green 代替未知。

## Meeting-to-control workflow

1. 會前寫 Objective、Expected Output、Intended Decision、pre-read 與 needed participants。
2. 會中只記 evidence、decision、open question 與 action，不把逐字稿當 minutes。
3. 會後 24 小時內發出 minutes；每個 action / decision 連回主 register ID。
4. 任何未獲答案的 critical question 進 Client Questions；任何暫用推定進 Assumptions。
5. 下次會議先處理 overdue action、decision due 與 new red / amber items。

## Reporting rule

Biweekly report 回答：what changed、what decision is needed、what happens next。Monthly report 額外提供 milestone trend、deliverable acceptance、risk pattern、change summary 與 next-month outlook。詳細 log 不貼入報告；以 IDs 連回 register。

## Escalation thresholds

立即升級 Project Lead：confidentiality / market conduct concern、client expectation mismatch、scope ambiguity with material work impact、high commercial risk、deadline slip affecting decision gate、data error affecting published conclusion、supplier complaint or conflict concern。

## Definition of Done

Project controls 完成需符合：所有 active items 有 ID / owner / date；沒有 open high risk / issue 無 response；published status與 source registers一致；decision / assumption可追溯到 affected artifact；overdue items 有 escalation or replan evidence。
