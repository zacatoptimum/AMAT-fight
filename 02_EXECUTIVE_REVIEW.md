# AMAT Pre-delivery Repository v0.1 — Executive Review

> 主要讀者：Founder / Zac、Project Lead、未來Delivery Owner  
> 狀態：`PRE-CONTRACT / PRE-KICKOFF`  
> 版本日期：2026-09-27  
> 重要邊界：本文件解釋delivery system，不宣稱任何未經確認的AMAT-specific facts。凡客戶組織、用電、site、volume、budget、policy、supplier、price、timeline與approval均依各artifact標示為`HYPOTHESIS`、`TBD WITH CLIENT`、`SYNTHETIC / DEMO DATA`或`RESEARCH REQUIRED`。

## Executive conclusion

這套repository已把「如果明天下週kickoff，我們如何從零開始」改造成「先驗證哪些問題、先拿哪一版MVP、在什麼gate做什麼決定、下一個workstream需要接到什麼」。它不是一份假裝知道客戶答案的proposal，也不是把18個標題換成18個空白模板；它是一套能被實際操作、review、升版與移交的第一版delivery operating system。

整體設計有四個重點。

第一，專案不是由deliverable清單推動，而是由decision chain推動。1.x確認問題、資料、選項與內部方向；2.x把方向送進市場、取得可比較證據並形成shortlist；3.x把shortlist轉成term、contract issue、negotiation decision、signing readiness與BAU governance。每一階段都有明確exit evidence；沒有證據時可以conditional、defer或re-scope，不能用沉默當成approval。

第二，未知被保留為正式管理對象。AMAT的stakeholder、data boundary、target interpretation、budget、authority、supplier preference與timeline目前都不是KNOWN。Repository用assumption log、client question log、source log、decision log與每個work package的Known / Hypotheses / TBD分區，把「不知道」變成可追蹤的工作，而不是靠文字完整度掩蓋。

第三，工作方式採`Define → MVP → Review → Correct → Expand`。1.x讓執行者學會先確認expected output再做；2.x開始要求analyst自己提問題、方法、假設與preliminary judgement；3.x要求跨commercial、legal、risk、authority與execution整合。Founder / Project Lead的角色因此能逐步從Do轉成Teach、Review與Decide。

第四，repository把client output、internal method與training layer分開但串接。給客戶看的deck保持精煉；分析方法、SOP與decision rationale放在DOCX / Markdown；計算、tracking與source-of-truth放在XLSX。新人可以從`TASK_BRIEF_TEMPLATE`與單一work package開始，而不必先口頭聽完整個專案。

<!-- PAGEBREAK -->

## 1. Delivery logic：三階段、十一個gates、一條evidence chain

### 1.x — Define the problem and align the client

1.x不是先替客戶選供應商，而是先建立共同問題定義：成功是什麼、誰做決定、資料夠不夠、台灣市場如何運作、RE100 gap怎麼計算、可行portfolio有哪些、接下來怎麼進市場。這一段的品質決定2.x是否會向錯的市場問題取樣，也決定3.x談判時是否有清楚authority。

### 2.x — Convert hypotheses into comparable market evidence

2.x從desktop scan開始，逐步提高資訊揭露與市場承諾程度。先把entity、route、asset與evidence拆開，再做小範圍market sounding，評估短期bridge與中長期主力方案，最後用共同response schema做RFQ與DD。最低價不自動成為shortlist；hard screen、evidence confidence、execution、certificate與risk allocation必須獨立呈現。

### 3.x — Convert a shortlist into an executable agreement and operating control

3.x把shortlist轉成negotiation mandate與term hierarchy，再把commercial issue映射到contract clause與counsel question。每次談判只承諾authority內事項，會後保留exact statement status。G9選擇accept / counter / continue / fallback / pause / stop；G10分開判斷signing ready與go-live ready；G11只有在delivery、certificate、invoice與issue governance能由BAU owner獨立運作時才移交。

### Decision gates

| Gate | Decision | Minimum exit evidence |
|---|---|---|
| G0 | Kickoff / ways of working | success、scope、roles、cadence、decision process、information rules |
| G1 | Data readiness | request ownership、access、quality profile、critical gaps與recovery plan |
| G2 | Workshop alignment | common market language、stakeholder questions、learning / decision record |
| G3 | Gap boundary | approved reporting boundary、target logic、baseline與residual gap condition |
| G4 | Portfolio direction | scenario set、hard constraints、preferred / fallback方向 |
| G5 | Market authority | disclosure level、market questions、contact universe、stop rules |
| G6 | RFQ launch | issued assumptions、bidder set、process、response schema、evaluation governance |
| G7 | Shortlist | hard screen、normalized comparison、DD conditions、risk / evidence view |
| G8 | Negotiation mandate | final requirement assumptions、term hierarchy、trade / walk-away authority |
| G9 | Preferred commercial path | latest delta、scenario impact、residual risk acceptance、authorized message |
| G10 | Signing / go-live readiness | final documents、authority、CPs、systems / data、implementation ownership |
| G11 | BAU acceptance | stable cycles、accepted SOP / controls、named owners、residual issue handoff |

