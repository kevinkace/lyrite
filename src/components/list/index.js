import state from "../../state";

import { get } from "object-path";

import css from "./index.css";
import animResolve from "animation-resolve";
import loading from "../loading";

import createdByCurrentUser from "../../lib/createdByCurrentUser";

const list = {
    view(vnode) {
        const { songs } = vnode.attrs;

        return songs.length ?
            songs
                .filter(song => !song.data.deleted)
                .map(song =>
                    m("li", {
                            key   : song.id,
                            class : get(state, [ "deleted", song.id ]) ? css.deleted : null,

                            onbeforeremove({ dom }) {
                                return animResolve(dom, css.songOut);
                            }
                        },
                        m("a", {
                                oncreate : m.route.link,
                                href     : `/songs/${song.data.slug}-${song.id}`
                            },
                            m("strong", song.data.title),

                            song.data.artist ?
                                ` - ${song.data.artist}` :
                                null
                        ),

                        createdByCurrentUser(song) ?
                            m("button", {
                                onclick() {
                                    state.action("DELETE_SONG_BY_ID", song.id);
                                },
                                "aria-label" : "delete"
                            }, "🗙") :
                            null
                    )
                ) :
            "No songs!";
    }
};

export default {
    view(vnode) {
        const { songs } = vnode.attrs;

        return m("ul", { class : css.list },
            songs ?
                m(list, { songs }) :
                m(loading, { text : true })
        );
    }
};
