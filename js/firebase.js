import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5C2HVzMXab2OGWyPFJepeyo0AAur73wE",
  authDomain: "offtherecordclub-c2c1b.firebaseapp.com",
  projectId: "offtherecordclub-c2c1b",
  storageBucket: "offtherecordclub-c2c1b.firebasestorage.app",
  messagingSenderId: "241055780705",
  appId: "1:241055780705:web:fed831bca1b077e178ff20",
  measurementId: "G-2X4V64TGNL",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
