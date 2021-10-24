export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    async fetchPhotos() {
        const BASE_URL = `https://pixabay.com/api/`;
        const API_KEY = `key=23963114-6d0d5d874ae460d9125bacd21`;
        let params = `?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&`;
        let url = BASE_URL + params + API_KEY;

        try {
            const response = await fetch(url);
            const photos = await response.json();
            this.page += 1;

            return photos.hits;
        } catch (err) {
            console.log(err)
        }     
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    resetPage() {
        this.page = 1;
    }
}
