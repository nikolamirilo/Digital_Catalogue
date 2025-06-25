"use client";
import { SignIn, SignUp } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  return (
    <div className="flex justify-center items-center min-h-screen">
      {mode === 'signup' ? <SignUp /> : <SignIn />}
    </div>
  );
} 