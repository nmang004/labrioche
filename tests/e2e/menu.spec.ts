import { test, expect } from '@playwright/test';

test.describe('Menu Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/menu');
  });

  test('should load menu page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Menu.*La Brioche/);
    await expect(page.locator('h1')).toContainText('Menu');
  });

  test('should display product categories', async ({ page }) => {
    // Wait for categories to load
    await page.waitForSelector('[data-testid="category-tabs"]', { timeout: 10000 });
    
    const categoryTabs = page.locator('[data-testid="category-tab"]');
    await expect(categoryTabs.first()).toBeVisible();
    
    // Should have multiple categories
    const categoryCount = await categoryTabs.count();
    expect(categoryCount).toBeGreaterThan(0);
  });

  test('should display products', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-grid"]', { timeout: 10000 });
    
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards.first()).toBeVisible();
    
    // Check essential product information
    const firstProduct = productCards.first();
    await expect(firstProduct.locator('img')).toBeVisible();
    await expect(firstProduct.locator('h3')).toBeVisible();
    await expect(firstProduct.locator('text=/\\$\\d+\\.\\d{2}/')).toBeVisible();
  });

  test('should filter products by category', async ({ page }) => {
    // Wait for initial load
    await page.waitForSelector('[data-testid="category-tabs"]', { timeout: 10000 });
    
    const categoryTabs = page.locator('[data-testid="category-tab"]');
    const tabCount = await categoryTabs.count();
    
    if (tabCount > 1) {
      // Click on second category tab
      await categoryTabs.nth(1).click();
      
      // Wait for products to update
      await page.waitForTimeout(1000);
      
      // Products should still be visible
      const productCards = page.locator('[data-testid="product-card"]');
      await expect(productCards.first()).toBeVisible();
    }
  });

  test('should add product to cart', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    
    const addToCartButton = page.locator('[data-testid="add-to-cart-button"]').first();
    await expect(addToCartButton).toBeVisible();
    
    // Click add to cart
    await addToCartButton.click();
    
    // Cart count should increase
    const cartCount = page.locator('[data-testid="cart-count"]');
    await expect(cartCount).toContainText('1');
  });

  test('should open cart drawer', async ({ page }) => {
    // Add item to cart first
    await page.waitForSelector('[data-testid="add-to-cart-button"]', { timeout: 10000 });
    await page.locator('[data-testid="add-to-cart-button"]').first().click();
    
    // Open cart drawer
    await page.locator('[data-testid="cart-trigger"]').click();
    
    // Cart drawer should be visible
    await expect(page.locator('[data-testid="cart-drawer"]')).toBeVisible();
    
    // Should show cart items
    await expect(page.locator('[data-testid="cart-item"]')).toBeVisible();
  });

  test('should display product details', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    
    // Check for product information
    await expect(firstProduct.locator('h3')).toBeVisible();
    await expect(firstProduct.locator('p')).toBeVisible(); // Description
    await expect(firstProduct.locator('text=/\\$\\d+\\.\\d{2}/')).toBeVisible(); // Price
  });

  test('should handle empty cart state', async ({ page }) => {
    // Open cart drawer when empty
    await page.locator('[data-testid="cart-trigger"]').click();
    
    // Should show empty cart message
    await expect(page.locator('[data-testid="cart-drawer"]')).toBeVisible();
    await expect(page.locator('text=Your cart is empty')).toBeVisible();
  });

  test('should navigate to checkout from cart', async ({ page }) => {
    // Add item to cart
    await page.waitForSelector('[data-testid="add-to-cart-button"]', { timeout: 10000 });
    await page.locator('[data-testid="add-to-cart-button"]').first().click();
    
    // Open cart drawer
    await page.locator('[data-testid="cart-trigger"]').click();
    
    // Click checkout button
    const checkoutButton = page.locator('[data-testid="checkout-button"]');
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();
    
    // Should navigate to checkout
    await expect(page).toHaveURL('/checkout');
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Menu should be visible on mobile
    await expect(page.locator('h1')).toBeVisible();
    
    // Category tabs should be scrollable/responsive
    await expect(page.locator('[data-testid="category-tabs"]')).toBeVisible();
    
    // Product grid should adapt to mobile
    await page.waitForSelector('[data-testid="product-grid"]', { timeout: 10000 });
    await expect(page.locator('[data-testid="product-grid"]')).toBeVisible();
  });
});