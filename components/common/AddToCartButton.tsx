"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Product } from "@/types";

export function AddToCartButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const existingItem = items.find((item) => item.product.id === product.id);
  const isInCart = !!existingItem;

  return (
    <Button
      onClick={() => addItem(product)}
      className={className || "w-full"}
      variant={isInCart ? "secondary" : "default"}
      size="default"
    >
      <ShoppingBag className="mr-2 h-5 w-5" data-icon="inline-start" />
      {isInCart ? "Añadido" : "Añadir al carrito"}
    </Button>
  );
}
