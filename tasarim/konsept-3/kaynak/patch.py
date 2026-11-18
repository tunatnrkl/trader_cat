import re,sys,shutil
# konsept-3: HER ZAMAN orijinal kökten başlar (idempotent)
SRC='/home/user/trader_cat/index.html'
P='/home/user/trader_cat/tasarim/konsept-3/index.html'
SP='/tmp/claude-0/-home-user-trader-cat/a538f2c1-40e5-543b-bf48-f5168a138070/scratchpad/k3priv/'
s=open(SRC,encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    n=s.count(old)
    if n!=cnt: sys.exit('COUNT %d != %d for: %s'%(n,cnt,old[:90]))
    s=s.replace(old,new)

# 1) dış font bağlantısı kalkar (brif: dış kaynak yok)
s=re.sub(r'<link href="https://fonts\.googleapis\.com[^>]*>\n','',s)
# 2) konsept CSS katmanı
css=open(SP+'k3.css',encoding='utf-8').read()
rep('</style><style>/* === TELEFON','\n'+css+'</style><style>/* === TELEFON')
# 3) HTML: başlıkta ikincil tur değişimi
rep('<div class="tr"><span id="hP">+%0</span></div>','<div class="tr"><span id="hP">+%0</span><small id="hPs"></small></div>')
# 4) para: yuvarlak tok yazı (canvas)
rep("let c=pxText(txt,5,gc,OL);if(c.width>236)c=pxText(txt,4,gc,OL);if(c.width>236)c=pxText(txt,3,gc,OL);putc($('#cashv'),c);","ckCash(txt);")
rep("/* para sayacı: kısa count-up */","""/* K3: para yazısı — yuvarlak kalın yazı, koyu kontur + alt gölge (2x çözünürlük) */
const KF='ui-rounded, "SF Pro Rounded", "Nunito", "Varela Round", "Arial Rounded MT Bold", "Trebuchet MS", system-ui, sans-serif';
function ckCash(txt){const cv=$('#cashv'),x=cv.getContext('2d');let fs=84;x.font='900 '+fs+'px '+KF;while(x.measureText(txt).width>440&&fs>40){fs-=4;x.font='900 '+fs+'px '+KF}
 const w=Math.ceil(x.measureText(txt).width)+24,h=104;if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h}x.clearRect(0,0,w,h);x.font='900 '+fs+'px '+KF;x.textBaseline='middle';x.lineJoin='round';
 const y=h/2-2;x.lineWidth=14;x.strokeStyle='#24154A';x.strokeText(txt,12,y+6);x.fillStyle='#24154A';x.fillText(txt,12,y+6);x.strokeText(txt,12,y);x.fillStyle='#FFC83D';x.fillText(txt,12,y);
 x.save();x.beginPath();x.rect(0,0,w,y-fs*.08);x.clip();x.fillStyle='#FFE08A';x.fillText(txt,12,y);x.restore()}
/* para sayacı: kısa count-up */""")
# 5) SAT düğmesi rengi: pozisyonun kâr/zararına göre (başlıktaki büyük yüzdeyle aynı)
rep("txt='SAT · '+fm(v)+' ('+pcs(Number(v-tr.st)/Number(tr.st))+')';cls='sell';","txt='SAT · '+fm(v)+' ('+pcs(Number(v-tr.st)/Number(tr.st))+')';cls='sell '+(v>=tr.st?'up':'dn');")
# 6) kâr balonu: kârda altın, zararda nötr lavanta
rep("d.className='pl';d.textContent=(pl>0n?'+$':'-$')+cp(pl);","d.className='pl '+(pl>0n?'win':'loss');d.textContent=(pl>0n?'+$':'-$')+cp(pl);")
rep("color:${pl>0n?'#4CD08A':'#E5484D'}`;","color:${pl>0n?'#FFC83D':'#CBBDF2'}`;")
rep("document.body.appendChild(d);setTimeout(()=>d.remove(),1350)}","document.body.appendChild(d);setTimeout(()=>d.remove(),1150)}")
# 7) kilitli coin: sıradaki hedefin ilerlemesi (ad sızdırmaz)
rep("""if(!op){h+=`<div class="tk lk ${c.boss?'boss':''}"><img class="ci lkic" src="${ICN.lock}" alt=""><div class="tn"><b>Kilitli</b></div></div>`;continue}""",
"""if(!op){let lp='';if(i===S.open.indexOf(0)&&S.co[c.cat]){const pr=Math.floor(Math.min(100,Number((S.tot||0n)*100000n/(c.p*UNLK[c.cat]))/10));lp=`<span class="lkp"><span class="lbar"><i style="width:${Math.max(4,pr)}%"></i></span><small>%${pr}</small></span>`}
  h+=`<div class="tk lk ${c.boss?'boss':''}"><img class="ci lkic" src="${ICN.lock}" alt=""><div class="tn"><b>Kilitli</b>${lp}</div></div>`;continue}""")
# 8) menü: oyna birincil buton, logo yuvarlak tok yazı, düz zemin
rep("const b=(id,t)=>`<button class=\"mbtn\" data-m=\"${id}\">${L(t)}</button>`;","const b=(id,t)=>`<button class=\"mbtn ${id==='play'?'pri':''}\" data-m=\"${id}\">${L(t)}</button>`;")
rep("m.style.backgroundImage=`url(${nz.toDataURL()})`;","")
i0=s.index('function menuLogo(){');i1=s.index('function menuInit(){')
s=s[:i0]+r"""function menuLogo(){const c=document.createElement('canvas'),x=c.getContext('2d'),l1='TRADING',l2='IDLE',F=n=>'900 '+n+'px '+KF;
 x.font=F(132);const w1=x.measureText(l1).width;c.width=Math.ceil(w1)+80;c.height=330;x.textAlign='center';x.textBaseline='alphabetic';x.lineJoin='round';const cx=c.width/2;
 const word=(t,y,n,fill,hi,edge)=>{x.font=F(n);x.lineWidth=26;x.strokeStyle='#24154A';x.strokeText(t,cx,y+12);x.fillStyle='#24154A';x.fillText(t,cx,y+12);x.strokeText(t,cx,y);x.fillStyle=edge;x.fillText(t,cx,y);
  x.save();x.beginPath();x.rect(0,0,c.width,y-n*.12);x.clip();x.fillStyle=fill;x.fillText(t,cx,y);x.restore();x.save();x.beginPath();x.rect(0,0,c.width,y-n*.5);x.clip();x.fillStyle=hi;x.fillText(t,cx,y);x.restore()};
 word(l1,150,132,'#FFC83D','#FFE08A','#D88A12');word(l2,300,120,'#4ADACB','#9CF0E6','#178F84');c.style.height='auto';return c}
"""+s[i1:]
rep("const c=menuLogo();c.style.width=Math.min(c.width,innerWidth*.86)+'px';","const c=menuLogo();c.style.width=Math.min(c.width*.5,innerWidth*.6)+'px';")
# 9) grafik + hud
i0=s.index('function drawChart(now){');i1=s.index('function cvLoop(now){')
s=s[:i0]+open(SP+'chart.js',encoding='utf-8').read()+s[i1:]
rep("function fitF(x,t,mw,px){let s=px;do{x.font=s+'px TINum, TIDig, VT323, monospace';if(x.measureText(t).width<=mw)break;s--}while(s>14);return s+'px TINum, TIDig, VT323, monospace'}",
    "function fitF(x,t,mw,px){let s=px;do{x.font='800 '+s+'px '+KF;if(x.measureText(t).width<=mw)break;s--}while(s>12);return '800 '+s+'px '+KF}")
# 10) robot bölmeleri: yeni dil
i0=s.index('function drawTile(i,now){');i1=s.index('\n',s.index("x.fillText(TT('NAKİT YETERSİZ')",i0))
t=s[i0:i1]
for a,b in [
 ("x.fillStyle='#070B16'","x.fillStyle='#241A48'"),
 ("x.font='700 44px TIDig, \"Pixelify Sans\", monospace'","x.font='900 46px '+KF"),
 ("x.font='22px TIDig, VT323, monospace'","x.font='900 20px '+KF"),
 ("x.font='20px TINum, TIDig, VT323, monospace'","x.font='900 20px '+KF"),
 ("x.fillStyle=ok?'#FFD45E':'#E5484D'","x.fillStyle=ok?'#FFC83D':'#F2A6A0'"),
 ("x.fillStyle='#FFD45E';x.font='900 46px","x.fillStyle='#FFC83D';x.font='900 46px"),
 ("x.fillStyle='rgba(143,160,189,.3)';x.font='700 16px \"Pixelify Sans\", monospace'","x.fillStyle='#6E5FA8';x.font='900 16px '+KF"),
 ("x.fillStyle='#FFD45E';x.font='700 14px TIDig, \"Pixelify Sans\", monospace'","x.fillStyle='#FFC83D';x.font='900 15px '+KF"),
 ("x.fillStyle='#8FA0BD';x.font='16px TIDig, VT323, monospace'","x.fillStyle='#CBBDF2';x.font='800 14px '+KF"),
 ("x.strokeStyle='rgba(120,150,190,.14)'","x.strokeStyle='#30265C'"),
 ("x.fillStyle='rgba(143,160,189,.5)';x.font='18px VT323, monospace'","x.fillStyle='#8C7EC4';x.font='900 17px '+KF"),
 ("cc=up?'#4CD08A':'#E5484D',cg=up?'76,208,138':'229,72,77'","cc='#8FD3FF',cg='143,211,255'"),
 ("x.strokeStyle='rgba(244,235,221,.22)'","x.strokeStyle='#4A3D80'"),
 ("x.lineJoin='round';x.shadowColor=`rgba(${cg},.9)`;x.shadowBlur=7*k;x.strokeStyle=cc;x.lineWidth=2;x.stroke();x.shadowBlur=0;",
  "x.lineJoin='round';x.lineCap='round';x.strokeStyle='#120B2A';x.lineWidth=6;x.stroke();x.strokeStyle=cc;x.lineWidth=3;x.stroke();"),
 ("x.fillStyle='#4CD08A';const bx","x.fillStyle='#5FE0B8';const bx"),
 ("x.fillStyle=tr.pp>=0?'#4CD08A':'#E5484D'","x.fillStyle=tr.pp>=0?'#FFC83D':'#F08A84'"),
 ("x.fillStyle='#E5484D';x.font='16px VT323, monospace'","x.fillStyle='#F2A6A0';x.font='900 15px '+KF")]:
    if a not in t: sys.exit('TILE miss: '+a[:60])
    t=t.replace(a,b)
s=s[:i0]+t+s[i1:]
# 11) çeviri
rep("'TUR':'ROUND'","'TUR':'ROUND','POZİSYON':'POSITION','ALIŞ':'BUY'")
EXTRA=SP+'extra.py'
import os
if os.path.exists(EXTRA): exec(open(EXTRA,encoding='utf-8').read())
open(P,'w',encoding='utf-8').write(s)
print('ok k3')
