import { fetchImages } from "./js/pixabay-api.js";
import { displayImages, displayToast } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector("form");
    const gallery = document.querySelector(".gallery");
    const loader = document.querySelector(".spinner");
    const loadButton = document.querySelector(".load-button");
    let page = 1;
    const perPage = 15;
    let searchData = '';

    if (!searchForm || !gallery || !loader || !loadButton) {
        console.error('Required elements are not found in the DOM.');
        return;
    }

    loadButton.classList.add('is-hidden');
    
    searchForm.addEventListener("submit", event => {
        event.preventDefault();
        gallery.innerHTML = "";
        page = 1;
        loader.classList.remove('is-hidden');
        searchData = event.target.elements.search_input.value.trim();
        if (searchData === "") {
            loadButton.classList.add('is-hidden');
            displayToast('All form fields must be filled in', 'warning');
            loader.classList.add('is-hidden');
            return;
        }
        fetchImages(searchData, page, perPage)
            .then(images => {
                if (images.total === 0) {
                    displayToast('Sorry, there are no images matching your search query. Please try again!', 'error');
                    loadButton.classList.add('is-hidden');
                    return;
                } else if (images.total <= 15) {
                    displayImages(images.hits, gallery);
                    iziToast.error({
                        position: "topRight",
                        message: "We're sorry, there are no more posts to load",
                        messageColor: 'white',
                        backgroundColor: 'red'
                    });
                } else {
                    loadButton.classList.remove('is-hidden');
                    displayImages(images.hits, gallery);
                }
            })
            .catch(error => {
                console.error('Error fetching images:', error);
                displayToast('An error occurred while fetching images. Please try again later.', 'error');
            })
            .finally(() => {
                event.target.reset();
                loader.classList.add('is-hidden');
            });
    });

    loadButton.addEventListener("click", async () => {
        try {
            loader.classList.remove('is-hidden');
            page += 1;
            const images = await fetchImages(searchData, page, perPage);
            displayImages(images.hits, gallery);
            const fullImage = document.querySelector(".full-image");
            let rect = fullImage.getBoundingClientRect();
            const totalPages = Math.ceil(images.totalHits / perPage);
            if (page >= totalPages) {
                loadButton.classList.add('is-hidden');
                iziToast.error({
                    position: "topRight",
                    message: "We're sorry, there are no more posts to load",
                    messageColor: 'white',
                    backgroundColor: 'red'
                });
            } else {
                window.scrollBy({
                    top: rect.height * 2,
                    behavior: "smooth",
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            loader.classList.add('is-hidden');
        }
    });
});
