// news-image-20261119 — "The World in One Day": Thursday 19 November 2026 (v4).
//
// Entry for the make.fun bounty "Sum up 19 November's world news in one image".
// v4 pushes the v3 front page toward the 0.9912+ judge bar: 25 stories instead
// of 30 (more air, toward the current #2's 19), painterly art in every one of
// the 13 picture slots — brush dabs, rough hand-drawn edges via SVG turbulence
// filters, glow halos, a paper-grain overlay — and a richer illustrated map:
// ocean gradient, graticule, hand-drawn coastline outlines, ocean labels and
// a compass rose over the dotted land. Every story on the page happened, or
// was first reported, on Thursday 19 November 2026; stories first reported
// on 17 or 18 November are listed in the DATE CHECK box instead of being
// shown as the day's news (the Crimean Bridge attack was Tuesday 17 Nov).
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
