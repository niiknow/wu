/*!
 *  wu.js - v0.2.0
 *  build: Thu Apr 20 2017 14:07:22 GMT-0500 (CDT)
 *  web utils
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("wu", [], factory);
	else if(typeof exports === 'object')
		exports["wu"] = factory();
	else
		root["wu"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(5);
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
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window && typeof window.process !== 'undefined' && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document && 'WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window && window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
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

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

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

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domify = __webpack_require__(6);

var _domify2 = _interopRequireDefault(_domify);

var _componentEmitter = __webpack_require__(3);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _debounce = __webpack_require__(4);

var _debounce2 = _interopRequireDefault(_debounce);

var _componentCookie = __webpack_require__(2);

var _componentCookie2 = _interopRequireDefault(_componentCookie);

var _debug = __webpack_require__(0);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var myRoot = { navigator: { userAgent: '' }, location: { protocol: 'file' } };

// Establish the object that gets returned to break out of a loop iteration.
var breaker = {};

// Save bytes in the minified (but not gzipped) version:
var ArrayProto = Array.prototype,
    ObjProto = Object.prototype;

// Create quick reference variables for speed access to core prototypes.
var slice = ArrayProto.slice,
    hasOwnProperty = ObjProto.hasOwnProperty;

// All **ECMAScript 5** native function implementations that we hope to use
// are declared here.
var nativeForEach = ArrayProto.forEach,
    nativeMap = ArrayProto.map,
    nativeSome = ArrayProto.some,
    nativeIndexOf = ArrayProto.indexOf,
    nativeKeys = Object.keys;

function isNull(obj, defaultValue) {
  return typeof obj === 'undefined' || obj === null || obj === 'null' ? defaultValue : obj;
};

var userAgent = myRoot.navigator.userAgent;

if (typeof window !== 'undefined') {
  myRoot = window;
}

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
  }

  // other browser
  return false;
};

function each(obj, iterator, context) {
  if (isNull(obj, null) === null) return;
  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, length = obj.length; i < length; i++) {
      if (iterator.call(context, obj[i], i, obj) === breaker) return;
    }
  } else {
    var keys = this.keys(obj);

    for (var j = 0, length2 = keys.length; j < length2; j++) {
      if (iterator.call(context, obj[keys[j]], keys[j], obj) === breaker) return;
    }
  }
};

/**
 * Wu is short for Web Utilities
 */

