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
        console.log(state.userSongs);

        const { username } = vnode.state;
        const songs = state.userSongs[username] || [];

        return m("div", { class : css.userSongs },
            vnode.state.loaded ?
                m(list, { songs }) :
                // m("ol",
                //     songs.map(song =>
                //         m("li",
                //             m("a", {
                //                 href     : `/songs/${song.slug}-${song.id}`,
                //                 oncreate : m.route.link
                //             }, song.title)
                //         )
                //     )
                // ) :
                m(loading, { text : true })
        );
    }
};
