import './js/refs';
import { FilmsApiService } from './js/api-service';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { markupMoviesGallery } from './js/markupMoviesGallery';

const DEBOUNCE_DELAY = 500;
const filmsApiService = new FilmsApiService();

const refs = {
    searchForm: document.querySelector('#inner-search-form'),
    loadMore: document.querySelector('.loader'),
    gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSubmitForm);
refs.loadMore.addEventListener('click', fetchDataMovies);

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
    fetchDataMovies();
};

function fetchDataMovies() {
    
    filmsApiService.fetchFilms().then(films => {
        if (films.results.length == 0 ) {
            console.log('films.results : ', films.results);
            Notiflix.Notify.failure(`Sorry, there are no movies matching your search query. Please try again.`);
        }
        else {
            Notiflix.Notify.success(`Hooray! We found totalMovies=${films.total_results} movies.`);
            console.log('films.total_pages - ', films.total_results);
             console.log('films.pages - ', films.page);
            console.log(films.results);
            return films.results;
        }
    }).then(res => {
           
            // if (res == undefined) {
            // console.log('hits undefined',res);
            //     return;
            // }
            
            renderMoviesGallery(res);
            // onPageScrolling();  //TODO!!!!!!!!!!
        
            // метод lightbox.refresh() 
            //Знищує та повторно ініціалізує лайтбокс, необхідний, наприклад, для
            //Ajax або після маніпуляцій dom
            // lightbox.refresh();
            if (refs.gallery.children.length === this.total_results) {
                Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
                setBtnLoadMoreInvisible();
                // console.log('res.total_results', res.total_results);
            }
            setBtnLoadMoreVisible();
        })
};

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