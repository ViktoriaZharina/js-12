import axios from "axios";
export async function fetchImages(searchData, page, perPage) {
    try {
        const searchParams = new URLSearchParams({
            key: '43761083-735c77d8194f3d0bda00bacf0',
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
