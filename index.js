/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = m;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__song__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal__ = __webpack_require__(18);






const State = {};

State.appName = "Lyrite";
State.githubHref = "https://github.com/kevinkace/lyrite";

State.styles = ["s0", "s1", "s2", "s3", "s4", "s5"];

State.events = {
    mousemove: e => {
        State.tooltip.style = {
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
            opacity: e.clientY > State.header.height ? 0.8 : 0
        };

        __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.redraw();
    }
};

State.actions = Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_1__tools__["a" /* default */])(State), Object(__WEBPACK_IMPORTED_MODULE_2__song__["a" /* default */])(State), Object(__WEBPACK_IMPORTED_MODULE_3__modal__["a" /* default */])(State));

State.action = (name, value) => State.actions[name](value);

State.font = { size: "1.3" };

State.cols = { count: 2 };

State.error = err => {
    console.error(err);
};

window.state = State;

/* harmony default export */ __webpack_exports__["a"] = (State);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);


const icons = {
    edit: {
        title: "Edit",
        viewBox: "0 0 32 32",
        paths: ["M0 32c4-12 14.469-32 32-32-8.219 6.594-12 22-18 22s-6 0-6 0l-6 10h-2z"]
    },
    github: {
        title: "GitHub",
        viewBox: "0 0 1024 1024",
        paths: ["M512.008 12.642c-282.738 0-512.008 229.218-512.008 511.998 0 226.214 146.704 418.132 350.136 485.836 25.586 4.738 34.992-11.11 34.992-24.632 0-12.204-0.48-52.542-0.696-95.324-142.448 30.976-172.504-60.41-172.504-60.41-23.282-59.176-56.848-74.916-56.848-74.916-46.452-31.778 3.51-31.124 3.51-31.124 51.4 3.61 78.476 52.766 78.476 52.766 45.672 78.27 119.776 55.64 149.004 42.558 4.588-33.086 17.852-55.68 32.506-68.464-113.73-12.942-233.276-56.85-233.276-253.032 0-55.898 20.004-101.574 52.76-137.428-5.316-12.9-22.854-64.972 4.952-135.5 0 0 43.006-13.752 140.84 52.49 40.836-11.348 84.636-17.036 128.154-17.234 43.502 0.198 87.336 5.886 128.256 17.234 97.734-66.244 140.656-52.49 140.656-52.49 27.872 70.528 10.35 122.6 5.036 135.5 32.82 35.856 52.694 81.532 52.694 137.428 0 196.654-119.778 239.95-233.79 252.624 18.364 15.89 34.724 47.046 34.724 94.812 0 68.508-0.596 123.644-0.596 140.508 0 13.628 9.222 29.594 35.172 24.566 203.322-67.776 349.842-259.626 349.842-485.768 0-282.78-229.234-511.998-511.992-511.998z"]
    }
};

/* harmony default export */ __webpack_exports__["a"] = ({
    view: vnode => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("svg", { viewBox: icons[vnode.attrs.icon].viewBox }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("title", icons[vnode.attrs.icon].title), icons[vnode.attrs.icon].paths.map(d => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("path", { d })))
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const MAX_TIMEOUT = 1000;

/* harmony default export */ __webpack_exports__["a"] = (function (dom, className) {
    return new Promise((res, rej) => {
        let resd = false;

        setTimeout(() => {
            if (resd) {
                return;
            }

            resd = true;
            rej(false);
        }, MAX_TIMEOUT);

        dom.addEventListener("animationend", () => {
            if (resd) {
                return;
            }

            resd = true;
            res(true);
        });

        dom.classList.add(...className.split(" "));
    });
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_minireset_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routes__ = __webpack_require__(7);









const mountEl = document.getElementById("mount");

__WEBPACK_IMPORTED_MODULE_2_mithril___default.a.route.prefix("");

__WEBPACK_IMPORTED_MODULE_2_mithril___default.a.route(mountEl, "/", __WEBPACK_IMPORTED_MODULE_3__routes__["a" /* default */]);

window.m = __WEBPACK_IMPORTED_MODULE_2_mithril___default.a;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = ({});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fontFamily */
/* unused harmony export mount */
/* unused harmony export button */
/* unused harmony export title */
/* unused harmony default export */ var _unused_webpack_default_export = ({
    "fontFamily": "Raleway",
    "mount": "mount",
    "button": "mc70832d4a_button",
    "title": "mc70832d4a_title"
});
var fontFamily = "Raleway";
var mount = "mount";
var button = "mc70832d4a_button";
var title = "mc70832d4a_title";

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lyrics__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__error__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home__ = __webpack_require__(33);











/* harmony default export */ __webpack_exports__["a"] = ({
    "/": {
        onmatch: () => {
            if (!__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].songs) {
                __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("LOAD DEFAULT SONGS");
            } else {
                __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("CLOSE SONG");
            }
        },
        render: () => __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_2__layout__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_5__home__["a" /* default */]))
    },

    "/:slug": {
        onmatch: args => {
            if (!__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].songs) {
                __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("LOAD DEFAULT SONGS");
            }

            let songIdx = __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("GET SONG IDX FROM SLUG", args.slug);

            if (!songIdx && songIdx !== 0) {
                return __WEBPACK_IMPORTED_MODULE_4__error__["a" /* default */];
            }

            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("OPEN SONG", songIdx);

            return __WEBPACK_IMPORTED_MODULE_3__lyrics__["a" /* default */];
        },
        render: comp => __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_2__layout__["a" /* default */], { header: true }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()(comp.tag))
    }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_path__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_object_path__);


