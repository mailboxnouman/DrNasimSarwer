import { db, auth } from "./firebase-config.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



const CLOUD_NAME = "dgt5kvm9q";
const UPLOAD_PRESET = "al-maarij";


let currentUser = null;



onAuthStateChanged(auth,(user)=>{

    currentUser = user;

    if(user){
        console.log("Logged in:",user.email);
    }

});




document
.getElementById("articleForm")
.addEventListener("submit",async(e)=>{


e.preventDefault();



if(!currentUser){

alert("پہلے لاگ ان کریں");

return;

}



if(currentUser.email !== "mailboxnouman@gmail.com"){

alert("صرف ایڈمن مضمون اپلوڈ کرسکتا ہے");

return;

}



try{


const title =
document.getElementById("article-title").value;


const hashtags =
document.getElementById("article-hashtags")
.value.split(",")
.map(x=>x.trim());



const category =
document.getElementById("article-category").value;



const content =
document.getElementById("article-content").value;



const author =
document.getElementById("article-author").value;



const imageFile =
document.getElementById("article-image").files[0];



const imageData=new FormData();

imageData.append(
"file",
imageFile
);


imageData.append(
"upload_preset",
UPLOAD_PRESET
);



const upload =
await fetch(
`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
{
method:"POST",
body:imageData
}
);



const image =
await upload.json();





await addDoc(
collection(db,"articles"),
{


title,

hashtags,

category,

content,

coverImage:image.secure_url,

author,

createdAt:serverTimestamp(),

isFavorite:false,

favoriteSequence:null


}
);



alert("مضمون کامیابی سے اپلوڈ ہوگیا");


e.target.reset();



}
catch(err){

console.log(err);

alert("Upload error");

}


});