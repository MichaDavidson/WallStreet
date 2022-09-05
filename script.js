const carritoPedido = JSON.parse(localStorage.getItem("carrito")) ?? [];

/////// Arrays de productos ///////

const burgers = [
    {id: 1, nombre: "Bronx", precio: 1200, descripcion:"Doble medallon NotCo, cheddar vegano, cebolla caramelizada, guacamole y alioli", inCart: 0},
    {id: 2, nombre: "Queens", precio: 1300, descripcion:"Triple medallon NotCo, queso brie vegano, salsa criolla y aros de cebolla", inCart: 0},
    {id: 3, nombre: "Manhattan", precio: 1200, descripcion:"Doble medallon NotCo, cheddar vegano, cebolla caramelizada, guacamole y alioli", inCart: 0},
    {id: 4, nombre: "Brooklyn", precio: 1350, descripcion:"Triple medallón NotCo, provoleta y aros de cebolla", inCart: 0},
    {id: 5, nombre: "Bigapple", precio: 1400, descripcion:"Doble medallon NotCo, cheddar, Vacon y cebolla cirspy", inCart: 0},
    {id: 6, nombre: "Wallstreet", precio: 1500, descripcion:"Cuadruple medallon NotCo, queso brie vegano, cebolla caramelizada, portobellos y rúcula", inCart: 0}
]

const sides = [
    {id: 7, nombre:"Papas", descripcion: "Agregale cheddar o Vacon por $200 cada uno", precio: 700, inCart: 0}, 
    {id: 8, nombre:"Batatas", descripcion: "Agregale cheddar o Vacon por $200 cada uno", precio: 700, inCart: 0}
]

const postres = [
    {id: 9, nombre:"BananaSplit", descripcion:"Banana, tres bochas de helado de dulce de leche, crema, merenguitos y salsa de chocolate", precio: 800, inCart: 0}, 
    {id: 10, nombre:"Brownie", descripcion:"Brownie con bocha de helado de crema americana, bañado en salsa de chocolate", precio: 700, inCart: 0}
]

/////// Cards HTML /////// 

function cards (htmlId, productos) {
    productos.forEach((producto) => {
        document.getElementById(`${htmlId}`).innerHTML += 
        `<div class="col-6 col-md-4 ${producto.nombre}">
            <img class="${producto.nombre}__img" src="../images/${producto.id}.jpg" alt="Hamburguesa ${producto.nombre}">
            <h5 class="${producto.nombre}__titulo">
                <button class="${producto.nombre}__titulo" id="addToCart${producto.id}">${producto.nombre}</button>
            </h5>
            <div class="${producto.nombre}__detalles">
                <p>${producto.descripcion}</p>
                <p>$${producto.precio}</p>
            </div>
        </div>`
})};

function bebidasCards () {
    fetch('../products.json')
        .then((response) => response.json())
        .then(informacion => {
            let acumulador = "";
            informacion.forEach((producto) => {
                acumulador += `
                <div class="col-6 col-md-4 ${producto.nombre}">
                    <img class="${producto.nombre}__img" src="../images/${producto.id}.jpg" alt="${producto.nombre}">
                    <h5 class="${producto.nombre}__titulo">
                        <button class="${producto.nombre}__titulo" id="addToCart${producto.id}">${producto.nombre}</button>
                    </h5>
                    <div class="${producto.nombre}__detalles">
                        <p>${producto.descripcion}</p>
                        <p>$${producto.precio}</p>
                    </div>
                </div>`
            })
            document.getElementById("cardsBebidas").innerHTML = acumulador;
        });
        // agregarProductosAlPedido(producto);
};

cards("cardsBurgers", burgers);
cards("cardsSides", sides);
cards("cardsPostres", postres);

bebidasCards();

/////// Evento para agregar productos al carrito ///////

function agregarProductosAlPedido(productos) {
    const productosCarrito = document.getElementById('productosCarrito');
    productos.forEach((producto) => {
        document.getElementById(`addToCart${producto.id}`).addEventListener("click", () => {
            if (producto.inCart == 0) {
                carritoPedido.push(producto);
                producto.inCart ++;
            } else {
                producto.inCart ++
            };

            Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Agregaste ${producto.nombre} a tu pedido!`,
            showConfirmButton: false,
            timer: 1500});

            document.getElementById("carritoPedido").innerHTML = carritoPedido.length;
            localStorage.setItem("carrito", JSON.stringify(carritoPedido));
            totalCost(producto.precio);
            modalCarrito(producto);
        })
    });
    };

agregarProductosAlPedido(burgers);
agregarProductosAlPedido(sides);
agregarProductosAlPedido(postres);

/////// Función costo total ///////

function totalCost(precio) {
    let totalPedido = localStorage.getItem("totalCost");
    if(totalPedido != null) {
        totalPedido = parseInt(totalPedido);
        localStorage.setItem("totalCost", totalPedido + precio);
    } else {
        localStorage.setItem("totalCost", precio);
    }
}

/////// Función para mostrar productos en el modal del carrito ///////

function modalCarrito(producto) {
    let totalCost = JSON.parse(localStorage.getItem("totalCost"));
    let productosCarrito = JSON.parse(localStorage.getItem("carrito"));
    let productos = document.getElementById("productosCarrito");
    if(productosCarrito) {
        productos.innerHTML = "";
        Object.values(productosCarrito).map(producto => {
            productos.innerHTML += 
            `<div class="products-container">
                <div class="products">
                    <ion-icon name="close-circle-outline" id="btnEliminar" onclick="eliminarProductos(event)"></ion-icon>
                    <span>${producto.nombre} - x${producto.inCart} - $${producto.inCart*producto.precio}<span/>
                </div>
            </div>`
        });

        productos.innerHTML += `
        <div class="total">Total del pedido: $${totalCost}</div>`
        };
};

////Función finalizarPedido

function finalizarPedido() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: "La compra fue exitosa! Dentro de los próximos 60 minutos recibirás tu pedido.",
        showConfirmButton: false,
        timer: 1500});
};

/////// Función para eliminar productos ///////

function eliminarProducto (deleted) {

    let btnEliminar = document.getElementById("btnEliminar");
    console.log(btnEliminar);
    
    let productoEliminado = carritoPedido.findIndex((producto) => producto.nombre == deleted)
    
    btnEliminar.addEventListener("click", () => {
        if (productoEliminado != -1) {
            carritoPedido.splice(productoEliminado, 1)
            producto.inCart --
        } else {
            alert("Ese producto no está en el carrito")
        };
    });
};

eliminarProducto();