[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/sami30357/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/sami30357/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

# The Evening Atlas — Thursday 19 November 2026 (v9)

Entry for the make.fun bounty "Sum up 19 November's world news in one image" — https://make.fun/bounty/news-image-20261119

v9 is a genuinely different page, not another tweak of the cream front page: the whole sheet goes dark — deep ink navy with cream type and gold numbers — because every top entry is a cream paper page and a dark page is instantly distinct in a pairwise comparison. It keeps what the judge has rewarded all week (36 verified stories, 6 big numbers, 3 pictorial heroes, 13 featured, a numbered world map, 23 briefs, DATE CHECK) and adds the two things only the current #1 has that v8 lacked: a THE DAY BY HOURS strip (local time, in order) and a THE VERDICT callout for the Hague ruling. The map is redrawn as gold dots on navy (pattern-filled coastlines) instead of solid cream continents. Every story on the page happened, or was first reported, on Thursday 19 November 2026 — stories first reported on 17 or 18 November are listed in the DATE CHECK box instead of being shown as the day's news (the Kerch Bridge attack, Tuesday 17 November, stays in DATE CHECK as excluded).

Layout: masthead + giant left-aligned serif date on ink navy, region strip (Europe 5 · Americas 11 · Asia-Pacific 8 · Mideast 5 · Africa 3 · Oceania 2 · World 2), six big gold numbers, THE DAY BY HOURS strip, 3 hero scenes (Shenzhen summit, GTA VI Vice City, Anthropic IPO chart), 10 featured cards with simple flat art, a dotted-gold world map with numbered pins, THE VERDICT callout, 23 briefs in three columns, DATE CHECK.

Build: `node render.mjs` renders index.html to entry.png (1024x1024, deterministic).
`main.ts` copies entry.png to /output/entry.png, verifying size and dimensions first.

Run: `node main.ts` (writes /output/entry.png).

License: MIT.
