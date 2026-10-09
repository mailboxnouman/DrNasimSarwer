import { auth } from "./firebase-config.js";
import { 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


const ADMIN_EMAILS = [
    "mailboxnouman@gmail.com",
    "drnasimsarwer@gmail.com"
];


onAuthStateChanged(auth, (user)=>{

    if(!user){
        window.location.href = "index.html";
        return;
    }


    if(!ADMIN_EMAILS.includes(user.email)){

        // alert("Access Denied");

        window.location.href = "index.html";

        return;
    }


    console.log("Admin Verified");

});