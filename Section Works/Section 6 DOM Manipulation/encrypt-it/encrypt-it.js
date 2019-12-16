"use strict";
(function() {

  window.addEventListener("load", init);

  /* Start of main functions  */
  function init() {
    id("encrypt-it").addEventListener("click", generateCipher);
    id("reset").addEventListener("click", function() { // example of anonymous function
      id("result").textContent = "";
    });

    let fontSizeOptions = qsa("input[name=text-size]");
    for (let i = 0; i < fontSizeOptions.length; i++) {
      fontSizeOptions[i].addEventListener("change", function() {
        id("result").style.fontSize = this.value;
      });
    }
  }

  function generateCipher() {
    if (id("cipher-type").value == "shift") {
      id("result").innerText = shiftCipher(id("input-text").value.toLowerCase());
    } else {
      id("result").innerText = randomCipher(id("input-text").value.toLowerCase());
    }
  }

  /**
   * Returns an encrypted version of the given text, where
   * each letter is shifted alphabetically ahead by 1 letter,
   * and 'z' is shifted to 'a' (creating an alphabetical cycle).
   */
  function shiftCipher(text) {
    text = text.toLowerCase();
    let result = "";
    for (let i = 0; i < text.length; i++) {
      if (!isLowerCaseLetter(text[i])) {
        result += text[i];
      } else if (text[i] == 'z') {
        result += 'a';
      } else { // letter is between 'a' and 'y'
        let letter = text.charCodeAt(i);
        let resultLetter = String.fromCharCode(letter + 1);
        result += resultLetter;
      }
    }
    if (id("all-caps").checked) {
      result = result.toUpperCase();
    }
    return result;
  }

  function randomCipher(text) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let cipher = [];
    let alphabetLength = alphabet.length;
    for (let i = 0; i < alphabetLength; i++) {
      let randomIndex = Math.floor(Math.random() * alphabet.length);
      cipher.push(alphabet.splice([Math.floor(Math.random() * alphabet.length)], 1));
    }
    let result = "";
    for (let i = 0; i < text.length; i++) {
      if (isLowerCaseLetter(text[i])) {
        let letterCode = text.charCodeAt(i) - 'a'.charCodeAt(0);
        result += cipher[letterCode];
      } else {
        result += text[i];
      }
    }
    result = result.replace(",", "");
    if (id("all-caps").checked) {
      result = result.toUpperCase();
    }
    return result;
  }

  /* Helper Functions */
  function id(idName) {
    return document.getElementById(idName);
  }

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  function isLowerCaseLetter(c) {
    return c >= 'a' && c <= 'z';
  }
})();

