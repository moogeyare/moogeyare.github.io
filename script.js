const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("omar-theme");

function setTheme(light) {
  document.body.classList.toggle("light-mode", light);
  localStorage.setItem("omar-theme", light ? "light" : "dark");
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(light));
    const icon = themeToggle.querySelector(".theme-icon");
    if (icon) icon.textContent = light ? "☀" : "☾";
  }
}

setTheme(savedTheme === "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("light-mode"));
  });
}

const header = document.getElementById("header");
const progress = document.getElementById("pageProgress");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navAnchors = navLinks ? [...navLinks.querySelectorAll('a[href^="#"]')] : [];
const sections = [...document.querySelectorAll("main section[id]")];

function onScroll() {
  const y = window.scrollY;
  header?.classList.toggle("scrolled", y > 25);

  if (progress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  }

  let current = "home";
  sections.forEach((section) => {
    if (y >= section.offsetTop - 180) current = section.id;
  });
  navAnchors.forEach((anchor) => {
    anchor.classList.toggle("active", anchor.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();

function closeMenu() {
  navLinks?.classList.remove("open");
  menuBtn?.setAttribute("aria-expanded", "false");
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  navAnchors.forEach((anchor) => anchor.addEventListener("click", closeMenu));
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px" });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const glow = document.querySelector(".cursor-glow");
if (glow && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    if (window.innerWidth > 900) {
      glow.style.transform = `translate(${event.clientX - 80}px,${event.clientY - 80}px)`;
    }
  }, { passive: true });
}
