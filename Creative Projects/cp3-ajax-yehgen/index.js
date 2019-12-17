/**
 * Name: Generous Yeh
 * Date: October 30, 2019
 * Section: CSE 154 AH
 * TA: Valerie Remaker
 *
 * This is the index.js for my taco website which adds functionality to my generate buttons and
 * also displays certain elements after specific interactions.
 */

"use strict";

(function() {
  const BASE_URL = "https://taco-randomizer.herokuapp.com/";

  window.addEventListener("load", init);

  /**
   * uses the taco randomizer data to generate a recipe after the first generate taco button is
   * clicked or when the user wants to get a new recipe and clicks to get seconds
   */
  function init() {
    id("first-taco").addEventListener("click", fetchTheData);
    id("more-taco").addEventListener("click", fetchTheData);
  }

  /**
   * uses the taco randomizer API to receive ingredient data
   */
  function fetchTheData() {
    fetch(BASE_URL + "random/")
      .then(checkStatus)
      .then(response => response.json())
      .then(processResponse)
      .catch(handleError);
  }

  /**
   * processes the taco ingredient data and encourages users to try new recipes after each
   * taco, the initial generate taco button will be disabled as the option for "seconds" is
   * enabled for the user to generate new ingredients.
   * @param {object} data - taco ingredient information
   */
  function processResponse(data) { // success: do something with the response data }
    let main = "Main Course";
    let seconds = "Another Taco!";
    let mainTaco = id("first-taco");
    let additionalTaco = id("more-taco");

    if (mainTaco.disabled === false) {
      tacoRecipe(data, main, "generated");
      mainTaco.removeEventListener("click", fetchTheData);
      mainTaco.disabled = true;
      additionalTaco.disabled = false;
      id("hungry").classList.remove("hidden");
    } else {
      additionalTaco.addEventListener("click", fetchTheData);
      tacoRecipe(data, seconds, "result");
    }
  }

  /**
   * generates a list of the basic ingredients for a taco and adds it to the website
   * @param {object} data - taco ingredient information
   * @param {string} course - type of meal for said taco, i.e. main course
   * @param {object} location - id of the location that the text will be inputted in
   */
  function tacoRecipe(data, course, location) {
    let taco = document.createElement("ul");
    let tacoName = document.createElement("h1");
    let tacoBase = document.createElement("li");
    let tacoShell = document.createElement("li");
    let tacoSeason = document.createElement("li");
    let tacoMix = document.createElement("li");
    let tacoCond = document.createElement("li");

    tacoName.textContent = course;
    tacoBase.textContent = "Base: " + data.base_layer.name;
    tacoShell.textContent = "Shell: " + data.shell.name;
    tacoSeason.textContent = "Seasoning: " + data.seasoning.name;
    tacoMix.textContent = "Mix-ins: " + data.mixin.name;
    tacoCond.textContent = "Condiment: " + data.condiment.name;

    taco.appendChild(tacoBase);
    taco.appendChild(tacoShell);
    taco.appendChild(tacoSeason);
    taco.appendChild(tacoMix);
    taco.appendChild(tacoCond);
    id(location).appendChild(tacoName);
    id(location).appendChild(taco);
  }

  /**
   * displays an error message to the user if trouble arises
   * @param {object} err - the error, or issue at hand
   */
  function handleError(err) {
    let firstTaco = id("first-taco");
    let moreTacos = id("more-taco");
    let errorMessage = document.createElement("h1");
    let realError = document.createElement("p");
    let tacoItems = id("generated");
    let content = id("result");

    content.classList.add("hidden");
    firstTaco.remove();
    moreTacos.remove();

    errorMessage.textContent = "Something went wrong, try again later.";
    realError.textContent = err;
    tacoItems.textContent = "";
    tacoItems.appendChild(errorMessage);
    tacoItems.appendChild(realError);
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
