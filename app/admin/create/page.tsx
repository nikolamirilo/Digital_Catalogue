import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import CreateServicesForm from '@/components/admin/form/CreateServicesForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CreateServicesPage() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen px-2 md:px-8 pt-24 pb-12 bg-gradient-to-br from-product-background to-hero-product-background animate-fade-in">
        <div className="container mx-auto flex flex-col px-4 gap-8">
          <div className="flex-1 w-full bg-white/95 shadow-product-shadow rounded-3xl p-4 sm:p-6 md:p-10 relative z-10">
            <CreateServicesForm />
          </div>
        </div>
      </div>
    </>
  );
}
 