<!-- PAGEBREAK -->

## 2. Client journey and first 90-day operating concept

Client journey不是一次收集所有資料後閉門分析，而是連續降低不確定性。Kickoff先確認intended use與decision rights；data discovery與stakeholder interviews同時展開；workshop讓跨部門有足夠共同語言參與portfolio decision；gap與scenario先出minimum viable model，不等所有資料完美；roadmap先核准market question與disclosure boundary，才進外部接觸。

初步90-day sequence只是planning archetype，不是AMAT承諾：

1. Weeks 1–2：G0、stakeholder / data owner、information rules、interview與workshop plan。
2. Weeks 2–5：quality profile、workshop、gap boundary MVP，進G1 / G2。
3. Weeks 4–7：gap與portfolio scenarios，進G3 / G4。
4. Weeks 6–9：roadmap、desktop scan、source log與G5 preparation。
5. Weeks 8–12：在書面authority下做small-universe sounding；review後才擴大。

每兩週的status不應重複所有activity，而是回答：哪個decision將到期、哪個critical dependency控制時程、哪些assumption變了、客戶需要做什麼、若延遲會影響哪個後續gate。Monthly report再補充趨勢、scope / change與forecast。

Founder / Project Lead在前30天應集中review：client expectation、boundary、stakeholder與gate authority；在2.x集中review：market question、disclosure、screening judgement、RFQ comparability與shortlist；在3.x集中review：term hierarchy、risk / trade、client authority與final quality。資料整理、first draft、source update與tracker maintenance應逐步移交給analyst。

<!-- PAGEBREAK -->

## 3. Workstream 1.1 — 專案啟動與工作方式確認

### 為什麼存在

過去Optimum可能主要提供台灣domain input，而非整體delivery owner；若沒有先定義成功、使用方式與decision process，團隊很容易用自己的經驗補上客戶未說出的期待。1.1把這個風險轉成kickoff要驗證的正式問題。

### 第一版成果與使用方式

`PROJECT_CHARTER_AND_WAYS_OF_WORKING`把objective、scope boundary、roles、meeting cadence、decision rule、action / risk / issue / decision structure與version control放在同一份document；8頁Kickoff Deck只用來同步討論與取得G0。角色表是hypothesis，不能當成AMAT組織事實。

### Founder / Project Lead要看什麼

先看客戶最後要用成果做什麼，而不是先看task list。確認誰是sponsor、day-to-day owner、各gate approver與single source of truth；確認哪些資訊可進AI / SaaS、哪些外部接觸需要書面授權；確認會議節奏是否配合decision lead time。

### 完成與handoff

G0完成不是「kickoff開完」，而是success / intended use、scope、roles、decision process、data / confidentiality rule與next MVP都有owner / date。輸出直接餵1.2 request、1.3 audience、1.6 gates與shared project control。

<!-- PAGEBREAK -->

## 4. Workstream 1.2 — 資料與需求蒐集

### 為什麼存在

RE100 gap、portfolio、roadmap與後續RFQ都會被資料邊界影響。1.2不是發一封「請提供用電資料」的email，而是把每項資料對應到decision、quality test、owner、due date與fallback。

### 第一版成果與使用方式

Data Request Guide說明request logic、priorities、quality / completeness與data-gap process；Data Request Tracker讓request、owner、access、received version、quality與decision effect可追蹤；Data Dictionary定義site / meter、period、unit、target、existing procurement、certificate與forecast欄位。Seeded rows只示範schema。

### Founder / Project Lead要看什麼

不要等所有資料到齊才第一次review。先選能跑1.4 MVP的最小data slice：一個boundary、一段period、load / procurement / target；同時要求analyst列出missing data會把哪個decision變成conditional。真正高風險的是看似完整但boundary / unit / version不一致。

### 完成與handoff

G1需有data owner、access route、quality profile、critical gap與recovery plan。1.4接baseline / target / existing procurement，1.5接forecast / constraint / budget assumptions，1.6接owner / approval / timing dependencies；任何不能取得的資料要有proxy與使用限制。

<!-- PAGEBREAK -->

## 5. Workstream 1.3 — 台灣市場與再生能源採購工作坊

### 為什麼存在

