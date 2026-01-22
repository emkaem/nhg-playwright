import { Page } from '@playwright/test';

const shouldTakeScreenshots = process.env.TAKE_SCREENSHOTS === 'true';

export async function takeSnapshot(page: Page, screenshotName: string) {
  if (shouldTakeScreenshots) {
    await page.screenshot({ path: screenshotName });
  } else {
    console.log(`Skipping screenshot: ${screenshotName}`);
  }
}
