import { test, expect } from '@playwright/test';
import { seedLanguage } from '../helpers/storage';
import { card, screen, menuBtn, selectionTab } from '../helpers/selectors';

test.beforeEach(async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');
});

test('empty selection screen shows "No cards selected"', async ({ page }) => {
  await selectionTab(page).click();
  await expect(page.getByText('No cards selected')).toBeVisible();
});

test('toolbar is not visible on feelings screen', async ({ page }) => {
  // SelectionMenu only renders when activeScreen === 'selection'
  await expect(menuBtn(page, 'share')).not.toBeVisible();
});

test('after selecting cards, selection screen shows selected cards', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await card(page, 'f2', 'feelings').click();
  await selectionTab(page).click();
  await expect(screen(page, 'selection').locator('.card')).toHaveCount(2);
});

test('selection screen does not show unselected cards', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await selectionTab(page).click();
  // f2 was never selected so it should not appear in the selection screen DOM
  await expect(screen(page, 'selection').locator('#f2')).not.toBeAttached();
});

test('deselecting a card on selection screen removes it', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await card(page, 'f2', 'feelings').click();
  await selectionTab(page).click();
  await card(page, 'f1', 'selection').click();
  await expect(screen(page, 'selection').locator('.card')).toHaveCount(1);
});

test('deselecting last card shows "No cards selected"', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await selectionTab(page).click();
  await card(page, 'f1', 'selection').click();
  await expect(page.getByText('No cards selected')).toBeVisible();
});

test('toolbar buttons are visible on selection screen with cards selected', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await selectionTab(page).click();
  await expect(menuBtn(page, 'share')).toBeVisible();
  await expect(menuBtn(page, 'save')).toBeVisible();
  await expect(menuBtn(page, 'delete')).toBeVisible();
});

test('share, save and delete toolbar buttons are disabled when no cards selected', async ({ page }) => {
  await selectionTab(page).click();
  await expect(menuBtn(page, 'share')).toHaveClass(/disabled/);
  await expect(menuBtn(page, 'save')).toHaveClass(/disabled/);
  await expect(menuBtn(page, 'delete')).toHaveClass(/disabled/);
});

test('load toolbar button is disabled when no saved states exist', async ({ page }) => {
  await selectionTab(page).click();
  await expect(menuBtn(page, 'load')).toHaveClass(/disabled/);
});
