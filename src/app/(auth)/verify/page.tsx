'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import OTPVerification from '@/components/auth/OTPVerification';

function VerifyContent() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link href="/" className="inline-block">
          <span className="text-3xl font-extrabold text-[#E23E3E]">chowdeck</span>
        </Link>
      </div>
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
        <OTPVerification />
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E23E3E] border-t-transparent" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
