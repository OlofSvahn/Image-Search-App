let page = 1;
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

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const tnSize = "q";
const lbSize = "b";

const apikey = "b008fe0d80fecbe8e2dbdfe21b0aca32";

let picCount = 0;
let picsPerPageCount = 0;

async function FetchResults ()
{
    const response = await fetch(`https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apikey}&text=${searchText}&per_page=100&sort=${sorts[sort]}&format=json&nojsoncallback=1`);
    const data = await response.json();

    data.photos.photo.forEach(photo => {
        const server = photo.server;
        const id = photo.id;
        const secret = photo.secret;
        const thumbnail = document.createElement("img");
        thumbnail.src = `https://live.staticflickr.com/${server}/${id}_${secret}_${tnSize}.jpg`;
        picCount++;

        if(picCount > picsPerPageCount && picCount <= (hits[hitsPerPage]*page))
        {
            picsPerPageCount++;
            searchResult.appendChild(thumbnail);
        }
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
    console.log(picsPerPageCount);
    console.log(page);
    picCount = 0;
}

prev.addEventListener("click", e => {
    page--;
    picsPerPageCount -= picsPerPageCount;
    searchResult.innerHTML = "";
    FetchResults();
});

next.addEventListener("click", e => {
    page++;
    searchResult.innerHTML = "";
    FetchResults();
});

lightbox.addEventListener("click", e => {
    if(e.target !== e.currentTarget) 
    {
        return;
    }
    lightbox.classList.remove("active");
    lightbox.innerHTML = "";
});