/* harmony default export */ __webpack_exports__["a"] = (State => ({
    "CLICK LYRIC": idx => {
        const lineStyleIsSetStyle = Object(__WEBPACK_IMPORTED_MODULE_0_object_path__["get"])(State, "style.idx") === Object(__WEBPACK_IMPORTED_MODULE_0_object_path__["get"])(State, `song.lyrics.${idx}.style.idx`);

        // Deselect lyric
        // selected lyric without a style set
        if (State.selected === idx && (!State.style || lineStyleIsSetStyle)) {
            delete State.selected;

            return;
        }

        // Always set selected otherwise
        State.selected = idx;

        if (!State.style) {
            return;
        }

        // color
        State.action("COLOR SELECTED LYRIC", State.style.idx);

        return;
    },

    "CLICK STYLE": idx => {
        State.style = { idx };

        // Clicking first style after opening tools
        if (!State.tooltip) {
            // create tt obj
            State.tooltip = { style: {} };

            // add listing for tt position
            window.addEventListener("mousemove", State.events.mousemove);
        }

        // Nothing is selected so don"t color anything
        if (!State.selected && State.selected !== 0) {
            return;
        }

        // Color selected lyrics
        State.action("COLOR SELECTED LYRIC", idx);

        delete State.selected;
    },

    "COLOR SELECTED LYRIC": idx => {
        State.song.lyrics[State.selected].style = { idx };
    },

    "HIDE TOOLS": () => {
        delete State.selected;
        delete State.style;
        delete State.tooltip;

        State.action("CLOSE EDIT CURRENT SONG");

        window.removeEventListener("mousemove", State.events.mousemove);
    }
}));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals
    root.objectPath = factory();
  }
})(this, function(){
  'use strict';

  var toStr = Object.prototype.toString;
  function hasOwnProperty(obj, prop) {
    if(obj == null) {
      return false
    }
    //to handle objects with null prototypes (too edge case?)
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  function isEmpty(value){
    if (!value) {
      return true;
    }
    if (isArray(value) && value.length === 0) {
        return true;
    } else if (typeof value !== 'string') {
        for (var i in value) {
            if (hasOwnProperty(value, i)) {
                return false;
            }
        }
        return true;
    }
    return false;
  }

  function toString(type){
    return toStr.call(type);
  }

  function isObject(obj){
    return typeof obj === 'object' && toString(obj) === "[object Object]";
  }

  var isArray = Array.isArray || function(obj){
    /*istanbul ignore next:cant test*/
    return toStr.call(obj) === '[object Array]';
  }

  function isBoolean(obj){
    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
  }

  function getKey(key){
    var intKey = parseInt(key);
    if (intKey.toString() === key) {
      return intKey;
    }
    return key;
  }

  function factory(options) {
    options = options || {}

    var objectPath = function(obj) {
      return Object.keys(objectPath).reduce(function(proxy, prop) {
        if(prop === 'create') {
          return proxy;
        }

        /*istanbul ignore else*/
        if (typeof objectPath[prop] === 'function') {
          proxy[prop] = objectPath[prop].bind(objectPath, obj);
        }

        return proxy;
      }, {});
    };

    function hasShallowProperty(obj, prop) {
      return (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop))
    }

    function getShallowProperty(obj, prop) {
      if (hasShallowProperty(obj, prop)) {
        return obj[prop];
      }
    }

    function set(obj, path, value, doNotReplace){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (typeof path === 'string') {
        return set(obj, path.split('.').map(getKey), value, doNotReplace);
      }
      var currentPath = path[0];
      var currentValue = getShallowProperty(obj, currentPath);
      if (path.length === 1) {
        if (currentValue === void 0 || !doNotReplace) {
          obj[currentPath] = value;
        }
        return currentValue;
      }

      if (currentValue === void 0) {
        //check if we assume an array
        if(typeof path[1] === 'number') {
          obj[currentPath] = [];
        } else {
          obj[currentPath] = {};
        }
      }

      return set(obj[currentPath], path.slice(1), value, doNotReplace);
    }

    objectPath.has = function (obj, path) {
      if (typeof path === 'number') {
        path = [path];
      } else if (typeof path === 'string') {
        path = path.split('.');
      }

      if (!path || path.length === 0) {
        return !!obj;
      }

      for (var i = 0; i < path.length; i++) {
        var j = getKey(path[i]);

        if((typeof j === 'number' && isArray(obj) && j < obj.length) ||
          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
          obj = obj[j];
        } else {
          return false;
        }
      }

      return true;
    };

    objectPath.ensureExists = function (obj, path, value){
      return set(obj, path, value, true);
    };

    objectPath.set = function (obj, path, value, doNotReplace){
      return set(obj, path, value, doNotReplace);
    };

    objectPath.insert = function (obj, path, value, at){
      var arr = objectPath.get(obj, path);
      at = ~~at;
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }
      arr.splice(at, 0, value);
    };

    objectPath.empty = function(obj, path) {
      if (isEmpty(path)) {
        return void 0;
      }
      if (obj == null) {
        return void 0;
      }

      var value, i;
      if (!(value = objectPath.get(obj, path))) {
        return void 0;
      }

      if (typeof value === 'string') {
        return objectPath.set(obj, path, '');
      } else if (isBoolean(value)) {
        return objectPath.set(obj, path, false);
      } else if (typeof value === 'number') {
        return objectPath.set(obj, path, 0);
      } else if (isArray(value)) {
        value.length = 0;
      } else if (isObject(value)) {
        for (i in value) {
          if (hasShallowProperty(value, i)) {
            delete value[i];
          }
        }
      } else {
        return objectPath.set(obj, path, null);
      }
    };

    objectPath.push = function (obj, path /*, values */){
      var arr = objectPath.get(obj, path);
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }

      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
    };

    objectPath.coalesce = function (obj, paths, defaultValue) {
      var value;

      for (var i = 0, len = paths.length; i < len; i++) {
        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
          return value;
        }
      }

      return defaultValue;
    };

    objectPath.get = function (obj, path, defaultValue){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (obj == null) {
        return defaultValue;
      }
      if (typeof path === 'string') {
        return objectPath.get(obj, path.split('.'), defaultValue);
      }

      var currentPath = getKey(path[0]);
      var nextObj = getShallowProperty(obj, currentPath)
      if (nextObj === void 0) {
        return defaultValue;
      }

      if (path.length === 1) {
        return nextObj;
      }

      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
    };

    objectPath.del = function del(obj, path) {
      if (typeof path === 'number') {
        path = [path];
      }

      if (obj == null) {
        return obj;
      }

      if (isEmpty(path)) {
        return obj;
      }
      if(typeof path === 'string') {
        return objectPath.del(obj, path.split('.'));
      }

      var currentPath = getKey(path[0]);
      if (!hasShallowProperty(obj, currentPath)) {
        return obj;
      }

      if(path.length === 1) {
        if (isArray(obj)) {
          obj.splice(currentPath, 1);
        } else {
          delete obj[currentPath];
        }
      } else {
        return objectPath.del(obj[currentPath], path.slice(1));
      }

      return obj;
    }

    return objectPath;
  }

  var mod = factory();
  mod.create = factory;
  mod.withInheritedProps = factory({includeInheritedProps: true})
  return mod;
});


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_eol__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_eol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_eol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_string_hash__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_string_hash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_string_hash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_slugify__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_slugify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_slugify__);




