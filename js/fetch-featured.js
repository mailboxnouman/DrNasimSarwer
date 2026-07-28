import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const articlesPerPage = 8;

let allArticles = [];
let currentPage = 1;
let selectedCategory = "all";

document.addEventListener("DOMContentLoaded", async () => {

    const snapshot = await getDocs(
        query(
            collection(db, "articles"),
            orderBy("createdAt", "desc")
        )
    );

    snapshot.forEach(doc => {

        allArticles.push({
            id: doc.id,
            ...doc.data()
        });

    });

    renderArticles();
    renderPagination();
    document
.querySelectorAll('.featured__controls input')
.forEach(btn=>{

    btn.addEventListener("change",()=>{

        if(btn.id==="all")
            selectedCategory="all";
        else
            selectedCategory=btn.id;

        currentPage=1;

        renderArticles();

        renderPagination();

    });

});

});

function renderArticles() {

    const container = document.getElementById("articles-container");

    container.innerHTML = "";

    let filtered = allArticles;

if (selectedCategory !== "all") {

    filtered = allArticles.filter(article =>

        article.category === selectedCategory

    );

}

const start = (currentPage - 1) * articlesPerPage;

const end = start + articlesPerPage;

const articles = filtered.slice(start, end);

    articles.forEach(article => {

        container.innerHTML += `

<div class="col-lg-3 col-md-4 col-sm-6 mix ${article.category}">

<div class="featured__item">

    <div class="featured__item__pic set-bg"
         data-setbg="${article.coverImage}">

        <ul class="featured__item__pic__hover">

            <li>
                <a href="view-article.html?id=${article.id}">
                    <i class="fa fa-eye"></i>
                </a>
            </li>

        </ul>

    </div>

    <div class="featured__item__text">

        <h6>
            <a href="view-article.html?id=${article.id}">
                ${article.title}
            </a>
        </h6>

    </div>

</div>

</div>

`;

    });
    $('.set-bg').each(function () {

        var bg = $(this).data('setbg');

        $(this).css('background-image', 'url(' + bg + ')');

    });

}
function renderPagination() {

    let filtered = allArticles;

if (selectedCategory !== "all") {

    filtered = allArticles.filter(article =>

        article.category === selectedCategory

    );

}

const pages = Math.ceil(filtered.length / articlesPerPage);
    const container = document.getElementById("pagination-container");

    container.innerHTML = "";

    if (pages <= 1) return;

    if (currentPage > 1) {

        container.innerHTML +=

`<button class="site-btn prev-btn">Previous</button>`;

    }

    for (let i = 1; i <= pages; i++) {

        container.innerHTML +=

`<button class="site-btn page-btn" data-page="${i}">${i}</button>`;

    }

    if (currentPage < pages) {

        container.innerHTML +=

`<button class="site-btn next-btn">Next</button>`;

    }

    document.querySelectorAll(".page-btn").forEach(btn => {

        btn.onclick = () => {

            currentPage = Number(btn.dataset.page);

            renderArticles();
            renderPagination();

        };

    });

    const prev = document.querySelector(".prev-btn");

    if (prev)

        prev.onclick = () => {

            currentPage--;

            renderArticles();
            renderPagination();

        };

    const next = document.querySelector(".next-btn");

    if (next)

        next.onclick = () => {

            currentPage++;

            renderArticles();
            renderPagination();

        };

}