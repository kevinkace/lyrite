"use strict";

const m = require("mithril");

const state = require("../state");

const slts = require("../songs/smells-like-teen-spirit.txt");

const css = require("./index.css");

module.exports = {
    oninit : () => {
        state.action("LOAD SONG", slts);
    },
    view : (vnode) =>
        m("div", { class : css.home },
            m("button", {
                class   : css.load,
                onclick : () => {
                    vnode.state.load = true;
                }
            }, "load song"),
            vnode.state.load ? [
                    m("textarea", {
                        oncreate : (textVnode) => {
                            vnode.state.textarea = textVnode;
                        },
                        class : css.textarea,
                        placeholder : "past song lyrics"
                    }),
                    m("button", {
                        class : css.loadText,
                        onclick : () => {
                            state.action("LOAD SONG", vnode.state.textarea.dom.value);
                            delete vnode.state.textarea;
                            delete vnode.state.load;
                        }
                    }, "load songs text")
                ] :
                null,
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
