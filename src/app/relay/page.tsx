'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Package,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Quote,
  Zap,
} from 'lucide-react';
import Footer from '@/components/layout/Footer';

const FEATURES = [
  {
    icon: Truck,
    title: 'Same-Day Delivery',
    description: 'Send packages across the city and get them delivered the same day.',
  },
  {
    icon: MapPin,
    title: 'Real-Time Tracking',
    description: 'Track your package from pickup to drop-off in real-time.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Riders',
    description: 'All relay riders are background-checked and verified for your safety.',
  },
  {
    icon: Zap,
    title: 'Instant Pricing',
    description: 'Get an instant price estimate before you send. No hidden fees.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Send now or schedule for later. You pick the time that works.',
  },
  {
    icon: Package,
    title: 'Any Item',
    description: 'Documents, gifts, food, gadgets - if it fits, we ship it.',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Enter Details',
    description: 'Set your pickup and drop-off locations, and describe your item.',
  },
  {
    step: '02',
    title: 'Get a Rider',
    description: 'A nearby verified rider accepts your request and heads to pickup.',
  },
  {
    step: '03',
    title: 'Track & Receive',
    description: 'Watch your package in real-time. Get it delivered to your door.',
  },
];

const USE_CASES = [
  { icon: '📄', title: 'Documents', description: 'Send contracts, letters, and important papers across town.' },
  { icon: '🎁', title: 'Gifts', description: 'Surprise someone with a gift delivered to their doorstep.' },
  { icon: '🍰', title: 'Food', description: 'Send a meal to a friend or family member.' },
  { icon: '📱', title: 'Gadgets', description: 'Phone, laptop, or accessories - we handle it with care.' },
  { icon: '🛍️', title: 'Shopping', description: 'Bought something from a store? We\'ll bring it to you.' },
  { icon: '💊', title: 'Medication', description: 'Need meds delivered urgently? Relay has you covered.' },
];

const TESTIMONIALS = [
  {
    name: 'Emeka Nwosu',
    role: 'Victoria Island, Lagos',
    quote: 'I use Relay to send documents to clients. It is fast, reliable, and the tracking gives me peace of mind.',
  },
  {
    name: 'Ngozi Adeyemi',
    role: 'Surulere, Lagos',
    quote: 'Sent a birthday gift to my sister across Lagos. Arrived in 2 hours! The rider was very professional.',
  },
  {
    name: 'Tunde Bakare',
    role: 'Wuse, Abuja',
    quote: 'Relay is my go-to for sending anything. The pricing is transparent and delivery is always on time.',
  },
];

const PRICING_TIERS = [
  { distance: 'Up to 5 km', price: '₦500 - ₦1,000', time: '30-45 mins' },
  { distance: '5 - 15 km', price: '₦1,000 - ₦2,500', time: '45-60 mins' },
  { distance: '15 - 30 km', price: '₦2,500 - ₦4,500', time: '1-2 hours' },
  { distance: '30+ km', price: 'Custom', time: 'Varies' },
];

export default function RelayPage() {
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
            Chowdeck Relay
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Send Anything, Anywhere
          </h1>
          <p className="mt-4 text-lg text-white/80 sm:text-xl">
            Package delivery made simple. Send documents, gifts, and essentials across the city with verified riders.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#E23E3E] shadow-lg transition hover:bg-gray-100"
            >
              Start Sending
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Why Use Relay?
        </h2>
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

      {/* Use Cases */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          What Can You Send?
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((uc) => (
            <div
              key={uc.title}
              className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="text-3xl">{uc.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{uc.title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{uc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-white py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Transparent Pricing
          </h2>
          <p className="mt-3 text-center text-gray-500 dark:text-gray-400">
            Pay only for the distance. No hidden charges.
          </p>
          <div className="mt-10 overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Distance</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Price Range</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Est. Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {PRICING_TIERS.map((tier) => (
                  <tr key={tier.distance} className="bg-white dark:bg-gray-900">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{tier.distance}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{tier.price}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{tier.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          What Users Say
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
              <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
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
          <Package className="mx-auto mb-4 h-12 w-12" />
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to Send?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Create an account and send your first package with Relay today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#E23E3E] shadow-lg transition hover:bg-gray-100"
            >
              Sign Up Free
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
