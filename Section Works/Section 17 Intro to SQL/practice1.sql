-- Part I: Writing SQL Queries with the menu table

-- For our first query, let's see what's on the menu.
-- What query would list all of the menu item names with their price in the Menu table?
SELECT name, price
FROM menu;

-- Write a query that lists the name, price, and category of all menu items that are sold for a 
-- price less than $2.00. Order the results by price in descending order, breaking ties by name 
-- alphabetically.
SELECT name, price, category
FROM menu
WHERE price < 2
ORDER BY price DESC, name;

-- Write a query that lists the name, cost, and price of all menu items that contain the string
-- "Coffee" in their name. Order the results by price (in ascending order).
SELECT name, cost, price
FROM menu
WHERE name LIKE "%Coffee%"
ORDER BY price;

-- It looks like there's an item that costs the cafe more than it sells for! 
-- Can you write a query to find the name of the item?
SELECT name
FROM menu
WHERE price < cost;

-- Write a query that lists the name, price, and cost of the most expensive
-- menu item on the menu (by price).
SELECT name, price, cost
FROM menu
ORDER BY price DESC
LIMIT 1;