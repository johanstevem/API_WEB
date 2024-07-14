import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css'; 

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay usuarios almacenados en localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Usuarios almacenados:', storedUsers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!/^.{7,15}$/.test(nombre) || !/[A-Z]/.test(nombre)) {
      alert('El nombre de usuario debe tener entre 7 y 15 caracteres y contener al menos una mayúscula');
      return;
    }

    if (!/^[a-z0-9]+@[a-z]+\.(com|net|org)$/.test(email)) {
      alert('El correo electrónico debe ser válido y no contener mayúsculas');
      return;
    }

    if (!/^\d{9,15}$/.test(numero)) {
      alert('El número de teléfono debe tener entre 9 y 15 dígitos');
      return;
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      alert('La contraseña debe contener al menos una letra mayúscula');
      return;
    }

    // Obtener usuarios actuales de localStorage o iniciar como un arreglo vacío
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Crear nuevo usuario
    const newUser = { nombre, email, numero, password };

    // Agregar nuevo usuario a la lista de usuarios
    const updatedUsers = [...storedUsers, newUser];

    // Guardar lista actualizada de usuarios en localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('Registro exitoso');
    navigate('/login');
  };

  return (
    <div className="registro-container">
      <div id="contenedor">
        <h1>Ingresa tus Datos</h1>
        <form id="Registro" onSubmit={handleSubmit}>
          <h2>Nombre de usuario</h2>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            autoComplete="off" // Atributo para desactivar el autocompletado
          />
          <h2>Correo electrónico</h2>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h2>Número de teléfono</h2>
          <input
            type="number"
            id="numero"
            name="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
          <h2>Contraseña</h2>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <h2>Confirmar contraseña</h2>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br /><br />
          <button type="submit">Registrarse</button>
        </form>
        <br /><br />
        ¿Ya tienes una cuenta?
        <button onClick={() => navigate('/login')}>Inicia sesión</button>
        <br /><br />
        <p>¿Quieres regresar al inicio?</p>
        <button onClick={() => navigate('/')}>Inicio</button>
      </div>
    </div>
  );
}

export default Registro;
