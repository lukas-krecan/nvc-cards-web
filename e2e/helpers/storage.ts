import { Page } from '@playwright/test';

export async function seedLanguage(page: Page, lang: 'en' | 'cs') {
  await page.addInitScript(
    (l) => localStorage.setItem('@language', l),
    lang
  );
}

export async function seedLastState(
  page: Page,
  selectedCards: string[],
  activeScreen: string = 'feelings'
) {
  await page.addInitScript(
    ([cards, screen]) =>
      localStorage.setItem('@last', JSON.stringify({ selectedCards: cards, activeScreen: screen })),
    [selectedCards, activeScreen]
  );
}

export async function seedSavedState(page: Page, name: string, selectedCards: string[]) {
  const key = `saved-${new Date().toISOString()}`;
  await page.addInitScript(
    ([k, n, c]) =>
      localStorage.setItem(k as string, JSON.stringify({ name: n, selectedCards: c, savedAt: (k as string).replace('saved-', '') })),
    [key, name, selectedCards]
  );
  return key;
}
