# Execution Governance & BAU Transition v0.1

> `PRE-IMPLEMENTATION STRUCTURE DRAFT`。Contract、volumes、dates、tolerances、systems與owners為 `TBD WITH CLIENT`；tracker seeded rows為 `SYNTHETIC / DEMO DATA`。

## 1. Governance outcome

每個reporting period回答：expected vs actual delivery；certificate是否issued / transferred / accepted / claimed；invoice / settlement是否reconcile；哪些milestone / CP / obligation late；哪些issue需要contractual notice / escalation；BAU owner是否能獨立運作。

## 2. Cadence

- implementation phase：weekly critical-path / owner review；
- first live periods：monthly reconciliation / issue decision；
- executive：biweekly或monthly exception summary，依materiality；
- supplier governance：operational review + quarterly / agreed performance review；
- cadence / attendance / SLA均 `TBD WITH CLIENT`。

## 3. Reconciliation key and lineage

保留 contract / offer ID、site / meter、delivery period、expected profile version、actual source / date、certificate batch / vintage / status、invoice / settlement ID。原始supplier / utility / registry / client data不覆寫；adjustment有reason、approver與version。

## 4. Metrics

Milestone on-time、delivered MWh vs expected、coverage / shortfall、certificate MWh / timing / validity、invoice amount vs expected、open issue / aging、CP / obligation completion、data timeliness / quality、supplier SLA、forecast / reconciliation variance。Threshold由contract與client decision定義，不預設。

## 5. Issue / escalation

Issue需 event、detected date、evidence、contract / obligation reference、impact、notice deadline、temporary containment、owner、supplier action、client decision、financial / claim treatment與closure evidence。涉及法律權利 / notice由counsel確認；Optimum不得代替法律判斷。

<!-- PAGEBREAK -->

## 6. Periodic client report template

1. executive status / decisions required；2. delivery / coverage；3. certificates / claims；4. financial / invoice reconciliation；5. milestones / obligations；6. top issues / risks / changes；7. supplier actions；8. next period critical path。只報exceptions與decision，不重複整份tracker。

## 7. Change control

任何volume / profile / date / price / route / certificate / responsibility變更先記change request、contract authority、commercial / legal / operational impact、approver與effective date；不得由email或meeting note默默改baseline。

## 8. BAU transition criteria

named owner / backup；access / data / SOP / calendar；supplier / utility / registry contacts；reconciliation可獨立完成；open issues / claims移交；first cycles通過；risk / change / notice protocol被接受；document repository與retention確定；G11 acceptance記錄。

## Preliminary judgement

`HYPOTHESIS`：至少完成一個synthetic dry run與一至數個live cycle（實際次數TBD）後，才能判斷流程不是靠project team人工補救；若critical issue / certificate / settlement仍不穩，延長project governance而不是形式移交。
