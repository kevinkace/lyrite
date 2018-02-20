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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = m;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const m = __webpack_require__(0);

const get = __webpack_require__(6).get;

const State = {};

const styles = ["s0", "s1", "s2", "s3", "s4", "s5"];

const actions = {
    "CLICK LYRIC": idx => {
        const lineStyleIsSetStyle = get(State, "style.idx") === get(State, `song.lyrics.${idx}.style.idx`);

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

        // Nothing is selected so don't color anything
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

        window.removeEventListener("mousemove", State.events.mousemove);
    }
};

// State

State.styles = styles;

State.events = {
    mousemove: e => {
        State.tooltip.style = {
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
            opacity: e.clientY > State.header.height ? 0.8 : 0
        };

        m.redraw();
    }
};

Object.assign(actions, __webpack_require__(7)(State));

State.action = (name, value) => actions[name](value);

// State.load   = (songObj) => {
//     // if(songObj.action) {
//     //     State.error("NO ACTION");

//     //     return;
//     // }

//     State.song = songObj.song;
// };

State.font = { size: "1.3" };

State.cols = { count: 2 };

State.error = err => {
    console.error(err);
};

module.exports = State;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);
__webpack_require__(4);

const m = __webpack_require__(0);

const routes = __webpack_require__(5);

const mountEl = document.getElementById("mount");

m.route.prefix("");

m.route(mountEl, "/", routes);

window.m = m;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mount", function() { return mount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "button", function() { return button; });
/* harmony default export */ __webpack_exports__["default"] = ({
    "mount": "mount",
    "button": "mc70832d4a_button"
});
var mount = "mount";
var button = "mc70832d4a_button";

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const m = __webpack_require__(0);

const state = __webpack_require__(1);

const header = __webpack_require__(15);
const lyrics = __webpack_require__(21);
const home = __webpack_require__(23);

function wrap(...components) {
    return {
        view: () => components.map(m)
    };
}

module.exports = {
    "/": {
        onmatch: () => {
            if (!state.songs) {
                state.action("LOAD DEFAULT SONGS");
            } else {
                state.action("CLOSE SONG");
            }

            return wrap(header, home);
        }
    },

    "/:slug": {
        onmatch: args => {
            if (!state.songs) {
                state.action("LOAD DEFAULT SONGS");
            }

            state.action("OPEN SONG BY SLUG", args.slug);

            return wrap(header, lyrics);
        }
    }
};

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const eol = __webpack_require__(8);
const hash = __webpack_require__(10);
const slugify = __webpack_require__(11);

const titleSplit = "\n\n---\n\n";

const songs = [__webpack_require__(12), __webpack_require__(13), __webpack_require__(14)];

module.exports = State => ({
    "LOAD SONG": songString => {
        const parts = eol.lf(songString).split(titleSplit);
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
        } else {
            song.title = `untitled ${State.songs.length}`;
            song.lyrics = parts[0];
        }

        song.slug = slugify(song.title);

        song.lyrics = song.lyrics.split("\n\n").map(text => ({
            hash: hash(text),
            text
        }));
    },

    "LOAD DEFAULT SONGS": () => {
        songs.forEach(song => {
            State.action("LOAD SONG", song);
        });
    },

    "OPEN SONG": idx => {
        State.song = State.songs[idx];
    },

    "OPEN SONG BY SLUG": slug => {
        let songIdx;

        State.songs.some((song, idx) => {
            if (song.slug !== slug) {
                return false;
            }

            songIdx = idx;

            return true;
        });

        if (!songIdx) {
            State.error = "song not found";
        }

        State.action("OPEN SONG", songIdx);
    },

    "CLOSE SONG": () => {
        delete State.song;
    }
});

