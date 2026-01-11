import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ShoppingCart from "@/components/ShoppingCart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://drinkaelo.com'),
  title: {
    default: "aēlo - Premium Non-Alcoholic Cocktails | Zero Moments Wasted",
    template: "%s | aēlo"
  },
  description: "Discover aēlo's handcrafted premium non-alcoholic cocktails. Zero alcohol, zero sugar, zero calories. Proudly Canadian. Keto-friendly, vegan, gluten-free. Shop our award-winning collection of zero-proof drinks including Gin & Tonic, Aperitivo Spritz, Peach Bellini, Lime Margarita & Limoncello Spritz.",
  keywords: [
    'non-alcoholic cocktails',
    'zero-proof drinks',
    'alcohol-free cocktails',
    'mocktails',
    'sober curious',
    'non-alcoholic gin and tonic',
    'alcohol-free aperitivo',
    'non-alcoholic spritz',
    'zero-calorie cocktails',
    'sugar-free cocktails',
    'keto cocktails',
    'vegan cocktails',
    'gluten-free cocktails',
    'Canadian non-alcoholic drinks',
    'Vancouver cocktails',
    'premium mocktails',
    'ready-to-drink mocktails',
    'best non-alcoholic cocktails',
    'alcohol-free beverages',
    'sober living drinks',
    'mindful drinking',
    'aelo cocktails',
    'drinkaelo'
  ],
  authors: [{ name: 'Liquid Intelligence Ltd.' }],
  creator: 'aēlo',
  publisher: 'Liquid Intelligence Ltd.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://drinkaelo.com',
    siteName: 'aēlo',
    title: 'aēlo - Premium Non-Alcoholic Cocktails | Zero Moments Wasted',
    description: 'Handcrafted premium non-alcoholic cocktails. Zero alcohol, zero sugar, zero calories. Shop our award-winning collection of zero-proof drinks. Proudly Canadian. Keto-friendly, vegan, gluten-free.',
    images: [
      {
        url: '/aperitivo-spritz.webp',
        width: 1200,
        height: 630,
        alt: 'aēlo Premium Non-Alcoholic Cocktails',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'aēlo - Premium Non-Alcoholic Cocktails | Zero Moments Wasted',
    description: 'Handcrafted premium non-alcoholic cocktails. Zero alcohol, zero sugar, zero calories. Shop our award-winning collection.',
    images: ['/aperitivo-spritz.webp'],
    creator: '@drinkaelo',
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
  alternates: {
    canonical: 'https://drinkaelo.com',
  },
  category: 'food and drink',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'aēlo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://drinkaelo.com/#organization",
    "name": "aēlo",
    "legalName": "Liquid Intelligence Ltd.",
    "url": "https://drinkaelo.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://drinkaelo.com/aperitivo-spritz.webp"
    },
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Christos Kalaitzis"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "hello@drinkaelo.com"
    },
    "sameAs": [
      "https://www.instagram.com/drinkaelo/",
      "https://www.facebook.com/drinkaelo",
      "https://www.tiktok.com/@drinkaelo"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Vancouver",
      "addressRegion": "BC",
      "addressCountry": "CA"
    },
    "description": "Premium handcrafted non-alcoholic cocktails. Zero alcohol, zero sugar, zero calories. Proudly Canadian.",
    "slogan": "Zero Moments Wasted"
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://drinkaelo.com/#localbusiness",
    "name": "aēlo",
    "image": "https://drinkaelo.com/aperitivo-spritz.webp",
    "url": "https://drinkaelo.com",
    "telephone": "",
    "email": "hello@drinkaelo.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Vancouver",
      "addressRegion": "BC",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.2827",
      "longitude": "-123.1207"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "priceRange": "$$"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ShoppingCart />
      </body>
    </html>
  );
}
