import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import AiMenuForm from '@/components/admin/form/AiMenuForm';

export default function AiCreateMenuPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 py-32">
        <AiMenuForm />
      </div>
    </>
  );
}
