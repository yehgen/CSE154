-- Part II: Using SQL with Video Game Data

-- Write a SQL query that returns the names of all games that 
-- were developed by Nintendo (your result should not have duplicates).
SELECT DISTINCT name
FROM Games
WHERE developer = 'Nintendo';

-- Write a SQL query that returns the names and release year of 20 of the video games 
-- released earliest as determined by their release_year in the Games table.
SELECT name, release_year
FROM Games
ORDER BY release_year
LIMIT 20;

-- Write a SQL query that returns the name, platform and release year of all games with
-- the word 'Spyro' in their title and which don't include 'Skylanders' in their title. 
-- Hint: Use NOT to negate a boolean expression in MySQL.
SELECT name, platform, release_year
FROM Games
WHERE name LIKE '%Spyro%'
AND NOT (name LIKE '%Skylanders%');

