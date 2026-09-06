// CURSOR
// =========================================
// CUSTOM CURSOR
// =========================================

const cursor = document.getElementById("cursor");

if (cursor && !window.matchMedia("(hover: none)").matches) {

  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

  });


  function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animateCursor);

  }

  animateCursor();


  // Hover effect

  const hoverElements = document.querySelectorAll(
    "a, button, input, textarea, .project-card"
  );

  hoverElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });

  });

}

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }

  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// SYSTEM BOOT LOADER
window.addEventListener('load', () => {

  const loader = document.getElementById('loader');

  if (!loader) return;

  // Give the boot animation enough time to finish
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 4000);

});

// TYPING ANIMATION
const roles = [
  'CS Undergraduate @ IIT',
  'Cybersecurity Enthusiast',
  'AI & ML Explorer',
  'Full-stack Developer',
  'Web App Developer',
  'Marketing Intern @ DeepL',
  'Content Creator'
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typedEl = document.getElementById('typed-text');

function type() {

  const current = roles[roleIndex];

  if (!deleting) {

    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      deleting = true;

      setTimeout(type, 1500);
      return;
    }

  } else {

    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

  }

  const speed = deleting ? 50 : 100
  setTimeout(type, speed);

}

type();

// ACTIVE NAV LINK
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }

  });

});

// MOBILE MENU
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

  navMenu.classList.toggle("active");

});

// CLOSE MENU WHEN CLICKING LINKS
navLinks.forEach(link => {

  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });

});

document.addEventListener("click", (e) => {

  if (
    !menuToggle.contains(e.target) &&
    !navMenu.contains(e.target)
  ) {
    navMenu.classList.remove("active");
  }

});

// =========================================
// PROJECT SHOWCASE
// =========================================

const showcase = document.getElementById("project-showcase");
const showcasePanel = document.querySelector(".showcase-panel");
const showcaseBackdrop = document.querySelector(".showcase-backdrop");
const showcaseClose = document.getElementById("showcase-close");

const showcaseNumber = document.getElementById("showcase-number");
const showcaseCategory = document.getElementById("showcase-category");
const showcaseTitle = document.getElementById("showcase-title");
const showcaseDescription = document.getElementById("showcase-description");
const showcaseImage = document.getElementById("showcase-image");
const showcaseImageContainer = document.querySelector(".showcase-image-container");
const showcaseTech = document.getElementById("showcase-tech");

const showcaseLive = document.getElementById("showcase-live");
const showcaseCode = document.getElementById("showcase-code");

const projectCards = document.querySelectorAll(".project-card");


// =========================================
// PROJECT-SPECIFIC INFORMATION
// =========================================

const projectInfo = {

  "vora": {
    category: "MOBILE APPLICATION",
    features: [
      "Study Planning",
      "CRUD Notes System",
      "Firebase Firestore",
      "Flutter Development"
    ]
  },

  "task-manager": {
    category: "DESKTOP APPLICATION",
    features: [
      "Task Organisation",
      "Tkinter GUI",
      "Multithreading",
      "Object-Oriented Design"
    ]
  },

  "environment": {
    category: "WEB PLATFORM",
    features: [
      "UN SDG 15",
      "Responsive Interface",
      "Conservation Awareness",
      "Clean Navigation"
    ]
  },

  "surf-del-mar": {
    category: "WEB EXPERIENCE",
    features: [
      "Smooth Animations",
      "Creative Color Grading",
      "Pure HTML / CSS / JS",
      "Responsive Design"
    ]
  },

  "ms-mobile": {
    category: "BUSINESS WEBSITE",
    features: [
      "Service Listings",
      "WhatsApp Booking",
      "Google Maps",
      "Mobile-Friendly Form"
    ]
  }

};


// =========================================
// OPEN SHOWCASE
// =========================================

