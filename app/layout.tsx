import type { Metadata } from "next";
import "./globals.css";

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
      <body
        className={`bg-primary text-white`}
      >
        {children}
      </body>
    </html>
  );
}