const titleSplit = "\n\n---\n\n";

const songs = [__webpack_require__(15), __webpack_require__(16), __webpack_require__(17)];

function parseLyricString(lyricString) {
    return lyricString.split("\n\n").map(text => ({
        hash: __WEBPACK_IMPORTED_MODULE_1_string_hash___default()(text),
        text
    }));
}

/* harmony default export */ __webpack_exports__["a"] = (State => ({
    "LOAD SONG": songString => {
        const parts = __WEBPACK_IMPORTED_MODULE_0_eol___default.a.lf(songString).split(titleSplit);
        const song = {};

        if (parts.length > 2) {
            State.error = "loading a incorrectly formatted song";

            return;
        }

        State.songs = State.songs || [];
        State.songs.push(song);

        if (parts.length === 2) {
            song.title = parts[0];
            song.lyrics = parts[1];
            song.lyricString = parts[1];
        } else {
            song.untitled = true;
            song.title = `untitled ${State.songs.length}`;
            song.lyrics = parts[0];
            song.lyricString = parts[0];
        }

        song.slug = __WEBPACK_IMPORTED_MODULE_2_slugify___default()(song.title);

        song.lyrics = parseLyricString(song.lyrics);

        return song.slug;
    },

    "LOAD DEFAULT SONGS": () => {
        songs.forEach(song => {
            State.action("LOAD SONG", song);
        });
    },

    "OPEN SONG": idx => {
        State.song = State.songs[idx];
    },

    "GET SONG IDX FROM SLUG": slug => {
        let songIdx;

        State.songs.some((song, idx) => {
            if (song.slug !== slug) {
                return false;
            }

            songIdx = idx;

            return true;
        });

        if (!songIdx && songIdx !== 0) {
            State.error = "song not found";

            return;
        }

        return songIdx;
    },

    "CLOSE SONG": () => {
        delete State.song;
    },

    "TOGGLE EDIT CURRENT SONG": () => {
        return State.edit ? State.action("CLOSE EDIT CURRENT SONG") : State.action("OPEN EDIT CURRENT SONG");
    },

    "OPEN EDIT CURRENT SONG": () => {
        State.edit = true;
    },

    "CLOSE EDIT CURRENT SONG": () => {
        State.edit = false;
    },

    "UPDATE PARSED LYRICS": () => {
        State.song.lyrics = parseLyricString(State.song.lyricString);
    }
}));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {!function(root, name, make) {
  if (typeof module != 'undefined' && module.exports) module.exports = make()
  else root[name] = make()
}(this, 'eol', function() {

  var api = {}
  var isWindows = typeof process != 'undefined' && 'win32' === process.platform
  var linebreak = isWindows ? '\r\n' : '\n'
  var newline = /\r\n|\r|\n/g

  function before(text) {
    return linebreak + text
  }

  function after(text) {
    return text + linebreak
  }

  function converts(to) {
    function convert(text) {
      return text.replace(newline, to)
    }
    convert.toString = function() {
      return to
    }
    return convert 
  }

  function split(text) {
    return text.split(newline)
  }

  api['lf'] = converts('\n')
  api['cr'] = converts('\r')
  api['crlf'] = converts('\r\n')
  api['auto'] = converts(linebreak)
  api['before'] = before
  api['after'] = after
  api['split'] = split
  return api
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function hash(str) {
  var hash = 5381,
      i    = str.length;

  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}

module.exports = hash;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


;(function (name, root, factory) {
  if (true) {
    module.exports = factory()
    module.exports['default'] = factory()
  }
  /* istanbul ignore next */
  else if (typeof define === 'function' && define.amd) {
    define(factory)
  }
  else {
    root[name] = factory()
  }
}('slugify', this, function () {
  /*eslint-disable */
  var charMap = JSON.parse('{"$":"dollar","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","џ":"dz","Ґ":"G","ґ":"g","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","‘":"\'","’":"\'","“":"\\\"","”":"\\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₹":"indian rupee","₽":"russian ruble","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial"}')
  /*eslint-enable */

  function replace (string, options) {
    options = (typeof options === 'string')
      ? {replacement: options}
      : options || {}

    string = string.split('')
      .reduce(function (result, ch) {
        if (charMap[ch]) {
          ch = charMap[ch]
        }
        // allowed
        ch = ch.replace(options.remove || /[^\w\s$*_+~.()'"!\-:@]/g, '')
        result += ch
        return result
      }, '')
      // trim leading/trailing spaces
      .replace(/^\s+|\s+$/g, '')
      // convert spaces
      .replace(/[-\s]+/g, options.replacement || '-')
      // remove trailing separator
      .replace('#{replacement}$', '')

    return options.lower ? string.toLowerCase() : string
  }

  replace.extend = function (customMap) {
    for (var key in customMap) {
      charMap[key] = customMap[key]
    }
  }

  return replace
}))


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "Smells Like Teen Spirit\r\n\r\n---\r\n\r\nLoad up on guns, Bring your friends\r\nIt's fun to lose and to pretend\r\n\r\nShe's overboard, self assured\r\nOh no I know, a dirty word\r\n\r\nHello, hello, hello, how low [x3]\r\nHello, hello, hello\r\n\r\nWith the lights out, it's less dangerous\r\nHere we are now, entertain us\r\nI feel stupid and contagious\r\nHere we are now, entertain us\r\n\r\nA mulatto, an Albino\r\nA mosquito, my libido, yeah\r\n\r\nHey, yay\r\n\r\nI'm worse at what I do best\r\nAnd for this gift, I feel blessed\r\n\r\nOur little group has always been\r\nAnd always will until the end\r\n\r\nHello, hello, hello, how low [x3]\r\nHello, hello, hello\r\n\r\nWith the lights out, it's less dangerous\r\nHere we are now, entertain us\r\nI feel stupid and contagious\r\nHere we are now, entertain us\r\n\r\nA mulatto, an Albino\r\nA mosquito, my libido, yeah\r\n\r\nHey, yay\r\n\r\nAnd I forget just why I taste\r\nOh yeah, I guess it makes me smile\r\n\r\nI found it hard, it was hard to find\r\nOh well, whatever, nevermind\r\n\r\nHello, hello, hello, how low [x3]\r\nHello, hello, hello\r\n\r\nWith the lights out, it's less dangerous\r\nHere we are now, entertain us\r\nI feel stupid and contagious\r\nHere we are now, entertain us\r\n\r\nA mulatto, an Albino\r\nA mosquito, my libido\r\n\r\nA denial, A denial, A denial, A denial, A denial\r\nA denial, A denial, A denial, A denial\r\n"

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "Judy is a Punk\r\n\r\n---\r\n\r\nJackie is a punk\r\nJudy is a runt\r\nThey both went down to Berlin, joined the Ice Capades\r\n\r\nAnd oh, I don't know why\r\nOh, I don't know why\r\n\r\nPerhaps they'll die, oh yeah\r\nPerhaps they'll die, oh yeah\r\nPerhaps they'll die, oh yeah\r\nPerhaps they'll die, oh yeah\r\n\r\nSecond verse, same as the first\r\n\r\nJackie is a punk\r\nJudy is a runt\r\nThey both went down to Berlin, joined the Ice Capades\r\n\r\nAnd oh, I don't know why\r\nOh, I don't know why\r\n\r\nPerhaps they'll die, oh yeah\r\nPerhaps they'll die, oh yeah\r\nPerhaps they'll die, oh yeah\r\nPerhaps they'll die, oh yeah\r\n\r\nThird verse, different from the first\r\n\r\nJackie is a punk\r\nJudy is a runt\r\nThey both went down to San Frisco, joined the SLA\r\n\r\nAnd oh, I don't know why\r\nOh, I don't know why\r\n\r\nPerhaps they'll die, oh yeah\r\nPerhaps they'll die, oh yeah\r\nPerhaps they'll die, oh yeah\r\nPerhaps they'll die, oh yeah\r\n"

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "Hatebreeders\r\n\r\n---\r\n\r\nWhoa oh oh\r\nNo\r\nWhoa oh oh\r\nHate breeders\r\nWhoa oh oh\r\nWhoa oh oh\r\nHate breeders\r\nWhoa oh oh\r\n\r\nBrain invasion goin' on in everyone\r\nYou feel the things that make your world turn angry red\r\nBecause the next time you can't take it\r\nNext thought murderlation\r\nAnd hate is all you want to know\r\n\r\nWhoa oh oh\r\nHate breeders\r\nWhoa oh oh\r\n(x4)\r\n\r\nMurder one inborn into your every cell\r\nIt's in your blood and you can't shake it\r\nBecause you were bred to take it\r\nNext stop annihilation\r\nThey bred the hate right in your bones\r\n\r\nWhoa oh oh\r\nHate breeders\r\nWhoa oh oh\r\n(x4)\r\n\r\nBecause you were bred to take it\r\nNext stop annihilation\r\nThey bred the hate right in your fuckin' bones\r\n\r\nWhoa oh oh\r\nHate breeders\r\nWhoa oh oh\r\n(x4)\r\n\r\nHate is your mistress and you shall not want\r\nYou shall not want because your breed is strong\r\nBecause when they try to break you\r\nNew world desolation\r\nAnd strength is all you gotta know\r\n\r\nWhoa oh oh\r\nHate breeders\r\nWhoa oh oh\r\n(x4)\r\n\r\nAnd all you know\r\nHatebreeders\r\nWhoa oh oh\r\nAnd all you know\r\nHatebreeders\r\nWhoa oh oh\r\n"

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);


/* harmony default export */ __webpack_exports__["a"] = (State => ({
    "OPEN TITLE MODAL": () => {
        if (!State.song) {
            return;
        }

        State.modal = { title: true };

        __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.redraw();
    },

    "CLOSE MODAL": () => {
        delete State.modal;
    }
}));

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__icons__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__header__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modal__ = __webpack_require__(26);









/* harmony default export */ __webpack_exports__["a"] = ({
    view: vnode => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", vnode.attrs.header ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_4__header__["a" /* default */]) : null, vnode.children, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("a", {
        href: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].githubHref,
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].github
    }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_3__icons__["a" /* default */], { icon: "github" })), __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].modal ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_5__modal__["a" /* default */], "modal") : null)
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export github */
/* harmony default export */ __webpack_exports__["a"] = ({
    "github": "mc4a8c61ea_github"
});
var github = "mc4a8c61ea_github";

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_animResolve__ = __webpack_require__(3);









