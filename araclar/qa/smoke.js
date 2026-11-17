// Kullanım: node smoke.js   (tek komut: testler + konsol hataları + kayıt/eski kayıt/ses + TR/EN taşma taraması + ekran görüntüleri)
const {chromium,open,play,DIR}=require('./lib');
const R=[];const add=(n,ok,d)=>{R.push([n,ok,d||'']);console.log((ok?'GEÇTİ ':'KALDI ')+n+(d?' :: '+d:''))};
const OVF=()=>{const o=[];document.querySelectorAll('body *').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height)return;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none')return;
 if(e.tagName==='CANVAS'||e.children.length||!e.childNodes.length)return;if(!/\S/.test(e.textContent))return;
 if(e.scrollWidth>e.clientWidth+1&&e.clientWidth>0&&!e.classList.contains('info')&&!['scroll','auto'].includes(cs.overflowX))o.push((e.id?'#'+e.id:e.tagName+'.'+String(e.className).slice(0,25))+' '+e.scrollWidth+'>'+e.clientWidth+' "'+e.textContent.trim().slice(0,30)+'"')});
 return o.slice(0,15)};
const TR=/[çğıöşüÇĞİÖŞÜ]/;
(async()=>{const b=await chromium.launch();
 // 1) yükleme + testler
 let p=await open(b,{});add('Sayfa yüklenirken konsol hatası yok',p.errs.length===0,p.errs.join(' | '));
 const t=await p.evaluate(()=>{const o={};for(const f of ['runTradeTests','runBobbyTests','runBobbyE2E']){try{o[f]=window[f]().ok}catch(e){o[f]='EXC '+e.message}}try{const r=runRobotE2E(16,1);o.runRobotE2E=r&&r['Formül doğru']&&r['Tur toplamı = nakit değişimi']}catch(e){o.runRobotE2E='EXC '+e.message}return o});
 for(const k in t)add(k,t[k]===true,String(t[k]));
 // 2) menü + oyuna geçiş, para kaydı, ses, yenileme
 await play(p);
 await p.evaluate(()=>{S.fix=1;S.cash=D(1234);S.rob=1;S.set.snd=0;S.set.mus=0;save()});
 await p.reload();await p.waitForTimeout(1200);
 const r=await p.evaluate(()=>({cash:String(S.cash),snd:S.set.snd,mus:S.set.mus,rob:S.rob,fix:S.fix}));
 add('Yenileme sonrası para/ilerleme korunuyor',r.cash==='12340000'&&r.rob===1&&r.fix===1,JSON.stringify(r));
 add('Ses/müzik kapalı ayarı kayıttan sonra korunuyor',r.snd===0&&r.mus===0,JSON.stringify(r));
 // 3) eski kayıt benzetimi
 const keys=['rb','rl','rlv','set','hist','co','open','cl','ll','tc','tcOn','al','bc','bl','en','enT','rev','tot','lc','stp','view','robOn','autoOn'];
 for(const k of keys){const q=await open(b,{});await q.evaluate(()=>{S.fix=1;S.cash=D(50);save()});
  await q.evaluate(k=>{const j=JSON.parse(localStorage.getItem('trading-idle-save'));delete j[k];localStorage.setItem('trading-idle-save',JSON.stringify(j))},k);
  await q.reload();await q.waitForTimeout(900);await play(q);await q.waitForTimeout(500);
  const ok=await q.evaluate(()=>typeof S==='object'&&S.cash!==undefined&&Array.isArray(S.open)&&Array.isArray(S.rb)&&S.set&&Array.isArray(S.co)&&Array.isArray(S.hist));
  add('Eski kayıt: alan silindi -> '+k,ok&&q.errs.length===0,q.errs.slice(0,2).join(' | '));await q.context().close()}
 await p.context().close();
 // 4) ekran boyutları x dil: taşma + çevrilmemiş metin + ekran görüntüsü
 const VP=[['1440x900',{viewport:{width:1440,height:900}}],['1024x640',{viewport:{width:1024,height:640}}],['844x390',{viewport:{width:844,height:390},isMobile:true,hasTouch:true}],['667x375',{viewport:{width:667,height:375},isMobile:true,hasTouch:true}]];
 for(const [n,ctx] of (process.env.QUICK?[]:VP))for(const lang of ['tr','en']){
  const q=await open(b,{ctx,lang,q:'?nomenu'});const tag=n+'-'+lang;
  await q.screenshot({path:DIR+'/smoke_'+tag+'_menu.png'});
  await q.evaluate(()=>menuHide());await q.waitForTimeout(500);
  await q.evaluate(()=>{S.fix=1;S.cash=D(200000);S.rob=1;S.open[0]=1;S.open[1]=1;S.open[2]=1;S.spc=1;save();ui()});await q.waitForTimeout(600);
  await q.screenshot({path:DIR+'/smoke_'+tag+'_main.png'});
  const o1=await q.evaluate(OVF);add('Taşma ana ekran '+tag,o1.length===0,o1.join(' ; '));
  await q.evaluate(()=>{setView&&setView('auto')});await q.waitForTimeout(500);await q.screenshot({path:DIR+'/smoke_'+tag+'_auto.png'});
  const o2=await q.evaluate(OVF);add('Taşma otomasyon '+tag,o2.length===0,o2.join(' ; '));
  await q.evaluate(()=>{setView('main');G.mod='s';renderMod()});await q.waitForTimeout(400);await q.screenshot({path:DIR+'/smoke_'+tag+'_settings.png'});
  const o3=await q.evaluate(OVF);add('Taşma ayarlar '+tag,o3.length===0,o3.join(' ; '));
  if(lang==='en'&&n==='1440x900'){const txt=await q.evaluate(()=>document.body.innerText.split('\n').filter(s=>/[çğıöşüÇĞİÖŞÜ]/.test(s.replace('Türkçe',''))).slice(0,25));add('EN: Türkçe karakterli kalan metin (ayarlar açık)',txt.length===0,txt.join(' | '))}
  add('Konsol hatası '+tag,q.errs.length===0,q.errs.slice(0,3).join(' | '));await q.context().close()}
 await b.close();
 const f=R.filter(x=>!x[1]);console.log('\nÖZET: '+(R.length-f.length)+'/'+R.length+' geçti; kalan: '+f.length);f.forEach(x=>console.log(' - '+x[0]+' :: '+x[2]));
})();
