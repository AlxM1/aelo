import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions About aēlo Non-Alcoholic Cocktails",
  description: "Get answers to common questions about aēlo premium non-alcoholic cocktails. Learn about ingredients, nutrition facts, dietary requirements, where to buy, and more. Zero alcohol, zero sugar, zero calories. Vegan, keto-friendly, gluten-free.",
  keywords: [
    'non-alcoholic cocktails FAQ',
    'mocktails questions',
    'alcohol-free drinks nutrition',
    'zero-proof ingredients',
    'vegan cocktails',
    'keto friendly drinks',
    'gluten-free mocktails',
    'sugar-free cocktails',
    'calorie-free drinks'
  ],
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | aēlo',
    description: 'Get answers to common questions about aēlo premium non-alcoholic cocktails. Ingredients, nutrition, dietary requirements, and more.',
    url: 'https://drinkaelo.com/faq',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'FAQ - Frequently Asked Questions | aēlo',
    description: 'Get answers to common questions about aēlo premium non-alcoholic cocktails.',
  },
  alternates: {
    canonical: 'https://drinkaelo.com/faq',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
