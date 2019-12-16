/**
 * CSE 154
 * Summer 2019
 * Mowgli's Cafe
 */

// You will implement submitting an order to the cafe webservice, first verifying that the user
// has entered their order information correctly. This can be done with JavaScript validation 
// and/or HTML form element attributes.

"use strict";
(function() {

  const URL = "https://courses.cs.washington.edu/courses/cse154/webservices/mowgliscafe/mowgliscafe.php";
  const TAX_MULTIPLIER = 1.08;
  const SIZE_RATIOS = {"12oz": 1, "16oz": 1.25, "20oz": 1.4};

  window.addEventListener("load", initialize);

  /**
   * Initialize the page, populating the menu and overriding the default
   * behavior of the form submission.
   */
  function initialize() {
    fetchMenu();
    id("order-form").addEventListener("submit", function(evt) {
      evt.preventDefault();
      submitForm();
    });
  }

  /**
   * Submits the order information on the page to the server.
   */
  function submitForm() {
    let body = new FormData();
    body.append("price", parseFloat(id("totalcost").textContent));
    body.append("drink", qs("input[name=drinks]:checked").value);
    body.append("drinksize", qs("input[name=drinksize]:checked").value);
    body.append("food", qs("input[name=bakery]:checked").value);
    body.append("tip", id("tip").value);
    body.append("address", id("address").value);
    body.append("city", id("city").value);
    body.append("state", id("state").value);
    fetch(URL, {method: "POST", body: body})
      .then(checkStatus)
      .then(resp => resp.text())
      .then(text => {
        id("submit-results").textContent = text;
      })
      .catch(console.error);
  }

  /**
   * Fetch and populate the whole menu of Mowgli's cafe on the page.
   */
  function fetchMenu() {
    fetch(URL + "?menu=all")
      .then(checkStatus)
      .then(resp => resp.json())
      .then(populateMenu)
      .catch(console.error);
  }

  /**
   * Once the fetch returns (from the checkStatus and JSON.parse), it arrives here
   * to populate the menus. For now populate both drinks and bakery menus
   * @param {object} responseData - menu data returned from Menu API
   */
  function populateMenu(responseData) {
    populate("Drinks", responseData.Drinks);
    populateDrinkSizes();
    populate("Bakery", responseData.Bakery);
  }

  /**
   *  Populate one category/subcategory of the menu.
   *  Goes through subcategories of the category and generates all of the items.
   *  @param {string} category - the category we're generating items in
   *  @param {string} subcats - the list of subcategories we're generating items in .
   */
  function populate(category, subcats) {
    let fieldset = gen("fieldset");
    fieldset.id = category.toLowerCase();
    let legend = gen("legend");
    legend.textContent = category;
    fieldset.appendChild(legend);
    for (let i = 0; i < subcats.length; i++) {
      let cat = subcats[i].category;
      let items = subcats[i].items;
      let head = gen("div", "col-head");
      let title = genText("p", cat);
      let priceElement = genText("p", "Price (id)");
      let hr = gen("hr");
      head.appendChild(title);
      head.appendChild(priceElement);
      fieldset.appendChild(head);
      fieldset.appendChild(hr);
      for (let j = 0; j < items.length; j++) {
        let name = items[j]["name"];
        let price = items[j]["price"];
        let itemDiv = genItem(fieldset.id, name, name, price);
        fieldset.appendChild(itemDiv);
      }
    }
    id("menu-container").appendChild(fieldset);
  }

  /**
   * Helper method to populate the drink sizes on the menu.
   */
  function populateDrinkSizes() {
    let fieldset = id("menu-container").querySelector("#drinks");
    let head = gen("div", "col-head");
    let title = genText("p", "Size Options");
    let price = genText("p", "Price (id)");
    let hr = gen("hr");
    head.appendChild(title);
    head.appendChild(price);
    fieldset.appendChild(head);
    fieldset.appendChild(hr);
    for (let size in SIZE_RATIOS) {
      let priceText = SIZE_RATIOS[size] === 1 ? "listed price" :
        "(" + parseFloat(SIZE_RATIOS[size]).toFixed(2) + "x listed price)";
      fieldset.appendChild(genItem("drinksize", size, size, priceText));
    }
  }

  /**
   * Updates the total order price when an item is added to the order.
   */
  function updatePrice() {
    let drinkChoice = id("menu-container").querySelector("input[name='drinks']:checked");
    let drinkPrice = 0;
    if (drinkChoice) {
      drinkPrice = drinkChoice.getAttribute("price");
      if (drinkPrice > 0) {
        if (!id("menu-container").querySelector("input[name='drinksize']:checked")) {
          qsa("input[value='12oz']").checked = "checked";
        }
        let checked = id("menu-container").querySelector("input[name='drinksize']:checked");
        let drinkSize = checked.value;
        drinkPrice *= SIZE_RATIOS[drinkSize];
      }
    }
    let bakeryPrice = 0;
    let bakeryChoice = id("menu-container").querySelector("input[name='bakery']:checked");
    if (bakeryChoice) {
      bakeryPrice = bakeryChoice.getAttribute("price");
    }
    let price = parseFloat(drinkPrice) + parseFloat(bakeryPrice);
    let priceWithTax = price * TAX_MULTIPLIER;
    let totalCost = priceWithTax + (parseFloat(id("tip").value ? id("tip").value : 0));
    totalCost = totalCost.toFixed(2);
    id("cost").textContent = price.toFixed(2);
    id("totalcost").textContent = totalCost;
  }

  /**
   * Generates an input element for the cafe menu.
   * @param {string} inputName - the name of the input elements
   * @param {string} value - the value attached to this input element
   * @param {string} name - the name (label) of the input
   * @param {string} price - the price of the item
   * @returns {object} the DOM element created
   */
  function genItem(inputName, value, name, price) {
    let itemDiv = gen("div", "item");
    let label = gen("label");
    let input = gen("input");
    input.type = "radio";
    input.name = inputName;
    input.value = value;

    // If at least one radio button in a group is required, the radio buttons are required.
    input.required = true;
    input.setAttribute("price", price);
    input.addEventListener("click", updatePrice);
    label.appendChild(input);
    let nameText = document.createTextNode(name);
    label.appendChild(nameText);
    let span = gen("span", "price");
    span.textContent = price;
    itemDiv.appendChild(label);
    itemDiv.appendChild(span);
    return itemDiv;
  }

  // ------------------------- Helper Functions ------------------------- //
  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response; // a Response object
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} sel - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(sel) {
    return document.querySelectorAll(sel);
  }

  /**
   * Generates an element with a specific (optional) classlist
   * @param {string} el - the string name of the element to create
   * @param {string|array} classes - a list of classes to attach to this object.
   * @returns {object} the DOM element created
   */
  function gen(el, classes = "") {
    let element = document.createElement(el);
    if (classes instanceof Array) {
      for (let cl in classes) {
        element.classList.add(cl);
      }
    } else {
      element.className = classes;
    }
    return element;
  }

  /**
   * Generates an document element with a specific inner text
   * @param {string} el - the string name of the element to create
   * @param {string} text - the text to set the textContent to
   * @returns {object} - the DOM element created with the text
   */
  function genText(el, text) {
    let element = document.createElement(el);
    element.textContent = text;
    return element;
  }
})();