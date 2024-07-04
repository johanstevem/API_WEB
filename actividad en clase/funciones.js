document.addEventListener('DOMContentLoaded', function() {
    const clienteForm = document.getElementById('clienteForm');
    const loadButton = document.getElementById('loadButton');
    const clearButton = document.getElementById('clearButton');
    const output = document.getElementById('output');

    clienteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validaciones
        const cedula = document.getElementById('cedula').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

        if (!validateCedula(cedula)) {
            alert('La cédula no es válida.');
            return;
        }

        if (!validateNombreApellido(apellido)) {
            alert('El apellido no es válido. Solo debe contener letras.');
            return;
        }

        if (!validateNombreApellido(nombre)) {
            alert('El nombre no es válido. Solo debe contener letras.');
            return;
        }

        if (!validateDireccion(direccion)) {
            alert('La dirección no es válida.');
            return;
        }

        if (!validateEmail(email)) {
            alert('El correo electrónico no es válido.');
            return;
        }

        if (!validateTelefono(telefono)) {
            alert('El teléfono no es válido. Debe contener solo números.');
            return;
        }

        const cliente = {
            cedula: cedula,
            apellido: apellido,
            nombre: nombre,
            direccion: direccion,
            email: email,
            telefono: telefono
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

    function validateCedula(cedula) {
        const cedulaRegex = /^\d{10}$/;
        return cedulaRegex.test(cedula);
    }

    function validateNombreApellido(nombre) {
        const nombreApellidoRegex = /^[a-zA-Z\s]+$/;
        return nombreApellidoRegex.test(nombre);
    }

    function validateDireccion(direccion) {
        // La dirección puede contener letras, números y algunos caracteres especiales
        return direccion.length > 0;
    }

    function validateEmail(email) {
        // con esto estoy validando el email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateTelefono(telefono) {
        // Validando que el teléfono deba contener solo números y tener entre 7 y 15 dígitos
        const telefonoRegex = /^\d{7,15}$/;
        return telefonoRegex.test(telefono);
    }
});
