import css from "./error.css";
import resolveAnimation from "../../lib/animResolve";

export default {
    view(vnode) {
        const va = vnode.attrs;

        return va.show && va.errors ?
            m("div", {
                    class : css.errorIn,
                    onbeforeremove(divVnode) {
                        return resolveAnimation(divVnode.dom, css.errorOut);
                    }
                },
                va.errors.map((error) => error.label)
            ) :
            null;
    }
};
