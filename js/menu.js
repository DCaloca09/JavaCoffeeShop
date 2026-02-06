//Lista de productos con precios. 
var productos = [
    { nombre: 'Café Americano', precio: 35.00 },
    { nombre: 'Capuccino', precio: 45.00 },
    { nombre: 'Muffin Chocolate', precio: 15.00 }
];

//Variable para guardar el pedido
var pedido = [];

//Función para mostrar el menú  
function mostrarMenu() {
    var menu = document.getElementById('menu');
    
    menu.innerHTML = '';
    
    for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];
        
        var item = '<li onclick="agregarAlPedido(' + i + ')">' + 
                   producto.nombre + ' - $' + producto.precio.toFixed(2) + 
                   '</li>';
        
        menu.innerHTML += item;

    }
}

//Función para agregar un producto al pedido 
function agregarAlPedido(indice) {
    var producto = productos[indice];
    
    pedido.push(producto);
    
    mostrarPedido();
}

//Función para quitar un producto del pedido
function quitarDelPedido(indice) {
    pedido.splice(indice, 1);
    
    mostrarPedido();
}


//Función para mostrar el pedido 
function mostrarPedido() {
    var listaPedido = document.getElementById('pedido');
    listaPedido.innerHTML = '';
    
    var total = 0;
    
    // Si el pedido está vacío, mostrar mensaje
    if (pedido.length === 0) {
        listaPedido.innerHTML = '<li style="color: #999;">Pedido vacío</li>';
        document.getElementById('total').textContent = '0.00';
        return;
    }
    
    // Mostrar cada producto con botón para quitar
    for (var i = 0; i < pedido.length; i++) {
        var producto = pedido[i];
        
        var item = '<li>' + 
                   producto.nombre + ' - $' + producto.precio.toFixed(2) + 
                   ' <button onclick="quitarDelPedido(' + i + ')">X</button>' +
                   '</li>';
        listaPedido.innerHTML += item;
        
        total += producto.precio;
    }
    
    document.getElementById('total').textContent = total.toFixed(2);

    // Recalcular el cambio cuando cambia el total
    calcularCambio();
}

//Función para calcular el cambio
function calcularCambio() {
    var totalText = document.getElementById('total').textContent;
    var total = parseFloat(totalText);
    
    var pagoCliente = document.getElementById('pago-cliente').value;
    var pago = parseFloat(pagoCliente);
    
    var mensajePago = document.getElementById('mensaje-pago');
    var cambioDiv = document.getElementById('cambio');
    
    
    if (!pagoCliente || pagoCliente === '' || isNaN(pago)) {
        mensajePago.textContent = '';
        mensajePago.className = '';
        cambioDiv.textContent = '';
        return;
    }
    
    // Calcular el cambio
    var cambio = pago - total;
    
    // Si el pago es insuficiente
    if (cambio < 0) {
        mensajePago.textContent = 'Pago insuficiente';
        mensajePago.className = 'insuficiente';
        cambioDiv.textContent = 'Falta: $' + Math.abs(cambio).toFixed(2);
    }
    
    // Si el pago es exacto
    else if (cambio === 0) {
        mensajePago.textContent = 'Pago exacto';
        mensajePago.className = 'exacto';
        cambioDiv.textContent = 'Cambio: $0.00';
    }

    // Si el pago es mayor (hay cambio)
    else {
        mensajePago.textContent = 'Pago recibido correctamente';
        mensajePago.className = 'con-cambio';
        cambioDiv.textContent = 'Cambio a devolver: $' + cambio.toFixed(2);
    }
}


//Ejecutar cuando la página carga
window.onload = function() {
    mostrarMenu();
    mostrarPedido();

    var campoPago = document.getElementById('pago-cliente');
    campoPago.addEventListener('input', calcularCambio);
}
