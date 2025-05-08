"use client";

import React, { useState, useRef, useEffect } from "react";
import LineasNegocio from "./LineasNegocio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NuestrasLineasNegocio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const carouselRef = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  const lineas = [
    {
      iconSmall: { src: "/education.svg", alt: "Educación" },
      title: "Educación",
      description:
        "Realiza proyecciones de nuevos estudiantes, estima su desempeño y planea estrategias para evitar la deserción estudiantil.",
    },
    {
      iconSmall: { src: "/health.svg", alt: "Salud" },
      title: "Salud",
      description:
        "Optimiza los recursos en servicios asistenciales, y lleva una analítica sobre las atenciones realizadas, los diagnósticos y enfermedades más frecuentes de una forma segmentada.",
    },
    {
      iconSmall: { src: "/mobile-store.svg", alt: "Comercio" },
      title: "Comercio",
      description:
        "Visualiza de manera interactiva el estado de tus ventas, la efectividad de las estrategias comerciales y determina posibles formas de ingresar a nuevos mercados.",
    },
    {
      iconSmall: { src: "/pc-mechanic.svg", alt: "Control de Mantenimientos" },
      title: "Control de Mantenimientos",
      description:
        "Optimiza la calidad de tus mantenimientos y monitorea en tiempo real el estado de tus equipos para garantizar su rendimiento y durabilidad.",
    },
    {
      iconSmall: { src: "/supply-chain.svg", alt: "Inventarios y Bodegas" },
      title: "Inventarios y Bodegas",
      description:
        "Toma el control total de la gestión de inventarios y bodegas, impulsado por analítica avanzada: descriptiva, predictiva y prescriptiva, para optimizar tus decisiones y maximizar la eficiencia.",
    },
    {
      iconSmall: {
        src: "/classlist.svg",
        alt: "Gestión de Proyectos",
      },
      title: "Gestión de Proyectos",
      description:
        "Optimiza el seguimiento de tus proyectos utilizando datos históricos y en tiempo real. Toma decisiones informadas y proyecta el futuro de tu negocio con precisión.",
    },
    {
      iconSmall: { src: "/certificate.svg", alt: "Sistema Gestión Integrado" },
      title: "Sistema Gestión Integrado",
      description:
        "Obtén las métricas más precisas para un control total de tus sistemas de gestión integrados y maximiza la rentabilidad de tu empresa con decisiones basadas en datos.",
    },
    {
      iconSmall: { src: "/tractor.svg", alt: "Agricultura y Ganadería" },
      title: "Agricultura y Ganadería",
      description:
        "Accede de forma interactiva a análisis detallados del comportamiento de tu negocio, permitiéndote tomar decisiones rápidas ante posibles alarmas y actuar con anticipación.",
    },
    {
      iconSmall: {
        src: "/analytics-business-chart.svg",
        alt: "Analítica de Marketing",
      },
      title: "Analítica de Marketing",
      description:
        "Identifica las estrategias de marketing más efectivas para tu compañía, mide su impacto real y controla las ventas generadas por cada acción implementada.",
    },
  ];

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animation for the title
  useEffect(() => {
    if (!titleRef.current || !isClient) return;

    // Create animation for the title
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Set initial state
    gsap.set(titleRef.current, {
      opacity: 0,
      y: 30,
    });

    // Animate title
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [isClient]);

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
        id="lineas"
        className="py-16"
        style={{
          background: getBackground(),
        }}
      >
        <div className="container mx-auto px-4">
          <h3
            ref={titleRef}
            className="text-center text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] from-30% via-[#801AE5] via-% to-[#09CE69] to-70% opacity-0"
          >
            Nuestras líneas de negocio
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
                  <LineasNegocio {...linea} index={0} />{" "}
                  {/* Set index to 0 for carousel items to avoid staggering */}
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

  // Desktop view with animations and added index prop
  return (
    <section
      id="lineas"
      className="py-16"
      style={{
        background: getBackground(),
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h3
          ref={titleRef}
          className="text-center text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] from-30% via-[#801AE5] via-% to-[#09CE69] to-70% opacity-0"
        >
          Nuestras líneas de negocio
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
          {lineas.slice(0, 4).map((linea, idx) => (
            <LineasNegocio key={idx} {...linea} index={idx} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {lineas.slice(4, 7).map((linea, idx) => (
            <LineasNegocio key={idx + 4} {...linea} index={idx} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[66.666%] mx-auto">
          {lineas.slice(7, 9).map((linea, idx) => (
            <LineasNegocio key={idx + 7} {...linea} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
