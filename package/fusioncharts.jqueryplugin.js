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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var createDesc = __webpack_require__(10);
module.exports = __webpack_require__(4) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(29);
var toPrimitive = __webpack_require__(16);
var dP = Object.defineProperty;

exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(9)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(46);
var defined = __webpack_require__(13);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(20)('wks');
var uid = __webpack_require__(11);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.4' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(33);
var enumBugKeys = __webpack_require__(21);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(20)('keys');
var uid = __webpack_require__(11);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(3).f;
var has = __webpack_require__(1);
var TAG = __webpack_require__(6)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(6);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(15);
var LIBRARY = __webpack_require__(14);
var wksExt = __webpack_require__(23);
var defineProperty = __webpack_require__(3).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(39), __esModule: true };

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(14);
var $export = __webpack_require__(28);
var redefine = __webpack_require__(31);
var hide = __webpack_require__(2);
var Iterators = __webpack_require__(17);
var $iterCreate = __webpack_require__(44);
var setToStringTag = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(51);
var ITERATOR = __webpack_require__(6)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(15);
var ctx = __webpack_require__(42);
var hide = __webpack_require__(2);
var has = __webpack_require__(1);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(4) && !__webpack_require__(9)(function () {
  return Object.defineProperty(__webpack_require__(30)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(8);
var dPs = __webpack_require__(45);
var enumBugKeys = __webpack_require__(21);
var IE_PROTO = __webpack_require__(19)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(30)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(50).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(1);
var toIObject = __webpack_require__(5);
var arrayIndexOf = __webpack_require__(47)(false);
var IE_PROTO = __webpack_require__(19)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 36 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(33);
var hiddenKeys = __webpack_require__(21).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _iterator = __webpack_require__(26);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(35);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2['default'] === "function" && typeof _iterator2['default'] === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2['default'] === "function" && obj.constructor === _symbol2['default'] && obj !== _symbol2['default'].prototype ? "symbol" : typeof obj; };

var _FusionCharts2 = __webpack_require__(67);

var _FusionCharts3 = _interopRequireDefault(_FusionCharts2);

var _jquery = __webpack_require__(68);

var _jquery2 = _interopRequireDefault(_jquery);

var _transcoderHtmltable = __webpack_require__(69);

var _transcoderHtmltable2 = _interopRequireDefault(_transcoderHtmltable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_FusionCharts3['default'].addDep(_transcoderHtmltable2['default']);

var win = window,
    doc = win.document,
    jQ = _jquery2['default'],
    renderFusionCharts,
    captureAllFusionChartsEvents,
    getChartObjectsFromSelection,
    configureLinkedCharts,
    math = win.Math,
    mathMin = math.min,
    isArray = function () {
    // Use compiler's own isArray when available
    if (Array.isArray) {
        return Array.isArray;
    }

    // Retain references to variables for performance optimization
    var objectToStringFn = Object.prototype.toString,
        arrayToStringResult = objectToStringFn.call([]);

    return function (subject) {
        return objectToStringFn.call(subject) === arrayToStringResult;
    };
}(),
    realtimeCommandMap = {
    feed: 'feedData',
    setdata: 'setData',
    setdataforid: 'setDataForId',
    getdata: 'getData',
    getdataforid: 'getDataForId',
    clear: 'clearChart',
    stop: 'stopUpdate',
    start: 'restartUpdate'
},
    optionsParser = {
    feedData: function feedData(options) {
        if (typeof options === 'string') {
            return [options];
        } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.stream) {
            return [options.stream];
        } else {
            return false;
        }
    },
    getData: function getData(options) {
        // index is passed in case of multivalue charts.
        if (!isNaN(options)) {
            return [options];
        } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.index) {
            return [options.index];
        } else {
            return [];
        }
    },
    getDataForId: function getDataForId(options) {
        // index is passed in case of multivalue charts.
        if (typeof options === 'string') {
            return [options];
        } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.id) {
            return [options.id];
        } else {
            return [];
        }
    },
    setData: function setData(options, value, label) {
        var arr = [];
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
            arr = [options, value, label];
        } else {
            options.value && arr.push(options.value);
            options.label && arr.push(options.label);
        }

        return arr;
    },
    setDataForId: function setDataForId(options, value, label) {
        var arr = [];
        if (typeof options === 'string' || typeof value === 'string' || typeof label === 'string') {
            arr = [options, value, label];
        } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            options.value && arr.push(options.value);
            options.label && arr.push(options.label);
        }

        return arr;
    },
    clearChart: function clearChart(options) {
        return [options];
    },
    stopUpdate: function stopUpdate(options) {
        return [options];
    },
    restartUpdate: function restartUpdate(options) {
        return [options];
    }
};

// Assign FusionCharts object to global jQuery object for easy use.
jQ.FusionCharts = _FusionCharts3['default'];

/**
 * Used purely for rendering the FusionCharts.
 * Acts as a common method that is invoked by all the APIs that create a
 * FusionChart object
 *
 * @param {array} elemList is a list of all the HTML elements that
 * are selected using the jQuery selectors
 *
 * @param {object} chartOptions is the options that are to be passed to
 * the FusionCharts contructor.
 */

renderFusionCharts = function renderFusionCharts(elemList, chartOptions) {
    var i, l, cO, chartObj, scriptElement;

    if (isArray(chartOptions) || chartOptions instanceof jQ) {
        l = mathMin(elemList.length, chartOptions.length);
    } else {
        l = elemList.length;
    }

    for (i = 0; i < l; i += 1) {

        // One-to-one mapping with the HTML elements in case of
        // multiple option objects.
        if (isArray(chartOptions) || chartOptions instanceof jQ) {
            cO = chartOptions[i];
        } else {
            cO = chartOptions;
        }

        // check if the element is appended to the window document or not.
        if (elemList[i].parentNode) {
            // Adding the renderAt option to the chartOptions tells the
            // constructor where to render the FusionCharts object.
            _FusionCharts3['default'].render(jQ.extend({}, cO, {
                renderAt: elemList[i]
            }));
        } else {
            chartObj = new _FusionCharts3['default'](jQ.extend({}, cO, {
                renderAt: elemList[i]
            }));

            if (!jQ.FusionCharts.delayedRender) {
                jQ.FusionCharts.delayedRender = {};
            }
            jQ.FusionCharts.delayedRender[chartObj.id] = elemList[i];

            scriptElement = doc.createElement('script');
            scriptElement.setAttribute('type', 'text/javascript');

            if (/msie/i.test(win.navigator.userAgent) && !win.opera) {
                scriptElement.text = 'FusionCharts.items[\'' + chartObj.id + '\'].render();';
            } else {
                scriptElement.appendChild(doc.createTextNode('FusionCharts.items[\'' + chartObj.id + '\'].render()'));
            }
            elemList[i].appendChild(scriptElement);
        }
    }
    return elemList;
};

