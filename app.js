// ponemos el primer imput del html
const inputResponsable = document.querySelector('input:nth-of-type(1)');

// el otro input que es el de agregar tareas
const inputTarea = document.querySelector('input:nth-of-type(2)');

// para selecionar el btn principal 
const boton = document.querySelector('button');

//Ubicamos el contenedor donde se van a ir listando todas las tareas creadas
const listaDeTareas = document.getElementById('lista-de-tareas');

// reloj 
const reloj = document.createElement('div');
reloj.style.cssText = 'position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.8); color: white; padding: 10px 15px;';
document.body.appendChild(reloj);
setInterval(() => reloj.innerText = `${new Date().toLocaleTimeString()}`, 1000);

// Creamos y agregamos el elemento visual del contador de tareas
const contadorTareas = document.createElement('div');
contadorTareas.style.cssText = 'font-weight: bold; margin-bottom: 10px; font-size: 20px;';
contadorTareas.innerText = 'Total de tareas que tienes: 0';
listaDeTareas.parentNode.insertBefore(contadorTareas, listaDeTareas);

//Función que cuenta cuántas tareas hay en pantalla y actualiza el texto
function actualizarContador() {
  const total = document.querySelectorAll('.tarea').length;
  contadorTareas.innerText = `Total de tareas que tienes: ${total}`;
}

// el chismoso para que al darle click agrega tarea
boton.addEventListener('click', agregarTarea);

// Recorremos ambos inputs para al darle enter funque
[inputResponsable, inputTarea].forEach(input => {
  if (input) {
    input.addEventListener('keydown', (e) => {
      // Si la tecla presionada es enter también disparamos la función
      if (e.key === 'Enter') {
        agregarTarea();
      }
    });
  }
});

//Definimos la función principal encargada de validar datos y crear la tarjeta de tarea
function agregarTarea() {
  // Guardamos el valor del responsable limpiando cualquier espacio vacio
  const responsableVal = inputResponsable ? inputResponsable.value.trim() : '';
  
  // Guardamos el valor de la tarea también sin espacios vacíos
  const tareaVal = inputTarea ? inputTarea.value.trim() : '';

  // miramos que ningun campo este vacio para continuar
  if (responsableVal !== "" && tareaVal !== "") {
    
    // Creamos un elemento <div> nuevo en memoria que representará la tarjeta de la tarea
    let tareaNueva = document.createElement('div');
    
    // css
    tareaNueva.classList.add('tarea');

    // Creamos un bloque <div> interno para organizar el texto del responsable y la tarea
    let contenidoDiv = document.createElement('div');
    
    // Inyectamos el texto estructurado con etiquetas HTML dentro de ese bloque
    contenidoDiv.innerHTML = `<strong>Responsable:</strong> ${responsableVal} <br><strong>Tarea:</strong> ${tareaVal}`;
    
    // Añadimos el bloque de texto dentro de la tarjeta principal de la tarea
    tareaNueva.appendChild(contenidoDiv);

    // Creamos otro contenedor div para barra 
    let contenedorProgreso = document.createElement('div');
    
    // Le asignamos la clase CSS correspondiente barra-contenedor
    contenedorProgreso.classList.add('barra-contenedor');
    
    // Aplicamos estilos 
    contenedorProgreso.style.display = 'flex';
    contenedorProgreso.style.alignItems = 'center';
    contenedorProgreso.style.gap = '10px';

    // Creamos un elemento <input> de tipo 'range' un slider o barrita deslizable
    let rangoBarra = document.createElement('input');
    rangoBarra.type = 'range';
    rangoBarra.min = '0'; 
    rangoBarra.max = '100'; 
    rangoBarra.value = '0'; 
    rangoBarra.style.flex = '1';
    rangoBarra.style.cursor = 'pointer';

    let spanPorcentaje = document.createElement('span');
    spanPorcentaje.innerText = '0%';
    spanPorcentaje.style.minWidth = '45px';
    spanPorcentaje.style.fontWeight = 'bold';

    // Escuchamos el movimiento del mouse
    rangoBarra.addEventListener('input', (e) => {
      // Capturamos el valor numérico
      const valor = e.target.value;
      // Actualizamos el texto del span concatenándole el símbolo %
      spanPorcentaje.innerText = valor + '%';
    });

    // Metemos tanto el slider como el texto del porcentaje dentro de su contenedor
    contenedorProgreso.append(rangoBarra, spanPorcentaje);
    
    // Añadimos el contenedor de la barra a la tarjeta principal de la tarea
    tareaNueva.appendChild(contenedorProgreso);

    // Creamos un contenedor div para agrupar los botones o iconos de acción
    let iconosDiv = document.createElement('div');
    iconosDiv.style.display = 'flex';
    iconosDiv.style.alignItems = 'center';

    // Creamos el icono de completar tarea el chulo verde de Bootstrap Icons
    let completar = document.createElement('i');
    completar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
    
    // Escuchamos el clic sobre el icono verde
    completar.addEventListener('click', () => {
      // Activa o desactiva la clase CSS '.completada' en la tarea para ponerla negra y tachada
      tareaNueva.classList.toggle('completada');
    });

    // Creamos el icono de eliminar tarea la papelera roja de Bootstrap Icons
    let eliminar = document.createElement('i');
    eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
    
    // Escuchamos el clic sobre la papelera para borrar la tarjeta entera
    eliminar.addEventListener('click', () => {
      tareaNueva.remove();
      // Actualizamos el contador restando al borrar la tarea
      actualizarContador();
    });

    // Agrupamos ambos iconos dentro de su contenedor de iconos
    iconosDiv.append(completar, eliminar);
    
    // Añadimos el bloque de iconos a la tarjeta principal de la tarea
    tareaNueva.appendChild(iconosDiv);

    // Insertamos la tarjeta completa con todos sus elementos dentro de la lista general en el HTML
    listaDeTareas.appendChild(tareaNueva);

    // Actualizamos el contador sumando al crear la tarea
    actualizarContador();

    // Limpiamos el contenido del input de la tarea para dejarlo listo para la siguiente
    if (inputTarea) inputTarea.value = '';
    
    // Limpiamos también el input del responsable
    if (inputResponsable) inputResponsable.value = '';
    
    // Devolvemos el foco (el cursor parpadeando) al input del responsable para mayor comodidad
    if (inputResponsable) inputResponsable.focus();
    
  } else {
    alert('Complete el campo que esta vacio para continuar.');
  }
}