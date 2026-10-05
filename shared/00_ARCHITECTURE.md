# AMAT Pre-delivery Repository Architecture v0.1

## Architecture objective

建立一套能在 kickoff 後快速校準、以 decision 為核心、可由新人逐步承接、且不假裝知道 AMAT 答案的 delivery system。Architecture 以 18 個 work package 為主幹，共用 project controls、training、confidentiality 與 market conduct 為橫向治理。

## Scope map

### 1.x Define demand and route

1.x 的任務是把客戶期待、資料基礎、共同市場語言、需求缺口、portfolio 選項與跨部門 roadmap 對齊。輸出是進入市場前的 decision basis，不直接預設 AMAT 的採購答案。

- 1.1 建立 mandate、governance、expectation validation 與 working rhythm。
- 1.2 建立可追蹤的 data request、dictionary、quality control 與 stakeholder evidence。
- 1.3 建立共同市場語言，取得理解、偏好與後續分析所需決策。
- 1.4 把 baseline、target、existing procurement 與 residual gap 量化。
- 1.5 把 gap 轉成可比較的 procurement portfolio scenarios。
- 1.6 把選定方向轉成 short / medium / long-term roadmap 與 decision gates。

### 2.x Test the market and select

2.x 的任務是把已對齊需求轉成市場 intelligence、可比較供應條件、正式詢價與 shortlist。分析人員要自行提出方法、假設與 preliminary judgement，再接受 client-style review。

- 2.1 建立市場 universe、分類、screening logic 與 evidence base。
- 2.2 在資訊邊界內測試供應意願與初步條件。
- 2.3 評估短期補充型採購方案。
- 2.4 評估中長期主力型採購方案。
- 2.5 發出定向 RFQ / RFP，取得可比較回覆。
- 2.6 將商業、技術、執行與風險整合成 shortlist recommendation。

### 3.x Negotiate contract and implement

3.x 的任務是把 shortlist 轉成可簽署、可執行、可追蹤的交易。Optimum 做 commercial review 與 negotiation support，不取代正式法律意見。

- 3.1 鎖定最終需求、commercial objectives 與 negotiation mandate。
- 3.2 建立條款 issue list、risk allocation 與 commercial / legal interface。
- 3.3 執行第一輪談判與 concession control。
- 3.4 收斂未決議題、量化 impact、取得內部決策。
- 3.5 確認 signing 與 implementation readiness。
- 3.6 追蹤 delivery、certificates、reconciliation、issues 並轉入 BAU。

## Delivery gates

| Gate | Decision | Minimum evidence | Exit owner | Next work |
|---|---|---|---|---|
| G0 Kickoff alignment | 是否同意 scope、roles、cadence、decision rights 與 first data request | Charter、RACI、workplan、expectation questions | Project Lead + client sponsor | 1.2–1.3 |
| G1 Data readiness | 是否有足夠資料建立 baseline；哪些 gap 可用 assumption 暫代 | Data tracker、dictionary、quality memo | Analytics Lead + client data owners | 1.4 |
| G2 Shared market understanding | Stakeholders 是否理解 options、constraints 與需做的決策 | Workshop outputs、decision / question log | Project Lead + client sponsor | 1.4–1.6 |
| G3 Baseline accepted | baseline、target 與 residual gap 是否可作 planning basis | Gap model、management summary | Client RE100 owner + Finance / Facilities | 1.5 |
| G4 Portfolio direction | 哪些 option 組合進入 roadmap 與 market test | Scenario model、decision brief | Client steering group | 1.6–2.2 |
| G5 Market engagement authority | 可接觸誰、可披露什麼、要測試哪些條件 | Roadmap、information boundary、engagement list | Client sponsor + Procurement / Legal | 2.1–2.2 |
| G6 RFQ launch | 是否具備一致需求、bidder list、response schema 與評估規則 | RFQ package、response template、evaluation methodology | Procurement + Project Lead | 2.5–2.6 |
| G7 Shortlist | 哪些方案進入 final commercial alignment / negotiation | Scorecard、DD findings、decision memo | Client decision body | 3.1 |
| G8 Negotiation mandate | targets、priorities、trade-offs、walk-away / escalation rule 是否核准 | Commercial alignment memo、term tracker | Authorized client decision makers | 3.2–3.4 |
| G9 Preferred terms | 是否接受 remaining risks 與 commercial impact | Decision pack、position tracker | Client approval body | 3.5 |
| G10 Signing readiness | conditions、owners、systems、wheeling、certificate setup 是否可執行 | Signing checklist、CP tracker、transition plan | Client contract owner | 3.6 |
| G11 BAU transition | 治理、資料、報告、reconciliation、escalation 是否移交 | Governance doc、implementation tracker、BAU handover | Client operations owner | BAU |

