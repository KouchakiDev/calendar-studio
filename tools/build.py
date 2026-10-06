"""python tools/build.py          -> regenerates js/data.js + js/fonts.js from templates/, data/, assets/, fonts/
   python tools/build.py bundle   -> also writes dist/calendar-studio.html (single file)"""
import base64,glob,json,os,re,sys
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rd=lambda p:open(os.path.join(R,p),encoding='utf-8').read()
b64=lambda p:base64.b64encode(open(os.path.join(R,p),'rb').read()).decode()
def wr(p,s):
    os.makedirs(os.path.dirname(os.path.join(R,p)),exist_ok=True);open(os.path.join(R,p),'w',encoding='utf-8').write(s)
tpl=[json.load(open(f,encoding='utf-8')) for f in sorted(glob.glob(R+'/templates/*.json'))]
wr('js/data.js','window.EFX_TEMPLATES='+json.dumps(tpl,ensure_ascii=False)+';\nwindow.EFX_SAMPLE='+json.dumps(json.loads(rd('data/sample-calendar.json')),ensure_ascii=False)+';\nwindow.EFX_LOGO="data:image/jpeg;base64,'+b64('assets/logo.jpg')+'";\n')
F=[('Inter',500,'inter-latin-500-normal'),('Inter',700,'inter-latin-700-normal'),('Vazirmatn',500,'vazirmatn-arabic-500-normal'),('Vazirmatn',800,'vazirmatn-arabic-800-normal')]
css=''.join("@font-face{font-family:'%s';font-weight:%d;src:url(data:font/woff2;base64,%s) format('woff2')}"%(n,w,b64('fonts/%s.woff2'%f)) for n,w,f in F)
wr('js/fonts.js','window.EFX_FONTCSS='+json.dumps(css)+';\n')
if 'bundle' in sys.argv:
    h=rd('index.html')
    c=rd('css/app.css');c=re.sub(r'url\(\.\./fonts/([\w-]+\.woff2)\)',lambda m:'url(data:font/woff2;base64,%s)'%b64('fonts/'+m.group(1)),c)
    h=h.replace('<link rel="stylesheet" href="css/app.css">','<style>'+c+'</style>')
    h=re.sub(r'<script src="(js/[\w.-]+)"></script>',lambda m:'<script>'+rd(m.group(1))+'</script>',h)
    wr('dist/calendar-studio.html',h)
print('built')
