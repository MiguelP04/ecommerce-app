"use client";

import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/common/ShoppingCart";
import { Product } from "@/types";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  return (
    <AddToCartButton product={product} className="w-full h-12 text-base" />
  );
}