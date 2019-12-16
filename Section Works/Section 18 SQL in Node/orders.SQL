-- Exercise 1: Creating an Orders Table

-- We want to add the following orders table to the cafe database. 
-- The entry below is for reference, but we won't be adding it
-- The table should be named orders and should replace existing tables.
-- column name          Requirements
-- id	                  The primary key for the table. Should increment automatically.
-- phone_number	        Someone's phone number, as a string. Might be NULL.
-- email	              Someone's email. Might be NULL.
-- item_name	          The name of an item from the menu table. Required.
-- qty	                The number of an item ordered. Required.
-- total_price	        The price of an order, as a decimal number. Required.
-- order_time	          The date and time of the order. Required.

DROP TABLE IF EXISTS orders;
CREATE TABLE orders(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  phone_number VARCHAR(20),
  email VARCHAR(63),
  item_name VARCHAR(63) NOT NULL,
  qty INT DEFAULT 0,
  total_price DECIMAL(6,2) NOT NULL,
  order_time DATETIME DEFAULT NOW()
);