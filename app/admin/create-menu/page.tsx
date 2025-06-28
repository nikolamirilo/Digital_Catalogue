import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import CreateMenuForm from '@/components/admin/form/CreateMenuForm';

export default function CreateMenuPage() {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      <CreateMenuForm />
    </div>
    </>
  );
} 