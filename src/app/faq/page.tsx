'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, X } from 'lucide-react';
import { faqs } from '@/data/faqs';
import { cn } from '@/lib/utils';
import Footer from '@/components/layout/Footer';

const ALL_CATEGORIES = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const filteredFaqs = useMemo(() => {
    let list = faqs;
    if (activeCategory !== 'All') {
      list = list.filter((f) => f.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  function toggleFaq(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-white px-4 py-16 text-center dark:bg-gray-900 lg:py-20">
        <HelpCircle className="mx-auto mb-4 h-12 w-12 text-[#E23E3E]" />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-gray-500 dark:text-gray-400">
          Find answers to common questions about ordering, delivery, payments, and more.
        </p>

        {/* Search */}
        <div className="relative mx-auto mt-8 max-w-lg">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8 lg:py-16">
        {/* Category Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                activeCategory === cat
                  ? 'bg-[#E23E3E] text-white'
                  : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-gray-800'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        {filteredFaqs.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center dark:border-gray-700">
            <HelpCircle className="mx-auto mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400">
              No questions found. Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openIds.has(faq.id);
              return (
                <div
                  key={faq.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="flex w-full items-start gap-3 p-4 text-left"
                  >
                    <span className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    <span className="ml-auto shrink-0 text-gray-400">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-gray-100 px-4 pb-4 pt-3 dark:border-gray-800">
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Still need help? */}
        <div className="mt-12 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Still need help?
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Can&apos;t find what you&apos;re looking for? Our support team is here for you.
          </p>
          <a
            href="/contact"
            className="mt-5 inline-block rounded-lg bg-[#E23E3E] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#d33232]"
          >
            Contact Support
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
