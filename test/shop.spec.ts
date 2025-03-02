import { test, expect } from "@playwright/test";

test.describe("Shop Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/shop"); // Adjust URL if needed
  });

  test("Page loads with correct title", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText("Marble, Tile & Granite Shop");
  });

  test("All category buttons are visible", async ({ page }) => {
    for (const category of ["all", "Marble", "Tile", "Granite"]) {
      await expect(page.locator(`button:has-text('${category}')`)).toBeVisible();
    }
  });


  test("Product grid is displayed", async ({ page }) => {
    await expect(page.locator(".grid")).toBeVisible();
  });


  test("Clicking a product navigates to details page", async ({ page }) => {
    const firstProduct = page.locator(".cursor-pointer").first();
    await firstProduct.click();
    await expect(page).toHaveURL(/\/product\//);
  });



  test("Hovering over a product scales it up", async ({ page }) => {
    const firstProduct = page.locator(".cursor-pointer").first();
    await firstProduct.hover();
    await expect(firstProduct).toHaveClass(/hover:scale-105/);
  });
});
