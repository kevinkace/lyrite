import css from "./fork.css";

export default {
    close : true,
    view() {
        return m("div",
            m("h2", { class : css.h }, "Coming Soon!"),
            m("p", "In the meantime: "),
            m("ul", { class : css.list },
                m("li", "copy the lyrics to a new song, or"),
                m("li", m("a", { href : "https://github.com/kevinkace/lyrite" }, "help build Lyrite"))
            )
        );
    }
};
