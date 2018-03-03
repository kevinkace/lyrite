"use strict";

import "minireset.css";
import "./index.css";

import m from "mithril";

import routes from "./routes";
import state from "./state";

import "./favicon.ico";

const mountEl = document.getElementById("mount");

m.route.prefix("");

m.route(mountEl, "/", routes);

window.m = m;
window.state = state;