Workshop不是替AMAT上一般市場課，而是讓跨部門有足夠共同語言，能對1.5 portfolio與2.x採購活動做真實決定。沒有這一層，Procurement可能只看price，Facilities只看delivery，Sustainability只看certificate，Legal直到後段才看到風險。

### Audience hypothesis

可能參與者包括Taiwan sustainability / RE100 owner、Procurement、Facilities / site energy owners、Finance、Legal、regional / global sustainability、regional / global procurement與relevant decision makers。這些全部是`HYPOTHESIS`，1.1後須驗證。不是每個人都需參加全程；設計文件建議core session加role-specific segment。

### 第一版成果與使用方式

Workshop Design / Facilitator Guide定義objectives、agenda、participant design、questions、expected learning / decisions與follow-up；15頁deck依序回答business reason、participants、electricity / contract / certificate flows、onsite / offsite / retailer / PPA / wheeling / T-REC、option trade-offs、market constraints、AMAT implications與required inputs。每頁有message title、visual concept與discussion note。

### 完成與handoff

G2不是參與者「聽懂」而已，而是留下question / disagreement / owner / evidence / decision。輸出更新1.4 boundary、1.5 criteria、1.6 stakeholder / gate design與2.x market questions。最新制度 / 法規 / 市場數據在client-facing前必須依source protocol研究，不以記憶填入。

<!-- PAGEBREAK -->

## 6. Workstream 1.4 — 需求與 RE100 缺口分析

### 為什麼存在

所有採購討論都應從可追溯的residual gap開始。若reporting boundary、target、existing procurement與eligibility沒有分開，後續方案可能在數學上填滿、在claim上卻無效。

### 第一版成果與使用方式

Methodology Document定義baseline、target、existing eligible procurement、residual gap與quality / sensitivity；7-sheet Gap Analysis Model以synthetic site / year資料實際計算load、target need、existing coverage、residual gap、data quality與sensitivity。Input與calculation分開，MODEL_README說明未來client mapping。

### Founder / Project Lead要看什麼

先reviewboundary與logic，再review數字。要求每個material input有source / as-of / truth status；對missing / low-confidence資料做sensitivity，而不是補一個看似精確的點值。確認management summary能說明「差距多少、何時發生、可信度、哪項資料最可能改變decision」。

### 完成與handoff

G3核准的是gap boundary與使用限制，不是保證所有資料永久正確。Annual residual gap與sensitivity直接進1.5 volume / timing scenarios；quality flags進roadmap dependency與data improvement action。

<!-- PAGEBREAK -->

## 7. Workstream 1.5 — 採購組合與情境分析

### 為什麼存在

單一option通常無法同時最佳化volume、cost、timing、tenor、technology、flexibility、execution risk、market risk與concentration。1.5把討論從「哪個方案最好」改為「在client-approved constraints下，哪個portfolio最適合，fallback是什麼」。

### 第一版成果與使用方式

Portfolio Methodology說明criteria、hard constraints、scenario construction與decision rule；Scenario Model用三個synthetic archetypes計算coverage、cost、concentration與weighted score，並顯示assumptions與decision brief。Demo numbers只測試formula，不是市場報價或AMAT recommendation。

### Founder / Project Lead要看什麼

確認criteria不是後見之明地為某option加分；hard screen與weighted preference要分開；價格不能脫離volume / profile / COD / tenor / fee / tax / risk比較。要求analyst提出preliminary judgement與sensitivity：哪個input改變時，recommendation會翻轉？

### 完成與handoff

G4輸出preferred direction、fallback、hard constraints、data / market evidence needed與decision conditions。這些成為1.6 roadmap的waves / gates，也定義2.1 scan、2.2 sounding與2.5 RFQ真正要測試的問題。

<!-- PAGEBREAK -->

## 8. Workstream 1.6 — 跨部門對齊與 RE100 路徑圖

### 為什麼存在

Gap與portfolio若沒有owner、gate、deadline與dependency，就只是分析。1.6把結論轉成short / medium / long-term procurement roadmap，並把「client readiness」與「market readiness」兩條critical path同時管理。

### 第一版成果與使用方式

Alignment / Roadmap Document定義G3–G11、stakeholder / owner hypotheses、dependencies、approval points與transition；8頁Roadmap Deck用於跨部門決策，包含gate evidence、critical path、90-day MVP、disclosure staircase與G5 launch readiness。

### Founder / Project Lead要看什麼

最重要的是哪個dependency最慢、誰能決定、若延遲用什麼fallback。對外揭露採desktop → anonymous → named → RFQ / negotiation階梯，identity、site、volume、timing、recipient與permitted use都要在authority內。不要因為想快而把G5當成一般research approval。

