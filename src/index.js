"use strict";

import "minireset.css";
import "./index.css";

import m from "mithril";

import routes from "./routes";
import state from "./state";

const mountEl = document.getElementById("mount");

state.action("INIT");

m.route.prefix("");
m.route(mountEl, "/", routes);

// todo: debug
// state.debug = true;
window.m = m;
window.state = state;
