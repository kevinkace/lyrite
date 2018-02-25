import m from "mithril";

import state from "../state";

export default {
    view : () =>
        m("div", "shit", state.error)
};
