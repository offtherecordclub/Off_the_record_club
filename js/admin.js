// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 날짜 자동 표시
const dateSpan = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateSpan.textContent = today;

// 이미지 업로드
const imageUpload = document.getElementById("image-upload");
const editor = document.getElementById("editor");

let thumbnail = "";

imageUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const img = document.createElement("img");
    img.src = e.target.result;
    img.style.maxWidth = "100%";
    img.style.margin = "10px 0";

    editor.appendChild(img);

    if (!thumbnail) {
      thumbnail = e.target.result;
    }
  };

  reader.readAsDataURL(file);
});

// 글 저장
window.savePost = async function () {
  const title = document.getElementById("title").value.trim();
  const content = editor.innerHTML;

  if (!title) {
    alert("제목을 입력하세요");
    return;
  }

  if (!content) {
    alert("내용을 입력하세요");
    return;
  }

  try {
    await addDoc(collection(db, "posts"), {
      title: title,
      content: content,
      date: today,
      thumbnail: thumbnail,
      views: 0,
    });

    alert("글이 저장되었습니다!");

    // 초기화
    document.getElementById("title").value = "";
    editor.innerHTML = "";
    thumbnail = "";
  } catch (error) {
    console.error("저장 실패:", error);
    alert("저장 실패");
  }
};
