# 1.2 Workbook Readme

## Data_Request_Tracker.xlsx

- `Instructions`：truth-status、classification、status與使用規則。
- `Request Log`：一列一個 request，含 purpose、grain、classification、owner、due、status、quality status、downstream use。
- `Completeness`：依 request category / required field 顯示 coverage、materiality、treatment與 G1 implication；示例為 SYNTHETIC / DEMO DATA。
- `Data Gap Log`：缺口、impact range、treatment、approval與 affected outputs。
- `Interview Plan`：stakeholder hypothesis、問題、evidence、owner、date、output。

公式 / output：`Completeness` 的 received count、open count與 completion ratio 參照 `Request Log`。Client data mapping 時保留 request ID，不要把 raw file 混入 tracker。

## Data_Dictionary.xlsx

- `Dictionary`：field、business definition、type、unit、grain、key、null rule、allowed values、classification、source、downstream use。
- `Mapping Demo`：示範 client raw fields 如何映射到 standard fields；只用 SYNTHETIC / DEMO DATA。
- `Quality Rules`：reconciliation / completeness / uniqueness / validity測試規格，不預設 AMAT threshold。

## Future client data mapping

1. 先複製 standard dictionary，不改標準 field id。
2. 在 Mapping Demo 的 client-source columns 建 mapping。
3. 保留 raw value、mapped value、transform rule、exception count、reviewer。
4. threshold與 treatment由 G1 owner批准。
5. 不在 workbook 中放入不必要的 personal data、credentials、full contract text或未授權 supplier details。

