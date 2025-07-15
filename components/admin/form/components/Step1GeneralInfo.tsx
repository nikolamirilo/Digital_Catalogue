"use client";

import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Tag, Trash2, FileText } from "lucide-react";
import { IoClose } from "react-icons/io5";
import ImageDropzone from "@/components/common/ImageDropzone";

import { ContactInfo, contactTypes } from "@/types";
import { Card } from "@/components/ui/card";

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
  { value: "theme-elegant ", label: "Creative Light", image: "/themes/light_1.jpg" },
  { value: "theme-modern", label: "Luxury Light", image: "/themes/light_2.jpg" },
  { value: "theme-organic", label: "Creative Dark", image: "/themes/dark_1.jpg" },
  { value: "theme-luxury", label: "Luxury Dark", image: "/themes/dark_2.jpg" },
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
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => void;
  handleAddContact: () => void;
  handleRemoveContact: (index: number) => void;
  handleContactChange: (
    index: number,
    field: keyof ContactInfo,
    value: string
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors?: { [key: string]: string };
  touched?: { [key: string]: boolean };
}

const Step1GeneralInfo: React.FC<Step1GeneralInfoProps> = ({
  formData,
  handleInputChange,
  handleAddContact,
  handleRemoveContact,
  handleContactChange,
  setFormData,
  errors = {},
  touched = {},
}) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(
    formData.logo || null
  );

  return (
    <Card className="space-y-6 p-6" type="form">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <FileText className="text-orange-600" size={25}/>
        ServiceCatalogue Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">ServiceCatalogue Name<span className="text-red-500">*</span></Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., The Golden Spoon"
            required
          />
          {touched?.name && errors?.name && (
            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title (e.g., Plato ServiceCatalogue)<span className="text-red-500">*</span></Label>
          <Input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Our Delicious Offerings"
          />
          {touched?.title && errors?.title && (
            <div className="text-red-500 text-sm mt-1">{errors.title}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Textarea
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            placeholder="A short tagline or description"
            className="h-48"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logo">Logo<span className="text-red-500">*</span></Label>
          {logoPreview ? (
            <div className="relative mt-2 w-48 h-48 rounded-md border overflow-hidden flex items-center justify-center bg-gray-100">
              <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat w-full h-full"
                style={{
                  backgroundImage: `url('${logoPreview}')`,
                  objectFit: "cover",
                }}
              />
              <IoClose
                size={25}
                className="absolute top-0 right-0 z-10 bg-red-500 text-white rounded-full cursor-pointer"
                onClick={() => {
                  setLogoPreview(null);
                  setFormData((prev: any) => ({ ...prev, logo: undefined }));
                }}
              />
            </div>
          ) : (
            <div className="cursor-pointer h-48">
              <ImageDropzone
                onUploadComplete={(url) => {
                  setFormData((prev: any) => ({ ...prev, logo: url }));
                  setLogoPreview(url);
                }}
                onError={(error) => alert(`ERROR! ${error.message}`)}
                maxDim={512}
                maxSizeMB={1}
              />
            </div>
          )}
          {touched?.logo && errors?.logo && (
            <div className="text-red-500 text-sm mt-1">{errors.logo}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency (e.g., USD, EUR)<span className="text-red-500">*</span></Label>
          <Select
            value={formData.currency || ""}
            onValueChange={(value) =>
              handleInputChange({
                target: { name: "currency", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
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
          {touched?.currency && errors?.currency && (
            <div className="text-red-500 text-sm mt-1">{errors.currency}</div>
          )}
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
          <Label htmlFor="theme">
            Theme<span className="text-red-500">*</span>: {themes.find((t) => t.value === formData.theme)?.label || "Not Selected"}
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((themeOption) => (
              <div
                key={themeOption.value}
                className={`relative cursor-pointer rounded-lg border-2 p-1 ${
                  formData.theme === themeOption.value
                    ? "border-orange-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() =>
                  handleInputChange({
                    target: { name: "theme", value: themeOption.value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <img
                  src={themeOption.image}
                  alt={themeOption.label}
                  className="w-full h-24 object-cover rounded-md"
                />
                <p className="text-center text-sm mt-1">{themeOption.label}</p>
              </div>
            ))}
          </div>
          {touched?.theme && errors?.theme && (
            <div className="text-red-500 text-sm mt-1">{errors.theme}</div>
          )}
        </div>
        {/* Contact Information */}
        <div className="space-y-4 col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Tag className="h-5 w-5 text-gray-700" /> Contact Information
          </h3>
          {formData.contact.map((contact, index) => (
            <div key={index} className="flex items-end gap-2">
              <div className="flex-grow space-y-2">
                <Label htmlFor={`contact-type-${index}`} className="sr-only">
                  Contact Type
                </Label>
                <Select
                  value={contact.type}
                  onValueChange={(value) =>
                    handleContactChange(index, "type", value)
                  }
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
                <Label htmlFor={`contact-value-${index}`} className="sr-only">
                  Contact Value
                </Label>
                <Input
                  id={`contact-value-${index}`}
                  type="text"
                  placeholder="Enter value"
                  value={contact.value}
                  onChange={(e) =>
                    handleContactChange(index, "value", e.target.value)
                  }
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
    </Card>
  );
};

export default Step1GeneralInfo;