/***/ }),
/* 8 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports) {

module.exports = "Smells Like Teen Spirit\n\n---\n\nLoad up on guns, Bring your friends\nIt's fun to lose and to pretend\n\nShe's overboard, self assured\nOh no I know, a dirty word\n\nHello, hello, hello, how low [x3]\nHello, hello, hello\n\nWith the lights out, it's less dangerous\nHere we are now, entertain us\nI feel stupid and contagious\nHere we are now, entertain us\n\nA mulatto, an Albino\nA mosquito, my libido, yeah\n\nHey, yay\n\nI'm worse at what I do best\nAnd for this gift, I feel blessed\n\nOur little group has always been\nAnd always will until the end\n\nHello, hello, hello, how low [x3]\nHello, hello, hello\n\nWith the lights out, it's less dangerous\nHere we are now, entertain us\nI feel stupid and contagious\nHere we are now, entertain us\n\nA mulatto, an Albino\nA mosquito, my libido, yeah\n\nHey, yay\n\nAnd I forget just why I taste\nOh yeah, I guess it makes me smile\n\nI found it hard, it was hard to find\nOh well, whatever, nevermind\n\nHello, hello, hello, how low [x3]\nHello, hello, hello\n\nWith the lights out, it's less dangerous\nHere we are now, entertain us\nI feel stupid and contagious\nHere we are now, entertain us\n\nA mulatto, an Albino\nA mosquito, my libido\n\nA denial, A denial, A denial, A denial, A denial\nA denial, A denial, A denial, A denial\n"

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "Judy is a Punk\n\n---\n\nJackie is a punk\nJudy is a runt\nThey both went down to Berlin, joined the Ice Capades\n\nAnd oh, I don't know why\nOh, I don't know why\n\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\n\nSecond verse, same as the first\n\nJackie is a punk\nJudy is a runt\nThey both went down to Berlin, joined the Ice Capades\n\nAnd oh, I don't know why\nOh, I don't know why\n\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\n\nThird verse, different from the first\n\nJackie is a punk\nJudy is a runt\nThey both went down to San Frisco, joined the SLA\n\nAnd oh, I don't know why\nOh, I don't know why\n\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\n"

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "Hatebreeders\n\n---\n\nWhoa oh oh\nNo\nWhoa oh oh\nHate breeders\nWhoa oh oh\nWhoa oh oh\nHate breeders\nWhoa oh oh\n\nBrain invasion goin' on in everyone\nYou feel the things that make your world turn angry red\nBecause the next time you can't take it\nNext thought murderlation\nAnd hate is all you want to know\n\nWhoa oh oh\nHate breeders\nWhoa oh oh\n(x4)\n\nMurder one inborn into your every cell\nIt's in your blood and you can't shake it\nBecause you were bred to take it\nNext stop annihilation\nThey bred the hate right in your bones\n\nWhoa oh oh\nHate breeders\nWhoa oh oh\n(x4)\n\nBecause you were bred to take it\nNext stop annihilation\nThey bred the hate right in your fuckin' bones\n\nWhoa oh oh\nHate breeders\nWhoa oh oh\n(x4)\n\nHate is your mistress and you shall not want\nYou shall not want because your breed is strong\nBecause when they try to break you\nNew world desolation\nAnd strength is all you gotta know\n\nWhoa oh oh\nHate breeders\nWhoa oh oh\n(x4)\n\nAnd all you know\nHatebreeders\nWhoa oh oh\nAnd all you know\nHatebreeders\nWhoa oh oh\n"

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const m = __webpack_require__(0);

const css = __webpack_require__(16);

const tools = __webpack_require__(17);

const state = __webpack_require__(1);

module.exports = {
    oncreate: vnode => {
        state.header = {
            height: vnode.dom.offsetHeight
        };
    },
    view: () => m("div", { class: css.header }, m("h1", { class: css.title }, state.song ? state.song.title : "Lyrite"), m("div", { class: css.logo }, m("a", {
        href: "/",
        oncreate: m.route.link
    }, "logo")), state.song ? m(tools) : null)
};

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "header", function() { return header; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logo", function() { return logo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "title", function() { return title; });
/* harmony default export */ __webpack_exports__["default"] = ({
    "header": "mcd924ca8c_header",
    "logo": "mcd924ca8c_logo",
    "title": "mcd924ca8c_title"
});
var header = "mcd924ca8c_header";
var logo = "mcd924ca8c_logo";
var title = "mcd924ca8c_title";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const m = __webpack_require__(0);

const icons = __webpack_require__(18);
const css = __webpack_require__(19);
const tooltipCss = __webpack_require__(20);

const state = __webpack_require__(1);

