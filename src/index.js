import './js/refs';
import { FilmsApiService } from './js/api-service';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const filmsApiService = new FilmsApiService();

console.log('fetchFilms',filmsApiService.fetchFilms());    