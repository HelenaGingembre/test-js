// import { PaginationApiService } from "./paginationApi";
import { FilmsApiService } from "./api-service";
import { refs } from './refs';
import { markupMoviesGallery } from './markupMoviesGallery';
// import { getPopularInLoadStartPage, getFilmsOnSearch } from './../index';

const filmsApiService = new FilmsApiService();

export function renderPaginationBtn(e) {
    refs.pagination.innerHTML = '';
    const per_page_max = e;
    console.log('per_page_max - ', per_page_max);
    let current_page = 1;

    function appendBtn(i, threepoint) {
        const activeBtn = current_page === i;
        const button = document.createElement('li');
        button.classList.add('pagination-list-item');
        if (threepoint === true) {
        button.innerHTML = '...';
        button.disabled = true;
        refs.pagination.append(button);
        return false;
        }
        if (activeBtn) {
        button.classList.add('pag-activ');
        }
        button.disabled = activeBtn;
        button.innerHTML = i;
        button.addEventListener('click', () => {
        current_page = i;
        refs.pagination.innerHTML = '';
        logic();
        });
        refs.pagination.append(button);
    }
    
    logic();
  
    function logic() {
        if (per_page_max === 1) { 
        return;
        }
        appendBtn(1);
        if (per_page_max === 2) {
            appendBtn(2);
            return;
        }
        if (per_page_max > 2 && per_page_max <= 3) {
            appendBtn(2);
            appendBtn(3);
            return;
        }
        if (per_page_max > 3 && per_page_max < 7) {
            for (let i = 2; i <= per_page_max; i += 1) {
                appendBtn(i);
            }
            return;
        }
    if (per_page_max < 8) {
      for (let i = 2; i <= per_page_max; i++) {
        appendBtn(i);
      }
      return;
    }
    if (current_page < 6) {
      appendBtn(2);
      appendBtn(3);
      appendBtn(4);
      appendBtn(5);
      appendBtn(6);
      appendBtn(7);
      appendBtn(current_page, true);
    } else if (current_page <= per_page_max - 5) {
      appendBtn(current_page, true);
      appendBtn(current_page - 2);
      appendBtn(current_page - 1);
      appendBtn(current_page);
      appendBtn(current_page + 1);
      appendBtn(current_page + 2);
      appendBtn(current_page, true);
    } else {
      appendBtn(current_page, true);
      appendBtn(per_page_max - 6);
      appendBtn(per_page_max - 5);
      appendBtn(per_page_max - 4);
      appendBtn(per_page_max - 3);
      appendBtn(per_page_max - 2);
      appendBtn(per_page_max - 1);
    }
    appendBtn(per_page_max);
    }
}

export async function onPaginateBtnClick(e) {
    console.log('onPaginateBtnClick(e): ',e.target.nodeName);
    if (e.target.nodeName !== 'li') {
        return;
    }
  refs.gallery.innerHTML = '';
    let pageNum = e.target.innerText;
    console.log('pageNum-', pageNum);
    filmsApiService.fetchFilmsPopular(pageNum).then(data => {
    // const markupPagin = data.results.map(item => markupMoviesGallery(item)).join('');
     // refs.gallery.insertAdjacentHTML('beforeend', markupPagin);
        console.log('onPaginateBtnClick data.results:',data.results);
         renderMoviesGallery(data.results);
     
  });
}

/*
async function main() {
  const postsData = await getData();
  let currentPage = 1;
  let rows = 10;

  function displayList(arrData, rowPerPage, page) {
    const postsEl = document.querySelector('.posts');
    postsEl.innerHTML = "";
    page--;

    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);

    paginatedData.forEach((el) => {
      const postEl = document.createElement("div");
      postEl.classList.add("post");
      postEl.innerText = `${el.title}`;
      postsEl.appendChild(postEl);
    })
  }

  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector('.pagination');
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl)
    }
    paginationEl.appendChild(ulEl)
  }

  function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add('pagination__item')
    liEl.innerText = page

    if (currentPage == page) liEl.classList.add('pagination__item--active');

    liEl.addEventListener('click', () => {
      currentPage = page
      displayList(postsData, rows, currentPage)

      let currentItemLi = document.querySelector('li.pagination__item--active');
      currentItemLi.classList.remove('pagination__item--active');

      liEl.classList.add('pagination__item--active');
    })

    return liEl;
  }

  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows);
}

main();*/