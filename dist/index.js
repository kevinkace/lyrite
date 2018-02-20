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

const get = __webpack_require__(6);

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

Object.assign(actions, __webpack_require__(8)(State));

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

const header = __webpack_require__(16);
const lyrics = __webpack_require__(22);
const home = __webpack_require__(24);

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

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const eol = __webpack_require__(9);
const hash = __webpack_require__(11);
const slugify = __webpack_require__(12);

const titleSplit = "\n\n---\n\n";

const songs = [__webpack_require__(13), __webpack_require__(14), __webpack_require__(15)];

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
/* 9 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports) {

module.exports = "Smells Like Teen Spirit\n\n---\n\nLoad up on guns, Bring your friends\nIt's fun to lose and to pretend\n\nShe's overboard, self assured\nOh no I know, a dirty word\n\nHello, hello, hello, how low [x3]\nHello, hello, hello\n\nWith the lights out, it's less dangerous\nHere we are now, entertain us\nI feel stupid and contagious\nHere we are now, entertain us\n\nA mulatto, an Albino\nA mosquito, my libido, yeah\n\nHey, yay\n\nI'm worse at what I do best\nAnd for this gift, I feel blessed\n\nOur little group has always been\nAnd always will until the end\n\nHello, hello, hello, how low [x3]\nHello, hello, hello\n\nWith the lights out, it's less dangerous\nHere we are now, entertain us\nI feel stupid and contagious\nHere we are now, entertain us\n\nA mulatto, an Albino\nA mosquito, my libido, yeah\n\nHey, yay\n\nAnd I forget just why I taste\nOh yeah, I guess it makes me smile\n\nI found it hard, it was hard to find\nOh well, whatever, nevermind\n\nHello, hello, hello, how low [x3]\nHello, hello, hello\n\nWith the lights out, it's less dangerous\nHere we are now, entertain us\nI feel stupid and contagious\nHere we are now, entertain us\n\nA mulatto, an Albino\nA mosquito, my libido\n\nA denial, A denial, A denial, A denial, A denial\nA denial, A denial, A denial, A denial\n"

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "Judy is a Punk\n\n---\n\nJackie is a punk\nJudy is a runt\nThey both went down to Berlin, joined the Ice Capades\n\nAnd oh, I don't know why\nOh, I don't know why\n\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\n\nSecond verse, same as the first\n\nJackie is a punk\nJudy is a runt\nThey both went down to Berlin, joined the Ice Capades\n\nAnd oh, I don't know why\nOh, I don't know why\n\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\n\nThird verse, different from the first\n\nJackie is a punk\nJudy is a runt\nThey both went down to San Frisco, joined the SLA\n\nAnd oh, I don't know why\nOh, I don't know why\n\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\nPerhaps they'll die, oh yeah\n"

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "Hatebreeders\n\n---\n\nWhoa oh oh\nNo\nWhoa oh oh\nHate breeders\nWhoa oh oh\nWhoa oh oh\nHate breeders\nWhoa oh oh\n\nBrain invasion goin' on in everyone\nYou feel the things that make your world turn angry red\nBecause the next time you can't take it\nNext thought murderlation\nAnd hate is all you want to know\n\nWhoa oh oh\nHate breeders\nWhoa oh oh\n(x4)\n\nMurder one inborn into your every cell\nIt's in your blood and you can't shake it\nBecause you were bred to take it\nNext stop annihilation\nThey bred the hate right in your bones\n\nWhoa oh oh\nHate breeders\nWhoa oh oh\n(x4)\n\nBecause you were bred to take it\nNext stop annihilation\nThey bred the hate right in your fuckin' bones\n\nWhoa oh oh\nHate breeders\nWhoa oh oh\n(x4)\n\nHate is your mistress and you shall not want\nYou shall not want because your breed is strong\nBecause when they try to break you\nNew world desolation\nAnd strength is all you gotta know\n\nWhoa oh oh\nHate breeders\nWhoa oh oh\n(x4)\n\nAnd all you know\nHatebreeders\nWhoa oh oh\nAnd all you know\nHatebreeders\nWhoa oh oh\n"

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const m = __webpack_require__(0);

const css = __webpack_require__(17);

const tools = __webpack_require__(18);

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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const m = __webpack_require__(0);

const icons = __webpack_require__(19);
const css = __webpack_require__(20);
const tooltipCss = __webpack_require__(21);

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f3a84e11890cd198a6d4b9dcc0b30d10.svg";

/***/ }),
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const m = __webpack_require__(0);

const css = __webpack_require__(23);
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const m = __webpack_require__(0);

const state = __webpack_require__(1);

