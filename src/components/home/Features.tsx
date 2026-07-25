'use client';

import { CheckCircle } from 'lucide-react';

const features = [
  { title: 'Quick onboarding', description: 'Sign up and start ordering in under a minute' },
  { title: 'Quality meals', description: 'Handpicked restaurants with the best food' },
  { title: 'Fresh market picks', description: 'Fresh groceries delivered from trusted vendors' },
  { title: 'Healthcare supplies', description: 'Pharmacy essentials delivered to your door' },
  { title: 'Quick-grab groceries', description: 'Everyday essentials in minutes, not hours' },
  { title: 'Live updates', description: 'Real-time tracking from kitchen to doorstep' },
  { title: 'Highly rated riders', description: 'Professional and friendly delivery riders' },
  { title: '24/7 support', description: 'We\'re always here when you need us' },
];

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Chowdeck has you covered
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need, delivered with care
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <CheckCircle className="w-8 h-8 text-[#E23E3E] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
