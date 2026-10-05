# RE100 Gap Analysis Methodology v0.1

> **PRE-KICKOFF DRAFT / INTERNAL WORKING METHOD**  
> 本文件不包含已驗證 AMAT-specific consumption、target、site 或 procurement facts。`Gap_Analysis_Model.xlsx` 中所有數字均為 `SYNTHETIC / DEMO DATA`。正式專案須以 AMAT policy owner、data owners 與 source evidence 更新。

## 1. Management intent

本分析不是為了產生一個看似精確的缺口數字，而是建立一個 AMAT 能核准、往後可持續更新的 renewable electricity requirement baseline。管理者應能從成果回答：

1. 分母包含哪些 entities / sites / meters / periods？
2. target 是哪個 policy version、哪條 curve、由誰核准？
3. 哪些既有採購量被視為 eligible，依據是什麼？
4. residual gap 是單一數字，還是受資料 / delivery 不確定性影響的 range？
5. 哪些 decisions 能進入 1.5，哪些必須先補 evidence？

## 2. Calculation boundary before calculation

### 2.1 Boundary card

正式 run 前先完成並核准一頁 boundary card：

| Boundary item | Required decision | v0.1 status |
|---|---|---|
| Organizational | legal entities / operations included | TBD WITH CLIENT |
| Geographic | Taiwan only、specific sites或其他 | TBD WITH CLIENT |
| Load | gross / net、onsite self-use、excluded loads | TBD WITH CLIENT |
| Time | base year、planning horizon、calendar / fiscal year | TBD WITH CLIENT |
| Target | percentage curve、target date、policy version | TBD WITH CLIENT |
| Eligibility | instruments、vintage、ownership、claim rules | TBD WITH CLIENT |
| Existing procurement | contracted / expected / delivered / eligible | TBD WITH CLIENT |
| Granularity | annual first pass、monthly / interval if required | HYPOTHESIS |

在 boundary 未核准前，model output 只能標為 draft / scenario，不能標為 AMAT baseline。

### 2.2 Numerator / denominator discipline

- Denominator：approved electricity consumption / forecast after explicit inclusion / exclusion rules。
- Target renewable requirement：denominator × target percentage。
- Numerator / coverage：只計入符合 approved eligibility rule 且可歸屬於相同 boundary / period 的 volume。
- Residual gap：`MAX(target renewable requirement − eligible existing procurement, 0)`。
- Over-coverage：另行顯示，不以負 gap 混淆；需確認是否可 carry forward，不能自行假設。

## 3. Existing procurement treatment

一份 contract 或 certificate record 至少區分：

| Layer | Meaning | Decision use |
|---|---|---|
| Contracted | legal / commercial commitment | exposure and potential coverage |
| Expected | forecast delivery after known constraints | planning case |
| Delivered | metered / settled delivery | performance evidence |
| Eligible | accepted under approved policy / boundary | gap calculation |
| Claimed / retired | completed claim or use record | reporting / audit evidence |

v0.1 model使用 `contracted MWh × delivery factor × eligibility factor` 形成 planning eligible MWh。這是計算架構，不代表 AMAT policy；兩個 factor 必須有 evidence / owner。

### Double-count controls

- Stable instrument ID + site / allocation + year。
- 同一 generation / certificate volume 不得同時出現在 multiple instruments / entities。
- 若 contract volume 與 certificate record 來自不同資料源，先 reconcile 再相加。
- allocation / transfer / claim status不明者列入 conditional，不默認為 eligible。

## 4. Data-quality logic

### Minimum tests

| Dimension | Test | Default disposition |
|---|---|---|
| Completeness | included sites / periods是否齊全 | quantify missing range；material gap condition G3 |
| Uniqueness | site-meter-period / instrument-year 是否重複 | stop affected aggregation until resolved |
| Reconciliation | analysis total是否 tie 到 owner-approved control total | document variance and approval |

### Additional controls

| Dimension | Test | Default disposition |
|---|---|---|
| Validity | MWh ≥ 0、target 0–100%、dates / units valid | reject or correct invalid values |
| Lineage | source、version、transform、owner可追溯 | do not use untraceable data as approved evidence |
| Consistency | site / instrument mapping與 boundary一致 | re-map or explicitly exclude |

