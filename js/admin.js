import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== Firebase 설정 =====
const firebaseConfig = {
  apiKey: "여기에 API KEY",
  authDomain: "여기에 authDomain",
  projectId: "여기에 projectId",
  storageBucket: "여기에 storageBucket",
  messagingSenderId: "여기에 senderId",
  appId: "여기에 appId",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===== 오늘 날짜 자동 표시 =====
const dateEl = document.getElementById("date");
if (dateEl) {
  dateEl.innerText = new Date().toISOString().split("T")[0];
}

// ===== 요소 가져오기 =====
const editor = document.getElementById("editor");
const imageUpload = document.getElementById("image-upload");
const titleInput = document.getElementById("title");

// ===== 이미지 업로드 (압축 버전) =====
imageUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const MAX_WIDTH = 1200;

      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height = height * (MAX_WIDTH / width);
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);

      // wrapper 생성
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.display = "block";
      wrapper.style.maxWidth = "400px";
      wrapper.style.margin = "20px 0";
      wrapper.setAttribute("contenteditable", "false");

      const newImg = document.createElement("img");
      newImg.src = compressedDataUrl;
      newImg.style.width = "100%";
      newImg.style.borderRadius = "8px";

      const btn = document.createElement("button");
      btn.innerText = "✕";
      btn.className = "delete-btn";
      btn.onclick = () => wrapper.remove();

      wrapper.appendChild(newImg);
      wrapper.appendChild(btn);

      editor.appendChild(wrapper);

      // spacer
      const spacer = document.createElement("div");
      spacer.innerHTML = "<br>";
      editor.appendChild(spacer);

      // 커서 이동
      const range = document.createRange();
      const sel = window.getSelection();

      range.setStartAfter(spacer);
      range.collapse(true);

      sel.removeAllRanges();
      sel.addRange(range);

      editor.focus();
    };

    img.src = e.target.result;
  };

  reader.readAsDataURL(file);

  this.value = "";
});

// ===== 글 저장 =====
async function savePost() {
  const title = titleInput.value.trim();
  const contentHTML = editor.innerHTML.trim();

  if (!title || !contentHTML) {
    alert("제목과 내용을 입력하세요.");
    return;
  }

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = contentHTML;

  const firstImg = tempDiv.querySelector("img");

  let thumb = "";

  if (firstImg && firstImg.src) {
    thumb = firstImg.src;
  }

  const newPost = {
    title: title,
    content: tempDiv.innerHTML,
    date: new Date().toISOString().split("T")[0],
    thumb: thumb,
  };

  try {
    await addDoc(collection(db, "posts"), newPost);

    alert("저장 완료!");

    window.location.href = "../menu/blog.html";
  } catch (error) {
    console.error(error);
    alert("저장 실패");
  }
}

// HTML 버튼에서 호출 가능하게
window.savePost = savePost;
