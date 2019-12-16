"use strict";

const express = require("express");
const fs = require("fs").promises;
const app = express();

const DEFAULT_WORD_LIMIT = 250;
const INVALID_PARAM_ERROR = 400;
const FILE_ERROR = 500;

// Responds with random English words, up to 250 or a given limit.
app.get("/words", async function(req, res) {
  let limit = DEFAULT_WORD_LIMIT;
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }
  if (limit < 1) {
    res.type("text");
    res.status(INVALID_PARAM_ERROR).send("Limit too small!");
  } else {
    let dictionary;
    try {
      dictionary = await fs.readFile("resources/dictionary.txt", "utf8");
      dictionary = dictionary.split(/\r?\n/);
      let result = dictionary[Math.floor(Math.random() * dictionary.length)];
      for (let i = 1; i < limit; i++) {
        result += " " + dictionary[Math.floor(Math.random() * dictionary.length)];
      }
      res.type("text");
      res.send(result);
    } catch (err) {
      res.type("text");
      res.status(FILE_ERROR).send("Words not available right now.");
    }
  }

});

// Responds with the list of highscores, optionally limited to a certain number.
app.get("/highscore", async function(req, res) {
  let flag = true;
  let limit = null;
  if (req.query.limit) {
    limit = req.query.limit;
    if (limit < 1) {
      flag = false;
      res.type("text");
      res.status(INVALID_PARAM_ERROR).send("Limit too small!");
    }
  }
  if(flag) {
    let scores;
    try {
      scores = await getScores();
      if (limit) {
        let results = [];
        for (let i = 0; i < Math.min(scores.length, limit); i++) {
          results.push(scores[i]);
        }
        res.json(results);
      } else {
        res.json(scores);
      }
    } catch (err) {
      res.type("text");
      res.status(FILE_ERROR).send("Scores not available right now.");
    }
  }
});

// Stores the given name and score in the high score list.
app.get("/highscore/:name/:score", async function(req, res) {
  let name = req.params.name;
  let score = req.params.score;
  score = parseInt(score);
  try {
    let scores = await getScores();
    let newScores = addScore(scores, name, score);
    await fs.writeFile("resources/scores.json", JSON.stringify({scores: newScores}), "utf8");
    res.type("text");
    res.send("Successfully added score!");
  } catch (err) {
    res.type("text");
    res.status(FILE_ERROR).send("Something went wrong while adding scores.");
  }
});

/**
 * Returns a new array consisting of the old scores plus the new score.
 * Overwrites a players existing score if they have one.
 * @param {array} scores - The old array of high scores.
 * @param {string} name - The name of the new scorer.
 * @param {number} score - The score of the new scorer.
 * @returns {array} - A copy of scores, with the new item added.
 */
function addScore(scores, name, score) {
  let newScores = scores.slice(0);

  // Check to see if name exists already, and if the score is lower than the new one.
  for (let i = 0; i < scores.length; i++) {
    if (scores[i]["name"] === name) {
      if (scores[i]["score"] > score) {
        return newScores; // No changes necessary
      }
      newScores.splice(i, 1); // Remove old entry
    }
  }
  let i = newScores.length;
  while (i > 0 && score > newScores[i - 1].score) {
    i--; // Find the place to insert the score.
  }
  newScores.splice(i, 0, {name: name, score: score});
  return newScores;
}

/**
 * Returns the array of user scores stored in scores.json
 * @returns {array} - The array of user scores stored in scores.json
 */
async function getScores() {
  let scores = await fs.readFile("resources/scores.json", "utf8");
  return JSON.parse(scores).scores;
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
