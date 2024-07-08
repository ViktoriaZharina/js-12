(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&u(i)}).observe(document,{childList:!0,subtree:!0});function y(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function u(e){if(e.ep)return;e.ep=!0;const t=y(e);fetch(e.href,t)}})();const f=document.getElementById("search-form"),l=document.querySelector(".gallery"),n=document.querySelector(".load-more");let a="",s=1;const c=20;let d=0;f.addEventListener("submit",async o=>{if(o.preventDefault(),l.innerHTML="",a=o.currentTarget.elements.query.value.trim(),s=1,a===""){displayToast("Please enter a search query","error");return}try{const r=await fetchImages(a,s,c);d=Math.ceil(r.totalHits/c),r.hits.length===0?displayToast("No images found. Please try a different search query.","error"):(displayImages(r.hits,l),displayToast(`Hooray! We found ${r.totalHits} images.`,"success"),n.style.display="block")}catch{displayToast("Failed to fetch images. Please try again later.","error")}});n.addEventListener("click",async()=>{if(s>d){displayToast("No more images to load.","error");return}s+=1;try{const o=await fetchImages(a,s,c);displayImages(o.hits,l),s>d&&(n.style.display="none",displayToast("No more images to load.","error"))}catch{displayToast("Failed to load more images. Please try again later.","error")}});
//# sourceMappingURL=commonHelpers.js.map
