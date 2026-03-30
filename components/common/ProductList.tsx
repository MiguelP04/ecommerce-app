import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export const ProductList = ({ products, title, subtitle }: ProductListProps) => {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-zinc-900 dark:text-zinc-50">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
