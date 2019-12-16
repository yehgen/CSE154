"use strict";

const express = require("express");
const app = express();

app.get("/math/rectangle/:width/:height", function(req, res) {
  res.set("Content-Type", "application/json");
  let width = parseFloat(req.params["width"]);
  let height = parseFloat(req.params["height"]);
  let area = width * height;
  let perimeter = (width + height) * 2;
  res.json({"area": area, "perimeter": perimeter});
});

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);