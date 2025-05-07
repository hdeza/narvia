import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0C0D14] text-white py-8 px-4 relative">
      {/* Borde superior degradado */}
      <div
        style={{
          height: "2px",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(90deg, #801AE5 0%, #0E1D6E 43%, #09CE69 90%)",
          }}
        />
      </div>
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-0 md:gap-12">
        {/* Logo Section */}
        <div className="mb-12 md:mb-0 flex flex-col items-center justify-center md:items-start md:justify-start md:mr-8 min-w-[180px]">
          <Image
            src="/logoNarvIA.webp"
            alt="NarvIA Logo"
            className="w-40"
            width={160}
            height={160}
          />
          <h2 className="text-4xl font-bold tracking-wide mt-2">NARVIA</h2>
        </div>

        {/* Content Sections */}
        <div className="w-full grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {/* Dirección */}
          <div className="flex flex-col items-start text-left">
            <h3 className="text-lg font-semibold mb-4">Dirección</h3>
            <p className="text-gray-300">Cra 75 #78-75</p>
            <p className="text-gray-300">Barranquilla, Colombia</p>
          </div>

          {/* Teléfono */}
          <div className="flex flex-col items-start text-left">
            <h3 className="text-lg font-semibold mb-4">Teléfono</h3>
            <p className="text-gray-300">+57 310 521 8150</p>
            <div className="mt-2">
              <a
                href="https://wa.me/573105218150"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-3 py-1 rounded-md flex items-center hover:bg-green-700 transition-colors"
              >
                <Image
                  src="/whatsapp.svg"
                  alt="Whatsapp"
                  className="w-5 h-5 mr-2"
                  width={20}
                  height={20}
                />
                Whatsapp
              </a>
            </div>
          </div>

          {/* Acerca de nosotros */}
          <div className="flex flex-col items-start text-left">
            <h3 className="text-lg font-semibold mb-4">Acerca de nosotros</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  Contáctanos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Soporte
                </a>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="flex flex-col items-start text-left">
            <h3 className="text-lg font-semibold mb-4">Redes sociales</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  LinkedIN
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
