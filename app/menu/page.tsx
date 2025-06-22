import { Metadata } from 'next';
import { Suspense } from 'react';
import { sanityClient } from '@/lib/sanity/client';
import { PRODUCTS_QUERY, CATEGORIES_QUERY } from '@/lib/sanity/queries';
import { Product, Category } from '@/types';
import { ProductCard } from '@/components/ui/product-card';
import { ProductCardSkeleton } from '@/components/ui/product-card-skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getFallbackMenuData } from '@/lib/fallback-menu-data';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Browse our selection of fresh French pastries, breads, and more.',
};

async function getMenuData() {
  try {
    const [products, categories] = await Promise.all([
      sanityClient.fetch<Product[]>(PRODUCTS_QUERY),
      sanityClient.fetch<Category[]>(CATEGORIES_QUERY),
    ]);

    // Use fallback data if Sanity returns empty data
    if (products.length === 0 || categories.length === 0) {
      console.log('Using fallback menu data - Sanity returned empty data');
      return getFallbackMenuData();
    }

    return { products, categories };
  } catch (error) {
    console.error('Error fetching menu data:', error);
    console.log('Using fallback menu data due to error');
    return getFallbackMenuData();
  }
}

function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products available in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          name={product.name}
          price={product.price}
          image={product.image}
          description={product.description}
          available={product.available}
        />
      ))}
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function MenuPage() {
  const { products, categories } = await getMenuData();

  // Check if we're using fallback data
  const usingFallbackData = products.length > 0 && products[0]._id.includes('croissant');

  // Group products by category
  const productsByCategory = products.reduce(
    (acc, product) => {
      const categoryId = product.category?._id || 'uncategorized';
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(product);
      return acc;
    },
    {} as Record<string, Product[]>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Our Menu</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Fresh from our ovens every morning. All items are made with premium ingredients and
          traditional French techniques.
        </p>
        {usingFallbackData && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700">
              <strong>Demo Mode:</strong> Displaying sample menu items. Live menu will be managed
              through our content system.
            </p>
          </div>
        )}
      </div>

      {categories.length > 0 ? (
        <Tabs defaultValue={categories[0]?._id} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category._id} value={category._id}>
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category._id} value={category._id}>
              {category.description && (
                <p className="text-center text-muted-foreground mb-8">{category.description}</p>
              )}
              <Suspense fallback={<LoadingGrid />}>
                <ProductGrid products={productsByCategory[category._id] || []} />
              </Suspense>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-serif mb-6">All Products</h2>
            <Suspense fallback={<LoadingGrid />}>
              <ProductGrid products={products} />
            </Suspense>
          </div>
        </div>
      )}

      <div className="mt-12 p-6 bg-secondary/20 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Custom Orders</h3>
        <p className="text-muted-foreground mb-4">
          Need something special? We accept custom orders for events and celebrations.
        </p>
        <p className="text-sm">
          Call us at{' '}
          <a href="tel:+17572269745" className="font-medium text-primary hover:underline">
            1-757-226-9745
          </a>{' '}
          to discuss your needs.
        </p>
      </div>
    </div>
  );
}
