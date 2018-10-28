import css from "./index.css";
import animResolve from "animation-resolve";

export default {
    view(vnode) {
        const { show, errors, labels, align } = vnode.attrs;
        const [ cssIn, cssOut ] = align === "left" ?
            [ css.errorInLeft, css.errorOutLeft ] :
            [ css.errorIn, css.errorOut ];

        return show && errors ?
            m("div", {
                    class : cssIn,

                    onbeforeremove(divVnode) {
                        return animResolve(divVnode.dom, cssOut);
                    }
                },

                errors
                    .map(error => m.trust(labels[error] || labels.all))
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
