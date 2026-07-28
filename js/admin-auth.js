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

    if (!user) return;

    if (ADMIN_EMAILS.includes(user.email)) {

        window.location.href = "./admin.html";

    } else {

        window.location.href = "./index.html";

    }

});