### 完成與handoff

G5前需有approved / conditional portfolio range、specific market questions、comparable fields、supplier categories / screening、disclosure level、owner / reviewer與stop triggers。只有這些齊備，2.x才可從desktop進到external contact。

<!-- PAGEBREAK -->

## 9. Workstream 2.1 — 市場掃描與供應商盤點

### 為什麼存在

公司名稱不是供應能力，developer pipeline不是可交付電量，公開宣稱不是asset evidence。2.1建立一致的市場資料結構，避免把entity reputation、route feasibility與project availability混成一個印象分數。

### 第一版成果與使用方式

Market Scan Methodology定義Entity / Route / Asset三層ID、category、screening、evidence grade、source protocol與research boundary；Market Landscape workbook含Landscape、Screening、Source Log與G5 Summary。四筆seeded universe完全是synthetic，僅證明資料結構、weighted screen與summary能運作。

### 2.x人才要求

Analyst不只是照清單找名字，而要先提出market hypothesis、hard screen與source plan；每個material claim需有publisher、as-of、access date、evidence grade與next verification。若只能找到secondary source，要說明它可以支持什麼、不能支持什麼。

### 完成與handoff

輸出不是「完整市場名單」，而是可review的universe、coverage gap、priority research與小範圍contact recommendation。相同fields餵2.2 interaction、2.3 / 2.4 assessment、2.5 response schema與2.6 DD。

<!-- PAGEBREAK -->

## 10. Workstream 2.2 — 初步市場接觸與供應條件確認

### 為什麼存在

Desktop research無法確認real availability、commercial boundary與evidence path；但過早揭露客戶、volume或timeline又會造成false commitment與relationship risk。2.2用受控的market sounding縮小這個落差。

### 第一版成果與使用方式

Market Engagement Protocol包含authorization check、questionnaire、email / meeting script、information boundary、confidentiality與red flags；Interaction Tracker保留contact plan、exact interaction record、comparable response、red flag與feedback memo。任何supplier statement都先是counterparty claim，不自動成為verified fact。

### Founder / Project Lead要看什麼

在每次接觸前確認最高可揭露level；用共同問題確保responses可比較；不暗示bid invitation、volume commitment或preferred supplier；不要求或接收其他客戶 / competitor confidential offer。若對方要求過度資訊、exclusive commitment或不願拆解asset evidence，立即記錄並review。

### 完成與handoff

第一個MVP是small diverse set，不是一次廣撒。Review市場回饋是否真的改變availability、price structure、tenor、COD、wheeling、certificate、credit或RFQ design；再決定expand、correct或stop。結果餵2.3、2.4與2.5。

<!-- PAGEBREAK -->

## 11. Workstream 2.3 — 短期補充型採購方案評估

### 為什麼存在

中長期方案可能受COD、wheeling或approval影響，短期bridge需要獨立評估，不能假設所有certificate或short-tenor product都能滿足相同RE100 / policy用途。

### 第一版成果與使用方式

Short-term Assessment Memo定義availability、price structure、tenor、timing、certificate treatment、flexibility、delivery risk與claim relevance；Option Comparison workbook以三個synthetic archetypes計算volume、expected coverage、all-in cost、concentration與weighted criteria，產生decision brief。

### Founder / Project Lead要看什麼

先問bridge要保護哪個risk：target year、COD delay、forecast uncertainty或portfolio flexibility。要求把eligibility / certificate與commercial convenience分開；短期便宜不代表長期可延伸，長期option delay也不代表任何certificate都可替代。

### 完成與handoff

輸出應是approve / condition / research / reject的短期角色定位、maximum dependence與trigger，不是選定真實供應商。若進RFQ，fields直接進2.5；若只作fallback，須在3.4保留validity / activation trigger。

<!-- PAGEBREAK -->

## 12. Workstream 2.4 — 中長期主力型採購方案評估

### 為什麼存在

中長期方案的nominal price只是其中一項。Project maturity、supply profile、COD、volume、tenor、credit、curtailment / generation risk、wheeling、T-REC與contractual complexity共同決定可交付性與risk-adjusted value。

### 第一版成果與使用方式

Long-term Assessment Memo把company capability與asset delivery evidence分開；Commercial Comparison workbook計算expected delivered MWh、base / fee cost、all-in cost、COD delay gap與risk allocation。Risk Matrix把每個event連到evidence、preferred principle、fallback與3.2 clause topic。

### Founder / Project Lead要看什麼

要求analyst對每個project / route回答：誰控制asset、目前maturity、哪些milestone已證明、COD downside如何影響gap、shortfall / replacement如何配置、credit support由誰提供、wheeling / meter與certificate chain是否可執行。不要用developer brand替代project DD。

