'use client';

import Link from 'next/link';

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

const CUSTOMER_LINKS = [
  { label: 'Vendors', href: '/vendors' },
  { label: 'Riders', href: '/riders' },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
];

const CUISINE_LINKS = [
  { label: 'Pasta', href: '/cuisines/pasta' },
  { label: 'Rice', href: '/cuisines/rice' },
  { label: 'Fast Food', href: '/cuisines/fast-food' },
  { label: 'Soup & Stew', href: '/cuisines/soup-stew' },
  { label: 'Grills', href: '/cuisines/grills' },
  { label: 'Snacks', href: '/cuisines/snacks' },
];

const POPULAR_LINKS = [
  { label: 'Lagos', href: '/lagos' },
  { label: 'Abuja', href: '/abuja' },
  { label: 'Accra', href: '/accra' },
  { label: 'Ibadan', href: '/ibadan' },
  { label: 'Port Harcourt', href: '/port-harcourt' },
];

const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com/chowdeck', initial: 'X' },
  { label: 'Instagram', href: 'https://instagram.com/chowdeck', initial: 'IG' },
  { label: 'Facebook', href: 'https://facebook.com/chowdeck', initial: 'FB' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/chowdeck', initial: 'in' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Top Sections */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#E23E3E]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customers */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Customers
            </h3>
            <ul className="space-y-2.5">
              {CUSTOMER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#E23E3E]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Cuisines
            </h3>
            <ul className="space-y-2.5">
              {CUISINE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#E23E3E]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Popular
            </h3>
            <ul className="space-y-2.5">
              {POPULAR_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#E23E3E]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gray-700/60" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo + Copyright */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <span className="text-xl font-extrabold text-[#E23E3E]">chowdeck</span>
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Chowdeck. All rights reserved.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="rounded-full bg-gray-800 p-2.5 text-gray-400 transition-colors hover:bg-[#E23E3E] hover:text-white text-xs font-bold"
              >
                {social.initial}
              </a>
            ))}
          </div>

          {/* App Download Badges */}
          <div className="flex items-center gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.chowdeck"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.396 12l2.302-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
              </svg>
              Google Play
            </a>
            <a
              href="https://apps.apple.com/app/chowdeck/id1490679018"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
