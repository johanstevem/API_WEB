document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('texto').value;
    const password = document.getElementById('password').value;

    // Verificar si el nombre de usuario y la contraseña son válidos
    if (nombre === 'johan' && password === 'johan123') {
        alert('Iniciando sesión...');

        // Redirigir a la página de inicio de sesión
        window.location.href = '/sesion_registro/login/loggin.html';
    } else {
        alert('Nombre de usuario o contraseña incorrectos');
    }
});
