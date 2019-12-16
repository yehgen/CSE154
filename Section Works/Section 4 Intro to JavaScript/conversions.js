// Create the file conversions.js which is referenced by conversions.html. 
// Write a function convert() in conversions.js that takes the value in the text input and converts
// it from either kilograms (kg) to pounds (lb) or from pounds to kilograms, depending on the value
// selected in the dropdown box.
// The result should be displayed in the empty span with the id of #answer.
// The conversion factor from pounds to kilograms is 0.45359237, and the conversion factor from 
// kilograms to pounds is 2.20462262.

(function() {
  "use strict";
  
  window.addEventListener("load", init);

  function init() {
    let calcButton = document.getElementById("calculate");
    calcButton.addEventListener("click", convert);
  }

  function convert() {
    let input = document.getElementById("input");
    let value = parseInt(input.value);

    let conversion = document.getElementById("convert");
    if (conversion.value == "kgtopounds") {
      value = value * 2.20462262;
    } else {
      value = value * 0.45359237;
    }

    let answer = document.getElementById("answer");
    answer.innerHTML = value;
  }
})();