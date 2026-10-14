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

    // Re-apply the current search query to the newly visible panel
    applyMenuSearch();
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

// ---- Menu search ----

const menuSearchInput = document.getElementById("menu-search-input");
const menuNoResults = document.getElementById("menu-no-results");

/**
 * Filter the cards inside the currently active .menu-food panel by the
 * search query. Cards whose title does not contain the query (case-insensitive,
 * trimmed) are hidden. The no-results message is shown when no cards match.
 *
 * Integrates with the existing category filter: the active panel is determined
 * by the .menu-food--show class, so switching categories and then searching
 * (or vice versa) always work together.
 */
function applyMenuSearch() {
  var query = menuSearchInput.value.trim().toLowerCase();

  // Find the currently visible category panel
  var activePanel = document.querySelector(".menu-food--show");
  if (!activePanel) {
    return;
  }

  // Each direct card wrapper is a column div (col-12 col-sm-6 …)
  var cardColumns = activePanel.querySelectorAll(".food-card");
  var visibleCount = 0;

  cardColumns.forEach(function (card) {
    var titleEl = card.querySelector(".food-content-title");
    // Guard: if a card has no title element, keep it visible
    if (!titleEl) {
      card.parentElement.style.display = "";
      visibleCount++;
      return;
    }

    // textContent trims any invisible Unicode characters (e.g. the ZWNBSP
    // present in some titles in the HTML) by collapsing whitespace.
    var titleText = titleEl.textContent.replace(/\s+/g, " ").trim().toLowerCase();
    var matches = query === "" || titleText.includes(query);

    // Show/hide the column wrapper that contains this card
    card.parentElement.style.display = matches ? "" : "none";
    if (matches) {
      visibleCount++;
    }
  });

  // Show the no-results message only when a non-empty query yields no matches
  if (query !== "" && visibleCount === 0) {
    menuNoResults.removeAttribute("hidden");
  } else {
    menuNoResults.setAttribute("hidden", "");
  }
}

menuSearchInput.addEventListener("input", applyMenuSearch);
