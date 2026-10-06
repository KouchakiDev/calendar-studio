"""One-off: npm pack country-flag-icons, then python tools/gen_flags.py <extracted package dir> -> js/world-flags.js"""
import glob,json,os,re,sys
pk=sys.argv[1];W={}
for f in sorted(glob.glob(pk+'/3x2/*.svg')):
    c=os.path.basename(f)[:-4];s=open(f,encoding='utf-8').read()
    m=re.search(r'<svg[^>]*viewBox="([^"]+)"[^>]*>(.*)</svg>',s,re.S)
    if not m: continue
    inner=re.sub(r'>\s+<','><',m.group(2).strip())
    for i in set(re.findall(r'id="([^"]+)"',inner)):
        inner=inner.replace('id="%s"'%i,'id="%s_%s"'%(c,i)).replace('url(#%s)'%i,'url(#%s_%s)'%(c,i)).replace('href="#%s"'%i,'href="#%s_%s"'%(c,i))
    W[c]=[m.group(1),inner]
open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'js/world-flags.js'),'w',encoding='utf-8').write('/* flags: country-flag-icons (MIT) */\nwindow.EFX_WORLD='+json.dumps(W,separators=(',',':'))+';\n')
print(len(W),'flags')
