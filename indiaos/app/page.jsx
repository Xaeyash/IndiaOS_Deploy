"use client";
import { useState } from "react";

const C = {
  bg:"#06080F",surface:"#0D1117",card:"#111827",border:"#1E2A3A",
  saffron:"#FF7020",green:"#00C16A",red:"#EF4444",blue:"#3B82F6",
  gold:"#F5C542",purple:"#A855F7",text:"#EEF2FF",muted:"#6B7280",faint:"#1A2336",
};

const CAT_META = {
  "Road":        {icon:"🛣️",color:C.saffron},
  "Water":       {icon:"💧",color:C.blue},
  "NEET Fraud":  {icon:"🎓",color:C.red},
  "Health":      {icon:"🏥",color:C.green},
  "Electricity": {icon:"⚡",color:C.gold},
  "Corruption":  {icon:"⚠️",color:C.red},
  "Education":   {icon:"📚",color:C.purple},
  "Other":       {icon:"📋",color:C.muted},
};

const ALL_ISSUES = [
  {id:1,cat:"Road",city:"Mumbai",ward:"Western Express Highway",desc:"Massive pothole cluster causing daily accidents. 3 fatalities in 2 weeks. Repair contractor paid ₹1.2Cr but work not done.",reports:1247,verified:1089,status:"CRITICAL",days:67,govtRes:"Acknowledged",affected:"~80,000 commuters daily",tags:["Infrastructure","Urban","Safety"]},
  {id:2,cat:"Water",city:"Lucknow",ward:"Trans-Gomti Area",desc:"No piped water for 19 consecutive days. Jal Nigam tankers arrive every 3 days, insufficient for 4,000 families.",reports:987,verified:876,status:"CRITICAL",days:19,govtRes:"None",affected:"4,000 households",tags:["Utility","Urban"]},
  {id:3,cat:"NEET Fraud",city:"Patna",ward:"Centre 7, Boring Road",desc:"Students saw questions 12 hours before exam. 14 invigilators replaced last minute. WhatsApp screenshots leaked.",reports:891,verified:743,status:"CRITICAL",days:52,govtRes:"Denied",affected:"2,300 students",tags:["Education","Corruption","Youth"]},
  {id:4,cat:"Health",city:"Delhi",ward:"Safdarjung Hospital",desc:"Emergency ward understaffed. Average wait time 7 hours. Patients dying in corridor. Only 3 of 12 ICU beds functional.",reports:756,verified:689,status:"CRITICAL",days:90,govtRes:"None",affected:"Est. 200 patients/day",tags:["Healthcare","Urban"]},
  {id:5,cat:"NEET Fraud",city:"Kanpur",ward:"Centre 4, GT Road",desc:"Answer sheets pre-filled. Seating plan changed 1 hour before exam. Centre coordinator untraceable after results.",reports:534,verified:401,status:"CRITICAL",days:47,govtRes:"None",affected:"1,800 students",tags:["Education","Corruption","Youth"]},
  {id:6,cat:"Electricity",city:"Chennai",ward:"Zones 4 & 5, Ambattur",desc:"8–12 hour daily power cuts for 60 days. TANGEDCO promises resolution weekly. No timeline given.",reports:445,verified:398,status:"OPEN",days:60,govtRes:"In Progress",affected:"12,000 households",tags:["Utility","Infrastructure"]},
  {id:7,cat:"NEET Fraud",city:"Jaipur",ward:"Centre 2, Tonk Road",desc:"Answer keys circulated via WhatsApp at 11pm night before exam. Screenshots with timestamps exist.",reports:367,verified:312,status:"CRITICAL",days:49,govtRes:"None",affected:"900 students",tags:["Education","Corruption"]},
  {id:8,cat:"Corruption",city:"Bhopal",ward:"Collectorate Office",desc:"Birth/death certificates require unofficial payment of ₹500–800. Counter staff demanding cash openly.",reports:312,verified:267,status:"OPEN",days:180,govtRes:"None",affected:"~300 citizens/month",tags:["Governance","Corruption"]},
  {id:9,cat:"Water",city:"Kanpur",ward:"Ward 14, Govindnagar",desc:"Water supply contaminated with sewage. Multiple children hospitalised. Water board aware since March.",reports:312,verified:287,status:"CRITICAL",days:45,govtRes:"Denied",affected:"2,100 households",tags:["Utility","Health","Safety"]},
  {id:10,cat:"Road",city:"Lucknow",ward:"NH-27, Ring Road",desc:"Road not built despite ₹2Cr released 6 months ago. Contractor awarded without bidding.",reports:289,verified:234,status:"OPEN",days:180,govtRes:"None",affected:"35,000 daily vehicles",tags:["Infrastructure","Corruption"]},
  {id:11,cat:"Education",city:"Bihar",ward:"Govt Schools, Gaya Dist",desc:"Teachers absent 70% of school days. Mid-day meal budget unspent. 12 schools running with single teacher.",reports:267,verified:198,status:"OPEN",days:120,govtRes:"None",affected:"4,500 students",tags:["Education","Governance"]},
  {id:12,cat:"Health",city:"Bhopal",ward:"PHC Shivaji Nagar",desc:"Doctor absent 22 of last 30 days. Patients turned away. Medicines expired.",reports:198,verified:156,status:"OPEN",days:90,govtRes:"Acknowledged",affected:"~80 patients/day",tags:["Healthcare","Governance"]},
];

