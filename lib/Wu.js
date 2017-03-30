(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Wu", [], factory);
	else if(typeof exports === 'object')
		exports["Wu"] = factory();
	else
		root["Wu"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
  return typeof obj === 'undefined' || obj === null ? defaultValue : obj;
}

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
}

function loadSingleScript(uri, callbackFunc) {
  var tag = void 0;

  /* jshint -W040 */
  function maybeDone() {
    if (this.readyState === undefined || this.readyState === 'complete') {
      // Pull the tags out based on the actual element in case IE ever
      // intermingles the onload and onreadystatechange handlers for the same
      // script block before notifying for another one.
      if (typeof callbackFunc === 'function') callbackFunc();
    }
  }
  /* jshint +W040 */

  if (uri.indexOf('//') < 0) {
    uri = 'http:' + uri;
  }

  // Prefix protocol
  if ((myRoot.location || {}).protocol === 'file') {
    uri = uri.replace('https://', 'http://');
  }

  tag = document.createElement('script');
  tag.type = 'text/javascript';
  tag.src = uri;
  if (callbackFunc) {
    tag.onload = maybeDone;
    tag.onreadystatechange = maybeDone;
  }

  document.body.appendChild(tag);
}

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
    this.forEach = this.each;
    this.collect = this.map;
    this.any = this.some;
  }

  _createClass(Wu, [{
    key: 'contains',
    value: function contains(obj, target) {
      if (this.isNull(obj, null) === null) return false;
      if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) !== -1;

      return this.any(obj, function (value) {
        return value === target;
      });
    }
  }, {
    key: 'each',
    value: function each(obj, iterator, context) {
      if (this.isNull(obj, null) === null) return;
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
    }
  }, {
    key: 'extend',
    value: function extend(obj) {
      var _this = this;

      this.each(slice.call(arguments, 1), function (source) {
        if (typeof source !== 'undefined') {
          _this.each(source, function (v, k) {
            if (_this.isNull(v, null) !== null) {
              obj[k] = v;
            }
          });
        }
      });
      return obj;
    }
  }, {
    key: 'groupBy',
    value: function groupBy(list, attribute, postProcessFunction) {
      var _this2 = this;

      if (this.isNull(list, null) === null) return [];

      // First, reset declare result.
      var groups = [],
          grouper = {};

      // this make sure all elements are correctly sorted
      this.each(list, function (item) {
        var groupKey = item[attribute],
            group = grouper[groupKey];

        if (_this2.isNull(group, null) === null) {
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

      this.each(grouper, function (myGroup) {
        myGroup.$idx = i++;
        groups.push(myGroup);

        if (postProcessFunction) postProcessFunction(myGroup);
      });

      return this.sortOn(groups, 'key');
    }
  }, {
    key: 'has',
    value: function has(obj, key) {
      return hasOwnProperty.call(obj, key);
    }
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
  }, {
    key: 'loadScripts',
    value: function loadScripts(uris, callbackFunc) {
      var toProcess = void 0;

      function processNext() {
        if (toProcess.length <= 0) {
          if (typeof callbackFunc === 'function') {
            callbackFunc();
          }
        } else {
          var item = toProcess[0];

          toProcess.splice(0, 1);
          loadSingleScript(item, processNext);
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

  }, {
    key: 'loadIframe',
    value: function loadIframe(parentEl, html) {
      var iframe = document.createElement('iframe');

      parentEl[0].appendChild(iframe);

      /* jshint -W107 */
      if (iframe.contentWindow) {
        iframe.contentWindow.contents = html;
        iframe.src = 'javascript:window["contents"]';
      } else {
        var doc = iframe.document;

        if (iframe.contentDocument) {
          doc = iframe.contentDocument;
        }
        doc.open();
        doc.write(html);
        doc.close();
      }
      /* jshint +W107 */

      return iframe;
    } // loadIframe

  }, {
    key: 'map',
    value: function map(obj, iterator, context) {
      var results = [];

      if (this.isNull(obj, null) === null) return results;
      if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);

      this.each(obj, function (value, index, list) {
        results.push(iterator.call(context, value, index, list));
      });
      return results;
    }
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
  }, {
    key: 'some',
    value: function some(obj, predicate, context) {
      var result = false;

      predicate = predicate || function (value) {
        return value;
      };
      if (this.isNull(obj, null) === null) return result;
      if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);

      this.each(obj, function (value, index, list) {
        if (result || (result = predicate.call(context, value, index, list))) return breaker;
        return null;
      });
      return !!result;
    }
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=Wu.js.map