### 完成與handoff

輸出是可進RFQ的structure range、required evidence與risk boundary。真實route / asset只有在G6 issued package與G7 DD後才可形成shortlist；3.2 clause checklist已保留COD、delivery、wheeling、certificate與credit handoff。

<!-- PAGEBREAK -->

## 13. Workstream 2.5 — 定向提案／報價徵詢

### 為什麼存在

RFQ / RFP的價值不是收到很多proposal，而是讓不同proposal在相同assumption、unit、evidence與process下可比較。若response schema太自由，2.6只能人工解讀簡報，風險與blank會被headline price掩蓋。

### 第一版成果與使用方式

RFQ / RFP Package提供bidder instruction、scope、assumptions、pricing / risk / evidence request、Q&A / addenda、deadline structure與non-binding boundary；Supplier Response Template分Bidder Profile、Supply Offer、Pricing、Risk & Terms、Evidence Index與Compliance Summary；8頁Bidder Briefing Deck說明如何respond、evidence與submit。

### Founder / Project Lead要看什麼

G6前確認每個mandatory field都對應一個evaluation / DD need；blank等於NOT PROVIDED，不可當zero；每個offer block、asset、price component、term與evidence都有stable ID；Q&A material clarification要用addendum公平分享，bidder-specific confidential content不外洩。

### 完成與handoff

Issued package需由Procurement / Legal核准process status、bidder list、dates、channel、confidentiality與legal language。Response template與2.6 intake / score / DD schema一致，因此不需重新發明比較表。

<!-- PAGEBREAK -->

## 14. Workstream 2.6 — 方案評估、盡職調查與候選名單

### 為什麼存在

評估不是把所有風險折成一個總分。Hard constraint、weighted preference、evidence confidence、DD condition與decision authority必須分開，才能看見「分數高但不可執行」或「條件可解但證據尚未到位」的offer。

### 第一版成果與使用方式

Evaluation / Decision Memo定義compliance、independent scoring、calibration、DD、risk assessment、shortlist與dissent record；Scorecard workbook含Offer Intake、Criteria、Evaluator Scores、DD Checklist、Risk Assessment與Shortlist Summary。Synthetic rows可重算weighted score與risk score，但authorized decision欄保留人工輸入。

### Founder / Project Lead要看什麼

確認criteria / weights在看結果前核准；每個score有evidence comment；hard screen不能被高分抵消；criteria change、exception或conflict需記錄。Shortlist recommendation要同時說top strength、top risk、condition、fallback與尚未驗證的claim。

### 完成與handoff

G7由authorized body決定shortlist / reserve / exclude與conditions。Offer ID、DD item、risk與evidence gap移交3.1，成為final requirement assumptions、term hierarchy與negotiation mandate，不在handoff時重新摘要成失去source的文字。

<!-- PAGEBREAK -->

## 15. Workstream 3.1 — 最終需求與商業條件對齊

### 為什麼存在

Shortlist不等於可以談判。若final volume / profile、start、tenor、certificate、budget metric、credit boundary與decision authority仍未鎖定，談判團隊很容易用會議進度取代client decision。

### 第一版成果與使用方式

Commercial Alignment Memo定義G8、final assumptions、Must-have / Target / Tradeable / Unacceptable、priority issues、negotiation objectives與meeting agenda；Commercial Term Tracker保留Assumptions、Term Positions、Authority Matrix、Issue List與Alignment Summary。每個term / issue使用stable ID。

### Founder / Project Lead要看什麼

逐項確認：preferred outcome為什麼有商業價值、fallback是什麼、unacceptable由哪個policy / risk / budget支持、誰可以授權trade、authority何時失效。Optimum可提出commercial judgement，但不能替client接受risk。

### 完成與handoff

G8至少輸出approved / conditional mandate、participants、speaking / note roles、trade / pause / escalation rule與next supplier interaction。Top issues帶同term / issue ID進3.2 clause review與3.3 negotiation tracker。

<!-- PAGEBREAK -->

## 16. Workstream 3.2 — 合約與交易條件審閱

### 為什麼存在

Commercial review需要把文字差異轉成business effect、risk allocation與negotiation action；但Optimum不應把這項工作包裝成法律意見。法律解釋、可執行性、regulatory view、formal redline與signing authority由qualified counsel負責。

### 第一版成果與使用方式

Contract Review Playbook清楚分commercial review與legal advice，定義document control、clause checklist、risk-allocation test、priority與handoff；Commercial / Legal Issue Tracker把Document Index、Clause Checklist、Issue Tracker、Counsel Questions與Negotiation Agenda串在一起。

