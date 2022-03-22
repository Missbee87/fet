const almacenados = localStorage.getItem("listaProductos");
const baseDeDatos = JSON.parse(almacenados);


document.addEventListener("DOMContentLoaded", () => {
    fetchData()
})
const fetchData = async () => {
    try {
        const res = await fetch("data/datos.json")
        const data = await res.json()
        console.log(data)
        
        localStorage.setItem('baseDeDatos', JSON.stringify(data));
        const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
         
        for (const producto of data) {
            guardarLocal(producto.id, JSON.stringify(producto));


        }
        guardarLocal("listaProductos", JSON.stringify(data));
        
        
        
        
    }catch (error){
        console.log(error)
    }
  
  }
 


let carrito = [];


const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#botonVaciar');
const DOMbotonComprar = document.querySelector('#botonComprar');
const miLocalStorage = window.localStorage;
 
function renderizarProductos()  {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-6');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = 'Agregar al carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });

}


function anyadirProductoAlCarrito(evento) {
    
    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito();
    guardarCarritoEnLocalStorage();

}


function renderizarCarrito() {
   
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
           return itemId === item ? total += 1 : total;
        }, 0);
        
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'Eliminar';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    
    DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(evento) {
    
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}

function calcularTotal() {
     
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
    localStorage.clear();
}
function guardarCarritoEnLocalStorage () {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage () {
    
    if (miLocalStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

cargarCarritoDeLocalStorage();
renderizarProductos();
renderizarCarrito();





const button = document.querySelector('#botonComprar');
botonComprar.addEventListener('click', function () {

    Toastify({
        text: "Compra realizada correctamente",
        className: "info",
        position: "center",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    });

    const buttonV = document.querySelector('#botonVaciar');
    botonVaciar.addEventListener('click', function () {
    
        Toastify({
            text: "El carrito se vació correctamente",
            className: "info",
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
        });

        const tratamiento = {
            nombre: "ceramico",
            precio: 10000,
            promociones: {
                efectivo: "30% de descuento",
                tarjeta_visa:"12 cuotas",
            }
        };
        
        console.log(tratamiento?.nombre || "la propiedad no existe")
        console.log(tratamiento?.carro || "la propiedad no existe")
        
        
        
        let {
            nombre,
            precio,
            promociones: {efectivo},
        } = tratamiento;
        console.log(`nombre: ${nombre}`);
        console.log(`precio: ${precio}`);
        console.log(`promocion en efectivo: ${efectivo}`);
        
        const recibeObjeto = ({ nombre, precio }) => {
            console.log(nombre,precio);
        };
        
        recibeObjeto(tratamiento);
        
        const capacitaciones = ["lustrado", "pulido", "sacabollos","polarizado"];
        const [cap1, cap2] = capacitaciones;
        console.log(cap2);

const btn = document.querySelector("#botonComprar");
const msg = document.querySelector("#mensaje");

botonComprar.addEventListener("click", ()=> {
    msg.classList.add("active");

    setTimeout(()=>{
        msg.classList.remove("active");
    }, 3000)
})


