# 1.5 採購組合與情境分析 — Work Package v0.1

> PRE-KICKOFF DRAFT。所有 option volume、price、timing、tenor、technology 與 risk scores 均為 `SYNTHETIC / DEMO DATA`，不是市場報價或 AMAT preference。

## Purpose

把 1.4 已核准的 residual gap / range 轉為數個可比較的 procurement portfolio scenarios，明確呈現 cost、timing、tenor、technology、flexibility、execution / market risk、concentration與dependency取捨。

## Client question

在 AMAT 已核准的 gap、constraints與decision criteria下，哪一種 short / medium / long-term procurement mix 最符合目標；要接受哪些 trade-offs 與 decision conditions？

## Intended decision

G4：選定 portfolio direction / range、需要 market test 的 options、hard constraints、scenario sensitivities與不得突破的 risk / concentration conditions。

## Client audience

Sustainability / RE100、Procurement、Facilities、Finance、Legal、regional / global owners與 sponsor / decision body；named participants `TBD WITH CLIENT`。

## Optimum owner / supporting role

Owner：analysis lead；support：market SME、financial analyst、data analyst；reviewer：project lead / Zac與 client decision owners。

## Inputs

1.4 annual base / stress gap、existing procurement expiry、1.3 criteria / constraints、client policy / budget / tenor / risk appetite、preliminary option evidence。

## Activities

1. 確認 criteria scale、weights、hard constraints與cost metric。
2. 建立 option catalogue與 evidence / truth status。
3. 設計 3–5 個真正不同的 scenarios，不用微調假差異湊數量。
4. 比較 coverage、cost、timing、tenor、technology、flexibility、risk、concentration、dependencies。
5. 執行 gap / price / delivery sensitivities並記錄 judgement。
6. 形成 concise decision output與 1.6 roadmap handoff。

## Outputs

`PORTFOLIO_METHODOLOGY.md/.docx`、`Scenario_Model.xlsx`、`MODEL_README.md`，含 synthetic scenario與 management summary。

## Dependencies

Upstream：1.2 data、1.3 decisions、1.4 G3 baseline。Downstream：1.6 roadmap / gates、2.1–2.4 market test、2.5 RFQ structure、2.6 scoring。

## Known

Portfolio需平衡多個 objectives，且不同 horizons可能使用不同 tools。1.4 demo output可用來驗證 model，但不是 AMAT demand。

## Hypotheses

第一版至少比較 Balanced、Speed / Flexibility、Long-term Core三種 archetypes；criteria weights與hard constraints需由 client核准。

## TBD with client

cost metric / currency / discounting、target gap / buffer、eligible options、tenor limits、price / budget boundaries、technology preference、risk tolerance、concentration cap、approval owner與decision date。

## Key risks

用 synthetic price形成假建議；以總量掩蓋 profile / timing mismatch；weights未核准卻過度依賴總分；未把 execution dependency納入；重複計入 1.4 coverage。

## MVP sequence

Define criteria / constraints → one-year three-scenario MVP → review scale / assumptions → correct → expand horizon / sensitivity / roadmap handoff。

## Definition of Done

- 1.4 gap / range可追溯進 model，無重複計算。
- 至少三個差異明確 scenarios 可重算；cost / coverage / concentration formulas無錯。
- scores有定義、weight owner、evidence / truth status；hard constraints不被總分掩蓋。
- management summary說明 recommendation condition、not-yet-known、market evidence needed。
- G4 output可直接成為1.6 roadmap與2.x research / engagement brief。
