import type { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In - Chowdeck',
  description: 'Sign in to your Chowdeck account to order food and groceries.',
};

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link href="/" className="inline-block">
          <span className="text-3xl font-extrabold text-[#E23E3E]">chowdeck</span>
        </Link>
      </div>
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
        <LoginForm />
      </div>
    </div>
  );
}
