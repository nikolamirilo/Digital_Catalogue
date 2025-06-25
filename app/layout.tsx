import type { Metadata } from "next";
import "./globals.css";
import { PageWrapperClient } from "@/components/wrappers/PageWrapperClient";
import Script from 'next/script'
import { ClerkProvider } from '@clerk/nextjs';

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
    <html>
    <ClerkProvider>
      <Script async src="https://scripts.simpleanalyticscdn.com/latest.js"/>
      <body className={`bg-primary text-white`}>
        <PageWrapperClient children={children} />
      </body>
    </ClerkProvider>
    </html>
  );
}

