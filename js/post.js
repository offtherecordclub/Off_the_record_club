document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find((item) => item.id === id);

  if (!post) {
    alert("글을 찾을 수 없습니다.");
    location.href = "blog.html";
    return;
  }

  // ===== 화면 출력 =====
  document.getElementById("title").value = post.title;
  document.getElementById("date").innerText = post.date;
  document.getElementById("content").innerHTML = post.content;

  // ===== 삭제 팝업 =====
  const moreBtn = document.getElementById("moreBtn");
  const menuPopup = document.getElementById("menuPopup");
  const popupOverlay = document.getElementById("popupOverlay");
  const deleteBtn = document.getElementById("deleteBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  moreBtn.addEventListener("click", () => {
    menuPopup.classList.remove("hidden");
    popupOverlay.classList.remove("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    menuPopup.classList.add("hidden");
    popupOverlay.classList.add("hidden");
  });

  popupOverlay.addEventListener("click", () => {
    menuPopup.classList.add("hidden");
    popupOverlay.classList.add("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    if (!confirm("정말 삭제할까요?")) return;

    posts = posts.filter((item) => item.id !== id);
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("삭제 완료");
    location.href = "blog.html";
  });

  // ===== 이전글 / 다음글 =====
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
  const currentIndex = sortedPosts.findIndex((item) => item.id === id);

  const prevPost = sortedPosts[currentIndex + 1];
  const nextPost = sortedPosts[currentIndex - 1];

  const prevEl = document.getElementById("prevPost");
  const nextEl = document.getElementById("nextPost");

  if (prevPost) {
    prevEl.addEventListener("click", () => {
      location.href = `post.html?id=${prevPost.id}`;
    });
  } else {
    prevEl.classList.add("disabled");
  }

  if (nextPost) {
    nextEl.addEventListener("click", () => {
      location.href = `post.html?id=${nextPost.id}`;
    });
  } else {
    nextEl.classList.add("disabled");
  }

  // ===== 댓글 기능 =====
  const commentName = document.getElementById("commentName");
  const commentText = document.getElementById("commentText");
  const commentSubmit = document.getElementById("commentSubmit");
  const commentList = document.getElementById("commentList");

  let comments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];

  // 댓글 출력 (위에 쌓이고, 사이에 선 생김)
  function renderComments() {
    commentList.innerHTML = "";

    comments.forEach((c) => {
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

  // 댓글 등록
  commentSubmit.addEventListener("click", () => {
    if (!commentName.value || !commentText.value) {
      alert("이름과 댓글을 입력하세요");
      return;
    }

    const newComment = {
      name: commentName.value,
      text: commentText.value,
      date: new Date().toLocaleDateString(),
    };

    comments.push(newComment);
    localStorage.setItem(`comments_${id}`, JSON.stringify(comments));

    commentName.value = "";
    commentText.value = "";

    renderComments();
  });
});
