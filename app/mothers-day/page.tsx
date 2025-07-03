'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/stores/cart-store';
import Script from 'next/script';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const mothersDayProducts: Product[] = [
  {
    id: 'raspberry-cake-md',
    name: 'Raspberry Cake',
    price: 45,
    description:
      'Delicate layers of vanilla sponge filled with fresh raspberry mousse and topped with glazed raspberries. A perfect balance of sweet and tart.',
    image: '/photos/Mothersday3.jpg',
  },
  {
    id: 'chocolate-cake-md',
    name: 'Chocolate Cake',
    price: 45,
    description:
      'Rich, decadent chocolate layers with silky ganache and chocolate shavings. An indulgent treat for the chocolate lover.',
    image: '/photos/Mothersday1.jpg',
  },
  {
    id: 'chocolate-box-md',
    name: 'Artisan Chocolate Box',
    price: 25,
    description:
      'A curated selection of handcrafted French chocolates. Each piece is a work of art, perfect for gifting.',
    image: '/photos/Mothersday2.jpg',
  },
];

const faqs = [
  {
    question: "When should I place my Mother's Day order?",
    answer:
      "We recommend placing your order at least 48 hours in advance to ensure availability. For Mother's Day weekend, orders placed by Thursday, May 9th will be ready for pickup on Saturday, May 11th or Sunday, May 12th.",
  },
  {
    question: 'What are the pickup times?',
    answer:
      "Pickup is available during our regular hours: Tuesday-Friday 7:00 AM - 6:00 PM, Saturday 8:00 AM - 5:00 PM, and Sunday 8:00 AM - 3:00 PM. We'll confirm your preferred pickup time when you place your order.",
  },
  {
    question: 'Can I customize my cake or add a special message?',
    answer:
      "Yes! We can add a personalized message to your cake. Please include your message in the order notes, and we'll beautifully inscribe it in chocolate. For other customizations, please call us at (757) 226-9745.",
  },
  {
    question: 'Do you offer delivery?',
    answer:
      'We currently offer pickup only at our Norfolk location. This ensures your treats arrive in perfect condition for your special celebration.',
  },
  {
    question: 'What about allergens?',
    answer:
      'Our cakes contain wheat, eggs, and dairy. The chocolate box may contain nuts. Please contact us if you have specific allergen concerns or need ingredient information.',
  },
  {
    question: "Can I order other items along with the Mother's Day specials?",
    answer:
      "Absolutely! You can add any items from our regular menu to your Mother's Day order. Visit our main menu to see all available options.",
  },
];

export default function MothersDayPage() {
  const addItem = useCartStore((state) => state.addItem);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    // Show temporary success feedback
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SpecialAnnouncement',
    name: "Mother's Day Special at La Brioche",
    text: "Celebrate Mother's Day with our special collection of French cakes and chocolates. Order by May 9th for weekend pickup.",
    datePosted: '2024-04-01',
    expires: '2024-05-12',
    category: 'https://www.wikidata.org/wiki/Q1322425', // Mother's Day
    announcementLocation: {
      '@type': 'LocalBusiness',
      '@id': 'https://labrioche.com/#business',
      name: 'La Brioche French Bakery',
      image: '/photos/Mothersday1.jpg',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1415 Colley Avenue',
        addressLocality: 'Norfolk',
        addressRegion: 'VA',
        postalCode: '23517',
        addressCountry: 'US',
      },
      telephone: '+17572269745',
      email: 'yvanbakery@gmail.com',
      priceRange: '$$',
      servesCuisine: 'French Bakery',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: "Mother's Day Collection",
        itemListElement: mothersDayProducts.map((product, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.image,
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              availabilityStarts: '2024-04-01',
              availabilityEnds: '2024-05-12',
              priceValidUntil: '2024-05-12',
            },
          },
        })),
      },
    },
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <Script
        id="mothers-day-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Script
        id="mothers-day-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      {/* Hero Section */}
      <header
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        role="banner"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/20 z-10" />
        <Image
          src="/photos/Mothersday1.jpg"
          alt="Mother's Day special collection at La Brioche French Bakery - featuring chocolate cake, raspberry cake, and artisan chocolates"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg">
            Celebrate Mom
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
            Make her day extra special with our handcrafted French delights
          </p>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 inline-block">
            <p className="text-gray-800 text-lg font-medium">
              <strong>Order by May 9th</strong> for Mother&apos;s Day Weekend Pickup
            </p>
          </div>
        </div>
      </header>

      {/* Special Products Section */}
      <main>
        <section className="py-16 px-4 max-w-7xl mx-auto" aria-labelledby="products-heading">
          <h2 id="products-heading" className="text-4xl font-serif text-center mb-4">
            Mother&apos;s Day Collection
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Treat Mom to something extraordinary. Each item is carefully crafted with love and the
            finest ingredients.
          </p>

          <div className="grid md:grid-cols-3 gap-8" role="list">
            {mothersDayProducts.map((product) => (
              <article
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
                role="listitem"
                itemScope
                itemType="https://schema.org/Product"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.name} - ${product.description}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    itemProp="image"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif mb-2" itemProp="name">
                    {product.name}
                  </h3>
                  <p
                    className="text-3xl font-semibold text-pink-600 mb-4"
                    itemProp="offers"
                    itemScope
                    itemType="https://schema.org/Offer"
                  >
                    <span itemProp="price">${product.price}</span>
                    <meta itemProp="priceCurrency" content="USD" />
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                  </p>
                  <p className="text-gray-600 mb-6" itemProp="description">
                    {product.description}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addedToCart === product.id}
                    className={`w-full py-3 px-6 rounded-md font-medium transition-all ${
                      addedToCart === product.id
                        ? 'bg-green-600 text-white'
                        : 'bg-pink-600 text-white hover:bg-pink-700'
                    }`}
                    aria-label={`Add ${product.name} to cart for $${product.price}`}
                  >
                    {addedToCart === product.id ? 'Added to Cart!' : 'Add to Cart'}
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 bg-pink-50 rounded-lg p-8 text-center">
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Special Touch:</span> Add a personalized message to
              any cake at no extra charge. Simply include your message in the order notes!
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 max-w-4xl mx-auto" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-4xl font-serif text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-medium text-gray-900" itemProp="name">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {openFaq === index && (
                  <div
                    className="px-6 pb-4"
                    id={`faq-answer-${index}`}
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <p className="text-gray-600" itemProp="text">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Call to Action */}
      <footer
        className="bg-pink-100 py-16 px-4 text-center"
        itemScope
        itemType="https://schema.org/LocalBusiness"
      >
        <h2 className="text-3xl font-serif mb-4">Ready to Order?</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Show Mom how much you care with a delicious treat from La Brioche. Order now for pickup at
          our Norfolk location.
        </p>
        <div
          className="space-y-2 text-gray-600"
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
        >
          <p>
            📍 <span itemProp="streetAddress">1415 Colley Avenue</span>,{' '}
            <span itemProp="addressLocality">Norfolk</span>,{' '}
            <span itemProp="addressRegion">Virginia</span> <span itemProp="postalCode">23517</span>
          </p>
          <p>
            📞{' '}
            <a href="tel:+17572269745" itemProp="telephone">
              (757) 226-9745
            </a>
          </p>
          <p>
            ✉️{' '}
            <a href="mailto:yvanbakery@gmail.com" itemProp="email">
              yvanbakery@gmail.com
            </a>
          </p>
        </div>
        <meta itemProp="name" content="La Brioche French Bakery" />
        <meta itemProp="priceRange" content="$$" />
        <meta itemProp="servesCuisine" content="French Bakery" />
      </footer>
    </div>
  );
}
