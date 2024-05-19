function validarFormulario() {
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var password = document.getElementById('password').value;

    if (nombre.trim() === '') {
        alert('Por favor ingresa tu nombre de usuario.');
        return false; 
    }

    
    if (email.trim() === '') {
        alert('Por favor ingresa tu correo electrónico.');
        return false; 
    } else if (!email.includes('@') || (!email.includes('@gmail') && !email.includes('@hotmail'))) {
        alert('Por favor ingresa un correo electrónico válido (debe contener "@gmail" o "@hotmail").');
        return false; // esta parte hace que cuando ingresemos un correo sin @ y sin la continuacion de gmail y hotmail aparezca un mensaje de aviso
    }

    if (telefono.trim() === '' || telefono.length > 10 || isNaN(telefono)) {
        alert('Por favor ingresa un número de teléfono válido (máximo 10 dígitos numéricos).');
        return false; // Detiene el envío del formulario
    }

    if (password.trim() === '') {
        alert('Por favor ingresa tu contraseña.');
        return false;
    }
   return true; // Permite el envío del formulario si pasa todas las validaciones
}
