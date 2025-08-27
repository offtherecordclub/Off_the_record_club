const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
document.addEventListener("DOMContentLoaded", function () {
  const detailsElements = document.querySelectorAll("details");

  const images1 = [
    "img/typo_experi_img/typo_experi1.png",
    "img/typo_experi_img/typo_experi2.png",
    "img/typo_experi_img/typo_experi3.png",
    "img/typo_experi_img/typo_experi4.png",
    "img/typo_experi_img/typo_experi5.png",
  ];

  const images2 = [
    "img/monster_img/monster.png",
    "img/monster_img/monster1.png",
    "img/monster_img/monster5.png",
    "img/monster_img/monster6.png",
  ];

  let currentIndex1 = 0;
  let currentIndex2 = 0;

  const slideImage1 = document.getElementById("slideImage");
  const slideImage2 = document.getElementById("slideImage2");

  // 두 번째 슬라이드는 처음부터 600x490px 고정
  if (slideImage2) {
    slideImage2.style.width = "600px";
    slideImage2.style.height = "490px";
  }

  detailsElements.forEach((details) => {
    let slideInterval1 = null;
    let slideInterval2 = null;

    details.addEventListener("toggle", function () {
      if (this.open) {
        this.classList.add("expanded");

        // 첫 번째 슬라이드: 크기 변경 없이 이미지 전환
        slideInterval1 = setInterval(() => {
          currentIndex1 = (currentIndex1 + 1) % images1.length;
          slideImage1.src = images1[currentIndex1];
        }, 2000);

        // 두 번째 슬라이드: 크기 고정
        slideInterval2 = setInterval(() => {
          currentIndex2 = (currentIndex2 + 1) % images2.length;
          slideImage2.src = images2[currentIndex2];
          slideImage2.style.width = "600px";
          slideImage2.style.height = "490px";
        }, 2000);
      } else {
        this.classList.remove("expanded");
        clearInterval(slideInterval1);
        clearInterval(slideInterval2);
      }
    });
  });
});
