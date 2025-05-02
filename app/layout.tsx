import type { Metadata } from "next";
import "./globals.css";
import { PageWrapperClient } from "@/components/wrappers/PageWrapperClient";

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
      <body className={`bg-primary text-white`}>
        <PageWrapperClient children={children} />
      </body>
    </html>
  );
}
