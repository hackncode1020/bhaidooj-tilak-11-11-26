
import sys,time
from playwright.sync_api import sync_playwright
D=sys.argv[1]; a=int(sys.argv[2]); b_=int(sys.argv[3]); step=int(sys.argv[4]) if len(sys.argv)>4 else 1
with sync_playwright() as p:
    b=p.chromium.launch()
    pg=b.new_page(viewport={"width":1080,"height":1920})
    pg.on("pageerror",lambda e:print("ERR",e))
    pg.goto("file://"+D+"render.html")
    pg.evaluate("document.fonts.ready")
    for f in range(a,b_,step):
        pg.evaluate(f"step({f/30})")
        pg.screenshot(path=f"{D}fr/{f:04d}.png")
    b.close()
