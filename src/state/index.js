import m from "mithril";

import tools from "./tools";
import song from "./song";
import modal from "./modal";

import db from "./db";

const State = {
    appName    : "Lyrite",
    tagline    : "a tool to format lyrics",
    githubHref : "https://github.com/kevinkace/lyrite",

    styles : [ "s0", "s1", "s2", "s3", "s4", "s5" ],
    font   : { size : "1.3" },
    cols   : { count : 2 },

    // added to doc in script via webpack
    ver, // eslint-disable-line no-undef

    error : (err) => {
        console.error(err);
    },

    events : {
        mousemove : (e) => {
            State.tooltip.style = {
                left    : `${e.clientX}px`,
                top     : `${e.clientY}px`,
                opacity : e.clientY > State.header.height ? 0.8 : 0
            };

            m.redraw();
        }
    }
};

State.actions = Object.assign({
    "CLEAR DB" : () => {
        db.clear();
    }
}, tools(State), song(State), modal(State));
State.action  = (name, value) => State.actions[name](value);

window.state = State;

export default State;
