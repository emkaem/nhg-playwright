import { type Locator, type Page } from "@playwright/test";

export class ModalCookies {
  readonly page: Page;
  readonly acceptAllButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptAllButton = page.getByRole('button', { name: 'Alles toestaan' });
  }

  async acceptAllCookies() {
    await this.acceptAllButton.click();
  }
}