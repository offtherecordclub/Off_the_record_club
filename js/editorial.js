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

// 첫 번째 슬라이드 (typography_experi)
const images1 = [
  "/typo_experi_img/typo_experi1.png",
  "/typo_experi_img/typo_experi2.png",
  "/typo_experi_img/typo_experi3.png",
  "/typo_experi_img/typo_experi4.png",
  "/typo_experi_img/typo_experi5.png",
];
let currentIndex1 = 0;

function changeImage1() {
  currentIndex1 = (currentIndex1 + 1) % images1.length;
  const slideImage1 = document.getElementById("slideImage");

  setTimeout(() => {
    slideImage1.src = images1[currentIndex1]; // 이미지 변경
  }, 500);
}

// 2초마다 첫 번째 슬라이드 변경
setInterval(changeImage1, 3000);

// 두 번째 슬라이드 (Monster)
const images2 = [
  "/monster_img/monster.png",
  "/monster_img/monster1.png",
  "/monster_img/monster5.png",
  "/monster_img/monster6.png",
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

// 2초마다 두 번째 슬라이드 변경
setInterval(changeImage2, 2000);
