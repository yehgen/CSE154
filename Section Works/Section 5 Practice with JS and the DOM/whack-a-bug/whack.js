/*
 * CSE 154 Section Exercise - Whack a Bug
 * Allows the user to start games of Whack a Bug, and handles whacking bugs.
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Sets up event listeners for the start button and the bugs.
   */
  function init() {
    id("start").addEventListener("click", startGame);
    let bugs = qsa("#bug-container img");
    for (let i = 0; i < bugs.length; i++) {
      bugs[i].addEventListener("click", whackBug);
    }
  }

  /**
   * Reveals the game view, hides some of the bugs, and starts the game.
   * On repeat games, the score is reset and the bugs are unwhacked.
   */
  function startGame() {
    id("game").classList.remove("hidden");
    let bugs = qsa("#bug-container img");
    for (let i = 0; i < bugs.length; i++) {
      bugs[i].src = "bug.png";
      let chance = Math.random();
      if(chance > 0.75) {
        bugs[i].classList.add("hidden");
      } else {
        bugs[i].classList.remove("hidden");
      }
      bugs[i].classList.remove("whacked");
    }
    id("score").textContent = "0";
  }

  /**
   * whacks the clicked bug and increments the score. The bug cannot be whacked again afterwards.
   */
  function whackBug() {
    if(!this.classList.contains("whacked")) {
      this.classList.add("whacked");
      this.src = "bug-whacked.png";
      let score = id("score");
      score.textContent = parseInt(score.textContent) + 1;
    }
  }

/* --- CSE 154 HELPER FUNCTIONS --- */
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();

