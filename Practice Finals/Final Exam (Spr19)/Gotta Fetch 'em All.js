(function () {
    "use strict";
    const URL = "/club154";
    window.addEventListener("load", init);

    function init() {
        fetch(URL + "?mode=all")
            .then(checkStatus)
            .then(populateChars)
            .catch(handleError);
    }

    function populateChars(response) {
        response = response.split("\n");
        for (let i = 0; i < response.length; i++) {
            if (response[i] !== "") {
                let charData = response[i];
                let img = document.createElement("img");
                img.src = "data/" + charData + "/avatar.png";
                img.alt = charData;
                img.id = charData;
                id("playground").appendChild(img);
                img.addEventListener("click", showChar);
            }
        }
    }
    
    function showChar() {
        let name = this.id;
        fetch(URL + "?mode=lookup&name=" + name)
            .then(checkStatus)
            .then(JSON.parse)
            .then(populateCharInfo)
            .catch(handleError);
        if (qs(".selected")) {
            qs(".selected").classList.remove("selected");
        }
        this.classList.add("selected");
    }

    function populateCharInfo(response) {
        id("name").innerText = response.name;
        id("series").innerText = response.series;
        id("description").innerText = response.description;
        id("appearances").innerHTML = "";
        for (let i = 0; i < response.appearances.length; i++) {
            let appearance = response.appearances[i];
            let li = document.createElement("li");
            li.innerText = appearance;
            id("appearances").appendChild(li);
        }
        id("spotlight").classList.remove("hidden");
    }
    function handleError() {
        id("error").classList.remove("hidden");
        id("spotlight").classList.add("hidden");
        if (qs(".selected")) {
            qs(".selected").classList.remove("selected");
        }
    }
})();