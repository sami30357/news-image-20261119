// Render index.html to entry.png at exactly 1024x1024 (v5).
//
// The flow: start headless Chrome with remote debugging, open the local
// index.html in a fresh target, pin the viewport to exactly 1024x1024
// with Emulation.setDeviceMetricsOverride (so the capture never depends
// on window chrome or scrollbars), wait until the document is complete
// and laid out at that size, then take a PNG screenshot.
//
// Node's built-in WebSocket client talks CDP directly — no dependencies.
// Run from the repo directory; writes ./entry.png next to index.html.
//
//   node render.mjs
//
// The render is deterministic: the same index.html always produces the
// same bytes, which is what the bounty gate requires (the judge sees the
// exact bytes of entry.png). The page uses only flat vector art and plain
// gradients, so nothing in it depends on randomness or timing.

import { writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// --- config (environment-specific, keep in sync with the local Chrome) ---
const CHROME_BIN = '/opt/meta-chromium/chrome';
const DEBUG_PORT = 9223;
const SIZE = 1024; // entry must be exactly 1024x1024
const WEBGL_DOMAINS_FILE =
  '/var/lib/hatch-browser/rootfs-base/usr/share/hatch/chromium/webgl-allowed-domains.txt';
const WEBGL_DOMAINS_SHA256 =
  '8097045f0459c96c4cdc76e3a1af4e0f43f640b4b59c43d6db35e3641c0264c6';

const REPO_DIR = dirname(fileURLToPath(import.meta.url));
const PAGE_URL = `file://${join(REPO_DIR, 'index.html')}`;
const OUT_PATH = join(REPO_DIR, 'entry.png');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- DevTools HTTP endpoints (http://127.0.0.1:9223/json/...) ---
async function devtoolsJson(path, method = 'GET') {
  const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}${path}`, { method });
  if (!res.ok) throw new Error(`DevTools ${method} ${path} -> HTTP ${res.status}`);
  return res.json();
}

// --- Minimal CDP client over the built-in WebSocket ---
class CdpClient {
  constructor(wsUrl) {
    this.socket = new WebSocket(wsUrl);
    this.nextId = 0;
    this.waiting = new Map();
    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const pending = this.waiting.get(msg.id);
      if (!pending) return;
      this.waiting.delete(msg.id);
      if (msg.error) pending.reject(new Error(JSON.stringify(msg.error)));
      else pending.resolve(msg.result);
    };
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.socket.onopen = resolve;
      this.socket.onerror = reject;
    });
  }

  send(method, params = {}) {
    const id = ++this.nextId;
    return new Promise((resolve, reject) => {
      this.waiting.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  // Evaluate JS in the page and return the value (throws on page errors).
  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (result.exceptionDetails) {
      throw new Error(`page error: ${JSON.stringify(result.exceptionDetails).slice(0, 400)}`);
    }
    return result.result ? result.result.value : undefined;
  }

  close() {
    try {
      this.socket.close();
    } catch {
      // already closed
    }
  }
}

// --- Chrome lifecycle ---
function launchChrome() {
  return spawn(
    CHROME_BIN,
    [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--enable-unsafe-swiftshader',
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--mute-audio',
      '--no-proxy-server',
      '--allow-file-access-from-files',
      '--disable-features=LocalNetworkAccessChecks',
      `--hatch-webgl-allowed-domains-file=${WEBGL_DOMAINS_FILE}`,
      `--hatch-webgl-allowed-domains-sha256=${WEBGL_DOMAINS_SHA256}`,
      `--window-size=${SIZE},1105`,
      `--remote-debugging-port=${DEBUG_PORT}`,
      '--remote-debugging-address=127.0.0.1',
      'about:blank',
    ],
    { stdio: 'ignore' },
  );
}

async function waitForDevTools(tries = 40, delayMs = 500) {
  for (let i = 0; i < tries; i++) {
    try {
      await devtoolsJson('/json/version');
      return;
    } catch {
      await sleep(delayMs);
    }
  }
  throw new Error('Chrome DevTools did not come up');
}

// Wait until the document is complete and laid out at exactly 1024x1024.
async function waitForLayout(cdp, tries = 60, delayMs = 250) {
  for (let i = 0; i < tries; i++) {
    const ready = await cdp.evaluate(
      `document.readyState === 'complete' && document.body.scrollWidth === ${SIZE} && document.body.scrollHeight === ${SIZE}`,
    );
    if (ready) return;
    await sleep(delayMs);
  }
  throw new Error('page did not settle at 1024x1024');
}

// --- The render: open the page in a fresh target, screenshot it ---
async function capture() {
  const target = await devtoolsJson(`/json/new?${encodeURIComponent(PAGE_URL)}`, 'PUT');
  const cdp = new CdpClient(target.webSocketDebuggerUrl);
  await cdp.connect();
  try {
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');

    // Pin the viewport to exactly 1024x1024, no scrollbars.
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: SIZE,
      height: SIZE,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send('Emulation.setScrollbarsHidden', { hidden: true });

    await waitForLayout(cdp);
    const dims = await cdp.evaluate(
      '({ sw: document.body.scrollWidth, sh: document.body.scrollHeight, ih: document.documentElement.scrollHeight })',
    );
    console.log('page dims:', JSON.stringify(dims));

    // Let fonts settle, then capture.
    await sleep(800);
    const shot = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });
    const png = Buffer.from(shot.data, 'base64');
    writeFileSync(OUT_PATH, png);
    console.log(`wrote ${OUT_PATH}: ${png.length} bytes`);
  } finally {
    cdp.close();
    try {
      await devtoolsJson(`/json/close/${target.id}`);
    } catch {
      // target already gone
    }
  }
}

async function main() {
  const chrome = launchChrome();
  try {
    await waitForDevTools();
    await capture();
  } finally {
    chrome.kill('SIGKILL');
  }
}

main().catch((err) => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
