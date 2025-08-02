'use client';
//@ts-ignore
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Tag, Trash2, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServicesFormData, ContactInfo } from '@/types';
import ImageDropzone from '@/components/common/ImageDropzone';
import { Switch } from '@/components/ui/switch';
import { contactTypes } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IoClose, IoDiamondOutline } from 'react-icons/io5';
import { useUserAndPricing } from '@/hooks/useUserAndPricing';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Step4BrandingProps {
  formData: ServicesFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => void;
  handleAddContact: () => void;
  handleRemoveContact: (index: number) => void;
  handleContactChange: (index: number, field: keyof ContactInfo, value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<ServicesFormData>>;
  errors?: { [key: string]: string };
  touched?: { [key: string]: boolean };
}

const Step4Branding: React.FC<Step4BrandingProps> = ({
  formData,
  handleInputChange,
  handleAddContact,
  handleRemoveContact,
  handleContactChange,
  setFormData,
  touched,
  errors
}) => {
  const { pricingPlan, loading } = useUserAndPricing();
  const isFreePlan = pricingPlan?.name === "free";
  
  const [logoPreview, setLogoPreview] = useState<string | null>(
    formData.logo || null
  );

  const handleCtaChange = (ctaType: 'ctaFooter' | 'ctaNavbar', field: 'url' | 'label', value: string) => {
    setFormData(prev => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        [ctaType]: {
          ...prev.configuration?.[ctaType],
          [field]: value,
        }
      }
    }));
  };

