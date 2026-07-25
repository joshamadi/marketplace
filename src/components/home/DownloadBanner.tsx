'use client';

import { Smartphone } from 'lucide-react';

export default function DownloadBanner() {
  return (
    <section id="download" className="py-16 md:py-24 bg-gradient-to-br from-[#E23E3E] to-red-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Place your order in seconds
            </h2>
            <p className="text-lg text-red-100 max-w-lg">
              Download the Chowdeck app and get access to hundreds of restaurants, grocery stores, and pharmacies near you.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 inline-block border border-white/20">
              <p className="text-sm text-red-100 mb-1">Use promo code</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold tracking-wider">CDNWEB</span>
                <span className="text-sm text-red-100">— Get ₦300 off</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-900 transition-colors"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-left">
                  <span className="text-xs text-gray-300">Download on the</span>
                  <span className="block text-lg font-semibold -mt-1">App Store</span>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-900 transition-colors"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302-2.53-2.53 2.53-2.454zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <div className="text-left">
                  <span className="text-xs text-gray-300">Get it on</span>
                  <span className="block text-lg font-semibold -mt-1">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-[500px] bg-black rounded-[3rem] border-4 border-gray-700 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />
              <div className="w-full h-full bg-gradient-to-b from-[#E23E3E] to-red-900 flex flex-col items-center justify-center gap-4 p-6">
                <Smartphone className="w-16 h-16 text-white" />
                <span className="text-white font-bold text-xl text-center">Chowdeck</span>
                <span className="text-red-200 text-sm text-center">Food • Groceries • Essentials</span>
                <div className="mt-4 bg-white/20 rounded-xl px-4 py-2">
                  <span className="text-white text-sm font-mono">CDNWEB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
