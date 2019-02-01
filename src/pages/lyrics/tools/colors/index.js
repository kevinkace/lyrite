import state from "../../../../state";

import cssJoiner from "cssJoiner";
import css from "./index.css";

export default {
    view() {
        return m("div", { class : css.colors },
            state.colors.map((color, idx) => {
                let className;

                if (!isNaN(state.selectedColor)) {
                    className = state.selectedColor === idx ?
                        css.selected :
                        css.unselected;
                }

                return m("button", {
                    class : cssJoiner(
                        css.color,
                        css[color],
                        [ className, className ]
                    ),

                    onclick() {
                        state.action("CLICK_COLOR", idx);
                    }
                }, idx);
            })
        );
    }
};
