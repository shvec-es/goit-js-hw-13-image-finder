import './styles/main.scss';
import refs from './js/refs';
const { formEl, listEl, loadMoreBtn, photoCard} = refs;
import ApiService  from './js/apiService';
const apiService = new ApiService ();
import cardImage from './templates/card-image.hbs';
const { success, error } = require('@pnotify/core');
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import './js/open-big-image';

formEl.addEventListener('submit', (renderGalleryMarkup));

async function renderGalleryMarkup(e) {
    e.preventDefault();
    clearGalleryMarkup();

    apiService.query = e.target.query.value;
    apiService.resetPage();
    
    try {
        const photos = await apiService.fetchPhotos();
        
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
            loadMoreBtn.classList.add('is-hidden');
            error({
                text: "Invalid request! Try another word.",
                delay: 1000,
                maxTextHeight: null
            });
        }
            
    } catch (err) {
        console.log(err);
        error({
            text: "CRITICAL ERROR!",
            delay: 1000,
            maxTextHeight: null
        });
    };
}
            
function clearGalleryMarkup() {
    listEl.innerHTML = '';
}

function addPhotos(photos) {
    const markup = cardImage(photos);
    listEl.insertAdjacentHTML('beforeend', markup);   
    listEl.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

async function getMorePhotos(entries) {
    if (entries[0].isIntersecting) {
        try {
            const photos = await apiService.fetchPhotos()
            addPhotos(photos);
        } catch (err) {
            console.log(err);
            error({
                text: "CRITICAL ERROR!",
                delay: 1000,
                maxTextHeight: null
            });
        }       
    }
}       
   
const observer = new IntersectionObserver(getMorePhotos);
    
observer.observe(loadMoreBtn);