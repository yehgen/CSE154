/**
 * CSE 154 Summer 2019
 * Week 8 Section
 * Numbers API Example
 *
 * Fetches trivia about a number a user inputs (or random if they click the "Fetch Random
 * Number Fact!" button) and displays the trivia on the page.
 */

// Given a starter numbers.html, write a JavaScript program numbers.js to take an integer value
// from a number text box and fetch a trivia fact about that number when the "Fetch Number Fact!" 
// button is clicked, displaying the result text in the #output paragraph.
// If the button is clicked but the text input is empty, or the "Fetch Random Number Fact!" 
// button is clicked, a random number trivia fact should be fetched and displayed.
"use strict";
(function() {
  const URL = "http://numbersapi.com/";

  window.addEventListener("load", init);

  /**
   * Sets up event listeners for fetching number trivia.
   */
  function init() {
    id("fetch-num").addEventListener("click", function() {
      let input = id("num-box").value;
      if (input) {
        fetchNum(input);
      } else {
        fetchNum("random");
      }
    });
    id("fetch-random-num").addEventListener("click", function() {
      fetchNum("random");
    });
  }

  /**
   * Fetches trivia data about the given numberValue and displays it on the page if
   * successful, logging an error to the console if an error occurred during the request.
   * @param {int} numberValue - value of number to request trivia for.
   */
  function fetchNum(numberValue) {
    let url = URL + numberValue;
    fetch(url)
      .then(checkStatus)
      .then(resp => resp.text())
      .then(showTriviaResult)
      .catch(console.error);
  }

  /**
   * Displays the trivia result response to the #output paragraph.
   * @param {string} response - response string from Numbers API request
   */
  function showTriviaResult(response) {
    id("output").textContent = response;
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
})();