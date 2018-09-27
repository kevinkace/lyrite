import state from "./state";

import layout from "./components/layout";
import lyrics from "./pages/lyrics";
import error from "./pages/error";
import home from "./pages/home";

export default {
    "/" : {
        onmatch : () => {
            state.action("CLOSE SONG");
            state.action("LOAD SONGS LIST");
        },
        render : () => m(layout, m(home))
    },

    "/songs/:slug" : {
        onmatch : (args) => {
            if(!args.slug) {
                m.route.set("/");
            }

            // state.action("SET SLUG", args.slug);
            state.action("LOAD SONG BY SLUG", args.slug);

        },
        render : () => m(layout, { header : true }, m(lyrics))
    }
};
