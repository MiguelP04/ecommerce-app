"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=1600&auto=format&fit=crop",
    title: "ELEVA TU DESKTOP",
    subtitle: "ESTILO QUE GRAVITA",
    description: "Curamos los mejores accesorios para que construyas el espacio de tus sueños.",
    cta: "Explorar Accesorios",
    link: "#products",
    badge: "Colección 2024"
  },
  {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop",
    title: "SONIDO PURAMENTE INMERSIVO",
    subtitle: "SIN DISTRACCIONES",
    description: "Descubre nuestra selección de audio de alta fidelidad.",
    cta: "Ver Audio",
    link: "#products",
    badge: "Lo Nuevo"
  },
  {
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1600&auto=format&fit=crop",
    title: "PRECISIÓN TÁCTIL",
    subtitle: "Rendimiento Superior",
    description: "Teclados diseñados para el máximo confort y velocidad.",
    cta: "Ver Teclados",
    link: "#products",
    badge: "Destacado"
  }
];

export const Banner = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  }, [current]);

  const nextSlide = useCallback(() => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  }, [current]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[55vh] md:h-[50vh] overflow-hidden bg-white dark:bg-black mt-16 p-2">
      <div className="relative w-full h-full rounded-3xl md:rounded-[3.5rem] overflow-hidden shadow-2xl">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Zoom Image */}
            <motion.div
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={slides[current].image}
                alt={slides[current].title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 border border-white/20">
              {slides[current].badge}
            </span>

            <div className="container relative h-full flex items-center justify-center px-6 md:px-12 mx-auto">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex flex-col justify-center items-center gap-1 text-center"
                >

                  <h2 className="text-zinc-400 text-xl font-bold mb-2 tracking-tight">
                    {slides[current].subtitle}
                  </h2>
                  <h1 className="text-3xl font-[900] text-white tracking-tighter leading-[0.9]">
                    {slides[current].title}
                  </h1>
                  <p className="hidden md:flex text-zinc-300 md:text-xl lg:text-xl max-w-lg font-medium leading-relaxed">
                    {slides[current].description}
                  </p>
                </motion.div>

              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
              >
                <Link
                  href={slides[current].link}
                  className="group inline-flex items-center gap-2 bg-white text-black px-10 py-3 rounded-full font-black text-lg hover:bg-zinc-200 transition-all active:scale-95 shadow-2xl shadow-white/10 overflow-hidden"
                >
                  <span className="relative z-10 text-sm">{slides[current].cta}</span>
                  <ChevronRight className="relative z-10 h-6 w-6 transition-transform group-hover:translate-x-2" />
                </Link>
              </motion.div>

            </div>

          </motion.div>

        </AnimatePresence>



        {/* Navigation Arrows */}
        <div className="hidden md:flex absolute bottom-28 justify-between w-full px-4 z-20">
          <button
            onClick={prevSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:border-white active:scale-90"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:border-white active:scale-90"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Indicators */}
        {/* <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${i === current ? "w-12 bg-white" : "w-2 bg-white/40"
                }`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};