### Founder / Project Lead要看什麼

每個issue必須有base document / clause / version、commercial concern、business impact、preferred / fallback、legal question、owner與decision date。遇到法律問題就標`COUNSEL REQUIRED`，不能自行補結論；counterparty的新draft要重新比對open issues，不能只讀clean copy。

### 完成與handoff

3.3 agenda直接引用Issue ID、objective、opening、fallback / authority、evidence與lead。任何口頭共識只有在controlled document與counsel / client approval後才成為final term。

<!-- PAGEBREAK -->

## 17. Workstream 3.3 — 第一輪談判與修正

### 為什麼存在

第一輪的目的不是一次關掉所有條款，而是發現雙方decision drivers、在高價值issues取得可驗證movement、測試package trade並暴露真正red lines。沒有準備與紀錄的談判，很容易把clarification誤寫成commitment。

### 第一版成果與使用方式

Negotiation Strategy Memo定義issue brief、concession、walk-away / escalation、meeting roles與post-meeting record；Negotiation Tracker含Meeting Brief、Issue Positions、Give Get Log、Meeting Record與Post-Meeting Summary。Seeded內容只示範控制流程。

### Founder / Project Lead要看什麼

沒有linked get、value / risk estimate、authority與expiry就不做give。Lead speaker控制agenda；counsel處理legal question；subject owner回答fact；independent note owner記statement status；authority holder只在mandate內決定。會中壓力不能擴大authority。

### 完成與handoff

30分鐘內記agreed in principle / supplier to revert / client to decide / counsel required / not agreed與exact caveat；24小時內只確認factual action list，不寄internal strategy。最新position、give / get與open issue進3.4；新redline先回3.2更新mapping。

<!-- PAGEBREAK -->

## 18. Workstream 3.4 — 後續談判與內部決策

### 為什麼存在

多輪談判後最危險的是只看latest offer，忘記原先mandate、已做的trade、fallback value與尚未明確接受的residual risk。3.4把決策壓縮成material delta、scenario、risk acceptance與authorized message。

### 第一版成果與使用方式

Negotiation & Internal Decision Memo定義accept subject to documents、counter with mandate、continue clarification、activate fallback、pause / stop；Position Tracker比較baseline / latest、open issue、scenario impact與risk acceptance；7頁Decision Pack用於G9 client discussion。

### Founder / Project Lead要看什麼

Decision不是「覺得差不多」，而是chosen option、reason、rejected alternatives、assumptions、dissent、conditions、risk acceptor、authority evidence、validity / expiry與next gate。Scenario workbook是synthetic；真實cost與risk需Finance / client owner驗證。

### 完成與handoff

G9選擇accept / counter / continue / fallback / pause / stop，並指定external message與owner / date。只有remaining high issues已有accepted allocation或可在signing前用明確condition關閉，才進3.5。

<!-- PAGEBREAK -->

## 19. Workstream 3.5 — 簽約與執行準備

### 為什麼存在

簽署與go-live是兩個不同decision。文件可能可簽，但meter、wheeling、certificate account、vendor setup、data interface或BAU owner尚未ready；反之，implementation準備也不能替代final legal / signing authority。

### 第一版成果與使用方式

Signing Readiness Checklist涵蓋document / authority、CP / obligations、responsibility、operational readiness與transition；Conditions Precedent Tracker包含Readiness Summary、Document Set、Conditions & Obligations、Responsibility Matrix、System Data Readiness與Transition Plan。

### Founder / Project Lead要看什麼

每個final document版本一致；accepted terms與G9一致；沒有unresolved side commitment；signer authority與approval有證據。每個CP / obligation有contract reference、party、owner、due / longstop、evidence、waiver authority與late consequence。任何critical owner / evidence缺失都應維持DO NOT SIGN或NOT GO-LIVE READY。

### 完成與handoff

G10記SIGN / SIGN WITH CONTROLLED CONDITIONS / DO NOT SIGN，另記GO-LIVE READY / NOT READY。Transition Plan把signed baseline、CP、contacts、expected delivery、certificate / data / reporting與open exceptions移交3.6。

<!-- PAGEBREAK -->

## 20. Workstream 3.6 — 採購方案落地與執行追蹤

### 為什麼存在

合約價值只有在delivery、certificate與settlement能被持續驗證時才實現。3.6把project close轉成operating control，避免簽後靠個人記憶與臨時Excel維持。

### 第一版成果與使用方式

Execution Governance定義cadence、source-of-truth、lineage、metrics、issue / escalation、periodic report、change control與BAU criteria；Implementation Tracker含Governance Summary、Milestones、Delivery、Certificates、Reconciliation、Commercial Issues、Periodic Report與BAU Transition。Synthetic periods示範delivery variance、unmatched certificate MWh、invoice variance與open issue summary。

