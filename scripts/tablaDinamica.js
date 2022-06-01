function crearTabla(array) {
  const tabla = document.createElement("table");
  tabla.appendChild(crearCabecera(array[0]));
  tabla.appendChild(crearCuerpo(array));
  return tabla;
}

function crearCabecera(obj) {
  const thead = document.createElement("thead"),
    tr = document.createElement("tr");
  tr.classList.add("cabecera");
  thead.appendChild(tr);

  Object.keys(obj).forEach((key) => {
    if (key != "id") {
      const th = document.createElement("th");
      th.textContent = key;
      tr.appendChild(th);
    }
    // otra forma
    // tr.appendChild(document.createTextNode(key));
  });
  // otra forma de iterar en las keys del objeto
  // for (const key in obj) {
  //   // pregunta si el objeto 'object' tiene la propiedad 'key'
  //   if (Object.hasOwnProperty.call(object, key)) {
  //     const obj = object[key];
  //   }
  return thead;
}

function crearCuerpo(array) {
  const tbody = document.createElement("tbody");
  array.forEach((element, index) => {
    const tr = document.createElement("tr");
    tr.classList.add(index % 2 ? "colorPar" : "colorImpar", "pointer");
    tbody.appendChild(tr);
    for (const key in element) {
      if (key === "id") {
        tr.setAttribute("data-id", element[key]);
      } else {
        const td = document.createElement("td");
        td.textContent = element[key];
        tr.appendChild(td);
      }
    }
  });
  return tbody;
}

export default crearTabla;
