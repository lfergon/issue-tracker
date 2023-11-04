import { chromium } from 'playwright';
import { test, expect } from '@playwright/test';

test('test issues', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: 'Issue No', exact: true }).click();
  await page.getByRole('button', { name: 'Type', exact: true }).click();
  await page.getByRole('button', { name: 'Title', exact: true }).click();
  await page.getByRole('button', { name: 'Description', exact: true }).click();
  await page.getByRole('button', { name: 'Priority', exact: true }).click();
  await page
    .getByRole('row', {
      name: 'Available actions 5 task Add new customer tutorial Create a tutorial on how to add a new customer into the application high',
    })
    .getByLabel('Available actions')
    .click();
  await page.getByRole('button', { name: 'Resolve' }).click();
  await page.getByRole('button', { name: 'Yes, continue' }).click();
  await page
    .getByRole('row', {
      name: 'Available actions 1 feature Add email validation in registration form Validate the email entered in the user registration form high',
    })
    .getByLabel('Available actions')
    .click();
  await page.getByRole('button', { name: 'Resolve' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('button', { name: 'Add new issue' }).click();
  await page.getByLabel('Issue').click();
  await page.getByLabel('Issue').fill('Testing creation');
  await page.getByLabel('Issue').press('Tab');
  await page.getByPlaceholder('Description').fill('Test');
  await page.getByPlaceholder('Description').press('Tab');
  await page.getByText('Medium').click();
  await page.getByLabel('Type').selectOption('bug');
  await page.getByRole('button', { name: 'Create' }).click();
});
