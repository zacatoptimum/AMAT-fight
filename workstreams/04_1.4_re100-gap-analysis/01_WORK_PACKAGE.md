# 1.4 需求與 RE100 缺口分析 — Work Package v0.1

> PRE-KICKOFF DRAFT。所有 AMAT consumption、target、existing procurement 與 site facts 均為 `TBD WITH CLIENT`；workbook 內數字一律為 `SYNTHETIC / DEMO DATA`。

## Purpose

建立一個可追溯、可由客戶核准的 baseline / target / existing procurement / residual gap 計算，讓後續 portfolio、roadmap 與 market activity 使用同一需求口徑。

## Client question

在已核准的組織、site、期間、target 與 eligibility 邊界下，AMAT 每年尚需補足多少符合政策的 renewable electricity？資料品質會讓答案落在哪個範圍？

## Intended decision

- G3：核准 calculation boundary、target curve、existing procurement treatment 與 residual gap。
- 核准哪些缺口值可直接進入 1.5；哪些只能用 sensitivity / range。
- 指派 unresolved data / policy issue 的 owner 與截止日。

## Client audience

Sustainability / RE100 owner、Facilities / site data owners、Procurement、Finance；Legal 與 regional / global sustainability 視 eligibility / claim policy 參與。以上為 `HYPOTHESIS`。

## Optimum owner / supporting role

- Owner：Optimum analysis lead。
- Support：data analyst、project lead、Taiwan market SME。
- Reviewer：Zac / project lead 以 client decision perspective review；client policy owner 核准邊界。

## Inputs

- 1.2 site / meter master、consumption actuals、forecast、target / policy、existing procurement。
- 1.3 confirmed terminology、eligible option questions、decision owner。
- Source / assumption / data gap logs。

## Activities

1. 定義 denominator、numerator、site / meter / period / currency / unit 邊界。
2. 區分 contracted、expected、delivered、eligible 與 claimed volume。
3. 檢查 completeness、duplicates、reconciliation、overlap 與 expiry。
4. 計算 target renewable MWh、eligible coverage、residual gap、coverage ratio。
5. 執行 load growth / delivery haircut sensitivities，標示 data-quality range。
6. 與 owner review，記錄 approved / conditional / rejected assumptions。

## Outputs

- `GAP_ANALYSIS_METHODOLOGY.md` / `.docx`。
- `Gap_Analysis_Model.xlsx`：synthetic dataset、formula-driven gap、sensitivities、management summary。
- `MODEL_README.md`：sheet、inputs、calculations、mapping、refresh / QA rules。

## Dependencies

Upstream：1.1 decision rights、1.2 data package、1.3 market / claim language。Downstream：1.5 scenario demand、1.6 roadmap volume / timing、2.x market sizing、3.6 delivery reconciliation。

## Known

- 本 work package 與方法架構已建立。
- 1.2 已定義所需資料欄位與 quality / gap process。
- residual gap 必須由 owner-approved boundary 與 eligibility rules 產生。

## Hypotheses

- 年度 MWh 是第一個可行 planning grain；月 / interval matching 是否必要仍需確認。
- existing procurement 的可用量需乘上 delivery / eligibility factor，而非一律等於 contract volume。
- load growth、delivery underperformance 是第一版至少應量化的 sensitivities。

## TBD with client

- sites / meters / legal entity / reporting boundary。
- base year、target years、target percentage curve、RE100 / internal policy definition。
- gross / net load treatment、onsite generation、losses、certificate-only eligibility。
- existing contract allocation、expiry、expected delivery、claim ownership與 double-count controls。
- 接受的 data-quality threshold 與 sign-off owner。

## Key risks

- 分母或 eligibility 定義錯誤造成 false precision。
- 多份 procurement / certificate 資料重疊計算。
- contracted volume 被誤當成 delivered / eligible / claimed。
- forecast version、site changes 或 missing periods 未反映。

## MVP sequence

1. Define：一頁 boundary / formula / owner 清單。
2. MVP：一個 base year + 一個 target year + synthetic rows，跑通 formulas。
3. Review：client owner 核對 numerator / denominator / eligibility。
4. Correct：修正 mapping、assumptions、quality flags。
5. Expand：完整 horizon、site drill-down、sensitivity 與 management summary。

## Definition of Done

- 每個 material input 有 source / version / owner / truth status。
- workbook 可在 Excel 中重算，無 formula errors；synthetic row 明確標示。
- baseline、target、existing eligible procurement、residual gap 與 sensitivities 可重現。
- gap boundary / assumptions / data gaps 有 owner 與 disposition。
- G3 decision brief 能說明「核准什麼、不能推論什麼、下一步需要什麼」。
- outputs 可直接餵入 1.5，且不把 demo 數字當成 AMAT fact。
