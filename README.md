# Bhai Dooj tilak - SVG + JavaScript (Day 16 of 100)

Rose-curve petals draw themselves, a tilak and rice grains land in the centre, two threads twist into one, hearts float up. All of it is one SVG animated by plain JavaScript (`bhaidooj.js`).

- `bhaidooj.js` - the whole animation (rose curves, stroke-dash drawing, tilak, threads, hearts)
- `render.html` - page that runs it; call `step(seconds)` to render any frame
- `capture.py` - Playwright script that steps `step()` at 30 fps and saves PNG frames

Render: `mkdir fr && python3 capture.py $PWD 0 510` then `ffmpeg -framerate 30 -i fr/%04d.png -pix_fmt yuv420p out.mp4`.

By @hack.n.code - 100 Days Daily Reel Challenge.
