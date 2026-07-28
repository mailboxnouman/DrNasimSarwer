import { db } from "./firebase-config.js";

import {
collection,
getDocs,
query,
where
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



document.addEventListener(
"DOMContentLoaded",
async()=>{


const container =
document.querySelector("#favorite-articles-container");


if(!container) return;



try{


const q=query(
collection(db,"articles"),
where("isFavorite","==",true)
);



const snap =
await getDocs(q);



let articles=[];



snap.forEach(doc=>{


articles.push({

id:doc.id,

...doc.data()

});


});




// sort by sequence

articles.sort(
(a,b)=>
(a.favoriteSequence || 999)
-
(b.favoriteSequence || 999)
);




container.innerHTML="";



articles.forEach(article=>{


container.innerHTML += `

<li class="favorite-article-item">

<a href="view-article.html?id=${article.id}">

${article.favoriteSequence}.
${article.title}

</a>

</li>

`;

});




if(!articles.length){


container.innerHTML =
`
<li>
ابھی کوئی منتخب مضمون موجود نہیں
</li>
`;

}



}catch(err){

console.error(
"Favorite fetch error:",
err
);


}


});