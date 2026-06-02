import type { Metadata } from "next";
import { Nunito_Sans, Rubik } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inv Mis 3 Hermanas | Tu Tienda de Confianza",
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
        className={`${nunitoSans.variable} ${rubik.variable} antialiased selection:bg-emerald-700 selection:text-white dark:selection:bg-emerald-600 dark:selection:text-white font-sans`}
      >
        <Suspense fallback={<div className="h-16" />}>
          <Navbar />
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
