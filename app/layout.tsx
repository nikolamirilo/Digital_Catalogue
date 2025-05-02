import type { Metadata } from "next";
import "./globals.css";
import { redisClient } from "@/lib/redis";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { MainContextProvider } from "@/context/MainContext";

export const metadata: Metadata = {
  title: "Digital Menu",
  description: "Digital menu for restaurants and caffe shops",
};

export const PageWrapperClient = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <MainContextProvider>
      <PageWrapper children={children} />
    </MainContextProvider>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`bg-primary text-white`}>
        <PageWrapperClient children={children} />
      </body>
    </html>
  );
}
