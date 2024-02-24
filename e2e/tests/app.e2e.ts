import { setupBrowserHooks, getBrowserState, testResultsFolder } from './utils';

describe('App test', function () {
  setupBrowserHooks();

  it('is running', async function () {
    const { page } = getBrowserState();
    const element = await page.locator('.main-container').wait();

    await page.screenshot({ path: `${testResultsFolder}/app.component.png` });

    expect(element).not.toBeNull();
  });

  it('should render the list of issues', async () => {
    const { page } = getBrowserState();
    const element = await page.locator('app-issue-list').wait();

    expect(element).not.toBeNull();
  });
});
