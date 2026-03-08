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

const editor = document.getElementById("editor");
const imageUpload = document.getElementById("image-upload");

let thumbnail = "";

// ===== 이미지 업로드 + 자동 압축 =====
imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxWidth = 1200;

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        const scale = maxWidth / width;
        width = maxWidth;
        height = height * scale;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const compressedImage = canvas.toDataURL("image/jpeg", 0.7);

      // 이미지 wrapper
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";

      const newImg = document.createElement("img");
      newImg.src = compressedImage;

      // 삭제 버튼
      const removeBtn = document.createElement("button");
      removeBtn.className = "delete-btn";
      removeBtn.innerText = "×";

      removeBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrapper.remove();
      };

      wrapper.appendChild(newImg);
      wrapper.appendChild(removeBtn);

      // editor에 삽입
      editor.appendChild(wrapper);

      // 🔴 다음 줄에서 글 시작
      const br = document.createElement("br");
      editor.appendChild(br);

      // 썸네일
      if (!thumbnail) {
        thumbnail = compressedImage;
      }

      // 파일 input 초기화
      imageUpload.value = "";
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

// ===== 글 저장 =====
window.savePost = async function () {
  const title = document.getElementById("title").value.trim();
  const content = editor.innerHTML;
  const date = new Date().toISOString().split("T")[0];

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
      date: date,
      thumbnail: thumbnail,
      views: 0,
    });

    alert("저장 완료");
    location.href = "blog.html";
  } catch (error) {
    console.error(error);
    alert("저장 실패");
  }
};
