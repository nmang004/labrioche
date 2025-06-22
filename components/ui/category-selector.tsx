'use client';

import { useState } from 'react';
import { Category, Product } from '@/types';
import { ProductCard } from '@/components/ui/product-card';
import { ProductCardSkeleton } from '@/components/ui/product-card-skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Suspense } from 'react';

interface CategorySelectorProps {
  categories: Category[];
  productsByCategory: Record<string, Product[]>;
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
          categoryId={product.category?._id}
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

export function CategorySelector({ categories, productsByCategory }: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?._id || '');

  if (categories.length === 0) {
    return null;
  }

  const selectedCategoryData = categories.find((cat) => cat._id === selectedCategory);

  return (
    <>
      {/* Desktop Tabs - hidden on mobile */}
      <div className="hidden md:block">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
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
      </div>

      {/* Mobile Dropdown - visible on mobile only */}
      <div className="md:hidden">
        <div className="mb-8">
          <label htmlFor="category-select" className="sr-only">
            Select Category
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {selectedCategoryData?.description && (
          <p className="text-center text-muted-foreground mb-8">
            {selectedCategoryData.description}
          </p>
        )}

        <Suspense fallback={<LoadingGrid />}>
          <ProductGrid products={productsByCategory[selectedCategory] || []} />
        </Suspense>
      </div>
    </>
  );
}
