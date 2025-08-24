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
  "/beatles_img/beatles1.png",
  "/beatles_img/beatles2.png",
  "/beatles_img/beatles3.png",
  "/beatles_img/beatles4.png",
];
let currentIndex1 = 0;

function changeImage1() {
  currentIndex1 = (currentIndex1 + 1) % images1.length;
  const slideImage1 = document.getElementById("slideImage1");

  setTimeout(() => {
    slideImage1.src = images1[currentIndex1]; // 이미지 변경
  }, 500);
}

// 3초마다 첫 번째 슬라이드 변경
setInterval(changeImage1, 3000);

const images2 = [
  "/typo_experi_img/typo_experi1.png",
  "/typo_experi_img/typo_experi2.png",
  "/typo_experi_img/typo_experi3.png",
  "/typo_experi_img/typo_experi4.png",
  "/typo_experi_img/typo_experi5.png",
];
let currentIndex2 = 0;

function changeImage2() {
  currentIndex2 = (currentIndex2 + 1) % images2.length;
  const slideImage2 = document.getElementById("slideImage2");

  setTimeout(() => {
    slideImage2.src = images2[currentIndex2]; // 이미지 변경
  }, 500);
}

setInterval(changeImage2, 3000);
