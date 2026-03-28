import { Page } from '@playwright/test';

// Card scoped to a screen to avoid strict-mode violations
// (selected cards appear in both their origin screen and the selection screen)
export const card = (page: Page, id: string, screenName: string) =>
  page.locator(`[data-testid="screen-${screenName}"] #${id}`);

export const screen = (page: Page, name: string) =>
  page.locator(`[data-testid="screen-${name}"]`);

export const menuBtn = (page: Page, name: string) =>
  page.locator(`[data-testid="btn-${name}"]`);

// Nav.Link without href has no ARIA role — use the .tab CSS class
export const feelingsTab = (page: Page) =>
  page.locator('a.tab', { hasText: 'Feelings' });

export const needsTab = (page: Page) =>
  page.locator('a.tab', { hasText: 'Needs' });

export const selectionTab = (page: Page) =>
  page.locator('a.tab', { hasText: 'Selection' });
