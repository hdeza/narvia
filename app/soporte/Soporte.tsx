/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { sendEmail } from "../services/emailService";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Componente que recrea el formulario de soporte según el diseño proporcionado
export default function Soporte() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  // Refs para animación
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const inputsRef = useRef([]);
  const buttonRef = useRef(null);
  const glowRef = useRef(null);

  // Animaciones
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          inputsRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2,
          },
          "-=0.3"
        )
        .fromTo(
          buttonRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.3"
        );

      // Animación de pulso para el glow
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.1,
          opacity: 0.4,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validación básica del formulario
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.mensaje ||
      !formData.empresa
    ) {
      setSubmitStatus({
        type: "error",
        message: "Por favor, completa todos los campos del formulario.",
      });
      return;
    }

    // Deshabilitar el botón y mostrar estado de carga
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Prepara los datos para el template de EmailJS
    // Usamos el mismo formato de templateParams que en Contactanos
    const templateParams = {
      name: formData.nombre,
      email: formData.email,
      message: `${formData.mensaje}\n\nEmpresa/Cliente: ${formData.empresa} `,
      title: "NarvIA - Soporte", // Puedes personalizar este título si lo deseas
      time: new Date().toLocaleString(),
    };

    console.log("Enviando email con parámetros:", templateParams);

    try {
      const result = await sendEmail(templateParams);

      if (result.success) {
        console.log("Email enviado correctamente");
        setSubmitStatus({
          type: "success",
          message:
            "¡Tu caso ha sido registrado correctamente! Nos pondremos en contacto pronto.",
        });
        // Limpiar el formulario después del éxito
        setFormData({ nombre: "", empresa: "", email: "", mensaje: "" });
      } else {
        console.error("Error al enviar email:", result.error);
        setSubmitStatus({
          type: "error",
          message:
            "Hubo un problema al enviar tu caso. Por favor, intenta nuevamente.",
        });
      }
    } catch (error) {
      console.error("Error al enviar email:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Error al enviar el caso. Por favor, intenta nuevamente más tarde.",
      });
    } finally {
      // Habilitar el botón nuevamente
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={sectionRef}
      id="soporte"
      className="flex items-center justify-center min-h-screen bg-[#0C0D14] py-12 mt-20"
    >
      <div className="w-full max-w-2xl p-8 md:p-14 mx-4 rounded-lg relative overflow-hidden border border-white/20">
        {/* Decorative divider line at top */}
        <div className="w-56 h-px bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 absolute top-0 left-1/2 -translate-x-1/2"></div>

        <h1
          ref={titleRef}
          className="text-3xl font-bold text-center text-white mb-4 opacity-0"
        >
          Radica tu caso para soporte
        </h1>
        <p
          ref={subtitleRef}
          className="text-center text-gray-300 mb-8 opacity-0"
        >
          Si nuestros clientes requieren de un soporte, mantenimiento o
          consultoría, nos pueden contactar por medio de este formulario.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            className="mb-6"
            ref={(el) => {
              inputsRef.current[0] = el as never;
            }}
          >
            <label htmlFor="nombre" className="block text-white mb-2">
              Nombre del solicitante:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              className="w-full rounded-2xl bg-[#181920] text-white px-4 py-3 outline-none border-none"
              required
            />
          </div>
          <div
            className="mb-6"
            ref={(el) => {
              inputsRef.current[1] = el as never;
            }}
          >
            <label htmlFor="empresa" className="block text-white mb-2">
              Empresa - Cliente solicitante:
            </label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              placeholder="Nombre de la empresa o cliente"
              className="w-full rounded-2xl bg-[#181920] text-white px-4 py-3 outline-none border-none"
              required
            />
          </div>

          <div
            className="mb-6"
            ref={(el) => {
              inputsRef.current[2] = el as never;
            }}
          >
            <label htmlFor="email" className="block text-white mb-2">
              Correo del solicitante:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@gmail.com"
              className="w-full rounded-2xl bg-[#181920] text-white px-4 py-3 outline-none border-none"
              required
            />
          </div>

          <div
            className="mb-6"
            ref={(el) => {
              inputsRef.current[3] = el as never;
            }}
          >
            <label htmlFor="mensaje" className="block text-white mb-2">
              Descripción del requerimiento:
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Escribe algo..."
              rows={4}
              className="w-full rounded-2xl bg-[#181920] text-white px-4 py-3 outline-none border-none resize-none"
              required
            ></textarea>
          </div>

          {submitStatus.type && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center ${
                submitStatus.type === "success"
                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                  : "bg-red-500/20 text-red-300 border border-red-500/30"
              }`}
            >
              {submitStatus.type === "success" ? (
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <span>{submitStatus.message}</span>
            </div>
          )}

          <button
            type="submit"
            ref={buttonRef}
            disabled={isSubmitting}
            className={`relative z-10 w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:opacity-90 transition-opacity flex items-center justify-center mb-12 opacity-0 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enviando...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2 transform rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Enviar
              </>
            )}
          </button>
        </form>

        {/* Background glow effect */}
        <div
          ref={glowRef}
          className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-96 h-72 bg-gradient-to-r from-purple-700 via-blue-600 to-purple-700 rounded-full opacity-30 blur-3xl pointer-events-none"
        ></div>
      </div>
    </div>
  );
}
