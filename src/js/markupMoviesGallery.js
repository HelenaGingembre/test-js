let singleGenre = [];

const getNameGenre = function (ids) {
  const parsedGenres = JSON.parse(localStorage.getItem('genres'));
  singleGenre = [];
  ids.forEach(id => {
    singleGenre.push(parsedGenres.find(gnr => gnr.id === id));
  });
};
function markupMoviesGallery(movies) {
    console.log('markupMoviesGallery', movies);
    
    const markup = movies.map(({ id, title, poster_path , release_date, genre_ids }) => {
         
            return `<li class="gallery-item grid__item" id="${id}">
                    <a class="movie-card__link grid__link" href="#">
                    <img class="movie-card__image"
                    src="${`https://image.tmdb.org/t/p/w342/${poster_path}`}" 
                    alt="${title}" loading="lazy" />
                    </a>
                    <h2 class="movie-card__title">${title}</h2>
                    <div class="movie-card__info">
                        <p class="info-item">${genre_ids}</p>
                        <p class="info-item info-item__date">${release_date}</p>
                    </div>
                    </li>`;
    }).join('');

    return markup;
};

export { markupMoviesGallery };