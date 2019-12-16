/**
 * CSE 154
 * Section 9 | Recipes (Starter Template)
 */

// Given this recipe-starter.zip (HTML, CSS, and JS module template), add ajax to the recipe.js that
// fetches and displays recipe information on the page whenever a different recipe radio button is selected.

"use strict";
(function() {
  const RECIPES_URL = "https://courses.cs.washington.edu/courses/cse154/webservices/recipe/recipe.php";

  window.addEventListener("load", init);

  /**
   * When the window loads, get all of the recipe buttons and set them up
   * to show their recipes when clicked.
   */
  function init() {
    let recipes = document.querySelectorAll("input");
    for (let i = 0; i < recipes.length; i++) {
      recipes[i].addEventListener("click", showRecipe);
    }
    recipes[0].click();
  }

  /**
   * Get the recipe of the button clicked and append it to the page.
   */
  function showRecipe() {
    id("recipe-area").textContent = "";
    let url = RECIPES_URL + "?recipe=" + this.value;
    fetch(url)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(appendToPage)
      .catch(console.error);
  }

  /**
   * Appends the given recipe data to the page.
   * @param {object} response - json object representing various recipe information to
   *                   add to page.
   */
  function appendToPage(response) {
    let recipeArea = id("recipe-area");
    let img = gen("img");
    let info = response.recipe.information;

    img.src = info.image;
    img.alt = info.name;
    recipeArea.appendChild(img);

    let title = gen("h1");
    title.textContent = img.alt;
    recipeArea.appendChild(title);

    let description = gen("p");
    description.textContent = info.description.text;
    recipeArea.appendChild(description);

    let ingredientListTitle = gen("h2");
    ingredientListTitle.textContent = "Ingredients:";
    recipeArea.appendChild(ingredientListTitle);

    let list = gen("ul");
    let ingredients = response.recipe.ingredients.item;

    for (let i = 0; i < ingredients.length; i++) {
      let li = gen("li");
      li.textContent = ingredients[i].text;
      list.appendChild(li);
    }
    recipeArea.appendChild(list);
  }

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
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns a new DOM element with the given tag name (if one exists). If el is not
   * a correct tag name, returns undefined.
   * @param {string} el - tag name
   * @return {object} newly-created DOM object of given tag type
   */
  function gen(el) {
    return document.createElement(el);
  }
})();