/* EFX Calendar Studio - click-to-edit inspector. Edits are stored as template.overrides, so Save template exports them. */
(()=>{
const $=s=>document.querySelector(s),S=()=>window.Studio,esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const L={en:{scope:'Apply to',one:'This element',all:'All of this kind',text:'Text',fill:'Colour',stroke:'Stroke',size:'Font size',weight:'Weight',spacing:'Letter spacing',op:'Opacity',dx:'Move X',dy:'Move Y',hide:'Hidden',reset:'Reset element',country:'Country / flag',theme:'Theme colours',hint:'Click any element in the preview to edit it. Arrow keys nudge the selection (Shift = 10px).'},
fa:{scope:'اعمال روی',one:'همین المان',all:'همه المان‌های هم‌نوع',text:'متن',fill:'رنگ',stroke:'رنگ خط',size:'اندازه فونت',weight:'ضخامت',spacing:'فاصله حروف',op:'شفافیت',dx:'جابه‌جایی X',dy:'جابه‌جایی Y',hide:'مخفی',reset:'بازنشانی المان',country:'کشور / پرچم',theme:'رنگ‌های تم',hint:'روی هر المان در پیش‌نمایش کلیک کنید. کلیدهای جهت‌دار آن را جابه‌جا می‌کنند (Shift = ۱۰ پیکسل).'}};
const TH=['gold','gold2','bg1','bg2','p1','p2','tx','mut','high','med','low','pos','v1','v2','row'];
let sel=null,scope='one';
const hex=c=>{c=String(c||'');if(/^#[0-9a-f]{6}$/i.test(c))return c;if(/^#[0-9a-f]{3}$/i.test(c))return'#'+[...c.slice(1)].map(x=>x+x).join('');return'#888888'};
const key=()=>scope=='all'?'@'+sel.role:sel.id;
const el=()=>sel&&document.querySelector(`#pv [data-id="${CSS.escape(sel.id)}"]`);
const cur=()=>(((S().tpl()||{}).overrides||{})[key()])||{};
function set(p,v){const t=S().tpl();if(!t)return;t.overrides=t.overrides||{};const k=key(),o=t.overrides[k]=t.overrides[k]||{};if(v===''||v==null||v===false||v!==v)delete o[p];else o[p]=v;if(!Object.keys(o).length)delete t.overrides[k];S().setTpl(t)}
const nm=c=>{try{return new Intl.DisplayNames([S().lang()],{type:'region'}).of(c)}catch(e){return c}};
function pickEl(s){sel=s;if(s)S().tab('e');panel();after()}
function panel(){const p=$('#je');if(!p||!S())return;const t=L[S().lang()],e=el();
if(!sel||!e){sel=null;const th=(S().tpl()||{}).theme||{};p.innerHTML=`<p class="hint">${t.hint}</p><h4>${t.theme}</h4><div class="cg">${TH.map(k=>`<label>${k}<input type="color" data-th="${k}" value="${hex(th[k])}"></label>`).join('')}</div>`;
p.querySelectorAll('[data-th]').forEach(i=>i.oninput=()=>{const o=S().tpl();o.theme=o.theme||{};o.theme[i.dataset.th]=i.value;S().setTpl(o)});return}
const isT=e.tagName=='text',g=isT?e:(e.querySelector('[fill]')||e),a=(n,d)=>g.getAttribute(n)||d,o=cur();
const num=(id,lab,v,st)=>`<label>${lab}<input type="number" id="${id}" value="${v}" step="${st||1}"></label>`;
p.innerHTML=`<div class="chip"><b>${esc(sel.id)}</b><small>${esc(sel.role)}</small><button id="eX" aria-label="close">✕</button></div>
<label>${t.scope}<select id="eS"><option value="one">${t.one}</option><option value="all">${t.all}</option></select></label>`
+(isT?`<label>${t.text}<input id="eT" value="${esc(e.textContent)}"></label><div class="cg">${num('eF',t.size,Math.round(a('font-size',24)))}<label>${t.weight}<select id="eW">${[400,500,600,700,800].map(w=>`<option${w==a('font-weight',500)?' selected':''}>${w}</option>`).join('')}</select></label>${num('eL',t.spacing,o.ls||0)}</div>`:'')
+`<div class="cg"><label>${t.fill}<input type="color" id="eC" value="${hex(o.fill||a('fill'))}"></label><label>${t.stroke}<input type="color" id="eK" value="${hex(o.stroke||a('stroke'))}"></label>${num('eO',t.op,o.op??1,.1)}${num('eX2',t.dx,o.dx||0)}${num('eY',t.dy,o.dy||0)}</div>`
+(sel.role=='flag'?`<label>${t.country}<select id="eN"><option value=""></option>${Object.keys(window.EFX_WORLD||{}).map(c=>[c,nm(c)]).sort((x,y)=>x[1].localeCompare(y[1])).map(c=>`<option value="${c[0]}"${o.country==c[0]?' selected':''}>${c[0]} · ${esc(c[1])}</option>`).join('')}</select></label>`:'')
+`<label class="chk"><input type="checkbox" id="eH"${o.hide?' checked':''}> ${t.hide}</label><button id="eR">${t.reset}</button>`;
$('#eS').value=scope;
const b=(id,prop,f)=>{const i=$('#'+id);if(i)i.oninput=i.onchange=()=>set(prop,f?f(i):i.value)};
b('eT','text');b('eF','fs',i=>+i.value);b('eW','w',i=>+i.value);b('eL','ls',i=>+i.value);b('eC','fill');b('eK','stroke');b('eO','op',i=>i.value===''?'':+i.value);b('eX2','dx',i=>+i.value);b('eY','dy',i=>+i.value);b('eN','country');b('eH','hide',i=>i.checked);
$('#eS').onchange=ev=>{scope=ev.target.value;panel()};
$('#eR').onclick=()=>{const t=S().tpl();if(t.overrides){delete t.overrides[key()];if(!Object.keys(t.overrides).length)delete t.overrides}S().setTpl(t);panel()};
$('#eX').onclick=()=>pickEl(null)}
function after(){document.querySelectorAll('#pv .selbox').forEach(n=>n.remove());const e=el();if(!e)return;const b=e.getBBox(),r=document.createElementNS('http://www.w3.org/2000/svg','rect');
Object.entries({x:b.x-6,y:b.y-6,width:b.width+12,height:b.height+12,rx:6,fill:'none',stroke:'#3b82f6','stroke-width':3,'stroke-dasharray':'10 6','pointer-events':'none',class:'selbox'}).forEach(([k,v])=>r.setAttribute(k,v));
e.tagName=='g'?e.appendChild(r):e.after(r)}
$('#pv').addEventListener('click',ev=>{const n=ev.target.closest('[data-id]');pickEl(n?{id:n.dataset.id,role:n.dataset.role}:null)});
document.addEventListener('keydown',ev=>{if(!sel||!/^Arrow/.test(ev.key)||/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;ev.preventDefault();const s=ev.shiftKey?10:2,o=cur();
if(ev.key=='ArrowLeft')set('dx',(o.dx||0)-s);if(ev.key=='ArrowRight')set('dx',(o.dx||0)+s);if(ev.key=='ArrowUp')set('dy',(o.dy||0)-s);if(ev.key=='ArrowDown')set('dy',(o.dy||0)+s);panel()});
window.Editor={after,panel};panel();
})();
