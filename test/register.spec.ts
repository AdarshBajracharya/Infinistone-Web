import { test, expect } from '@playwright/test';

test.describe('Register Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/register'); // Adjust URL if needed
  });

  test('should display all input fields', async ({ page }) => {
    await expect(page.locator('input[placeholder="First Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Last Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Phone Number"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Address"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Confirm Password"]')).toBeVisible();
  });

  test('should allow typing in input fields', async ({ page }) => {
    await page.fill('input[placeholder="First Name"]', 'John');
    await page.fill('input[placeholder="Last Name"]', 'Doe');
    await page.fill('input[placeholder="Phone Number"]', '1234567890');
    await page.fill('input[placeholder="Email"]', 'john.doe@example.com');
    await page.fill('input[placeholder="Address"]', '123 Street');
    await page.fill('input[placeholder="Password"]', 'password123');
    await page.fill('input[placeholder="Confirm Password"]', 'password123');

    await expect(page.locator('input[placeholder="First Name"]')).toHaveValue('John');
    await expect(page.locator('input[placeholder="Last Name"]')).toHaveValue('Doe');
    await expect(page.locator('input[placeholder="Phone Number"]')).toHaveValue('1234567890');
    await expect(page.locator('input[placeholder="Email"]')).toHaveValue('john.doe@example.com');
    await expect(page.locator('input[placeholder="Address"]')).toHaveValue('123 Street');
  });

  test('should display register button and be clickable', async ({ page }) => {
    const registerButton = page.locator('button', { hasText: 'Register' });
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeEnabled();
  });


});
