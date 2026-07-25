import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chowdeck - Food, Groceries & Local Markets Delivery",
  description:
    "Order food, groceries, and essentials from your favourite restaurants and stores. Fast delivery across Lagos, Abuja, Accra, and more.",
  keywords: [
    "food delivery",
    "groceries",
    "Nigeria",
    "Lagos",
    "Abuja",
    "Chowdeck",
    "restaurant",
  ],
  openGraph: {
    title: "Chowdeck - Food, Groceries & Local Markets Delivery",
    description:
      "Order food, groceries, and essentials delivered to your doorstep.",
    siteName: "Chowdeck",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        <Navbar />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
        <MobileNav />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#E23E3E", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
