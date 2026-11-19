[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/sami30357/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/sami30357/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

# The World in One Day — Thursday 19 November 2026 (v8)

Entry for the make.fun bounty "Sum up 19 November's world news in one image" — https://make.fun/bounty/news-image-20261119

v8 goes for maximum score: 0.993 is the target, so it takes the bolder hierarchy the top two pages share and merges it with the 36-story coverage that wins. The headline grows to 56px and aligns left like the #1 page; the hero art grows from 94 to 112px and the Vice City hero becomes properly pictorial (big sun, two palms, skyline, a game controller over the sun, like the #2 page); the Shenzhen hero gains the red sun disc the top page carries; the IPO chart's $83 grows to 20px; the ten card strips grow from 44 to 56px with bodies trimmed to two lines. The map stays the v7 redraw (real coastlines, heading inside the navy box, grey dots for all 23 briefs plus a grey 10 for the science story); the sixth big number stays Voyager 1's 16bn miles. Every story on the page happened, or was first reported, on Thursday 19 November 2026 — stories first reported on 17 or 18 November are listed in the DATE CHECK box instead of being shown as the day's news (the Kerch Bridge attack, Tuesday 17 November, stays in DATE CHECK as excluded).

Layout: masthead + giant left-aligned serif date, region strip (Europe 5 · Americas 11 · Asia-Pacific 8 · Mideast 5 · Africa 3 · Oceania 2 · World 2), six big numbers, 3 hero scenes (Shenzhen summit, GTA VI Vice City, Anthropic IPO chart), 10 featured cards with simple flat art, a solid-continent world map with numbered pins, 23 briefs in three columns, DATE CHECK.

Build: `node render.mjs` renders index.html to entry.png (1024x1024, deterministic).
`main.ts` copies entry.png to /output/entry.png, verifying size and dimensions first.

Run: `node main.ts` (writes /output/entry.png).

License: MIT.
