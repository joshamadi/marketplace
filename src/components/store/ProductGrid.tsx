'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import type { GroceryProduct } from '@/types';
import GroceryProductCard from './GroceryProductCard';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: GroceryProduct[];
  storeName: string;
}

type SortOption = 'popularity' | 'price-asc' | 'price-desc';

const SORT_LABELS: Record<SortOption, string> = {
  popularity: 'Popularity',
  'price-asc': 'Price: Low → High',
  'price-desc': 'Price: High → Low',
};

export default function ProductGrid({ products, storeName }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const filtered = useMemo(() => {
    let list = selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : products;

    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return list;
  }, [products, selectedCategory, sortBy]);

  function FilterSidebar({ className }: { className?: string }) {
    return (
      <div className={className}>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Categories
        </h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                'w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
                !selectedCategory
                  ? 'bg-[#E23E3E] text-white'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              )}
            >
              All Items
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
                  selectedCategory === cat
                    ? 'bg-[#E23E3E] text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                )}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 lg:hidden dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <SlidersHorizontal size={16} />
          Filters
          {selectedCategory && (
            <span className="rounded-full bg-[#E23E3E] px-2 py-0.5 text-xs text-white">1</span>
          )}
        </button>

        <div className="relative ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-white p-4 shadow-xl dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}

      <div className="flex gap-6">
        <FilterSidebar className="hidden w-48 shrink-0 lg:block" />

        <div className="flex-1">
          {selectedCategory && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filtered.length} items in
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#E23E3E]/10 px-2.5 py-0.5 text-sm font-semibold text-[#E23E3E]">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-[#E23E3E]/20"
                >
                  <X size={12} />
                </button>
              </span>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-16 dark:border-gray-700">
              <p className="text-gray-400 dark:text-gray-500">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <GroceryProductCard
                  key={product.id}
                  product={product}
                  storeName={storeName}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
