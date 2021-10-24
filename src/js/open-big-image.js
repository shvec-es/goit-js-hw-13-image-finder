import refs from './refs';
const { listEl, modalDiv, bigImage, modalCloseBtn } = refs;

listEl.addEventListener('click', openBigImage)

function openBigImage(e) {
    e.preventDefault();
    if (!e.target.classList.contains('photo-card-img')) {
        return;
    }
    
    const largeImgUrl = e.target.dataset.source;

    modalDiv.classList.add('is-open');
    bigImage.setAttribute('src', largeImgUrl);

}

modalCloseBtn.addEventListener('click', e => {
    modalDiv.classList.remove('is-open');
    bigImage.src = "";
})