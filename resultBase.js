const currentURL = new URL(window.location.href);
const searchParams = new URLSearchParams(currentURL.searchParams);
const searchText = searchParams.get("searchText");
const searchResult = document.querySelector(".searchResult");
const lightbox = document.querySelector(".lightbox");
const tnSize = "q";

console.log(searchText);

const apikey = "b008fe0d80fecbe8e2dbdfe21b0aca32";

console.log(apikey)

async function FetchResults ()
{
    const response = await fetch(`https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apikey}&text=${searchText}&per_page=20&sort=relevance&format=json&nojsoncallback=1`);
    const data = await response.json();

    console.log(response);

    data.photos.photo.forEach(photo => {
        const serverId = photo.server;
        const id = photo.id;
        const secret = photo.secret;
        const thumbnail = document.createElement("img");
        thumbnail.src = `https://live.staticflickr.com/${serverId}/${id}_${secret}_${tnSize}.jpg`
        searchResult.appendChild(thumbnail)
    });

    const allImages = document.querySelectorAll(".searchResult img",);
    allImages.forEach(image => {
        image.addEventListener("click", e => {
            lightbox.classList.add("active");
            const img = document.createElement("img");
            img.src = image.src;
            lightbox.appendChild(img);
        });
    });

}




