# AMAT Master Delivery Blueprint v0.1

## Purpose and reading guide

本文件把 1.1–3.6 的 purpose、client question、audience、activities、inputs、deliverables、dependencies、hypotheses、open questions 與下一階段 handoff 放在同一份管理視圖。它是 pre-contract v0.1，不代表 AMAT 已核准 scope、組織、資料、時程或 procurement position。

## Delivery logic

1.x 先建立 mandate、資料與共同語言，再把需求缺口轉成 portfolio 與 roadmap。2.x 以 roadmap 為邊界測試市場、取得可比較提案並形成 shortlist。3.x 鎖定商業條件、審閱風險分配、談判、簽署並轉入執行治理。Shared PM、confidentiality、market conduct 與 training 橫跨全程。

## 1.1 專案啟動與工作方式確認

- **Purpose**：確認成功定義、scope、roles、ways of working、decision rights、review rhythm 與 first 30-day plan。
- **Client question**：我們要一起回答哪些問題，誰在何時做什麼決定，成果要如何被 AMAT 使用？
- **Audience**：HYPOTHESIS - sponsor、Taiwan sustainability / RE100 owner、Procurement、Facilities、Finance、Legal、regional / global stakeholders。
- **Activities**：expectation validation interviews、scope boundary review、RACI、meeting cadence、decision / change process、deliverable acceptance、initial risk workshop。
- **Inputs**：proposal / SOW（若有）、known correspondence、stakeholder hypothesis、target dates、data access constraints。
- **Deliverables**：Kickoff Deck、Project Charter、Ways of Working、RACI、Workplan、cadence、decision process、ARID structure、expectation validation questions。
- **Dependencies**：正式 SOW / contracting status、client sponsor availability、Optimum staffing。
- **Key hypotheses**：AMAT 需要跨 Taiwan / regional / global alignment；現階段真正使用情境與 approval path 未明。
- **Open questions**：什麼叫成功、in / out of scope、final users、approval rights、preferred communication、document security、escalation SLA？
- **Connection to next stage**：核准的 governance 與 first data request 啟動 1.2；stakeholder list 與 learning needs 啟動 1.3。

## 1.2 資料與需求蒐集

- **Purpose**：建立可追蹤、可解釋、足以支撐 1.4–1.6 的資料與需求基礎。
- **Client question**：哪些資料與 stakeholder evidence 足以建立 baseline、理解限制並設計 procurement options？
- **Audience**：Taiwan sustainability、Facilities / site energy owners、Procurement、Finance、Legal、data owners。
- **Activities**：分批 data request、data dictionary、quality profiling、stakeholder interviews、gap triage、assumption approval、source logging。
- **Inputs**：site / meter list、monthly or interval consumption、tariff / bill data、existing renewable contracts / certificates、target definition、load changes、budget / accounting preferences、internal policies。
- **Deliverables**：Data Request Guide、Data Request Tracker.xlsx、Data Dictionary.xlsx、quality checklist、interview guide、requirements question list、data gap process。
- **Dependencies**：1.1 governance、access and confidentiality rules、client owner assignments。
- **Key hypotheses**：不同 sites / functions 可能由不同 data owners 管理；資料 grain 與一致性可能不足以直接做 hourly matching。
- **Open questions**：coverage period、unit、meter hierarchy、forecast ownership、existing procurement treatment、data retention / transfer requirements？
- **Connection to next stage**：clean input schema、quality flags 與 approved assumptions餵入 1.4；non-numeric requirements餵入 1.5 / 1.6。

## 1.3 台灣市場與再生能源採購工作坊

