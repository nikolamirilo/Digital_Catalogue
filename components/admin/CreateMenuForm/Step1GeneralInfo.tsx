"use client";

import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Tag, Trash2, FileText } from "lucide-react";
import { UploadDropzone } from "@/utils/uploadthing";

import { ContactInfo, contactTypes } from "@/types";

const currencies = [
  { value: "USD", label: "USD - United States Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "CHF", label: "CHF - Swiss Franc" },
  { value: "CNY", label: "CNY - Chinese Yuan" },
  { value: "RUB", label: "RUB - Russian Ruble" },
  { value: "RSD", label: "RSD - Serbian Dinar" },
];

const themes = [
  { value: "light_1", label: "Light Theme 1", image: "/themes/dark.png" },
  { value: "light_2", label: "Light Theme 2", image: "/themes/dark.png" },
  { value: "dark_1", label: "Dark Theme 1", image: "/themes/dark.png" },
  { value: "dark_2", label: "Dark Theme 2", image: "/themes/dark.png" },
];

const layouts = [
  { value: "variant_1", label: "Layout Variant 1", image: "/layouts/1.png" },
  { value: "variant_2", label: "Layout Variant 2", image: "/layouts/1.png" },
  { value: "variant_3", label: "Layout Variant 3", image: "/layouts/4.png" },
  { value: "variant_4", label: "Layout Variant 4", image: "/layouts/4.png" },
];

interface Step1GeneralInfoProps {
  formData: {
    name: string;
    theme?: string;
    logo?: string;
    layout?: string;
    title?: string;
    currency?: string;
    legal_name?: string;
    contact: ContactInfo[];
    subtitle?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => void;
  handleAddContact: () => void;
  handleRemoveContact: (index: number) => void;
  handleContactChange: (index: number, field: keyof ContactInfo, value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Step1GeneralInfo: React.FC<Step1GeneralInfoProps> = ({
  formData,
  handleInputChange,
  handleAddContact,
  handleRemoveContact,
  handleContactChange,
  setFormData,
}) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(formData.logo || null);

  return (
    <div className="space-y-6 p-6 border rounded-lg shadow-sm bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <FileText className="h-6 w-6 text-indigo-600" />
        Restaurant Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Restaurant Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., The Golden Spoon"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title (e.g., Our Menu)</Label>
          <Input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Our Delicious Offerings"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Textarea
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            placeholder="A short tagline or description"
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logo">Logo</Label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res && res.length > 0 && res[0].url) {
                console.log("Logo upload complete, URL:", res[0].url);
                setFormData((prev: any) => ({ ...prev, logo: res[0].url }));
                setLogoPreview(res[0].url);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          {logoPreview && (
            <div className="mt-2">
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="w-24 h-24 object-contain rounded-md border"
              />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency (e.g., USD, EUR)</Label>
          <Select
            value={formData.currency || ""}
            onValueChange={(value) => handleInputChange({ target: { name: "currency", value } } as React.ChangeEvent<HTMLInputElement>)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="legal_name">Legal Name</Label>
          <Input
            id="legal_name"
            type="text"
            name="legal_name"
            value={formData.legal_name}
            onChange={handleInputChange}
            placeholder="e.g., The Golden Spoon LLC"
          />
        </div>
        {/* Theme Selection */}
        <div className="space-y-2 col-span-full">
          <Label htmlFor="theme">Theme: {themes.find(t => t.value === formData.theme)?.label || 'Not Selected'}</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {themes.map((themeOption) => (
              <div
                key={themeOption.value}
                className={`relative cursor-pointer rounded-lg border-2 p-1 ${formData.theme === themeOption.value ? "border-indigo-600" : "border-gray-200 hover:border-gray-300"}`}
                onClick={() => handleInputChange({ target: { name: "theme", value: themeOption.value } } as React.ChangeEvent<HTMLInputElement>)}
              >
                <img src={themeOption.image} alt={themeOption.label} className="w-full h-24 object-cover rounded-md" />
                <p className="text-center text-sm mt-1">{themeOption.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Layout Selection */}
        <div className="space-y-2 col-span-full">
          <Label htmlFor="layout">Layout: {layouts.find(l => l.value === formData.layout)?.label || 'Not Selected'}</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {layouts.map((layoutOption) => (
              <div
                key={layoutOption.value}
                className={`relative cursor-pointer rounded-lg border-2 p-1 ${formData.layout === layoutOption.value ? "border-indigo-600" : "border-gray-200 hover:border-gray-300"}`}
                onClick={() => handleInputChange({ target: { name: "layout", value: layoutOption.value } } as React.ChangeEvent<HTMLInputElement>)}
              >
                <img src={layoutOption.image} alt={layoutOption.label} className="w-full h-24 object-cover rounded-md" />
                <p className="text-center text-sm mt-1">{layoutOption.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Contact Information */}
        <div className="space-y-4 col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Tag className="h-5 w-5 text-gray-700" /> Contact Information
          </h3>
          {formData.contact.map((contact, index) => (
            <div key={index} className="flex items-end gap-2">
              <div className="flex-grow space-y-2">
                <Label htmlFor={`contact-type-${index}`} className="sr-only">Contact Type</Label>
                <Select
                  value={contact.type}
                  onValueChange={(value) => handleContactChange(index, "type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contactTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-grow space-y-2">
                <Label htmlFor={`contact-value-${index}`} className="sr-only">Contact Value</Label>
                <Input
                  id={`contact-value-${index}`}
                  type="text"
                  placeholder="Enter value"
                  value={contact.value}
                  onChange={(e) => handleContactChange(index, "value", e.target.value)}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveContact(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={handleAddContact}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Contact Field
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step1GeneralInfo;
