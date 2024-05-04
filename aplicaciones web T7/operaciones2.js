document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('texto').value;
    const password = document.getElementById('password').value;

   
    if (nombre.trim() === '') {
        alert('Debes ingresar el nombre');
        return;
    }

   
    if (password.trim() === '') {
        alert('Ingresa Contraseña');
        return; 
    }
    
    alert('Iniciando sesión...');
});
