// 4 konseptin aynı ekranlarını 2x2 tabloda birleştirir. Kullanım: node araclar/qa/karsilastir.js <tur-klasoru>
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
const ROOT=path.join(__dirname,'..','..'),OUT=process.argv[2]||path.join(ROOT,'docs/tasarim/tur-1/karsilastirma');
const AD=['1 Gece Arcade','2 Pastel Cozy','3 Tok Mobil','4 Lofi Akşam'];
const EK=[['desk_tr_islem',1440,900],['desk_tr_ana',1440,900],['desk_tr_menu',1440,900],['desk_tr_oto',1440,900],['tel_tr_islem',844,390],['tel_tr_ana',844,390]];
(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch();
for(const [e,w,h] of EK){const s=w>1000?0.5:0.8,W=Math.round(w*s),H=Math.round(h*s);
 const cells=[1,2,3,4].map(i=>`<div class=c><b>${AD[i-1]}</b><img src="file://${ROOT}/tasarim/konsept-${i}/goruntu/${e}.png" style="width:${W}px;height:${H}px"></div>`).join('');
 const html=`<html><body style="margin:0;background:#222;font:bold 18px system-ui;color:#fff"><div style="display:grid;grid-template-columns:repeat(2,${W}px);gap:10px;padding:10px">${cells}</div><style>.c b{display:block;padding:4px 2px}</style></body></html>`;
 const p=await b.newPage({viewport:{width:W*2+30,height:100},deviceScaleFactor:1});const hf=path.join(OUT,'_tmp.html');fs.writeFileSync(hf,html);await p.goto('file://'+hf);await p.waitForTimeout(300);
 await p.screenshot({path:path.join(OUT,e+'.png'),fullPage:true});await p.close()}
fs.rmSync(path.join(OUT,'_tmp.html'),{force:true});await b.close();console.log('ok',OUT)})();
