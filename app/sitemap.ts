import { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity/client'
import { Product, Category } from '@/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://labriochenorfolk.com'
  
  // Get all products for dynamic routes
  const products = await sanityClient.fetch(`
    *[_type == "product" && available == true] {
      slug,
      _updatedAt
    }
  `).catch(() => [])

  // Get all categories
  const categories = await sanityClient.fetch(`
    *[_type == "category"] {
      slug,
      _updatedAt
    }
  `).catch(() => [])

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/our-story`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dynamic product routes
  const productRoutes: MetadataRoute.Sitemap = products.map((product: Product) => ({
    url: `${baseUrl}/menu/${product.slug.current}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Dynamic category routes
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category: Category) => ({
    url: `${baseUrl}/menu/category/${category.slug.current}`,
    lastModified: new Date(category._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...categoryRoutes]
}