import { refs } from './js/refs';
import { FilmsApiService } from './js/api-service';
import './js/changetheme';
// import './js/scroll/infiniteScroll';
import { PaginationApiService } from './js/paginationApi';
import { spinnerMethod } from './js/scroll/spinner';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { markupMoviesGallery } from './js/markupMoviesGallery';
import { renderPaginationBtn } from './js/pagination';
import { onPaginateBtnClick } from './js/pagination';

// pagination
// import './js/paginationSearch';
import './js/pagination';
// import './js/renderWatchedPaginationBtn';
// import './js/renderQueuePaginationBtn'
// pagination


export { getPopularInLoadStartPage, getFilmsOnSearch};
const DEBOUNCE_DELAY = 500;
const filmsApiService = new FilmsApiService();



//загружаємо популярні відео при першому завантаженні сайту
document.addEventListener('DOMContentLoaded', () => {
  getPopularInLoadStartPage(1);
});

refs.searchForm.addEventListener('submit', onSubmitForm);
refs.gallery.addEventListener('click', getFilmById);
refs.pagination.addEventListener('click', onPaginateBtnClick);


function onSubmitForm(event) {
    event.preventDefault();
    refs.gallerySection.dataset.page = 'search';
    
    const currentInput = event.currentTarget.elements.searchQuery.value.trim();
    if (currentInput === '') {
       Notiflix.Notify.info('Sorry, nothing has been entered in the search query. Please try again.');
        clearGalleryContainer();
        getPopularInLoadStartPage(1);
        spinnerMethod.removeSpinner();
        // setBtnLoadMoreInvisible();
       return;
    }
    filmsApiService.serchQuery = currentInput;
    console.log('currentInput:', currentInput );
    getFilmsOnSearch(currentInput, page=1);
    };

async function getFilmsOnSearch(serchQuery, page) {
    refs.gallerySection.dataset.page = 'search';
    if (page === 1) {
        clearGalleryContainer();
    }
    const filmsOnSearch = await filmsApiService.fetchFilmsSearch(serchQuery, page);
    //Если бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло.
    if (filmsOnSearch.results.length === 0 && page === 1) {
        console.log('filmsOnSearch.results = 0 : ', filmsOnSearch.results);
        Notiflix.Notify.failure(`Sorry, there are no movies matching your search query. Please try again.`);
        setTimeout(() => {
            refs.searchInput.value = '';
            const event = new Event('input');
            //dispatchEvent представляет собой последний шаг в процессе create-init-dispatch, 
            // который служит для отправки событий.
            refs.searchInput.dispatchEvent(event);
        }, 2000);
        return;
    }
    console.log('filmsOnSearch.total_pages: ', filmsOnSearch.total_pages);
    if (page > filmsOnSearch.total_pages) {
        Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
        spinnerMethod.removeSpinner();
        return;
    }
       
    Notiflix.Notify.success(`Hooray! We found totalFilms=${filmsOnSearch.total_results} movies.`);
        console.log('getFilmsOnSearch total_results - ', filmsOnSearch.total_results);
        console.log('getFilmsOnSearch - page - ', filmsOnSearch.page);
        console.log('getFilmsOnSearch -results', filmsOnSearch.results);
        
    renderMoviesGallery(filmsOnSearch.results);
    onPageScrolling();
    return filmsOnSearch.results;
};


/*---------------------------------------------*/


async function getPopularInLoadStartPage(page) {
    refs.gallerySection.dataset.page = 'trending';
    if (page === 1) {
        clearGalleryContainer();
    }
    filmsApiService.resetPage();
    
    const trendsFilms = await filmsApiService.fetchFilmsPopular()
        .then(data => data);
    const max_page = trendsFilms.total_pages;
    console.log('trendsFilms.totalFilmsPages', trendsFilms.total_pages);
    console.log('trendsFilms.totalFilmsPages', filmsApiService.totalFilmsPages);
    
    if (page > filmsApiService.totalFilmsPages) {
      spinnerMethod.removeSpinner();
      return;
    }
    
    renderPaginationBtn(max_page);
    renderMoviesGallery(trendsFilms.results);
    onPageScrolling();
};   

function getFilmById(event) {
    console.log(event.target.nodeName);
    if(event.target.nodeName !== "IMG") {
    return;
  }
    console.log('ПРивіт');
    let x = 0;
    return x;
};



function clearGalleryContainer() {
    refs.gallery.innerHTML = '';
};

function renderMoviesGallery(movies) {
     refs.gallery.insertAdjacentHTML('beforeend', markupMoviesGallery(movies));
};

//  Плавная прокрутка страницы после запроса и отрисовки каждой следующей группы изображений
function onPageScrolling() { 
    //возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим).
    const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();
       
    window.scrollBy({
        top: cardHeight * 10,
        behavior: "smooth",
        });
}

/*
function setBtnLoadMoreInvisible() {
    refs.loadMore.classList.add('is-hidden');
};

function setBtnLoadMoreVisible() {
    refs.loadMore.classList.remove('is-hidden');
};
*/


/*
filmsApiService.fetchFilmsSearch(serchQuery, page).then(films => {
        //Если бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло.
        if (films.results.length == 0 ) {
            console.log('getFilmsOnSearch films.results : ', films);
            Notiflix.Notify.failure(`Sorry, there are no movies matching your search query. Please try again.`);
            // getPopularInLoadStartPage(page)
            return;
        }
        else {
            Notiflix.Notify.success(`Hooray! We found totalFilms=${films.total_results} movies.`);
            console.log('getFilmsOnSearch films.total_results - ', films.total_results);
            console.log('getFilmsOnSearch - films.pages - ', films.page);
            console.log('getFilmsOnSearch',films.results);
            return films.results;
        }
        
    }).then(res => {
           
            if (refs.gallery.children.length === this.total_results) {
                Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
                setBtnLoadMoreInvisible();
                // console.log('res.total_results', res.total_results);
            }
        setBtnLoadMoreVisible();
        renderMoviesGallery(res);
        onPageScrolling();
        return res;
    })
  */

    /*document.addEventListener(
    'scroll',
    throttle(async evt => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            await addImgOnEvt();
        }
    }, 250));
    */