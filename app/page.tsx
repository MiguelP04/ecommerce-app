import { ProductList } from "@/components/common/ProductList";
import { Banner } from "@/components/layout/Banner";
import { MOCK_PRODUCTS } from "@/constants/products";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || "";

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    return (
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.name.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Banner />

      {/* Featured Products */}
      <div id="products" className="bg-white dark:bg-black pt-10">
        <ProductList
          products={filteredProducts}
          title={query ? `Resultados para "${query}"` : "Nuestros Destacados"}
          subtitle={
            query
              ? `Encontramos ${filteredProducts.length} productos que coinciden con tu búsqueda.`
              : "Una cuidada selección de objetos diseñados para elevar tu día a día."
          }
        />

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-full mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold mb-2">No se encontraron productos</h3>
            <p className="text-zinc-500 max-w-md mx-auto">
              No pudimos encontrar nada que coincida con "{query}".
              Intenta con otros términos o revisa la ortografía.
            </p>
          </div>
        )}
      </div>

      {/* Benefits Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Calidad Premium", desc: "Cada producto es seleccionado meticulosamente para garantizar la máxima durabilidad." },
              { title: "Envío Global", desc: "Llegamos a cualquier rincón del mundo con envíos extremadamente seguros." },
              { title: "Soporte 24/7", desc: "Nuestro equipo está siempre disponible para ayudarte con cualquier duda." }
            ].map((benefit, i) => (
              <div key={i} className="text-center group p-8 rounded-2xl hover:bg-white dark:hover:bg-zinc-900 transition-all hover:shadow-xl border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800">
                <div className="w-16 h-16 bg-zinc-900 dark:bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center text-white dark:text-black font-bold text-2xl group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
