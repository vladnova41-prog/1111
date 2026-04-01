const redirectLinks = [
  "https://lp3.joi.com/reg",
  "https://lp3.joi.com/chamomile-boy",
  "https://lp3.joi.com/general-boy",
  "https://lp3.joi.com/offer",
  "https://lp3.joi.com/bot-wizard",
  "https://lp3.joi.com/bot-wizard-stepsister",
  "https://lp3.joi.com/bot-wizard-goth",
  "https://lp3.joi.com/bot-wizard-busty",
  "https://lp3.joi.com/bot-wizard-office",
  "https://lp3.joi.com/quizshort",
  "https://lp3.joi.com/mesh-video2",
  "https://lp2.joi.com/mesh-video",
  "https://lp2.joi.com/haru_video",
  "https://lp2.joi.com/marielle_video",
  "https://lp1.joi.com/anime",
  "https://lp2.joi.com/kaida-sato/3",
  "https://lp2.joi.com/kaida-sato/5"
];

const visualFiles = [
  "./assets/images/m0.webp",
  "./assets/images/m01.webp",
  "./assets/images/m110.webp",
  "./assets/images/m20.webp"
];

const visuals = document.getElementById("visuals");
const visualTemplate = document.getElementById("visualTemplate");
const ctaButtons = document.querySelectorAll(".js-cta");
const promoImages = document.querySelectorAll(".js-promo-image");
const cookieConsent = document.getElementById("cookieConsent");
const cookieAccept = document.getElementById("cookieAccept");
const cookieReject = document.getElementById("cookieReject");
const openModalLinks = document.querySelectorAll(".js-open-modal");
const closeModalButtons = document.querySelectorAll(".js-close-modal");
const legalModal = document.getElementById("legalModal");
const legalModalTitle = document.getElementById("legalModalTitle");
const legalModalBody = document.getElementById("legalModalBody");

const i18n = {
  en: {
    navShowcase: "Showcase",
    navGirls: "Girls",
    navOffer: "Offer",
    btnStart: "Start",
    btnTry: "Try For Free",
    heroTitleHtml: "CREATE YOUR <span>AI WAIFU</span>",
    heroSub: "Private chat style preview. One tap to continue.",
    benefitOne: "<span>😍</span> Fully dressed content",
    benefitTwo: "<span>💬</span> Unlimited spicy chat",
    benefitThree: "<span>👑</span> Role-play atmosphere",
    promoKicker: "Create your",
    promoTitle: "AI Waifu Now",
    promoSub: "Smart chat experience with dressed AI models.",
    footerHelp: "Help",
    footerTerms: "Terms",
    footerPrivacy: "Privacy Policy",
    footerRights: "© 2026 Joi AI. All rights reserved.",
    cookieTitle: "Cookie Collection Agreement",
    cookieText: "We use cookies to improve performance, analytics and user experience.",
    cookieReject: "Reject",
    cookieAccept: "Accept All",
    legal: {
      help: {
        title: "Help",
        body: [
          "This page is an independent preview/transition page.",
          "All buttons and links on this page lead to third-party websites.",
          "For support, billing, or account issues, contact the destination website support directly."
        ]
      },
      terms: {
        title: "Terms",
        body: [
          "This page is provided as-is for navigation/preview purposes.",
          "All buttons and links route users to third-party websites.",
          "This page is not responsible for third-party content, offers, services, or outcomes."
        ]
      },
      privacy: {
        title: "Privacy Policy",
        body: [
          "This page does not create user accounts and does not process user profiles.",
          "Only basic technical data may be used for page functionality (for example, cookie consent choice).",
          "After redirect, any data processing is controlled by third-party websites under their own privacy policies."
        ]
      }
    }
  },
  ru: {
    navShowcase: "Превью",
    navGirls: "Модели",
    navOffer: "Оффер",
    btnStart: "Начать",
    btnTry: "Попробовать бесплатно",
    heroTitleHtml: "СОЗДАЙ СВОЮ <span>AI WAIFU</span>",
    heroSub: "Приватный формат чата. Один тап для продолжения.",
    benefitOne: "<span>😍</span> Контент только в одежде",
    benefitTwo: "<span>💬</span> Неограниченный чат",
    benefitThree: "<span>👑</span> Атмосфера role-play",
    promoKicker: "Создай свою",
    promoTitle: "AI Waifu Сейчас",
    promoSub: "Умный чат-опыт с одетыми AI моделями.",
    footerHelp: "Помощь",
    footerTerms: "Условия",
    footerPrivacy: "Политика конфиденциальности",
    footerRights: "© 2026 Joi AI. Все права защищены.",
    cookieTitle: "Согласие на использование cookie",
    cookieText: "Мы используем cookie для производительности, аналитики и улучшения пользовательского опыта.",
    cookieReject: "Отклонить",
    cookieAccept: "Принять все",
    legal: {
      help: {
        title: "Помощь",
        body: [
          "Эта страница является независимой страницей предпросмотра/перехода.",
          "Все кнопки и ссылки на этой странице ведут на сторонние сайты.",
          "По вопросам поддержки, оплаты и аккаунта обращайтесь напрямую в поддержку сайта назначения."
        ]
      },
      terms: {
        title: "Условия",
        body: [
          "Страница предоставляется как есть только для навигации и предпросмотра.",
          "Все кнопки и ссылки перенаправляют пользователей на сторонние сайты.",
          "Страница не несет ответственности за контент, предложения, услуги и результаты третьих лиц."
        ]
      },
      privacy: {
        title: "Политика конфиденциальности",
        body: [
          "Эта страница не создает пользовательские аккаунты и не обрабатывает пользовательские профили.",
          "Для работы страницы могут использоваться только базовые технические данные (например, выбор cookie).",
          "После редиректа обработка данных регулируется сторонними сайтами и их собственными политиками конфиденциальности."
        ]
      }
    }
  }
};

