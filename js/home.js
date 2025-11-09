/* -------------------------------------
   ✅ CUSTOM CURSOR
------------------------------------- */
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// ✅ 카테고리 위에서는 커서 숨기기
const categoryItems = document.querySelectorAll(".category");

categoryItems.forEach((cat) => {
  cat.addEventListener("mouseenter", () => {
    cursor.style.opacity = "0"; // 커서 숨김
  });

  cat.addEventListener("mouseleave", () => {
    cursor.style.opacity = "1"; // 커서 다시 보이기
  });
});

/* -------------------------------------
   ✅ HAMBURGER MENU
------------------------------------- */
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

/* -------------------------------------
   ✅ PREVIEW INTERACTION
------------------------------------- */
const categories = document.querySelectorAll(".category");
const previews = document.querySelectorAll(".preview");
const recordStatic = document.querySelector(".record-static");

categories.forEach((cat) => {
  const preview = document.getElementById(`${cat.id}-preview`);

  cat.addEventListener("mouseenter", () => {
    document.body.classList.add("dark");
    categories.forEach((c) => (c.style.opacity = "0.25"));
    cat.style.opacity = "1";

    previews.forEach((p) => p.classList.remove("active"));
    preview.classList.add("active");
    recordStatic.style.opacity = "0";
  });

  cat.addEventListener("mouseleave", () => {
    document.body.classList.remove("dark");
    categories.forEach((c) => (c.style.opacity = "1"));
    previews.forEach((p) => p.classList.remove("active"));
    recordStatic.style.opacity = "1";
  });

  cat.addEventListener("click", () => {
    window.location.href = `/html/nav/${cat.id}.html`;
  });
});

/* -------------------------------------
   ✅ CUSTOM CURSOR COLOR CHANGE ON PREVIEW
------------------------------------- */
previews.forEach((preview) => {
  preview.addEventListener("mouseenter", () => {
    cursor.style.backgroundColor = "white";
  });
  preview.addEventListener("mouseleave", () => {
    cursor.style.backgroundColor = "black";
  });
});
