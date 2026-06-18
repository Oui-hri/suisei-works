// =========================
// Contact Form / EmailJS
// =========================

const EMAILJS_SERVICE_ID = "service_suisei";
const EMAILJS_TEMPLATE_ID = "template_ur5fyn4";
const EMAILJS_PUBLIC_KEY = "ph6D6tRpLKmdqtkrx";

const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

if (contactForm && contactStatus && window.emailjs) {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactStatus.textContent = "送信中です...";
    contactStatus.classList.remove("is-success", "is-error");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "送信中...";
    }

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
      .then(() => {
        contactStatus.textContent =
          "送信が完了しました。内容を確認後、ご連絡いたします。";
        contactStatus.classList.add("is-success");

        contactForm.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);

        contactStatus.textContent =
          "送信に失敗しました。時間をおいて再度お試しください。";
        contactStatus.classList.add("is-error");
      })
      .finally(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "送信する";
        }
      });
  });
}
