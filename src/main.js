const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let searchData = '';
let page = 1;
const perPage = 20;
let totalPages = 0;

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    gallery.innerHTML = '';
    searchData = event.currentTarget.elements.query.value.trim();
    page = 1;

    if (searchData === '') {
        displayToast('Please enter a search query', 'error');
        return;
    }

    try {
        const data = await fetchImages(searchData, page, perPage);
        totalPages = Math.ceil(data.totalHits / perPage);

        if (data.hits.length === 0) {
            displayToast('No images found. Please try a different search query.', 'error');
        } else {
            displayImages(data.hits, gallery);
            displayToast(`Hooray! We found ${data.totalHits} images.`, 'success');
            loadMoreBtn.style.display = 'block';
        }
    } catch (error) {
        displayToast('Failed to fetch images. Please try again later.', 'error');
    }
});

loadMoreBtn.addEventListener('click', async () => {
    if (page > totalPages) {
        displayToast('No more images to load.', 'error');
        return;
    }

    page += 1;

    try {
        const data = await fetchImages(searchData, page, perPage);
        displayImages(data.hits, gallery);

        if (page > totalPages) {
            loadMoreBtn.style.display = 'none';
            displayToast('No more images to load.', 'error');
        }
    } catch (error) {
        displayToast('Failed to load more images. Please try again later.', 'error');
    }
});