/**
 *  Using jQuery's event model for attaching handlers to FusionCharts events.
 *  This is achieved by listening to the FusionCharts "*" event and then
 *  triggering a jQuery event on the associated DOM element.
 */
captureAllFusionChartsEvents = function captureAllFusionChartsEvents(eve, args) {
    var containerElement, event;

    // Extending our event with the jQuery event model for proper
    // delegation and bubbling.
    event = jQ.extend({}, eve);
    jQ.extend(event, jQ.Event('fusioncharts' + eve.eventType));

    // Checking if there is an associated DOM object
    if (event.sender && event.sender.options) {
        containerElement = event.sender.options.containerElement || event.sender.options.containerElementId;

        if ((typeof containerElement === 'undefined' ? 'undefined' : _typeof(containerElement)) === 'object') {
            jQ(containerElement).trigger(event, args);
        } else if (jQ('#' + containerElement).length) {
            jQ('#' + containerElement).trigger(event, args);
        } else {
            jQ(doc).trigger(event, args);
        }
    } else {
        // If there is no DOM object associated with the FusionCharts object
        // then triggering the event on the document itself for any possible
        // global handlers that might want to capture it.
        jQ(doc).trigger(event, args);
    }
};

_FusionCharts3['default'].addEventListener('*', captureAllFusionChartsEvents);

/**
 * Used to select all the HTML object/embed elements that have been created
 * using the FusionCharts constructor
 *
 * @param {jQuery} obj, the selection of elements that need to be processed.
 *
 */
getChartObjectsFromSelection = function getChartObjectsFromSelection(obj) {

    // The HTML object/embed may be part of the current selection or a
    // child of the current selection. Need to take both cases into account.
    // @note If the FusionCharts object has not been rendered yet, e.g in
    // case the container is not appended to the document, then 'find' for
    // that element will NOT return the corresponding FusionCharts object.
    return obj.filter(':FusionCharts').add(obj.find(':FusionCharts'));
};

/**
 *  Used to configure the links at various levels in a linked chart.
 *
 *  @param {jQuery} chartObjects The FusionCharts objects for which the link
 *  has to be configured.
 *
 *  @param {object} linkConfigObj contains the configuration details of the
 *  linked chart like swfUrl, height, width etc.
 *
 *  @param {string} level contains the level at which the user wants to
 *  configure the link.
 *
 */
configureLinkedCharts = function configureLinkedCharts(chartObjects, linkConfigObj, level) {

    if ((typeof linkConfigObj === 'undefined' ? 'undefined' : _typeof(linkConfigObj)) === 'object') {
        chartObjects.each(function () {
            this.configureLink(linkConfigObj, level);
        });
    }
};

/**
 * @id: jQuery.fn.insertFusionCharts
 * @id: $.fn.insertFusionCharts
 *
 * @param {object} options contains the parameters that need to be passed
 * to the FusionCharts constructor
 *
 * Inserts the FusionCharts objects in the HTML elements that are selected
 * by the jQuery selector.
 */
jQ.fn.insertFusionCharts = function (options) {
    return renderFusionCharts(this, options);
};

/**
 * @id: jQuery.fn.appendFusionCharts
 * @id: $.fn.appendFusionCharts
 *
 * @param {object} options contains that parameters that need to be passed
 * to the FusionCharts constructor
 *
 * Appends the FusionCharts objects immediately after the HTML elements
 * that are selected by the jQuery selector.
 */
jQ.fn.appendFusionCharts = function (options) {
    options.insertMode = 'append';
    return renderFusionCharts(this, options);
};

/**
 * @id: jQuery.fn.prependFusionCharts
 * @id: $.fn.prependFusionCharts
 *
 * @param {object} options contains the parameters that need to be passed
 * to the FusionCharts constructor
 *
 *  Prepends the FusionCharts objects before the HTML elements that are
 *  selected by the jQuery selector.
 */
jQ.fn.prependFusionCharts = function (options) {
    options.insertMode = 'prepend';
    return renderFusionCharts(this, options);
};

/**
 * @id: jQuery.fn.attrFusionCharts
 * @id: $.fn.attrFusionCharts
 *
 * @param {object|string} attr, If this is a string then it contains
 * the FusionCharts object's attribute that needs to be set or fetched.
 * If it is an object then, it contains the attributes along with the
 * corresponding values that need to be set on the FusionCharts object
 *
 * @param {string} attrVal, To be used if attr is a string. Contains the
 * value that needs to be set for the attribute that attr corresponds to.
 *
 *  Used to set or get the attribute(s) of the FusionCharts object.
 */
jQ.fn.attrFusionCharts = function (attr, attrVal) {

    /**
     * @ignore
     * @todo Remove ignore
     *
     * @var {jQuery} chartsObjects stores the FusionCharts objects in
     * the selected HTML elements.
     * @var {object} transfer Holds all atttributes to be returned to the
     * callee Function.
     */
    var transfer = [],
        chartObjects = getChartObjectsFromSelection(this);

    if (attrVal !== undefined) {
        // Set the charts attribute attr with value attrVal.

        chartObjects.each(function () {
            this.FusionCharts.setChartAttribute(attr, attrVal);
        });
        return this;
    }
    if ((typeof attr === 'undefined' ? 'undefined' : _typeof(attr)) === 'object') {
        // Set the charts attributes, in the passed object's keys with
        // the corresponding values.

        chartObjects.each(function () {
            this.FusionCharts.setChartAttribute(attr);
        });
        return this;
    }

    // If both the above cases fail, user is trying to, in accordance with the
    // jQuery paradigm, get the value of the arrtibute.
    chartObjects.each(function () {
        transfer.push(this.FusionCharts.getChartAttribute(attr));
    });
    return transfer;
};

/**
 * @id jQuery.fn.updateFusionCharts
 * @id $.fn.updateFusionCharts
 *
 * @param {object} options Contains the new options that the FusionCharts
 * objects need to update themselves with. Currently, using this interface
 * the dataType, data, width, height, debugMode and swfUrl can be updated.
 */