/* harmony default export */ __webpack_exports__["a"] = ({
    oncreate: vnode => {
        __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].header = {
            height: vnode.dom.offsetHeight
        };
    },
    onbeforeremove: vnode => Object(__WEBPACK_IMPORTED_MODULE_4__lib_animResolve__["a" /* default */])(vnode.dom, __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].headerOut),
    view: () => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].headerIn }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("h1", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].title }, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song ? __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song.title : __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].appName), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].logo }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("a", {
        href: "/",
        oncreate: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.route.link
    }, "logo")), __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_3__tools__["a" /* default */]) : null)
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export dur */
/* unused harmony export header */
/* unused harmony export headerIn */
/* unused harmony export headerOut */
/* unused harmony export logo */
/* unused harmony export title */
/* harmony default export */ __webpack_exports__["a"] = ({
    "dur": "0.3s",
    "header": "mcd924ca8c_header",
    "headerIn": "mcd924ca8c_header mcd924ca8c_headerIn",
    "headerOut": "mcd924ca8c_header mcd924ca8c_headerOut",
    "logo": "mcd924ca8c_logo",
    "title": "mc70832d4a_title mcd924ca8c_title"
});
var dur = "0.3s";
var header = "mcd924ca8c_header";
var headerIn = "mcd924ca8c_header mcd924ca8c_headerIn";
var headerOut = "mcd924ca8c_header mcd924ca8c_headerOut";
var logo = "mcd924ca8c_logo";
var title = "mc70832d4a_title mcd924ca8c_title";

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tooltip_css__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icons__ = __webpack_require__(2);








