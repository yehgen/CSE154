"use strict";
(function() {
    window.addEventListener("load", init);
    // Images of all the CSE 154 instructors
    const PICS = ["ann.jpg", "chao.jpg", "conner.jpg", "daniel.jpg", "hawk.jpg", ... ];

    // Returns array with [randomTop, randomLeft] values, where each value is an
    // integer for a position for a .duckie to fit in the #fountain.
    function getDuckiePos() {
    // Details of function not provided here
    }

    // Implement the rest of Problem 3 on this page.
    function init() {
        id("add-duckie").addEventListener("click", addDuckie);
        id("party-mode").addEventListener("click", partyMode);
    }

    function addDuckie() {
        let duckie = document.createElement("div");
        duckie.classList.add("duckie");
        let coordinates = getDuckiePos();
        let X = coordinates[0];
        let Y = coordinates[1];
        duckie.style.top = Y + "px";
        duckie.style.left = X + "px";
        id("fountain").appendChild(duckie);
    }

    function partyMode() {
        if (id("party-container").children.length > 0) {
            id("party-container").textContent = "";
            id("party-mode").textContent = "~Party On~";
        } else {
            for (let i = 0; i < PICS.length; i++) {
                let instructor = document.createElement("img");
                instructor.src = PICS[i];
                instructor.alt = "Party instructor!";
                instructor.classList.add("party-pic");
                id("party-container").appendChild(instructor);
            }
        id("party-mode").textContent = "Party Off";
        }
    }
})();