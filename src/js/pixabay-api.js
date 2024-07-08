import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export async function fetchImages(searchData, page, perPage) {
    try {
        const searchParams = new URLSearchParams({
            key: '44728966-7765244b057c0982fa05c31d9',
            q: searchData,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            per_page: perPage,
            page: page
        });
        const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
