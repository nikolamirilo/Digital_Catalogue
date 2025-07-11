import type { Metadata } from "next";
import "./globals.css";
import { PageWrapperClient } from "@/components/wrappers/PageWrapperClient";
import Script from 'next/script'
import { ClerkProvider } from '@clerk/nextjs';
import { Lora } from 'next/font/google';

const loraRegular = Lora({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lora-regular',
  display: 'swap',
});

const loraSemiBold = Lora({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-lora-semibold',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Digital Menu",
  description: "Digital menu for restaurants and caffe shops",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${loraRegular.variable} ${loraSemiBold.variable} antialiased`}>
    <ClerkProvider afterSignOutUrl="/">
      <body className="product">
        <PageWrapperClient children={children} />
      </body>
    </ClerkProvider>
    </html>
  );
}
