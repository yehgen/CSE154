"use strict";

const express = require("express");
const app = express();

app.get("/math/circle/:r", function(req, res) {
  res.set("Content-Type", "application/json");
  let radius = parseFloat(req.params["r"]);
  let area = Math.PI * radius * radius;
  let circumference = Math.PI * radius * 2;
  res.json({"area": area, "circumference": circumference});
});

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);