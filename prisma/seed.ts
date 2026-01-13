import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Create default admin user
  const passwordHash = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@drinkaelo.com" },
    update: {},
    create: {
      email: "admin@drinkaelo.com",
      name: "Admin",
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });
  console.log("Created admin user:", admin.email);

  // Create default site settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "aelo",
      siteTagline: "Zero Moments Wasted",
      contactEmail: "hello@drinkaelo.com",
      city: "Vancouver",
      province: "BC",
      country: "Canada",
      instagramUrl: "https://www.instagram.com/drinkaelo/",
      facebookUrl: "https://www.facebook.com/drinkaelo",
      tiktokUrl: "https://www.tiktok.com/@drinkaelo",
      promoCode: "FRIENDSOFAELO",
      promoDiscount: "10%",
      promoEnabled: true,
      heroTitle: "Zero Moments Wasted",
      founderName: "Christos Kalaitzis",
      founderTitle: "Founder",
      companyName: "Liquid Intelligence Ltd.",
      foundedYear: "2020",
    },
  });
  console.log("Created site settings");

  // Migrate existing products
  const products = [
    {
      slug: "gin-tonic",
      name: "Gin & Tonic",
      tagline: "Award-Winning Spanish Style",
      description:
        "Handcrafted aromatic bitters made with real spices and notes of fresh cucumber, blood orange, lime, and fresh mint leaves.",
      price: 24.99,
      image: "/gin-tonic.webp",
      icon: "🌿",
      gradient: "from-cyan-100 via-teal-100 to-emerald-100",
      accentGradient: "from-cyan-500 to-teal-600",
      ingredients:
        "Filtered water, alcohol-free gin, tonic, citric acid, organic stevia",
      flavorProfile: [
        { name: "Fresh Cucumber", color: "bg-green-100 text-green-700 border-green-200" },
        { name: "Blood Orange", color: "bg-orange-100 text-orange-700 border-orange-200" },
        { name: "Lime", color: "bg-lime-100 text-lime-700 border-lime-200" },
        { name: "Mint Leaves", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
      ],
      productNumber: "001",
      sortOrder: 1,
    },
    {
      slug: "aperitivo-spritz",
      name: "Aperitivo Spritz",
      tagline: "European-Inspired Refreshment",
      description:
        "Notes of fresh Seville oranges, grapefruit, rhubarb, and handcrafted aromatic bitters made with real spices and sparkling prosecco.",
      price: 24.99,
      image: "/aperitivo-spritz.webp",
      icon: "🍊",
      gradient: "from-orange-100 via-red-100 to-pink-100",
      accentGradient: "from-orange-500 to-red-600",
      ingredients:
        "Filtered water, alcohol-free aperitivo, sparkling prosecco, citric acid, organic stevia",
      flavorProfile: [
        { name: "Seville Orange", color: "bg-orange-100 text-orange-700 border-orange-200" },
        { name: "Grapefruit", color: "bg-pink-100 text-pink-700 border-pink-200" },
        { name: "Rhubarb", color: "bg-red-100 text-red-700 border-red-200" },
        { name: "Bitters", color: "bg-amber-100 text-amber-700 border-amber-200" },
      ],
      productNumber: "002",
      sortOrder: 2,
    },
    {
      slug: "peach-bellini",
      name: "Peach Bellini",
      tagline: "Sparkling Peach Elegance",
      description:
        "Smooth notes of fresh peaches combined with handcrafted aromatic bitters, real spices, herbs and sparkling Prosecco.",
      price: 24.99,
      image: "/peach-bellini.webp",
      icon: "🍑",
      gradient: "from-rose-100 via-pink-100 to-orange-100",
      accentGradient: "from-rose-500 to-pink-600",
      ingredients:
        "Filtered water, peach puree, alcohol-free prosecco, citric acid, organic stevia",
      flavorProfile: [
        { name: "Fresh Peach", color: "bg-orange-100 text-orange-700 border-orange-200" },
        { name: "Prosecco", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
        { name: "Herbs", color: "bg-green-100 text-green-700 border-green-200" },
      ],
      productNumber: "003",
      sortOrder: 3,
    },
    {
      slug: "lime-margarita",
      name: "Lime Margarita",
      tagline: "The Party Pleaser",
      description:
        "Tequila-extract based blend combining bitter orange, lime juice, and a pinch of salt. Perfect for any celebration.",
      price: 24.99,
      image: "/lime-margarita.webp",
      icon: "🍋",
      gradient: "from-lime-100 via-green-100 to-yellow-100",
      accentGradient: "from-lime-500 to-green-600",
      ingredients:
        "Filtered water, alcohol-free tequila extract, lime juice, agave, salt, citric acid",
      flavorProfile: [
        { name: "Lime", color: "bg-lime-100 text-lime-700 border-lime-200" },
        { name: "Bitter Orange", color: "bg-orange-100 text-orange-700 border-orange-200" },
        { name: "Salt", color: "bg-slate-100 text-slate-700 border-slate-200" },
        { name: "Agave", color: "bg-amber-100 text-amber-700 border-amber-200" },
      ],
      productNumber: "004",
      sortOrder: 4,
    },
    {
      slug: "limoncello-spritz",
      name: "Limoncello Spritz",
      tagline: "Classic Summer Flavor",
      description:
        "Zero alcohol, zero sugar and zero calories featuring alcohol-free aperitivo and bright lemon essence with sparkling sophistication.",
      price: 24.99,
      image: "/limoncello-spritz.webp",
      icon: "✨",
      gradient: "from-yellow-100 via-amber-100 to-orange-100",
      accentGradient: "from-yellow-500 to-amber-600",
      ingredients:
        "Filtered water, alcohol-free limoncello, sparkling water, citric acid, organic stevia",
      flavorProfile: [
        { name: "Lemon", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
        { name: "Citrus", color: "bg-orange-100 text-orange-700 border-orange-200" },
        { name: "Sparkling", color: "bg-sky-100 text-sky-700 border-sky-200" },
      ],
      productNumber: "005",
      sortOrder: 5,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`Created ${products.length} products`);

  // Create FAQs
  const faqs = [
    {
      question: "Are there any carbohydrates in any of your products?",
      answer: "No.",
      category: "ingredients",
      sortOrder: 1,
    },
    {
      question: "What's the alcohol content in your drinks?",
      answer: "All aēlo drinks contain 0.0% alcohol.",
      category: "ingredients",
      sortOrder: 2,
    },
    {
      question: "Are your products vegan?",
      answer: "Yes, all aēlo products are 100% vegan.",
      category: "dietary",
      sortOrder: 1,
    },
    {
      question: "Are your products gluten-free?",
      answer: "Yes, all aēlo products are gluten-free.",
      category: "dietary",
      sortOrder: 2,
    },
    {
      question: "Are your products keto-friendly?",
      answer:
        "Yes! With zero sugar and zero calories, all aēlo products are perfect for a keto lifestyle.",
      category: "dietary",
      sortOrder: 3,
    },
    {
      question: "Where can I buy aēlo products?",
      answer:
        "You can purchase directly from our website. We ship across Canada and the United States.",
      category: "products",
      sortOrder: 1,
    },
    {
      question: "How should I store aēlo drinks?",
      answer:
        "Store in a cool, dry place. Refrigerate after opening and consume within 3 days.",
      category: "products",
      sortOrder: 2,
    },
    {
      question: "Do you offer wholesale pricing?",
      answer:
        "Yes! Contact us at partnerships@drinkaelo.com for wholesale inquiries.",
      category: "partnerships",
      sortOrder: 1,
    },
    {
      question: "Can I stock aēlo in my restaurant or bar?",
      answer:
        "Absolutely! We'd love to partner with you. Reach out to partnerships@drinkaelo.com.",
      category: "partnerships",
      sortOrder: 2,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq,
    });
  }
  console.log(`Created ${faqs.length} FAQs`);

  // Create default navigation
  const navItems = [
    { label: "Products", href: "/products", sortOrder: 1 },
    { label: "Our Story", href: "/#story", sortOrder: 2 },
    { label: "Our Mission", href: "/#mission", sortOrder: 3 },
    { label: "Find aelo", href: "/#find-aelo", sortOrder: 4 },
    { label: "About", href: "/#about", sortOrder: 5 },
    { label: "Sustainability", href: "/#sustainability", sortOrder: 6 },
    { label: "Contact", href: "/contact", sortOrder: 7 },
  ];

  for (const item of navItems) {
    await prisma.navItem.create({
      data: item,
    });
  }
  console.log(`Created ${navItems.length} navigation items`);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
