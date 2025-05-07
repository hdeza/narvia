/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";

// Componente que recrea el formulario de contacto según el diseño proporcionado
export default function Contactanos() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log("Datos del formulario:", formData);
    // Reset form after submission if needed
    // setFormData({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0C0D14] py-12">
      <div className="w-full max-w-2xl p-14 mx-4 rounded-lg relative overflow-hidden border border-white/20">
        {/* Decorative divider line at top */}
        <div className="w-56 h-px bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 absolute top-0 left-1/2 -translate-x-1/2"></div>

        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Escríbenos
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Queremos leerte y conocer tus inquietudes o sugerencias
        </p>

        <div>
          <div className="mb-6">
            <label htmlFor="nombre" className="block text-white mb-2">
              Nombre:
            </label>
            <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[#801AE5] to-[#09CE69] overflow-hidden">
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                className="w-full rounded-2xl bg-[#181920] text-white px-4 py-3 outline-none border-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-white mb-2">
              Email:
            </label>
            <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[#801AE5] to-[#09CE69] overflow-hidden">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@gmail.com"
                className="w-full rounded-2xl bg-[#181920] text-white px-4 py-3 outline-none border-none"
              />
            </div>
          </div>

          <label htmlFor="mensaje" className="block text-white mb-2">
            Mensaje:
          </label>
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-[#801AE5] to-[#09CE69] mb-6 overflow-hidden">
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Escribe algo..."
              rows={4}
              className="w-full rounded-2xl bg-[#181920] text-white px-4 py-3 outline-none border-none resize-none"
            ></textarea>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:opacity-90 transition-opacity flex items-center justify-center mb-12"
          >
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
          </button>
        </div>

        {/* Background glow effect */}
        <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-96 h-72 bg-gradient-to-r from-purple-700 via-blue-600 to-purple-700 rounded-full opacity-30 blur-3xl"></div>
      </div>
    </div>
  );
}
