"use client";
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SignIn, SignUp, useAuth } from '@clerk/nextjs';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/admin/dashboard');
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {mode === 'signup' ? <SignUp afterSignOutUrl='/' /> : <SignIn afterSignOutUrl='/' />}
    </div>
  );
}
