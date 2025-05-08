"use client";

import React, { useRef, useEffect } from "react";
import MisionVisionCard from "./MisionVisionCards";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MisionVision() {
  const titleRef = useRef<HTMLButtonElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!titleRef.current || !descriptionRef.current) return;

    // Animation for the section title and description
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Set initial state
    gsap.set([titleRef.current, descriptionRef.current], {
      y: 30,
      opacity: 0,
    });

    // Animate title
    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    });

    // Animate description
    tl.to(
      descriptionRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section className="flex flex-col items-center py-15">
      <button
        ref={titleRef}
        className="relative text-primary p-[1px] rounded-full bg-gradient-to-r from-[#801AE5] to-[#09CE69] opacity-0"
      >
        <div className="bg-[#0C0D14]/90 transition-colors px-15 py-2 rounded-full font-bold">
          Misión y Visión
        </div>
      </button>
      <p
        ref={descriptionRef}
        className="text-center max-w-5xl mt-4 px-4 opacity-0"
      >
        Conoce nuestros principios fundamentales que guían cada proyecto y
        decisión
      </p>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-7xl mt-8 items-stretch px-4">
        {[
          {
            iconSmall: {
              src: "/bussiness-computer.svg",
              alt: "bussiness computer",
            },
            title: "Misión",
            description:
              "Es misión de NARVIA, ofrecer soluciones tecnológicas, innovadoras e integrales, adaptables a las necesidades y requerimientos de nuestros clientes, fomentando su desarrollo, competitividad, optimización y mejoramiento de la calidad, mediante un equipo de profesionales en tecnologías de información altamente competitivo.",
            className: "md:col-span-2",
          },
          {
            iconSmall: {
              src: "/bussiness-computer-finance.svg",
              alt: "bussiness computer finance",
            },
            title: "Visión",
            description:
              "Ser una empresa de reconocido prestigio nacional, con excelencia en desarrollo de aplicaciones a los diferentes sectores económicos, brindando un producto de excelente calidad y en donde el mejoramiento continuo en todas las áreas sean de agrado a nuestros clientes, de eficiente gestión, competitiva, con alianzas estratégicas en el ámbito nacional e internacional, comprometida con el servicio al cliente y la formación integral de su talento humano.",
            className: "md:col-span-2",
          },
          {
            iconSmall: {
              src: "/machine-learning.svg",
              alt: "machine learning",
            },
            title: "Políticas de calidad",
            description:
              "NARVIA tiene como política asegurar la calidad de todas las actividades (diseño, desarrollo, comercialización y servicio técnico), mediante el mejoramiento continuo de los procesos, prestando un excelente servicio, teniendo una infraestructura adecuada, con personal competente y motivado; satisfaciendo y superando así las expectativas y requisitos de los consumidores, comprometiéndose así con la búsqueda del desarrollo empresarial. De esta manera consolidamos la lealtad de nuestros clientes, incrementando la sostenibilidad económica y el desarrollo integral de nuestros colaboradores, proveedores, medio ambiente y comunidad en general.",
            className: "md:col-span-4",
          },
        ].map((card, idx) => (
          <MisionVisionCard key={idx} {...card} />
        ))}
      </section>
    </section>
  );
}
