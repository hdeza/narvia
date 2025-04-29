"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar cliente, tamaño de pantalla y scroll
  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Enlaces de navegación
  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Nuestras capacidades", href: "#capacidades" },
    { name: "Líneas de negocio", href: "#lineas" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Contáctanos", href: "#contacto" },
  ];

  // Clases condicionales para el header
  const headerClasses = `
    w-full px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50
    ${
      scrolled
        ? "bg-[#0C0D14]/80 backdrop-blur-sm"
        : isMobile
        ? "bg-gradient-to-b from-[#0C0D14]/70 to-transparent"
        : "bg-[#0C0D14]/30 backdrop-blur-[2px]"
    }
    transition-all duration-300
  `;

  return (
    <header className={headerClasses}>
      {/* Logo */}
      <div className="relative w-[45px] h-[45px] md:w-[55px] md:h-[55px]">
        <Image
          alt="NarvIA Logo"
          src="/logoNarvIA.webp"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Navegación en Desktop */}
      {isClient && !isMobile && (
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-white hover:text-[#801AE5] transition-colors text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}

      {/* Botón de soporte (solo desktop) */}
      {isClient && !isMobile && (
        <button className="hidden md:block text-white text-sm font-medium px-5 py-2 rounded-full bg-gradient-to-r from-[#801AE5] to-[#09CE69] hover:opacity-90 transition-opacity">
          Soporte
        </button>
      )}

      {/* Menú hamburguesa (visible solo en móvil) */}
      {isClient && isMobile && (
        <button className="text-white p-2 md:hidden">
          <RxHamburgerMenu size={28} />
        </button>
      )}
    </header>
  );
}
