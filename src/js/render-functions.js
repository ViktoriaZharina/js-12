export function displayImages(images, gallery) {
    const markup = images.map(image => `
        <li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
                <div class="full-image">
                    <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
                    <ul class="image-button">
                        <li><p>Likes</p><p>${image.likes}</p></li>
                        <li><p>Views</p><p>${image.views}</p></li>
                        <li><p>Comments</p><p>${image.comments}</p></li>
                        <li><p>Downloads</p><p>${image.downloads}</p></li>
                    </ul>
                </div>
            </a>
        </li>
    `).join('');
    gallery.insertAdjacentHTML('beforeend', markup);

    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });
    lightbox.refresh();
}

// Функція для відображення повідомлень
export function displayToast(message, type) {
    iziToast[type]({
        message,
        messageColor: 'white',
        position: 'topRight',
        backgroundColor: type === 'error' ? 'red' : 'green'
    });
}
