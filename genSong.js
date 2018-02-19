"use strict";

const util = require("util");
const crypto = require("crypto");
const eol = require("eol");
const fs = require("fs");
const readFileP = util.promisify(fs.readFile);
const writeFileP = util.promisify(fs.writeFile);

const titleSplit = "\n\n---\n\n";

const song = "smells-like-teen-spirit";

readFileP(`./${song}.txt`, "utf8")
    .then((data) => {
        const song = {};

        data = eol.lf(data);

        const parts = data.split(titleSplit);

        if(parts.length === 2) {
            song.title = parts[0];
            song.lyrics = parts[1];
        } else {
            song.lyrics = parts[0];
        }

        song.lyrics = song.lyrics
            .split("\n\n")
            .map((text) =>
                ({
                    hash : crypto
                        .createHash("md5")
                        .update(text)
                        .digest("hex"),
                    text
                })
            );

        return song;
    })
    .then((song) =>
        writeFileP(
            `./example-song2.js`,
            `module.exports = ${JSON.stringify(song, null, 2)};\n`
        )
    )
    .catch(console.log);
