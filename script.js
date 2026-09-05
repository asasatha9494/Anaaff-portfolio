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