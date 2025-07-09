'use client';

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Step1GeneralInfo from "./Step1GeneralInfo";
import Step2MenuSections from "./Step2MenuSections";
import Step3MenuItems from "./Step3MenuItems";
import SuccessModal from "./SuccessModal";

import { MenuItem, ContactInfo, RestaurantFormData } from "@/types";
import { saEvent } from "@/utils/analytics";
import { useUser } from "@clerk/nextjs";

interface MenuFormBaseProps {
  type: 'create' | 'edit';
  initialData?: RestaurantFormData;
  onSuccess?: (restaurantUrl: string) => void;
}

function MenuForm({ type, initialData, onSuccess }: MenuFormBaseProps) {
  const [formData, setFormData] = useState<RestaurantFormData>(
    initialData || {
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
    }
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [restaurantUrl, setRestaurantUrl] = useState("");
  const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string }>({});
  const {user} = useUser() 

  console.log(user)
  
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
      menu: [...prev.menu, { name: "", layout: "variant_1", items: [] }],
    }));
  };

  const handleRemoveCategory = (categoryIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      menu: prev.menu.filter((_, index) => index !== categoryIndex),
    }));
  };

  const handleCategoryChange = (index: number, field: 'name' | 'layout', value: string) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[index][field] = value;
    setFormData((prev) => ({ ...prev, menu: updatedMenu }));
  };

  const handleAddItem = (categoryIndex: number) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[categoryIndex].items = [
      { name: "", description: "", price: 0, image: "" },
      ...updatedMenu[categoryIndex].items.map(item => ({ ...item, image: item.image || "" })),
    ];
    setFormData((prev) => ({ ...prev, menu: updatedMenu }));
    setImagePreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[`${categoryIndex}-0`];
      const itemsLength = updatedMenu[categoryIndex].items.length;
      for (let i = itemsLength - 1; i > 0; i--) {
        newPreviews[`${categoryIndex}-${i}`] = prev[`${categoryIndex}-${i-1}`] || "";
      }
      return newPreviews;
    });
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
    setFormData((prev) => {
      const newMenu = prev.menu.map((category, cIndex) => {
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
      return { ...prev, menu: newMenu };
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

  // Validation and touched state
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
        !!formData.theme?.trim() &&
        !!formData.logo?.trim()
      );
    }
    if (step === 2) {
      if (formData.menu.length === 0) return false;
      return formData.menu.every((category) => !!category.name.trim());
    }
    // For step 3, we can do a basic check, but detailed validation happens on submit
    if (step === 3) {
      return formData.menu.every((category) => category.items.length > 0);
    }
    return true;
  };


  const validateStep = (step: number): boolean => {
    let newErrors: { [key: string]: string } = {};
    let isValid = true;
  
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Restaurant name is required.";
      if (!formData.title?.trim()) newErrors.title = "Title is required.";
      if (!formData.currency?.trim()) newErrors.currency = "Currency is required.";
      if (!formData.theme?.trim()) newErrors.theme = "Theme is required.";
      if (!formData.logo?.trim()) newErrors.logo = "Logo is required.";
      
      setErrors(newErrors);
      setTouched({ name: true, title: true, currency: true, theme: true, logo: true });
      isValid = Object.keys(newErrors).length === 0;
    }
  
    if (step === 2) {
      if (formData.menu.length === 0) {
        setStep2Error("Please add at least one menu category.");
        isValid = false;
      } else {
        for (const category of formData.menu) {
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
      for (const category of formData.menu) {
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
  
    return isValid;
  };

  // Handle field blur for touched state
  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Remove error as soon as user fixes a field
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
    saEvent("button_click")
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(3)) {
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
      const transformedMenu = transformedFormData.menu.reduce((acc, category) => {
        const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
        acc[categorySlug] = {
          layout: category.layout,
          items: category.items,
        };
        return acc;
      }, {} as Record<string, { layout: string; items: MenuItem[] }>);
      const contactData = transformedFormData.contact;
      const method = type === 'edit' ? 'PATCH' : 'POST';
      const response = await fetch('/api/menu', {
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
        setRestaurantUrl(`/restaurants/${restaurantSlug}`);
        setShowSuccessModal(true);
        if (onSuccess) onSuccess(`/restaurants/${restaurantSlug}`);
        if (type === 'create') {
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
          <Step1GeneralInfo
            formData={formData}
            handleInputChange={handleInputChangeWithValidation}
            handleAddContact={handleAddContact}
            handleRemoveContact={handleRemoveContact}
            handleContactChange={handleContactChange}
            setFormData={setFormData}
            errors={errors}
            touched={touched}
          />
        );
      case 2:
        return (
          <Step2MenuSections
            formData={formData}
            handleAddCategory={handleAddCategory}
            handleRemoveCategory={handleRemoveCategory}
            handleCategoryChange={handleCategoryChange}
          />
        );
      case 3:
        return (
          <Step3MenuItems
            formData={formData}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            handleItemChange={handleItemChange}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-20 text-gray-900">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          {type === 'edit' ? 'Edit Your Digital Menu' : 'Create Your Digital Menu'}
        </CardTitle>
        <CardDescription className="text-center">
          Step {currentStep} of 3: {
            currentStep === 1 ? (type === 'edit' ? 'General Information' : 'General Information') :
            currentStep === 2 ? (type === 'edit' ? 'Menu Sections' : 'Menu Sections') :
            (type === 'edit' ? 'Menu Items' : 'Menu Items')
          }
        </CardDescription>
        <div className="flex justify-center space-x-2 mt-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-8 h-2 rounded-full transition-colors duration-200 ${currentStep === step ? "bg-orange-600" : "bg-gray-300"} cursor-pointer`}
              onClick={async () => {
                if (step === currentStep) return;
                if (step < currentStep) {
                  setCurrentStep(step);
                } else {
                  // Validate all steps up to the one being clicked
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
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {renderStep()}
          {currentStep === 2 && step2Error && (
            <div className="text-red-500 text-center mt-2">{step2Error}</div>
          )}
          {currentStep === 3 && step3Error && (
            <div className="text-red-500 text-center mt-2">{step3Error}</div>
          )}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}
            {currentStep < 3 && (
              <Button
                type="button"
                onClick={handleNext}
                className={`ml-auto ${!isStepValid(currentStep) ? 'bg-gray-400 hover:bg-gray-400' : ''}`}
                disabled={!isStepValid(currentStep)}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {currentStep === 3 && (
              <Button type="submit" className="py-3 px-6 text-lg" disabled={isSubmitting}>
                {isSubmitting ? (type === 'edit' ? 'Saving Changes...' : 'Creating Digital Menu...') : (type === 'edit' ? 'Save Changes' : 'Create Digital Menu')}
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
export default MenuForm;
