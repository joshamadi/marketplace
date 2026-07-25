'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Smartphone,
  Clock,
  ShieldCheck,
  CreditCard,
  MapPin,
  Star,
  Utensils,
  ShoppingBag,
  Package,
  Quote,
} from 'lucide-react';
import Footer from '@/components/layout/Footer';

const FEATURES = [
  {
    icon: Utensils,
    title: 'Food Delivery',
    description: 'Order from your favourite restaurants and get it delivered hot and fresh.',
  },
  {
    icon: ShoppingBag,
    title: 'Grocery Shopping',
    description: 'Shop groceries from top stores and get them delivered to your door.',
  },
  {
    icon: Package,
    title: 'Relay Packages',
    description: 'Send and receive packages across the city with reliable riders.',
  },
  {
    icon: CreditCard,
    title: 'Easy Payments',
    description: 'Pay with card, wallet, or cash on delivery. Your choice.',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Get your orders delivered in 30 minutes or less.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Secure',
    description: 'Track your orders in real-time with verified riders.',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Download the App',
    description: 'Get Chowdeck on iOS or Android. Sign up in seconds.',
  },
  {
    step: '02',
    title: 'Browse & Order',
    description: 'Explore restaurants, stores, and menus near you.',
  },
  {
    step: '03',
    title: 'Track & Enjoy',
    description: 'Watch your order in real-time. Enjoy when it arrives.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Chidinma Okafor',
    role: 'Lekki, Lagos',
    quote: 'Chowdeck changed how I eat. I order lunch every day from my desk. The delivery is always fast.',
    rating: 5,
  },
  {
    name: 'Adebayo Johnson',
    role: 'Ikeja, Lagos',
    quote: 'Best food delivery app in Lagos. The variety of restaurants is amazing and the riders are always polite.',
    rating: 5,
  },
  {
    name: 'Fatima Abubakar',
    role: 'Wuse, Abuja',
    quote: 'I use Chowdeck for groceries too. It saves me so much time not having to go to the market.',
    rating: 5,
  },
];

const STATS = [
  { value: '500K+', label: 'Happy Customers' },
  { value: '5,000+', label: 'Restaurants' },
  { value: '10K+', label: 'Riders' },
  { value: '4.8', label: 'App Rating' },
];

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E23E3E] to-[#b82e2e] px-4 py-20 text-center text-white lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-white" />
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
            For Customers
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Your Favourite Meals, Delivered
          </h1>
          <p className="mt-4 text-lg text-white/80 sm:text-xl">
            Order food, groceries, and essentials from the best stores in your city. Fast, reliable, and always fresh.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#E23E3E] shadow-lg transition hover:bg-gray-100"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/restaurants"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Browse Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 mx-auto max-w-4xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-lg sm:grid-cols-4 dark:bg-gray-900">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-[#E23E3E] sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Everything You Need
        </h2>
        <p className="mt-3 text-center text-gray-500 dark:text-gray-400">
          From food to groceries to package delivery, we&apos;ve got you covered.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#E23E3E]/10">
                <Icon size={24} className="text-[#E23E3E]" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            How It Works
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {STEPS.map(({ step, title, description }) => (
              <div key={step} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E23E3E] text-xl font-bold text-white">
                  {step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          What Customers Say
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-800/50"
            >
              <Quote size={24} className="mb-3 text-[#E23E3E]/30" />
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#E23E3E] to-[#b82e2e] px-4 py-16 text-center text-white lg:py-20">
        <div className="mx-auto max-w-2xl">
          <Smartphone className="mx-auto mb-4 h-12 w-12" />
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Order Now, Enjoy Later
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Download the Chowdeck app and get your first delivery free.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#E23E3E] shadow-lg transition hover:bg-gray-100"
            >
              Create Free Account
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
