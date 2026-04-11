"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Star, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Todos", slug: "" },
  { name: "Ropa", slug: "ropa" },
  { name: "Accesorios", slug: "accesorios" },
  { name: "Electrónica", slug: "electronica" },
];

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentMinRating = searchParams.get("minRating") || "";

  const [minPrice, setMinPrice] = React.useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = React.useState(currentMaxPrice);

  React.useEffect(() => {
    setMinPrice(currentMinPrice);
    setMaxPrice(currentMaxPrice);
  }, [currentMinPrice, currentMaxPrice]);

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/?${params.toString()}#products`);
  };

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ minPrice, maxPrice });
  };

  const clearFilters = () => {
    router.push("/");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="w-full space-y-8 bg-zinc-50/50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </h3>
        {(currentCategory || currentMinPrice || currentMaxPrice || currentMinRating) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 px-2 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            Limpiar todo
            <X className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Categoría
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.slug}
              variant={currentCategory === cat.slug ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilters({ category: cat.slug })}
              className={cn(
                "rounded-full px-4 h-8 text-xs font-medium transition-all",
                currentCategory === cat.slug
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Rango de Precio
        </h4>
        <form onSubmit={handlePriceSubmit} className="grid grid-cols-2 gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">$</span>
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="pl-6 h-9 rounded-lg text-xs"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">$</span>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="pl-6 h-9 rounded-lg text-xs"
            />
          </div>
          <Button type="submit" variant="secondary" size="sm" className="col-span-2 h-8 text-xs">
            Aplicar Precio
          </Button>
        </form>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Puntuación mínima
        </h4>
        <div className="flex flex-col gap-1">
          {[4, 3, 2].map((rating) => (
            <button
              key={rating}
              onClick={() => updateFilters({ minRating: currentMinRating === rating.toString() ? null : rating.toString() })}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg text-sm transition-all text-left",
                currentMinRating === rating.toString()
                  ? "bg-zinc-200 dark:bg-zinc-800 font-bold"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-zinc-300 dark:text-zinc-700"
                    )}
                  />
                ))}
              </div>
              <span>o más</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