module.exports = {
    view: vnode => m("div", { class: vnode.state.show ? css.tools : css.toolsHide },

    // Show/hide tool button
    m("button", {
        class: css.show,
        onclick: () => {
            vnode.state.show = !vnode.state.show;

            if (!vnode.state.show) {
                state.action("HIDE TOOLS");
            }
        }
    }, m("svg", m("use", {
        "xlink:href": `${icons}#icon-quill`
    }))),

    // Style buttons
    m("div", { class: css.setting }, m("label", { class: css.label }, "styles "), m("div", { class: css.control }, state.styles.map((style, idx) => m("button", {
        class: state.style && state.style.idx === idx ? css[`${style}Selected`] : css[style],

        onclick: () => {
            state.action("CLICK STYLE", idx);
        }
    }, `${idx}`)))),

    // Font choices
    m("div", { class: css.setting }, m("label", { class: css.label }, "font "), m("div", { class: css.control }, m("label", {
        class: css.font,
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

                m.redraw();
            }, 300);
        }
    }, parseFloat(state.font.size, 10).toFixed(2)), m("input", {
        type: "range",
        min: 0.7,
        max: 2,
        step: 0.05,

        class: vnode.state.range ? css.range : css.rangeHide,

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

                m.redraw();
            }, 300);
        },

        value: state.font.size,
        oninput: m.withAttr("value", v => {
            state.font.size = v;
        })
    }))),

    // Column
    m("div", { class: css.setting }, m("label", { class: css.label }, "cols "), m("div", { class: css.control }, m("button", {
        class: css.dec,
        onclick: e => {
            if (state.cols.count === 1) {
                return;
            }

            --state.cols.count;
        }
    }, "<"), m("label", { class: css.cols }, state.cols.count), m("button", {
        class: css.inc,
        onclick: e => {
            ++state.cols.count;
        }
    }, ">"))),

    // Style tooltip
    state.style ? m("div", {
        class: tooltipCss[`s${state.style.idx}`],
        style: state.tooltip.style
    }) : null)
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f3a84e11890cd198a6d4b9dcc0b30d10.svg";

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tools", function() { return tools; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toolsHide", function() { return toolsHide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setting", function() { return setting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "show", function() { return show; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "label", function() { return label; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "control", function() { return control; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "button", function() { return button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s0", function() { return s0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s1", function() { return s1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s2", function() { return s2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s3", function() { return s3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s4", function() { return s4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s5", function() { return s5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selected", function() { return selected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s0Selected", function() { return s0Selected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s1Selected", function() { return s1Selected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s2Selected", function() { return s2Selected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s3Selected", function() { return s3Selected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s4Selected", function() { return s4Selected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s5Selected", function() { return s5Selected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "font", function() { return font; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "range", function() { return range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangeHide", function() { return rangeHide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dec", function() { return dec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inc", function() { return inc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cols", function() { return cols; });
/* harmony default export */ __webpack_exports__["default"] = ({
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
    "cols": "mc01651421_cols"
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

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tooltip", function() { return tooltip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s0", function() { return s0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s1", function() { return s1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s2", function() { return s2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s3", function() { return s3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s4", function() { return s4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s5", function() { return s5; });
/* harmony default export */ __webpack_exports__["default"] = ({
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const m = __webpack_require__(0);

const css = __webpack_require__(22);
const state = __webpack_require__(1);

function addBr(text) {
    return text.replace(/\n/g, "<br>");
}

module.exports = {
    view: () => m("div", {
        class: css.lyrics,
        style: {
            fontSize: `${state.font.size}em`,
            columnCount: state.cols.count
        }
    }, state.song.lyrics.map((part, idx) => m("p", {
        id: part.hash,
        class: [state.selected === idx ? css.lineSelected : css.line, part.style ? css[`s${part.style.idx}`] : null].join(" "),

        onclick: () => {
            state.action("CLICK LYRIC", idx);
        }
    }, m.trust(addBr(part.text)))))
};

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lyrics", function() { return lyrics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "line", function() { return line; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineSelected", function() { return lineSelected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s0", function() { return s0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s1", function() { return s1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s2", function() { return s2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s3", function() { return s3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s4", function() { return s4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s5", function() { return s5; });
/* harmony default export */ __webpack_exports__["default"] = ({
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const m = __webpack_require__(0);

const state = __webpack_require__(1);

const css = __webpack_require__(24);

module.exports = {
    view: vnode => m("div", { class: css.home },

    // load button
    m("button", {
        class: css.load,
        onclick: () => {
            vnode.state.load = true;
        }
    }, "load song"),

    // textarea
    vnode.state.load ? [m("textarea", {
        oncreate: textVnode => {
            vnode.state.textarea = textVnode;
        },
        class: css.textarea,
        placeholder: "past song lyrics"
    }), m("button", {
        class: css.loadText,
        onclick: () => {
            state.action("LOAD SONG", vnode.state.textarea.dom.value);
            delete vnode.state.textarea;
            delete vnode.state.load;
        }
    }, "load songs text")] : null,

    // loaded songs list
    m("div", { class: css.list }, state.songs ? state.songs.map((song, idx) => m("a", {
        onclick: () => {
            console.log("open song");
            state.action("OPEN SONG", idx);
        },
        oncreate: m.route.link,
        href: `/${song.slug}`
    }, song.title)) : null))
};

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "home", function() { return home; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load", function() { return load; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "textarea", function() { return textarea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadText", function() { return loadText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "list", function() { return list; });
/* harmony default export */ __webpack_exports__["default"] = ({
    "home": "mc63387611_home",
    "load": "mc70832d4a_button mc63387611_load",
    "textarea": "mc63387611_textarea",
    "loadText": "mc63387611_loadText",
    "list": "mc63387611_list"
});
var home = "mc63387611_home";
var load = "mc70832d4a_button mc63387611_load";
var textarea = "mc63387611_textarea";
var loadText = "mc63387611_loadText";
var list = "mc63387611_list";

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map