import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  deleteDoc,
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase 설정
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

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("글을 찾을 수 없습니다.");
    location.href = "blog.html";
    return;
  }

  // ===== 글 불러오기 =====
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    alert("글을 찾을 수 없습니다.");
    location.href = "blog.html";
    return;
  }

  const post = docSnap.data();

  const titleEl = document.getElementById("title");
  const dateEl = document.getElementById("date");
  const contentEl = document.getElementById("content");

  if (titleEl) titleEl.innerText = post.title;
  if (dateEl) dateEl.innerText = post.date;
  if (contentEl) contentEl.innerHTML = post.content;

  // ===== 삭제 팝업 =====
  const moreBtn = document.getElementById("moreBtn");
  const menuPopup = document.getElementById("menuPopup");
  const popupOverlay = document.getElementById("popupOverlay");
  const deleteBtn = document.getElementById("deleteBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  if (moreBtn) {
    moreBtn.addEventListener("click", () => {
      menuPopup.classList.remove("hidden");
      popupOverlay.classList.remove("hidden");
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      menuPopup.classList.add("hidden");
      popupOverlay.classList.add("hidden");
    });
  }

  if (popupOverlay) {
    popupOverlay.addEventListener("click", () => {
      menuPopup.classList.add("hidden");
      popupOverlay.classList.add("hidden");
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", async () => {
      if (!confirm("정말 삭제할까요?")) return;

      await deleteDoc(doc(db, "posts", id));

      alert("삭제 완료");
      location.href = "blog.html";
    });
  }

  // ===== 이전글 / 다음글 =====
  const snapshot = await getDocs(collection(db, "posts"));

  const posts = [];

  snapshot.forEach((d) => {
    posts.push({ id: d.id, ...d.data() });
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const currentIndex = posts.findIndex((item) => item.id === id);

  const prevPost = posts[currentIndex + 1];
  const nextPost = posts[currentIndex - 1];

  const prevEl = document.getElementById("prevPost");
  const nextEl = document.getElementById("nextPost");

  if (prevPost && prevEl) {
    prevEl.addEventListener("click", () => {
      location.href = `post.html?id=${prevPost.id}`;
    });
  } else if (prevEl) {
    prevEl.classList.add("disabled");
  }

  if (nextPost && nextEl) {
    nextEl.addEventListener("click", () => {
      location.href = `post.html?id=${nextPost.id}`;
    });
  } else if (nextEl) {
    nextEl.classList.add("disabled");
  }

  // ===== 댓글 기능 =====

  const commentName = document.getElementById("commentName");
  const commentText = document.getElementById("commentText");
  const commentSubmit = document.getElementById("commentSubmit");
  const commentList = document.getElementById("commentList");

  async function renderComments() {
    if (!commentList) return;

    commentList.innerHTML = "";

    const q = query(collection(db, "comments"), where("postId", "==", id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((d) => {
      const c = d.data();

      const div = document.createElement("div");
      div.className = "comment-item";

      div.innerHTML = `
        <div class="name-date">${c.name} | ${c.date}</div>
        <div class="text">${c.text}</div>
      `;

      commentList.appendChild(div);
    });
  }

  renderComments();

  // ===== 댓글 등록 =====
  if (commentSubmit) {
    commentSubmit.addEventListener("click", async () => {
      if (!commentName.value || !commentText.value) {
        alert("이름과 댓글을 입력하세요");
        return;
      }

      await addDoc(collection(db, "comments"), {
        postId: id,
        name: commentName.value,
        text: commentText.value,
        date: new Date().toLocaleDateString(),
      });

      commentName.value = "";
      commentText.value = "";

      renderComments();
    });
  }
});
