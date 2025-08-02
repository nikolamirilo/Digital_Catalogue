'use client';
//@ts-ignore
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Tag, Trash2 } from 'lucide-react';
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
import { IoDiamondOutline } from 'react-icons/io5';

interface Step4BrandingProps {
  formData: ServicesFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => void;
  handleAddContact: () => void;
  handleRemoveContact: (index: number) => void;
  handleContactChange: (index: number, field: keyof ContactInfo, value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<ServicesFormData>>;
}

const Step4Branding: React.FC<Step4BrandingProps> = ({
  formData,
  handleInputChange,
  handleAddContact,
  handleRemoveContact,
  handleContactChange,
  setFormData,
}) => {
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
          newsletter: !prev.configuration?.newsletter
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Legal Name */}
        <div className="space-y-3">
          <Label htmlFor="name" className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Legal Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.legal?.name || ''}
            onChange={(e) => handleLegalInfoChange('name', e.target.value)}
            placeholder="e.g. Quicktalog Inc."
            className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
          />
                  {/* Terms & Conditions */}
          <Label htmlFor="terms_and_conditions" className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Terms & Conditions Link
          </Label>
          <Input
            id="terms_and_conditions"
            name="terms_and_conditions"
            value={formData.legal?.terms_and_conditions || ''}
            onChange={(e) => handleLegalInfoChange('terms_and_conditions', e.target.value)}
            placeholder="e.g. https://example.com/terms"
            className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
          />
          <Label htmlFor="privacy_policy" className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Privacy Policy Link
          </Label>
          <Input
            id="privacy_policy"
            name="privacy_policy"
            value={formData.legal?.privacy_policy || ''}
            onChange={(e) => handleLegalInfoChange('privacy_policy', e.target.value)}
            placeholder="e.g. https://example.com/privacy"
            className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
          />
        </div>

        {/* Logo */}
        <div className="space-y-3">
          <Label className="text-product-foreground font-medium" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Logo
          </Label>
          <ImageDropzone
            onUpload={(url) => setFormData(prev => ({ ...prev, logo: url }))}
            initialValue={formData.logo}
          />
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
            />
          </div>
          {formData.configuration?.ctaFooter && (
            <div className="space-y-3">
              <Input
                placeholder="Label (e.g. Contact Us)"
                value={formData.configuration.ctaFooter.label}
                onChange={(e) => handleCtaChange('ctaFooter', 'label', e.target.value)}
                className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
              />
              <Input
                placeholder="URL (e.g. https://example.com/contact)"
                value={formData.configuration.ctaFooter.url}
                onChange={(e) => handleCtaChange('ctaFooter', 'url', e.target.value)}
                className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
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
            />
          </div>
          {formData.configuration?.ctaNavbar && (
            <div className="space-y-3">
              <Input
                placeholder="Label (e.g. Book Now)"
                value={formData.configuration.ctaNavbar.label}
                onChange={(e) => handleCtaChange('ctaNavbar', 'label', e.target.value)}
                className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
              />
              <Input
                placeholder="URL (e.g. https://example.com/book)"
                value={formData.configuration.ctaNavbar.url}
                onChange={(e) => handleCtaChange('ctaNavbar', 'url', e.target.value)}
                className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
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
              checked={!!formData.configuration?.newsletter}
              onCheckedChange={() => handleToggle('newsletter')}
            />
          </div>
          {formData.configuration?.newsletter && (
            <div className="space-y-3">
              <Input
                placeholder="Subscribe URL (e.g. https://example.com/subscribe)"
                value=""
                onChange={(e) => {
                  // Temporary placeholder - you'll need to add newsletterUrl to your type
                  console.log("Newsletter URL:", e.target.value);
                }}
                className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
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

export default Step4Branding;