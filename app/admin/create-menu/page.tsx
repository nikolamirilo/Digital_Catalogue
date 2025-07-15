import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import CreateMenuForm from '@/components/admin/form/CreateMenuForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CreateMenuPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 py-32">
        <div className="flex justify-end mb-4">
          <Link href="/admin/create-menu/ai">
            <Button>Create with AI</Button>
          </Link>
        </div>
        <CreateMenuForm />
      </div>
    </>
  );
} 