"use strict";
const inputs = document.querySelectorAll(".input");
const button = document.querySelector(".button");
const overlay = document.querySelector(".overlay");
const success = document.querySelector(".successful");
const hiddenNav = document.querySelector(".side_nav");
const hamburgerContainer = document.querySelector(".hamburger_container");
const hiddenNavCloseButton = document.querySelector(".close");
const heading = document.querySelector(".heading");
const fullName = document.querySelector(".name");
const email = document.querySelector(".email");
const number = document.querySelector(".number");
const message = document.querySelector(".message");

//DISCLAIMER: as at time of upload i haven't properly learnt my javaScript promises so pls be gentle😪
//this was supposed to relay info to the backEnd 🤡
const submitEnquiry = function (obj) {
  console.log(obj);
  fetch("https://backend.getlinked.ai/hackathon/contact-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch(function (err) {
      // heading.textContent = "Something went wrong, pleaase try again";
    });
};

// INPUTS VALIDATION AND RELAY
button.addEventListener("click", function (e) {
  e.preventDefault();
  const arr = [...inputs];

  // warning for empty input
  arr.forEach(function (el) {
    if (el.value === "") {
      el.style.border = "1px solid #d434fe";
    } else {
      el.style.border = "1px solid white";
    }
  });
  if (arr.map((el) => el.value).some((el) => el === "")) return;

  const obj = {
    email: email.value,
    phone_number: number.value,
    first_name: fullName.value,
    message: message.value,
  };

  heading.textContent = "Sending, please wait...";

  setTimeout(function () {
    success.classList.remove("invisible");
    overlay.classList.remove("invisible");
    heading.textContent =
      "Questions or need\n assistance?  \n Let us know about it";
  }, 3500);

  // for sending data to backend
  submitEnquiry(obj);
});

// SHOW HIDDEN SIDE NAV
const openHiddenNav = function () {
  if (hiddenNav.classList.contains("hidden")) {
    hiddenNav.classList.remove("hidden");
    overlay.classList.remove("invisible");
  }
};
hamburgerContainer.addEventListener("click", openHiddenNav);

const closeHiddenNav = function () {
  if (!hiddenNav.classList.contains("hidden")) {
    hiddenNav.classList.add("hidden");
    overlay.classList.add("invisible");
  }
};
hiddenNavCloseButton.addEventListener("click", closeHiddenNav);
overlay.addEventListener("click", closeHiddenNav);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeHiddenNav();
});
