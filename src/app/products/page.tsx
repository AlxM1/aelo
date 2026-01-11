"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { products } from "@/data/products";

export default function ProductsPage() {
  const addItem = useCartStore((state) => state.addItem);

  const productsWithDetails: any[] = products.map((product, index) => {
    const detailsMap: Record<string, any> = {
      "gin-tonic": {
        number: "001",
        ingredients: "Filtered water, alcohol-free gin, tonic, citric acid, organic stevia",
        flavorProfile: [
          { name: "Fresh Cucumber", color: "bg-green-100 text-green-700 border-green-200" },
          { name: "Blood Orange", color: "bg-orange-100 text-orange-700 border-orange-200" },
          { name: "Lime", color: "bg-lime-100 text-lime-700 border-lime-200" },
          { name: "Mint Leaves", color: "bg-emerald-100 text-emerald-700 border-emerald-200" }
        ],
      },
      "aperitivo-spritz": {
        number: "002",
        ingredients: "Filtered water, alcohol-free aperitivo, natural flavors, organic stevia",
        flavorProfile: [
          { name: "Seville Orange", color: "bg-orange-100 text-orange-700 border-orange-200" },
          { name: "Grapefruit", color: "bg-pink-100 text-pink-700 border-pink-200" },
          { name: "Rhubarb", color: "bg-red-100 text-red-700 border-red-200" },
          { name: "Sparkling Prosecco", color: "bg-amber-100 text-amber-700 border-amber-200" }
        ],
      },
      "peach-bellini": {
        number: "003",
        ingredients: "Filtered water, natural peach flavors, handcrafted bitters, organic stevia",
        flavorProfile: [
          { name: "Fresh Peaches", color: "bg-orange-100 text-orange-600 border-orange-200" },
          { name: "Real Spices", color: "bg-amber-100 text-amber-700 border-amber-200" },
          { name: "Herbs", color: "bg-green-100 text-green-600 border-green-200" },
          { name: "Sparkling Prosecco", color: "bg-yellow-100 text-yellow-600 border-yellow-200" }
        ],
      },
      "lime-margarita": {
        number: "004",
        ingredients: "Filtered water, tequila extract, bitter orange, lime juice, sea salt, organic stevia",
        flavorProfile: [
          { name: "Bitter Orange", color: "bg-orange-100 text-orange-700 border-orange-200" },
          { name: "Fresh Lime", color: "bg-lime-100 text-lime-700 border-lime-200" },
          { name: "Sea Salt", color: "bg-gray-100 text-gray-600 border-gray-200" },
          { name: "Tequila Notes", color: "bg-amber-100 text-amber-600 border-amber-200" }
        ],
      },
      "limoncello-spritz": {
        number: "005",
        ingredients: "Filtered water, alcohol-free aperitivo, natural lemon flavors, organic stevia",
        flavorProfile: [
          { name: "Bright Lemon", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
          { name: "Citrus Zest", color: "bg-orange-100 text-orange-600 border-orange-200" },
          { name: "Sparkling", color: "bg-cyan-100 text-cyan-600 border-cyan-200" },
          { name: "Light & Refreshing", color: "bg-blue-100 text-blue-600 border-blue-200" }
        ],
      },
    };

    return {
      ...product,
      ...detailsMap[product.id],
    };
  });

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
              <a href="/products" className="opacity-100 border-b-2 border-accent pb-1">Products</a>
              <a href="/#story" className="hover:opacity-60 transition-opacity">Our Story</a>
              <a href="/#mission" className="hover:opacity-60 transition-opacity">Our Mission</a>
              <a href="/#find-aelo" className="hover:opacity-60 transition-opacity">Find aēlo Near You</a>
              <a href="/#about" className="hover:opacity-60 transition-opacity">About</a>
              <a href="/#sustainability" className="hover:opacity-60 transition-opacity">Sustainability</a>
            </div>
            {/* Mobile Menu Button */}
            <button className="md:hidden text-2xl" onClick={() => document.getElementById('mobile-menu-products')?.classList.toggle('hidden')}>
              ☰
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div id="mobile-menu-products" className="hidden md:hidden bg-background/95 backdrop-blur-md border-t border-black/5">
          <div className="px-6 py-4 space-y-3">
            <a href="/products" className="block text-sm font-medium opacity-100 border-b border-accent pb-2">Products</a>
            <a href="/#story" className="block text-sm font-medium hover:opacity-60 transition-opacity">Our Story</a>
            <a href="/#mission" className="block text-sm font-medium hover:opacity-60 transition-opacity">Our Mission</a>
            <a href="/#find-aelo" className="block text-sm font-medium hover:opacity-60 transition-opacity">Find aēlo Near You</a>
            <a href="/#about" className="block text-sm font-medium hover:opacity-60 transition-opacity">About</a>
            <a href="/#sustainability" className="block text-sm font-medium hover:opacity-60 transition-opacity">Sustainability</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-background to-emerald-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4 sm:mb-6 leading-tight">
            Our Collection
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 font-light max-w-3xl mx-auto leading-relaxed px-4">
            Handcrafted by an internationally award-winning mixologist using premium, locally-sourced ingredients in Vancouver, BC.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm px-4">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">✓</span>
              <span className="text-foreground/80">Zero Alcohol</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">✓</span>
              <span className="text-foreground/80">Zero Sugar</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">✓</span>
              <span className="text-foreground/80">Zero Calories</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">✓</span>
              <span className="text-foreground/80">Keto-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">✓</span>
              <span className="text-foreground/80">Vegan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">✓</span>
              <span className="text-foreground/80">Gluten-Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 lg:space-y-32">
          {productsWithDetails.map((product, index) => (
            <div
              key={product.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Product Image Side - Always first on mobile, alternates on desktop */}
              <div
                className={`relative order-1 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
              >
                <div
                  className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br ${product.gradient} p-6 sm:p-8 lg:p-12 shadow-xl sm:shadow-2xl`}
                >
                  {/* Product Icon */}
                  <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 text-4xl sm:text-5xl lg:text-6xl opacity-40">
                    {product.icon}
                  </div>

                  {/* Product Image */}
                  <div className="relative w-full h-64 sm:h-72 lg:h-80 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={140}
                      height={200}
                      className="object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Number Badge */}
                  <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8">
                    <div className={`bg-gradient-to-r ${product.accentGradient} text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold`}>
                      No. {product.number}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details Side - Always second on mobile, alternates on desktop */}
              <div className={`order-2 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-2 sm:mb-3">
                      {product.name}
                    </h2>
                    <p className={`text-base sm:text-lg font-medium bg-gradient-to-r ${product.accentGradient} bg-clip-text text-transparent`}>
                      {product.tagline}
                    </p>
                  </div>

                  <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Flavor Profile */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground/60 mb-3">
                      Flavor Profile
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.flavorProfile.map((flavor: any) => (
                        <span
                          key={flavor.name}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 ${flavor.color} border rounded-full text-xs sm:text-sm font-medium`}
                        >
                          {flavor.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground/60 mb-2">
                      Ingredients
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
                      {product.ingredients}
                    </p>
                  </div>

                  {/* Size & Certifications */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-foreground/60">
                      <div>
                        <span className="font-semibold text-foreground">Size:</span> 355ml
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">Made in:</span> Vancouver, BC
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <button
                      onClick={() => addItem(product)}
                      className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${product.accentGradient} text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base`}
                    >
                      Add to Cart - ${product.price.toFixed(2)} CAD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-3 sm:mb-4">
            Save 10% on Your First Order
          </h2>
          <p className="text-lg sm:text-xl opacity-90 mb-4 sm:mb-6">
            Use code at checkout
          </p>
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 sm:px-8 py-3 sm:py-4">
            <p className="text-xs sm:text-sm opacity-75 mb-2">PROMO CODE</p>
            <p className="text-2xl sm:text-3xl font-mono font-bold">FRIENDSOFAELO</p>
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
