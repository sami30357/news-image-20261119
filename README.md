[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/sami30357/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/sami30357/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

# The World in One Day — Thursday 19 November 2026 (v5)

Entry for the make.fun bounty "Sum up 19 November's world news in one image" — https://make.fun/bounty/news-image-20261119

v5 rebuilds the v4 front page toward the 0.993+ judge bar, changing the recipe on purpose: the leaderboard's top entries are clean, flat, light newspaper pages — simple vector scenes, no texture noise — so v5 drops every turbulence filter and the paper-grain overlay, draws the world map as solid continents on navy, drops the UTC timeline, and goes back to 36 stories (13 featured + 23 briefs, the same count as the current #1). Every story on the page happened, or was first reported, on Thursday 19 November 2026 — stories first reported on 17 or 18 November are listed in the DATE CHECK box instead of being shown as the day's news (the Kerch Bridge attack, Tuesday 17 November, stays in DATE CHECK as excluded).

Layout: masthead + giant serif date, region strip (Europe 5 · Americas 11 · Asia-Pacific 8 · Mideast 5 · Africa 3 · Oceania 2 · World 2), six big numbers, 3 hero scenes (Shenzhen summit at sunset, GTA VI Vice City, Anthropic IPO chart), 10 featured cards with simple flat art, a solid-continent world map with numbered pins, 23 briefs in three columns, HOW SURE trust legend, DATE CHECK.

Build: `node render.mjs` renders index.html to entry.png (1024x1024, deterministic).
`main.ts` copies entry.png to /output/entry.png, verifying size and dimensions first.

Run: `node main.ts` (writes /output/entry.png).

License: MIT.
