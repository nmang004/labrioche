import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Add item to cart first
    await page.goto('/menu');
    await page.waitForSelector('[data-testid="add-to-cart-button"]', { timeout: 10000 });
    await page.locator('[data-testid="add-to-cart-button"]').first().click();
    
    // Navigate to checkout
    await page.locator('[data-testid="cart-trigger"]').click();
    await page.locator('[data-testid="checkout-button"]').click();
  });

  test('should load checkout page', async ({ page }) => {
    await expect(page).toHaveURL('/checkout');
    await expect(page.locator('h1')).toContainText('Checkout');
  });

  test('should display order summary', async ({ page }) => {
    await expect(page.locator('[data-testid="order-summary"]')).toBeVisible();
    await expect(page.locator('[data-testid="cart-item"]')).toBeVisible();
    await expect(page.locator('[data-testid="subtotal"]')).toBeVisible();
    await expect(page.locator('[data-testid="total"]')).toBeVisible();
  });

  test('should require customer information', async ({ page }) => {
    const form = page.locator('[data-testid="checkout-form"]');
    await expect(form).toBeVisible();
    
    // Check for required fields
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
  });

  test('should validate form fields', async ({ page }) => {
    // Try to submit without filling required fields
    await page.locator('[data-testid="place-order-button"]').click();
    
    // Should show validation errors
    await expect(page.locator('text=required')).toBeVisible();
  });

  test('should complete guest checkout', async ({ page }) => {
    // Fill in customer information
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="phone"]', '757-555-0123');
    
    // Select pickup time
    await page.locator('select[name="pickupTime"]').selectOption({ index: 1 });
    
    // Submit order
    await page.locator('[data-testid="place-order-button"]').click();
    
    // Should navigate to confirmation page
    await expect(page).toHaveURL(/\/checkout\/confirmation/);
    await expect(page.locator('text=Order Confirmed')).toBeVisible();
  });

  test('should handle pickup time selection', async ({ page }) => {
    const pickupTimeSelect = page.locator('select[name="pickupTime"]');
    await expect(pickupTimeSelect).toBeVisible();
    
    // Should have pickup time options
    const options = await pickupTimeSelect.locator('option').count();
    expect(options).toBeGreaterThan(1);
  });

  test('should allow special instructions', async ({ page }) => {
    const instructionsField = page.locator('textarea[name="instructions"]');
    await expect(instructionsField).toBeVisible();
    
    await instructionsField.fill('Please call when ready');
    await expect(instructionsField).toHaveValue('Please call when ready');
  });

  test('should update totals when cart changes', async ({ page }) => {
    // Get initial total
    const initialTotal = await page.locator('[data-testid="total"]').textContent();
    
    // Add another item (go back to menu)
    await page.goto('/menu');
    await page.waitForSelector('[data-testid="add-to-cart-button"]', { timeout: 10000 });
    await page.locator('[data-testid="add-to-cart-button"]').first().click();
    
    // Return to checkout
    await page.goto('/checkout');
    
    // Total should be different
    const newTotal = await page.locator('[data-testid="total"]').textContent();
    expect(newTotal).not.toBe(initialTotal);
  });

  test('should handle empty cart redirect', async ({ page }) => {
    // Clear cart first
    await page.goto('/menu');
    await page.locator('[data-testid="cart-trigger"]').click();
    
    // Remove all items if any
    const removeButtons = page.locator('[data-testid="remove-item-button"]');
    const count = await removeButtons.count();
    for (let i = 0; i < count; i++) {
      await removeButtons.first().click();
    }
    
    // Try to access checkout
    await page.goto('/checkout');
    
    // Should redirect to menu or show empty cart message
    await expect(page).toHaveURL('/menu');
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Form should be visible and usable on mobile
    await expect(page.locator('[data-testid="checkout-form"]')).toBeVisible();
    await expect(page.locator('[data-testid="order-summary"]')).toBeVisible();
    
    // Form fields should be properly sized
    const firstNameInput = page.locator('input[name="firstName"]');
    await expect(firstNameInput).toBeVisible();
    
    // Should be able to fill form on mobile
    await firstNameInput.fill('John');
    await expect(firstNameInput).toHaveValue('John');
  });

  test('should show loading state during submission', async ({ page }) => {
    // Fill form
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="phone"]', '757-555-0123');
    await page.locator('select[name="pickupTime"]').selectOption({ index: 1 });
    
    // Submit and check for loading state
    await page.locator('[data-testid="place-order-button"]').click();
    
    // Button should show loading state
    await expect(page.locator('[data-testid="place-order-button"]')).toBeDisabled();
  });
});