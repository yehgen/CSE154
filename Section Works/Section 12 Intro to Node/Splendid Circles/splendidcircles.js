"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Setup event listeners for request buttons.
   */
  function init() {
    id("circle-btn").addEventListener("click", requestCircle);
  }

  /**
   * Makes a request to /math/circle/:r
   */
  function requestCircle() {
    let radius = id("radius-in").value;

    fetch("/math/circle/" + radius)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(resp => {
        id("circle-result").textContent = "Area: " + resp.area +
         ", Circumference: " + resp.circumference;
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