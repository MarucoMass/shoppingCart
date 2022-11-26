const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


// llamada a eventos
eventListeners();
function eventListeners () {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarCarritoHTML();
    });
}

// Funciones
// click en el boton de agregar
function agregarCurso(e){
    e.preventDefault();
    let contieneCarrito = e.target.classList.contains('agregar-carrito');
    
    if (contieneCarrito) {
        let cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}

function eliminarCurso(e){
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        console.log(articulosCarrito)
        carritoHTML()
    }
}

// extraer la info del elemento padre
function leerDatosCurso (curso) {
    
    // creo el objeto con los datos
    const infoCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('.card_info h4').textContent,
        precio: curso.querySelector('.card_info .precio').textContent,
        cantidad: 1
    }
    
    // reviso si ya existe en el carrito, si exste aumenta la cantidad, si no solo agrego
    const existe = articulosCarrito.find(curso => curso.id === infoCurso.id);
    existe ? existe.cantidad++ : articulosCarrito = [...articulosCarrito,infoCurso];

    // funcion que imprime en el html
    carritoHTML();
}


// imprimir en el html del carrito
function carritoHTML(){

    limpiarCarritoHTML();

    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width=150></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id=${id}>X</a></td>
        `;

        contenedorCarrito.appendChild(row);
    });

}

function limpiarCarritoHTML(){
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