- **Purpose**：建立 AMAT stakeholders 的共同市場語言，讓後續 portfolio 與 roadmap 決策有足夠理解與明確問題。
- **Client question**：台灣採購機制如何影響 AMAT 的 volume、tenor、price、flexibility、risk、certificate 與 execution choices？
- **Audience**：HYPOTHESIS - Taiwan sustainability / RE100 owner、Procurement、Facilities、Finance、Legal、regional / global sustainability / procurement、relevant decision makers。
- **Activities**：pre-read / pulse check、market mechanics teaching、electricity / contract / certificate flow、option comparison、constraint discussion、decision exercise、question capture。
- **Inputs**：validated stakeholder / learning needs、current public market research、1.2 early findings、AMAT questions。
- **Deliverables**：Workshop Design Document、Workshop Deck、Facilitator Guide、participant design、discussion questions、expected decisions / learnings、follow-up actions。
- **Dependencies**：1.1 sponsor alignment；client-facing facts需完成 source validation。
- **Key hypotheses**：stakeholders 對 wheeling、retailer、T-REC、PPA risk 與 internal decision implications 的理解程度不一致。
- **Open questions**：需要教育、alignment 還是 decision session？哪些敏感議題不適合全體討論？需要中英文哪一種？
- **Connection to next stage**：workshop 的 agreed principles、questions、risk preferences 與 owner gaps 餵入 1.4–1.6。

## 1.4 需求與 RE100 缺口分析

- **Purpose**：以可追溯資料計算 baseline、target、existing eligible procurement 與 residual gap，並揭示 data quality / sensitivity。
- **Client question**：在各 target year，AMAT 要補足多少符合其定義的再生能源需求，哪些數字仍不確定？
- **Audience**：Sustainability / RE100 owner、Facilities、Finance、Procurement、Project Lead。
- **Activities**：boundary definition、data mapping、unit normalization、baseline / forecast、eligibility mapping、gap calculation、sensitivity、management interpretation。
- **Inputs**：1.2 clean data、target rules、growth / efficiency assumptions、existing procurement and certificate data。
- **Deliverables**：Methodology Document、Gap Analysis Model.xlsx、synthetic demo dataset、management summary、decision output。
- **Dependencies**：1.2 data completeness、1.3 shared terminology、client confirmation of reporting boundary。
- **Key hypotheses**：年度 gap 是第一版 planning basis；若 data 支援再擴充 site / month / load shape granularity。
- **Open questions**：reporting boundary、market-based / location-based treatment、contracted volume recognition、forecast horizon、uncertainty tolerance？
- **Connection to next stage**：year-by-year residual gap、quality flag 與 sensitivity range直接成為 1.5 demand input。

## 1.5 採購組合與情境分析

- **Purpose**：把 residual gap 轉成可比較的 procurement portfolios，顯示 cost、timing、tenor、technology、flexibility 與 concentration risk。
- **Client question**：哪些組合能在可接受的成本與風險下滿足短、中、長期目標？
- **Audience**：Sustainability、Procurement、Finance、Facilities、Legal、decision makers。
- **Activities**：option screening、scenario definition、volume allocation、cost logic、timing / tenor mapping、risk scoring、dependency and sensitivity analysis。
- **Inputs**：1.4 gap、1.2 requirements、1.3 preferences、RESEARCH REQUIRED market assumptions。
- **Deliverables**：Portfolio Methodology、Scenario Model.xlsx、assumptions、option comparison、management / decision output。
- **Dependencies**：gap basis accepted；市場假設的來源與日期可追溯。
- **Key hypotheses**：初版至少需 Base、Flexibility-priority、Long-term coverage-priority 三種 synthetic scenarios；名稱與參數於客戶 review 後調整。
- **Open questions**：cost definition、budget guardrail、acceptable tenor、technology / supplier concentration、flexibility value、risk tolerance？
- **Connection to next stage**：selected or hybrid scenario 的 volumes、waves、risks 與 dependencies進入 1.6 roadmap。

## 1.6 跨部門對齊與 RE100 路徑圖

