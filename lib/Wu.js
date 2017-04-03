/*!
 *  wu.js - v0.1.2
 *  build: Mon Apr 03 2017 10:00:43 GMT-0500 (CDT)
 *  web utils
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

  tag = this.doc.createElement('script');
  tag.type = 'text/javascript';
  tag.src = uri;
  if (callbackFunc) {
    tag.onload = maybeDone;
    tag.onreadystatechange = maybeDone;
  }

  this.doc.body.appendChild(tag);
};

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
    this.doc = document || {};

    this.forEach = this.each;
    this.collect = this.map;
    this.any = this.some;
    this.getAttribute = this.getAttr;
    this.setAttribute = this.setAttr;
  }

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
     * @param  {object} origin point 
     * @param  {array}  points     
     * @return {array}           
     */

  }, {
    key: 'geoOrderByOrigin',
    value: function geoOrderByOrigin(origin, points) {
      var _this = this;

      var result = [];

      this.each(points, function (point) {
        var d = _this.distance(origin.Latitude, origin.Longitude, point.Latitude, point.Longitude, { unit: 'mile' });
        var newPoint = { point: point, distance: parseFloat(_this.isNull(d, 0)).toFixed(2) };

        result.push(newPoint);
      });

      this.sortOn(result, 'distance');
      return result;
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
  }, {
    key: 'getAttrs',
    value: function getAttrs(dom, attrs) {
      var _this2 = this;

      var rst = {};

      this.each(['', 'data-'], function (v, k) {
        _this2.each(attrs || [], function (v2, k2) {
          var attr = _this2.getAttr(dom, v + k2);

          if (attr) {
            rst[k2] = attr;
          }
        });
      });

      return rst;
    }

    /**
     * helper method to set attribute
     * @param {[type]} dom   element
     * @param {[type]} attr  attribute name
     * @param {[type]} value attribute value
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
  }, {
    key: 'del',
    value: function del(obj, key) {
      obj[key] = undefined;
      try {
        delete obj[key];
      } catch (e) {
        var items = {};

        this.each(obj, function (v, k) {
          if (k !== key) {
            items[k] = v;
          }
        });

        return items;
      }
      return obj;
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
      var _this3 = this;

      this.each(slice.call(arguments, 1), function (source) {
        if (typeof source !== 'undefined') {
          _this3.each(source, function (v, k) {
            if (_this3.isNull(v, null) !== null) {
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
      var _this4 = this;

      if (this.isNull(list, null) === null) return [];

      // First, reset declare result.
      var groups = [],
          grouper = {};

      // this make sure all elements are correctly sorted
      this.each(list, function (item) {
        var groupKey = item[attribute],
            group = grouper[groupKey];

        if (_this4.isNull(group, null) === null) {
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
      var iframe = this.doc.createElement('iframe');

      parentEl[0].appendChild(iframe);

      /* jshint -W107 */
      if (iframe.contentWindow) {
        iframe.contentWindow.contents = html;
        iframe.src = 'javascript:window["contents"]';
      } else {
        var doc = iframe.contentDocument || iframe.document;

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

    /**
     * helper method to parse querystring
     * @param  {string} qstr the querystring
     * @return {object}      result
     */

  }, {
    key: 'parseQueryString',
    value: function parseQueryString(qstr) {
      qstr = (qstr || '').replace('?', '').replace('#', '');
      var d = decodeURIComponent,
          query = {},
          a = qstr.split('&');

      for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');

        query[d(b[0])] = d(b[1] || '');
      }
      return query;
    }
  }, {
    key: 'request',
    value: function request(opts) {
      var that = this;

      opts.headers = opts.headers || {};
      if (['HEAD', 'GET', 'DELETE'].indexOf(opts.method) > -1) {
        // convert data to query string
        if (opts.data) {
          opts.url += (opts.url.indexOf('?') > 0 ? '?' : '&') + that.toQueryString(opts.data);
          this.del(opts, 'data');
        }
      } else if (typeof opts.data !== 'string') {
        // handle non-string content body
        if ((opts.headers['Content-Type'] + '').indexOf('json') > 0) {
          opts.data = JSON.stringify(opts);
        } else {
          // must be form encoded
          opts.data = that.toQueryString(opts);
        }
      }
      return that.xhrp(opts);
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

    /**
     * reverse object to query string
     * @param  {object} obj the object
     * @return {string}     the query string
     */

  }, {
    key: 'toQueryString',
    value: function toQueryString(obj) {
      var str = '';

      this.each(obj, function (v, k) {
        str += '&' + k + '=' + encodeURIComponent(v);
      });
      return str.replace('&', '');
    }

    /**
     * make xhr request with a promise
     * @param  {object} opts the options
     * @return {promise}     a promise
     */

  }, {
    key: 'xhrp',
    value: function xhrp(opts) {
      var that = this;

      return new Promise(function (resolve, reject) {
        return that.xhr(opts, resolve, reject);
      });
    }

    /**
     * make an xhr request
     * @param  {object}   options  url string or options object
     * @param  {Function} callback
     * @param  {Function} errback  error callback
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
      this.each(options.headers || {}, function (value, key) {
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
        // ignore everything else?
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=Wu.js.map