// Render index.html to entry.png at exactly 1024x1024 via headless Chrome + CDP.
// Uses Emulation.setDeviceMetricsOverride so the capture is exactly 1024x1024
// regardless of the window chrome. Node's built-in WebSocket, no dependencies.
// Usage: node render.mjs  (from the repo dir; writes ./entry.png)
import { writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const CHROME = '/opt/meta-chromium/chrome';
const DIR = dirname(fileURLToPath(import.meta.url));
const URL = `file://${join(DIR, 'index.html')}`;
const OUT = join(DIR, 'entry.png');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(path, method = 'GET') {
  const res = await fetch(`http://127.0.0.1:9223${path}`, { method });
  return res.json();
}

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    };
  }
  async open() {
    await new Promise((res, rej) => {
      this.ws.onopen = res;
      this.ws.onerror = rej;
    });
  }
  call(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async evalExpr(expression) {
    const r = await this.call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 500));
    return r.result ? r.result.value : undefined;
  }
  close() { try { this.ws.close(); } catch { /* ignore */ } }
}

async function main() {
  const chrome = spawn(CHROME, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--enable-unsafe-swiftshader',
    '--use-gl=angle', '--use-angle=swiftshader', '--mute-audio', '--no-proxy-server',
    '--allow-file-access-from-files',
    '--disable-features=LocalNetworkAccessChecks',
    '--hatch-webgl-allowed-domains-file=/var/lib/hatch-browser/rootfs-base/usr/share/hatch/chromium/webgl-allowed-domains.txt',
    '--hatch-webgl-allowed-domains-sha256=8097045f0459c96c4cdc76e3a1af4e0f43f640b4b59c43d6db35e3641c0264c6',
    '--window-size=1024,1105', '--remote-debugging-port=9223', '--remote-debugging-address=127.0.0.1',
    'about:blank',
  ], { stdio: 'ignore' });
  try {
    for (let i = 0; i < 40; i++) {
      try { await getJson('/json/version'); break; } catch { await sleep(500); }
    }
    const target = await getJson(`/json/new?${encodeURIComponent(URL)}`, 'PUT');
    const cdp = new CDP(target.webSocketDebuggerUrl);
    await cdp.open();
    await cdp.call('Page.enable');
    await cdp.call('Runtime.enable');
    // Exact 1024x1024 viewport, no scrollbars, no device-scale surprises.
    await cdp.call('Emulation.setDeviceMetricsOverride', {
      width: 1024, height: 1024, deviceScaleFactor: 1, mobile: false,
    });
    await cdp.call('Emulation.setScrollbarsHidden', { hidden: true });
    // Wait for the document to be fully laid out.
    for (let i = 0; i < 60; i++) {
      const ready = await cdp.evalExpr(`document.readyState === 'complete' && document.body.scrollWidth === 1024 && document.body.scrollHeight === 1024`);
      if (ready) break;
      await sleep(250);
    }
    const dims = await cdp.evalExpr(`({ sw: document.body.scrollWidth, sh: document.body.scrollHeight, ih: document.documentElement.scrollHeight })`);
    console.log('page dims:', JSON.stringify(dims));
    await sleep(800);
    const shot = await cdp.call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    const buf = Buffer.from(shot.data, 'base64');
    writeFileSync(OUT, buf);
    console.log(`wrote ${OUT}: ${buf.length} bytes`);
    cdp.close();
    try { await getJson(`/json/close/${target.id}`); } catch { /* ignore */ }
  } finally {
    chrome.kill('SIGKILL');
  }
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
