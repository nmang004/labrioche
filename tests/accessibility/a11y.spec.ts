import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  
  test('should not have accessibility violations on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on menu page', async ({ page }) => {
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on contact page', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on our story page', async ({ page }) => {
    await page.goto('/our-story');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on login page', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on signup page', async ({ page }) => {
    await page.goto('/auth/signup');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation through interactive elements
    await page.keyboard.press('Tab');
    
    // Should focus on first interactive element
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);
    
    // Continue tabbing through navigation
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const currentFocus = await page.evaluate(() => document.activeElement?.tagName);
      expect(['A', 'BUTTON', 'INPUT']).toContain(currentFocus);
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
    
    // Should have at least one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);
    
    // H1 should be the main heading
    const h1Text = await page.locator('h1').first().textContent();
    expect(h1Text).toBeTruthy();
  });

  test('should have alternative text for images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const ariaLabel = await img.getAttribute('aria-label');
      const ariaLabelledBy = await img.getAttribute('aria-labelledby');
      
      // Image should have alt text, aria-label, or aria-labelledby
      expect(alt !== null || ariaLabel !== null || ariaLabelledBy !== null).toBeTruthy();
      
      // If alt exists, it shouldn't be empty for content images
      if (alt !== null) {
        const role = await img.getAttribute('role');
        const isDecorative = role === 'presentation' || role === 'none';
        
        if (!isDecorative) {
          expect(alt.length).toBeGreaterThan(0);
        }
      }
    }
  });

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/auth/login');
    
    const inputs = await page.locator('input[type="email"], input[type="password"], input[type="text"]').all();
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        // Check for associated label
        const label = await page.locator(`label[for="${id}"]`).count();
        expect(label > 0 || ariaLabel !== null || ariaLabelledBy !== null).toBeTruthy();
      } else {
        // Should have aria-label or aria-labelledby
        expect(ariaLabel !== null || ariaLabelledBy !== null).toBeTruthy();
      }
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('body')
      .analyze();
    
    // Filter for color contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );
    
    expect(contrastViolations).toEqual([]);
  });

  test('should support screen reader navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check for landmarks
    const main = await page.locator('main').count();
    const nav = await page.locator('nav').count();
    const header = await page.locator('header').count();
    const footer = await page.locator('footer').count();
    
    expect(main).toBeGreaterThan(0);
    expect(nav).toBeGreaterThan(0);
    expect(header).toBeGreaterThan(0);
    expect(footer).toBeGreaterThan(0);
  });

  test('should have accessible cart functionality', async ({ page }) => {
    await page.goto('/menu');
    await page.waitForSelector('[data-testid="add-to-cart-button"]', { timeout: 10000 });
    
    // Add item to cart
    const addButton = page.locator('[data-testid="add-to-cart-button"]').first();
    await expect(addButton).toBeVisible();
    
    // Button should have accessible name
    const buttonText = await addButton.textContent();
    const ariaLabel = await addButton.getAttribute('aria-label');
    expect(buttonText || ariaLabel).toBeTruthy();
    
    await addButton.click();
    
    // Cart icon should have updated count and be accessible
    const cartTrigger = page.locator('[data-testid="cart-trigger"]');
    const cartAriaLabel = await cartTrigger.getAttribute('aria-label');
    expect(cartAriaLabel).toContain('1');
  });

  test('should support high contrast mode', async ({ page }) => {
    // Simulate high contrast mode
    await page.addInitScript(() => {
      window.matchMedia = (query: string) => ({
        matches: query === '(prefers-contrast: high)',
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      });
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Run accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should handle focus management in modals', async ({ page }) => {
    await page.goto('/menu');
    await page.waitForSelector('[data-testid="cart-trigger"]', { timeout: 10000 });
    
    // Open cart drawer (modal)
    await page.locator('[data-testid="cart-trigger"]').click();
    
    // Focus should be trapped in the modal
    const modal = page.locator('[data-testid="cart-drawer"]');
    await expect(modal).toBeVisible();
    
    // Tab through modal elements
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => {
      const focused = document.activeElement;
      return focused ? focused.closest('[data-testid="cart-drawer"]') !== null : false;
    });
    
    expect(focusedElement).toBeTruthy();
  });
});