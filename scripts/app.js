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
// Scroll to a section when its menu item is clicked
const scrollOffset = 150; // space left above a section for the fixed header

menuListItems.forEach((menuListItem) => {
  menuListItem.addEventListener("click", function (e) {
    e.preventDefault();

    let sectionId = menuListItem.getAttribute("data-section");
    let sectionOffserTop = document.querySelector(`.${sectionId}`).offsetTop;

    window.scrollTo({
      top: sectionOffserTop - scrollOffset,
      behavior: "smooth",
    });
  });
});

// Highlight the menu item of the section being viewed (always exactly one)
function updateActiveMenuItem() {
  // The current section is the last one whose top has passed this line
  const activationLine = Math.max(scrollOffset + 10, window.innerHeight * 0.35);
  let currentSection = sections[0];

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= activationLine) {
      currentSection = section;
    }
  });

  // At the end of the page the last section may never reach the line
  const pageBottom = document.documentElement.scrollHeight - 2;
  if (window.scrollY + window.innerHeight >= pageBottom) {
    currentSection = sections[sections.length - 1];
  }

  menuListItems.forEach((menuListItem) => {
    menuListItem.classList.toggle(
      "menu-list__item--active",
      currentSection.classList.contains(menuListItem.dataset.section),
    );
  });
}

window.addEventListener("scroll", updateActiveMenuItem, { passive: true });
window.addEventListener("resize", updateActiveMenuItem);
// Filtering and searching change the page height without a scroll event
new ResizeObserver(updateActiveMenuItem).observe(
  document.querySelector("main"),
);

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
    var titleText = titleEl.textContent
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
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
