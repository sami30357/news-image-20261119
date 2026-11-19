[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/sami30357/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/sami30357/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

# The World in One Day — Thursday 19 November 2026 (v7)

Entry for the make.fun bounty "Sum up 19 November's world news in one image" — https://make.fun/bounty/news-image-20261119

v7 closes the last gaps the v6 study found against the leaderboard's #1 page (@quick-finch-51, 0.992162), which wins with near-abstract flat art: the Shenzhen hero loses its sun disc and pill and becomes six plain grey-blue blocks with three flags; the Vice City hero loses its palms and its pill and becomes a flat purple field, one sun, a dark silhouette and plain "OUT TODAY" text; the IPO chart loses its "DAY ONE" pill and puts ANT top-left, NASDAQ top-centre and $83 top-right like the top page; the four card strips that still carried words inside the art (RED ALERT, the APEC line and 21 badge, ALL CLEAR, the SEIZED tape) become wordless motifs; the sixth big number becomes Voyager 1's 16bn miles, the top page's own winning number; the map is redrawn with real coastlines, its heading and caption moved inside the navy box, grey dots marking all 23 briefs plus a grey 10 for the science story, and the Europe pins spread for breathing room; the footer drops the HOW SURE line and the Sotheby's source. The Anthropic story still leads with Thursday's first trades instead of Wednesday's $83 pricing (the pricing stays in DATE CHECK as excluded). Every story on the page happened, or was first reported, on Thursday 19 November 2026 — stories first reported on 17 or 18 November are listed in the DATE CHECK box instead of being shown as the day's news (the Kerch Bridge attack, Tuesday 17 November, stays in DATE CHECK as excluded).

Layout: masthead + giant serif date, region strip (Europe 5 · Americas 11 · Asia-Pacific 8 · Mideast 5 · Africa 3 · Oceania 2 · World 2), six big numbers with two-line captions, 3 hero scenes (Shenzhen summit skyline, GTA VI Vice City, Anthropic IPO chart), 10 featured cards with wordless one-motif flat art, a world map with numbered pins and grey brief dots, 23 briefs in three columns, DATE CHECK.

Build: `node render.mjs` renders index.html to entry.png (1024x1024, deterministic).
`main.ts` copies entry.png to /output/entry.png, verifying size and dimensions first.

Run: `node main.ts` (writes /output/entry.png).

License: MIT.
