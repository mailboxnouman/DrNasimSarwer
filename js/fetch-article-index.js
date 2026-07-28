import { db } from "./firebase-config.js";

import {
collection,
getDocs,
query,
orderBy,
limit
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", async()=>{


const container =
document.querySelector("#recent-articles-container");


if(!container) return;


try{


const q = query(
collection(db,"articles"),
orderBy("createdAt","desc"),
limit(6)
);


const snapshot =
await getDocs(q);


container.innerHTML="";


snapshot.forEach(doc=>{

const article = doc.data();


container.innerHTML += `

<div class="col-lg-4 col-md-4 col-sm-6">

<div class="blog__item">


<div class="article-image blog__item__pic">

<a href="view-article.html?id=${doc.id}">

<img src="${article.coverImage}"
alt="${article.title}">

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

<a href="view-article.html?id=${doc.id}">
${article.title}
</a>

</h5>


<p style="
font-family:nafees_web_naskhshipped;
direction:rtl;
font-size:18px;
">

${article.content.substring(0,110)}...

</p>


</div>


</div>

</div>

`;

});


}
catch(e){

console.log(e);

}


});