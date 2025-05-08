"use client";
import React, { useState, useRef, useEffect } from "react";
import LineasNegocioNosotros from "./RepresentacionCard";
import RepresentacionCard from "./RepresentacionCard";

export default function Representacion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  // Updated order to match the image
  const lineas = [
    {
      iconSmall: { src: "/education.svg", alt: "Educación" },
      title: "Trabajo en equipo",
      description:
        "Todos nuestros colaboradores realizan sus actividades de manera independiente y responsable, pero con un objetivo común, superar sus expectativas.",
    },
    {
      iconSmall: { src: "/health.svg", alt: "Salud" },
      title: "Pasión por lo que hacemos",
      description:
        "Amamos lo que hacemos, por tal razón estamos comprometidos en la búsqueda de mejoras constante para aumentar su productividad.",
    },
    {
      iconSmall: { src: "/mobile-store.svg", alt: "Comercio" },
      title: "Respeto y orientación al cliente",
      description:
        "Buscamos su fidelización, por lo tanto, nuestras acciones giran alrededor de todas sus necesidades.",
    },
    {
      iconSmall: { src: "/supply-chain.svg", alt: "Inventarios y Bodegas" },
      title: "Sostenibilidad",
      description:
        "Todas las actividades que realizamos aseguran sus requerimientos, sin embargo, estamos comprometidos en preservar y cuidar las necesidades de las futuras generaciones.",
    },
    {
      iconSmall: { src: "/pc-mechanic.svg", alt: "Control de Mantenimientos" },
      title: "Actuamos con integridad",
      description:
        "Funcionamos de acuerdo a nuestros valores y principios corporativos, guiándonos por lo que es mejor y más correcto.",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const diff = startX.current - currentX.current;

    if (Math.abs(diff) > 50) {
      // Threshold for swipe
      if (diff > 0 && currentIndex < lineas.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    currentX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const diff = startX.current - currentX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < lineas.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getBackground = () => {
    const circleSize = isMobile ? "200px" : "800px";
    return `radial-gradient(circle ${circleSize} at 50% 50%, #1a237e 0%, #0d133d 60%, #0C0D14 100%)`;
  };

  if (isMobile) {
    return (
      <section
        className="py-16"
        style={{
          background: getBackground(),
        }}
      >
        <div className="container mx-auto px-4">
          <h3 className="text-center text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] from-30% via-[#801AE5] via-% to-[#09CE69] to-70%">
            ¿Qué nos representa?
          </h3>

          <div className="relative overflow-hidden">
            {/* Carousel container */}
            <div
              ref={carouselRef}
              className="flex transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
              onTouchStart={(e: React.TouchEvent<HTMLDivElement>) =>
                handleTouchStart(e.nativeEvent)
              }
              onTouchMove={(e: React.TouchEvent<HTMLDivElement>) =>
                handleTouchMove(e.nativeEvent)
              }
              onTouchEnd={handleTouchEnd}
              onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
                handleMouseDown(e.nativeEvent)
              }
              onMouseMove={(e: React.MouseEvent<HTMLDivElement>) =>
                handleMouseMove(e.nativeEvent)
              }
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {lineas.map((linea, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-4">
                  <LineasNegocioNosotros {...linea} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {lineas.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === idx ? "bg-[#09CE69] w-6" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop view - Updated layout to match the image
  return (
    <section
      className="py-16"
      style={{
        background: getBackground(),
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h3 className="text-center text-5xl py-3 font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] from-20% via-[#801AE5] via-35% to-[#09CE69] to-70%">
          ¿Qué nos representa?
        </h3>

        {/* First row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {lineas.slice(0, 3).map((linea, idx) => (
            <div key={idx}>
              <RepresentacionCard {...linea} />
            </div>
          ))}
        </div>

        {/* Second row - 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-16 md:px-48">
          {lineas.slice(3, 5).map((linea, idx) => (
            <div key={idx + 3}>
              <RepresentacionCard {...linea} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
