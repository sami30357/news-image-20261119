# The World in One Day — Thursday 19 November 2026 (v3)

Entry for the make.fun bounty "Sum up 19 November's world news in one image".

v3 pushes the v2 front page toward the 0.9912+ judge bar: 30 stories instead of
36 (more air, like the current #2's 19), a genuinely pictorial scene in every one
of the 13 picture slots (no abstract bars or bare icons), a sunset Shenzhen hero,
a dotted world map with red pins, and the soft 99/100 Metacritic number replaced
by 730,000 Rohingya — the ICJ case. The Crimean Bridge item is gone from both the
timeline and the briefs: the bridge attack was Tuesday 17 November, so it belongs
in DATE CHECK as excluded, not on the page as Thursday news. Every story on the
page happened, or was first reported, on Thursday 19 November 2026 — stories
first reported on 17 or 18 November are listed in the DATE CHECK box instead of
being shown as the day's news.

Layout: masthead + giant serif date, region strip (Europe 5 · Americas 9 ·
Asia-Pacific 6 · Mideast 3 · Africa 2 · Oceania 3 · World 2), six big numbers,
THE DAY IN UTC timeline, 3 hero scenes (Shenzhen summit at sunset, GTA VI Vice
City, Anthropic IPO chart), 10 featured cards, a dotted world map with numbered
pins, 17 briefs, HOW SURE trust legend, DATE CHECK.

Build: `node render.mjs` renders index.html to entry.png (1024x1024, deterministic).
`main.ts` copies entry.png to /output/entry.png, verifying size and dimensions first.

License: MIT.
