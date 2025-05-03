"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const ContactButton = () => {
  const handleClick = () => {
    console.log("Hola");
  };

  return (
    <button
      onClick={handleClick}
      className="relative px-6 py-2 font-bold rounded-lg bg-gradient-to-r from-[#801AE5] to-[#09CE69] text-center"
    >
      Contáctanos
    </button>
  );
};

export default function Main() {
  // Estado para manejar correctamente el lado del cliente
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Comprobamos si estamos en el cliente y la dimensión de la pantalla
  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Establecer el estado inicial
    handleResize();

    // Agregar listener para cambios de tamaño
    window.addEventListener("resize", handleResize);

    // Limpiar el listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Gradiente superior ajustado para móviles
  const topGradientPosition = isClient ? (isMobile ? "-40%" : "-10%") : "-20%";
  const topGradientOpacity = "0.8"; // Mantenemos la misma opacidad en ambos casos

  return (
    <main className="relative min-h-screen w-full bg-[#0C0D14] overflow-hidden">
      {/* Radial gradient top - ajustado para móviles */}
      <div
        className="absolute top-0 left-0 w-full h-screen"
        style={{
          background: `radial-gradient(100% 100% at 50% ${topGradientPosition}, rgba(128, 26, 229, ${topGradientOpacity}) 0%, rgba(14, 29, 110, 0.5) 40%, rgba(12, 13, 20, 0) 70%)`,
        }}
      />

      {/* Radial gradient bottom */}
      <div
        className="absolute bottom-0 left-0 w-full h-screen"
        style={{
          background:
            "radial-gradient(100% 100% at 50% 150%, rgba(128, 26, 229, 0.8) 0%, rgba(14, 29, 110, 0.5) 50%, rgba(12, 13, 20, 0) 80%)",
        }}
      />

      {/* Topology SVG Left - Tamaño reducido */}
      {isClient && (
        <div className="absolute left-0 top-[40%] -translate-y-1/2 w-[15%] md:w-[18%] h-auto max-h-[500px] opacity-90 z-0 hidden md:block pointer-events-none">
          <Image
            src="/Topology-1.svg"
            alt="Topology Left Decoration"
            width={200}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      )}

      {/* Topology SVG Right - Tamaño reducido */}
      {isClient && (
        <div className="absolute right-0 top-[42%] -translate-y-1/2 w-[15%] md:w-[18%] h-auto max-h-[500px] opacity-90 z-0 hidden md:block pointer-events-none">
          <Image
            src="/Topology-2.svg"
            alt="Topology Right Decoration"
            width={200}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      )}

      {/* Content container - añadido padding superior para compensar el header */}
      <div className="relative z-10 min-h-screen flex items-center justify-center pt-16 md:pt-0">
        <div className="mx-auto px-4 text-center space-y-4">
          <button className="relative text-primary p-[1px] rounded-full bg-gradient-to-r from-[#801AE5] to-[#09CE69]">
            <div className="bg-[#0C0D14]/90 transition-colors px-15 py-1 rounded-full">
              NarvIA
            </div>
          </button>
          <h1 className="mx-auto text-4xl md:text-6xl font-bold py-4 max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] from-30% via-[#801AE5] via-% to-[#09CE69] to-69%">
            Transformamos tus datos en decisiones inteligentes
          </h1>
          <p className="max-w-4xl mx-auto text-md text-gray-300 mb-10">
            Automatizamos y optimizamos los procesos de tu empresa mediante
            plataformas tecnológicas avanzadas, inteligencia artificial y
            analítica de datos de alto impacto.
          </p>
          <ContactButton />
        </div>
      </div>
    </main>
  );
}
