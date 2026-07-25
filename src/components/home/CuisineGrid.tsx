'use client';

import Link from 'next/link';
import { categories } from '@/data/categories';

export default function CuisineGrid() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Explore by cuisine
          </h2>
          <p className="text-lg text-gray-600">
            Whatever you&apos;re craving, we&apos;ve got it
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/store?category=${category.slug}`}
              className="group"
            >
              <div
                className="rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg border border-transparent hover:border-gray-200"
                style={{ backgroundColor: `${category.color}15` }}
              >
                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </span>
                <h3
                  className="font-semibold text-sm"
                  style={{ color: category.color }}
                >
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
