import './js/refs';
import { FilmsApiService } from './js/api-service';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const filmsApiService = new FilmsApiService();

 

const refs = {
    searchForm: document.querySelector('#inner-search-form'),
    loadMore: document.querySelector('.loader')
};



refs.searchForm.addEventListener('submit', onSubmitForm);
refs.loadMore.addEventListener('click', fetchDataMovies);

function onSubmitForm(event) {
    event.preventDefaul();
    console.log('test onSearch');

}



        

function fetchDataMovies() {
    
    filmsApiService.fetchFilms().then(films => {
        if (films.results.length == 0 ) {
            console.log('films.results : ', films.results);
            Notiflix.Notify.failure(`Sorry, there are no movies matching your search query. Please try again.`);
        }
        else {
            Notiflix.Notify.success(`Hooray! We found totalHits=${films.total_results} movies.`);
            console.log('films.total_pages - ', films.total_results);
             console.log('films.pages - ', films.page);
            console.log(films.results);
            return films.results;
        }
    }); 
}