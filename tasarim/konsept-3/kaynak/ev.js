const {chromium,open}=require('/home/user/trader_cat/araclar/qa/lib.js');
(async()=>{const b=await chromium.launch();const p=await open(b,{q:'?nomenu',lang:process.env.LG||'tr'});
await p.evaluate(()=>{S.fix=1;S.introDone=1;S.hintOff=1;S.cash=D(150);S.rob=1;S.open[0]=1;S.open[1]=1;S.spc=1;save();ui()});await p.waitForTimeout(500);
const r=await p.evaluate(new Function(process.env.JS));console.log(JSON.stringify(r,null,1));console.log(p.errs.join('\n'));await b.close()})();
