import m from "mithril";
import { get } from "object-path";

import state from "../../state";

import css from "./list.css";

export default {
    view : (vnode) =>
        m("div", { class : css.list },
            m("h3", vnode.attrs.header),

            get(state, [ "songs", "songs" ]) ?
                state.songs.songs.map((song) =>
                    m("div",
                        m("a", {
                                oncreate : m.route.link,
                                href     : `/songs/${song.data.slug}`
                            },
                            m("strong", song.data.title),

                            song.data.artist ?
                                [ " - ", song.data.artist ] :
                                null
                        )
                        // ,
                        // vnode.attrs.songs[id].userSong ?
                        //     m("button", {
                        //         onclick : () => {
                        //             state.action("DELETE SONG BY SLUG", id);
                        //         },
                        //         "aria-label" : "delete"
                        //     }, "🗙") :
                        //     null
                    )
                ) :
                null
        )
};
