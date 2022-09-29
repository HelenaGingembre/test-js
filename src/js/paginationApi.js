import axios from 'axios';

import { BASE_URL, API_KEY, SEARCH_URL, GENRE_URL } from './refs';

export class PaginationApiService {
    constructor() {
        this.serchQuery = '';
        this.page = 1;
        this.totalPages = 0; 
        this.options = {
            key: API_KEY,
            page: this.page,
        };
    }

    async fetchArticles(page) {
        const first = await axios.get(
            `${BASE_URL}/trending/movie/day?api_key=${this.options.key}&page=${page}`
        );
        this.page = page;
        return first.data;
    }

    async fetchArticlesSearch(page) {
        const name = this.searchQuery;
        localStorage.setItem('name', name);
        const url = `${SEARCH_URL}?api_key=${this.options.key}&query=${name}&page=${page}`;
        const first = await axios.get(url, this.options);
        this.page = page;
        return first.data;
    }

    async fetchArticlesSearchClick(page) {
        const searchName = localStorage.getItem('name');
        const url = `${SEARCH_URL}?api_key=${this.options.key}&query=${searchName}&page=${page}`;
        const first = await axios.get(url, this.options);
        this.page = page;
        return first.data;
    }
    get page() {
        return this.page;
    }
        
}

