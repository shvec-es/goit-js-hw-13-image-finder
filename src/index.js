import './styles/main.scss';
import refs from './js/refs';
const { formEl, listEl, loadMoreBtn } = refs;
import ApiService  from './js/apiService';
const apiService = new ApiService ();
import cardImage from './templates/card-image.hbs';

formEl.addEventListener('submit', (renderGalleryMarkup));
loadMoreBtn.addEventListener('click', getMorePhotos);

function renderGalleryMarkup(e) {
    e.preventDefault();
    clearGalleryMarkup();

    apiService.query = e.target.query.value;
    apiService.resetPage();
    
    apiService.fetchPhotos()
        .then(photos => {
            addPhotos(photos);
            loadMoreBtn.classList.remove('is-hidden');
            formEl.reset();
        }).catch(err => console.log(err));
}

function addPhotos(photos) {
    const markup = cardImage(photos);
    listEl.insertAdjacentHTML('beforeend', markup);
    listEl.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
}

function getMorePhotos() {
    apiService.fetchPhotos()
        .then(photos => {
            addPhotos(photos);
        })   
        .catch(err => console.log(err));
}

function clearGalleryMarkup() {
    listEl.innerHTML = '';
}