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

      const MAX_WIDTH = 1200; // 최대 가로 크기
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height = height * (MAX_WIDTH / width);
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // ✅ 압축 (0.7 = 화질)
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
function savePost() {
  const title = titleInput.value.trim();
  const contentHTML = editor.innerHTML.trim();

  if (!title || !contentHTML) {
    alert("제목과 내용을 입력하세요.");
    return;
  }

  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  // HTML 파싱
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = contentHTML;

  // wrapper 안의 첫 이미지 찾기
  const firstImg = tempDiv.querySelector("img");

  let thumb = "";

  if (firstImg && firstImg.src) {
    thumb = firstImg.src;
    // ⭐ img만 지우지 말고 wrapper(div) 통째로 제거
    firstImg.closest("div").remove();
  }
  const newPost = {
    id: Date.now(),
    title: title,
    content: tempDiv.innerHTML,
    date: new Date().toISOString().split("T")[0],
    thumb: thumb,
  };

  posts.unshift(newPost);

  try {
    localStorage.setItem("posts", JSON.stringify(posts));
  } catch (e) {
    alert("이미지가 너무 커서 저장할 수 없습니다.\n이미지 크기를 줄여주세요.");
    return;
  }

  alert("저장 완료!");
  window.location.href = "../menu/blog.html";
}
