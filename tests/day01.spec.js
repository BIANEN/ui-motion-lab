import { test, expect } from '@playwright/test';

test('Day 01 loads and the focus / return interaction works', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await expect(page.locator('canvas')).toBeVisible();
  await expect(page.getByText('THE UNSEEN')).toBeVisible();
  await page.getByRole('button', { name: /ORBIT/ }).click();
  await expect(page.getByRole('heading', { name: 'ORBIT' })).toBeVisible();
  await expect(page.getByRole('button', { name: /RETURN TO GALLERY/ })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('heading', { name: 'ORBIT' })).toHaveCount(0);
  await page.screenshot({ path: 'test-results/day01-gallery.png', fullPage: true });
  expect(pageErrors).toEqual([]);
});
