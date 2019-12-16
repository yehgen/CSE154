// Exercise 1: cRaZyCaPs
// Write a function named crazyCaps that accepts a string as a parameter and returns a new string with its capitalization altered such that the characters at even indexes are all in lowercase and odd indexes are all in uppercase.
// For example, if a variable str stores "Hey!! THERE!", the call of crazyCaps(str) should return "hEy!! tHeRe!".

function crazyCaps(string) {
  let result = "";
  for (let i = 0; i < string.length; i++) {
    if (i % 2 === 0) {
      result += string[i].toLowerCase();
    } else {
      result += string[i].toUpperCase();
    }
  }
  return result;
}