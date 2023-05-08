let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

function mostrarProductos(container, productos) {
    productos.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
        <img src="${product.foto}">
        <p>${product.nombre}</p>
        <p class="precio">$ ${product.precio}</p>
        `;


        let comprar = document.createElement("button")
        comprar.innerText = "comprar";
        comprar.className = "comprar";

        content.append(comprar);

        //eventos
        comprar.addEventListener("click", () => {

            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

            if (repeat) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad++;
                    }
                });
            } else {
                carrito.push({
                    id: product.id,
                    foto: product.foto,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                });
            }
            // uso de toastify
            Toastify({
                text: `Agregaste ${product.nombre} al carrito `,
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #0074ae, #00aaff)",
                    color: "#000000",
                },
                onClick: function () { } // Callback after click
            }).showToast();


            console.log(carrito);
            carritoCounter();
            saveLocal();
        });
        container.appendChild(content);
    });
};


function filtrarMostrarcompu() {
    const contenedorgorras = document.getElementById("gorras");
    const productosFiltrado = productos.filter(p => p.categoria === 'gorras');

    mostrarProductos(contenedorgorras, productosFiltrado)
}

function filtrarMostrarShort() {
    const contenedorShort = document.getElementById("Short");
    const productosFiltrado = productos.filter(p => p.categoria === 'Short');

    mostrarProductos(contenedorShort, productosFiltrado)
}
function filtrarMostrarRemera() {
    const contenedorRemera = document.getElementById("remera");
    const productosFiltrado = productos.filter(p => p.categoria === 'remera');

    mostrarProductos(contenedorRemera, productosFiltrado)
}

filtrarMostrarcompu();
filtrarMostrarShort();
filtrarMostrarRemera();

//set item
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

//get item
JSON.parse(localStorage.getItem("carrito")); 