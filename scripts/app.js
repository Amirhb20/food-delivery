"use strict";
//varibale
const navToggleIcon = document.querySelector(".nav-toggle__icon");
const menu = document.querySelector(".menu-list");
const cover = document.querySelector(".cover");
//open & close mobile menu
navToggleIcon.addEventListener("click", function () {
  this.classList.toggle("nav__toggle-icon--open");
  menu.classList.toggle("menu-list--show");
  cover.classList.toggle("cover--show");
});
