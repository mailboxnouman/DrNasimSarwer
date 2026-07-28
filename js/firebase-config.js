import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9tfUzYaVOlVGjdjXXLwS1DlMOv5xHuBY",
  authDomain: "al-maarij-o.firebaseapp.com",
  projectId: "al-maarij-o",
  storageBucket: "al-maarij-o.firebasestorage.app",
  messagingSenderId: "268167725998",
  appId: "1:268167725998:web:b94248cc82bc77c9f47e3f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);