"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const regionalJS = fs.readFileSync(path.join(root, "assets/js/regional-dashboard.js"), "utf8");

function boot(initialHash) {
  const nodes = new Map();
  const element = id => {
    if (!nodes.has(id)) nodes.set(id, {
      id, innerHTML:"", textContent:"", value:"", onclick:null, onchange:null,
      setAttribute(){}, getAttribute(){return ""}, querySelectorAll(){return []},
      focus(){}, setSelectionRange(){}
    });
    return nodes.get(id);
  };
  const document = {
    getElementById:element, querySelectorAll(){return []}, querySelector(){return null},
    createElement(){return {click(){},href:"",download:""}}
  };
  const win = {
    location:{hash:initialHash||"",origin:"https://bofandra.github.io",pathname:"/regnas/",search:""},
    addEventListener(){}, confirm(){return true},
    prompt(){return "Alasan koreksi contoh"}
  };
  const context = vm.createContext({
    window:win, document, navigator:{clipboard:{writeText(){}}},
    history:{replaceState(){}}, URL:{createObjectURL(){return "blob:demo"},revokeObjectURL(){}},
    Blob:function(){}, setTimeout(){}
  });
  vm.runInContext(regionalJS,context,{filename:"regional-dashboard.js"});
  const match = html.match(/<script>\s*(\(function\(\)\{[\s\S]*?)<\/script>/);
  assert.ok(match,"inline mockup script exists");
  const hook = [
    "window.__test={",
    "state:function(){return {role:role,page:page,count:cards.length,status:selected.status,id:selected.id,nav:el('nav').innerHTML,view:el('view').innerHTML,scope:scopedCases().map(function(c){return c.id}),cards:cards.map(function(c){return {id:c.id,status:c.status}})}},",
    "act:act,",
    "role:function(r){role=r;page='dashboard';render()},",
    "page:function(p){page=p;render()},",
    "select:function(id){selected=cards.find(function(c){return c.id===id});render()},",
    "edit:function(s,i,v){selected.values[s][i]=v;selected.revision++;selected.qcRunRevision=0;selected.qcAckRevision=0;selected.qcAckReason='';render()},",
    "render:render",
    "};",
    "function applyCaseHash()"
  ].join("\n");
  const altered = match[1].replace("function applyCaseHash()",hook);
  vm.runInContext(altered,context,{filename:"index-inline.js"});
  return {view:win.__test,regional:win.RegnasRegional,win,element};
}
test("T0 — baseline syntax, synthetic dataset and source separation",()=>{
  const x=boot();
  assert.equal(x.view.state().count,54);
  assert.equal(x.regional.networks.length,2);
  assert.ok(x.regional.orgs.some(o=>o.noReports));
  assert.equal(x.view.state().role,"nasional");
});
test("T1 — Regional Supervisor is separate from Regional Reviewer and has no decision menu",()=>{
  const x=boot();x.view.role("wilayah");const s=x.view.state();
  assert.ok(s.nav.includes("Peta Sebaran"));
  assert.ok(s.nav.includes("Faskes Binaan"));
  assert.ok(s.nav.includes("Jenis Kanker"));
  assert.ok(!s.nav.includes("Antrean Review"));
  assert.ok(s.view.includes("reg-map-svg"));
  assert.ok(!s.view.includes("data-action=\"approve\""));
});
test("T2 — network assignment scopes facilities across province boundaries",()=>{
  const x=boot(),r=x.regional;x.view.role("wilayah");
  const a=r.scopeOrganizations("wilayah");
  assert.equal(a.length,6);
  assert.ok(new Set(a.map(o=>o.province)).size>1);
  const aIds=new Set(x.view.state().scope);
  r.setNetwork("NW-B");x.view.render();
  const b=r.scopeOrganizations("wilayah");
  assert.equal(b.length,6);
  assert.ok(!x.view.state().scope.some(id=>aIds.has(id)));
});
test("T3 — province map drill-down and breadcrumb back",()=>{
  const x=boot(),r=x.regional;x.view.role("wilayah");
  const before=r.filterCases([], "wilayah", "").length;
  r.action("province:"+encodeURIComponent("Jawa Barat"));x.view.page("regional-map");
  assert.ok(r.filterCases(sampleCases(x), "wilayah", "").every(c=>c.region==="Jawa Barat"));
  assert.ok(x.view.state().view.includes("Faskes Binaan"));
  r.action("back");
  assert.equal(r.state.filters.province,"");
  assert.equal(before,0);
});
test("T4 — cancer → site → facility → case drill-down reconciles totals",()=>{
  const x=boot(),r=x.regional;x.view.role("wilayah");
  const rows=sampleCases(x);
  const group="Payudara";
  r.action("group:"+encodeURIComponent(group));x.view.page("regional-cancer");
  const gCases=r.filterCases(rows,"wilayah","");
  assert.ok(gCases.length>0&&gCases.every(c=>r.cancer(c).group===group));
  const site=r.cancer(gCases[0]).site;
  r.action("site:"+encodeURIComponent(site));x.view.page("regional-cancer");
  assert.ok(x.view.state().view.includes("Faskes Binaan"));
  const selected=r.filterCases(rows,"wilayah","");
  const target=selected[0].org;
  r.action("org:"+encodeURIComponent(target));x.view.page("regional-cancer");
  assert.ok(x.view.state().view.includes("Daftar Kasus Terpilih"));
  assert.equal(r.filterCases(rows,"wilayah","").length,selected.filter(c=>c.org===target).length);
});
test("T5 — unreported facility remains in roster while contributing zero cases",()=>{
  const x=boot(),r=x.regional;x.view.role("wilayah");
  r.setFilter("facilityStatus","unreported");x.view.page("regional-facilities");
  assert.ok(x.view.state().view.includes("RS Contoh Cendana"));
  assert.equal(r.filterCases(sampleCases(x),"wilayah","").length,0);
  assert.ok(!x.view.state().view.includes("data-action=\"approve\""));
});
test("T6 — patient versus primary tumor counting differs when a patient has two primaries",()=>{
  const x=boot(),r=x.regional,records=sampleCases(x);
  const all=r.filterCases(records,"nasional","");
  assert.ok(r.uniqueCount(all,"tumor")>r.uniqueCount(all,"patient"));
  r.setFilter("unit","patient");
  assert.equal(r.count(all),r.uniqueCount(all,"patient"));
});
test("T7 — date bases are distinct and finalization only counts finalized records",()=>{
  const x=boot(),r=x.regional,records=sampleCases(x);
  r.setFilter("basis","finalization");
  assert.ok(r.filterCases(records,"nasional","").every(c=>c.status==="FINAL_LOCKED"));
  r.setFilter("basis","submission");
  assert.ok(r.filterCases(records,"nasional","").every(c=>c.submittedAt));
  r.setFilter("basis","diagnosis");
  assert.ok(r.filterCases(records,"nasional","").some(c=>c.status==="DRAFT"));
});
test("T8 — status and stage filter, reset/empty states",()=>{
  const x=boot(),r=x.regional,records=sampleCases(x);
  r.setFilter("status","FINAL_LOCKED");
  assert.ok(r.filterCases(records,"nasional","").every(c=>c.status==="FINAL_LOCKED"));
  r.setFilter("year","2024");
  assert.equal(r.filterCases(records,"nasional","").length,0);
  r.action("clear");
  assert.equal(r.state.filters.year,"2026");
  assert.equal(r.state.filters.status,"");
});
test("T9 — monitoring aggregates and CSV contain no patient identifiers",()=>{
  const x=boot(),r=x.regional;x.view.role("wilayah");x.view.page("regional-facilities");
  const csv=r.aggregateCsv(sampleCases(x),"wilayah","");
  assert.ok(csv.includes("faskes_contoh"));
  assert.ok(csv.includes("RS Contoh Cendana"));
  assert.ok(!csv.includes("patient_key"));
  assert.ok(!csv.includes("P-000"));
  assert.ok(x.view.state().view.includes("Unduh Agregat CSV"));
});
test("T10 — registrar baseline QC/F12B/regional/national workflow remains intact",()=>{
  const x=boot();x.view.act("presenterlaunch");x.view.act("generate");x.view.act("openlaunch");assert.equal(x.view.state().id,"REG-2026-00130");
  x.view.act("submit");assert.equal(x.view.state().status,"DRAFT");
  x.view.edit(3,2,"T2");x.view.edit(3,1,"Edisi ditetapkan pengampu");
  x.view.act("runqc");x.view.act("submit");
  assert.equal(x.view.state().status,"INTERNAL_VERIFICATION_PENDING");
  x.view.role("verifikator");x.view.page("review");x.view.act("approve");
  assert.equal(x.view.state().status,"REGIONAL_REVIEW");
  x.view.role("daerah");x.view.page("review");x.view.act("approve");
  assert.equal(x.view.state().status,"NATIONAL_REVIEW");
  x.view.role("nasional");x.view.page("review");x.view.act("approve");
  assert.equal(x.view.state().status,"FINAL_LOCKED");
  x.view.act("return");assert.equal(x.view.state().status,"FINAL_LOCKED");
});
test("T11 — reset restores original seed, network, filter and registrar scenario",()=>{
  const x=boot(),r=x.regional;x.view.role("wilayah");r.setNetwork("NW-B");
  r.setFilter("year","2025");x.view.act("reset");
  assert.equal(r.state.network,"NW-A");
  assert.equal(r.state.filters.year,"2026");
  assert.equal(x.view.state().role,"nasional");
  assert.equal(x.view.state().cards.find(c=>c.id==="REG-2026-00130").status,"DRAFT");
});
test("T12 — mockup displays synthetic and schematic map disclosure",()=>{
  const x=boot();x.view.role("wilayah");
  const page=x.view.state().view;
  assert.ok(page.includes("DATA SIMULASI"));
  assert.ok(page.includes("Diagram ilustratif"));
  assert.ok(page.includes("bukan batas administrasi"));
  assert.ok(page.includes("bukan estimasi insidensi populasi"));
});
test("T13 — direct link opens regional supervisor home",()=>{
  const x=boot("#pengampu");
  assert.equal(x.view.state().role,"wilayah");
  assert.equal(x.view.state().page,"dashboard");
  assert.ok(x.view.state().view.includes("Peta Sebaran Kasus"));
});
test("T14 — region supervisor cannot edit or approve a case through the old action handler",()=>{
  const x=boot("#pengampu");
  x.view.act("open:REG-2026-00130");
  assert.equal(x.view.state().role,"wilayah");
  assert.equal(x.view.state().page,"dashboard");
  x.view.act("approve");
  assert.equal(x.view.state().cards.find(c=>c.id==="REG-2026-00130").status,"DRAFT");
});
test("T15 — stage bucket recognizes IIB as II and unknown separately",()=>{
  const x=boot(),r=x.regional,records=sampleCases(x);
  r.setFilter("stage","II");
  assert.ok(r.filterCases(records,"nasional","").some(c=>c.stage==="IIB"));
  r.setFilter("stage","UNKNOWN");
  assert.ok(r.filterCases(records,"nasional","").every(c=>c.stage==="UNKNOWN"));
});
function sampleCases(x) {
  const ids=x.view.state().cards.map(c=>c.id);
  return x.regional.extendCases([
    {id:"REG-2026-00127",patient:"P-000127",org:"RS Contoh Sejahtera",region:"DKI Jakarta",tumor:"Kanker payudara",topo:"C50.9",primary:"TUM-001",stage:"IIA",date:"2026-07-15",status:"REGIONAL_REVIEW"},
    {id:"REG-2026-00128",patient:"P-000128",org:"RS Contoh Bahari",region:"Jawa Barat",tumor:"Kanker kolorektal",topo:"C18.9",primary:"TUM-002",stage:"III",date:"2026-05-27",status:"RETURNED_TO_FASKES"},
    {id:"REG-2026-00129",patient:"P-000129",org:"RS Contoh Nusantara",region:"Jawa Tengah",tumor:"Kanker paru",topo:"C34.9",primary:"TUM-003",stage:"IV",date:"2026-08-09",status:"NATIONAL_REVIEW"},
    {id:"REG-2026-00130",patient:"P-000130",org:"RS Contoh Mandiri",region:"Jawa Timur",tumor:"Kanker serviks",topo:"C53.9",primary:"TUM-004",stage:"IIB",date:"2026-10-10",status:"DRAFT"},
    {id:"REG-2026-00131",patient:"P-000131",org:"RS Contoh Sentosa",region:"DKI Jakarta",tumor:"Limfoma",topo:"C77.9",primary:"TUM-005",stage:"UNKNOWN",date:"2026-06-30",status:"FINAL_LOCKED"}
  ]);
}
