let links = document.querySelectorAll("nav a");
console.log(links);

for (let i = 0; i < links.length; i += 1) {
links[i].addEventListener("click", pedirPagina);
}

function pedirPagina(e) {
    e.preventDefault();
    console.log(e.target.dataset.pagina);
    let url = `${e.target.dataset.pagina}.html`;
    console.log(url);



    const miPagina = document.querySelector("#miPagina");
    fetch(url).then((pagina) => {
        console.log(pagina);
        pagina.text().then((page) => {
        console.log(page);
        miPagina.innerHTML = page;

    })
    
    })
}
