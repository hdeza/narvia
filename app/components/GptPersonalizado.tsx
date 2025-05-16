"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GptPersonalizado() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      titleRef.current,
      paragraphRef.current,
      buttonRef.current,
      imageRef.current,
    ];

    if (elements.some((el) => el === null)) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Estado inicial
    gsap.set(elements, { opacity: 0, y: 40 });

    // Animaciones en orden
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    })
      .to(
        paragraphRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(
        imageRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full mt-10 p-4">
      <div className="relative w-full max-w-6xl rounded-2xl border border-[#0A325A] bg-[rgba(0,2,70,0.33)] shadow-[0px_4px_50px_0px_rgba(9,206,105,0.15)] flex flex-col md:flex-row justify-between items-center p-8 md:p-12">
        <div className="w-full md:w-3/5 space-y-6 z-10">
          <h1
            ref={titleRef}
            className="text-4xl lg:text-5xl font-semibold leading-tight"
            style={{
              background:
                "linear-gradient(90deg, #801AE5 30.97%, #09CE69 60.23%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Con NarvIA, cada empresa tiene su propio asistente inteligente
          </h1>

          <section className="relative">
            <p
              ref={paragraphRef}
              className="text-gray-200 text-base md:text-lg"
            >
              Un agente personalizado que entiende su información interna,
              responde con precisión y se adapta al rol de cada usuario,
              brindando respuestas útiles, ágiles y seguras, justo cuando se
              necesitan.
            </p>
            <article
              className="absolute left-1/2 -translate-x-1/2 bottom-0 z-0"
              style={{
                width: "700px",
                height: "60px",
                background:
                  "radial-gradient(ellipse at center, #09CEFF 0%, rgba(9,206,255,0.15) 60%, rgba(9,206,255,0) 100%)",
                filter: "blur(40px)",
                opacity: 0.6,
              }}
            />
          </section>

          <button
            ref={buttonRef}
            onClick={() => {
              const phoneNumber = "573105218150";
              const message =
                "Hola, vengo de tu sitio web NarvIA y me gustaría obtener más información.";
              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                message
              )}`;
              window.open(whatsappUrl, "_blank");
            }}
            className="mt-8 w-full justify-center md:w-auto inline-flex items-center h-16 px-8 md:px-16 rounded-2xl text-white text-xl font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer"
            style={{
              background: "linear-gradient(90deg, #801AE5 0%, #09CE69 100%)",
              backdropFilter: "blur(45px)",
            }}
          >
            <span className="mr-4">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </span>
            Solicita un Demo
          </button>
        </div>

        <section
          ref={imageRef}
          className="w-full md:w-2/5 flex justify-center mt-8 md:mt-0 opacity-0"
        >
          <section className="relative flex items-center justify-center">
            <article
              className="absolute left-1/2 -translate-x-1/2 bottom-0 z-0"
              style={{
                width: "220px",
                height: "60px",
                background:
                  "radial-gradient(ellipse at center, #09CEFF 0%, rgba(9,206,255,0.15) 60%, rgba(9,206,255,0) 100%)",
                filter: "blur(12px)",
                opacity: 0.8,
              }}
            />
            <Image
              src="/gptRoboto.webp"
              alt="Robot"
              width={800}
              height={800}
              className="relative z-10"
            />
          </section>
        </section>
      </div>
    </div>
  );
}
