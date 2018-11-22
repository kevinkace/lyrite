import state from "./state";

import layout from "./components/layout";
import lyrics from "./pages/lyrics";
import users from "./pages/users";
import user from "./pages/user";
import error from "./pages/error";
import home from "./pages/home";

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
            if (!args.slugAndId) {
                m.route.set("/");
            }
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
