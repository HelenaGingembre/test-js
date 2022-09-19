import axios from 'axios';

import { BASE_URL, API_KEY, SEARCH_URL } from './refs';

export class FilmsApiService{
    constructor() {
        this.serchQuery = '';
        this.page = 1;
        this.totalPages = 0; //total_pages
        this.options = {
            key: API_KEY,
            page: this.page,
        };
    }
     //1. Search
    //https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
   //2. Query For Details   id=343611
    //https://api.themoviedb.org/3/movie/343611?api_key={api_key}
   
   
    async fetchFilms() {
        
        try {
            const url = `${BASE_URL}/trending/movie/day?api_key=${this.options.key}&page=${this.page}`;

            
            return await axios.get(url)
                .then(response => {
                    
                    if (response.status == 200) {
                        this.incrementPage();
                    }
                    console.log('fetchFilms.data in API: ', response.data);
                    console.log('fetchFilms.data.result in API: ', response.data.results);
                    return response.data;
                })
                
        } catch (error) {
            console.log('error: ', error.message);
         }

    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.serchQuery;
    }

    set query(newQery) {
        this.serchQuery = newQery;
    }

}