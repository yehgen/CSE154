/*
 * CSE 154 Section Exercise - Tier List Maker
 * Defines functionality of forms, switching views, and editing the tier-list
 * for the CSE 154 tier list maker website.
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Sets up event-listeners on buttons and form-elements.
   */
  function init() {
    id("make-list").addEventListener("click", makeList);
    id("row-count").addEventListener("change", makeInputs);
    id("add-item").addEventListener("click", makeItem);
    id("go-back").addEventListener("click", toggleViews);
  }

  /**
   * Builds an empty tier-list based on user parameters and switches views to it.
   * Also populates the tiers in the maker fieldset.
   */
  function makeList() {
    id("tier-list").textContent = "";
    id("tier-select").textContent = "";
    let rows = qsa("#row-names input");
    for (let i = 0; i < rows.length; i++) {
      let rowId = "tier-" + i;
      let tierRow = generateTierRow(rows[i].value, rowId);
      id("tier-list").appendChild(tierRow);
      let tierOption = generateTierOption(rows[i].value, rowId);
      id("tier-select").appendChild(tierOption);
    }
    toggleViews();
  }

  /**
   * Toggles the hidden class on both views to switch perspectives.
   */
  function toggleViews() {
    id("maker").classList.toggle("hidden");
    id("setup").classList.toggle("hidden");
  }

  /**
   * Generates and returns a tier-row element with the given rowName
   * @param {string} rowName - The name of the tier-row.
   * @param {string} rowId - The id for the tier-items element to reference when adding items.
   * @returns {object} - The tier-row DOM element.
   */
  function generateTierRow(rowName, rowId) {
    let tierRow = document.createElement("div");
    tierRow.classList.add("tier-row");

    let tierName = document.createElement("p");
    tierName.textContent = rowName;
    tierName.classList.add("tier-name");
    tierRow.appendChild(tierName);

    let tierItems = document.createElement("div");
    tierItems.classList.add("tier-items");
    tierItems.id = rowId;
    tierRow.appendChild(tierItems);

    return tierRow;
  }

  /**
   * Generates and returns an option element for the maker select with the given rowName
   * @param {string} rowName - The name of the tier.
   * @param {string} rowId - The id of the tier-items element associated with this option
   * @returns {object} - The option DOM element.
   */
  function generateTierOption(rowName, rowId) {
    let tierOption = document.createElement("option");
    tierOption.textContent = rowName;
    tierOption.value = rowId;
    return tierOption;
  }

  /**
   * Updates the inputs in the setup fieldset to equal the number of rows.
   */
  function makeInputs() {
    let numRows = id("row-count").value;
    id("row-names").textContent = "";
    for (let i = 0; i < numRows; i++) {
      let input = document.createElement("input");
      input.type = "text";
      id("row-names").appendChild(input);
    }
  }

  /**
   * Creatse a tier-item based on user-supplied parameters, and hooks up the item's
   * event listeners. Then adds it to the page.
   */
  function makeItem() {
    let itemName = id("item-name").value;
    let itemSrc = id("item-image").value;
    let itemTier = id("tier-select").value;
    let tierItem = generateTierItem(itemName, itemSrc);
    tierItem.addEventListener("click", populateItemParameters);
    tierItem.addEventListener("dblclick", removeTierItem);
    id(itemTier).appendChild(tierItem);
  }

  /**
   * Creates a tier item img element with the given name alt text and src image.
   * @param {string} name - The name of the item, to be stored in the alt text.
   * @param {string} src - The source of the image.
   * @returns {object} - The DOM element of the tier item image.
   */
  function generateTierItem(name, src) {
    let tierItem = document.createElement("img");
    tierItem.src = src;
    tierItem.alt = name;
    return tierItem;
  }

  /**
   * Populates the maker fieldset form elements with the properties of the clicked item.
   */
  function populateItemParameters() {
    id("item-name").value = this.alt;
    id("item-image").value = this.src;
    id("tier-select").value = this.parentNode.id;
  }

  /**
   * Removes the double-clicked item from the tier-list.
   */
  function removeTierItem() {
    this.parentNode.removeChild(this);
  }

  /* --- CSE 154 HELPER FUNCTIONS --- */
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} - The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();

