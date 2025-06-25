import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';
import { PersonalizedGreeting } from '@/components/ui/personalized-greeting';
import { ProductRecommendations } from '@/components/ui/product-recommendations';
import { FavoritesSection } from '@/components/ui/favorites-section';
import { DynamicHours } from '@/components/ui/dynamic-hours';
import { fallbackProducts } from '@/lib/fallback-menu-data';

function getFeaturedProducts() {
  // Filter featured products from fallback data
  return fallbackProducts.filter((product) => product.featured && product.available);
}

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70 z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-accent/30">
          {/* Placeholder for hero image */}
        </div>
        <div className="relative z-20 text-center text-white max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Welcome to La Brioche</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Experience the authentic taste of French artisan baking in the heart of Norfolk
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/menu" className="flex items-center gap-2 whitespace-nowrap">
                View Our Menu <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
              asChild
            >
              <Link href="/contact">Visit Us Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-secondary/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center md:text-left">
            <DynamicHours variant="today-only" />
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm">1415 Colley Avenue, Norfolk, Virginia 23517</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+17572269745" className="text-sm hover:text-primary">
                (757) 226-9745
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Greeting */}
      <section className="py-12 bg-secondary/10">
        <div className="container mx-auto px-4">
          <PersonalizedGreeting className="text-center" />
        </div>
      </section>

      {/* Favorites Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <FavoritesSection maxItems={4} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif mb-4">Customer Favorites</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most beloved pastries and breads, freshly baked every morning with the
              finest ingredients imported from France.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
                available={product.available}
                categoryId={product.category._id}
              />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/menu" className="flex items-center gap-2 whitespace-nowrap">
                View Full Menu <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-6">Welcome to La Brioche</h2>
              <p className="text-lg text-muted-foreground mb-6">
                La Brioche brings the authentic taste of French artisan baking to Norfolk, Virginia.
                Our master bakers use traditional techniques passed down through generations,
                combined with the finest ingredients imported directly from France.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Every morning, our ovens come alive before dawn, filling our bakery with the
                irresistible aroma of fresh bread and pastries. From our signature croissants to our
                rustic sourdough, each item is crafted with passion and precision.
              </p>
              <Button variant="outline" asChild>
                <Link href="/our-story" className="flex items-center gap-2 whitespace-nowrap">
                  Learn More About Us <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/photos/yvan.webp"
                alt="Yvan, master baker at La Brioche"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Recommendations */}
      <section className="py-12 bg-secondary/5">
        <div className="container mx-auto px-4">
          <ProductRecommendations maxItems={4} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif mb-6">Order Ahead for Pickup</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Skip the line and have your favorite items ready when you arrive. Order online for
            convenient pickup at our Norfolk location.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/menu">Order Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
              asChild
            >
              <Link href="/account/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