function openShowcase(card) {

  if (!showcase) return;

  const projectId = card.dataset.project;
  const info = projectInfo[projectId] || {};

  // PROJECT NUMBER
  const numberText = card.querySelector(".project-num")?.textContent || "01";
  const projectNumber = numberText.split("—")[0].trim();

  showcaseNumber.textContent = projectNumber;

  // CATEGORY
  const cardCategory = numberText.split("—")[1]?.trim();

  showcaseCategory.textContent =
    info.category ||
    (cardCategory ? cardCategory.toUpperCase() : "PROJECT");

  // TITLE
  const title = card.querySelector(".project-title");

  if (title) {
    showcaseTitle.textContent = title.textContent.trim();
  }

  // DESCRIPTION
  const description = card.querySelector(".project-desc");

  if (description) {
    showcaseDescription.textContent = description.textContent.trim();
  }

  // =========================================
  // PROJECT IMAGE
  // =========================================

  const projectImage = card.querySelector(".project-image");

  if (projectImage) {

    showcaseImage.src = projectImage.src;
    showcaseImage.alt =
      projectImage.alt ||
      showcaseTitle.textContent;

    showcaseImage.style.display = "block";

    // Remove placeholder if one exists
    const placeholder =
      showcaseImageContainer.querySelector(".showcase-placeholder");

    if (placeholder) {
      placeholder.remove();
    }

  } else {

    // Hide broken/empty image
    showcaseImage.removeAttribute("src");
    showcaseImage.style.display = "none";

    // Create placeholder
    let placeholder =
      showcaseImageContainer.querySelector(".showcase-placeholder");

    if (!placeholder) {

      placeholder = document.createElement("div");

      placeholder.className = "showcase-placeholder";

      placeholder.style.cssText = `
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        color: rgba(0,255,136,0.7);
        font-family: 'JetBrains Mono', monospace;
        text-align: center;
        letter-spacing: 0.15em;
      `;

      showcaseImageContainer.appendChild(placeholder);
    }

    placeholder.innerHTML = `
      <div style="font-size:3rem;">//</div>
      <div style="font-size:0.75rem;">
        PROJECT PREVIEW
      </div>
      <div style="font-size:0.6rem; opacity:0.5;">
        ${showcaseCategory.textContent}
      </div>
    `;
  }


  // =========================================
  // TECHNOLOGY TAGS
  // =========================================

  showcaseTech.innerHTML = "";

  const techTags = card.querySelectorAll(".tech-tag");

  techTags.forEach(tag => {

    const tech = document.createElement("span");

    tech.textContent = tag.textContent.trim();

    showcaseTech.appendChild(tech);

  });


  // =========================================
  // FEATURES
  // =========================================

  const featureElements =
    showcase.querySelectorAll(".showcase-feature");

  const features =
    info.features || [
      "Project Development",
      "Modern User Interface",
      "Responsive Experience",
      "Real-world Solution"
    ];

  featureElements.forEach((feature, index) => {

    const number = feature.querySelector("span");
    const text = feature.querySelector("p");

    if (number) {
      number.textContent =
        String(index + 1).padStart(2, "0");
    }

    if (text) {
      text.textContent =
        features[index] || "Project Feature";
    }

  });


  // =========================================
  // LIVE WEBSITE BUTTON
  // =========================================

  const projectLink = card.querySelector(".project-link");

  if (projectLink) {

    showcaseLive.href = projectLink.href;
    showcaseLive.textContent =
      projectLink.textContent.trim() || "View Live ↗";

    showcaseLive.style.display = "inline-flex";

    showcaseLive.target = "_blank";
    showcaseLive.rel = "noopener noreferrer";

  } else {

    showcaseLive.style.display = "none";

  }


  // =========================================
  // CODE BUTTON
  // =========================================

  // Only show this if you later add a GitHub/code
  // link inside the project card.

  const codeLink = card.querySelector(
    'a[href*="github.com"]'
  );

  if (codeLink) {

    showcaseCode.href = codeLink.href;
    showcaseCode.style.display = "inline-flex";

    showcaseCode.target = "_blank";
    showcaseCode.rel = "noopener noreferrer";

  } else {

    showcaseCode.style.display = "none";

  }


  // =========================================
  // SHOW SHOWCASE
  // =========================================

  showcase.classList.add("active");

  document.body.style.overflow = "hidden";

  showcase.setAttribute("aria-hidden", "false");

}


// =========================================
// CLOSE SHOWCASE
// =========================================

function closeShowcase() {

  if (!showcase) return;

  showcase.classList.remove("active");

  document.body.style.overflow = "";

  showcase.setAttribute("aria-hidden", "true");

}


// =========================================
// DESKTOP HOVER
// =========================================

