import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/page-homepage';
import { ModalCookies } from '../pages/modal-cookies';

test.beforeEach(async ({ page }) => {
  const homepage = new Homepage(page);
  const modalCookies = new ModalCookies(page);

  await homepage.visitPage();
  await modalCookies.acceptAllCookies();
});

test('the flow to get to NHG-toets page from the homepage (desktop)', async ({ page }) => {
  await expect(page).toHaveScreenshot('homepage-desktop.png');

  const nhgToetsButton = await page.locator('a.text-white', { hasText: 'NHG toets' }).first();
  await nhgToetsButton.scrollIntoViewIfNeeded();
  await expect(nhgToetsButton).toBeVisible();
  await expect(page).toHaveScreenshot('homepage-footer-desktop.png');
  await nhgToetsButton.click();

  await expect(page).toHaveTitle('NHG - Sneltoets Acceptatie');
  // expect another element on the page to verify navigation
});
