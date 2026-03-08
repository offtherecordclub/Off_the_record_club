// ===== 기존 UI 관련 코드 (그대로 유지) =====
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenuBtn = document.querySelector(".close-menu-btn");
  const mobileMenuItems = document.querySelectorAll(".mobile-menu a");

  menuToggle.addEventListener("click", function () {
    mobileMenuOverlay.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  mobileMenuOverlay.addEventListener("click", function () {
    mobileMenuOverlay.classList.remove("active");
    mobileMenu.classList.remove("active");
  });

  mobileMenuItems.forEach((item) => {
    item.addEventListener("click", function () {
      mobileMenuOverlay.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", function () {
      mobileMenuOverlay.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 1025) {
    const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
    const mobileMenu = document.querySelector(".mobile-menu");

    mobileMenuOverlay.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});

// ===== 글 데이터 불러오기 =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5C2HVzMXab2OGWyPFJepeyooAAur73wE",
  authDomain: "offtherecordclub-c2c1b.firebaseapp.com",
  projectId: "offtherecordclub-c2c1b",
  storageBucket: "offtherecordclub-c2c1b.firebasestorage.app",
  messagingSenderId: "241055780705",
  appId: "1:241055780705:web:fed831bca1b077e178ff20",
  measurementId: "G-2X4V64TGNL",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const blogList = document.getElementById("blogList");

async function loadPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));

  querySnapshot.forEach((doc) => {
    const item = doc.data();

    const post = document.createElement("div");
    post.className = "blog-item";

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = item.content;

    const previewText = tempDiv.innerText.slice(0, 80) + "...";

    post.innerHTML = `
      <div class="blog-thumb">
        ${item.thumbnail ? `<img src="${item.thumbnail}">` : ""}
      </div>

      <div class="blog-text">
        <h2>${item.title}</h2>
        <p>${previewText}</p>
        <span>${item.date}</span>
      </div>
    `;

    post.addEventListener("click", () => {
      window.location.href = `/html/blog/post.html?id=${doc.id}`;
    });

    blogList.appendChild(post);
  });
}

loadPosts();
