"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ShoppingCart() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        alert('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to proceed to checkout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-3 sm:right-6 z-40 bg-gradient-to-r from-slate-900 to-slate-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm sm:text-base"
      >
        <span className="text-lg sm:text-xl">🛒</span>
        {getTotalItems() > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs">
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl overflow-y-auto">
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-light">Shopping Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl sm:text-3xl hover:opacity-60 transition-opacity"
                >
                  ×
                </button>
              </div>

              {/* Cart Items */}
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-base sm:text-lg text-gray-500 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs sm:text-sm text-slate-900 underline hover:opacity-60"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="relative w-10 h-14 sm:w-12 sm:h-16 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={56}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-xs sm:text-sm mb-1 truncate">{item.name}</h3>
                          <p className="text-xs text-gray-500 mb-2 line-clamp-1">{item.icon} {item.tagline}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 hover:bg-gray-100"
                              >
                                −
                              </button>
                              <span className="px-3 py-1 text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-xs text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="font-medium">${getTotalPrice().toFixed(2)} CAD</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">
                      Shipping and taxes calculated at checkout
                    </p>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-4 rounded-lg font-medium hover:from-slate-800 hover:to-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full mt-3 text-sm text-gray-600 hover:text-gray-800 underline"
                  >
                    Clear Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
