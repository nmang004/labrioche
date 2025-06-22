import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/La Brioche/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    await expect(page.locator('section').first()).toBeVisible();
    
    // Check for hero text content
    await expect(page.locator('text=Authentic French')).toBeVisible();
    await expect(page.locator('text=Norfolk')).toBeVisible();
  });

  test('should display featured products', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="featured-products"]', { timeout: 10000 });
    
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards.first()).toBeVisible();
    
    // Check that product cards have essential elements
    await expect(productCards.first().locator('img')).toBeVisible();
    await expect(productCards.first().locator('h3')).toBeVisible();
    await expect(productCards.first().locator('text=/\\$\\d+/')).toBeVisible();
  });

  test('should navigate to menu page', async ({ page }) => {
    await page.click('a[href="/menu"]');
    await expect(page).toHaveURL('/menu');
    await expect(page.locator('h1')).toContainText('Menu');
  });

  test('should display contact information', async ({ page }) => {
    await expect(page.locator('text=Norfolk, VA')).toBeVisible();
    await expect(page.locator('a[href^="tel:"]')).toBeVisible();
    await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Test main navigation links
    const navLinks = ['Menu', 'Our Story', 'Contact'];
    
    for (const linkText of navLinks) {
      const link = page.locator(`nav a:has-text("${linkText}")`);
      await expect(link).toBeVisible();
    }
  });

  test('should display cart icon with item count', async ({ page }) => {
    const cartIcon = page.locator('[data-testid="cart-trigger"]');
    await expect(cartIcon).toBeVisible();
    
    // Cart should start at 0 items
    await expect(cartIcon.locator('[data-testid="cart-count"]')).toContainText('0');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile menu toggle
    await expect(page.locator('[data-testid="mobile-menu-trigger"]')).toBeVisible();
    
    // Hero section should be visible and properly sized
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    
    // Text should be readable
    await expect(page.locator('h1')).toBeVisible({ timeout: 5000 });
  });

  test('should handle promotional banners', async ({ page }) => {
    // Check if promotion banner exists
    const promoBanner = page.locator('[data-testid="promotion-banner"]');
    
    // If banner exists, test its functionality
    if (await promoBanner.isVisible()) {
      await expect(promoBanner).toBeVisible();
      
      // Test dismiss functionality if available
      const dismissButton = promoBanner.locator('[data-testid="dismiss-promotion"]');
      if (await dismissButton.isVisible()) {
        await dismissButton.click();
        await expect(promoBanner).not.toBeVisible();
      }
    }
  });
});