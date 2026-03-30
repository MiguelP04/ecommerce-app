import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black`}
      >
        <Suspense fallback={<div className="h-16" />}>
          <Navbar />
        </Suspense>
        <main>{children}</main>
      </body>
    </html>
  );
}
