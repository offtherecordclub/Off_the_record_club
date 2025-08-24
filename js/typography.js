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
  "/monster_img/monster.png",
  "/monster_img/monster1.png",
  "/monster_img/monster5.png",
  "/monster_img/monster6.png",
];
let currentIndex1 = 0;

function changeImage1() {
  const slideImage1 = document.getElementById("slideImage1");

  slideImage1.style.transition = "opacity 0.3s ease-in-out";

  setTimeout(() => {
    currentIndex1 = (currentIndex1 + 1) % images1.length;
    slideImage1.src = images1[currentIndex1];
  }, 500);
}

if (currentIndex1 === 0) {
  slideImage1.style.width = "300px"; // 첫 번째 이미지는 원래 크기 유지
  slideImage1.style.height = "490px";
} else {
  slideImage1.style.width = "600px"; // 뒤이어 나오는 이미지만 확대
  slideImage1.style.height = "490px";
}

setInterval(changeImage1, 3000);

const images2 = [
  "/beatles_img/beatles1.png",
  "/beatles_img/beatles2.png",
  "/beatles_img/beatles3.png",
  "/beatles_img/beatles4.png",
];
let currentIndex2 = 0;

function changeImage2() {
  currentIndex2 = (currentIndex2 + 1) % images2.length;
  const slideImage2 = document.getElementById("slideImage2");

  setTimeout(() => {
    slideImage2.src = images2[currentIndex2]; // 이미지 변경
  }, 500);
}

// 3초마다 첫 번째 슬라이드 변경
setInterval(changeImage2, 3000);

const images3 = [
  "/typo_experi_img/typo_experi1.png",
  "/typo_experi_img/typo_experi2.png",
  "/typo_experi_img/typo_experi3.png",
  "/typo_experi_img/typo_experi4.png",
  "/typo_experi_img/typo_experi5.png",
];
let currentIndex3 = 0;

function changeImage3() {
  currentIndex3 = (currentIndex3 + 1) % images3.length;
  const slideImage3 = document.getElementById("slideImage3");

  setTimeout(() => {
    slideImage3.src = images3[currentIndex3]; // 이미지 변경
  }, 500);
}

setInterval(changeImage3, 3000);

const images4 = [
  "/v&m_typo_img/v&m_typo1.png",
  "/v&m_typo_img/v&m_typo2.png",
  "/v&m_typo_img/v&m_typo3.png",
  "/v&m_typo_img/v&m_typo4.png",
];
let currentIndex4 = 0;

function changeImage4() {
  currentIndex4 = (currentIndex4 + 1) % images4.length;
  const slideImage4 = document.getElementById("slideImage4");

  setTimeout(() => {
    slideImage4.src = images4[currentIndex4]; // 이미지 변경
  }, 500);
}

// 3초마다 첫 번째 슬라이드 변경
setInterval(changeImage4, 3000);
