// Standart ekran görüntüsü seti -> docs/tasarim/son/   Kullanım: node araclar/qa/goruntu.js
const fs=require('fs'),path=require('path');
const {chromium,open,sleep,dismissSil}=require('./lib');
const OUT=path.join(__dirname,'..','..','docs','tasarim','son');
fs.mkdirSync(OUT,{recursive:true});
const INJ=()=>{S.fix=1;S.introDone=1;S.hintOff=1;S.cash=D(150);S.rob=1;S.open[0]=1;S.open[1]=1;S.spc=1;save();ui()};
const DESK={},TEL={viewport:{width:844,height:390},isMobile:true,hasTouch:true,deviceScaleFactor:1};
async function clean(p){ // açılış pencereleri/öğretici spotu kapat
  await dismissSil(p).catch(()=>{});
  await p.evaluate(()=>{try{if(window.SIL&&SIL.cur&&SIL.hide)SIL.hide()}catch(e){}G.mod='';renderMod&&renderMod()}).catch(()=>{});
  await p.keyboard.press('Escape').catch(()=>{});await p.waitForTimeout(300);
  await p.evaluate(()=>{const m=document.querySelector('#modal');if(m&&m.classList.contains('on')){const c=document.querySelector('#mc');c&&c.click()}}).catch(()=>{});
  await p.waitForTimeout(300)}
async function ready(b,ctx,lang,q){
  const p=await open(b,{ctx,lang,q:q||'?nomenu'});
  await p.evaluate(INJ);await clean(p);return p}
async function trade(p){
  await p.evaluate(()=>{G.ci=0;ready();start()});await p.waitForTimeout(900);
  await p.evaluate(()=>buy());await p.waitForTimeout(1700);await p.screenshot({path:p._out})}
(async()=>{
  const b=await chromium.launch();const errs=[];
  const shot=async(name,fn)=>{const p=await fn();p._out=path.join(OUT,name+'.png');
    if(!p._custom)await p.screenshot({path:p._out});errs.push(...p.errs.map(e=>name+': '+e));await p.context().close();console.log('ok',name)};
  await shot('desk_tr_ana',()=>ready(b,DESK,'tr'));
  await shot('desk_tr_islem',async()=>{const p=await ready(b,DESK,'tr');p._out=path.join(OUT,'desk_tr_islem.png');await trade(p);p._custom=1;return p});
  await shot('desk_tr_oto',async()=>{const p=await ready(b,DESK,'tr');await p.evaluate(()=>setView('auto'));await p.waitForTimeout(500);return p});
  await shot('desk_tr_ayar',async()=>{const p=await ready(b,DESK,'tr');await p.evaluate(()=>{G.mod='s';renderMod()});await p.waitForTimeout(400);return p});
  await shot('desk_tr_menu',async()=>{const p=await open(b,{ctx:DESK,lang:'tr',q:''});await p.waitForTimeout(800);return p});
  await shot('desk_en_ana',()=>ready(b,DESK,'en'));
  await shot('tel_tr_ana',()=>ready(b,TEL,'tr'));
  await shot('tel_tr_islem',async()=>{const p=await ready(b,TEL,'tr');p._out=path.join(OUT,'tel_tr_islem.png');await trade(p);p._custom=1;return p});
  await b.close();
  console.log(errs.length?'KONSOL:\n'+errs.join('\n'):'konsol temiz');
})();
