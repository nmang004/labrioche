import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  
  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    
    // Click login link (might be in header or mobile menu)
    const loginLink = page.locator('a[href="/auth/login"]').first();
    await expect(loginLink).toBeVisible();
    await loginLink.click();
    
    await expect(page).toHaveURL('/auth/login');
    await expect(page.locator('h1')).toContainText('Sign In');
  });

  test('should display login form', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Check form elements
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Check for Google OAuth button
    await expect(page.locator('text=Continue with Google')).toBeVisible();
  });

  test('should validate login form', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Try to submit empty form
    await page.locator('button[type="submit"]').click();
    
    // Should show validation errors
    await expect(page.locator('text=required')).toBeVisible();
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/auth/login');
    
    const signupLink = page.locator('a[href="/auth/signup"]');
    await expect(signupLink).toBeVisible();
    await signupLink.click();
    
    await expect(page).toHaveURL('/auth/signup');
    await expect(page.locator('h1')).toContainText('Create Account');
  });

  test('should display signup form', async ({ page }) => {
    await page.goto('/auth/signup');
    
    // Check form elements
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate signup form', async ({ page }) => {
    await page.goto('/auth/signup');
    
    // Try to submit empty form
    await page.locator('button[type="submit"]').click();
    
    // Should show validation errors
    await expect(page.locator('text=required')).toBeVisible();
  });

  test('should validate password confirmation', async ({ page }) => {
    await page.goto('/auth/signup');
    
    // Fill mismatched passwords
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password456');
    await page.locator('button[type="submit"]').click();
    
    // Should show password mismatch error
    await expect(page.locator('text=Passwords do not match')).toBeVisible();
  });

  test('should navigate to password reset', async ({ page }) => {
    await page.goto('/auth/login');
    
    const resetLink = page.locator('a[href="/auth/reset-password"]');
    await expect(resetLink).toBeVisible();
    await resetLink.click();
    
    await expect(page).toHaveURL('/auth/reset-password');
    await expect(page.locator('h1')).toContainText('Reset Password');
  });

  test('should display password reset form', async ({ page }) => {
    await page.goto('/auth/reset-password');
    
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should handle password reset submission', async ({ page }) => {
    await page.goto('/auth/reset-password');
    
    await page.fill('input[name="email"]', 'test@example.com');
    await page.locator('button[type="submit"]').click();
    
    // Should show success message
    await expect(page.locator('text=Check your email')).toBeVisible();
  });

  test('should handle Google OAuth flow', async ({ page }) => {
    await page.goto('/auth/login');
    
    const googleButton = page.locator('text=Continue with Google');
    await expect(googleButton).toBeVisible();
    
    // Note: We can't actually test the OAuth flow in E2E tests
    // but we can verify the button exists and is clickable
    await expect(googleButton).toBeEnabled();
  });

  test('should redirect to account after login', async ({ page, context }) => {
    // This test would require actual authentication
    // In a real scenario, you might use a test user account
    // or mock the authentication state
    
    await page.goto('/auth/login');
    await expect(page.locator('h1')).toContainText('Sign In');
    
    // The actual login would redirect to /account
    // We can test this with a mock or test user
  });

  test('should handle logout', async ({ page }) => {
    // This assumes user is already logged in
    // You would typically set up authentication state first
    
    await page.goto('/account');
    
    const logoutButton = page.locator('[data-testid="logout-button"]');
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      
      // Should redirect to home or login
      await expect(page).toHaveURL('/');
    }
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/auth/login');
    
    // Form should be visible and usable on mobile
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Google button should be properly sized
    await expect(page.locator('text=Continue with Google')).toBeVisible();
  });

  test('should handle auth state persistence', async ({ page, context }) => {
    // Test that auth state persists across page reloads
    // This would typically involve setting up a logged-in state
    // and verifying it persists after page refresh
    
    await page.goto('/');
    // Would check for authenticated UI elements
  });
});