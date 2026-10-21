
import { db, auth } from "./firebase-config.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// Cloudinary Configuration
const CLOUD_NAME = "dgt5kvm9q";
const UPLOAD_PRESET = "al-maarij";


// Allowed Admin Emails
const ADMIN_EMAILS = [
    "mailboxnouman@gmail.com",
    "drnasimsarwer@gmail.com"
];

let currentUser = null;


// Firebase Authentication Check
onAuthStateChanged(auth, (user) => {
    currentUser = user;

    if (user) {
        console.log("Logged in:", user.email);
    } else {
        console.log("User is not logged in");
    }
});


// Article Upload Form
document
    .getElementById("articleForm")
    .addEventListener("submit", async (e) => {

        e.preventDefault();

        // Check Login
        if (!currentUser) {
            alert("پہلے لاگ ان کریں");
            return;
        }

        // Check Admin Permission
        const userEmail = currentUser.email?.toLowerCase();

        if (!ADMIN_EMAILS.includes(userEmail)) {
            alert("صرف ایڈمن مضمون اپلوڈ کرسکتا ہے");
            return;
        }

        try {

            // Get Article Data
            const title = document
                .getElementById("article-title")
                .value.trim();

            const hashtags = document
                .getElementById("article-hashtags")
                .value
                .split(",")
                .map(x => x.trim())
                .filter(Boolean);

            const category = document
                .getElementById("article-category")
                .value;

            const content = document
                .getElementById("article-content")
                .value.trim();

            const author = document
                .getElementById("article-author")
                .value.trim();

            const imageFile = document
                .getElementById("article-image")
                .files[0];


            // Validate Required Fields
            if (!title || !category || !content || !author) {
                alert("براہ کرم تمام ضروری معلومات درج کریں");
                return;
            }

            if (!imageFile) {
                alert("براہ کرم مضمون کی تصویر منتخب کریں");
                return;
            }


            // Upload Image to Cloudinary
            const imageData = new FormData();

            imageData.append("file", imageFile);
            imageData.append("upload_preset", UPLOAD_PRESET);

            const upload = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: imageData
                }
            );

            const image = await upload.json();

            if (!upload.ok || !image.secure_url) {
                console.error("Cloudinary Error:", image);
                throw new Error("Image upload failed");
            }


            // Save Article to Firestore
            await addDoc(
                collection(db, "articles"),
                {
                    title,
                    hashtags,
                    category,
                    content,
                    coverImage: image.secure_url,
                    author,
                    createdAt: serverTimestamp(),
                    isFavorite: false,
                    favoriteSequence: null
                }
            );


            // Success Message
            alert("مضمون کامیابی سے اپلوڈ ہوگیا");

            e.target.reset();

        } catch (err) {

            console.error("Article Upload Error:", err);

            alert(
                "مضمون اپلوڈ نہیں ہوسکا۔ براہ کرم Console میں error چیک کریں۔"
            );

        }

    });
