/*
 * Tricky Typing Test
 *
 * Handles game logic, view switching and server communication for the Tricky Typing Test game.
 */

"use strict";
(function() {

  const MAX_NAME_LENGTH = 30;
  const AVG_WORD_LENGTH = 5;
  let score = 0; // Score during the game.
  let gameTimer = null;

  window.addEventListener("load", init);

  /**
   * Hooks up event listeners for the elements on the page.
   */
  function init() {
    id("start-btn").addEventListener("click", startGame);
    id("play-again-btn").addEventListener("click", startGame);
    id("game-input").addEventListener("input", checkInput);
    id("submit-btn").addEventListener("click", submitScore);
    id("no-submit-btn").addEventListener("click", showScores);
  }

  /**
   * Displays the game view and fetches the words from the server.
   */
  function startGame() {
    score = 0;
    gameTimer = null;
    id("intro").classList.add("hidden");
    id("outro").classList.add("hidden");
    id("game").classList.remove("hidden");
    id("game-words").textContent = "Please Wait...";
    id("game-input").value = "";
    id("game-input").disabled = true;
    id("timer").textContent = "60";
    fetch("/words/")
      .then(checkStatus)
      .then(resp => resp.text())
      .then(function(text) {
        id("game-words").textContent = text;
        id("game-input").disabled = false;
      })
      .catch(function() {
        id("game-words").textContent = "Something went wrong, please refresh.";
      });
  }

  /**
   * Checks the user input to see if they entered a word, updating the score as necessary.
   * Starts the game timer if not already started.
   */
  function checkInput() {
    if (!gameTimer) {
      gameTimer = setInterval(decrementTimer, 1000);
    }
    if (id("timer").textContent !== "0") {
      let playerInput = id("game-input").value;
      if (playerInput[playerInput.length - 1] === " ") {
        id("game-input").value = "";
        let gameWords = id("game-words").textContent;
        let targetWord = gameWords.split(" ")[0];
        id("game-words").textContent = gameWords.substring(gameWords.indexOf(" ") + 1);
        if (targetWord + " " === playerInput) {
          score += targetWord.length / AVG_WORD_LENGTH;
        }
      }
    }
  }

  /**
   * Decrements the timer and ends the game if it reaches 0.
   */
  function decrementTimer() {
    let time = parseInt(id("timer").textContent);
    id("timer").textContent = time - 1;
    if (time === 1) {
      clearInterval(gameTimer);
      showOutro();
    }
  }

  /**
   * Displays the outro view.
   */
  function showOutro() {
    id("game").classList.add("hidden");
    id("outro").classList.remove("hidden");
    id("score").textContent = Math.round(score);
    id("submit-form").classList.remove("hidden");
    id("scores").classList.add("hidden");
    id("score-result").classList.remove("hidden");
    id("score-result").textContent = "Please Wait...";
    id("high-scores").innerHTML = "";
  }

  /**
   * Submits the users score to the server, and displays the scores when done.
   */
  function submitScore() {
    let name = id("name").value;
    if (name.length === 0 || name.length > MAX_NAME_LENGTH) {
      id("submit-error").textContent = "Enter a name under 30 characters";
    } else {
      fetch("/highscore/" + name + "/" + Math.round(score))
        .then(checkStatus)
        .then(showScores)
        .catch(function() {
          id("submit-error").textContent = "Something went wrong with submitting.";
        });
    }
  }

  /**
   * Displays the high scores to the user.
   */
  function showScores() {
    id("submit-form").classList.add("hidden");
    id("scores").classList.remove("hidden");
    fetch("/highscore?limit=10")
      .then(checkStatus)
      .then(resp => resp.json())
      .then(displayScoreboard)
      .catch(function() {
        id("score-result").textContent = "A problem occurred fetching the scoreboard.";
      });
  }

  /**
   * Displays the top 10 scores on the page.
   * @param {object} scores - The top ten scores
   */
  function displayScoreboard(scores) {
    id("score-result").classList.add("hidden");
    for (let i = 0; i < scores.length; i++) {
      let scoreItem = gen("li");
      scoreItem.textContent = scores[i]["name"] + ": " + scores[i]["score"];
      id("high-scores").appendChild(scoreItem);
    }
  }

  // HELPER FUNCTIONS //

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
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns a new DOM element with the given tag name (if one exists). If el is not
   * a correct tag name, returns undefined.
   * @param {string} el - tag name
   * @return {object} newly-created DOM object of given tag type
   */
  function gen(el) {
    return document.createElement(el);
  }

})();
