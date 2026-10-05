# New Hire Delivery Guide

## 這份 guide 要解決的問題

新進人員不應收到一個模糊大任務後消失數天，再帶回與 client need 不一致的完整成品。本 guide 教你在開始前理解 intended output，以小 MVP 取得方向性 review，留下 evidence / assumptions，並逐步從 1.x executor 成長為 2.x independent analyst。

## 1 如何理解 task

先把工作改寫成一個 client question 與一個 intended decision。若你只能重述動作，例如「做 market research」或「整理 Excel」，表示 task 尚未理解。讀取相關 `01_WORK_PACKAGE.md`、上游 output、acceptance criteria、known decisions 與 unresolved issues。

提交你的理解：**This is my understanding of the question, the decision it supports, and what I will deliver.**

## 2 如何在開始前確認 expected output

用 `TASK_BRIEF_TEMPLATE.md` 寫清楚：artifact format、reader、sections / sheets / slides、detail level、source requirement、review date、Definition of Done。對 client-facing output，先確認語言、audience與 discussion context。對 model，先畫 input → calculation → output，不先美化。

## 3 如何拆 MVP

MVP 不是空 skeleton。它至少包含：

- 完整 storyline / calculation path。
- 一個 worked example 或 synthetic case。
- 最重要的 preliminary judgement。
- 明確標示的 assumptions / gaps。
- reviewer 能回答的具體問題。

例：完整 market landscape 可能需要數週；first MVP 可以是已定義欄位、5 個 synthetic / public test records、screening logic、source protocol與一頁 preliminary observation。

## 4 什麼時候應該問 Zac 或 Project Lead

立即詢問：

- client expectation、relationship、scope、commercial position 或 confidentiality / market conduct 不清楚。
- 兩種合理 approach 會導致不同 client decision 或大量返工。
- 需要代表 Optimum / client 對外承諾、揭露身分 / volume、評價供應商或接受條件。
- evidence 顯示原本 direction 可能錯誤。
- high-risk assumption 無法在 review date 前驗證。

提問時不要只說「怎麼做」。帶上你的理解、兩個選項、trade-off、建議與需要的 decision。

## 5 什麼問題不應該先問

以下應先自己研究或做 first pass：

- 名詞、公開制度、基本 market mechanism。
- 檔案位置、既有 template、上游 decision 或 source log 可找到的答案。
- 你可以用小 sample 驗證的 formula、欄位或格式問題。
- 不影響 direction 的 wording / layout preference。

自己研究不代表可把網路內容當事實。記錄 source、date、reliability、scope與 limitations。

## 6 如何提出 preliminary judgement

把 evidence 與 judgement 分開。用下列格式：

- Evidence observed: [可驗證事實]
- Interpretation: [你認為代表什麼]
- Uncertainty: [哪個假設可能改變結論]
- Preliminary judgement: [目前最佳判斷]
- Recommendation: [下一步或 decision]

若 evidence 不足，結論可以是「目前不應做出 selection，先驗證 X」。這仍是一個 judgement。

## 7 如何留下 assumptions

每個 assumption 要有 ID、statement、basis、affected output、impact if wrong、validation method、owner、review date與 status。禁止把 assumption 藏在 formula、email 或口頭補充中。到期未驗證時，升級為 risk / issue。

## 8 如何紀錄 evidence

每個外部 source 記錄 title、publisher、publication date、access date、URL / location、reliability、used-in artifact、limitations。訪談 evidence 記 meeting ID、role、date、question與是否為正式 client decision。供應商 confidential information 不跨 supplier 分享。

## 9 如何提交 first draft

提交前完成 self-check：objective 是否回答、reader 是否知道要做什麼、重要數字是否可追溯、unknown 是否標示、上游 / 下游是否一致、檔名 / version 是否正確、client confidential data 是否受控。

附五行 submission note：

1. My understanding
2. My approach
3. Assumptions to confirm
4. Preliminary conclusion
5. Recommendation / requested review decision

## 10 如何接受 client-style review

Reviewer 可能先挑戰「這是否回答 client question」，而不是先改字。先確認 review comment 背後的 decision need，再修 artifact。對不同意的意見，提供 evidence、trade-off與替代方案；不要以投入時間作為保留內容的理由。重大方向變更記錄於 decision / change log。

## 11 從 1.x executor 成長到 2.x independent analyst

### 1.x expected behavior

- 開始前確認 Optimum 對成果的期待。
- 理解 output 應該長什麼樣子。
- 依既定方法把定義好的問題做好。
- 及早提交 MVP，正確使用 logs 與 templates。

### 2.x expected behavior

- 自己辨識需要確認的問題。
- 提出方法、alternatives與 trade-offs。
- 形成 preliminary judgement 與 recommendation。
- 先完成一版可用成果，再由 Zac / Project Lead 站在客戶角度 review。
- 對 market conduct、commercial implication與 downstream handoff 負責。

## Quality ladder

| Level | Behavior | Review focus |
|---|---|---|
| L1 Structured executor | 依 brief 完成 sample，問題明確 | accuracy、format、follow-through |
| L2 Reliable analyst | 連接 inputs、logic、output、unknowns | judgement quality、traceability |
| L3 Independent analyst | 主動定義問題、方法、preliminary recommendation | client use、trade-off、risk |
| L4 Workstream owner | 管理 stakeholder、decision gates、cross-workstream handoff | outcome、commercial / relationship judgement |

## Stop and escalate

遇到 client data accidental disclosure、未授權 market disclosure、supplier conflict concern、重大 formula / source error、可能改變 client decision 的新 evidence 時：停止外發、保存 evidence、通知 Project Lead、協助 contain、記錄 incident / issue。不要先自行淡化或修飾問題。
