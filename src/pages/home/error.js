import css from "./error.css";
import animResolve from "animation-resolve";

export default {
    view(vnode) {
        const va = vnode.attrs;

        return va.show && va.errors ?
            m("div", {
                    class : css.errorIn,
                    onbeforeremove(divVnode) {
                        return animResolve(divVnode.dom, css.errorOut);
                    }
                },
                va.errors.map((error) => error.label)
            ) :
            null;
    }
};
