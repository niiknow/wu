const domify = require('domify');
const emitter = require('component-emitter');
const debounce = require('debounce');
const cookie = require('component-cookie');
const debug = require('debug');

let myRoot = { navigator: { userAgent: '' }, location: { protocol: 'file', hostname: '' } };

// Establish the object that gets returned to break out of a loop iteration.
const breaker = {};

// Save bytes in the minified (but not gzipped) version:
const ArrayProto = Array.prototype,
  ObjProto = Object.prototype;

// Create quick reference variables for speed access to core prototypes.
const slice = ArrayProto.slice,
  hasOwnProperty = ObjProto.hasOwnProperty;

// All **ECMAScript 5** native function implementations that we hope to use
// are declared here.
const nativeForEach = ArrayProto.forEach,
  nativeMap = ArrayProto.map,
  nativeSome = ArrayProto.some,
  nativeIndexOf = ArrayProto.indexOf,
  nativeKeys = Object.keys;

function isNull(obj, defaultValue) {
  return (typeof (obj) === 'undefined' || obj === null || obj === 'null') ? defaultValue : obj;
};

if (typeof (window) !== 'undefined') {
  myRoot = window;
}

const userAgent = myRoot.navigator.userAgent || '';

function detectIe() {
  const ua = userAgent;
  const msie = ua.indexOf('MSIE ');
  const trident = ua.indexOf('Trident/');
  const rv = ua.indexOf('rv:');

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

  let keys = [],
    key;

  for (key in obj) {
    if (has(obj, key)) keys.push(key);
  }

  return keys;
};

function each(obj, iterator, context) {
  if (isNull(obj, null) === null) return;
  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (let i = 0, length = obj.length; i < length; i++) {
      if (iterator.call(context, obj[i], i, obj) === breaker) return;
    }
  } else {
    const mykeys = keys(obj);

    for (let j = 0, length2 = mykeys.length; j < length2; j++) {
      if (iterator.call(context, obj[mykeys[j]], mykeys[j], obj) === breaker) return;
    }
  }
};

/**
 * Wu is short for Web Utilities
 */
class Wu {
  constructor() {
    const that = this;

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
    that.debug = debug;

    // dummy up console log for IE
    if (typeof that.win.console === 'undefined') {
      that.win.console = { log: () => {} };
      that.win.console.error = that.win.console.debug = that.win.console.info = that.win.console.log;
    }

    const hostname = that.trim(that.win.location.hostname.toLowerCase());

    // init current site config
    that.site = { hostname: hostname, domain: hostname.replace('www.', ''), config: {} };
  }

  /**
   * get the name of the library
   * @return {string} library name
   */
  get name() {
    return this._name;
  }

