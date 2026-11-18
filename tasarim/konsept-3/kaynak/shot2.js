const {chromium,open}=require('/home/user/trader_cat/araclar/qa/lib.js');const D0='/tmp/claude-0/-home-user-trader-cat/a538f2c1-40e5-543b-bf48-f5168a138070/scratchpad/k3priv/';
(async()=>{const b=await chromium.launch();
const p=await open(b,{q:'?nomenu',lang:'en',ctx:{viewport:{width:844,height:390},isMobile:true,hasTouch:true}});
await p.evaluate(()=>{S.fix=1;S.introDone=1;S.hintOff=1;S.cash=D(5000000);S.rob=1;for(let i=0;i<5;i++)S.open[i]=1;S.spc=1;S.auto=1;save();G.ci=4;ready();ui()});await p.waitForTimeout(600);
await p.evaluate(()=>{const s=document.querySelector('#list');s.scrollTop=s.scrollHeight;const h=document.querySelector('#shop');h.scrollTop=420});await p.waitForTimeout(300);
await p.screenshot({path:D0+'tel_en.png'});console.log(p.errs.join('\n'));await b.close()})();
