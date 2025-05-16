import Contactanos from "./components/Contactanos";
import Main from "./components/Main";
import NuestrasCapacidades from "./components/NuestrasCapacidades";
import NuestrasLineasNegocio from "./components/NuestrasLineasNegocio";
import GptPersonalizado from "./components/GptPersonalizado";
export default function Home() {
  return (
    <>
      <Main />
      <GptPersonalizado />
      <NuestrasCapacidades />
      <NuestrasLineasNegocio />
      <Contactanos />
    </>
  );
}
