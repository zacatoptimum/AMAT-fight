# AMAT Pre-delivery Repository v0.1 — Final QA Report

QA date: 2026-09-27  
QA basis: `ACCEPTANCE_CRITERIA.md` A–L  
Revision policy applied: Architecture revisions ≤ 2；artifact revisions ≤ 2；cross-workstream revision = 1

## Final conclusion

**PASS — PRE-KICKOFF METHOD READY**

這套 repository 已達成 v0.1 成功定義：如果專案下週 kickoff，Optimum 可以直接從 client expectation validation、data discovery、workshop、gap / portfolio MVP 與 decision gates 開始，不需要從零設計交付方法。18 / 18 workstreams 全部具備工作定義與 first-pass substance；shared controls、training、confidentiality、market conduct、管理層閱讀層與中斷續跑機制均已建立。

這個 PASS 不代表 AMAT-specific facts、實際採購需求、供應商供給、報價、法規解讀、合約條件或內部決策已知。它代表取得這些資訊、驗證它們、形成 judgement、取得授權並跨階段移交的方法已可執行。所有仍待 client / Optimum / research / counsel 決定的事項列於 `06_UNRESOLVED_ISSUES.md`。

## QA scorecard

| Acceptance area | Result | Why |
|---|---|---|
| A. Scope completeness | **PASS** | 1.1–3.6 共 18 個資料夾全部存在；recurring PM、training、confidentiality、market conduct 與 7 份 root management files 齊全；每包有 decision 與 handoff。 |
| B. Artifact completeness | **PASS** | 18 / 18 有完整 `01_WORK_PACKAGE.md`；每包至少一份 substantive document / model / tracker / deck；重要 workbook / deck 有 MD companion。 |
| C. Client usability | **PASS** | Kickoff、workshop、roadmap、bidder briefing、decision pack 可直接支援對話；其他分析以精煉 memo / workbook 支援 decision。 |
| D. Internal usability | **PASS** | Owner / supporting role、dependencies、MVP、review、evidence、version 與 escalation 可追溯；Founder review 聚焦高判斷密度。 |
| E. New-hire usability | **PASS** | New Hire Guide、Task Brief、1.4 worked example 與每包 MVP sequence 可直接派工；1.x / 2.x 能力轉換明確。 |
| F. Conciseness | **PASS** | Document-first；只有 5 個必要 deck，頁數 8 / 15 / 8 / 8 / 7，全部在 soft target；supporting detail 留在 DOCX / XLSX。 |
| G. Confidentiality | **PASS** | 分類、need-to-know、file / device / cloud / AI / SaaS、anonymisation、incident response 與 NDA / InfoSec TBD 均明確。 |
| H. Market conduct | **PASS** | Disclosure ladder、neutrality、no false commitment / gossip / cross-supplier disclosure、authority 與 examples 完整。 |
| I. Known / Hypothesis / TBD separation | **PASS** | 18 / 18 work packages 分列 Known、Hypotheses、TBD；models 清楚標 SYNTHETIC / DEMO DATA；最新市場資訊標 RESEARCH REQUIRED。 |
| J. Cross-workstream consistency | **PASS** | `shared/CROSS_WORKSTREAM_AUDIT.md` 已逐鏈驗證 1.2→1.4/1.5/1.6 至 3.5→3.6，無斷裂 handoff。 |
| K. Resumability | **PASS** | `03_BUILD_STATUS.md` 保留逐區 / 逐 workstream evidence、狀態與 next action；可從第一個非 QA PASS 項目續跑。 |
| L. No placeholder-only package | **PASS** | 每包有 filled question set、script、decision logic、checklist、demo rows、formula或 recommendation framework；要求 demo 的模型均可運行。 |

**Result count: 12 PASS · 0 PARTIAL · 0 FAIL.**

<!-- PAGEBREAK -->

## Canonical artifact inventory and format QA

Final canonical file count（不含 `_qa/` 與 `tools/`）：

