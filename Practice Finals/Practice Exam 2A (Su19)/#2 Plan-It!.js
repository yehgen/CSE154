/**
 * 2. (JS with Fetch): Plan-It! Fetching You Meals a Day at a Time
 * In this question, you will write JavaScript to implement a small Meal Planner web page called Plan-It!. For
 * simplicity, we will consider a "full day meal plan" as a breakfast, lunch, and dinner (the 3 standard meal
 * types). Below are two screenshots of the Plan-It! page:

 * Write your client-side JS solution below. You may assume that the checkStatus(resp) function
 * and the aliases id(idName), qs(el), qsa(sel), and gen(tagName) are defined for you and are
 * included as appropriate.
 */

"use strict";
(function() {
    window.addEventListener("load", init);

    function init() {
        id("day-btn").addEventListener("click", makeRequest);
    }

    function makeRequest(){
        let url = "/dayplan";
        fetch(url)
        .then(checkStatus)
        .then(resp => resp.json())
        .then(createPlan);
        .catch(console.log(err));
    }

    function createPlan(data) {
        id("day-results").classList.remove("hidden");
        let name = "";
        let description = "";
        let groups = "";
        for (let i = 0; i < data.length; i++) {
            name = data[i].name;
            description = data[i].description;
            qs("#" + data[i] + " .name").textContent = name;
            qs("#" + data[i] + " .description").textContent = description;

            let ul = qs("#" + data[i] + " .food-groups");
            for (let i = 0; i < data[i]["food-groups"].length; i++) {
                let li = gen("li");
                group = data[i]["food-groups"];
                li.textContent = group;
                ul.appendChild(li);
            }
        }
    }

    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }
})();