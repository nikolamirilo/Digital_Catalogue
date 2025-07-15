'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import SuccessModal from '@/components/admin/form/components/SuccessModal';
import { RiSparkling2Line } from "react-icons/ri";
import { revalidateData } from '@/utils/server';

export default function AiMenuForm() {
  const [prompt, setPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restaurantUrl, setRestaurantUrl] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRestaurantUrl('');

    try {
      const response = await fetch('/api/menu/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const { restaurantUrl } = await response.json();
        setRestaurantUrl(restaurantUrl);
        setShowSuccessModal(true);
        toast({
          title: 'Success!',
          description: (
            <p>
              Your menu has been created. You can view it at{' '}
              <Link href={restaurantUrl} className="text-blue-500 hover:underline">
                {restaurantUrl}
              </Link>
            </p>
          ),
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error',
          description: `Failed to create menu: ${errorData.error || 'Unknown error'}`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while submitting the prompt.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      revalidateData()
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Create Menu with AI</CardTitle>
          <CardDescription className="text-center">
            Enter a prompt to generate a menu using AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <Textarea
              placeholder="e.g., A high-end Italian restaurant with a focus on fresh pasta and seafood."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? <div className='flex flex-row gap-1 items-center justify-center animate-pulse'><RiSparkling2Line size={25}/>Generating...</div> : <div className='flex flex-row gap-1 items-center justify-center'><RiSparkling2Line size={25}/>Generate</div>}
            </Button>
          </form>
        </CardContent>
      </Card>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        restaurantUrl={restaurantUrl}
        type='ai'
      />
    </>
  );
}