- **Purpose**：將 portfolio direction 轉成有 owners、decision gates、timeline、approval points 與 2.x briefs 的行動路徑。
- **Client question**：AMAT 應先做什麼、何時決定、誰負責，如何由短期 coverage 過渡到中長期主力採購？
- **Audience**：cross-functional steering group、regional / global approvers、workstream owners。
- **Activities**：scenario alignment、dependency mapping、approval design、procurement waves、risk ownership、resource / calendar review。
- **Inputs**：1.4 gap、1.5 scenarios、1.3 stakeholder outputs、1.1 governance。
- **Deliverables**：Alignment / Roadmap Document、Roadmap Deck、decision gates、owner / dependency matrix、short / medium / long-term roadmap、2.x transition briefs。
- **Dependencies**：preliminary scenario direction；decision owners and calendars。
- **Key hypotheses**：roadmap 需容許 near-term bridging 與 long-term contracting 並行，不預先假定特定供應商或結構。
- **Open questions**：which gates need global approval、procurement calendar、market engagement disclosure、resourcing、interim coverage policy？
- **Connection to next stage**：approved market questions、volume bands、timing、option scope 與 disclosure boundary定義 2.1–2.6。

## 2.1 市場掃描與供應商盤點

- **Purpose**：建立可追溯的 market universe、supplier / developer / retailer / project categorization 與 preliminary screening。
- **Client question**：哪些市場參與者與供應機會值得進一步接觸，基於什麼證據？
- **Audience**：Optimum market / commercial team、AMAT Procurement / Sustainability；外部不直接分享 raw judgement。
- **Activities**：research protocol、source collection、entity / project ID、category and field mapping、evidence confidence、initial screen。
- **Inputs**：1.6 market brief、public sources、Optimum legitimate market knowledge、disclosure constraints。
- **Deliverables**：Market Scan Methodology、Market Landscape.xlsx、screening logic、source log、preliminary summary、research protocol。
- **Dependencies**：scope boundary、source hygiene、market conduct rules。
- **Key hypotheses**：public information 不足以確認 live availability / commercial terms，需 2.2 驗證。
- **Open questions**：geographic / technology / maturity scope、excluded parties、conflict check、client identity disclosure？
- **Connection to next stage**：screened longlist、unknown fields 與 contact priority餵入 2.2、2.3、2.4。

## 2.2 初步市場接觸與供應條件確認

- **Purpose**：在受控資訊邊界內驗證供應意願、availability、structure 與 key conditions，不造成 false commitment。
- **Client question**：市場是否能供應我們考慮的 volume / timing / structure，條件範圍與 red flags 是什麼？
- **Audience**：Optimum engagement lead、AMAT authorized Procurement / Sustainability；selected suppliers。
- **Activities**：conflict / disclosure check、neutral outreach、questionnaire、meeting、comparable capture、fact confirmation、market feedback synthesis。
- **Inputs**：2.1 longlist、1.6 requirement bands、approved information boundary、contact protocol。
- **Deliverables**：Market Engagement Protocol、questionnaire、email / meeting scripts、Interaction Tracker.xlsx、market feedback memo、red flag checklist。
- **Dependencies**：client authorization to engage and disclose；confidentiality process。
- **Key hypotheses**：匿名或低資訊 outreach 可先測試基本 fit；具體報價需 2.5 controlled process。
- **Open questions**：which facts can be disclosed、can Optimum name AMAT、recording rules、supplier NDA need、response status？
- **Connection to next stage**：availability、structure、timing、price basis 與 red flags更新 2.3 / 2.4 assessment及 2.5 design。

## 2.3 短期補充型採購方案評估

- **Purpose**：評估能補足近期 gap 或 timing mismatch 的較短期、較具彈性方案。
- **Client question**：哪些方案可在目標時間內提供合格 coverage，代價與 delivery risk 為何？
- **Audience**：Sustainability、Procurement、Finance、Legal / reporting stakeholders。
- **Activities**：option eligibility、availability、price structure、term、certificate treatment、flexibility、delivery and counterparty risk comparison。
- **Inputs**：1.4 near-term gap、1.5 scenario needs、2.1 / 2.2 market evidence、client policy。
- **Deliverables**：Short-term Procurement Assessment Memo、comparison workbook、decision brief。
- **Dependencies**：confirmed RE100 / internal eligibility、market data freshness。
- **Key hypotheses**：短期方案主要是 bridge / residual tool，不預設長期策略由其取代。
- **Open questions**：acceptable instrument / geography / vintage、minimum term、renewal risk、accounting / budget treatment？
- **Connection to next stage**：recommended short-term requirements與 evaluation criteria進入 2.5 RFQ 或直接 decision gate（若客戶核准）。

