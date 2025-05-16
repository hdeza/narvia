"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registramos los plugins necesarios
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin, ScrollTrigger);
}

const ContactButton = () => {
  const handleClick = () => {
    const contactoSection = document.getElementById("contacto");
    if (contactoSection) {
      contactoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative px-6 py-2 font-bold rounded-lg bg-gradient-to-r from-[#801AE5] to-[#09CE69] text-center cursor-pointer opacity-0"
      id="contact-button"
    >
      Contáctanos
    </button>
  );
};

export default function Main() {
  // Referencias para animaciones
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const logoRef = useRef(null);
  const leftSvgRef = useRef(null);
  const rightSvgRef = useRef(null);

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

  // Efecto para las animaciones cuando el componente se monta
  useEffect(() => {
    if (!isClient) return;

    // Timeline principal
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animación del logo
    tl.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8 }
    );

    // Animación de typing para el título
    tl.fromTo(
      titleRef.current,
      { text: "", opacity: 0 },
      {
        duration: 2.1,
        text: "Transformamos tus datos en decisiones inteligentes",
        opacity: 1,
        ease: "none",
      }
    );

    // Animación para la descripción
    tl.fromTo(
      descriptionRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    );

    // Animación para el botón de contacto
    tl.fromTo(
      "#contact-button",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    );

    // Animaciones para los SVGs laterales (sólo en escritorio)
    if (!isMobile) {
      // SVG izquierdo - entra desde la izquierda
      tl.fromTo(
        leftSvgRef.current,
        { x: -200, opacity: 0 },
        { x: 0, opacity: 0.9, duration: 1.2, ease: "power2.out" },
        "-=1"
      );

      // SVG derecho - entra desde la derecha
      tl.fromTo(
        rightSvgRef.current,
        { x: 200, opacity: 0 },
        { x: 0, opacity: 0.9, duration: 1.2, ease: "power2.out" },
        "-=1.2"
      );
    }

    return () => {
      // Limpiamos las animaciones
      tl.kill();
    };
  }, [isClient, isMobile]);

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

      {/* Topology SVG Left - Con referencia para animación */}
      {isClient && (
        <div
          ref={leftSvgRef}
          className="absolute left-0 top-[40%] -translate-y-1/2 w-[15%] md:w-[18%] h-auto max-h-[500px] opacity-0 z-0 hidden md:block pointer-events-none"
        >
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

      {/* Topology SVG Right - Con referencia para animación */}
      {isClient && (
        <div
          ref={rightSvgRef}
          className="absolute right-0 top-[42%] -translate-y-1/2 w-[15%] md:w-[18%] h-auto max-h-[500px] opacity-0 z-0 hidden md:block pointer-events-none"
        >
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

      {/* Content container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center md:pt-0">
        <div className="mx-auto px-4 text-center space-y-4">
          <button
            ref={logoRef}
            className="relative text-primary p-[1px] rounded-full bg-gradient-to-r from-[#801AE5] to-[#09CE69] opacity-0"
          >
            <div className="bg-[#0C0D14]/90 transition-colors px-15 py-1 rounded-full">
              NarvIA
            </div>
          </button>

          <h1
            ref={titleRef}
            className="mx-auto text-4xl md:text-6xl font-bold py-4 max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] from-30% via-[#801AE5] via-% to-[#09CE69] to-69%"
          >
            {/* El texto se llenará con la animación */}
          </h1>

          <p
            ref={descriptionRef}
            className="max-w-4xl mx-auto text-md text-gray-300 mb-10 opacity-0"
          >
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