jQ.fn.updateFusionCharts = function (options) {

    var filterOpts = {},
        chartObjects = getChartObjectsFromSelection(this),
        updateOptions = [['swfUrl', false], ['type', false], ['height', false], ['width', false], ['containerBackgroundColor', true], ['containerBackgroundAlpha', true], ['dataFormat', false], ['dataSource', false]],
        i,
        l,
        fcChart,
        renderFlag,
        optStr,
        newChart;

    for (i = 0, l = updateOptions.length; i < l; i += 1) {
        optStr = updateOptions[i][0];
        filterOpts.type = filterOpts.type || filterOpts.swfUrl;
        if (options[optStr]) {
            if (updateOptions[i][1]) {
                renderFlag = true;
            }
            filterOpts[optStr] = options[optStr];
        }
    }

    chartObjects.each(function () {
        // If height and width are given then resize the chart first.
        fcChart = this.FusionCharts;
        if (renderFlag) {
            newChart = fcChart.clone(filterOpts);
            newChart.render();
            return;
        }

        if (filterOpts.dataSource !== undefined || filterOpts.dataFormat !== undefined) {
            if (filterOpts.dataSource === undefined) {
                fcChart.setChartData(fcChart.args.dataSource, filterOpts.dataFormat);
            } else if (filterOpts.dataFormat === undefined) {
                fcChart.setChartData(filterOpts.dataSource, fcChart.args.dataFormat);
            } else {
                fcChart.setChartData(filterOpts.dataSource, filterOpts.dataFormat);
            }
        }
        if (filterOpts.width !== undefined || filterOpts.height !== undefined) {
            fcChart.resizeTo(filterOpts.width, filterOpts.height);
        }
        if (filterOpts.type) {
            fcChart.chartType(filterOpts.type);
        }
    });

    return this;
};

/**
 *  @id: jQuery.fn.cloneFusionCharts
 *  @id: $.fn.cloneFusionCharts
 *
 *  @param {object} options The options object that takes the additional
 *  parameters to be passed while cloning the FusionCharts object.
 *
 *  @param {function} callback The callback function that has to be called
 *  once the FusionCharts objects have been cloned. This function will take
 *  the new clone objects as parameter.
 *
 */
jQ.fn.cloneFusionCharts = function (callback, options) {

    var transfer, temp, chartObjects;

    // Check if the options parameter, which is not mandatory, has been
    // passed or not. If not, that means that options is the callback function.
    if (typeof callback !== 'function' && typeof options === 'function') {
        temp = callback;
        callback = options;
        options = temp;
    }

    transfer = [];
    chartObjects = getChartObjectsFromSelection(this);

    chartObjects.each(function () {
        transfer.push(this.FusionCharts.clone(options, {}, true));
    });

    callback.call(jQ(transfer), transfer);

    return this;
};

/**
 *  @id: jQuery.fn.disposeFusionCharts
 *  @id: $.fn.disposeFusionCharts
 *
 */
jQ.fn.disposeFusionCharts = function () {

    var chartObjects = getChartObjectsFromSelection(this);

    chartObjects.each(function () {
        // Execute dispose on charts.
        this.FusionCharts.dispose();

        // Remove identifier reference variable
        delete this.FusionCharts;

        // cleanup any static objects pertaining to FusionCharts.
        if (this._fcDrillDownLevel === 0) {
            delete this._fcDrillDownLevel;
        }
    });

    return this;
};

/**
 * @id jQuery.fn.covertToFusionCharts
 * @id $.fn.convertToFusionCharts
 *
 * @param {object} chartOpts Configuration options to generate FusionCharts.
 * See documentation to get the list.
 *
 * @param {object} convertOpts Configuration options to convert the table
 * into a FusionCharts object.
 * See documentation to get the list.
 *
 */
jQ.fn.convertToFusionCharts = function (chartOpts, convertOpts) {

    var transferObj = [];

    if (typeof chartOpts.dataConfiguration === 'undefined') {
        chartOpts.dataConfiguration = {};
    }

    jQ.extend(true, chartOpts.dataConfiguration, convertOpts);

    if (!chartOpts.dataSource) {
        chartOpts.dataSource = this.get(0);
    }

    if (!chartOpts.renderAt) {
        this.each(function () {
            transferObj.push(jQ('<div></div>').insertBefore(this).insertFusionCharts(chartOpts).get(0));
        });
    } else {
        if (typeof chartOpts.renderAt === 'string') {
            transferObj.push(jQ('#' + chartOpts.renderAt).insertFusionCharts(chartOpts).get(0));
        } else if (_typeof(chartOpts.renderAt) === 'object') {
            transferObj.push(jQ(chartOpts.renderAt).insertFusionCharts(chartOpts).get(0));
        }
    }

    return jQ(transferObj);
};

/**
 * @id jQuery.fn.drillDownFusionChartsTo
 * @id $.fn.drillDownFusionChartsTo
 *
 * Used to set multi-level configurations of linked FusionCharts objects.
 * The levels are iterated depending on the number of configuration objects
 * in a single jQuery chain.
 *
 * To set the configuration at a specific level please refer to docs.
 */
jQ.fn.drillDownFusionChartsTo = function () {
    var chartObjects = getChartObjectsFromSelection(this),
        j,
        len,
        i,
        l,
        configureOpts;

    // hack to support chaining of multiple drillDowns in a single chain
    if (typeof this._fcDrillDownLevel === 'undefined') {
        this._fcDrillDownLevel = 0;
    }

    for (j = 0, len = arguments.length; j < len; j += 1) {
        configureOpts = arguments[j];

        if (isArray(configureOpts)) {
            for (i = 0, l = configureOpts.length; i < l; i += 1) {
                configureLinkedCharts(chartObjects, configureOpts[i], this._fcDrillDownLevel);
                this._fcDrillDownLevel += 1;
            }
        } else {
            configureLinkedCharts(chartObjects, configureOpts, this._fcDrillDownLevel);
            this._fcDrillDownLevel += 1;
        }
    }
    return this;
};

/**
 * @id jQuery.fn.streamFusionChartsData
 * @id $.fn.streamFusionChartsData
 *
 * @param {string} command. Contains the type of operation to be performed on
 * the realtime charts. If not provided, by default the command would be 'feed'
 * that invokes the feedData method of the chart and passes the options to it.
 *
 * @param {object} options. Contains the options that has to be parsed (if it is a js object)
 * and passed to the chart method (corresponding to command).
 * If not an object, it is passed as is to the chart method.
 *
 * @param {object} value. To make the API morph the data setter methods (setData, setDataForId),
 * it can also be passed the same parameters as the setter functions.
 *
 * @param {object} label. To make the API morph the data setter methods (setData, setDataForId),
 * it can also be passed the same parameters as the setter functions.
**/

