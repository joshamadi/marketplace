'use client';

import { useState } from 'react';
import {
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Store,
  BarChart3,
  Settings,
  Quote,
} from 'lucide-react';
import Footer from '@/components/layout/Footer';

const BENEFITS = [
  {
    icon: Users,
    title: 'Reach More Customers',
    description: 'Access thousands of hungry customers in your city looking for great food.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Business',
    description: 'Increase your revenue with online orders and build a loyal customer base.',
  },
  {
    icon: Zap,
    title: 'Easy Onboarding',
    description: 'Get started in minutes with our simple registration process.',
  },
];

const STEPS = [
  {
    icon: Store,
    step: '01',
    title: 'Register',
    description: 'Sign up with your business details and required documents.',
  },
  {
    icon: Settings,
    step: '02',
    title: 'Set Up',
    description: 'Add your menu, set prices, and configure your store preferences.',
  },
  {
    icon: BarChart3,
    step: '03',
    title: 'Start Selling',
    description: 'Go live and start receiving orders from customers.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Chioma Okafor',
    role: 'Owner, Mama Cass Kitchen',
    quote: 'Chowdeck doubled our monthly revenue within 3 months. The platform is easy to use and the support team is amazing.',
  },
  {
    name: 'Emeka Nwankwo',
    role: 'Founder, Buka Hut',
    quote: 'We went from serving our neighborhood to reaching customers across Lagos. Chowdeck made it possible.',
  },
  {
    name: 'Fatima Abdulrahman',
    role: 'Manager, Tastee Fried Rice',
    quote: 'The vendor dashboard gives us great insights into our business. We can track orders, ratings, and revenue in real time.',
  },
];

export default function VendorsPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    city: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E23E3E] to-[#b82e2e] px-4 py-20 text-center text-white lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
            For Businesses
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Start Selling on Chowdeck
          </h1>
          <p className="mt-4 text-lg text-white/80 sm:text-xl">
            Join hundreds of restaurants reaching thousands of customers across Nigeria.
          </p>
          <button
            onClick={() => {
              document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#E23E3E] shadow-lg transition hover:bg-gray-100"
          >
            Register as Vendor
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Why Sell on Chowdeck?
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900"
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

      {/* How It Works */}
      <section className="bg-white py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            How It Works
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, step, title, description }) => (
              <div key={step} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E23E3E] text-xl font-bold text-white">
                  {step}
                </div>
                <Icon className="mx-auto mb-2 h-6 w-6 text-gray-400 dark:text-gray-500" />
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
          What Vendors Say
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <Quote size={24} className="mb-3 text-[#E23E3E]/30" />
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="bg-white py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-lg px-4 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Register as a Vendor
          </h2>
          <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
            Fill out the form below and our team will reach out within 48 hours.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-2xl bg-green-50 p-8 text-center dark:bg-green-900/30">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                Application Received!
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Thank you for your interest in selling on Chowdeck. Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  required
                  placeholder="e.g. Mama Cass Kitchen"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  required
                  placeholder="Full name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="+234 800 000 0000"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Business Type
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Select type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="fast-food">Fast Food</option>
                    <option value="bakery">Bakery</option>
                    <option value="grocery">Grocery Store</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    City
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Select city</option>
                    <option value="lagos">Lagos</option>
                    <option value="abuja">Abuja</option>
                    <option value="accra">Accra</option>
                    <option value="ibadan">Ibadan</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#E23E3E] py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#d33232]"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
