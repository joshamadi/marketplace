'use client';

import { useState, useMemo } from 'react';
import { Search, ShoppingCart, X, ArrowLeft, Store as StoreIcon, Clock, Truck } from 'lucide-react';
import { groceryStores, groceryProducts } from '@/data/grocery';
import ProductGrid from '@/components/store/ProductGrid';
import useCartStore from '@/store/useCartStore';
import { formatPrice, cn } from '@/lib/utils';
import Footer from '@/components/layout/Footer';

export default function StorePage() {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const cart = useCartStore((s) => s.items);
  const cartTotal = useCartStore((s) => s.total);
  const cartSubtotal = useCartStore((s) => s.subtotal);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const selectedStore = useMemo(
    () => groceryStores.find((s) => s.id === selectedStoreId) || null,
    [selectedStoreId]
  );

  const filteredStores = useMemo(() => {
    if (!searchQuery.trim()) return groceryStores;
    const q = searchQuery.toLowerCase();
    return groceryStores.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.categories?.some((c) => c.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    if (!selectedStoreId) return [];
    let products = groceryProducts.filter((p) => p.storeId === selectedStoreId);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return products;
  }, [selectedStoreId, searchQuery]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Chowstore
              </h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Fresh groceries delivered to your door
              </p>
            </div>
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative flex items-center gap-2 rounded-lg bg-[#E23E3E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#d33232] lg:hidden"
            >
              <ShoppingCart size={18} />
              {cartItemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#E23E3E]">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Search */}
          <div className="relative mt-6">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={selectedStore ? `Search in ${selectedStore.name}...` : 'Search stores and products...'}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Main Content */}
          <div className="min-w-0 flex-1">
            {!selectedStore ? (
              <>
                <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                  Available Stores
                </h2>
                {filteredStores.length === 0 ? (
                  <div className="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center dark:border-gray-700">
                    <StoreIcon className="mx-auto mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400">No stores found.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredStores.map((store) => (
                      <button
                        key={store.id}
                        onClick={() => {
                          setSelectedStoreId(store.id);
                          setSearchQuery('');
                        }}
                        className="group overflow-hidden rounded-xl bg-white text-left shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md hover:ring-gray-200 dark:bg-gray-900 dark:ring-gray-800 dark:hover:ring-gray-700"
                      >
                        <div className="flex items-center gap-4 p-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#E23E3E]/10 text-2xl font-bold text-[#E23E3E]">
                            {store.name.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-base font-semibold text-gray-900 group-hover:text-[#E23E3E] dark:text-white">
                              {store.name}
                            </h3>
                            <div className="mt-1 flex flex-wrap gap-1.5">
                              {store.categories?.map((cat) => (
                                <span
                                  key={cat}
                                  className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                >
                                  {cat}
                                </span>
                              ))}
                            </div>
                            <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {store.deliveryTime}
                              </span>
                              <span className="flex items-center gap-1">
                                <Truck size={12} />
                                {store.deliveryFee === 0
                                  ? 'Free'
                                  : formatPrice(store.deliveryFee)}
                              </span>
                              <span className="rounded-md bg-yellow-50 px-1.5 py-0.5 font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                ★ {store.rating.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setSelectedStoreId(null);
                    setSearchQuery('');
                  }}
                  className="mb-4 flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#E23E3E] dark:text-gray-400"
                >
                  <ArrowLeft size={16} />
                  All Stores
                </button>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedStore?.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredProducts.length} products available
                  </p>
                </div>
                <ProductGrid products={filteredProducts as any} storeName={selectedStore?.name || ''} />
              </>
            )}
          </div>

          {/* Cart Sidebar - Desktop */}
          <aside className="hidden w-80 shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
              <h3 className="mb-3 flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                <ShoppingCart size={18} />
                Your Cart
                {cartItemCount > 0 && (
                  <span className="rounded-full bg-[#E23E3E] px-2 py-0.5 text-xs text-white">
                    {cartItemCount}
                  </span>
                )}
              </h3>

              {cart.length === 0 ? (
                <div className="py-8 text-center">
                  <ShoppingCart className="mx-auto mb-2 h-8 w-8 text-gray-300 dark:text-gray-600" />
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <>
                  <div className="max-h-64 space-y-3 overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 rounded-lg bg-gray-50 p-2 dark:bg-gray-800"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {item.menuItem.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatPrice(item.menuItem.price)} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded-md bg-white p-1 text-gray-600 shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                          >
                            -
                          </button>
                          <span className="min-w-[1.25rem] text-center text-sm font-semibold text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded-md bg-[#E23E3E] p-1 text-white shadow-sm hover:bg-[#c73535]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartSubtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                  </div>

                  <a
                    href="/checkout"
                    className="mt-4 block w-full rounded-lg bg-[#E23E3E] py-3 text-center text-sm font-semibold text-white hover:bg-[#d33232]"
                  >
                    Proceed to Checkout
                  </a>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-white p-4 shadow-xl dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 dark:text-white">Your Cart</h3>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingCart className="mx-auto mb-2 h-10 w-10 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.menuItem.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatPrice(item.menuItem.price)} × {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="rounded-md bg-white p-1 text-gray-600 shadow-sm dark:bg-gray-700 dark:text-gray-300"
                        >
                          -
                        </button>
                        <span className="min-w-[1.25rem] text-center text-sm font-semibold dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-md bg-[#E23E3E] p-1 text-white shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                </div>
                <a
                  href="/checkout"
                  className="mt-4 block w-full rounded-lg bg-[#E23E3E] py-3 text-center text-sm font-semibold text-white hover:bg-[#d33232]"
                >
                  Proceed to Checkout
                </a>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