## 2.4 中長期主力型採購方案評估

- **Purpose**：評估能提供中長期 volume coverage 的主要 procurement structures 與 project risks。
- **Client question**：哪些結構與供應專案能支持長期目標，price certainty、credit、generation、wheeling 與 contract complexity 如何取捨？
- **Audience**：Sustainability、Procurement、Finance / Treasury、Facilities、Legal、decision makers。
- **Activities**：structure mapping、project maturity / COD、supply profile、volume / tenor / price、credit、curtailment / generation、wheeling、T-REC、contract complexity comparison。
- **Inputs**：1.5 / 1.6 long-term needs、2.1 / 2.2 evidence、client credit / risk parameters。
- **Deliverables**：Long-term Procurement Assessment Memo、commercial comparison model、decision brief。
- **Dependencies**：project / supplier information quality、internal tenure and credit appetite。
- **Key hypotheses**：不同結構無法只用 headline price 比較，需 normalize risk allocation、profile、COD 與 certificate / wheeling interfaces。
- **Open questions**：preferred structure、tenor ceiling、volume flexibility、credit support、curtailment allocation、COD tolerance？
- **Connection to next stage**：long-term commercial requirements、project DD fields 與 risk questions進入 2.5 / 2.6。

## 2.5 定向提案／報價徵詢

- **Purpose**：以一致 instructions、assumptions、pricing template 與 Q&A process 取得可比較、可評估的供應提案。
- **Client question**：如何讓 selected bidders 回覆同一需求、揭露必要風險並避免後續比較失真？
- **Audience**：selected bidders、AMAT Procurement / Legal / Sustainability、Optimum process team。
- **Activities**：requirement freeze、bidder instruction、response schema、pricing / assumptions、briefing、Q&A、deadline / amendment control、submission compliance。
- **Inputs**：1.6 procurement brief、2.3 / 2.4 criteria、2.1 / 2.2 bidder evidence、approved disclosure and legal terms。
- **Deliverables**：RFQ / RFP Package.docx、Supplier Response Template.xlsx、Q&A process、bidder briefing material、commercial assumptions、response rules。
- **Dependencies**：G6 approval、bidder list、confidentiality / NDA route、evaluation methodology frozen before launch。
- **Key hypotheses**：targeted process 比 open market call 更符合 preselected fit；實際 approach 為 TBD WITH CLIENT。
- **Open questions**：procurement policy、mandatory terms、bid validity、alternative bids、clarification protocol、deadline and timezone？
- **Connection to next stage**：標準化 response fields、proposal IDs 與 exceptions直接輸入 2.6 scorecard / DD。

## 2.6 方案評估、盡職調查與候選名單

- **Purpose**：將提案的 commercial value、technical / execution feasibility、counterparty / project risk 與 unresolved DD 整合為 shortlist recommendation。
- **Client question**：哪些方案值得進入 final alignment / negotiation，原因、風險與未決事項是什麼？
- **Audience**：Procurement、Sustainability、Finance、Facilities、Legal、approval body。
- **Activities**：compliance screen、normalization、weighted / gated evaluation、DD、risk assessment、scenario impact、reference / evidence check、shortlist workshop。
- **Inputs**：2.5 responses、2.3 / 2.4 assessment、2.1 / 2.2 evidence、approved criteria。
- **Deliverables**：Evaluation Methodology、Scorecard.xlsx、Due Diligence Checklist、risk assessment、commercial comparison、Decision Memo、shortlist output。
- **Dependencies**：evaluation rules locked before seeing final scores；clarification process documented。
- **Key hypotheses**：score 支持而不取代 judgement；critical gate failure 可高於 weighted score。
- **Open questions**：weight / gate approval、conflict reviewers、risk acceptance authority、number of shortlisted options？
- **Connection to next stage**：shortlisted offers、normalized terms、risks、open DD 與 recommendation進入 3.1。

## 3.1 最終需求與商業條件對齊

