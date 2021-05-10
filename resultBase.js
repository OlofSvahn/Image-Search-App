const currentURL = new URL(window.location.href);
const searchParams = new URLSearchParams(currentURL.searchParams);
const searchText = searchParams.get("searchText");
const sort = searchParams.get("sort");
const sorts = [
    "relevance",
    "date-posted-desc",
    "date-taken-desc",
    "interestingness-desc",
]
const hitsPerPage = searchParams.get("imgPerPage");
const hits = [
    "10",
    "25",
    "50",
    "100",
]
const searchResult = document.querySelector(".searchResult");
const lightbox = document.querySelector(".lightbox");
const tnSize = "q";
const lbSize = "b";

const apikey = "b008fe0d80fecbe8e2dbdfe21b0aca32";

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
/*const maxItem = 10;
const count = 0;
let index = 1;*/

async function FetchResults ()
{
    const response = await fetch(`https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apikey}&text=${searchText}&per_page=${hits[hitsPerPage]}&sort=${sorts[sort]}&format=json&nojsoncallback=1`);
    const data = await response.json();

    data.photos.photo.forEach(photo => {
        const server = photo.server;
        const id = photo.id;
        const secret = photo.secret;
        const thumbnail = document.createElement("img");
        thumbnail.src = `https://live.staticflickr.com/${server}/${id}_${secret}_${tnSize}.jpg`;
        searchResult.appendChild(thumbnail);

        /*if(count >= (index * maxItem)-maxItem && count < index * maxItem)
        {
            console.log("in")
            thumbnail.classList.remove("hide");
            thumbnail.classList.add("show");
        }
        else
        {
            thumbnail.classList.remove("show");
            thumbnail.classList.add("hide");   
        }
        count++;*/
    });

    const allImages = document.querySelectorAll(".searchResult img",);
    allImages.forEach(image => {
        image.addEventListener("click", e => {
            lightbox.classList.add("active");
            const lbImg = document.createElement("img");
            lbImg.src = image.src.replace(`_${tnSize}.jpg`, `_${lbSize}.jpg`);
            lightbox.appendChild(lbImg);
        });
    });
}

lightbox.addEventListener("click", e => {
    if(e.target !== e.currentTarget) 
    {
        return;
    }
    lightbox.classList.remove("active");
    lightbox.innerHTML = "";
});




