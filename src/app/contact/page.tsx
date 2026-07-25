'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { faqs } from '@/data/faqs';
import { cn } from '@/lib/utils';
import Footer from '@/components/layout/Footer';

const contactFaqs = faqs.filter((f) => f.category === 'Support').slice(0, 4);

const SOCIAL_LINKS = [
  { href: 'https://twitter.com/chowdeck', label: 'Twitter', initial: 'X' },
  { href: 'https://instagram.com/chowdeck', label: 'Instagram', initial: 'IG' },
  { href: 'https://facebook.com/chowdeck', label: 'Facebook', initial: 'FB' },
  { href: 'https://linkedin.com/company/chowdeck', label: 'LinkedIn', initial: 'in' },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-white px-4 py-16 text-center dark:bg-gray-900 lg:py-20">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-gray-500 dark:text-gray-400">
          Have a question, feedback, or need help? We&apos;d love to hear from you.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800 lg:p-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Send us a message</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              {submitted && (
                <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  Thank you! Your message has been sent. We&apos;ll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your full name"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="How can we help?"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder="Tell us more..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-[#E23E3E] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#d33232]"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Contact Info</h3>
              <div className="mt-4 space-y-4">
                <a
                  href="mailto:support@chowdeck.com"
                  className="flex items-center gap-3 text-sm text-gray-600 transition hover:text-[#E23E3E] dark:text-gray-400"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E23E3E]/10">
                    <Mail size={18} className="text-[#E23E3E]" />
                  </div>
                  support@chowdeck.com
                </a>
                <a
                  href="tel:+23480024693325"
                  className="flex items-center gap-3 text-sm text-gray-600 transition hover:text-[#E23E3E] dark:text-gray-400"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E23E3E]/10">
                    <Phone size={18} className="text-[#E23E3E]" />
                  </div>
                  +234 800 CHOWDECK
                </a>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E23E3E]/10">
                    <MapPin size={18} className="text-[#E23E3E]" />
                  </div>
                  <span>
                    15 Admiralty Way, Lekki Phase 1,
                    <br />
                    Lagos, Nigeria
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Follow Us</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Stay connected on social media.
              </p>
              <div className="mt-4 flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors hover:bg-[#E23E3E] hover:text-white dark:bg-gray-800 dark:text-gray-400 text-xs font-bold"
                  >
                    {social.initial}
                  </a>
                ))}
              </div>
            </div>

            {/* Mini FAQ */}
            {contactFaqs.length > 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Common Questions
                </h3>
                <div className="mt-4 space-y-3">
                  {contactFaqs.map((faq) => (
                    <div key={faq.id}>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href="/faq"
                  className="mt-4 inline-block text-sm font-semibold text-[#E23E3E] hover:underline"
                >
                  View all FAQs →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
