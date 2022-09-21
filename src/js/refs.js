// https://api.themoviedb.org/3/movie/550?api_key=0753d31482992eaeca4a1269ff45804b

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0753d31482992eaeca4a1269ff45804b';
const SEARCH_URL = `${BASE_URL}/search/movie`;
const GENRE_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;

const refs = {
    searchForm: document.querySelector('#inner-search-form'),
    searchInput: document.querySelector('#inner-search-input'),
    loadMore: document.querySelector('.loader'),
    gallery: document.querySelector('.gallery-list'),
    spinnerPreloader: document.querySelector('.js-preloader-page'),
    anchor: document.querySelector('.anchor'),
    galleryList: document.querySelector('.gallery-list'),
}
export { BASE_URL, API_KEY, SEARCH_URL, GENRE_URL, refs };