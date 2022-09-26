import axios from 'axios';

import { BASE_URL, API_KEY, SEARCH_URL, GENRE_URL } from './refs';

export class FilmsApiService{
    constructor() {
        this.serchQuery = '';
        this.page = 1;
        this.totalPages = 0; //total_pages
        // this.language = '';
        // this.allGenres = [];
        this.options = {
            key: API_KEY,
            page: this.page,
        };
    }
     //1. Search
    //https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
   //2. Query For Details   id=343611
    //https://api.themoviedb.org/3/movie/343611?api_key={api_key}
   
   
    async fetchFilmsPopular() {
        try {
                //https://api.themoviedb.org/3/trending/movie/day?api_key=<<api_key>>
            const url = `${BASE_URL}/trending/movie/week?api_key=${this.options.key}&page=${this.page}`;
            return await axios.get(url)
                .then(response => {
                    
                    if (response.status == 200) {
                        this.incrementPage();
                    }
                    this.totalPages = response.data.total_pages; 
                    // console.log('this.totalPages', this.totalPages);
                   return response.data;
                })
                
        } catch (error) {
            console.log('error: ', error.message);
         }
    };
 async fetchFilmsSearch(searchQuery, page=1) {
     try {
         this.page = page;
                //https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
            const url = `${SEARCH_URL}?api_key=${this.options.key}&query=${searchQuery}&page=${this.page}`;
            return await axios.get(url)
                .then(response => {
                    
                    if (response.status == 200) {
                        this.incrementPage();
                    }
                   this.totalPages = response.data.total_pages;
                   return response.data;
                })
                
        } catch (error) {
            console.log('error: ', error.message);
         }
    };
   async fetchFilmById(filmId, lang=en-US) {
        try {
            //https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US
            return await axios.get(
                `${BASE_URL}/movie/${filmId}?api_key=${this.options.key}&language=${lang}`
            )
                .then(response => {
                    if (response.status == 200) {
                        this.incrementPage();
                    }
                    this.totalPages = response.data.total_pages;
                    return response.data;
                })
        }catch (error) {
            console.log('error: ', error.message);
         }
    };

    async fetchGetGenres() {
        try {
                //https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US
            const url = `${GENRE_URL}`;
            return await axios.get(url)
                .then(response => {
                //    console.log('genres fetchGetGenres:', response.data.genres);
                   return response.data.genres;
                })
                
        } catch (error) {
            console.log('error: ', error.message);
         }
    };
    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get totalFilmsPages() {
        return this.totalPages;
    }
    get query() {
        return this.serchQuery;
    }

    set query(newQuery) {
        this.serchQuery = newQuery;
    }

};