let activeLocale = "en";

function detectLocale() {
  const browserLang = (navigator.language || "en").toLowerCase();
  if (browserLang.startsWith("ru")) {
    return "ru";
  }

  return "en";
}

function applyLocalization(locale) {
  const dict = i18n[locale] || i18n.en;
  document.documentElement.lang = locale;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) {
      node.textContent = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const key = node.dataset.i18nHtml;
    if (dict[key]) {
      node.innerHTML = dict[key];
    }
  });
}

function pickRedirectTarget() {
  const hash = window.location.hash.replace("#", "").trim();
  const queryParams = new URLSearchParams(window.location.search);
  const param = Number(queryParams.get("to"));
  const fromHash = Number(hash);

  if (Number.isInteger(param) && param >= 1 && param <= redirectLinks.length) {
    return redirectLinks[param - 1];
  }

  if (Number.isInteger(fromHash) && fromHash >= 1 && fromHash <= redirectLinks.length) {
    return redirectLinks[fromHash - 1];
  }

  const randomIndex = Math.floor(Math.random() * redirectLinks.length);
  return redirectLinks[randomIndex];
}

function pickImageCount() {
  const queryParams = new URLSearchParams(window.location.search);
  const paramCount = Number(queryParams.get("img"));

  if (Number.isInteger(paramCount) && paramCount >= 1 && paramCount <= 4) {
    return paramCount;
  }

  return 4;
}

function renderVisuals() {
  const fragment = document.createDocumentFragment();
  const count = pickImageCount();
  const selectedFiles = visualFiles.slice(0, count);

  selectedFiles.forEach((file, index) => {
    const node = visualTemplate.content.firstElementChild.cloneNode(true);
    const webpSource = node.querySelector(".js-visual-source-webp");
    const image = node.querySelector("img");

    if (webpSource) {
      webpSource.srcset = file;
    }

    image.src = file;
    image.alt = "AI girl points to the button";
    image.loading = index === 0 ? "eager" : "lazy";
    image.fetchPriority = index === 0 ? "high" : "low";
    image.addEventListener("error", () => {
      image.src = "./assets/fallback.svg";
    }, { once: true });

    fragment.appendChild(node);
  });

  if (count === 2) {
    visuals.classList.add("two");
  } else if (count === 3) {
    visuals.classList.add("three");
  } else if (count === 4) {
    visuals.classList.add("four");
  }

  visuals.appendChild(fragment);
}

function bindPromoImageFallbacks() {
  promoImages.forEach((image) => {
    image.addEventListener("error", () => {
      image.src = "./assets/fallback.svg";
    }, { once: true });
  });
}

function hideCookieConsent() {
  if (cookieConsent) {
    cookieConsent.classList.add("hidden");
  }
}

function setupCookieConsent() {
  if (!cookieConsent || !cookieAccept || !cookieReject) {
    return;
  }

  const saved = localStorage.getItem("cookieConsentChoice");
  if (saved === "accepted" || saved === "rejected") {
    hideCookieConsent();
    return;
  }

  cookieAccept.addEventListener("click", () => {
    localStorage.setItem("cookieConsentChoice", "accepted");
    hideCookieConsent();
  });

  cookieReject.addEventListener("click", () => {
    localStorage.setItem("cookieConsentChoice", "rejected");
    hideCookieConsent();
  });
}

function openLegalModal(type) {
  if (!legalModal || !legalModalTitle || !legalModalBody) {
    return;
  }

  const content = (i18n[activeLocale] || i18n.en).legal[type];
  if (!content) {
    return;
  }

  legalModalTitle.textContent = content.title;
  legalModalBody.innerHTML = content.body.map((text) => `<p>${text}</p>`).join("");
  legalModal.classList.remove("hidden");
  legalModal.setAttribute("aria-hidden", "false");
}

function closeLegalModal() {
  if (!legalModal) {
    return;
  }

  legalModal.classList.add("hidden");
  legalModal.setAttribute("aria-hidden", "true");
}

function setupLegalModals() {
  openModalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openLegalModal(link.dataset.modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", closeLegalModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLegalModal();
    }
  });
}

function setupHeaderAutoCollapse() {
  const header = document.querySelector(".topbar");
  if (!header) {
    return;
  }

  let lastY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;

    if (currentY <= 20) {
      document.body.classList.remove("header-collapsed");
      lastY = currentY;
      return;
    }

    if (currentY > lastY + 4) {
      document.body.classList.add("header-collapsed");
    } else if (currentY < lastY - 4) {
      document.body.classList.remove("header-collapsed");
    }

    lastY = currentY;
  }, { passive: true });
}

function bindCta() {
  const target = pickRedirectTarget();
  ctaButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = target;
    });
  });
}

activeLocale = detectLocale();
applyLocalization(activeLocale);
renderVisuals();
bindPromoImageFallbacks();
bindCta();
setupCookieConsent();
setupLegalModals();
setupHeaderAutoCollapse();
