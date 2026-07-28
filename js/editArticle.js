import { db } from "./firebase-config.js";

import {
doc,
getDoc,
updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



document.addEventListener("DOMContentLoaded", async()=>{


const urlParams =
new URLSearchParams(window.location.search);


const articleId =
urlParams.get("id");



if(!articleId){
    alert("Article ID missing");
    return;
}



const articleRef =
doc(db,"articles",articleId);



try{


const snap =
await getDoc(articleRef);



if(!snap.exists()){

    alert("Article not found");
    return;

}



const article =
snap.data();



document.getElementById("article-title").value =
article.title;


document.getElementById("article-hashtags").value =
article.hashtags.join(", ");


document.getElementById("article-category").value =
article.category;


document.getElementById("article-content").value =
article.content;


document.getElementById("article-author").value =
article.author;



}catch(error){

console.error(error);
alert("Article load error");

}





// UPDATE


document
.getElementById("edit-article-form")
.addEventListener("submit",async(e)=>{


e.preventDefault();



const title =
document.getElementById("article-title").value;



const hashtags =
document.getElementById("article-hashtags")
.value
.split(",")
.map(x=>x.trim());



const category =
document.getElementById("article-category").value;



const content =
document.getElementById("article-content").value;



const author =
document.getElementById("article-author").value;




try{

// image check
const imageFile =
document.getElementById("article-image").files[0];


let updateData = {

    title,
    hashtags,
    category,
    content,
    author

};



// اگر نئی تصویر دی ہے
if(imageFile){


    const imageData = new FormData();


    imageData.append(
        "file",
        imageFile
    );


    imageData.append(
        "upload_preset",
        "al-maarij"
    );



    const cloudinaryResponse =
    await fetch(
    "https://api.cloudinary.com/v1_1/dgt5kvm9q/image/upload",
    {
        method:"POST",
        body:imageData
    });



    const cloudinaryData =
    await cloudinaryResponse.json();



    updateData.coverImage =
    cloudinaryData.secure_url;


}



await updateDoc(
    articleRef,
    updateData
);

alert("آرٹیکل اپڈیٹ ہوگیا");



window.location.href="admin.html";



}catch(error){

console.error(error);

alert("Update failed");

}



});


});