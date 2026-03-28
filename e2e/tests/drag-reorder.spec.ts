import { test, expect } from '@playwright/test';
import { seedLanguage } from '../helpers/storage';
import { card, screen, selectionTab } from '../helpers/selectors';

// Dragula uses mouse events (not HTML5 drag API), so we simulate with page.mouse.
// Drop position: bottom 25% of target places the dragged card after the target.

async function dragCard(page: any, sourceId: string, targetId: string) {
  const src = await card(page, sourceId, 'selection').boundingBox();
  const tgt = await card(page, targetId, 'selection').boundingBox();

  const sx = src!.x + src!.width / 2;
  const sy = src!.y + src!.height / 2;
  const tx = tgt!.x + tgt!.width / 2;
  const ty = tgt!.y + tgt!.height * 0.8; // lower portion → drops after target

  await page.mouse.move(sx, sy);
  await page.mouse.down();
  await page.mouse.move(sx, sy + 8, { steps: 4 }); // small initial move to trigger drag
  await page.mouse.move(tx, ty, { steps: 20 });     // move to target
  await page.mouse.up();
}

async function getSelectionOrder(page: any): Promise<string[]> {
  return screen(page, 'selection')
    .locator('.card')
    .evaluateAll((els: Element[]) => els.map((el) => el.id));
}

test('dragging a card changes its position', async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');

  await card(page, 'f1', 'feelings').click();
  await card(page, 'f2', 'feelings').click();
  await card(page, 'f3', 'feelings').click();
  await selectionTab(page).click();

  await expect(screen(page, 'selection').locator('.card')).toHaveCount(3);
  expect(await getSelectionOrder(page)).toEqual(['f1', 'f2', 'f3']);

  await dragCard(page, 'f1', 'f3');

  // f1 should no longer be first
  await expect(screen(page, 'selection').locator('.card').first()).not.toHaveAttribute('id', 'f1');
  const newOrder = await getSelectionOrder(page);
  expect(newOrder).toContain('f1');
  expect(newOrder.indexOf('f1')).toBeGreaterThan(0);
});

test('drag reorder is persisted to localStorage (@last)', async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');

  await card(page, 'f1', 'feelings').click();
  await card(page, 'f2', 'feelings').click();
  await card(page, 'f3', 'feelings').click();
  await selectionTab(page).click();

  await dragCard(page, 'f1', 'f3');

  // Wait for state update to propagate to localStorage
  await expect(screen(page, 'selection').locator('.card').first()).not.toHaveAttribute('id', 'f1');

  const last = await page.evaluate(() => localStorage.getItem('@last'));
  const parsed = JSON.parse(last!);
  expect(parsed.selectedCards[0]).not.toBe('f1');
  expect(parsed.selectedCards).toHaveLength(3);
});

test('drag reorder survives page reload', async ({ page }) => {
  await seedLanguage(page, 'en');
  await page.goto('/');

  await card(page, 'f1', 'feelings').click();
  await card(page, 'f2', 'feelings').click();
  await card(page, 'f3', 'feelings').click();
  await selectionTab(page).click();

  await dragCard(page, 'f1', 'f3');
  await expect(screen(page, 'selection').locator('.card').first()).not.toHaveAttribute('id', 'f1');

  const orderBeforeReload = await getSelectionOrder(page);

  await page.reload();

  // Active screen is selection and order is preserved
  await expect(screen(page, 'selection')).not.toHaveClass(/hidden/);
  const orderAfterReload = await getSelectionOrder(page);
  expect(orderAfterReload).toEqual(orderBeforeReload);
});
