"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function CheckoutSuccess() {
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  useEffect(() => {
    // Clear cart on successful checkout
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-emerald-50 via-background to-teal-50">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-4xl font-light tracking-tight mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
            Thank you for your order. You'll receive a confirmation email shortly with your order details.
          </p>
          <div className="space-y-4">
            <a
              href="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white text-sm font-medium tracking-wide hover:from-slate-800 hover:to-slate-600 transition-all shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
