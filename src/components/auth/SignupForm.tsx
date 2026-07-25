'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  agreeToTerms?: string;
}

export default function SignupForm() {
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,15}$/.test(phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Must include uppercase, lowercase, and a number';
    }
    if (!agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await signup({
        firstName,
        lastName,
        email,
        phone,
        password,
        referralCode: referralCode || undefined,
      });
      router.push('/verify');
    } catch {
      setErrors({ email: 'An account with this email already exists' });
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create an account
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Join Chowdeck and start ordering
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className={`mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm transition
                placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/50 focus:border-[#E23E3E]
                dark:bg-gray-800 dark:text-white dark:border-gray-700
                ${errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className={`mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm transition
                placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/50 focus:border-[#E23E3E]
                dark:bg-gray-800 dark:text-white dark:border-gray-700
                ${errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm transition
              placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/50 focus:border-[#E23E3E]
              dark:bg-gray-800 dark:text-white dark:border-gray-700
              ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+234 800 000 0000"
            className={`mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm transition
              placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/50 focus:border-[#E23E3E]
              dark:bg-gray-800 dark:text-white dark:border-gray-700
              ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className={`block w-full rounded-lg border px-3 py-2.5 pr-10 text-sm shadow-sm transition
                placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/50 focus:border-[#E23E3E]
                dark:bg-gray-800 dark:text-white dark:border-gray-700
                ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          <p className="mt-1 text-xs text-gray-400">
            At least 8 characters with uppercase, lowercase, and a number
          </p>
        </div>

        <div>
          <label htmlFor="referral" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Referral code <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="referral"
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            placeholder="Enter referral code"
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm transition
              placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/50 focus:border-[#E23E3E]
              dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
        </div>

        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#E23E3E] focus:ring-[#E23E3E] cursor-pointer"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              I agree to the{' '}
              <button type="button" className="text-[#E23E3E] hover:underline">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-[#E23E3E] hover:underline">
                Privacy Policy
              </button>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="mt-1 text-xs text-red-500">{errors.agreeToTerms}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-[#E23E3E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d33232] focus:outline-none focus:ring-2 focus:ring-[#E23E3E]/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating account...
            </span>
          ) : (
            'Create account'
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="font-semibold text-[#E23E3E] hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
