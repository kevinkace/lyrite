import css from "./index.css";
import animResolve from "animation-resolve";

export default {
    view(vnode) {
        const { show, errors, labels, align = "default" } = vnode.attrs;
        const [ cssIn, cssOut ] = {
            left    : [ css.errorInLeft, css.errorOutLeft ],
            bottom  : [ css.errorInBottom, css.errorOutBottom ],
            default : [ css.errorIn, css.errorOut ]
        }[align];

        return show && errors ?
            m("div", {
                    class : cssIn,

                    onbeforeremove({ dom }) {
                        return animResolve(dom, cssOut);
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
