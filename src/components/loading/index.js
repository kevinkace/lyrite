import css from "./index.css";
import animResolve from "animation-resolve";

export default {
    onbeforeremove({ dom }) {
        return animResolve(dom, css.loaderFade);
    },

    view(vnode) {
        const { text, width, valign } = vnode.attrs;

        return m("div", { class : valign === "bottom" ? css.loaderBottom : css.loader },
            text ? "loading" : null,
            m("div", { class : width === "full" ? css.barFull : css.bar })
        );
    }
};
