"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formType, setFormType] = useState<"general" | "stock" | "press">("general");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission (in production, this would send to your backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
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
              <a href="/contact" className="opacity-100 border-b-2 border-accent pb-1">Contact Us</a>
            </div>
            {/* Mobile Menu Button */}
            <button className="md:hidden text-2xl" onClick={() => document.getElementById('mobile-menu-contact')?.classList.toggle('hidden')}>
              ☰
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div id="mobile-menu-contact" className="hidden md:hidden bg-background/95 backdrop-blur-md border-t border-black/5">
          <div className="px-6 py-4 space-y-3">
            <a href="/products" className="block text-sm font-medium hover:opacity-60 transition-opacity">Products</a>
            <a href="/#story" className="block text-sm font-medium hover:opacity-60 transition-opacity">Our Story</a>
            <a href="/#mission" className="block text-sm font-medium hover:opacity-60 transition-opacity">Our Mission</a>
            <a href="/#find-aelo" className="block text-sm font-medium hover:opacity-60 transition-opacity">Find aēlo Near You</a>
            <a href="/#about" className="block text-sm font-medium hover:opacity-60 transition-opacity">About</a>
            <a href="/#sustainability" className="block text-sm font-medium hover:opacity-60 transition-opacity">Sustainability</a>
            <a href="/contact" className="block text-sm font-medium opacity-100 border-b border-accent pb-2">Contact Us</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-background to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed mb-8">
            Have a question or want to learn more about aēlo? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="relative overflow-hidden rounded-2xl group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-teal-200 group-hover:from-cyan-200 group-hover:to-teal-300 transition-all duration-300"></div>
              <div className="relative z-10 p-8 text-center">
                <div className="text-5xl mb-4">📧</div>
                <h3 className="text-xl font-medium mb-3 text-gray-900">Email Us</h3>
                <a href="mailto:hello@drinkaelo.com" className="text-gray-700 hover:text-gray-900 underline">
                  hello@drinkaelo.com
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="relative overflow-hidden rounded-2xl group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-200 group-hover:from-pink-200 group-hover:to-rose-300 transition-all duration-300"></div>
              <div className="relative z-10 p-8 text-center">
                <div className="text-5xl mb-4">🌐</div>
                <h3 className="text-xl font-medium mb-3 text-gray-900">Follow Us</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <a href="https://www.instagram.com/drinkaelo/" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-900 underline">Instagram</a>
                  <a href="https://www.facebook.com/drinkaelo" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-900 underline">Facebook</a>
                  <a href="https://www.tiktok.com/@drinkaelo" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-900 underline">TikTok</a>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="relative overflow-hidden rounded-2xl group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-200 group-hover:from-amber-200 group-hover:to-orange-300 transition-all duration-300"></div>
              <div className="relative z-10 p-8 text-center">
                <div className="text-5xl mb-4">❓</div>
                <h3 className="text-xl font-medium mb-3 text-gray-900">Have Questions?</h3>
                <p className="text-sm text-gray-700 mb-3">Check out our FAQ for quick answers</p>
                <a href="/faq" className="text-gray-700 hover:text-gray-900 underline">
                  Visit FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-background to-emerald-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-8 text-center">
              Send Us a Message
            </h2>

            {/* Form Type Selector */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              <button
                onClick={() => setFormType("general")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  formType === "general"
                    ? "bg-gradient-to-r from-slate-900 to-slate-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                General Inquiry
              </button>
              <button
                onClick={() => setFormType("stock")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  formType === "stock"
                    ? "bg-gradient-to-r from-slate-900 to-slate-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Stock aēlo
              </button>
              <button
                onClick={() => setFormType("press")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  formType === "press"
                    ? "bg-gradient-to-r from-slate-900 to-slate-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Press Inquiry
              </button>
            </div>

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800 text-center">
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
                  placeholder={
                    formType === "general"
                      ? "How can we help you?"
                      : formType === "stock"
                      ? "Tell us about your business and how you'd like to stock aēlo..."
                      : "Tell us about your publication and your inquiry..."
                  }
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-4 rounded-lg font-medium hover:from-slate-800 hover:to-slate-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
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
