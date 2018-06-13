"use strict";

import m from "mithril";

import state from "./state";

import layout from "./components/layout";
import lyrics from "./pages/lyrics";
import error from "./pages/error";
import home from "./pages/home";

export default {
    "/" : {
        // onmatch : () => {
        //     state.action("CLOSE SONG");
        // },
        render : () => m(layout, m(home))
    },

    "/songs/:slug" : {
        onmatch : (args) => {
            if(!args.slug) {
                m.route.set("/");
            }

            state.action("SET SLUG", args.slug);

            // return state.action("LOAD SONG BY SLUG", args.slug) ? lyrics : error;
            // return lyrics;
        },
        render : () => m(layout, { header : true }, m(lyrics))
    }
};
