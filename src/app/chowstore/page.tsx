'use client';

import { useState, useMemo } from 'react';
import { Search, ShoppingCart, X, ArrowLeft, Store as StoreIcon, Clock, Truck } from 'lucide-react';
import { groceryStores, groceryProducts } from '@/data/grocery';
import ProductGrid from '@/components/store/ProductGrid';
import GroceryStoreCard from '@/components/store/GroceryStoreCard';
import useCartStore from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import Footer from '@/components/layout/Footer';

export default function ChowstorePage() {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const cart = useCartStore((s) => s.items);
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
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
          <div className="mt-6 flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 focus-within:border-[#E23E3E] focus-within:ring-1 focus-within:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800">
            <Search size={18} className="mr-2 text-gray-400" />
            <input
              type="text"
              placeholder={selectedStore ? `Search in ${selectedStore.name}...` : 'Search stores or products...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-white"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="ml-2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {selectedStore ? (
              <>
                {/* Back + Store Info */}
                <div className="mb-6">
                  <button
                    onClick={() => {
                      setSelectedStoreId(null);
                      setSearchQuery('');
                    }}
                    className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#E23E3E] dark:text-gray-400"
                  >
                    <ArrowLeft size={16} />
                    All Stores
                  </button>

                  <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#E23E3E]/10">
                      <StoreIcon size={28} className="text-[#E23E3E]" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{selectedStore.name}</h2>
                      <div className="mt-1 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {selectedStore.deliveryTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Truck size={14} />
                          {formatPrice(selectedStore.deliveryFee)} delivery
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products */}
                {filteredProducts.length > 0 ? (
                  <ProductGrid products={filteredProducts} />
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No products found.</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Store Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredStores.map((store) => (
                    <button
                      key={store.id}
                      onClick={() => setSelectedStoreId(store.id)}
                      className="text-left"
                    >
                      <GroceryStoreCard store={store} />
                    </button>
                  ))}
                </div>

                {filteredStores.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No stores found matching your search.</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Desktop Cart Sidebar */}
          {cartOpen && cartItemCount > 0 && (
            <div className="hidden w-80 lg:block">
              <div className="sticky top-24 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Cart ({cartItemCount})</h3>
                  <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-64 space-y-3 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-gray-500">{formatPrice(item.price)} x {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 rounded border text-xs font-bold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                          -
                        </button>
                        <span className="w-4 text-center text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 rounded border text-xs font-bold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-800">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-gray-900 dark:text-white">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">{formatPrice(cartSubtotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
