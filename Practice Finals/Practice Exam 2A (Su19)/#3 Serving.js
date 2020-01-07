"use strict";
const express = require("express");
const util = require("util");
const fs = require("fs");
const glob = require("glob");
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const globPromise = util.promisify(glob);
const app = express();
app.use(express.static("public/"));
const SERVER_ERROR_MSG = "Something went wrong on the server, please try again later.";

// Part A: Implement GET /meal/:type endpoint
app.get("/meal/:type", async (req, res) => {
    try {
        let type = req.params.type.toLowerCase();
        res.type("text");
        let meals = await globPromise("data/" + type + "/*txt");
        if (meals.length !== 0) {
            let values = "";
            for (let i = 0; i < meals.length; i++) {
                let text = await readFile(meals[i], "utf8");
                let split = text.split("\n");
                values += split[0] + ": " + split[1] + "\n";
            }
            res.send(values);
        } else {
            res.status("400").send(type + " is not a valid meal type.");
        }
        res.send()
    } catch (err) {
        res.type("text");
        res.status(500).send(SERVER_ERROR_MSG);
    }
});

// Part B: Implement GET /dayplan endpoint. While not required, we suggest implementing a
// getRandOption(mealType) function below your endpoint to factor out building the data
// for each of the three data/ subdirectories.
app.get("/dayplan", (req, res) => {
    try {
        let breakfast = await getRandOption("breakfast");
        let lunch = await getRandOption("lunch");
        let dinner = await getRandOption("dinner");
        let list = {"breakfast": breakfast, "lunch": lunch, "dinner": dinner};
        res.json(list);
    } catch (err) {
        res.status(500).send(SERVER_ERROR_MSG);
    }
}

async function getRandOption(mealType) {
    let content = await globPromise("data/" + mealType + "/*txt");
    let random = content[Math.floor(Math.random() * content.length)];
    let values = await readFile(random, "utf8");
    let split = values.split("\n");
    return {"name": split[0], "description": split[1], "food-groups": split[2].split(" ")};
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);