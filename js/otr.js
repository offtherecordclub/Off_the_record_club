const images = [
  "img/Main.png", // 첫 번째 이미지
  "img/otr_graphic shape.png", // 두 번째 이미지
  "img/otr_beatles.png", // 세 번째 이미지
];

let currentImageIndex = 0;

function changeImage() {
  const backgroundImage = document.querySelector(".background_img");
  currentImageIndex = (currentImageIndex + 1) % images.length; // 배열 순환
  backgroundImage.src = images[currentImageIndex];
}

// 3초마다 changeImage 함수 실행
setInterval(changeImage, 3000);
