'use client';

import { useState } from 'react';
import { Check, Truck, Headphones, Percent, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { faqs } from '@/data/faqs';
import Footer from '@/components/layout/Footer';

const BENEFITS = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Unlimited free delivery on every order, no matter the size.',
  },
  {
    icon: Headphones,
    title: 'Priority Support',
    description: 'Get instant access to our dedicated support team.',
  },
  {
    icon: Percent,
    title: 'Exclusive Discounts',
    description: 'Unlock member-only deals and savings on top restaurants.',
  },
  {
    icon: Bell,
    title: 'Early Access to Promos',
    description: 'Be the first to know about new promos and flash sales.',
  },
];

const PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 5000,
    period: 'month',
    popular: false,
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    price: 12000,
    period: '3 months',
    popular: true,
    savings: '20% off',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 40000,
    period: 'year',
    popular: false,
    savings: '33% off',
  },
];

const chowpassFaqs = faqs.filter((f) => f.category === 'Subscription');

export default function ChowpassPage() {
  const [selectedPlan, setSelectedPlan] = useState('quarterly');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  function toggleFaq(id: string) {
    setOpenFaq((prev) => (prev === id ? null : id));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E23E3E] to-[#b82e2e] px-4 py-20 text-center text-white lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
            Subscription
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Chowpass
          </h1>
          <p className="mt-4 text-lg text-white/80 sm:text-xl">
            Unlimited free delivery on every order
          </p>
          <button
            onClick={() => {
              document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#E23E3E] shadow-lg transition hover:bg-gray-100"
          >
            Get Chowpass
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Why Chowpass?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-gray-500 dark:text-gray-400">
          Subscribe once and enjoy perks on every single order.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#E23E3E]/10">
                <Icon size={24} className="text-[#E23E3E]" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="plans" className="bg-white py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Choose Your Plan
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-gray-500 dark:text-gray-400">
            All plans include free delivery, priority support, and exclusive discounts.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={cn(
                  'relative rounded-2xl border-2 p-6 text-left transition-all',
                  selectedPlan === plan.id
                    ? 'border-[#E23E3E] bg-[#E23E3E]/5 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600'
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#E23E3E] px-4 py-1 text-xs font-bold text-white">
                    Most Popular
                  </span>
                )}
                {plan.savings && !plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-1 text-xs font-bold text-white">
                    {plan.savings}
                  </span>
                )}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    ₦{plan.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">/{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {BENEFITS.map(({ title }) => (
                    <li key={title} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check size={16} className="shrink-0 text-[#E23E3E]" />
                      {title}
                    </li>
                  ))}
                </ul>
                <div
                  className={cn(
                    'mt-6 rounded-lg py-2.5 text-center text-sm font-semibold transition',
                    selectedPlan === plan.id
                      ? 'bg-[#E23E3E] text-white'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  )}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="rounded-full bg-[#E23E3E] px-10 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#d33232] hover:shadow-xl">
              Subscribe Now
            </button>
            <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
              Cancel anytime. No hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {chowpassFaqs.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-3">
            {chowpassFaqs.map((faq) => (
              <div
                key={faq.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  {openFaq === faq.id ? (
                    <ChevronUp size={18} className="shrink-0 text-gray-400" />
                  ) : (
                    <ChevronDown size={18} className="shrink-0 text-gray-400" />
                  )}
                </button>
                {openFaq === faq.id && (
                  <div className="border-t border-gray-100 px-4 pb-4 pt-3 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-900">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Have more questions?{' '}
                <a href="/contact" className="font-semibold text-[#E23E3E] hover:underline">
                  Contact us
                </a>
              </p>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
