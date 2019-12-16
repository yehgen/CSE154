"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Setup event listeners for request buttons.
   */
  function init() {
    id("power-btn").addEventListener("click", requestExp);
  }

  /**
   * Makes a request to /math/:base^:exponent
   */
  function requestExp() {
    let base = id("base-in").value;
    let exponent = id("exponent-in").value;
    fetch("/math/power/" + base + "/" + exponent)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(resp => {
        id("power-result").textContent = resp.result;
      })
      .catch(console.error);
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
})();