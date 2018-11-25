import state from "../../../../state";

import css from "./index.css";
import fontSizeUpSvg from "../../../../icons/font-sizeUp.svg";
import fontSizeDownSvg from "../../../../icons/font-sizeDown.svg";

export default {
    view() {
        return [
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
        ];
    }
};
