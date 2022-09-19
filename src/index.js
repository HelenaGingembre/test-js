import './js/refs';
import { FilmsApiService } from './js/api-service';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const filmsApiService = new FilmsApiService();

 

const refs = {
    searchForm: document.querySelector('.inner-search-form'),
}

console.log('fetchFilms', filmsApiService.fetchFilms()); 
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefaul();

    fetchDataMovies();
      

}


function fetchDataMovies() {
    filmsApiService.fetchFilms()
        .then(films => {
            const totalPages = films.total_pages;
            console.log('totalPages', totalPages);
            console.log(' films.results',films.results);
            return films.results;
        })
        
}