import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css'; // Asegúrate de tener tus estilos importados correctamente

import Header from './Header'; // Importa el componente de encabezado
import Login from './Login'; // Importa el componente de Login
import Registro from './Registro'; // Importa el componente de Registro
import Navegacion from './Navegacion'; // Importa el componente de Navegacion
import Upload from './Upload';
import Favoritos from './Favoritos'; // Importa el componente de Favoritos

function App() {
  return (
    <Router>
      <div className="App">
        {/* Renderiza el encabezado */}
        <Header />
        
        {/* Define las rutas */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/navegacion" element={<Navegacion />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/favoritos" element={<Favoritos />} /> {/* Ruta para Favoritos */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
