// Part A:
// Implement a function get_chars to return a string concatenating each directory name in the data/ directory.
// Each directory name should be appended with a newline ("\n") character at the end. For example, if the data
// directory contains the same 6 folders is as shown in Table 1 on the previous page, the function should return the
// string: "corrin\ndebugduck\nmowgli\npiazza\npikachu\nrainbowdash\n".
// NOTE: Do NOT set any headers in this function. Any headers and output will be implemented in Part C.
const fs = require("fs").promises;
async function getChars() {
    let data = await fs.readdir("public/data");
    let result = "";
    for (let i = 0; i < data.length; i++) {
        result = result + data[i] + "\n";
    }
    return result;
}

// Part B: Building JSON for Query 2
// Implement a function getCharInfo(chardir) to take a character directory name (e.g. "debugduck") as a
// parameter and return a JS object having the form:
// {
//   "name": <name of the character>,
//   "series": <character series>,
//   "description": <description of character>,
//   "appearances": <array of appearances>
// }
// containing the character information described in the API Documentation for Query 2 (Page 14).
const fs = require("fs").promises;
async function getCharInfo(chardir) {
    let file = "public/data/" + chardir;
    let char_info = (await fs.readFile(file + "/info.txt", "utf-8")).split("\n");
    let result = {"name": char_info[0], "series": char_info[1], "description": char_info[2]};
    result["appearances"] = (await fs.readFile(file + "/appearances.txt", "utf-8")).split("\n");
    return result;
}

// Part C: Completing the app.js Web Service
// In this part, you will write the rest of the app.js web service to handle Query 1, Query 2, and the invalid
// request error handling specified in the API Documentation on pages 14-15. Assuming Part A and Part B
// functions are provided, your solution for Part C should be a complete app.js web service following the API
// Documentation. We have summarized the specifications below for convenience:
const express = require("express");
const fs = require("fs").promises;
const app = express();
app.get("/club154", async function (req, res) {
    try {
        let mode = req.query.mode;
        if (mode === "all") {
            let chars = await getChars();
            res.type("text").send(chars);
        } else if (mode === "lookup") {
            let name = req.query.char;
            if (!name) {
                res.type("text").send("Please pass in a character name.");
            } else {
                let info = await getCharInfo(name);
                res.json(info);
            }
        } else {
            res.status(400).type("text").send("Please pass in a mode of all or lookup.");
        }
    } catch (err) {
        res.type("text");
        if (err.code === "ENOENT") {
            res.status(400).send("Please pass in a valid character name.");
        } else {
            res.status(500).send("Something went wrong on the server. Please try again later.");
        }
    }
});