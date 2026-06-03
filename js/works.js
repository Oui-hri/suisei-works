const cafeImages = [
  "images/cafe-menu-cover.png",
  "images/cafe-menu-sakura-latte.png",
  "images/cafe-menu-sakura-cake.png",
  "images/cafe-menu-matcha-latte.png",
  "images/cafe-menu-matcha-cake.png",
  "images/cafe-menu-coffee.png"
];

const cafeImage = document.getElementById("cafe-carousel-image");
const cafePrevButton = document.getElementById("cafe-prev-button");
const cafeNextButton = document.getElementById("cafe-next-button");

let cafeCurrentIndex = 0;

function showCafeImage(index) {
  cafeImage.classList.add("fade");

  setTimeout(() => {
    cafeImage.src = cafeImages[index];
    cafeImage.classList.remove("fade");
  }, 200);
}

cafePrevButton.addEventListener("click", () => {
  cafeCurrentIndex--;

  if (cafeCurrentIndex < 0) {
    cafeCurrentIndex = cafeImages.length - 1;
  }

  showCafeImage(cafeCurrentIndex);
});

cafeNextButton.addEventListener("click", () => {
  cafeCurrentIndex++;

  if (cafeCurrentIndex >= cafeImages.length) {
    cafeCurrentIndex = 0;
  }

  showCafeImage(cafeCurrentIndex);
});