- **Purpose**：在談判前鎖定 final volume / timing / structure assumptions、objectives、priorities、trade-offs 與 internal mandate。
- **Client question**：我們要談成什麼，哪些條件可交換，哪些需升級或不可接受？
- **Audience**：authorized decision makers、Procurement、Sustainability、Finance、Facilities、Legal、negotiation team。
- **Activities**：shortlist refresh、demand / scenario update、term baseline、priority / fallback / walk-away discussion、approval of mandate。
- **Inputs**：2.6 shortlist、1.4 / 1.5 updates、latest proposals、client policies and approvals。
- **Deliverables**：Commercial Alignment Memo、Commercial Term Tracker.xlsx、issue list、negotiation objectives、alignment meeting material。
- **Dependencies**：decision authority and legal interface confirmed。
- **Key hypotheses**：volume / timing 可能因 market evidence 更新；變更需透過 decision log / scope control。
- **Open questions**：authority limits、fallback supplier / structure、approval thresholds、communications route？
- **Connection to next stage**：approved term IDs、priority、target、fallback and escalation rule餵入 3.2–3.4。

## 3.2 合約與交易條件審閱

- **Purpose**：從 commercial / execution 視角辨識條款、risk allocation 與 operability，並與法律顧問分工。
- **Client question**：draft contract 在 settlement、delivery、wheeling、certificates、default、termination、change、force majeure、credit、guarantee、CP 等方面如何影響交易？
- **Audience**：Procurement、commercial owners、Finance、Facilities / operations、AMAT Legal / external counsel。
- **Activities**：clause mapping、commercial impact、legal question routing、issue prioritization、operability test、owner assignment。
- **Inputs**：3.1 mandate、contract drafts、proposal and clarification record、client policies、legal advice。
- **Deliverables**：Contract Review Playbook、Commercial / Legal Issue Tracker.xlsx、clause checklist、risk allocation checklist。
- **Dependencies**：正式法律意見由 AMAT counsel 提供；Optimum 不作法律結論。
- **Key hypotheses**：許多條款同時有 commercial 與 legal 面向，需要單一 issue ID 共同管理。
- **Open questions**：review protocol、privilege / document handling、redline owner、turnaround SLA、which counsel has final legal call？
- **Connection to next stage**：prioritized issue list、client position、commercial impact 與 legal owner成為 3.3 agenda。

## 3.3 第一輪談判與修正

- **Purpose**：依 mandate 處理最高優先議題，記錄 counterpart position、concessions、impact 與 follow-up。
- **Client question**：第一輪應先解決哪些議題，哪些 concession 可以交換，何時升級？
- **Audience**：negotiation team、authorized client leads、supplier counterpart、Legal where needed。
- **Activities**：pre-brief、agenda / role assignment、negotiation、real-time issue capture、post-meeting record、draft update and impact review。
- **Inputs**：3.1 objectives、3.2 issue list / draft、2.6 commercial evidence、authority matrix。
- **Deliverables**：Negotiation Strategy Memo、Negotiation Tracker.xlsx、meeting brief template、post-meeting record。
- **Dependencies**：approved spokesperson、communication channel、legal attendance / review rule。
- **Key hypotheses**：先處理高價值 / 高依賴議題能避免在低影響條款過早消耗 concession。
- **Open questions**：supplier decision authority、meeting sequence、redline exchange protocol、what can be agreed in room？
- **Connection to next stage**：updated positions、concessions、commercial impact、unresolved issues與 decision asks進入 3.4。

## 3.4 後續談判與內部決策

- **Purpose**：收斂 remaining issues，呈現 final scenarios、incremental commercial impact 與需要 AMAT 接受的 residual risk。
- **Client question**：在現有 terms 下應接受、再談、切換方案或停止？
- **Audience**：approval body、sponsor、Procurement、Sustainability、Finance、Legal、operations owners。
- **Activities**：position refresh、scenario comparison、risk acceptance、approval questions、conditional decision、final negotiation rounds。
- **Inputs**：3.3 tracker、revised drafts / offers、3.1 objectives、3.2 risk positions。
- **Deliverables**：Decision Memo、position tracker、final scenario comparison、risk acceptance record、decision pack。
- **Dependencies**：decision rights and financial / legal impact available。
- **Key hypotheses**：所有 remaining issues 應標為 accept / negotiate / escalate / walk-away / post-signing action，不留無 owner 的 open item。
- **Open questions**：approval forum、quorum、documentation standard、conditional approval validity？
- **Connection to next stage**：approved terms、residual risks、conditions與 owners直接進入 3.5 readiness。

