import { refs } from './js/refs';
import { FilmsApiService } from './js/api-service';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { markupMoviesGallery } from './js/markupMoviesGallery';

const DEBOUNCE_DELAY = 500;
const filmsApiService = new FilmsApiService();


//загружаємо популярні відео при першому завантаженні сайту
getPopularInLoadStartPage();
filmsApiService.fetchGetGenres().then(res => {
    console.log('res genres', res.genres);
    return res.genres;
});
//TODO!!! витягти по іd  методом reduce назву жанру із масиву обєктів

refs.searchForm.addEventListener('submit', onSubmitForm);
refs.loadMore.addEventListener('click', fetchDataMoviesSearch);

function onSubmitForm(event) {
    event.preventDefault();
    const currentInput = event.currentTarget.elements.searchQuery.value.trim();
    if (currentInput === '') {
       Notiflix.Notify.info('Sorry, nothing has been entered in the search query. Please try again.');
        clearGalleryContainer();
        setBtnLoadMoreInvisible();
       return;
    }
    filmsApiService.serchQuery = currentInput;
    filmsApiService.resetPage();
    clearGalleryContainer();
    console.log('currentInput:', currentInput );
    fetchDataMoviesSearch(currentInput);
    console.log('fetchDataMoviesSearch:', currentInput );
};

function fetchDataMoviesSearch(serchQuery) {
   
    filmsApiService.fetchFilmsSearch(serchQuery).then(films => {
        if (films.results.length == 0 ) {
            console.log('fetchDataMoviesSearch films.results : ', films.results);
            Notiflix.Notify.failure(`Sorry, there are no movies matching your search query. Please try again.`);
        }
        else {
            Notiflix.Notify.success(`Hooray! We found totalFilms=${films.total_results} movies.`);
            console.log('fetchDataMoviesSearch films.total_results - ', films.total_results);
             console.log('fetchDataMoviesSearch - films.pages - ', films.page);
            console.log('fetchDataMoviesSearch',films.results);
            return films.results;
        }
        
    }).then(res => {
           
            if (refs.gallery.children.length === this.total_results) {
                Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
                setBtnLoadMoreInvisible();
                // console.log('res.total_results', res.total_results);
            }
        setBtnLoadMoreVisible();
        renderMoviesGallery(res);
        return res;
    })
   
};
/*---------------------------------------------*/


async function getPopularInLoadStartPage() {
    
    clearGalleryContainer();
    filmsApiService.resetPage();
    filmsApiService.fetchFilmsPopular().then(data => {
      
     const newFilms = data.results;
    //const newFilms= getFilmsPopular(data.movies, genresJSON);
    // checkIfEmptyBeforeRender(newFilms);
        renderMoviesGallery(newFilms);
        return newFilms;
  });
}

function clearGalleryContainer() {
    refs.gallery.innerHTML = '';
}



function renderMoviesGallery(movies) {
     refs.gallery.insertAdjacentHTML('beforeend', markupMoviesGallery(movies));
};





function setBtnLoadMoreInvisible() {
    refs.loadMore.classList.add('is-hidden');
}

function setBtnLoadMoreVisible() {
    refs.loadMore.classList.remove('is-hidden');
}