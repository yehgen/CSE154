"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Setup event listeners for request buttons.
   */
  function init() {
    id("hello-btn").addEventListener("click", requestHello);
    id("name-btn").addEventListener("click", requestName);
  }

  /**
   * Makes a request to /hello
   */
  function requestHello() {
    fetch("hello")
      .then(checkStatus)
      .then(resp => resp.text())
      .then(resp => {
        id("hello-result").textContent = resp;
      })
      .catch(console.error);
  }

  /**
   * Makes a request to /hello/name?name=name
   */
  function requestName() {
    let firstName = id("firstname-in").value;
    let lastName = id("lastname-in").value;

    fetch("/hello/name?first=" + firstName + "&last=" + lastName)
      .then(checkStatus)
      .then(resp => resp.text())
      .then(resp => {
        id("name-result").textContent = resp;
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