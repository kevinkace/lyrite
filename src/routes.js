"use strict";

import m from "mithril";

import state from "./state";

import layout from "./layout";
import lyrics from "./lyrics";
import home from "./home";

export default {
    "/"      : {
        onmatch : () => {
            if(!state.songs) {
                state.action("LOAD DEFAULT SONGS");
            } else {
                state.action("CLOSE SONG");
            }
        },
        render : () => m(layout, m(home))
    },

    "/:slug" : {
        onmatch : (args) => {
            if(!state.songs) {
                state.action("LOAD DEFAULT SONGS");
            }

            state.action("OPEN SONG BY SLUG", args.slug);
        },
        render : () => m(layout, { header : true }, m(lyrics))
    }
};
