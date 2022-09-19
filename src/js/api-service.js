import axios from 'axios';

import { BASE_URL, API_KEY, SEARCH_URL } from './refs';

export class FilmsApiService{
    constructor() {
        this.serchQuery = '';
        this.page = 1;
        // this.totalPages = 0;
        this.options = {
            key: API_KEY,
            page: this.page,
        };
    }

    async fetchFilms() {
        // try {
        //     // https://api.themoviedb.org/3/movie/550?api_key=0753d31482992eaeca4a1269ff45804b

        //     const {data} = await axios.get(`${BASE_URL}/movie/550?api_key=${API_KEY}`);
        //     console.log('dataFilms.data: ', data);
        //     return data;

        // } catch (error){
        //     console.log(error);
        // }
        const url = `${BASE_URL}/movie/550?api_key=${this.options.key}&page=${this.page}`;

        return await axios.get(url, this.options)
            .then(response => {
                console.log('fetchFilms.data: ', response.data);
                this.incrementPage();
                
                return response.data;
            })
            .catch(error => console.log(error));

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