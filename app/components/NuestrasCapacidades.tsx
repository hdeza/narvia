"use client";

import React, { useRef, useEffect } from "react";
import CapacidadCard from "./CapacidadCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NuestrasCapacidades() {
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

  const capacidades = [
    {
      iconSmall: {
        src: "/bussiness-computer.svg",
        alt: "bussiness computer",
      },
      imageMain: {
        src: "/analytics-bussiness.svg",
        alt: "analytics bussiness",
      },
      title: "Inteligencia de negocios (BI)",
      description:
        "Transformamos tus datos en decisiones inteligentes. Con soluciones automáticas y escalables, te damos control total y en tiempo real para entender y potenciar cada aspecto de tu negocio.",
      className: "md:col-span-2",
    },
    {
      iconSmall: {
        src: "/bussiness-computer-finance.svg",
        alt: "bussiness computer finance",
      },
      imageMain: { src: "/mobile-app.svg", alt: "mobile app" },
      title: "Desarrollo de Apps",
      description:
        "Toda tu operación en la palma de tu mano. Visualiza indicadores en tiempo real y captura datos clave —texto, fotos, ubicación y firmas— desde tu móvil, optimizando inventarios y decisiones al instante.",
      className: "md:col-span-2",
    },
    {
      iconSmall: {
        src: "/machine-learning.svg",
        alt: "machine learning",
      },
      imageMain: {
        src: "/machine-learning-model.svg",
        alt: "machine learning model",
      },
      title: "Machine Learning (ML)",
      description:
        "Impulsa el futuro de tu empresa con predicciones avanzadas e inteligencia artificial. Analizamos datos, documentos, imágenes y audios para generar insights y contenido que transforman tu estrategia.",
      className: "md:col-span-2",
    },
    {
      iconSmall: {
        src: "/industrial-robot.svg",
        alt: "industrial robot",
      },
      imageMain: { src: "/robot.svg", alt: "robot automation" },
      title: "Automatización Robótica de Procesos (RPA)",
      description:
        "Automatiza lo repetitivo y enfoca a tu equipo en lo estratégico. Extraemos información clave desde la web o tus archivos para convertirla en indicadores que impulsan decisiones inteligentes.",
      className: "md:col-span-3",
      hFull: true,
    },
    {
      iconSmall: { src: "/ar.svg", alt: "augmented reality" },
      imageMain: {
        src: "/ar-glasses.svg",
        alt: "augmented reality glasses",
      },
      title: "Realidad Virtual y Aumentada",
      description:
        "Diseñamos aplicaciones de realidad virtual y aumentada a la medida de tu empresa, transformando procesos complejos en experiencias inmersivas que mejoran la capacitación, optimizan operaciones y potencian la interacción con tus clientes.",
      className: "md:col-span-3",
      hFull: true,
    },
  ];

  return (
    <section id="capacidades" className="flex flex-col items-center py-16">
      <button
        ref={titleRef}
        className="relative text-primary p-[1px] rounded-full bg-gradient-to-r from-[#801AE5] to-[#09CE69] opacity-0"
      >
        <div className="bg-[#0C0D14]/90 transition-colors px-15 py-2 rounded-full font-bold">
          Nuestras Capacidades
        </div>
      </button>
      <p
        ref={descriptionRef}
        className="text-center max-w-5xl mt-4 px-4 opacity-0"
      >
        Nuestro equipo combina excelencia técnica y un enfoque humano
        excepcional para guiarte en la toma de decisiones estratégicas,
        impulsando resultados extraordinarios para tu empresa
      </p>
      <section className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full max-w-7xl mt-8 items-stretch px-4">
        {capacidades.map((card, idx) => (
          <CapacidadCard key={idx} {...card} index={idx} />
        ))}
      </section>
    </section>
  );
}
