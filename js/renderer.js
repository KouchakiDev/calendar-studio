/* EFX Calendar Studio - SVG engine: build(data, px, {min}) -> {svg,W,H} */
/* ---------- builder ---------- */
function build(d,px,o={}){
const EN={time:'Time',cur:'Currency',flag:'Country',imp:'Impact',desc:'Event',prev:'Previous',fc:'Forecast',act:'Actual',holiday:'Holiday',high:'High impact expected',med:'Medium impact expected'};
const L=Object.assign({time:'زمان',cur:'ارز',flag:'کشور',imp:'اهمیت',desc:'شرح رویداد',prev:'قبلی',fc:'پیش بینی',act:'واقعی',holiday:'تعطیل',high:'تاثیر مورد انتظار: زیاد',med:'تاثیر مورد انتظار: متوسط'},d.lang=='en'?EN:{},d.labels||{});
const B=Object.assign({name:'EFX Forex',tagline:'Trade Smart.',socials:[]},d.brand||{});
const lg=(B.logo==='default'?window.EFX_LOGO:B.logo)||window.EFX_USERLOGO||null;
const F=d.font||"Inter,Vazirmatn,Tahoma,'Segoe UI',Arial,sans-serif";
const C=Object.assign({gold:'#e9c46a',gold2:'#a8812f',high:'#e5383b',med:'#f4a261',low:'#8d8a82',pos:'#2ecc71',bg1:'#07070a',bg2:'#17130c',p1:'#3d382e',p2:'#1b1914',tx:'#f4f1ea',mut:'#9b968a',v1:'#f2d58a',v2:'#d9d4c7',row:'#ffffff'},d.theme||{});
const LV={high:3,medium:2,low:1};
const tk=t=>{const m=/^(\d{1,2}):(\d{2})/.exec(t||'');return m?m[1]*60+ +m[2]:-1};
let ev=(d.events||[]).filter(e=>e.impact==='holiday'||(LV[e.impact]||1)>=(o.min||0));
if(d.sort!==false)ev.sort((a,b)=>tk(a.time)-tk(b.time));
const hasAct=ev.some(e=>e.actual!=null&&e.actual!=='');
const W=1600,P=40,TW=W-2*P,R=P+TW,rowH=62,pitch=72,thH=58,top=250;
const rowsTop=top+thH+16,tEnd=rowsTop+Math.max(ev.length,1)*pitch;
const legY=tEnd+24,barY=legY+64+26,H=barY+100+(d.disclaimer?46:0)+40;
const OV=d.overrides||{},ov=(id,role)=>Object.assign({},OV['@'+role],OV[id]);let N=0,RI=-1;
const G=(id,role,inner)=>{const o=ov(id,role);if(o.fill)inner=inner.replace(/ fill="[^"]*"/,` fill="${o.fill}"`);if(o.stroke)inner=inner.replace(/ stroke="[^"]*"/,` stroke="${o.stroke}"`);const tr=(o.dx||o.dy)?` transform="translate(${o.dx||0} ${o.dy||0})"`:'';return`<g data-id="${id}" data-role="${role}"${tr} opacity="${o.hide?0:(o.op??1)}">${inner}</g>`};
const T=(x,y,s,fs,fill,q={})=>{const id=q.id||(RI>=0&&q.k?`r${RI}.${q.k}`:'t'+(++N)),role=q.k||'txt',o=ov(id,role);if(o.text!=null&&o.text!=='')s=o.text;const ls=o.ls??q.ls;return `<text data-id="${id}" data-role="${role}" x="${x+(o.dx||0)}" y="${y+(o.dy||0)}" font-size="${o.fs||fs}" fill="${o.fill||fill}" text-anchor="${q.a||'middle'}" dominant-baseline="central" font-weight="${o.w||q.w||400}"${q.rtl?' direction="rtl"':q.ltr?' direction="ltr"':''}${ls?` letter-spacing="${ls}"`:''} opacity="${o.hide?0:(o.op??1)}">${esc(s)}</text>`};
const bulls=(cx,cy,n,col,sz)=>{let s='';for(let k=0;k<3;k++)s+=`<use href="#bull" x="${cx-(3*sz+2*6)/2+k*(sz+6)}" y="${cy-sz/2}" width="${sz}" height="${sz}" fill="${k<n?col:'#6b675c'}" opacity="${k<n?1:.4}"/>`;return s};
const pill=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2.6}" fill="url(#pg)" stroke="${C.gold}" stroke-opacity=".4" stroke-width="1.5"/>`;
/* columns */
const cw={time:130,cur:120,flag:110,imp:180},cx={};let x=R;
for(const k of['time','cur','flag','imp']){cx[k]=x-cw[k]/2;x-=cw[k]}
const vk=hasAct?['act','fc','prev']:['fc','prev'],vw=150;let xl=P;
vk.forEach(k=>{cx[k]=xl+vw/2;xl+=vw});
const dR=x-20,dL=xl+16;
/* defs */
const codes=[...new Set(ev.map((e,i)=>flagCode(Object.assign({},e,ov('r'+i+'.flag','flag')))))];
let s=`<defs><style>${window.EFX_FONTCSS||''}</style>
<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.bg1}"/><stop offset="1" stop-color="${C.bg2}"/></linearGradient>
<linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2b8"/><stop offset=".45" stop-color="${C.gold}"/><stop offset="1" stop-color="${C.gold2}"/></linearGradient>
<linearGradient id="gl" x1="0" x2="1"><stop offset="0" stop-color="${C.gold}" stop-opacity="0"/><stop offset="1" stop-color="${C.gold}"/></linearGradient>
<linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.p1}"/><stop offset="1" stop-color="${C.p2}"/></linearGradient>
<radialGradient id="gw" cx=".82" cy="0" r=".7"><stop offset="0" stop-color="${C.gold}" stop-opacity=".22"/><stop offset="1" stop-color="${C.gold}" stop-opacity="0"/></radialGradient>
<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity=".03"/></pattern>
<filter id="blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter>
<clipPath id="fclip"><rect width="60" height="40" rx="6"/></clipPath><clipPath id="lc"><circle cx="130" cy="128" r="76"/></clipPath>
<symbol id="bull" viewBox="0 0 24 24"><path d="M2 3C2 10 5.5 12 8 12h8c2.500 0 6-2 6-9-2 4-4.500 5.500-6 5.500H8C6.500 8.500 4 7 2 3Z"/><path d="M8 11h8l-1 6.500c-.4 1.800-1.500 2.800-3 2.800s-2.600-1-3-2.800Z"/></symbol>
<symbol id="mic" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" fill="#fff"/><path d="M5.500 11a6.500 6.500 0 0 0 13 0M12 18v3" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></symbol>
${codes.map(c=>`<symbol id="f-${c}" viewBox="0 0 60 40"><g clip-path="url(#fclip)">${flagBody(c)}</g><rect x=".7" y=".7" width="58.600" height="38.600" rx="6" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1.4"/></symbol>`).join('')}
</defs>`;
/* background */
s+=G('bg','bg',`<rect width="${W}" height="${H}" fill="url(#bg)"/><rect width="${W}" height="${H}" fill="url(#grid)"/><rect width="${W}" height="${H*.4}" fill="url(#gw)"/>`);
let sd=11;const rnd=()=>(sd=sd*16807%2147483647)/2147483647;
for(let i=0;i<28;i++){const bx=520+i*30,bh=18+rnd()*60,by=40+rnd()*120-i*1.500;s+=`<path d="M${bx+7} ${by-18}V${by+bh+18}" stroke="${C.gold}" stroke-opacity=".12" stroke-width="2"/><rect x="${bx}" y="${by}" width="14" height="${bh}" rx="2" fill="${C.gold}" fill-opacity="${.05+rnd()*.07}"/>`}
if(lg)s+=G('wm','wm',`<image href="${lg}" x="${W/2-380}" y="${(top+tEnd)/2-380}" width="760" height="760" opacity=".045" preserveAspectRatio="xMidYMid slice"/>`);
s+=G('frame','frame',`<rect x="14" y="14" width="${W-28}" height="${H-28}" rx="30" fill="none" stroke="url(#gg)" stroke-width="3"/><rect x="26" y="26" width="${W-52}" height="${H-52}" rx="22" fill="none" stroke="${C.gold}" stroke-opacity=".14"/>`);
/* header */
s+=G('logo','logo',`<circle cx="130" cy="128" r="84" fill="none" stroke="${C.gold}" stroke-width="10" opacity=".55" filter="url(#blur)"/>`);
s+=G('logo','logo',lg?`<image href="${lg}" x="54" y="52" width="152" height="152" clip-path="url(#lc)" preserveAspectRatio="xMidYMid slice"/>`:`<circle cx="130" cy="128" r="76" fill="#0c0b09"/>`+T(130,128,String(B.name).slice(0,3).toUpperCase(),44,C.gold,{w:800,id:'logoText'}));
s+=G('logo','logo',`<circle cx="130" cy="128" r="80" fill="none" stroke="url(#gg)" stroke-width="6"/>`);
s+=G('datePill','pill',pill(225,92,470,70))+T(460,128,d.date||'',35,C.tx,{w:700,rtl:1,id:'date'});
s+=T(460,198,String(B.name).toUpperCase(),24,C.gold,{w:700,ls:7,ltr:1,id:'brandTop'});
s+=T(W-P-10,96,d.title||'تقویم اقتصادی',66,C.tx,{a:'start',w:800,rtl:1,id:'title'});
s+=G('underline','underline',`<rect x="${W-P-10-440}" y="146" width="440" height="5" rx="2.500" fill="url(#gl)"/>`);
if(d.subtitle)s+=T(W-P-10,190,d.subtitle,26,C.mut,{a:'start',rtl:1,id:'subtitle'});
/* table header */
s+=G('thead','pill',`<rect x="${P}" y="${top}" width="${TW}" height="${thH}" rx="15" fill="url(#pg)" stroke="${C.gold}" stroke-opacity=".45" stroke-width="1.5"/>`);
for(const k in cx)s+=T(cx[k],top+thH/2,L[k],23,C.gold,{w:700,rtl:1,k:'hdr',id:'h.'+k});
s+=T((dR+dL)/2,top+thH/2,L.desc,23,C.gold,{w:700,rtl:1,k:'hdr',id:'h.desc'});
/* rows */
if(!ev.length)s+=T(W/2,rowsTop+36,'رویدادی برای نمایش وجود ندارد',28,C.mut,{rtl:1});
ev.forEach((e,i)=>{RI=i;const y=rowsTop+i*pitch,cy=y+rowH/2,lv=LV[e.impact]||0,hol=e.impact==='holiday',col=lv==3?C.high:lv==2?C.med:C.low;
s+=G('r'+i+'.bg','rowbg',`<rect x="${P}" y="${y}" width="${TW}" height="${rowH}" rx="14" fill="${hol?C.high:C.row}" fill-opacity="${hol?.07:i%2?.07:.035}" stroke="${C.gold}" stroke-opacity=".13"/>`);
if(lv==3)s+=G('r'+i+'.acc','acc',`<rect x="${R-5}" y="${y+12}" width="5" height="${rowH-24}" rx="2.500" fill="${C.high}"/>`);
s+=T(cx.time,cy,e.time||'-',27,C.tx,{w:600,ltr:1,k:'time'});
s+=T(cx.cur,cy,e.currency||'',26,C.gold,{w:700,ltr:1,k:'cur'});
s+=G('r'+i+'.flag','flag',`<use href="#f-${flagCode(Object.assign({},e,ov('r'+i+'.flag','flag')))}" x="${cx.flag-28}" y="${cy-18.5}" width="56" height="37"/>`);
if(hol)s+=`<rect x="${cx.imp-50}" y="${cy-18}" width="100" height="36" rx="18" fill="${C.high}" fill-opacity=".16" stroke="${C.high}"/>`+T(cx.imp,cy,L.holiday,22,C.high,{w:700,rtl:1,k:'hol'});
else s+=G('r'+i+'.imp','imp',bulls(cx.imp,cy,lv||1,ov('r'+i+'.imp','imp').fill||col,34));
const sp=e.speech?46:0,txt=String(e.title||''),av=dR-dL-sp;let fs=26;const est=txt.length*fs*.55;if(est>av)fs=Math.max(15,fs*av/est);
if(e.speech)s+=`<circle cx="${dR-19}" cy="${cy}" r="18" fill="${C.high}"/><use href="#mic" x="${dR-31}" y="${cy-12}" width="24" height="24"/>`;
s+=T(dR-sp,cy,txt,fs,hol?'#ff8f92':C.tx,{a:'start',w:500,rtl:1,k:'title'});
vk.forEach(k=>{const v=e[{prev:'previous',fc:'forecast',act:'actual'}[k]];const has=v!=null&&v!=='';
const fill=!has?C.mut:k=='act'?(e.tone=='bad'?C.high:e.tone=='good'?C.pos:C.tx):k=='fc'?C.v1:C.v2;
s+=T(cx[k],cy,has?v:'-',27,fill,{w:700,ltr:1,k})})});
RI=-1;/* legend */
const tz=d.timezoneNote||'زمان درج شده در تقویم بر اساس ساعت رسمی ایران می باشد.';
let lx=R;const lw=[620,400,430];
let w=lw[0];lx-=w;s+=G('lp'+(lx|0),'legpill',pill(lx,legY,w,64))+`<path d="M${lx+w-40} ${legY+16}l15 28h-30z" fill="#f4c542"/><path d="M${lx+w-40} ${legY+26}v9" stroke="#111" stroke-width="3" stroke-linecap="round"/>`+T(lx+w-64,legY+32,tz,21,C.tx,{a:'start',rtl:1,id:'tz'});
[[L.high,3,C.high],[L.med,2,C.med]].forEach((q,i)=>{lx-=20;w=lw[i+1];lx-=w;s+=G('lp'+(lx|0),'legpill',pill(lx,legY,w,64))+T(lx+w-22,legY+32,q[0],23,C.tx,{a:'start',rtl:1,id:'leg'+i})+bulls(lx+22+(3*30+12)/2,legY+32,q[1],q[2],30)});
/* brand bar */
s+=G('bar','pill',`<rect x="${P}" y="${barY}" width="${TW}" height="100" rx="22" fill="url(#pg)" stroke="${C.gold}" stroke-opacity=".4" stroke-width="1.5"/><rect x="${P+40}" y="${barY}" width="${TW-80}" height="3" rx="1.500" fill="url(#gg)"/>`);
const nm=String(B.name);s+=T(P+36,barY+50,nm,40,C.tx,{a:'start',w:800,ltr:1,id:'barName'});
const nx=P+36+nm.length*23+26;s+=`<rect x="${nx}" y="${barY+28}" width="2" height="44" fill="${C.gold}" fill-opacity=".6"/>`+T(nx+22,barY+50,B.tagline||'',30,C.gold,{a:'start',ltr:1,w:500,id:'barTag'});
let sx=R-34;(B.socials||[]).forEach(q=>{const t=String(q.text||'');s+=G('si'+(sx|0),'socicon',`<g transform="translate(${sx-16},${barY+50})">${ICON(q.type,C.gold)}</g>`)+T(sx-44,barY+50,t,25,C.tx,{a:'end',ltr:1,w:500,k:'soc'});sx-=44+t.length*14+56});
if(d.disclaimer)s+=T(W/2,barY+100+34,d.disclaimer,20,C.mut,{rtl:1,id:'disc'});
const dim=px?`width="${px}" height="${Math.round(px*H/W)}" `:'';
return{svg:`<svg xmlns="http://www.w3.org/2000/svg" ${dim}viewBox="0 0 ${W} ${H}" font-family="${F}">${s}</svg>`,W,H}}

