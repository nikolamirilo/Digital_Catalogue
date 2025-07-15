import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import CreateServicesForm from '@/components/admin/form/CreateServicesForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CreateServicesPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 py-32">
        <CreateServicesForm />
      </div>
    </>
  );
}
 