/*
 * Hybrids Solution
 *
 * This web service outputs a list of images for hybrid animal photos.
 * ***endpoints***
 * /animal/:animal
 * Provides a list of hybrid animal images that contain the given :animal name.
 * Response format: text/plain
 * Example request: "/fox"
 * Example response:
 *   images/bird-fox.jpg
 *   images/polarbear-bear-fox.jpg
 *
 * /animals/category/all
 * Provides a list of all animal images available in the same format as /:animal
 * Response format: text/plain
 */

"use strict";
const util = require("util");
const express = require("express");
const glob = require("glob");

const globPromise = util.promisify(glob);

const app = express();

const PREFIX_DIR_LENGTH = "public/".length;
const FILE_ERROR = 500;

// Provides paths to all hybrid animals containing the passed :animal string.
app.get("/animal/:animal", async (req, res) => {
  let animal = req.params["animal"].toLowerCase();
  let animals;
  try {
    animals = await globPromise("public/images/*" + animal + "*.jpg");
    let result = processAnimalPaths(animals);
    res.type("text");
    res.send(result);
  } catch (err) {
    res.type("text");
    res.status(FILE_ERROR).send("Something went wrong on the server. Try again later!");
  }
});

// Provides paths to all hybrid animal images.
app.get("/animals/category/all", async (req, res) => {
  let animals;
  res.type("text"); // define out here, since both success and error cases return plain text.
  try {
    animals = await globPromise("public/images/*.jpg");
    let result = processAnimalPaths(animals);
    res.send(result);
  } catch (err) {
    res.status(FILE_ERROR).send("Something went wrong on the server. Try again later!");
  }
});

/**
 * Creates a string of newline separated animal paths, stripping off the public directory.
 * @param {array} animals - The list of animal image paths.
 * @returns {string} - The newline-separated animal paths.
 */
function processAnimalPaths(animals) {
  let result = "";
  for (let i = 0; i < animals.length; i++) {
    result += animals[i].substring(PREFIX_DIR_LENGTH) + "\n"; // Strip off the "public/"
  }
  return result.trim();
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
