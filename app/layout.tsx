import type { Metadata } from "next";
import "./globals.css";
import { redisClient } from "@/lib/redis";
import PageWrapper from "@/components/wrappers/PageWrapper";

export const metadata: Metadata = {
  title: "Digital Menu",
  description: "Digital menu for restaurants and caffe shops",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html>
      <body className={`bg-primary text-white`}>
        <PageWrapper children={children} />
      </body>
    </html>
  );
}

