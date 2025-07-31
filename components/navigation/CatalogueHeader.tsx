import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FiMail, FiPhone, FiShield, FiZap, FiExternalLink } from 'react-icons/fi';

const CatalogueHeader: React.FC = () => {
  return (
    <header className="border-b border-border shadow-sm z-50 bg-card text-card-foreground" style={{
      fontFamily: 'var(--font-family-body, inherit)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left side - Quicktalog branding */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link href="/" className="flex items-center space-x-2 group transition-all duration-200 hover:scale-105">
              <Image
                src="/logo.svg"
                alt="Quicktalog"
                width={32}
                height={32}
                className="w-8 h-8 sm:w-9 sm:h-9"
              />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold group-hover:text-primary transition-colors duration-200 text-card-heading" style={{
                  fontFamily: 'var(--font-family-heading, inherit)'
                }}>
                  Powered by Quicktalog
                </span>
                <span className="text-xs opacity-75 text-card-description">
                  Digital Catalog Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Center - Trust indicators */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <div className="flex items-center space-x-1.5 text-xs text-card-description">
              <div className="p-1 rounded-full bg-primary/10">
                <FiShield className="w-3 h-3 text-primary" />
              </div>
              <span className="font-medium">Secure</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-card-description">
              <div className="p-1 rounded-full bg-primary/10">
                <FiZap className="w-3 h-3 text-primary" />
              </div>
              <span className="font-medium">Fast</span>
            </div>
          </div>

          {/* Right side - Contact CTA */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-3 text-xs text-card-description">
              <a 
                href="mailto:hello@quicktalog.com" 
                className="flex items-center space-x-1 hover:text-primary transition-colors duration-200 group"
                aria-label="Email Quicktalog"
              >
                <FiMail className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                <span className="hidden lg:inline">hello@quicktalog.com</span>
              </a>
              <a 
                href="tel:+1234567890" 
                className="flex items-center space-x-1 hover:text-primary transition-colors duration-200 group"
                aria-label="Call Quicktalog"
              >
                <FiPhone className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                <span className="hidden lg:inline">+1 (234) 567-890</span>
              </a>
            </div>
            
            <Button 
              asChild
              variant="secondary"
              size="sm"
              className="text-xs font-medium transition-all duration-200 hover:scale-105 bg-card text-card-foreground border border-border hover:bg-primary/10 hover:text-primary"
            >
              <Link href="/auth?mode=signup" aria-label="Create your own digital catalog">
                <span className="hidden sm:inline">Create Your Catalog</span>
                <span className="sm:hidden">Get Started</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CatalogueHeader;