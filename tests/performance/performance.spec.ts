import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('should have good Core Web Vitals on homepage', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Measure Web Vitals
    const webVitals = await page.evaluate(() => {
      return new Promise<Record<string, number>>((resolve) => {
        const vitals: Record<string, number> = {};

        // First Contentful Paint
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              vitals.FCP = entry.startTime;
            }
          }
        }).observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            vitals.LCP = entries[entries.length - 1].startTime;
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        new PerformanceObserver((list) => {
          let clsScore = 0;
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as PerformanceEntry & {
              hadRecentInput?: boolean;
              value?: number;
            };
            if (!layoutShiftEntry.hadRecentInput) {
              clsScore += layoutShiftEntry.value || 0;
            }
          }
          vitals.CLS = clsScore;
        }).observe({ entryTypes: ['layout-shift'] });

        // First Input Delay would require actual user interaction
        // We'll measure Time to Interactive instead
        setTimeout(() => {
          const navigation = performance.getEntriesByType(
            'navigation'
          )[0] as PerformanceNavigationTiming;
          vitals.TTI = navigation.domInteractive;
          vitals.DOMContentLoaded =
            navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          vitals.LoadComplete = navigation.loadEventEnd - navigation.loadEventStart;

          resolve(vitals);
        }, 3000);
      });
    });

    // Assert Core Web Vitals thresholds
    expect(webVitals.FCP).toBeLessThan(1800); // Good FCP < 1.8s
    expect(webVitals.LCP).toBeLessThan(2500); // Good LCP < 2.5s
    expect(webVitals.CLS).toBeLessThan(0.1); // Good CLS < 0.1
    expect(webVitals.TTI).toBeLessThan(3500); // Good TTI < 3.5s
  });

  test('should load menu page quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/menu');
    await page.waitForSelector('[data-testid="product-grid"]', { timeout: 10000 });
    const endTime = Date.now();

    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const images = await page.locator('img').all();

    for (const img of images) {
      // Check if images have proper loading attributes
      const loading = await img.getAttribute('loading');
      const src = await img.getAttribute('src');

      // Images below the fold should have lazy loading
      const isInViewport = await img.isVisible();
      if (!isInViewport) {
        expect(loading).toBe('lazy');
      }

      // Images should be optimized (Next.js Image component)
      if (src) {
        expect(src).toMatch(/\/_next\/image\?|\.webp|\.avif/);
      }
    }
  });

  test('should have good bundle size', async ({ page }) => {
    await page.goto('/');

    // Get all network requests
    const responses: Array<{
      url: string;
      status: number;
      size: number;
      contentType: string;
    }> = [];
    page.on('response', (response) => {
      responses.push({
        url: response.url(),
        size: response.headers()['content-length'],
        type: response.headers()['content-type'],
      });
    });

    await page.waitForLoadState('networkidle');

    // Calculate JavaScript bundle size
    const jsResponses = responses.filter(
      (r) => r.type?.includes('javascript') && r.url.includes('/_next/static/')
    );

    const totalJSSize = jsResponses.reduce((total, response) => {
      return total + (parseInt(response.size) || 0);
    }, 0);

    // Should be less than 500KB total
    expect(totalJSSize).toBeLessThan(500 * 1024);
  });

  test('should handle many cart operations efficiently', async ({ page }) => {
    await page.goto('/menu');
    await page.waitForSelector('[data-testid="add-to-cart-button"]', { timeout: 10000 });

    // Add multiple items to cart quickly
    const addButtons = await page.locator('[data-testid="add-to-cart-button"]').all();
    const startTime = Date.now();

    // Add 5 items to cart
    for (let i = 0; i < Math.min(5, addButtons.length); i++) {
      await addButtons[i].click();
      await page.waitForTimeout(100); // Small delay between clicks
    }

    const endTime = Date.now();
    const operationTime = endTime - startTime;

    // Should complete within 3 seconds
    expect(operationTime).toBeLessThan(3000);

    // Verify cart count updated correctly
    const cartCount = await page.locator('[data-testid="cart-count"]').textContent();
    expect(parseInt(cartCount || '0')).toBe(5);
  });

  test('should have fast search/filter performance', async ({ page }) => {
    await page.goto('/menu');
    await page.waitForSelector('[data-testid="category-tabs"]', { timeout: 10000 });

    const categoryTabs = await page.locator('[data-testid="category-tab"]').all();

    if (categoryTabs.length > 1) {
      const startTime = Date.now();

      // Click through different categories
      for (let i = 0; i < Math.min(3, categoryTabs.length); i++) {
        await categoryTabs[i].click();
        await page.waitForSelector('[data-testid="product-card"]', { timeout: 5000 });
      }

      const endTime = Date.now();
      const filterTime = endTime - startTime;

      // Category filtering should be fast
      expect(filterTime).toBeLessThan(3000);
    }
  });

  test('should have efficient form submission', async ({ page }) => {
    // Add item to cart and go to checkout
    await page.goto('/menu');
    await page.waitForSelector('[data-testid="add-to-cart-button"]', { timeout: 10000 });
    await page.locator('[data-testid="add-to-cart-button"]').first().click();

    await page.locator('[data-testid="cart-trigger"]').click();
    await page.locator('[data-testid="checkout-button"]').click();

    // Fill form
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="phone"]', '757-555-0123');
    await page.locator('select[name="pickupTime"]').selectOption({ index: 1 });

    // Measure form submission time
    const startTime = Date.now();
    await page.locator('[data-testid="place-order-button"]').click();

    // Wait for navigation or success state
    await page.waitForURL(/\/checkout\/confirmation/, { timeout: 10000 });
    const endTime = Date.now();

    const submissionTime = endTime - startTime;
    expect(submissionTime).toBeLessThan(5000); // Should submit within 5 seconds
  });

  test('should handle mobile performance', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const endTime = Date.now();

    const mobileLoadTime = endTime - startTime;
    expect(mobileLoadTime).toBeLessThan(6000); // Mobile should load within 6 seconds

    // Test mobile navigation performance
    const menuToggleStart = Date.now();
    await page.locator('[data-testid="mobile-menu-trigger"]').click();
    await page.waitForSelector('[data-testid="mobile-menu"]', { state: 'visible' });
    const menuToggleEnd = Date.now();

    expect(menuToggleEnd - menuToggleStart).toBeLessThan(500); // Menu should open quickly
  });

  test('should have good lighthouse scores', async ({ page }) => {
    // Note: This is a simplified performance check
    // In a real scenario, you might use lighthouse-ci or similar tools

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check basic performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        load: navigation.loadEventEnd - navigation.loadEventStart,
        firstByte: navigation.responseStart - navigation.requestStart,
        domInteractive: navigation.domInteractive - navigation.fetchStart,
      };
    });

    expect(metrics.domContentLoaded).toBeLessThan(1000);
    expect(metrics.load).toBeLessThan(2000);
    expect(metrics.firstByte).toBeLessThan(800);
    expect(metrics.domInteractive).toBeLessThan(3000);
  });

  test('should handle concurrent users efficiently', async ({ page, context }) => {
    // Simulate multiple tabs/users
    const pages = await Promise.all([context.newPage(), context.newPage(), context.newPage()]);

    const startTime = Date.now();

    // Navigate all pages simultaneously
    await Promise.all([
      page.goto('/'),
      pages[0].goto('/menu'),
      pages[1].goto('/our-story'),
      pages[2].goto('/contact'),
    ]);

    // Wait for all pages to load
    await Promise.all([
      page.waitForLoadState('networkidle'),
      pages[0].waitForLoadState('networkidle'),
      pages[1].waitForLoadState('networkidle'),
      pages[2].waitForLoadState('networkidle'),
    ]);

    const endTime = Date.now();
    const concurrentLoadTime = endTime - startTime;

    expect(concurrentLoadTime).toBeLessThan(8000); // Should handle concurrent loads

    // Clean up
    await Promise.all(pages.map((p) => p.close()));
  });
});
