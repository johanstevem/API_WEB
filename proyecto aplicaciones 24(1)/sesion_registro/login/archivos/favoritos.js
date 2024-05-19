document.addEventListener('DOMContentLoaded', function() {
    const favoritesList = document.getElementById('favorites-list');

    // Ejemplo de datos de textos académicos favoritos
    const favorites = [
        {
            id: 1,
            title: 'Investigación sobre Inteligencia Artificial',
            author: 'Juan Pérez',
            summary: 'Un estudio detallado sobre el desarrollo y aplicaciones de la IA.'
        },
        {
            id: 2,
            title: 'Avances en la Biotecnología',
            author: 'María López',
            summary: 'Últimos descubrimientos y desarrollos en el campo de la biotecnología.'
        },
        {
            id: 3,
            title: 'El Impacto del Cambio Climático',
            author: 'Carlos García',
            summary: 'Análisis de los efectos del cambio climático en diferentes regiones.'
        }
    ];

    function renderFavorites() {
        favoritesList.innerHTML = '';

        favorites.forEach(item => {
            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');

            const title = document.createElement('h3');
            title.textContent = item.title;

            const author = document.createElement('p');
            author.textContent = `Autor: ${item.author}`;

            const summary = document.createElement('p');
            summary.textContent = item.summary;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.classList.add('remove-button');
            removeButton.onclick = () => removeFavorite(item.id);

            favoriteItem.appendChild(title);
            favoriteItem.appendChild(author);
            favoriteItem.appendChild(summary);
            favoriteItem.appendChild(removeButton);

            favoritesList.appendChild(favoriteItem);
        });
    }

    function removeFavorite(id) {
        const index = favorites.findIndex(fav => fav.id === id);
        if (index !== -1) {
            favorites.splice(index, 1);
            renderFavorites();
        }
    }

    renderFavorites();
});
