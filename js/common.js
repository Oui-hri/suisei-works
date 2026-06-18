// =========================
// Scroll Fade Animation
// 少し間を置いてから表示
// =========================

const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    // すでに表示済み・待機中なら何もしない
    if (
      entry.target.classList.contains("show") ||
      entry.target.dataset.fadeWaiting === "true"
    ) {
      return;
    }

    entry.target.dataset.fadeWaiting = "true";

    // 見えた瞬間ではなく、少し間を置いてから表示
    setTimeout(() => {
      entry.target.classList.add("show");
      entry.target.dataset.fadeWaiting = "false";
    }, 350);

    // 一度だけ表示
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0,
  rootMargin: "0px 0px -10% 0px"
});

fadeElements.forEach((element) => {
  fadeObserver.observe(element);
});


// =========================
// Constellation Animation
// Serviceセクション用
// 少し間を置いてから星座線を再生
// =========================

const constellationTriggers = document.querySelectorAll(".constellation-trigger");

const constellationObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    // すでに再生済み・待機中なら何もしない
    if (
      entry.target.classList.contains("constellation-active") ||
      entry.target.dataset.constellationWaiting === "true"
    ) {
      return;
    }

    entry.target.dataset.constellationWaiting = "true";

    // 見えた瞬間ではなく、少し間を置いてから再生
    setTimeout(() => {
      entry.target.classList.add("constellation-active");
      entry.target.dataset.constellationWaiting = "false";
    }, 500);

    // 一度だけ再生
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.5,
  rootMargin: "0px 0px -15% 0px"
});

constellationTriggers.forEach((element) => {
  constellationObserver.observe(element);
});


// =========================
// Works Preview Animation
// Worksセクションが見えたら、小さい星からカードを順番に表示
// =========================

const worksPreviewSection = document.querySelector(".works-preview");
const worksPreviewCards = document.querySelectorAll(".works-preview .work-image-card");

if (worksPreviewSection && worksPreviewCards.length > 0) {
  const worksPreviewObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      // セクションが見えてから少し間を置いて、カードを順番に開く
      setTimeout(() => {
        worksPreviewCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("is-visible");
          }, index * 170);
        });
      }, 450);

      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.25,
    rootMargin: "0px 0px -10% 0px"
  });

  worksPreviewObserver.observe(worksPreviewSection);
}


// =========================
// Work Detail Slider
// =========================

const workSliders = document.querySelectorAll("[data-slider]");

workSliders.forEach((slider) => {
  const images = slider.querySelectorAll(".slider-image");
  const dots = slider.querySelectorAll(".slider-dot");
  const prevButton = slider.querySelector(".slider-prev");
  const nextButton = slider.querySelector(".slider-next");

  if (!images.length || !dots.length || !prevButton || !nextButton) {
    return;
  }

  let currentIndex = 0;
  let sliderTimer;

  function showSlide(nextIndex) {
    images[currentIndex].classList.remove("is-active");
    dots[currentIndex].classList.remove("is-active");

    currentIndex = (nextIndex + images.length) % images.length;

    images[currentIndex].classList.add("is-active");
    dots[currentIndex].classList.add("is-active");
  }

  function showNextSlide() {
    showSlide(currentIndex + 1);
  }

  function startSlider() {
    stopSlider();
    sliderTimer = setInterval(showNextSlide, 4000);
  }

  function stopSlider() {
    clearInterval(sliderTimer);
  }

  prevButton.addEventListener("click", () => {
    stopSlider();
    showSlide(currentIndex - 1);
    startSlider();
  });

  nextButton.addEventListener("click", () => {
    stopSlider();
    showNextSlide();
    startSlider();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopSlider();
      showSlide(index);
      startSlider();
    });
  });

  slider.addEventListener("mouseenter", stopSlider);
  slider.addEventListener("mouseleave", startSlider);
  slider.addEventListener("focusin", stopSlider);
  slider.addEventListener("focusout", startSlider);

  startSlider();
});

// =========================
// Page Transition Curtain
// =========================

const pageTransitionCurtain = document.querySelector(".page-transition-curtain");

if (pageTransitionCurtain) {
  const shouldOpenCurtain =
    sessionStorage.getItem("suiseiPageTransition") === "true";
  if (shouldOpenCurtain) {
  document.body.classList.add("skip-hero-curtain");
}

  if (shouldOpenCurtain) {
    document.body.classList.add("page-curtain-closed");

    requestAnimationFrame(() => {
      document.body.classList.add("page-curtain-opening");
      document.body.classList.remove("page-curtain-closed");
    });

    setTimeout(() => {
      document.body.classList.add("page-curtain-hidden");
      document.body.classList.remove("page-curtain-opening");
      sessionStorage.removeItem("suiseiPageTransition");
    }, 850);
  }

  const links = document.querySelectorAll("a[href]");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href) return;
      if (link.target === "_blank") return;
      if (href.startsWith("#")) return;
      if (href.startsWith("mailto:")) return;
      if (href.startsWith("tel:")) return;
      if (href.startsWith("http")) return;

      event.preventDefault();

      document.body.classList.remove("page-curtain-hidden");
      document.body.classList.add("page-curtain-leaving");

      sessionStorage.setItem("suiseiPageTransition", "true");

      setTimeout(() => {
        window.location.href = href;
      }, 650);
    });
  });
}
