'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const greetings = [
  "You don chow?",
  "Se o ti jeun?",
  "Kun ci abinci?",
  "Have you eaten?",
];

export default function Hero() {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentGreeting((prev) => (prev + 1) % greetings.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              <span
                className={`inline-block transition-all duration-300 ${
                  isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                {greetings[currentGreeting]}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-lg">
              Order food, groceries & essentials delivered to your doorstep
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/store"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#E23E3E] text-white font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
              >
                Order Now
              </Link>
              <a
                href="#download"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-semibold text-lg hover:border-[#E23E3E] hover:text-[#E23E3E] transition-colors"
              >
                Download App
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-[#E23E3E]/20 to-orange-200/30 rounded-full flex items-center justify-center">
              <div className="text-8xl sm:text-9xl">🍲</div>
            </div>
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-lg rotate-12">
              🍔
            </div>
            <div className="absolute bottom-8 left-4 sm:bottom-12 sm:left-8 w-14 h-14 sm:w-16 sm:h-16 bg-green-400 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg -rotate-12">
              🥗
            </div>
          </div>
        </div>

        <div className="mt-12 bg-[#E23E3E] text-white rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left shadow-lg">
          <span className="text-lg font-semibold">🎉 Get ₦300 off your first order with code</span>
          <span className="bg-white text-[#E23E3E] px-4 py-1 rounded-full font-bold tracking-wider">
            CDNWEB
          </span>
        </div>
      </div>
    </section>
  );
}
