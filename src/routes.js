import state from "./state";

import layout from "./components/layout";
import lyrics from "./pages/lyrics";
import users from "./pages/users";
import user from "./pages/user";
import error from "./pages/error";
import home from "./pages/home";

import Song from "./state/classes/Song.js";

export default {
    "/" : {
        onmatch() {
            state.action("CLOSE_SONG");
            state.action("LOAD_SONGS_LIST");
        },
        render() {
            return m(layout, { header : false, bug : true }, m(home));
        }
    },

    "/songs/:slugAndId" : {
        onmatch(args) {
            if (!args.slugAndId || !Song.validateSlugAndId(args.slugAndId)) {
                return m.route.set("/");
            }

            state.action("LOAD_SONG_BY_SLUG_AND_ID", args.slugAndId);
        },
        render() {
            return m(layout, m(lyrics));
        }
    },

    "/users" : {
        render() {
            return m(layout, m(users));
        }
    },

    "/users/:username" : {
        render() {
            return m(layout, m(user));
        }
    }
};
