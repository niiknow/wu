/*!
 * Wu
 * web utils

 * @version v0.4.2
 * @author Tom Noogen
 * @homepage https://github.com/niiknow/wu
 * @repository https://github.com/niiknow/wu.git
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Wu", [], factory);
	else if(typeof exports === 'object')
		exports["Wu"] = factory();
	else
		root["Wu"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/component-cookie/index.js":
/*!************************************************!*\
  !*** ./node_modules/component-cookie/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(/*! debug */ "./node_modules/component-cookie/node_modules/debug/browser.js")('cookie');

/**
 * Set or get cookie `name` with `value` and `options` object.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {Mixed}
 * @api public
 */

module.exports = function(name, value, options){
  switch (arguments.length) {
    case 3:
    case 2:
      return set(name, value, options);
    case 1:
      return get(name);
    default:
      return all();
  }
};

/**
 * Set cookie `name` to `value`.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @api private
 */

function set(name, value, options) {
  options = options || {};
  var str = encode(name) + '=' + encode(value);

  if (null == value) options.maxage = -1;

  if (options.maxage) {
    options.expires = new Date(+new Date + options.maxage);
  }

  if (options.path) str += '; path=' + options.path;
  if (options.domain) str += '; domain=' + options.domain;
  if (options.expires) str += '; expires=' + options.expires.toUTCString();
  if (options.secure) str += '; secure';

  document.cookie = str;
}

/**
 * Return all cookies.
 *
 * @return {Object}
 * @api private
 */

function all() {
  var str;
  try {
    str = document.cookie;
  } catch (err) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(err.stack || err);
    }
    return {};
  }
  return parse(str);
}

/**
 * Get cookie `name`.
 *
 * @param {String} name
 * @return {String}
 * @api private
 */

function get(name) {
  return all()[name];
}

/**
 * Parse cookie `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parse(str) {
  var obj = {};
  var pairs = str.split(/ *; */);
  var pair;
  if ('' == pairs[0]) return obj;
  for (var i = 0; i < pairs.length; ++i) {
    pair = pairs[i].split('=');
    obj[decode(pair[0])] = decode(pair[1]);
  }
  return obj;
}

/**
 * Encode.
 */

function encode(value){
  try {
    return encodeURIComponent(value);
  } catch (e) {
    debug('error `encode(%o)` - %o', value, e)
  }
}

/**
 * Decode.
 */

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    debug('error `decode(%o)` - %o', value, e)
  }
}


/***/ }),

/***/ "./node_modules/component-cookie/node_modules/debug/browser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/component-cookie/node_modules/debug/browser.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/component-cookie/node_modules/debug/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),

/***/ "./node_modules/component-cookie/node_modules/debug/debug.js":
/*!*******************************************************************!*\
  !*** ./node_modules/component-cookie/node_modules/debug/debug.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/component-cookie/node_modules/ms/index.js");

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/component-cookie/node_modules/ms/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/component-cookie/node_modules/ms/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "./node_modules/component-emitter/index.js":
/*!*************************************************!*\
  !*** ./node_modules/component-emitter/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "./node_modules/debounce/index.js":
/*!****************************************!*\
  !*** ./node_modules/debounce/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;


/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "./node_modules/domify/index.js":
/*!**************************************!*\
  !*** ./node_modules/domify/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var innerHTMLBug = false;
var bugTestDiv;
if (typeof document !== 'undefined') {
  bugTestDiv = document.createElement('div');
  // Setup
  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
  bugTestDiv = undefined;
}

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.polyline =
map.ellipse =
map.polygon =
map.circle =
map.text =
map.line =
map.path =
map.rect =
map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var domify = __webpack_require__(/*! domify */ "./node_modules/domify/index.js");

var emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");

var debounce = __webpack_require__(/*! debounce */ "./node_modules/debounce/index.js");

var cookie = __webpack_require__(/*! component-cookie */ "./node_modules/component-cookie/index.js");

var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");

var myRoot = {
  navigator: {
    userAgent: ''
  },
  location: {
    protocol: 'file',
    hostname: ''
  }
}; // Establish the object that gets returned to break out of a loop iteration.

var breaker = {}; // Save bytes in the minified (but not gzipped) version:

var ArrayProto = Array.prototype,
    ObjProto = Object.prototype; // Create quick reference variables for speed access to core prototypes.

