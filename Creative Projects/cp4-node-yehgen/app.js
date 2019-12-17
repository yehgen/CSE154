/**
 * Name: Generous Yeh
 * Date: November 13, 2019
 * Section: CSE 154 AH
 * TA: Valerie Remaker
 *
 * This is the app.js for my an supplements page which provides information based on self made
 * files.
 */

"use strict";

const fs = require("fs").promises;
const express = require("express");
const app = express();

const INVALID_PARAM_ERROR = 400;

// displays list of all 9 supplements in the database
app.get("/supplements", async function(req, res) {
  try {
    let list = await fs.readFile("items.json", "utf8");
    list = JSON.parse(list);
    res.json(list);
  } catch (err) {
    res.type("text");
    res.send("An error has occurred: " + err);
  }
});

// display a single random supplement from the database
app.get("/supplements/:name", async function(req, res) {
  let name = req.params.name;
  try {
    let list = await fs.readFile("items.json", "utf8");
    list = JSON.parse(list).items;
    let product;
    for (let i = 0; i < list.length; i++) {
      product = list[i].name;
      if (product.toLowerCase() === name.toLowerCase()) {
        res.type("text");
        res.send(product + " - " + list[i].description);
      }
    }
    res.status(INVALID_PARAM_ERROR).send("Supplement does not exist on this database.");
  } catch (err) {
    res.type("text");
    res.status(INVALID_PARAM_ERROR).send("Something went wrong! " + err);
  }
});

// respond with potential resources to obtain said substance or amino acid
app.get("/sources", async function(req, res) {
  try {
    let foods = await fs.readFile("sources.txt", "utf8");
    res.type("text");
    res.send(foods);
  } catch (err) {
    res.type("text");
    res.status(INVALID_PARAM_ERROR).send("Sources are unable to be listed currently.");
  }
});

app.use(express.static("public"));

const PORT = process.env.PORT || 8000;
app.listen(PORT);
