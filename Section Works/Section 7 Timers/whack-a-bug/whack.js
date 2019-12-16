/*
 * CSE 154 Section Exercise - Whack a Bug Part 2
 * Allows the user to start games of Whack a Bug, and handles whacking bugs.
 * Also handles timing of the game and incrementing score
 */

"use strict";
(function() {
  let gameTimerId = null;
  let spawnTimerId = null;
  const GAME_LENGTH = 60;
  const BUG_IMG = "bug.png";
  const BUG_WHACKED = "bug-whacked.png";
  const BUG_CONTAINER_WIDTH = 1200;
  const BUG_CONTAINER_HEIGHT = 600;
  const BUG_SIZE = 75;

  window.addEventListener("load", init);

  /**
   * Sets up the event listener for the start button.
   */
  function init() {
    id("start").addEventListener("click", startGame);
  }

  /**
   * Reveals and clears the game view, resets the score, and begins the game by setting up timers.
   * Previously running games are stopped.
   */
  function startGame() {
    stopGame();
    let spawnRate = id("spawn-rate").value;
    let spawnCount = id("spawn-count").value;
    let despawnRate = id("despawn-rate").value;
    if (spawnRate === "" || spawnCount === "" || despawnRate === "") {
      id("error").textContent = "Some parameters are not filled in!";
      id("game").classList.add("hidden");
    } else if (spawnRate <= 0 || spawnCount <= 0 || despawnRate <= 0) {
      id("error").textContent = "Some parameters are 0 or less!";
      id("game").classList.add("hidden");
    } else {
      id("error").textContent = "";
      id("score").textContent = "0";
      id("timer").textContent = GAME_LENGTH;
      id("game").classList.remove("hidden");
      setupGameTimers(spawnRate, spawnCount, despawnRate);
    }
  }

  /**
   * Sets up the timing behavior for the game timer and the bug spawning.
   * @param {number} spawnRate - The number of miliseconds between spawns.
   * @param {number} spawnCount - The number of bugs per spawn.
   * @param {number} despawnRate - The number of miliseconds before despawning a bug.
   */
  function setupGameTimers(spawnRate, spawnCount, despawnRate) {
    gameTimerId = setInterval(decrementGameTimer, 1000);
    spawnTimerId = setInterval(spawnBugs, spawnRate, spawnCount, despawnRate);
  }

  /**
   * Decrements the game timer by 1, and ends the game if it reaches 0.
   */
  function decrementGameTimer() {
    let currTime = parseInt(id("timer").textContent) - 1;
    id("timer").textContent = currTime;
    if (currTime === 0) {
      stopGame();
    }
  }

  /**
   * Spawns the given number of bugs, attaching their behavior to them in so doing.
   * @param {number} spawnCount - The number of bugs per spawn.
   * @param {number} despawnRate - The number of miliseconds before despawning a bug.
   */
  function spawnBugs(spawnCount, despawnRate) {
    for (let i = 0; i < spawnCount; i++) {
      let bug = document.createElement("img");
      bug.src = BUG_IMG;
      bug.alt = "An ant-like bug";
      bug.style.top = Math.floor(Math.random() * (BUG_CONTAINER_HEIGHT - BUG_SIZE)) + "px";
      bug.style.left = Math.floor(Math.random() * (BUG_CONTAINER_WIDTH - BUG_SIZE)) + "px";
      bug.addEventListener("click", whackBug);
      setTimeout(removeBug, despawnRate, bug);
      id("bug-container").appendChild(bug);
    }
  }

  /**
   * Stops the current game, removing bugs from the screen and stopping the timer.
   */
  function stopGame() {
    id("bug-container").innerHTML = "";
    clearInterval(gameTimerId);
    clearInterval(spawnTimerId);
  }

  /**
   * whacks the clicked bug and increments the score. The bug cannot be whacked again afterwards.
   */
  function whackBug() {
    if (!this.classList.contains("whacked")) {
      this.classList.add("whacked");
      this.src = BUG_WHACKED;
      let score = id("score");
      score.textContent = parseInt(score.textContent) + 1;
    }
  }

  /**
   * Removes the given bug element from the DOM.
   * @param {object} bug - The DOM element to remove.
   */
  function removeBug(bug) {
    bug.parentNode.removeChild(bug);
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
})();

