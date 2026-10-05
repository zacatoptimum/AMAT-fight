# Gap Analysis Model — Model README

## Purpose

`Gap_Analysis_Model.xlsx` 把 approved consumption / forecast、target curve與 existing eligible procurement轉為 annual residual gap與 sensitivity，作為 G3 與 1.5 input。

## Truth-status warning

Workbook 目前全部數值均為 `SYNTHETIC / DEMO DATA`。`Demo Site A / B`、target percentage、load growth、contracts、delivery / eligibility factors與 sensitivity factors均非 AMAT facts。

## Sheets

| Sheet | Purpose | Main user |
|---|---|---|
| Read Me | scope、truth status、refresh steps、control rules | all users |
| Assumptions | target curve與factor owners / status | analyst / approver |
| Site Load | synthetic site-year actual / forecast inputs | data analyst |
| Existing Procurement | instrument-year commitments與factor treatment | procurement / analyst |
| Gap Analysis | formula-driven annual target、coverage、gap | project lead / client owner |
| Sensitivity | base / load / delivery stress comparison | decision makers |
| Management Summary | concise decision output與G3 questions | sponsor / steering group |

## Input mapping

- Site Load ← 1.2 site / meter master、consumption、forecast。
- Assumptions target curve ← formal target / policy evidence與 owner confirmation。
- Existing Procurement ← contract / allocation / expected delivery / eligibility / claim evidence。
- Data quality / source ID ← 1.2 tracker、data gap log、source log。

## Calculations

- Target renewable MWh = total load × target %。
- Planning eligible procurement = contracted MWh × delivery factor × eligibility factor。
- Residual gap = max(target renewable MWh − planning eligible procurement, 0)。
- Coverage = min(planning eligible procurement / target renewable MWh, 100%)。
- Sensitivity gap = target renewable MWh × load factor − planning eligible procurement × delivery stress factor，floor at zero。

## Refresh steps

1. Save immutable client raw files outside this workbook under approved controls。
2. Update source / version / owner in 1.2 and project source log。
3. Replace demo Site Load and Existing Procurement rows；do not overwrite without preserving mapping evidence。
4. Update Assumptions only after named owner / policy evidence。
5. Recalculate workbook；scan formulas for errors。
6. Reconcile annual totals to control totals。
7. Review Management Summary and record G3 decision / conditions。

## QA checks

- No blank included year / site / MWh / truth status。
- No duplicate site-year or instrument-year keys unless allocation design explains it。
- Target % within 0–100%；factors within 0–100%。
- Gap Analysis totals tie to Site Load and Existing Procurement。
- Sensitivity direction makes sense：higher load / lower delivery cannot reduce gap。
- No AMAT label is attached to synthetic data。

## Future client-data mapping

若 AMAT requires monthly / interval matching，新增 grain 而不是在 annual rows中塞 month text。保留 annual summary作 G3 / roadmap，另以 approved rules匯總。任何 boundary change需更新1.4 methodology、assumption log與1.5 inputs。
