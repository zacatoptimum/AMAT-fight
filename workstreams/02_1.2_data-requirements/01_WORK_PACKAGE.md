# 1.2 資料與需求蒐集 — Work Package

## Purpose

取得並驗證足以支撐 1.4 gap、1.5 portfolio、1.6 roadmap 與後續 market engagement 的 minimum viable dataset，同時把資料定義、品質、使用限制與缺口處理方法固定下來。

## Client question

「哪些資料足以形成可審批的 baseline 與採購需求，哪些缺口會影響決策，以及我們如何在資料不完整時安全前進？」

## Intended decision

批准 analysis boundary、data owners、field definitions、data-quality thresholds、缺口 / assumption policy 與 G1 data readiness status。

## Client audience

HYPOTHESIS：Sustainability / RE100 owner、Facilities / site energy owners、Procurement、Finance、Legal / InfoSec、regional / global data owners；named owners TBD WITH CLIENT。

## Optimum owner / supporting role

Owner：Data / analysis lead。Supporting：Project Lead、portfolio model owner、PMO、confidentiality reviewer。Client data owner / approver TBD。

## Inputs

- Kickoff charter、scope / boundary decisions、target definition、data-transfer rule。
- Electricity consumption / meter data、site / entity master、forecasts、existing procurement / certificates、contracts / terms、price / invoice components、internal approval / budget parameters。
- KNOWN：以上是 method-required categories，不代表 AMAT 已有或已同意提供。

## Activities

1. 依 decision use 而非「有什麼就收什麼」提出 data request。
2. 用 request tracker 指派 owner、due date、classification、grain 與 downstream use。
3. 用 data dictionary 統一 field definition / unit / period / key / null rule。
4. 執行 completeness、validity、uniqueness、reconciliation、lineage、access / confidentiality checks。
5. 訪談 data / policy owners，確認 business meaning。
6. 對缺口選擇 Resolve / Use assumption / Use range / Exclude / Re-scope，並取得 owner approval。

## Outputs

- `DATA_REQUEST_GUIDE.md/.docx`
- `Data_Request_Tracker.xlsx`
- `Data_Dictionary.xlsx`
- `MODEL_README.md`

## Dependencies

依賴 1.1 的 boundary / security / owner；輸出餵入 1.3 participant questions、1.4 inputs / sensitivity、1.5 scenario constraints、1.6 roadmap dependencies、2.x disclosure authorization。

## Known

- 真實 AMAT data 尚未提供。
- workbook 中所有 example row 都標成 SYNTHETIC / DEMO DATA。
- data request 不能以 client confidential data 測試未授權工具。

## Hypotheses

- Site-year consumption 是 annual gap MVP 的最低 grain；interval / meter-level analysis 是否必要 TBD。
- Existing procurement 必須能辨識 volume、period、technology、certificate / claim treatment、delivery point 與 expiry。
- Finance / invoice data 的可用程度會決定 cost baseline 精度。

## TBD with client

Analysis boundary、target years / eligibility、available granularity、system of record、transfer channel、retention、data owner、quality threshold、forecast source、site changes、client counsel / security constraints。

## Key risks

- 無 stable site / meter key，導致 double count 或漏計。
- Forecast / actual / contract period混用。
- 單位、時區、calendar / fiscal year、gross / net load 定義不一致。
- Hidden sheets / formulas / personal data 被不必要複製。
- 為了進度未經核准以 assumption 取代 material gap。

## MVP sequence

1. MVP-0：以 synthetic sample 跑過 request → dictionary → quality → gap decision。
2. MVP-1：先收 site master、24–36 months consumption、target / boundary、existing procurement summary。
3. Review：48–72 小時內出第一份 completeness / quality heatmap 與 5 個最高影響 gap。
4. Correct / Expand：確認需不需要 interval、invoice、contract、certificate、budget / approval detail。

## Definition of Done

- 每個 required field 有 purpose、owner、definition、grain、unit、classification、due date、status、downstream use。
- 1.4 / 1.5 的必要欄位在 dictionary 有定義；missing items 有 approved treatment。
- 原始 / cleaned / assumption / output 分離，沒有未標記 synthetic / client data 混用。
- Tracker / dictionary 具 working examples、validation rules、summary output，並完成 formula / render QA。
- G1 decision 記錄 Ready / Ready with conditions / Not ready 與條件。

