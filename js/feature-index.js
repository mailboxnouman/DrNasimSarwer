import { db } from "./firebase-config.js";

import {
collection,
getDocs,
query,
orderBy
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", async()=>{

const container =
document.querySelector("#articles-container");


try{


const q = query(
collection(db,"articles"),
orderBy("createdAt","desc")
);


const snapshot =
await getDocs(q);


container.innerHTML="";


snapshot.forEach(doc=>{

const article = doc.data();


container.innerHTML += `

<div class="col-lg-3 col-md-4 col-sm-6 mix ${article.category}">

<div class="featured__item">


<div class="featured__item__pic set-bg"
style="background-image:url('${article.coverImage}')">


<ul class="featured__item__pic__hover">

<li>
<a href="view-article.html?id=${doc.id}">
<i class="fa fa-eye"></i>
</a>
</li>

</ul>


</div>


<div class="featured__item__text">


<h5>
<a href="view-article.html?id=${doc.id}">
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
catch(err){

console.log(err);

}


});