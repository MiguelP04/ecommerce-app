'use client';

import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartContent() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const total = items.reduce(
    (sum, item) => sum + item.product.variants[0].price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <ShoppingBag
          className="h-20 w-20 text-muted-foreground mb-6"
          strokeWidth={1.5}
        />
        <p className="text-xl text-muted-foreground mb-6">
          Tu carrito está vacío
        </p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Seguir comprando</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex gap-4 p-4 rounded-xl border bg-card"
          >
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image
                src={item.product.variants[0].images[0]}
                alt={item.product.title}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link
                  href={`/product/${item.product.slug}`}
                  className="font-medium hover:underline"
                >
                  {item.product.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {item.product.variants[0].name}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <p className="font-semibold">
                  $
                  {(item.product.variants[0].price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => removeItem(item.product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="lg:col-span-1">
        <div className="rounded-xl border bg-card p-6 space-y-4 sticky top-24">
          <h3 className="font-semibold text-lg">Resumen</h3>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Productos ({itemCount})
            </span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Los impuestos y envío se calculan al finalizar
          </p>
          <Button className="w-full" size="lg">
            Proceder al pago
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Seguir comprando
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
