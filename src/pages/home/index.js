import m from "mithril";

import state from "../../state";
import db from "../../state/db";
import db2 from "../../db";

import css from "./index.css";

import logo from "../../icons/lyrite-logo2.svg";
import list from "./list";
import users from "../../components/users";

export default {
    oninit : (vnode) => {
        vnode.state.songs = {};
        vnode.state.loaded = false;

        db2.collection("songs").onSnapshot((snap) => {
            vnode.state.songs = {};

            snap.forEach((doc) => {
                vnode.state.songs[doc.id] = doc.data();
                // vnode.state.songs.push(doc.data());
            });

            vnode.state.loaded = true;
            m.redraw();
        });

        // vnode.state.timestamp = db.timestamp();
        // vnode.state.defaultSongs = db.get("songs?default=true");
        // vnode.state.customSongs = db.get("songs?default=undefined");
    },
    // onbeforeupdate : (vnode) => {
    //     if(vnode.state.timestamp !== db.timestamp()) {
    //         vnode.state.timestamp = db.timestamp();
    //         vnode.state.defaultSongs = db.get("songs?default=true");
    //         vnode.state.customSongs = db.get("songs?default=undefined");

    //         return true;
    //     }
    // },
    view : (vnode) => [
        m(users),
        m("div", { class : css.home },

            m("div", { class : css.logoAndType },
                m.trust(logo),

                m("div", { class : css.logoType },
                    m("h1", { class : css.title }, state.appName),
                    m("h2", { class : css.subTitle }, state.tagline)
                )
            ),

            m("div", { class : css.center },
                m("div", { class : css.dash },
                    m("textarea", {
                        class       : vnode.state.focused ? css.textareaFocused : css.textarea,
                        value       : vnode.state.lyricString,
                        placeholder : vnode.state.hidePlaceholder ? "" : "paste or drop lyrics",
                        onfocus : () => {
                            vnode.state.focused = true;
                            vnode.state.hidePlaceholder = true;
                        },
                        onblur : () => {
                            vnode.state.hidePlaceholder = false;
                        },
                        oninput : m.withAttr("value", (v) => {
                            vnode.state.lyricString = v;
                            vnode.state.loadable = v.length;
                        })
                    })
                ),

                vnode.state.loadable ?
                    m("div", { class : css.btnWrap },
                        m("button", {
                            class : css.loadBtn,
                            onclick : () => {
                                let slug = state.action("IMPORT SONG LYRICS", {
                                    lyricString : vnode.state.lyricString,
                                    userSong    : true
                                });

                                delete vnode.state.textarea;
                                delete vnode.state.load;

                                return m.route.set(slug);
                            }
                        }, "load song")
                    ) :
                    null
            ),

            // // loaded songs list
            // Object.keys(vnode.state.customSongs).length ?
            //     m(list, { songs : vnode.state.customSongs, header : "your songs"}) :
            //     null,

            // // loaded songs list
            // Object.keys(vnode.state.defaultSongs).length ?
            //     m(list, { songs : vnode.state.defaultSongs, header : "default songs"}) :
            //     null,

            // loaded songs list
            Object.keys(vnode.state.songs).length ?
                // m("div", Object.values(vnode.state.songs).map((song) =>
                //     m("div", song.title)
                // )) :
                m(list, { songs : vnode.state.songs, header : "default songs"}) :
                null
        )
    ]
};
