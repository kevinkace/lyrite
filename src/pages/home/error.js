import css from "./error.css";
import resolveAnimation from "../../lib/animResolve";

export default {
    view(vnode) {
        const va = vnode.attrs;

        return va.show && va.errors ?
            m("div", {
                    onbeforeremove : (vnode) => resolveAnimation(vnode.dom, css.errorOut),
                    class : css.errorIn
                },
                va.errors.map((error) => error.label)
            ) :
            null;
    }
};
