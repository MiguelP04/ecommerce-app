import { CartContent } from "@/components/cart/CartContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrito | Inv Mis 3 Hermanas",
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Tu Carrito</h1>
        <CartContent />
      </div>
    </div>
  )
}
