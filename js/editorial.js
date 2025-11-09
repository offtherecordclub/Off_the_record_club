const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

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

const images1 = [
  "/img/typo_experi_img/typo_experi1.png",
  "/img/typo_experi_img/typo_experi2.png",
  "/img/typo_experi_img/typo_experi3.png",
  "/img/typo_experi_img/typo_experi4.png",
  "/img/typo_experi_img/typo_experi5.png",
];
let currentIndex1 = 0;

function changeImage1() {
  currentIndex1 = (currentIndex1 + 1) % images1.length;
  const slideImage1 = document.getElementById("slideImage1");

  setTimeout(() => {
    slideImage1.src = images1[currentIndex1]; // 이미지 변경
  }, 500);
}

setInterval(changeImage1, 2000);

const images2 = [
  "/img/monster_img/monster.png",
  "/img/monster_img/monster1.png",
  "/img/monster_img/monster5.png",
  "/img/monster_img/monster6.png",
];
let currentIndex2 = 0;

function changeImage2() {
  const slideImage2 = document.getElementById("slideImage2");

  slideImage2.style.transition = "opacity 0.3s ease-in-out";

  setTimeout(() => {
    currentIndex2 = (currentIndex2 + 1) % images2.length;
    slideImage2.src = images2[currentIndex2];
  }, 500);
}

if (currentIndex2 === 0) {
  slideImage2.style.width = "300px"; // 첫 번째 이미지는 원래 크기 유지
  slideImage2.style.height = "490px";
} else {
  slideImage2.style.width = "600px"; // 뒤이어 나오는 이미지만 확대
  slideImage2.style.height = "490px";
}

setInterval(changeImage2, 2000);

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
