import { test, expect } from '@playwright/test';
import { seedLanguage } from '../helpers/storage';
import { card, menuBtn, selectionTab } from '../helpers/selectors';

test.beforeEach(async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');
});

test('delete button is disabled when no cards selected', async ({ page }) => {
  await selectionTab(page).click();
  await expect(menuBtn(page, 'delete')).toHaveClass(/disabled/);
});

test('delete clears all selected cards immediately', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await card(page, 'f2', 'feelings').click();
  await page.locator('a.tab', { hasText: 'Needs' }).click();
  await card(page, 'n1', 'needs').click();
  await selectionTab(page).click();
  await menuBtn(page, 'delete').click();
  await expect(page.getByText('No cards selected')).toBeVisible();
});

test('after delete, feeling cards have no selectedFeeling class', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await selectionTab(page).click();
  await menuBtn(page, 'delete').click();
  await page.locator('a.tab', { hasText: 'Feelings' }).click();
  await expect(card(page, 'f1', 'feelings')).not.toHaveClass(/selectedFeeling/);
});

test('after delete, @last has empty selectedCards', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await selectionTab(page).click();
  await menuBtn(page, 'delete').click();
  const last = await page.evaluate(() => localStorage.getItem('@last'));
  const parsed = JSON.parse(last!);
  expect(parsed.selectedCards).toHaveLength(0);
});
