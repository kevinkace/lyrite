"use strict";

import m from "mithril";

import state from "./state";

import header from "./header";
import lyrics from "./lyrics";
import home from "./home";

function wrap(...components) {
    return {
        view : () => components.map(m)
    };
}

export default {
    "/"      : {
        onmatch : () => {
            if(!state.songs) {
                state.action("LOAD DEFAULT SONGS");
            } else {
                state.action("CLOSE SONG");
            }

            return wrap(header, home);
        }
    },

    "/:slug" : {
        onmatch : (args) => {
            if(!state.songs) {
                state.action("LOAD DEFAULT SONGS");
            }

            state.action("OPEN SONG BY SLUG", args.slug);

            return wrap(header, lyrics);
        }
    }
};
