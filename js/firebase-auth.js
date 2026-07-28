import {auth} from "./firebase-config.js";


import {
GoogleAuthProvider,
signInWithPopup,
signOut,
onAuthStateChanged

} from 
"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



const provider = new GoogleAuthProvider();

const ADMIN_EMAILS = [
    "mailboxnouman@gmail.com",
    "dr.nasim.sarwar@gmail.com",
    "dr.nasim.sarwer@gmail.com"
];

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



onAuthStateChanged(auth, user => {

    document.querySelectorAll(".authButton")
    .forEach(btn => {

        if(user){

            btn.innerHTML =
            `<i class="fa fa-user"></i> Logout - ${user.email}`;

        }else{

            btn.innerHTML =
            `<i class="fa fa-user"></i> Login`;

        }

    });

    // Admin auto redirect
    if (
        user &&
        ADMIN_EMAILS.includes(user.email) &&
        !window.location.pathname.endsWith("admin.html")
    ) {
        window.location.replace("./admin.html");
    }

});