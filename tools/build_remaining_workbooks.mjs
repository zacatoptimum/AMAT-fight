import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const qaRoot = path.join(repoRoot, "_qa", "xlsx");
const F = "Arial", navy = "#17365D", blue = "#DDEBF7", pale = "#F3F5F7", border = "#D9D9D9", amber = "#FFF2CC", red = "#FCE4D6", green = "#E2F0D9";

function col(n) { let s=""; while(n){ const r=(n-1)%26; s=String.fromCharCode(65+r)+s; n=Math.floor((n-1)/26); } return s; }
function base(sheet,title,n=8){ sheet.showGridLines=false; sheet.getRange("A2").values=[[title]]; sheet.getRange("A2").format.font={name:F,size:14,bold:true}; sheet.getRange(`A3:${col(n)}3`).format.borders={bottom:{style:"thin",color:navy}}; }
function table(sheet,row,headers,rows,name,widths=[]){ const normalized=rows.map(r=>Array.from({length:headers.length},(_,i)=>r[i]??null)); const m=[headers,...normalized]; sheet.getRangeByIndexes(row-1,0,m.length,headers.length).values=m; sheet.getRange(`A${row}:${col(headers.length)}${row}`).format={fill:navy,font:{name:F,size:10,bold:true,color:"#FFFFFF"},wrapText:true,horizontalAlignment:"center",borders:{preset:"all",style:"thin",color:"#FFFFFF"}}; if(rows.length){ sheet.getRange(`A${row+1}:${col(headers.length)}${row+rows.length}`).format={font:{name:F,size:10},wrapText:true,verticalAlignment:"center",borders:{preset:"all",style:"thin",color:border}}; } rows.forEach((_,i)=>{if(i%2)sheet.getRange(`A${row+1+i}:${col(headers.length)}${row+1+i}`).format.fill=blue;}); widths.forEach((w,i)=>sheet.getRange(`${col(i+1)}:${col(i+1)}`).format.columnWidth=w); const t=sheet.tables.add(`A${row}:${col(headers.length)}${row+rows.length}`,true,name); t.style="TableStyleMedium2"; sheet.freezePanes.freezeRows(row); return row+rows.length; }
function finishSheets(sheets){ for(const s of Object.values(sheets)){ const u=s.getUsedRange(); if(u){u.format.font={name:F,size:10};u.format.verticalAlignment="center";u.format.autofitRows();}} }
async function save(wb,out,qa,sheetNames,inspect){ wb.recalculate(); if(inspect){const x=await wb.inspect({kind:"table",range:inspect,include:"values,formulas",tableMaxRows:40,tableMaxCols:18,maxChars:16000});console.log(x.ndjson);} const e=await wb.inspect({kind:"match",searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",options:{useRegex:true,maxResults:100},summary:"formula error scan"}); console.log(e.ndjson); const d=path.join(qaRoot,qa);await fs.mkdir(d,{recursive:true});for(const n of sheetNames){const p=await wb.render({sheetName:n,autoCrop:"all",scale:1.2,format:"png"});await fs.writeFile(path.join(d,`${n.replaceAll(" ","_")}.png`),new Uint8Array(await p.arrayBuffer()));} await (await SpreadsheetFile.exportXlsx(wb)).save(out);console.log(`BUILT ${path.relative(repoRoot,out)}`); }

async function build21(){
  const wb=Workbook.create(); const names=["Instructions","Landscape","Screening","Source Log","G5 Summary"]; const s=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
  base(s.Instructions,"Market landscape — controls and evidence rules",6);
  table(s.Instructions,4,["Control","Rule","Why","Allowed status","Owner","Decision effect"],[
    ["Truth status","Label each material field; blank is unknown, not zero","Prevents false certainty","KNOWN / HYPOTHESIS / TBD WITH CLIENT / SYNTHETIC / RESEARCH REQUIRED","Analyst + reviewer","Controls use in shortlist"],
    ["Evidence","Record source, publisher, as-of date and grade","Makes claims traceable","Official / counterparty / formal corporate / secondary / anecdote","Analyst","Determines confidence"],
    ["Hard screen","Must be explicit and evidence-backed","Score cannot waive a hard constraint","PASS / FAIL / CONDITIONAL","Project Lead","Contact / exclude / resolve"],
    ["Disclosure","No AMAT identity, site, volume or timing without authority","Protects client and market relationships","Desktop / Anonymous / Named / RFQ","Project Lead","Limits research / outreach"],
    ["Demo","Seeded rows are fictional and cannot support a client conclusion","Tests model only","SYNTHETIC / DEMO DATA","Model owner","Replace before use"],
  ],"MarketInstructions",[24,52,40,42,22,34]);

  base(s.Landscape,"Market landscape — synthetic demonstration universe",20);
  const landscape=[
    ["ENT-DEMO-01","ROUTE-DEMO-01","AST-DEMO-01","Retailer interface","Offsite bundled route","Solar","North / demo","Operating / unverified","2027 range",18000,"Shaped / TBD",5,"Fixed + index / demo","Wheeling + meter","Bundled / verify","Unverified","Demo Source 01","2026-09-27","Low","SYNTHETIC / DEMO DATA","Verify licensing, asset control and start date"],
    ["ENT-DEMO-02","ROUTE-DEMO-02","AST-DEMO-02","Developer / generator","Direct / CPPA hypothesis","Wind","Central / demo","Development / unverified","2029 range",32000,"As generated",15,"Fixed escalation / demo","COD + wheeling","Bundled / verify","Unverified","Demo Source 02","2026-09-27","Low","SYNTHETIC / DEMO DATA","Verify maturity, COD evidence, contracting route"],
    ["ENT-DEMO-03","ROUTE-DEMO-03","AST-DEMO-03","Certificate / service","Unbundled certificate demo","Mixed / demo","Taiwan / demo","Inventory / unverified","2027 range",9000,"Annual",1,"Per-certificate / demo","Registry / transfer","Certificate only","Unverified","Demo Source 03","2026-09-27","Low","SYNTHETIC / DEMO DATA","Verify eligibility, vintage and claim treatment"],
    ["ENT-DEMO-04","ROUTE-DEMO-04","AST-DEMO-04","Retailer + portfolio","Aggregated portfolio demo","Solar + wind","Multiple / demo","Mixed / unverified","2028 range",25000,"Portfolio",7,"Hybrid / demo","Multiple assets + wheeling","Bundled / verify","Unverified","Demo Source 04","2026-09-27","Low","SYNTHETIC / DEMO DATA","Decompose assets and prevent duplicate volume"],
  ];
  table(s.Landscape,4,["Entity ID","Route ID","Asset ID","Category","Route / role","Technology","Location band","Maturity","Start / COD","Annual MWh","Profile","Tenor years","Price structure","Execution dependency","Certificate treatment","Availability","Source ID","As-of","Confidence","Truth status","Next verification"],landscape,"LandscapeTable",[16,18,18,24,32,18,22,24,18,16,18,14,26,32,28,18,18,16,14,26,42]);
  s.Landscape.getRange("J5:J8").format.numberFormat="#,##0"; s.Landscape.getRange("J5:O8").format.fill=amber;

  base(s.Screening,"Screening and prioritisation — synthetic model",14);
  s.Screening.getRange("A4:I5").values=[["Criterion","Volume / timing","Maturity","Commercial fit","Execution","Certificate","Credit","Flexibility","Evidence"],["Weight",0.2,0.15,0.15,0.15,0.1,0.1,0.05,0.1]];
  s.Screening.getRange("A4:I4").format={fill:navy,font:{name:F,size:10,bold:true,color:"#FFFFFF"},wrapText:true,borders:{preset:"all",style:"thin",color:"#FFFFFF"}};s.Screening.getRange("A5:I5").format={fill:amber,borders:{preset:"all",style:"thin",color:border}};s.Screening.getRange("B5:I5").format.numberFormat="0%";
  table(s.Screening,8,["Entity ID","Route ID","Hard screen","Reason / condition","Volume / timing","Maturity","Commercial fit","Execution","Certificate","Credit","Flexibility","Evidence","Weighted score","Priority tier"],[
    ["ENT-DEMO-01","ROUTE-DEMO-01","CONDITIONAL","Verify route and evidence",4,3,3,3,3,3,4,2,null,null],
    ["ENT-DEMO-02","ROUTE-DEMO-02","CONDITIONAL","COD evidence missing",3,2,4,2,3,3,2,2,null,null],
    ["ENT-DEMO-03","ROUTE-DEMO-03","FAIL","Not a substitute for an approved bundled route",2,4,2,4,3,3,5,2,null,null],
    ["ENT-DEMO-04","ROUTE-DEMO-04","CONDITIONAL","Underlying assets not decomposed",4,3,4,3,3,3,4,1,null,null],
  ],"ScreeningTable",[18,18,18,38,18,14,18,16,18,14,16,16,18,22]);
  for(let r=9;r<=12;r++){s.Screening.getRange(`M${r}`).formulas=[[`=SUMPRODUCT(E${r}:L${r},$B$5:$I$5)`]];s.Screening.getRange(`N${r}`).formulas=[[`=IF(C${r}="FAIL","EXCLUDE / RESOLVE",IF(M${r}>=3.5,"TIER 1",IF(M${r}>=2.5,"TIER 2","RESEARCH MORE")))`]];} s.Screening.getRange("E9:L12").format.fill=amber;s.Screening.getRange("M9:M12").format.numberFormat="0.00";s.Screening.getRange("C9:C12").conditionalFormats.add("containsText",{text:"FAIL",format:{fill:red,font:{color:"#9C0006",bold:true}}});

  base(s["Source Log"],"Source log — demonstration records",10);
  table(s["Source Log"],4,["Source ID","Entity / asset ID","Publisher","Title / file","URL / location","Published / as-of","Accessed","Evidence grade","Claim supported","Truth status","Reviewer note"],[
    ["Demo Source 01","ENT-DEMO-01 / AST-DEMO-01","Fictional","Demo route note","Internal demo only","2026-09-27","2026-09-27","Demo — not evidence","Tests landscape schema","SYNTHETIC / DEMO DATA","Replace with primary source"],
    ["SRC-REQ-001","Universe","Official sources TBD","Retailer / registration evidence","RESEARCH REQUIRED","TBD",null,"Primary official","Entity qualification / current status","RESEARCH REQUIRED","Do before named outreach"],
    ["SRC-REQ-002","Assets","Counterparty documents TBD","Project maturity evidence","TBD WITH CLIENT / SUPPLIER","TBD",null,"Primary counterparty","Asset control / COD / volume","RESEARCH REQUIRED","Obtain under authorized protocol"],
  ],"SourceLogTable",[18,24,24,34,34,18,16,20,44,26,36]);

  base(s["G5 Summary"],"G5 market scan summary — demo only",8);
  table(s["G5 Summary"],4,["Category","Rows","Conditional","Fail","Decision use","Gap / next action"],[
    ["Retailer interface",null,null,null,"Select small-universe validation","Verify entity / route evidence"],
    ["Developer / generator",null,null,null,"Test long-term pipeline hypothesis","Verify asset control and COD"],
    ["Certificate / service",null,null,null,"Clarify supplemental role","Verify eligibility / treatment"],
    ["Retailer + portfolio",null,null,null,"Test diversification structure","Decompose asset-level supply"],
  ],"G5CoverageTable",[28,12,16,12,40,48]);
  for(let r=5;r<=8;r++){s["G5 Summary"].getRange(`B${r}`).formulas=[[`=COUNTIF(Landscape!$D$5:$D$8,A${r})`]];s["G5 Summary"].getRange(`C${r}`).formulas=[[`=COUNTIFS(Landscape!$D$5:$D$8,A${r},Screening!$C$9:$C$12,"CONDITIONAL")`]];s["G5 Summary"].getRange(`D${r}`).formulas=[[`=COUNTIFS(Landscape!$D$5:$D$8,A${r},Screening!$C$9:$C$12,"FAIL")`]];}
  table(s["G5 Summary"],11,["Decision","Preliminary position","Evidence boundary","Owner","Status"],[
    ["Universe coverage","Category logic works; real entity / asset coverage not established","All rows demo","Market Lead","Research required"],
    ["Priority list","Do not approve external contact from demo score","Need primary sources + client criteria","Project Lead","TBD WITH CLIENT"],
    ["Disclosure","Desktop public research only until written G5 authority","No identity / site / volume / timing","Project Lead","TBD WITH CLIENT"],
    ["2.2 MVP","After approval, contact a small diverse set with common questions","No false commitment","Procurement + Optimum","TBD WITH CLIENT"],
  ],"G5DecisionTable",[34,54,44,28,22]);
  s["G5 Summary"].getRange("A18:B21").values=[["Preliminary judgement",""],["What we know","A route depends on contracting, asset, network / meter and certificate interfaces."],["What we do not know","AMAT constraints, real availability, current counterparties, price or capacity."],["Recommendation","Approve research questions and disclosure boundary before any named outreach."]];s["G5 Summary"].getRange("A18:B18").format={fill:navy,font:{name:F,size:10,bold:true,color:"#FFFFFF"}};s["G5 Summary"].getRange("A19:B21").format={wrapText:true,borders:{preset:"all",style:"thin",color:border}};s["G5 Summary"].getRange("A:A").format.columnWidth=28;s["G5 Summary"].getRange("B:B").format.columnWidth=80;

  finishSheets(s); await save(wb,path.join(repoRoot,"workstreams","07_2.1_market-scan","Market_Landscape.xlsx"),"2.1_market_landscape",names,"G5 Summary!A1:F21");
}

async function build22(){
  const wb=Workbook.create(); const names=["Contact Plan","Interactions","Comparable Responses","Red Flags","Feedback Memo"]; const s=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
  base(s["Contact Plan"],"Authorized contact plan — synthetic demonstration",12);
  table(s["Contact Plan"],4,["Contact ID","Entity ID","Category","Why selected","Disclosure level","Identity allowed","Volume allowed","Site allowed","Contact owner","Reviewer","Status","Stop trigger"],[
    ["CT-DEMO-01","ENT-DEMO-01","Retailer interface","Test bundled route","Anonymous","No","Rounded band only","No","Market Lead","Project Lead","Planned","Request exceeds authority"],
    ["CT-DEMO-02","ENT-DEMO-02","Developer / generator","Test project maturity","Anonymous","No","Rounded band only","No","Market Lead","Project Lead","Planned","Requests commitment / exclusivity"],
    ["CT-DEMO-03","ENT-DEMO-04","Portfolio","Test aggregation","Anonymous","No","Rounded band only","No","Market Lead","Project Lead","Planned","Will not identify underlying assets"],
  ],"ContactPlanTable",[18,18,24,32,18,16,20,16,22,22,16,40]);
  base(s.Interactions,"Interaction record — do not overwrite prior statements",15);
  table(s.Interactions,4,["Interaction ID","Contact ID","Date","Channel","Participants / roles","Purpose","Questions used","Disclosure actually made","Supplier statement summary","Evidence promised","Evidence received","Confidence","Red flag IDs","Next action","Truth status"],[
    ["INT-DEMO-01","CT-DEMO-01","2026-10-15","Video / demo","Market Lead; supplier contact","Test common questionnaire","Q1–Q10","Anonymous need only","Demo: capability range claimed","Demo document list","No","Low","RF-DEMO-01","Obtain written evidence","SYNTHETIC / DEMO DATA"],
    ["INT-DEMO-02","CT-DEMO-02","2026-10-16","Email / demo","Market Lead","Confirm project evidence path","Q1–Q10","Anonymous need only","Demo: COD range claimed","Milestone schedule","No","Low","","Follow up once","SYNTHETIC / DEMO DATA"],
  ],"InteractionsTable",[20,18,16,18,30,28,20,34,54,32,18,14,18,34,26]);
  base(s["Comparable Responses"],"Comparable market-sounding responses",16);
  table(s["Comparable Responses"],4,["Contact ID","Route","Availability","Maturity","Start / COD","Volume range MWh","Profile","Tenor range","Price structure","Wheeling / meter","Certificate treatment","Credit / guarantee","Evidence status","Validity","Open question","Decision use"],[
    ["CT-DEMO-01","Bundled retailer demo","Unverified","Unverified","2027 range",18000,"Shaped / TBD","3–7","Fixed + index / demo","Required / details TBD","Bundled / verify","TBD","Promised","TBD","Underlying asset / control","2.3 / 2.5 field test"],
    ["CT-DEMO-02","Project-linked demo","Unverified","Development / unverified","2029 range",32000,"As-generated","10–20","Escalation / demo","COD + wheeling","Bundled / verify","TBD","Promised","TBD","Milestones / delay remedy","2.4 field test"],
  ],"ComparableResponseTable",[18,28,18,24,18,20,18,18,24,30,28,24,20,16,38,28]);
  base(s["Red Flags"],"Red flag and escalation log",9);
  table(s["Red Flags"],4,["Red flag ID","Interaction ID","Trigger","Evidence / exact record","Immediate action","Owner","Escalate to","Status","Resolution / decision"],[
    ["RF-DEMO-01","INT-DEMO-01","Material capability not supported in writing","Demo statement only","Do not use as verified; request evidence","Market Lead","Project Lead","Open","SYNTHETIC / DEMO DATA"],
    ["RF-CTRL-01","","Request for competitor confidential offer","If encountered","Stop discussion; record and escalate","Any participant","Project Lead / Client Procurement","Control","Never disclose"],
    ["RF-CTRL-02","","False commitment / exclusivity pressure","If encountered","Restate non-binding status; stop if repeated","Meeting lead","Project Lead / Legal","Control","Client decides continuation"],
  ],"RedFlagTable",[18,20,38,42,42,22,34,16,40]);
  base(s["Feedback Memo"],"Market feedback memo — synthetic demonstration",8);
  s["Feedback Memo"].getRange("A4:B8").values=[["Metric","Value"],["Planned contacts",null],["Interactions recorded",null],["Open red flags",null],["Evidence received",null]];s["Feedback Memo"].getRange("A4:B4").format={fill:navy,font:{name:F,size:10,bold:true,color:"#FFFFFF"}};s["Feedback Memo"].getRange("B5").formulas=[["=COUNTA('Contact Plan'!A5:A7)"]];s["Feedback Memo"].getRange("B6").formulas=[["=COUNTA(Interactions!A5:A6)"]];s["Feedback Memo"].getRange("B7").formulas=[["=COUNTIF('Red Flags'!H5:H7,\"Open\")"]];s["Feedback Memo"].getRange("B8").formulas=[["=COUNTIF(Interactions!K5:K6,\"Yes\")"]];
  table(s["Feedback Memo"],11,["Finding","Evidence status","Implication","Recommendation","Owner / next date","Truth status"],[
    ["Route / asset decomposition is required","Demo tracker structure only","RFQ must require stable IDs and control evidence","Retain as mandatory field","Procurement — TBD","HYPOTHESIS"],
    ["Availability cannot be inferred from company capability","No real market evidence yet","Do not build volume plan from public claims","Require written evidence","Market Lead — TBD","RESEARCH REQUIRED"],
    ["2.2 expansion","G5 authorization not confirmed","Named outreach not yet authorized","Approve / condition / defer","Client decision body — TBD","TBD WITH CLIENT"],
  ],"FeedbackFindingTable",[44,30,46,42,32,26]);
  finishSheets(s); await save(wb,path.join(repoRoot,"workstreams","08_2.2_market-engagement","Interaction_Tracker.xlsx"),"2.2_interaction_tracker",names,"Feedback Memo!A1:F14");
}

async function build23(){
  const wb=Workbook.create(); const names=["Instructions","Options","Scenario","Criteria Scores","Decision Brief"]; const s=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
  base(s.Instructions,"Short-term option model — controls",6);table(s.Instructions,4,["Rule","Practice","Why","Status","Owner","Decision"],[
    ["Eligibility first","Failing claim / certificate route cannot be offset by score","Protects RE100 / policy intent","TBD WITH CLIENT","Sustainability / Legal","Proceed / reject"],
    ["Bridge only","Link volume and expiry to residual gap and long-term transition","Avoids permanent dependency","HYPOTHESIS","Project Lead","Volume / tenor"],
    ["Price range","Separate components; blank is unknown","Avoids false precision","SYNTHETIC / DEMO DATA","Analyst","Budget range"],
  ],"ShortInstructionTable",[28,58,44,28,28,28]);
  base(s.Options,"Short-term option inputs — synthetic",15);table(s.Options,4,["Option ID","Archetype","Eligibility","Availability","Start year","End year","Max MWh / yr","Unit cost NTD/MWh","One-off NTD","Technology","Certificate","Flex %","Delivery risk 1–5","Evidence 1–5","Truth status"],[
    ["OPT-DEMO-A","Short bundled supply","TBD","Unverified",2027,2028,12000,3250,500000,"Solar demo","Bundled / verify",0.15,3,2,"SYNTHETIC / DEMO DATA"],
    ["OPT-DEMO-B","Unbundled certificate","TBD","Unverified",2027,2027,8000,520,100000,"Mixed demo","Certificate only",0.30,3,2,"SYNTHETIC / DEMO DATA"],
    ["OPT-DEMO-C","Short portfolio product","TBD","Unverified",2027,2029,15000,3500,800000,"Portfolio demo","Bundled / verify",0.20,4,1,"SYNTHETIC / DEMO DATA"],
  ],"ShortOptionsTable",[18,30,16,18,16,16,20,22,18,20,26,16,22,18,26]);s.Options.getRange("E5:N7").format.fill=amber;s.Options.getRange("G5:I7").format.numberFormat="#,##0";s.Options.getRange("L5:L7").format.numberFormat="0%";
  base(s.Scenario,"Bridge scenario — synthetic 2027 illustration",12);table(s.Scenario,4,["Year","Residual gap MWh","Option A MWh","Option B MWh","Option C MWh","Total procured","Coverage","Uncovered gap","Total cost NTD","Weighted NTD/MWh","Max concentration","Status"],[
    [2027,25000,10000,5000,8000,null,null,null,null,null,null,null],
    [2028,18000,9000,0,7000,null,null,null,null,null,null,null,null],
    [2029,12000,0,0,10000,null,null,null,null,null,null,null],
  ],"ShortScenarioTable",[14,22,20,20,20,20,16,22,24,24,22,16]);for(let r=5;r<=7;r++){s.Scenario.getRange(`F${r}`).formulas=[[`=SUM(C${r}:E${r})`]];s.Scenario.getRange(`G${r}`).formulas=[[`=IF(B${r}=0,0,F${r}/B${r})`]];s.Scenario.getRange(`H${r}`).formulas=[[`=MAX(0,B${r}-F${r})`]];s.Scenario.getRange(`I${r}`).formulas=[[`=C${r}*Options!$H$5+D${r}*Options!$H$6+E${r}*Options!$H$7+IF(C${r}>0,Options!$I$5,0)+IF(D${r}>0,Options!$I$6,0)+IF(E${r}>0,Options!$I$7,0)`]];s.Scenario.getRange(`J${r}`).formulas=[[`=IF(F${r}=0,0,I${r}/F${r})`]];s.Scenario.getRange(`K${r}`).formulas=[[`=IF(F${r}=0,0,MAX(C${r}:E${r})/F${r})`]];s.Scenario.getRange(`L${r}`).formulas=[[`=IF(G${r}>=1,"COVERED","GAP")`]];}s.Scenario.getRange("B5:E7").format.fill=amber;s.Scenario.getRange("B5:F7").format.numberFormat="#,##0";s.Scenario.getRange("G5:G7").format.numberFormat="0%";s.Scenario.getRange("I5:J7").format.numberFormat="#,##0";s.Scenario.getRange("K5:K7").format.numberFormat="0%";
  base(s["Criteria Scores"],"Short-term criteria — synthetic",10);s["Criteria Scores"].getRange("A4:H5").values=[["Criterion","Timing / volume","Cost","Flexibility","Certificate","Delivery","Evidence","Transition fit"],["Weight",0.2,0.15,0.15,0.15,0.15,0.1,0.1]];s["Criteria Scores"].getRange("A4:H4").format={fill:navy,font:{name:F,size:10,bold:true,color:"#FFFFFF"}};s["Criteria Scores"].getRange("A5:H5").format.fill=amber;s["Criteria Scores"].getRange("B5:H5").format.numberFormat="0%";table(s["Criteria Scores"],8,["Option ID","Timing / volume","Cost","Flexibility","Certificate","Delivery","Evidence","Transition fit","Weighted score","Hard-screen","Recommendation"],[
    ["OPT-DEMO-A",4,3,3,3,3,2,4,null,"CONDITIONAL",null],["OPT-DEMO-B",3,5,5,2,3,2,3,null,"CONDITIONAL",null],["OPT-DEMO-C",4,2,4,3,2,1,4,null,"CONDITIONAL",null]
  ],"ShortScoreTable",[20,20,14,16,18,16,16,20,18,20,24]);for(let r=9;r<=11;r++){s["Criteria Scores"].getRange(`I${r}`).formulas=[[`=SUMPRODUCT(B${r}:H${r},$B$5:$H$5)`]];s["Criteria Scores"].getRange(`K${r}`).formulas=[[`=IF(J${r}="FAIL","REJECT",IF(I${r}>=3.5,"TEST / RESERVE","RESEARCH MORE"))`]];}s["Criteria Scores"].getRange("B9:H11").format.fill=amber;s["Criteria Scores"].getRange("I9:I11").format.numberFormat="0.00";
  base(s["Decision Brief"],"Short-term decision brief — demo",7);table(s["Decision Brief"],4,["Question","Demo output","Evidence boundary","Decision required","Owner","Due","Downstream"],[
    ["2027 bridge need","23,000 demo MWh selected vs 25,000 gap","Synthetic only","Approve need / range","Decision body — TBD","TBD","2.5 / 3.1"],
    ["Eligibility","All archetypes still TBD","Client policy not provided","Approve / exclude instruments","Sustainability / Legal — TBD","TBD","Hard screen"],
    ["Preliminary judgement","Keep a flexible bridge option in reserve","No market quote / availability","Pilot / reserve / reject","Project Lead + client","TBD","Portfolio transition"],
  ],"ShortDecisionTable",[34,48,44,36,34,16,24]);
  finishSheets(s);await save(wb,path.join(repoRoot,"workstreams","09_2.3_short-term-procurement","Short_Term_Option_Comparison.xlsx"),"2.3_short_term",names,"Scenario!A1:L7");
}

async function build24(){
  const wb=Workbook.create();const names=["Instructions","Project Inputs","Commercial Cases","Risk Matrix","Decision Brief"];const s=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
  base(s.Instructions,"Long-term commercial model — controls",6);table(s.Instructions,4,["Control","Rule","Boundary","Owner","Review","Decision effect"],[
    ["No headline-only price","Compare all-in components with volume/profile/COD/tenor","Commercial analysis","Commercial Lead","Project Lead","Risk-adjusted value"],
    ["Project evidence","Company capability is not asset delivery","Technical / legal evidence may be required","DD Lead","Specialist","Conditional / fail"],
    ["Demo data","All seeded projects and prices are fictional","Not an AMAT recommendation","Model owner","Project Lead","Replace before use"],
  ],"LongInstructionTable",[30,52,42,26,24,32]);
  base(s["Project Inputs"],"Long-term project / route inputs — synthetic",17);table(s["Project Inputs"],4,["Option ID","Structure","Project ID","Technology","Maturity","COD year","Annual MWh","Profile","Tenor","Base NTD/MWh","Escalation %","Wheeling + fees","Expected delivery %","Delay years downside","Credit support","Certificate","Truth status"],[
    ["LT-DEMO-A","Retailer bundled","AST-DEMO-A","Solar demo","Unverified",2028,30000,"Shaped",10,3100,0.015,350,0.90,1,"Parent support / TBD","Bundled / verify","SYNTHETIC / DEMO DATA"],
    ["LT-DEMO-B","Project-linked CPPA hypothesis","AST-DEMO-B","Wind demo","Development / unverified",2029,45000,"As-generated",15,2850,0.02,420,0.80,2,"Project company + guarantee TBD","Bundled / verify","SYNTHETIC / DEMO DATA"],
    ["LT-DEMO-C","Portfolio / layered","AST-DEMO-C","Mixed demo","Mixed / unverified",2028,38000,"Portfolio",12,3250,0.01,300,0.95,1,"Retailer credit / TBD","Bundled / verify","SYNTHETIC / DEMO DATA"],
  ],"LongProjectTable",[18,30,18,20,26,16,18,18,14,20,18,22,22,22,34,26,26]);s["Project Inputs"].getRange("F5:P7").format.fill=amber;s["Project Inputs"].getRange("G5:G7").format.numberFormat="#,##0";s["Project Inputs"].getRange("J5:L7").format.numberFormat="#,##0";s["Project Inputs"].getRange("K5:K7").format.numberFormat="0.0%";s["Project Inputs"].getRange("M5:M7").format.numberFormat="0%";
  base(s["Commercial Cases"],"Commercial case normalization — synthetic",13);table(s["Commercial Cases"],4,["Option ID","Annual MWh","Expected delivered MWh","Base cost NTD","Fees NTD","Expected total NTD","Expected all-in NTD/MWh","Downside COD","Downside delivered MWh","Delay gap MWh","Concentration","Evidence confidence","Status"],[
    ["LT-DEMO-A",null,null,null,null,null,null,null,null,null,0.50,2,null],["LT-DEMO-B",null,null,null,null,null,null,null,null,null,0.65,2,null],["LT-DEMO-C",null,null,null,null,null,null,null,null,null,0.40,1,null]
  ],"LongCaseTable",[18,20,24,22,20,24,28,18,26,22,20,24,18]);for(let r=5;r<=7;r++){const src=r; s["Commercial Cases"].getRange(`B${r}`).formulas=[[`='Project Inputs'!G${src}`]];s["Commercial Cases"].getRange(`C${r}`).formulas=[[`=B${r}*'Project Inputs'!M${src}`]];s["Commercial Cases"].getRange(`D${r}`).formulas=[[`=C${r}*'Project Inputs'!J${src}`]];s["Commercial Cases"].getRange(`E${r}`).formulas=[[`=C${r}*'Project Inputs'!L${src}`]];s["Commercial Cases"].getRange(`F${r}`).formulas=[[`=D${r}+E${r}`]];s["Commercial Cases"].getRange(`G${r}`).formulas=[[`=IF(C${r}=0,0,F${r}/C${r})`]];s["Commercial Cases"].getRange(`H${r}`).formulas=[[`='Project Inputs'!F${src}+'Project Inputs'!N${src}`]];s["Commercial Cases"].getRange(`I${r}`).formulas=[[`=IF('Project Inputs'!N${src}>0,0,C${r})`]];s["Commercial Cases"].getRange(`J${r}`).formulas=[[`=MAX(0,C${r}-I${r})`]];s["Commercial Cases"].getRange(`M${r}`).formulas=[[`=IF(L${r}<3,"CONDITIONAL","TEST")`]];}s["Commercial Cases"].getRange("B5:J7").format.numberFormat="#,##0";s["Commercial Cases"].getRange("K5:K7").format.numberFormat="0%";s["Commercial Cases"].getRange("K5:L7").format.fill=amber;
  base(s["Risk Matrix"],"Long-term risk allocation questions",10);table(s["Risk Matrix"],4,["Risk ID","Risk event","Current allocation hypothesis","Evidence required","Preferred principle","Fallback","Severity","Owner","Status","3.2 clause topic"],[
    ["LR-01","COD / start delay","Supplier / project — TBD","Milestone and remedy proposal","Supplier bears controllable delay","Layered volume / bridge",5,"Commercial Lead","Open","COD; delay LD; termination"],
    ["LR-02","Generation shortfall","TBD","Profile / P50 / replacement proposal","Defined delivery and remedy","Portfolio / replacement",5,"Commercial Lead","Open","Shortfall; replacement"],
    ["LR-03","Wheeling / meter delay","Shared / TBD","Responsibilities and timeline","Allocate to controlling party","Site / route fallback",4,"Facilities + supplier","Open","CP; cooperation"],
    ["LR-04","T-REC late / invalid","Supplier / TBD","Issuance / transfer / replacement","Valid certificates + replacement","Holdback / alternative",5,"Sustainability + Legal","Open","Certificate warranty"],
    ["LR-05","Credit deterioration","TBD","Financials / guarantee","Proportionate security","Parent support / step-up",4,"Finance","Open","Credit support"],
  ],"LongRiskTable",[16,34,38,40,38,32,14,28,16,34]);
  base(s["Decision Brief"],"Long-term decision brief — synthetic",7);table(s["Decision Brief"],4,["Decision","Preliminary view","Evidence / sensitivity","Condition","Owner","Status","Handoff"],[
    ["Structure range","Retain bundled, project-linked and layered routes for testing","All options demo","No route approval without G6","Decision body — TBD","Open","2.5 scope"],
    ["Value metric","Use expected all-in + delay / underdelivery sensitivity","Demo formulas only","Finance validates metric","Finance — TBD","Open","Scorecard"],
    ["Risk boundary","COD, shortfall, certificate and credit require explicit allocation","Risk matrix","Legal / specialist review","Client approvers — TBD","Open","3.1 / 3.2"],
  ],"LongDecisionTable",[32,54,48,42,32,16,26]);
  finishSheets(s);await save(wb,path.join(repoRoot,"workstreams","10_2.4_long-term-procurement","Long_Term_Commercial_Comparison.xlsx"),"2.4_long_term",names,"Commercial Cases!A1:M7");
}

async function build25(){
  const wb=Workbook.create();const names=["Instructions","Bidder Profile","Supply Offer","Pricing","Risk & Terms","Evidence Index","Compliance Summary"];const s=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
  base(s.Instructions,"Supplier response template — issue controls",7);table(s.Instructions,4,["Rule","Bidder instruction","Required format","Blank treatment","Confidentiality","Buyer use","Status"],[
    ["Stable IDs","Do not change bidder / offer / asset IDs","One row per defined unit","Blank = NOT PROVIDED","Mark restricted fields","Normalization and DD","DRAFT"],
    ["Assumptions","State all deviations and dependencies","Reference assumption ID","Never silently assume zero","Do not include third-party secrets","Comparability","DRAFT"],
    ["Evidence","Link each material claim to evidence ID","One evidence item per row","Unavailable / later / N/A","State permitted recipients","Verification","DRAFT"],
  ],"RFQInstructionTable",[26,58,36,32,42,34,16]);
  base(s["Bidder Profile"],"Bidder profile — synthetic response row",12);table(s["Bidder Profile"],4,["Bidder ID","Legal entity","Role","Registration / qualification","Parent / owner","Guarantor","Authorized contact","Email","Conflict declaration","Confidentiality marking","Response validity","Truth status"],[
    ["BID-DEMO-01","Fictional Energy Co.","Retailer demo","Not verified","Demo Parent","TBD","Demo Contact","demo@example.invalid","No known / demo","Internal demo",30,"SYNTHETIC / DEMO DATA"]
  ],"BidderProfileTable",[18,32,22,32,26,22,26,34,30,28,18,26]);
  base(s["Supply Offer"],"Supply offer blocks — synthetic",18);table(s["Supply Offer"],4,["Offer ID","Bidder ID","Route ID","Asset ID","Structure","Technology","Location band","Maturity","Start / COD","Annual MWh","Profile","Firmness / allocation","Tenor","Flex / ramp","Wheeling / meter","T-REC treatment","Dependencies","Exceptions"],[
    ["OFF-DEMO-01","BID-DEMO-01","R-DEMO-01","A-DEMO-01","Bundled demo","Solar demo","North / demo","Unverified","2028 range",30000,"Shaped / TBD","TBD",10,"+/-10% demo","Required / TBD","Bundled / verify","Evidence pending","All terms demo"]
  ],"SupplyOfferTable",[18,18,18,18,26,20,22,22,18,18,20,28,14,22,28,26,38,38]);s["Supply Offer"].getRange("I5:Q5").format.fill=amber;
  base(s.Pricing,"Pricing components — synthetic",12);table(s.Pricing,4,["Offer ID","Price component ID","Component","Unit","Currency","Base amount","Base date","Index / escalation","Cap / floor","Pass-through","Tax included","Sensitivity requested"],[
    ["OFF-DEMO-01","P-DEMO-01","Energy / premium demo","NTD/MWh","NTD",3000,"2026-09-27","1.5% p.a. demo","None / demo","No / demo","TBD","+/- volume; COD delay"],
    ["OFF-DEMO-01","P-DEMO-02","Wheeling / service demo","NTD/MWh","NTD",350,"2026-09-27","Pass-through / demo","TBD","Yes / demo","TBD","Tariff change"],
  ],"PricingTable",[18,22,30,18,16,18,18,28,22,22,18,34]);s.Pricing.getRange("F5:K6").format.fill=amber;
  base(s["Risk & Terms"],"Commercial and risk term positions — synthetic",10);table(s["Risk & Terms"],4,["Offer ID","Term ID","Topic","Bidder position","Buyer requirement / question","Deviation","Evidence / clause","Priority","Open","Comment"],[
    ["OFF-DEMO-01","T-DEMO-01","COD delay","TBD","State longstop and remedy","Not provided","","High","Yes","Demo"],
    ["OFF-DEMO-01","T-DEMO-02","Certificate replacement","TBD","Valid T-REC + replacement","Not provided","","High","Yes","Demo"],
    ["OFF-DEMO-01","T-DEMO-03","Credit support","TBD","State security / guarantor","Not provided","","High","Yes","Demo"],
  ],"RiskTermTable",[18,18,28,42,48,26,30,16,14,30]);
  base(s["Evidence Index"],"Evidence index — synthetic",10);table(s["Evidence Index"],4,["Evidence ID","Offer / asset ID","Claim","Document","Version / date","Provided","Confidentiality","Permitted reviewers","Verification status","Reviewer note"],[
    ["E-DEMO-01","OFF-DEMO-01 / A-DEMO-01","Project maturity","Demo document list","2026-09-27","No","Internal demo","Demo reviewers","Not verified","Replace with bidder evidence"]
  ],"EvidenceIndexTable",[18,24,38,38,20,14,24,30,22,36]);
  base(s["Compliance Summary"],"Submission compliance summary — demo",8);table(s["Compliance Summary"],4,["Check","Required","Demo result","Status","Clarification owner","Due","Evaluation effect","Truth status"],[
    ["Legal / entity profile","Yes","One demo row","PASS — DEMO","Bidder","TBD","Proceed to real completeness check","SYNTHETIC / DEMO DATA"],
    ["Supply offer","Yes","One incomplete demo block","CLARIFY","Bidder","TBD","Do not score blanks as zero","SYNTHETIC / DEMO DATA"],
    ["Pricing reconciliation","Yes","Two demo components; taxes TBD","CLARIFY","Bidder","TBD","Commercial normalization conditional","SYNTHETIC / DEMO DATA"],
    ["Risk / terms","Yes","Three high-priority topics open","CLARIFY","Bidder","TBD","Feeds 2.6 / 3.2","SYNTHETIC / DEMO DATA"],
    ["Evidence","Yes","No verified document","FAIL — DEMO","Bidder / DD lead","TBD","Cannot verify claims","SYNTHETIC / DEMO DATA"],
  ],"ComplianceTable",[36,16,48,20,30,16,46,26]);s["Compliance Summary"].getRange("A12:B15").values=[["Metric","Value"],["Offer blocks",null],["Open term rows",null],["Evidence provided",null]];s["Compliance Summary"].getRange("B13").formulas=[["=COUNTA('Supply Offer'!A5:A5)"]];s["Compliance Summary"].getRange("B14").formulas=[["=COUNTIF('Risk & Terms'!I5:I7,\"Yes\")"]];s["Compliance Summary"].getRange("B15").formulas=[["=COUNTIF('Evidence Index'!F5:F5,\"Yes\")"]];
  finishSheets(s);await save(wb,path.join(repoRoot,"workstreams","11_2.5_targeted-rfq","Supplier_Response_Template.xlsx"),"2.5_supplier_response",names,"Compliance Summary!A1:H15");
}

async function build26(){
  const wb=Workbook.create();const names=["Instructions","Offer Intake","Criteria","Evaluator Scores","DD Checklist","Risk Assessment","Shortlist Summary"];const s=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
  base(s.Instructions,"Evaluation scorecard — governance",7);table(s.Instructions,4,["Control","Rule","Evidence","Owner","Conflict / dissent","Status","Decision effect"],[
    ["Hard screen","Fail cannot be offset by score","Response + approved requirement","Evaluation Lead","Record exception only if authority permits","DRAFT","Exclude / condition"],
    ["Independent score","Score before calibration and cite evidence","Offer / DD evidence ID","Evaluator","Record dissent; do not erase","DRAFT","Comparable judgement"],
    ["Decision authority","Model recommends; authorized body decides","Decision record","Client decision body","Conflicts disclosed","TBD WITH CLIENT","Shortlist"],
  ],"EvalInstructionTable",[28,54,42,28,48,22,30]);
  base(s["Offer Intake"],"Offer intake and normalization — synthetic",12);table(s["Offer Intake"],4,["Offer ID","Bidder","Structure","Hard screen","Completeness","Annual MWh","Start","Tenor","Normalized NTD/MWh","Validity","Key exception","Truth status"],[
    ["OFF-DEMO-A","Bidder A demo","Bundled","PASS","Conditional",30000,"2028 range",10,3450,"30 days demo","COD evidence open","SYNTHETIC / DEMO DATA"],
    ["OFF-DEMO-B","Bidder B demo","Project-linked","CONDITIONAL","Conditional",42000,"2029 range",15,3200,"45 days demo","Credit / guarantee open","SYNTHETIC / DEMO DATA"],
    ["OFF-DEMO-C","Bidder C demo","Portfolio","PASS","Conditional",35000,"2028 range",12,3600,"30 days demo","Asset allocation open","SYNTHETIC / DEMO DATA"],
  ],"OfferIntakeTable",[18,24,24,18,20,18,18,14,24,20,42,26]);
  base(s.Criteria,"Approved criteria / rubric — draft demo",8);table(s.Criteria,4,["Criterion","Weight","1 anchor","3 anchor","5 anchor","Evidence required","Hard constraint?","Approval status"],[
    ["Volume / timing",0.15,"Material miss","Feasible with condition","Strong fit","Offer + profile / COD evidence","Yes","TBD WITH CLIENT"],
    ["Commercial value",0.15,"High / opaque","Comparable / conditional","Strong risk-adjusted value","Pricing normalization","No","TBD WITH CLIENT"],
    ["Flexibility",0.10,"Rigid","Some options","Strong ramp / change","Terms","No","TBD WITH CLIENT"],
    ["Project maturity",0.15,"Low evidence","Milestones / gaps","Advanced verified","DD documents","Yes","TBD WITH CLIENT"],
    ["Execution / wheeling",0.10,"Unclear","Plan with conditions","Clear owners / readiness","Execution plan","Yes","TBD WITH CLIENT"],
    ["Certificate / claim",0.10,"Not eligible / unclear","Conditional","Verified treatment","T-REC evidence","Yes","TBD WITH CLIENT"],
    ["Credit / counterparty",0.10,"Weak / unknown","Mitigable","Strong verified support","Financial / guarantee","No","TBD WITH CLIENT"],
    ["Risk allocation",0.10,"Buyer-heavy","Mixed","Balanced / clear","Term response","No","TBD WITH CLIENT"],
    ["Evidence confidence",0.05,"Claims only","Partial","Verified / current","Evidence index","No","TBD WITH CLIENT"],
  ],"CriteriaTable",[28,14,34,38,34,38,20,24]);s.Criteria.getRange("B5:B13").format.numberFormat="0%";s.Criteria.getRange("B5:B13").format.fill=amber;
  base(s["Evaluator Scores"],"Independent evaluator scores — synthetic",14);table(s["Evaluator Scores"],4,["Evaluator","Offer ID","Volume / timing","Commercial value","Flexibility","Project maturity","Execution","Certificate","Credit","Risk allocation","Evidence confidence","Weighted score","Evidence comment","Conflict / dissent"],[
    ["Evaluator 1 demo","OFF-DEMO-A",4,3,4,3,3,3,3,3,2,null,"Demo evidence only","None / demo"],
    ["Evaluator 1 demo","OFF-DEMO-B",3,4,2,2,2,3,2,3,2,null,"Demo evidence only","None / demo"],
    ["Evaluator 1 demo","OFF-DEMO-C",4,3,4,3,3,3,3,3,1,null,"Demo evidence only","None / demo"],
  ],"EvaluatorScoreTable",[22,18,20,20,16,20,16,18,14,20,22,18,42,34]);for(let r=5;r<=7;r++)s["Evaluator Scores"].getRange(`L${r}`).formulas=[[`=C${r}*Criteria!$B$5+D${r}*Criteria!$B$6+E${r}*Criteria!$B$7+F${r}*Criteria!$B$8+G${r}*Criteria!$B$9+H${r}*Criteria!$B$10+I${r}*Criteria!$B$11+J${r}*Criteria!$B$12+K${r}*Criteria!$B$13`]];s["Evaluator Scores"].getRange("C5:K7").format.fill=amber;s["Evaluator Scores"].getRange("L5:L7").format.numberFormat="0.00";
  base(s["DD Checklist"],"Due diligence checklist and evidence status",10);table(s["DD Checklist"],4,["DD ID","Offer ID","Area","Question / evidence","Materiality","Source / evidence ID","Owner","Status","Condition / impact","Specialist boundary"],[
    ["DD-DEMO-01","OFF-DEMO-A","Project maturity","Verify control, milestones and COD basis","High","Not provided","DD Lead","Open","Condition shortlist","Technical / legal review as needed"],
    ["DD-DEMO-02","OFF-DEMO-B","Credit","Verify guarantor and security proposal","High","Not provided","Finance","Open","Condition negotiation","Finance / legal advice"],
    ["DD-DEMO-03","OFF-DEMO-C","Allocation","Verify underlying assets and no double allocation","High","Not provided","DD Lead","Open","Condition shortlist","Commercial + technical"],
    ["DD-CTRL-01","ALL","Certificate","Verify issuance, transfer, ownership and replacement","High","Not provided","Sustainability / Legal","Open","Hard screen / condition","Legal / policy confirmation"],
  ],"DDChecklistTable",[18,18,24,54,18,28,26,18,40,38]);
  base(s["Risk Assessment"],"Supplier / project risk assessment — synthetic",10);table(s["Risk Assessment"],4,["Risk ID","Offer ID","Event","Likelihood 1–5","Impact 1–5","Risk score","Evidence","Mitigation / condition","Risk acceptor","Status"],[
    ["ER-DEMO-01","OFF-DEMO-A","COD evidence insufficient",3,5,null,"Demo only","Obtain milestones + longstop / remedy","Client approver — TBD","Open"],
    ["ER-DEMO-02","OFF-DEMO-B","Credit support unresolved",3,4,null,"Demo only","Guarantee / security condition","Finance approver — TBD","Open"],
    ["ER-DEMO-03","OFF-DEMO-C","Asset allocation opaque",4,4,null,"Demo only","Asset schedule + no double allocation warranty","Client approver — TBD","Open"],
  ],"RiskAssessmentTable",[18,18,40,20,18,18,28,48,34,18]);for(let r=5;r<=7;r++)s["Risk Assessment"].getRange(`F${r}`).formulas=[[`=D${r}*E${r}`]];s["Risk Assessment"].getRange("D5:E7").format.fill=amber;
  base(s["Shortlist Summary"],"G7 shortlist summary — synthetic",12);table(s["Shortlist Summary"],4,["Offer ID","Hard screen","Weighted score","Open DD","High risk count","Top strength","Top risk","Condition","Model signal","Authorized decision","Decision owner","Truth status"],[
    ["OFF-DEMO-A",null,null,null,null,"Timing / flexibility demo","COD evidence","Verify milestones / remedy",null,"TBD WITH CLIENT","Decision body — TBD","SYNTHETIC / DEMO DATA"],
    ["OFF-DEMO-B",null,null,null,null,"Nominal cost / volume demo","Credit + maturity","Guarantee + COD DD",null,"TBD WITH CLIENT","Decision body — TBD","SYNTHETIC / DEMO DATA"],
    ["OFF-DEMO-C",null,null,null,null,"Portfolio flexibility demo","Asset allocation","Verified asset schedule",null,"TBD WITH CLIENT","Decision body — TBD","SYNTHETIC / DEMO DATA"],
  ],"ShortlistSummaryTable",[18,18,18,16,20,36,36,44,24,26,30,26]);for(let r=5;r<=7;r++){s["Shortlist Summary"].getRange(`B${r}`).formulas=[[`='Offer Intake'!D${r}`]];s["Shortlist Summary"].getRange(`C${r}`).formulas=[[`='Evaluator Scores'!L${r}`]];s["Shortlist Summary"].getRange(`D${r}`).formulas=[[`=COUNTIF('DD Checklist'!B$5:B$8,A${r})`]];s["Shortlist Summary"].getRange(`E${r}`).formulas=[[`=COUNTIFS('Risk Assessment'!B$5:B$7,A${r},'Risk Assessment'!F$5:F$7,\">=15\")`]];s["Shortlist Summary"].getRange(`I${r}`).formulas=[[`=IF(B${r}="FAIL","DO NOT PROCEED",IF(C${r}>=3.5,"SHORTLIST WITH CONDITIONS","RESERVE / CLARIFY"))`]];}s["Shortlist Summary"].getRange("C5:C7").format.numberFormat="0.00";
  finishSheets(s);await save(wb,path.join(repoRoot,"workstreams","12_2.6_evaluation-due-diligence","Scorecard.xlsx"),"2.6_scorecard",names,"Shortlist Summary!A1:L7");
}

async function build31(){
  const wb=Workbook.create();const names=["Assumptions","Term Positions","Authority Matrix","Issue List","Alignment Summary"];const s=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
  base(s.Assumptions,"Final commercial alignment — controlled assumptions",10);table(s.Assumptions,4,["Assumption ID","Topic","Baseline","Unit / period","Source / evidence","Truth status","Owner","Confirm by","If wrong","Status"],[
    ["A31-01","Annual volume",30000,"MWh / year","2.6 shortlisted demo offer","SYNTHETIC / DEMO DATA","Sustainability — TBD","TBD","Reprice / resize","Open"],
    ["A31-02","Target start","2028 range","Calendar","2.6 offer intake","HYPOTHESIS","Facilities + Procurement — TBD","TBD","Bridge volume needed","Open"],
    ["A31-03","Tenor",10,"Years","2.6 demo term","SYNTHETIC / DEMO DATA","Decision body — TBD","TBD","Portfolio / price changes","Open"],
    ["A31-04","Certificate treatment","Bundled; eligibility to confirm","Requirement","1.4 boundary + 2.6 DD","TBD WITH CLIENT","Sustainability + Legal — TBD","TBD","Claim may be invalid","Open"],
    ["A31-05","Budget / authority","Not provided","NTD / approval tier","Client process not known","TBD WITH CLIENT","Finance / Sponsor — TBD","TBD","Cannot mandate negotiation","Open"],
  ],"A31Assumptions",[18,28,36,20,38,26,30,18,38,16]);s.Assumptions.getRange("C5:H9").format.fill=amber;
  base(s["Term Positions"],"Negotiation term hierarchy — draft and demo",12);table(s["Term Positions"],4,["Term ID","Topic","Source offer","Must have","Target","Tradeable","Unacceptable","Rationale / evidence","Counterparty latest","Gap","Owner","Status"],[
    ["T31-01","Volume / profile","OFF-DEMO-A","Traceable committed supply","30,000 MWh shaped demo","Ramp / tolerance range","Undefined allocation","Gap / portfolio requirement","Demo: 30,000; evidence open","Evidence gap","Commercial Lead","Open"],
    ["T31-02","COD / start","OFF-DEMO-A","Longstop + remedy","2028 range demo","Phased start","No remedy for controllable delay","Continuity requirement","TBD","Open","Commercial + Facilities","Open"],
    ["T31-03","Certificates","OFF-DEMO-A","Valid transfer + replacement","Bundled and reconciled","Timing mechanics","Double claim / no replacement","RE100 boundary pending","TBD","Open","Sustainability + Legal","Open"],
    ["T31-04","Price / index","OFF-DEMO-A","Reconciled components","Risk-adjusted value","Cap / floor design","Opaque pass-through","2.6 normalization","Demo price only","Open","Finance + Procurement","Open"],
    ["T31-05","Credit support","OFF-DEMO-A","Proportionate security","Parent support if needed","Threshold / cure","Unbounded buyer exposure","2.6 DD risk","TBD","Open","Finance + Legal","Open"],
  ],"A31TermPositions",[18,24,18,38,36,34,38,44,40,24,28,16]);s["Term Positions"].getRange("D5:G9").format.fill=amber;
  base(s["Authority Matrix"],"Negotiation and approval authority — TBD WITH CLIENT",9);table(s["Authority Matrix"],4,["Decision / term","Prepare","Recommend","Approve","Consult","Inform","Evidence needed","Escalation trigger","Status"],[
    ["Negotiation mandate","Optimum / Procurement","Project Lead","Client decision body — TBD","Finance / Legal / Sustainability","Relevant sites","Approved term hierarchy","Any must-have change","TBD WITH CLIENT"],
    ["Price movement","Commercial Lead","Finance + Procurement","Budget authority — TBD","Sponsor","Project team","Scenario impact","Outside approved band","TBD WITH CLIENT"],
    ["Risk acceptance","Issue owner","Project Lead","Named risk acceptor — TBD","Legal / specialist","Decision log owner","Residual risk + mitigation","High / irreversible risk","TBD WITH CLIENT"],
    ["Preferred counterparty","Evaluation Lead","Steering group — TBD","Authorized body — TBD","Procurement / Finance / Legal","Bidders per protocol","2.6 + 3.4 pack","Conflict / criteria change","TBD WITH CLIENT"],
  ],"A31Authority",[32,26,30,34,34,26,42,40,22]);
  base(s["Issue List"],"Commercial alignment issue list",10);table(s["Issue List"],4,["Issue ID","Linked term","Issue / question","Priority","Commercial impact","Legal / specialist need","Proposed position","Owner","Due / gate","Status"],[
    ["I31-01","T31-01","Can offered volume be evidenced and allocated?","High","Coverage and concentration","Project / supplier DD","Require asset / allocation evidence","DD Lead","Before mandate","Open"],
    ["I31-02","T31-02","What happens if start / COD slips?","High","Gap volume and bridge cost","Contract counsel","Longstop + remedy + fallback","Commercial Lead","Before 3.2","Open"],
    ["I31-03","T31-03","Who owns invalid / late certificate risk?","High","Claim validity","Policy + contract counsel","Replacement / indemnity concept","Sustainability","Before 3.2","Open"],
    ["I31-04","T31-04","Which price components may change?","High","Budget uncertainty","Finance / tariff research","Define index, cap / floor, pass-through","Finance","Before negotiation","Open"],
    ["I31-05","T31-05","What security is proportionate?","Medium","Liquidity / credit exposure","Finance + counsel","Set threshold and cure logic","Finance","Before 3.3","Open"],
  ],"A31Issues",[18,18,48,16,36,36,46,26,22,16]);
  base(s["Alignment Summary"],"G8 commercial alignment summary — demo",8);table(s["Alignment Summary"],4,["Metric","Value","Interpretation","Decision / action","Owner","Due","Status","Truth status"],[
    ["Open assumptions",null,"Replace client-specific unknowns","Confirm owners and evidence","Project Lead","TBD","Open","Formula"],
    ["Open issues",null,"No negotiation mandate until high issues owned","Resolve / condition / escalate","Commercial Lead","TBD","Open","Formula"],
    ["Authority rows TBD",null,"Decision rights not yet validated","Approve authority matrix","Sponsor","TBD","Open","Formula"],
    ["Recommended gate","CONDITIONAL","Proceed to 3.2 only with controlled assumptions","Approve / condition / defer","Decision body — TBD","TBD","TBD WITH CLIENT","HYPOTHESIS"],
  ],"A31Summary",[28,20,52,48,28,18,20,26]);s["Alignment Summary"].getRange("B5").formulas=[["=COUNTIF(Assumptions!J5:J9,\"Open\")"]];s["Alignment Summary"].getRange("B6").formulas=[["=COUNTIF('Issue List'!J5:J9,\"Open\")"]];s["Alignment Summary"].getRange("B7").formulas=[["=COUNTIF('Authority Matrix'!I5:I8,\"TBD WITH CLIENT\")"]];
  finishSheets(s);await save(wb,path.join(repoRoot,"workstreams","13_3.1_commercial-alignment","Commercial_Term_Tracker.xlsx"),"3.1_commercial_terms",names,"Alignment Summary!A1:H8");
}

async function build32(){
  const wb=Workbook.create();const names=["Document Index","Clause Checklist","Issue Tracker","Counsel Questions","Negotiation Agenda"];const s=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
  base(s["Document Index"],"Contract document control — no legal conclusion",9);table(s["Document Index"],4,["Document ID","Title / description","Counterparty","Version","Received","Reviewer","Status","Supersedes","Truth status"],[
    ["DOC-DEMO-01","Draft energy procurement agreement — fictional","Demo supplier","v0 demo","2026-09-27","Commercial Lead","Review pending","None","SYNTHETIC / DEMO DATA"],
    ["DOC-REQ-01","Actual principal agreement","TBD WITH CLIENT","TBD","TBD","Legal + Commercial","Not received","TBD","TBD WITH CLIENT"],
    ["DOC-REQ-02","Schedules / asset / price exhibits","TBD WITH CLIENT","TBD","TBD","Commercial + DD","Not received","TBD","TBD WITH CLIENT"],
  ],"A32Documents",[20,48,28,18,18,28,22,20,26]);
  base(s["Clause Checklist"],"Commercial clause checklist and specialist boundary",11);table(s["Clause Checklist"],4,["Clause ID","Topic","Commercial question","Preferred outcome","Evidence / source","Commercial owner","Legal advice required?","Priority","Issue ID","Status","Handoff"],[
    ["C32-01","Scope / volume","Is the committed quantity and profile measurable?","Clear schedule and adjustment logic","3.1 T31-01","Commercial Lead","Yes — drafting / enforceability","High","I32-01","Open","3.3 agenda"],
    ["C32-02","Price / settlement","Can all components reconcile and be audited?","Formula, invoice and dispute mechanics","3.1 T31-04","Finance","Yes","High","I32-02","Open","3.3 agenda"],
    ["C32-03","Wheeling / delivery","Who controls approvals, meter and losses?","Responsibility + condition + remedy","1.2 / 2.4 evidence","Facilities","Yes","High","I32-03","Open","3.3 agenda"],
    ["C32-04","Certificates","Who warrants title, validity and replacement?","Traceable transfer + replacement","1.4 boundary / 3.1","Sustainability","Yes","High","I32-04","Open","3.3 agenda"],
    ["C32-05","Default / termination","What events, cure, damages and exit apply?","Proportionate mutual allocation","Risk assessment","Commercial Lead","Yes — legal advice","High","I32-05","Open","3.3 agenda"],
    ["C32-06","Force majeure / change","Which risks excuse performance or reprice?","Defined boundary and mitigation","Scenario impact","Commercial Lead","Yes","Medium","I32-06","Open","3.3 agenda"],
    ["C32-07","Credit / guarantee","What security and triggers apply?","Proportionate and executable","3.1 T31-05","Finance","Yes","High","I32-07","Open","3.3 agenda"],
    ["C32-08","Conditions precedent","What must occur before effectiveness / delivery?","Owners, dates, evidence, longstop","3.5 readiness","Project Lead","Yes","High","I32-08","Open","3.5 tracker"],
  ],"A32Clauses",[18,28,48,42,34,26,28,16,18,16,24]);
  base(s["Issue Tracker"],"Commercial / legal issue tracker — demo",13);table(s["Issue Tracker"],4,["Issue ID","Document / clause","Commercial concern","Counterparty text / position","Buyer proposed outcome","Business impact","Legal question","Priority","Owner","Counterparty status","Internal status","Due / gate","Decision / rationale"],[
    ["I32-01","DOC-DEMO-01 / volume","Allocation evidence missing","Demo clause silent","Asset schedule + traceability","Coverage / claim risk","What warranty / remedy is enforceable?","High","Commercial + Legal","Open","Open","Before 3.3","TBD"],
    ["I32-02","DOC-DEMO-01 / price","Pass-through undefined","Demo: costs may change","Enumerated pass-through + notice / audit","Budget exposure","Drafting and audit rights?","High","Finance + Legal","Open","Open","Before 3.3","TBD"],
    ["I32-03","DOC-DEMO-01 / delivery","Wheeling dependency unallocated","Demo: cooperation only","Owner, CP, milestone and remedy","Start-date risk","Allocation / regulatory advice?","High","Facilities + Legal","Open","Open","Before 3.3","TBD"],
    ["I32-04","DOC-DEMO-01 / T-REC","Replacement not specified","Demo: transfer when available","Valid certificate by date or replace","RE100 claim risk","Title / remedy drafting?","High","Sustainability + Legal","Open","Open","Before 3.3","TBD"],
  ],"A32Issues",[18,30,42,42,46,32,38,16,30,20,18,20,40]);
  base(s["Counsel Questions"],"Questions requiring qualified legal advice",8);table(s["Counsel Questions"],4,["Question ID","Linked issue","Question for counsel","Business context","Desired decision date","Counsel response","Owner","Status"],[
    ["LQ-01","I32-01","How should supply allocation / no-double-claim obligations be documented and remedied?","RE100 claim and volume integrity","TBD","","Legal owner — TBD","Open"],
    ["LQ-02","I32-02","What audit, dispute and change language is needed for pass-through components?","Budget predictability","TBD","","Legal + Finance — TBD","Open"],
    ["LQ-03","I32-03","How should wheeling prerequisites, cooperation and delay risk be allocated?","Delivery start critical path","TBD","","Legal + Facilities — TBD","Open"],
    ["LQ-04","I32-04","What title, validity, timing and replacement protections are appropriate for certificates?","Claim defensibility","TBD","","Legal + Sustainability — TBD","Open"],
  ],"A32Counsel",[20,18,62,42,24,48,30,16]);
  base(s["Negotiation Agenda"],"3.3 negotiation agenda feed",9);table(s["Negotiation Agenda"],4,["Order","Issue ID","Topic","Objective","Opening position","Fallback / authority","Evidence","Lead","Status"],[
    [1,"I32-01","Volume / allocation","Obtain traceable commitment","Require asset schedule and warranty","Conditional shortlist only","2.6 DD + 3.1","Commercial Lead","Open"],
    [2,"I32-03","Delivery / wheeling","Allocate controllable delay","Milestones, owner, longstop, remedy","Phased / bridge within authority","1.2 + 2.4","Facilities + Commercial","Open"],
    [3,"I32-04","Certificates","Protect eligibility and timing","Warranty + replacement","Holdback / alternate within authority","1.4 boundary","Sustainability + Legal","Open"],
    [4,"I32-02","Price / settlement","Close open components","Enumerated formula + audit","Cap / floor within authority","3.1 scenario","Finance","Open"],
  ],"A32Agenda",[12,18,28,40,44,40,30,28,16]);
  finishSheets(s);await save(wb,path.join(repoRoot,"workstreams","14_3.2_contract-review","Commercial_Legal_Issue_Tracker.xlsx"),"3.2_contract_issues",names,"Negotiation Agenda!A1:I8");
}

async function build33(){
  const wb=Workbook.create();const names=["Meeting Brief","Issue Positions","Give Get Log","Meeting Record","Post-Meeting Summary"];const s=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
  base(s["Meeting Brief"],"Negotiation meeting brief — round 1 demo",9);table(s["Meeting Brief"],4,["Field","Draft content","Source","Owner","Confirm by","Status","Disclosure / authority","Risk if missing","Truth status"],[
    ["Meeting objective","Test and narrow priority commercial issues","3.2 agenda","Negotiation Lead","TBD","Draft","Approved mandate required","Discussion drifts","HYPOTHESIS"],
    ["Participants","Client Procurement / Legal / Finance / Sustainability roles","Stakeholder hypothesis","Project Lead","TBD","TBD","Names TBD WITH CLIENT","No authority in room","TBD WITH CLIENT"],
    ["Non-commitment","No binding agreement in meeting; subject to approvals","Market conduct control","Meeting Lead","Before meeting","Required","State opening and close","False commitment","KNOWN control"],
    ["Priority order","Allocation → delivery → certificate → price","3.2 tracker","Commercial Lead","Before meeting","Draft","Client approval required","Trade without context","HYPOTHESIS"],
  ],"A33Brief",[24,56,34,28,18,18,38,34,26]);
  base(s["Issue Positions"],"Negotiation issue positions and authority",13);table(s["Issue Positions"],4,["Issue ID","Topic","Current supplier position","Buyer opening","Target","Fallback","Unacceptable","Give only if","Get required","Authority owner","Evidence","Status","Next wording / action"],[
    ["I32-01","Volume / allocation","Silent / demo","Asset schedule + warranty","Verified committed block","Conditional schedule update","Undefined allocation","Supplier evidence is dated","Warranty + replacement","Decision body — TBD","2.6 DD","Open","Request marked draft"],
    ["I32-03","Delivery / wheeling","Cooperation only / demo","Milestones + longstop + remedy","Supplier bears controllable delay","Phased start / bridge","No remedy / no owner","Client accepts limited schedule flexibility","Owner + remedy","Decision body — TBD","2.4 risk matrix","Open","Counsel wording"],
    ["I32-04","Certificates","When available / demo","Validity + dated transfer + replacement","Full replacement protection","Holdback / alternate","Double claim / no remedy","Timing flexibility approved","Title + replacement","Decision body — TBD","1.4 boundary","Open","Policy confirmation"],
    ["I32-02","Price / settlement","Open pass-through / demo","Enumerated formula + audit","Cap / floor","Limited defined pass-through","Unbounded change","Value / risk concession received","Transparency + notice","Budget authority — TBD","3.1 scenario","Open","Finance model impact"],
  ],"A33Positions",[18,26,42,42,38,38,38,38,38,30,30,16,42]);s["Issue Positions"].getRange("D5:I8").format.fill=amber;
  base(s["Give Get Log"],"Concession control — never give without linked value",11);table(s["Give Get Log"],4,["Entry ID","Date","Issue ID","Proposed give","Required get","Value / risk effect","Within authority?","Approved by","Offered?","Accepted?","Record / next action"],[
    ["GG-DEMO-01","TBD","I32-02","Limited defined pass-through","Cap + audit + notice","Budget sensitivity TBD","No — demo","TBD","No","No","Do not use before authority"],
    ["GG-DEMO-02","TBD","I32-03","Phased start tolerance","Longstop + remedy + evidence","Reduces timing certainty","No — demo","TBD","No","No","Model bridge impact first"],
  ],"A33GiveGet",[20,16,18,42,42,38,22,26,16,16,44]);
  base(s["Meeting Record"],"Contemporaneous meeting record — preserve exact status",11);table(s["Meeting Record"],4,["Record ID","Time / sequence","Speaker / role","Issue ID","Statement / proposal","Status","Commitment?","Evidence referenced","Owner","Due","Follow-up"],[
    ["MR-DEMO-01",1,"Supplier role — demo","I32-01","Will consider providing allocation schedule","For discussion only","No","None","Supplier — demo","TBD","Request written response"],
    ["MR-DEMO-02",2,"Buyer lead — demo","I32-03","Longstop and remedy are required","Opening position","No","3.2 agenda","Commercial Lead","TBD","Draft clause / proposal"],
  ],"A33Record",[20,18,28,18,58,24,18,32,28,18,40]);
  base(s["Post-Meeting Summary"],"Post-meeting summary and escalation",9);table(s["Post-Meeting Summary"],4,["Metric / item","Value","Meaning","Action","Owner","Due","Escalation","Status","Truth status"],[
    ["Open positions",null,"Issues not closed","Issue-by-issue written follow-up","Negotiation Lead","TBD","If authority / risk needed","Open","Formula"],
    ["Potential concessions",null,"No concession valid without authority","Validate give / get","Project Lead","TBD","Decision body","Open","Formula"],
    ["Recorded commitments",null,"Verify exact wording and approval","Confirm in writing","Meeting Lead","48h","Legal / authority","Open","Formula"],
    ["Round outcome","No real negotiation performed","Workbook is control demo","Replace with actual record","Project Lead","TBD","Client review","Demo","SYNTHETIC / DEMO DATA"],
  ],"A33Summary",[28,22,44,44,28,18,32,16,26]);s["Post-Meeting Summary"].getRange("B5").formulas=[["=COUNTIF('Issue Positions'!L5:L8,\"Open\")"]];s["Post-Meeting Summary"].getRange("B6").formulas=[["=COUNTA('Give Get Log'!A5:A6)"]];s["Post-Meeting Summary"].getRange("B7").formulas=[["=COUNTIF('Meeting Record'!G5:G6,\"Yes\")"]];
  finishSheets(s);await save(wb,path.join(repoRoot,"workstreams","15_3.3_negotiation-round-1","Negotiation_Tracker.xlsx"),"3.3_negotiation",names,"Post-Meeting Summary!A1:I8");
}

async function build34(){
  const wb=Workbook.create();const names=["Baseline & Latest","Open Issues","Scenario Impact","Risk Acceptance","Decision Summary"];const s=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
  base(s["Baseline & Latest"],"Negotiation baseline versus latest — synthetic",12);table(s["Baseline & Latest"],4,["Term ID","Topic","Approved baseline","Latest supplier position","Delta","Commercial effect","Risk effect","Evidence","Owner","Authority needed","Recommendation","Truth status"],[
    ["T31-01","Volume / allocation","Traceable committed supply","Demo: schedule promised, not provided","Evidence remains open","No reliable coverage conclusion","Claim / concentration risk","Demo meeting record","DD Lead","Risk condition","Continue only with condition","SYNTHETIC / DEMO DATA"],
    ["T31-02","Delivery / COD","Longstop + remedy","Demo: longstop accepted in principle; remedy open","Partial movement","Bridge exposure unresolved","Timing risk","Demo position","Commercial Lead","Risk / cost authority","Counter with quantified remedy","SYNTHETIC / DEMO DATA"],
    ["T31-03","Certificates","Validity + transfer + replacement","Demo: transfer accepted; replacement open","Partial movement","Potential replacement cost","RE100 claim risk","Demo position","Sustainability","Policy + risk authority","Counter / counsel review","SYNTHETIC / DEMO DATA"],
    ["T31-04","Price / index","Defined formula + audit","Demo: defined index; cap open","Improved transparency","Sensitivity required","Budget volatility","Demo position","Finance","Budget authority","Model cap scenarios","SYNTHETIC / DEMO DATA"],
  ],"A34Baseline",[18,26,42,44,34,36,34,28,26,30,38,26]);
  base(s["Open Issues"],"Remaining issues and decision path",10);table(s["Open Issues"],4,["Issue ID","Linked term","Latest gap","Priority","Can negotiate?","Needs internal decision?","Next move","Owner","Due / gate","Status"],[
    ["I34-01","T31-01","Allocation schedule absent","High","Yes","Yes — condition / exclusion","Require dated evidence","DD Lead","Before preferred bidder","Open"],
    ["I34-02","T31-02","Delay remedy unresolved","High","Yes","Yes — acceptable exposure","Counter with remedy ladder","Commercial Lead","G9","Open"],
    ["I34-03","T31-03","Replacement protection unresolved","High","Yes","Yes — claim risk","Counsel wording + policy check","Sustainability + Legal","G9","Open"],
    ["I34-04","T31-04","Price cap unresolved","Medium","Yes","Yes — budget range","Model scenarios then mandate","Finance","G9","Open"],
  ],"A34OpenIssues",[18,18,42,16,20,30,42,28,20,16]);
  base(s["Scenario Impact"],"Final commercial scenarios — synthetic demonstration",13);table(s["Scenario Impact"],4,["Scenario","Annual MWh","Base NTD/MWh","Pass-through NTD/MWh","Cap effect NTD/MWh","Bridge MWh","Bridge NTD/MWh","Annual supply NTD","Bridge NTD","Total NTD","Effective NTD/MWh","Decision signal","Truth status"],[
    ["S34-A — target",30000,3450,0,0,0,4200,null,null,null,null,null,"SYNTHETIC / DEMO DATA"],
    ["S34-B — accept limited pass-through",30000,3450,180,0,0,4200,null,null,null,null,null,"SYNTHETIC / DEMO DATA"],
    ["S34-C — one-year delay + bridge",30000,3450,180,0,30000,4200,null,null,null,null,null,"SYNTHETIC / DEMO DATA"],
    ["S34-D — capped pass-through",30000,3450,180,-80,0,4200,null,null,null,null,null,"SYNTHETIC / DEMO DATA"],
  ],"A34Scenarios",[34,18,22,26,24,18,22,24,22,24,26,28,26]);for(let r=5;r<=8;r++){s["Scenario Impact"].getRange(`H${r}`).formulas=[[`=B${r}*(C${r}+D${r}+E${r})`]];s["Scenario Impact"].getRange(`I${r}`).formulas=[[`=F${r}*G${r}`]];s["Scenario Impact"].getRange(`J${r}`).formulas=[[`=H${r}+I${r}`]];s["Scenario Impact"].getRange(`K${r}`).formulas=[[`=IF(B${r}+F${r}=0,0,J${r}/(B${r}+F${r}))`]];s["Scenario Impact"].getRange(`L${r}`).formulas=[[`=IF(K${r}<=3700,"WITHIN DEMO RANGE",IF(K${r}<=4000,"AUTHORITY NEEDED","ESCALATE"))`]];}s["Scenario Impact"].getRange("B5:G8").format.fill=amber;s["Scenario Impact"].getRange("B5:K8").format.numberFormat="#,#0";
  base(s["Risk Acceptance"],"Residual risk acceptance record",11);table(s["Risk Acceptance"],4,["Risk ID","Issue ID","Residual risk","Likelihood 1–5","Impact 1–5","Score","Mitigation / condition","Risk acceptor","Authority evidence","Decision","Status"],[
    ["RA34-01","I34-01","Offered supply allocation may remain unverified",3,5,null,"Condition selection on evidence","Client risk owner — TBD","TBD","Do not accept yet","Open"],
    ["RA34-02","I34-02","Delay could require higher-cost bridge",3,4,null,"Longstop, remedy, fallback","Client risk owner — TBD","TBD","Quantify then decide","Open"],
    ["RA34-03","I34-03","Invalid / late certificate could impair claim",2,5,null,"Warranty + replacement + reconciliation","Client risk owner — TBD","TBD","Counsel / policy review","Open"],
    ["RA34-04","I34-04","Index may exceed budget tolerance",3,3,null,"Cap / floor + scenario monitoring","Budget owner — TBD","TBD","Set mandate","Open"],
  ],"A34Risk",[18,18,44,20,18,14,48,32,30,34,16]);for(let r=5;r<=8;r++)s["Risk Acceptance"].getRange(`F${r}`).formulas=[[`=D${r}*E${r}`]];s["Risk Acceptance"].getRange("D5:E8").format.fill=amber;
  base(s["Decision Summary"],"G9 internal decision summary — demo",9);table(s["Decision Summary"],4,["Decision question","Model signal / status","Evidence","Recommended action","Conditions","Owner","Decision","Date","Truth status"],[
    ["Accept current offer?","Do not accept","Material issues remain open","Continue / counter","Close allocation, delay and certificate protections","Decision body — TBD","TBD","TBD","HYPOTHESIS"],
    ["Authorize next counter?","Authority not documented","3.1 authority matrix TBD","Approve bounded counter","Cap concessions and record give / get","Budget / risk authority — TBD","TBD","TBD","TBD WITH CLIENT"],
    ["Retain fallback?","Yes","Negotiation not closed","Keep alternate / bridge live","Define trigger and validity","Project Lead","TBD","TBD","HYPOTHESIS"],
    ["Advance to signing readiness?","Conditional","G10 evidence incomplete","Do not sign; prepare readiness tracker","All high issues + authority + documents","Project Lead / Legal","TBD","TBD","HYPOTHESIS"],
  ],"A34Decision",[38,30,38,38,48,34,20,18,26]);
  finishSheets(s);await save(wb,path.join(repoRoot,"workstreams","16_3.4_negotiation-decision","Position_Tracker.xlsx"),"3.4_position_tracker",names,"Decision Summary!A1:I8");
}

async function build35(){
  const wb=Workbook.create();const names=["Readiness Summary","Document Set","Conditions & Obligations","Responsibility Matrix","System Data Readiness","Transition Plan"];const s=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
  base(s["Readiness Summary"],"G10 signing readiness — no signature without evidence",9);table(s["Readiness Summary"],4,["Dimension","Required exit evidence","Ready?","Open items","Owner","Due","Blocker?","Decision / exception","Truth status"],[
    ["Final documents","Approved final agreement and schedules","No","Actual documents not received","Legal + Procurement","TBD","Yes","Do not sign","TBD WITH CLIENT"],
    ["Authority","Authorized signer and approval evidence","No","Decision rights unknown","Sponsor / Corporate authority","TBD","Yes","Confirm governance","TBD WITH CLIENT"],
    ["Commercial closure","All must-haves closed or accepted","No","Demo high issues remain","Commercial Lead","TBD","Yes","G9 decision","SYNTHETIC / DEMO DATA"],
    ["Conditions / implementation","Owners, dates and evidence assigned","Conditional","Structure exists; real inputs missing","Implementation Lead","TBD","Yes","Complete trackers","HYPOTHESIS"],
    ["BAU handoff","Reporting and escalation owners named","No","BAU owner unknown","Client PM / Ops — TBD","TBD","No","Name before start","TBD WITH CLIENT"],
  ],"A35Summary",[30,52,16,44,34,18,16,36,26]);
  base(s["Document Set"],"Controlled final document set",10);table(s["Document Set"],4,["Document ID","Document / schedule","Version","Checksum / location","Commercial approved","Legal approved","Signer copy?","Owner","Status","Notes"],[
    ["DOC35-01","Principal agreement","TBD","TBD","No","No","No","Legal — TBD","Not received","Actual file required"],
    ["DOC35-02","Price / settlement schedule","TBD","TBD","No","No","No","Finance + Legal — TBD","Not received","Must reconcile to decision"],
    ["DOC35-03","Volume / asset / delivery schedule","TBD","TBD","No","No","No","Commercial + Facilities","Not received","Traceability required"],
    ["DOC35-04","Certificate schedule","TBD","TBD","No","No","No","Sustainability + Legal","Not received","Eligibility / replacement"],
    ["DOC35-05","Guarantee / security","TBD","TBD","No","No","No","Finance + Legal","Not received","If required"],
  ],"A35Documents",[18,42,18,32,24,20,18,30,20,38]);
  base(s["Conditions & Obligations"],"Conditions precedent and pre-start obligations",12);table(s["Conditions & Obligations"],4,["Item ID","Type","Requirement","Responsible party","Client owner","Counterparty owner","Evidence","Due","Dependency","Consequence if late","Status","Escalation"],[
    ["CP35-01","Condition precedent","Wheeling / required approvals completed","Supplier / client — TBD","Facilities — TBD","Supplier — TBD","Approval / confirmation","TBD","Network / meter","Start delay / longstop","Open","G10 blocker"],
    ["CP35-02","Condition precedent","Credit support effective","Party per final contract","Finance — TBD","Supplier — TBD","Guarantee / security","TBD","Final documents","Effectiveness risk","Open","Finance / Legal"],
    ["OB35-01","Pre-start obligation","Meter / data interfaces tested","Shared — TBD","Facilities / IT — TBD","Supplier — TBD","Test record","TBD","System design","Reconciliation failure","Open","Implementation Lead"],
    ["OB35-02","Pre-start obligation","Certificate account / transfer path ready","Shared — TBD","Sustainability — TBD","Supplier — TBD","Registry / process proof","TBD","Policy / account","Claim delay","Open","Sustainability / Legal"],
  ],"A35CP",[18,24,48,30,30,30,36,18,32,40,16,30]);
  base(s["Responsibility Matrix"],"Signing-to-execution responsibility matrix",9);table(s["Responsibility Matrix"],4,["Activity","Responsible","Accountable","Consulted","Informed","Input","Output / evidence","Escalation","Status"],[
    ["Final document control","Legal — TBD","Authorized signer — TBD","Commercial / Procurement","Project team","Approved drafts","Signer set + approval record","Version conflict","TBD WITH CLIENT"],
    ["Wheeling / meter readiness","Facilities — TBD","Site owner — TBD","Supplier / utility / IT","PM","Technical prerequisites","Approval + test record","Critical path delay","TBD WITH CLIENT"],
    ["Certificate setup","Sustainability — TBD","RE100 owner — TBD","Legal / supplier","Finance / PM","Eligibility / account data","Transfer / reconciliation process","Claim risk","TBD WITH CLIENT"],
    ["Invoice / settlement setup","Finance / AP — TBD","Finance owner — TBD","Procurement / supplier","PM","Price and tax schedule","PO / vendor / invoice control","Payment risk","TBD WITH CLIENT"],
    ["BAU transition","Implementation Lead — TBD","Business owner — TBD","All workstream owners","Steering","Open items / SOP","Accepted handoff","No owner","TBD WITH CLIENT"],
  ],"A35RACI",[38,30,30,34,28,36,42,34,22]);
  base(s["System Data Readiness"],"Data, system, wheeling and certificate readiness",10);table(s["System Data Readiness"],4,["Readiness ID","Interface","Requirement","Source system / party","Frequency","Control / reconciliation","Test evidence","Owner","Status","Go-live impact"],[
    ["RD35-01","Load / meter data","Agreed identifier, granularity and cut-off","Client / utility — TBD","Monthly / TBD","Completeness + revision control","Not available","Facilities / IT — TBD","Open","Cannot reconcile"],
    ["RD35-02","Supplier delivery","Expected and actual delivery feed","Supplier — TBD","Monthly / TBD","Volume and period match","Not available","Supplier + PM — TBD","Open","Cannot assess performance"],
    ["RD35-03","Certificate","Serial / vintage / transfer / retirement data","Registry / supplier — TBD","Monthly / annual","No duplicate + eligibility check","Not available","Sustainability — TBD","Open","Claim not defensible"],
    ["RD35-04","Invoice","Component-level price and volume","Supplier / AP — TBD","Billing cycle","Contract formula match","Not available","Finance — TBD","Open","Payment dispute"],
  ],"A35Systems",[20,28,48,36,20,42,28,30,16,32]);
  base(s["Transition Plan"],"Transition to 3.6 execution governance",9);table(s["Transition Plan"],4,["Milestone","Entry evidence","Owner","Target","3.6 artifact / process","Acceptance test","Open issue handoff","Status","Truth status"],[
    ["Signed / effective","Final executed set + authority","Legal / Procurement — TBD","TBD","Document baseline","Version match","All surviving obligations","Open","TBD WITH CLIENT"],
    ["Implementation launch","Owners + plan + cadence","Implementation Lead — TBD","TBD","Implementation Tracker","Kickoff record","CP / system / data items","Open","TBD WITH CLIENT"],
    ["First delivery","Meter + supplier data available","Facilities / Supplier — TBD","TBD","Delivery + reconciliation sheets","Expected vs actual test","Variances / remedies","Open","TBD WITH CLIENT"],
    ["First certificate cycle","Valid transfer / retirement evidence","Sustainability — TBD","TBD","Certificate register","Eligibility + no duplicate check","Exceptions / replacement","Open","TBD WITH CLIENT"],
    ["BAU acceptance","Stable cycles + SOP + owners","Business owner — TBD","TBD","BAU Transition","Acceptance record","Residual risks","Open","TBD WITH CLIENT"],
  ],"A35Transition",[30,44,34,18,38,34,40,16,26]);
  finishSheets(s);await save(wb,path.join(repoRoot,"workstreams","17_3.5_signing-readiness","Conditions_Precedent_Tracker.xlsx"),"3.5_signing",names,"Readiness Summary!A1:I9");
}

async function build36(){
  const wb=Workbook.create();const names=["Governance Summary","Milestones","Delivery","Certificates","Reconciliation","Commercial Issues","Periodic Report","BAU Transition"];const s=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
  base(s["Governance Summary"],"Execution governance and lineage controls",10);table(s["Governance Summary"],4,["Control","Rule","Cadence","Responsible","Accountable","Evidence","Trigger","Escalation","Status","Truth status"],[
    ["Source of truth","Use signed contract + controlled schedules only","Continuous","Contract owner — TBD","Business owner — TBD","Document version ID","Mismatch","Legal / Procurement","Open","TBD WITH CLIENT"],
    ["Delivery review","Compare expected vs actual by site / offer / period","Monthly / TBD","Analyst — TBD","Implementation Lead — TBD","Meter + supplier data","Tolerance breach","Supplier / Facilities","Draft","HYPOTHESIS"],
    ["Certificate review","Trace issuance, transfer, retirement and replacement","Monthly / annual TBD","Sustainability — TBD","RE100 owner — TBD","Registry evidence","Late / invalid / duplicate","Legal / supplier","Draft","HYPOTHESIS"],
    ["Commercial review","Reconcile invoice to contract components","Billing cycle","Finance — TBD","Finance owner — TBD","Invoice + formula","Variance / dispute","Commercial Lead","Draft","HYPOTHESIS"],
    ["BAU handoff","Exit only after stable cycles and accepted SOP","Gate G11","Implementation Lead","Business owner — TBD","Acceptance record","Owner / control missing","Sponsor","Open","TBD WITH CLIENT"],
  ],"A36Governance",[28,56,24,30,30,36,30,30,16,26]);
  base(s.Milestones,"Implementation milestones",11);table(s.Milestones,4,["Milestone ID","Milestone","Planned date","Forecast date","Actual date","Owner","Dependency","Evidence","RAG","Issue ID","Truth status"],[
    ["M36-01","Implementation kickoff","TBD","TBD","","Implementation Lead — TBD","Signed / effective","Kickoff minutes","Gray","","TBD WITH CLIENT"],
    ["M36-02","Wheeling / meter ready","TBD","TBD","","Facilities — TBD","CP35-01 / RD35-01","Approval + test","Gray","","TBD WITH CLIENT"],
    ["M36-03","First delivery","TBD","TBD","","Supplier + Facilities — TBD","M36-02","Meter + delivery record","Gray","","TBD WITH CLIENT"],
    ["M36-04","First certificate transfer","TBD","TBD","","Sustainability — TBD","M36-03 / RD35-03","Registry evidence","Gray","","TBD WITH CLIENT"],
    ["M36-05","BAU acceptance","TBD","TBD","","Business owner — TBD","Stable review cycles","Acceptance record","Gray","","TBD WITH CLIENT"],
  ],"A36Milestones",[20,38,20,20,20,34,34,34,14,18,26]);
  base(s.Delivery,"Expected versus actual delivery — synthetic",12);table(s.Delivery,4,["Period","Site / meter ID","Offer / route ID","Expected MWh","Actual MWh","Variance MWh","Variance %","Tolerance %","Status","Cause","Action","Truth status"],[
    ["2028-01 demo","SITE-DEMO-01","OFF-DEMO-A",2500,2350,null,null,0.05,null,"Demo shortfall","Request evidence / remedy","SYNTHETIC / DEMO DATA"],
    ["2028-02 demo","SITE-DEMO-01","OFF-DEMO-A",2500,2520,null,null,0.05,null,"Demo within tolerance","Monitor","SYNTHETIC / DEMO DATA"],
  ],"A36Delivery",[20,22,20,20,18,20,18,18,18,34,38,26]);for(let r=5;r<=6;r++){s.Delivery.getRange(`F${r}`).formulas=[[`=E${r}-D${r}`]];s.Delivery.getRange(`G${r}`).formulas=[[`=IF(D${r}=0,0,F${r}/D${r})`]];s.Delivery.getRange(`I${r}`).formulas=[[`=IF(ABS(G${r})<=H${r},"WITHIN TOLERANCE","ESCALATE")`]];}s.Delivery.getRange("D5:E6").format.fill=amber;s.Delivery.getRange("G5:H6").format.numberFormat="0.0%";
  base(s.Certificates,"Certificate issuance, transfer and retirement — synthetic",12);table(s.Certificates,4,["Certificate record ID","Period","Offer / asset ID","Technology","MWh represented","Vintage","Serial / batch","Issued","Transferred","Retired / claimed","Eligibility check","Status"],[
    ["CERT-DEMO-01","2028-01 demo","OFF-DEMO-A / A-DEMO-01","Solar demo",2350,"2028 demo","SERIAL-DEMO-DO-NOT-USE","Demo date","Not transferred","No","Not performed","SYNTHETIC / DEMO DATA"],
  ],"A36Certificates",[24,18,28,20,20,18,34,18,20,22,28,26]);
  base(s.Reconciliation,"Monthly volume, certificate and commercial reconciliation — synthetic",12);table(s.Reconciliation,4,["Period","Actual delivered MWh","Certificate MWh","Unmatched MWh","Energy rate NTD/MWh","Invoice energy NTD","Expected energy NTD","Variance NTD","Delivery status","Certificate status","Invoice status","Truth status"],[
    ["2028-01 demo",null,0,null,3450,8107500,null,null,null,null,null,"SYNTHETIC / DEMO DATA"],
    ["2028-02 demo",null,0,null,3450,8694000,null,null,null,null,null,"SYNTHETIC / DEMO DATA"],
  ],"A36Reconciliation",[20,24,22,20,24,24,24,20,22,24,20,26]);for(let r=5;r<=6;r++){const d=r;s.Reconciliation.getRange(`B${r}`).formulas=[[`=Delivery!E${d}`]];s.Reconciliation.getRange(`D${r}`).formulas=[[`=B${r}-C${r}`]];s.Reconciliation.getRange(`G${r}`).formulas=[[`=B${r}*E${r}`]];s.Reconciliation.getRange(`H${r}`).formulas=[[`=F${r}-G${r}`]];s.Reconciliation.getRange(`I${r}`).formulas=[[`=Delivery!I${d}`]];s.Reconciliation.getRange(`J${r}`).formulas=[[`=IF(D${r}=0,"MATCHED","OPEN")`]];s.Reconciliation.getRange(`K${r}`).formulas=[[`=IF(ABS(H${r})<1,"MATCHED","REVIEW")`]];}s.Reconciliation.getRange("C5:F6").format.fill=amber;
  base(s["Commercial Issues"],"Commercial issue and remedy log",11);table(s["Commercial Issues"],4,["Issue ID","Period","Category","Description","Contract reference","Evidence","Commercial impact","Owner","Due","Status","Remedy / decision"],[
    ["CI-DEMO-01","2028-01 demo","Delivery shortfall","Demo actual below tolerance","Final clause TBD","Demo delivery row","Replacement / credit TBD","Commercial Lead","TBD","Open","Apply approved remedy only"],
    ["CI-DEMO-02","2028-01 demo","Certificate timing","No certificate matched in demo","Final schedule TBD","Demo certificate row","Claim timing risk","Sustainability","TBD","Open","Investigate / replace"],
  ],"A36Issues",[18,18,22,44,32,32,38,28,18,16,42]);
  base(s["Periodic Report"],"Periodic client report — decision-oriented demo",10);table(s["Periodic Report"],4,["Section","Metric / message","Current","Prior","Trend / RAG","Evidence","Decision / action","Owner","Due","Truth status"],[
    ["Delivery","Latest period status",null,"N/A","Formula","Delivery sheet","Resolve variance if outside tolerance","Implementation Lead","TBD","Formula"],
    ["Certificates","Open unmatched MWh",null,"N/A","Formula","Reconciliation sheet","Confirm transfer / replacement","Sustainability","TBD","Formula"],
    ["Commercial","Invoice items requiring review",null,"N/A","Formula","Reconciliation sheet","Validate / dispute per contract","Finance","TBD","Formula"],
    ["Issues","Open commercial issues",null,"N/A","Formula","Commercial Issues","Escalate overdue high items","Project Lead","TBD","Formula"],
  ],"A36Report",[22,38,22,18,20,30,48,30,18,26]);s["Periodic Report"].getRange("C5").formulas=[["=Delivery!I6"]];s["Periodic Report"].getRange("C6").formulas=[["=SUM(Reconciliation!D5:D6)"]];s["Periodic Report"].getRange("C7").formulas=[["=COUNTIF(Reconciliation!K5:K6,\"REVIEW\")"]];s["Periodic Report"].getRange("C8").formulas=[["=COUNTIF('Commercial Issues'!J5:J6,\"Open\")"]];
  base(s["BAU Transition"],"G11 BAU acceptance criteria",10);table(s["BAU Transition"],4,["Criterion","Required evidence","Minimum stable cycles","Current evidence","Owner","Accepting authority","Ready?","Residual issue","Next action","Truth status"],[
    ["Delivery reconciliation","Complete expected / actual process",3,"Synthetic demo only","Operations — TBD","Business owner — TBD","No","Real data and tolerance needed","Run controlled cycles","TBD WITH CLIENT"],
    ["Certificate control","Traceable issuance to claim / retirement",1,"Synthetic demo only","Sustainability — TBD","RE100 owner — TBD","No","Policy / registry inputs needed","Validate procedure","TBD WITH CLIENT"],
    ["Invoice control","Contract-formula reconciliation",3,"Synthetic demo only","Finance — TBD","Finance owner — TBD","No","Actual invoice design needed","Dry run","TBD WITH CLIENT"],
    ["Issue escalation","Owner, SLA and decision record operating",2,"Template only","Business owner — TBD","Sponsor — TBD","No","Cadence / authority unconfirmed","Approve governance","TBD WITH CLIENT"],
    ["SOP and ownership","Accepted SOP, files, contacts and training",1,"Draft repository","Implementation Lead","Business owner — TBD","No","Named BAU team needed","Train and sign off","TBD WITH CLIENT"],
  ],"A36BAU",[34,48,24,34,30,32,16,38,34,26]);
  finishSheets(s);await save(wb,path.join(repoRoot,"workstreams","18_3.6_execution-tracking","Implementation_Tracker.xlsx"),"3.6_implementation",names,"Periodic Report!A1:J8");
}

const target=process.argv[2];
if(target==="2.1"||target==="all") await build21();
if(target==="2.2"||target==="all") await build22();
if(target==="2.3"||target==="all") await build23();
if(target==="2.4"||target==="all") await build24();
if(target==="2.5"||target==="all") await build25();
if(target==="2.6"||target==="all") await build26();
if(target==="3.1"||target==="all") await build31();
if(target==="3.2"||target==="all") await build32();
if(target==="3.3"||target==="all") await build33();
if(target==="3.4"||target==="all") await build34();
if(target==="3.5"||target==="all") await build35();
if(target==="3.6"||target==="all") await build36();
if(!["2.1","2.2","2.3","2.4","2.5","2.6","3.1","3.2","3.3","3.4","3.5","3.6","all"].includes(target)) throw new Error(`Unknown target: ${target}`);
