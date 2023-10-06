"use strict";
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const mainNav = document.querySelector(".main-nav");
const mainLink = document.querySelectorAll(".main_link");
const links = document.querySelectorAll(".link");
const hamburger = document.querySelector(".hamburger");
const hamburgerContainer = document.querySelector(".hamburger_container");
const hiddenNav = document.querySelector(".side_nav");
const hiddenNavCloseButton = document.querySelector(".close");
const logo = document.querySelector(".logo");
const overlay = document.querySelector(".overlay");
const sideNavLinks = document.querySelectorAll(".hidden_link");
const timer = document.querySelector(".timer");
const list = document.querySelectorAll(".child");
const list2 = document.querySelectorAll(".div--2");
const child2 = document.querySelectorAll(".child--2");
const child1 = document.querySelectorAll(".div--1");
const landingImg = document.querySelector(".landing-img");
const landingText = document.querySelector(".text");
const FAQs = document.querySelector(".FAQs");
const homeBtn = document.querySelector(".home-btn");
const timeline = document.querySelector(".timeline");

//NAV-LINKS HOVER EFFECT
// HANDLER FUNCTION
const hoverHandler = function (e) {
  if (e.target.classList.contains("main_link")) {
    const targetLink = e.target;
    mainLink.forEach((el) => {
      if (el !== targetLink) {
        el.style.opacity = this;
      }
    });
  }
};

mainNav.addEventListener("mouseover", hoverHandler.bind(0.5));
mainNav.addEventListener("mouseout", hoverHandler.bind(1));

//////////////////////////////////////////////
// FUNCTIONS

// SHOW AND CLOSE NAV-LINKS EVENT HANDLERS
const showHiddenNav = function () {
  if (hiddenNav.classList.contains("hidden")) {
    hiddenNav.classList.remove("hidden");
    overlay.classList.remove("invisible");
  }
};

const closeHiddenNav = function () {
  if (!hiddenNav.classList.contains("hidden")) {
    hiddenNav.classList.add("hidden");
    overlay.classList.add("invisible");
  }
};

// SHOW AND CLOSE MODAL EVENT LISTENERS
hamburgerContainer.addEventListener("click", showHiddenNav);
overlay.addEventListener("click", closeHiddenNav);
hiddenNavCloseButton.addEventListener("click", closeHiddenNav);

document.addEventListener("keydown", function (e) {
  if (!hiddenNav.classList.contains("hidden") && e.key === "Escape") {
    closeHiddenNav();
  }
});

// SMOOTH SCROLLING EVENT HANDLERS
const smoothScroll = function (e) {
  if (e.target.classList.contains("link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: "smooth" });
  }
};

// HIDDEN LINKS SCROLL ANIMATION
hiddenNav.addEventListener("click", function (e) {
  if (e.target.classList.contains("hidden_link")) {
    e.preventDefault();
    closeHiddenNav();
    const id = e.target.getAttribute("href");
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: "smooth" });
  }
});
mainNav.addEventListener("click", smoothScroll);

// TIMER
setInterval(function () {
  const timeNow = new Date();
  const UItimer = `${String(timeNow.getHours()).padStart(2, "0")}h: ${String(
    timeNow.getMinutes()
  ).padStart(2, "0")}m: ${String(timeNow.getSeconds()).padStart(2, "0")}s`;

  timer.textContent = UItimer;
}, 1000);

// FIXED NAV
const fixedNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("fixed_nav");
  } else {
    nav.classList.remove("fixed_nav");
    homeBtn.classList.remove("fixed-home-btn");
  }
};

const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(fixedNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Display section on scroll(main sections animations)
const allSections = document.querySelectorAll(".section");
// console.log(allSections);

const sectionsCallback = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("hidden-section");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionsCallback, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  section.classList.add("hidden-section");
  sectionObserver.observe(section);
});

// ANIMATIONS

// LANDING-PAGE
const introSlideIn = function () {
  landingText.classList.remove("left_page--1");
  landingImg.classList.remove("right_page--1");
};
introSlideIn();

// TIMELINE LISTS
const listCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("transform");
  observer.unobserve(entry.target);
};

const listObserver = new IntersectionObserver(listCallback, {
  root: null,
  threshold: 0.45,
});

list.forEach((el) => {
  el.classList.add("transform");
  listObserver.observe(el);
});

list2.forEach((el) => {
  el.classList.add("transform");
  listObserver.observe(el);
});

const firstChild = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("transform-3");
  observer.unobserve(entry.target);
};

const firstChildObserver = new IntersectionObserver(firstChild, {
  root: null,
  threshold: 0.45,
});

child1.forEach((el) => {
  el.classList.add("transform-3");
  firstChildObserver.observe(el);
});

const lastChild = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("transform-2");
  observer.unobserve(entry.target);
};

const lastChildObserver = new IntersectionObserver(lastChild, {
  root: null,
  threshold: 0.45,
});

child2.forEach((el) => {
  el.classList.add("transform-2");
  lastChildObserver.observe(el);
});

const homeBtnCallback = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    homeBtn.classList.add("fixed-home-btn");
    // observer.unobserve(timeline);
  }
};

const homeBtnObj = {
  root: null,
  threshold: 0,
};

const homeBtnObserver = new IntersectionObserver(homeBtnCallback, homeBtnObj);
homeBtnObserver.observe(timeline);
