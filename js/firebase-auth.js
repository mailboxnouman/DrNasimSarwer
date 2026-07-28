import {auth} from "./firebase-config.js";


import {
GoogleAuthProvider,
signInWithPopup,
signOut,
onAuthStateChanged

} from 
"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



const provider = new GoogleAuthProvider();



document.querySelectorAll(".authButton")
.forEach(btn=>{


btn.onclick=async()=>{


if(auth.currentUser){

await signOut(auth);

location.reload();

}

else{


await signInWithPopup(
auth,
provider
);


location.reload();


}


};



});



onAuthStateChanged(auth,user=>{


document.querySelectorAll(".authButton")
.forEach(btn=>{


if(user){


btn.innerHTML =
`<i class="fa fa-user"></i> Logout - ${user.email}`;


}

else{


btn.innerHTML =
`<i class="fa fa-user"></i> Login`;

}


});


});