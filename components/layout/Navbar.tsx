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
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b bg-white/80 backdrop-blur-md dark:bg-black/80"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex flex-shrink-0">
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white transition-all group-hover:scale-105 dark:bg-white dark:text-black">
                <ShoppingCart className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight text-black dark:text-white">
                GRAVITY<span className="text-zinc-500">STORE</span>
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
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                placeholder="Buscar productos..."
                value={query}
                onChange={handleInputChange}
                className="h-9 rounded-full bg-zinc-100 pl-9 border-0 focus-visible:ring-0 dark:bg-zinc-800 dark:focus-visible:ring-white"
              />
            </form>

            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white dark:bg-white dark:text-black">
                  0
                </span>
              </Button>

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
                      <Button className="w-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
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
