import { auth } from "./firebase-config.js";
import { 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


const ADMIN_EMAILS = [
    "mailboxnouman@gmail.com",
    "dr.nasim.sarwar@gmail.com",
    "dr.nasim.sarwer@gmail.com"
];

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    if (ADMIN_EMAILS.includes(user.email)) {

        console.log("Admin Verified");

        // Already on admin page? Nothing to do.
        if (!window.location.pathname.endsWith("admin.html")) {
            window.location.href = "./admin.html";
        }

    } else {

        alert("Access Denied");
        window.location.href = "index.html";

    }

});