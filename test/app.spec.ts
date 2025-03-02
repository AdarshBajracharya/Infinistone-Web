import { test, expect } from '@playwright/test';



test('Fill Email Input Field', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.fill('input[placeholder="Enter email"]', 'test@example.com');
  const emailValue = await page.inputValue('input[placeholder="Enter email"]');
  expect(emailValue).toBe('test@example.com');
});


test('Login with Invalid Credentials', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.fill('input[placeholder="Enter email"]', 'wrong@example.com');
  await page.fill('input[placeholder="Enter password"]', 'wrongpassword');
  await page.click('button:has-text("Sign In")');
  await expect(page.locator('.text-red-500')).toContainText('Login failed. Please check your credentials.');
});




