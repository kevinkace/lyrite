"use strict";

import "minireset.css";
import "./index.css";

import m from "mithril";

import routes from "./routes";
import state  from "./state";

const mountEl = document.getElementById("mount");

// state.debug = true;
state.action("IMPORT DEFAULT SONGS");

m.route.prefix("");
m.route(mountEl, "/", routes);


window.m     = m;
window.state = state;
