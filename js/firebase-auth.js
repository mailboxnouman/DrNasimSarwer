import { auth } from "./firebase-config.js";

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
.forEach(btn => {

    btn.onclick = async () => {

        // Logout
        if (auth.currentUser) {

            await signOut(auth);
            location.reload();
            return;

        }

        // Login
        const result = await signInWithPopup(auth, provider);

        // Redirect ONLY once after login
        if (ADMIN_EMAILS.includes(result.user.email)) {

            window.location.href = "./admin.html";

        } else {

            location.reload();

        }

    };

});

onAuthStateChanged(auth, user => {

    document.querySelectorAll(".authButton")
    .forEach(btn => {

        if (user) {

            btn.innerHTML =
                `<i class="fa fa-user"></i> Logout - ${user.email}`;

        } else {

            btn.innerHTML =
                `<i class="fa fa-user"></i> Login`;

        }

    });

});