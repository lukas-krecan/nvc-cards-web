import { test, expect } from '@playwright/test';
import { seedLanguage } from '../helpers/storage';

// The language toggle is inside a Navbar.Offcanvas that requires opening the toggler.
// On desktop the toggler is hidden (expand="sm"), so we use a mobile viewport for toggle tests.
const mobileViewport = { width: 375, height: 812 };

test('app loads in English when @language is "en"', async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');
  await expect(page.locator('a.tab', { hasText: 'Feelings' })).toBeVisible();
  await expect(page.locator('a.tab', { hasText: 'Needs' })).toBeVisible();
  await expect(page.locator('a.tab', { hasText: 'Selection' })).toBeVisible();
});

test('app loads in Czech when @language is "cs"', async ({ page }) => {
  await seedLanguage(page, 'cs');
  await page.goto('/');
  await expect(page.locator('a.tab', { hasText: 'Pocity' })).toBeVisible();
  await expect(page.locator('a.tab', { hasText: 'Potřeby' })).toBeVisible();
  await expect(page.locator('a.tab', { hasText: 'Výběr' })).toBeVisible();
});

test('language toggle switches from English to Czech', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await seedLanguage(page, 'en');
  await page.goto('/');
  // Open offcanvas navbar
  await page.locator('[aria-controls="offcanvasNavbar-expand"]').click();
  await page.getByTitle('Přepnout do češtiny').click();
  await expect(page.locator('a.tab', { hasText: 'Pocity' })).toBeVisible();
});

test('language toggle switches from Czech to English', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await seedLanguage(page, 'cs');
  await page.goto('/');
  await page.locator('[aria-controls="offcanvasNavbar-expand"]').click();
  await page.getByTitle('Switch to English').click();
  await expect(page.locator('a.tab', { hasText: 'Feelings' })).toBeVisible();
});

test('language persists to localStorage after toggle', async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await seedLanguage(page, 'en');
  await page.goto('/');
  await page.locator('[aria-controls="offcanvasNavbar-expand"]').click();
  await page.getByTitle('Přepnout do češtiny').click();
  const lang = await page.evaluate(() => localStorage.getItem('@language'));
  expect(lang).toBe('cs');
});

test('language preference survives page reload', async ({ page }) => {
  await seedLanguage(page, 'cs');
  await page.goto('/');
  await page.reload();
  await expect(page.locator('a.tab', { hasText: 'Pocity' })).toBeVisible();
});
