"use strict";

const util = require("util");
const crypto = require("crypto");
const eol = require("eol");
const fs = require("fs");
const readFileP = util.promisify(fs.readFile);
const writeFileP = util.promisify(fs.writeFile);

const song = "smells-like-teen-spirit";

readFileP(`./${song}.txt`, "utf8")
    .then((data) =>
        eol.lf(data)
            .split("\n\n")
            .map((text) =>
                ({
                    hash : crypto
                        .createHash("md5")
                        .update(text)
                        .digest("hex"),
                    text
                })
            )
    )
    .then((lines) =>
        writeFileP(
            `./${song}.json`,
            JSON.stringify(lines, null, 2)
        )
    )
    .catch(console.log);