var Wu = function () {
  function Wu() {
    _classCallCheck(this, Wu);

    this._name = 'Wu';
    this.browser = {
      isIE: detectIe(),
      isMobile: /iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/gi.test(userAgent),
      isAndroid: /(android)/gi.test(userAgent),
      isIOS: /iP(hone|od|ad)/gi.test(userAgent)
    };

    this.isNull = isNull;
    this.win = myRoot;
    this.doc = this.win.document || {};
    this.each = this.forEach = each;
    this.collect = this.map;
    this.any = this.some;
    this.getAttribute = this.getAttr;
    this.setAttribute = this.setAttr;
    this.emitter = _componentEmitter2.default;
    this.domify = _domify2.default;
    this.debounce = _debounce2.default;
    this.cookie = _componentCookie2.default;
    this.debug = _debug2.default;

    // dummy up console log for IE
    if (typeof this.win.console === 'undefined') {
      this.win.console = { log: function log() {} };
      this.win.console.error = this.win.console.debug = this.win.console.info = this.win.console.log;
    }
  }

  /**
   * get the name of the library
   * @return {string} library name
   */


  _createClass(Wu, [{
    key: 'addEvent',


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
    key: 'removeEvent',
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
    key: 'decode',
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
    key: 'encode',
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
    key: 'geoDistance',
    value: function geoDistance(latitude1, longitude1, latitude2, longitude2, options) {
      options = options || {};

      function toRad(num) {
        return num * Math.PI / 180;
      }

      var start = { latitude: latitude1, longitude: longitude1 };
      var end = { latitude: latitude2, longitude: longitude2 };
      var radii = { km: 6371, mile: 3960, meter: 6371000, nmi: 3440 };
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
    key: 'geoOrderByOrigin',
    value: function geoOrderByOrigin(points, origin, callback) {
      var that = this;
      var result = { origin: origin, results: [] };

      each(points, function (point) {
        var d = that.geoDistance(origin.Latitude, origin.Longitude, point.Latitude, point.Longitude, { unit: 'mile' });
        var newPoint = { point: point, distance: parseFloat(that.isNull(d, 0)).toFixed(2) };

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
    key: 'geoOrderByIP',
    value: function geoOrderByIP(points, jsonpUrl, callback) {
      var that = this;

      this.geoByIP(jsonpUrl, function (rst) {
        if (rst.latitude) {
          rst.Latitude = rst.latitude;
          rst.Longitude = rst.longitude;
          that.geoOrderByOrigin(points, rst, callback);
        }
      });

      return this;
    }

    /**
     * locate geo by IP
     * @param  {string}   jsonpUrl    the jsonp url without any query string
     * @param  {function} callback    the closure function on result
     */

  }, {
    key: 'geoByIP',
    value: function geoByIP(jsonpUrl, callback) {
      var callbackVar = 'mycb' + new Date().getTime();

      this.win[callbackVar] = callback;
      jsonpUrl = jsonpUrl || '//freegeoip.net/json';
      jsonpUrl += (jsonpUrl.indexOf('?') > 0 ? '&' : '?') + 'callback=' + callbackVar;
      this.loadScript(jsonpUrl);
      return this;
    }

    /**
     * cross browser get of xhr
     * @return {object} the xhr
     */

  }, {
    key: 'getAjaxObject',
    value: function getAjaxObject() {
      return 'XMLHttpRequest' in window ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
    }

    /**
     * helper method to get attribute on specific dom object
     * @param  {object} dom  element
     * @param  {string} attr attribute name
     * @return {string}      attribute value
     */

  }, {
    key: 'getAttr',
    value: function getAttr(dom, attr) {
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
    key: 'getAttrs',
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
    key: 'setAttr',
    value: function setAttr(dom, attr, value) {
      var el = dom[0] || dom;

      if (el.setAttribute) {
        el.setAttribute(attr, value);
      } else {
        el[attr] = value;
      };

      return el;
    }

    /**
     * help method to set attributes
     * @param {object} dom   element
     * @param {object} attrs key value pair object
     */

  }, {
    key: 'setAttrs',
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
    key: 'contains',
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
    key: 'createiFrame',
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
    key: 'del',
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
    key: 'defaults',
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
    key: 'extend',
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
    key: 'groupBy',
    value: function groupBy(list, attribute, postProcessFunction) {
      if (this.isNull(list, null) === null) return [];

      // First, reset declare result.
      var groups = [],
          grouper = {};

      // this make sure all elements are correctly sorted
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
      });

      // finally, sort on group
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
    key: 'hasCls',
    value: function hasCls(el, cls) {
      var i = void 0,
          k = void 0,
          len = void 0,
          ref = void 0,
          v = void 0;

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
     * helper method to determine if an object has a property
     * @param  {object}  obj the object
     * @param  {string}  key the property name
     * @return {Boolean}
     */

  }, {
    key: 'has',
    value: function has(obj, key) {
      return hasOwnProperty.call(obj, key);
    }

    /**
     * get all object keys
     * @param  {object} obj the object
     * @return {array}      all object property names
     */

  }, {
    key: 'keys',
    value: function keys(obj) {
      if (nativeKeys) {
        return nativeKeys(obj);
      }

      if (obj !== Object(obj)) {
        throw new TypeError('Invalid object');
      }

      var keys = [],
          key = void 0;

      for (key in obj) {
        if (this.has(obj, key)) keys.push(key);
      }

      return keys;
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
    key: 'injectStyle',
    value: function injectStyle(id, css) {
      var el = void 0,
          elx = void 0,
          self = this;

      el = self.doc.getElementById(id);

      if (!el) {
        el = self.doc.createElement('style');
        el.id = id;
        el.type = 'text/css';
        if (el.styleSheet) {
          el.styleSheet.cssText = css;
        } else {
          el.appendChild(self.doc.createTextNode(css));
        }
        elx = self.doc.getElementsByTagName('link')[0];
        elx = elx || (self.doc.head || self.doc.getElementsByTagName('head')[0]).lastChild;
        elx.parentNode.insertBefore(el, elx);
      }

      return self;
    }

    /**
     * helper method to load a single script
     * @param  {string}     uri          string url
     * @param  {Function}   callbackFunc execute on load
     */

  }, {
    key: 'loadScript',
    value: function loadScript(uri, callbackFunc) {
      var tag = void 0;

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
      }

      // prefix protocol
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
    key: 'loadScripts',
    value: function loadScripts(uris, callbackFunc) {
      var toProcess = void 0,
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
    key: 'loadiFrame',
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
    key: 'map',
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
    key: 'mapObject',
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
     * @param  {string} qstr the querystring
     * @return {object}      result
     */

  }, {
    key: 'queryParseString',
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
     * @param  {object} obj the object
     * @return {string}     the query string
     */

  }, {
    key: 'queryStringify',
    value: function queryStringify(obj) {
      var str = '',
          encode = this.encode;

      each(obj, function (v, k) {
        str += '&' + k + '=' + encode(v);
      });
      return str.replace('&', '');
    }

    /**
     * make http request
     * @param  {object} opts options: headers, method, data
     * @param  {Function} callback success callback
     * @param  {Function} errback  fail callback
     * @return {object}     the request object
     */

  }, {
    key: 'request',
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
    key: 'slugify',
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
    key: 'some',
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
    key: 'sortOn',
    value: function sortOn(collection, name) {
      if (this.isNull(collection, null) === null) return null;
      if (collection.length <= 0) return [];

      // detect attribute type, problem is if your first object is null or not string then this breaks
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
    key: 'trim',
    value: function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s*|\s*$/g, '');
    }

    /*eslint-disable */

    /**
     * Taken straight from jed's gist: https://gist.github.com/982883
     * 
     * @param  {number} a placeholder
     * @return {string}   a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
     */

  }, {
    key: 'uuid',
    value: function uuid(a) {
      return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.uuid);
    }

    /*eslint-enable */

    /**
     * make an xhr request
     * @param  {object}   options  url string or options object
     * @param  {Function} callback
     * @param  {Function} errback  error callback
     * @return {object}     the request object
     */

  }, {
    key: 'xhr',
    value: function xhr(options, callback, errback) {
      var url = options;

      if (typeof url === 'string') {
        options = options || {};
        options.url = url;
      }

      // Create the XHR request itself
      var req = this.getAjaxObject();

      if (options.withCredentials) {
        req.withCredentials = true;
        if (typeof XDomainRequest !== 'undefined') {
          // XDomainRequest for IE.
          req = new XDomainRequest();
        }
      }

      // if there are no options, it failed
      if (!options || options.length === 0) {
        errback({
          xhr: req,
          error: new Error('xhr expects an url or an options object, none given.')
        });
      }

      // normalize method
      options.method = options.method || 'GET';

      // open url
      req.open(options.method, options.url, req.withCredentials);

      // set request header
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
        }

        // ignore everything else
      });

      this.addEvent(req, 'error', function (err) {
        errback({
          xhr: req,
          error: err
        });
      });

      // send unless prevent by options
      // such as user want to handle file upload
      if (!options.nosend) {
        req.send(options.data || void 0);
      }

      return req;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }]);

  return Wu;
}();

exports.default = Wu;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(0)('cookie');

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
/* 3 */
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
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

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
/* 4 */
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

module.exports = function debounce(func, wait, immediate){
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

  return debounced;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(7);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
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

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
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

  exports.names = [];
  exports.skips = [];

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
/* 6 */
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
/* 7 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000
var m = s * 60
var h = m * 60
var d = h * 24
var y = d * 365.25

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {}
  var type = typeof val
  if (type === 'string' && val.length > 0) {
    return parse(val)
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ?
			fmtLong(val) :
			fmtShort(val)
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
}

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str)
  if (str.length > 10000) {
    return
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
  if (!match) {
    return
  }
  var n = parseFloat(match[1])
  var type = (match[2] || 'ms').toLowerCase()
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y
    case 'days':
    case 'day':
    case 'd':
      return n * d
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n
    default:
      return undefined
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
  if (ms >= d) {
    return Math.round(ms / d) + 'd'
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h'
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm'
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's'
  }
  return ms + 'ms'
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms'
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name
  }
  return Math.ceil(ms / n) + ' ' + name + 's'
}


/***/ }),
/* 8 */
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
});
//# sourceMappingURL=wu.js.map