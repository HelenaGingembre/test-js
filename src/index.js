import './js/refs';
import { FilmotekaApp } from './js/api-service';


const fetchFilms = new FilmotekaApp();

console.log('fetchFilms',fetchFilms.getData(1));    