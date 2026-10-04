"use strict";
//varibale
const navToggleIcon = document.querySelector(".nav-toggle__icon");
const menu = document.querySelector(".menu-list");
const cover = document.querySelector(".cover");
const pricingPlus = document.querySelector(".pricing-icon__plus");
const pricingNumber = document.querySelector(".pricing-order__number");
const pricingMin = document.querySelector(".pricing-icon__min");
const foodListItems = document.querySelectorAll(".food-list__item");
//open & close mobile menu
navToggleIcon.addEventListener("click", function () {
  this.classList.toggle("nav__toggle-icon--open");
  menu.classList.toggle("menu-list--show");
  cover.classList.toggle("cover--show");
});

// Handle order quantity increase and decrease
let number = Number(pricingNumber.textContent);

pricingPlus.addEventListener("click", () => {
  number++;
  pricingNumber.textContent = number;
});

pricingMin.addEventListener("click", () => {
  if (number > 0) {
    number--;
    pricingNumber.textContent = number;
  }
});
// Filter menu items by selected category
foodListItems.forEach((foodListItem) => {
  foodListItem.addEventListener("click", function () {
    document
      .querySelector(".food-list__item--active")
      .classList.remove("food-list__item--active");
    document
      .querySelector(".menu-food--show")
      .classList.remove("menu-food--show");
    foodListItem.classList.add("food-list__item--active");
    let contentId = foodListItem.getAttribute("data-content-id");
    document.querySelector(contentId).classList.add("menu-food--show");
  });
});
