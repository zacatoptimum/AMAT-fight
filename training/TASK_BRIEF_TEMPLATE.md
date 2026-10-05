# Task Brief Template

## Objective

這一小段工作要回答的單一核心問題是什麼？避免只寫活動，例如「整理資料」。

## Expected Output

最後要交出什麼 artifact、包含哪些 sections / sheets / slides、使用什麼格式、什麼叫可 review？

## Intended Use

誰會用這份成果，支持哪個 decision、meeting、client communication 或下一階段 handoff？

## Approach

預計使用什麼分析、比較、研究、訪談或驗證方法？為什麼足以回答 objective？

## Inputs

| Input | Source / owner | Status | Needed by | Quality / access note |
|---|---|---|---|---|

## Unknowns

分列 KNOWN、HYPOTHESIS、TBD WITH CLIENT、SYNTHETIC / DEMO DATA、RESEARCH REQUIRED。

## Questions to Confirm

只列如果不確認會影響方向、方法、決策或大量返工的問題。每題說明 why it matters、owner、needed-by date。

## First MVP

在 1–3 個工作天內可拿出來 review 的最小版本是什麼？至少包含 structure、one worked example、preliminary judgement 與 known limitations。

## Review Point

- Reviewer:
- Review date:
- Review question:
- Expected decision after review: Correct / Expand / Stop / Re-scope

## Definition of Done

列出內容完整、數字 / source、cross-deliverable、format / render、confidentiality、market conduct 與 handoff 的具體驗收條件。

## Analyst submission note

提交時用五行回答：My understanding；My approach；Assumptions to confirm；Preliminary conclusion；Recommendation / next action。

## Worked example — 1.4 RE100 gap analysis first MVP

| Field | Example content |
|---|---|
| Objective | 用一組可追溯的 baseline、target 與既有採購資料，計算年度 residual renewable electricity gap，並指出最影響結果的資料品質問題。 |
| Expected Output | 一個可重算的 workbook（Inputs、Gap Calculation、Sensitivity、Decision Output）及一頁 management summary；以 synthetic data 跑通。 |
| Intended Use | 讓 client sponsor 確認缺口口徑與優先資料補強，作為 1.5 portfolio volume constraint。 |
| Approach | 先做 annual MWh balance；將 site、target year、existing procurement 與 certificate eligibility 分開；用 high / base / low data-quality sensitivity 顯示範圍。 |
| Inputs | Electricity consumption、forecast、target definition、existing contracts / certificates、site boundary、data quality flag。Client values 均為 TBD；v0.1 使用標為 SYNTHETIC / DEMO DATA 的數值。 |
| Unknowns | HYPOTHESIS：分析需要 site-year granularity。TBD WITH CLIENT：target boundary、accepted evidence、existing procurement treatment、forecast owner。 |
| Questions to Confirm | 「缺口要支持哪個 approval year 與 procurement horizon？」因為它會改變 model period 與 roadmap sequencing；owner：client sponsor；review 前確認。 |
| First MVP | 先用 3 個 synthetic sites、3 年 horizon、2 個既有採購工具跑出 residual gap、coverage ratio 與一個 sensitivity case。 |
| Review Point | Zac / Project Lead 以 client decision 角度確認口徑、decision output 與缺失資料；決策為 Correct / Expand / Re-scope。 |
| Definition of Done | 數字可重算、synthetic/client input 明確分離、所有假設可追溯、結果可餵入 1.5、workbook 無 formula error、docx/xlsx 已 render QA。 |

此示例是 task-framing 示範，不代表已知 AMAT 電量、site、target、政策或既有採購事實。
