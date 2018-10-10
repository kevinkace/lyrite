import tools from "./tools";
import song from "./song";
import modal from "./modal";
import user from "./user";
/**
 * @typedef state
 * @property {string} appName
 * @property {string} tagline
 * @property {string} githubHref
 * @property {string} ver - app version
 * @property {string[]} styles - style class names
 * @property {object} font - font size
 * @property {object} cols - number of columns
 * @property {boolean} loggedIn
 * @property {object} username - Firebase auth currentUser
 * @property {object} session - just uid ATM
 * @property {object} deleted - ids of songs that are mid-delete
 * @property {function} err - future error handling
 * @property {object} events - just mousemove() ATM
 * @property {object} actions
 * @property {function} action
 */
/** @type {state} */
const State = {
    appName    : "Lyrite",
    tagline    : "a tool to format lyrics",
    githubHref : "https://github.com/kevinkace/lyrite",
    // added to doc in script via webpack
    ver, // eslint-disable-line no-undef

    styles : [ "s0", "s1", "s2", "s3", "s4", "s5" ],
    font   : { size : 1.3 },
    cols   : { count : 3 },

    loggedIn : false,
    username : undefined,
    session  : {},

    deleted : {},

    error(err) {
        console.error(err);
    },

    events : {
        mousemove(e) {
            State.tooltip.style = {
                left    : `${e.clientX}px`,
                top     : `${e.clientY}px`,
                opacity : e.clientY > State.header.height ? 0.8 : 0
            };

            m.redraw();
        }
    },

    actions : {}
};

Object.assign(State.actions, tools(State), song(State), modal(State), user(State));
State.action = (name, value) => {
    if (!State.actions[name]) {
        console.error(`Action not found: ${name}`);

        return;
    }

    const returnVal = State.actions[name](value);

    m.redraw();

    return returnVal;
};

window.State = State;

export default State;