/* harmony default export */ __webpack_exports__["a"] = ({
    view: vnode => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: vnode.state.show ? __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].tools : __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].toolsHide },

    // Show/hide tool button
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].show,
        onclick: () => {
            vnode.state.show = !vnode.state.show;

            if (!vnode.state.show) {
                __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("HIDE TOOLS");
            }
        }
    }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_4__icons__["a" /* default */], { icon: "edit" })),

    // Style buttons
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].setting }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("label", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].label }, "styles "), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].control }, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].styles.map((style, idx) => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].style && __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].style.idx === idx ? __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */][`${style}Selected`] : __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */][style],

        onclick: () => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("CLICK STYLE", idx);
        }
    }, `${idx}`)))),

    // Font choices
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].setting }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("label", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].label }, "font "), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].control }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("label", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].font,
        onmouseover: () => {
            vnode.state.range = Date.now();
        },
        onmouseout: () => {
            let now = Date.now();

            setTimeout(() => {
                if (now < vnode.state.range) {
                    return;
                }

                vnode.state.range = false;

                __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.redraw();
            }, 300);
        }
    }, parseFloat(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].font.size, 10).toFixed(2)), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("input", {
        type: "range",
        min: 0.7,
        max: 2,
        step: 0.05,

        class: vnode.state.range ? __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].range : __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].rangeHide,

        onmouseover: () => {
            vnode.state.range = Date.now();
        },
        onmouseout: () => {
            let now = Date.now();

            setTimeout(() => {
                if (now < vnode.state.range) {
                    return;
                }

                vnode.state.range = false;

                __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.redraw();
            }, 300);
        },

        value: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].font.size,
        oninput: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.withAttr("value", v => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].font.size = v;
        })
    }))),

    // Column
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].setting }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("label", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].label }, "cols "), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].control }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].dec,
        onclick: () => {
            if (__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].cols.count === 1) {
                return;
            }

            --__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].cols.count;
        }
    }, "<"), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("label", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].cols }, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].cols.count), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].inc,
        onclick: () => {
            ++__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].cols.count;
        }
    }, ">"))), __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].setting }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("label", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].label }, __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.trust("&nbsp;")), // I'm a terrible person
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].control }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].edit,
        onclick: () => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("TOGGLE EDIT CURRENT SONG");
        }
    }, "edit"))),

    // Style tooltip
    __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].style ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", {
        class: __WEBPACK_IMPORTED_MODULE_3__tooltip_css__["a" /* default */][`s${__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].style.idx}`],
        style: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].tooltip.style
    }) : null)
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export tools */
/* unused harmony export toolsHide */
/* unused harmony export setting */
/* unused harmony export show */
/* unused harmony export label */
/* unused harmony export control */
/* unused harmony export button */
/* unused harmony export s0 */
/* unused harmony export s1 */
/* unused harmony export s2 */
/* unused harmony export s3 */
/* unused harmony export s4 */
/* unused harmony export s5 */
/* unused harmony export selected */
/* unused harmony export s0Selected */
/* unused harmony export s1Selected */
/* unused harmony export s2Selected */
/* unused harmony export s3Selected */
/* unused harmony export s4Selected */
/* unused harmony export s5Selected */
/* unused harmony export font */
/* unused harmony export range */
/* unused harmony export rangeHide */
/* unused harmony export dec */
/* unused harmony export inc */
/* unused harmony export cols */
/* unused harmony export edit */
/* harmony default export */ __webpack_exports__["a"] = ({
    "tools": "mc01651421_tools",
    "toolsHide": "mc01651421_tools mc01651421_toolsHide",
    "setting": "mc01651421_setting",
    "show": "mc01651421_show",
    "label": "mc01651421_label",
    "control": "mc01651421_control",
    "button": "mc70832d4a_button mc01651421_button",
    "s0": "mc70832d4a_button mc01651421_button mc01651421_s0",
    "s1": "mc70832d4a_button mc01651421_button mc01651421_s1",
    "s2": "mc70832d4a_button mc01651421_button mc01651421_s2",
    "s3": "mc70832d4a_button mc01651421_button mc01651421_s3",
    "s4": "mc70832d4a_button mc01651421_button mc01651421_s4",
    "s5": "mc70832d4a_button mc01651421_button mc01651421_s5",
    "selected": "mc01651421_selected",
    "s0Selected": "mc70832d4a_button mc01651421_button mc01651421_s0 mc01651421_selected mc01651421_s0Selected",
    "s1Selected": "mc70832d4a_button mc01651421_button mc01651421_s1 mc01651421_selected mc01651421_s1Selected",
    "s2Selected": "mc70832d4a_button mc01651421_button mc01651421_s2 mc01651421_selected mc01651421_s2Selected",
    "s3Selected": "mc70832d4a_button mc01651421_button mc01651421_s3 mc01651421_selected mc01651421_s3Selected",
    "s4Selected": "mc70832d4a_button mc01651421_button mc01651421_s4 mc01651421_selected mc01651421_s4Selected",
    "s5Selected": "mc70832d4a_button mc01651421_button mc01651421_s5 mc01651421_selected mc01651421_s5Selected",
    "font": "mc01651421_font",
    "range": "mc01651421_range",
    "rangeHide": "mc01651421_range mc01651421_rangeHide",
    "dec": "mc70832d4a_button mc01651421_button mc01651421_dec",
    "inc": "mc70832d4a_button mc01651421_button mc01651421_inc",
    "cols": "mc01651421_cols",
    "edit": "mc70832d4a_button mc01651421_button mc01651421_edit"
});
var tools = "mc01651421_tools";
var toolsHide = "mc01651421_tools mc01651421_toolsHide";
var setting = "mc01651421_setting";
var show = "mc01651421_show";
var label = "mc01651421_label";
var control = "mc01651421_control";
var button = "mc70832d4a_button mc01651421_button";
var s0 = "mc70832d4a_button mc01651421_button mc01651421_s0";
var s1 = "mc70832d4a_button mc01651421_button mc01651421_s1";
var s2 = "mc70832d4a_button mc01651421_button mc01651421_s2";
var s3 = "mc70832d4a_button mc01651421_button mc01651421_s3";
var s4 = "mc70832d4a_button mc01651421_button mc01651421_s4";
var s5 = "mc70832d4a_button mc01651421_button mc01651421_s5";
var selected = "mc01651421_selected";
var s0Selected = "mc70832d4a_button mc01651421_button mc01651421_s0 mc01651421_selected mc01651421_s0Selected";
var s1Selected = "mc70832d4a_button mc01651421_button mc01651421_s1 mc01651421_selected mc01651421_s1Selected";
var s2Selected = "mc70832d4a_button mc01651421_button mc01651421_s2 mc01651421_selected mc01651421_s2Selected";
var s3Selected = "mc70832d4a_button mc01651421_button mc01651421_s3 mc01651421_selected mc01651421_s3Selected";
var s4Selected = "mc70832d4a_button mc01651421_button mc01651421_s4 mc01651421_selected mc01651421_s4Selected";
var s5Selected = "mc70832d4a_button mc01651421_button mc01651421_s5 mc01651421_selected mc01651421_s5Selected";
var font = "mc01651421_font";
var range = "mc01651421_range";
var rangeHide = "mc01651421_range mc01651421_rangeHide";
var dec = "mc70832d4a_button mc01651421_button mc01651421_dec";
var inc = "mc70832d4a_button mc01651421_button mc01651421_inc";
var cols = "mc01651421_cols";
var edit = "mc70832d4a_button mc01651421_button mc01651421_edit";

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export tooltip */
/* unused harmony export s0 */
/* unused harmony export s1 */
/* unused harmony export s2 */
/* unused harmony export s3 */
/* unused harmony export s4 */
/* unused harmony export s5 */
/* harmony default export */ __webpack_exports__["a"] = ({
    "tooltip": "mc6dd10fbf_tooltip",
    "s0": "mc6dd10fbf_tooltip mc6dd10fbf_s0",
    "s1": "mc6dd10fbf_tooltip mc6dd10fbf_s1",
    "s2": "mc6dd10fbf_tooltip mc6dd10fbf_s2",
    "s3": "mc6dd10fbf_tooltip mc6dd10fbf_s3",
    "s4": "mc6dd10fbf_tooltip mc6dd10fbf_s4",
    "s5": "mc6dd10fbf_tooltip mc6dd10fbf_s5"
});
var tooltip = "mc6dd10fbf_tooltip";
var s0 = "mc6dd10fbf_tooltip mc6dd10fbf_s0";
var s1 = "mc6dd10fbf_tooltip mc6dd10fbf_s1";
var s2 = "mc6dd10fbf_tooltip mc6dd10fbf_s2";
var s3 = "mc6dd10fbf_tooltip mc6dd10fbf_s3";
var s4 = "mc6dd10fbf_tooltip mc6dd10fbf_s4";
var s5 = "mc6dd10fbf_tooltip mc6dd10fbf_s5";

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_animResolve__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_css__ = __webpack_require__(27);







