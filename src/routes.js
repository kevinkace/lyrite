"use strict";

import m from "mithril";

import state from "./state";

import layout from "./components/layout";
import lyrics from "./components/lyrics";
import error from "./components/error";
import home from "./components/home";

export default {
    "/"      : {
        onmatch : () => {
            state.action("CLOSE SONG");
        },
        render : () => m(layout, m(home))
    },

    "/:slug" : {
        onmatch : (args) => {
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