const REPS = [
  {id:1,name:"Dhiraj Kumar Sinha",party:"BJP",const:"Kanpur",state:"UP",score:31,neetPresent:false,neetSpoke:false,attend:"58%",promises:28,done:9,trend:-6,fund:"₹1.2Cr / ₹5Cr",activity:["Skipped NEET debate","Absent — no-confidence vote","Filed question on roads (Jan)"],promiseList:[{t:"Build 3 flyovers",s:"Stalled"},{t:"24/7 water supply",s:"Not started"},{t:"New PHC in Ward 7",s:"Completed"},{t:"Repair NH-27",s:"Pending"}]},
  {id:2,name:"Priya Shankar Das",party:"INC",const:"Patna Sahib",state:"Bihar",score:62,neetPresent:true,neetSpoke:true,attend:"81%",promises:18,done:11,trend:3,fund:"₹3.8Cr / ₹5Cr",activity:["Spoke in NEET debate","Raised flood relief","Tabled water quality bill"],promiseList:[{t:"Repair Boring Road centre",s:"In Progress"},{t:"Flood drainage upgrade",s:"Completed"},{t:"School mid-day meal audit",s:"Completed"},{t:"New district hospital",s:"Pending"}]},
  {id:3,name:"Arun Govindswamy",party:"DMK",const:"Chennai C.",state:"TN",score:84,neetPresent:true,neetSpoke:true,attend:"92%",promises:22,done:19,trend:5,fund:"₹4.5Cr / ₹5Cr",activity:["Led NEET abolition petition","Raised power cut issue","Tabled hospital staffing bill"],promiseList:[{t:"TANGEDCO transformer upgrade",s:"In Progress"},{t:"Hospital ICU beds x10",s:"Completed"},{t:"Ward 4 road repair",s:"Completed"},{t:"Desalination plant",s:"Pending"}]},
  {id:4,name:"Sunita Yadav",party:"SP",const:"Lucknow East",state:"UP",score:44,neetPresent:false,neetSpoke:false,attend:"67%",promises:20,done:9,trend:-2,fund:"₹2.1Cr / ₹5Cr",activity:["Absent — NEET debate","Filed question on NH-27 contract","Attended party rally (3)"],promiseList:[{t:"NH-27 ring road",s:"Stalled"},{t:"Trans-Gomti water supply",s:"Not started"},{t:"College scholarship scheme",s:"Completed"},{t:"Market upgrade",s:"Pending"}]},
  {id:5,name:"Harish Mehta",party:"BJP",const:"Jaipur North",state:"Raj",score:38,neetPresent:false,neetSpoke:false,attend:"61%",promises:25,done:10,trend:-4,fund:"₹0.9Cr / ₹5Cr",activity:["Absent — NEET debate","Absent — budget session day 3","Filed 2 questions (unrelated)"],promiseList:[{t:"Tonk Road widening",s:"Stalled"},{t:"24/7 electricity Ambattur",s:"Not started"},{t:"Primary school renovation",s:"Completed"},{t:"Jal Jeevan scheme",s:"Pending"}]},
  {id:6,name:"Kavitha Reddy",party:"TRS",const:"Hyderabad",state:"TS",score:77,neetPresent:true,neetSpoke:true,attend:"88%",promises:19,done:15,trend:2,fund:"₹4.1Cr / ₹5Cr",activity:["Spoke on healthcare staffing","Raised NEET issue","Tabled corruption bill"],promiseList:[{t:"PHC doctor attendance system",s:"Completed"},{t:"Road safety audit",s:"Completed"},{t:"Scholarship portal",s:"In Progress"},{t:"Water quality lab",s:"Completed"}]},
];

const CAMPAIGNS = [
  {id:"neet",title:"NEET Truth Map",icon:"🎓",color:C.red,reports:2204,cities:6,tag:"Education Corruption"},
  {id:"water",title:"Water Crisis India",icon:"💧",color:C.blue,reports:1299,cities:4,tag:"Basic Rights"},
  {id:"roads",title:"Road Death Trap",icon:"🛣️",color:C.saffron,reports:1536,cities:5,tag:"Infrastructure Safety"},
  {id:"health",title:"Hospital Failure",icon:"🏥",color:C.green,reports:954,cities:3,tag:"Healthcare"},
];

function interestScore(i){return i.reports*(i.status==="CRITICAL"?1.6:1)*(1+i.days/120);}

async function callAI(prompt){
  try{
    const r=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt})});
    const d=await r.json();
    return d.text||"No response.";
  }catch{return "AI unavailable.";}
}

function Tag({label,color}){return <span style={{background:color+"18",color,borderRadius:4,padding:"2px 8px",fontSize:10,fontWeight:700}}>{label}</span>;}

function ScoreRing({score}){
  const color=score>=70?C.green:score>=45?C.saffron:C.red;
  const r=26,ci=2*Math.PI*r,dash=(score/100)*ci;
  return(
    <div style={{position:"relative",width:64,height:64,flexShrink:0}}>
      <svg width="64" height="64" style={{transform:"rotate(-90deg)"}}>
        <circle cx="32" cy="32" r={r} fill="none" stroke={C.faint} strokeWidth="5"/>
        <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="5" strokeDasharray={`${dash} ${ci-dash}`} strokeLinecap="round"/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Rajdhani',sans-serif",fontSize:18,fontWeight:700,color}}>{score}</div>
    </div>
  );
}

