/*
 * Section 14, CSE 154 Summer 2019
 * Original author: Melissa Hovik
 * Adapted to Node.js by Sven Hansen
 *
 * Recipe Generator Solution
 * This API outputs a randomized recipe based on a given name.
 * For all endpoints, server-side errors are sent with a 500 status code.
 * This API does not have any invalid requests (400 status).
 *
 * ***endpoints***
 * /:name
 * Provides a random recipe based on the letters in the provided :name
 * Response format: text/plain
 * Example Request: /Mowgli
 * Example Response:
 *   Mowgli's Muffin
 *   Directions:
 *   In a bowl, mix:
 *     1 Oreo
 *     1 gallon of Water
 *     1 oz of Green peas
 *     1 Lentil
 *     1 Ice cube
 *
 *   Cook for 6 minutes and serve!
 */

"use strict";
const util = require("util");
const express = require("express");
const fs = require("fs").promises;
const glob = require("glob");

const globPromise = util.promisify(glob);

const FILE_ERROR = 500;

const app = express();

// Provides a randomly generated recipe based on a passed in name parameter.
// Outputs a 500 error if something goes wrong when processing files.
app.get("/:name", async (req, res) => {
  let flag = true;
  let name = req.params["name"];
  let lowerName = name.toLowerCase();
  let result = "";
  let contents;
  try {
    contents = await fs.readFile("foods/" + lowerName[0] + ".txt", "utf8");
  } catch (err) {
    flag = false;
    res.type("text");
    res.status(FILE_ERROR).send("Unable to get relevant food!");
  }
  if (flag) {
    let lines = contents.trim().split(/\r?\n/); // Trim to remove empty last line.
    let randomFood = lines[Math.floor(Math.random() * (lines.length - 1))];
    result += name + "'s " + randomFood + "\nDirections:\nIn a bowl, mix:\n";
    try {
      result += await generateIngredientText(lowerName);
      result += "\ncook for " + name.length + " minutes and serve!";
      res.type("text");
      res.send(result);
    } catch (err) {
      res.status(FILE_ERROR);
      result = "Something went wrong on the server. Please try again later!";
    }
  }
});

/**
 * Generates a list of ingredients to append to the response.
 * @param {string} name - The name passed in.
 * @returns {string} - The ingredient list.
 */
async function generateIngredientText(name) {
  let result = "";
  for (let i = 1; i < name.length; i++) {
    let ingredients = await globPromise("ingredients/" + name[i] + "*.txt");
    let randomPath = ingredients[Math.floor(Math.random() * ingredients.length)];
    let ingredient = await fs.readFile(randomPath, "utf8");
    result += ingredient + "\n";
  }
  return result;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);