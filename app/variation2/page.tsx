import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Phone, Clock, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DynamicHours } from '@/components/ui/dynamic-hours';
import { MenuShowcaseCard } from '@/components/showcase/menu-showcase-card';
import { CustomerTestimonials } from '@/components/showcase/customer-testimonials';
import { ArtisanProfile } from '@/components/showcase/artisan-profile';
import { BakingProcess } from '@/components/showcase/baking-process';
import { IngredientStory } from '@/components/showcase/ingredient-story';
import { fallbackProducts } from '@/lib/fallback-menu-data';

function getFeaturedProducts() {
  return fallbackProducts.filter((product) => product.featured && product.available);
}

export default function Variation2Page() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70 z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-accent/30">
          {/* Placeholder for hero image */}
        </div>
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Authentic French Artisan Bakery</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Experience the timeless tradition of French baking in the heart of Norfolk, Virginia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/menu" className="flex items-center gap-2 whitespace-nowrap">
                Explore Our Creations <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
              asChild
            >
              <Link href="/contact">Visit Our Bakery</Link>
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

      {/* Welcome Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif mb-6">Welcome to La Brioche</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Where French tradition meets Norfolk hospitality. Every morning, we bring the
              authentic flavors of France to your table with pastries, breads, and confections
              crafted using time-honored techniques passed down through generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link href="/our-story" className="flex items-center gap-2 whitespace-nowrap">
                  <ChefHat className="h-4 w-4" />
                  Our Story
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact" className="flex items-center gap-2 whitespace-nowrap">
                  <Clock className="h-4 w-4" />
                  Hours & Location
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif mb-4">Featured Creations</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most beloved pastries and breads, each crafted with authentic French
              techniques and the finest imported ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <MenuShowcaseCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
                available={product.available}
                categoryId={product.category._id}
                featured={product.featured}
                ingredients={product.ingredients}
              />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/menu" className="flex items-center gap-2 whitespace-nowrap">
                View Complete Menu <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Artisan Profile */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <ArtisanProfile />
        </div>
      </section>

      {/* Baking Process */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <BakingProcess />
        </div>
      </section>

      {/* Ingredient Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <IngredientStory />
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <CustomerTestimonials maxItems={6} mobileMaxItems={3} />
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-6">The French Baking Tradition</h2>
              <p className="text-lg text-muted-foreground mb-6">
                French baking is more than a craft—it&apos;s an art form that has been perfected
                over centuries. At La Brioche, we honor this tradition by using only authentic
                techniques and ingredients sourced directly from France.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                From the moment our ovens warm at 2 AM to the final pastry that leaves our display
                case, every step is guided by the principles of French pâtisserie: precision,
                patience, and an unwavering commitment to quality.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our bakery is a bridge between the old world and the new—bringing the authentic
                flavors of France to the warm, welcoming community of Norfolk, Virginia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" asChild>
                  <Link href="/our-story" className="flex items-center gap-2 whitespace-nowrap">
                    Read Our Full Story <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Plan Your Visit</Link>
                </Button>
              </div>
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

      {/* Hours & Location Emphasis */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-6">Visit La Brioche</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience authentic French baking in the heart of Norfolk&apos;s historic Colley
              Avenue district.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Hours of Operation</h3>
                <DynamicHours variant="full" />
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Location & Contact</h3>
                <div className="space-y-3 text-left">
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
                  <div className="pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/contact">Get Directions</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-6">
                We look forward to welcoming you to our authentic French bakery experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Plan Your Visit</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/menu">Browse Our Menu</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
