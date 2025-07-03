import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mother's Day Special | La Brioche French Bakery",
  description:
    "Celebrate Mother's Day with our special collection of French cakes and chocolates. Order raspberry cake, chocolate cake, or artisan chocolate boxes for pickup in Norfolk, VA.",
  keywords:
    "Mother's Day, French bakery, Norfolk VA, raspberry cake, chocolate cake, gift boxes, La Brioche, artisan chocolates, Mother's Day gifts",
  openGraph: {
    title: "Mother's Day Collection at La Brioche",
    description:
      "Make Mom's day special with handcrafted French delights. Order by May 9th for Mother's Day weekend pickup.",
    images: [
      {
        url: '/photos/Mothersday1.jpg',
        width: 1200,
        height: 630,
        alt: "La Brioche Mother's Day Collection",
      },
    ],
    locale: 'en_US',
    type: 'website',
    siteName: 'La Brioche French Bakery',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mother's Day at La Brioche",
    description:
      'Order special French cakes and chocolates for Mom. Pickup available in Norfolk, VA.',
    images: ['/photos/Mothersday1.jpg'],
  },
  alternates: {
    canonical: 'https://labrioche.com/mothers-day',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function MothersDayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
