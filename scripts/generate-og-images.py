import json, asyncio, html, os
from playwright.async_api import async_playwright
P="/home/claude/enactus-fsjes-souissi"
j=json.load(open('/tmp/og/data.json')); D=j['d']; A=j['activities']
nm=P+"/node_modules"
fonts=f"""
@font-face{{font-family:Bodoni;src:url(file://{nm}/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-opsz-normal.woff2)}}
@font-face{{font-family:Bodoni;font-style:italic;src:url(file://{nm}/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-opsz-italic.woff2)}}
@font-face{{font-family:Manrope;src:url(file://{nm}/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2)}}
@font-face{{font-family:Amiri;src:url(file://{nm}/@fontsource/amiri/files/amiri-arabic-400-normal.woff2)}}
@font-face{{font-family:Plex;src:url(file://{nm}/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2)}}
"""
def page(locale,title,sub,img):
    rtl = locale=="ar"
    disp = "Amiri, Bodoni" if rtl else "Bodoni"
    sans = "Plex, Manrope" if rtl else "Manrope"
    imgblock = f'<div class="ph"><img src="file://{P}/public{img}"></div>' if img else ""
    return f"""<html dir="{'rtl' if rtl else 'ltr'}"><head><style>{fonts}
*{{margin:0;box-sizing:border-box}}
body{{width:1200px;height:630px;overflow:hidden;background:radial-gradient(60% 70% at 85% 10%,#4a0f52 0%,transparent 70%),radial-gradient(50% 60% at 0% 100%,rgba(248,192,18,.12),transparent 70%),#120814;color:#fff;font-family:{sans};position:relative}}
.pat{{position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z' fill='none' stroke='%23F8C012' stroke-opacity='0.09'/%3E%3C/svg%3E")}}
.wrap{{position:absolute;inset:56px 64px;display:flex;gap:48px;align-items:center}}
.txt{{flex:1;display:flex;flex-direction:column;height:100%;justify-content:space-between}}
.logo{{height:92px;width:auto;align-self:flex-start}}
.eye{{color:#f8c012;font-size:17px;letter-spacing:{0 if rtl else 5}px;text-transform:uppercase;display:flex;align-items:center;gap:14px}}
.eye:before{{content:"";width:38px;height:2px;background:#f8c012}}
h1{{font-family:{disp};font-weight:400;font-size:{58 if len(title)>34 else 72}px;line-height:1.05;margin-top:18px}}
.sub{{font-family:{disp};font-style:italic;font-size:28px;margin-top:16px;background:linear-gradient(100deg,#fce38a,#f8c012 45%,#d9a20a);-webkit-background-clip:text;color:transparent;line-height:1.3}}
.rule{{height:1px;background:linear-gradient(90deg,transparent,rgba(248,192,18,.7),transparent);margin-top:26px}}
.foot{{font-size:16px;color:rgba(255,255,255,.55)}}
.ph{{width:340px;height:425px;border-radius:26px;overflow:hidden;border:1px solid rgba(248,192,18,.45);box-shadow:0 40px 90px -30px rgba(132,22,138,.9);flex-shrink:0}}
.ph img{{width:100%;height:100%;object-fit:cover}}
</style></head><body><div class="pat"></div><div class="wrap"><div class="txt">
<img class="logo" src="file://{P}/public/images/brand/logo-enactus-fsjes-souissi.png">
<div><div class="eye" dir="ltr" style="justify-content:{'flex-end' if rtl else 'flex-start'}">Enactus FSJES Souissi · Rabat</div><h1>{html.escape(title)}</h1>{f'<div class="sub">{html.escape(sub)}</div>' if sub else ''}<div class="rule"></div></div>
<div class="foot" dir="ltr" style="text-align:{'right' if rtl else 'left'}">Think. Create. Impact.</div></div>{imgblock}</div></body></html>"""

jobs=[]
for l in ["fr","en","ar"]:
    d=D[l]
    pages={
     "home":(" ".join(d["home"]["slogan"]), d["home"]["eyebrow"].split("·")[0].strip(), "/images/team/equipe.jpg"),
     "about":(d["about"]["title"], d["about"]["lead"], "/images/team/equipe.jpg"),
     "team":(d["team"]["title"], d["home"]["boardEyebrow"], "/images/team/hiba-derkaoui.jpg"),
     "poles":(d["poles"]["title"], None, "/images/team/hiba-kriat.jpg"),
     "projects":(d["projects"]["title"], None, None),
     "activities":(d["activities"]["title"], d["home"]["latestTitle"], "/images/activities/sdg-in-action/photo-01.jpg"),
     "partners":(d["partners"]["title"], None, None),
     "join":(d["join"]["title"], d["home"]["joinTitle"], "/images/team/equipe.jpg"),
     "contact":(d["contact"]["title"], d["contact"]["lead"], None),
    }
    for k,(t,s,img) in pages.items(): jobs.append((f"{l}-{k}",l,t,s,img))
    for a in A:
        sub = a["subtitle"][l] if a.get("subtitle") else None
        jobs.append((f"{l}-activity-{a['slug']}",l,a["title"][l],sub,a["cover"]))

async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={"width":1200,"height":630})
        for name,l,t,s,img in jobs:
            open('/tmp/og/p.html','w').write(page(l,t,s,img))
            await pg.goto("file:///tmp/og/p.html"); await pg.wait_for_timeout(250)
            await pg.screenshot(path=f"/tmp/og/{name}.png")
        await b.close()
asyncio.run(main())
from PIL import Image
for name,*_ in jobs:
    Image.open(f"/tmp/og/{name}.png").convert("RGB").save(f"{P}/public/og/{name}.jpg",quality=84,optimize=True,progressive=True)
print(len(jobs))
