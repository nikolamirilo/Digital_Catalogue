'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, Edit, Plus } from "lucide-react";
import Step2Categories from "./Step2Categories";
import Step3Services from "./Step3Services";
import Step4Branding from "./Step4Branding";
import SuccessModal from "./SuccessModal";

import { ServicesItem, ContactInfo, ServicesFormData } from "@/types";
import { saEvent } from "@/utils/analytics";
import { useUser } from "@clerk/nextjs";
import Step1General from "./Step1General";

interface MenuFormBaseProps {
  type: 'create' | 'edit';
  initialData?: ServicesFormData;
  onSuccess?: (restaurantUrl: string) => void;
}

function MenuForm({ type, initialData, onSuccess }: MenuFormBaseProps) {
  const [formData, setFormData] = useState<ServicesFormData>(
    initialData || {
      name: "",
      theme: "",
      logo: "",
      layout: "",
      title: "",
      currency: "",
      contact: [],
      subtitle: "",
      services: [],
      legal: undefined,
      configuration: undefined,
    }
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [restaurantUrl, setServiceCatalogueUrl] = useState("");
  const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string }>({});
  const { user } = useUser();

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = () => {
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, { name: "", layout: "variant_1", items: [] }],
    }));
  };

  const handleRemoveCategory = (categoryIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, index) => index !== categoryIndex),
    }));
  };

  const handleCategoryChange = (index: number, field: 'name' | 'layout', value: string) => {
    const updatedServices = [...formData.services];
    updatedServices[index][field] = value;
    setFormData((prev) => ({ ...prev, services: updatedServices }));
  };

  const handleAddItem = (categoryIndex: number) => {
    const updatedServices = [...formData.services];
    updatedServices[categoryIndex].items = [
      { name: "", description: "", price: 0, image: "" },
      ...updatedServices[categoryIndex].items.map(item => ({ ...item, image: item.image || "" })),
    ];
    setFormData((prev) => ({ ...prev, services: updatedServices }));
    setImagePreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[`${categoryIndex}-0`];
      const itemsLength = updatedServices[categoryIndex].items.length;
      for (let i = itemsLength - 1; i > 0; i--) {
        newPreviews[`${categoryIndex}-${i}`] = prev[`${categoryIndex}-${i - 1}`] || "";
      }
      return newPreviews;
    });
  };

  const handleRemoveItem = (categoryIndex: number, itemIndex: number) => {
    const updatedServices = [...formData.services];
    updatedServices[categoryIndex].items = updatedServices[categoryIndex].items.filter(
      (_, index) => index !== itemIndex
    );
    setFormData((prev) => ({ ...prev, services: updatedServices }));
  };

  const handleItemChange = (
    categoryIndex: number,
    itemIndex: number,
    field: keyof ServicesItem,
    value: string | number
  ) => {
    setFormData((prev) => {
      const newServices = prev.services.map((category, cIndex) => {
        if (cIndex !== categoryIndex) {
          return category;
        }
        return {
          ...category,
          items: category.items.map((item, iIndex) => {
            if (iIndex !== itemIndex) {
              return item;
            }
            return {
              ...item,
              [field]: value,
            };
          }),
        };
      });
      return { ...prev, services: newServices };
    });
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [step2Error, setStep2Error] = useState<string>("");
  const [step3Error, setStep3Error] = useState<string>("");

  const isStepValid = (step: number): boolean => {
    if (step === 1) {
      return (
        !!formData.name.trim() &&
        !!formData.title?.trim() &&
        !!formData.currency?.trim() &&
        !!formData.theme?.trim()
      );
    }
    if (step === 2) {
      if (formData.services.length === 0) return false;
      return formData.services.every((category) => !!category.name.trim());
    }
    if (step === 3) {
      return formData.services.every((category) => category.items.length > 0);
    }
    if (step === 4) {
      return !!formData.logo?.trim();
    }
    return true;
  };

  const validateStep = (step: number): boolean => {
    let newErrors: { [key: string]: string } = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "ServiceCatalogue name is required.";
      if (!formData.title?.trim()) newErrors.title = "Title is required.";
      if (!formData.currency?.trim()) newErrors.currency = "Currency is required.";
      if (!formData.theme?.trim()) newErrors.theme = "Theme is required.";
      
      setErrors(newErrors);
      setTouched({ name: true, title: true, currency: true, theme: true });
      isValid = Object.keys(newErrors).length === 0;
    }

    if (step === 2) {
      if (formData.services.length === 0) {
        setStep2Error("Please add at least one menu category.");
        isValid = false;
      } else {
        for (const category of formData.services) {
          if (!category.name.trim()) {
            setStep2Error("All menu categories must have a name.");
            isValid = false;
            break;
          }
        }
      }
      if (isValid) setStep2Error("");
    }

    if (step === 3) {
      for (const category of formData.services) {
        if (category.items.length === 0) {
          setStep3Error(`Category "${category.name}" must have at least one menu item.`);
          isValid = false;
          break;
        }
        for (const item of category.items) {
          if (!item.name.trim()) {
            setStep3Error(`All items in category "${category.name}" must have a name.`);
            isValid = false;
            break;
          }
          if (!item.description.trim()) {
            setStep3Error(`All items in category "${category.name}" must have a description.`);
            isValid = false;
            break;
          }
          if (item.price <= 0) {
            setStep3Error(`Price for item "${item.name}" in category "${category.name}" must be greater than 0.`);
            isValid = false;
            break;
          }
          if (category.layout !== "variant_3" && !item.image?.trim()) {
            setStep3Error(`Image for item "${item.name}" in category "${category.name}" is required for this layout.`);
            isValid = false;
            break;
          }
        }
        if (!isValid) break;
      }
      if (isValid) setStep3Error("");
    }

    if (step === 4) {
      if (!formData.logo?.trim()) newErrors.logo = "Logo is required.";
      setErrors(newErrors);
      setTouched({ logo: true });
      isValid = Object.keys(newErrors).length === 0;
    }

    return isValid;
  };

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleInputChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    handleInputChange(e);
    if (errors[name] && value.trim()) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
    saEvent("button_click");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    if (!validateStep(4)) {
      toast({
        title: "Validation Error",
        description: `Please complete all steps and ensure all fields are valid.`,
        variant: "destructive",
      });
      return;
    }
    if (!user || !user.id) {
      toast({
        title: "Authentication Error",
        description: "You must be signed in to create or edit a menu.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(true);

    try {
      const transformedFormData = { ...formData };
      const restaurantSlug = transformedFormData.name.toLowerCase().replace(/\s+/g, '-');
      transformedFormData.name = restaurantSlug;
      const transformedMenu = transformedFormData.services.reduce((acc, category) => {
        const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
        acc[categorySlug] = {
          layout: category.layout,
          items: category.items,
        };
        return acc;
      }, {} as Record<string, { layout: string; items: ServicesItem[] }>);
      const contactData = transformedFormData.contact;
      const method = type === 'edit' ? 'PATCH' : 'POST';
      const response = await fetch('/api/items', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...transformedFormData,
          created_by: user.id,
          contact: contactData,
          menu: transformedMenu,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        setServiceCatalogueUrl(`/service-catalogues/${restaurantSlug}`);
        setShowSuccessModal(true);
        if (onSuccess) onSuccess(`/service-catalogues/${restaurantSlug}`);
        if (type === 'create') {
          setFormData({
            name: "",
            theme: "",
            logo: "",
            layout: "",
            title: "",
            currency: "",
            contact: [],
            subtitle: "",
            services: [],
            legal: undefined,
            configuration: undefined,
          });
          setCurrentStep(1);
        }
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: `Failed to ${type === 'edit' ? 'edit' : 'create'} menu: ${errorData.error || "Unknown error"}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `An error occurred while submitting the form.`,
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
          <Step1General
            formData={formData}
            handleInputChange={handleInputChangeWithValidation}
            setFormData={setFormData}
            errors={errors}
            touched={touched}
          />
        );
      case 2:
        return (
          <Step2Categories
            formData={formData}
            handleAddCategory={handleAddCategory}
            handleRemoveCategory={handleRemoveCategory}
            handleCategoryChange={handleCategoryChange}
          />
        );
      case 3:
        return (
          <Step3Services
            formData={formData}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            handleItemChange={handleItemChange}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
          />
        );
      case 4:
        return (
          <Step4Branding
            formData={formData}
            handleInputChange={handleInputChangeWithValidation}
            handleAddContact={handleAddContact}
            handleRemoveContact={handleRemoveContact}
            handleContactChange={handleContactChange}
            setFormData={setFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/95 border border-product-border shadow-md rounded-3xl">
      <Card className="w-full h-full bg-transparent border-0 shadow-none rounded-none backdrop-blur-none" type="form">
        <CardHeader className="p-6 sm:p-8">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-product-foreground" style={{ fontFamily: 'var(--font-playfair-display), var(--font-inter), serif' }}>
            {type === 'edit' ? 'Edit Your Service Catalogue' : 'Create Your Service Catalogue'}
          </CardTitle>
          <CardDescription className="text-center text-product-foreground-accent text-base sm:text-lg mt-2" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Step {currentStep} of 4: {
              currentStep === 1 ? 'General Information' :
              currentStep === 2 ? 'Menu Sections' :
              currentStep === 3 ? 'Menu Items' :
              'Branding'
            }
          </CardDescription>
          <div className="flex justify-center space-x-3 mt-6">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-10 h-2 rounded-full transition-all duration-300 ${currentStep === step ? "bg-product-primary shadow-product-shadow" : "bg-product-border"} cursor-pointer hover:bg-product-primary/80 hover:shadow-product-hover-shadow`}
                onClick={async () => {
                  if (step === currentStep) return;
                  if (step < currentStep) {
                    setCurrentStep(step);
                  } else {
                    let valid = true;
                    for (let s = 1; s < step; s++) {
                      if (!validateStep(s)) {
                        valid = false;
                        setCurrentStep(s);
                        break;
                      }
                    }
                    if (valid) setCurrentStep(step);
                  }
                }}
                title={`Go to step ${step}`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStep()}
            {currentStep === 2 && step2Error && (
              <div className="text-red-500 text-center mt-4 p-3 bg-red-50 border border-red-200 rounded-lg" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{step2Error}</div>
            )}
            {currentStep === 3 && step3Error && (
              <div className="text-red-500 text-center mt-4 p-3 bg-red-50 border border-red-200 rounded-lg" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{step3Error}</div>
            )}
            <div className="flex justify-between mt-8 pt-6 border-t border-product-border">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handlePrevious} className="px-6 py-3 text-base font-medium">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Previous
                </Button>
              )}
              {currentStep < 4 && (
                <Button
                  type="button"
                  onClick={handleNext}
                  className={`ml-auto px-6 py-3 text-base font-medium ${!isStepValid(currentStep) ? 'bg-product-border text-product-foreground-accent hover:bg-product-border cursor-not-allowed' : 'bg-product-primary hover:bg-product-primary-accent hover:shadow-product-hover-shadow hover:scale-[1.02] hover:transform hover:-translate-y-1'}`}
                  disabled={!isStepValid(currentStep)}
                >
                  Next <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              {currentStep === 4 && (
                <Button type="submit" disabled={isSubmitting} className="flex items-center justify-center px-8 py-3 text-base font-semibold bg-product-primary hover:bg-product-primary-accent hover:shadow-product-hover-shadow hover:scale-[1.02] hover:transform hover:-translate-y-1 transition-all duration-300">
                  {type === 'edit' ? <Edit className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                  {isSubmitting ? (type === 'edit' ? 'Saving...' : 'Creating...') : (type === 'edit' ? 'Save Changes' : 'Create Service Catalogue')}
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
    </div>
  );
}
export default MenuForm;