| Format | Count | QA performed | Result |
|---|---:|---|---|
| Markdown | 76 | heading / required-section inventory、cross-file reading、path / companion check | PASS |
| DOCX | 26 | 由 MD source 建立；重要文件以 PDF / PNG render 逐頁檢查；Executive Review 29 頁完整檢查 | PASS |
| XLSX | 17 | workbook load、formula-error scan、every-sheet render / visual inspection；manual-control sheets另核對說明與實際 capability | PASS |
| PPTX | 5 | slide content source、structural validator、PDF / PNG render、逐頁 visual inspection | PASS |
| **Total** | **124** | canonical delivery system | **PASS** |

### Workbook substance

- 1.4 Gap Analysis Model 可由 synthetic baseline / target / existing procurement 計算 coverage、residual gap 與 sensitivity。
- 1.5 Scenario Model 與 2.3 / 2.4 comparison models 可重算 volume、coverage、cost、concentration、timing與 risk / criteria view。
- 2.1–2.2、2.5–2.6 與 3.1–3.6 trackers 具有 stable IDs、status / ownership / evidence / authority 或 reconciliation logic，不是空表。
- 2.6 Scorecard 的 weighted formula 已在 artifact QA 修正並重掃；所有具公式 workbook 的 error-token scan 為 0。
- 3.5 是 manual evidence / status control；3.6 現有公式限於 delivery variance、unmatched certificate MWh、invoice variance 與 open counts。這些 capability claims 已在唯一一次 cross revision 校正。

<!-- PAGEBREAK -->

### Deck discipline

| Deck | Slides | Why deck is appropriate | Result |
|---|---:|---|---|
| Kickoff Deck | 8 | 共同確認 scope、roles、decision process 與 first-week asks | PASS |
| Taiwan Market Workshop Deck | 15 | 教學、cross-functional discussion 與 decision capture | PASS |
| Roadmap Deck | 8 | Stakeholder alignment、gates、owners 與 2.x transition | PASS |
| Bidder Briefing Deck | 8 | 對多家 bidder 一致說明 process、response 與 evidence rules | PASS |
| Negotiation Decision Pack | 7 | 支援 G9 executive commercial decision | PASS with minor cosmetic note |

Minor note：Negotiation Decision Pack 的 canonical 版本通過 structural validator 且 7 頁 decision content 全部可讀；LibreOffice QA render 在兩頁的左側 footer 有輕微裁切，不影響訊息、圖表或決策使用。已依 artifact revision 上限停止再版；未將不穩定的後續 render 版本升為 canonical。

<!-- PAGEBREAK -->

## Cross-workstream decision and evidence chain

| Handoff | Final judgement | Evidence |
|---|---|---|
| 1.2 → 1.4 / 1.5 / 1.6 | PASS | Data request / dictionary 涵蓋 boundary、meter / load、targets、procurement、policy、stakeholder、approval與timeline。 |
| 1.3 → 1.5 / 1.6 / 2.x | PASS | Workshop 從 market mechanics、flows、options、trade-offs、constraints 導向 decisions 與 next inputs。 |
| 1.4 → 1.5 → 1.6 | PASS | Residual gap 進 portfolio scenarios；preferred / fallback direction 進 roadmap、gates與 owners。 |
| 1.6 → 2.x | PASS | G5 disclosure / market authority、small-universe MVP、source protocol 與 stop rules 已定義。 |
| 2.1 → 2.2–2.6 | PASS | Entity / route / asset / evidence fields 連續進 engagement、assessment、RFQ與 DD。 |
| 2.5 → 2.6 | PASS | Response schema 與 score / DD intake 對應；blank 明定 NOT PROVIDED，不當成 zero。 |
| 2.6 → 3.1 | PASS | Shortlist、DD conditions、risk與 evidence gaps 進 final requirement / mandate。 |
| 3.1 → 3.2 → 3.3 | PASS | Term / Issue IDs 進 clause / counsel mapping，再成 negotiation agenda。 |
| 3.3 → 3.4 → 3.5 | PASS | Position / give-get / record 進 scenario / risk decision，再成 document / CP / readiness control。 |
| 3.5 → 3.6 | PASS | Signed baseline、CP、contacts、delivery、certificate / invoice / data與 open exceptions 進 implementation control。 |

