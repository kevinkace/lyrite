import m from "mithril";

import tools from "./tools";
import load from "./load";

const State = {};

State.styles = [ "s0", "s1", "s2", "s3", "s4", "s5" ];

State.events = {
    mousemove : (e) => {
        State.tooltip.style = {
            left : `${e.clientX}px`,
            top  : `${e.clientY}px`,
            opacity : e.clientY > State.header.height ? 0.8 : 0
        };

        m.redraw();
    }
};

State.actions = Object.assign({}, tools(State), load(State));

State.action = (name, value) => State.actions[name](value);

State.font = { size : "1.3" };

State.cols = { count : 2 };

State.error = (err) => {
    console.error(err);
};

export default State;
