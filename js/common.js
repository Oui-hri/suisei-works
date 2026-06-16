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
  threshold: 0.35,
  rootMargin: "0px 0px -12% 0px"
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