const desktopHover =
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

let activeCard = null;
let closeTimer = null;

function cancelClose() {

  clearTimeout(closeTimer);

}

function scheduleClose() {

  clearTimeout(closeTimer);

  closeTimer = setTimeout(() => {

    if (!activeCard) return;

    const panelRect =
      showcasePanel.getBoundingClientRect();

    const mouseInsidePanel =
      window.mousePosition &&
      window.mousePosition.x >= panelRect.left &&
      window.mousePosition.x <= panelRect.right &&
      window.mousePosition.y >= panelRect.top &&
      window.mousePosition.y <= panelRect.bottom;

    if (!mouseInsidePanel) {
      closeShowcase();
      activeCard = null;
    }

  }, 250);

}


// =========================================
// PROJECT CARD EVENTS
// =========================================

let openTimer = null;
let isScrolling = false;
let scrollTimer = null;

projectCards.forEach(card => {

  // DESKTOP HOVER
  if (desktopHover) {

    card.addEventListener("mouseenter", () => {

      // Cancel any previous timer
      clearTimeout(openTimer);

      // Don't open while scrolling
      if (isScrolling) return;

      // Wait before opening
      openTimer = setTimeout(() => {

        // Check again in case scrolling started
        if (isScrolling) return;

        activeCard = card;
        openShowcase(card);

      }, 200);

    });

    card.addEventListener("mouseleave", () => {

      // Cancel opening if pointer leaves too quickly
      clearTimeout(openTimer);

      // Close if this card is currently active
      if (activeCard === card) {
        scheduleClose();
      }

    });

  }

  // MOBILE / CLICK
  card.addEventListener("click", (event) => {

    // Don't interrupt actual project links
    if (event.target.closest("a")) {
      return;
    }

    if (!desktopHover) {

      event.preventDefault();

      activeCard = card;
      openShowcase(card);

    }

  });

});


// =========================================
// PREVENT POPUP WHILE SCROLLING
// =========================================

window.addEventListener("scroll", () => {

  isScrolling = true;

  // Cancel any pending hover opening
  clearTimeout(openTimer);

  // Close showcase if currently open
  if (showcase && showcase.classList.contains("active")) {
    activeCard = null;
    closeShowcase();
  }

  clearTimeout(scrollTimer);

  scrollTimer = setTimeout(() => {
    isScrolling = false;
  }, 400);

}, { passive: true });


// =========================================
// TRACK MOUSE POSITION
// =========================================

window.mousePosition = {
  x: 0,
  y: 0
};

if (desktopHover) {

  document.addEventListener("mousemove", (event) => {

    window.mousePosition.x = event.clientX;
    window.mousePosition.y = event.clientY;

    if (!showcase || !classList.contains("active")) {
      return;
    }

    if (!activeCard) {
      return;
    }

    const panelRect =
      showcasePanel.getBoundingClientRect();

    const cardRect =
      activeCard.getBoundingClientRect();

    const insidePanel =
      event.clientX >= panelRect.left &&
      event.clientX <= panelRect.right &&
      event.clientY >= panelRect.top &&
      event.clientY <= panelRect.bottom;

    const insideCard =
      event.clientX >= cardRect.left &&
      event.clientX <= cardRect.right &&
      event.clientY >= cardRect.top &&
      event.clientY <= cardRect.bottom;

    if (insidePanel || insideCard) {

      cancelClose();

    } else {

      scheduleClose();

    }

  });

}


// =========================================
// SHOWCASE MOUSE EVENTS
// =========================================

if (showcasePanel) {

  showcasePanel.addEventListener("mouseenter", () => {
    cancelClose();
  });

  showcasePanel.addEventListener("mouseleave", () => {
    scheduleClose();
  });

}


// =========================================
// CLOSE BUTTON
// =========================================

if (showcaseClose) {

  showcaseClose.addEventListener("click", () => {

    activeCard = null;

    closeShowcase();

  });

}


// =========================================
// BACKDROP CLICK
// =========================================

if (showcaseBackdrop) {

  showcaseBackdrop.addEventListener("click", () => {

    activeCard = null;

    closeShowcase();

  });

}


// =========================================
// ESCAPE KEY
// =========================================

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    activeCard = null;

    closeShowcase();

  }

});