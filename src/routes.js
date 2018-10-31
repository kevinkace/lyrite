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

    "/songs/:slugAndId" : {
        onmatch(args) {
            if (!args.slugAndId) {
                m.route.set("/");
            }

            state.action("LOAD_SONG_BY_SLUG_AND_ID", args.slugAndId);
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
