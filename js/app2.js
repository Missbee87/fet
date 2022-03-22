Swal.fire('Bienvenidos')

const btn = document.querySelector('#myBtn')
btn.addEventListener('click', () => {

    Swal.fire({
        title: 'Genial!',
        text: 'Te esperamos en Brasil 456',
        icon: 'success',
        confirmButtonText: 'Aceptar'
})
})
const DateTime = luxon.DateTime
const dt = DateTime.fromObject(
    { day: 22, hour: 12, month: 2 },
    { zone: 'America/Buenos_Aires', numberingSystem: 'beng' }
 )

console.log( dt.toString() )
const now = DateTime.now()
console.log( now.toString() )


const nav = document.querySelector(".contenido");
console.log(nav);

nav.addEventListener("mouseenter", () => {
    console.log("entrando en la navegacion");
});
nav.addEventListener("mouseout", () => {
    console.log("saliendo de la navegacion");
});


