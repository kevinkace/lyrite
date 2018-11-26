import state from "../../../../state";

import css from "./index.css";
import fontSizeUpSvg from "../../../../icons/font-sizeUp.svg";
import fontSizeDownSvg from "../../../../icons/font-sizeDown.svg";

const fonts = [{
    value : "lato",
    label : "Lato"
}, {
    value : "system",
    label : "System"
}, {
    value : "mono",
    label : "Monospace"
}, {
    value : "raleway",
    label : "Raleway"
}, {
    value : "bitter",
    label : "Bitter"
}];

export default {
    view() {
        return m("div", { class : css.fonts },
            m("select", {
                    class : css.select,

                    onchange : m.withAttr("value", value => {
                        state.action("SET_FONT", value);
                    })
                },
                fonts.map(({ value, label }) =>
                    m("option", { value }, label)
                )
            ),

            m("button", {
                    class : css.fontSize,
                    onclick(e) {
                        state.action("DEC_FONT_SIZE");
                    }
                },
                m.trust(fontSizeDownSvg)
            ),

            m("button", {
                    class : css.fontSize,
                    onclick(e) {
                        state.action("INC_FONT_SIZE");
                    }
                },
                m.trust(fontSizeUpSvg)
            )
        );
    }
};
