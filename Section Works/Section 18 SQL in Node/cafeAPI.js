// Exercise 2: Cafe API
// We are going to build an API for a theoretical cafe (note that this one has different data than the CSE154 cafe from lecture). There are three endpoints:
// /menu: Returns all menu items, organized by category.
// /menu/:category: Returns all menu items in a category.
// /order: Submits an order to the server.
// We will be using the cafe database we set up earlier, with the menu table and orders table.

"use strict";

const express = require("express");
const mysql = require("mysql2/promise");
const multer = require("multer"); // Handles form-data requests.
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

const INVALID_PARAM_ERROR = 400;
const FILE_ERROR = 500;
const SERVER_ERROR_MSG = "Something went wrong on the server.";

const db = mysql.createPool({
  host: process.env.DB_URL || 'localhost',
  port: process.env.DB_PORT || '8889',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'cafe'
});

// Gets all menu items (JSON), organized by category alphabetically.
app.get("/menu", async function(req, res) {
  try {
    let menu = await db.query("SELECT name, category, subcategory, price FROM menu ORDER BY name;");
    res.json(processMenu(menu[0]));
  } catch (err) {
    res.type("text");
    res.status(FILE_ERROR).send(SERVER_ERROR_MSG);
  }
});

// Gets all menu items (JSON) in a given :category.
app.get("/menu/:category", async function(req, res) {
  try {
    let qry = "SELECT name, subcategory, price FROM menu WHERE category =? ORDER BY name;"
    let menu = await db.query(qry, [req.params.category]);
    if (menu[0].length === 0) {
      res.type("text");
      res.status(INVALID_PARAM_ERROR).send("There are no records for that category!");
    } else {
      res.json(menu[0]);
    }
  } catch (err) {
    res.type("text");
    res.status(FILE_ERROR).send(SERVER_ERROR_MSG);
  }
});

// POSTs an order to the server.
app.post("/order", async function(req, res) {
  if ((req.body.email || req.body["phone_number"]) && req.body["item_name"] &&
       req.body.qty && req.body.tip) {
      res.type("text");
      let email = req.body.email;
      let phone = req.body["phone_number"];
      let itemName = req.body["item_name"];
      let qty = req.body["qty"];
      let tip = req.body["tip"];
      try {
        let qry = "SELECT price FROM menu WHERE name =?;";
        let itemRecord = await db.query(qry, [itemName]);
        if (itemRecord[0].length === 0) {
          res.status(INVALID_PARAM_ERROR).send("There is no menu item matching the given name.");
        } else {
          let totalPrice = itemRecord[0][0]["price"] * parseInt(qty) + parseFloat(tip);    
          let sql = "INSERT INTO orders(phone_number, email, item_name, qty, total_price) VALUES (?, ?, ?, ?, ?);";
          if (!email) {
            email = "NULL";
          }
          if(!phone) {
            phone = "NULL";
          }
          await db.query(sql, [email, phone, itemName, qty, totalPrice]);
          res.send("Your order has been processed!");
        }
      } catch (err) {
        res.status(FILE_ERROR).send(SERVER_ERROR_MSG);
      }
  } else {
    res.type("text");
    res.status(INVALID_PARAM_ERROR).send("Missing required parameters!");
  }
});

/**
 * Takes an array of menu items and processes it into a category to item array mapping.
 * @param {array} menu - An array of menu items with fields category, subcategory, name, price.
 * @returns {object} - The formatted menu object.
 */
function processMenu(menu) {
  let result = {};
  for (let i = 0; i < menu.length; i++) {
    let name = menu[i]["name"];
    let subcategory = menu[i]["subcategory"];
    let price = menu[i]["price"];
    let category = menu[i]["category"];
    if (!result[category]) {
      result[category] = []; // Initialize an array at this category.
    }
    result[category].push({name: name, subcategory: subcategory, price: price});
  }
  return result;
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);