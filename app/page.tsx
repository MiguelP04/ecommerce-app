import { ProductCard } from "@/components/common/ProductCard";
import { ProductFilters } from "@/components/common/ProductFilters";
import { Banner } from "@/components/layout/Banner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { MOCK_PRODUCTS } from "@/constants/products";
import { Filter, PackageSearch } from "lucide-react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    minRating?: string;
  }>;
}) {
  const { q, category, minPrice, maxPrice, minRating } = await searchParams;
  const query = q?.toLowerCase() || "";
  const catParam = category || "";
  const minP = minPrice ? parseFloat(minPrice) : 0;
  const maxP = maxPrice ? parseFloat(maxPrice) : Infinity;
  const minR = minRating ? parseFloat(minRating) : 0;

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesQuery = !query ||
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.name.toLowerCase().includes(query);

    const matchesCategory = !catParam || product.category.slug === catParam;

    const price = product.variants[0]?.price || 0;
    const matchesPrice = price >= minP && price <= maxP;

    const matchesRating = product.averageRating >= minR;

    return matchesQuery && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Banner />

      {/* Main Content */}
      <div id="products" className="bg-white dark:bg-black pt-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-zinc-900 dark:text-zinc-50">
              {query ? `Resultados para "${query}"` : "Nuestros Productos"}
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              {query
                ? `Encontramos ${filteredProducts.length} productos que coinciden con tu búsqueda.`
                : "Una cuidada selección de objetos diseñados para elevar tu día a día."}
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24 self-start">
              <ProductFilters />
            </aside>

            {/* Mobile Filters Trigger (Optional feature, will just show current count) */}
            <div className="lg:hidden mb-8">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full h-12 rounded-xl flex items-center justify-between px-6 border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span className="font-semibold">Filtros</span>
                    </div>
                    {filteredProducts.length} productos
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto pt-10">
                  <ProductFilters />
                </SheetContent>
              </Sheet>
            </div>

            {/* Product Grid */}
            <main className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
                  <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-full mb-6">
                    <PackageSearch className="h-10 w-10 text-zinc-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No se encontraron productos</h3>
                  <p className="text-zinc-500 max-w-md mx-auto">
                    No pudimos encontrar nada que coincida con tus filtros.
                    Intenta cambiar la categoría o el rango de precio.
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
