import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    // Obtener los favoritos desde localStorage al cargar el componente
    const storedFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(storedFavoritos);
  }, []);

  const removeFromFavorites = (titulo) => {
    // Remover un favorito por su título
    const updatedFavoritos = favoritos.filter(item => item.titulo !== titulo);
    setFavoritos(updatedFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(updatedFavoritos));
  };

  return (
    <div className="favoritos-container">
      <header>
        <div className="menu">
          <h1>Mi Biblioteca - Favoritos</h1>
          <div className="user-options">
            <span>Bienvenido, Usuario</span>
            <Link to="/index.html" className="logout">Cerrar Sesión</Link>
          </div>
        </div>
      </header>
      <main>
        <section className="content">
          <h2>Mis Documentos Favoritos</h2>
          <ul>
            {favoritos.length > 0 ? (
              favoritos.map((favorito, index) => (
                <li key={index}>
                  <h3>{favorito.titulo}</h3>
                  <p>Autor: {favorito.autor}</p>
                  <p>Tema: {favorito.tema}</p>
                  <p>{favorito.resumen}</p>
                  <p>Palabras clave: {favorito.palabrasClave}</p>
                  <p>Fecha de publicación: {favorito.fechaPublicacion}</p>
                  <p>ISSN: {favorito.issn}</p>
                  <ul>
                    {favorito.archivos.map((archivo, i) => (
                      <li key={i}>
                        <a href={archivo.url} target="_blank" rel="noopener noreferrer">{archivo.nombre}</a>
                        {archivo.url && archivo.url.endsWith('.pdf') ? (
                          <Document file={archivo.url} renderMode="svg">
                            <Page pageNumber={1} />
                          </Document>
                        ) : (
                          archivo.url && <DocViewer documents={[{ uri: archivo.url }]} pluginRenderers={DocViewerRenderers} />
                        )}
                        <button onClick={() => removeFromFavorites(favorito.titulo)}>Eliminar de Favoritos</button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              <p>No tienes documentos favoritos.</p>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Favoritos;
