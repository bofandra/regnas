// Browser QA for REGNAS GitHub Pages mockup. CI only: no data or network APIs.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4173';
const outDir = 'artifacts/browser-qa';
const server = spawn('python3', ['-m', 'http.server', '4173', '--bind', '127.0.0.1'], {
  stdio: ['ignore', 'pipe', 'pipe']
});
let browser;
const errors = [];

async function waitForServer() {
  for (let i = 0; i < 50; i++) {
    try { const r = await fetch(base + '/index.html'); if (r.ok) return; }
    catch (_) {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  throw new Error('Static HTTP server did not become ready');
}
function errorsFrom(page, label) {
  page.on('pageerror', e => errors.push(label + ': ' + e.message));
}
function assertNoOverflow(result, label) {
  assert.ok(result.scrollWidth <= result.viewport + 3,
    label + ' horizontal overflow: ' + JSON.stringify(result));
}
async function geometry(page) {
  return page.evaluate(() => ({
    viewport: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
}
async function run() {
  await mkdir(outDir, {recursive: true});
  await waitForServer();
  browser = await chromium.launch({headless:true});
  const desktop = await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
  errorsFrom(desktop, 'desktop');
  await desktop.goto(base + '/#pengampu', {waitUntil:'load'});
  await desktop.locator('.reg-map-svg').waitFor({timeout:10000});
  assert.ok((await desktop.locator('body').innerText()).includes('Faskes Binaan'));
  assert.equal(await desktop.locator('[data-page="review"]').count(),0,'Pengampu cannot review');
  await desktop.screenshot({path:outDir + '/pengampu-desktop.png',fullPage:true});
  assertNoOverflow(await geometry(desktop),'desktop');

  // Province > facility > case list.
  await desktop.locator('[data-reg-action="province:Jawa%20Barat"]').first().click();
  await desktop.locator('.reg-drill').getByText('Faskes Binaan').first().waitFor();
  await desktop.locator('.reg-drill [data-reg-action^="org:"]').first().click();
  await desktop.locator('.reg-drill').getByText('Daftar Kasus Terpilih').first().waitFor();

  // Cancer group > site > facility > case summary.
  await desktop.locator('[data-reg-action="clear"]').first().click();
  await desktop.locator('[data-reg-action="group:Payudara"]').first().click();
  await desktop.locator('.reg-drill [data-reg-action="site:C50.9"]').first().click();
  await desktop.locator('.reg-drill [data-reg-action^="org:"]').first().click();
  await desktop.locator('.reg-drill [data-reg-action^="case:"]').first().click();
  await desktop.locator('.reg-detail').waitFor();
  assert.ok((await desktop.locator('.reg-detail').innerText()).includes('Ringkasan Kasus'));
  await desktop.screenshot({path:outDir + '/pengampu-drilldown.png',fullPage:true});

  // Reporting filter must surface example facility without cases.
  await desktop.locator('[data-reg-action="clear"]').first().click();
  await desktop.locator('[data-reg-filter="facilityStatus"]').selectOption('unreported');
  await desktop.locator('.reg-table').getByText('RS Contoh Cendana').first().waitFor();

  // Mobile view must be usable without page-level horizontal overflow.
  const mobile = await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1, isMobile:true});
  errorsFrom(mobile,'mobile');
  await mobile.goto(base + '/#pengampu', {waitUntil:'load'});
  await mobile.locator('.reg-map-svg').waitFor({timeout:10000});
  await mobile.screenshot({path:outDir + '/pengampu-mobile.png',fullPage:true});
  assertNoOverflow(await geometry(mobile),'mobile');

  // Existing registrar UI remains accessible from presenter mode.
  const registrar = await browser.newPage({viewport:{width:1280,height:800}});
  errorsFrom(registrar,'registrar');
  await registrar.goto(base + '/',{waitUntil:'load'});
  await registrar.locator('#presenter-toggle').click();
  await registrar.locator('[data-action="presenterlaunch"]').click();
  await registrar.locator('#launch-case').selectOption('REG-2026-00130');
  await registrar.locator('[data-action="generate"]').click();
  await registrar.locator('[data-action="openlaunch"]').click();
  await registrar.getByText('Stadium / TNM').first().waitFor();
  await registrar.screenshot({path:outDir + '/registrar-desktop.png',fullPage:true});

  assert.deepEqual(errors,[],'Uncaught browser JavaScript errors');
  console.log('Browser QA PASS: desktop, mobile, map drill-down, cancer/locus, and registrar UI');
}
try { await run(); }
finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