  /**
   * cross browser attach event
   * @param {object} obj     source object
   * @param {string} evtName event name
   * @param {object}         self
   */
  addEvent(obj, evtName, func) {
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
  removeEvent(obj, evtName, func) {
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
  decode(str) {
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
  encode(str) {
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
  geoDistance(latitude1, longitude1, latitude2, longitude2, options) {
    options = options || {};

    function toRad(num) {
      return num * Math.PI / 180;
    }

    const start = { latitude: latitude1, longitude: longitude1 };
    const end = { latitude: latitude2, longitude: longitude2 };
    const radii = { km: 6371, mile: 3960, meter: 6371000, nmi: 3440};
    const R = options.unit in radii ? radii[options.unit] : radii.km;
    const dLat = toRad(end.latitude - start.latitude);
    const dLon = toRad(end.longitude - start.longitude);
    const lat1 = toRad(start.latitude);
    const lat2 = toRad(end.latitude) ;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    if (options.threshold) {
      return options.threshold > (R * c);
    }

    return R * c;
  }

  /**
   * sort with nearest geopoint, expect object with two properties: Latitude and Longitude
   * @param  {array}    points
   * @param  {object}   origin point
   * @param  {function} callback    the closure function on result
   */
  geoOrderByOrigin(points, origin, callback) {
    const that = this;
    const result = { origin: origin, results: [] };

    each(points, (point) => {
      const d = that.geoDistance(origin.Latitude, origin.Longitude, point.Latitude, point.Longitude, { unit: 'mile' });
      const newPoint = { point: point, distance: parseFloat(that.isNull(d, 0)) };

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
  geoOrderByIP(points, jsonpUrl, callback) {
    const that = this;

    that.geoByIP(jsonpUrl, (rst) => {
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
  geoByIP(jsonpUrl, callback) {
    this.jsonp(jsonpUrl || '//freegeoip.net/json/', callback);
  }

  /**
   * cross browser get of xhr
   * @return {object} the xhr
   */
  getAjaxObject() {
    return ('XMLHttpRequest' in window) ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
  }

  /**
   * helper method to get attribute on specific dom object
   * @param  {object} dom  element
   * @param  {string} attr attribute name
   * @param  {object} value attribute value
   * @return {string}      attribute value
   */
  getAttr(dom, attr, val) {
    if (arguments.length > 2) {
      return this.setAttr(dom, attr, val);
    }

    let el = dom[0] || dom;

    return (el.getAttribute) ? el.getAttribute(attr) : el[attr];
  }

  /**
   * help method to get multiple attributes
   * @param  {object} dom   element
   * @param  {array}  attrs array of attribute names
   * @return {string}       result object
   */
  getAttrs(dom, attrs) {
    const rst = {};
    const that = this;

    each(['', 'data-'], (v, k) => {
      each(attrs || [], (v2, k2) => {
        let attr = that.getAttr(dom, v + k2);

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
  setAttr(dom, attr, value) {
    const el = dom[0] || dom;

    if (el.setAttribute) {
      el.setAttribute(attr, value);
    } else {
      el[attr] = value;
    };

    return value;
  }

  /**
   * help method to set attributes
   * @param {object} dom   element
   * @param {object} attrs key value pair object
   */
  setAttrs(dom, attrs) {
    const el = dom[0] || dom;
    const that = this;

    each(attrs || [], (v, k) => {
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
  contains(obj, target) {
    if (this.isNull(obj, null) === null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) !== -1;

    return this.any(obj, (value) => {
      return value === target;
    });
  }

  /**
   * create an iframe
   * @return {object} the iframe
   */
  createiFrame(id, className) {
    const iframe = this.doc.createElement('iframe');

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
  del(obj, key) {
    obj[key] = undefined;

    try {
      delete obj[key];
    } catch (e) {
      let items = {};

      each(obj, (v, k) => {
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
  defaults(dest) {
    each(slice.call(arguments, 1), (source) => {
      if (typeof (source) !== 'undefined') {
        each(source, (v, k) => {
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
  extend(dest) {
    each(slice.call(arguments, 1), (source) => {
      if (typeof (source) !== 'undefined') {
        each(source, (v, k) => {
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
  groupBy(list, attribute, postProcessFunction) {
    if (this.isNull(list, null) === null) return [];

    // First, reset declare result.
    let groups = [],
      grouper = {};

    // this make sure all elements are correctly sorted
    each(list, (item) => {
      let groupKey = item[attribute],
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
    let i = 0;

    each(grouper, (myGroup) => {
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
  hasCls(el, cls) {
    let i, k, len, ref, v;

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
  injectStyle(id, css) {
    let el, elx, that = this;

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
  jsonp(uri, callback) {
    let callbackVar = 'wucb' + (new Date()).getTime();

    this.win[callbackVar] = (svrRsp) => {
      let rsp = svrRsp;

      if (typeof (svrRsp) === 'string') {
        if (svrRsp === 'null') {
          rsp = null;
        } else {
          rsp = JSON.parse(svrRsp);
        }
      }

      callback(rsp);
    };
    uri = uri;
    uri += ((uri.indexOf('?') > 0) ? '&' : '?') + 'callback=' + callbackVar;
    this.loadScript(uri);
  }

  /**
   * helper method to load a single script
   * @param  {string}     uri          string url
   * @param  {Function}   callbackFunc execute on load
   */
  loadScript(uri, callbackFunc) {
    let tag;

    function maybeDone() {
      if (this.readyState === undefined || this.readyState === 'complete') {
        // Pull the tags out based on the actual element in case IE ever
        // intermingles the onload and onreadystatechange handlers for the same
        // script block before notifying for another one.
        if (typeof (callbackFunc) === 'function') callbackFunc();
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
  loadScripts(uris, callbackFunc) {
    let toProcess,
      that = this;

    function processNext() {
      if (toProcess.length <= 0) {
        if (typeof (callbackFunc) === 'function') {
          callbackFunc();
        }
      } else {
        let item = toProcess[0];

        toProcess.splice(0, 1);
        that.loadScript(item, processNext);
      }
    }

    if (this.isNull(uris.length, 0) <= 0) {
      if (typeof (callbackFunc) === 'function') {
        callbackFunc();
      }
    } else {
      if (typeof (uris) === 'string') {
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
  loadiFrame(parentEl, html, id, className) {
    let iframe = this.createiFrame(id, className);

    parentEl[0].appendChild(iframe);

    if (iframe.contentWindow) {
      iframe.contentWindow.contents = html;
      iframe.src = 'javascript:window["contents"]';
    } else {
      let doc = iframe.contentDocument || iframe.document;

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
  map(obj, iterator, context) {
    let results = [];

    if (this.isNull(obj, null) === null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);

    each(obj, (value, index, list) => {
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
  mapObject(list, attribute) {
    let obj = {};

    if (list) {
      if (this.isNull(list.length, -1) < 0) {
        obj[list[attribute]] = list;
      } else {
        this.map(list, (item, i) => {
          let k = item[attribute],
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
  queryParseString(qstr) {
    qstr = (qstr || '').replace('?', '').replace('#', '')

    const pattern = /(\w+)\[(\d+)\]/
    const decode = this.decode,
      obj = {},
      a = qstr.split('&')

    for (let i = 0; i < a.length; i++) {
      let parts = a[i].split('='),
        key = decode(parts[0]),
        m = pattern.exec(key)

      if (m) {
        obj[m[1]] = obj[m[1]] || []
        obj[m[1]][m[2]] = decode(parts[1])
        continue
      }

      obj[parts[0]] = decode(parts[1] || '')
    }

    return obj
  }

  /**
   * reverse object to query string
   *
   * @param  Object obj the object
   * @return String     the query string
   */
  queryStringify(obj, prefix) {
    const that   = this
    const encode = that.encode

    let str = [], p

    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = prefix ? prefix + '[' + p + ']' : p, v = obj[p]

        str.push((v !== null && typeof v === 'object') ?
          that.queryStringify(v, k) :
          encode(k) + '=' + encode(v))
      }
    }

    return str.join('&')
  }

  /**
   * make http request
   * @param  {object} opts options: headers, method, data
   * @param  {Function} callback success callback
   * @param  {Function} errback  fail callback
   * @return {object}     the request object
   */
  request(opts, callback, errback) {
    const that = this;

    opts.headers = opts.headers || {};
    if (['HEAD', 'GET', 'DELETE'].indexOf(opts.method) > -1) {
      // convert data to query string
      if (opts.data) {
        opts.url += (opts.url.indexOf('?') > 0 ? '?' : '&') + that.queryStringify(opts.data);
        opts = this.del(opts, 'data');
      }
    } else if (typeof (opts.data) !== 'string') {

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
  slugify(str) {
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
  some(obj, predicate, context) {
    let result = false;

    predicate = predicate || ((value) => { return value; });
    if (this.isNull(obj, null) === null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);

    each(obj, (value, index, list) => {
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
  sortOn(collection, name) {
    if (this.isNull(collection, null) === null) return null;
    if (collection.length <= 0) return [];

    // detect attribute type, problem is if your first object is null or not string then this breaks
    if (typeof (collection[0][name]) === 'string') {
      collection.sort((a, b) => {
        if ((a[name] && a[name].toLowerCase()) < (b[name] && b[name].toLowerCase())) return -1;
        if ((a[name] && a[name].toLowerCase()) > (b[name] && b[name].toLowerCase())) return 1;
        return 0;
      });
    } else {
      collection.sort((a, b) => {
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
  trim(str) {
    return (str.trim) ? str.trim() : str.replace(/^\s*|\s*$/g, '');
  }

  /* eslint-disable */

  /**
   * Taken straight from jed's gist: https://gist.github.com/982883
   * 
   * @param  {number} a placeholder
   * @return {string}   a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
   */
  uuid(a) {
    return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,this.uuid);
  }

  /* eslint-enable */

  /**
   * make an xhr request
   * @param  {object}   options  url string or options object
   * @param  {Function} callback
   * @param  {Function} errback  error callback
   * @return {object}     the request object
   */
  xhr(options, callback, errback) {
    let url = options;

    if (typeof url === 'string') {
      options = options || {};
      options.url = url;
    }

    // Create the XHR request itself
    let req = this.getAjaxObject();

    if (options.withCredentials) {
      req.withCredentials = true;

      /* eslint-disable */
      if (typeof XDomainRequest !== 'undefined') {
        // XDomainRequest for IE.
        req = new XDomainRequest();
      }
      /* eslint-enable */

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
    each(options.headers || {}, (value, key) => {
      req.setRequestHeader(key, value);
    });

    this.addEvent(req, 'readystatechange', () => {
      if (req.readyState === 4 && (req.status >= 200 && req.status < 400)) {
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

    this.addEvent(req, 'error', (err) => {
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
};

module.exports = Wu;
