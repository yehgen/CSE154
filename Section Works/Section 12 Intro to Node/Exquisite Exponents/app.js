"use strict";

const express = require("express");
const app = express();

app.get("/math/power/:base/:exponent", function(req, res) {
  res.set("Content-Type", "application/json");
  let base = parseFloat(req.params["base"]);
  let exponent = parseFloat(req.params["exponent"]);
  let power = Math.pow(base, exponent);
  res.json({"result": power});
});

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);