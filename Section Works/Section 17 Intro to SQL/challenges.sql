-- Write a SQL query that returns the average release_year of games in the Games table. Use the 
-- ROUND function to round the result to the nearest integer and rename the column with an 
-- alias avg_release_year.
SELECT ROUND(AVG(release_year)) AS avg_release_year
FROM Games;

-- Write a SQL query that returns the name and release_year of the Puzzle games released in the 
-- earliest year for Puzzle games in the Games table. How does the result for Puzzle games compare 
-- to Sports games?
SELECT g1.name, g1.release_year
FROM Games g1
WHERE g1.genre = 'puzzle'
AND g1.release_year = (SELECT MIN(g2.release_year) FROM Games g2 WHERE g2.genre = 'puzzle');