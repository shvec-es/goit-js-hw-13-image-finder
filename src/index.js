import './styles/main.scss';
import refs from './js/refs';
const { formEl, listEl, loadMoreBtn} = refs;
import ApiService  from './js/apiService';
const apiService = new ApiService ();
import cardImage from './templates/card-image.hbs';
const { success, error } = require('@pnotify/core');
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import './js/open-big-image';

formEl.addEventListener('submit', (renderGalleryMarkup));
loadMoreBtn.addEventListener('click', getMorePhotos);

function renderGalleryMarkup(e) {
    e.preventDefault();
    clearGalleryMarkup();

    apiService.query = e.target.query.value;
    apiService.resetPage();
    
    apiService.fetchPhotos()
        .then(photos => {
            if (photos.length > 0) {
                addPhotos(photos);
                success({
                    text: "Success!",
                    delay: 300,
                    maxTextHeight: null
                });
            loadMoreBtn.classList.remove('is-hidden');
            formEl.reset();
            } else {
                error({
                text: "Invalid request! Try another word.",
                delay: 1000,
                maxTextHeight: null
            });
            }
            
        }).catch(err => {
            console.log(err);
            error({
                text: "CRITICAL ERROR!",
                delay: 1000,
                maxTextHeight: null
            });
        });
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
        .catch(err => {
            console.log(err);
            error({
                text: "CRITICAL ERROR!",
                delay: 1000,
                maxTextHeight: null
            });
        });
}

function clearGalleryMarkup() {
    listEl.innerHTML = '';
}