const handleToggle = (name: 'ctaFooter' | 'ctaNavbar' | 'emailButtonNavbar' | 'newsletter') => {
  setFormData(prev => {
    if (name === 'emailButtonNavbar') {
      return { 
        ...prev, 
        configuration: {
          ...prev.configuration,
          emailButtonNavbar: !prev.configuration?.emailButtonNavbar 
        }
      };
    } else if (name === 'newsletter') {
      return { 
        ...prev, 
        configuration: {
          ...prev.configuration,
          newsletter: {
            enabled: !prev.configuration?.newsletter?.enabled,
            url: prev.configuration?.newsletter?.url || ''
          }
        }
      };
    } else {
      // For ctaFooter and ctaNavbar
      const isCurrentlyEnabled = prev.configuration?.[name] !== undefined;

      return {
        ...prev,
        configuration: {
          ...prev.configuration,
          [name]: isCurrentlyEnabled ? undefined : { label: '', url: '' }
        }
      };
    }
  });
};
  const handleLegalInfoChange = (field: 'name' | 'terms_and_conditions' | 'privacy_policy', value: string) => {
    setFormData(prev => ({
      ...prev,
      legal: {
        ...prev.legal,
        [field]: value,
      }
    }));
  };

  return (
    <Card className="space-y-8 p-6 sm:p-8 bg-white/95 border border-product-border shadow-md rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-product-foreground flex items-center gap-3" style={{ fontFamily: 'var(--font-playfair-display), var(--font-inter), serif' }}>
        <IoDiamondOutline className="text-product-primary" size={28}/>
        Define Branding
      </h2>
      
      {!loading && isFreePlan && (
        <Alert className="border-amber-200 bg-amber-50">
          <Lock className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            Branding customization is only available for paid plans. Upgrade your plan to customize your branding settings.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Legal Name */}
        <div className="space-y-3">
          <Label htmlFor="legal-name" className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Legal Name
          </Label>
          <Input
            id="legal-name"
            name="legal-name"
            value={formData.legal?.name || ''}
            onChange={(e) => handleLegalInfoChange('name', e.target.value)}
            placeholder="e.g. Quicktalog Inc."
            className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
            disabled={isFreePlan}
          />
                  {/* Terms & Conditions */}
          <Label htmlFor="terms-and-conditions" className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Terms & Conditions Link
          </Label>
          <Input
            id="terms-and-conditions"
            name="terms-and-conditions"
            value={formData.legal?.terms_and_conditions || ''}
            onChange={(e) => handleLegalInfoChange('terms_and_conditions', e.target.value)}
            placeholder="e.g. https://example.com/terms"
            className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
            disabled={isFreePlan}
          />
          <Label htmlFor="privacy-policy" className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Privacy Policy Link
          </Label>
          <Input
            id="privacy-policy"
            name="privacy-policy"
            value={formData.legal?.privacy_policy || ''}
            onChange={(e) => handleLegalInfoChange('privacy_policy', e.target.value)}
            placeholder="e.g. https://example.com/privacy"
            className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
            disabled={isFreePlan}
          />
        </div>

        {/* Logo */}
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
              {!isFreePlan && (
                <IoClose
                  size={25}
                  className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600 transition-colors duration-200 shadow-lg"
                  onClick={() => {
                    setLogoPreview(null);
                    setFormData((prev: any) => ({ ...prev, logo: undefined }));
                  }}
                />
              )}
            </div>
          ) : (
            <div className={`h-48 ${!isFreePlan ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
              <ImageDropzone
                onUploadComplete={(url) => {
                  setFormData((prev: any) => ({ ...prev, logo: url }));
                  setLogoPreview(url);
                }}
                onError={(error) => alert(`ERROR! ${error.message}`)}
                maxDim={512}
                maxSizeMB={1}
                disabled={isFreePlan}
              />
            </div>
          )}
          {touched?.logo && errors?.logo && (
            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded-lg" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{errors.logo}</div>
          )}
        </div>



        {/* CTA Footer */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
              CTA in Footer
            </Label>
            <Switch
              checked={!!(formData.configuration?.ctaFooter)}
              onCheckedChange={() => handleToggle('ctaFooter')}
              disabled={isFreePlan}
            />
          </div>
          {formData.configuration?.ctaFooter && (
            <div className="space-y-3">
              <Input
                placeholder="Label (e.g. Contact Us)"
                value={formData.configuration.ctaFooter.label}
                onChange={(e) => handleCtaChange('ctaFooter', 'label', e.target.value)}
                className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
                disabled={isFreePlan}
              />
              <Input
                placeholder="URL (e.g. https://example.com/contact)"
                value={formData.configuration.ctaFooter.url}
                onChange={(e) => handleCtaChange('ctaFooter', 'url', e.target.value)}
                className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
                disabled={isFreePlan}
              />
            </div>
          )}
        </div>

        {/* CTA Navbar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
              CTA in Navbar
            </Label>
            <Switch
              checked={!!(formData.configuration?.ctaNavbar)}
              onCheckedChange={() => handleToggle('ctaNavbar')}
              disabled={isFreePlan}
            />
          </div>
          {formData.configuration?.ctaNavbar && (
            <div className="space-y-3">
              <Input
                placeholder="Label (e.g. Book Now)"
                value={formData.configuration.ctaNavbar.label}
                onChange={(e) => handleCtaChange('ctaNavbar', 'label', e.target.value)}
                className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
                disabled={isFreePlan}
              />
              <Input
                placeholder="URL (e.g. https://example.com/book)"
                value={formData.configuration.ctaNavbar.url}
                onChange={(e) => handleCtaChange('ctaNavbar', 'url', e.target.value)}
                className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
                disabled={isFreePlan}
              />
            </div>
          )}
        </div>

        {/* Newsletter */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <Label className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
              Newsletter
            </Label>
            <Switch
              checked={!!formData.configuration?.newsletter?.enabled}
              onCheckedChange={() => handleToggle('newsletter')}
              disabled={isFreePlan}
            />
          </div>
          {formData.configuration?.newsletter?.enabled && (
            <div className="space-y-3">
              <Input
                placeholder="Subscribe URL (e.g. https://example.com/subscribe)"
                value={formData.configuration.newsletter.url}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    configuration: {
                      ...prev.configuration,
                      newsletter: {
                        ...prev.configuration?.newsletter,
                        url: e.target.value
                      }
                    }
                  }));
                }}
                className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
                disabled={isFreePlan}
              />
            </div>
          )}
        </div>
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <Label className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
              Email button in Navbar
            </Label>
            <Switch
              checked={!!formData.configuration?.emailButtonNavbar}
              onCheckedChange={() => handleToggle('emailButtonNavbar')}
              disabled={isFreePlan}
            />
          </div>
        </div>

        {/* Contact Information - Full Width */}
        <div className="space-y-6 col-span-full">
          <h3 className="text-xl font-bold text-product-foreground flex items-center gap-3" style={{ fontFamily: 'var(--font-playfair-display), var(--font-inter), serif' }}>
            <Tag className="h-6 w-6 text-product-primary" /> Contact Information
          </h3>
          {formData.contact?.map((contact, index) => (
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
                  disabled={isFreePlan}
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
                  className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
                  disabled={isFreePlan}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveContact(index)}
                className="h-10 w-10 hover:bg-red-600 hover:shadow-product-hover-shadow"
                disabled={isFreePlan}
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
            disabled={isFreePlan}
          >
            <Plus className="mr-2 h-5 w-5" /> Add Contact Field
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Step4Branding;