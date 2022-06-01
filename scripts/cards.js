// import Anuncio_Auto from "./anuncio_auto.js";
// import crearCards from "./cardsDinamicas.js";

const listadoAnuncios = localStorage.getItem("Anuncios")
  ? JSON.parse(localStorage.getItem("Anuncios"))
  : [];

console.log(listadoAnuncios);
