// const API_KEY = "my_api_key";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        
        if (!article.urlToImage) return;
        const card = newsCardTemplate.content.cloneNode(true);
        fillData(card, article);
        cardsContainer.appendChild(card);
    });
}

function fillData(card, article) {
    const newsImg = card.querySelector("#news-img");
    const newsTitle = card.querySelector("#news-title");
    const newsSource = card.querySelector("#news-source");
    const newsDesc = card.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    card.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