jQ.fn.streamFusionChartsData = function (command, options, value, label) {

    var chartObjects = getChartObjectsFromSelection(this),
        transfer = [],
        fcChart,
        method,
        params;

    // Convert the command to lower case and fetch the proper chart method name.
    method = realtimeCommandMap[command && command.toLowerCase()];

    // Check if the command provided is valid or not.
    if (method === undefined) {
        // this means the command is not a getter. which in turn means that
        // the command is a data stream string and has to be handled accordingly.
        if (arguments.length === 1) {
            params = [command];
            method = realtimeCommandMap.feed;
        } else {
            return this;
        }
    } else if (arguments.length === 1) {
        // command is to invoke a method without any parameters..
        params = [];
    } else {
        // optionsParser returns an array of parameters to be passed to the
        // chart method.
        params = optionsParser[method](options, value, label);
    }

    if (method === 'getData' || method === 'getDataForId') {
        chartObjects.each(function () {
            fcChart = this.FusionCharts;
            if (typeof fcChart[method] === 'function') {
                transfer.push(fcChart[method].apply(fcChart, params));
            }
        });
        return transfer;
    } else {
        chartObjects.each(function () {
            fcChart = this.FusionCharts;
            if (typeof fcChart[method] === 'function') {
                fcChart[method].apply(fcChart, params);
            }
        });
        return this;
    }
};

