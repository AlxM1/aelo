"use client";

import { useState, useEffect } from "react";

interface SiteSettings {
  siteName: string;
  siteTagline: string;
  logoUrl: string | null;
  colorBackground: string;
  colorForeground: string;
  colorCream: string;
  colorBeige: string;
  colorAccent: string;
  colorPrimary: string;
  colorSecondary: string;
  fontPrimary: string;
  fontSecondary: string;
  contactEmail: string;
  contactPhone: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string;
  province: string;
  country: string;
  postalCode: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  tiktokUrl: string | null;
  twitterUrl: string | null;
  promoCode: string | null;
  promoDiscount: string | null;
  promoEnabled: boolean;
  heroTitle: string;
  heroSubtitle: string | null;
  founderName: string;
  founderTitle: string;
  companyName: string;
  foundedYear: string;
}

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/site-settings");
      const data = await res.json();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to save settings");
      }
    } catch {
      setMessage("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof SiteSettings, value: string | boolean | null) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Failed to load settings. Make sure database is connected.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-slate-900">Site Settings</h1>
          <p className="text-slate-500 mt-1">Configure your website appearance and content</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* Branding */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-6">Branding</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tagline</label>
              <input
                type="text"
                value={settings.siteTagline}
                onChange={(e) => handleChange("siteTagline", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Logo URL</label>
              <input
                type="text"
                value={settings.logoUrl || ""}
                onChange={(e) => handleChange("logoUrl", e.target.value || null)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="/logo.svg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Hero Title</label>
              <input
                type="text"
                value={settings.heroTitle}
                onChange={(e) => handleChange("heroTitle", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-6">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { field: "colorBackground", label: "Background" },
              { field: "colorForeground", label: "Foreground" },
              { field: "colorCream", label: "Cream" },
              { field: "colorBeige", label: "Beige" },
              { field: "colorAccent", label: "Accent" },
              { field: "colorPrimary", label: "Primary" },
              { field: "colorSecondary", label: "Secondary" },
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings[field as keyof SiteSettings] as string}
                    onChange={(e) => handleChange(field as keyof SiteSettings, e.target.value)}
                    className="w-10 h-10 rounded border border-slate-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings[field as keyof SiteSettings] as string}
                    onChange={(e) => handleChange(field as keyof SiteSettings, e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-6">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Primary Font</label>
              <input
                type="text"
                value={settings.fontPrimary}
                onChange={(e) => handleChange("fontPrimary", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Secondary Font</label>
              <input
                type="text"
                value={settings.fontSecondary}
                onChange={(e) => handleChange("fontSecondary", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input
                type="tel"
                value={settings.contactPhone || ""}
                onChange={(e) => handleChange("contactPhone", e.target.value || null)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Address Line 1</label>
              <input
                type="text"
                value={settings.addressLine1 || ""}
                onChange={(e) => handleChange("addressLine1", e.target.value || null)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Address Line 2</label>
              <input
                type="text"
                value={settings.addressLine2 || ""}
                onChange={(e) => handleChange("addressLine2", e.target.value || null)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
              <input
                type="text"
                value={settings.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Province/State</label>
              <input
                type="text"
                value={settings.province}
                onChange={(e) => handleChange("province", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-6">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Instagram URL</label>
              <input
                type="url"
                value={settings.instagramUrl || ""}
                onChange={(e) => handleChange("instagramUrl", e.target.value || null)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Facebook URL</label>
              <input
                type="url"
                value={settings.facebookUrl || ""}
                onChange={(e) => handleChange("facebookUrl", e.target.value || null)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">TikTok URL</label>
              <input
                type="url"
                value={settings.tiktokUrl || ""}
                onChange={(e) => handleChange("tiktokUrl", e.target.value || null)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="https://tiktok.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Twitter/X URL</label>
              <input
                type="url"
                value={settings.twitterUrl || ""}
                onChange={(e) => handleChange("twitterUrl", e.target.value || null)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="https://x.com/..."
              />
            </div>
          </div>
        </section>

        {/* Promo */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-6">Promotional Banner</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Promo Code</label>
              <input
                type="text"
                value={settings.promoCode || ""}
                onChange={(e) => handleChange("promoCode", e.target.value || null)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="FRIENDSOFAELO"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Discount</label>
              <input
                type="text"
                value={settings.promoDiscount || ""}
                onChange={(e) => handleChange("promoDiscount", e.target.value || null)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="10%"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.promoEnabled}
                  onChange={(e) => handleChange("promoEnabled", e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span className="text-sm font-medium text-slate-700">Show promo banner</span>
              </label>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-6">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Founder Name</label>
              <input
                type="text"
                value={settings.founderName}
                onChange={(e) => handleChange("founderName", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Founder Title</label>
              <input
                type="text"
                value={settings.founderTitle}
                onChange={(e) => handleChange("founderTitle", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Founded Year</label>
              <input
                type="text"
                value={settings.foundedYear}
                onChange={(e) => handleChange("foundedYear", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
