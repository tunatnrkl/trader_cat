/* K3: tok grafik — iç kart paneli, koyu konturlu kalın çizgi (glow yok), yuvarlak işaretler, hap etiketler.
   Renk: pozisyon açıkken oyuncunun ALIŞ fiyatına göre (üstü nane, altı mercan); pozisyon yokken nötr gök mavisi. */
function drawChart(now){const cv=$('#cv'),x=cv.getContext('2d'),c=COINS[G.ci];x.setTransform(CVS,0,0,CVS,0,0);x.shadowBlur=0;x.setLineDash([]);
 const L=26,R=SW-84,T=128,B=SH2-148,PW=R-L,PH=B-T,sp=c.pf,act=(G.st==='active'||G.st==='done')&&G.K&&G.K.length,tn=act?G.tn:0,OLC='#120B2A';
 x.fillStyle=c.boss?'#26163A':'#1C1538';x.fillRect(0,0,SW,SH2);
 rr(x,L-14,T-16,SW-L+2,PH+58,22);x.fillStyle=c.boss?'#2E1A46':'#221A46';x.fill();
 const N=Math.max(2,Math.round(PW*Math.max(tn,.05)/15/1.2)),ys=[];let mn=sp,mx=sp;
 if(act){for(let i=0;i<=N;i++){const v=sp*ratioAt(G.K,tn*i/N);ys.push(v);if(v<mn)mn=v;if(v>mx)mx=v}}
 if(G.pt){mn=Math.min(mn,G.pt.bf);mx=Math.max(mx,G.pt.bf)}
 const rg=Math.max(mx-mn,sp*.1),pad=rg*.18,t0=Math.max(0,mn-pad),t1=mx+pad;
 if(G.y0===null||G.y0===undefined){G.y0=t0;G.y1=t1}else{G.y0+=(t0-G.y0)*.1;G.y1+=(t1-G.y1)*.1}
 const X=t=>L+PW*t/15,Y=v=>B-(v-G.y0)/(G.y1-G.y0)*PH;
 /* ızgara: yumuşak, kalın ama silik */
 x.lineWidth=2;x.strokeStyle=c.boss?'#3A2556':'#2C2358';x.beginPath();for(let i=0;i<=4;i++){const y=Math.round(T+PH*i/4);x.moveTo(L,y);x.lineTo(R,y)}x.stroke();
 x.lineWidth=1;x.beginPath();for(let s=3;s<15;s+=3){const xx=Math.round(X(s))+.5;x.moveTo(xx,T);x.lineTo(xx,B)}x.stroke();
 x.textBaseline='middle';x.fillStyle='#9A8CCB';x.textAlign='left';
 for(let i=0;i<=4;i++){const v=G.y0+(G.y1-G.y0)*(4-i)/4,tx=fa(Math.max(0,v));x.font=fitF(x,tx,SW-R-16,18);x.fillText(tx,R+10,T+PH*i/4)}
 x.font='800 17px '+KF;x.textAlign='center';for(let s=0;s<=15;s+=3)x.fillText(s+'s',X(s),B+22);x.textAlign='left';
 /* başlangıç fiyatı */
 x.setLineDash([8,8]);x.lineWidth=2;x.strokeStyle='#4A3D80';x.beginPath();x.moveTo(L,Y(sp));x.lineTo(R,Y(sp));x.stroke();x.setLineDash([]);
 const pos=G.pt&&G.st==='active'?G.pt:null,ref=pos?pos.bf:null,up=pos?G.cur>=ref:true,cc=pos?(up?'#5FE0B8':'#F08A84'):'#8FD3FF',cg=pos?(up?'95,224,184':'240,138,132'):'143,211,255';
 /* alış fiyatı çizgisi (pozisyon açıkken): kâr/zarar referansı */
 if(pos){const by=Y(ref);x.setLineDash([10,7]);x.lineWidth=2.5;x.strokeStyle='#FFC83D';x.beginPath();x.moveTo(L,by);x.lineTo(R,by);x.stroke();x.setLineDash([]);
  const lb=LANG==='en'?'BUY':'ALIŞ';x.font='900 14px '+KF;const w=x.measureText(lb).width+18,ly=Math.min(B-12,Math.max(T+12,by));const lx=R-w-8,lyy=ly-30<T?ly+18:ly-18;rr(x,lx,lyy-12,w,24,12);x.fillStyle='#FFC83D';x.fill();x.lineWidth=2.5;x.strokeStyle=OLC;x.stroke();x.fillStyle='#4A2A00';x.fillText(lb,lx+9,lyy+1)}
 let ex=X(0),ey=Y(sp);
 if(act){const pts=ys.map((v,i)=>[X(tn*i/N),Y(v)]);ex=pts[pts.length-1][0];ey=pts[pts.length-1][1];
  const path=()=>{x.beginPath();pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]))};
  path();x.lineTo(ex,B);x.lineTo(pts[0][0],B);x.closePath();x.fillStyle=`rgba(${cg},.13)`;x.fill();
  x.lineJoin='round';x.lineCap='round';path();x.strokeStyle=OLC;x.lineWidth=10;x.stroke();path();x.strokeStyle=cc;x.lineWidth=5;x.stroke();
  path();x.strokeStyle='rgba(255,255,255,.28)';x.lineWidth=1.5;x.save();x.translate(0,-1.5);x.stroke();x.restore()}
 /* kaldıraç likidasyon çizgisi */
 if(G.pt&&G.pt.lv>1){const ly=Y(G.pt.bf*(1-1/G.pt.lv));x.setLineDash([6,7]);x.lineWidth=2;x.strokeStyle='#C76A86';x.beginPath();x.moveTo(L,ly);x.lineTo(R,ly);x.stroke();x.setLineDash([])}
 /* al/sat işaretleri: konturlu yuvarlak rozetler + hap kâr etiketleri */
 const badge=(cx,cy,upw,col)=>{x.beginPath();x.arc(cx,cy,10,0,7);x.fillStyle=col;x.fill();x.lineWidth=3;x.strokeStyle=OLC;x.stroke();x.fillStyle='#fff';x.beginPath();if(upw){x.moveTo(cx,cy-5);x.lineTo(cx+5,cy+3);x.lineTo(cx-5,cy+3)}else{x.moveTo(cx,cy+5);x.lineTo(cx+5,cy-3);x.lineTo(cx-5,cy-3)}x.closePath();x.fill()};
 if(act&&S.set.mk){const used=[];
  for(const t of G.tl){const bot=t.w!=='Sen',bx=X(t.t0),by=Y(t.bf);
   if(!t.open){const sx=X(t.t1),sy=Y(t.sf),good=t.pp>=0,col=good?'#FFC83D':'#F08A84';x.lineWidth=2;x.setLineDash([3,5]);x.strokeStyle=good?'rgba(255,200,61,.55)':'rgba(240,138,132,.5)';x.beginPath();x.moveTo(bx,by);x.lineTo(sx,sy);x.stroke();x.setLineDash([])}
   badge(bx,by,true,'#35CDBE');if(bot&&S.set.lb&&DOGI.complete){x.imageSmoothingEnabled=false;x.drawImage(DOGI,bx-16,by+14,32,32)}
   if(!t.open){const sx=X(t.t1),sy=Y(t.sf),good=t.pp>=0,col=good?'#FFC83D':'#F08A84';badge(sx,sy,false,col);if(bot&&S.set.lb&&DOGR.complete){x.imageSmoothingEnabled=false;x.drawImage(DOGR,sx-16,sy+14,32,32)}
    x.font='900 17px '+KF;const txt=pcs(t.pp),w=x.measureText(txt).width+20;let px=Math.min(R-w,Math.max(L,sx-w/2)),py=Math.max(T+2,sy-46);for(let k=0;k<6&&used.some(u=>px<u[0]+u[2]&&px+w>u[0]&&py<u[1]+u[3]&&py+26>u[1]);k++)py=Math.max(T+2,py-28);used.push([px,py,w,26]);
    rr(x,px,py+3,w,26,13);x.fillStyle=OLC;x.fill();rr(x,px,py,w,26,13);x.fillStyle=good?'#FFC83D':'#3B2D6E';x.fill();x.lineWidth=2.5;x.strokeStyle=OLC;x.stroke();x.fillStyle=good?'#4A2A00':'#F2B5AE';x.textAlign='left';x.fillText(txt,px+10,py+14)}}}
 /* son fiyat: konturlu beyaz nokta (sakin nefes, yanıp sönme yok) + hap fiyat etiketi */
 if(act){x.setLineDash([3,6]);x.strokeStyle=`rgba(${cg},.55)`;x.lineWidth=2;x.beginPath();x.moveTo(ex,ey);x.lineTo(R,ey);x.stroke();x.setLineDash([])}
 const br=G.st==='active'?1.2*Math.sin(now/260):0;
 x.beginPath();x.arc(ex,ey,13+br,0,7);x.fillStyle=`rgba(${cg},.22)`;x.fill();
 x.beginPath();x.arc(ex,ey,8,0,7);x.fillStyle='#fff';x.fill();x.lineWidth=3.5;x.strokeStyle=OLC;x.stroke();x.beginPath();x.arc(ex,ey,3.5,0,7);x.fillStyle=cc;x.fill();
 {const ty=Math.min(B-12,Math.max(T+12,ey)),tx=fa(G.cur),tw=SW-R-12;rr(x,R+4,ty-12+3,tw,26,13);x.fillStyle=OLC;x.fill();rr(x,R+4,ty-12,tw,26,13);x.fillStyle=cc;x.fill();x.lineWidth=2.5;x.strokeStyle=OLC;x.stroke();
  x.fillStyle='#120B2A';x.font=fitF(x,tx,tw-14,18).replace('800','900');x.textAlign='center';x.fillText(tx,R+4+tw/2,ty+1);x.textAlign='left'}
 if(G.st==='ready'||G.st==='over'){const msg=G.st==='over'?'':LANG==='en'?'READY! PRESS START':'HAZIR! BAŞLA’YA BAS';if(msg){x.font='900 30px '+KF;const w=x.measureText(msg).width+48,cx=(L+R)/2,cy=(T+B)/2-34;
  rr(x,cx-w/2,cy-26+5,w,52,26);x.fillStyle=OLC;x.fill();rr(x,cx-w/2,cy-26,w,52,26);x.fillStyle='#3B2D6E';x.fill();x.lineWidth=3;x.strokeStyle='#5A4A96';x.stroke();x.fillStyle='#E5DCFF';x.textAlign='center';x.fillText(msg,cx,cy+1);x.textAlign='left'}}}