var slice = ArrayProto.slice,
    hasOwnProperty = ObjProto.hasOwnProperty; // All **ECMAScript 5** native function implementations that we hope to use
// are declared here.

var nativeForEach = ArrayProto.forEach,
    nativeMap = ArrayProto.map,
    nativeSome = ArrayProto.some,
    nativeIndexOf = ArrayProto.indexOf,
    nativeKeys = Object.keys;

function isNull(obj, defaultValue) {
  return typeof obj === 'undefined' || obj === null || obj === 'null' ? defaultValue : obj;
}

;

if (typeof window !== 'undefined') {
  myRoot = window;
}

var userAgent = myRoot.navigator.userAgent || '';

function detectIe() {
  var ua = userAgent;
  var msie = ua.indexOf('MSIE ');
  var trident = ua.indexOf('Trident/');
  var rv = ua.indexOf('rv:');

  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  if (trident > 0) {
    // IE 11 (or newer) => return version number
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  } // other browser


  return false;
}

;

function has(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function keys(obj) {
  if (nativeKeys) {
    return nativeKeys(obj);
  }

  if (obj !== Object(obj)) {
    throw new TypeError('Invalid object');
  }

  var keys = [],
      key;

  for (key in obj) {
    if (has(obj, key)) keys.push(key);
  }

  return keys;
}

;

function each(obj, iterator, context) {
  if (isNull(obj, null) === null) return;

  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, length = obj.length; i < length; i++) {
      if (iterator.call(context, obj[i], i, obj) === breaker) return;
    }
  } else {
    var mykeys = keys(obj);

    for (var j = 0, length2 = mykeys.length; j < length2; j++) {
      if (iterator.call(context, obj[mykeys[j]], mykeys[j], obj) === breaker) return;
    }
  }
}

;
/**
 * Wu is short for Web Utilities
 */

