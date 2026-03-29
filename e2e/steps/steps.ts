import { test as base } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { seedLanguage, seedLastState, seedSavedState } from '../helpers/storage';
import { card, screen, menuBtn, feelingsTab, needsTab, selectionTab } from '../helpers/selectors';

type State = { savedKey?: string; selectionOrderBeforeReload?: string[] };

export const test = base.extend<{ state: State }>({
  state: async ({}, use) => {
    await use({});
  },
});

const { Given, When, Then } = createBdd(test);

// ── Given ──────────────────────────────────────────────────────────────────

Given('the app is loaded in English', async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');
});

Given('the app is loaded in Czech', async ({ page }) => {
  await seedLanguage(page, 'cs');
  await page.goto('/');
});

Given('the language is set to {string}', async ({ page }, lang: string) => {
  await seedLanguage(page, lang as 'en' | 'cs');
});

Given('I open the app', async ({ page }) => {
  await page.goto('/');
});

Given('I am on a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
});

Given('the last state has cards {string} on screen {string}', async ({ page }, cardsStr: string, screenName: string) => {
  const cards = cardsStr === '' ? [] : cardsStr.split(',').map((s) => s.trim());
  await seedLastState(page, cards, screenName);
});

Given('there is a saved state {string} with cards {string}', async ({ page, state }, name: string, cardsStr: string) => {
  const cards = cardsStr.split(',').map((s) => s.trim());
  state.savedKey = await seedSavedState(page, name, cards);
});

Given('corrupted JSON is stored in @last', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('@last', 'not-valid-json{'));
});

Given('clipboard permissions are granted', async ({ context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
});

// ── When ───────────────────────────────────────────────────────────────────

When('I click feeling card {string}', async ({ page }, id: string) => {
  await card(page, id, 'feelings').click();
});

When('I click needs card {string}', async ({ page }, id: string) => {
  await card(page, id, 'needs').click();
});

When('I click card {string} in the selection screen', async ({ page }, id: string) => {
  await card(page, id, 'selection').click();
});

When('I navigate to the Feelings tab', async ({ page }) => {
  await feelingsTab(page).click();
});

When('I navigate to the Needs tab', async ({ page }) => {
  await needsTab(page).click();
});

When('I navigate to the Selection tab', async ({ page }) => {
  await selectionTab(page).click();
});

When('I click the {word} menu button', async ({ page }, name: string) => {
  await menuBtn(page, name).click();
});

When('I reload the page', async ({ page }) => {
  await page.reload();
});

When('I open the navbar', async ({ page }) => {
  await page.locator('[aria-controls="offcanvasNavbar-expand"]').click();
});

When('I switch the language to Czech', async ({ page }) => {
  await page.getByTitle('Přepnout do češtiny').click();
});

When('I switch the language to English', async ({ page }) => {
  await page.getByTitle('Switch to English').click();
});

When('I fill the save name with {string}', async ({ page }, name: string) => {
  await page.locator('[data-testid="input-save-name"]').fill(name);
});

When('I confirm the save', async ({ page }) => {
  await page.getByRole('button', { name: 'Save' }).click();
});

When('I close the modal', async ({ page }) => {
  await page.locator('.modal.show .btn-close').click();
});

When('I load the saved state', async ({ page, state }) => {
  await page.locator(`[data-testid="btn-load-${state.savedKey}"]`).click();
});

When('I delete the saved state', async ({ page, state }) => {
  page.on('dialog', (dialog) => dialog.accept());
  await page.locator(`[data-testid="btn-delete-${state.savedKey}"]`).click();
});

When('I click the copy to clipboard button', async ({ page }) => {
  await page.getByRole('button', { name: 'Copy to clipboard' }).click();
});

When('I select feeling cards {string}, {string} and {string}', async ({ page }, id1: string, id2: string, id3: string) => {
  await card(page, id1, 'feelings').click();
  await card(page, id2, 'feelings').click();
  await card(page, id3, 'feelings').click();
});

When('I drag card {string} after card {string}', async ({ page }, sourceId: string, targetId: string) => {
  const src = await card(page, sourceId, 'selection').boundingBox();
  const tgt = await card(page, targetId, 'selection').boundingBox();
  const sx = src!.x + src!.width / 2;
  const sy = src!.y + src!.height / 2;
  const tx = tgt!.x + tgt!.width / 2;
  const ty = tgt!.y + tgt!.height * 0.8;
  await page.mouse.move(sx, sy);
  await page.mouse.down();
  await page.mouse.move(sx, sy + 8, { steps: 4 });
  await page.mouse.move(tx, ty, { steps: 20 });
  await page.mouse.up();
});

When('I record the selection order', async ({ page, state }) => {
  state.selectionOrderBeforeReload = await screen(page, 'selection')
    .locator('.card')
    .evaluateAll((els: Element[]) => els.map((el) => el.id));
});

// ── Then ───────────────────────────────────────────────────────────────────

Then('feeling card {string} should be selected', async ({ page }, id: string) => {
  await expect(card(page, id, 'feelings')).toHaveClass(/selectedFeeling/);
});

Then('feeling card {string} should not be selected', async ({ page }, id: string) => {
  await expect(card(page, id, 'feelings')).not.toHaveClass(/selectedFeeling/);
});

Then('needs card {string} should be selected', async ({ page }, id: string) => {
  await expect(card(page, id, 'needs')).toHaveClass(/selectedNeed/);
});

Then('needs card {string} should not be selected', async ({ page }, id: string) => {
  await expect(card(page, id, 'needs')).not.toHaveClass(/selectedNeed/);
});

Then('the {word} screen should be visible', async ({ page }, name: string) => {
  await expect(screen(page, name)).not.toHaveClass(/hidden/);
});

Then('the {word} screen should be hidden', async ({ page }, name: string) => {
  await expect(screen(page, name)).toHaveClass(/hidden/);
});

Then('the {word} tab should be active', async ({ page }, tabName: string) => {
  const locator =
    tabName === 'Feelings' ? feelingsTab(page) :
    tabName === 'Needs'    ? needsTab(page)    :
                             selectionTab(page);
  await expect(locator).toHaveClass(/active/);
});

Then('the {word} tab should not be active', async ({ page }, tabName: string) => {
  const locator =
    tabName === 'Feelings' ? feelingsTab(page) :
    tabName === 'Needs'    ? needsTab(page)    :
                             selectionTab(page);
  await expect(locator).not.toHaveClass(/active/);
});

Then('the {word} button should be disabled', async ({ page }, name: string) => {
  await expect(menuBtn(page, name)).toHaveClass(/disabled/);
});

Then('the {word} button should be enabled', async ({ page }, name: string) => {
  await expect(menuBtn(page, name)).not.toHaveClass(/disabled/);
});

Then('the {word} button should be visible', async ({ page }, name: string) => {
  await expect(menuBtn(page, name)).toBeVisible();
});

Then('the {word} button should not be visible', async ({ page }, name: string) => {
  await expect(menuBtn(page, name)).not.toBeVisible();
});

Then('I should see {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text)).toBeVisible();
});

