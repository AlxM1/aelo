import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";

// Cached product fetching for frontend
export const getProducts = unstable_cache(
  async () => {
    try {
      return await prisma.product.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      });
    } catch {
      return [];
    }
  },
  ["products"],
  { revalidate: 60, tags: ["products"] }
);

// Get single product by slug
export const getProductBySlug = unstable_cache(
  async (slug: string) => {
    try {
      return await prisma.product.findUnique({
        where: { slug, isActive: true },
      });
    } catch {
      return null;
    }
  },
  ["product"],
  { revalidate: 60, tags: ["products"] }
);

// Cached site settings for theming
export const getSiteSettings = unstable_cache(
  async () => {
    try {
      let settings = await prisma.siteSettings.findFirst({
        where: { id: "default" },
      });

      if (!settings) {
        settings = await prisma.siteSettings.create({
          data: { id: "default" },
        });
      }

      return settings;
    } catch {
      // Return defaults if database not connected
      return {
        id: "default",
        siteName: "aelo",
        siteTagline: "Zero Moments Wasted",
        logoUrl: null,
        faviconUrl: null,
        colorBackground: "#fafaf8",
        colorForeground: "#1a1a1a",
        colorCream: "#e8e6dc",
        colorBeige: "#d9d6cc",
        colorAccent: "#000000",
        colorPrimary: "#1a1a1a",
        colorSecondary: "#4a4a4a",
        fontPrimary: "Geist",
        fontSecondary: "Geist Mono",
        contactEmail: "hello@drinkaelo.com",
        contactPhone: null,
        addressLine1: null,
        addressLine2: null,
        city: "Vancouver",
        province: "BC",
        country: "Canada",
        postalCode: null,
        instagramUrl: "https://www.instagram.com/drinkaelo/",
        facebookUrl: "https://www.facebook.com/drinkaelo",
        tiktokUrl: "https://www.tiktok.com/@drinkaelo",
        twitterUrl: null,
        linkedinUrl: null,
        defaultMetaTitle: null,
        defaultMetaDesc: null,
        ogImageUrl: null,
        promoCode: "FRIENDSOFAELO",
        promoDiscount: "10%",
        promoEnabled: true,
        heroTitle: "Zero Moments Wasted",
        heroSubtitle: null,
        heroVideoUrl: null,
        aboutTitle: null,
        aboutContent: null,
        founderName: "Christos Kalaitzis",
        founderTitle: "Founder",
        companyName: "Liquid Intelligence Ltd.",
        foundedYear: "2020",
        updatedAt: new Date(),
      };
    }
  },
  ["site-settings"],
  { revalidate: 60, tags: ["site-settings"] }
);

// Cached FAQs
export const getFAQs = unstable_cache(
  async () => {
    try {
      return await prisma.fAQ.findMany({
        where: { isPublished: true },
        orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      });
    } catch {
      return [];
    }
  },
  ["faqs"],
  { revalidate: 60, tags: ["faqs"] }
);

// Cached navigation
export const getNavigation = unstable_cache(
  async (location: string = "header") => {
    try {
      return await prisma.navItem.findMany({
        where: { location, isVisible: true, parentId: null },
        include: { children: { where: { isVisible: true } } },
        orderBy: { sortOrder: "asc" },
      });
    } catch {
      return [];
    }
  },
  ["navigation"],
  { revalidate: 60, tags: ["navigation"] }
);
