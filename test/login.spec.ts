import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/'); // Adjust URL if needed
  });

  test('should display email and password fields', async ({ page }) => {
    await expect(page.locator('input[placeholder="Enter email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Enter password"]')).toBeVisible();
  });

  test('should allow typing in email and password fields', async ({ page }) => {
    const emailInput = page.locator('input[placeholder="Enter email"]');
    const passwordInput = page.locator('input[placeholder="Enter password"]');

    await emailInput.fill('test@example.com');
    await passwordInput.fill('password123');

    await expect(emailInput).toHaveValue('test@example.com');
    await expect(passwordInput).toHaveValue('password123');
  });


  test('should display login button and be clickable', async ({ page }) => {
    const signInButton = page.locator('button', { hasText: 'Sign In' });
    await expect(signInButton).toBeVisible();
    await expect(signInButton).toBeEnabled();
  });
});
