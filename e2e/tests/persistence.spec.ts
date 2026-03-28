import { test, expect } from '@playwright/test';
import { seedLanguage, seedLastState, seedSavedState } from '../helpers/storage';
import { card, screen, selectionTab, menuBtn } from '../helpers/selectors';

test('selecting cards and reloading restores selection', async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');
  await card(page, 'f1', 'feelings').click();
  await page.reload();
  await expect(card(page, 'f1', 'feelings')).toHaveClass(/selectedFeeling/);
});

test('active screen is restored on reload', async ({ page }) => {
  await seedLanguage(page, 'en');
  await seedLastState(page, ['f1'], 'needs');
  await page.goto('/');
  await expect(screen(page, 'needs')).not.toHaveClass(/hidden/);
});

test('no @last in storage loads feelings screen with no selection', async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');
  await expect(screen(page, 'feelings')).not.toHaveClass(/hidden/);
  await expect(card(page, 'f1', 'feelings')).not.toHaveClass(/selectedFeeling/);
});

test('corrupted @last JSON is silently ignored and app loads normally', async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.addInitScript(() => localStorage.setItem('@last', 'not-valid-json{'));
  await page.goto('/');
  await expect(screen(page, 'feelings')).not.toHaveClass(/hidden/);
});

test('seeded saved state survives page reload and appears in load dialog', async ({ page }) => {
  await seedLanguage(page, 'en');
  await seedSavedState(page, 'My Test Save', ['f1', 'n2']);
  await page.goto('/');
  await selectionTab(page).click();
  await expect(menuBtn(page, 'load')).not.toHaveClass(/disabled/);
  await menuBtn(page, 'load').click();
  await expect(page.getByText('My Test Save')).toBeVisible();
});

test('@last is updated when cards are selected', async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');
  await card(page, 'f1', 'feelings').click();
  const last = await page.evaluate(() => localStorage.getItem('@last'));
  const parsed = JSON.parse(last!);
  expect(parsed.selectedCards).toContain('f1');
});
