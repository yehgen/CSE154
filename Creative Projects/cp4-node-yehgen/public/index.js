/**
 * Name: Generous Yeh
 * Date: November 13, 2019
 * Section: CSE 154 AH
 * TA: Valerie Remaker
 *
 * This is the index.js for my an infomrational "workout supplements" page which generates a list
 * of information using information from a self made API based on the button(s) the user selects.
 */

"use strict";

(function() {
  window.addEventListener("load", init);

  /**
   * allows the user see a list of all supplements in the database, one random supplement, or the
   * natural methods by which to obtain specific substances.
   */
  function init() {
    id("show-all-btn").addEventListener("click", showAll);
    id("show-one-btn").addEventListener("click", showOne);
    id("natural-food-btn").addEventListener("click", showSources);
  }

  /**
   * fetch a list of all 9 supplements and display them all
   */
  function showAll() {
    fetch("/supplements")
      .then(checkStatus)
      .then(response => response.json())
      .then(listAll)
      .catch(handleError);
  }

  /**
   * fetch a list of all 9 supplements and display one
   */
  function showOne() {
    fetch("/supplements")
      .then(checkStatus)
      .then(response => response.json())
      .then(listOne)
      .catch(handleError);
  }

  /**
   * fetch a list of natural foods for all 9 supplements and display them all
   */
  function showSources() {
    fetch("/sources")
      .then(checkStatus)
      .then(response => response.text())
      .then(listSources)
      .catch(handleError);
  }

  /**
   * fetch a list of all 9 supplements and display them all
   * @param {object} data - json object representing supplement information
   */
  function listAll(data) {
    for (let i = 0; i < data.items.length; i++) {
      let containItems = document.createElement("ul");
      let items = document.createElement("li");
      items.textContent = data.items[i].name;
      let itemDescript = document.createElement("p");
      itemDescript.textContent = data.items[i].description;
      items.appendChild(itemDescript);
      containItems.appendChild(items);
      id("list").appendChild(containItems);
      id("show-all-btn").disabled = true;
      id("show-one-btn").disabled = true;
    }
  }

  /**
   * fetch a list of all 9 supplements and display a single one
   * @param {object} data - json object representing supplement information
   */
  function listOne(data) {
    let randomItem = data.items[Math.floor(Math.random() * data.items.length)].name;
    let randomDescript = data.items[Math.floor(Math.random() * data.items.length)].description;
    let containItems = document.createElement("ul");
    let items = document.createElement("li");
    items.textContent = randomItem;
    let itemDescript = document.createElement("p");
    itemDescript.textContent = randomDescript;
    items.appendChild(itemDescript);
    containItems.appendChild(items);
    id("list").appendChild(containItems);
  }

  /**
   * fetch a list of all supplements and possible resources
   * @param {object} data - json object representing natural foods for each supplement
   */
  function listSources(data) {
    data = data.split(/\n/);
    for (let i = 0; i < data.length - 1; i += 2) {
      let list = document.createElement("ul");
      let supplementName = document.createElement("li");
      let resourceList = document.createElement("ul");
      let resourceListItems = document.createElement("li");
      supplementName.textContent = data[i];
      resourceListItems.textContent = data[i + 1];
      list.appendChild(supplementName);
      supplementName.appendChild(resourceList);
      resourceList.appendChild(resourceListItems);
      id("natural").appendChild(list);
      id("natural-food-btn").disabled = true;
    }
  }

  /**
   * displays an error message to the user if trouble arises
   * @param {object} err - the error, or issue at hand
   */
  function handleError(err) {
    let errorMessage = document.createElement("h1");
    errorMessage.textContent = "Something went wrong, try again later. " + err;
    id("title").textContent = "";
    id("title").appendChild(errorMessage);
  }

  /**
   * returns the response's text if successful and throws an error if the response is not ok
   * @param {object} response - text to check for success or failure
   * @returns {object} - successful response text if available
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response; // a Response object
  }

  /**
   * Returns the element that has the ID attribute with the specified value
   * @param {string} name - element ID
   * @returns {object} - DOM object associated with id
   */
  function id(name) {
    return document.getElementById(name);
  }
})();
