"use strict";

const express = require("express");
const app = express();

app.get("/hello", function(req, res) {
  res.set("Content-Type", "text/plain");
  res.send("Hello World!");
});

app.get("/hello/name", function(req, res) {
  res.set("Content-Type", "text/plain");
  if (req.query["first"] && req.query["last"]) {
    res.send("Hello " + req.query["first"] + " " + req.query["last"]);
  } else {
    res.status(400).send("Error: missing first or last names.");
  }
});

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);