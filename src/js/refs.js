// https://api.themoviedb.org/3/movie/550?api_key=0753d31482992eaeca4a1269ff45804b

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0753d31482992eaeca4a1269ff45804b';
const SEARCH_URL = `${BASE_URL}/search/movie`;
const GENRE_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;

const refs = {
    searchForm: document.querySelector('#inner-search-form'),
    searchInput: document.querySelector('#inner-search-input'),
    gallery: document.querySelector('.gallery-list'),
    gallerySection: document.querySelector('.gallery'),
    loadMore: document.querySelector('.loader'),
    spinnerPreloader: document.querySelector('.js-preloader-page'),
    scrollArea: document.querySelector('#scrollArea'),

    arrayGenresItem: document.querySelector('.info-item__genres'),
}
export { BASE_URL, API_KEY, SEARCH_URL, GENRE_URL, refs };