jQ.extend(jQ.expr[':'], {
    /**
     *  Extending the jQuery selector to select all object/embed elements that
     *  have been created using the FusionCharts constructor i.e that are an
     *  instance of FusionCharts.
     *
     *  @param {object} obj, Is the HTML element that is currently being
     *  checked.
     */
    FusionCharts: function FusionCharts(obj) {
        return obj.FusionCharts instanceof _FusionCharts3['default'];
    }
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40);
__webpack_require__(53);
module.exports = __webpack_require__(23).f('iterator');


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(41)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(27)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(12);
var defined = __webpack_require__(13);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(43);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(32);
var descriptor = __webpack_require__(10);
var setToStringTag = __webpack_require__(22);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(2)(IteratorPrototype, __webpack_require__(6)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var anObject = __webpack_require__(8);
var getKeys = __webpack_require__(18);

module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(34);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(5);
var toLength = __webpack_require__(48);
var toAbsoluteIndex = __webpack_require__(49);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(12);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(12);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(1);
var toObject = __webpack_require__(52);
var IE_PROTO = __webpack_require__(19)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(13);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(54);
var global = __webpack_require__(0);
var hide = __webpack_require__(2);
var Iterators = __webpack_require__(17);
var TO_STRING_TAG = __webpack_require__(6)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(55);
var step = __webpack_require__(56);
var Iterators = __webpack_require__(17);
var toIObject = __webpack_require__(5);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(27)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
__webpack_require__(64);
__webpack_require__(65);
__webpack_require__(66);
module.exports = __webpack_require__(15).Symbol;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(0);
var has = __webpack_require__(1);
var DESCRIPTORS = __webpack_require__(4);
var $export = __webpack_require__(28);
var redefine = __webpack_require__(31);
var META = __webpack_require__(59).KEY;
var $fails = __webpack_require__(9);
var shared = __webpack_require__(20);
var setToStringTag = __webpack_require__(22);
var uid = __webpack_require__(11);
var wks = __webpack_require__(6);
var wksExt = __webpack_require__(23);
var wksDefine = __webpack_require__(24);
var enumKeys = __webpack_require__(60);
var isArray = __webpack_require__(61);
var anObject = __webpack_require__(8);
var isObject = __webpack_require__(7);
var toIObject = __webpack_require__(5);
var toPrimitive = __webpack_require__(16);
var createDesc = __webpack_require__(10);
var _create = __webpack_require__(32);
var gOPNExt = __webpack_require__(62);
var $GOPD = __webpack_require__(63);
var $DP = __webpack_require__(3);
var $keys = __webpack_require__(18);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(37).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(25).f = $propertyIsEnumerable;
  __webpack_require__(36).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(14)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(2)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(11)('meta');
var isObject = __webpack_require__(7);
var has = __webpack_require__(1);
var setDesc = __webpack_require__(3).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(9)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(18);
var gOPS = __webpack_require__(36);
var pIE = __webpack_require__(25);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(34);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(5);
var gOPN = __webpack_require__(37).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(25);
var createDesc = __webpack_require__(10);
var toIObject = __webpack_require__(5);
var toPrimitive = __webpack_require__(16);
var has = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(29);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(4) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 64 */
/***/ (function(module, exports) {



/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24)('asyncIterator');


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24)('observable');


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = FusionCharts;

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(26);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(35);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2['default'] === "function" && typeof _iterator2['default'] === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2['default'] === "function" && obj.constructor === _symbol2['default'] && obj !== _symbol2['default'].prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var win = window,
    doc = win.document,
    objectToStringFn = Object.prototype.toString,
    merge = function merge(obj1, obj2) {
    var item, str;
    //check whether obj2 is an array
    //if array then iterate through it's index
    //**** MOOTOOLS precution
    if (obj2 instanceof Array) {
        for (item = 0; item < obj2.length; item += 1) {
            if (_typeof(obj2[item]) !== 'object') {
                obj1[item] = obj2[item];
            } else {
                if (_typeof(obj1[item]) !== 'object') {
                    obj1[item] = obj2[item] instanceof Array ? [] : {};
                }
                merge(obj1[item], obj2[item]);
            }
        }
    } else {
        for (item in obj2) {
            if (_typeof(obj2[item]) === 'object') {
                str = objectToStringFn.call(obj2[item]);
                if (str === '[object Object]') {
                    if (_typeof(obj1[item]) !== 'object') {
                        obj1[item] = {};
                    }
                    merge(obj1[item], obj2[item]);
                } else if (str === '[object Array]') {
                    if (!(obj1[item] instanceof Array)) {
                        obj1[item] = [];
                    }
                    merge(obj1[item], obj2[item]);
                } else {
                    obj1[item] = obj2[item];
                }
            } else {
                obj1[item] = obj2[item];
            }
        }
    }
    return obj1;
},
    extend = function extend(sink, source, proto, deep) {
    var item;
    // When 'proto' is marked as true, the methods and properties
    // of source is not added to the prototype of the sink.
    if (proto && sink.prototype) {
        sink = sink.prototype;
    }

    // If deep extend is specified, then we use the deep copy function
    // 'merge'
    if (deep === true) {
        merge(sink, source);
    }
    // Copy all methods and properties of the object passed in parameter
    // to the object to which this function is attached.
    else {
            for (item in source) {
                sink[item] = source[item];
            }
        }

    return sink;
},

/**
 *  Used to remove all textNodes in an array of nodes. Textnodes get created
 *  inadvertently, when the table HTML has newline and space. Returns an
 *  array of nodes that is not an HTMLCollection and has only the non-text
 *  nodes in it.
 *
 *  @param {array} nodeArr Contains the array of nodes that have to be
 *  sanitized.
 */
sanitizeNodesArray = function sanitizeNodesArray(nodeArr) {
    var l,
        i,
        sanitizedArr = [];
    for (i = 0, l = nodeArr.length; i < l; i += 1) {
        // if nodeType != 3 then the node is not a text node.
        if (nodeArr[i].nodeType !== 3) {
            sanitizedArr.push(nodeArr[i]);
        }
    }
    return sanitizedArr;
},


/**
 * Used to merge two JSON objects. The copy is a deep copy and not a
 * reference copy.
 *
 * @param: {object} srcJSON, the source json.
 *
 * @param: {object} targetJSON, that json that needs to be merged with the
 * source json.
 *
 */
mergeJSON = function mergeJSON(srcJSON, targetJSON) {
    var i, len, item;

    if (targetJSON instanceof Array) {
        for (i = 0, len = targetJSON.length; i < len; i++) {
            if (targetJSON[i] instanceof Array) {
                if (srcJSON[i] === undefined) {
                    srcJSON[i] = [];
                }
                mergeJSON(srcJSON[i], targetJSON[i]);
            } else if (_typeof(targetJSON[i]) === 'object') {
                if (typeof srcJSON[i] === 'undefined') {
                    srcJSON[i] = {};
                }
                mergeJSON(srcJSON[i], targetJSON[i]);
            } else {
                srcJSON[i] = targetJSON[i];
            }
        }
    } else if ((typeof targetJSON === 'undefined' ? 'undefined' : _typeof(targetJSON)) === 'object') {
        for (item in targetJSON) {
            if (typeof srcJSON[item] === 'undefined') {
                if (targetJSON[item] instanceof Array) {
                    srcJSON[item] = [];
                    mergeJSON(srcJSON[item], targetJSON[item]);
                } else if (_typeof(srcJSON[item]) === 'object') {
                    srcJSON[i] = {};
                    mergeJSON(srcJSON[i], targetJSON[i]);
                } else {
                    srcJSON[i] = targetJSON[i];
                }
            }
        }
    }

    return srcJSON;
},


/**
 *  Returns the <tbody> element of the table. In order to support W3C
 *  non-compliant HTML, wherein the table does not have a <tbody> containing
 *  the <tr> & <td> elements, the table itself is returned.
 *
 *  @param {object} tbl Is the table whose tbody needs to fetched.
 *
 */
getTbody = function getTbody(tbl) {
    var tbodyArr = sanitizeNodesArray(tbl.childNodes);

    // Checking if the table's childNode is a tbody or not
    if (tbodyArr.length) {
        if (tbodyArr[0].nodeName === 'TBODY') {
            return tbodyArr[0];
        } else if (tbodyArr[0].nodeName === 'THEAD' && tbodyArr[1] && tbodyArr[1].nodeName === 'TBODY') {
            return tbodyArr[1];
        }
    }
    return tbl;
},


/**
 *  Returns an array containing the <td> in the <thead> tag.
 *
 *  @param {object} tbl Is the table whose tbody needs to fetched.
 *
 */
getThead = function getThead(tbl) {
    var tbodyArr = sanitizeNodesArray(tbl.childNodes);

    // Checking if the table's childNode is a tbody or not
    if (tbodyArr.length) {
        if (tbodyArr[0].nodeName === 'THEAD' && tbodyArr[1] && tbodyArr[1].nodeName === 'TBODY') {
            return tbodyArr[0].childNodes;
        }
    }
    return [];
},


/**
 *  Used to return the text in a given Element. Needed as firefox does not
 *  support 'innerText', which is a W3C standard and instead uses
 *  textContent attribute to store the text.
 *
 *  @param {object} nodeEle The HTML element whose text is needed.
 */
getTextFromNode = function getTextFromNode(nodeEle) {
    return nodeEle.innerText !== undefined ? nodeEle.innerText : nodeEle.textContent;
},


/**
 *  Used to convert an array of rows into an array of corresponding columns.
 *
 *  @param {array} rowArr The array of table rows that has to be transposed
 *  into an array of columns.
 */
getColumnArr = function getColumnArr(rowArr) {

    var i,
        j,
        l,
        len,
        cellArr,
        rowSpanInc,
        colSpan = 1,
        columnArrIdx,
        rowSpan = {},
        returnObj = [];

    for (i = 0, l = rowArr.length; i < l; i += 1) {

        // get all the cells of the row
        cellArr = sanitizeNodesArray(rowArr[i].childNodes);
        colSpan = 1;
        rowSpanInc = 0;
        for (j = 0, len = cellArr.length; j < len; j += 1) {

            // if a previous row had a cell with a rowspan then this
            // rowspan needs to be taken into account while creating
            // column array.
            columnArrIdx = j + colSpan + rowSpanInc - 1;
            if (rowSpan[columnArrIdx] && i - rowSpan[columnArrIdx].rowNum < rowSpan[columnArrIdx].row) {
                rowSpanInc += rowSpan[columnArrIdx].col;
                columnArrIdx += rowSpan[columnArrIdx].col;
            }

            if (parseInt(cellArr[j].getAttribute('rowspan'), 10) > 1) {
                if (!rowSpan[columnArrIdx]) {
                    rowSpan[columnArrIdx] = {};
                }
                rowSpan[columnArrIdx].rowNum = i;
                rowSpan[columnArrIdx].row = parseInt(cellArr[j].getAttribute('rowspan'), 10);
                // If the cell has both a rowspan and a colspan then they
                // both need to be taken into consideration while calculating
                // the column of cells in the susequent rows
                if (parseInt(cellArr[j].getAttribute('colspan'), 10) > 1) {
                    rowSpan[columnArrIdx].col = parseInt(cellArr[j].getAttribute('colspan'), 10);
                } else {
                    rowSpan[columnArrIdx].col = 1;
                }
            }

            // The previous cells colspan, and the previous rows rowspans
            // also needs to be added to the current cells index to get the
            // proper column index.
            while (returnObj.length <= columnArrIdx) {
                returnObj.push({ childNodes: [] });
            }
            returnObj[columnArrIdx].childNodes.push(cellArr[j]);

            // Adding the current cells colspan for subsequent cells in the
            // current row.
            if (parseInt(cellArr[j].getAttribute('colspan'), 10) > 1) {
                colSpan += parseInt(cellArr[j].getAttribute('colspan'), 10) - 1;
            }
        }
    }

    return returnObj;
},


/**
 * Used to check if an item is present in an array or not.
 *
 * @param {array} arr The array which has to be checked
 *
 * @param {string|number|object} item The item which needs be checked if
 * present in array arr or not.
 */
arrayContains = function arrayContains(arr, item) {
    var i = arr.length;
    // Using a decrementing while loop (optimization) since the order in which the
    // array is traversed doesn't matter.
    while (i) {
        i -= 1;
        if (arr[i] === item) {
            return true;
        }
    }
    return false;
},


/**
 * Used to check if a particular row or column has all non numeric (or blank)
 * content. If so, then that particular row/column must be ignored.
 *
 * @param {array} nodeArr Is an array of all the rows/columns of the table.
 *
 * @param {number} index of the row/column that is not to be analysed as it
 * has already been set aside as the label row/column.
 *
 * @param {number} j is the cell index at which we have to check for the
 * presence of numeric data in all the other rows and columns.
 */

checkData = function checkData(nodeArr, j, index) {

    var i,
        l,
        childArr = sanitizeNodesArray(nodeArr[j].childNodes),
        text;

    for (i = 0, l = childArr.length; i < l; i += 1) {
        if (i !== index) {
            text = getTextFromNode(childArr[i]);
            if (parseFloat(text) === text) {
                return true;
            }
        }
    }
    return false;
},
    _blankString = '__fcBLANK__',
    _blankNo = 0,

/**
 * Used to get the table row that has the labels (categories or legend) and
 * extract the label details from the corresponding row.
 *
 * @param {array} nodeArr Is an array of all the rows/columns of the table.
 *
 * @param {array} ignoreArr Is an array of all the indexes in the nodeArr
 * that need to be ignored. The items of this array can be negative as well.
 *
 * @param {string} index If the label row/column details have been given by
 * the user then this will contain the index which has the labels.
 *
 */
getLabels = function getLabels(nodeArr, ignoreArr, index, opts) {

    var len,
        l,
        i,
        j,
        childArr,
        mostEmptyCellRow = null,
        internalLabel = [],
        emptyCellCount = [],
        textCellCount = 0,
        temp,
        returnObj = {},
        spanTotal = 0,
        spanLen,
        isRowLabel,
        maxIdx,
        spanLength,
        totalSpanLength = 0,
        tLabels;

    if (typeof index === 'undefined') {
        // Checking if the user has provided the index. If index has not been
        // passed then we assume that the user does not want to give a label row
        // or column.

        // Creating custom labels for all cells in the first row/column.
        childArr = sanitizeNodesArray(nodeArr[0].childNodes);
        for (j = 0, len = childArr.length; j < len; j += 1) {
            spanLen = j + spanTotal;
            internalLabel[spanLen] = _blankString + (spanLen + 1);

            temp = parseInt(childArr[j].colSpan, 10);
            temp = temp > 1 ? temp : parseInt(childArr[j].rowSpan, 10);
            if (temp > 1) {
                for (l = 1; l < temp; l += 1) {
                    internalLabel[spanLen + l] = _blankString + (spanLen + l + 1);
                }
                spanTotal += temp - 1;
            }
        }

        // Deleting the labels for the rows/columns that the user wants to
        // ignore.
        for (i = 0, l = j + spanTotal, len = ignoreArr.length; i < len; i += 1) {
            if (ignoreArr[i] > 0) {
                delete internalLabel[ignoreArr[i] - 1];
            } else {
                delete internalLabel[l + ignoreArr[i]];
            }
        }

        return { 'index': -1, 'labelObj': internalLabel };
    } else if (index === 0) {
        // Checking if the user has provided the index. Since we expect row/column
        // indices starting from 1, if index is 0 then we use our internal logic
        // to find the label array from the given nodeArr.
        for (i = 0, l = nodeArr.length; i < l; i += 1) {
            childArr = sanitizeNodesArray(nodeArr[i].childNodes);
            emptyCellCount[i] = 0;
            textCellCount = 0;

            if (opts && opts._extractByHeaderTag) {
                for (j = 0, len = childArr.length; j < len; j += 1) {
                    if (childArr[j].nodeName.toLowerCase() != 'th') {
                        continue;
                    }
                    tLabels = getLabels(nodeArr, ignoreArr, i + 1);
                    delete tLabels.labelObj[opts._rowLabelIndex];
                    return tLabels;
                }
            } else {
                for (j = 0, len = childArr.length; j < len; j += 1) {
                    if (arrayContains(ignoreArr, j + 1) || arrayContains(ignoreArr, j - len)) {
                        continue;
                    }
                    temp = getTextFromNode(childArr[j]);
                    // Checking if the cell is emtpy.
                    if (temp.replace(/^\s*/, '').replace(/\s*$/, '') === '') {
                        emptyCellCount[i] += 1;
                        continue;
                    }
                    // Checking if the cell has a non-number content
                    if (parseFloat(temp) != temp) {
                        textCellCount += 1;
                        // If there are at least 2 cells that have non-number
                        // content then we assume that they contain labels and
                        // fetch the labels from this array of nodes.
                        if (textCellCount > 1) {
                            return getLabels(nodeArr, ignoreArr, i + 1);
                        }
                    }
                }
            }
            // If there are empty cells then we assume that the array with
            // the most number of empty cells must be the label array.
            if (i > 0) {
                if (emptyCellCount[i - 1] > emptyCellCount[i]) {
                    mostEmptyCellRow = i - 1;
                } else if (emptyCellCount[i - 1] < emptyCellCount[i]) {
                    mostEmptyCellRow = i;
                }
            }
        }
        if (mostEmptyCellRow !== null) {
            return getLabels(nodeArr, ignoreArr, mostEmptyCellRow + 1);
        } else {
            return getLabels(nodeArr, ignoreArr);
        }
    }

    // If this is a negative number then, calulate the index from the
    // end of the table. e.g -1 would imply the last row.
    if (index < 0) {
        index += nodeArr.length;
    } else if (index > 0) {
        index -= 1;
    }

    /**
     * Once we have the index of the row/column that contains the labels we
     * go through only that row/column and extract the labels.
     */
    childArr = sanitizeNodesArray(nodeArr[index].childNodes);

    isRowLabel = nodeArr[0].nodeType !== undefined ? true : false;
    for (j = 0, len = childArr.length; j < len; j += 1) {
        spanLength = 0;
        if (isRowLabel) {
            if (childArr[j].colSpan !== '1') {
                spanLength = parseInt(childArr[j].colSpan, 10);
            }
        } else if (childArr[j].rowSpan !== '1') {
            spanLength = parseInt(childArr[j].rowSpan, 10);
        }
        spanLength = spanLength > 1 ? spanLength : 0;
        temp = getTextFromNode(childArr[j]);
        if (temp.replace(/^\s*/, '').replace(/\s*$/, '') !== '') {
            returnObj[j + totalSpanLength] = temp;
        } else if (checkData(getColumnArr(nodeArr), j, index)) {
            // if the label text is missing in one of the cells of the labels
            // row/column we check for the presence of numeric data in other
            // cells of the corresponding column/row.

            returnObj[j + totalSpanLength] = _blankString + _blankNo;
            _blankNo += 1;
        }

        if (spanLength > 1) {
            // If the spanLength > 1, then we create additional labels for
            // rows/columns pertaining to the rowspan or colspan.
            temp = returnObj[j + totalSpanLength];
            for (i = 1; i < spanLength; i += 1) {
                returnObj[j + totalSpanLength + i] = temp + ' (' + i + ')';
            }

            // totalSpanLength is used to adjust the indices of the
            // subsequent cells using the rowspan/colspan of the current
            // cell.
            totalSpanLength += spanLength - 1;
        }
    }

    // Deleting the rows/columns that the user wants to ignore.
    maxIdx = len + totalSpanLength;
    for (i = 0, len = ignoreArr.length; i < len; i += 1) {
        if (ignoreArr[i] > 0) {
            delete returnObj[ignoreArr[i] - 1];
        } else {
            delete returnObj[maxIdx + ignoreArr[i]];
        }
    }

    return { 'labelObj': returnObj, 'index': index };
},
    extractDataFromTable = function extractDataFromTable(tbl, opts) {

    if (typeof tbl === 'string') {
        tbl = doc.getElementById(tbl);
    }

    if (typeof win.jQuery !== 'undefined' && tbl instanceof win.jQuery) {
        // jshint ignore: line
        tbl = tbl.get(0);
    }

    if (!tbl) {
        return { data: null };
    }

    if (opts.hideTable) {
        tbl.style.display = 'none';
    }

    var i,
        j,
        rowCells,
        cellText,
        dataMap = {},
        mapColumnIdx,
        columnSpan,
        len,
        item,
        rowSpan,
        cellEle,
        columnSpanObj = {},
        rowSpanObj = {},
        tableRows = sanitizeNodesArray(getThead(tbl)).concat(sanitizeNodesArray(getTbody(tbl).childNodes)),
        l = tableRows.length,
        dataRows = 0,
        dataColumns = 0,
        tempColumn = 0,
        rowLabelMap,
        m,
        k = 0,
        columnLabelMap,
        isSingleSeries = false,
        chartType = opts.chartType,
        tempMap,
        singleSeriesCharts = ['column2d', 'column3d', 'pie3d', 'pie2d', 'line', 'bar2d', 'area2d', 'doughnut2d', 'doughnut3d', 'pareto2d', 'pareto3d'];

    if (singleSeriesCharts.indexOf(chartType) !== -1) {
        isSingleSeries = true;
    }

    // use rowLabelSource and colLabelSource to avoid confusion
    opts.rowLabelSource = parseInt(opts.labelSource, 10);
    opts.colLabelSource = parseInt(opts.legendSource, 10);
    // Create the labels objects for the chart.

    if (opts.major === 'column') {
        rowLabelMap = opts.useLabels ? getLabels(tableRows, opts.ignoreCols, opts.rowLabelSource) : getLabels(tableRows, opts.ignoreCols);

        columnLabelMap = opts.useLegend ? getLabels(getColumnArr(tableRows), opts.ignoreRows, opts.colLabelSource) : getLabels(getColumnArr(tableRows), opts.ignoreRows);
    } else {
        tempMap = getLabels(getColumnArr(tableRows), opts.ignoreRows, opts.rowLabelSource);
        if (!opts.useLabels) {
            rowLabelMap = getLabels(getColumnArr(tableRows), opts.ignoreRows);
        } else {
            rowLabelMap = tempMap;
        }

        opts._rowLabelIndex = tempMap.index;
        opts._extractByHeaderTag = true;

        columnLabelMap = opts.useLegend ? getLabels(tableRows, opts.ignoreCols, opts.colLabelSource, opts) : getLabels(tableRows, opts.ignoreCols);

        delete opts._extractByHeaderTag;

        tempMap = rowLabelMap;
        rowLabelMap = columnLabelMap;
        columnLabelMap = tempMap;
    }

    delete rowLabelMap.labelObj[columnLabelMap.index];
    delete columnLabelMap.labelObj[rowLabelMap.index];

    // Creating the 2d map depending on whether the rows are the primary
    // keys or the columns.
    if (opts.major === 'row') {
        for (item in columnLabelMap.labelObj) {
            dataMap[item] = {};
        }
    } else {
        for (item in rowLabelMap.labelObj) {
            dataMap[item] = {};
        }
    }

    // Populating the dataMap.
    for (i = 0; i < l; i += 1) {
        if (rowLabelMap.index === i || columnLabelMap.labelObj[i] === undefined) {
            continue;
        }

        dataRows += 1;
        rowCells = sanitizeNodesArray(tableRows[i].childNodes);

        // columnSpanObj maintains the number of colspans in the current
        // row.
        // rowSpanObj maintains the number of rowspans in a rows x columns
        // map.
        columnSpanObj[i] = 0;
        rowSpanObj[i] = {};

        for (j = 0, len = rowCells.length; j < len; j += 1) {

            cellEle = rowCells[j];

            columnSpan = parseInt(cellEle.getAttribute('colspan'), 10);
            rowSpan = parseInt(cellEle.getAttribute('rowspan'), 10);

            mapColumnIdx = j + columnSpanObj[i];

            // Calculating the position of the current cell in the dataMap.
            while (k < i) {
                if (rowSpanObj[k]) {
                    for (m in rowSpanObj[k]) {
                        if (m > mapColumnIdx) {
                            break;
                        }

                        if (i - k <= rowSpanObj[k][m].row) {
                            mapColumnIdx += rowSpanObj[k][m].col;
                        }
                    }
                }
                k += 1;
            }

            if (columnSpan > 1) {
                columnSpanObj[i] += columnSpan - 1;
            }

            if (rowSpan > 1) {
                if (columnSpan > 1) {
                    rowSpanObj[i][mapColumnIdx] = {
                        row: rowSpan - 1,
                        col: columnSpan
                    };
                } else {
                    rowSpanObj[i][mapColumnIdx] = {
                        row: rowSpan - 1,
                        col: 1
                    };
                }
            }
            if (columnLabelMap.index === mapColumnIdx || rowLabelMap.labelObj[mapColumnIdx] === undefined) {

                continue;
            }

            tempColumn += 1;
            cellText = getTextFromNode(cellEle);
            // If the cell does not have any text then we covert it by
            // default to 0 or to an parameterized option set by user.
            if (cellText.replace(/^\s*/, '').replace(/\s*$/, '') === '') {
                if (opts.convertBlankTo) {
                    cellText = opts.convertBlankTo;
                } else {
                    continue;
                }
            }

            // Filling up the dataMap based on the rowspan, colspan and
            // position(row=i, column=mapColumnIdx) information of the
            // table cell.
            columnSpan = columnSpan > 1 ? columnSpan : 1;
            rowSpan = rowSpan > 1 ? rowSpan : 1;

            if (opts.major === 'row') {
                k = 0;
                while (k < columnSpan) {
                    m = 0;
                    while (m < rowSpan) {
                        dataMap[i + m][mapColumnIdx + k] = parseFloat(cellText);
                        m += 1;
                    }
                    k += 1;
                }
            } else {
                k = 0;
                while (k < columnSpan) {
                    m = 0;
                    while (m < rowSpan) {
                        dataMap[mapColumnIdx + k][i + m] = parseFloat(cellText);
                        m += 1;
                    }
                    k += 1;
                }
            }
        }
        if (tempColumn > dataColumns) {
            dataColumns = tempColumn;
        }
    }

    return {
        data: dataMap,
        chartType: chartType ? !isSingleSeries ? 'multi' : 'single' : dataRows > 1 && dataColumns > 1 ? 'multi' : 'single',
        labelMap: columnLabelMap,
        legendMap: rowLabelMap
    };
},
    createChartFromTable = function createChartFromTable(data, obj) {

    // Default configuration for HTMLTable data-handler
    var opts = {
        chartAttributes: {},
        major: 'row',
        useLabels: true,
        useLegend: true,
        labelSource: 0,
        legendSource: 0,
        ignoreCols: [],
        ignoreRows: [],
        showLabels: true,
        showLegend: true,
        seriesColors: [],
        convertBlankTo: '0',
        hideTable: false,
        chartType: obj.chartType && obj.chartType(),

        // Private Variables
        labels: [],
        legend: [],
        data: []
    },
        config = obj.args.dataConfiguration || {},
        i,
        item1,
        item2,
        categoryArr,
        datasetArr,
        chartJSON = {},
        datasets = {},
        dataObj,
        dataMap,
        labelMap,
        legendMap;

    extend(opts, config);

    dataObj = extractDataFromTable(data, opts);
    dataMap = dataObj.data;

    if (opts.major !== 'row') {
        labelMap = dataObj.legendMap, legendMap = dataObj.labelMap;
    } else {
        labelMap = dataObj.labelMap, legendMap = dataObj.legendMap;
    }

    // chartAttributes should contain the configuration attributes for the chart
    // e.g caption, xAxisName, yAxisName etc.
    chartJSON.chart = extend({}, opts.chartAttributes);

    if (dataObj.chartType === 'multi') {
        chartJSON.categories = [{ 'category': [] }];
        chartJSON.dataset = [];

        categoryArr = chartJSON.categories[0].category;
        datasetArr = chartJSON.dataset;

        i = 0;
        for (item1 in dataMap) {

            if (opts.showLabels === true) {
                // If the user has provided custom labels then those should be
                // shown instead of the extracted labels.
                categoryArr.push(extend({
                    label: labelMap.labelObj[item1].indexOf(_blankString) != -1 ? '' : labelMap.labelObj[item1]
                }, opts.labels[i]));
            } else {
                categoryArr.push({ 'label': '' });
            }
            i += 1;
            for (item2 in dataMap[item1]) {
                if (typeof datasets[item2] === 'undefined') {
                    datasets[item2] = [];
                }
                datasets[item2].push({ 'value': dataMap[item1][item2] });
            }
        }

        i = 0;
        for (item1 in datasets) {
            if (opts.showLegend === true) {
                // If the user has provided custom labels then those should be
                // shown instead of the extracted labels.
                datasetArr.push(extend({
                    'seriesname': legendMap.labelObj[item1].indexOf(_blankString) !== -1 ? '' : legendMap.labelObj[item1],
                    'data': datasets[item1]
                }, opts.legend[i]));
            } else {
                datasetArr.push({
                    'seriesname': '',
                    'data': datasets[item1]
                });
            }
            i += 1;
        }
    } else if (dataObj.chartType === 'single') {
        chartJSON.data = [];
        datasetArr = chartJSON.data;

        i = 0;
        if (opts.showLabels) {
            for (item1 in dataMap) {
                for (item2 in dataMap[item1]) {
                    datasetArr.push(extend({
                        label: labelMap.labelObj[item1].indexOf(_blankString) !== -1 ? '' : labelMap.labelObj[item1],
                        value: dataMap[item1][item2]
                    }, opts.labels[i]));

                    i += 1;
                }
            }
        } else {
            for (item1 in dataMap) {
                for (item2 in dataMap[item1]) {
                    datasetArr.push({ 'value': dataMap[item1][item2] });
                }
            }
        }
    }

    return {
        data: chartJSON,
        error: undefined
    };
},
    htmlTableToJSON = function htmlTableToJSON(data, obj) {
    return createChartFromTable(data, obj);
};

/**
 * method to set the HTML table data
 * @param {Object} dom: HTML table dom
 */
function setHTMLTableData(dom) {
    this.setChartData(dom, 'htmltable');
}
/**
 * method to add functions in the fusioncharts prototype
 * @param {Function} FusionCharts is required
 * @return {Object} for extension
 */
function wrapper(FusionCharts) {
    FusionCharts && (FusionCharts.prototype.setHTMLTableData = setHTMLTableData);
    return {
        format: 'htmltable',
        toJSON: htmlTableToJSON
    };
}

exports['default'] = {
    extension: wrapper,
    name: 'HTMLTable',
    type: 'transcoder',
    requiresFusionCharts: true
};

/***/ })
/******/ ]);
//# sourceMappingURL=fusioncharts.jqueryplugin.js.map