# Data Request and Requirements Guide v0.1

> PRE-KICKOFF METHOD DRAFT。此清單描述 analysis needs，不代表 AMAT 現有資料或已承諾提供。資料處理須符合 NDA、InfoSec 與 client authorization。

## 1. Start from the decision

資料不是越多越好。每一項 request 必須連到明確 decision / model use：

| Decision / output | Minimum viable input | Expansion trigger |
|---|---|---|
| 1.4 annual residual gap | site / entity master、annual or monthly consumption、forecast、target boundary、existing eligible procurement | 需要 seasonality、site / meter allocation、hourly matching或供應 profile 時再取 interval data |
| 1.5 portfolio scenarios | residual gap、option eligibility、timing、existing tenor / expiry、cost baseline / price components、constraints | 需要 finance approval、budget volatility、hourly profile或 technology matching時擴充 |
| 1.6 roadmap | decision deadlines、stakeholder / approval lead time、contract expiry、data / implementation dependencies | 有 external deadline、site expansion / closure、system change時擴充 |
| 2.x market engagement | approved requirement band、sites / delivery points、technology / tenor / flexibility、disclosure authorization | named RFQ 前才提供更細需求，且所有 bidder 接收一致 material information |
| 3.x negotiation / execution | authorized commercial assumptions、legal / procurement process、implementation contacts、meter / certificate setup | only after shortlist / mandate and need-to-know approval |

## 2. Data request catalogue

### A. Boundary and master data

| Data group | Minimum fields | Why needed | Truth status |
|---|---|---|---|
| Entity / site master | stable site ID、entity、site name / pseudonym、location level needed、status、open / close date、included-in-target flag | prevent missing / duplicate sites and map approvals | TBD WITH CLIENT |
| Meter / account mapping | stable meter / account ID、site ID、utility / service reference、valid-from / to | reconcile consumption and future implementation | TBD WITH CLIENT |
| Target / policy | target metric、target years、scope boundary、eligible instruments / evidence、ownership / retirement requirements | determine numerator / denominator and option eligibility | TBD WITH CLIENT; formal policy source required |

### B. Electricity demand

| Data group | Minimum fields | Quality expectation | Downstream use |
|---|---|---|---|
| Historical consumption | site / meter key、period start / end、MWh / kWh、actual / estimate、gross / net flag、source system | unique key; unit known; totals reconcile to owner report | baseline、seasonality、gap |
| Forecast | site / entity、period、value、unit、scenario、version、forecast date、owner、driver | version controlled; drivers / confidence explained | target-year gap、portfolio volume |
| Site changes | expansion / closure / efficiency event、date、volume impact range、confidence、owner | no single-point value if material uncertainty | sensitivity、roadmap |

### C. Existing procurement and certificates

| Data group | Minimum fields | Quality expectation | Downstream use |
|---|---|---|---|
| Contract / program summary | instrument ID、counterparty / internal source、site allocation、start / end、committed / expected MWh、tenor、technology、delivery structure | term dates and allocation must not overlap without explanation | existing coverage / expiry |
| Certificate / claim | instrument ID、certificate type、vintage / generation period、ownership / retirement status、beneficiary、eligible amount、evidence location | certificate amount / period reconciles to contract or registry record | claim / gap treatment |
| Onsite generation | site、asset ID、technology、capacity、generation actual / forecast、self-use / export、certificate treatment | actual vs forecast separated | baseline / portfolio |

### D. Commercial and implementation context

| Data group | Minimum fields | Handling note | Downstream use |
|---|---|---|---|
| Electricity cost baseline | billing period、site、energy / demand / wheeling / fee / tax components、unit、currency | Client Confidential；只取 scenario decision 所需 | 1.5 comparison |
| Existing contract terms | price structure、indexation、volume / flexibility、termination / change、credit、guarantee、settlement、certificate terms | Highly Restricted by default；need-to-know | 1.5 / 3.x |
| Procurement / approval process | approval gates、thresholds、lead time、required functions、vendor onboarding | role names / limits TBD | roadmap / RFQ / signing |
| Budget / risk parameters | budget cycle、evaluation horizon、discount / escalation assumptions、risk tolerances | client-authorized only | portfolio / negotiation |

## 3. Required metadata per file

- Request ID、file owner、business owner、source system。
- Classification、permitted purpose、permitted recipients、retention / deletion rule。
- Extract date、coverage period、timezone、calendar / fiscal convention。
- Grain / primary key、units、currency、actual / estimate / forecast flag。
- Transformations / filters、version、known limitations、reconciliation total。