function hud(){const c=COINS[G.ci],sp=c.pf,el=G.st==='active'||G.st==='done'?G.tn:0,rem=15-el,hT=$('#hT'),hP=$('#hP'),hN=$('#hN'),hS=$('#hPs');
 const tt=G.st==='done'?'BİTTİ':rem.toFixed(1);if(hT.textContent!==tt){hT.textContent=tt;hT.style.fontSize=tt==='BİTTİ'?'34px':'';hT.style.color=G.st==='active'&&rem<=3?'#FFC83D':'#FFFFFF'}
 const rc=G.cur/sp-1,pos=G.pt&&G.st==='active'?G.pt:null;let pp,col,sub;
 if(pos){const v=eq(pos,G.curU),r=Number(v-pos.st)/Number(pos.st);pp=pcs(r);col=r>=0?'#7FE3C9':'#F2A6A0';sub=L('POZİSYON')+' · '+L('TUR')+' '+pcs(rc)}
 else{pp=pcs(rc);col='#FFF6E6';sub=G.st==='active'||G.st==='done'?L('TUR'):''}
 if(hP.textContent!==pp)hP.textContent=pp;if(hP.dataset.c!==col){hP.dataset.c=col;hP.style.color=col}if(hS&&hS.textContent!==sub)hS.textContent=sub;
 const nn=L(c.n)+(c.boss?' · BOSS':'');if(hN.textContent!==nn){hN.textContent=nn;hN.style.fontSize=nn.length>16?'21px':nn.length>12?'24px':'';hN.style.color=c.boss?'#FFB3C4':'#FFC83D'}}
