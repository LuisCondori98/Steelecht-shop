const containerProducto = document.getElementById("container-productos")
const containerProductoFiltrados = document.getElementById("container-productos2")
const iconoCarrito = document.getElementById("icarrito")

fetch("/js/productos.json")
    .then((respo) => respo.json())
    .then((data) => {

        agregarCardProducto = product => {
            const divProd = document.createElement("div")
            divProd.className = "item-producto"
            divProd.innerHTML = `
            <img src="${product.img}">
            <div class="descripcion">
                <h4>${product.nombre}</h4>
                <h5>${product.precio}</h5>
                <button type="submit" class="btn-agregar">Agregar</button>
            </div>
            `

            containerProducto.append(divProd);

            buscador(product);
        }
        
        for (const product of data) {
            agregarCardProducto(product);
        }

        botonAgregar();
    })


const buscador = (producto) => {
    const buscador = document.getElementById("input-buscar")

    buscador.addEventListener("focus", () => {
        buscador.addEventListener("input", () => {

            if(buscador.value === producto.nombre || buscador.value === producto.marca) {
                console.log(producto)
                containerProducto.remove()
                botonAgregar()
                setTimeout(() => {
                    const divProd = document.createElement("div")
                    divProd.className = "item-producto"
                    divProd.innerHTML = `
                    <img src="${producto.img}">
                    <div class="descripcion">
                        <h4>${producto.nombre}</h4>
                        <h5>${producto.precio}</h5>
                        <button type="submit" class="btn-agregar">Agregar</button>
                    </div>
                    `
                containerProductoFiltrados.append(divProd)
                botonAgregar();
                }, "1000")
            }

            if(buscador.value === "") {
                containerProductoFiltrados.remove();
            }
        })
    })
}

const botonAgregar = () => {
    const botonAgregarCarrito = document.getElementsByClassName("btn-agregar")

    for(const buttons of botonAgregarCarrito){

        buttons.addEventListener("click", () => {
        
        iconoCarrito.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check-fill" viewBox="0 0 16 16">
        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
        </svg>
        `

        Toastify({
            text: "Agregado al carrito",
            gravity: "top",
            position: "right",
            duration: 2000,
            style: {
            background: "black",
            "border-radius" : "10px",
            },
            }).showToast();
        })
    }
}

const botonNewslatter = document.getElementById("btn-newslatter").addEventListener("click", () => {
    Toastify({
        text: "Enviado",
        gravity: "bottom",
        style: {
            background: "rgb(177, 0, 0)",
            "border-radius" : "10px"
        },
      }).showToast();
})

const containerFiltro = document.getElementById("filters")
const filtro = document.getElementById("ifilter")

filtro.addEventListener("focus", () => {
    const select = document.createElement("ul")
    select.className = "select-filtro"
    select.id = "select-filter"
    select.innerHTML = `
    <li value="mayor">Mayor precio</li>
    <li value="menor">Menor precio</li>
    <li value="destacados">Destacados</li>
    `
    containerFiltro.append(select);

    filtro.addEventListener("blur", () => {
        select.remove();
    })
})
