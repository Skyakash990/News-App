const API_key = "d805e28876674f3c94e6891b71085b18";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("india"));
window.preventDefault();
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_key}`);
    const data = await res.json(); // Add await here
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardscontainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card')

    cardscontainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true); // Fix "contentEditable" to "content"
        fillDataInCard(cardClone,article);
        cardscontainer.appendChild(cardClone); // Fix "appndChild" to "appendChild"
    });
}
function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSrc = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone:"Asia/Jakarta",
    });

    newsSrc.innerHTML = `${article.source.name} - ${date}`
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

let currentSelected = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelected?.classList.remove('active');
    currentSelected = navItem;
    currentSelected.classList.add('active');
}

const searchButton=document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelected?.classList.remove('active');
    currentSelected = null;
});