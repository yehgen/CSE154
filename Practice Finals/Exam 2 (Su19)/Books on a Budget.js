"use strict";
const express = require("express");
const util = require("util");
const glob = require("glob");
const fs = require("fs").promises;
const path = require("path");
const globPromise = util.promisify(glob);
const SERVER_ERROR_MSG = "Something went wrong on the server, please try again later.";
const app = express();
app.use(express.static("public"));

// Part A: Implement GET /courses endpoint
app.get("/courses", async (req, res) => {
    res.type("text");
    try {
        let results = "";
        let class = await readdir("data");
        for (let i = 0; i < class.length; i++) {
            let course = class[i];
            results += course + "\n";
        }
        res.send(results.trim());
    } catch(err) {
        res.status(500).send(err);
    }
}

// Part B on following page.
// Part B: Implement GET /books/:course endpoint below
app.get("/books/:course", async (req, res) => {
    let course = req.params.course;
    try {
        let class = await fs.readFile("data/" + classname + ".txt", "utf8");
        let result = {};
        let split = class.split("\n");
        result.name = split[0];

        let minPrice;
        let seller;
        for (let i = 1; i < split.length; i++) {
            let values = split[i].split(":");
            let price = parseFloat(values[1]);
            if (!minPrice || price < minPrice) {
                minPrice = price;
                seller = values[0];
            }
        }
        result.price = minPrice;
        result.seller = seller;
        res.json(result);
    } catch(err) {
        res.type("text");
        if (err.code === "ENOENT") {
            res.status(400).send(err);
        }
        res.status(500).send(err);
    }
}

const PORT = process.env.PORT || 8000;
app.listen(PORT); // end app.js
