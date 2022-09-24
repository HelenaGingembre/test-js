
import { FilmsApiService } from './api-service.js';

const filmsApiService = new FilmsApiService();
 let listNameGenre = [];
//ids=[14,28,35]
export function getGenreName(ids) {
    
    return filmsApiService.fetchGetGenres().then(res => {
        const listGenres = res;
        let singleGenre = [];
        
        ids.forEach(id => {
        //    console.log('listGenres.id', listGenres.id);
               /* .map(listGenre => listGenre.name);
            return singleGenre.push(...listNameItem);*/
             
            const listNameItem = [...listGenres]
                .filter(listGenre => listGenre.id === id)
                .map(listGenre => listGenre.name);
            let array = singleGenre.push(...listNameItem);
            return array;

        });
         console.log('ids:', ids, '+singleGenre', singleGenre);
         console.log('array', singleGenre.join(','));
        // renderGenres(singleGenre);
        
         return singleGenre;
    });
    
};

