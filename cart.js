function mostrarPedido() {
    let totalCost = JSON.parse(localStorage.getItem("totalCost"));
    let productosCarrito = JSON.parse(localStorage.getItem("carrito"));
    let productos = document.querySelector(".products")
    if(productosCarrito) {
        productos.innerHTML = "";
        Object.values(productosCarrito).map(producto => {
            productos.innerHTML += 
            `<div class="products-container">
                <div class="products">
                    <ion-icon name="close-circle-outline"></ion-icon>
                    <img class="carrito__imagen" src="../images/${producto.id}.jpg">
                    <span>${producto.nombre}<span/>
                </div>
                <div class="price">$${producto.precio},00</div>
                <div class="quantity">
                    <ion-icon name="arrow-back-circle-outline"></ion-icon>
                    <span>Cantidad</span>
                    <ion-icon name="arrow-forward-circle-outline"></ion-icon>
                </div>
                <div class="total">
                    $${producto.inCart*producto.precio},00
                </div>
            </div>`
        });

        productos.innerHTML += `
        <div class="total__container">
            <h4 class="total__titulo>Total del pedido</h4>
            <h4 class="total__precio>$${totalCost}</h4>
        </div>`
        }
};

mostrarPedido();