import { test, expect } from '@playwright/test';
import { seedLanguage, seedSavedState } from '../helpers/storage';
import { card, menuBtn, selectionTab } from '../helpers/selectors';

test.beforeEach(async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');
});

// ---- SAVE ----

test('save button is disabled when no cards selected', async ({ page }) => {
  await selectionTab(page).click();
  await expect(menuBtn(page, 'save')).toHaveClass(/disabled/);
});

test('full save flow writes a saved-* key to localStorage', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await selectionTab(page).click();
  await menuBtn(page, 'save').click();
  await expect(page.locator('.modal.show')).toBeVisible();
  await page.locator('[data-testid="input-save-name"]').fill('My save');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('.modal.show')).not.toBeVisible();
  const keys = await page.evaluate(() =>
    Object.keys(localStorage).filter((k) => k.startsWith('saved-'))
  );
  expect(keys.length).toBeGreaterThanOrEqual(1);
});

test('saved state contains the correct selected cards', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await selectionTab(page).click();
  await menuBtn(page, 'save').click();
  await page.locator('[data-testid="input-save-name"]').fill('Test');
  await page.getByRole('button', { name: 'Save' }).click();
  const values = await page.evaluate(() =>
    Object.entries(localStorage)
      .filter(([k]) => k.startsWith('saved-'))
      .map(([, v]) => JSON.parse(v))
  );
  expect(values[0].selectedCards).toContain('f1');
});

test('closing save modal with X does not save', async ({ page }) => {
  await card(page, 'f1', 'feelings').click();
  await selectionTab(page).click();
  await menuBtn(page, 'save').click();
  await page.locator('[data-testid="input-save-name"]').fill('Should not save');
  await page.locator('.modal.show .btn-close').click();
  await expect(page.locator('.modal.show')).not.toBeVisible();
  const keys = await page.evaluate(() =>
    Object.keys(localStorage).filter((k) => k.startsWith('saved-'))
  );
  expect(keys.length).toBe(0);
});

// ---- LOAD ----

test('load button is disabled when no saved states exist', async ({ page }) => {
  await selectionTab(page).click();
  await expect(menuBtn(page, 'load')).toHaveClass(/disabled/);
});

test('load button is enabled when saved states exist', async ({ page }) => {
  await seedSavedState(page, 'Existing', ['f1']);
  await page.goto('/');
  await selectionTab(page).click();
  await expect(menuBtn(page, 'load')).not.toHaveClass(/disabled/);
});

test('load modal lists saved states by name', async ({ page }) => {
  await seedSavedState(page, 'Morning session', ['f1']);
  await page.goto('/');
  await selectionTab(page).click();
  await menuBtn(page, 'load').click();
  await expect(page.locator('.modal.show')).toBeVisible();
  await expect(page.getByText('Morning session')).toBeVisible();
});

test('loading a saved state restores cards and navigates to selection screen', async ({ page }) => {
  const key = await seedSavedState(page, 'Restore me', ['f2', 'n3']);
  await page.goto('/');
  await selectionTab(page).click();
  await menuBtn(page, 'load').click();
  await page.locator(`[data-testid="btn-load-${key}"]`).click();
  await expect(page.locator('[data-testid="screen-selection"]')).not.toHaveClass(/hidden/);
  await expect(card(page, 'f2', 'selection')).toBeVisible();
  await expect(card(page, 'n3', 'selection')).toBeVisible();
});

test('deleting a saved state removes it from the list', async ({ page }) => {
  const key = await seedSavedState(page, 'To be deleted', ['f1']);
  await page.goto('/');
  await selectionTab(page).click();
  await menuBtn(page, 'load').click();
  page.on('dialog', (dialog) => dialog.accept());
  await page.locator(`[data-testid="btn-delete-${key}"]`).click();
  await expect(page.getByText('To be deleted')).not.toBeVisible();
});

test('deleting last saved state closes the modal', async ({ page }) => {
  const key = await seedSavedState(page, 'Last one', ['f1']);
  await page.goto('/');
  await selectionTab(page).click();
  await menuBtn(page, 'load').click();
  page.on('dialog', (dialog) => dialog.accept());
  await page.locator(`[data-testid="btn-delete-${key}"]`).click();
  await expect(page.locator('.modal.show')).not.toBeVisible();
});
