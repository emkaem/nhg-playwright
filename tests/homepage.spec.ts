import { test, expect } from '@playwright/test';

test('the flow to get to NHG-toets page from the homepage (desktop)', async ({ page }) => {
  await page.goto('https://www.nhg.nl/');

  // Ensure the cookies button is clicked before the test starts
  const cookiesButtonAcceptAll = await page.getByRole('button', { name: 'Alles toestaan' });
  await cookiesButtonAcceptAll.click();

  const nhgToetsButton = await page.locator('a.text-white', { hasText: 'NHG toets' }).first(); 
  await nhgToetsButton.scrollIntoViewIfNeeded();
  await expect(nhgToetsButton).toBeVisible();
  await nhgToetsButton.click();

  await expect(page).toHaveTitle('NHG - Sneltoets Acceptatie');
});