## 3.5 簽約與執行準備

- **Purpose**：在簽約前確認條款、authority、conditions precedent、data / system、wheeling、certificate、supplier contact 與 transition 均可執行。
- **Client question**：我們是否真的準備好簽署並從 day one 履約，尚缺哪些 evidence 或 owner action？
- **Audience**：authorized signatories、Procurement、Legal、Finance、Facilities / operations、Sustainability、supplier implementation team。
- **Activities**：document completeness、signature authority、CP mapping、responsibility matrix、system / data / contact setup、dry-run、handover readiness review。
- **Inputs**：final draft、3.4 approvals、supplier implementation plan、internal system and process requirements。
- **Deliverables**：Signing Readiness Checklist、Conditions Precedent Tracker.xlsx、responsibility matrix、execution readiness、transition plan。
- **Dependencies**：final legal approval、authorized signatures、clear owner for each CP and implementation milestone。
- **Key hypotheses**：signing date 與 delivery start 之間可能存在 CP / setup critical path，需與 contract timeline 對齊。
- **Open questions**：signature mechanics、CP evidence standard、system owner、wheeling / certificate lead time、go-live escalation？
- **Connection to next stage**：milestone IDs、CP status、owner、supplier contacts、baseline obligations與 evidence repository交給 3.6。

## 3.6 採購方案落地與執行追蹤

- **Purpose**：建立 recurring governance，追蹤 milestones、expected vs actual delivery、certificates、reconciliation、commercial issues 與 BAU transition。
- **Client question**：如何確保合約按預期交付、問題被及時處理、證書與財務紀錄可對帳並可持續運作？
- **Audience**：contract / operations owner、Sustainability、Finance / AP、Facilities、Procurement、Legal as needed、supplier operations。
- **Activities**：milestone / delivery tracking、exception management、certificate ledger、reconciliation、commercial issue log、periodic review、lessons learned、BAU handover。
- **Inputs**：3.5 handover、contract obligations、meter / settlement / certificate data、supplier reports、client reporting needs。
- **Deliverables**：Execution Governance Document、Implementation Tracker.xlsx、recurring review format、periodic client reporting template、BAU transition pack。
- **Dependencies**：data flows、system owners、supplier SLA、issue escalation and retention rules。
- **Key hypotheses**：初期需較高頻 governance，穩定後轉為 BAU cadence；實際頻率為 TBD WITH CLIENT。
- **Open questions**：source of truth、tolerance / dispute threshold、certificate retirement ownership、reporting calendar、audit evidence retention？
- **Connection to next stage**：正式移交 BAU；重大 change 透過 shared change control 重新進入 appropriate workstream。

## Cross-cutting controls

- **Shared PM**：status、minutes、actions、risks、issues、decisions、assumptions、changes、sources、stakeholders、questions、deliverables、schedule、version / review。
- **Training**：task definition、MVP、preliminary judgement、review readiness、1.x → 2.x capability progression。
- **Confidentiality**：classification、need-to-know、file / device / cloud / AI / SaaS handling、anonymization、incident response。
- **Market conduct**：information minimisation、neutral outreach、no false commitment、no gossip、no cross-supplier disclosure、conflict awareness、evidence-based communication。

## Kickoff calibration priorities

第一週優先確認：success / intended use、stakeholders / decision rights、scope boundary、data and confidentiality rules、target / RE100 interpretation、timeline / approvals、market disclosure authority、legal counsel interface、reporting cadence。所有未確認事項保留 TBD WITH CLIENT，不透過文字完整度掩蓋未知。
