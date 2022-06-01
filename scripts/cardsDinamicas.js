function crearCards(array) {
  const divCards = document.createElement("div");
  array.forEach((element) => {
    const divCard = document.createElement("div");
    divCard.appendChild(crearDescripcion(element));
    divCard.appendChild(crearEspecificaciones(element));

    const boton = document.createElement("button");
    boton.textContent = "Ver Vehículo";
    boton.classList.add("botonVehículo");
    divCard.appendChild(boton);
    divCards.appendChild(divCard);
  });
  return divCards;
}

function crearDescripcion(obj) {
  const divDescripcion = document.createElement("div"),
    titulo = document.createElement("h2"),
    descripcion = document.createElement("h3"),
    precio = document.createElement("h4");

  precio.classList.add("dinero");

  titulo.textContent = obj.titulo;
  descripcion.textContent = obj.descripcion;
  precio.textContent = obj.precio;

  divDescripcion.appendChild(titulo);
  divDescripcion.appendChild(descripcion);
  divDescripcion.appendChild(precio);

  return divDescripcion;
}

// function crearEspecificaciones(obj) {
//   const divEspecificaciones = document.createElement("div"),
//     titulo = document.createElement("h"),
//     descripcion = document.createElement("h3"),
//     precio = document.createElement("h4");

//   return divEspecificaciones;
// }

export default crearCards;
