import crearTabla from "./tablaDinamica.js";
import Anuncio_Auto from "./anuncio_auto.js";

const listadoAnuncios = localStorage.getItem("Anuncios")
  ? JSON.parse(localStorage.getItem("Anuncios"))
  : [];

console.log("Listado Anuncios: ");
console.log(listadoAnuncios);

if (listadoAnuncios.length > 0) {
  actualizarTabla();
}
window.addEventListener("click", (e) => {
  if (e.target.matches("tr td")) {
    let id = e.target.parentElement.dataset.id;
    llenarFormulario(listadoAnuncios.find((anuncio) => anuncio.id == id));
    document.getElementById("btnEliminar").hidden = false;
    document.getElementById("btnCancelar").hidden = false;
  } else if (e.target.matches("#btnCancelar")) {
    $formAnuncios.reset();
    document.getElementById("btnCancelar").hidden = true;
    document.getElementById("btnEliminar").hidden = true;
  } else if (e.target.matches("#btnEliminar")) {
    handlerDelete(parseInt($formAnuncios.id.value));
    $formAnuncios.reset();
  }
});

function llenarFormulario(anuncio) {
  const {
    id,
    titulo,
    transaccion,
    descripcion,
    precio,
    puertas,
    kms,
    potencia,
  } = $formAnuncios;

  id.value = anuncio.id;
  titulo.value = anuncio.titulo;
  transaccion.value = anuncio.transaccion;
  descripcion.value = anuncio.descripcion;
  precio.value = anuncio.precio;
  puertas.value = anuncio.puertas;
  kms.value = anuncio.kms;
  potencia.value = anuncio.potencia;
}

const $formAnuncios = document.forms[0];
$formAnuncios.addEventListener("submit", (e) => {
  const formulario = e.target;
  e.preventDefault();

  const anuncioForm = new Anuncio_Auto(
    formulario.id.value,
    formulario.titulo.value,
    formulario.transaccion.value,
    formulario.descripcion.value,
    formulario.precio.value,
    formulario.puertas.value,
    formulario.kms.value,
    formulario.potencia.value
  );
  console.log("Anuncio antes de if ALTA: ");
  console.log(anuncioForm);

  // Alta anuncio
  if (anuncioForm.id === "") {
    anuncioForm.id = Date.now();
    console.log("Anuncio dentro de if ALTA: ");
    console.log(anuncioForm);
    handlerAlta(anuncioForm);
  }
  // Modificación anuncio
  else {
    handlerModificacion(anuncioForm);
  }
  formulario.id.value = "";
  $formAnuncios.reset();
});

function actualizarTabla() {
  const container = document.querySelector(".table-container");
  while (container.children.length > 0) {
    container.removeChild(container.firstElementChild);
  }
  const data = JSON.parse(localStorage.getItem("Empleados"));
  if (data) {
    container.appendChild(crearTabla(listadoAnuncios));
    console.log("Tabla: ");
    console.log(container);
  }
}

const actualizarStorage = (data) => {
  localStorage.setItem("Anuncios", JSON.stringify(data));
};

const mostrarTablaDelay = (array) => {
  document.getElementById("spinner").hidden = false;
  setTimeout(() => {
    document.getElementById("spinner").hidden = true;
    actualizarStorage(array);
    actualizarTabla();
  }, 3000);
};

const handlerAlta = (nuevoAnuncio) => {
  console.log("Alta");
  listadoAnuncios.push(nuevoAnuncio);
  mostrarTablaDelay(listadoAnuncios);
};

const handlerModificacion = (anuncioModif) => {
  console.log("Modificación");
  let index = listadoAnuncios.findIndex(
    (anuncio) => anuncio.id == anuncioModif.id
  );
  console.log("indice: " + index);
  if (index > -1) {
    listadoAnuncios.splice(index, 1);
    listadoAnuncios.push(anuncioModif);
    listadoAnuncios.sort((a, b) => a.id - b.id);
  }
  mostrarTablaDelay(listadoAnuncios);
  document.getElementById("btnCancelar").hidden = true;
  document.getElementById("btnEliminar").hidden = true;
};

const handlerDelete = (id) => {
  console.log("Eliminar");
  let index = listadoAnuncios.findIndex((anuncio) => anuncio.id == id);
  if (index > -1) {
    listadoAnuncios.splice(index, 1);
    listadoAnuncios.sort((a, b) => a.id - b.id);
  }
  mostrarTablaDelay(listadoAnuncios);
  document.getElementById("btnCancelar").hidden = true;
  document.getElementById("btnEliminar").hidden = true;
};
