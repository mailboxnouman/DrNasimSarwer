import { db } from "./firebase-config.js";

import {
    doc,
    updateDoc,
    deleteDoc,
    getDocs,
    collection,
    query,
    where
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ================= FAVORITE =================


$(document).on(
    "click",
    ".favorite-btn",
    async function(e){
    
    
    e.preventDefault();
    
    
    const id = $(this).data("id");
    
    
    const ref = doc(db,"articles",id);
    
    
    
    // current article
    
    const snap = await getDocs(
    query(
    collection(db,"articles"),
    where("__name__","==",id)
    )
    );
    
    
    
    let current;
    
    
    snap.forEach(d=>{
    current = d.data();
    });
    
    
    
    
    
    // remove favorite
    
    if(current.isFavorite){
    
    
    await updateDoc(ref,{
    
    isFavorite:false,
    
    favoriteSequence:null
    
    });
    
    
    // re-number remaining favorites
    
    await updateFavoriteNumbers();
    
    
    
    alert("Favorite removed");
    
    location.reload();
    
    return;
    
    }
    
    
    
    
    // add favorite
    
    
    const favSnap = await getDocs(
    query(
    collection(db,"articles"),
    where("isFavorite","==",true)
    )
    );
    
    
    
    if(favSnap.size >= 11){
    
    alert("صرف 11 مضامین منتخب کئے جا سکتے ہیں");
    
    return;
    
    }
    
    
    
    
    await updateDoc(ref,{
    
    isFavorite:true
    
    });
    
    
    
    // re-number all favorites
    
    await updateFavoriteNumbers();
    
    
    
    alert("Favorite updated");
    
    
    location.reload();
    
    
    
    });
    
    
    
    
    
    
    // ================= REORDER FUNCTION =================
    
    
    async function updateFavoriteNumbers(){
    
    
    
    const snap = await getDocs(
    query(
    collection(db,"articles"),
    where("isFavorite","==",true)
    )
    );
    
    
    
    let favorites=[];
    
    
    
    snap.forEach(d=>{
    
    
    favorites.push({
    
    id:d.id,
    
    ...d.data()
    
    });
    
    
    });
    
    
    
    
    // old sequence کے حساب سے ترتیب
    
    favorites.sort((a,b)=>{

        return (a.favoriteSequence || 999)
        -
        (b.favoriteSequence || 999);
    
    });
    
    
    
    
    // دوبارہ numbering
    
    let number = 1;
    
    
    
    for(const article of favorites){
    
    
    await updateDoc(
    doc(db,"articles",article.id),
    {
    
    favoriteSequence:number
    
    }
    );
    
    
    number++;
    
    }
    
    
    
    }




// ================= DELETE =================


$(document).on(
"click",
".delete-btn",
async function(e){


e.preventDefault();


if(!confirm("مضمون حذف کریں؟"))
return;



const id=$(this).data("id");



await deleteDoc(
doc(db,"articles",id)
);



alert("مضمون حذف ہوگیا");


location.reload();



});





// ================= EDIT =================


$(document).on(
"click",
".edit-btn",
function(e){


e.preventDefault();


const id=$(this).data("id");


window.location.href =
`editArticle.html?id=${id}`;


});