Then('I should not see {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text)).not.toBeVisible();
});

Then('I should see tab {string}', async ({ page }, text: string) => {
  await expect(page.locator('a.tab', { hasText: text })).toBeVisible();
});

Then('the modal should be open', async ({ page }) => {
  await expect(page.locator('.modal.show')).toBeVisible();
});

Then('the modal should be closed', async ({ page }) => {
  await expect(page.locator('.modal.show')).not.toBeVisible();
});

Then('the selection screen should show {int} cards', async ({ page }, count: number) => {
  await expect(screen(page, 'selection').locator('.card')).toHaveCount(count);
});

Then('card {string} should not be in the selection screen', async ({ page }, id: string) => {
  await expect(screen(page, 'selection').locator(`#${id}`)).not.toBeAttached();
});

Then('card {string} should be visible in the selection screen', async ({ page }, id: string) => {
  await expect(card(page, id, 'selection')).toBeVisible();
});

Then('the localStorage @last should contain card {string}', async ({ page }, id: string) => {
  const raw = await page.evaluate(() => localStorage.getItem('@last'));
  expect(JSON.parse(raw!).selectedCards).toContain(id);
});

Then('the localStorage @last should have no selected cards', async ({ page }) => {
  const raw = await page.evaluate(() => localStorage.getItem('@last'));
  expect(JSON.parse(raw!).selectedCards).toHaveLength(0);
});

Then('the localStorage @language should be {string}', async ({ page }, lang: string) => {
  const stored = await page.evaluate(() => localStorage.getItem('@language'));
  expect(stored).toBe(lang);
});

Then('a saved state key should exist in localStorage', async ({ page }) => {
  const keys = await page.evaluate(() =>
    Object.keys(localStorage).filter((k) => k.startsWith('saved-'))
  );
  expect(keys.length).toBeGreaterThanOrEqual(1);
});

Then('no saved state keys should exist in localStorage', async ({ page }) => {
  const keys = await page.evaluate(() =>
    Object.keys(localStorage).filter((k) => k.startsWith('saved-'))
  );
  expect(keys.length).toBe(0);
});

Then('the saved state should contain card {string}', async ({ page }, id: string) => {
  const values = await page.evaluate(() =>
    Object.entries(localStorage)
      .filter(([k]) => k.startsWith('saved-'))
      .map(([, v]) => JSON.parse(v))
  );
  expect(values[0].selectedCards).toContain(id);
});

Then('card {string} should not be first in the selection', async ({ page }, id: string) => {
  await expect(screen(page, 'selection').locator('.card').first()).not.toHaveAttribute('id', id);
  const order = await screen(page, 'selection')
    .locator('.card')
    .evaluateAll((els: Element[]) => els.map((el) => el.id));
  expect(order.indexOf(id)).toBeGreaterThan(0);
});

Then('the localStorage @last first card should not be {string} and length should be {int}', async ({ page }, id: string, len: number) => {
  const raw = await page.evaluate(() => localStorage.getItem('@last'));
  const parsed = JSON.parse(raw!);
  expect(parsed.selectedCards[0]).not.toBe(id);
  expect(parsed.selectedCards).toHaveLength(len);
});

Then('the selection order should match the order before reload', async ({ page, state }) => {
  const orderAfter = await screen(page, 'selection')
    .locator('.card')
    .evaluateAll((els: Element[]) => els.map((el) => el.id));
  expect(orderAfter).toEqual(state.selectionOrderBeforeReload);
});

Then('the modal body should list card texts with {string} prefix', async ({ page }, prefix: string) => {
  const firstLine = page.locator('.modal.show .modal-body div').first();
  await expect(firstLine).toContainText(prefix);
});

Then('the clipboard text should start with {string}', async ({ page }, prefix: string) => {
  const text = await page.evaluate(() => navigator.clipboard.readText());
  expect(text).toMatch(/^- /);
});
