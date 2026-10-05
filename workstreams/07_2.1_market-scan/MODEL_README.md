# Market_Landscape.xlsx — Model README

## Purpose

建立可追溯的 market universe、source log 與第一輪 screening / priority summary，支援 G5 與 2.2 contact MVP。

## Sheets

- `Instructions`：truth status、evidence grade、hard-screen 與 disclosure rule。
- `Landscape`：entity / route / project-level comparable fields；所有 seeded rows 均為 `SYNTHETIC / DEMO DATA`。
- `Screening`：criteria weights、demo score、hard-screen 與 priority tier。
- `Source Log`：一筆 material claim 對一筆 source record。
- `G5 Summary`：category coverage、screen outcomes、research gap 與 launch decision。

## Input / calculation / output

黃色儲存格為人工輸入。`Screening` 以 SUMPRODUCT 計算 weighted score，但 `Hard screen = FAIL` 時 tier 強制為 `EXCLUDE / RESOLVE`。Summary 用 COUNTIF / COUNTIFS 計算分類與狀態；無 market quote 或 client fact。

## Future client mapping

取得 1.5 / 1.6 核准內容後替換 criteria / weights / constraints；public research 逐列填入 source；2.2 written feedback 用相同 IDs 新增 evidence，不覆蓋原始紀錄。若資料涉及 client identity 或 supplier confidential information，依 classification 與 need-to-know 管理。

## QA rule

不得把空白當零、把 company-level statement 當 asset availability、把 supplier claim 當 verified、把 weighted score 當 hard-screen waiver。每次交付前重跑 formula scan、檢查 stale source 與 summary reconciliation。
