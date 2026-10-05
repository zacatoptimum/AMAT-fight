# Procurement Portfolio & Scenario Methodology v0.1

> PRE-KICKOFF DRAFT。本文與 `Scenario_Model.xlsx` 是決策架構，不是 AMAT recommendation。所有 demo volume、price與score均為 `SYNTHETIC / DEMO DATA`。

## 1. Decision objective

Scenario analysis要把「缺多少綠電」轉為「用哪些工具、何時開始、承諾多久、承擔什麼風險」。輸出不是單一最低價，而是可由 AMAT 明確接受 trade-offs 的 portfolio direction。

## 2. Entry gate

開始前確認：

- 1.4 boundary、target curve與 annual gap / range已 approved 或 approved with conditions。
- eligible procurement options與claim policy有 owner。
- cost metric、currency、tax / settlement treatment、analysis horizon已定義。
- hard constraints與preferences分開；未核准事項標 `TBD WITH CLIENT`。

若 G3未通過，可做 synthetic / exploratory scenarios，但不能標為 recommended AMAT portfolio。

## 3. Option catalogue

每個 option至少記錄：

| Field | Why it matters |
|---|---|
| Available / allocable volume | 是否能 cover gap與profile |
| Start / COD / lead time | 是否趕上 target year |
| Tenor / renewal / exit | commitment與future flexibility |
| Price / escalation / settlement | total cost與budget volatility |
| Technology / asset / project | diversification與maturity |
| Delivery / curtailment / firmness | expected eligible MWh |
| Wheeling / meter / certificate | execution interfaces |
| Credit / guarantee / counterparty | risk與approval burden |
| Change / termination | downside protection |
| Evidence / truth status | 是否可用於decision |

Public / supplier / official / client evidence須分開。沒有 evidence的 availability / price保留為 `RESEARCH REQUIRED`。

## 4. Scenario archetypes

v0.1使用三個刻意不同的 archetypes：

### Balanced

跨 onsite、short-term certificates、retailer與long-term supply分散，目標是平衡 timing、flexibility與concentration。

### Speed / Flexibility

使用較多可快速啟動 / 短期工具，降低 near-term timing risk，但可能提高 renewal、availability、claim policy或price volatility exposure。

### Long-term Core

提高長期主力型採購占比，可能改善long-term linkage / cost visibility，但提高 tenor、project / COD、credit與concentration dependencies。

正式分析可新增 client-requested scenario，但不要用多個近似 scenarios製造假選擇。

## 5. Comparison logic

### Quantitative

1. Procured MWh = sum(option allocations)。
2. Coverage = min(procured MWh / approved gap, 100%)。
3. Residual uncovered = max(approved gap − procured MWh, 0)。
4. Annual cost = sum(allocation × comparable unit cost)。
5. Weighted unit cost = annual cost / procured MWh。
6. Concentration = largest option allocation / total procured MWh。

Comparable cost必須說明包含 / 不包含哪些 network、certificate、service、tax、settlement與risk components。Demo unit cost不是 market quote。

### Qualitative score

至少涵蓋 volume / profile、timing、cost、tenor / flexibility、execution、market / availability、concentration、dependency與claim relevance。1–5分前先寫 anchors：

- 1 = 不符合 / 高風險 / evidence不足；
- 3 = 可行但有 material conditions；
- 5 = 強符合且 evidence充分。

Hard constraint fail必須單獨標紅；不能以其他高分抵銷。

## 6. Sensitivity and risk

至少測試：

- gap使用1.4 base / stress range；
- option delivery haircut / COD delay；
- price / escalation range；
- short-term availability / renewal failure；
- long-term project / counterparty concentration；
- claim / eligibility rule change。

每個 sensitivity要回答「哪個scenario ranking / decision會改變」，而不只是多一張表。

## 7. Preliminary judgement protocol

Analyst提交 first draft時同時寫：

- my understanding of the decision；
- why these scenarios are materially different；
- assumptions / evidence requiring confirmation；
- preliminary judgement與兩個主要 reasons；
- what would change the judgement；
- first market test needed in 2.x。

Project lead從 client lens review：是否能核准、是否有hidden constraint、是否把synthetic values當fact、是否能直接形成 roadmap。

## 8. Management output

一頁 summary呈現：recommended direction / condition、coverage / cost / concentration comparison、three critical risks、three client decisions、market evidence required與handoff owner。詳細方法、option rows與scores留在 workbook。

### Illustrative conclusion — SYNTHETIC

> Demo中 Balanced scenario達到100% annual gap coverage，cost與concentration位於三方案中間。這不代表AMAT應選Balanced；真正結論取決於 approved gap、comparable price、timing / profile、policy、risk tolerance與market evidence。

## 9. Handoff to 1.6 and 2.x

1.6接收 selected direction / acceptable range、near / medium / long-term volume、decision gates、owners、dependencies與approval dates。2.x接收 market questions、option evidence gaps、disclosure boundary、supplier fields與evaluation criteria。

若 market evidence推翻 availability / price / COD假設，回到1.5更新 scenario；保留 version / decision rationale，不直接覆蓋。

## 10. Does not conclude

本方法不證明 AMAT demand、budget、preference、supplier availability或market price；不提供法律、稅務、會計意見；不以總分取代 client judgement。
