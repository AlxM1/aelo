"use client";

import Image from "next/image";

export default function Home() {
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
              <a href="#story" className="hover:opacity-60 transition-opacity">Our Story</a>
              <a href="#mission" className="hover:opacity-60 transition-opacity">Our Mission</a>
              <a href="#find-aelo" className="hover:opacity-60 transition-opacity">Find aēlo Near You</a>
              <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
              <a href="#sustainability" className="hover:opacity-60 transition-opacity">Sustainability</a>
            </div>
            {/* Mobile Menu Button */}
            <button className="md:hidden text-2xl" onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}>
              ☰
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden bg-background/95 backdrop-blur-md border-t border-black/5">
          <div className="px-6 py-4 space-y-3">
            <a href="/products" className="block text-sm font-medium hover:opacity-60 transition-opacity">Products</a>
            <a href="#story" className="block text-sm font-medium hover:opacity-60 transition-opacity">Our Story</a>
            <a href="#mission" className="block text-sm font-medium hover:opacity-60 transition-opacity">Our Mission</a>
            <a href="#find-aelo" className="block text-sm font-medium hover:opacity-60 transition-opacity">Find aēlo Near You</a>
            <a href="#about" className="block text-sm font-medium hover:opacity-60 transition-opacity">About</a>
            <a href="#sustainability" className="block text-sm font-medium hover:opacity-60 transition-opacity">Sustainability</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-background to-emerald-50 opacity-60"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-4xl text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-light tracking-tight mb-6 lg:mb-8 leading-[0.9]">
                Zero Moments<br />Wasted
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 font-light max-w-2xl mb-8 lg:mb-12 leading-relaxed mx-auto lg:mx-0">
                Handcrafted premium non-alcoholic cocktails. Zero alcohol. Zero sugar. Zero calories.
                <span className="block mt-4 text-sm sm:text-base">Proudly Canadian 🍁</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white text-sm font-medium tracking-wide hover:from-slate-800 hover:to-slate-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Explore Products
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center px-8 py-4 border border-accent text-accent text-sm font-medium tracking-wide hover:bg-accent hover:text-white transition-colors"
                >
                  Our Story
                </a>
              </div>
            </div>

            {/* Right - Video Section - Responsive */}
            <div className="flex items-center justify-center relative h-[300px] sm:h-[400px] lg:h-[500px] mt-8 lg:mt-0">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Video Container - Responsive */}
                <div className="relative w-full max-w-[400px] sm:max-w-[450px] lg:w-[550px] h-full rounded-2xl overflow-hidden shadow-2xl">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/cocktail-pour.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Values Banner */}
      <section className="relative py-16 overflow-hidden mt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-light mb-3 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">0</div>
              <div className="text-sm tracking-wider uppercase text-gray-700 font-medium">Alcohol</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-light mb-3 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">0</div>
              <div className="text-sm tracking-wider uppercase text-gray-700 font-medium">Sugar</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-light mb-3 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">0</div>
              <div className="text-sm tracking-wider uppercase text-gray-700 font-medium">Calories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              Our Collection
            </h2>
            <p className="text-lg text-foreground/70 font-light max-w-2xl mx-auto">
              Handcrafted by experienced mixologists. All natural ingredients, ethically sourced.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Gin & Tonic",
                description: "Classic sophistication with botanical notes and refreshing citrus",
                gradient: "from-cyan-100 via-teal-50 to-emerald-100",
                hoverGradient: "group-hover:from-cyan-200 group-hover:via-teal-100 group-hover:to-emerald-200",
                image: "/gin-tonic.webp",
                icon: "🌿",
              },
              {
                name: "Peach Bellini",
                description: "Elegant and fruity, perfect for any celebration",
                gradient: "from-rose-100 via-pink-50 to-peach-100",
                hoverGradient: "group-hover:from-rose-200 group-hover:via-pink-100 group-hover:to-orange-100",
                image: "/peach-bellini.webp",
                icon: "🍑",
              },
              {
                name: "Aperitivo Spritz",
                description: "Bitter-sweet Italian classic with a refreshing twist",
                gradient: "from-orange-100 via-amber-50 to-red-100",
                hoverGradient: "group-hover:from-orange-200 group-hover:via-amber-100 group-hover:to-red-200",
                image: "/aperitivo-spritz.webp",
                icon: "🍊",
              },
              {
                name: "Lime Margarita",
                description: "Bold citrus flavor with a perfect balance of sweet and tart",
                gradient: "from-lime-100 via-green-50 to-yellow-100",
                hoverGradient: "group-hover:from-lime-200 group-hover:via-green-100 group-hover:to-yellow-200",
                image: "/lime-margarita.webp",
                icon: "🍋",
              },
              {
                name: "Limoncello Spritz",
                description: "Bright lemon essence with sparkling sophistication",
                gradient: "from-yellow-100 via-amber-50 to-orange-50",
                hoverGradient: "group-hover:from-yellow-200 group-hover:via-amber-100 group-hover:to-orange-100",
                image: "/limoncello-spritz.webp",
                icon: "✨",
              },
            ].map((product) => (
              <div
                key={product.name}
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} ${product.hoverGradient} transition-all duration-500`}></div>
                <div className="relative z-10 p-8 flex flex-col">
                  {/* Icon at the top */}
                  <div className="absolute top-4 right-4 text-4xl opacity-60 group-hover:opacity-80 transform group-hover:scale-110 transition-all duration-300">
                    {product.icon}
                  </div>

                  {/* Product Image */}
                  <div className="w-full h-52 relative mb-6 flex items-center justify-center overflow-visible">
                    <div className="relative w-32 h-full flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={140}
                        height={180}
                        className="object-contain drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500 max-w-full max-h-full"
                        priority
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-light mb-3 tracking-tight text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-6 text-xs tracking-widest uppercase text-gray-600 font-medium">
                    355ml
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background to-purple-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-700"></div>
                <div className="relative z-10 p-12">
                  <div className="text-6xl mb-6">👨‍🍳</div>
                  <h3 className="text-2xl font-light mb-4 text-white">Founded by Experts</h3>
                  <p className="text-white/80 leading-relaxed">
                    Christos Kalaitzis brings years of experience from premium establishments, crafting sophisticated beverages that rival traditional cocktails.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-foreground/70 leading-relaxed">
                <p>
                  Founded by Christos Kalaitzis, an experienced bartender from premium establishments, aēlo was born from identifying a critical gap in the market.
                </p>
                <p>
                  Christos observed that premium alcohol-free beverages were lacking—most options were either plain soda water or sugar-laden drinks that didn't deliver the sophisticated experience discerning consumers deserved.
                </p>
                <p className="font-medium text-foreground">
                  This insight led to the development of handcrafted, zero-proof cocktails that never compromise on taste, quality, or sophistication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="mission" className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-cream to-emerald-50 opacity-70"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
            Our Mission
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-2xl md:text-3xl font-light text-foreground leading-relaxed">
              Zero Moments Wasted
            </p>
            <p className="text-xl text-foreground/70 leading-relaxed">
              We believe every moment matters. That's why we've created Canada's favourite mocktail with zero alcohol, zero sugar, and zero calories—without sacrificing the premium experience you deserve.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="relative overflow-hidden rounded-2xl group hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-200 group-hover:from-rose-200 group-hover:to-pink-300 transition-all duration-300"></div>
                <div className="relative z-10 p-8">
                  <div className="text-5xl mb-4">🌟</div>
                  <h3 className="text-xl font-medium mb-3 text-gray-900">Premium Quality</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    All-natural ingredients, ethically sourced and handcrafted with care by experienced mixologists.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl group hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-200 group-hover:from-blue-200 group-hover:to-cyan-300 transition-all duration-300"></div>
                <div className="relative z-10 p-8">
                  <div className="text-5xl mb-4">💪</div>
                  <h3 className="text-xl font-medium mb-3 text-gray-900">Health Conscious</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Keto-friendly, vegan, and gluten-free. Perfect for those leading an active, health-conscious lifestyle.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl group hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-200 group-hover:from-purple-200 group-hover:to-indigo-300 transition-all duration-300"></div>
                <div className="relative z-10 p-8">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-xl font-medium mb-3 text-gray-900">Sober Curious</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Join the movement. Millennials and Gen Z are redefining social drinking with sophisticated zero-proof options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find aēlo Near You Section */}
      <section id="find-aelo" className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-background to-cyan-50 opacity-60"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
            Find a<span className="text-3xl align-top">ē</span>lo Near You
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed mb-12 max-w-3xl mx-auto">
            Discover where you can find our premium non-alcoholic cocktails at retailers near you.
          </p>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-2xl mx-auto group hover:shadow-3xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"></div>
            <div className="relative z-10 p-12">
              <div className="text-6xl mb-6">📍</div>
              <h3 className="text-2xl font-light mb-6 text-white">Store Locator</h3>
              <p className="text-white/80 leading-relaxed mb-8">
                Use our store locator to find aēlo products at your favorite retailers. Available at select locations across Canada.
              </p>
              <a
                href="https://drinkaelo.com/findaelo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 text-sm font-medium tracking-wide hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Find Retailers
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-cream to-rose-50 opacity-70"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
                Crafted with Purpose
              </h2>
              <div className="space-y-6 text-lg text-foreground/70 leading-relaxed">
                <p>
                  Founded by Christos Kalaitzis, an experienced bartender from premium establishments who identified the growing demand for sophisticated alcohol-free beverages.
                </p>
                <p>
                  aēlo is more than just a drink—it's a lifestyle choice. We believe you shouldn't have to sacrifice quality, taste, or enjoyment when choosing not to drink alcohol.
                </p>
                <p className="font-medium text-foreground">
                  Each cocktail is handcrafted in Canada with all-natural, ethically sourced ingredients.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 group-hover:from-gray-50 group-hover:to-white transition-all duration-300"></div>
                <div className="relative z-10 p-8 shadow-lg">
                  <h3 className="text-sm tracking-widest uppercase mb-4 text-foreground/60">Certifications</h3>
                  <div className="space-y-3 text-base">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-green-600">✓</span>
                      <span>Keto-Friendly</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-green-600">✓</span>
                      <span>Vegan</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-green-600">✓</span>
                      <span>Gluten-Free</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-green-600">✓</span>
                      <span>All Natural Ingredients</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-background to-teal-50 opacity-50"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
            Sustainability Matters
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed mb-12 max-w-3xl mx-auto">
            We're committed to making a positive impact on the environment. For every box sold, we plant one tree through our partnership with reforestation nonprofits.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="relative overflow-hidden rounded-2xl group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-200 group-hover:from-green-200 group-hover:to-emerald-300 transition-all duration-300"></div>
              <div className="relative z-10 p-10">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">♻️</div>
                <h3 className="text-xl font-medium mb-3 text-gray-900">100% Recyclable</h3>
                <p className="text-gray-700">
                  All packaging is fully recyclable with zero plastic rings, reducing environmental impact.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-100 to-green-200 group-hover:from-lime-200 group-hover:to-green-300 transition-all duration-300"></div>
              <div className="relative z-10 p-10">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🌱</div>
                <h3 className="text-xl font-medium mb-3 text-gray-900">One Tree, One Box</h3>
                <p className="text-gray-700">
                  For every box purchased, we plant a tree in partnership with reforestation organizations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-white">
            Join the Movement
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed text-white">
            Millennials and Gen Z are leading the zero-proof revolution. Be part of the sober-curious community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/drinkaelo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 text-sm font-medium tracking-wide hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Follow on Instagram
            </a>
          </div>
          <p className="mt-8 text-sm opacity-75 text-white">
            Use code <span className="font-mono bg-white/20 px-3 py-1 rounded">FRIENDSOFAELO</span> for 10% off your first order
          </p>
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
                <a href="#products" className="block hover:text-foreground transition-colors">Products</a>
                <a href="#story" className="block hover:text-foreground transition-colors">Our Story</a>
                <a href="#mission" className="block hover:text-foreground transition-colors">Our Mission</a>
                <a href="#find-aelo" className="block hover:text-foreground transition-colors">Find aēlo</a>
                <a href="#about" className="block hover:text-foreground transition-colors">About</a>
                <a href="#sustainability" className="block hover:text-foreground transition-colors">Sustainability</a>
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
