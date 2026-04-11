import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CartProvider } from "@/components/common/ShoppingCart";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gravity Store | Tu E-Commerce Premium",
  description: "La mejor selección de productos con la mejor experiencia de usuario.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black font-sans`}
      >
        <Suspense fallback={<div className="h-16" />}>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
          </CartProvider>
        </Suspense>
      </body>
    </html>
  );
}
