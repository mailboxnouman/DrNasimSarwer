
import { auth } from "./firebase-config.js";

import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

const ADMIN_EMAILS = [
    "mailboxnouman@gmail.com",
    "drnasimsarwer@gmail.com"
];

function isAdmin(user) {
    return user && ADMIN_EMAILS.some(
        email => email.toLowerCase() === user.email?.toLowerCase()
    );
}

// Login / Logout buttons
document.querySelectorAll(".authButton").forEach(btn => {

    btn.onclick = async () => {
        try {
            // Logout
            if (auth.currentUser) {
                await signOut(auth);
                window.location.reload();
                return;
            }

            // Login
            const result = await signInWithPopup(auth, provider);

            if (isAdmin(result.user)) {
                window.location.href = "./admin.html";
            } else {
                window.location.reload();
            }

        } catch (error) {
            console.error("Authentication error:", error);
            alert("Login failed. Please try again.");
        }
    };

});

// Update login button and admin panel button
onAuthStateChanged(auth, user => {

    // Login / Logout button text
    document.querySelectorAll(".authButton").forEach(btn => {

        if (user) {
            btn.innerHTML =
                `<i class="fa fa-user"></i> Logout - ${user.email}`;
        } else {
            btn.innerHTML =
                `<i class="fa fa-user"></i> Login`;
        }

    });

    // Replace phone section with Admin Panel button
    const container = document.getElementById("contactOrAdmin");

    if (!container) return;

    if (isAdmin(user)) {

        container.className = "hero__search__phone hero__uploadBtn";

        container.innerHTML = `
            <button
                class="site-btn"
                id="adminPanelBtn"
                type="button">
                ایڈمن پینل
            </button>
        `;

        document.getElementById("adminPanelBtn").onclick = () => {
            window.location.href = "./admin.html";
        };

    } else {

        // Restore the original phone section for normal users
        container.className = "hero__search__phone";

        container.innerHTML = `
            <div class="hero__search__phone__icon">
                <i class="fa fa-phone"></i>
            </div>
            <div class="hero__search__phone__text">
                <h5>+923222138421</h5>
                <span>رابطہ کریں</span>
            </div>
        `;

    }

});
