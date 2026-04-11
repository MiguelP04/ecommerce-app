import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { MOCK_PRODUCTS } from "@/constants/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductCard } from "@/components/common/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  
  if (!product) return { title: "Producto no encontrado" };
  
  return {
    title: `${product.title} | Inv Mis 3 Hermanas`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = MOCK_PRODUCTS
    .filter((p) => p.category.slug === product.category.slug && p.id !== product.id)
    .slice(0, 4);

  const currentVariant = product.variants[0];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <Image
                src={currentVariant.images[0]}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <Heart className="h-5 w-5" />
              </Button>
              {product.averageRating >= 4.5 && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  Bestseller
                </Badge>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.variants[0].images.map((img, idx) => (
                <button
                  key={idx}
                  className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 border-transparent hover:border-primary transition-colors"
                >
                  <Image src={img} alt={`${product.title} ${idx + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category.name}</Badge>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">{product.title}</h1>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-muted-foreground">({product.averageRating})</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Share2 className="h-4 w-4 mr-1" />
                  Compartir
                </Button>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">${currentVariant.price.toFixed(2)}</span>
              {currentVariant.stock > 0 && currentVariant.stock <= 10 && (
                <Badge variant="destructive">¡Solo quedan {currentVariant.stock}!</Badge>
              )}
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-medium">Variante</h3>
              <div className="flex gap-2">
                <Button variant="outline" className="border-2 border-primary bg-primary/10">
                  {currentVariant.name}
                </Button>
              </div>
            </div>

            <ProductActions product={product} />

            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="flex flex-col items-center text-center gap-2 p-3 rounded-lg bg-muted/50">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">Envío gratis</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-3 rounded-lg bg-muted/50">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">Garantía</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-3 rounded-lg bg-muted/50">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">30 días</span>
              </div>
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="features">Características</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4 space-y-4">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Fabricado con materiales de alta calidad</li>
                  <li>• Diseño exclusivo disponible solo aquí</li>
                  <li>• Ideal para uso diario</li>
                </ul>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Material: Algodón orgánico de primera calidad</li>
                  <li>• Lavado: A máquina, ciclo delicado</li>
                  <li>• Origen: Diseño nacional</li>
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <p className="text-muted-foreground">Aún no hay reseñas. ¡Sé el primero en dejar tu opinión!</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}