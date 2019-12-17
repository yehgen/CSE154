/*
 * Name: Generous Yeh
 * Date: October 16, 2019
 * Section: CSE 154 AH
 *
 * This is the JS to read user input on their activities and display their schedule on the same
 * screen with my given list of activities while also ensuring that they fill out both inputs
 * or else the submit button will be disabled.
 */

"use strict";

(function() {
  // any module-globals (limit the use of these when possible)
  window.addEventListener("load", init);

  /**
   * builds the club data when user input is submitted and also double checks to make sure both
   * inputs are filled in by the user before allowing them to submit
   */
  function init() {
    id("generateList").addEventListener("click", buildClubData);
    id("listTitle").addEventListener("input", ensureTitleAndSched);
    id("listTime").addEventListener("input", ensureTitleAndSched);
  }

  /**
   * creates a list storing user input for a title and schedule
   * after accepting user input, reset the input to take in more sets if necessary and
   * blocks the user from submitting until they give input
   */
  function buildClubData() {
    // take user input for club title and schedules and store them in variables
    let inputTitle = id("listTitle");
    let inputSchedule = id("listTime");

    // generate the title
    let clubTitle = createTitle(inputTitle.value);
    let clubDescript = createSchedule(inputSchedule.value);
    let clubData = document.createElement("li");
    id("userList").appendChild(clubData);
    clubData.appendChild(clubTitle);
    clubData.appendChild(clubDescript);

    id("userList").appendChild(clubData); // append to doc

    // reset fields to empty
    inputTitle.value = "";
    inputSchedule.value = "";

    // makes submit button unusable after submission due to empty input
    id("generateList").setAttribute("disabled", "disabled");
  }

  /**
   * uses user input to create a heading title of the club
   * @param {string} inputTitle - user's input for the title
   * @returns {h1} clubTitle - heading displaying the user's given input
   */
  function createTitle(inputTitle) {
    let clubTitle = document.createElement("h1");
    let clubName = document.createTextNode(inputTitle);
    clubTitle.appendChild(clubName);
    return clubTitle;
  }

  /**
   * uses user input to create a heading title of the club
   * @param {string} inputSchedule - user's input for the schedule for a club
   * @returns {p} - paragraph displaying the user's given schedule of the club
   */
  function createSchedule(inputSchedule) {
    let clubDescript = document.createElement("p");
    let clubSchedule = document.createTextNode(inputSchedule);
    clubDescript.appendChild(clubSchedule);
    return clubDescript;
  }

  /**
   * checks to see if both input fields have text from user, if so allows the user to submit,
   * and if not, does not allow the user to submit
   */
  function ensureTitleAndSched() {
    let inputTitle = id("listTitle");
    let inputSchedule = id("listTime");
    if (inputTitle.value !== "" && inputSchedule.value !== "") {
      id("generateList").removeAttribute("disabled");
    }
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
