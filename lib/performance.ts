/**
 * Performance monitoring utilities for La Brioche
 */

// Web Vitals monitoring
interface WebVitalsMetric {
  name: string;
  value: number;
  unit?: string;
  id: string;
}

export function reportWebVitals(metric: WebVitalsMetric) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${metric.name}: ${metric.value}${metric.unit || ''}`)
  }
  
  // Send to analytics service in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      })
    }
  }
}

// Performance marks for custom measurements
export const performanceMark = {
  start: (name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-start`)
    }
  },
  
  end: (name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
      
      const measure = performance.getEntriesByName(name)[0]
      if (measure && process.env.NODE_ENV === 'development') {
        console.log(`${name}: ${measure.duration.toFixed(2)}ms`)
      }
    }
  },
}

// Image loading performance
export function optimizeImageLoading(img: HTMLImageElement) {
  // Add loading="lazy" for images below the fold
  if ('loading' in HTMLImageElement.prototype) {
    img.loading = 'lazy'
  }
  
  // Add decoding="async" for better performance
  if ('decoding' in img) {
    img.decoding = 'async'
  }
}

// Resource hints for critical resources
export function addResourceHints() {
  if (typeof document === 'undefined') return
  
  const head = document.head
  
  // Preconnect to external domains
  const preconnectLinks = [
    'https://cdn.sanity.io',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ]
  
  preconnectLinks.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = href
    if (href.includes('fonts.gstatic.com')) {
      link.crossOrigin = 'anonymous'
    }
    head.appendChild(link)
  })
}

// Lazy loading observer for components
export function createLazyObserver(callback: (entries: IntersectionObserverEntry[]) => void) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px',
    threshold: 0.01,
  })
}

// Bundle size monitoring (development only)
export function logBundleSize() {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    // Log performance navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigation) {
          console.log('Page Load Metrics:', {
            'DNS Lookup': `${navigation.domainLookupEnd - navigation.domainLookupStart}ms`,
            'TCP Connect': `${navigation.connectEnd - navigation.connectStart}ms`,
            'Response Time': `${navigation.responseEnd - navigation.requestStart}ms`,
            'DOM Complete': `${navigation.domComplete - navigation.fetchStart}ms`,
            'Load Complete': `${navigation.loadEventEnd - navigation.fetchStart}ms`,
          })
        }
      }, 0)
    })
  }
}

// Critical CSS detection
export function isCriticalCSS(selector: string): boolean {
  const criticalSelectors = [
    'html', 'body', 'header', 'nav', 'main', 'footer',
    '.hero', '.header', '.nav', '.menu-toggle',
    '.loading', '.error', '.fallback',
    // Add more critical selectors as needed
  ]
  
  return criticalSelectors.some(critical => selector.includes(critical))
}

// Prefetch critical routes
export function prefetchCriticalRoutes() {
  if (typeof window === 'undefined') return
  
  const criticalRoutes = ['/menu', '/contact', '/our-story']
  
  criticalRoutes.forEach(route => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = route
    document.head.appendChild(link)
  })
}