/* harmony default export */ __webpack_exports__["a"] = ({
    onbeforeremove: vnode => Object(__WEBPACK_IMPORTED_MODULE_2__lib_animResolve__["a" /* default */])(vnode.dom, __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].modalOut),
    view: vnode => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", {
        class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].modalIn
    }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].content }, vnode.children, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", {
        class: __WEBPACK_IMPORTED_MODULE_3__index_css__["a" /* default */].close,
        onclick: () => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("CLOSE MODAL");
        }
    }, "🗙")))
});

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export modal */
/* unused harmony export modalIn */
/* unused harmony export modalOut */
/* unused harmony export content */
/* unused harmony export close */
/* harmony default export */ __webpack_exports__["a"] = ({
    "modal": "mc744a0be3_modal",
    "modalIn": "mc744a0be3_modal mc744a0be3_modalIn",
    "modalOut": "mc744a0be3_modal mc744a0be3_modalOut",
    "content": "mc744a0be3_content",
    "close": "mc744a0be3_close"
});
var modal = "mc744a0be3_modal";
var modalIn = "mc744a0be3_modal mc744a0be3_modalIn";
var modalOut = "mc744a0be3_modal mc744a0be3_modalOut";
var content = "mc744a0be3_content";
var close = "mc744a0be3_close";

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit__ = __webpack_require__(30);







