'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Clock, User as UserIcon } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { cn } from '@/lib/utils';
import Footer from '@/components/layout/Footer';

const ALL_CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map((p) => p.tags?.[0] || 'General')))];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return blogPosts;
    return blogPosts.filter((p) => p.tags?.includes(activeCategory));
  }, [activeCategory]);

  const featuredPost = blogPosts[0];
  const otherPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-white px-4 py-16 text-center dark:bg-gray-900 lg:py-20">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Chowdeck Blog
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-gray-500 dark:text-gray-400">
          Food stories, delivery tips, and everything in between.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-16">
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors capitalize',
                activeCategory === cat
                  ? 'bg-[#E23E3E] text-white'
                  : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-gray-800'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {activeCategory === 'All' && featuredPost && (
          <div className="mb-10 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800 lg:flex">
            <div className="relative aspect-[16/9] w-full bg-gray-100 lg:aspect-auto lg:w-1/2 lg:min-h-[360px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute left-4 top-4 rounded-full bg-[#E23E3E] px-3 py-1 text-xs font-bold text-white">
                Featured
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 lg:w-1/2 lg:p-8">
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <UserIcon size={12} />
                  {featuredPost.author}
                </span>
                <span>·</span>
                <span>
                  {new Date(featuredPost.publishedAt).toLocaleDateString('en-NG', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white lg:text-2xl">
                {featuredPost.title}
              </h2>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featuredPost.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 capitalize dark:bg-gray-800 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-block text-sm font-semibold text-[#E23E3E] hover:underline">
                Read More →
              </span>
            </div>
          </div>
        )}

        {/* Post Grid */}
        {otherPosts.length === 0 && activeCategory !== 'All' ? (
          <div className="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No posts found in this category.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(activeCategory === 'All' ? blogPosts.slice(1) : filteredPosts).map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md dark:bg-gray-900 dark:ring-gray-800"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <UserIcon size={12} />
                      {post.author}
                    </span>
                    <span>·</span>
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('en-NG', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-base font-bold text-gray-900 group-hover:text-[#E23E3E] dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 capitalize dark:bg-gray-800 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 inline-block text-sm font-semibold text-[#E23E3E] hover:underline">
                    Read More →
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
