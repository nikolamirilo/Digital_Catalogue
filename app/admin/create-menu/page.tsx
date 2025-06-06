import React from 'react';
import CreateMenuForm from '@/components/admin/CreateMenuForm';

export default function CreateMenuPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Menu</h1>
      <CreateMenuForm />
    </div>
  );
} 