function addBr(text) {
    return text.replace(/\n/g, "<br>");
}

/* harmony default export */ __webpack_exports__["a"] = ({
    oninit: () => {
        if (__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song.untitled) {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("OPEN TITLE MODAL");
        }
    },
    view: () => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].lyredit }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].lyrics,
        style: {
            fontSize: `${__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].font.size}em`,
            columnCount: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].cols.count
        }
    }, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song.lyrics.map((part, idx) => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("p", {
        id: part.hash,
        class: [__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].selected === idx ? __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].lineSelected : __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].line, part.style ? __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */][`s${part.style.idx}`] : null].join(" "),

        onclick: () => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("CLICK LYRIC", idx);
        }
    }, __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.trust(addBr(part.text))))), __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].edit ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()(__WEBPACK_IMPORTED_MODULE_3__edit__["a" /* default */]) : null)
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export lyredit */
/* unused harmony export lyrics */
/* unused harmony export line */
/* unused harmony export lineSelected */
/* unused harmony export s0 */
/* unused harmony export s1 */
/* unused harmony export s2 */
/* unused harmony export s3 */
/* unused harmony export s4 */
/* unused harmony export s5 */
/* harmony default export */ __webpack_exports__["a"] = ({
    "lyredit": "mce5e74019_lyredit",
    "lyrics": "mce5e74019_lyrics",
    "line": "mce5e74019_line",
    "lineSelected": "mce5e74019_line mce5e74019_lineSelected",
    "s0": "mce5e74019_line mce5e74019_s0",
    "s1": "mce5e74019_line mce5e74019_s1",
    "s2": "mce5e74019_line mce5e74019_s2",
    "s3": "mce5e74019_line mce5e74019_s3",
    "s4": "mce5e74019_line mce5e74019_s4",
    "s5": "mce5e74019_line mce5e74019_s5"
});
var lyredit = "mce5e74019_lyredit";
var lyrics = "mce5e74019_lyrics";
var line = "mce5e74019_line";
var lineSelected = "mce5e74019_line mce5e74019_lineSelected";
var s0 = "mce5e74019_line mce5e74019_s0";
var s1 = "mce5e74019_line mce5e74019_s1";
var s2 = "mce5e74019_line mce5e74019_s2";
var s3 = "mce5e74019_line mce5e74019_s3";
var s4 = "mce5e74019_line mce5e74019_s4";
var s5 = "mce5e74019_line mce5e74019_s5";

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_css__ = __webpack_require__(31);






