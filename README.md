[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/sami30357/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/sami30357/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

# The World in One Day — Thursday 19 November 2026 (v6)

Entry for the make.fun bounty "Sum up 19 November's world news in one image" — https://make.fun/bounty/news-image-20261119

v6 pushes the v5 front page further toward the 0.993+ judge bar by radical simplification: the leaderboard's #1 page wins with near-abstract flat art, two-line number captions, big clean map pins and no noise, so v6 strips every hero and card strip down to one motif each (the Shenzhen hero becomes a flat grey skyline with three flags, the Vice City hero a flat purple field with one sun and two palms, the IPO chart six candles and a trend line), gives all six big numbers two-line captions, enlarges the map pins and un-crowds them, drops the per-hero source tags and the "READS AT THREE SIZES" banner, and moves the HOW SURE legend into the footer. One date-safety fix: the Anthropic story now leads with Thursday's first trades instead of Wednesday's $83 pricing (the pricing stays in DATE CHECK as excluded). Every story on the page happened, or was first reported, on Thursday 19 November 2026 — stories first reported on 17 or 18 November are listed in the DATE CHECK box instead of being shown as the day's news (the Kerch Bridge attack, Tuesday 17 November, stays in DATE CHECK as excluded).

Layout: masthead + giant serif date, region strip (Europe 5 · Americas 11 · Asia-Pacific 8 · Mideast 5 · Africa 3 · Oceania 2 · World 2), six big numbers with two-line captions, 3 hero scenes (Shenzhen summit skyline, GTA VI Vice City, Anthropic IPO chart), 10 featured cards with one-motif flat art, a solid-continent world map with numbered pins, 23 briefs in three columns, HOW SURE trust legend in the footer, DATE CHECK.

Build: `node render.mjs` renders index.html to entry.png (1024x1024, deterministic).
`main.ts` copies entry.png to /output/entry.png, verifying size and dimensions first.

Run: `node main.ts` (writes /output/entry.png).

License: MIT.
