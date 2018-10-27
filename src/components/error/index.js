import css from "./index.css";
import animResolve from "animation-resolve";

export default {
    view(vnode) {
        const { show, errors, labels } = vnode.attrs;

        return show && errors ?
            m("div", {
                    class : css.errorIn,

                    onbeforeremove(divVnode) {
                        return animResolve(divVnode.dom, css.errorOut);
                    }
                },

                errors
                    .map(error => (labels[error] || labels.all))
                    // unique error msgs
                    .reduce((acc, cur) => {
                        if (acc.includes(cur)) {
                            return acc;
                        }

                        acc.push(cur);

                        return acc;
                    }, [])
            ) :
            null;
    }
};
