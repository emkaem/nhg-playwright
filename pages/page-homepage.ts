import { type Locator, type Page } from '@playwright/test';

export class Homepage {
  readonly page: Page;
  readonly nhgToetsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nhgToetsButton = page.locator('a.text-white', { hasText: 'NHG toets' }).first();
  }

  async visitPage() {
    await this.page.goto('https://www.nhg.nl/');
  }
}
