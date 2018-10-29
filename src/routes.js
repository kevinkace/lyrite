import state from "./state";

import layout from "./components/layout";
import lyrics from "./pages/lyrics";
import users from "./pages/users";
import error from "./pages/error";
import home from "./pages/home";

export default {
    "/" : {
        onmatch() {
            state.action("CLOSE_SONG");
            state.action("LOAD_SONGS_LIST");
        },
        render() {
            return m(layout, { header : false, bug : true, login : true }, m(home));
        }
    },

    "/songs/:slug" : {
        onmatch(args) {
            if (!args.slug) {
                m.route.set("/");
            }

            // state.action("SET_SLUG", args.slug);
            state.action("LOAD_SONG_BY_SLUG", args.slug);
        },
        render() {
            return m(layout, m(lyrics));
        }
    },

    "/users" : {
        render() {
            return m(layout, { login : true }, m(users));
        }
    }
};
