import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with aēlo Non-Alcoholic Cocktails",
  description: "Contact aēlo for general inquiries, wholesale/stocking requests, press inquiries, or partnership opportunities. Located in Vancouver, BC. Email: hello@drinkaelo.com. We'd love to hear from you!",
  keywords: [
    'contact aelo',
    'non-alcoholic cocktails vancouver',
    'wholesale mocktails',
    'stock aelo products',
    'press inquiries',
    'partnership opportunities',
    'aelo customer service',
    'vancouver beverage company'
  ],
  openGraph: {
    title: 'Contact Us | aēlo Non-Alcoholic Cocktails',
    description: 'Get in touch with aēlo for inquiries, wholesale opportunities, or press requests. Based in Vancouver, BC.',
    url: 'https://drinkaelo.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | aēlo',
    description: 'Get in touch with aēlo for inquiries, wholesale opportunities, or press requests.',
  },
  alternates: {
    canonical: 'https://drinkaelo.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