/* harmony default export */ __webpack_exports__["a"] = ({
    view: () => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__edit_css__["a" /* default */].edit }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("textarea", {
        class: __WEBPACK_IMPORTED_MODULE_2__edit_css__["a" /* default */].textarea,
        value: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song.lyricString,
        oninput: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.withAttr("value", v => {
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].song.lyricString = v;
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("UPDATE PARSED LYRICS");
        })
    }))
});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export edit */
/* unused harmony export textarea */
/* harmony default export */ __webpack_exports__["a"] = ({
    "edit": "mc68640514_edit",
    "textarea": "mc68640514_textarea"
});
var edit = "mc68640514_edit";
var textarea = "mc68640514_textarea";

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);




/* harmony default export */ __webpack_exports__["a"] = ({
    view: () => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", "shit", __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].error)
});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mithril___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mithril__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(34);






/* harmony default export */ __webpack_exports__["a"] = ({
    view: vnode => [__WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].home }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("h1", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].title }, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].appName),
    // load button

    __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].dash }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("textarea", {
        class: vnode.state.focused ? __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].textareaFocused : __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].textarea,
        value: vnode.state.lyricsValue,
        placeholder: vnode.state.hidePlaceholder ? "" : "paste or drop lyrics",
        onfocus: () => {
            vnode.state.focused = true;
            vnode.state.hidePlaceholder = true;
        },
        onblur: () => {
            vnode.state.hidePlaceholder = false;
        },
        oninput: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.withAttr("value", v => {
            vnode.state.lyricsValue = v;
            vnode.state.loadable = v.length;
        })
    })), vnode.state.loadable ? __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].btnWrap }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("button", {
        class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].loadBtn,
        onclick: () => {
            let slug = __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("LOAD SONG", vnode.state.lyricsValue);

            delete vnode.state.textarea;
            delete vnode.state.load;

            return __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.route.set(slug);
        }
    }, "load song")) : null,

    // loaded songs list
    __WEBPACK_IMPORTED_MODULE_0_mithril___default()("div", { class: __WEBPACK_IMPORTED_MODULE_2__index_css__["a" /* default */].list }, __WEBPACK_IMPORTED_MODULE_0_mithril___default()("h3", "or choose a song"), __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].songs ? __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].songs.map((song, idx) => __WEBPACK_IMPORTED_MODULE_0_mithril___default()("a", {
        onclick: () => {
            console.log("open song");
            __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].action("OPEN SONG", idx);
        },
        oncreate: __WEBPACK_IMPORTED_MODULE_0_mithril___default.a.route.link,
        href: `/${song.slug}`
    }, song.title)) : null))]
});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fontFamily */
/* unused harmony export home */
/* unused harmony export dash */
/* unused harmony export textarea */
/* unused harmony export textareaFocused */
/* unused harmony export btnWrap */
/* unused harmony export loadBtn */
/* unused harmony export list */
/* unused harmony export title */
/* harmony default export */ __webpack_exports__["a"] = ({
    "fontFamily": "Raleway",
    "home": "mc63387611_home",
    "dash": "mc63387611_dash",
    "textarea": "mc63387611_textarea",
    "textareaFocused": "mc63387611_textarea mc63387611_textareaFocused",
    "btnWrap": "mc63387611_btnWrap",
    "loadBtn": "mc70832d4a_button mc63387611_loadBtn",
    "list": "mc63387611_list",
    "title": "mc70832d4a_title mc63387611_title"
});
var fontFamily = "Raleway";
var home = "mc63387611_home";
var dash = "mc63387611_dash";
var textarea = "mc63387611_textarea";
var textareaFocused = "mc63387611_textarea mc63387611_textareaFocused";
var btnWrap = "mc63387611_btnWrap";
var loadBtn = "mc70832d4a_button mc63387611_loadBtn";
var list = "mc63387611_list";
var title = "mc70832d4a_title mc63387611_title";

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map