import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoUleam from './logo-uleam.jpg'; // Importa la imagen

const Header = () => {
  const location = useLocation();

  // Función para determinar si mostrar el menú completo
  function shouldShowMenu() {
    return !['/navegacion', '/login', '/registro', '/upload', '/favoritos'].includes(location.pathname);
  }

  return (
    <header>
      <div className="menu">
        {shouldShowMenu() && (
          <>
            <h1>Registro de revistas científicas</h1>
            <nav>
              <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/about">Acerca de</Link></li>
                <li><Link to="/services">Servicios</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
              </ul>
            </nav>
          </>
        )}
        <div className="auth">
          {/* Mostrar los botones de autenticación solo si no estamos en navegacion, login o registro */}
          {['/navegacion', '/login', '/registro', '/upload', '/favoritos'].includes(location.pathname) ? null : (
            <>
              <Link to="/login"><button className="login">Iniciar Sesión</button></Link>
              <Link to="/registro"><button className="register">Registrarse</button></Link>
            </>
          )}
        </div>
      </div>
      {/* Coloca la imagen fuera del encabezado, en la parte inferior */}
      <div className="header-container">
        <div className="logo-container">
          <img src={logoUleam} alt="Logo ULEAM" style={{ width: '200px', height: '130px' }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
