[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/sami30357/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/sami30357/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

# The World in One Day — Thursday 19 November 2026 (v4)

Entry for the make.fun bounty "Sum up 19 November's world news in one image" — https://make.fun/bounty/news-image-20261119

v4 pushes the v3 front page toward the 0.9912+ judge bar: 25 stories instead of
30 (more air, toward the current #2's 19), painterly art in every one of the 13
picture slots — brush dabs, rough hand-drawn edges via SVG turbulence filters,
glow halos, a paper-grain overlay — and a richer illustrated map: ocean gradient,
graticule, hand-drawn coastline outlines, ocean labels and a compass rose over
the dotted land. The Crimean Bridge item stays out of the timeline and briefs:
the bridge attack was Tuesday 17 November, so it belongs in DATE CHECK as
excluded, not on the page as Thursday news. Every story on the page happened,
or was first reported, on Thursday 19 November 2026 — stories first reported
on 17 or 18 November are listed in the DATE CHECK box instead of being shown
as the day's news.

Layout: masthead + giant serif date, region strip (Europe 4 · Americas 8 ·
Asia-Pacific 5 · Mideast 3 · Africa 2 · Oceania 1 · World 2), six big numbers,
THE DAY IN UTC timeline, 3 hero scenes (Shenzhen summit at sunset, GTA VI Vice
City, Anthropic IPO chart), 10 featured cards, an illustrated world map with
numbered pins, 12 briefs, HOW SURE trust legend, DATE CHECK.

Build: `node render.mjs` renders index.html to entry.png (1024x1024, deterministic).
`main.ts` copies entry.png to /output/entry.png, verifying size and dimensions first.

Run: `node main.ts` (writes /output/entry.png).

License: MIT.
