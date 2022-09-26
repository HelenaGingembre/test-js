
import { FilmsApiService } from './api-service.js';

const filmsApiService = new FilmsApiService();
 let listNameGenre = [];
// let ids=[14,28,35]
export async function getGenreName(ids) {
    
    return await filmsApiService.fetchGetGenres()
        .then(res => {
            const listGenres = res;
            let singleGenre = [];
            
            ids.forEach(id => {
                const listNameItem = [...listGenres].filter(item => item.id === id)
                    .map(item => item.name);
                return singleGenre.push(...listNameItem);
            });
        //  console.log('ids:', ids, '+singleGenre', singleGenre.join(','));
           
            return singleGenre.join(', ');
            
        }).catch(error=> console.log('error', error));
    
};



/*----------------------test--- renderList for Film----------------------*/
/*
console.log('----[14,28,35]---------',getGenreName([14,28,35]).then(res=>renderList(res)) );

function renderList(res) {
    const resList = document.querySelector(".res-list");
    const markup = `<i>${res}</i>`;
  resList.innerHTML = markup;
}
*/