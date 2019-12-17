/*
 * Name: Generous Yeh
 * Date: October 16, 2019
 * Section: CSE 154 AH
 *
 * This is the JS to reveal a list after a button is clicked and also to hide the clicked button
 * to prevent it from being clicked numerous times.
 */

"use strict";

(function() {
  // any module-globals (limit the use of these when possible)
  window.addEventListener("load", init);

  /**
   * waits for a click to be performed on the button before revealing a list of hackathons and
   * hiding the clicked button
   */
  function init() {
    id("unhideButton").addEventListener("click", showHackathons);
  }

  /**
   * allows the list of hackathons to be seen by the user
   * hides the button from the user's view
   */
  function showHackathons() {
    id("hackathonList").classList.remove("hidden"); // reveals the hidden hackathon list
    id("unhideButton").classList.add("hidden"); // removes the button from view
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
