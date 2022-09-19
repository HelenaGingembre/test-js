import './js/refs';
import { FilmsApiService } from './js/api-service';


const filmsApiService = new FilmsApiService();

console.log('fetchFilms',filmsApiService.fetchFilms());    