// Baseline setup
// --------------

// since this is for the browser, window is the root
const root = window;

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

const userAgent = root.navigator.userAgent;

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
}

function loadSingleScript(uri, callbackFunc) {
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
  if ((root.location || {}).protocol === 'file') {
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

export default class Wu {
  constructor() {
    this._name = 'Wu';
    this.browser = {
      isIE: detectIe(),
      isMobile: /iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/gi.test(userAgent),
      isAndroid: /(android)/gi.test(userAgent),
      isIOS: /iP(hone|od|ad)/gi.test(userAgent)
    };

    this.forEach = this.each;
    this.collect = this.map;
    this.any = this.some;
  }
  
  get name() {
    return this._name;
  }
  
  contains(obj, target) {
    if (this.isNull(obj, null) === null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) !== -1;

    return this.any(obj, (value) => {
      return value === target;
    });
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

  isNull(obj, defaultValue) {
    return (typeof (obj) === 'undefined' || obj === null) ? defaultValue : obj;
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

  loadScripts(uris, callbackFunc) {
    let toProcess;

    function processNext() {
      if (toProcess.length <= 0) {
        if (typeof (callbackFunc) === 'function') {
          callbackFunc();
        }
      } else {
        let item = toProcess[0];

        toProcess.splice(0, 1);
        loadSingleScript(item, processNext);
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
    let iframe = document.createElement('iframe');

    parentEl[0].appendChild(iframe);

    /* jshint -W107 */
    if (iframe.contentWindow) {
      iframe.contentWindow.contents = html;
      iframe.src = 'javascript:window["contents"]';
    } else {
      let doc = iframe.document;

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
}
