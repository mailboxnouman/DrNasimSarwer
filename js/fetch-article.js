import { db } from "./firebase-config.js";

import {
collection,
getDocs,
query,
orderBy,
limit,
startAfter
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


let lastDoc = null;
let currentPage = 1;
const perPage = 6;



async function loadArticles(){

const container =
document.getElementById("articles");


if(!container)return;


let q;


if(lastDoc){

q = query(
collection(db,"articles"),
orderBy("createdAt","desc"),
startAfter(lastDoc),
limit(perPage)
);

}else{


q=query(
collection(db,"articles"),
orderBy("createdAt","desc"),
limit(perPage)
);

}



const snap =
await getDocs(q);


container.innerHTML="";


snap.forEach(doc=>{


const article =
doc.data();



container.innerHTML += `


<div class="col-lg-6 col-md-6 col-sm-6">

<div class="blog__item">


<div class="article-image blog__item__pic">


<a href="view-article.html?id=${doc.id}">

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

<a href="view-article.html?id=${doc.id}">

${article.title}

</a>

</h5>



<p style="
font-family:nafees_web_naskhshipped;
direction:rtl;
font-size:18px;
">

${article.content.substring(0,160)}...

</p>



<a href="view-article.html?id=${doc.id}"
class="btn btn-success"
style="background:#7FAD39;border:none">

مزید پڑھیں

</a>


</div>


</div>

</div>


`;



lastDoc = snap.docs[snap.docs.length-1];


});


}




// recent sidebar

async function loadRecent(){


const box =
document.querySelector(".blog__sidebar__recent");


if(!box)return;



const q=query(
collection(db,"articles"),
orderBy("createdAt","desc"),
limit(5)
);



const snap =
await getDocs(q);



box.innerHTML="";


snap.forEach(doc=>{


let a=doc.data();



box.innerHTML += `


<a href="view-article.html?id=${doc.id}"
class="blog__sidebar__recent__item"
style="display:flex;margin-bottom:15px;">


<img src="${a.coverImage}"
style="width:80px;height:80px;object-fit:cover;">


<div>

<h6>${a.title}</h6>

<span>

${a.createdAt?.toDate().toDateString() || ""}

</span>


</div>


</a>


`;



});


}




document.addEventListener(
"DOMContentLoaded",
()=>{

loadArticles();

loadRecent();

}
);