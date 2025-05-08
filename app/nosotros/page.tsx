import React from "react";
import MainNosotros from "./components/MainNosotros";
import Contactanos from "../components/Contactanos";
import MisionVision from "./components/MisionVision";
import Representacion from "./components/Representacion";
export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-[#0C0D14]">
      <MainNosotros />
      <MisionVision />
      <Representacion />
      <Contactanos />
    </main>
  );
}
