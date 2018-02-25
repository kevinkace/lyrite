"use strict";

import m from "mithril";

import state from "./state";

import layout from "./layout";
import lyrics from "./lyrics";
import error from "./error";
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

            let songIdx = state.action("GET SONG IDX FROM SLUG", args.slug);

            if(!songIdx && songIdx !== 0) {
                return error;
            }

            state.action("OPEN SONG", songIdx);

            return lyrics;
        },
        render : (comp) => m(layout, { header : true }, m(comp.tag))
    }
};
