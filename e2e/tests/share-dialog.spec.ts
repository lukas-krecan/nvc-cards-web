import { test, expect } from '@playwright/test';
import { seedLanguage } from '../helpers/storage';
import { card, menuBtn, selectionTab } from '../helpers/selectors';

test.beforeEach(async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');
});

test('share button is disabled when no cards selected', async ({ page }) => {
  await selectionTab(page).click();
  await expect(menuBtn(page, 'share')).toHaveClass(/disabled/);
});

test('clicking share opens the share modal', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await selectionTab(page).click();
  await menuBtn(page, 'share').click();
  await expect(page.locator('.modal.show')).toBeVisible();
  await expect(page.getByText('Selected cards')).toBeVisible();
});

test('share modal body shows selected card text with "- " prefix', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await selectionTab(page).click();
  await menuBtn(page, 'share').click();
  const modalBody = page.locator('.modal.show .modal-body');
  const firstLine = modalBody.locator('div').first();
  await expect(firstLine).toContainText('- ');
});

test('copy to clipboard button is present in share modal', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await selectionTab(page).click();
  await menuBtn(page, 'share').click();
  await expect(page.getByRole('button', { name: 'Copy to clipboard' })).toBeVisible();
});

test('copy to clipboard copies card text', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await card(page, 'f1', 'feelings').click();
  await selectionTab(page).click();
  await menuBtn(page, 'share').click();
  await page.getByRole('button', { name: 'Copy to clipboard' }).click();
  const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboardText).toMatch(/^- /);
});

test('closing share modal does not change card selection', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await selectionTab(page).click();
  await menuBtn(page, 'share').click();
  await page.locator('.modal.show .btn-close').click();
  await expect(page.locator('.modal.show')).not.toBeVisible();
  // card should still be in selection
  await expect(card(page, 'f1', 'selection')).toBeVisible();
});