### Quality state

- `PASS`：足以支持 intended decision。
- `PASS WITH CONDITION`：可用，但 output 必須帶 range / caveat / owner action。
- `FAIL`：不可用於 intended decision。
- `NOT TESTED`：尚未執行，不等於通過。

## 5. Core calculations

對每年 `y`：

1. `Gross_Load_y = Σ approved site forecast / actual MWh`
2. `Target_RE_MWh_y = Gross_Load_y × Target_%_y`
3. `Eligible_Existing_y = Σ Contracted_MWh_i,y × Delivery_Factor_i,y × Eligibility_Factor_i,y`
4. `Residual_Gap_y = MAX(Target_RE_MWh_y − Eligible_Existing_y, 0)`
5. `Coverage_%_y = MIN(Eligible_Existing_y / Target_RE_MWh_y, 100%)`
6. `Over_Coverage_y = MAX(Eligible_Existing_y − Target_RE_MWh_y, 0)`

若 denominator 或 target 未核准，結果標為 `TBD / DRAFT`，即使 formula 可運算。

## 6. Sensitivity design

v0.1 至少測試四個 cases：

| Case | Load factor | Existing delivery factor | Purpose |
|---|---:|---:|---|
| Base | 100% | 100% | approved / current planning inputs |
| Higher load | 105% | 100% | demand / forecast upside |
| Lower delivery | 100% | 90% | project / certificate under-delivery |
| Combined stress | 105% | 90% | gap range and procurement buffer |

正式 range 不應只使用固定 5% / 10%；應由 forecast uncertainty、historical variance、contract evidence與 client risk appetite更新。Demo factors不是 AMAT assumption。

## 7. Management summary design

Management Summary只呈現：

- approved / draft boundary與truth status；
- first target year、base residual gap、combined-stress gap；
- largest coverage expiry / step change；
- material data-quality conditions；
- 三個需要 client decision 的問題；
- handoff to 1.5 的 annual gap table / range。

不在 summary放所有資料欄位或假精確的小數。詳細 lineage、source與mapping留在 model / data tracker。

### Illustrative decision brief — SYNTHETIC

> Demo model在 2028 年計算出 target requirement 105,000 MWh、planning eligible existing procurement 52,250 MWh，因此 base residual gap為 52,750 MWh；combined stress case較高。這只證明 model 可跑，不代表 AMAT 的用電、target 或採購缺口。

建議的 G3 decision wording：

- Approve / approve with conditions / reject calculation boundary。
- Approve named target curve and policy source。
- Approve existing procurement treatment and factor owners。
- Authorize annual gap / range as 1.5 demand input。
- Assign unresolved evidence with owner / latest-needed date。

## 8. Review protocol

### Analyst first draft

先提交：boundary card、兩個年份、input lineage、base + one stress case、三個最大的 unknowns。不要等完整 site history才第一次 review。

### Project lead review

以 client lens 問：

- 如果數字錯，哪個 decision 會受影響？
- 哪個 assumption 被藏在 formula？
- output 是否區分 contract / delivery / eligibility / claim？
- 1.5 是否能直接使用 annual gap / range？

### Client review

由各 owner分別核准 data、policy、commercial treatment；project sponsor / decision body核准 G3。不把沉默視為 approval。

## 9. Handoff to 1.5

1.5 應收到：

- annual base gap、stress gap、target / load curve；
- site / technology / timing constraints（若有核准資料）；
- existing procurement expiry / uncertainty；
- data-quality condition與不能使用的欄位；
- approved criteria owner與 date。

1.5 不應重新發明 gap boundary；若改變，必須以 assumption / change log返回1.4並重新核准。

## 10. What this methodology does not conclude

- 不證明任何 AMAT site / load / target / policy fact。
- 不判定任何 procurement instrument 一定符合 AMAT 或 RE100 policy。
- 不提供法律意見、會計意見或 assurance。
- 不以 synthetic sensitivity代替正式 forecast / contract evidence。
