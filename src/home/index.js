"use strict";

const m = require("mithril");

const state = require("../state");
const fakesong = "lyrics\nmore lyrics\n\nlastlyrics";

const css = require("./index.css");

module.exports = {
    oninit : () => {
        state.action("LOAD SONG", fakesong);
    },
    view : () =>
        m("div", { class : css.home },
            m("button", {
                class   : css.load,
                onclick : () => console.log("loadsong")
            }, "This?"),
            m("div", { class : css.list },
                state.songs ? state.songs.map((song, idx) =>
                    m("a", {
                        onclick : () => {
                            console.log("open song");
                            state.action("OPEN SONG", idx);
                        },
                        href : song.slug
                    }, song.title)
                ) : null
            )
        )
};
