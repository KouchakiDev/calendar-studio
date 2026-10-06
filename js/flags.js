/* EFX Calendar Studio - vector flags + social icons */
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---------- flags (60x40) ---------- */
const star=(cx,cy,R,r)=>{let p=[];for(let i=0;i<10;i++){const a=(-90+i*36)*Math.PI/180,d=i%2?r:R;p.push((cx+d*Math.cos(a)).toFixed(1)+','+(cy+d*Math.sin(a)).toFixed(1))}return p.join(' ')};
const jack='<rect width="60" height="40" fill="#012169"/><path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0L60 40M60 0L0 40" stroke="#c8102e" stroke-width="3"/><path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="13"/><path d="M30 0V40M0 20H60" stroke="#c8102e" stroke-width="8"/>';
const tri=(a,b,c)=>[a,b,c].map((f,i)=>`<rect x="${i*20}" width="20.1" height="40" fill="${f}"/>`).join('');
const hor=(a,b,c)=>[a,b,c].map((f,i)=>`<rect y="${i*13.34}" width="60" height="13.4" fill="${f}"/>`).join('');
const FLAG={
US:()=>{let s='<rect width="60" height="40" fill="#b22234"/>';for(let i=1;i<13;i+=2)s+=`<rect y="${i*40/13}" width="60" height="${40/13}" fill="#fff"/>`;s+='<rect width="27" height="21.5" fill="#3c3b6e"/>';for(let r=0;r<4;r++)for(let c=0;c<5;c++)s+=`<circle cx="${3+c*5.2}" cy="${3.2+r*5.1}" r="1.15" fill="#fff"/>`;return s},
EU:()=>{let s='<rect width="60" height="40" fill="#039"/>';for(let i=0;i<12;i++){const a=i*Math.PI/6;s+=`<circle cx="${30+12*Math.cos(a)}" cy="${20+12*Math.sin(a)}" r="1.9" fill="#fc0"/>`}return s},
GB:()=>jack,
JP:()=>'<rect width="60" height="40" fill="#fff"/><circle cx="30" cy="20" r="12" fill="#bc002d"/>',
CN:()=>`<rect width="60" height="40" fill="#de2910"/><polygon points="${star(10,10,6.5,2.6)}" fill="#ffde00"/>`+[[20,4],[24,9],[24,15],[20,20]].map(p=>`<polygon points="${star(p[0],p[1],2,.8)}" fill="#ffde00"/>`).join(''),
CA:()=>'<rect width="60" height="40" fill="#d52b1e"/><rect x="15" width="30" height="40" fill="#fff"/><path d="M30 8l3 7 5-2-2 8 4 2-9 3v6h-2v-6l-9-3 4-2-2-8 5 2z" fill="#d52b1e"/>',
AU:()=>`<rect width="60" height="40" fill="#00247d"/><g transform="scale(.5)">${jack}</g><polygon points="${star(15,30,6,2.6)}" fill="#fff"/>`+[[45,8],[52,18],[39,19],[45,33],[49,25]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="2" fill="#fff"/>`).join(''),
NZ:()=>`<rect width="60" height="40" fill="#00247d"/><g transform="scale(.5)">${jack}</g>`+[[45,9],[38,19],[52,21],[45,32]].map(p=>`<polygon points="${star(p[0],p[1],3.4,1.4)}" fill="#cc142b" stroke="#fff" stroke-width=".7"/>`).join(''),
CH:()=>'<rect width="60" height="40" fill="#d52b1e"/><rect x="25" y="8" width="10" height="24" fill="#fff"/><rect x="14" y="15" width="32" height="10" fill="#fff"/>',
DE:()=>hor('#000','#d00','#ffce00'),FR:()=>tri('#002395','#fff','#ed2939'),IT:()=>tri('#009246','#fff','#ce2b37')};
const C2C={USD:'US',EUR:'EU',GBP:'GB',JPY:'JP',CNY:'CN',CAD:'CA',AUD:'AU',NZD:'NZ',CHF:'CH'};
const flagCode=e=>String(e.country||C2C[e.currency]||e.currency||'XX').toUpperCase();
const flagBody=c=>(window.EFX_WORLD&&EFX_WORLD[c])?`<svg viewBox="${EFX_WORLD[c][0]}" width="60" height="40" preserveAspectRatio="none">${EFX_WORLD[c][1]}</svg>`:FLAG[c]?FLAG[c]():`<rect width="60" height="40" fill="#2b2923"/><text x="30" y="21" font-size="17" font-weight="700" fill="#e9c46a" text-anchor="middle" dominant-baseline="central">${esc(c)}</text>`;

/* ---------- social icons (centered at 0,0) ---------- */
const ICON=(t,g)=>{const s=`stroke="${g}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
if(t=='instagram')return`<rect x="-14" y="-14" width="28" height="28" rx="8" ${s}/><circle r="6.5" ${s}/><circle cx="9" cy="-9" r="1.8" fill="${g}"/>`;
if(t=='telegram')return`<circle r="16" fill="${g}"/><path d="M-9 0L9-8 5 9-1 4-4 8-4 2 5-4-6 1Z" fill="#111"/>`;
if(t=='youtube')return`<rect x="-16" y="-11" width="32" height="22" rx="7" ${s}/><path d="M-3-5L6 0-3 5Z" fill="${g}"/>`;
if(t=='x')return`<path d="M-11-12L11 12M11-12L-11 12" ${s}/>`;
return`<circle r="14" ${s}/><ellipse rx="6" ry="14" ${s}/><path d="M-14 0H14" ${s}/>`};

FLAG.IR=()=>hor('#239f40','#fff','#da0000');
Object.assign(C2C,Object.fromEntries('USD:US,EUR:EU,GBP:GB,JPY:JP,CNY:CN,CAD:CA,AUD:AU,NZD:NZ,CHF:CH,SEK:SE,NOK:NO,DKK:DK,PLN:PL,CZK:CZ,HUF:HU,TRY:TR,RUB:RU,INR:IN,KRW:KR,SGD:SG,HKD:HK,TWD:TW,THB:TH,IDR:ID,MYR:MY,PHP:PH,VND:VN,ZAR:ZA,BRL:BR,MXN:MX,ARS:AR,CLP:CL,COP:CO,PEN:PE,SAR:SA,AED:AE,QAR:QA,KWD:KW,BHD:BH,OMR:OM,ILS:IL,EGP:EG,NGN:NG,KES:KE,MAD:MA,PKR:PK,BDT:BD,LKR:LK,UAH:UA,RON:RO,BGN:BG,ISK:IS,IRR:IR,IQD:IQ,JOD:JO,GHS:GH'.split(',').map(x=>x.split(':'))));