function MiniIssueCard({iss,rank,onClick}){
  const m=CAT_META[iss.cat]||CAT_META["Other"];
  return(
    <div onClick={onClick} style={{background:C.card,borderRadius:10,padding:"12px 14px",marginBottom:8,border:`1px solid ${iss.status==="CRITICAL"?C.red+"40":C.border}`,cursor:"pointer"}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
        {rank&&<div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:17,fontWeight:700,color:C.muted,minWidth:24}}>#{rank}</div>}
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,gap:8}}>
            <div style={{fontWeight:600,fontSize:13}}>{m.icon} {iss.cat}</div>
            <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
              {iss.status==="CRITICAL"&&<span style={{fontSize:9,color:C.red,fontWeight:700}}>CRITICAL</span>}
              <span style={{fontSize:11,color:C.muted}}>›</span>
            </div>
          </div>
          <div style={{fontSize:11,color:C.muted,marginBottom:4}}>📍 {iss.city} · {iss.days}d unresolved</div>
          <div style={{fontSize:12,color:C.text,lineHeight:1.4,marginBottom:6}}>{iss.desc.slice(0,90)}{iss.desc.length>90?"…":""}</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <span style={{fontSize:11,color:m.color,fontWeight:700}}>{iss.reports.toLocaleString()} reports</span>
            <span style={{fontSize:11,color:C.green}}>{iss.verified} verified</span>
            <span style={{fontSize:11,color:iss.govtRes==="None"||iss.govtRes==="Denied"?C.red:C.saffron}}>Govt: {iss.govtRes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function IssueDetail({iss,onBack,issues}){
  const m=CAT_META[iss.cat]||CAT_META["Other"];
  const [aiText,setAiText]=useState("");
  const [aiLoad,setAiLoad]=useState(false);
  const [share,setShare]=useState(false);
  const resColor=iss.govtRes==="None"||iss.govtRes==="Denied"?C.red:iss.govtRes==="In Progress"?C.saffron:C.green;
  const related=issues.filter(i=>i.cat===iss.cat&&i.id!==iss.id).slice(0,2);
  async function genAI(){setAiLoad(true);const t=await callAI(`You are IndiaOS, India's civic accountability system. Write a 3-sentence factual public analysis of this issue. Be specific with numbers. End with what citizens should demand from government. Issue: ${iss.cat} in ${iss.city}. ${iss.desc}. ${iss.reports} reports, ${iss.days} days unresolved. Government response: ${iss.govtRes}.`);setAiText(t);setAiLoad(false);}
  return(
    <div style={{padding:16}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:C.saffron,cursor:"pointer",fontSize:13,marginBottom:14,fontFamily:"'DM Sans',sans-serif"}}>← Back</button>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div style={{flex:1,paddingRight:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:22}}>{m.icon}</span><span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:20,fontWeight:700,color:m.color}}>{iss.cat}</span></div>
          <div style={{fontSize:12,color:C.muted}}>📍 {iss.city} · {iss.ward}</div>
        </div>
        <Tag label={iss.status} color={iss.status==="CRITICAL"?C.red:C.saffron}/>
      </div>
      <div style={{background:C.card,borderRadius:10,padding:14,border:`1px solid ${C.border}`,marginBottom:12}}>
        <div style={{fontSize:14,color:C.text,lineHeight:1.7,marginBottom:10}}>{iss.desc}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{(iss.tags||[]).map(t=><Tag key={t} label={t} color={C.blue}/>)}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
        {[{l:"Total Reports",v:iss.reports.toLocaleString(),c:m.color},{l:"Verified",v:iss.verified,c:C.green},{l:"Days Unresolved",v:iss.days,c:iss.days>60?C.red:C.saffron},{l:"Affected",v:iss.affected,c:C.text}].map((s,i)=>(
          <div key={i} style={{background:C.card,borderRadius:8,padding:"10px 12px",border:`1px solid ${C.border}`}}>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:i<3?22:13,fontWeight:700,color:s.c,lineHeight:1.2}}>{s.v}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:3}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{background:C.card,borderRadius:10,padding:14,border:`1px solid ${C.border}`,marginBottom:12}}>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,marginBottom:10}}>GOVERNMENT RESPONSE</div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:resColor,flexShrink:0}}/>
          <div style={{fontWeight:700,fontSize:15,color:resColor}}>{iss.govtRes}</div>
        </div>
        <div style={{fontSize:12,color:C.muted}}>{iss.govtRes==="None"?`No official acknowledgement in ${iss.days} days despite ${iss.verified} verified citizen reports.`:iss.govtRes==="Denied"?`Government has officially denied the issue despite ${iss.verified} verifications.`:"Government has acknowledged. No completion timeline given."}</div>
      </div>
      <div style={{background:C.card,borderRadius:10,padding:14,border:`1px solid ${C.border}`,marginBottom:12}}>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,marginBottom:8}}>CITIZEN TRUST SCORE</div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
          <div style={{flex:1,height:8,background:C.faint,borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",background:`linear-gradient(90deg,${C.green},${C.saffron})`,width:`${Math.round((iss.verified/Math.max(iss.reports,1))*100)}%`,borderRadius:4}}/></div>
          <span style={{fontSize:14,fontWeight:700,color:C.green,fontFamily:"'Rajdhani',sans-serif"}}>{Math.round((iss.verified/Math.max(iss.reports,1))*100)}%</span>
        </div>
        <div style={{fontSize:12,color:C.muted}}>{iss.verified} of {iss.reports} reports independently verified by citizens.</div>
      </div>
      <div style={{background:"#0a1628",border:`1px solid ${C.blue}30`,borderRadius:10,padding:14,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{fontSize:11,color:C.blue,fontWeight:700,letterSpacing:1}}>⬟ AI ANALYSIS</div>
          {!aiText&&<button onClick={genAI} style={{background:C.blue+"20",border:`1px solid ${C.blue}40`,borderRadius:6,padding:"4px 10px",cursor:"pointer",fontSize:11,color:C.blue,fontFamily:"'DM Sans',sans-serif"}}>Generate</button>}
        </div>
        {aiLoad?<div style={{fontSize:13,color:C.muted}}>Analyzing {iss.reports} reports…</div>:aiText?<div style={{fontSize:13,color:C.text,lineHeight:1.7}}>{aiText}</div>:<div style={{fontSize:12,color:C.muted}}>Tap Generate for an AI public analysis of this issue.</div>}
      </div>
      {related.length>0&&<div style={{marginBottom:12}}><div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,marginBottom:8}}>SIMILAR ISSUES</div>{related.map(r=><div key={r.id} style={{background:C.card,borderRadius:8,padding:"10px 12px",marginBottom:6,border:`1px solid ${C.border}`}}><div style={{fontSize:13,fontWeight:600,marginBottom:2}}>📍 {r.city} — {r.ward}</div><div style={{fontSize:11,color:C.muted}}>{r.reports.toLocaleString()} reports · {r.days}d</div></div>)}</div>}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <button onClick={()=>setShare(true)} style={{background:C.faint,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px",cursor:"pointer",color:C.text,fontWeight:700,fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>📤 Share</button>
        <button style={{background:C.saffron,border:"none",borderRadius:10,padding:"12px",cursor:"pointer",color:C.text,fontWeight:700,fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>+ Verify</button>
      </div>
      {share&&<ShareOverlay data={{type:"issue",iss}} onClose={()=>setShare(false)}/>}
    </div>
  );
}

function RepDetail({rep,onBack}){
  const sc=rep.score>=70?C.green:rep.score>=45?C.saffron:C.red;
  const [aiText,setAiText]=useState("");
  const [aiLoad,setAiLoad]=useState(false);
  const [share,setShare]=useState(false);
  const breakdown=[{l:"Parliament Attendance",v:parseInt(rep.attend)},{l:"Promises Kept",v:Math.round((rep.done/rep.promises)*100)},{l:"NEET Debate Response",v:rep.neetSpoke?85:rep.neetPresent?40:0},{l:"Fund Utilisation",v:Math.round((parseFloat(rep.fund.split("/")[0].replace(/[₹Cr\s]/g,""))/5)*100)}];
  async function genAI(){setAiLoad(true);const t=await callAI(`Write a 3-sentence public accountability assessment for this elected representative. Be factual and data-driven, not political. Name: ${rep.name}, Party: ${rep.party}, Constituency: ${rep.const}, Score: ${rep.score}/100, Attendance: ${rep.attend}, NEET debate: ${rep.neetPresent?"Present":"Absent"}, Spoke: ${rep.neetSpoke?"Yes":"No"}, Promises: ${rep.done}/${rep.promises}, Funds: ${rep.fund}.`);setAiText(t);setAiLoad(false);}
  return(
    <div style={{padding:16}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:C.saffron,cursor:"pointer",fontSize:13,marginBottom:14,fontFamily:"'DM Sans',sans-serif"}}>← Back</button>
      <div style={{background:C.card,borderRadius:12,padding:16,border:`1px solid ${C.border}`,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div>
            <div style={{fontWeight:700,fontSize:17}}>{rep.name}</div>
            <div style={{fontSize:12,color:C.muted,marginTop:2}}>{rep.party} · {rep.const} · {rep.state}</div>
            <div style={{marginTop:8,display:"flex",gap:6,flexWrap:"wrap"}}>
              <Tag label={rep.attend+" attend"} color={parseInt(rep.attend)>75?C.green:C.saffron}/>
              <Tag label={rep.trend>0?`↑ ${rep.trend} pts`:`↓ ${Math.abs(rep.trend)} pts`} color={rep.trend>0?C.green:C.red}/>
            </div>
          </div>
          <ScoreRing score={rep.score}/>
        </div>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,marginBottom:10}}>SCORE BREAKDOWN</div>
        {breakdown.map((s,i)=>(
          <div key={i} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:12,color:C.text}}>{s.l}</span>
              <span style={{fontSize:12,fontWeight:700,color:s.v>=70?C.green:s.v>=40?C.saffron:C.red,fontFamily:"'Rajdhani',sans-serif"}}>{s.v}%</span>
            </div>
            <div style={{height:5,background:C.faint,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:s.v>=70?C.green:s.v>=40?C.saffron:C.red,width:`${s.v}%`,transition:"width 1s"}}/></div>
          </div>
        ))}
      </div>
      <div style={{background:C.card,borderRadius:10,padding:14,border:`1px solid ${C.border}`,marginBottom:12}}>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,marginBottom:10}}>PROMISE TRACKER</div>
        {rep.promiseList.map((p,i)=>{
          const pc={Completed:C.green,"In Progress":C.saffron,Stalled:C.red,"Not started":C.red,Pending:C.muted}[p.s]||C.muted;
          return(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderTop:i>0?`1px solid ${C.border}`:"none"}}><span style={{fontSize:13,color:C.text,flex:1,paddingRight:8}}>{p.t}</span><span style={{fontSize:10,color:pc,fontWeight:700,whiteSpace:"nowrap"}}>{p.s}</span></div>);
        })}
        <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderTop:`1px solid ${C.border}`}}><span style={{fontSize:12,color:C.muted}}>MPLAD Funds used</span><span style={{fontSize:12,fontWeight:700,color:C.gold}}>{rep.fund}</span></div>
      </div>
      <div style={{background:C.card,borderRadius:10,padding:14,border:`1px solid ${C.border}`,marginBottom:12}}>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,marginBottom:10}}>RECENT ACTIVITY</div>
        {rep.activity.map((a,i)=>(
          <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8}}><div style={{width:6,height:6,borderRadius:"50%",background:C.blue,marginTop:5,flexShrink:0}}/><span style={{fontSize:13,color:C.text,lineHeight:1.4}}>{a}</span></div>
        ))}
      </div>
      <div style={{background:"#0a1628",border:`1px solid ${C.blue}30`,borderRadius:10,padding:14,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{fontSize:11,color:C.blue,fontWeight:700,letterSpacing:1}}>⬟ AI ASSESSMENT</div>
          {!aiText&&<button onClick={genAI} style={{background:C.blue+"20",border:`1px solid ${C.blue}40`,borderRadius:6,padding:"4px 10px",cursor:"pointer",fontSize:11,color:C.blue,fontFamily:"'DM Sans',sans-serif"}}>Generate</button>}
        </div>
        {aiLoad?<div style={{fontSize:13,color:C.muted}}>Analyzing record…</div>:aiText?<div style={{fontSize:13,color:C.text,lineHeight:1.7}}>{aiText}</div>:<div style={{fontSize:12,color:C.muted}}>Tap Generate for a public accountability assessment.</div>}
      </div>
      <button onClick={()=>setShare(true)} style={{width:"100%",background:C.faint,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px",cursor:"pointer",color:C.text,fontWeight:700,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>📤 Share Scorecard</button>
      {share&&<ShareOverlay data={{type:"rep",rep}} onClose={()=>setShare(false)}/>}
    </div>
  );
}

function ShareOverlay({data,onClose}){
  const{type,iss,rep}=data;
  const accent=type==="issue"?(CAT_META[iss?.cat]?.color||C.saffron):C.saffron;
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"#000000cc",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.surface,borderRadius:"20px 20px 0 0",width:"100%",maxWidth:500,padding:"20px 20px 36px",border:`1px solid ${C.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:18,fontWeight:700,color:C.saffron}}>SHARE CARD</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:22}}>×</button>
        </div>
        <div style={{background:"linear-gradient(135deg,#0a1628,#0d0808)",borderRadius:12,padding:16,marginBottom:14,border:`1px solid ${accent}40`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><span>🇮🇳</span><span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:16,fontWeight:700,letterSpacing:2,color:C.saffron}}>INDIAOS</span></div>
          {type==="issue"&&iss&&(<div>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:18,fontWeight:700,color:accent,marginBottom:4}}>{CAT_META[iss.cat]?.icon} {iss.cat.toUpperCase()}</div>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:32,fontWeight:700,color:C.text}}>{iss.reports.toLocaleString()}</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:6}}>citizens reported this in {iss.city}</div>
            <div style={{fontSize:13,color:C.text,lineHeight:1.5}}>{iss.desc.slice(0,100)}…</div>
            <div style={{fontSize:12,color:iss.govtRes==="None"||iss.govtRes==="Denied"?C.red:C.saffron,marginTop:8}}>Govt: {iss.govtRes} · {iss.days} days unresolved</div>
          </div>)}
          {type==="rep"&&rep&&(<div>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:18,fontWeight:700,marginBottom:2}}>{rep.name}</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:10}}>{rep.party} · {rep.const}</div>
            <div style={{display:"flex",gap:14}}>
              <div><div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:36,fontWeight:700,color:rep.score>=70?C.green:rep.score>=45?C.saffron:C.red,lineHeight:1}}>{rep.score}</div><div style={{fontSize:10,color:C.muted}}>score /100</div></div>
              <div style={{display:"flex",flexDirection:"column",justifyContent:"center",gap:4}}>
                <div style={{fontSize:12,color:rep.neetPresent?C.green:C.red}}>{rep.neetPresent?"✓ Present":"✗ Absent"} — NEET debate</div>
                <div style={{fontSize:12,color:C.muted}}>Attendance: {rep.attend}</div>
                <div style={{fontSize:12,color:C.muted}}>Promises: {rep.done}/{rep.promises}</div>
              </div>
            </div>
          </div>)}
          <div style={{fontSize:10,color:C.muted,marginTop:10,borderTop:`1px solid ${C.border}`,paddingTop:8}}>indiaos.io · Verified by citizens · Open source</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <button style={{background:C.green,border:"none",borderRadius:10,padding:"12px",cursor:"pointer",color:C.text,fontWeight:700,fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>📲 WhatsApp</button>
          <button style={{background:"#1DA1F2",border:"none",borderRadius:10,padding:"12px",cursor:"pointer",color:C.text,fontWeight:700,fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>🐦 Twitter/X</button>
        </div>
      </div>
    </div>
  );
}

export default function IndiaOS(){
  const [tab,setTab]=useState("home");
  const [issues,setIssues]=useState(ALL_ISSUES);
  const [selIssue,setSelIssue]=useState(null);
  const [selRep,setSelRep]=useState(null);
  const [rStep,setRStep]=useState(0);
  const [rData,setRData]=useState({cat:"",city:"",desc:""});
  const [done,setDone]=useState(false);
  const [catFilter,setCatFilter]=useState("All");

  const ranked=[...issues].sort((a,b)=>interestScore(b)-interestScore(a));
  const totalRep=issues.reduce((s,i)=>s+i.reports,0);

  const goTab=(t)=>{setTab(t);setSelIssue(null);setSelRep(null);setDone(false);};

  const TABS=[
    {id:"home",icon:"⌂",label:"HOME"},
    {id:"issues",icon:"◉",label:"ISSUES"},
    {id:"report",icon:"+",label:"REPORT"},
    {id:"reps",icon:"◈",label:"REPS"},
    {id:"more",icon:"⬡",label:"MORE"},
  ];

  function submitReport(){
    setIssues(p=>[...p,{id:p.length+1,cat:rData.cat,city:rData.city,ward:"Just reported",desc:rData.desc,reports:1,verified:0,status:"OPEN",days:0,govtRes:"None",affected:"Unknown",tags:[]}]);
    setDone(true);
  }

  const navBar=(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:500,background:C.surface,borderTop:`1px solid ${C.border}`,display:"flex",zIndex:100}}>
      {TABS.map(t=>(
        <button key={t.id} onClick={()=>goTab(t.id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",padding:"10px 4px 8px",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
          <span style={{fontSize:t.id==="report"?20:15,color:tab===t.id?C.saffron:C.muted,fontWeight:700}}>{t.icon}</span>
          <span style={{fontSize:9,color:tab===t.id?C.saffron:C.muted,fontWeight:700,letterSpacing:0.5}}>{t.label}</span>
        </button>
      ))}
    </div>
  );

  const topBar=(
    <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:18}}>🇮🇳</span>
        <span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:20,fontWeight:700,letterSpacing:3,background:`linear-gradient(90deg,${C.saffron},${C.text})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>INDIAOS</span>
      </div>
      <div style={{fontSize:11,color:C.green}}>● LIVE</div>
    </div>
  );

  if(selIssue){
    const iss=issues.find(i=>i.id===selIssue);
    return(<div style={{fontFamily:"'DM Sans',sans-serif",background:C.bg,minHeight:"100vh",color:C.text,maxWidth:500,margin:"0 auto",paddingBottom:68}}>{topBar}<IssueDetail iss={iss} onBack={()=>setSelIssue(null)} issues={issues}/>{navBar}</div>);
  }
  if(selRep){
    const rep=REPS.find(r=>r.id===selRep);
    return(<div style={{fontFamily:"'DM Sans',sans-serif",background:C.bg,minHeight:"100vh",color:C.text,maxWidth:500,margin:"0 auto",paddingBottom:68}}>{topBar}<RepDetail rep={rep} onBack={()=>setSelRep(null)}/>{navBar}</div>);
  }

  return(
    <div style={{fontFamily:"'DM Sans',sans-serif",background:C.bg,minHeight:"100vh",color:C.text,maxWidth:500,margin:"0 auto",paddingBottom:68}}>
      {topBar}
      {tab==="home"&&(
        <div>
          <div style={{background:`linear-gradient(180deg,#0a1628 0%,${C.bg} 100%)`,padding:"20px 16px 16px"}}>
            <div style={{fontSize:10,color:C.saffron,fontWeight:700,letterSpacing:2,marginBottom:6}}>INDIA'S ACCOUNTABILITY LAYER</div>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:26,fontWeight:700,lineHeight:1.2,marginBottom:10}}>The system running India.<br/><span style={{color:C.saffron}}>Visible to all.</span></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
              {[{v:totalRep.toLocaleString(),l:"Total Reports",c:C.saffron},{v:issues.filter(i=>i.status==="CRITICAL").length,l:"Critical Issues",c:C.red}].map((s,i)=>(
                <div key={i} style={{background:C.card,borderRadius:8,padding:"10px",textAlign:"center",border:`1px solid ${C.border}`}}>
                  <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:26,fontWeight:700,color:s.c}}>{s.v}</div>
                  <div style={{fontSize:11,color:C.muted}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
              {Object.entries(CAT_META).map(([cat,m])=>{
                const n=issues.filter(i=>i.cat===cat).reduce((s,i)=>s+i.reports,0);
                if(!n) return null;
                return(<button key={cat} onClick={()=>{setCatFilter(cat);goTab("issues");}} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:"5px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif",flexShrink:0}}><span style={{fontSize:13}}>{m.icon}</span><span style={{fontSize:11,color:m.color,fontWeight:700}}>{n.toLocaleString()}</span><span style={{fontSize:10,color:C.muted}}>{cat}</span></button>);
              })}
            </div>
          </div>
          <div style={{padding:"0 16px"}}>
            <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,margin:"14px 0 10px"}}>TOP ISSUES BY PUBLIC INTEREST</div>
            {ranked.slice(0,5).map((iss,i)=><MiniIssueCard key={iss.id} iss={iss} rank={i+1} onClick={()=>setSelIssue(iss.id)}/>)}
            <button onClick={()=>goTab("issues")} style={{width:"100%",background:C.faint,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px",cursor:"pointer",color:C.muted,fontSize:13,fontFamily:"'DM Sans',sans-serif",marginBottom:8}}>View all {issues.length} issues →</button>
          </div>
        </div>
      )}
      {tab==="issues"&&(
        <div style={{padding:16}}>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:20,fontWeight:700,color:C.saffron,marginBottom:4}}>All Issues</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:12}}>Ranked by public interest · tap for full details</div>
          <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:14,paddingBottom:4}}>
            {["All",...Object.keys(CAT_META)].map(c=>(
              <button key={c} onClick={()=>setCatFilter(c)} style={{background:catFilter===c?C.saffron:C.card,border:`1px solid ${catFilter===c?C.saffron:C.border}`,borderRadius:20,padding:"5px 12px",cursor:"pointer",fontSize:11,color:C.text,whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif"}}>
                {c==="All"?c:`${CAT_META[c]?.icon} ${c}`}
              </button>
            ))}
          </div>
          {(catFilter==="All"?ranked:ranked.filter(i=>i.cat===catFilter)).map((iss,i)=><MiniIssueCard key={iss.id} iss={iss} rank={i+1} onClick={()=>setSelIssue(iss.id)}/>)}
        </div>
      )}
      {tab==="report"&&(
        <div style={{padding:"20px 16px"}}>
          {done?(
            <div style={{textAlign:"center",paddingTop:20}}>
              <div style={{fontSize:48,marginBottom:12}}>✅</div>
              <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:28,fontWeight:700,color:C.green,marginBottom:8}}>LOGGED</div>
              <div style={{fontSize:14,color:C.muted,marginBottom:20,lineHeight:1.6}}>Your report is now live.<br/>4 more verifications → goes on national map.</div>
              <div style={{background:C.card,borderRadius:10,padding:14,border:`1px solid ${C.green}30`,marginBottom:20,textAlign:"left"}}>
                <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:8}}>SHARE TO GET VERIFICATIONS</div>
                <div style={{background:C.faint,borderRadius:8,padding:"10px 12px",fontSize:12,color:C.text,lineHeight:1.5}}>"I reported a {rData.cat} issue on IndiaOS. Verify here: indiaos.io/verify/{issues.length}"</div>
              </div>
              <button onClick={()=>{setDone(false);setRStep(0);setRData({cat:"",city:"",desc:""});}} style={{background:C.saffron,border:"none",borderRadius:8,padding:"12px 28px",cursor:"pointer",color:C.text,fontWeight:700,fontSize:14,fontFamily:"'DM Sans',sans-serif"}}>Report Another</button>
            </div>
          ):(
            <ReportFlow step={rStep} setStep={setRStep} data={rData} setData={setRData} onSubmit={submitReport} issues={issues}/>
          )}
        </div>
      )}
      {tab==="reps"&&(
        <div style={{padding:16}}>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:20,fontWeight:700,color:C.saffron,marginBottom:4}}>Representative Scorecards</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:12}}>Tap a rep to see full profile, promises & AI assessment.</div>
          <div style={{background:C.red+"15",border:`1px solid ${C.red}30`,borderRadius:8,padding:"8px 12px",marginBottom:14,fontSize:12,color:C.red}}>🔍 Sorted by overall accountability score</div>
          {[...REPS].sort((a,b)=>b.score-a.score).map(rep=>{
            const sc=rep.score>=70?C.green:rep.score>=45?C.saffron:C.red;
            return(
              <div key={rep.id} onClick={()=>setSelRep(rep.id)} style={{background:C.card,borderRadius:10,padding:"14px 16px",marginBottom:10,border:`1px solid ${C.border}`,cursor:"pointer"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{textAlign:"center",width:44,flexShrink:0}}>
                    <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:28,fontWeight:700,color:sc,lineHeight:1}}>{rep.score}</div>
                    <div style={{fontSize:9,color:C.muted}}>/100</div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:14,marginBottom:2}}>{rep.name}</div>
                    <div style={{fontSize:12,color:C.muted,marginBottom:6}}>{rep.party} · {rep.const} · {rep.state}</div>
                    <div style={{height:4,background:C.faint,borderRadius:2,overflow:"hidden",marginBottom:4}}><div style={{height:"100%",background:sc,borderRadius:2,width:`${rep.score}%`}}/></div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      <span style={{fontSize:10,color:rep.neetPresent?C.green:C.red}}>{rep.neetPresent?"✓":"✗"} NEET debate</span>
                      <span style={{fontSize:10,color:C.muted}}>{rep.attend} attend</span>
                      <span style={{fontSize:10,color:C.muted}}>{rep.done}/{rep.promises} promises</span>
                    </div>
                  </div>
                  <span style={{color:C.muted,fontSize:18}}>›</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {tab==="more"&&(
        <div style={{padding:16}}>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:20,fontWeight:700,color:C.saffron,marginBottom:4}}>Active Campaigns</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:14}}>Citizens rally around specific issues. Join, share, or verify.</div>
          {CAMPAIGNS.map(camp=>(
            <div key={camp.id} style={{background:C.card,borderRadius:10,padding:"14px 16px",marginBottom:10,border:`1px solid ${camp.color}30`,cursor:"pointer"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:24}}>{camp.icon}</span><div><div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:16,fontWeight:700,color:camp.color}}>{camp.title}</div><div style={{fontSize:11,color:C.muted}}>{camp.tag}</div></div></div>
                <div style={{textAlign:"right",flexShrink:0}}><div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:18,fontWeight:700,color:camp.color}}>{camp.reports.toLocaleString()}</div><div style={{fontSize:10,color:C.muted}}>reports · {camp.cities} cities</div></div>
              </div>
              <div style={{height:4,background:C.faint,borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",background:camp.color,borderRadius:2,width:`${Math.min(95,Math.round((camp.reports/2500)*100))}%`}}/></div>
            </div>
          ))}
          <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,marginTop:16,marginBottom:10}}>NEET TRUTH MAP</div>
          {ranked.filter(i=>i.cat==="NEET Fraud").map(i=>(
            <div key={i.id} onClick={()=>{setSelIssue(i.id);}} style={{background:C.card,borderRadius:8,padding:"10px 12px",marginBottom:6,border:`1px solid ${C.red}20`,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontSize:13,fontWeight:600}}>📍 {i.city} — {i.ward}</div><div style={{fontSize:11,color:C.muted}}>{i.reports.toLocaleString()} reports · {i.days}d</div></div>
              <span style={{color:C.muted,fontSize:16}}>›</span>
            </div>
          ))}
        </div>
      )}
      {navBar}
    </div>
  );
}

