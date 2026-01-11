"use client";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-rose-50 via-background to-orange-50">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-4xl font-light tracking-tight mb-4">
            Checkout Cancelled
          </h1>
          <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
            Your order was cancelled. Your cart items have been saved. You can continue shopping when you're ready.
          </p>
          <div className="space-y-4">
            <a
              href="/products"
              className="inline-block px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white text-sm font-medium tracking-wide hover:from-slate-800 hover:to-slate-600 transition-all shadow-lg hover:shadow-xl"
            >
              Back to Products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
