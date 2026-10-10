"use strict";
//varibale
const navToggleIcon = document.querySelector(".nav-toggle__icon");
const menu = document.querySelector(".menu-list");
const cover = document.querySelector(".cover");
const pricingPlus = document.querySelector(".pricing-icon__plus");
const pricingNumber = document.querySelector(".pricing-order__number");
const pricingMin = document.querySelector(".pricing-icon__min");
const foodListItems = document.querySelectorAll(".food-list__item");
const menuListItems = document.querySelectorAll(".menu-list__item");
const sections = document.querySelectorAll("main > section");
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
menuListItems.forEach((menuListItem) => {
  menuListItem.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(".menu-list__item--active")
      .classList.remove("menu-list__item--active");
    menuListItem.classList.add("menu-list__item--active");

    let sectionId = menuListItem.getAttribute("data-section");
    let sectionOffserTop = document.querySelector(`.${sectionId}`).offsetTop;

    window.scrollTo({
      top: sectionOffserTop - 150,
      behavior: "smooth",
    });
  });
});

const observer = new IntersectionObserver(observerHandler, {
  threshold: 0.5,
});

function observerHandler(allSections) {
  allSections.map((section) => {
    let sectionClassName = section.target.className;
    let sectionMenuItem = document.querySelector(
      `.menu-list__item[data-section=${sectionClassName}]`,
    );
    if (section.isIntersecting) {
      sectionMenuItem.classList.add("menu-list__item--active");
    } else {
      sectionMenuItem.classList.remove("menu-list__item--active");
    }
  });
}

sections.forEach((section) => {
  observer.observe(section);
});
