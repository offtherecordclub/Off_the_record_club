import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyA5C2HVzMXab2OGWyPFJepeyooAAur73wE",
  authDomain: "offtherecordclub-c2c1b.firebaseapp.com",
  projectId: "offtherecordclub-c2c1b",
  storageBucket: "offtherecordclub-c2c1b.appspot.com",
  messagingSenderId: "241055780705",
  appId: "1:241055780705:web:fed831bca1b077e178ff20",
  measurementId: "G-2X4V64TGNL",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const editor = document.getElementById("editor");
const imageUpload = document.getElementById("image-upload");

let thumbnail = "";

// ==========================
// 이미지 업로드
// ==========================

imageUpload.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const fileName = Date.now() + "_" + file.name;
    const storageRef = ref(storage, "blog-images/" + fileName);

    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);

    insertImage(url);

    if (!thumbnail) thumbnail = url;
  } catch (err) {
    console.error(err);
    alert("이미지 업로드 실패");
  }
});

// ==========================
// 에디터에 이미지 삽입
// ==========================

function insertImage(url) {
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.display = "inline-block";

  const img = document.createElement("img");
  img.src = url;

  const btn = document.createElement("button");
  btn.innerText = "×";
  btn.className = "delete-btn";

  btn.onclick = () => {
    wrapper.remove();
  };

  wrapper.appendChild(img);
  wrapper.appendChild(btn);

  editor.appendChild(wrapper);
}

// ==========================
// 글 저장
// ==========================

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

  const date = new Date().toISOString().split("T")[0];

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
  } catch (err) {
    console.error(err);
    alert("저장 실패");
  }
};
