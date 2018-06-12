"use strict";

import m from "mithril";

import state from "./state";

import layout from "./components/layout";
import lyrics from "./pages/lyrics";
import error from "./pages/error";
import home from "./pages/home";

export default {
    "/" : {
        onmatch : () => {
            state.action("CLOSE SONG");
        },
        render : () => m(layout, m(home))
    },

    "/:slug" : {
        onmatch : (args) =>
            state.action("LOAD SONG BY SLUG", args.slug) ? lyrics : error,
        render : (comp) => m(layout, { header : true }, m(comp.tag))
    }
};
