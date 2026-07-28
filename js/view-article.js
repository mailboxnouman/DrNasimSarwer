import { db } from "./firebase-config.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const urlParams =
new URLSearchParams(window.location.search);


const articleId =
urlParams.get("id");


if(articleId){


const articleRef =
doc(db,"articles",articleId);


getDoc(articleRef)
.then(snapshot=>{


if(!snapshot.exists()){

console.log("Article not found");
return;

}


const article =
snapshot.data();



document.getElementById('article-cover').src =
article.coverImage;


document.getElementById('article-title').innerText =
article.title;


document.getElementById('article-content').innerText =
article.content;



document.getElementById('article-date').innerHTML =
`
<i class="fa fa-calendar-o"></i>
${article.createdAt?.toDate().toDateString() || ""}
`;



document.getElementById('article-author').innerHTML =
`
<i class="fa fa-pencil"></i>
${article.author}
`;



})
.catch(err=>console.log(err));


}