// v20.7.4 or later

import puppeteer from 'puppeteer';
import { getBrowserState, setupBrowserHooks, testResultsFolder } from './utils';

describe('IssueListComponent', () => {
  setupBrowserHooks();

  it('should perform operations on the issue list', async () => {
    const { page } = getBrowserState();

    await page.screenshot({
      path: `${testResultsFolder}/issue-list.component.png`,
    });

    // Click on the first issue and attempt to resolve it
    const dotsElement = await page.$(
      '#clr-dg-row1 > div.datagrid-row-sticky > div > clr-dg-action-overflow > button',
    );

    expect(dotsElement).not.toBeNull();

    await dotsElement?.click();

    await page.screenshot({
      path: `${testResultsFolder}/popup-resolve-opened.png`,
    });

    const popupElement = await page.$('#clr-action-menu0 > button');

    expect(popupElement).not.toBeNull();

    await popupElement?.click();

    await page.screenshot({
      path: `${testResultsFolder}/popup-resolve-confirmation.png`,
    });

    const confirmElement = await page.$('button.btn-danger');

    expect(confirmElement).not.toBeNull();

    await confirmElement?.click();

    // TODO: as no database, I'm not removing the issue from the list
    await page.screenshot({
      path: `${testResultsFolder}/issue-resolved.png`,
    });
  });
});
