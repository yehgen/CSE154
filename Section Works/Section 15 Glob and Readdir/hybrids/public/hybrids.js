/**
 *  Section 14: Hybrids
 *
 *  Original credit: Kyle Thayer, Spring 2017
 *
 *  Provided JS code for Hybrids exercise.
 *  This script populates the hybrids.html page with images containing
 *  the word given in the text input box when the "find hybrids" button is clicked,
 *  and all images in the images folder when the "show all" button is clicked.
 */
"use strict";
(function() {

  const ALL_URL = "/animals/category/all";

  window.addEventListener("load", init);

  /**
   * Set up submit buttons to fetch data from regexhydbrids.php when clicked.
   */
  function init() {
    id("submit-one").addEventListener("click", function() {
      makeRequest("/animal/" + id("animal").value);
    });
    id("submit-all").addEventListener("click", function() {
      makeRequest(ALL_URL);
    });
  }

  /**
   * Makes a request to the API with the given
   * endpoint, then populates the results div with result image
   * paths if the request was successful.
   * @param {string} url - Endpoint to fetch from.
   */
  function makeRequest(url) {
    id("results").innerHTML = "";
    fetch(url)
      .then(checkStatus)
      .then(resp => resp.text())
      .then(displayResults)
      .catch(handleRequestError);
  }

  /**
   * Populates results area with hybrid animal images given in responseText.
   *
   * @param {string} responseText - response containing image source paths for hybrid photos of
   * input animal.
   */
  function displayResults(responseText) {
    if (!responseText) {
      handleRequestError();
    } else {
      let resultsHead = document.createElement("h2");
      let resultMsg = "Hybrid results for ";
      if (id("animal").value) {
        resultMsg += id("animal").value;
      } else {
        resultMsg += "all hybrids";
      }
      resultsHead.textContent = resultMsg + ":";
      id("results").appendChild(resultsHead);

      let images = responseText.split("\n");
      for (let i = 0; i < images.length; i++) {
        let img = document.createElement("img");
        img.src = images[i];
        img.alt = "Hybrid animal image";
        id("results").appendChild(img);
      }
      id("error-msg").classList.add("hidden"); // hide any previous error message
    }
  }

  /**
   * Populates results area with user-friendly error message.
   */
  function handleRequestError() {
    id("results").innerHTML = "";
    id("error-msg").classList.remove("hidden");
  }

  // ------------------------- HELPER FUNCTIONS ------------------------- //
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID.
   * @return {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
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

})();
