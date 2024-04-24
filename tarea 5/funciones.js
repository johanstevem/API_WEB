document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Parte del java para obtener los valores de los campos
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    // Mostrar los datos en la consola del navegador
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Teléfono:', telefono);

    // Limpiar los campos después del envío (opcional)
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefono').value = '';

    // Puedes mostrar un mensaje de confirmación al usuario (opcional)
    alert('Cliente guardado correctamente');
});
