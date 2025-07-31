import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

const baseUrl = process.env['baseUrl'] ?? 'http://localhost:4200/';
let browser: puppeteer.Browser;
let page: puppeteer.Page;

export function setupBrowserHooks(pathUrl = ''): void {
  beforeAll(async () => {
    if (!fs.existsSync(testResultsFolder)) {
      fs.mkdirSync(testResultsFolder, { recursive: true });
    }

    const isCI = process.env['CI'] === 'true';
    browser = await puppeteer.launch({
      headless: isCI,
      args: isCI
        ? [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
          ]
        : [],
    });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${baseUrl}${path}`);
  });

  afterEach(async () => {
    await page?.close();
  });

  afterAll(async () => {
    await browser?.close();
  });
}

export function getBrowserState(): {
  browser: puppeteer.Browser;
  page: puppeteer.Page;
  baseUrl: string;
} {
  if (!browser) {
    throw new Error(
      'No browser state found! Ensure `setupBrowserHooks()` is called.',
    );
  }
  return {
    browser,
    page,
    baseUrl,
  };
}

export const testResultsFolder = 'test-results';
