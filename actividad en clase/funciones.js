document.addEventListener('DOMContentLoaded', function() {
    const clienteForm = document.getElementById('clienteForm');
    const loadButton = document.getElementById('loadButton');
    const clearButton = document.getElementById('clearButton');
    const output = document.getElementById('output');

    clienteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const cliente = {
            cedula: document.getElementById('cedula').value,
            apellido: document.getElementById('apellido').value,
            nombre: document.getElementById('nombre').value,
            direccion: document.getElementById('direccion').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value
        };

        localStorage.setItem('cliente', JSON.stringify(cliente));
        alert('Cliente guardado!');
    });

    loadButton.addEventListener('click', function() {
        const storedCliente = localStorage.getItem('cliente');
        if (storedCliente) {
            const cliente = JSON.parse(storedCliente);
            document.getElementById('cedula').value = cliente.cedula;
            document.getElementById('apellido').value = cliente.apellido;
            document.getElementById('nombre').value = cliente.nombre;
            document.getElementById('direccion').value = cliente.direccion;
            document.getElementById('email').value = cliente.email;
            document.getElementById('telefono').value = cliente.telefono;
            output.textContent = 'Datos del cliente cargados!';
        } else {
            output.textContent = 'No hay datos de cliente guardados.';
        }
    });

    clearButton.addEventListener('click', function() {
        localStorage.removeItem('cliente');
        clienteForm.reset();
        output.textContent = 'Datos del cliente eliminados!';
    });
});
