export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-2xl font-light tracking-wider">
              a<span className="text-sm align-top">ē</span>lo
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#products" className="hover:opacity-60 transition-opacity">Products</a>
              <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
              <a href="#sustainability" className="hover:opacity-60 transition-opacity">Sustainability</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 leading-[0.9]">
              Zero Moments<br />Wasted<span className="text-5xl align-top">™</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 font-light max-w-2xl mb-12 leading-relaxed">
              Handcrafted premium non-alcoholic cocktails. Zero alcohol. Zero sugar. Zero calories.
              <span className="block mt-4 text-base">Proudly Canadian 🇨🇦</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#products"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white text-sm font-medium tracking-wide hover:bg-accent/90 transition-colors"
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
        </div>
      </section>

      {/* Key Values Banner */}
      <section className="py-12 bg-beige">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-light mb-2">0</div>
              <div className="text-sm tracking-wider uppercase text-foreground/70">Alcohol</div>
            </div>
            <div>
              <div className="text-3xl font-light mb-2">0</div>
              <div className="text-sm tracking-wider uppercase text-foreground/70">Sugar</div>
            </div>
            <div>
              <div className="text-3xl font-light mb-2">0</div>
              <div className="text-sm tracking-wider uppercase text-foreground/70">Calories</div>
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
              },
              {
                name: "Peach Bellini",
                description: "Elegant and fruity, perfect for any celebration",
              },
              {
                name: "Aperitivo Spritz",
                description: "Bitter-sweet Italian classic with a refreshing twist",
              },
              {
                name: "Lime Margarita",
                description: "Bold citrus flavor with a perfect balance of sweet and tart",
              },
              {
                name: "Limoncello Spritz",
                description: "Bright lemon essence with sparkling sophistication",
              },
            ].map((product) => (
              <div
                key={product.name}
                className="group relative bg-cream p-8 hover:bg-beige transition-colors cursor-pointer"
              >
                <div className="aspect-square bg-background/30 mb-6 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🍸</div>
                </div>
                <h3 className="text-2xl font-light mb-3 tracking-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-6 text-xs tracking-widest uppercase text-foreground/40">
                  355ml
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
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
              <div className="bg-background p-8">
                <h3 className="text-sm tracking-widest uppercase mb-4 text-foreground/60">Certifications</h3>
                <div className="space-y-3 text-base">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">✓</span>
                    <span>Keto-Friendly</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">✓</span>
                    <span>Vegan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">✓</span>
                    <span>Gluten-Free</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">✓</span>
                    <span>All Natural Ingredients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="py-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
            Sustainability Matters
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed mb-12 max-w-3xl mx-auto">
            We're committed to making a positive impact on the environment. For every box sold, we plant one tree through our partnership with reforestation nonprofits.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-beige p-10">
              <div className="text-4xl mb-4">♻️</div>
              <h3 className="text-xl font-medium mb-3">100% Recyclable</h3>
              <p className="text-foreground/70">
                All packaging is fully recyclable with zero plastic rings, reducing environmental impact.
              </p>
            </div>
            <div className="bg-beige p-10">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-medium mb-3">One Tree, One Box</h3>
              <p className="text-foreground/70">
                For every box purchased, we plant a tree in partnership with reforestation organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            Join the Movement
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Millennials and Gen Z are leading the zero-proof revolution. Be part of the sober-curious community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/drinkaelo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent text-sm font-medium tracking-wide hover:bg-white/90 transition-colors"
            >
              Follow on Instagram
            </a>
          </div>
          <p className="mt-8 text-sm opacity-75">
            Use code <span className="font-mono bg-white/20 px-3 py-1">FRIENDSOFAELO</span> for 10% off your first order
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
            <p>© {new Date().getFullYear()} aēlo. All rights reserved. Zero Moments Wasted™</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
