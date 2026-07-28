import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    query,
    orderBy
}
    from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", loadArticles);

let allArticles = [];
let filteredArticles = [];

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

}

function renderArticles() {

    let container = document.getElementById("articles-container");

    container.innerHTML = "";

    filteredArticles.forEach(article => {

        container.innerHTML += `

<div class="col-lg-3 col-md-4 col-sm-6">

<div class="featured__item">

<div class="featured__item__pic set-bg"
style="background-image:url('${article.coverImage}')">

<ul class="featured__item__pic__hover">

<li style="position:relative">

<a href="#"
class="favorite-btn"
data-id="${article.id}">

<i class="fa fa-heart"
style="color:${article.isFavorite ? 'red' : 'black'};"></i>

${article.isFavorite && article.favoriteSequence ?

`<span class="favorite-sequence">
${article.favoriteSequence}
</span>`

: ""}

</a>

</li>

<li>

<a href="view-article.html?id=${article.id}">
<i class="fa fa-eye"></i>
</a>

</li>

<li>

<a href="editArticle.html?id=${article.id}">
<i class="fa fa-edit"></i>
</a>

</li>

<li>

<a href="#"
class="delete-btn"
data-id="${article.id}">
<i class="fa fa-trash"></i>
</a>

</li>

</ul>

</div>

<div class="featured__item__text">

<h5>

<a href="view-article.html?id=${article.id}">
${article.title}
</a>

</h5>

<p>

${article.content.substring(0,100)}...

</p>

</div>

</div>

</div>

`;

    });

}

document.querySelectorAll(".featured__controls li").forEach(btn => {

    btn.onclick = () => {

        document
            .querySelectorAll(".featured__controls li")
            .forEach(x => x.classList.remove("active"));

        btn.classList.add("active");

        const filter = btn.dataset.filter;

        if (filter === "*") {

            filteredArticles = [...allArticles];

        } else {

            const category = filter.replace(".", "");

            filteredArticles = allArticles.filter(article =>
                article.category === category
            );

        }

        renderArticles();

    };

});