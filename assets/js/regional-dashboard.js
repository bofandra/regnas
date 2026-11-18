(function (root) {
"use strict";
var orgs=[
{id:"ORG-001",name:"RS Contoh Sejahtera",province:"DKI Jakarta",district:"Jakarta Selatan",x:125,y:100,network:"NW-A"},
{id:"ORG-002",name:"RS Contoh Bahari",province:"Jawa Barat",district:"Kota Bandung",x:261,y:172,network:"NW-A"},
{id:"ORG-003",name:"RS Contoh Nusantara",province:"Jawa Tengah",district:"Kota Semarang",x:463,y:152,network:"NW-A"},
{id:"ORG-004",name:"RS Contoh Mandiri",province:"Jawa Timur",district:"Kota Surabaya",x:652,y:167,network:"NW-B"},
{id:"ORG-005",name:"RS Contoh Sentosa",province:"DKI Jakarta",district:"Jakarta Timur",x:139,y:111,network:"NW-B"},
{id:"ORG-006",name:"RS Contoh Pelita",province:"Jawa Barat",district:"Kota Bogor",x:192,y:163,network:"NW-A"},
{id:"ORG-007",name:"RS Contoh Cendana",province:"Jawa Barat",district:"Kabupaten Bekasi",x:200,y:139,network:"NW-A",noReports:true},
{id:"ORG-008",name:"RS Contoh Pusaka",province:"Jawa Tengah",district:"Kota Surakarta",x:478,y:195,network:"NW-A"},
{id:"ORG-009",name:"RS Contoh Harapan",province:"Jawa Timur",district:"Kota Malang",x:693,y:210,network:"NW-B"},
{id:"ORG-010",name:"RS Contoh Cakrawala",province:"DKI Jakarta",district:"Jakarta Pusat",x:154,y:95,network:"NW-B"},
{id:"ORG-011",name:"RS Contoh Anggrek",province:"Jawa Barat",district:"Kota Cirebon",x:340,y:149,network:"NW-B"},
{id:"ORG-012",name:"RS Contoh Merapi",province:"Jawa Tengah",district:"Kota Magelang",x:519,y:214,network:"NW-B"}
];
var networks=[
{id:"NW-A",name:"Jejaring Pengampu Barat (contoh)",description:"Enam faskes binaan lintas DKI, Jawa Barat, dan Jawa Tengah"},
{id:"NW-B",name:"Jejaring Pengampu Timur (contoh)",description:"Enam faskes binaan lintas DKI, Jawa Barat, Jawa Tengah, dan Jawa Timur"}
];
var types=[
{group:"Payudara",tumor:"Kanker payudara",icd:"C50.9",site:"C50.9",siteLabel:"Payudara, tidak spesifik",morph:"8500/3"},
{group:"Kolorektal",tumor:"Kanker kolorektal",icd:"C18.9",site:"C18.9",siteLabel:"Kolon, tidak spesifik",morph:"8140/3"},
{group:"Paru",tumor:"Kanker paru",icd:"C34.9",site:"C34.9",siteLabel:"Bronkus / paru, tidak spesifik",morph:"8070/3"},
{group:"Serviks",tumor:"Kanker serviks",icd:"C53.9",site:"C53.9",siteLabel:"Serviks uteri, tidak spesifik",morph:"8070/3"},
{group:"Limfoma",tumor:"Limfoma",icd:"C85.9",site:"C77.9",siteLabel:"Kelenjar getah bening, tidak spesifik",morph:"9591/3"},
{group:"Prostat",tumor:"Kanker prostat",icd:"C61",site:"C61.9",siteLabel:"Prostat (kode contoh)",morph:"8140/3"},
{group:"Hati",tumor:"Kanker hati",icd:"C22.0",site:"C22.0",siteLabel:"Hati, subsite C22.0 (contoh)",morph:"8170/3"}
];
var provinces=["DKI Jakarta","Jawa Barat","Jawa Tengah","Jawa Timur"];
function escapeHTML(x){return String(x==null?"":x).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function num(n){return Number(n||0).toLocaleString("id-ID")}
function pad(n){return String(n).padStart(3,"0")}
function getOrg(name){return orgs.find(function(o){return o.name===name})||null}
function getNetwork(id){return networks.find(function(n){return n.id===id})||networks[0]}
function cancer(c){
 var name=String(c.tumor||"").toLowerCase();
 if(name.indexOf("payudara")>=0)return types[0];
 if(name.indexOf("kolorektal")>=0)return types[1];
 if(name.indexOf("paru")>=0)return types[2];
 if(name.indexOf("serviks")>=0)return types[3];
 if(name.indexOf("limfoma")>=0)return types[4];
 if(name.indexOf("prostat")>=0)return types[5];
 if(name.indexOf("hati")>=0)return types[6];
 return {group:"Belum diketahui",site:c.topo||"Belum diketahui",siteLabel:"Lokus belum diketahui"};
}
function extendCases(cards){
 if(cards.some(function(c){return c.id==="REG-2026-01000"}))return cards;
 var reportOrgs=orgs.filter(function(o){return !o.noReports});
 for(var i=0;i<49;i++){
   var org=reportOrgs[(i*7+Math.floor(i/11))%reportOrgs.length];
   var type=types[(i*3+Math.floor(i/9))%types.length];
   var status=["DRAFT","RETURNED_TO_FASKES","INTERNAL_VERIFICATION_PENDING","REGIONAL_REVIEW","NATIONAL_REVIEW","FINAL_LOCKED","FINAL_LOCKED"][i%7];
   var year=i%11===0?2025:2026,month=String((i%8)+1).padStart(2,"0"),day=String((i%26)+1).padStart(2,"0");
   var patient=i===23?"P-000131":"P-"+String(2000+i).padStart(6,"0");
   var id="REG-"+year+"-"+String(1000+i).padStart(5,"0");
   cards.push({id:id,patient:patient,org:org.name,region:org.province,tumor:type.tumor,icd:type.icd,topo:type.site,morph:type.morph,stage:i%9===0?"UNKNOWN":["I","II","III","IV"][i%4],date:year+"-"+month+"-"+day,status:status,completeness:68+i%33,primary:"TUM-"+pad(i+6),episode:"EOC-DEMO-"+String(1000+i),timeline:["Kasus sintetis registri dibuat"]});
 }
 cards.forEach(function(c){
   if(!Object.prototype.hasOwnProperty.call(c,"submittedAt"))c.submittedAt=c.status==="DRAFT"?null:offsetDate(c.date,14);
   if(!Object.prototype.hasOwnProperty.call(c,"finalAt"))c.finalAt=c.status==="FINAL_LOCKED"?offsetDate(c.date,45):null;
 });
 return cards;
}
function offsetDate(date,days){var value=new Date(String(date)+"T00:00:00Z");return Number.isNaN(value.getTime())?null:new Date(value.getTime()+days*86400000).toISOString().slice(0,10)}
var initialFilters={year:"2026",basis:"diagnosis",province:"",org:"",group:"",site:"",status:"",stage:"",facilityStatus:"",unit:"tumor"};
function freshFilters(){return JSON.parse(JSON.stringify(initialFilters))}
var state={network:"NW-A",filters:freshFilters(),history:[],caseId:null};
function reset(){state.network="NW-A";state.filters=freshFilters();state.history=[];state.caseId=null}
function setNetwork(id){if(!getNetwork(id)||!networks.some(function(n){return n.id===id}))return;state.network=id;state.filters=freshFilters();state.history=[];state.caseId=null}
function scopeOrganizations(role,selectedOrg){if(role==="wilayah")return orgs.filter(function(o){return o.network===state.network});if(role==="nasional")return orgs.slice();if(role==="daerah"){var o=getOrg(selectedOrg);return orgs.filter(function(r){return o&&r.province===o.province})}return orgs.filter(function(o){return o.name===selectedOrg})}
function scopedCases(cards,role,selectedOrg){var names=new Set(scopeOrganizations(role,selectedOrg).map(function(o){return o.name}));return cards.filter(function(c){return names.has(c.org)})}
function periodDate(c,basis){return basis==="submission"?c.submittedAt:basis==="finalization"?c.finalAt:c.date}
function withinYear(c,f){var date=periodDate(c,f.basis);return !!date&&(!f.year||String(date).slice(0,4)===f.year)}
function stageCategory(x){var v=String(x||"").toUpperCase();return v.indexOf("IV")===0?"IV":v.indexOf("III")===0?"III":v.indexOf("II")===0?"II":v.indexOf("I")===0?"I":"UNKNOWN"}
function facilityState(cards,name,year){var period=cards.filter(function(c){return c.org===name&&c.submittedAt&&(!year||c.submittedAt.slice(0,4)===year)});return {reported:period.length>0,followup:cards.some(function(c){return c.org===name&&["RETURNED_TO_FASKES","INTERNAL_RETURNED"].includes(c.status)&&(!year||c.date.slice(0,4)===year)})}}
function eligibleFacility(cards,name,value,year){var s=facilityState(cards,name,year);return !value||(value==="reported"&&s.reported)||(value==="unreported"&&!s.reported)||(value==="followup"&&s.followup)}
function filterCases(cards,role,selectedOrg,except){var f=state.filters;return scopedCases(cards,role,selectedOrg).filter(function(c){
var org=getOrg(c.org),t=cancer(c),ex=except||{};
if(!withinYear(c,f))return false;
if(f.province&&!ex.province&&(!org||org.province!==f.province))return false;
if(f.org&&!ex.org&&c.org!==f.org)return false;
if(f.group&&!ex.group&&t.group!==f.group)return false;
if(f.site&&!ex.site&&t.site!==f.site)return false;
if(f.status&&!ex.status&&c.status!==f.status)return false;
if(f.stage&&!ex.stage&&stageCategory(c.stage)!==f.stage)return false;
if(f.facilityStatus&&!ex.facilityStatus&&!eligibleFacility(cards,c.org,f.facilityStatus,f.year))return false;
return true})}
function uniqueCount(cards,unit){return new Set(cards.map(function(c){return unit==="patient"?c.patient:c.primary})).size}
function count(cards){return uniqueCount(cards,state.filters.unit)}
function casesForOrgs(cards,orgList){var names=new Set(orgList.map(function(o){return o.name}));return cards.filter(function(c){return names.has(c.org)})}
function groupCounts(cards,key){var m={};cards.forEach(function(c){var k=key(c);(m[k]||(m[k]=[])).push(c)});return Object.keys(m).map(function(k){return {key:k,cases:m[k],count:count(m[k])}}).sort(function(a,b){return b.count-a.count||a.key.localeCompare(b.key)})}
function statusLabel(s){return {DRAFT:"Draf",RETURNED_TO_FASKES:"Perlu perbaikan",INTERNAL_RETURNED:"Dikembalikan RS",INTERNAL_VERIFICATION_PENDING:"Verifikasi RS",REGIONAL_REVIEW:"Review daerah",NATIONAL_REVIEW:"Review nasional",FINAL_LOCKED:"Final"}[s]||s}
function toolAction(kind,val){return kind+":"+encodeURIComponent(String(val))}
function btn(label,action,css,disabled){return '<button type="button" class="reg-btn '+(css||"")+'" data-reg-action="'+escapeHTML(action)+'"'+(disabled?' disabled':'')+'>'+escapeHTML(label)+'</button>'}
function badge(x){return '<span class="reg-pill">'+escapeHTML(x)+'</span>'}
function filterOptions(items,value,placeholder){return '<option value="">'+escapeHTML(placeholder)+'</option>'+items.map(function(v){var label=typeof v==="string"?v:v.label,k=typeof v==="string"?v:v.value;return '<option value="'+escapeHTML(k)+'"'+(String(k)===String(value)?' selected':'')+'>'+escapeHTML(label)+'</option>'}).join("")}
function select(name,label,options,value,allLabel){return '<label class="reg-filter"><span>'+escapeHTML(label)+'</span><select data-reg-filter="'+name+'">'+filterOptions(options,value,allLabel||"Semua")+'</select></label>'}
function currentOrgs(role,selectedOrg,cards){var f=state.filters;return scopeOrganizations(role,selectedOrg).filter(function(o){return !f.province||o.province===f.province}).filter(function(o){return !f.org||o.name===f.org}).filter(function(o){return eligibleFacility(cards,o.name,f.facilityStatus,f.year)})}
function filterBar(cards,role,selectedOrg){
 var os=scopeOrganizations(role,selectedOrg),prov=Array.from(new Set(os.map(function(o){return o.province}))),groups=Array.from(new Set(scopedCases(cards,role,selectedOrg).map(function(c){return cancer(c).group}))).sort();
 var sites=Array.from(new Map(scopedCases(cards,role,selectedOrg).filter(function(c){return !state.filters.group||cancer(c).group===state.filters.group}).map(function(c){return [cancer(c).site,{value:cancer(c).site,label:cancer(c).site+" · "+cancer(c).siteLabel}]})).values());
 return '<div class="reg-filter-panel"><div class="reg-filter-grid">'+select("basis","Dasar periode",[{value:"diagnosis",label:"Tanggal diagnosis"},{value:"submission",label:"Tanggal submit"},{value:"finalization",label:"Tanggal finalisasi"}],state.filters.basis,"Pilih dasar")+select("year","Tahun periode",["2026","2025","2024"],state.filters.year,"Semua tahun")+select("province","Lokasi faskes",prov,state.filters.province,"Semua wilayah")+select("org","Faskes binaan",os.filter(function(o){return !state.filters.province||o.province===state.filters.province}).map(function(o){return o.name}),state.filters.org,"Semua faskes")+select("group","Jenis kanker",groups,state.filters.group,"Semua jenis")+select("site","Lokus / topografi",sites,state.filters.site,"Semua lokus")+select("facilityStatus","Pelaporan faskes",[{value:"reported",label:"Sudah melapor"},{value:"unreported",label:"Belum melapor"},{value:"followup",label:"Perlu tindak lanjut"}],state.filters.facilityStatus,"Semua faskes")+select("status","Status",["DRAFT","RETURNED_TO_FASKES","INTERNAL_VERIFICATION_PENDING","REGIONAL_REVIEW","NATIONAL_REVIEW","FINAL_LOCKED"].map(function(s){return {value:s,label:statusLabel(s)}}),state.filters.status,"Semua status")+select("unit","Unit hitung",[{value:"tumor",label:"Tumor primer"},{value:"patient",label:"Pasien unik"}],state.filters.unit,"Unit hitung")+'</div><div class="reg-filter-footer"><span>Data simulasi · basis '+(state.filters.basis==="submission"?"tanggal submit":state.filters.basis==="finalization"?"tanggal finalisasi":"tanggal diagnosis")+' · lokasi faskes pelapor, bukan domisili pasien</span>'+btn("Hapus Filter","clear","outline")+'</div></div>'
}
function topKpis(cards,role,selectedOrg){
 var orgList=currentOrgs(role,selectedOrg,cards),filtered=filterCases(cards,role,selectedOrg);
 var rep=new Set(scopedCases(cards,role,selectedOrg).filter(function(c){return c.submittedAt&&(!state.filters.year||c.submittedAt.slice(0,4)===state.filters.year)}).map(function(c){return c.org}));
 var casesStatus=filtered.filter(function(c){return ["RETURNED_TO_FASKES","INTERNAL_RETURNED"].includes(c.status)});
 var out=[["Faskes binaan",orgList.length,"Dalam jejaring pengampu"],["Faskes melapor",orgList.filter(function(o){return rep.has(o.name)}).length,"Pernah submit (contoh)"],["Tumor primer",uniqueCount(filtered,"tumor"),"Sesuai filter"],["Pasien unik",uniqueCount(filtered,"patient"),"Tidak sama dengan tumor"],["Perlu koreksi",uniqueCount(casesStatus,"tumor"),"Status dikembalikan"],["Kasus final",uniqueCount(filtered.filter(function(c){return c.status==="FINAL_LOCKED"}),"tumor"),"Bukan angka insidensi PBCR"]];
 return '<div class="reg-kpis">'+out.map(function(x){return '<div class="reg-kpi"><span>'+escapeHTML(x[0])+'</span><strong>'+num(x[1])+'</strong><small>'+escapeHTML(x[2])+'</small></div>'}).join("")+'</div>';
}
function regionShape(d,x,y,w,h,fill){return '<g data-reg-action="'+toolAction("province",d)+'" role="button" tabindex="0" aria-label="Tampilkan faskes wilayah '+escapeHTML(d)+'" class="reg-map-region"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="20" fill="'+fill+'" stroke="#ffffff" stroke-width="4"/><text x="'+(x+w/2)+'" y="'+(y+25)+'" text-anchor="middle" class="reg-map-label">'+escapeHTML(d)+'</text></g>'}
function mapPanel(cards,role,selectedOrg){
 var f=state.filters,base=filterCases(cards,role,selectedOrg,{province:true,org:true}),mapOrgs=currentOrgs(role,selectedOrg,cards);
 var blocks=[["DKI Jakarta",90,40,125,56,"#98d9d3"],["Jawa Barat",170,108,230,105,"#6dc3b7"],["Jawa Tengah",404,117,218,104,"#4da7b1"],["Jawa Timur",626,122,214,111,"#83abc8"]];
 var counts=groupCounts(base,function(c){return getOrg(c.org).province}),by={};counts.forEach(function(x){by[x.key]=x.count});
 return '<section class="reg-panel"><div class="reg-panel-head"><div><h3>Peta Sebaran Kasus</h3><p>Menurut provinsi lokasi faskes binaan</p></div>'+badge("Diagram ilustratif")+'</div><svg class="reg-map-svg" viewBox="0 0 910 290" role="img" aria-label="Diagram sebaran kasus di provinsi contoh">'+blocks.map(function(b){var name=b[0],active=!f.province||f.province===name;return '<g opacity="'+(active?1:.42)+'">'+regionShape(name,b[1],b[2],b[3],b[4],b[5])+'<text x="'+(b[1]+b[3]/2)+'" y="'+(b[2]+52)+'" text-anchor="middle" class="reg-map-count">'+num(by[name]||0)+' kasus</text></g>'}).join("")+mapOrgs.filter(function(o){return !f.province||o.province===f.province}).map(function(o){return '<g data-reg-action="'+toolAction("org",o.name)+'" role="button" tabindex="0" aria-label="Lihat '+escapeHTML(o.name)+'" class="reg-map-point"><circle cx="'+o.x+'" cy="'+o.y+'" r="7" fill="#143958" stroke="white" stroke-width="3"/><title>'+escapeHTML(o.name)+'</title></g>'}).join("")+'</svg><p class="reg-note">Ilustrasi letak relatif provinsi dan titik faskes sintetis — bukan batas administrasi, koordinat RS atau peta domisili pasien yang presisi. Klik wilayah/titik untuk drill-down.</p></section>';
}
function barPanel(cards,role,selectedOrg){
 var grouped=groupCounts(filterCases(cards,role,selectedOrg,{group:true,site:true}),function(c){return cancer(c).group});
 var max=Math.max(1,...grouped.map(function(x){return x.count}));
 return '<section class="reg-panel"><div class="reg-panel-head"><div><h3>Kasus per Jenis Kanker</h3><p>Klik jenis kanker untuk rincian lokus</p></div>'+badge(state.filters.unit==="patient"?"Pasien unik":"Tumor primer")+'</div><div class="reg-bars">'+(grouped.length?grouped.map(function(x){return '<button type="button" class="reg-bar-row" data-reg-action="'+toolAction("group",x.key)+'"><span>'+escapeHTML(x.key)+'</span><div class="reg-bar-track"><div class="reg-bar-value" style="width:'+Math.max(3,Math.round(x.count/max*100))+'%"></div></div><strong>'+num(x.count)+'</strong></button>'}).join(""):'<p class="reg-empty">Belum ada kasus pada filter ini.</p>')+'</div><p class="reg-note">Kategori menurut contoh diagnosis/topografi; kode resmi dan definisinya perlu divalidasi sebelum produksi.</p></section>';
}
function orgRows(cards,role,selectedOrg){
 var orgList=currentOrgs(role,selectedOrg,cards),current=filterCases(cards,role,selectedOrg);
 return orgList.map(function(o){
 var cases=current.filter(function(c){return c.org===o.name});
 var reported=scopedCases(cards,role,selectedOrg).some(function(c){return c.org===o.name&&c.submittedAt&&(!state.filters.year||c.submittedAt.slice(0,4)===state.filters.year)}),final=cases.filter(function(c){return c.status==="FINAL_LOCKED"}),pending=cases.filter(function(c){return c.status!=="FINAL_LOCKED"}),returned=cases.filter(function(c){return ["RETURNED_TO_FASKES","INTERNAL_RETURNED"].includes(c.status)});
 return {org:o,cases:cases,total:count(cases),final:uniqueCount(final,"tumor"),pending:uniqueCount(pending,"tumor"),returned:uniqueCount(returned,"tumor"),reported:reported}
 })}
function facilityPanel(cards,role,selectedOrg){
 var rows=orgRows(cards,role,selectedOrg),f=state.filters;
 return '<section class="reg-panel"><div class="reg-panel-head"><div><h3>Faskes Binaan</h3><p>Termasuk faskes yang belum memiliki submission pada tahun terpilih</p></div>'+badge(rows.length+" faskes")+'</div><div class="reg-table-wrap"><table class="reg-table"><thead><tr><th>Faskes</th><th>Wilayah</th><th>Kasus terpilih</th><th>Final</th><th>Perlu tindak lanjut</th><th>Pelaporan</th><th></th></tr></thead><tbody>'+rows.map(function(r){return '<tr><td><strong>'+escapeHTML(r.org.name)+'</strong><small>'+escapeHTML(r.org.id)+'</small></td><td>'+escapeHTML(r.org.district)+', '+escapeHTML(r.org.province)+'</td><td>'+num(r.total)+'</td><td>'+num(r.final)+'</td><td>'+num(r.returned)+'</td><td>'+badge(r.reported?"Sudah melapor":"Belum melapor")+'</td><td>'+btn("Lihat kasus",toolAction("org",r.org.name),"outline")+'</td></tr>'}).join("")+'</tbody></table></div><p class="reg-note">"Belum melapor" = tidak ada submission registri pada periode contoh; tidak berarti tidak memiliki pasien kanker. Total kasus mengikuti filter aktif ('+escapeHTML(f.unit==="patient"?"pasien unik":"tumor primer")+').</p></section>';
}
function progressPanel(cards,role,selectedOrg){
 var base=filterCases(cards,role,selectedOrg,{status:true}),stats=[
 ["Draf","DRAFT"],["Verifikasi RS","INTERNAL_VERIFICATION_PENDING"],["Review daerah","REGIONAL_REVIEW"],["Review nasional","NATIONAL_REVIEW"],["Dikembalikan","RETURNED_TO_FASKES"],["Dikembalikan RS","INTERNAL_RETURNED"],["Registrasi final","FINAL_LOCKED"]];
 return '<section class="reg-panel"><div class="reg-panel-head"><div><h3>Progres Registrasi</h3><p>Pantau antrean; pengampu tidak melakukan ACC/return</p></div></div><div class="reg-progress">'+stats.map(function(x){var n=uniqueCount(base.filter(function(c){return c.status===x[1]}),"tumor");return '<button type="button" data-reg-action="'+toolAction("status",x[1])+'" class="reg-progress-item"><strong>'+num(n)+'</strong><span>'+escapeHTML(x[0])+'</span></button>'}).join("")+'</div></section>';
}
function sitePanel(cards,role,selectedOrg){
 var base=filterCases(cards,role,selectedOrg,{site:true}),ls=groupCounts(base,function(c){return cancer(c).site}),max=Math.max(1,...ls.map(function(x){return x.count}));
 return '<section class="reg-panel"><div class="reg-panel-head"><div><h3>Lokus / Topografi</h3><p>'+escapeHTML(state.filters.group||"Semua jenis kanker")+' · klik untuk daftar kasus</p></div></div>'+(ls.length?ls.map(function(x){return '<button type="button" class="reg-bar-row" data-reg-action="'+toolAction("site",x.key)+'"><span>'+escapeHTML(x.key)+' · '+escapeHTML(cancer(x.cases[0]).siteLabel)+'</span><div class="reg-bar-track"><div class="reg-bar-value" style="width:'+Math.max(3,Math.round(x.count/max*100))+'%"></div></div><strong>'+num(x.count)+'</strong></button>'}).join(""):'<p class="reg-empty">Tidak ada lokus untuk kombinasi filter.</p>')+'</section>';
}
function caseRows(cards,role,selectedOrg){
 var records=filterCases(cards,role,selectedOrg).slice().sort(function(a,b){return b.date.localeCompare(a.date)});
 return '<section class="reg-panel"><div class="reg-panel-head"><div><h3>Daftar Kasus Terpilih</h3><p>Ringkasan administratif tanpa data identitas pasien</p></div>'+badge(uniqueCount(records,state.filters.unit)+" "+(state.filters.unit==="patient"?"pasien":"tumor primer"))+'</div><div class="reg-table-wrap"><table class="reg-table"><thead><tr><th>Nomor kasus</th><th>Faskes</th><th>Jenis kanker</th><th>Lokus</th><th>Diagnosis</th><th>Status</th><th></th></tr></thead><tbody>'+records.map(function(c){return '<tr><td><strong>'+escapeHTML(c.id)+'</strong></td><td>'+escapeHTML(c.org)+'</td><td>'+escapeHTML(cancer(c).group)+'</td><td>'+escapeHTML(cancer(c).site)+'</td><td>'+escapeHTML(c.date)+'</td><td>'+badge(statusLabel(c.status))+'</td><td>'+btn("Ringkasan",toolAction("case",c.id),"outline")+'</td></tr>'}).join("")+'</tbody></table></div>'+(records.length?'':'<p class="reg-empty">Belum ada kasus pada pilihan ini.</p>')+'</section>';
}
function caseDetail(cards,role,selectedOrg){
 if(!state.caseId)return "";
 var c=filterCases(cards,role,selectedOrg).find(function(x){return x.id===state.caseId});
 if(!c)return '<div class="reg-panel"><p>Ringkasan kasus tidak tersedia pada filter atau cakupan ini.</p>'+btn("Tutup","closecase","outline")+'</div>';
 return '<section class="reg-panel reg-detail"><div class="reg-panel-head"><div><h3>Ringkasan Kasus '+escapeHTML(c.id)+'</h3><p>Informasi terbatas untuk monitoring jejaring</p></div>'+btn("Tutup Ringkasan","closecase","outline")+'</div><div class="reg-detail-grid">'+[["Faskes",c.org],["Wilayah faskes",getOrg(c.org).province],["Jenis kanker",cancer(c).group],["Lokus/topografi",cancer(c).site],["Stadium tercatat",c.stage],["Tanggal diagnosis contoh",c.date],["Status",statusLabel(c.status)]].map(function(x){return '<div><span>'+escapeHTML(x[0])+'</span><strong>'+escapeHTML(x[1])+'</strong></div>'}).join("")+'</div><p class="reg-note">Tidak menampilkan NIK, identitas pasien atau catatan klinis rinci. Pengampu Wilayah tidak memiliki tombol ubah data maupun setujui kasus.</p></section>';
}
function trendsPanel(cards,role,selectedOrg){
 var year=state.filters.year||"2026",basis=state.filters.basis,list=filterCases(cards,role,selectedOrg).filter(function(c){return periodDate(c,basis)&&periodDate(c,basis).slice(0,4)===year}),counts=Array.from({length:12},function(_,i){return uniqueCount(list.filter(function(c){return Number(periodDate(c,basis).slice(5,7))===i+1}),"tumor")}),max=Math.max(1,...counts);
 return '<section class="reg-panel"><div class="reg-panel-head"><div><h3>Tren Registrasi</h3><p>'+escapeHTML(year)+' · '+escapeHTML(basis==="submission"?"tanggal submit":basis==="finalization"?"tanggal finalisasi":"tanggal diagnosis")+' · jumlah tumor primer per bulan</p></div></div><div class="reg-trend">'+counts.map(function(n,i){return '<div title="'+(i+1)+': '+n+' kasus"><span style="height:'+Math.max(4,Math.round(n/max*93))+'%"></span><small>'+String(i+1)+'</small></div>'}).join("")+'</div></section>';
}
function stagePanel(cards,role,selectedOrg){
 var ls=groupCounts(filterCases(cards,role,selectedOrg,{stage:true}),function(c){var s=stageCategory(c.stage);return s==="UNKNOWN"?"Belum diketahui":s});
 return '<section class="reg-panel"><div class="reg-panel-head"><div><h3>Stadium Tercatat</h3><p>Informasi stadium contoh; tidak dihitung dari TNM otomatis</p></div></div><div class="reg-progress">'+ls.map(function(x){return '<button type="button" class="reg-progress-item" data-reg-action="'+toolAction("stage",x.key==="Belum diketahui"?"UNKNOWN":x.key)+'"><strong>'+num(x.count)+'</strong><span>'+escapeHTML(x.key)+'</span></button>'}).join("")+'</div></section>';
}
function breadcrumbs(){
 var f=state.filters,parts=[];
 [["province","Wilayah"],["group","Jenis kanker"],["site","Lokus"],["org","Faskes"],["status","Status"],["stage","Stadium"],["facilityStatus","Pelaporan"]].forEach(function(pair){if(f[pair[0]])parts.push(pair[1]+": "+(pair[0]==="status"?statusLabel(f[pair[0]]):f[pair[0]]))});
 return '<div class="reg-crumb"><strong>Jejaring</strong>'+(parts.length?' <span>› '+parts.map(escapeHTML).join(" › ")+'</span>':' <span>› Semua faskes binaan</span>')+(state.history.length?btn("Kembali","back","outline"):"")+'</div>';
}
function drillPanel(cards,role,selectedOrg){
 var f=state.filters;
 return '<div class="reg-drill">'+breadcrumbs()+caseDetail(cards,role,selectedOrg)+(f.org||f.status||f.stage?caseRows(cards,role,selectedOrg):f.site?facilityPanel(cards,role,selectedOrg):f.group?sitePanel(cards,role,selectedOrg):f.province?facilityPanel(cards,role,selectedOrg):'<p class="reg-note">Pilih wilayah pada peta, kelompok kanker pada grafik, atau faskes binaan untuk menampilkan rincian.</p>')+'</div>';
}
function header(role){
 return '<div class="reg-head"><div><div class="reg-eyebrow">'+escapeHTML(role==="wilayah"?"PENGAMPU WILAYAH":"ANALITIK NASIONAL")+' · REGNAS</div><h1>Dashboard Jejaring Pengampuan Kanker</h1><p>'+escapeHTML(role==="wilayah"?getNetwork(state.network).name:"Cakupan nasional (contoh)")+' · Data sintetis, tanpa pelaporan riil</p></div>'+badge("DATA SIMULASI")+'</div>'
}
function content(page,cards,role,selectedOrg){
 var top=header(role)+filterBar(cards,role,selectedOrg),kpis=topKpis(cards,role,selectedOrg);
 if(page==="dashboard"||page==="regional-map")return top+kpis+'<div class="reg-layout">'+mapPanel(cards,role,selectedOrg)+barPanel(cards,role,selectedOrg)+'</div>'+drillPanel(cards,role,selectedOrg)+'<div class="reg-layout">'+facilityPanel(cards,role,selectedOrg)+progressPanel(cards,role,selectedOrg)+'</div><div class="reg-layout">'+trendsPanel(cards,role,selectedOrg)+stagePanel(cards,role,selectedOrg)+'</div>'+footnote();
 if(page==="regional-cancer")return top+kpis+'<div class="reg-layout">'+barPanel(cards,role,selectedOrg)+sitePanel(cards,role,selectedOrg)+'</div>'+drillPanel(cards,role,selectedOrg)+stagePanel(cards,role,selectedOrg)+footnote();
 if(page==="regional-facilities")return top+kpis+facilityPanel(cards,role,selectedOrg)+drillPanel(cards,role,selectedOrg)+footnote();
 if(page==="regional-progress")return top+kpis+progressPanel(cards,role,selectedOrg)+drillPanel(cards,role,selectedOrg)+trendsPanel(cards,role,selectedOrg)+footnote();
 if(page==="cases")return top+caseRows(cards,role,selectedOrg)+caseDetail(cards,role,selectedOrg)+footnote();
 return top;
}
function footnote(){return '<p class="reg-footnote">METADATA · Jenis: monitoring registri berbasis faskes (HBCR, ilustrasi) · Basis: '+escapeHTML(state.filters.basis==="submission"?"tanggal submit":state.filters.basis==="finalization"?"tanggal finalisasi":"tanggal diagnosis")+' · Unit: '+escapeHTML(state.filters.unit==="patient"?"pasien unik":"tumor primer")+' · As-of: 18 November 2026 (dataset demo) · Versi: DEMO-1 · Seluruh angka adalah simulasi, bukan estimasi insidensi populasi.</p>'}
function remember(){state.history.push({filters:JSON.parse(JSON.stringify(state.filters)),caseId:state.caseId});if(state.history.length>16)state.history.shift()}
function action(a){if(a==="back"){var prev=state.history.pop();if(prev){state.filters=prev.filters;state.caseId=prev.caseId}return}
 if(a==="clear"){state.filters=freshFilters();state.history=[];state.caseId=null;return}
 if(a==="closecase"){state.caseId=null;return}
 var index=a.indexOf(":"),type=index<0?a:a.slice(0,index),value=index<0?"":decodeURIComponent(a.slice(index+1));
 if(type==="case"){state.caseId=value;return}
 if(["province","org","group","site","status","stage"].includes(type)){remember();state.caseId=null;state.filters[type]=state.filters[type]===value?"":value;
   if(type==="province")state.filters.org="";
   if(type==="group")state.filters.site="";
 }
}
function setFilter(name,value){if(!(name in state.filters))return;state.filters[name]=value;state.caseId=null;state.history=[];if(name==="province"||name==="facilityStatus")state.filters.org="";if(name==="group")state.filters.site=""}
function bind(container,render){if(!container||!container.querySelectorAll)return;
 container.querySelectorAll("[data-reg-action]").forEach(function(el){var run=function(){action(el.getAttribute("data-reg-action"));render()};el.onclick=run;el.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();run()}}});
 container.querySelectorAll("[data-reg-filter]").forEach(function(el){el.onchange=function(){setFilter(el.getAttribute("data-reg-filter"),el.value);render()}})
}
root.RegnasRegional={extendCases:extendCases,orgs:orgs,networks:networks,types:types,state:state,reset:reset,setNetwork:setNetwork,scopeOrganizations:scopeOrganizations,scopedCases:scopedCases,filterCases:filterCases,uniqueCount:uniqueCount,count:count,groupCounts:groupCounts,cancer:cancer,getOrg:getOrg,getNetwork:getNetwork,content:content,action:action,setFilter:setFilter,bind:bind,statusLabel:statusLabel};
})(window);