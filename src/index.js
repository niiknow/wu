var myRoot = { navigator: { userAgent: '' }, location: { protocol: 'file' } };

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
  return (typeof (obj) === 'undefined' || obj === null) ? defaultValue : obj;
};

const userAgent = myRoot.navigator.userAgent;

if (typeof (window) !== 'undefined') {
  myRoot = window;
}

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

export default class Wu {
  constructor() {
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

    let start = { latitude: latitude1, longitude: longitude1 };
    let end = { latitude: latitude2, longitude: longitude2 };
    let radii = { km: 6371, mile: 3960, meter: 6371000, nmi: 3440};
    let R = options.unit in radii ? radii[options.unit] : radii.km;
    let dLat = toRad(end.latitude - start.latitude);
    let dLon = toRad(end.longitude - start.longitude);
    let lat1 = toRad(start.latitude);
    let lat2 = toRad(end.latitude) ;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

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
    let that = this;
    let result = { origin: origin, results: [] };

    this.each(points, (point) => {
      let d = that.geoDistance(origin.Latitude, origin.Longitude, point.Latitude, point.Longitude, { unit: 'mile' });
      let newPoint = { point: point, distance: parseFloat(that.isNull(d, 0)).toFixed(2) };

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
    let that = this;

    this.geoByIP(jsonpUrl, (rst) => {
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
  geoByIP(jsonpUrl, callback) {
    let callbackVar = 'mycb' + (new Date()).getTime();
    
    this.win[callbackVar] = callback;
    jsonpUrl = jsonpUrl || '//freegeoip.net/json';
    jsonpUrl += ((jsonpUrl.indexOf('?') > 0) ? '&' : '?') + 'callback=' + callbackVar;
    this.loadScript(jsonpUrl);
    return this;
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
   * @return {string}      attribute value
   */
  getAttr(dom, attr) {
    let el = dom[0] || dom;

    return (el.getAttribute) ? el.getAttribute(attr) : el[attr];
  }

  getAttrs(dom, attrs) {
    let rst = {};

    this.each(['', 'data-'], (v, k) => {
      this.each(attrs || [], (v2, k2) => {
        let attr = this.getAttr(dom, v + k2);

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
  setAttr(dom, attr, value) {
    let el = dom[0] || dom;

    if (el.setAttribute) {
      el.setAttribute(attr, value);
    } else {
      el[attr] = value;
    };

    return el;
  }

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
    let iframe = this.doc.createElement('iframe');

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

  del(obj, key) {
    obj[key] = undefined;
    try {
      delete obj[key];
    } catch (e) {
      let items = {};

      this.each(obj, (v, k) => {
        if (k !== key) {
          items[k] = v;
        }
      });

      return items;
    }
    return obj;
  }

  each(obj, iterator, context) {
    if (this.isNull(obj, null) === null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (let i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      let keys = this.keys(obj);

      for (let j = 0, length2 = keys.length; j < length2; j++) {
        if (iterator.call(context, obj[keys[j]], keys[j], obj) === breaker) return;
      }
    }
  }

  extend(obj) {
    this.each(slice.call(arguments, 1), (source) => {
      if (typeof (source) !== 'undefined') {
        this.each(source, (v, k) => {
          if (this.isNull(v, null) !== null) {
            obj[k] = v;
          }
        });
      }
    });
    return obj;
  }

  groupBy(list, attribute, postProcessFunction) {
    if (this.isNull(list, null) === null) return [];

    // First, reset declare result.
    let groups = [],
      grouper = {};

    // this make sure all elements are correctly sorted
    this.each(list, (item) => {
      let groupKey = item[attribute],
        group = grouper[groupKey];

      if (this.isNull(group, null) === null) {
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

    this.each(grouper, (myGroup) => {
      myGroup.$idx = i++;
      groups.push(myGroup);

      if (postProcessFunction) postProcessFunction(myGroup);
    });

    return this.sortOn(groups, 'key');
  }

  has(obj, key) {
    return hasOwnProperty.call(obj, key);
  }

  keys(obj) {
    if (nativeKeys) {
      return nativeKeys(obj);
    }

    if (obj !== Object(obj)) {
      throw new TypeError('Invalid object');
    }

    let keys = [],
      key;

    for (key in obj) {
      if (this.has(obj, key)) keys.push(key);
    }
    return keys;
  }

  loadScript(uri, callbackFunc) {
    let tag;

    /* jshint -W040 */
    function maybeDone() {
      if (this.readyState === undefined || this.readyState === 'complete') {
        // Pull the tags out based on the actual element in case IE ever
        // intermingles the onload and onreadystatechange handlers for the same
        // script block before notifying for another one.
        if (typeof (callbackFunc) === 'function') callbackFunc();
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
  }

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

  loadIframe(parentEl, html) {
    let iframe = this.doc.createElement('iframe');

    parentEl[0].appendChild(iframe);

    /* jshint -W107 */
    if (iframe.contentWindow) {
      iframe.contentWindow.contents = html;
      iframe.src = 'javascript:window["contents"]';
    } else {
      let doc = iframe.contentDocument || iframe.document;

      doc.open();
      doc.write(html);
      doc.close();
    }
    /* jshint +W107 */

    return iframe;
  } // loadIframe

  map(obj, iterator, context) {
    let results = [];

    if (this.isNull(obj, null) === null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);

    this.each(obj, (value, index, list) => {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  }

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
   * helper method to parse querystring
   * @param  {string} qstr the querystring
   * @return {object}      result
   */
  parseQueryString(qstr) {
    qstr = (qstr || '').replace('?', '').replace('#', '');
    let d = decodeURIComponent,
      query = {},
      a = qstr.split('&');

    for (let i = 0; i < a.length; i++) {
      let b = a[i].split('=');

      query[d(b[0])] = d(b[1] || '');
    }
    return query;
  }

  request(opts) {
    let that = this;

    opts.headers = opts.headers || {};
    if (['HEAD', 'GET', 'DELETE'].indexOf(opts.method) > -1) {
      // convert data to query string
      if (opts.data) {
        opts.url += (opts.url.indexOf('?') > 0 ? '?' : '&') + that.toQueryString(opts.data);
        this.del(opts, 'data');
      }
    } else if (typeof (opts.data) !== 'string') {
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
  slugify(str) {
    str = str || '';
    if (str === '') return str;
    str = str.toLowerCase().replace(/[^0-9a-z\-\_]+/gi, '-').replace(/[\-]+/gi, '-');
    return str;
  }

  some(obj, predicate, context) {
    let result = false;

    predicate = predicate || ((value) => { return value; });
    if (this.isNull(obj, null) === null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);

    this.each(obj, (value, index, list) => {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
      return null;
    });
    return !!result;
  }

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
   * reverse object to query string
   * @param  {object} obj the object
   * @return {string}     the query string
   */
  toQueryString(obj) {
    let str = '';

    this.each(obj, (v, k) => {
      str += `&${k}=${encodeURIComponent(v)}`;
    });
    return str.replace('&', '');
  }

  /**
   * make xhr request with a promise
   * @param  {object} opts the options
   * @return {promise}     a promise
   */
  xhrp(opts) {
    let that = this;

    return new Promise((resolve, reject) => {
      return that.xhr(opts, resolve, reject);
    });
  }

  /**
   * make an xhr request
   * @param  {object}   options  url string or options object
   * @param  {Function} callback
   * @param  {Function} errback  error callback
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
    this.each(options.headers || {}, (value, key) => {
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
      // ignore everything else?
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
}
