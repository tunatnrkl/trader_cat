const {chromium}=require('playwright');
const URL='file:///home/user/trader_cat/index.html';
const DIR=__dirname;
async function open(b,opt={}){
  const ctx=await b.newContext(Object.assign({viewport:{width:1440,height:900},deviceScaleFactor:1},opt.ctx||{}));
  if(opt.save!==undefined||opt.lang){await ctx.addInitScript(([s,l,fresh])=>{try{if(s!==undefined&&s!==null&&!sessionStorage.__qa){localStorage.setItem('trading-idle-save',s)}sessionStorage.__qa=1;if(l)localStorage.setItem('ti-lang',l)}catch(e){}},[opt.save===undefined?null:opt.save,opt.lang||null]);}
  const p=await ctx.newPage();p.errs=[];
  p.on('pageerror',e=>p.errs.push('PAGEERR '+e.message));
  p.on('console',m=>{if(['error','warning'].includes(m.type())&&!/AudioContext/.test(m.text()))p.errs.push(m.type()+' '+m.text())});
  p.on('requestfailed',r=>p.errs.push('REQFAIL '+r.url().slice(0,100)));
  await p.goto(URL+(opt.q||''));await p.waitForTimeout(opt.wait||1200);
  return p}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function play(p){await p.click('[data-m=play]').catch(()=>{});await p.waitForTimeout(800)}
async function dismissSil(p){for(let i=0;i<6;i++){if(await p.evaluate(()=>!!(window.SIL&&SIL.cur))){await p.mouse.click(720,300);await p.waitForTimeout(500)}else break}}
module.exports={chromium,open,sleep,play,dismissSil,URL,DIR};