## Artifact strategy

### 文件優先

Methodology、SOP、decision rationale、guides、checklists、research 與 training 優先使用 Markdown + DOCX。Client discussion、workshop、bidder briefing 與 executive alignment 才使用 PPTX。計算、比較、tracking 與可重複更新的資料使用 XLSX。

### Single source of truth

- Master schedule、actions、risks、issues、decisions、assumptions、questions、sources 與 deliverables 由 shared controls 管理。
- Gap 數字只由 1.4 model 計算；1.5 直接引用 residual gap。
- Scenario assumptions 與 outputs 由 1.5 model 擁有；1.6 roadmap 使用核准情境，不另算一套。
- Supplier response schema 由 2.5 定義；2.6 scorecard 直接 ingest 相同欄位。
- Commercial term tracker 由 3.1 建立，3.2–3.4 持續更新，不建立互相衝突的多份 term list。
- 3.5 readiness 與 3.6 implementation tracker 共享 milestone / owner / dependency ID。

### Artifact type rules

| Use case | Primary format | Companion | Rule |
|---|---|---|---|
| Method / memo / playbook | DOCX | Markdown source | 必須說明 intended decision、status labels 與 limitations |
| Client discussion | PPTX | `DECK_CONTENT.md` | 每頁有 message、content、visual concept、discussion point |
| Model / tracker / scorecard | XLSX | `MODEL_README.md` | 公式、input、output、demo / data mapping 與 QA 均可追溯 |
| Reusable template | DOCX / XLSX | Markdown instructions | 至少填入一組 first-pass example |

## Folder plan

根目錄不再新增同名外層。18 個 workstream 各自保持一層資料夾；artifact 直接放在 workstream folder。只有 `_qa/` 保留 render 與 inspection 中間產物。

## Dependency logic

```text
1.1 ─┬─> 1.2 ─> 1.4 ─> 1.5 ─> 1.6 ─────────────┐
     └─> 1.3 ────────┘       └─> decision gates │
                                                   v
2.1 ─> 2.2 ─┬─> 2.3 ─┐                         2.5 ─> 2.6
            └─> 2.4 ─┴─> procurement design ────────┘
                                                        v
3.1 ─> 3.2 ─> 3.3 ─> 3.4 ─> 3.5 ─> 3.6 ─> BAU
```

重要 handoff contract：

- 1.2 提供 site / meter / consumption / target / contract / certificate / governance 資料欄位給 1.4–1.6。
- 1.3 產出 stakeholder understanding、questions、decision preferences 與 ownership gaps。
- 1.4 產出 year-by-year residual gap、data quality flags 與 sensitivities。
- 1.5 產出 scenario ID、volume allocation、cost range、timing、tenor、technology、risk 與 dependencies。
- 1.6 產出 procurement wave、decision gate、owner、approval point 與 2.x brief。
- 2.1–2.2 產出 supplier / project IDs 與 comparable field set。
- 2.5 用相同 IDs 與 field definitions 收件；2.6 不自行改變 scoring universe。
- 2.6 將 shortlisted option、key risks、open DD、commercial assumptions 交給 3.1。
- 3.1–3.4 以統一 term ID 與 issue ID 管理商業條件、法律議題與決策。
- 3.5 將 CP、milestone、owner、evidence 與 escalation route 交給 3.6。

## Roles hypothesis

以下為 HYPOTHESIS，kickoff 必須驗證：

- AMAT Taiwan sustainability / RE100 owner
- Procurement
- Facilities / site energy owners
- Finance
- Legal
- Regional / global sustainability
- Regional / global procurement
- Information security / data privacy where relevant
- Authorized decision makers / steering group

Optimum internal role design：Project Lead / client relationship owner、Taiwan market lead、commercial analyst、data / model analyst、PMO support；實際人名與 allocation 為 TBD WITH OPTIMUM。

## Review rhythm

- 定義完成後先交 task brief 與 artifact skeleton。
- First MVP 應在 1–3 個工作天內可 review；大型模型先以 synthetic data 跑通。
- Review 只針對 objective、decision relevance、logic、evidence、risk 與 next step，不以頁數或格式取代判斷。
- 每個 package 最多兩次 artifact revision；cross-workstream audit 最多一次 revision。