function ReportFlow({step,setStep,data,setData,onSubmit,issues}){
  const CATS=Object.keys(CAT_META);
  const CITIES=["Mumbai","Delhi","Lucknow","Kanpur","Patna","Bhopal","Jaipur","Chennai","Hyderabad","Kolkata","Other"];
  const similar=data.cat?issues.filter(i=>i.cat===data.cat).slice(0,2):[];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:20}}>
        {[0,1,2,3].map(i=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=step?C.saffron:C.faint,transition:"background 0.3s"}}/>)}
      </div>
      {step===0&&(<div>
        <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>What happened?</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:14}}>Select the category that best fits.</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {CATS.map(cat=>(<button key={cat} onClick={()=>{setData(d=>({...d,cat}));setStep(1);}} style={{background:data.cat===cat?"#FF702015":C.card,border:`1px solid ${data.cat===cat?C.saffron:C.border}`,borderRadius:10,padding:"12px 8px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontFamily:"'DM Sans',sans-serif"}}><span style={{fontSize:20}}>{CAT_META[cat].icon}</span><span style={{fontSize:12,color:C.text,fontWeight:600}}>{cat}</span></button>))}
        </div>
      </div>)}
      {step===1&&(<div>
        <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Where is this?</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:12}}>Select your city.</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
          {CITIES.map(city=>(<button key={city} onClick={()=>setData(d=>({...d,city}))} style={{background:data.city===city?"#FF702015":C.card,border:`1px solid ${data.city===city?C.saffron:C.border}`,borderRadius:8,padding:"10px",cursor:"pointer",fontSize:13,color:C.text,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>{city}</button>))}
        </div>
        {similar.length>0&&<div style={{background:"#00C16A10",border:`1px solid ${C.green}30`,borderRadius:10,padding:12,marginBottom:12}}><div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:6}}>SIMILAR REPORTS ALREADY EXIST</div>{similar.map(i=><div key={i.id} style={{fontSize:12,color:C.muted,marginBottom:4}}>• {i.reports} reports of {i.cat} in {i.city}</div>)}</div>}
        <button onClick={()=>setStep(2)} disabled={!data.city} style={{width:"100%",background:data.city?C.saffron:C.faint,border:"none",borderRadius:10,padding:"14px",cursor:"pointer",color:C.text,fontWeight:700,fontSize:15,fontFamily:"'DM Sans',sans-serif"}}>Continue →</button>
      </div>)}
      {step===2&&(<div>
        <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Describe the issue</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:12}}>Be specific. This becomes a permanent public record.</div>
        <textarea value={data.desc} onChange={e=>setData(d=>({...d,desc:e.target.value}))} placeholder={`Describe the ${data.cat} issue in ${data.city}…`} style={{width:"100%",minHeight:110,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px",color:C.text,fontSize:14,fontFamily:"'DM Sans',sans-serif",resize:"vertical",boxSizing:"border-box"}}/>
        <div style={{fontSize:11,color:C.muted,margin:"6px 0 14px"}}>Include time, exact location, and any photo evidence details.</div>
        <button onClick={()=>setStep(3)} disabled={data.desc.length<10} style={{width:"100%",background:data.desc.length>=10?C.saffron:C.faint,border:"none",borderRadius:10,padding:"14px",cursor:"pointer",color:C.text,fontWeight:700,fontSize:15,fontFamily:"'DM Sans',sans-serif"}}>Continue →</button>
      </div>)}
      {step===3&&(<div>
        <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Confirm report</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:12}}>This will be public and permanent.</div>
        <div style={{background:C.card,borderRadius:10,padding:16,border:`1px solid ${C.border}`,marginBottom:14}}>
          {[["Category",`${CAT_META[data.cat]?.icon} ${data.cat}`],["Location",`📍 ${data.city}`],["Description",data.desc]].map(([l,v])=>(<div key={l} style={{marginBottom:10}}><div style={{fontSize:11,color:C.muted,marginBottom:2}}>{l.toUpperCase()}</div><div style={{fontSize:13,color:C.text,lineHeight:1.5}}>{v}</div></div>))}
        </div>
        <button onClick={onSubmit} style={{width:"100%",background:C.saffron,border:"none",borderRadius:10,padding:"14px",cursor:"pointer",color:C.text,fontWeight:700,fontSize:15,fontFamily:"'DM Sans',sans-serif",marginBottom:8}}>🚨 Submit Report</button>
        <button onClick={()=>setStep(0)} style={{width:"100%",background:"none",border:`1px solid ${C.border}`,borderRadius:10,padding:"12px",cursor:"pointer",color:C.muted,fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Start over</button>
      </div>)}
    </div>
  );
}
