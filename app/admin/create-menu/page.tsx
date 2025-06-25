import React from 'react';
import CreateMenuForm from '@/components/admin/CreateMenuForm';
import Navbar from '@/components/navigation/Navbar';

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