const css = __webpack_require__(25);

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
/* 25 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjYyMjhlZTNlNzEzNWUzOTQ4YWMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibVwiIiwid2VicGFjazovLy8uL3NyYy9zdGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21pbmlyZXNldC5jc3MvbWluaXJlc2V0LmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5nZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUvbG9hZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW9sL2VvbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHJpbmctaGFzaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2x1Z2lmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc29uZ3Mvc21lbGxzLWxpa2UtdGVlbi1zcGlyaXQudHh0Iiwid2VicGFjazovLy8uL3NyYy9zb25ncy9qdWR5LWlzLWEtcHVuay50eHQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NvbmdzL2hhdGVicmVlZGVycy50eHQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlYWRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVhZGVyL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9vbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ljb25zLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9vbHMvaW5kZXguY3NzIiwid2VicGFjazovLy8uL3NyYy90b29scy90b29sdGlwLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvbHlyaWNzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9seXJpY3MvaW5kZXguY3NzIiwid2VicGFjazovLy8uL3NyYy9ob21lL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9ob21lL2luZGV4LmNzcyJdLCJuYW1lcyI6WyJtIiwicmVxdWlyZSIsImdldCIsIlN0YXRlIiwic3R5bGVzIiwiYWN0aW9ucyIsImlkeCIsImxpbmVTdHlsZUlzU2V0U3R5bGUiLCJzZWxlY3RlZCIsInN0eWxlIiwiYWN0aW9uIiwidG9vbHRpcCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudHMiLCJtb3VzZW1vdmUiLCJzb25nIiwibHlyaWNzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImUiLCJsZWZ0IiwiY2xpZW50WCIsInRvcCIsImNsaWVudFkiLCJvcGFjaXR5IiwiaGVhZGVyIiwiaGVpZ2h0IiwicmVkcmF3IiwiT2JqZWN0IiwiYXNzaWduIiwibmFtZSIsInZhbHVlIiwiZm9udCIsInNpemUiLCJjb2xzIiwiY291bnQiLCJlcnJvciIsImVyciIsImNvbnNvbGUiLCJtb2R1bGUiLCJleHBvcnRzIiwicm91dGVzIiwibW91bnRFbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyb3V0ZSIsInByZWZpeCIsInN0YXRlIiwiaG9tZSIsIndyYXAiLCJjb21wb25lbnRzIiwidmlldyIsIm1hcCIsIm9ubWF0Y2giLCJzb25ncyIsImFyZ3MiLCJzbHVnIiwiZW9sIiwiaGFzaCIsInNsdWdpZnkiLCJ0aXRsZVNwbGl0Iiwic29uZ1N0cmluZyIsInBhcnRzIiwibGYiLCJzcGxpdCIsImxlbmd0aCIsInB1c2giLCJ0aXRsZSIsInRleHQiLCJmb3JFYWNoIiwic29uZ0lkeCIsInNvbWUiLCJjc3MiLCJ0b29scyIsIm9uY3JlYXRlIiwidm5vZGUiLCJkb20iLCJvZmZzZXRIZWlnaHQiLCJjbGFzcyIsImxvZ28iLCJocmVmIiwibGluayIsImljb25zIiwidG9vbHRpcENzcyIsInNob3ciLCJ0b29sc0hpZGUiLCJvbmNsaWNrIiwic2V0dGluZyIsImxhYmVsIiwiY29udHJvbCIsIm9ubW91c2VvdmVyIiwicmFuZ2UiLCJEYXRlIiwibm93Iiwib25tb3VzZW91dCIsInNldFRpbWVvdXQiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsInR5cGUiLCJtaW4iLCJtYXgiLCJzdGVwIiwicmFuZ2VIaWRlIiwib25pbnB1dCIsIndpdGhBdHRyIiwidiIsImRlYyIsImluYyIsImFkZEJyIiwicmVwbGFjZSIsImZvbnRTaXplIiwiY29sdW1uQ291bnQiLCJwYXJ0IiwiaWQiLCJsaW5lU2VsZWN0ZWQiLCJsaW5lIiwiam9pbiIsInRydXN0IiwibG9hZCIsInRleHRWbm9kZSIsInRleHRhcmVhIiwicGxhY2Vob2xkZXIiLCJsb2FkVGV4dCIsImxpc3QiLCJsb2ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSxtQjs7Ozs7OztBQ0FBOztBQUVBLE1BQU1BLElBQUksbUJBQUFDLENBQVEsQ0FBUixDQUFWOztBQUVBLE1BQU1DLE1BQU0sbUJBQUFELENBQVEsQ0FBUixDQUFaOztBQUVBLE1BQU1FLFFBQVEsRUFBZDs7QUFFQSxNQUFNQyxTQUFTLENBQUUsSUFBRixFQUFRLElBQVIsRUFBYyxJ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RyxpQkFQSCxDQVJXLENBQW5CLEdBaUJJLElBNUJSOztBQThCSTtBQUNBdEgsTUFBRSxLQUFGLEVBQVMsRUFBRThFLE9BQVFOLElBQUltRCxJQUFkLEVBQVQsRUFDSTVFLE1BQU1PLEtBQU4sR0FBY1AsTUFBTU8sS0FBTixDQUFZRixHQUFaLENBQWdCLENBQUNwQyxJQUFELEVBQU9WLEdBQVAsS0FDMUJOLEVBQUUsR0FBRixFQUFPO0FBQ0hzRixpQkFBVSxNQUFNO0FBQ1poRCxvQkFBUXNGLEdBQVIsQ0FBWSxXQUFaO0FBQ0E3RSxrQkFBTXJDLE1BQU4sQ0FBYSxXQUFiLEVBQTBCSixHQUExQjtBQUNILFNBSkU7QUFLSG9FLGtCQUFVMUUsRUFBRTZDLEtBQUYsQ0FBUW9DLElBTGY7QUFNSEQsY0FBUSxJQUFHaEUsS0FBS3dDLElBQUs7QUFObEIsS0FBUCxFQU9HeEMsS0FBS21ELEtBUFIsQ0FEVSxDQUFkLEdBU0ksSUFWUixDQS9CSjtBQUZTLENBQWpCLEM7Ozs7Ozs7Ozs7Ozs7K0RDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjYyMjhlZTNlNzEzNWUzOTQ4YWMiLCJtb2R1bGUuZXhwb3J0cyA9IG07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IG0gPSByZXF1aXJlKFwibWl0aHJpbFwiKTtcblxuY29uc3QgZ2V0ID0gcmVxdWlyZShcImxvZGFzaC5nZXRcIik7XG5cbmNvbnN0IFN0YXRlID0ge307XG5cbmNvbnN0IHN0eWxlcyA9IFsgXCJzMFwiLCBcInMxXCIsIFwiczJcIiwgXCJzM1wiLCBcInM0XCIsIFwiczVcIiBdO1xuXG5jb25zdCBhY3Rpb25zID0ge1xuICAgIFwiQ0xJQ0sgTFlSSUNcIiA6IChpZHgpID0+IHtcbiAgICAgICAgY29uc3QgbGluZVN0eWxlSXNTZXRTdHlsZSA9IGdldChTdGF0ZSwgXCJzdHlsZS5pZHhcIikgPT09IGdldChTdGF0ZSwgYHNvbmcubHlyaWNzLiR7aWR4fS5zdHlsZS5pZHhgKTtcblxuICAgICAgICAvLyBEZXNlbGVjdCBseXJpY1xuICAgICAgICAvLyBzZWxlY3RlZCBseXJpYyB3aXRob3V0IGEgc3R5bGUgc2V0XG4gICAgICAgIGlmKFN0YXRlLnNlbGVjdGVkID09PSBpZHggJiYgKCFTdGF0ZS5zdHlsZSB8fCBsaW5lU3R5bGVJc1NldFN0eWxlKSkge1xuICAgICAgICAgICAgZGVsZXRlIFN0YXRlLnNlbGVjdGVkO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbHdheXMgc2V0IHNlbGVjdGVkIG90aGVyd2lzZVxuICAgICAgICBTdGF0ZS5zZWxlY3RlZCA9IGlkeDtcblxuICAgICAgICBpZighU3RhdGUuc3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbG9yXG4gICAgICAgIFN0YXRlLmFjdGlvbihcIkNPTE9SIFNFTEVDVEVEIExZUklDXCIsIFN0YXRlLnN0eWxlLmlkeCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH0sXG5cbiAgICBcIkNMSUNLIFNUWUxFXCIgOiAoaWR4KSA9PiB7XG4gICAgICAgIFN0YXRlLnN0eWxlID0geyBpZHggfTtcblxuICAgICAgICAvLyBDbGlja2luZyBmaXJzdCBzdHlsZSBhZnRlciBvcGVuaW5nIHRvb2xzXG4gICAgICAgIGlmKCFTdGF0ZS50b29sdGlwKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgdHQgb2JqXG4gICAgICAgICAgICBTdGF0ZS50b29sdGlwICA9IHsgc3R5bGUgOiB7fSB9O1xuXG4gICAgICAgICAgICAvLyBhZGQgbGlzdGluZyBmb3IgdHQgcG9zaXRpb25cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIFN0YXRlLmV2ZW50cy5tb3VzZW1vdmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm90aGluZyBpcyBzZWxlY3RlZCBzbyBkb24ndCBjb2xvciBhbnl0aGluZ1xuICAgICAgICBpZighU3RhdGUuc2VsZWN0ZWQgJiYgU3RhdGUuc2VsZWN0ZWQgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbG9yIHNlbGVjdGVkIGx5cmljc1xuICAgICAgICBTdGF0ZS5hY3Rpb24oXCJDT0xPUiBTRUxFQ1RFRCBMWVJJQ1wiLCBpZHgpO1xuXG4gICAgICAgIGRlbGV0ZSBTdGF0ZS5zZWxlY3RlZDtcbiAgICB9LFxuXG4gICAgXCJDT0xPUiBTRUxFQ1RFRCBMWVJJQ1wiIDogKGlkeCkgPT4ge1xuICAgICAgICBTdGF0ZS5zb25nLmx5cmljc1tTdGF0ZS5zZWxlY3RlZF0uc3R5bGUgPSB7IGlkeCB9O1xuICAgIH0sXG5cbiAgICBcIkhJREUgVE9PTFNcIiA6ICgpID0+IHtcbiAgICAgICAgZGVsZXRlIFN0YXRlLnNlbGVjdGVkO1xuICAgICAgICBkZWxldGUgU3RhdGUuc3R5bGU7XG4gICAgICAgIGRlbGV0ZSBTdGF0ZS50b29sdGlwO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIFN0YXRlLmV2ZW50cy5tb3VzZW1vdmUpO1xuICAgIH1cbn07XG5cbi8vIFN0YXRlXG5cblN0YXRlLnN0eWxlcyA9IHN0eWxlcztcblxuU3RhdGUuZXZlbnRzID0ge1xuICAgIG1vdXNlbW92ZSA6IChlKSA9PiB7XG4gICAgICAgIFN0YXRlLnRvb2x0aXAuc3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0IDogYCR7ZS5jbGllbnRYfXB4YCxcbiAgICAgICAgICAgIHRvcCAgOiBgJHtlLmNsaWVudFl9cHhgLFxuICAgICAgICAgICAgb3BhY2l0eSA6IGUuY2xpZW50WSA+IFN0YXRlLmhlYWRlci5oZWlnaHQgPyAwLjggOiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgbS5yZWRyYXcoKTtcbiAgICB9XG59O1xuXG5PYmplY3QuYXNzaWduKGFjdGlvbnMsIHJlcXVpcmUoXCIuL2xvYWRcIikoU3RhdGUpKTtcblxuU3RhdGUuYWN0aW9uID0gKG5hbWUsIHZhbHVlKSA9PiBhY3Rpb25zW25hbWVdKHZhbHVlKTtcblxuLy8gU3RhdGUubG9hZCAgID0gKHNvbmdPYmopID0+IHtcbi8vICAgICAvLyBpZihzb25nT2JqLmFjdGlvbikge1xuLy8gICAgIC8vICAgICBTdGF0ZS5lcnJvcihcIk5PIEFDVElPTlwiKTtcblxuLy8gICAgIC8vICAgICByZXR1cm47XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgU3RhdGUuc29uZyA9IHNvbmdPYmouc29uZztcbi8vIH07XG5cblN0YXRlLmZvbnQgPSB7IHNpemUgOiBcIjEuM1wiIH07XG5cblN0YXRlLmNvbHMgPSB7IGNvdW50IDogMiB9O1xuXG5TdGF0ZS5lcnJvciA9IChlcnIpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0YXRlL2luZGV4LmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnJlcXVpcmUoXCJtaW5pcmVzZXQuY3NzXCIpO1xucmVxdWlyZShcIi4vaW5kZXguY3NzXCIpO1xuXG5jb25zdCBtID0gcmVxdWlyZShcIm1pdGhyaWxcIik7XG5cbmNvbnN0IHJvdXRlcyA9IHJlcXVpcmUoXCIuL3JvdXRlc1wiKTtcblxuY29uc3QgbW91bnRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW91bnRcIik7XG5cbm0ucm91dGUucHJlZml4KFwiXCIpO1xuXG5tLnJvdXRlKG1vdW50RWwsIFwiL1wiLCByb3V0ZXMpO1xuXG53aW5kb3cubSA9IG07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJleHBvcnQgZGVmYXVsdCB7fTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9taW5pcmVzZXQuY3NzL21pbmlyZXNldC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIFwibW91bnRcIjogXCJtb3VudFwiLFxuICAgIFwiYnV0dG9uXCI6IFwibWM3MDgzMmQ0YV9idXR0b25cIlxufTtcbmV4cG9ydCB2YXIgbW91bnQgPSBcIm1vdW50XCI7XG5leHBvcnQgdmFyIGJ1dHRvbiA9IFwibWM3MDgzMmQ0YV9idXR0b25cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IG0gPSByZXF1aXJlKFwibWl0aHJpbFwiKTtcblxuY29uc3Qgc3RhdGUgPSByZXF1aXJlKFwiLi9zdGF0ZVwiKTtcblxuY29uc3QgaGVhZGVyID0gcmVxdWlyZShcIi4vaGVhZGVyXCIpO1xuY29uc3QgbHlyaWNzID0gcmVxdWlyZShcIi4vbHlyaWNzXCIpO1xuY29uc3QgaG9tZSAgID0gcmVxdWlyZShcIi4vaG9tZVwiKTtcblxuZnVuY3Rpb24gd3JhcCguLi5jb21wb25lbnRzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmlldyA6ICgpID0+IGNvbXBvbmVudHMubWFwKG0pXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgXCIvXCIgICAgICA6IHtcbiAgICAgICAgb25tYXRjaCA6ICgpID0+IHtcbiAgICAgICAgICAgIGlmKCFzdGF0ZS5zb25ncykge1xuICAgICAgICAgICAgICAgIHN0YXRlLmFjdGlvbihcIkxPQUQgREVGQVVMVCBTT05HU1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuYWN0aW9uKFwiQ0xPU0UgU09OR1wiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHdyYXAoaGVhZGVyLCBob21lKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBcIi86c2x1Z1wiIDoge1xuICAgICAgICBvbm1hdGNoIDogKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIGlmKCFzdGF0ZS5zb25ncykge1xuICAgICAgICAgICAgICAgIHN0YXRlLmFjdGlvbihcIkxPQUQgREVGQVVMVCBTT05HU1wiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RhdGUuYWN0aW9uKFwiT1BFTiBTT05HIEJZIFNMVUdcIiwgYXJncy5zbHVnKTtcblxuICAgICAgICAgICAgcmV0dXJuIHdyYXAoaGVhZGVyLCBseXJpY3MpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb3V0ZXMuanMiLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUlzRGVlcFByb3AgPSAvXFwufFxcWyg/OlteW1xcXV0qfChbXCInXSkoPzooPyFcXDEpW15cXFxcXXxcXFxcLikqP1xcMSlcXF0vLFxuICAgIHJlSXNQbGFpblByb3AgPSAvXlxcdyokLyxcbiAgICByZUxlYWRpbmdEb3QgPSAvXlxcLi8sXG4gICAgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwkKSkvZztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbCxcbiAgICBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0KG9iamVjdCwgcGF0aCkge1xuICBwYXRoID0gaXNLZXkocGF0aCwgb2JqZWN0KSA/IFtwYXRoXSA6IGNhc3RQYXRoKHBhdGgpO1xuXG4gIHZhciBpbmRleCA9IDAsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAob2JqZWN0ICE9IG51bGwgJiYgaW5kZXggPCBsZW5ndGgpIHtcbiAgICBvYmplY3QgPSBvYmplY3RbdG9LZXkocGF0aFtpbmRleCsrXSldO1xuICB9XG4gIHJldHVybiAoaW5kZXggJiYgaW5kZXggPT0gbGVuZ3RoKSA/IG9iamVjdCA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gKGlzRnVuY3Rpb24odmFsdWUpIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGEgcGF0aCBhcnJheSBpZiBpdCdzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3QgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBzdHJpbmdUb1BhdGgodmFsdWUpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lIGFuZCBub3QgYSBwcm9wZXJ0eSBwYXRoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXkodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicgfHxcbiAgICAgIHZhbHVlID09IG51bGwgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHJlSXNQbGFpblByb3AudGVzdCh2YWx1ZSkgfHwgIXJlSXNEZWVwUHJvcC50ZXN0KHZhbHVlKSB8fFxuICAgIChvYmplY3QgIT0gbnVsbCAmJiB2YWx1ZSBpbiBPYmplY3Qob2JqZWN0KSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemUoZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG5cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAocmVMZWFkaW5nRG90LnRlc3Qoc3RyaW5nKSkge1xuICAgIHJlc3VsdC5wdXNoKCcnKTtcbiAgfVxuICBzdHJpbmcucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcga2V5IGlmIGl0J3Mgbm90IGEgc3RyaW5nIG9yIHN5bWJvbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd8c3ltYm9sfSBSZXR1cm5zIHRoZSBrZXkuXG4gKi9cbmZ1bmN0aW9uIHRvS2V5KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IG1lbW9pemVzIHRoZSByZXN1bHQgb2YgYGZ1bmNgLiBJZiBgcmVzb2x2ZXJgIGlzXG4gKiBwcm92aWRlZCwgaXQgZGV0ZXJtaW5lcyB0aGUgY2FjaGUga2V5IGZvciBzdG9yaW5nIHRoZSByZXN1bHQgYmFzZWQgb24gdGhlXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uLiBCeSBkZWZhdWx0LCB0aGUgZmlyc3QgYXJndW1lbnRcbiAqIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBtYXAgY2FjaGUga2V5LiBUaGUgYGZ1bmNgXG4gKiBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIGNhY2hlIGlzIGV4cG9zZWQgYXMgdGhlIGBjYWNoZWAgcHJvcGVydHkgb24gdGhlIG1lbW9pemVkXG4gKiBmdW5jdGlvbi4gSXRzIGNyZWF0aW9uIG1heSBiZSBjdXN0b21pemVkIGJ5IHJlcGxhY2luZyB0aGUgYF8ubWVtb2l6ZS5DYWNoZWBcbiAqIGNvbnN0cnVjdG9yIHdpdGggb25lIHdob3NlIGluc3RhbmNlcyBpbXBsZW1lbnQgdGhlXG4gKiBbYE1hcGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXByb3BlcnRpZXMtb2YtdGhlLW1hcC1wcm90b3R5cGUtb2JqZWN0KVxuICogbWV0aG9kIGludGVyZmFjZSBvZiBgZGVsZXRlYCwgYGdldGAsIGBoYXNgLCBhbmQgYHNldGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVzb2x2ZXJdIFRoZSBmdW5jdGlvbiB0byByZXNvbHZlIHRoZSBjYWNoZSBrZXkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6IDIgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2MnOiAzLCAnZCc6IDQgfTtcbiAqXG4gKiB2YXIgdmFsdWVzID0gXy5tZW1vaXplKF8udmFsdWVzKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogdmFsdWVzKG90aGVyKTtcbiAqIC8vID0+IFszLCA0XVxuICpcbiAqIG9iamVjdC5hID0gMjtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gTW9kaWZ5IHRoZSByZXN1bHQgY2FjaGUuXG4gKiB2YWx1ZXMuY2FjaGUuc2V0KG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsnYScsICdiJ11cbiAqXG4gKiAvLyBSZXBsYWNlIGBfLm1lbW9pemUuQ2FjaGVgLlxuICogXy5tZW1vaXplLkNhY2hlID0gV2Vha01hcDtcbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZShmdW5jLCByZXNvbHZlcikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJyB8fCAocmVzb2x2ZXIgJiYgdHlwZW9mIHJlc29sdmVyICE9ICdmdW5jdGlvbicpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHZhciBtZW1vaXplZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBrZXkgPSByZXNvbHZlciA/IHJlc29sdmVyLmFwcGx5KHRoaXMsIGFyZ3MpIDogYXJnc1swXSxcbiAgICAgICAgY2FjaGUgPSBtZW1vaXplZC5jYWNoZTtcblxuICAgIGlmIChjYWNoZS5oYXMoa2V5KSkge1xuICAgICAgcmV0dXJuIGNhY2hlLmdldChrZXkpO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICBtZW1vaXplZC5jYWNoZSA9IGNhY2hlLnNldChrZXksIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgbWVtb2l6ZWQuY2FjaGUgPSBuZXcgKG1lbW9pemUuQ2FjaGUgfHwgTWFwQ2FjaGUpO1xuICByZXR1cm4gbWVtb2l6ZWQ7XG59XG5cbi8vIEFzc2lnbiBjYWNoZSB0byBgXy5tZW1vaXplYC5cbm1lbW9pemUuQ2FjaGUgPSBNYXBDYWNoZTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGBvYmplY3RgLiBJZiB0aGUgcmVzb2x2ZWQgdmFsdWUgaXNcbiAqIGB1bmRlZmluZWRgLCB0aGUgYGRlZmF1bHRWYWx1ZWAgaXMgcmV0dXJuZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBmb3IgYHVuZGVmaW5lZGAgcmVzb2x2ZWQgdmFsdWVzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IFt7ICdiJzogeyAnYyc6IDMgfSB9XSB9O1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2FbMF0uYi5jJyk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCBbJ2EnLCAnMCcsICdiJywgJ2MnXSk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCAnYS5iLmMnLCAnZGVmYXVsdCcpO1xuICogLy8gPT4gJ2RlZmF1bHQnXG4gKi9cbmZ1bmN0aW9uIGdldChvYmplY3QsIHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICB2YXIgcmVzdWx0ID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWx1ZSA6IHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2guZ2V0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZW9sICAgICA9IHJlcXVpcmUoXCJlb2xcIik7XG5jb25zdCBoYXNoICAgID0gcmVxdWlyZShcInN0cmluZy1oYXNoXCIpO1xuY29uc3Qgc2x1Z2lmeSA9IHJlcXVpcmUoXCJzbHVnaWZ5XCIpO1xuXG5jb25zdCB0aXRsZVNwbGl0ID0gXCJcXG5cXG4tLS1cXG5cXG5cIjtcblxuY29uc3Qgc29uZ3MgPSBbXG4gICAgcmVxdWlyZShcIi4uL3NvbmdzL3NtZWxscy1saWtlLXRlZW4tc3Bpcml0LnR4dFwiKSxcbiAgICByZXF1aXJlKFwiLi4vc29uZ3MvanVkeS1pcy1hLXB1bmsudHh0XCIpLFxuICAgIHJlcXVpcmUoXCIuLi9zb25ncy9oYXRlYnJlZWRlcnMudHh0XCIpXG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChTdGF0ZSkgPT4gKHtcbiAgICBcIkxPQUQgU09OR1wiIDogKHNvbmdTdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgcGFydHMgPSBlb2wubGYoc29uZ1N0cmluZykuc3BsaXQodGl0bGVTcGxpdCk7XG4gICAgICAgIGNvbnN0IHNvbmcgPSB7fTtcblxuICAgICAgICBpZihwYXJ0cy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBTdGF0ZS5lcnJvciA9IFwibG9hZGluZyBhIGluY29ycmVjdGx5IGZvcm1hdHRlZCBzb25nXCI7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIFN0YXRlLnNvbmdzID0gU3RhdGUuc29uZ3MgfHwgW107XG4gICAgICAgIFN0YXRlLnNvbmdzLnB1c2goc29uZyk7XG5cbiAgICAgICAgaWYocGFydHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBzb25nLnRpdGxlID0gcGFydHNbMF07XG4gICAgICAgICAgICBzb25nLmx5cmljcyA9IHBhcnRzWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc29uZy50aXRsZSA9IGB1bnRpdGxlZCAke1N0YXRlLnNvbmdzLmxlbmd0aH1gO1xuICAgICAgICAgICAgc29uZy5seXJpY3MgPSBwYXJ0c1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNvbmcuc2x1ZyA9IHNsdWdpZnkoc29uZy50aXRsZSk7XG5cbiAgICAgICAgc29uZy5seXJpY3MgPSBzb25nLmx5cmljc1xuICAgICAgICAgICAgLnNwbGl0KFwiXFxuXFxuXCIpXG4gICAgICAgICAgICAubWFwKCh0ZXh0KSA9PiAoe1xuICAgICAgICAgICAgICAgIGhhc2ggOiBoYXNoKHRleHQpLFxuICAgICAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgIH0pKTtcbiAgICB9LFxuXG4gICAgXCJMT0FEIERFRkFVTFQgU09OR1NcIiA6ICgpID0+IHtcbiAgICAgICAgc29uZ3MuZm9yRWFjaCgoc29uZykgPT4ge1xuICAgICAgICAgICAgU3RhdGUuYWN0aW9uKFwiTE9BRCBTT05HXCIsIHNvbmcpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgXCJPUEVOIFNPTkdcIiA6IChpZHgpID0+IHtcbiAgICAgICAgU3RhdGUuc29uZyA9IFN0YXRlLnNvbmdzW2lkeF07XG4gICAgfSxcblxuICAgIFwiT1BFTiBTT05HIEJZIFNMVUdcIiA6IChzbHVnKSA9PiB7XG4gICAgICAgIGxldCBzb25nSWR4O1xuXG4gICAgICAgIFN0YXRlLnNvbmdzLnNvbWUoKHNvbmcsIGlkeCkgPT4ge1xuICAgICAgICAgICAgaWYoc29uZy5zbHVnICE9PSBzbHVnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzb25nSWR4ID0gaWR4O1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoIXNvbmdJZHgpIHtcbiAgICAgICAgICAgIFN0YXRlLmVycm9yID0gXCJzb25nIG5vdCBmb3VuZFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgU3RhdGUuYWN0aW9uKFwiT1BFTiBTT05HXCIsIHNvbmdJZHgpO1xuICAgIH0sXG5cbiAgICBcIkNMT1NFIFNPTkdcIiA6ICgpID0+IHtcbiAgICAgICAgZGVsZXRlIFN0YXRlLnNvbmc7XG4gICAgfVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3RhdGUvbG9hZC5qcyIsIiFmdW5jdGlvbihyb290LCBuYW1lLCBtYWtlKSB7XHJcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gbWFrZSgpXHJcbiAgZWxzZSByb290W25hbWVdID0gbWFrZSgpXHJcbn0odGhpcywgJ2VvbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICB2YXIgYXBpID0ge31cclxuICB2YXIgaXNXaW5kb3dzID0gdHlwZW9mIHByb2Nlc3MgIT0gJ3VuZGVmaW5lZCcgJiYgJ3dpbjMyJyA9PT0gcHJvY2Vzcy5wbGF0Zm9ybVxyXG4gIHZhciBsaW5lYnJlYWsgPSBpc1dpbmRvd3MgPyAnXFxyXFxuJyA6ICdcXG4nXHJcbiAgdmFyIG5ld2xpbmUgPSAvXFxyXFxufFxccnxcXG4vZ1xyXG5cclxuICBmdW5jdGlvbiBiZWZvcmUodGV4dCkge1xyXG4gICAgcmV0dXJuIGxpbmVicmVhayArIHRleHRcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFmdGVyKHRleHQpIHtcclxuICAgIHJldHVybiB0ZXh0ICsgbGluZWJyZWFrXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjb252ZXJ0cyh0bykge1xyXG4gICAgZnVuY3Rpb24gY29udmVydCh0ZXh0KSB7XHJcbiAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UobmV3bGluZSwgdG8pXHJcbiAgICB9XHJcbiAgICBjb252ZXJ0LnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0b1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbnZlcnQgXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzcGxpdCh0ZXh0KSB7XHJcbiAgICByZXR1cm4gdGV4dC5zcGxpdChuZXdsaW5lKVxyXG4gIH1cclxuXHJcbiAgYXBpWydsZiddID0gY29udmVydHMoJ1xcbicpXHJcbiAgYXBpWydjciddID0gY29udmVydHMoJ1xccicpXHJcbiAgYXBpWydjcmxmJ10gPSBjb252ZXJ0cygnXFxyXFxuJylcclxuICBhcGlbJ2F1dG8nXSA9IGNvbnZlcnRzKGxpbmVicmVhaylcclxuICBhcGlbJ2JlZm9yZSddID0gYmVmb3JlXHJcbiAgYXBpWydhZnRlciddID0gYWZ0ZXJcclxuICBhcGlbJ3NwbGl0J10gPSBzcGxpdFxyXG4gIHJldHVybiBhcGlcclxufSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VvbC9lb2wuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIGhhc2goc3RyKSB7XG4gIHZhciBoYXNoID0gNTM4MSxcbiAgICAgIGkgICAgPSBzdHIubGVuZ3RoO1xuXG4gIHdoaWxlKGkpIHtcbiAgICBoYXNoID0gKGhhc2ggKiAzMykgXiBzdHIuY2hhckNvZGVBdCgtLWkpO1xuICB9XG5cbiAgLyogSmF2YVNjcmlwdCBkb2VzIGJpdHdpc2Ugb3BlcmF0aW9ucyAobGlrZSBYT1IsIGFib3ZlKSBvbiAzMi1iaXQgc2lnbmVkXG4gICAqIGludGVnZXJzLiBTaW5jZSB3ZSB3YW50IHRoZSByZXN1bHRzIHRvIGJlIGFsd2F5cyBwb3NpdGl2ZSwgY29udmVydCB0aGVcbiAgICogc2lnbmVkIGludCB0byBhbiB1bnNpZ25lZCBieSBkb2luZyBhbiB1bnNpZ25lZCBiaXRzaGlmdC4gKi9cbiAgcmV0dXJuIGhhc2ggPj4+IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0cmluZy1oYXNoL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbjsoZnVuY3Rpb24gKG5hbWUsIHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpXG4gICAgbW9kdWxlLmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZhY3RvcnkoKVxuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmYWN0b3J5KVxuICB9XG4gIGVsc2Uge1xuICAgIHJvb3RbbmFtZV0gPSBmYWN0b3J5KClcbiAgfVxufSgnc2x1Z2lmeScsIHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgLyplc2xpbnQtZGlzYWJsZSAqL1xuICB2YXIgY2hhck1hcCA9IEpTT04ucGFyc2UoJ3tcIiRcIjpcImRvbGxhclwiLFwiJlwiOlwiYW5kXCIsXCI8XCI6XCJsZXNzXCIsXCI+XCI6XCJncmVhdGVyXCIsXCJ8XCI6XCJvclwiLFwiwqJcIjpcImNlbnRcIixcIsKjXCI6XCJwb3VuZFwiLFwiwqRcIjpcImN1cnJlbmN5XCIsXCLCpVwiOlwieWVuXCIsXCLCqVwiOlwiKGMpXCIsXCLCqlwiOlwiYVwiLFwiwq5cIjpcIihyKVwiLFwiwrpcIjpcIm9cIixcIsOAXCI6XCJBXCIsXCLDgVwiOlwiQVwiLFwiw4JcIjpcIkFcIixcIsODXCI6XCJBXCIsXCLDhFwiOlwiQVwiLFwiw4VcIjpcIkFcIixcIsOGXCI6XCJBRVwiLFwiw4dcIjpcIkNcIixcIsOIXCI6XCJFXCIsXCLDiVwiOlwiRVwiLFwiw4pcIjpcIkVcIixcIsOLXCI6XCJFXCIsXCLDjFwiOlwiSVwiLFwiw41cIjpcIklcIixcIsOOXCI6XCJJXCIsXCLDj1wiOlwiSVwiLFwiw5BcIjpcIkRcIixcIsORXCI6XCJOXCIsXCLDklwiOlwiT1wiLFwiw5NcIjpcIk9cIixcIsOUXCI6XCJPXCIsXCLDlVwiOlwiT1wiLFwiw5ZcIjpcIk9cIixcIsOYXCI6XCJPXCIsXCLDmVwiOlwiVVwiLFwiw5pcIjpcIlVcIixcIsObXCI6XCJVXCIsXCLDnFwiOlwiVVwiLFwiw51cIjpcIllcIixcIsOeXCI6XCJUSFwiLFwiw59cIjpcInNzXCIsXCLDoFwiOlwiYVwiLFwiw6FcIjpcImFcIixcIsOiXCI6XCJhXCIsXCLDo1wiOlwiYVwiLFwiw6RcIjpcImFcIixcIsOlXCI6XCJhXCIsXCLDplwiOlwiYWVcIixcIsOnXCI6XCJjXCIsXCLDqFwiOlwiZVwiLFwiw6lcIjpcImVcIixcIsOqXCI6XCJlXCIsXCLDq1wiOlwiZVwiLFwiw6xcIjpcImlcIixcIsOtXCI6XCJpXCIsXCLDrlwiOlwiaVwiLFwiw69cIjpcImlcIixcIsOwXCI6XCJkXCIsXCLDsVwiOlwiblwiLFwiw7JcIjpcIm9cIixcIsOzXCI6XCJvXCIsXCLDtFwiOlwib1wiLFwiw7VcIjpcIm9cIixcIsO2XCI6XCJvXCIsXCLDuFwiOlwib1wiLFwiw7lcIjpcInVcIixcIsO6XCI6XCJ1XCIsXCLDu1wiOlwidVwiLFwiw7xcIjpcInVcIixcIsO9XCI6XCJ5XCIsXCLDvlwiOlwidGhcIixcIsO/XCI6XCJ5XCIsXCLEgFwiOlwiQVwiLFwixIFcIjpcImFcIixcIsSCXCI6XCJBXCIsXCLEg1wiOlwiYVwiLFwixIRcIjpcIkFcIixcIsSFXCI6XCJhXCIsXCLEhlwiOlwiQ1wiLFwixIdcIjpcImNcIixcIsSMXCI6XCJDXCIsXCLEjVwiOlwiY1wiLFwixI5cIjpcIkRcIixcIsSPXCI6XCJkXCIsXCLEkFwiOlwiREpcIixcIsSRXCI6XCJkalwiLFwixJJcIjpcIkVcIixcIsSTXCI6XCJlXCIsXCLEllwiOlwiRVwiLFwixJdcIjpcImVcIixcIsSYXCI6XCJlXCIsXCLEmVwiOlwiZVwiLFwixJpcIjpcIkVcIixcIsSbXCI6XCJlXCIsXCLEnlwiOlwiR1wiLFwixJ9cIjpcImdcIixcIsSiXCI6XCJHXCIsXCLEo1wiOlwiZ1wiLFwixKhcIjpcIklcIixcIsSpXCI6XCJpXCIsXCLEqlwiOlwiaVwiLFwixKtcIjpcImlcIixcIsSuXCI6XCJJXCIsXCLEr1wiOlwiaVwiLFwixLBcIjpcIklcIixcIsSxXCI6XCJpXCIsXCLEtlwiOlwia1wiLFwixLdcIjpcImtcIixcIsS7XCI6XCJMXCIsXCLEvFwiOlwibFwiLFwixYFcIjpcIkxcIixcIsWCXCI6XCJsXCIsXCLFg1wiOlwiTlwiLFwixYRcIjpcIm5cIixcIsWFXCI6XCJOXCIsXCLFhlwiOlwiblwiLFwixYdcIjpcIk5cIixcIsWIXCI6XCJuXCIsXCLFkFwiOlwiT1wiLFwixZFcIjpcIm9cIixcIsWSXCI6XCJPRVwiLFwixZNcIjpcIm9lXCIsXCLFmFwiOlwiUlwiLFwixZlcIjpcInJcIixcIsWaXCI6XCJTXCIsXCLFm1wiOlwic1wiLFwixZ5cIjpcIlNcIixcIsWfXCI6XCJzXCIsXCLFoFwiOlwiU1wiLFwixaFcIjpcInNcIixcIsWiXCI6XCJUXCIsXCLFo1wiOlwidFwiLFwixaRcIjpcIlRcIixcIsWlXCI6XCJ0XCIsXCLFqFwiOlwiVVwiLFwixalcIjpcInVcIixcIsWqXCI6XCJ1XCIsXCLFq1wiOlwidVwiLFwixa5cIjpcIlVcIixcIsWvXCI6XCJ1XCIsXCLFsFwiOlwiVVwiLFwixbFcIjpcInVcIixcIsWyXCI6XCJVXCIsXCLFs1wiOlwidVwiLFwixblcIjpcIlpcIixcIsW6XCI6XCJ6XCIsXCLFu1wiOlwiWlwiLFwixbxcIjpcInpcIixcIsW9XCI6XCJaXCIsXCLFvlwiOlwielwiLFwixpJcIjpcImZcIixcIsagXCI6XCJPXCIsXCLGoVwiOlwib1wiLFwixq9cIjpcIlVcIixcIsawXCI6XCJ1XCIsXCLHiFwiOlwiTEpcIixcIseJXCI6XCJsalwiLFwix4tcIjpcIk5KXCIsXCLHjFwiOlwibmpcIixcIsiYXCI6XCJTXCIsXCLImVwiOlwic1wiLFwiyJpcIjpcIlRcIixcIsibXCI6XCJ0XCIsXCLLmlwiOlwib1wiLFwizoZcIjpcIkFcIixcIs6IXCI6XCJFXCIsXCLOiVwiOlwiSFwiLFwizopcIjpcIklcIixcIs6MXCI6XCJPXCIsXCLOjlwiOlwiWVwiLFwizo9cIjpcIldcIixcIs6QXCI6XCJpXCIsXCLOkVwiOlwiQVwiLFwizpJcIjpcIkJcIixcIs6TXCI6XCJHXCIsXCLOlFwiOlwiRFwiLFwizpVcIjpcIkVcIixcIs6WXCI6XCJaXCIsXCLOl1wiOlwiSFwiLFwizphcIjpcIjhcIixcIs6ZXCI6XCJJXCIsXCLOmlwiOlwiS1wiLFwizptcIjpcIkxcIixcIs6cXCI6XCJNXCIsXCLOnVwiOlwiTlwiLFwizp5cIjpcIjNcIixcIs6fXCI6XCJPXCIsXCLOoFwiOlwiUFwiLFwizqFcIjpcIlJcIixcIs6jXCI6XCJTXCIsXCLOpFwiOlwiVFwiLFwizqVcIjpcIllcIixcIs6mXCI6XCJGXCIsXCLOp1wiOlwiWFwiLFwizqhcIjpcIlBTXCIsXCLOqVwiOlwiV1wiLFwizqpcIjpcIklcIixcIs6rXCI6XCJZXCIsXCLOrFwiOlwiYVwiLFwizq1cIjpcImVcIixcIs6uXCI6XCJoXCIsXCLOr1wiOlwiaVwiLFwizrBcIjpcInlcIixcIs6xXCI6XCJhXCIsXCLOslwiOlwiYlwiLFwizrNcIjpcImdcIixcIs60XCI6XCJkXCIsXCLOtVwiOlwiZVwiLFwizrZcIjpcInpcIixcIs63XCI6XCJoXCIsXCLOuFwiOlwiOFwiLFwizrlcIjpcImlcIixcIs66XCI6XCJrXCIsXCLOu1wiOlwibFwiLFwizrxcIjpcIm1cIixcIs69XCI6XCJuXCIsXCLOvlwiOlwiM1wiLFwizr9cIjpcIm9cIixcIs+AXCI6XCJwXCIsXCLPgVwiOlwiclwiLFwiz4JcIjpcInNcIixcIs+DXCI6XCJzXCIsXCLPhFwiOlwidFwiLFwiz4VcIjpcInlcIixcIs+GXCI6XCJmXCIsXCLPh1wiOlwieFwiLFwiz4hcIjpcInBzXCIsXCLPiVwiOlwid1wiLFwiz4pcIjpcImlcIixcIs+LXCI6XCJ5XCIsXCLPjFwiOlwib1wiLFwiz41cIjpcInlcIixcIs+OXCI6XCJ3XCIsXCLQgVwiOlwiWW9cIixcItCCXCI6XCJESlwiLFwi0IRcIjpcIlllXCIsXCLQhlwiOlwiSVwiLFwi0IdcIjpcIllpXCIsXCLQiFwiOlwiSlwiLFwi0IlcIjpcIkxKXCIsXCLQilwiOlwiTkpcIixcItCLXCI6XCJDXCIsXCLQj1wiOlwiRFpcIixcItCQXCI6XCJBXCIsXCLQkVwiOlwiQlwiLFwi0JJcIjpcIlZcIixcItCTXCI6XCJHXCIsXCLQlFwiOlwiRFwiLFwi0JVcIjpcIkVcIixcItCWXCI6XCJaaFwiLFwi0JdcIjpcIlpcIixcItCYXCI6XCJJXCIsXCLQmVwiOlwiSlwiLFwi0JpcIjpcIktcIixcItCbXCI6XCJMXCIsXCLQnFwiOlwiTVwiLFwi0J1cIjpcIk5cIixcItCeXCI6XCJPXCIsXCLQn1wiOlwiUFwiLFwi0KBcIjpcIlJcIixcItChXCI6XCJTXCIsXCLQolwiOlwiVFwiLFwi0KNcIjpcIlVcIixcItCkXCI6XCJGXCIsXCLQpVwiOlwiSFwiLFwi0KZcIjpcIkNcIixcItCnXCI6XCJDaFwiLFwi0KhcIjpcIlNoXCIsXCLQqVwiOlwiU2hcIixcItCqXCI6XCJVXCIsXCLQq1wiOlwiWVwiLFwi0KxcIjpcIlwiLFwi0K1cIjpcIkVcIixcItCuXCI6XCJZdVwiLFwi0K9cIjpcIllhXCIsXCLQsFwiOlwiYVwiLFwi0LFcIjpcImJcIixcItCyXCI6XCJ2XCIsXCLQs1wiOlwiZ1wiLFwi0LRcIjpcImRcIixcItC1XCI6XCJlXCIsXCLQtlwiOlwiemhcIixcItC3XCI6XCJ6XCIsXCLQuFwiOlwiaVwiLFwi0LlcIjpcImpcIixcItC6XCI6XCJrXCIsXCLQu1wiOlwibFwiLFwi0LxcIjpcIm1cIixcItC9XCI6XCJuXCIsXCLQvlwiOlwib1wiLFwi0L9cIjpcInBcIixcItGAXCI6XCJyXCIsXCLRgVwiOlwic1wiLFwi0YJcIjpcInRcIixcItGDXCI6XCJ1XCIsXCLRhFwiOlwiZlwiLFwi0YVcIjpcImhcIixcItGGXCI6XCJjXCIsXCLRh1wiOlwiY2hcIixcItGIXCI6XCJzaFwiLFwi0YlcIjpcInNoXCIsXCLRilwiOlwidVwiLFwi0YtcIjpcInlcIixcItGMXCI6XCJcIixcItGNXCI6XCJlXCIsXCLRjlwiOlwieXVcIixcItGPXCI6XCJ5YVwiLFwi0ZFcIjpcInlvXCIsXCLRklwiOlwiZGpcIixcItGUXCI6XCJ5ZVwiLFwi0ZZcIjpcImlcIixcItGXXCI6XCJ5aVwiLFwi0ZhcIjpcImpcIixcItGZXCI6XCJsalwiLFwi0ZpcIjpcIm5qXCIsXCLRm1wiOlwiY1wiLFwi0Z9cIjpcImR6XCIsXCLSkFwiOlwiR1wiLFwi0pFcIjpcImdcIixcIuC4v1wiOlwiYmFodFwiLFwi4YOQXCI6XCJhXCIsXCLhg5FcIjpcImJcIixcIuGDklwiOlwiZ1wiLFwi4YOTXCI6XCJkXCIsXCLhg5RcIjpcImVcIixcIuGDlVwiOlwidlwiLFwi4YOWXCI6XCJ6XCIsXCLhg5dcIjpcInRcIixcIuGDmFwiOlwiaVwiLFwi4YOZXCI6XCJrXCIsXCLhg5pcIjpcImxcIixcIuGDm1wiOlwibVwiLFwi4YOcXCI6XCJuXCIsXCLhg51cIjpcIm9cIixcIuGDnlwiOlwicFwiLFwi4YOfXCI6XCJ6aFwiLFwi4YOgXCI6XCJyXCIsXCLhg6FcIjpcInNcIixcIuGDolwiOlwidFwiLFwi4YOjXCI6XCJ1XCIsXCLhg6RcIjpcImZcIixcIuGDpVwiOlwia1wiLFwi4YOmXCI6XCJnaFwiLFwi4YOnXCI6XCJxXCIsXCLhg6hcIjpcInNoXCIsXCLhg6lcIjpcImNoXCIsXCLhg6pcIjpcInRzXCIsXCLhg6tcIjpcImR6XCIsXCLhg6xcIjpcInRzXCIsXCLhg61cIjpcImNoXCIsXCLhg65cIjpcImtoXCIsXCLhg69cIjpcImpcIixcIuGDsFwiOlwiaFwiLFwi4bqeXCI6XCJTU1wiLFwi4bqgXCI6XCJBXCIsXCLhuqFcIjpcImFcIixcIuG6olwiOlwiQVwiLFwi4bqjXCI6XCJhXCIsXCLhuqRcIjpcIkFcIixcIuG6pVwiOlwiYVwiLFwi4bqmXCI6XCJBXCIsXCLhuqdcIjpcImFcIixcIuG6qFwiOlwiQVwiLFwi4bqpXCI6XCJhXCIsXCLhuqpcIjpcIkFcIixcIuG6q1wiOlwiYVwiLFwi4bqsXCI6XCJBXCIsXCLhuq1cIjpcImFcIixcIuG6rlwiOlwiQVwiLFwi4bqvXCI6XCJhXCIsXCLhurBcIjpcIkFcIixcIuG6sVwiOlwiYVwiLFwi4bqyXCI6XCJBXCIsXCLhurNcIjpcImFcIixcIuG6tFwiOlwiQVwiLFwi4bq1XCI6XCJhXCIsXCLhurZcIjpcIkFcIixcIuG6t1wiOlwiYVwiLFwi4bq4XCI6XCJFXCIsXCLhurlcIjpcImVcIixcIuG6ulwiOlwiRVwiLFwi4bq7XCI6XCJlXCIsXCLhurxcIjpcIkVcIixcIuG6vVwiOlwiZVwiLFwi4bq+XCI6XCJFXCIsXCLhur9cIjpcImVcIixcIuG7gFwiOlwiRVwiLFwi4buBXCI6XCJlXCIsXCLhu4JcIjpcIkVcIixcIuG7g1wiOlwiZVwiLFwi4buEXCI6XCJFXCIsXCLhu4VcIjpcImVcIixcIuG7hlwiOlwiRVwiLFwi4buHXCI6XCJlXCIsXCLhu4hcIjpcIklcIixcIuG7iVwiOlwiaVwiLFwi4buKXCI6XCJJXCIsXCLhu4tcIjpcImlcIixcIuG7jFwiOlwiT1wiLFwi4buNXCI6XCJvXCIsXCLhu45cIjpcIk9cIixcIuG7j1wiOlwib1wiLFwi4buQXCI6XCJPXCIsXCLhu5FcIjpcIm9cIixcIuG7klwiOlwiT1wiLFwi4buTXCI6XCJvXCIsXCLhu5RcIjpcIk9cIixcIuG7lVwiOlwib1wiLFwi4buWXCI6XCJPXCIsXCLhu5dcIjpcIm9cIixcIuG7mFwiOlwiT1wiLFwi4buZXCI6XCJvXCIsXCLhu5pcIjpcIk9cIixcIuG7m1wiOlwib1wiLFwi4bucXCI6XCJPXCIsXCLhu51cIjpcIm9cIixcIuG7nlwiOlwiT1wiLFwi4bufXCI6XCJvXCIsXCLhu6BcIjpcIk9cIixcIuG7oVwiOlwib1wiLFwi4buiXCI6XCJPXCIsXCLhu6NcIjpcIm9cIixcIuG7pFwiOlwiVVwiLFwi4bulXCI6XCJ1XCIsXCLhu6ZcIjpcIlVcIixcIuG7p1wiOlwidVwiLFwi4buoXCI6XCJVXCIsXCLhu6lcIjpcInVcIixcIuG7qlwiOlwiVVwiLFwi4burXCI6XCJ1XCIsXCLhu6xcIjpcIlVcIixcIuG7rVwiOlwidVwiLFwi4buuXCI6XCJVXCIsXCLhu69cIjpcInVcIixcIuG7sFwiOlwiVVwiLFwi4buxXCI6XCJ1XCIsXCLhu7JcIjpcIllcIixcIuG7s1wiOlwieVwiLFwi4bu0XCI6XCJZXCIsXCLhu7VcIjpcInlcIixcIuG7tlwiOlwiWVwiLFwi4bu3XCI6XCJ5XCIsXCLhu7hcIjpcIllcIixcIuG7uVwiOlwieVwiLFwi4oCYXCI6XCJcXCdcIixcIuKAmVwiOlwiXFwnXCIsXCLigJxcIjpcIlxcXFxcXFwiXCIsXCLigJ1cIjpcIlxcXFxcXFwiXCIsXCLigKBcIjpcIitcIixcIuKAolwiOlwiKlwiLFwi4oCmXCI6XCIuLi5cIixcIuKCoFwiOlwiZWN1XCIsXCLigqJcIjpcImNydXplaXJvXCIsXCLigqNcIjpcImZyZW5jaCBmcmFuY1wiLFwi4oKkXCI6XCJsaXJhXCIsXCLigqVcIjpcIm1pbGxcIixcIuKCplwiOlwibmFpcmFcIixcIuKCp1wiOlwicGVzZXRhXCIsXCLigqhcIjpcInJ1cGVlXCIsXCLigqlcIjpcIndvblwiLFwi4oKqXCI6XCJuZXcgc2hlcXVlbFwiLFwi4oKrXCI6XCJkb25nXCIsXCLigqxcIjpcImV1cm9cIixcIuKCrVwiOlwia2lwXCIsXCLigq5cIjpcInR1Z3Jpa1wiLFwi4oKvXCI6XCJkcmFjaG1hXCIsXCLigrBcIjpcInBlbm55XCIsXCLigrFcIjpcInBlc29cIixcIuKCslwiOlwiZ3VhcmFuaVwiLFwi4oKzXCI6XCJhdXN0cmFsXCIsXCLigrRcIjpcImhyeXZuaWFcIixcIuKCtVwiOlwiY2VkaVwiLFwi4oK5XCI6XCJpbmRpYW4gcnVwZWVcIixcIuKCvVwiOlwicnVzc2lhbiBydWJsZVwiLFwi4oSgXCI6XCJzbVwiLFwi4oSiXCI6XCJ0bVwiLFwi4oiCXCI6XCJkXCIsXCLiiIZcIjpcImRlbHRhXCIsXCLiiJFcIjpcInN1bVwiLFwi4oieXCI6XCJpbmZpbml0eVwiLFwi4pmlXCI6XCJsb3ZlXCIsXCLlhYNcIjpcInl1YW5cIixcIuWGhlwiOlwieWVuXCIsXCLvt7xcIjpcInJpYWxcIn0nKVxuICAvKmVzbGludC1lbmFibGUgKi9cblxuICBmdW5jdGlvbiByZXBsYWNlIChzdHJpbmcsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJylcbiAgICAgID8ge3JlcGxhY2VtZW50OiBvcHRpb25zfVxuICAgICAgOiBvcHRpb25zIHx8IHt9XG5cbiAgICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJycpXG4gICAgICAucmVkdWNlKGZ1bmN0aW9uIChyZXN1bHQsIGNoKSB7XG4gICAgICAgIGlmIChjaGFyTWFwW2NoXSkge1xuICAgICAgICAgIGNoID0gY2hhck1hcFtjaF1cbiAgICAgICAgfVxuICAgICAgICAvLyBhbGxvd2VkXG4gICAgICAgIGNoID0gY2gucmVwbGFjZShvcHRpb25zLnJlbW92ZSB8fCAvW15cXHdcXHMkKl8rfi4oKSdcIiFcXC06QF0vZywgJycpXG4gICAgICAgIHJlc3VsdCArPSBjaFxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9LCAnJylcbiAgICAgIC8vIHRyaW0gbGVhZGluZy90cmFpbGluZyBzcGFjZXNcbiAgICAgIC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbiAgICAgIC8vIGNvbnZlcnQgc3BhY2VzXG4gICAgICAucmVwbGFjZSgvWy1cXHNdKy9nLCBvcHRpb25zLnJlcGxhY2VtZW50IHx8ICctJylcbiAgICAgIC8vIHJlbW92ZSB0cmFpbGluZyBzZXBhcmF0b3JcbiAgICAgIC5yZXBsYWNlKCcje3JlcGxhY2VtZW50fSQnLCAnJylcblxuICAgIHJldHVybiBvcHRpb25zLmxvd2VyID8gc3RyaW5nLnRvTG93ZXJDYXNlKCkgOiBzdHJpbmdcbiAgfVxuXG4gIHJlcGxhY2UuZXh0ZW5kID0gZnVuY3Rpb24gKGN1c3RvbU1hcCkge1xuICAgIGZvciAodmFyIGtleSBpbiBjdXN0b21NYXApIHtcbiAgICAgIGNoYXJNYXBba2V5XSA9IGN1c3RvbU1hcFtrZXldXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcGxhY2Vcbn0pKVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2x1Z2lmeS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIlNtZWxscyBMaWtlIFRlZW4gU3Bpcml0XFxuXFxuLS0tXFxuXFxuTG9hZCB1cCBvbiBndW5zLCBCcmluZyB5b3VyIGZyaWVuZHNcXG5JdCdzIGZ1biB0byBsb3NlIGFuZCB0byBwcmV0ZW5kXFxuXFxuU2hlJ3Mgb3ZlcmJvYXJkLCBzZWxmIGFzc3VyZWRcXG5PaCBubyBJIGtub3csIGEgZGlydHkgd29yZFxcblxcbkhlbGxvLCBoZWxsbywgaGVsbG8sIGhvdyBsb3cgW3gzXVxcbkhlbGxvLCBoZWxsbywgaGVsbG9cXG5cXG5XaXRoIHRoZSBsaWdodHMgb3V0LCBpdCdzIGxlc3MgZGFuZ2Vyb3VzXFxuSGVyZSB3ZSBhcmUgbm93LCBlbnRlcnRhaW4gdXNcXG5JIGZlZWwgc3R1cGlkIGFuZCBjb250YWdpb3VzXFxuSGVyZSB3ZSBhcmUgbm93LCBlbnRlcnRhaW4gdXNcXG5cXG5BIG11bGF0dG8sIGFuIEFsYmlub1xcbkEgbW9zcXVpdG8sIG15IGxpYmlkbywgeWVhaFxcblxcbkhleSwgeWF5XFxuXFxuSSdtIHdvcnNlIGF0IHdoYXQgSSBkbyBiZXN0XFxuQW5kIGZvciB0aGlzIGdpZnQsIEkgZmVlbCBibGVzc2VkXFxuXFxuT3VyIGxpdHRsZSBncm91cCBoYXMgYWx3YXlzIGJlZW5cXG5BbmQgYWx3YXlzIHdpbGwgdW50aWwgdGhlIGVuZFxcblxcbkhlbGxvLCBoZWxsbywgaGVsbG8sIGhvdyBsb3cgW3gzXVxcbkhlbGxvLCBoZWxsbywgaGVsbG9cXG5cXG5XaXRoIHRoZSBsaWdodHMgb3V0LCBpdCdzIGxlc3MgZGFuZ2Vyb3VzXFxuSGVyZSB3ZSBhcmUgbm93LCBlbnRlcnRhaW4gdXNcXG5JIGZlZWwgc3R1cGlkIGFuZCBjb250YWdpb3VzXFxuSGVyZSB3ZSBhcmUgbm93LCBlbnRlcnRhaW4gdXNcXG5cXG5BIG11bGF0dG8sIGFuIEFsYmlub1xcbkEgbW9zcXVpdG8sIG15IGxpYmlkbywgeWVhaFxcblxcbkhleSwgeWF5XFxuXFxuQW5kIEkgZm9yZ2V0IGp1c3Qgd2h5IEkgdGFzdGVcXG5PaCB5ZWFoLCBJIGd1ZXNzIGl0IG1ha2VzIG1lIHNtaWxlXFxuXFxuSSBmb3VuZCBpdCBoYXJkLCBpdCB3YXMgaGFyZCB0byBmaW5kXFxuT2ggd2VsbCwgd2hhdGV2ZXIsIG5ldmVybWluZFxcblxcbkhlbGxvLCBoZWxsbywgaGVsbG8sIGhvdyBsb3cgW3gzXVxcbkhlbGxvLCBoZWxsbywgaGVsbG9cXG5cXG5XaXRoIHRoZSBsaWdodHMgb3V0LCBpdCdzIGxlc3MgZGFuZ2Vyb3VzXFxuSGVyZSB3ZSBhcmUgbm93LCBlbnRlcnRhaW4gdXNcXG5JIGZlZWwgc3R1cGlkIGFuZCBjb250YWdpb3VzXFxuSGVyZSB3ZSBhcmUgbm93LCBlbnRlcnRhaW4gdXNcXG5cXG5BIG11bGF0dG8sIGFuIEFsYmlub1xcbkEgbW9zcXVpdG8sIG15IGxpYmlkb1xcblxcbkEgZGVuaWFsLCBBIGRlbmlhbCwgQSBkZW5pYWwsIEEgZGVuaWFsLCBBIGRlbmlhbFxcbkEgZGVuaWFsLCBBIGRlbmlhbCwgQSBkZW5pYWwsIEEgZGVuaWFsXFxuXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zb25ncy9zbWVsbHMtbGlrZS10ZWVuLXNwaXJpdC50eHRcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJKdWR5IGlzIGEgUHVua1xcblxcbi0tLVxcblxcbkphY2tpZSBpcyBhIHB1bmtcXG5KdWR5IGlzIGEgcnVudFxcblRoZXkgYm90aCB3ZW50IGRvd24gdG8gQmVybGluLCBqb2luZWQgdGhlIEljZSBDYXBhZGVzXFxuXFxuQW5kIG9oLCBJIGRvbid0IGtub3cgd2h5XFxuT2gsIEkgZG9uJ3Qga25vdyB3aHlcXG5cXG5QZXJoYXBzIHRoZXknbGwgZGllLCBvaCB5ZWFoXFxuUGVyaGFwcyB0aGV5J2xsIGRpZSwgb2ggeWVhaFxcblBlcmhhcHMgdGhleSdsbCBkaWUsIG9oIHllYWhcXG5QZXJoYXBzIHRoZXknbGwgZGllLCBvaCB5ZWFoXFxuXFxuU2Vjb25kIHZlcnNlLCBzYW1lIGFzIHRoZSBmaXJzdFxcblxcbkphY2tpZSBpcyBhIHB1bmtcXG5KdWR5IGlzIGEgcnVudFxcblRoZXkgYm90aCB3ZW50IGRvd24gdG8gQmVybGluLCBqb2luZWQgdGhlIEljZSBDYXBhZGVzXFxuXFxuQW5kIG9oLCBJIGRvbid0IGtub3cgd2h5XFxuT2gsIEkgZG9uJ3Qga25vdyB3aHlcXG5cXG5QZXJoYXBzIHRoZXknbGwgZGllLCBvaCB5ZWFoXFxuUGVyaGFwcyB0aGV5J2xsIGRpZSwgb2ggeWVhaFxcblBlcmhhcHMgdGhleSdsbCBkaWUsIG9oIHllYWhcXG5QZXJoYXBzIHRoZXknbGwgZGllLCBvaCB5ZWFoXFxuXFxuVGhpcmQgdmVyc2UsIGRpZmZlcmVudCBmcm9tIHRoZSBmaXJzdFxcblxcbkphY2tpZSBpcyBhIHB1bmtcXG5KdWR5IGlzIGEgcnVudFxcblRoZXkgYm90aCB3ZW50IGRvd24gdG8gU2FuIEZyaXNjbywgam9pbmVkIHRoZSBTTEFcXG5cXG5BbmQgb2gsIEkgZG9uJ3Qga25vdyB3aHlcXG5PaCwgSSBkb24ndCBrbm93IHdoeVxcblxcblBlcmhhcHMgdGhleSdsbCBkaWUsIG9oIHllYWhcXG5QZXJoYXBzIHRoZXknbGwgZGllLCBvaCB5ZWFoXFxuUGVyaGFwcyB0aGV5J2xsIGRpZSwgb2ggeWVhaFxcblBlcmhhcHMgdGhleSdsbCBkaWUsIG9oIHllYWhcXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3NvbmdzL2p1ZHktaXMtYS1wdW5rLnR4dFxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIkhhdGVicmVlZGVyc1xcblxcbi0tLVxcblxcbldob2Egb2ggb2hcXG5Ob1xcbldob2Egb2ggb2hcXG5IYXRlIGJyZWVkZXJzXFxuV2hvYSBvaCBvaFxcbldob2Egb2ggb2hcXG5IYXRlIGJyZWVkZXJzXFxuV2hvYSBvaCBvaFxcblxcbkJyYWluIGludmFzaW9uIGdvaW4nIG9uIGluIGV2ZXJ5b25lXFxuWW91IGZlZWwgdGhlIHRoaW5ncyB0aGF0IG1ha2UgeW91ciB3b3JsZCB0dXJuIGFuZ3J5IHJlZFxcbkJlY2F1c2UgdGhlIG5leHQgdGltZSB5b3UgY2FuJ3QgdGFrZSBpdFxcbk5leHQgdGhvdWdodCBtdXJkZXJsYXRpb25cXG5BbmQgaGF0ZSBpcyBhbGwgeW91IHdhbnQgdG8ga25vd1xcblxcbldob2Egb2ggb2hcXG5IYXRlIGJyZWVkZXJzXFxuV2hvYSBvaCBvaFxcbih4NClcXG5cXG5NdXJkZXIgb25lIGluYm9ybiBpbnRvIHlvdXIgZXZlcnkgY2VsbFxcbkl0J3MgaW4geW91ciBibG9vZCBhbmQgeW91IGNhbid0IHNoYWtlIGl0XFxuQmVjYXVzZSB5b3Ugd2VyZSBicmVkIHRvIHRha2UgaXRcXG5OZXh0IHN0b3AgYW5uaWhpbGF0aW9uXFxuVGhleSBicmVkIHRoZSBoYXRlIHJpZ2h0IGluIHlvdXIgYm9uZXNcXG5cXG5XaG9hIG9oIG9oXFxuSGF0ZSBicmVlZGVyc1xcbldob2Egb2ggb2hcXG4oeDQpXFxuXFxuQmVjYXVzZSB5b3Ugd2VyZSBicmVkIHRvIHRha2UgaXRcXG5OZXh0IHN0b3AgYW5uaWhpbGF0aW9uXFxuVGhleSBicmVkIHRoZSBoYXRlIHJpZ2h0IGluIHlvdXIgZnVja2luJyBib25lc1xcblxcbldob2Egb2ggb2hcXG5IYXRlIGJyZWVkZXJzXFxuV2hvYSBvaCBvaFxcbih4NClcXG5cXG5IYXRlIGlzIHlvdXIgbWlzdHJlc3MgYW5kIHlvdSBzaGFsbCBub3Qgd2FudFxcbllvdSBzaGFsbCBub3Qgd2FudCBiZWNhdXNlIHlvdXIgYnJlZWQgaXMgc3Ryb25nXFxuQmVjYXVzZSB3aGVuIHRoZXkgdHJ5IHRvIGJyZWFrIHlvdVxcbk5ldyB3b3JsZCBkZXNvbGF0aW9uXFxuQW5kIHN0cmVuZ3RoIGlzIGFsbCB5b3UgZ290dGEga25vd1xcblxcbldob2Egb2ggb2hcXG5IYXRlIGJyZWVkZXJzXFxuV2hvYSBvaCBvaFxcbih4NClcXG5cXG5BbmQgYWxsIHlvdSBrbm93XFxuSGF0ZWJyZWVkZXJzXFxuV2hvYSBvaCBvaFxcbkFuZCBhbGwgeW91IGtub3dcXG5IYXRlYnJlZWRlcnNcXG5XaG9hIG9oIG9oXFxuXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zb25ncy9oYXRlYnJlZWRlcnMudHh0XG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgbSA9IHJlcXVpcmUoXCJtaXRocmlsXCIpO1xuXG5jb25zdCBjc3MgPSByZXF1aXJlKFwiLi9pbmRleC5jc3NcIik7XG5cbmNvbnN0IHRvb2xzID0gcmVxdWlyZShcIi4uL3Rvb2xzXCIpO1xuXG5jb25zdCBzdGF0ZSA9IHJlcXVpcmUoXCIuLi9zdGF0ZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgb25jcmVhdGUgOiAodm5vZGUpID0+IHtcbiAgICAgICAgc3RhdGUuaGVhZGVyID0ge1xuICAgICAgICAgICAgaGVpZ2h0IDogdm5vZGUuZG9tLm9mZnNldEhlaWdodFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgdmlldyA6ICgpID0+XG4gICAgICAgIG0oXCJkaXZcIiwgeyBjbGFzcyA6IGNzcy5oZWFkZXIgfSxcbiAgICAgICAgICAgIG0oXCJoMVwiLCB7IGNsYXNzIDogY3NzLnRpdGxlIH0sIHN0YXRlLnNvbmcgPyBzdGF0ZS5zb25nLnRpdGxlIDogXCJMeXJpdGVcIiksXG4gICAgICAgICAgICBtKFwiZGl2XCIsIHsgY2xhc3MgOiBjc3MubG9nbyB9LFxuICAgICAgICAgICAgICAgIG0oXCJhXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgaHJlZiA6IFwiL1wiLFxuICAgICAgICAgICAgICAgICAgICBvbmNyZWF0ZSA6IG0ucm91dGUubGluayxcbiAgICAgICAgICAgICAgICB9LCBcImxvZ29cIilcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzdGF0ZS5zb25nID8gbSh0b29scykgOiBudWxsXG4gICAgICAgIClcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGVhZGVyL2luZGV4LmpzIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIFwiaGVhZGVyXCI6IFwibWNkOTI0Y2E4Y19oZWFkZXJcIixcbiAgICBcImxvZ29cIjogXCJtY2Q5MjRjYThjX2xvZ29cIixcbiAgICBcInRpdGxlXCI6IFwibWNkOTI0Y2E4Y190aXRsZVwiXG59O1xuZXhwb3J0IHZhciBoZWFkZXIgPSBcIm1jZDkyNGNhOGNfaGVhZGVyXCI7XG5leHBvcnQgdmFyIGxvZ28gPSBcIm1jZDkyNGNhOGNfbG9nb1wiO1xuZXhwb3J0IHZhciB0aXRsZSA9IFwibWNkOTI0Y2E4Y190aXRsZVwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2hlYWRlci9pbmRleC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBtID0gcmVxdWlyZShcIm1pdGhyaWxcIik7XG5cbmNvbnN0IGljb25zID0gcmVxdWlyZShcIi4uL2ljb25zLnN2Z1wiKTtcbmNvbnN0IGNzcyA9IHJlcXVpcmUoXCIuL2luZGV4LmNzc1wiKTtcbmNvbnN0IHRvb2x0aXBDc3MgPSByZXF1aXJlKFwiLi90b29sdGlwLmNzc1wiKTtcblxuY29uc3Qgc3RhdGUgPSByZXF1aXJlKFwiLi4vc3RhdGVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHZpZXcgOiAodm5vZGUpID0+XG4gICAgICAgIG0oXCJkaXZcIiwgeyBjbGFzcyA6IHZub2RlLnN0YXRlLnNob3cgPyBjc3MudG9vbHMgOiBjc3MudG9vbHNIaWRlIH0sXG5cbiAgICAgICAgICAgIC8vIFNob3cvaGlkZSB0b29sIGJ1dHRvblxuICAgICAgICAgICAgbShcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzIDogY3NzLnNob3csXG4gICAgICAgICAgICAgICAgICAgIG9uY2xpY2sgOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bm9kZS5zdGF0ZS5zaG93ID0gIXZub2RlLnN0YXRlLnNob3c7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF2bm9kZS5zdGF0ZS5zaG93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuYWN0aW9uKFwiSElERSBUT09MU1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbShcInN2Z1wiLFxuICAgICAgICAgICAgICAgICAgICBtKFwidXNlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieGxpbms6aHJlZlwiIDogYCR7aWNvbnN9I2ljb24tcXVpbGxgXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcblxuICAgICAgICAgICAgLy8gU3R5bGUgYnV0dG9uc1xuICAgICAgICAgICAgbShcImRpdlwiLCB7IGNsYXNzIDogY3NzLnNldHRpbmcgfSxcbiAgICAgICAgICAgICAgICBtKFwibGFiZWxcIiwgeyBjbGFzcyA6IGNzcy5sYWJlbCB9LCBcInN0eWxlcyBcIiksXG4gICAgICAgICAgICAgICAgbShcImRpdlwiLCB7IGNsYXNzIDogY3NzLmNvbnRyb2wgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuc3R5bGVzLm1hcCgoc3R5bGUsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIG0oXCJidXR0b25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzIDogc3RhdGUuc3R5bGUgJiYgc3RhdGUuc3R5bGUuaWR4ID09PSBpZHggPyBjc3NbYCR7c3R5bGV9U2VsZWN0ZWRgXSA6IGNzc1tzdHlsZV0sXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrIDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hY3Rpb24oXCJDTElDSyBTVFlMRVwiLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGAke2lkeH1gKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcblxuICAgICAgICAgICAgLy8gRm9udCBjaG9pY2VzXG4gICAgICAgICAgICBtKFwiZGl2XCIsIHsgY2xhc3MgOiBjc3Muc2V0dGluZyB9LFxuICAgICAgICAgICAgICAgIG0oXCJsYWJlbFwiLCB7IGNsYXNzIDogY3NzLmxhYmVsIH0sIFwiZm9udCBcIiksXG4gICAgICAgICAgICAgICAgbShcImRpdlwiLCB7IGNsYXNzIDogY3NzLmNvbnRyb2wgfSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzIDogY3NzLmZvbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbm1vdXNlb3ZlciA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bm9kZS5zdGF0ZS5yYW5nZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb25tb3VzZW91dCA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihub3cgPCB2bm9kZS5zdGF0ZS5yYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm5vZGUuc3RhdGUucmFuZ2UgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtLnJlZHJhdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIHBhcnNlRmxvYXQoc3RhdGUuZm9udC5zaXplLCAxMCkudG9GaXhlZCgyKSksXG4gICAgICAgICAgICAgICAgICAgIG0oXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlICA6IFwicmFuZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbiAgIDogMC43LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4ICAgOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcCAgOiAwLjA1LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcyA6IHZub2RlLnN0YXRlLnJhbmdlID8gY3NzLnJhbmdlIDogY3NzLnJhbmdlSGlkZSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgb25tb3VzZW92ZXIgOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm5vZGUuc3RhdGUucmFuZ2UgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ubW91c2VvdXQgOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobm93IDwgdm5vZGUuc3RhdGUucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZub2RlLnN0YXRlLnJhbmdlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbS5yZWRyYXcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiBzdGF0ZS5mb250LnNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmlucHV0IDogbS53aXRoQXR0cihcInZhbHVlXCIsICh2KSA9PiB7IHN0YXRlLmZvbnQuc2l6ZSA9IHY7IH0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcblxuICAgICAgICAgICAgLy8gQ29sdW1uXG4gICAgICAgICAgICBtKFwiZGl2XCIsIHsgY2xhc3MgOiBjc3Muc2V0dGluZyB9LFxuICAgICAgICAgICAgICAgIG0oXCJsYWJlbFwiLCB7IGNsYXNzIDogY3NzLmxhYmVsIH0sIFwiY29scyBcIiksXG4gICAgICAgICAgICAgICAgbShcImRpdlwiLCB7IGNsYXNzIDogY3NzLmNvbnRyb2wgfSxcbiAgICAgICAgICAgICAgICAgICAgbShcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcyA6IGNzcy5kZWMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrIDogKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzdGF0ZS5jb2xzLmNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLXN0YXRlLmNvbHMuY291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFwiPFwiKSxcbiAgICAgICAgICAgICAgICAgICAgbShcImxhYmVsXCIsIHsgY2xhc3MgOiBjc3MuY29scyB9LCBzdGF0ZS5jb2xzLmNvdW50KSxcbiAgICAgICAgICAgICAgICAgICAgbShcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcyA6IGNzcy5pbmMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrIDogKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArK3N0YXRlLmNvbHMuY291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFwiPlwiKVxuXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcblxuICAgICAgICAgICAgLy8gU3R5bGUgdG9vbHRpcFxuICAgICAgICAgICAgc3RhdGUuc3R5bGUgP1xuICAgICAgICAgICAgICAgIG0oXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgICBjbGFzcyA6IHRvb2x0aXBDc3NbYHMke3N0YXRlLnN0eWxlLmlkeH1gXSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgOiBzdGF0ZS50b29sdGlwLnN0eWxlXG4gICAgICAgICAgICAgICAgfSkgOlxuICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgKVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90b29scy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImYzYTg0ZTExODkwY2QxOThhNmQ0YjlkY2MwYjMwZDEwLnN2Z1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ljb25zLnN2Z1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIFwidG9vbHNcIjogXCJtYzAxNjUxNDIxX3Rvb2xzXCIsXG4gICAgXCJ0b29sc0hpZGVcIjogXCJtYzAxNjUxNDIxX3Rvb2xzIG1jMDE2NTE0MjFfdG9vbHNIaWRlXCIsXG4gICAgXCJzZXR0aW5nXCI6IFwibWMwMTY1MTQyMV9zZXR0aW5nXCIsXG4gICAgXCJzaG93XCI6IFwibWMwMTY1MTQyMV9zaG93XCIsXG4gICAgXCJsYWJlbFwiOiBcIm1jMDE2NTE0MjFfbGFiZWxcIixcbiAgICBcImNvbnRyb2xcIjogXCJtYzAxNjUxNDIxX2NvbnRyb2xcIixcbiAgICBcImJ1dHRvblwiOiBcIm1jNzA4MzJkNGFfYnV0dG9uIG1jMDE2NTE0MjFfYnV0dG9uXCIsXG4gICAgXCJzMFwiOiBcIm1jNzA4MzJkNGFfYnV0dG9uIG1jMDE2NTE0MjFfYnV0dG9uIG1jMDE2NTE0MjFfczBcIixcbiAgICBcInMxXCI6IFwibWM3MDgzMmQ0YV9idXR0b24gbWMwMTY1MTQyMV9idXR0b24gbWMwMTY1MTQyMV9zMVwiLFxuICAgIFwiczJcIjogXCJtYzcwODMyZDRhX2J1dHRvbiBtYzAxNjUxNDIxX2J1dHRvbiBtYzAxNjUxNDIxX3MyXCIsXG4gICAgXCJzM1wiOiBcIm1jNzA4MzJkNGFfYnV0dG9uIG1jMDE2NTE0MjFfYnV0dG9uIG1jMDE2NTE0MjFfczNcIixcbiAgICBcInM0XCI6IFwibWM3MDgzMmQ0YV9idXR0b24gbWMwMTY1MTQyMV9idXR0b24gbWMwMTY1MTQyMV9zNFwiLFxuICAgIFwiczVcIjogXCJtYzcwODMyZDRhX2J1dHRvbiBtYzAxNjUxNDIxX2J1dHRvbiBtYzAxNjUxNDIxX3M1XCIsXG4gICAgXCJzZWxlY3RlZFwiOiBcIm1jMDE2NTE0MjFfc2VsZWN0ZWRcIixcbiAgICBcInMwU2VsZWN0ZWRcIjogXCJtYzcwODMyZDRhX2J1dHRvbiBtYzAxNjUxNDIxX2J1dHRvbiBtYzAxNjUxNDIxX3MwIG1jMDE2NTE0MjFfc2VsZWN0ZWQgbWMwMTY1MTQyMV9zMFNlbGVjdGVkXCIsXG4gICAgXCJzMVNlbGVjdGVkXCI6IFwibWM3MDgzMmQ0YV9idXR0b24gbWMwMTY1MTQyMV9idXR0b24gbWMwMTY1MTQyMV9zMSBtYzAxNjUxNDIxX3NlbGVjdGVkIG1jMDE2NTE0MjFfczFTZWxlY3RlZFwiLFxuICAgIFwiczJTZWxlY3RlZFwiOiBcIm1jNzA4MzJkNGFfYnV0dG9uIG1jMDE2NTE0MjFfYnV0dG9uIG1jMDE2NTE0MjFfczIgbWMwMTY1MTQyMV9zZWxlY3RlZCBtYzAxNjUxNDIxX3MyU2VsZWN0ZWRcIixcbiAgICBcInMzU2VsZWN0ZWRcIjogXCJtYzcwODMyZDRhX2J1dHRvbiBtYzAxNjUxNDIxX2J1dHRvbiBtYzAxNjUxNDIxX3MzIG1jMDE2NTE0MjFfc2VsZWN0ZWQgbWMwMTY1MTQyMV9zM1NlbGVjdGVkXCIsXG4gICAgXCJzNFNlbGVjdGVkXCI6IFwibWM3MDgzMmQ0YV9idXR0b24gbWMwMTY1MTQyMV9idXR0b24gbWMwMTY1MTQyMV9zNCBtYzAxNjUxNDIxX3NlbGVjdGVkIG1jMDE2NTE0MjFfczRTZWxlY3RlZFwiLFxuICAgIFwiczVTZWxlY3RlZFwiOiBcIm1jNzA4MzJkNGFfYnV0dG9uIG1jMDE2NTE0MjFfYnV0dG9uIG1jMDE2NTE0MjFfczUgbWMwMTY1MTQyMV9zZWxlY3RlZCBtYzAxNjUxNDIxX3M1U2VsZWN0ZWRcIixcbiAgICBcImZvbnRcIjogXCJtYzAxNjUxNDIxX2ZvbnRcIixcbiAgICBcInJhbmdlXCI6IFwibWMwMTY1MTQyMV9yYW5nZVwiLFxuICAgIFwicmFuZ2VIaWRlXCI6IFwibWMwMTY1MTQyMV9yYW5nZSBtYzAxNjUxNDIxX3JhbmdlSGlkZVwiLFxuICAgIFwiZGVjXCI6IFwibWM3MDgzMmQ0YV9idXR0b24gbWMwMTY1MTQyMV9idXR0b24gbWMwMTY1MTQyMV9kZWNcIixcbiAgICBcImluY1wiOiBcIm1jNzA4MzJkNGFfYnV0dG9uIG1jMDE2NTE0MjFfYnV0dG9uIG1jMDE2NTE0MjFfaW5jXCIsXG4gICAgXCJjb2xzXCI6IFwibWMwMTY1MTQyMV9jb2xzXCJcbn07XG5leHBvcnQgdmFyIHRvb2xzID0gXCJtYzAxNjUxNDIxX3Rvb2xzXCI7XG5leHBvcnQgdmFyIHRvb2xzSGlkZSA9IFwibWMwMTY1MTQyMV90b29scyBtYzAxNjUxNDIxX3Rvb2xzSGlkZVwiO1xuZXhwb3J0IHZhciBzZXR0aW5nID0gXCJtYzAxNjUxNDIxX3NldHRpbmdcIjtcbmV4cG9ydCB2YXIgc2hvdyA9IFwibWMwMTY1MTQyMV9zaG93XCI7XG5leHBvcnQgdmFyIGxhYmVsID0gXCJtYzAxNjUxNDIxX2xhYmVsXCI7XG5leHBvcnQgdmFyIGNvbnRyb2wgPSBcIm1jMDE2NTE0MjFfY29udHJvbFwiO1xuZXhwb3J0IHZhciBidXR0b24gPSBcIm1jNzA4MzJkNGFfYnV0dG9uIG1jMDE2NTE0MjFfYnV0dG9uXCI7XG5leHBvcnQgdmFyIHMwID0gXCJtYzcwODMyZDRhX2J1dHRvbiBtYzAxNjUxNDIxX2J1dHRvbiBtYzAxNjUxNDIxX3MwXCI7XG5leHBvcnQgdmFyIHMxID0gXCJtYzcwODMyZDRhX2J1dHRvbiBtYzAxNjUxNDIxX2J1dHRvbiBtYzAxNjUxNDIxX3MxXCI7XG5leHBvcnQgdmFyIHMyID0gXCJtYzcwODMyZDRhX2J1dHRvbiBtYzAxNjUxNDIxX2J1dHRvbiBtYzAxNjUxNDIxX3MyXCI7XG5leHBvcnQgdmFyIHMzID0gXCJtYzcwODMyZDRhX2J1dHRvbiBtYzAxNjUxNDIxX2J1dHRvbiBtYzAxNjUxNDIxX3MzXCI7XG5leHBvcnQgdmFyIHM0ID0gXCJtYzcwODMyZDRhX2J1dHRvbiBtYzAxNjUxNDIxX2J1dHRvbiBtYzAxNjUxNDIxX3M0XCI7XG5leHBvcnQgdmFyIHM1ID0gXCJtYzcwODMyZDRhX2J1dHRvbiBtYzAxNjUxNDIxX2J1dHRvbiBtYzAxNjUxNDIxX3M1XCI7XG5leHBvcnQgdmFyIHNlbGVjdGVkID0gXCJtYzAxNjUxNDIxX3NlbGVjdGVkXCI7XG5leHBvcnQgdmFyIHMwU2VsZWN0ZWQgPSBcIm1jNzA4MzJkNGFfYnV0dG9uIG1jMDE2NTE0MjFfYnV0dG9uIG1jMDE2NTE0MjFfczAgbWMwMTY1MTQyMV9zZWxlY3RlZCBtYzAxNjUxNDIxX3MwU2VsZWN0ZWRcIjtcbmV4cG9ydCB2YXIgczFTZWxlY3RlZCA9IFwibWM3MDgzMmQ0YV9idXR0b24gbWMwMTY1MTQyMV9idXR0b24gbWMwMTY1MTQyMV9zMSBtYzAxNjUxNDIxX3NlbGVjdGVkIG1jMDE2NTE0MjFfczFTZWxlY3RlZFwiO1xuZXhwb3J0IHZhciBzMlNlbGVjdGVkID0gXCJtYzcwODMyZDRhX2J1dHRvbiBtYzAxNjUxNDIxX2J1dHRvbiBtYzAxNjUxNDIxX3MyIG1jMDE2NTE0MjFfc2VsZWN0ZWQgbWMwMTY1MTQyMV9zMlNlbGVjdGVkXCI7XG5leHBvcnQgdmFyIHMzU2VsZWN0ZWQgPSBcIm1jNzA4MzJkNGFfYnV0dG9uIG1jMDE2NTE0MjFfYnV0dG9uIG1jMDE2NTE0MjFfczMgbWMwMTY1MTQyMV9zZWxlY3RlZCBtYzAxNjUxNDIxX3MzU2VsZWN0ZWRcIjtcbmV4cG9ydCB2YXIgczRTZWxlY3RlZCA9IFwibWM3MDgzMmQ0YV9idXR0b24gbWMwMTY1MTQyMV9idXR0b24gbWMwMTY1MTQyMV9zNCBtYzAxNjUxNDIxX3NlbGVjdGVkIG1jMDE2NTE0MjFfczRTZWxlY3RlZFwiO1xuZXhwb3J0IHZhciBzNVNlbGVjdGVkID0gXCJtYzcwODMyZDRhX2J1dHRvbiBtYzAxNjUxNDIxX2J1dHRvbiBtYzAxNjUxNDIxX3M1IG1jMDE2NTE0MjFfc2VsZWN0ZWQgbWMwMTY1MTQyMV9zNVNlbGVjdGVkXCI7XG5leHBvcnQgdmFyIGZvbnQgPSBcIm1jMDE2NTE0MjFfZm9udFwiO1xuZXhwb3J0IHZhciByYW5nZSA9IFwibWMwMTY1MTQyMV9yYW5nZVwiO1xuZXhwb3J0IHZhciByYW5nZUhpZGUgPSBcIm1jMDE2NTE0MjFfcmFuZ2UgbWMwMTY1MTQyMV9yYW5nZUhpZGVcIjtcbmV4cG9ydCB2YXIgZGVjID0gXCJtYzcwODMyZDRhX2J1dHRvbiBtYzAxNjUxNDIxX2J1dHRvbiBtYzAxNjUxNDIxX2RlY1wiO1xuZXhwb3J0IHZhciBpbmMgPSBcIm1jNzA4MzJkNGFfYnV0dG9uIG1jMDE2NTE0MjFfYnV0dG9uIG1jMDE2NTE0MjFfaW5jXCI7XG5leHBvcnQgdmFyIGNvbHMgPSBcIm1jMDE2NTE0MjFfY29sc1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Rvb2xzL2luZGV4LmNzc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIFwidG9vbHRpcFwiOiBcIm1jNmRkMTBmYmZfdG9vbHRpcFwiLFxuICAgIFwiczBcIjogXCJtYzZkZDEwZmJmX3Rvb2x0aXAgbWM2ZGQxMGZiZl9zMFwiLFxuICAgIFwiczFcIjogXCJtYzZkZDEwZmJmX3Rvb2x0aXAgbWM2ZGQxMGZiZl9zMVwiLFxuICAgIFwiczJcIjogXCJtYzZkZDEwZmJmX3Rvb2x0aXAgbWM2ZGQxMGZiZl9zMlwiLFxuICAgIFwiczNcIjogXCJtYzZkZDEwZmJmX3Rvb2x0aXAgbWM2ZGQxMGZiZl9zM1wiLFxuICAgIFwiczRcIjogXCJtYzZkZDEwZmJmX3Rvb2x0aXAgbWM2ZGQxMGZiZl9zNFwiLFxuICAgIFwiczVcIjogXCJtYzZkZDEwZmJmX3Rvb2x0aXAgbWM2ZGQxMGZiZl9zNVwiXG59O1xuZXhwb3J0IHZhciB0b29sdGlwID0gXCJtYzZkZDEwZmJmX3Rvb2x0aXBcIjtcbmV4cG9ydCB2YXIgczAgPSBcIm1jNmRkMTBmYmZfdG9vbHRpcCBtYzZkZDEwZmJmX3MwXCI7XG5leHBvcnQgdmFyIHMxID0gXCJtYzZkZDEwZmJmX3Rvb2x0aXAgbWM2ZGQxMGZiZl9zMVwiO1xuZXhwb3J0IHZhciBzMiA9IFwibWM2ZGQxMGZiZl90b29sdGlwIG1jNmRkMTBmYmZfczJcIjtcbmV4cG9ydCB2YXIgczMgPSBcIm1jNmRkMTBmYmZfdG9vbHRpcCBtYzZkZDEwZmJmX3MzXCI7XG5leHBvcnQgdmFyIHM0ID0gXCJtYzZkZDEwZmJmX3Rvb2x0aXAgbWM2ZGQxMGZiZl9zNFwiO1xuZXhwb3J0IHZhciBzNSA9IFwibWM2ZGQxMGZiZl90b29sdGlwIG1jNmRkMTBmYmZfczVcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90b29scy90b29sdGlwLmNzc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IG0gPSByZXF1aXJlKFwibWl0aHJpbFwiKTtcblxuY29uc3QgY3NzID0gcmVxdWlyZShcIi4vaW5kZXguY3NzXCIpO1xuY29uc3Qgc3RhdGUgPSByZXF1aXJlKFwiLi4vc3RhdGVcIik7XG5cbmZ1bmN0aW9uIGFkZEJyKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9cXG4vZywgXCI8YnI+XCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB2aWV3IDogKCkgPT5cbiAgICAgICAgbShcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgY2xhc3MgOiBjc3MubHlyaWNzLFxuICAgICAgICAgICAgICAgIHN0eWxlIDoge1xuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZSA6IGAke3N0YXRlLmZvbnQuc2l6ZX1lbWAsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbkNvdW50IDogc3RhdGUuY29scy5jb3VudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGF0ZS5zb25nLmx5cmljc1xuICAgICAgICAgICAgICAgIC5tYXAoKHBhcnQsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgbShcInBcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkICAgIDogcGFydC5oYXNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5zZWxlY3RlZCA9PT0gaWR4ID8gY3NzLmxpbmVTZWxlY3RlZCA6IGNzcy5saW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0LnN0eWxlID8gY3NzW2BzJHtwYXJ0LnN0eWxlLmlkeH1gXSA6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLmpvaW4oXCIgXCIpLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljayA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuYWN0aW9uKFwiQ0xJQ0sgTFlSSUNcIiwgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBtLnRydXN0KGFkZEJyKHBhcnQudGV4dCkpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgIClcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbHlyaWNzL2luZGV4LmpzIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIFwibHlyaWNzXCI6IFwibWNlNWU3NDAxOV9seXJpY3NcIixcbiAgICBcImxpbmVcIjogXCJtY2U1ZTc0MDE5X2xpbmVcIixcbiAgICBcImxpbmVTZWxlY3RlZFwiOiBcIm1jZTVlNzQwMTlfbGluZSBtY2U1ZTc0MDE5X2xpbmVTZWxlY3RlZFwiLFxuICAgIFwiczBcIjogXCJtY2U1ZTc0MDE5X2xpbmUgbWNlNWU3NDAxOV9zMFwiLFxuICAgIFwiczFcIjogXCJtY2U1ZTc0MDE5X2xpbmUgbWNlNWU3NDAxOV9zMVwiLFxuICAgIFwiczJcIjogXCJtY2U1ZTc0MDE5X2xpbmUgbWNlNWU3NDAxOV9zMlwiLFxuICAgIFwiczNcIjogXCJtY2U1ZTc0MDE5X2xpbmUgbWNlNWU3NDAxOV9zM1wiLFxuICAgIFwiczRcIjogXCJtY2U1ZTc0MDE5X2xpbmUgbWNlNWU3NDAxOV9zNFwiLFxuICAgIFwiczVcIjogXCJtY2U1ZTc0MDE5X2xpbmUgbWNlNWU3NDAxOV9zNVwiXG59O1xuZXhwb3J0IHZhciBseXJpY3MgPSBcIm1jZTVlNzQwMTlfbHlyaWNzXCI7XG5leHBvcnQgdmFyIGxpbmUgPSBcIm1jZTVlNzQwMTlfbGluZVwiO1xuZXhwb3J0IHZhciBsaW5lU2VsZWN0ZWQgPSBcIm1jZTVlNzQwMTlfbGluZSBtY2U1ZTc0MDE5X2xpbmVTZWxlY3RlZFwiO1xuZXhwb3J0IHZhciBzMCA9IFwibWNlNWU3NDAxOV9saW5lIG1jZTVlNzQwMTlfczBcIjtcbmV4cG9ydCB2YXIgczEgPSBcIm1jZTVlNzQwMTlfbGluZSBtY2U1ZTc0MDE5X3MxXCI7XG5leHBvcnQgdmFyIHMyID0gXCJtY2U1ZTc0MDE5X2xpbmUgbWNlNWU3NDAxOV9zMlwiO1xuZXhwb3J0IHZhciBzMyA9IFwibWNlNWU3NDAxOV9saW5lIG1jZTVlNzQwMTlfczNcIjtcbmV4cG9ydCB2YXIgczQgPSBcIm1jZTVlNzQwMTlfbGluZSBtY2U1ZTc0MDE5X3M0XCI7XG5leHBvcnQgdmFyIHM1ID0gXCJtY2U1ZTc0MDE5X2xpbmUgbWNlNWU3NDAxOV9zNVwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2x5cmljcy9pbmRleC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBtID0gcmVxdWlyZShcIm1pdGhyaWxcIik7XG5cbmNvbnN0IHN0YXRlID0gcmVxdWlyZShcIi4uL3N0YXRlXCIpO1xuXG5jb25zdCBjc3MgPSByZXF1aXJlKFwiLi9pbmRleC5jc3NcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHZpZXcgOiAodm5vZGUpID0+XG4gICAgICAgIG0oXCJkaXZcIiwgeyBjbGFzcyA6IGNzcy5ob21lIH0sXG5cbiAgICAgICAgICAgIC8vIGxvYWQgYnV0dG9uXG4gICAgICAgICAgICBtKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgICAgICBjbGFzcyAgIDogY3NzLmxvYWQsXG4gICAgICAgICAgICAgICAgb25jbGljayA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdm5vZGUuc3RhdGUubG9hZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgXCJsb2FkIHNvbmdcIiksXG5cbiAgICAgICAgICAgIC8vIHRleHRhcmVhXG4gICAgICAgICAgICB2bm9kZS5zdGF0ZS5sb2FkID8gW1xuICAgICAgICAgICAgICAgICAgICBtKFwidGV4dGFyZWFcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25jcmVhdGUgOiAodGV4dFZub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm5vZGUuc3RhdGUudGV4dGFyZWEgPSB0ZXh0Vm5vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3MgOiBjc3MudGV4dGFyZWEsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlciA6IFwicGFzdCBzb25nIGx5cmljc1wiXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBtKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzIDogY3NzLmxvYWRUZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljayA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hY3Rpb24oXCJMT0FEIFNPTkdcIiwgdm5vZGUuc3RhdGUudGV4dGFyZWEuZG9tLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdm5vZGUuc3RhdGUudGV4dGFyZWE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHZub2RlLnN0YXRlLmxvYWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFwibG9hZCBzb25ncyB0ZXh0XCIpXG4gICAgICAgICAgICAgICAgXSA6XG4gICAgICAgICAgICAgICAgbnVsbCxcblxuICAgICAgICAgICAgLy8gbG9hZGVkIHNvbmdzIGxpc3RcbiAgICAgICAgICAgIG0oXCJkaXZcIiwgeyBjbGFzcyA6IGNzcy5saXN0IH0sXG4gICAgICAgICAgICAgICAgc3RhdGUuc29uZ3MgPyBzdGF0ZS5zb25ncy5tYXAoKHNvbmcsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgbShcImFcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljayA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wZW4gc29uZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5hY3Rpb24oXCJPUEVOIFNPTkdcIiwgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNyZWF0ZTogbS5yb3V0ZS5saW5rLFxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZiA6IGAvJHtzb25nLnNsdWd9YFxuICAgICAgICAgICAgICAgICAgICB9LCBzb25nLnRpdGxlKVxuICAgICAgICAgICAgICAgICkgOiBudWxsXG4gICAgICAgICAgICApXG4gICAgICAgIClcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaG9tZS9pbmRleC5qcyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBcImhvbWVcIjogXCJtYzYzMzg3NjExX2hvbWVcIixcbiAgICBcImxvYWRcIjogXCJtYzcwODMyZDRhX2J1dHRvbiBtYzYzMzg3NjExX2xvYWRcIixcbiAgICBcInRleHRhcmVhXCI6IFwibWM2MzM4NzYxMV90ZXh0YXJlYVwiLFxuICAgIFwibG9hZFRleHRcIjogXCJtYzYzMzg3NjExX2xvYWRUZXh0XCIsXG4gICAgXCJsaXN0XCI6IFwibWM2MzM4NzYxMV9saXN0XCJcbn07XG5leHBvcnQgdmFyIGhvbWUgPSBcIm1jNjMzODc2MTFfaG9tZVwiO1xuZXhwb3J0IHZhciBsb2FkID0gXCJtYzcwODMyZDRhX2J1dHRvbiBtYzYzMzg3NjExX2xvYWRcIjtcbmV4cG9ydCB2YXIgdGV4dGFyZWEgPSBcIm1jNjMzODc2MTFfdGV4dGFyZWFcIjtcbmV4cG9ydCB2YXIgbG9hZFRleHQgPSBcIm1jNjMzODc2MTFfbG9hZFRleHRcIjtcbmV4cG9ydCB2YXIgbGlzdCA9IFwibWM2MzM4NzYxMV9saXN0XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaG9tZS9pbmRleC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=