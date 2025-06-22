import Script from 'next/script';

interface ProductData {
  name: string;
  description: string;
  image: string;
  price: number;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type?: 'organization' | 'bakery' | 'product' | 'breadcrumb';
  data?: ProductData | BreadcrumbItem[] | unknown;
}

export function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Bakery',
          name: 'La Brioche',
          description:
            'Artisan French bakery specializing in authentic pastries, breads, and French cuisine in Norfolk, Virginia',
          url: 'https://labriochenorfolk.com',
          telephone: '+1-757-226-9745',
          email: 'yvanbakery@gmail.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '1415 Colley Avenue',
            addressLocality: 'Norfolk',
            addressRegion: 'VA',
            postalCode: '23517',
            addressCountry: 'US',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '36.8508',
            longitude: '-76.2859',
          },
          openingHours: [
            'We 08:00-14:00',
            'Th 08:00-14:00',
            'Fr 08:00-17:00',
            'Sa 08:00-14:00',
            'Su 08:30-12:30',
          ],
          servesCuisine: 'French',
          priceRange: '$$',
          currenciesAccepted: 'USD',
          paymentAccepted: 'Cash, Credit Card',
          sameAs: [
            'https://www.facebook.com/labriochenorfolk',
            'https://www.instagram.com/labriochenorfolk',
          ],
          logo: 'https://labriochenorfolk.com/images/logo.png',
          image: 'https://labriochenorfolk.com/images/storefront.jpg',
        };

      case 'bakery':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': 'https://labriochenorfolk.com',
          name: 'La Brioche',
          alternateName: 'La Brioche Norfolk',
          description:
            'Premier French artisan bakery in Norfolk, VA, offering fresh daily pastries, breads, and authentic French cuisine',
          url: 'https://labriochenorfolk.com',
          telephone: '+1-757-226-9745',
          email: 'yvanbakery@gmail.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '1415 Colley Avenue',
            addressLocality: 'Norfolk',
            addressRegion: 'Virginia',
            postalCode: '23517',
            addressCountry: 'United States',
          },
          hasMap: 'https://maps.google.com/?q=La+Brioche+Norfolk+VA',
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Wednesday',
              opens: '08:00',
              closes: '14:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Thursday',
              opens: '08:00',
              closes: '14:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Friday',
              opens: '08:00',
              closes: '17:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Saturday',
              opens: '08:00',
              closes: '14:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Sunday',
              opens: '08:30',
              closes: '12:30',
            },
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '127',
          },
        };

      case 'product':
        const productData = data as ProductData;
        return productData
          ? {
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: productData.name,
              description: productData.description,
              image: productData.image,
              brand: {
                '@type': 'Brand',
                name: 'La Brioche',
              },
              offers: {
                '@type': 'Offer',
                price: productData.price,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'Organization',
                  name: 'La Brioche',
                },
              },
            }
          : null;

      case 'breadcrumb':
        return data
          ? {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: (data as BreadcrumbItem[]).map((item, index: number) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.url,
              })),
            }
          : null;

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
