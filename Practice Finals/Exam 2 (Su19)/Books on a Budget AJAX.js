"use strict";
(function() {
    window.addEventListener(“load”, init);
    function init() {
        fetch("/courses")
            .then(checkStatus)
            .then(resp => resp.text())
            .then(populateClasses)
            .catch(displayError);
    }
    function populateClasses(resp) {
        resp = resp.trim().split("\n");
        let courses = id("courses");
        for (let courseName of resp) {
            let btn = gen("button");
            btn.textContent = courseName;
            btn.addEventListener("click", getCheapestBook);
            courses.appendChild(btn);
        }
    }
    function getCheapestBook() {
    let classname = this.textContent;
    fetch("/books/" + classname)
        .then(checkStatus)
        .then(resp => resp.json())
        .then(populateInfo)
        .catch(displayError);
    }
    function populateInfo(resp) {
        id("book-info").classList.remove("hidden");
        id("book-name").textContent = resp.name;
        id("seller").textContent = resp.seller;
        id("price").textContent = resp.price;
    }
    function displayError() {
        id("book-info").classList.add("hidden");
        id("courses").classList.add("hidden");
        id("error-info").classList.remove("hidden");
    }
})();