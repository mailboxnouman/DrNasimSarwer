import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    startAfter
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




const perPage = 6;

let allArticles = [];
let filteredArticles = [];

let currentPage = 1;
let currentCategory = "All";



async function loadArticles() {

    const snap = await getDocs(
        query(
            collection(db, "articles"),
            orderBy("createdAt", "desc")
        )
    );

    allArticles = [];

    snap.forEach(doc => {

        allArticles.push({

            id: doc.id,
            ...doc.data()

        });

    });

    filteredArticles = [...allArticles];

    renderArticles();

    renderPagination();

}



function renderArticles() {

    const container =
        document.getElementById("articles");

    container.innerHTML = "";

    const start =
        (currentPage - 1) * perPage;

    const end =
        start + perPage;

    const articles =
        filteredArticles.slice(start, end);

    articles.forEach(article => {

        container.innerHTML += `
        
        <div class="col-lg-6 col-md-6 col-sm-6">
        
        <div class="blog__item">
        
        <div class="article-image blog__item__pic">
        
        <a href="view-article.html?id=${article.id}">
        
        <img src="${article.coverImage}">
        
        </a>
        
        </div>
        
        <div class="blog__item__text">
        
        <ul>
        
        <li>
        
        <i class="fa fa-calendar-o"></i>
        
        ${article.createdAt?.toDate().toDateString() || ""}
        
        </li>
        
        </ul>
        
        <h5 style="text-align:right">
        
        <a href="view-article.html?id=${article.id}">
        
        ${article.title}
        
        </a>
        
        </h5>
        
        <p
        style="
        font-family:nafees_web_naskhshipped;
        direction:rtl;
        font-size:18px;
        ">
        
        ${article.content.substring(0, 160)}...
        
        </p>
        
        <a
        href="view-article.html?id=${article.id}"
        class="btn btn-success"
        style="background:#7FAD39;border:none">
        
        مزید پڑھیں
        
        </a>
        
        </div>
        
        </div>
        
        </div>
        
        `;

    });

}
function renderPagination() {

    const pages =
        Math.ceil(filteredArticles.length / perPage);

    const container =
        document.getElementById("pagination");

    container.innerHTML = "";

    if (pages <= 1) return;

    if (currentPage > 1) {

        container.innerHTML += `
            
            <a href="#" id="prev">
            
            <i class="fa fa-long-arrow-left"></i>
            
            </a>
            
            `;

    }

    for (let i = 1; i <= pages; i++) {

        container.innerHTML += `
            
            <a href="#"
            
            class="page"
            
            data-page="${i}">
            
            ${i}
            
            </a>
            
            `;

    }

    if (currentPage < pages) {

        container.innerHTML += `
            
            <a href="#" id="next">
            
            <i class="fa fa-long-arrow-right"></i>
            
            </a>
            
            `;

    }

    document.querySelectorAll(".page").forEach(btn => {

        btn.onclick = (e) => {

            e.preventDefault();

            currentPage =
                Number(btn.dataset.page);

            renderArticles();

            renderPagination();

        };

    });

    const prev = document.getElementById("prev");

    if (prev) {

        prev.onclick = (e) => {

            e.preventDefault();

            currentPage--;

            renderArticles();

            renderPagination();

        };

    }

    const next = document.getElementById("next");

    if (next) {

        next.onclick = (e) => {

            e.preventDefault();

            currentPage++;

            renderArticles();

            renderPagination();

        };

    }

}


document.addEventListener("click", (e) => {

    if (!e.target.matches("#category-list a"))
        return;

    e.preventDefault();

    currentCategory =
        e.target.dataset.category;

    currentPage = 1;

    if (currentCategory === "All") {

        filteredArticles =
            [...allArticles];

    } else {

        filteredArticles =
            allArticles.filter(article =>

                article.category === currentCategory

            );

    }

    renderArticles();

    renderPagination();

});


// recent sidebar

async function loadRecent() {


    const box =
        document.querySelector(".blog__sidebar__recent");


    if (!box) return;



    const q = query(
        collection(db, "articles"),
        orderBy("createdAt", "desc"),
        limit(5)
    );



    const snap =
        await getDocs(q);



    box.innerHTML = "";


    snap.forEach(doc => {


        let a = doc.data();



        box.innerHTML += `


<a href="view-article.html?id=${doc.id}"
class="blog__sidebar__recent__item"
style="display:flex;margin-bottom:15px;">


<img src="${a.coverImage}"
style="width:80px;height:80px;object-fit:cover;">


<div class="recent-info">

<h6>${a.title}</h6>

<span>
<i class="fa fa-calendar"></i>
${a.createdAt?.toDate().toDateString() || ""}
</span>

</div>


</a>


`;



    });


}




document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadArticles();

        loadRecent();

    }
);

