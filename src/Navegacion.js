import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navegacion.css';
import { Document, Page } from 'react-pdf';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

function Navegacion() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();

    const registros = JSON.parse(localStorage.getItem('registroRevista')) || [];

    const resultados = registros.filter(registro => {
      const { titulo, autor, tema, resumen, palabrasClave } = registro;
      
      const matchesSearch = (field) =>
        field && field.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        (searchFilter === 'all' && (matchesSearch(titulo) || matchesSearch(autor) || matchesSearch(tema) || matchesSearch(resumen) || matchesSearch(palabrasClave))) ||
        (searchFilter === 'title' && matchesSearch(titulo)) ||
        (searchFilter === 'author' && matchesSearch(autor)) ||
        (searchFilter === 'subject' && matchesSearch(tema))
      );
    });

    setSearchResults(resultados);
  };

  const addToFavorites = (result) => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    const exists = favoritos.some(item => item.titulo === result.titulo);
    
    if (!exists) {
      favoritos.push(result);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      alert('Se ha agregado a favoritos.');
    } else {
      alert('Este resultado ya está en favoritos.');
    }
  };

  const handleCloseDocumentViewer = () => {
    setSelectedFile(null);
  };

  return (
    <div className="navegacion-container">
      <header>
        <div className="menu">
          <h1>Mi Biblioteca</h1>
          <div className="user-options">
            <span>Bienvenido, Usuario</span>
            <Link to="/index.html" className="logout">Cerrar Sesión</Link>
          </div>
        </div>
      </header>
      <main>
        <aside className="sidebar">
          <div className="menu-icon">☰</div>
          <nav id="sidebar-menu">
            <ul>
              <li>
                <Link to="/upload" className="sidebar-button">Subir Revista Científica</Link>
              </li>
              <li>
                <Link to="/favoritos" className="sidebar-button">Favoritos</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <section className="content">
          <div className="search-section">
            <h2>Buscar Revistas Científicas</h2>
            <form id="search-form" onSubmit={handleSearch}>
              <input 
                type="text" 
                id="search-query" 
                placeholder="Buscar por título, autor, tema..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required 
              />
              <select 
                id="search-filter"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="title">Título</option>
                <option value="author">Autor</option>
                <option value="subject">Tema</option>
              </select>
              <button type="submit">Buscar</button>
            </form>
          </div>
          <div id="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div key={index}>
                  <h3>{result.titulo}</h3>
                  <p>Autor: {result.autor}</p>
                  <p>Tema: {result.tema}</p>
                  <p>{result.resumen}</p>
                  <p>Palabras clave: {result.palabrasClave}</p>
                  <p>Fecha de publicación: {result.fechaPublicacion}</p>
                  <p>ISSN: {result.issn}</p>
                  <ul>
                    {result.archivos.map((archivo, i) => (
                      <li key={i}>
                        <a href={archivo.url} target="_blank" rel="noopener noreferrer">{archivo.nombre}</a>
                        <button onClick={() => addToFavorites(result)}>Favoritos</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No se encontraron resultados.</p>
            )}
          </div>
        </section>
      </main>

      {selectedFile && (
        <div className="document-viewer">
          <button onClick={handleCloseDocumentViewer}>Cerrar</button>
          {selectedFile.endsWith('.pdf') ? (
            <Document
              file={selectedFile}
              renderMode="svg"
            >
              <Page pageNumber={1} />
            </Document>
          ) : (
            <DocViewer
              documents={[{ uri: selectedFile }]}
              pluginRenderers={DocViewerRenderers}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Navegacion;
