"use strict";

require("minireset.css");
require("./index.css");

const m = require("mithril");

const routes = require("./routes");

const mountEl = document.getElementById("mount");

m.route.prefix("");

m.route(mountEl, "/", routes);

window.m = m;
