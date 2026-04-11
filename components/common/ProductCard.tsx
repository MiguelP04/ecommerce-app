import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/types";
import { AddToCartButton } from "./ShoppingCart";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const defaultVariant = product.variants[0];
  const imageUrl = defaultVariant.images[0];
  const price = defaultVariant.price;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white transition-all hover:shadow-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
      <Link href={`/product/${product.slug}`} className="block overflow-hidden">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {product.category.name}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">{product.averageRating}</span>
          </div>
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="mb-2 text-lg font-bold text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300">
            {product.title}
          </h3>
        </Link>

        <p className="mb-4 text-sm text-zinc-500 line-clamp-2 dark:text-zinc-400 flex-1">
          {product.description}
        </p>

        <div className="mt-auto">
          <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            ${price.toFixed(2)}
          </span>
          <div className="mt-2">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};