Detailed evidence 與唯一一次 cross revision 記錄於 `shared/CROSS_WORKSTREAM_AUDIT.md`。

## Boundary QA

### Truthfulness

Repository 沒有填入 AMAT 用電量、site / meter、procurement volume、budget、supplier preference、internal policy、實際 market price、offer或組織事實。任何 stakeholder design 都標為 hypothesis；demo company / offer / volume / price 不可被當作 recommendation。Client-facing 使用前必須以 source log、access date、as-of date 與 limitation 更新市場內容。

### Confidentiality

在 G0 確認 NDA、classification、InfoSec 與 tool allowance 前，不得把 client identity、site、meter、volume、timeline、budget、offer、contract、contact或 internal policy 輸入未核准工具。外部研究應抽象化問題；真實文件需同時檢查 filename、metadata、columns與 context。Incident response 採 Stop / Report / Contain / Document。

### Market conduct

未有 G5 書面授權前，只做 public-source desktop research。Anonymous sounding 只揭露必要且 rounded 的需求；named approach、RFQ與 negotiation 各有更高 disclosure threshold。不得用 client pipeline 作 social currency，不分享一家的 confidential offer 給另一家，也不以 gossip 或無證據形容詞評價市場參與者。

<!-- PAGEBREAK -->

## Residual unknowns and activation conditions

下列事項屬於 pre-contract repository 刻意保留的未知，並非用文件猜測即可解決：

1. AMAT sponsor、day-to-day owner、stakeholders、decision body 與 gate authority。
2. Sites、meters、load / target / existing procurement、reporting boundary、data access與 quality。
3. Policy、budget、tenor、technology、credit、risk appetite、timeline與 approval calendar。
4. Market disclosure authority、supplier contact universe、真實 availability / pricing / project evidence。
5. Legal counsel、privilege、governing law、formal redline、contract set與 signing authority。
6. Implementation systems、meter / certificate / invoice owners、tolerance / SLA、reconciliation cycles與 BAU acceptance。
7. 最新台灣制度、法規、market availability與 project-specific public evidence。
8. Optimum staffing、review bandwidth、artifact approvers與 Founder decision load。

這些項目已分配 ID、status、confirm-by 與 owner hypothesis，見 `06_UNRESOLVED_ISSUES.md`。到期仍未取得證據時，正確動作是 conditional decision、defer with owner / date 或 re-scope，不是把 assumption 改寫成 fact。

<!-- PAGEBREAK -->

## Kickoff activation sequence

1. 以 1.1 questions 取得 G0：success、scope、roles、cadence、decision rights、confidentiality與 tool rules。
2. 依 1.2 發出 decision-linked data request；指派 owner / due / access；先做 quality profile。
3. 依 client audience 校準 1.3；在 client-facing 前驗證所有 market / policy claims。
4. 把 1.4 / 1.5 synthetic rows 替換成第一個可驗證 client slice，先交 MVP，不等待全部資料完美。
5. 在 1.6 核准 G3 / G4 / G5、90-day critical path、disclosure與 2.x launch conditions。
6. 只有取得書面 market authority 後才執行 2.2；RFQ、shortlist、negotiation、signing與 go-live 各自經 G6–G11。

## Release decision

**Release AMAT Pre-delivery Repository v0.1 for internal use and kickoff calibration.**

允許立即使用：方法、task briefs、question sets、synthetic-tested models、trackers、workshop / kickoff drafts、decision gates、training與 control rules。

不得直接當成已核准 client fact 或 market commitment：所有 demo data、stakeholder hypotheses、supplier / option examples、commercial positions、legal interpretations、market facts與 timeline archetypes。

下一個正式版本不是「再擴充更多頁面」，而是在 kickoff 取得真實期待與 authority 後，將相對應 artifact 升為 client-calibrated v1，並在 register 留存 source、decision、owner與版本證據。
