"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const faqs: FAQItem[] = [
    // Ingredients & Nutrition
    {
      question: "Are there any carbohydrates in any of your products?",
      answer: "No.",
      category: "ingredients",
    },
    {
      question: "How many calories does aēlo have?",
      answer: "aēlo Alcohol Free has 0 calories!",
      category: "ingredients",
    },
    {
      question: "Is it Sugar free?",
      answer: "Yes!",
      category: "ingredients",
    },
    {
      question: "Do you use artificial flavours?",
      answer: "No, there are no artificial flavours in any aēlo product.",
      category: "ingredients",
    },
    {
      question: "Why real ingredients and all-natural flavours?",
      answer: "Our handcrafted Bitters and Tinctures are made with real spices and herbs, we also use some all-natural flavours, 100% plant-based flavours extracted from real fruits.",
      category: "ingredients",
    },
    {
      question: "Where does the colour come from?",
      answer: "We use 100% real ingredients, so all the colours are from the infused spices and herbs.",
      category: "ingredients",
    },
    {
      question: "Do you use preservatives?",
      answer: "No.",
      category: "ingredients",
    },
    {
      question: "What is Stevia and why are you using it?",
      answer: "Stevia, also called Stevia Rebaudiana, is a plant that is a member of the chrysanthemum family. Stevia is a non-nutritive natural sweetener with no calories.",
      category: "ingredients",
    },

    // Dietary Requirements
    {
      question: "Is aēlo Keto friendly?",
      answer: "Yes!",
      category: "dietary",
    },
    {
      question: "Is aēlo vegan?",
      answer: "aēlo is 100% vegan. aēlo is alcohol-free, not dealcoholized...we also use no animal products and no animal by-products in our beverages.",
      category: "dietary",
    },
    {
      question: "Is aēlo gluten free?",
      answer: "Yes! aēlo is made with 100% naturally gluten-free ingredients.",
      category: "dietary",
    },

    // Products & Purchasing
    {
      question: "Where can I buy aēlo?",
      answer: "Check out our Store Locator to find aēlo near you. Looking for delivery or curbside pickup? Checkout our online store.",
      category: "products",
    },
    {
      question: "Can I buy the bitters you are using for your cocktails?",
      answer: "Join the aēlo community at the bottom of this page and you'll be the first to be alerted when new products are available.",
      category: "products",
    },

    // Partnerships
    {
      question: "I am aēlo's biggest fan. Can I partner with the brand?",
      answer: "We'd love to hear from you! Please contact us directly through our Contact page and we're open to partnership ideas.",
      category: "partnerships",
    },
    {
      question: "Is aēlo sponsoring events or sports team?",
      answer: "Contact us directly through our Contact page for sponsorship inquiries.",
      category: "partnerships",
    },
  ];

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "ingredients", name: "Ingredients & Nutrition" },
    { id: "dietary", name: "Dietary Requirements" },
    { id: "products", name: "Products & Purchasing" },
    { id: "partnerships", name: "Partnerships" },
  ];

  const filteredFAQs = activeCategory === "all"
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Create FAQ schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="text-2xl font-light tracking-wider hover:opacity-60 transition-opacity">
              a<span className="text-sm align-top">ē</span>lo
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="/products" className="hover:opacity-60 transition-opacity">Products</a>
              <a href="/#story" className="hover:opacity-60 transition-opacity">Our Story</a>
              <a href="/#mission" className="hover:opacity-60 transition-opacity">Our Mission</a>
              <a href="/#find-aelo" className="hover:opacity-60 transition-opacity">Find aēlo Near You</a>
              <a href="/#about" className="hover:opacity-60 transition-opacity">About</a>
              <a href="/#sustainability" className="hover:opacity-60 transition-opacity">Sustainability</a>
              <a href="/contact" className="hover:opacity-60 transition-opacity">Contact Us</a>
            </div>
            {/* Mobile Menu Button */}
            <button className="md:hidden text-2xl" onClick={() => document.getElementById('mobile-menu-faq')?.classList.toggle('hidden')}>
              ☰
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div id="mobile-menu-faq" className="hidden md:hidden bg-background/95 backdrop-blur-md border-t border-black/5">
          <div className="px-6 py-4 space-y-3">
            <a href="/products" className="block text-sm font-medium hover:opacity-60 transition-opacity">Products</a>
            <a href="/#story" className="block text-sm font-medium hover:opacity-60 transition-opacity">Our Story</a>
            <a href="/#mission" className="block text-sm font-medium hover:opacity-60 transition-opacity">Our Mission</a>
            <a href="/#find-aelo" className="block text-sm font-medium hover:opacity-60 transition-opacity">Find aēlo Near You</a>
            <a href="/#about" className="block text-sm font-medium hover:opacity-60 transition-opacity">About</a>
            <a href="/#sustainability" className="block text-sm font-medium hover:opacity-60 transition-opacity">Sustainability</a>
            <a href="/contact" className="block text-sm font-medium hover:opacity-60 transition-opacity">Contact Us</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-background to-teal-50">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed mb-8">
            Everything you need to know about aēlo premium non-alcoholic cocktails
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 lg:px-8 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveIndex(null);
                }}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-slate-900 to-slate-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <span className={`text-2xl flex-shrink-0 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}>
                    ▼
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="px-6 sm:px-8 pb-5 sm:pb-6 pt-2">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-background to-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
            Still Have Questions?
          </h2>
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
            Can't find what you're looking for? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white text-sm font-medium tracking-wide hover:from-slate-800 hover:to-slate-600 transition-all shadow-lg hover:shadow-xl"
            >
              Contact Us
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 border border-accent text-accent text-sm font-medium tracking-wide hover:bg-accent hover:text-white transition-colors"
            >
              View Products
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="text-3xl font-light tracking-wider mb-4">
                a<span className="text-lg align-top">ē</span>lo
              </div>
              <p className="text-sm text-foreground/60 max-w-md leading-relaxed">
                Premium non-alcoholic cocktails handcrafted in Canada. Zero alcohol, zero sugar, zero calories.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4 tracking-wider">Quick Links</h4>
              <div className="space-y-2 text-sm text-foreground/60">
                <a href="/products" className="block hover:text-foreground transition-colors">Products</a>
                <a href="/#story" className="block hover:text-foreground transition-colors">Our Story</a>
                <a href="/#mission" className="block hover:text-foreground transition-colors">Our Mission</a>
                <a href="/#find-aelo" className="block hover:text-foreground transition-colors">Find aēlo</a>
                <a href="/#about" className="block hover:text-foreground transition-colors">About</a>
                <a href="/#sustainability" className="block hover:text-foreground transition-colors">Sustainability</a>
                <a href="/contact" className="block hover:text-foreground transition-colors">Contact Us</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4 tracking-wider">Connect</h4>
              <div className="space-y-2 text-sm text-foreground/60">
                <a href="https://www.instagram.com/drinkaelo/" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">Instagram</a>
                <a href="https://www.facebook.com/drinkaelo" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">Facebook</a>
                <a href="https://www.tiktok.com/@drinkaelo" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">TikTok</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-black/5 text-center text-sm text-foreground/40">
            <p>© {new Date().getFullYear()} Liquid Intelligence Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
