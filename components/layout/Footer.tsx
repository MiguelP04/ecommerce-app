import Link from "next/link";
import { ShoppingCart, Facebook, Instagram, Twitter, Mail } from "lucide-react";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Tienda", href: "/#products" },
  { name: "Ofertas", href: "#" },
  { name: "Novedades", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="group flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ShoppingCart className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                INV<span className="text-primary">MIS3HERMANAS</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">
              Tu tienda de confianza con los mejores productos seleccionados cuidadosamente para elevar tu día a día.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Enlaces rápidos</h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Síguenos</h3>
            <div className="flex gap-3 mb-4">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Mail className="h-4 w-4" />
              </Link>
            </div>
            <p className="text-xs text-zinc-500">
              contacto@invmis3hermanas.com
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-center text-zinc-500">
            © {new Date().getFullYear()} INV MIS 3 HERMANAS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer >
  );
}
