/**
 * CSE 154
 * Section 8 | Exercise 2 (Starter Template)
 *
 * A webpage for fetching cute pet photos. Puppies (the best) or
 * kitties will be populated on the page after the user selects their desired
 * pet type.
 */

// Given this ajaxpets-starter.zip (HTML, CSS, and JS template), create an AJAX-powered 
// gallery of pet images that allows you to switch between kitty and puppy images without 
// reloading the page.

"use strict";
(function() {

  const AJAX_PETS_URL = "https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php";

  window.addEventListener("load", init);

  /**
   * Sets up the radio buttons for the Ajax Pet Gallery for a user to select what type of
   * cute pet photos they want to see (they should of course, always pick puppies)
   */
  function init() {
    let radios = qsa("input[name='animal']");
    for (let i = 0; i < radios.length; i++) {
      radios[i].addEventListener("change", makeRequest);
    }
  }

  /**
   * Updates the photos displayed on the page based on the current pet selection, fetching the
   * photos from the AJAX Pets API.
   */
  function makeRequest() {
    let animal = this.value;

    fetch(AJAX_PETS_URL + "?animal=" + animal)
      .then(checkStatus)
      .then(resp => resp.text())
      .then(splitNewLines)
      .then(displayPictures)
      .catch(console.error);
  }

  /**
   * Returns an array resulting from splitting text response by newline characters.
   * @param {string} text - text to split by new lines
   * @returns {string[]} - array of strings split by newline
   */
  function splitNewLines(text) {
    return text.split("\n");
  }

  /**
   * Populates the pictures section of the page with the result images,
   * replacing any previous photos.
   * @param {string[]} imgs - array of pet image sources as strings
   */
  function displayPictures(imgs) {
    clearPictures();
    for (let i = 0; i < imgs.length; i++) {
      let imgPath = imgs[i];
      let img = document.createElement("img");
      img.src = imgPath;
      img.alt = "adorable friend";
      id("pictures").appendChild(img);
    }
  }

  /**
   * Clears any images in the photo gallery container.
   */
  function clearPictures() {
    let imgs = qsa("#pictures img");
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].parentNode.removeChild(imgs[i]);
    }
  }

  /* ------------------------------ Helper Functions  ------------------------------ */
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
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();