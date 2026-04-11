"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartSheet, useCart } from "@/components/common/ShoppingCart";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Tienda", href: "#products" },
  { name: "Ofertas", href: "#" },
  { name: "Novedades", href: "#" },
];

export function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [query, setQuery] = React.useState(searchParams.get("q") || "");

  React.useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query)}#products`);
    } else {
      router.push("/");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // If query is cleared, go back to all products
    if (!newQuery) {
      router.push("/");
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b bg-background/80 backdrop-blur-md"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex flex-shrink-0">
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all group-hover:scale-105">
                <ShoppingCart className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                INV<span className="text-primary">MIS3HERMANAS</span>
              </span>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
            <form onSubmit={handleSearch} className="relative hidden w-full max-w-[200px] lg:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                value={query}
                onChange={handleInputChange}
                className="h-9 rounded-full bg-muted pl-9 pr-4 border-2 border-transparent transition-all duration-200 focus:border-primary focus:bg-background focus:outline-none focus:ring-0"
              />
            </form>

            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-muted">
                <Search className="h-5 w-5" />
              </Button>

              <CartSheet />

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">Menú</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 py-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium transition-colors hover:text-zinc-500"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="mt-4 flex flex-col gap-2">
                      <form onSubmit={handleSearch} className="relative w-full">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                          placeholder="Buscar..."
                          value={query}
                          onChange={handleInputChange}
                          className="pl-9 border-0 focus-visible:ring-0"
                        />
                      </form>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        Inicia Sesión
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
