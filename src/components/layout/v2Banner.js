import m from "mithril";

import css from "./index.mcss";

export default {
    view() {
        return m("div", { class : css.v2 },
            m("a",
                {   class : css.v2NoLink,
                    href : "https://v2.lyrite.com"
                },
                "🎉 lyrite v2 is now ready for preview! 🎉 ",
                m("span", "Try now")
            ),
            m("a",
                {
                    href : "https://v2.lyrite.com/docs/announcing-lyrite-v2"
                },
                "Read more"
            )
        )
    }
}