### Founder / Project Lead要看什麼

確認contract / offer / site / meter / period / certificate / invoice keys可追溯；原始資料不覆寫；任何adjustment有reason / approver / version；法律notice由counsel確認。Periodic report只報exception、decision與critical path，不複製整份tracker。

### 完成與handoff

G11需named owner / backup、access、SOP、calendar、contacts、accepted reconciliation、open claim handoff、stable cycles與risk / change / notice protocol。若critical certificate / settlement / issue process仍靠project team人工補救，就延長governance，不形式移交。

<!-- PAGEBREAK -->

## 21. Shared project control：如何避免18個workstream各自運作

Shared control不是行政附件，而是所有workstream的共同記憶。`Project_Control_Register.xlsx`把actions、risks、issues、decisions、assumptions、changes、sources、stakeholders、client questions、deliverables、schedule與version review集中；status / monthly / minutes templates只是從register抽取decision-oriented view，不另建平行事實。

五個容易混淆的log必須分開：

- Action：已同意的工作，需owner / due / completion evidence。
- Risk：未發生但可能發生，需likelihood / impact / mitigation / trigger。
- Issue：已發生，需containment / decision / closure evidence。
- Assumption：暫時相信的前提，需source / validation owner / expiry / impact if wrong。
- Decision：由authorized body做出的選擇，需options / rationale / conditions / dissent / evidence。

Change request用來保護baseline。Scope、volume、profile、timing、price basis、deliverable、decision authority或data boundary改變時，先記request、impact、options與approver，再更新schedule / artifacts；不能因為email或會議談到就默默改版。

版本規則要求：每個client-facing artifact有owner、reviewer、status、version、date、source / assumption boundary與decision use；working draft、internal reviewed、client draft、approved / issued不得混用。外部文件的issued copy與可編輯source都要保留。

<!-- PAGEBREAK -->

## 22. Training layer：新人如何從1.x executor成長為2.x analyst

`NEW_HIRE_DELIVERY_GUIDE`與`TASK_BRIEF_TEMPLATE`把接任務的最低行為變成固定格式：Objective、Expected Output、Intended Use、Approach、Inputs、Unknowns、Questions to Confirm、First MVP、Review Point、Definition of Done。這不是表格儀式；每一欄都在避免「接到大題目後消失數天」。

### 1.x executor expectation

新人先學會理解被定義的問題：在開始前重述objective與output；指出資料與unknown；先交一小段可review的MVP；依feedback修正；保持source / assumption / version。這個階段可以由Project Lead提供較明確方法，但不能替新人完成所有思考。

### 2.x independent analyst expectation

進2.x後，新人需要主動提出：我理解的client question、我會如何分析、哪幾個assumption最危險、哪些需自己research、preliminary judgement是什麼、下一個decision是什麼。Project Lead以client視角review，不再逐步指示每個操作。

### 何時問Zac / Project Lead

遇到client expectation、scope、authority、confidentiality / disclosure、material commercial judgement、high-risk recommendation、conflicting evidence或可能影響external relationship時要早問；能透過repository、source、official material、defined methodology與small test自行回答的問題先研究，並帶着初步答案而不是只丟問題。

### First draft standard

First draft不是polished final，但必須可判斷方向：有decision question、structure、至少一個filled example / result、source / assumptions、preliminary judgement與specific review asks。Review後保留變更理由，而不是只改文字。

<!-- PAGEBREAK -->

## 23. Confidentiality and research hygiene

Repository把資料概念分Public、Internal、Client Confidential、Highly Restricted；實際分類、NDA、InfoSec與tool allowance必須在G0由Optimum / AMAT正式確認。Need-to-know與minimum necessary適用於file、email、chat、meeting、screenshot、cloud、AI與external SaaS。

在未確認前，不把AMAT identity、site / meter、volume、target timeline、budget、offer、contract、contact或internal policy輸入未核准工具。需要外部research時把問題抽象化，例如研究「台灣大型企業offsite procurement的一般wheeling interface」，不寫客戶名稱、site、quantity或counterparty。真實client file不因為刪掉logo就一定匿名；metadata、filename、columns與context也可能識別。

研究紀錄需有source、publisher、URL / location、published / as-of、accessed date、claim supported、evidence grade與limitation。Public source只證明它公開，不代表它正確、最新或適合client decision。任何market / policy statement在client-facing前都需review。

