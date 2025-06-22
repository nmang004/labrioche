import { Metadata } from 'next';
import Image from 'next/image';
import { sanityClient } from '@/lib/sanity/client';
import { PAGE_QUERY } from '@/lib/sanity/queries';
import { Page } from '@/types';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity/client';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about La Brioche and our passion for authentic French baking.',
};

async function getPageContent() {
  try {
    const page = await sanityClient.fetch<Page>(PAGE_QUERY, {
      slug: 'our-story',
    });
    return page;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return null;
  }
}

// Portable Text components for rendering rich content
interface ImageValue {
  asset: {
    _ref: string;
  };
  alt?: string;
}

interface PortableTextProps {
  children?: React.ReactNode;
}

interface LinkValue {
  href: string;
}

const components = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Image'}
            width={800}
            height={600}
            className="rounded-lg w-full object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: PortableTextProps) => (
      <h1 className="text-4xl font-serif mb-6 mt-12">{children}</h1>
    ),
    h2: ({ children }: PortableTextProps) => (
      <h2 className="text-3xl font-serif mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }: PortableTextProps) => (
      <h3 className="text-2xl font-serif mb-3 mt-6">{children}</h3>
    ),
    h4: ({ children }: PortableTextProps) => (
      <h4 className="text-xl font-semibold mb-2 mt-4">{children}</h4>
    ),
    normal: ({ children }: PortableTextProps) => (
      <p className="text-lg text-muted-foreground mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: PortableTextProps) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: LinkValue }) => {
      if (!value?.href) return <span>{children}</span>;
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-primary hover:underline">
          {children}
        </a>
      );
    },
  },
};

export default async function OurStoryPage() {
  const pageContent = await getPageContent();

  // Fallback content if no CMS content is available
  const fallbackContent = (
    <>
      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-center">Our Story</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
          From the Neon District to Colley Avenue, La Brioche brings the authentic taste of French
          artisan bakeries to Norfolk, Virginia.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-serif mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground mb-4">
              In March 2019, Yvan and Jacqueline started La Brioche to bring memories of authentic
              French artisan bakeries to their new home in the Neon District.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              From the baguette and the croissants, to the quiches and sandwiches, you will find
              baked goods that make you feel as if you were at a street cafe in Paris.
            </p>
            <p className="text-lg text-muted-foreground">
              In 2024, we decided to move out of the Neon District and to establish the bakery on
              Colley Avenue, where we continue to serve our community with the same passion and
              dedication to authentic French baking.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-secondary to-accent/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/50 text-lg font-medium">Our Bakery</span>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-serif mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
              <p className="text-muted-foreground">
                We stay true to traditional French baking methods, using time-honored techniques
                passed down through generations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌾</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Ingredients</h3>
              <p className="text-muted-foreground">
                We source the finest ingredients, including French butter, organic flours, and
                seasonal produce from local farms.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Love</h3>
              <p className="text-muted-foreground">
                We&apos;re proud to be part of Norfolk&apos;s vibrant community, supporting local
                events and bringing neighbors together.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary/20 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-serif mb-4 text-center">Meet Our Founders</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary/50 text-lg font-medium">Yvan & Jacqueline</span>
              </div>
            </div>
            <div>
              <p className="text-lg text-muted-foreground mb-4">
                &quot;We started La Brioche with a simple dream: to share the authentic flavors and
                warmth of French bakeries with our Norfolk community. Every croissant, every
                baguette, every pastry is crafted with the love and tradition we grew up with in
                France.&quot;
              </p>
              <p className="font-semibold">- Yvan & Jacqueline</p>
              <p className="text-sm text-muted-foreground">Founders & Artisan Bakers</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-serif mb-4">Visit Us Today</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We invite you to experience the warmth of our bakery and the exceptional quality of our
            French pastries and breads. From our family to yours, bienvenue à La Brioche!
          </p>
        </div>
      </div>
    </>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {pageContent ? (
        <>
          <h1 className="text-4xl md:text-5xl font-serif mb-8 text-center">{pageContent.title}</h1>
          <div className="prose prose-lg max-w-none">
            <PortableText value={pageContent.body} components={components} />
          </div>
        </>
      ) : (
        fallbackContent
      )}
    </div>
  );
}
