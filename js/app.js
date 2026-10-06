/* EFX Calendar Studio - UI controller (i18n, theme, templates, export) */
(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const I={
en:{tpls:'Templates',exp:'Export',res:'Resolution',min:'Minimum impact',all:'All events',mh:'Medium & high',hi:'High only',svg:'Download SVG',png:'Download PNG',data:'Calendar data',tp:'Template',sample:'Load sample',fmt:'Format',impD:'Import data',impT:'Import template',saveT:'Save template',logo:'Upload logo',fit:'Fit',ev:'events',elem:'Element'},
fa:{tpls:'تمپلیت‌ها',exp:'خروجی',res:'رزولوشن',min:'حداقل اهمیت',all:'همه رویدادها',mh:'متوسط و زیاد',hi:'فقط زیاد',svg:'دانلود SVG',png:'دانلود PNG',data:'داده تقویم',tp:'تمپلیت',sample:'بارگذاری نمونه',fmt:'مرتب‌سازی',impD:'ورود داده',impT:'ورود تمپلیت',saveT:'ذخیره تمپلیت',logo:'آپلود لوگو',fit:'متناسب',ev:'رویداد',elem:'المان'}};
const st=(k,v)=>{try{localStorage.setItem('efx_'+k,v)}catch(e){}},ld=(k,d)=>{try{return localStorage.getItem('efx_'+k)||d}catch(e){return d}};
let lang=ld('lang','fa'),theme=ld('theme',matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'),z=100,cur=0,info='';
const TPL=window.EFX_TEMPLATES.slice(),pretty=o=>JSON.stringify(o,null,1);
const mg=(a,b)=>{const o={...a};for(const k in b)o[k]=b[k]&&typeof b[k]=='object'&&!Array.isArray(b[k])?mg(a[k]||{},b[k]):b[k];return o};
const err=m=>$('#err').textContent=m||'';
function applyLang(){const h=document.documentElement;h.lang=lang;h.dir=lang=='fa'?'rtl':'ltr';$$('[data-i]').forEach(e=>e.textContent=I[lang][e.dataset.i]);$$('#langSeg button').forEach(b=>b.classList.toggle('on',b.dataset.l==lang));st('lang',lang);status();window.Editor&&Editor.panel()}
function applyTheme(){document.documentElement.dataset.theme=theme;st('theme',theme)}
function status(){$('#s1').textContent=info?info.replace('EV',I[lang].ev):''}
function model(){let d,t;try{d=JSON.parse($('#jd').value);t=JSON.parse($('#jt').value)}catch(e){err('JSON: '+e.message);return null}err('');const m=mg(t,d);if(window.EFX_USERLOGO)m.brand={...m.brand,logo:window.EFX_USERLOGO};return m}
function render(){const m=model();if(!m)return;const r=build(m,null,{min:+$('#min').value});$('#pv').innerHTML=r.svg;const p=+$('#res').value;info=`${(m.events||[]).length} EV · ${p}×${Math.round(p*r.H/r.W)} px · SVG vector`;status();window.Editor&&Editor.after()}
function tplList(){$('#tplList').innerHTML='';TPL.forEach((t,i)=>{const e=document.createElement('div'),c=t.theme||{};e.className='tpl'+(i==cur?' on':'');e.tabIndex=0;e.innerHTML=`<div class="sw" style="background:linear-gradient(135deg,${c.bg1||'#000'},${c.bg2||'#222'})"><i style="background:${c.gold||'#e9c46a'}"></i></div><span>${t.name||t.id}</span>`;e.onclick=e.onkeydown=ev=>{if(ev.type=='click'||ev.key=='Enter')pick(i)};$('#tplList').appendChild(e)})}
function pick(i){cur=i;$('#jt').value=pretty(TPL[i]);tplList();render()}
function dl(b,n){const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}
function out(){const m=model();if(!m)return null;const p=+$('#res').value;return{r:build(m,p,{min:+$('#min').value}),p,n:`${(TPL[cur]||{}).id||'calendar'}-${m.isoDate||'day'}-${p}`}}
function file(cb,url){const f=document.createElement('input');f.type='file';f.accept=url?'image/*':'.json,application/json';f.onchange=()=>{const r=new FileReader();r.onload=()=>cb(r.result);url?r.readAsDataURL(f.files[0]):r.readAsText(f.files[0])};f.click()}
$('#bSvg').onclick=()=>{const o=out();if(o)dl(new Blob(['<?xml version="1.0" encoding="UTF-8"?>\n'+o.r.svg],{type:'image/svg+xml'}),o.n+'.svg')};
$('#bPng').onclick=()=>{const o=out();if(!o)return;const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=o.p;c.height=Math.round(o.p*o.r.H/o.r.W);c.getContext('2d').drawImage(im,0,0,c.width,c.height);c.toBlob(b=>b?dl(b,o.n+'.png'):err('PNG too large for this browser - use SVG or a smaller size'),'image/png')};im.onerror=()=>err('PNG render failed');im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(o.r.svg)};
$('#bSample').onclick=()=>{$('#jd').value=pretty(EFX_SAMPLE);render()};
$('#bFmt').onclick=()=>{try{$('#jd').value=pretty(JSON.parse($('#jd').value));$('#jt').value=pretty(JSON.parse($('#jt').value));err('')}catch(e){err('JSON: '+e.message)}};
$('#bImpD').onclick=()=>file(t=>{$('#jd').value=t;render()});
$('#bImpT').onclick=()=>file(t=>{try{const o=JSON.parse(t);o.name=o.name||o.id||'Custom';TPL.push(o);pick(TPL.length-1)}catch(e){err('JSON: '+e.message)}});
$('#bSaveT').onclick=()=>{try{const o=JSON.parse($('#jt').value);dl(new Blob([pretty(o)],{type:'application/json'}),(o.id||'template')+'.json')}catch(e){err('JSON: '+e.message)}};
$('#bLogo').onclick=()=>file(u=>{window.EFX_USERLOGO=u;render()},1);
const tab=t=>{$$('.tabs button').forEach(x=>x.classList.toggle('on',x.dataset.t==t));$('#jd').hidden=t!='d';$('#jt').hidden=t!='t';$('#je').hidden=t!='e'};$$('.tabs button').forEach(b=>b.onclick=()=>tab(b.dataset.t));
const zoom=v=>{z=v;$('#pv').style.setProperty('--z',z+'%');$('#zv').textContent=z+'%'};
$('#zi').onclick=()=>zoom(Math.min(400,z+25));$('#zo').onclick=()=>zoom(Math.max(25,z-25));$('#zf').onclick=()=>zoom(100);
$('#themeBtn').onclick=()=>{theme=theme=='dark'?'light':'dark';applyTheme()};
$$('#langSeg button').forEach(b=>{b.innerHTML=`<svg viewBox="0 0 60 40" width="26" height="18">${flagBody(b.dataset.l=='fa'?'IR':'GB')}</svg>`;b.onclick=()=>{lang=b.dataset.l;applyLang()}});
['res','min'].forEach(i=>$('#'+i).onchange=render);
let tm;['jd','jt'].forEach(i=>$('#'+i).oninput=()=>{clearTimeout(tm);tm=setTimeout(render,250)});
$('#jd').value=pretty(EFX_SAMPLE);applyTheme();applyLang();pick(0);
window.Studio={tab,lang:()=>lang,tpl:()=>{try{return JSON.parse($('#jt').value)}catch(e){return null}},setTpl:o=>{$('#jt').value=pretty(o);render()}};
})();
