import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; 

function Login() {
  const [texto, setTexto] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener usuarios almacenados en localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar credenciales
    const foundUser = storedUsers.find(user => user.nombre === texto && user.password === password);

    if (foundUser) {
      alert('Inicio de sesión exitoso');
      navigate('/navegacion'); // Redirige al usuario a la página de navegación después del inicio de sesión exitoso
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div id="sesion">
        <h1>Inicia sesión</h1>
        <form id="loginForm" onSubmit={handleSubmit}>
          <h2>Usuario</h2>
          <input
            type="text"
            id="texto"
            name="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          />
          <h3>Ingresa Contraseña</h3>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br /><br />
          <button type="submit">Login</button>
        </form>
        <br /><br />
        ¿No tienes una cuenta?
        <button onClick={() => navigate('/registro')}>Regístrate</button>
        <br /><br />

        {/* Agrega un botón para volver al inicio */}
        <Link to="/">
          <button className="inicio">Inicio</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
