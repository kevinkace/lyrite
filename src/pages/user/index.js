import state from "../../state";

import css from "./index.css";
import loading from "../../components/loading";
import list from "../../components/list";

export default {
    oninit(vnode) {
        vnode.state.username = m.route.param("username");

        state.action("GET_SONGS_BY_USERNAME", vnode.state.username)
            .finally(() => {
                vnode.state.loaded = true;
                m.redraw();
            });
    },
    view(vnode) {
        const { username } = vnode.state;
        const songs = state.userSongs[username] || [];

        return m("div", { class : css.userSongs },
                    m("h2", { class : css.h2 }, `${username}'s Songs`),

                    m("div", { class : css.list },
                        vnode.state.loaded ?
                            m(list, { songs }) :
                            m(loading, { text : true })
                    )
        );
    }
};
