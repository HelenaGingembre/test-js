import { getGenreName } from './genres.js';
import {refs } from './refs';


function markupMoviesGallery(movies) {
    // console.log('markupMoviesGallery', movies);
    
  const markup = movies.map(({ id, title, poster_path, release_date, genre_ids }) => {
    
    let releaseData = !release_date ? 'Not found' : `${release_date.slice(0, 7)}`;
          
    console.log('genre_ids:', genre_ids);
    let  getGenreNameArray = new getGenreName(genre_ids);
    console.log('genre:', getGenreNameArray.then(arr =>
    renderGenres(arr)).then(value=> console.log(value))
    );
        
    let renderItem = `<li class="gallery-item grid__item" id="${id}">
                    <a class="movie-card__link grid__link" href="#">
                    <img class="movie-card__image"
                    src="${`https://image.tmdb.org/t/p/w342/${poster_path}`}" 
                    alt="${title}" loading="lazy" />
                    </a>
                    
                    <div class="movie-card__info">
                    <h2 class="movie-card__title">${title}</h2>
                    <p class="info-item" id="array-genres-item=${id}">${getGenreNameArray.then(arr=>renderGenres(arr))}</p>
                        <p class="info-item info-item__date">${releaseData}</p>
                    </div>
                    </li>`;
    
          
            
                  
    return renderItem;
  
  }).join('');

    return markup;
};

function renderGenres(arr) {
  console.log('arr', arr.join(','));
  return `${arr.join(',')}`;
  }
export { markupMoviesGallery };