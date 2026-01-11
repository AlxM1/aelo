import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Non-Alcoholic Cocktails | Shop aēlo Collection",
  description: "Shop aēlo's complete collection of premium non-alcoholic cocktails. Award-winning zero-proof drinks including Gin & Tonic, Aperitivo Spritz, Peach Bellini, Lime Margarita & Limoncello Spritz. $24.99 CAD per 4-pack. Zero alcohol, zero sugar, zero calories. Free shipping available.",
  keywords: [
    'buy non-alcoholic cocktails',
    'shop mocktails online',
    'alcohol-free drinks canada',
    'zero-proof cocktails',
    'non-alcoholic gin and tonic',
    'aperitivo spritz alcohol-free',
    'non-alcoholic bellini',
    'mocktail variety pack',
    'best non-alcoholic drinks',
    'premium zero-proof beverages'
  ],
  openGraph: {
    title: 'Premium Non-Alcoholic Cocktails | Shop aēlo Collection',
    description: 'Shop our award-winning collection of zero-proof cocktails. 5 delicious flavors, all zero alcohol, zero sugar, zero calories. $24.99 CAD per 4-pack.',
    url: 'https://drinkaelo.com/products',
    type: 'website',
    images: [
      {
        url: '/gin-tonic.webp',
        width: 1200,
        height: 630,
        alt: 'aēlo Non-Alcoholic Cocktails Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Non-Alcoholic Cocktails | Shop aēlo Collection',
    description: 'Shop our award-winning collection of zero-proof cocktails. 5 delicious flavors. Zero alcohol, zero sugar, zero calories.',
    images: ['/gin-tonic.webp'],
  },
  alternates: {
    canonical: 'https://drinkaelo.com/products',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
