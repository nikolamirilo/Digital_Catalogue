import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import AiServicesForm from '@/components/admin/form/AiServicesForm';

export default function AiCreateServicesPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 py-32">
        <AiServicesForm />
      </div>
    </>
  );
}
