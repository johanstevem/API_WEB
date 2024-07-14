import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Upload.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta
import Ejemplo from './Ejemplo.json'; // Importa tu archivo Ejemplo.json

function SubirRevista() {
  const [fileList, setFileList] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [tema, setTema] = useState('');
  const [resumen, setResumen] = useState('');
  const [palabrasClave, setPalabrasClave] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState('');
  const [issn, setIssn] = useState('');

  const handleFiles = (files) => {
    setFileList([...files]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Filtrar solo los archivos PDF o Word
    const archivosValidos = Array.from(fileList).filter(file => {
      const extension = file.name.split('.').pop().toLowerCase();
      return extension === 'pdf' || extension === 'doc' || extension === 'docx';
    });
  
    // Si no hay archivos válidos, mostrar un mensaje y salir
    if (archivosValidos.length === 0) {
      alert('Por favor selecciona al menos un archivo PDF o Word.');
      return;
    }
  
    // Convertir archivos válidos a un array de objetos con la información necesaria
    const archivos = archivosValidos.map((file) => ({
      nombre: file.name,
      tipo: file.type,
      contenido: file
    }));
  
    // Crear el objeto con la información a almacenar en localStorage
    const registro = {
      titulo,
      autor,
      tema,
      resumen,
      palabrasClave,
      fechaPublicacion,
      issn,
      archivos
    };
  
    // Leer los registros previos del localStorage
    const registrosPrevios = JSON.parse(localStorage.getItem('registroRevista')) || [];
  
    // Asegurarse de que registrosPrevios sea un array
    const registrosActualizados = Array.isArray(registrosPrevios) ? registrosPrevios : [registrosPrevios];
  
    // Agregar el nuevo registro al array
    registrosActualizados.push(registro);
  
    // Almacenar el array actualizado en localStorage
    localStorage.setItem('registroRevista', JSON.stringify(registrosActualizados));
  
    // Limpiar campos después de almacenar
    setFileList([]);
    setTitulo('');
    setAutor('');
    setTema('');
    setResumen('');
    setPalabrasClave('');
    setFechaPublicacion('');
    setIssn('');
  
    // Lógica adicional si es necesario (por ejemplo, enviar a backend)
    console.log('Registro almacenado en localStorage:', registro);
  };
  

  const handleVerEjemploClick = () => {
    // Aquí podrías cargar y mostrar el contenido de Ejemplo.json
    alert(`Ejemplo de Revista Científica:
Título: ${Ejemplo.Titulo}
Autores: ${Ejemplo.Autores.join(', ')}
Resumen: ${Ejemplo.Resumen}
Introducción: ${Ejemplo.Introduccion}
Métodos: ${Ejemplo.Metodos}
Resultados: ${Ejemplo.Resultados}
Discusión: ${Ejemplo.Discusion}
Conclusiones: ${Ejemplo.Conclusiones}
Referencias: ${Ejemplo.Referencias}`);
  };

  const handleTituloChange = (e) => {
    // Validar que el título solo contenga letras y números
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
    setTitulo(value);
  };

  const handleAutorChange = (e) => {
    // Validar que el nombre del autor solo contenga letras, comas, y puntos
    const value = e.target.value.replace(/[^a-zA-Z ,.]/g, '');
    setAutor(value);
  };

  const handleTemaChange = (e) => {
    // Validar que el tema solo contenga letras y números
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
    setTema(value);
  };

  const handleResumenChange = (e) => {
    // Validar máximo de 200 palabras en el resumen
    const value = e.target.value;
    if (value.split(' ').length <= 200) {
      setResumen(value);
    } else {
      alert('El resumen no puede exceder las 200 palabras.');
    }
  };

  const handlePalabrasClaveChange = (e) => {
    // Validar que las palabras clave solo contengan letras, números, comas, puntos y guiones
    const value = e.target.value.replace(/[^a-zA-Z0-9,.\- ]/g, '');
    setPalabrasClave(value);
  };
  

  const handleIssnChange = (e) => {
    // Permitir números y guion, y validar formato ISSN
    let value = e.target.value.replace(/[^\d-]/g, '');
  
    // Si el valor incluye un guion, asegurarse de que esté en el formato correcto
    if (value.includes('-')) {
      // Eliminar guiones adicionales y limitar a un máximo de un guion
      value = value.replace(/-/g, '');
      value = value.slice(0, 4) + '-' + value.slice(4);
    }
  
    // Limitar la longitud total a 9 caracteres (incluyendo el guion)
    if (value.length <= 9) {
      setIssn(value);
    } else {
      // Mostrar mensaje de error si el ISSN es demasiado largo
      alert('El ISSN debe tener el formato correcto, por ejemplo, "1234-5678".');
    }
  };

  return (
    <div className="subir-revista-container">
      <header>
        <div className="menu">
          <h1>Bienvenido Usuario.</h1>
          <div className="user-options">
            <span>- Subir revistas científicas</span>
            <Link to="/" className="logout">Cerrar Sesión</Link>
          </div>
        </div>
      </header>
      <main>
        <section className="content">
          <div className="upload-section">
            <h2>Subir Revista Científica</h2>
            <div id="drop-area">
              <form className="upload-form">
                <input
                  type="file"
                  id="fileElem"
                  multiple
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <label className="button" htmlFor="fileElem">
                  Seleccionar archivo
                </label>
              </form>
              <p>o arrastra un archivo aquí</p>
              <div id="file-list">
                {fileList.length > 0 &&
                  Array.from(fileList).map((file, index) => (
                    <p key={index}>{file.name}</p>
                  ))}
              </div>
            </div>
            <form id="article-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="titulo">Título del artículo:</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={titulo}
                  onChange={handleTituloChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="autor">Nombre del autor:</label>
                <input
                  type="text"
                  id="autor"
                  name="autor"
                  value={autor}
                  onChange={handleAutorChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="tema">Tema del artículo:</label>
                <input
                  type="text"
                  id="tema"
                  name="tema"
                  value={tema}
                  onChange={handleTemaChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="resumen">Resumen:</label>
                <textarea
                  id="resumen"
                  name="resumen"
                  value={resumen}
                  onChange={handleResumenChange}
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="palabras-clave">Palabras claves:</label>
                <input
                  type="text"
                  id="palabras-clave"
                  name="palabras-clave"
                  value={palabrasClave}
                  onChange={handlePalabrasClaveChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="fecha-publicacion">Fecha de publicación:</label>
                <input
                  type="date"
                  id="fecha-publicacion"
                  name="fecha-publicacion"
                  value={fechaPublicacion}
                  onChange={(e) => setFechaPublicacion(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="issn">ISSN:</label>
                <input
                  type="text"
                  id="issn"
                  name="issn"
                  value={issn}
                  onChange={handleIssnChange}
                  maxLength="9"
                  pattern="\d{4}-\d{4}"
                  title="Debe contener 4 números, un guion y 4 números, como en el ejemplo 1234-5678"
                  required
                />
              </div>
              <button type="submit">Subir</button>
              <button type="button" onClick={handleVerEjemploClick}>Ejemplo</button>
              <p>Presiona el botón "Ejemplo" para ver un Modelo de revista científica y su estructura</p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SubirRevista;
