import type { Metadata } from 'next';
import Link from 'next/link';
import SignupForm from '@/components/auth/SignupForm';

export const metadata: Metadata = {
  title: 'Create Account - Chowdeck',
  description: 'Sign up for Chowdeck and start ordering your favourite meals.',
};

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link href="/" className="inline-block">
          <span className="text-3xl font-extrabold text-[#E23E3E]">chowdeck</span>
        </Link>
      </div>
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
        <SignupForm />
      </div>
    </div>
  );
}
