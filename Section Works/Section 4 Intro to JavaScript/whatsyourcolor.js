// Bonus Exercise 3: What's Your Color?
// We've provided an HTML file colorifyme.html and a start to a JavaScript file colorify.js that it links to. Download both files and fill in the "TODO" comments of colorify.js so that when the web page's "colorify" button is clicked, it randomly decides the color of the page background. That is, it should choose a random hex value for the background between #000000 and #FFFFFF. In addition, it should replace any text in the heading tag that has the ID "my-color" with the text, "Your color is RANDOMCOLOR!", (where RANDOMCOLOR is the hex value randomly-generated for the background).

"use strict";
(function() {
  const HEX_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
  const HEX_LENGTH = 6; // Number of hexidecimal digits
  
  window.addEventListener("load", init);

  function init() {
    let colorBtn = document.getElementById("colorify");
    colorBtn.addEventListener("click", changeBackgroundColor);
  }

  function changeBackgroundColor() {
    let randomColor = "#";
    for (let i = 0; i < HEX_LENGTH; i++) {
      randomColor += HEX_DIGITS[Math.floor(Math.random() * HEX_DIGITS.length)];
    }
    document.body.style.backgroundColor = randomColor;
    document.getElementById("my-color").textContent = "Your color is " + randomColor + "!";
  }
})();