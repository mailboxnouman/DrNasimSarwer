import { db } from "./firebase-config.js";

import {
collection,
getDocs,
query,
where
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", async()=>{


const list = document.querySelector("#admin-favorite-list");


if(!list) {
console.log("favorite list not found");
return;
}



try{


const q = query(
collection(db,"articles"),
where("isFavorite","==",true)
);



const snap = await getDocs(q);



let favorites=[];



snap.forEach(doc=>{

let data = doc.data();


favorites.push({

id:doc.id,
...data

});


});



// sequence ke hisaab se sort
favorites.sort((a,b)=>{

return (a.favoriteSequence || 999) -
       (b.favoriteSequence || 999);

});



list.innerHTML="";



if(favorites.length===0){

list.innerHTML=`
<li>کوئی منتخب مضمون موجود نہیں</li>
`;

return;

}



favorites.forEach(article=>{


    list.innerHTML += `

    <li>
    
    <span class="fav-number">
    ${article.favoriteSequence}.
    </span>
    
    <a href="view-article.html?id=${article.id}">
    ${article.title}
    </a>
    
    </li>
    
    `;
});


}
catch(err){

console.log("Favorite fetch error",err);

}



});