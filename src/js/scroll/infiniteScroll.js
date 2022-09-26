// import { renderMovieList } from './renderFromLocalStorage';
// import fetchAPI from './fetchAPI.js';
import { refs } from '../refs';
import { getPopularInLoadStartPage, getFilmsOnSearch } from '../../index';

import { spinnerMethod } from './spinner.js';
const debounce = require('lodash.debounce');


let page = 1;
let previousPage = refs.gallerySection.dataset.page;
    //Intersection Observer API позволяет веб-приложениям асинхронно следить 
    //за изменением пересечения элемента с его родителем или областью видимости
    // документа viewport.
    //Intersection Observer API даёт возможность зарегистрировать колбэк-функцию,
    //которая выполнится при пересечении наблюдаемым элементом границ другого элемента
    //Степень пересечения  элемента (threshold: 1.0)задаётся в диапазоне от 0.0 до 1.0,
    // где 1.0 это полное пересечение целевого элемента границ корневого.
    //Если в конструктор не было передано значения или оно null, будет использован viewport документа.
    var options = {
    rootMargin: '0px',
    threshold: 1.0,
}
const observer = new IntersectionObserver(debounce(onRender, 1000), options);
// const observer = new IntersectionObserver(onRender, options);
    //Сообщает объекту IntersectionObserver целевой элемент для наблюдения.
observer.observe(refs.scrollArea);

async function onRender(entries) {
  let resultList;
  const query = refs.searchInput.value;
  if (entries[0].isIntersecting) {
    spinnerMethod.addSpinner();
    console.log('refs.gallery.children.length = ', refs.gallery.children.length);
    if (refs.gallery.children.length !== 0) {
      if (previousPage !== refs.gallerySection.dataset.page) {
        page = 1;
        console.log('observer page', page);
      }
      page += 1;
      switch (refs.gallerySection.dataset.page) {
        case 'trending':
          getPopularInLoadStartPage(page);
          previousPage = refs.gallerySection.dataset.page;
          break;
        case 'search':
          getFilmsOnSearch(query, page);
          previousPage = refs.gallerySection.dataset.page;
          break;
        // case 'watched':
        //   renderMovieList(refs.gallery.dataset.page, page);
        //   previousPage = refs.gallery.dataset.page;
        //   break;
        // case 'queue':
        //   renderMovieList(refs.gallery.dataset.page, page);
        //   previousPage = refs.gallery.dataset.page;
        //   break;
        // case 'filtering':
        //   renderByGenreFilter(document.querySelector('.js-select').value, page)
        //  previousPage = refs.gallery.dataset.page;
        //  break;

        default:
          break;
      }
      spinnerMethod.removeSpinner();
    } else {
      spinnerMethod.removeSpinner();
      return;
    }
  }
}

//     if (page > resultList.total_pages) {
//       spinnerMethod.removeSpinner();
//       return;
//     } else {
//       render(resultList.results);
//       spinnerMethod.removeSpinner();
//     }
//   } else {
//     return;
//   }
// }

// async function render(data) {
//   spinnerMethod.addSpinner();
//   try {
//     const genres = await fetch.getGenres().then(list => {
//       return list.genres;
//     });
//     const result = await renderGalleryMarkup(data, genres);
//     refs.galleryList.insertAdjacentHTML('beforeend', movieCardTemplate(result));
//     const img = document.querySelectorAll('.js-card-img');
//     if (refs.galleryList.lastElementChild.complete) {
//       spinnerMethod.removeSpinner();
//     }
//   } catch (e) {
//     spinnerMethod.removeSpinner();
//   }
// }