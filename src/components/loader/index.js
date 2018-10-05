import css from "./index.css";
import animResolve from "../../lib/animResolve";

export default {
    onbeforeremove(vnode) {
        return animResolve(vnode.dom, css.loaderFade);
    },
    view() {
        return m("div", { class : css.loader });
    }
};
