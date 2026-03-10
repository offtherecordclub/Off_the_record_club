document.addEventListener("DOMContentLoaded", function () {
  const detailsElements = document.querySelectorAll("details");
  detailsElements.forEach((details) => {
    details.addEventListener("toggle", function () {
      if (this.open) {
        this.classList.add("expanded");
      } else {
        this.classList.remove("expanded");
      }
    });
  });
});
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Hamberger menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenuBtn = document.querySelector(".close-menu-btn"); // X 버튼 요소 가져오기!

  // 모바일 메뉴 링크들도 가져와서 클릭하면 메뉴 닫히게
  const mobileMenuItems = document.querySelectorAll(".mobile-menu a");

  menuToggle.addEventListener("click", function () {
    mobileMenuOverlay.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  // 오버레이 클릭 시 메뉴 닫기 (기존)
  mobileMenuOverlay.addEventListener("click", function () {
    mobileMenuOverlay.classList.remove("active");
    mobileMenu.classList.remove("active");
  });

  // 모바일 메뉴 아이템 클릭 시 메뉴 닫기 (기존)
  mobileMenuItems.forEach((item) => {
    item.addEventListener("click", function () {
      mobileMenuOverlay.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });

  // X 버튼 클릭 시 메뉴 닫기 추가!
  if (closeMenuBtn) {
    // X 버튼이 있을 경우에만 이벤트 추가
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

    // 열려 있던 모바일 메뉴 강제 닫기
    mobileMenuOverlay.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});

let myIntervalId;
function startAutoUpdate() {
  myIntervalId = setInterval(() => {
    console.log("자동 업데이트 중...");
  }, 1000);
}

function stopAutoUpdate() {
  clearInterval(myIntervalId); // 잊지 않고 해제!
}
