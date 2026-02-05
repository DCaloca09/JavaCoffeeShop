
var productos = [
    { nombre: 'Café Americano', precio: 35.00 },
    { nombre: 'Capuccino', precio: 45.00 },
    { nombre: 'Muffin Chocolate', precio: 30.00 }
];

function mostrarMenu() {
    var menu = document.getElementById('menu');
    
    menu.innerHTML = '';
    
    for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];
        
        var tarjeta = 
            '<div class="producto">' +
                '<div class="nombre">' + producto.nombre + '</div>' +
                '<div class="precio">$' + producto.precio.toFixed(2) + '</div>' +
            '</div>';
        
        menu.innerHTML += tarjeta;
    }
}

window.onload = function() {
    mostrarMenu();
};
