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
import { ContactInfo, contactTypes, Theme } from "@/types";
import { Card } from "@/components/ui/card";
import { currencies, themes } from "@/constants/client";

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
    <Card className="space-y-8 p-6 sm:p-8 bg-white/95 border border-product-border shadow-md rounded-2xl" type="form">
      <h2 className="text-2xl sm:text-3xl font-bold text-product-foreground flex items-center gap-3" style={{ fontFamily: 'var(--font-playfair-display), var(--font-inter), serif' }}>
        <FileText className="text-product-primary" size={28}/>
        ServiceCatalogue Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            ServiceCatalogue Name<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., The Golden Spoon"
            className="border-product-border focus:border-product-primary focus:ring-product-primary/20 text-sm sm:text-base"
            required
          />
          {touched?.name && errors?.name && (
            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded-lg" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{errors.name}</div>
          )}
        </div>
        <div className="space-y-3">
          <Label htmlFor="title" className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Title (e.g., Plato ServiceCatalogue)<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Our Delicious Offerings"
            className="border-product-border focus:border-product-primary focus:ring-product-primary/20 text-sm sm:text-base"
          />
          {touched?.title && errors?.title && (
            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded-lg" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{errors.title}</div>
          )}
        </div>
        <div className="space-y-3">
          <Label htmlFor="subtitle" className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Subtitle
          </Label>
          <Textarea
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            placeholder="A short tagline or description"
            className="h-48 border-product-border focus:border-product-primary focus:ring-product-primary/20 text-sm sm:text-base"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="logo" className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Logo<span className="text-red-500 ml-1">*</span>
          </Label>
          {logoPreview ? (
            <div className="relative mt-2 w-48 h-48 rounded-lg border-2 border-product-border overflow-hidden flex items-center justify-center bg-product-background shadow-product-shadow">
              <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat w-full h-full"
                style={{
                  backgroundImage: `url('${logoPreview}')`,
                  objectFit: "cover",
                }}
              />
              <IoClose
                size={25}
                className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600 transition-colors duration-200 shadow-lg"
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
            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded-lg" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{errors.logo}</div>
          )}
        </div>
        <div className="space-y-3">
          <Label htmlFor="currency" className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Currency (e.g., USD, EUR)<span className="text-red-500 ml-1">*</span>
          </Label>
          <Select
            value={formData.currency || ""}
            onValueChange={(value) =>
              handleInputChange({
                target: { name: "currency", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <SelectTrigger className="border-product-border focus:border-product-primary focus:ring-product-primary/20">
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
            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded-lg" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{errors.currency}</div>
          )}
        </div>
        <div className="space-y-3">
          <Label htmlFor="legal_name" className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Legal Name
          </Label>
          <Input
            id="legal_name"
            type="text"
            name="legal_name"
            value={formData.legal_name}
            onChange={handleInputChange}
            placeholder="e.g., The Golden Spoon LLC"
            className="border-product-border focus:border-product-primary focus:ring-product-primary/20 text-sm sm:text-base"
          />
        </div>
        {/* Theme Selection */}
        <div className="space-y-4 col-span-full">
          <Label htmlFor="theme" className="text-product-foreground font-medium text-lg" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Theme<span className="text-red-500 ml-1">*</span>: {themes.find((t: Theme) => t.key === formData.theme)?.label || "Not Selected"}
          </Label>
          <div className="grid grid-cols-2 gap-4">
            {themes.map((themeOption) => (
              <div
                key={themeOption.key}
                className={`relative cursor-pointer rounded-xl border-2 p-2 transition-all duration-200 hover:shadow-product-hover-shadow ${
                  formData.theme === themeOption.key
                    ? "border-product-primary shadow-product-shadow bg-product-primary/5"
                    : "border-product-border hover:border-product-primary/50"
                }`}
                onClick={() =>
                  handleInputChange({
                    target: { name: "theme", value: themeOption.key },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <img
                  src={themeOption.image}
                  alt={themeOption.label}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <p className="text-center text-sm mt-2 font-medium text-product-foreground" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{themeOption.label}</p>
              </div>
            ))}
          </div>
          {touched?.theme && errors?.theme && (
            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded-lg" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{errors.theme}</div>
          )}
        </div>
        {/* Contact Information */}
        <div className="space-y-6 col-span-1 md:col-span-2">
          <h3 className="text-xl font-bold text-product-foreground flex items-center gap-3" style={{ fontFamily: 'var(--font-playfair-display), var(--font-inter), serif' }}>
            <Tag className="h-6 w-6 text-product-primary" /> Contact Information
          </h3>
          {formData.contact.map((contact, index) => (
            <div key={index} className="flex items-end gap-3 p-4 bg-product-background/50 rounded-xl border border-product-border">
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
                  <SelectTrigger className="border-product-border focus:border-product-primary focus:ring-product-primary/20">
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
                  className="border-product-border focus:border-product-primary focus:ring-product-primary/20 text-sm sm:text-base"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveContact(index)}
                className="h-10 w-10 hover:bg-red-600 hover:shadow-product-hover-shadow"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={handleAddContact}
            className="w-full py-3 text-base font-medium border-product-border hover:border-product-primary hover:bg-product-primary/5 transition-all duration-200"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Contact Field
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Step1GeneralInfo;
