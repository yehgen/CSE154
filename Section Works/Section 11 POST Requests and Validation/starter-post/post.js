/*
 * CSE 154
 * Summer 2019
 * Post Example
 */

// All you should need to do is make a POST request to the API with rainbowdash's username and
// password as you did in Postman. (username: rainbowdash, password: ponyta)

"use strict";
(function() {

  const API_URL = "https://courses.cs.washington.edu/courses/cse154/webservices/postmantest/postwithparams.php";

  window.addEventListener("load", init);

  /**
   * setup the sign-in button on inital page load
   */
  function init() {
    id("sign-in").addEventListener("click", signIn);
  }

  /**
   * Signs the user in based on username and password inputs
   */
  function signIn() {
    let data = new FormData();
    data.append("user", id("username").value);
    data.append("password", id("password").value);
    fetch(API_URL, {method: "POST", body: data})
      .then(checkStatus)
      .then(resp => resp.text())
      .then(response => {
        id("response").textContent = response;
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
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }
})();

