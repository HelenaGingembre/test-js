// https://api.themoviedb.org/3/movie/550?api_key=0753d31482992eaeca4a1269ff45804b

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0753d31482992eaeca4a1269ff45804b';
const SEARCH_URL = `${BASE_URL}/search/movie`;
const GENRE_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;

export { BASE_URL, API_KEY, SEARCH_URL, GENRE_URL };