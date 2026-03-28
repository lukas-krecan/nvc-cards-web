import { test, expect } from '@playwright/test';
import { seedLanguage, seedLastState } from '../helpers/storage';
import { screen, feelingsTab, needsTab, selectionTab } from '../helpers/selectors';

test.beforeEach(async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');
});

test('shows feelings screen on initial load', async ({ page }) => {
  await expect(screen(page, 'feelings')).not.toHaveClass(/hidden/);
  await expect(screen(page, 'needs')).toHaveClass(/hidden/);
  await expect(screen(page, 'selection')).toHaveClass(/hidden/);
});

test('clicking Needs tab shows needs screen', async ({ page }) => {
  await needsTab(page).click();
  await expect(screen(page, 'needs')).not.toHaveClass(/hidden/);
  await expect(screen(page, 'feelings')).toHaveClass(/hidden/);
});

test('clicking Selection tab shows selection screen', async ({ page }) => {
  await selectionTab(page).click();
  await expect(screen(page, 'selection')).not.toHaveClass(/hidden/);
  await expect(screen(page, 'feelings')).toHaveClass(/hidden/);
});

test('clicking Feelings tab returns to feelings screen', async ({ page }) => {
  await needsTab(page).click();
  await feelingsTab(page).click();
  await expect(screen(page, 'feelings')).not.toHaveClass(/hidden/);
  await expect(screen(page, 'needs')).toHaveClass(/hidden/);
});

test('active tab has active class', async ({ page }) => {
  await expect(feelingsTab(page)).toHaveClass(/active/);
  await needsTab(page).click();
  await expect(needsTab(page)).toHaveClass(/active/);
  await expect(feelingsTab(page)).not.toHaveClass(/active/);
});

test('last active screen is restored on reload', async ({ page }) => {
  await seedLastState(page, [], 'needs');
  await page.goto('/');
  await expect(screen(page, 'needs')).not.toHaveClass(/hidden/);
});
