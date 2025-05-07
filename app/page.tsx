import Contactanos from "./components/Contactanos";
import Header from "./components/Header";
import Main from "./components/Main";
import NuestrasCapacidades from "./components/NuestrasCapacidades";
import NuestrasLineasNegocio from "./components/NuestrasLineasNegocio";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <NuestrasCapacidades />
      <NuestrasLineasNegocio />
      <Contactanos />
      <Footer />
    </>
  );
}
