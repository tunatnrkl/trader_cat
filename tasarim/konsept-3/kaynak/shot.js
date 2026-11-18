const {chromium,open}=require('/home/user/trader_cat/araclar/qa/lib.js');const D0='/tmp/claude-0/-home-user-trader-cat/a538f2c1-40e5-543b-bf48-f5168a138070/scratchpad/k3priv/';
(async()=>{const b=await chromium.launch();
const p=await open(b,{q:'?nomenu',lang:'tr'});
await p.evaluate(()=>{S.fix=1;S.introDone=1;S.hintOff=1;S.cash=D(5000000);S.rob=1;for(let i=0;i<5;i++)S.open[i]=1;S.spc=1;S.auto=1;save();G.ci=4;G.lev=1;ready();ui()});await p.waitForTimeout(600);
await p.evaluate(()=>{const s=document.querySelector('#shop');s.scrollTop=s.scrollHeight});await p.waitForTimeout(300);
await p.evaluate(()=>{start()});await p.waitForTimeout(700);await p.evaluate(()=>buy());await p.waitForTimeout(1500);
await p.screenshot({path:D0+'boss.png'});
await p.evaluate(()=>{G.mod='i';G.im=1;renderMod()});await p.waitForTimeout(300);await p.screenshot({path:D0+'info.png'});
console.log(p.errs.join('\n'));await b.close()})();
