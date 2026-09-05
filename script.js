// CURSOR
const cursor = document.getElementById('cursor');

if (cursor) {

  if (window.matchMedia("(hover: none)").matches) {

    cursor.style.display = "none";

  } else {

    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX - 4 + 'px';
      cursor.style.top = e.clientY - 4 + 'px';
    });

  }

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