# Scenario Model — Model README

## Purpose

`Scenario_Model.xlsx` 用 formula-driven synthetic scenarios比較 coverage、cost、timing / flexibility、risk、concentration與dependency，支持 G4 portfolio direction。

## Truth-status warning

所有 gap、allocation、NTD/MWh、risk score與weights均為 `SYNTHETIC / DEMO DATA`，不是 AMAT fact或market quote。

## Sheets

- `Read Me`：規則、truth status、refresh sequence。
- `Option Inputs`：option characteristics、demo comparable cost、risk與evidence needs。
- `Scenario Mix`：scenario-year allocations與formula-driven cost / coverage / concentration。
- `Criteria Scores`：criteria definitions、weights、scenario scores與weighted result。
- `Management Summary`：G4 decision view與required confirmations。

## Calculation

Scenario total MWh = option allocations sum；coverage = total / approved gap；annual cost = Σ allocation × option comparable cost；weighted unit cost = annual cost / total；concentration = max allocation / total。Criteria weighted score = Σ(score × weight)。Hard constraint另行判定。

## Refresh

1. Import approved 1.4 gap / range。
2. Replace demo prices / volumes with sourced and normalized evidence。
3. Confirm timing、tenor、technology與delivery factors。
4. Confirm scale anchors、weights、hard constraints與owner。
5. Recalculate；scan errors；check higher allocations / prices move outputs logically。
6. Record G4 decision、conditions與2.x market tests。

## Future client mapping

若需月 / interval profile或discounted cash flow，新增專用 sheets並保留 annual decision summary；不要把未核准 granularity混入現有 rows。Market quotes必須帶 source、date、scope、confidentiality與validity。