## 4. Data completeness and quality checklist

| Test | Question | Example control | Decision if failed |
|---|---|---|---|
| Completeness | Required sites / periods / fields present? | compare site master and period matrix | request missing; range; exclude; re-scope |
| Validity | Types、units、dates、codes valid? | controlled dictionary / allowed values | correct mapping or reject row |
| Uniqueness | Key duplicated? | site-meter-period unique check | explain aggregation / deduplicate with evidence |
| Consistency | Gross / net、actual / forecast、timezone、unit consistent? | standardize and retain raw field | document transform; sensitivity if material |
| Reconciliation | Totals tie to owner report / invoice / certificate evidence? | variance amount / % with threshold | investigate; condition G1 readiness |
| Lineage | Can each number trace to file / row / transform? | source ID + version + mapping log | do not use as decision evidence |
| Currency / price | Cost components and FX / escalation treatment explicit? | component-level dictionary | no single blended price assumption |
| Confidentiality | Is every field necessary and authorized? | classification / recipient / tool review | minimize, anonymise or stop |

Quality status 建議使用 `Pass / Pass with condition / Fail / Not tested`；threshold 需由 client / model owner確認，不在 pre-work 中發明。

## 5. Stakeholder interview guide

### Sustainability / RE100 owner

- 哪個 target、boundary、reporting period、eligible evidence 與 claim rule 由哪份正式 policy 定義？
- 如何處理 acquisition / divestment、新 site、onsite generation、unbundled certificates、contracted but not yet operational supply？
- 哪些結果要給 Taiwan / regional / global decision body？

### Facilities / site energy owner

- Source system、meter / account mapping、actual / estimate、gross / net、timezone / billing-cycle 差異為何？
- 哪些 site 有 expansion / closure / efficiency changes？哪些數值是 approved forecast？
- Wheeling / implementation 需要哪些 account / meter / contact 資料，何時才應取得？

### Procurement

- Existing contracts、supplier / vendor onboarding、RFQ rules、approval thresholds、timeline、required comparability fields？
- 哪些資料可在 anonymous sounding、named outreach、RFQ、negotiation 分別揭露？

### Finance

- Cost baseline 應採哪些 components、currency、tax、discount / escalation assumptions與 reporting horizon？
- 哪種 cost / risk output 可支持 budget / approval？

### Legal / InfoSec

- NDA、data transfer、retention、external advisor / tool、AI / SaaS、privilege 與 personal data rules？
- Commercial review 與 legal advice 如何分工？

## 6. Data gap decision process

1. Log：記錄 missing / unreliable field、affected rows / period、source owner。
2. Size：估算 impact range，不把「資料缺」直接等同低重要性。
3. Choose treatment：Resolve、Use approved assumption、Use range / sensitivity、Exclude、Re-scope。
4. Approve：material treatment 由 business / decision owner確認；不是 analyst 自行隱含決定。
5. Trace：gap ID 連到 model assumption、output caveat與 decision record。
6. Close / carry：取得 evidence 後關閉，或在 gate 明確標示 condition。

## 7. G1 data readiness decision

### Ready

Minimum fields 可追溯、定義一致、material reconciliation通過、assumptions已批准，可支持目前 decision。

### Ready with conditions

仍有 gaps，但 impact 已量化、sensitivity / range 足以決策、owner / due date / condition 已記錄。

### Not ready

Boundary / target / primary key / material volume / existing procurement 無法確認，結果可能反轉 recommendation；需要補資料或 re-scope。

## 8. Requirement collection questions

| Question | Why it matters | Needed before |
|---|---|---|
| Client希望 gap / portfolio output 支持哪個 approval或 budget cycle？ | 決定 horizon、grain、format | data request launch |
| Baseline 是 calendar year、fiscal year或 rolling period？ | 避免 period mismatch | 1.4 mapping |
| Target boundary 包含哪些 entities / sites / loads？ | denominator | G1 |
| Existing procurement 的 eligibility / allocation由誰批准？ | numerator / claim | G1 |
| Forecast 的 approved version與 change process？ | target-year volume | G2 |
| 哪些缺口可以 assumption / range前進，誰批准？ | material uncertainty control | G1 |
| 是否真的需要 hourly / monthly granularity？ | 防止無用途的 data burden | before expansion |

## 9. First client-facing output

不是把所有 raw data 退回 client，而是一頁 readiness summary：coverage by required category、top material gaps、treatment / owner / due、decision impacts、G1 recommendation。Workbook 的 `Completeness` sheet 已提供可重用格式。

