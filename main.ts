// news-image-20261119 — "The World in One Day": Thursday 19 November 2026 (v8).
//
// Entry for the make.fun bounty "Sum up 19 November's world news in one image".
// v8 goes for maximum score — Robin said 0.993 is a NEED, not a stretch — so
// it takes the bolder hierarchy the top two pages share and merges it with
// the 36-story coverage that wins: the headline grows to 56px and aligns
// left like the #1 page (@quick-finch-51, 0.992113); the hero art grows
// from 94 to 112px and the Vice City hero becomes properly pictorial (big
// sun, two palms, skyline, a game controller over the sun, like the #2 page
// @lomfi, 0.991343); the Shenzhen hero gains the red sun disc the top page
// carries; the IPO chart's $83 grows to 20px; the ten card strips grow
// from 44 to 56px with bodies trimmed to two lines. The map stays the v7
// redraw (real coastlines, heading inside the navy box, grey dots for all
// 23 briefs plus a grey 10 for the science story); the sixth big number
// stays Voyager 1's 16bn miles; the Thursday-first-trades framing of the
// Anthropic story stays (Wednesday's $83 pricing stays in DATE CHECK as
// excluded). All 36 stories are still verified 19 November only; the Kerch
// Bridge attack (Tuesday 17 November) stays in DATE CHECK as excluded,
// never as a story.
//
// The program is the kit's entrypoint shape (Node 22, standard library
// only): it copies the pre-rendered 1024x1024 entry.png beside this file
// to /output/entry.png. The gate takes a whole PNG of at most 1 MiB and
// 1024 by 1024 pixels, and the judge sees exactly the bytes copied — so
// before copying we verify the file is really a 1024x1024 PNG under the
// size limit and fail loudly instead of shipping a broken entry.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1024 * 1024; // gate limit: 1 MiB
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;

const source = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dest = join(outDir, 'entry.png');

// Read the PNG header (IHDR) and check the dimensions are exactly 1024x1024.
function validatePng(path) {
  if (!existsSync(path)) {
    throw new Error(`entry.png missing next to main.ts: ${path}`);
  }
  const size = statSync(path).size;
  if (size > MAX_BYTES) {
    throw new Error(`entry.png is ${size} bytes, over the ${MAX_BYTES} byte gate limit`);
  }
  const header = readFileSync(path).subarray(0, 33);
  const width = header.readUInt32BE(16);
  const height = header.readUInt32BE(20);
  if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
    throw new Error(`entry.png is ${width}x${height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`);
  }
  return { size, width, height };
}

const checked = validatePng(source);
copyFileSync(source, dest);
console.log(`copied entry.png (${checked.size} bytes, ${checked.width}x${checked.height}) -> ${dest}`);
