'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import SuccessModal from '@/components/admin/form/components/SuccessModal';
import {
  RiSparkling2Line,
  RiLightbulbLine,
  RiStore2Line,
  RiScissorsLine,
  RiHeartPulseLine,
  RiGamepadLine
} from "react-icons/ri";
import { revalidateData } from '@/utils/server';

export default function AiServicesForm() {
  const [prompt, setPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [restaurantUrl, setServiceCatalogueUrl] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServiceCatalogueUrl('');

    try {
      const response = await fetch('/api/items/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const { restaurantUrl } = await response.json();
        setServiceCatalogueUrl(restaurantUrl);
        setShowSuccessModal(true);
        toast({
          title: 'Success!',
          description: (
            <p>
              Your digital showcase has been created. You can view it at{' '}
              <Link href={restaurantUrl} className="text-primary-accent hover:underline">
                {restaurantUrl}
              </Link>
            </p>
          ),
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error',
          description: `Failed to create showcase: ${errorData.error || 'Unknown error'}`,
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
      revalidateData();
    }
  };

  const handleCloseModal = () => setShowSuccessModal(false);

  const businessExamples = [
    {
      icon: <RiStore2Line size={18} />,
      category: "Restaurant",
      prompt: "A cozy Italian restaurant with fresh pasta, wood-fired pizzas, and wine pairings in a warm, family-friendly atmosphere"
    },
    {
      icon: <RiScissorsLine size={18} />,
      category: "Beauty Salon",
      prompt: "A modern beauty salon offering haircuts, coloring, styling, manicures, and facial treatments with premium products"
    },
    {
      icon: <RiHeartPulseLine size={18} />,
      category: "Fitness Gym",
      prompt: "A fitness center with personal training, group classes, weight training, and cardio equipment for all fitness levels"
    },
    {
      icon: <RiGamepadLine size={18} />,
      category: "Entertainment",
      prompt: "A bowling alley with lane rentals, birthday parties, arcade games, and food service for families and groups"
    },
    {
      icon: <RiStore2Line size={18} />,
      category: "Café",
      prompt: "A specialty coffee shop with artisan drinks, fresh pastries, light meals, and a cozy workspace atmosphere"
    }
  ];

  return (
    <div className="min-h-screen bg-product-background p-4 text-product-foreground">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-accent text-white mb-4 shadow-md">
            <RiSparkling2Line size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-product-foreground">
            AI Business Showcase Generator
          </h1>
          <p className="text-lg text-product-foreground-accent max-w-2xl mx-auto">
            Create stunning digital showcases for your services in minutes. Perfect for restaurants, salons, gyms, and more.
          </p>
        </div>

        {/* Form Card */}
        <Card className="bg-product-background border border-product-border shadow-[var(--product-shadow)]">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-semibold flex items-center gap-2 text-product-foreground">
              <RiStore2Line className="text-product-icon" />
              Describe Your Business
            </CardTitle>
            <CardDescription className="text-product-foreground-accent">
              Tell us about your business type, services, target audience, and unique features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="prompt" className="text-sm font-medium text-product-foreground">
                  Business Description
                </label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., A modern beauty salon specializing in premium hair treatments, nail services, and skincare..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                  className="resize-none border border-product-border focus:border-product-primary focus:ring-product-primary bg-transparent text-product-foreground transition-colors"
                />
                <p className="text-xs text-product-foreground-accent">
                  {prompt.length}/500 characters
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !prompt.trim()}
                variant="cta"
                className="h-12 font-medium rounded-lg"
              >
                {isSubmitting ? (
                  <div className='flex items-center gap-2 animate-pulse'>
                    <RiSparkling2Line size={20} className="animate-spin" />
                    Creating Your Showcase...
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <RiSparkling2Line size={20} />
                    Generate Showcase
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Example Prompts */}
        <Card className="bg-product-background border border-product-border shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-product-foreground flex items-center gap-2">
              <RiLightbulbLine className="text-primary-accent" />
              Business Examples
            </CardTitle>
            <CardDescription className="text-product-foreground-accent">
              Choose your business type or get inspired
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {businessExamples.map((example, index) => (
                <Button
                  key={index}
                  onClick={() => setPrompt(example.prompt)}
                  disabled={isSubmitting}
                  variant="ghost"
                  className="text-left p-4 rounded-lg bg-transparent hover:bg-product-hover-background border border-product-border transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-accent/10 flex items-center justify-center group-hover:bg-primary-accent/20 transition-colors">
                      <span className="text-product-primary">{example.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-product-foreground group-hover:text-product-primary mb-1">
                        {example.category}
                      </div>
                      <div className="text-sm text-product-foreground-accent group-hover:text-product-primary">
                        {example.prompt}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        restaurantUrl={restaurantUrl}
        type='ai'
      />
    </div>
  );
}
