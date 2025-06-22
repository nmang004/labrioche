import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/components/providers/auth-provider";
import { PromotionsProvider } from "@/components/providers/promotions-provider";
import { StructuredData } from "@/components/seo/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://labriochenorfolk.com'),
  title: {
    default: "La Brioche - Artisan French Bakery in Norfolk, VA",
    template: "%s | La Brioche",
  },
  description: "Experience authentic French pastries and breads at La Brioche, Norfolk's premier artisan bakery. Fresh daily from our ovens to your table.",
  keywords: [
    "French bakery", "Norfolk VA", "artisan bread", "pastries", "croissants", 
    "La Brioche", "fresh bread", "Virginia Beach", "Hampton Roads", "bakery near me",
    "French cuisine", "artisan pastries", "daily fresh", "local bakery"
  ],
  authors: [{ name: "La Brioche" }],
  creator: "La Brioche",
  publisher: "La Brioche",
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
  openGraph: {
    title: "La Brioche - Artisan French Bakery",
    description: "Experience authentic French pastries and breads at Norfolk's premier artisan bakery.",
    url: "https://labriochenorfolk.com",
    siteName: "La Brioche",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "La Brioche - Artisan French Bakery in Norfolk, VA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Brioche - Artisan French Bakery",
    description: "Experience authentic French pastries and breads at Norfolk's premier artisan bakery.",
    images: ["/images/twitter-image.jpg"],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <StructuredData type="organization" />
          <StructuredData type="bakery" />
          <div className="relative flex min-h-screen flex-col">
            <PromotionsProvider />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