var Wu = /*#__PURE__*/function () {
  function Wu() {
    _classCallCheck(this, Wu);

    var that = this;
    that._name = 'Wu';
    that.browser = {
      isIE: detectIe(),
      isMobile: /iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/gi.test(userAgent),
      isAndroid: /(android)/gi.test(userAgent),
      isIOS: /iP(hone|od|ad)/gi.test(userAgent)
    };
    that.has = has;
    that.keys = keys;
    that.each = that.forEach = each;
    that.isNull = isNull;
    that.win = myRoot;
    that.doc = that.win.document || {};
    that.collect = that.map;
    that.any = that.some;
    that.attr = that.getAttribute = that.getAttr;
    that.setAttribute = that.setAttr;
    that.emitter = emitter;
    that.domify = domify;
    that.debounce = debounce;
    that.cookie = cookie;
    that.debug = debug; // dummy up console log for IE

    if (typeof that.win.console === 'undefined') {
      that.win.console = {
        log: function log() {}
      };
      that.win.console.error = that.win.console.debug = that.win.console.info = that.win.console.log;
    }

    var hostname = that.trim(that.win.location.hostname.toLowerCase()); // init current site config

    that.site = {
      hostname: hostname,
      domain: hostname.replace('www.', ''),
      config: {}
    };
  }
  /**
   * get the name of the library
   * @return {string} library name
   */


  _createClass(Wu, [{
    key: "addEvent",

    /**
     * cross browser attach event
     * @param {object} obj     source object
     * @param {string} evtName event name
     * @param {object}         self
     */
    value: function addEvent(obj, evtName, func) {
      if (obj.addEventListener) {
        obj.addEventListener(evtName, func, false);
      } else if (obj.attachEvent) {
        obj.attachEvent(evtName, func);
      } else if (this.getAttr(obj, 'on' + evtName)) {
        obj['on' + evtName] = func;
      } else {
        obj[evtName] = func;
      }

      return this;
    }
    /**
     * cross browser detach event
     * @param {object} obj     source object
     * @param {string} evtName event name
     * @param {object}         self
     */

  }, {
    key: "removeEvent",
    value: function removeEvent(obj, evtName, func) {
      if (obj.removeEventListener) {
        obj.removeEventListener(evtName, func, false);
      } else if (obj.detachEvent) {
        obj.detachEvent(evtName, func);
      } else if (this.getAttr(obj, 'on' + evtName)) {
        obj['on' + evtName] = null;
      } else {
        obj[evtName] = null;
      }

      return this;
    }
    /**
     * safely decode the string
     * @param  {string} str
     * @return {string} url decoded string
     */

  }, {
    key: "decode",
    value: function decode(str) {
      try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
      } catch (e) {
        return str;
      }
    }
    /**
     * safely encode the string
     * @param  {string} str
     * @return {string} url encoded string
     */

  }, {
    key: "encode",
    value: function encode(str) {
      try {
        return encodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    /**
     * get distance between two points
     * @param  {number} latitude1
     * @param  {number} longitude1
     * @param  {number} latitude2
     * @param  {number} longitude2
     * @param  {object} options
     * @return {number}
     */

  }, {
    key: "geoDistance",
    value: function geoDistance(latitude1, longitude1, latitude2, longitude2, options) {
      options = options || {};

      function toRad(num) {
        return num * Math.PI / 180;
      }

      var start = {
        latitude: latitude1,
        longitude: longitude1
      };
      var end = {
        latitude: latitude2,
        longitude: longitude2
      };
      var radii = {
        km: 6371,
        mile: 3960,
        meter: 6371000,
        nmi: 3440
      };
      var R = options.unit in radii ? radii[options.unit] : radii.km;
      var dLat = toRad(end.latitude - start.latitude);
      var dLon = toRad(end.longitude - start.longitude);
      var lat1 = toRad(start.latitude);
      var lat2 = toRad(end.latitude);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      if (options.threshold) {
        return options.threshold > R * c;
      }

      return R * c;
    }
    /**
     * sort with nearest geopoint, expect object with two properties: Latitude and Longitude
     * @param  {array}    points
     * @param  {object}   origin point
     * @param  {function} callback    the closure function on result
     */

  }, {
    key: "geoOrderByOrigin",
    value: function geoOrderByOrigin(points, origin, callback) {
      var that = this;
      var result = {
        origin: origin,
        results: []
      };
      each(points, function (point) {
        var d = that.geoDistance(origin.Latitude, origin.Longitude, point.Latitude, point.Longitude, {
          unit: 'mile'
        });
        var newPoint = {
          point: point,
          distance: parseFloat(that.isNull(d, 0))
        };
        result.results.push(newPoint);
      });
      this.sortOn(result.results, 'distance');
      callback(result);
      return this;
    }
    /**
     * sort with nearest geopoint, expect object with two properties: Latitude and Longitude
     * @param  {array}    points
     * @params {string}   jsonpUrl    the jsonp url without any query string
     */

  }, {
    key: "geoOrderByIP",
    value: function geoOrderByIP(points, jsonpUrl, callback) {
      var that = this;
      that.geoByIP(jsonpUrl, function (rst) {
        if (rst.latitude) {
          rst.Latitude = rst.latitude;
          rst.Longitude = rst.longitude;
          that.geoOrderByOrigin(points, rst, callback);
        }
      });
      return that;
    }
    /**
     * locate geo by IP
     * @param  {string}   jsonpUrl    the jsonp url without any query string
     * @param  {function} callback    the closure function on result
     */

  }, {
    key: "geoByIP",
    value: function geoByIP(jsonpUrl, callback) {
      this.jsonp(jsonpUrl || '//freegeoip.net/json/', callback);
    }
    /**
     * cross browser get of xhr
     * @return {object} the xhr
     */

  }, {
    key: "getAjaxObject",
    value: function getAjaxObject() {
      return 'XMLHttpRequest' in window ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
    }
    /**
     * helper method to get attribute on specific dom object
     * @param  {object} dom  element
     * @param  {string} attr attribute name
     * @param  {object} value attribute value
     * @return {string}      attribute value
     */

  }, {
    key: "getAttr",
    value: function getAttr(dom, attr, val) {
      if (arguments.length > 2) {
        return this.setAttr(dom, attr, val);
      }

      var el = dom[0] || dom;
      return el.getAttribute ? el.getAttribute(attr) : el[attr];
    }
    /**
     * help method to get multiple attributes
     * @param  {object} dom   element
     * @param  {array}  attrs array of attribute names
     * @return {string}       result object
     */

  }, {
    key: "getAttrs",
    value: function getAttrs(dom, attrs) {
      var rst = {};
      var that = this;
      each(['', 'data-'], function (v, k) {
        each(attrs || [], function (v2, k2) {
          var attr = that.getAttr(dom, v + k2);

          if (attr) {
            rst[k2] = attr;
          }
        });
      });
      return rst;
    }
    /**
     * helper method to set attribute
     * @param {object} dom   element
     * @param {string} attr  attribute name
     * @param {object} value attribute value
     */

  }, {
    key: "setAttr",
    value: function setAttr(dom, attr, value) {
      var el = dom[0] || dom;

      if (el.setAttribute) {
        el.setAttribute(attr, value);
      } else {
        el[attr] = value;
      }

      ;
      return value;
    }
    /**
     * help method to set attributes
     * @param {object} dom   element
     * @param {object} attrs key value pair object
     */

  }, {
    key: "setAttrs",
    value: function setAttrs(dom, attrs) {
      var el = dom[0] || dom;
      var that = this;
      each(attrs || [], function (v, k) {
        that.setAttr(el, k, v);
      });
      return el;
    }
    /**
     * determine if array contain item
     * @param  {array}  obj    array
     * @param  {object} target item
     * @return {bool}          true if item exists
     */

  }, {
    key: "contains",
    value: function contains(obj, target) {
      if (this.isNull(obj, null) === null) return false;
      if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) !== -1;
      return this.any(obj, function (value) {
        return value === target;
      });
    }
    /**
     * create an iframe
     * @return {object} the iframe
     */

  }, {
    key: "createiFrame",
    value: function createiFrame(id, className) {
      var iframe = this.doc.createElement('iframe');
      if (id) iframe.id = id;
      if (className) iframe.className = className;
      iframe.frameBorder = '0';
      iframe.marginWidth = '0';
      iframe.marginHeight = '0';
      iframe.setAttribute('border', '0');
      iframe.setAttribute('allowtransparency', 'true');
      iframe.width = '100%';
      iframe.height = '100%';
      return iframe;
    }
    /**
     * delete an object property
     * @param  {object} obj the object
     * @param  {string} key the property name
     * @return {object}     the result object
     */

  }, {
    key: "del",
    value: function del(obj, key) {
      obj[key] = undefined;

      try {
        delete obj[key];
      } catch (e) {
        var items = {};
        each(obj, function (v, k) {
          if (k !== key) {
            items[k] = v;
          }
        });
        return items;
      }

      return obj;
    }
    /**
     * apply all valid property of default object to dest object where null
     * @param  {object} dest     the dest object
     * @param  {object} default  the default object
     * @return {object}      the result object
     */

  }, {
    key: "defaults",
    value: function defaults(dest) {
      each(slice.call(arguments, 1), function (source) {
        if (typeof source !== 'undefined') {
          each(source, function (v, k) {
            if (isNull(dest[k], null) === null) {
              dest[k] = v;
            }
          });
        }
      });
      return dest;
    }
    /**
     * apply all valid property of source object to dest object
     * @param  {object} dest the dest object
     * @param  {object} src  the source object
     * @return {object}      the result object
     */

  }, {
    key: "extend",
    value: function extend(dest) {
      each(slice.call(arguments, 1), function (source) {
        if (typeof source !== 'undefined') {
          each(source, function (v, k) {
            if (isNull(v, null) !== null) {
              dest[k] = v;
            }
          });
        }
      });
      return dest;
    }
    /**
     * group a list by some key attribute
     * @param  {array}      list                list or array of objects
     * @param  {string}     attribute           object key property name
     * @param  {Function}   postProcessFunction do something on each group
     * @return {array}                      group result
     */

  }, {
    key: "groupBy",
    value: function groupBy(list, attribute, postProcessFunction) {
      if (this.isNull(list, null) === null) return []; // First, reset declare result.

      var groups = [],
          grouper = {}; // this make sure all elements are correctly sorted

      each(list, function (item) {
        var groupKey = item[attribute],
            group = grouper[groupKey];

        if (isNull(group, null) === null) {
          group = {
            key: groupKey,
            items: []
          };
          grouper[groupKey] = group;
        }

        group.items.push(item);
      }); // finally, sort on group

      var i = 0;
      each(grouper, function (myGroup) {
        myGroup.$idx = i++;
        groups.push(myGroup);
        if (postProcessFunction) postProcessFunction(myGroup);
      });
      return this.sortOn(groups, 'key');
    }
    /**
     * helper method to determine if an element has class
     * @param  {HTMLElement}  el
     * @param  {string}       cls class names
     * @return {Boolean}
     */

  }, {
    key: "hasCls",
    value: function hasCls(el, cls) {
      var i, k, len, ref, v;
      ref = cls.split(' ');

      for (k = i = 0, len = ref.length; i < len; k = ++i) {
        v = ref[k];

        if ((' ' + el.className + ' ').indexOf(' ' + v + ' ') >= 0) {
          return true;
        }
      }

      return false;
    }
    /**
     * Helper method to inject your own css.
     * You must first create the element
     * and property it with an id.
     * @param  {string} id  css id
     * @param  {string} css the css text
     * @return {Object}
     */

  }, {
    key: "injectStyle",
    value: function injectStyle(id, css) {
      var el,
          elx,
          that = this;
      el = that.doc.getElementById(id);

      if (!el) {
        el = that.doc.createElement('style');
        el.id = id;
        el.type = 'text/css';

        if (el.styleSheet) {
          el.styleSheet.cssText = css;
        } else {
          el.appendChild(that.doc.createTextNode(css));
        }

        elx = that.doc.getElementsByTagName('link')[0];
        elx = elx || (that.doc.head || that.doc.getElementsByTagName('head')[0]).lastChild;
        elx.parentNode.insertBefore(el, elx);
      }

      return that;
    }
    /**
     * jsonp load
     * @param  {string}   uri      jsonp url with callback query string
     * @param  {Function} callback jsonp handler
     */

  }, {
    key: "jsonp",
    value: function jsonp(uri, callback) {
      var callbackVar = 'wucb' + new Date().getTime();

      this.win[callbackVar] = function (svrRsp) {
        var rsp = svrRsp;

        if (typeof svrRsp === 'string') {
          if (svrRsp === 'null') {
            rsp = null;
          } else {
            rsp = JSON.parse(svrRsp);
          }
        }

        callback(rsp);
      };

      uri = uri;
      uri += (uri.indexOf('?') > 0 ? '&' : '?') + 'callback=' + callbackVar;
      this.loadScript(uri);
    }
    /**
     * helper method to load a single script
     * @param  {string}     uri          string url
     * @param  {Function}   callbackFunc execute on load
     */

  }, {
    key: "loadScript",
    value: function loadScript(uri, callbackFunc) {
      var tag;

      function maybeDone() {
        if (this.readyState === undefined || this.readyState === 'complete') {
          // Pull the tags out based on the actual element in case IE ever
          // intermingles the onload and onreadystatechange handlers for the same
          // script block before notifying for another one.
          if (typeof callbackFunc === 'function') callbackFunc();
        }
      }

      if (uri.indexOf('//') < 0) {
        uri = 'http:' + uri;
      } // prefix protocol


      if ((myRoot.location || {}).protocol === 'file') {
        uri = uri.replace('https://', 'http://');
      }

      tag = this.doc.createElement('script');
      tag.type = 'text/javascript';
      tag.src = uri;

      if (callbackFunc) {
        tag.onload = maybeDone;
        tag.onreadystatechange = maybeDone;
      }

      this.doc.body.appendChild(tag);
    }
    /**
     * helper method to load multiple scripts synchronously
     * @param  {array}      uris         array of script uris
     * @param  {Function}   callbackFunc callback when all are loaded
     */

  }, {
    key: "loadScripts",
    value: function loadScripts(uris, callbackFunc) {
      var toProcess,
          that = this;

      function processNext() {
        if (toProcess.length <= 0) {
          if (typeof callbackFunc === 'function') {
            callbackFunc();
          }
        } else {
          var item = toProcess[0];
          toProcess.splice(0, 1);
          that.loadScript(item, processNext);
        }
      }

      if (this.isNull(uris.length, 0) <= 0) {
        if (typeof callbackFunc === 'function') {
          callbackFunc();
        }
      } else {
        if (typeof uris === 'string') {
          uris = [uris];
        }

        toProcess = [].concat(uris);
        processNext();
      }
    } // loadScripts

    /**
     * helper method to load an iframe
     * @param  {HTMLElement} parentEl  the element
     * @param  {string} html      the html string
     * @param  {string} id        element id
     * @param  {string} className element class names
     * @return {HTMLElement}           the iframe
     */

  }, {
    key: "loadiFrame",
    value: function loadiFrame(parentEl, html, id, className) {
      var iframe = this.createiFrame(id, className);
      parentEl[0].appendChild(iframe);

      if (iframe.contentWindow) {
        iframe.contentWindow.contents = html;
        iframe.src = 'javascript:window["contents"]';
      } else {
        var doc = iframe.contentDocument || iframe.document;
        doc.open();
        doc.write(html);
        doc.close();
      }

      return iframe;
    } // loadiFrame

    /**
     * call function for each object property and return result as array
     * @param  {object}     obj      the object
     * @param  {Function}   iterator the function to call on each property
     * @param  {object}     context  object to apply with
     * @return {array}          array result of each property call
     */

  }, {
    key: "map",
    value: function map(obj, iterator, context) {
      var results = [];
      if (this.isNull(obj, null) === null) return results;
      if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
      each(obj, function (value, index, list) {
        results.push(iterator.call(context, value, index, list));
      });
      return results;
    }
    /**
     * create a distinct list of object by attribute
     * useful for converting array to object
     * @param  {array}  list      list of objects
     * @param  {string} attribute the key to map
     * @return {object}           the object result
     */

  }, {
    key: "mapObject",
    value: function mapObject(list, attribute) {
      var obj = {};

      if (list) {
        if (this.isNull(list.length, -1) < 0) {
          obj[list[attribute]] = list;
        } else {
          this.map(list, function (item, i) {
            var k = item[attribute],
                e = obj[k];

            if (e) {
              if (Object.prototype.toString.call(e) !== '[object Array]') {
                e = [e];
              }

              e.push(item);
            } else {
              e = item;
            }

            obj[k] = e;
          });
        }
      }

      return obj;
    }
    /**
     * helper method to parse querystring to object
     *
     * @param  String qstr the querystring
     * @return Object      result
     */

  }, {
    key: "queryParseString",
    value: function queryParseString(qstr) {
      qstr = (qstr || '').replace('?', '').replace('#', '');
      var pattern = /(\w+)\[(\d+)\]/;
      var decode = this.decode,
          obj = {},
          a = qstr.split('&');

      for (var i = 0; i < a.length; i++) {
        var parts = a[i].split('='),
            key = decode(parts[0]),
            m = pattern.exec(key);

        if (m) {
          obj[m[1]] = obj[m[1]] || [];
          obj[m[1]][m[2]] = decode(parts[1]);
          continue;
        }

        obj[parts[0]] = decode(parts[1] || '');
      }

      return obj;
    }
    /**
     * reverse object to query string
     *
     * @param  Object obj the object
     * @return String     the query string
     */

  }, {
    key: "queryStringify",
    value: function queryStringify(obj, prefix) {
      var that = this;
      var encode = that.encode;
      var str = [],
          p;

      for (p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + '[' + p + ']' : p,
              v = obj[p];
          str.push(v !== null && _typeof(v) === 'object' ? that.queryStringify(v, k) : encode(k) + '=' + encode(v));
        }
      }

      return str.join('&');
    }
    /**
     * make http request
     * @param  {object} opts options: headers, method, data
     * @param  {Function} callback success callback
     * @param  {Function} errback  fail callback
     * @return {object}     the request object
     */

  }, {
    key: "request",
    value: function request(opts, callback, errback) {
      var that = this;
      opts.headers = opts.headers || {};

      if (['HEAD', 'GET', 'DELETE'].indexOf(opts.method) > -1) {
        // convert data to query string
        if (opts.data) {
          opts.url += (opts.url.indexOf('?') > 0 ? '?' : '&') + that.queryStringify(opts.data);
          opts = this.del(opts, 'data');
        }
      } else if (typeof opts.data !== 'string') {
        // handle non-string content body
        if ((opts.headers['Content-Type'] + '').indexOf('json') > 0) {
          opts.data = JSON.stringify(opts);
        } else {
          // must be form encoded
          opts.data = that.queryStringify(opts);
        }
      }

      return that.xhr(opts, callback, errback);
    }
    /**
     * slugify a string
     * @param  {string} str the string to slug
     * @return {string}     slug result
     */

  }, {
    key: "slugify",
    value: function slugify(str) {
      str = str || '';
      if (str === '') return str;
      str = str.toLowerCase().replace(/[^0-9a-z\-\_]+/gi, '-').replace(/[\-]+/gi, '-');
      return str;
    }
    /**
     * aka any, determine if any object object property are true
     * @param  {object}     obj       the object
     * @param  {Function}   predicate function that return Boolean
     * @param  {object}     context   the this reference for function
     * @return {Boolean}          the result
     */

  }, {
    key: "some",
    value: function some(obj, predicate, context) {
      var result = false;

      predicate = predicate || function (value) {
        return value;
      };

      if (this.isNull(obj, null) === null) return result;
      if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
      each(obj, function (value, index, list) {
        if (result || (result = predicate.call(context, value, index, list))) return breaker;
        return null;
      });
      return result;
    }
    /**
     * sort a list of object base on some property name
     * @param  {array}  collection list of objects
     * @param  {string} name       property name
     * @return {object}            sorted list
     */

  }, {
    key: "sortOn",
    value: function sortOn(collection, name) {
      if (this.isNull(collection, null) === null) return null;
      if (collection.length <= 0) return []; // detect attribute type, problem is if your first object is null or not string then this breaks

      if (typeof collection[0][name] === 'string') {
        collection.sort(function (a, b) {
          if ((a[name] && a[name].toLowerCase()) < (b[name] && b[name].toLowerCase())) return -1;
          if ((a[name] && a[name].toLowerCase()) > (b[name] && b[name].toLowerCase())) return 1;
          return 0;
        });
      } else {
        collection.sort(function (a, b) {
          if (a[name] < b[name]) return -1;
          if (a[name] > b[name]) return 1;
          return 0;
        });
      }

      return collection;
    }
    /**
     * trim string
     * @param  {string} str the string
     * @return {string}     trimmed result
     */

  }, {
    key: "trim",
    value: function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s*|\s*$/g, '');
    }
    /* eslint-disable */

    /**
     * Taken straight from jed's gist: https://gist.github.com/982883
     * 
     * @param  {number} a placeholder
     * @return {string}   a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
     */

  }, {
    key: "uuid",
    value: function uuid(a) {
      return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.uuid);
    }
    /* eslint-enable */

    /**
     * make an xhr request
     * @param  {object}   options  url string or options object
     * @param  {Function} callback
     * @param  {Function} errback  error callback
     * @return {object}     the request object
     */

  }, {
    key: "xhr",
    value: function xhr(options, callback, errback) {
      var url = options;

      if (typeof url === 'string') {
        options = options || {};
        options.url = url;
      } // Create the XHR request itself


      var req = this.getAjaxObject();

      if (options.withCredentials) {
        req.withCredentials = true;
        /* eslint-disable */

        if (typeof XDomainRequest !== 'undefined') {
          // XDomainRequest for IE.
          req = new XDomainRequest();
        }
        /* eslint-enable */

      } // if there are no options, it failed


      if (!options || options.length === 0) {
        errback({
          xhr: req,
          error: new Error('xhr expects an url or an options object, none given.')
        });
      } // normalize method


      options.method = options.method || 'GET'; // open url

      req.open(options.method, options.url, req.withCredentials); // set request header

      each(options.headers || {}, function (value, key) {
        req.setRequestHeader(key, value);
      });
      this.addEvent(req, 'readystatechange', function () {
        if (req.readyState === 4 && req.status >= 200 && req.status < 400) {
          // Callbacks for successful requests
          callback({
            xhr: req,
            text: req.responseText,
            url: req.responseURL
          });
        } else if (req.readyState === 4) {
          // Callbacks for failed requests
          errback({
            xhr: req
          });
        } // ignore everything else

      });
      this.addEvent(req, 'error', function (err) {
        errback({
          xhr: req,
          error: err
        });
      }); // send unless prevent by options
      // such as user want to handle file upload

      if (!options.nosend) {
        req.send(options.data || void 0);
      }

      return req;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }]);

  return Wu;
}();

;
module.exports = Wu;

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/techsupport/Desktop/work/niiknow/wu/src/index.js */"./src/index.js");


/***/ })

/******/ });
});
//# sourceMappingURL=wu.js.map