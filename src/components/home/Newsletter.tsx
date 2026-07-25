'use client';

import { useState } from 'react';

const socials = [
  { name: 'Twitter', href: '#', icon: '𝕏' },
  { name: 'Instagram', href: '#', icon: '📷' },
  { name: 'Facebook', href: '#', icon: '📘' },
  { name: 'TikTok', href: '#', icon: '🎵' },
];

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Cool stuff only
        </h2>
        <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
          Get exclusive deals, new restaurant alerts, and food tips delivered to your inbox
        </p>

        {subscribed ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-green-400 font-semibold text-lg">
              🎉 You&apos;re in! Welcome to the Chowdeck family.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-12">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-[#E23E3E] focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/30 transition-all"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-[#E23E3E] text-white font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-6">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl hover:bg-[#E23E3E] transition-colors"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
