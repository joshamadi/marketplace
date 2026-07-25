'use client';

import { Download, Search, ShoppingBag, PartyPopper } from 'lucide-react';

const steps = [
  {
    icon: Download,
    title: 'Download the app',
    description: 'Get Chowdeck from the App Store or Google Play Store. Quick and easy setup.',
    step: 1,
  },
  {
    icon: Search,
    title: 'Explore categories',
    description: 'Browse through hundreds of restaurants, groceries, and essentials near you.',
    step: 2,
  },
  {
    icon: ShoppingBag,
    title: 'Place your order',
    description: 'Add items to your cart, choose delivery location, and checkout in seconds.',
    step: 3,
  },
  {
    icon: PartyPopper,
    title: 'Unpack and enjoy',
    description: 'Track your order in real-time. Your food arrives fresh and hot at your door.',
    step: 4,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting your favorite meals delivered is as easy as 1-2-3-4
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.step} className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-50 mb-6 group-hover:bg-[#E23E3E] transition-colors duration-300">
                <step.icon className="w-8 h-8 text-[#E23E3E] group-hover:text-white transition-colors duration-300" />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-[#E23E3E] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                  {step.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
