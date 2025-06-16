'use client';

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Link from "next/link";

// Import step components
import Step1GeneralInfo from "./CreateMenuForm/Step1GeneralInfo";
import Step2MenuSections from "./CreateMenuForm/Step2MenuSections";
import Step3MenuItems from "./CreateMenuForm/Step3MenuItems";
import SuccessModal from "./CreateMenuForm/SuccessModal";

import { MenuItem, MenuCategory, ContactInfo, RestaurantFormData, contactTypes } from "@/types";

export default function CreateMenuForm() {
  const [formData, setFormData] = useState<RestaurantFormData>({
    name: "",
    theme: "",
    logo: "",
    layout: "",
    title: "",
    currency: "",
    legal_name: "",
    contact: [],
    subtitle: "",
    menu: [],
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [restaurantUrl, setRestaurantUrl] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = () => {
    setFormData((prev) => ({
      ...prev,
      menu: [...prev.menu, { name: "", items: [] }],
    }));
  };

  const handleRemoveCategory = (categoryIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      menu: prev.menu.filter((_, index) => index !== categoryIndex),
    }));
  };

  const handleCategoryNameChange = (index: number, value: string) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[index].name = value;
    setFormData((prev) => ({ ...prev, menu: updatedMenu }));
  };

  const handleAddItem = (categoryIndex: number) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[categoryIndex].items.push({ name: "", description: "", price: 0, image: "" });
    setFormData((prev) => ({ ...prev, menu: updatedMenu }));
  };

  const handleRemoveItem = (categoryIndex: number, itemIndex: number) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[categoryIndex].items = updatedMenu[categoryIndex].items.filter(
      (_, index) => index !== itemIndex
    );
    setFormData((prev) => ({ ...prev, menu: updatedMenu }));
  };

  const handleItemChange = (
    categoryIndex: number,
    itemIndex: number,
    field: keyof MenuItem,
    value: string | number
  ) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[categoryIndex].items[itemIndex] = {
      ...updatedMenu[categoryIndex].items[itemIndex],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, menu: updatedMenu }));
  };

  const handleAddContact = () => {
    setFormData((prev) => ({
      ...prev,
      contact: [...prev.contact, { type: "", value: "" }],
    }));
  };

  const handleRemoveContact = (contactIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      contact: prev.contact.filter((_, index) => index !== contactIndex),
    }));
  };

  const handleContactChange = (index: number, field: keyof ContactInfo, value: string) => {
    const updatedContact = [...formData.contact];
    updatedContact[index] = { ...updatedContact[index], [field]: value };
    setFormData((prev) => ({ ...prev, contact: updatedContact }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          toast({
            title: "Validation Error",
            description: "Restaurant name is required.",
            variant: "destructive",
          });
          return false;
        }
        for (const contact of formData.contact) {
          if (!contact.type.trim() || !contact.value.trim()) {
            toast({
              title: "Validation Error",
              description: "All contact fields must have a type and a value.",
              variant: "destructive",
            });
            return false;
          }
        }
        return true;
      case 2:
        if (formData.menu.length === 0) {
          toast({
            title: "Validation Error",
            description: "Please add at least one menu category.",
            variant: "destructive",
          });
          return false;
        }
        for (const category of formData.menu) {
          if (!category.name.trim()) {
            toast({
              title: "Validation Error",
              description: "All menu categories must have a name.",
              variant: "destructive",
            });
            return false;
          }
        }
        return true;
      case 3:
        for (const category of formData.menu) {
          if (category.items.length === 0) {
            toast({
              title: "Validation Error",
              description: `Category "${category.name}" must have at least one menu item.`,
              variant: "destructive",
            });
            return false;
          }

          for (const item of category.items) {
            if (!item.name.trim()) {
              toast({
                title: "Validation Error",
                description: `All items in category "${category.name}" must have a name.`,
                variant: "destructive",
              });
              return false;
            }
            if (!item.description.trim()) {
              toast({
                title: "Validation Error",
                description: `All items in category "${category.name}" must have a description.`,
                variant: "destructive",
              });
              return false;
            }
            if (item.price <= 0) {
              toast({
                title: "Validation Error",
                description: `Price for item "${item.name}" in category "${category.name}" must be greater than 0.`,
                variant: "destructive",
              });
              return false;
            }
            if (!item.image.trim()) {
              toast({
                title: "Validation Error",
                description: `Image URL for item "${item.name}" in category "${category.name}" is required.`,
                variant: "destructive",
              });
              return false;
            }
            try {
              new URL(item.image);
            } catch {
              toast({
                title: "Validation Error",
                description: `Please enter a valid image URL for item "${item.name}" in category "${category.name}".`,
                variant: "destructive",
              });
              return false;
            }
          }
        }
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateStep(3)) {
      toast({
        title: "Validation Error",
        description: "Please complete all steps and ensure all fields are valid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting form data:', formData);

    try {
      const created_by_placeholder = '550e8400-e29b-41d4-a716-446655440000';

      const transformedFormData = { ...formData };

      // Transform restaurant name
      const restaurantSlug = transformedFormData.name.toLowerCase().replace(/\s+/g, '-');
      transformedFormData.name = restaurantSlug;

      // Transform category names and restructure menu
      const transformedMenu = transformedFormData.menu.reduce((acc, category) => {
        const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
        acc[categorySlug] = category.items;
        return acc;
      }, {} as Record<string, MenuItem[]>);

      const contactData = transformedFormData.contact;

      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...transformedFormData,
          created_by: created_by_placeholder,
          contact: contactData,
          menu: transformedMenu,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Menu created successfully:', result);
        setRestaurantUrl(`/restaurants/${restaurantSlug}`);
        setShowSuccessModal(true);
        setFormData({
          name: "",
          theme: "",
          logo: "",
          layout: "",
          title: "",
          currency: "",
          legal_name: "",
          contact: [],
          subtitle: "",
          menu: [],
        });
        setCurrentStep(1);
      } else {
        const errorData = await response.json();
        console.error('Failed to create menu:', errorData);
        toast({
          title: "Error",
          description: `Failed to create menu: ${errorData.error || "Unknown error"}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "An error occurred while submitting the form.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1GeneralInfo
            formData={formData}
            handleInputChange={handleInputChange}
            handleAddContact={handleAddContact}
            handleRemoveContact={handleRemoveContact}
            handleContactChange={handleContactChange}
          />
        );
      case 2:
        return (
          <Step2MenuSections
            formData={formData}
            handleAddCategory={handleAddCategory}
            handleRemoveCategory={handleRemoveCategory}
            handleCategoryNameChange={handleCategoryNameChange}
          />
        );
      case 3:
        return (
          <Step3MenuItems
            formData={formData}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            handleItemChange={handleItemChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Create Your Digital Menu</CardTitle>
        <CardDescription className="text-center">
          Step {currentStep} of 3: {
            currentStep === 1 ? "Define General Information" :
            currentStep === 2 ? "Define Menu Sections" :
            "Define Menu Items"
          }
        </CardDescription>
        <div className="flex justify-center space-x-2 mt-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-8 h-2 rounded-full ${currentStep === step ? "bg-indigo-600" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {renderStep()}

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}

            {currentStep < 3 && (
              <Button type="button" onClick={handleNext} className="ml-auto">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}

            {currentStep === 3 && (
              <Button type="submit" className="py-3 px-6 text-lg" disabled={isSubmitting}>
                {isSubmitting ? "Creating Digital Menu..." : "Create Digital Menu"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        restaurantUrl={restaurantUrl}
      />
    </Card>
  );
} 