/* -------------------------------------
   ✅ CUSTOM CURSOR
------------------------------------- */
const cursor = document.querySelector(".custom-cursor");

if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
}

/* -------------------------------------
   ✅ DOMContentLoaded 이후 로직
------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 공통 요소 ---------- */
  const body = document.body;
  const categories = document.querySelectorAll(".category");
  const previews = document.querySelectorAll(".preview");
  const recordStatic = document.querySelector(".record-static");

  /* -------------------------------------
     ✅ CUSTOM CURSOR : 카테고리 위에서 숨기기
  ------------------------------------- */
  categories.forEach((cat) => {
    cat.addEventListener("mouseenter", () => {
      if (!cursor) return;
      cursor.style.opacity = "0";
    });

    cat.addEventListener("mouseleave", () => {
      if (!cursor) return;
      cursor.style.opacity = "1";
    });
  });

  /* -------------------------------------
     ✅ HAMBURGER MENU
  ------------------------------------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenuBtn = document.querySelector(".close-menu-btn");
  const mobileMenuItems = document.querySelectorAll(".mobile-menu a");

  function openMenu() {
    if (!mobileMenuOverlay || !mobileMenu) return;
    mobileMenuOverlay.classList.add("active");
    mobileMenu.classList.add("active");
  }

  function closeMenu() {
    if (!mobileMenuOverlay || !mobileMenu) return;
    mobileMenuOverlay.classList.remove("active");
    mobileMenu.classList.remove("active");
  }

  if (menuToggle && mobileMenuOverlay && mobileMenu) {
    menuToggle.addEventListener("click", openMenu);
    mobileMenuOverlay.addEventListener("click", closeMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeMenu);
  }

  mobileMenuItems.forEach((item) => {
    item.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1025 && mobileMenuOverlay && mobileMenu) {
      mobileMenuOverlay.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  });

  /* -------------------------------------
     ✅ PREVIEW 초기화 함수
  ------------------------------------- */
  function clearPreviews() {
    previews.forEach((p) => p.classList.remove("active"));
  }

  /* -------------------------------------
     ✅ DESKTOP / TABLET (600px 초과)
        : HOVER 시 프리뷰
  ------------------------------------- */
  function setupHoverPreview() {
    categories.forEach((cat) => {
      const preview = document.getElementById(`${cat.id}-preview`);
      if (!preview) return;

      cat.addEventListener("mouseenter", () => {
        // 📱 모바일에서는 hover 동작 안 함
        if (window.innerWidth <= 600) return;

        body.classList.add("dark");
        categories.forEach((c) => (c.style.opacity = "0.25"));
        cat.style.opacity = "1";

        clearPreviews();
        preview.classList.add("active");

        if (recordStatic) {
          recordStatic.style.opacity = "1"; // 밑에 깔려있어도 됨
        }
      });

      cat.addEventListener("mouseleave", () => {
        if (window.innerWidth <= 600) return;

        body.classList.remove("dark");
        categories.forEach((c) => (c.style.opacity = "1"));
        clearPreviews();

        if (recordStatic) {
          recordStatic.style.opacity = "1";
        }
      });

      // 클릭 시 상세 페이지 이동
      cat.addEventListener("click", () => {
        window.location.href = `/html/nav/${cat.id}.html`;
      });
    });
  }

  /* -------------------------------------
     ✅ CUSTOM CURSOR 색상 변경 (프리뷰 위)
  ------------------------------------- */
  previews.forEach((preview) => {
    preview.addEventListener("mouseenter", () => {
      if (!cursor) return;
      cursor.style.backgroundColor = "white";
    });
    preview.addEventListener("mouseleave", () => {
      if (!cursor) return;
      cursor.style.backgroundColor = "black";
    });
  });

  /* -------------------------------------
     ✅ MOBILE (600px 이하)
        Monster → Graphic → Typography → Poster → UX/UI
        자동 슬라이드
  ------------------------------------- */
  function setupMobileSlider() {
    if (window.innerWidth > 600) return; // 모바일에서만
    if (!previews.length) return;

    let index = 0;

    // 초기 상태: 전부 끄고 Monster만 켜기
    clearPreviews();
    previews[0].classList.add("active");

    // 2초마다 다음 프리뷰로 전환
    setInterval(() => {
      previews[index].classList.remove("active");
      index = (index + 1) % previews.length; // 0→1→2→3→4→0…
      previews[index].classList.add("active");
    }, 8000);
  }

  /* -------------------------------------
     ✅ 초기 세팅 실행
  ------------------------------------- */
  setupHoverPreview();
  setupMobileSlider();
});
