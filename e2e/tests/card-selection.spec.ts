import { test, expect } from '@playwright/test';
import { seedLanguage } from '../helpers/storage';
import { card, needsTab } from '../helpers/selectors';

test.beforeEach(async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');
});

test('unselected feeling card has no selectedFeeling class', async ({ page }) => {
  await expect(card(page, 'f1', 'feelings')).not.toHaveClass(/selectedFeeling/);
});

test('clicking a feeling card selects it', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await expect(card(page, 'f1', 'feelings')).toHaveClass(/selectedFeeling/);
});

test('clicking a selected feeling card deselects it', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await card(page, 'f1', 'feelings').click();
  await expect(card(page, 'f1', 'feelings')).not.toHaveClass(/selectedFeeling/);
});

test('multiple feelings can be selected simultaneously', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await card(page, 'f2', 'feelings').click();
  await card(page, 'f3', 'feelings').click();
  await expect(card(page, 'f1', 'feelings')).toHaveClass(/selectedFeeling/);
  await expect(card(page, 'f2', 'feelings')).toHaveClass(/selectedFeeling/);
  await expect(card(page, 'f3', 'feelings')).toHaveClass(/selectedFeeling/);
});

test('clicking a need card selects it', async ({ page }) => {
  await needsTab(page).click();
  await card(page, 'n1', 'needs').click();
  await expect(card(page, 'n1', 'needs')).toHaveClass(/selectedNeed/);
});

test('clicking a selected need card deselects it', async ({ page }) => {
  await needsTab(page).click();
  await card(page, 'n1', 'needs').click();
  await card(page, 'n1', 'needs').click();
  await expect(card(page, 'n1', 'needs')).not.toHaveClass(/selectedNeed/);
});

test('feeling and need selections coexist', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await needsTab(page).click();
  await card(page, 'n1', 'needs').click();
  await expect(card(page, 'n1', 'needs')).toHaveClass(/selectedNeed/);
  await page.locator('a.tab', { hasText: 'Feelings' }).click();
  await expect(card(page, 'f1', 'feelings')).toHaveClass(/selectedFeeling/);
});
