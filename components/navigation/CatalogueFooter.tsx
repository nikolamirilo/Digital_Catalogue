import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FiMail, FiPhone, FiMapPin, FiClock, FiExternalLink, FiShield, FiZap, FiUsers, FiStar, FiCheckCircle } from 'react-icons/fi';
import { getPlatformIconByName } from '@/utils/client';

const CatalogueFooter: React.FC = () => {
  const socialLinks = {
    facebook: 'https://facebook.com/quicktalog',
    twitter: 'https://twitter.com/quicktalog',
    linkedin: 'https://linkedin.com/company/quicktalog',
    instagram: 'https://instagram.com/quicktalog'
  };

  const partnerBadges = [
    { name: 'Glovo', icon: '🚚', description: 'Delivery Partner', rating: 4.8 },
    { name: 'Wolt', icon: '🛵', description: 'Delivery Partner', rating: 4.9 },
    { name: 'Uber Eats', icon: '🍕', description: 'Delivery Partner', rating: 4.7 }
  ];

  const features = [
    { icon: <FiZap className="w-4 h-4" />, title: 'OCR Import Technology', description: 'Scan existing catalogs' },
    { icon: <FiShield className="w-4 h-4" />, title: 'Secure & Reliable', description: 'Enterprise-grade security' },
    { icon: <FiUsers className="w-4 h-4" />, title: 'Multi-device Access', description: 'Works on all devices' },
    { icon: <FiExternalLink className="w-4 h-4" />, title: 'QR Code Sharing', description: 'One-click sharing' }
  ];

  return (
    <footer className="border-t border-border bg-section text-section-heading" style={{
      fontFamily: 'var(--font-family-body, inherit)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Quicktalog branding */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-3 group transition-all duration-200 hover:scale-105">
              <Image
                src="/logo.svg"
                alt="Quicktalog"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors duration-200 text-section-heading" style={{
                  fontFamily: 'var(--font-family-heading, inherit)'
                }}>
                  Quicktalog
                </h3>
                <p className="text-xs opacity-75 text-card-description">
                  Digital Catalog Platform
                </p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-card-description">
              Create beautiful, shareable digital catalogs in minutes. No tech skills required.
            </p>
            <div className="flex items-center space-x-2">
              {Object.keys(socialLinks).map(platform => (
                <Link
                  key={platform}
                  href={socialLinks[platform as keyof typeof socialLinks]}
                  className="p-1.5 rounded-lg transition-all duration-200 group hover:scale-110 bg-card text-card-description"
                  aria-label={`Follow us on ${platform}`}
                >
                  <div className="group-hover:text-primary transition-colors duration-200">
                    {getPlatformIconByName(platform)}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold flex items-center gap-2 text-section-heading" style={{
              fontFamily: 'var(--font-family-heading, inherit)'
            }}>
              <FiMail className="w-4 h-4 text-primary" />
              Contact & Support
            </h4>
            <div className="space-y-2">
              <a 
                href="mailto:hello@quicktalog.com"
                className="flex items-center space-x-2 text-sm hover:text-primary transition-colors duration-200 group text-card-description"
                aria-label="Email Quicktalog"
              >
                <FiMail className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span>hello@quicktalog.com</span>
              </a>
              <a 
                href="tel:+1234567890"
                className="flex items-center space-x-2 text-sm hover:text-primary transition-colors duration-200 group text-card-description"
                aria-label="Call Quicktalog"
              >
                <FiPhone className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center space-x-2 text-sm text-card-description">
                <FiMapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-card-description">
                <FiClock className="w-4 h-4" />
                <span>Mon-Fri 9AM-6PM PST</span>
              </div>
            </div>
          </div>

          {/* Features & Benefits */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold flex items-center gap-2 text-section-heading" style={{
              fontFamily: 'var(--font-family-heading, inherit)'
            }}>
              <FiStar className="w-4 h-4 text-primary" />
              Platform Features
            </h4>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm group text-card-description">
                  <div className="mt-0.5 group-hover:scale-110 transition-transform duration-200 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="font-medium text-card-heading" style={{
                      fontFamily: 'var(--font-family-heading, inherit)'
                    }}>{feature.title}</div>
                    <div className="text-xs opacity-75">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Badges */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold flex items-center gap-2 text-section-heading" style={{
              fontFamily: 'var(--font-family-heading, inherit)'
            }}>
              <FiCheckCircle className="w-4 h-4 text-primary" />
              Trusted Partners
            </h4>
            <div className="space-y-2">
              {partnerBadges.map((partner, index) => (
                <div key={index} className="flex items-center space-x-2 p-1.5 rounded-lg transition-all duration-200 hover:scale-105 bg-card text-card-description">
                  <span className="text-base">{partner.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-card-heading" style={{
                      fontFamily: 'var(--font-family-heading, inherit)'
                    }}>{partner.name}</div>
                    <div className="text-xs opacity-75">{partner.description}</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiStar className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium">{partner.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-6 border-t border-section-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright & Legal */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-card-description">
              <span>© 2024 Quicktalog. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link href="/terms-and-conditions" className="hover:text-primary transition-colors duration-200">
                  Terms of Service
                </Link>
                <Link href="/refund-policy" className="hover:text-primary transition-colors duration-200">
                  Refund Policy
                </Link>
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              asChild
              variant="secondary"
              size="sm"
              className="transition-all duration-200 hover:scale-105 flex items-center gap-2 bg-card text-card-foreground border border-border hover:bg-primary/10 hover:text-primary"
            >
              <Link href="/auth?mode=signup" aria-label="Create your own digital catalog">
                <FiStar className="w-4 h-4" />
                Create Your Digital Catalog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CatalogueFooter;