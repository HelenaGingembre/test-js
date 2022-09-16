import axios from 'axios';
// const axios = require('axios').default;

import { BASE_URL, API_KEY, SEARCH_URL } from './refs';

export class FilmotekaApp{
    constructor() {
        this.serchquery = '';
        this.page = 1;
        this.totalPages = 0;
    }

    async getData(page) {
        try {
            // https://api.themoviedb.org/3/movie/550?api_key=0753d31482992eaeca4a1269ff45804b

            const {data} = await axios.get(`${BASE_URL}/movie/550?api_key=${API_KEY}`);
            console.log('dataFilms.data: ', data);
            return data;

        } catch (error){
            console.log(error);
        }
        
    }
}