"use strict";

/* ==========================================
   KAUSHAL AI LABS
   PORTFOLIO JAVASCRIPT
========================================== */

// 1. CONFIGURATION

const CONTACT_EMAIL = "kaush80065@gmail.com";

const RESUME_PATH = "assets/Kaushal_Kumar_Sharma_AI_Developer_Resume.pdf";

// 2. MOBILE NAVIGATION

const menuButton = document.querySelector(".menu-button");
const navMenu = document.querySelector(".nav-menu");

function closeMenu() {
  if (!menuButton || !navMenu) return;

  navMenu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation",
    );
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

// 3. AUTOMATIC FOOTER YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 4. SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
    },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// 5. HANGING ID CARD FLIP ANIMATION

const idCard = document.getElementById("id-card");
const idFlipButton = document.getElementById("id-flip-button");

function flipIDCard() {
  if (!idCard) return;

  const flipped = idCard.classList.toggle("is-flipped");

  if (idFlipButton) {
    idFlipButton.setAttribute("aria-pressed", String(flipped));

    idFlipButton.textContent = flipped ? "↻ Show front" : "↻ Flip ID card";
  }
}

if (idCard && idFlipButton) {
  idFlipButton.addEventListener("click", flipIDCard);
}

// 6. OPTIONAL MOUSE INTERACTION

const idStage = document.getElementById("id-stage");
const idSwing = document.querySelector(".id-swing");

const canInteract =
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !reducedMotion;

if (canInteract) {
  document
    .querySelectorAll(".interactive-headline")
    .forEach((headline) => {
      headline.addEventListener("pointermove", (event) => {
        const rect = headline.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        headline.style.setProperty("--pointer-x", `${x * 100}%`);
        headline.style.setProperty("--pointer-y", `${y * 100}%`);
        headline.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 4}deg) rotateY(${(x - 0.5) * 5}deg) translateZ(4px)`;
        headline.classList.add("is-pointer-active");
      });

      headline.addEventListener("pointerleave", () => {
        headline.style.removeProperty("--pointer-x");
        headline.style.removeProperty("--pointer-y");
        headline.style.removeProperty("transform");
        headline.classList.remove("is-pointer-active");
      });
    });
}

if (idStage && idSwing && canInteract) {
  idStage.addEventListener("pointerenter", () => {
    idSwing.style.animationPlayState = "paused";
  });

  idStage.addEventListener("pointermove", (event) => {
    const rect = idStage.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const rotation = x * 7;
    const tiltX = y * -5;
    const tiltY = x * 5;

    idSwing.style.transform = `translateX(-50%) rotate(${rotation}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  idStage.addEventListener("pointerleave", () => {
    idSwing.style.transform = "";
    idSwing.style.animationPlayState = "running";
  });
}

// 7. EMAIL CONFIGURATION

const emailLink = document.querySelector(".contact-email");

const copyButton = document.getElementById("copy-email");

const emailConfigured = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT_EMAIL);

if (emailLink && emailConfigured) {
  emailLink.textContent = CONTACT_EMAIL;
  emailLink.href = `mailto:${CONTACT_EMAIL}`;
}

// 8. COPY EMAIL BUTTON

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    if (!emailConfigured) return;

    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);

      copyButton.textContent = "Email copied!";
    } catch (error) {
      copyButton.textContent = "Please select and copy the email above.";
    }
  });
}

// 9. RESUME DOWNLOAD CHECK

const resumeLinks = [
  document.getElementById("resume-link"),
  document.getElementById("resume-link-secondary"),
];

fetch(RESUME_PATH, { method: "HEAD" })
  .then((response) => {
    if (!response.ok) {
      resumeLinks.forEach((link) => {
        if (link) link.hidden = true;
      });

      console.warn("Resume PDF not found. Check the assets folder.");
    }
  })
  .catch((error) => {
    console.warn("Could not verify resume availability:", error);
  });

// 10. CONTACT FORM

const contactForm = document.getElementById("contact-form");

const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const typeElement = document.getElementById("inquiry-type");

    const nameElement = document.getElementById("visitor-name");

    const emailElement = document.getElementById("visitor-email");

    const messageElement = document.getElementById("visitor-message");

    if (!typeElement || !nameElement || !emailElement || !messageElement) {
      console.error("Contact form fields are missing.");
      return;
    }

    const inquiryType = typeElement.value;
    const name = nameElement.value.trim();
    const email = emailElement.value.trim();
    const message = messageElement.value.trim();

    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.textContent = "Please complete all fields.";
      }
      return;
    }

    const subject = `[Kaushal AI Labs] ${inquiryType} - ${name}`;

    const body = [
      `Inquiry Type: ${inquiryType}`,
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
      "",
      "Sent from Kaushal AI Labs Portfolio",
    ].join("\n");

    const mailtoLink =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    if (formStatus) {
      formStatus.textContent =
        "Your email application should open. " +
        "Press Send to complete your message.";
    }

    window.location.href = mailtoLink;
  });
}

// 11. CLOSE MOBILE MENU ON OUTSIDE CLICK

document.addEventListener("click", (event) => {
  if (!navMenu || !menuButton) return;

  const clickedInsideMenu = navMenu.contains(event.target);
  const clickedMenuButton = menuButton.contains(event.target);

  if (!clickedInsideMenu && !clickedMenuButton) {
    closeMenu();
  }
});

// 12. INITIALIZATION MESSAGE

console.log("Kaushal AI Labs portfolio loaded successfully!");