若疑似外洩，依`Stop / Report / Contain / Document`：停止繼續傳送或處理、立刻通知指定owner、在不破壞證據下限制存取 / recall / revoke、記錄時間 / 資料 / recipient / action。不要自行淡化，也不要在未授權channel擴散incident details。

<!-- PAGEBREAK -->

## 24. Market conduct and information boundary

核心原則是：**We participate in the market without unnecessarily becoming a market position.** Optimum是buyer-side / client-side professional advisor，可與retailer、generator、developer、consultant與technology provider合作；不應讓市場誤認為競爭者、挖案源者或用client pipeline交換情報的人。

Information disclosure採四階：desktop只用public sources；anonymous只講抽象 / rounded need且不揭identity / exact site；named需client書面授權identity與range；RFQ / negotiation只在approved bidder process內分享，且不得把一家的confidential offer交給另一家。

Neutral approach不代表沒有judgement，而是judgement有evidence、scope與status。可以說「目前沒有足夠project-level evidence支持claimed COD」，不說「這家公司不可靠」；可以問「請提供asset control與milestone evidence」，不利用gossip施壓；可以說process non-binding與subject to client approval，不暗示volume / exclusivity。

與市場參與者互動時，任何承諾、preferred status、deadline exception、disclosure increase或cross-party comparison都需在authority內。Client identity / pipeline不是social currency；沒有必要的名字、數字與內部決策不出現在networking、conference、casual chat或訊息截圖。

<!-- PAGEBREAK -->

## 25. Current risks and unknowns

Repository刻意保留尚未解決的client / project reality。最重要的十類未知如下：

1. Sponsor、day-to-day owner、decision body與gate authority。
2. Sites、meters、reporting boundary、data grain / quality / access。
3. RE100 target interpretation、target years、existing procurement與eligibility。
4. Policy、budget、tenor、credit、technology與risk appetite。
5. Market disclosure authority與supplier communication boundary。
6. Optimum staffing、review bandwidth與document approval authority。
7. Legal counsel interface、privilege、review SLA與formal redline ownership。
8. Master schedule、procurement waves、RFQ / approval / signing calendar。
9. 最新台灣制度、法規、market availability / price與project evidence。
10. Implementation source systems、tolerances、certificate / invoice process與BAU owners。

這些未知不阻止kickoff，但會阻止特定gate。管理方式不是在文件中補一個猜測，而是標status、owner hypothesis、confirm by、impact與fallback；到期仍未解決時，decision只能conditional / defer / re-scope。

<!-- PAGEBREAK -->

## 26. Founder / Zac recommended reading and review sequence

第一次從頭review建議依下列順序：

1. 本Executive Review：確認整體client journey與decision logic是否符合Optimum想承擔的delivery role。
2. `01_MASTER_DELIVERY_BLUEPRINT`：逐項核對purpose、client question、audience、inputs、deliverables、dependencies與handoff。
3. `06_UNRESOLVED_ISSUES`：決定哪些在kickoff問、哪些由Optimum先研究、哪些需要Legal / InfoSec / specialist。
4. 1.1 Charter與Kickoff Deck：把第一週真正要取得的agreement收斂。
5. 1.2 / 1.3：確認data request不過量、workshop不是一般教學。
6. 1.4 / 1.5 models：確認calculation與decision output長相符合Founder預期。
7. 1.6 gates與2.x disclosure：確認何時可進市場以及Optimum希望維持的neutrality。
8. 2.5 / 2.6與3.x：確認commercial judgement、legal boundary、authority與signing / execution control沒有斷點。
9. `05_FINAL_QA_REPORT`：查看哪項PASS、哪些仍只能TBD / research。

Founder不需逐一修改所有文字。最有價值的review是指出：client真正會問什麼、哪個decision不夠清楚、哪個assumption風險最高、哪項output不會被使用、哪個market / commercial judgement需要Optimum立場。

<!-- PAGEBREAK -->

## 27. What “ready for kickoff” means

Ready不表示客戶資料、market price、supplier universe、contract或roadmap已知；它表示我們已知道如何取得、驗證、使用與decision-gate這些資訊。Kickoff後的第一版工作不從空白頁開始，而是：

- 用G0 questions校準client expectation與authority；
- 發出已對應decision use的data request，而非無限清單；
- 依audience hypothesis調整workshop；
- 以synthetic-tested models快速換入client slice並交第一個MVP；
- 把unknown轉成assumption / question / research / risk；
- 在每個gate明確選approve、approve with conditions、defer with owner / date或re-scope；
- 讓analyst可依work package產first draft，Project Lead集中review judgement。

這正是v0.1的成功定義：不是把未來工作做完，而是把未來工作如何被正確做、如何被review、如何被客戶使用、如何跨階段移交，先做成一套可運行的系統。
