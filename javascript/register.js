"use strict";
const registrationInputs = document.querySelectorAll(".reg_input");
const registerBtn = document.querySelector(".register-btn");
const successModal = document.querySelector(".successful");
const successModalBack = document.querySelector(".back-btn");
const overlay = document.querySelector(".overlay");
const warning = document.querySelector(".warning");
const checkbox = document.querySelector(".checkbox");
const navLinks = document.querySelectorAll(".main_link");
const nav = document.querySelector(".nav");
const hiddenNav = document.querySelector(".side_nav");
const hamburger = document.querySelector(".hamburger");
const hamburgerContainer = document.querySelector(".hamburger_container");
const hiddenNavCloseButton = document.querySelector(".close");
const groupName = document.querySelector(".group_name");
const email = document.querySelector(".email");
const category = document.querySelector(".category");
const phoneNum = document.querySelector(".phone");
const topic = document.querySelector(".topic");
const groupSize = document.querySelector(".size");
const registerPage = document.querySelectorAll(".registration");
const regImg = document.querySelector(".regular");

// FETCHING CATEGORY
let ID;
//DISCLAIMER: as at time of upload i haven't properly learnt my javaScript promises so pls be gentle😪
const getCategory = function (category, field, arr, mainObject) {
  fetch("https://backend.getlinked.ai/hackathon/categories-list")
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      const obj = data?.find((el) => el.name === category);
      ID = obj?.id;

      if (data) {
        // displays success modal
        successModal.classList.remove("invisible");
        overlay.classList.remove("invisible");

        // clears inputs
        arr.forEach(function (el) {
          el.value = "";
        });
        checkbox.checked = false;
        mainObject.category = Number(ID);
      }
      // submitForm(mainObject);
      return fetch("https://backend.getlinked.ai/hackathon/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mainObject),
      });
    })
    .catch(function (err) {
      // IF SERVER WAS WORKING
      // field.value = "";
      // field.style.border = "1px solid #d434fe";
      // field.setAttribute("placeholder", "pls check your internet");
    });
};

// still learning about promises 😅
// const submitForm = function (mainObject) {
//   fetch("https://backend.getlinked.ai/hackathon/registration", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(mainObject),
//   });
// };

/////////////////////
// DEFAULT LOAD animation
const fadeIn = function () {
  registerPage.forEach((el) => el.classList.remove("fade-in"));
};
fadeIn();

const fadeOut = function () {
  regImg.classList.remove("fade-out");
};
fadeOut();

// SUBMIT
registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const arr = [...registrationInputs];

  // warning message for empty input or unchecked checkbox
  const inputValues = arr.map((el) => el.value);
  if (inputValues.some((el) => el === "") || checkbox.checked === false) {
    warning.classList.remove("invisible");

    arr.forEach(function (el) {
      if (el.value === "") {
        el.style.border = "1px solid #d434fe";
      }
    });
  } else {
    warning.classList.add("invisible");
  }

  // sets input border back to white if filled
  arr.forEach(function (el) {
    if (el.value) {
      el.style.border = "1px solid white";
    }
  });

  // returns if there's any empty input field
  if (inputValues.some((el) => el === "") || checkbox.checked === false) return;

  // displays success modal and uploads data if all conditions are met
  if (
    successModal.classList.contains("invisible") &&
    checkbox.checked === true
  ) {
    // successModal.classList.remove("invisible");
    // overlay.classList.remove("invisible");
    registerBtn.textContent = "Sending, please wait...";

    // const obj = {
    //   email: email.value,
    //   phone_number: phoneNum.value,
    //   team_name: groupName.value,
    //   group_size: Number(groupSize.value),
    //   project_topic: topic.value,
    //   privacy_policy_accepted: true,
    // };

    // getCategory(category.value, category, arr, obj);
  }

  // SUCCESS MODAL DELAY
  setTimeout(function () {
    successModal.classList.remove("invisible");
    overlay.classList.remove("invisible");
    registerBtn.textContent = "Register Now";

    // clears input field after submission
    arr.forEach(function (el) {
      el.value = "";
    });
    checkbox.checked = false;
  }, 3500);
});

// CLOSE SUCCESS MODAL
successModalBack.addEventListener("click", function (e) {
  e.preventDefault();

  if (!successModal.classList.contains("invisible")) {
    successModal.classList.add("invisible");
    overlay.classList.add("invisible");
  }
});

// NAV--HOVER EFFECT
nav.addEventListener("mouseover", function (e) {
  navLinks.forEach(function (el) {
    if (e.target.classList.contains("main_link") && el !== e.target) {
      el.style.opacity = 0.5;
    }
  });
});

nav.addEventListener("mouseout", function (e) {
  navLinks.forEach(function (el) {
    if (e.target.classList.contains("main_link") && el !== e.target) {
      el.style.opacity = 1;
    }
  });
});

// HIDDEN SIDE--NAV
const openHiddenNav = function () {
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

// OPEN AND CLOSE SIDE NAV EVENT LISTENERS
hamburgerContainer.addEventListener("click", openHiddenNav);

hiddenNavCloseButton.addEventListener("click", closeHiddenNav);

overlay.addEventListener("click", closeHiddenNav);
