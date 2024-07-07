import{S as u,i as d}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();function f(s){const o=`https://pixabay.com/api/?${new URLSearchParams({key:"44728966-7765244b057c0982fa05c31d9",q:s,image_type:"photo",orientation:"horizontal",safesearch:"true"})}`;return fetch(o).then(i=>{if(!i.ok)throw new Error(i.status);return i.json()})}function p(s,r){const o=s.map(e=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
                <div class="full-image">
                    <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}">
                    <ul class="image-button">
                        <li><p>Likes</p><p>${e.likes}</p></li>
                        <li><p>Views</p><p>${e.views}</p></li>
                        <li><p>Comments</p><p>${e.comments}</p></li>
                        <li><p>Downloads</p><p>${e.downloads}</p></li>
                    </ul>
                </div>
            </a>
        </li>
    `).join("");r.innerHTML=o,new u(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function l(s,r){d[r]({message:s,messageColor:"white",position:"topRight",backgroundColor:"red"})}const m=document.querySelector("form"),c=document.querySelector(".gallery"),n=document.querySelector(".spinner");m.addEventListener("submit",s=>{s.preventDefault(),c.innerHTML="",n.classList.remove("is-hidden");const r=s.target.elements.search_input.value.trim();if(r===""){l("All form fields must be filled in","warning"),n.classList.add("is-hidden");return}f(r).then(o=>{if(o.total===0){l("Sorry, there are no images matching your search query. Please try again!","error");return}p(o.hits,c)}).catch(o=>{console.error("Error fetching images:",o),l("An error occurred while fetching images. Please try again later.","error")}).finally(()=>{s.target.reset(),n.classList.add("is-hidden")})});
//# sourceMappingURL=commonHelpers.js.map
