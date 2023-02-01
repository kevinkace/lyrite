import m from "mithril";

import state from "./state";

import layout from "./components/layout";
import lyrics from "./components/lyrics";
import error  from "./components/error";
import home   from "./components/home";

export default {
    "/" : {
        onmatch() {
            state.action("CLOSE SONG");
        },
        render() {
            return m(layout, m(home));
        }
    },

    "/:slug" : {
        onmatch(args) {
            return state.action("LOAD SONG BY SLUG", args.slug) ? lyrics : error;
        },
        render(comp) {
            return m(layout, { header : true }, m(comp.tag));
        }
    }
};
