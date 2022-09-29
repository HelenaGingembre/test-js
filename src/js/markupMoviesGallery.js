import { getGenreName } from './genres.js';
import {refs } from './refs';


function markupMoviesGallery(movies) {
   console.log('markupMoviesGallery', movies);
  let genresArr = [];
  const markup = movies.map(({ id, title, poster_path, release_date, genre_ids }) => {
    
    let releaseData = !release_date ? 'Not found' : `${release_date.slice(0, 7)}`;
    genresArr = genre_ids;     
      
       
    let renderItem = `<li class="gallery-item grid__item" id="${id}">
                    <a class="movie-card__link grid__link" href="#">
                    <img class="movie-card__image"
                    src="${`https://image.tmdb.org/t/p/w342/${poster_path}`}" 
                    alt="${title}" loading="lazy" />
                    
                    
                    <div class="movie-card__info">
                    <h2 class="movie-card__title">${title}</h2>
                   <p class="info-item info-item__genres"
   id="array-genres-item-${id}">${getGenreName(genre_ids, id).then(res => renderGenresItem(res, id))}</p>
                    <p class="info-item info-item__date">${releaseData}</p>
                    </div>
                    </a>
                    </li>`;
              
    return renderItem;
  
  }).join('');
     
  
    return markup;
};

//рендерить список жанрів для кожного фільму
async function renderGenresItem(arrIds, id) {
  let arrayGenresId = document.querySelector(`#array-genres-item-${id}`);
   await arrIds.length !== 0
      ? arrayGenresId.innerHTML=`${arrIds}`
      : 'Genres not found';
};
    




export { markupMoviesGallery };