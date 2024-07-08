import { fetchImages } from './js/fetchImages';
import { displayImages, displayToast } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let searchData = '';
let page = 1;
const perPage = 40;
let totalPages = 0;

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    searchData = event.currentTarget.elements.query.value.trim();
    if (!searchData) {
        displayToast('Please enter a search query', 'error');
        return;
    }
    gallery.innerHTML = '';
    page = 1;
    try {
        const data = await fetchImages(searchData, page, perPage);
        totalPages = Math.ceil(data.totalHits / perPage);
        if (data.hits.length === 0) {
            displayToast('No images found', 'error');
            return;
        }
        displayImages(data.hits, gallery);
        loadMoreBtn.classList.remove('hidden');
    } catch (error) {
        displayToast('Error fetching images', 'error');
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    if (page > totalPages) {
        displayToast('No more images to load', 'info');
        loadMoreBtn.classList.add('hidden');
        return;
    }
    try {
        const data = await fetchImages(searchData, page, perPage);
        displayImages(data.hits, gallery);
    } catch (error) {
        displayToast('Error fetching images', 'error');
    }
});
