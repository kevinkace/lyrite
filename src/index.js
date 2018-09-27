import "minireset.css";
import "./index.css";

import routes from "./routes";
import state from "./state";

state.action("INIT");

m.route.prefix("");
m.route(document.getElementById("mount"), "/", routes);

// todo: debug
// state.debug = true;
window.m = m;
window.state = state;
