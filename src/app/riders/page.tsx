'use client';

import { useState } from 'react';
import {
  Clock,
  Wallet,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Bike,
  FileCheck,
  ShieldCheck,
  MapPin,
  Quote,
} from 'lucide-react';
import Footer from '@/components/layout/Footer';

const BENEFITS = [
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Work when you want. Set your own schedule and deliver at your pace.',
  },
  {
    icon: Wallet,
    title: 'Good Earnings',
    description: 'Earn competitive pay per delivery with tips and bonuses on top.',
  },
  {
    icon: UserCheck,
    title: 'Be Your Own Boss',
    description: 'No boss, no office. Just you, the road, and your bike.',
  },
];

const STEPS = [
  {
    icon: FileCheck,
    step: '01',
    title: 'Apply',
    description: 'Submit your details and required documents online.',
  },
  {
    icon: ShieldCheck,
    step: '02',
    title: 'Verify',
    description: 'We verify your documents and bike registration.',
  },
  {
    icon: Bike,
    step: '03',
    title: 'Start Earning',
    description: 'Go online and start accepting delivery requests.',
  },
];

const REQUIREMENTS = [
  'Valid government-issued ID (NIN, Driver\'s License, or Voter\'s Card)',
  'Functional motorcycle or bicycle',
  'Valid vehicle registration and insurance',
  'Proof of address (utility bill or bank statement)',
  'Smartphone with internet access',
  'Minimum age of 18 years',
];

const TESTIMONIALS = [
  {
    name: 'Tunde Adesanya',
    role: 'Rider since 2023',
    quote: 'Chowdeck gave me the freedom to work on my own terms. I earn well and the app is easy to use.',
  },
  {
    name: 'Aisha Bello',
    role: 'Rider since 2024',
    quote: 'I deliver part-time while studying. The flexible hours make it perfect for students.',
  },
  {
    name: 'Obinna Chukwu',
    role: 'Rider since 2023',
    quote: 'Best gig economy platform in Nigeria. Riders are treated well and payments are always on time.',
  },
];

export default function RidersPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    vehicleType: '',
    vehicleReg: '',
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
          <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-white" />
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
            For Riders
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Deliver Happiness
          </h1>
          <p className="mt-4 text-lg text-white/80 sm:text-xl">
            Join Chowdeck as a rider. Earn on your terms, deliver with a smile.
          </p>
          <button
            onClick={() => {
              document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#E23E3E] shadow-lg transition hover:bg-gray-100"
          >
            Join as Rider
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Why Ride with Chowdeck?
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

      {/* Requirements */}
      <section className="mx-auto max-w-4xl px-4 py-16 lg:px-8 lg:py-24">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Requirements
        </h2>
        <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <ul className="space-y-4">
            {REQUIREMENTS.map((req) => (
              <li key={req} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#E23E3E]" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            What Riders Say
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
        </div>
      </section>

      {/* Registration Form */}
      <section id="join" className="mx-auto max-w-lg px-4 py-16 lg:px-8 lg:py-24">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Join as a Rider
        </h2>
        <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
          Fill out the form below and we&apos;ll be in touch.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-2xl bg-green-50 p-8 text-center dark:bg-green-900/30">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
              Application Received!
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Thank you for your interest. Our rider onboarding team will contact you within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                placeholder="As it appears on your ID"
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
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Vehicle Type
                </label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select vehicle</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="bicycle">Bicycle</option>
                  <option value="car">Car</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Vehicle Registration Number
              </label>
              <input
                type="text"
                value={formData.vehicleReg}
                onChange={(e) => setFormData({ ...formData, vehicleReg: e.target.value })}
                required
                placeholder="e.g. Lagos ABC 123 DE"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#E23E3E] py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#d33232]"
            >
              Submit Application
            </button>
          </form>
        )}
      </section>

      <Footer />
    </div>
  );
}
