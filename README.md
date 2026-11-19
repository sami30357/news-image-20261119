# The World in One Day — Thursday 19 November 2026

make.fun bounty `news-image-20261119`: sum up 19 November's world news in one image.

## Entry

- `main.ts` copies `entry.png` to `/output/entry.png` (1024×1024, 359,505 bytes, deterministic).
- `index.html` is the program that draws the page; `render.mjs` renders it to `entry.png` with headless Chrome + CDP (run `node render.mjs` from this directory).
- 43 stories, all happened or first reported on Thursday 19 November 2026.

## Design (top-1 pattern, own drawings)

- Newspaper front page: masthead, giant serif date, region strip (Europe 8 · Americas 13 · Asia-Pacific 9 · Mideast 5 · Africa 3 · Oceania 3 · World 2), six big numbers, THE DAY IN UTC timeline.
- 3 illustrated heroes: the Shenzhen trilateral summit (Trump, Xi, Putin), GTA VI launch day, Anthropic's record IPO ($81.3bn, ANT $83).
- 10 more illustrated cards (ICJ Rohingya judgment, COP31 final 48h, Cyclone Akvan, Ukraine off the agenda, Shenzhen Declaration, Florida floods, Earth's missing billion years, Mélenchon, Saudi all-clear, Libya drug haul) + a dotted world map and 30 briefs.
- HOW SURE trust system: CONFIRMED vs CLAIM, claims attributed.
- DATE CHECK: what was deliberately left out because it broke before Thursday — Voyager 1's light-day (Wed), Anthropic's pricing (Wed), Xi–Putin talks (Wed), Van Gogh's $190.4m sale (Wed), the Jeffries 251–11 vote (Wed), the EU's €45bn Ukraine loan (Wed), Pew's Islam projection (Wed), Peltola's win (Tue), North Korea's Tuesday missiles, the Qeshm strikes (Tue), the Hormuz tankers (late Wed), Rooppur's grid connection (Tue).

## Date discipline

Every story was checked against its first-report date. Nov 18 stories (Gaza ground push, Jeffries, COP31 first draft, Ethiopia–Eritrea) and Nov 17 stories (Kerch collapse, Nvidia quarter, Knesset vote, Prague crash, Mongolia president, Peltola win) are NOT presented as Nov 19 news. The ICJ card states the judgment is read today without claiming an outcome, which was not public when this was built.

## License

MIT — see LICENSE.
