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
const posts = JSON.parse(localStorage.getItem("posts")) || [];
const blogList = document.getElementById("blogList");

posts.sort((a, b) => b.id - a.id);

posts.forEach((item) => {
  const post = document.createElement("div");
  post.className = "blog-item";

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = item.content;
  tempDiv.querySelectorAll("button").forEach((btn) => btn.remove());
  const previewText = tempDiv.innerText.slice(0, 80) + "...";

  post.innerHTML = `
   <div class="blog-thumb">
  ${item.thumb ? `<img src="${item.thumb}">` : ""}
</div>

    <div class="blog-text">
      <h2>${item.title}</h2>
      <p>${previewText}</p>
      <span>${item.date}</span>
    </div>
  `;

  // ✅ 클릭 시 상세페이지 이동
  post.addEventListener("click", () => {
    window.location.href = `/html/blog/post.html?id=${item.id}`;
  });

  blogList.appendChild(post);
});
