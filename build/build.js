/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 199);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(19);
var hide = __webpack_require__(11);
var redefine = __webpack_require__(12);
var ctx = __webpack_require__(20);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(67)('wks');
var uid = __webpack_require__(41);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(111);
var toPrimitive = __webpack_require__(26);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(25);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(23);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(37);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var has = __webpack_require__(14);
var SRC = __webpack_require__(41)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(19).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(50);
var createDesc = __webpack_require__(37);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(26);
var has = __webpack_require__(14);
var IE8_DOM_DEFINE = __webpack_require__(111);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(14);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(88)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(49);
var defined = __webpack_require__(23);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(10);
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(20);
var IObject = __webpack_require__(49);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var asc = __webpack_require__(73);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(19);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(132);
var $export = __webpack_require__(0);
var shared = __webpack_require__(67)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(135))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(6)) {
  var LIBRARY = __webpack_require__(30);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(69);
  var $buffer = __webpack_require__(94);
  var ctx = __webpack_require__(20);
  var anInstance = __webpack_require__(32);
  var propertyDesc = __webpack_require__(37);
  var hide = __webpack_require__(11);
  var redefineAll = __webpack_require__(38);
  var toInteger = __webpack_require__(25);
  var toLength = __webpack_require__(8);
  var toIndex = __webpack_require__(130);
  var toAbsoluteIndex = __webpack_require__(40);
  var toPrimitive = __webpack_require__(26);
  var has = __webpack_require__(14);
  var classof = __webpack_require__(48);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(9);
  var isArrayIter = __webpack_require__(80);
  var create = __webpack_require__(34);
  var getPrototypeOf = __webpack_require__(16);
  var gOPN = __webpack_require__(35).f;
  var getIterFn = __webpack_require__(96);
  var uid = __webpack_require__(41);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(22);
  var createArrayIncludes = __webpack_require__(56);
  var speciesConstructor = __webpack_require__(68);
  var ArrayIterators = __webpack_require__(97);
  var Iterators = __webpack_require__(43);
  var $iterDetect = __webpack_require__(62);
  var setSpecies = __webpack_require__(39);
  var arrayFill = __webpack_require__(72);
  var arrayCopyWithin = __webpack_require__(103);
  var $DP = __webpack_require__(7);
  var $GOPD = __webpack_require__(15);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(11)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(41)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(14);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
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
/* 32 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var call = __webpack_require__(114);
var isArrayIter = __webpack_require__(80);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(8);
var getIterFn = __webpack_require__(96);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(120);
var enumBugKeys = __webpack_require__(76);
var IE_PROTO = __webpack_require__(88)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(75)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(78).appendChild(iframe);
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(122);
var hiddenKeys = __webpack_require__(76).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(122);
var enumBugKeys = __webpack_require__(76);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 37 */
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(12);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(14);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(92);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(18);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(18);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(402);
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
    + (useColors ? '%c ' : ' ');

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
/* 52 */
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This file hosts our error definitions
// We use custom error "types" so that we can act on them when we need it
// e.g.: if error instanceof errors.UnparsableJSON then..

var inherits = __webpack_require__(136);

function AlgoliaSearchError(message, extraProperties) {
  var forEach = __webpack_require__(47);

  var error = this;

  // try to get a stacktrace
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  } else {
    error.stack = (new Error()).stack || 'Cannot get a stacktrace, browser is too old';
  }

  this.name = 'AlgoliaSearchError';
  this.message = message || 'Unknown error';

  if (extraProperties) {
    forEach(extraProperties, function addToErrorObject(value, key) {
      error[key] = value;
    });
  }
}

inherits(AlgoliaSearchError, Error);

function createCustomError(name, message) {
  function AlgoliaSearchCustomError() {
    var args = Array.prototype.slice.call(arguments, 0);

    // custom message not set, use default
    if (typeof args[0] !== 'string') {
      args.unshift(message);
    }

    AlgoliaSearchError.apply(this, args);
    this.name = 'AlgoliaSearch' + name + 'Error';
  }

  inherits(AlgoliaSearchCustomError, AlgoliaSearchError);

  return AlgoliaSearchCustomError;
}

// late exports to let various fn defs and inherits take place
module.exports = {
  AlgoliaSearchError: AlgoliaSearchError,
  UnparsableJSON: createCustomError(
    'UnparsableJSON',
    'Could not parse the incoming response as JSON, see err.more for details'
  ),
  RequestTimeout: createCustomError(
    'RequestTimeout',
    'Request timedout before getting a response'
  ),
  Network: createCustomError(
    'Network',
    'Network issue, see err.more for details'
  ),
  JSONPScriptFail: createCustomError(
    'JSONPScriptFail',
    '<script> was loaded but did not call our provided callback'
  ),
  JSONPScriptError: createCustomError(
    'JSONPScriptError',
    '<script> unable to load due to an `error` event on it'
  ),
  Unknown: createCustomError(
    'Unknown',
    'Unknown error occured'
  )
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var foreach = __webpack_require__(47);

module.exports = function map(arr, fn) {
  var newArr = [];
  foreach(arr, function(item, itemIndex) {
    newArr.push(fn(item, itemIndex, arr));
  });
  return newArr;
};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

var BASE_URL = 'https://s3-us-west-2.amazonaws.com/supersaber';

function getS3FileUrl(id, name) {
  return `${BASE_URL}/${id}-${name}`;
}
module.exports.getS3FileUrl = getS3FileUrl;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(17);
var toLength = __webpack_require__(8);
var toAbsoluteIndex = __webpack_require__(40);
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var redefineAll = __webpack_require__(38);
var meta = __webpack_require__(31);
var forOf = __webpack_require__(33);
var anInstance = __webpack_require__(32);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(62);
var setToStringTag = __webpack_require__(44);
var inheritIfRequired = __webpack_require__(79);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(11);
var redefine = __webpack_require__(12);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var wks = __webpack_require__(5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(18);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(18);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(30) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 64 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var ctx = __webpack_require__(20);
var forOf = __webpack_require__(33);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(19);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(30) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var uid = __webpack_require__(41);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(40);
var toLength = __webpack_require__(8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(203);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(37);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(87).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(43);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(34);
var descriptor = __webpack_require__(37);
var setToStringTag = __webpack_require__(44);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(43);
var $iterCreate = __webpack_require__(81);
var setToStringTag = __webpack_require__(44);
var getPrototypeOf = __webpack_require__(16);
var ITERATOR = __webpack_require__(5)('iterator');
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
/* 83 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 84 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(93).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(18)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(20)(Function.call, __webpack_require__(15).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(67)('keys');
var uid = __webpack_require__(41);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var defined = __webpack_require__(23);
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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(61);
var defined = __webpack_require__(23);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(25);
var defined = __webpack_require__(23);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var invoke = __webpack_require__(112);
var html = __webpack_require__(78);
var cel = __webpack_require__(75);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(18)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(6);
var LIBRARY = __webpack_require__(30);
var $typed = __webpack_require__(69);
var hide = __webpack_require__(11);
var redefineAll = __webpack_require__(38);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(32);
var toInteger = __webpack_require__(25);
var toLength = __webpack_require__(8);
var toIndex = __webpack_require__(130);
var gOPN = __webpack_require__(35).f;
var dP = __webpack_require__(7).f;
var arrayFill = __webpack_require__(72);
var setToStringTag = __webpack_require__(44);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(19);
var LIBRARY = __webpack_require__(30);
var wksExt = __webpack_require__(131);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(48);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(43);
module.exports = __webpack_require__(19).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(29);
var step = __webpack_require__(115);
var Iterators = __webpack_require__(43);
var toIObject = __webpack_require__(17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(82)(Array, 'Array', function (iterated, kind) {
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
/* 98 */
/***/ (function(module, exports) {

/* global AFRAME */

/*
 * Provides a simple API for creating decorator functions which you can apply to your Component definitions.
 * These decorated functions are executed when their Component is instantiated, and have their 'this' attribute set
 * to the new Component.
 *
 * Decorators should only be used on functions that are owned by Component descriptors registered with
 * AFRAME.registerComponent. Decorating any other function will have no effect, as the decorator
 * functor will never be executed.
 */

/*
 * Decorates a function with a functor that is executed in the context of each instantiated Component which owns it.
 *
 * @param func - Function to decorate.
 * @param decoratorFunc - Functor which decorates func. It's definition should appear like this:
 *    function decoratorFunctor(funcPropertyName) {
 *      const func = this[funcPropertyName]; // 'this' is assigned to the instantiated Component.
 *      // Decorator should return a function
 *      return () => {
 *        console.log(this.el.id + " has a decorated function!");
 *        return func.apply(this, arguments);
 *      }
 *    }
 *
 * @returns A pending decorated functor which will be executed when a component that owns it is instantiated.
 */
function decorate(func, decoratorFunc) {
  return decorations.add(func, decoratorFunc);
}

// Helper for storing and retrieving decorator functors for a given function.
const decorations = (function() {
  const funcMap = new WeakMap();

  function add(func, decorator) {
    const parent = funcMap.has(func) ? func : undefined; // In case decorators are nested.
    const decoratedFunc = function() {
      func.apply(this, arguments);
    }
    funcMap.set(decoratedFunc, {parent: parent, decorator: decorator});
    return decoratedFunc;
  }

  function getAll(func) {
    var iter = funcMap.get(func);
    var decorators = [];
    while (iter !== undefined) {
      decorators.push(iter.decorator);
      iter = iter.parent;
    }
    return decorators;
  }

  function isFunctionDecorated(func) {
    return funcMap.has(func);
  }

  return {
    add: add,
    getAll: getAll,
    isFunctionDecorated: isFunctionDecorated
  }
})();

// Here I'm wrapping the AFRAME.registerComponent function and also each Component constructor. Whenever a new component
// is instantiated I'm scanning its list of properties for any functions which have been decorated. Each decoration
// functor will then be executed in the context of the component which owns the function.
(function() {
  Object.keys(AFRAME.components).forEach( function(c) {
    wrapComponent(c)
  });
  wrapRegister();

  function executeDecoratorsOnNewComponent(component) {
    const prot = Object.getPrototypeOf(component);
    Object.getOwnPropertyNames(prot).forEach( function(name) {
      const prop = prot[name];
      if (typeof prop === "function" && decorations.isFunctionDecorated(prop)) {
        decorations.getAll(prop).forEach(function(decorator) {
          component[name] = decorator.call(component, name, prop);
        });
      }
    });
  }

  function wrapComponent(name) {
    const orig = AFRAME.components[name].Component;

    AFRAME.components[name].Component = function() {
      // Override init on the instance to execute the decorator functors before initializing.
      this.init = function() {
        delete this.init;
        executeDecoratorsOnNewComponent(this);
        this.init.apply(this, arguments);
      }
      orig.apply(this, arguments);
    }
    AFRAME.components[name].Component.prototype = orig.prototype;
  }

  function wrapRegister() {
    const origRegister = AFRAME.registerComponent;
    AFRAME.registerComponent = function(name) {
      origRegister.apply(AFRAME, arguments);
      return wrapComponent(name);
    }
  }
})();

module.exports.decorate = decorate;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('aframe-event-decorators was loaded before AFRAME was available');
}

const eventBinder = __webpack_require__(154);
const decorate = __webpack_require__(98).decorate;

module.exports.bindEvent = eventBinder.bindEvent;
module.exports.bindEventPlayPause = eventBinder.bindEventPlayPause;
module.exports.decorate = decorate;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = buildSearchMethod;

var errors = __webpack_require__(53);

/**
 * Creates a search method to be used in clients
 * @param {string} queryParam the name of the attribute used for the query
 * @param {string} url the url
 * @return {function} the search method
 */
function buildSearchMethod(queryParam, url) {
  /**
   * The search method. Prepares the data and send the query to Algolia.
   * @param {string} query the string used for query search
   * @param {object} args additional parameters to send with the search
   * @param {function} [callback] the callback to be called with the client gets the answer
   * @return {undefined|Promise} If the callback is not provided then this methods returns a Promise
   */
  return function search(query, args, callback) {
    // warn V2 users on how to search
    if (typeof query === 'function' && typeof args === 'object' ||
      typeof callback === 'object') {
      // .search(query, params, cb)
      // .search(cb, params)
      throw new errors.AlgoliaSearchError('index.search usage is index.search(query, params, cb)');
    }

    // Normalizing the function signature
    if (arguments.length === 0 || typeof query === 'function') {
      // Usage : .search(), .search(cb)
      callback = query;
      query = '';
    } else if (arguments.length === 1 || typeof args === 'function') {
      // Usage : .search(query/args), .search(query, cb)
      callback = args;
      args = undefined;
    }
    // At this point we have 3 arguments with values

    // Usage : .search(args) // careful: typeof null === 'object'
    if (typeof query === 'object' && query !== null) {
      args = query;
      query = undefined;
    } else if (query === undefined || query === null) { // .search(undefined/null)
      query = '';
    }

    var params = '';

    if (query !== undefined) {
      params += queryParam + '=' + encodeURIComponent(query);
    }

    var additionalUA;
    if (args !== undefined) {
      if (args.additionalUA) {
        additionalUA = args.additionalUA;
        delete args.additionalUA;
      }
      // `_getSearchParams` will augment params, do not be fooled by the = versus += from previous if
      params = this.as._getSearchParams(args, params);
    }


    return this._search(params, url, callback, additionalUA);
  };
}


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function omit(obj, test) {
  var keys = __webpack_require__(405);
  var foreach = __webpack_require__(47);

  var filtered = {};

  foreach(keys(obj), function doFilter(keyName) {
    if (test(keyName) !== true) {
      filtered[keyName] = obj[keyName];
    }
  });

  return filtered;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(18);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(40);
var toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(33);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(49);
var toLength = __webpack_require__(8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(10);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(112);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(7).f;
var create = __webpack_require__(34);
var redefineAll = __webpack_require__(38);
var ctx = __webpack_require__(20);
var anInstance = __webpack_require__(32);
var forOf = __webpack_require__(33);
var $iterDefine = __webpack_require__(82);
var step = __webpack_require__(115);
var setSpecies = __webpack_require__(39);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(31).fastKey;
var validate = __webpack_require__(46);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(48);
var from = __webpack_require__(104);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(38);
var getWeak = __webpack_require__(31).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(32);
var forOf = __webpack_require__(33);
var createArrayMethod = __webpack_require__(22);
var $has = __webpack_require__(14);
var validate = __webpack_require__(46);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(60);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(8);
var ctx = __webpack_require__(20);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(75)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 112 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(84);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 117 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 118 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(36);
var gOPS = __webpack_require__(64);
var pIE = __webpack_require__(50);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(49);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(36);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(17);
var gOPN = __webpack_require__(35).f;
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
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(14);
var toIObject = __webpack_require__(17);
var arrayIndexOf = __webpack_require__(56)(false);
var IE_PROTO = __webpack_require__(88)('IE_PROTO');

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
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(36);
var toIObject = __webpack_require__(17);
var isEnum = __webpack_require__(50).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(35);
var gOPS = __webpack_require__(64);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(45).trim;

module.exports = 1 / $parseFloat(__webpack_require__(92) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(45).trim;
var ws = __webpack_require__(92);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(86);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8);
var repeat = __webpack_require__(91);
var defined = __webpack_require__(23);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(25);
var toLength = __webpack_require__(8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(107);
var validate = __webpack_require__(46);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(57)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(6) && /./g.flags != 'g') __webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(59)
});


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(107);
var validate = __webpack_require__(46);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(57)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(22)(0);
var redefine = __webpack_require__(12);
var meta = __webpack_require__(31);
var assign = __webpack_require__(119);
var weak = __webpack_require__(109);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(46);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(57)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 136 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 137 */
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
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

/* global AFRAME, THREE */

var anime = __webpack_require__(171);

AFRAME.anime = anime;

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

var colorHelperFrom = new THREE.Color();
var colorHelperTo = new THREE.Color();

var utils = AFRAME.utils;
var getComponentProperty = utils.entity.getComponentProperty;
var setComponentProperty = utils.entity.setComponentProperty;
var splitCache = {};

var TYPE_COLOR = 'color';
var PROP_POSITION = 'position';
var PROP_ROTATION = 'rotation';
var PROP_SCALE = 'scale';
var STRING_COMPONENTS = 'components';
var STRING_OBJECT3D = 'object3D';

/**
 * Animation component for A-Frame using anime.js.
 *
 * The component manually controls the tick by setting `autoplay: false` on anime.js and
 * manually * calling `animation.tick()` in the tick handler. To pause or resume, we toggle a
 * boolean * flag * `isAnimationPlaying`.
 *
 * anime.js animation config for tweenining Javascript objects and values works as:
 *
 *  config = {
 *    targets: {foo: 0.0, bar: '#000'},
 *    foo: 1.0,
 *    bar: '#FFF'
 *  }
 *
 * The above will tween each property in `targets`. The `to` values are set in the root of
 * the config.
 *
 * @member {object} animation - anime.js instance.
 * @member {boolean} animationIsPlaying - Control if animation is playing.
 */
AFRAME.registerComponent('animation', {
  schema: {
    autoplay: {default: true},
    delay: {default: 0},
    dir: {default: ''},
    dur: {default: 1000},
    easing: {default: 'easeInQuad'},
    elasticity: {default: 400},
    enabled: {default: true},
    from: {default: ''},
    loop: {
      default: 0,
      parse: function (value) {
        // Boolean or integer.
        if (value === true || value === 'true') { return true; }
        if (value === false || value === 'false') { return false; }
        return parseInt(value, 10);
      }
    },
    property: {default: ''},
    startEvents: {type: 'array'},
    pauseEvents: {type: 'array'},
    resumeEvents: {type: 'array'},
    to: {default: ''},
    type: {default: ''},
    isRawProperty: {default: false}
  },

  multiple: true,

  init: function () {
    var self = this;

    this.eventDetail = {name: this.attrName};
    this.time = 0;

    this.animation = null;
    this.animationIsPlaying = false;
    this.onStartEvent = this.onStartEvent.bind(this);
    this.beginAnimation = this.beginAnimation.bind(this);
    this.pauseAnimation = this.pauseAnimation.bind(this);
    this.resumeAnimation = this.resumeAnimation.bind(this);

    this.fromColor = {};
    this.toColor = {};
    this.targets = {};
    this.targetsArray = [];

    this.updateConfigForDefault = this.updateConfigForDefault.bind(this);
    this.updateConfigForRawColor = this.updateConfigForRawColor.bind(this);

    this.config = {
      complete: function () {
        self.animationIsPlaying = false;
        self.el.emit('animationcomplete', self.eventDetail);
      }
    };
  },

  update: function (oldData) {
    var config = this.config;
    var data = this.data;

    this.animationIsPlaying = false;

    if (oldData.enabled && !this.data.enabled) {
      this.animationIsPlaying = false;
      return;
    }

    if (!data.property) { return; }

    // Base config.
    config.autoplay = false;
    config.direction = data.dir;
    config.duration = data.dur;
    config.easing = data.easing;
    config.elasticity = data.elasticity;
    config.loop = data.loop;

    // Start new animation.
    this.createAndStartAnimation();
  },

  tick: function (t, dt) {
    if (!this.animationIsPlaying) { return; }
    this.time += dt;
    this.animation.tick(this.time);
  },

  remove: function () {
    this.pauseAnimation();
    this.removeEventListeners();
  },

  pause: function () {
    this.paused = true;
    this.pausedWasPlaying = this.animationIsPlaying;
    this.pauseAnimation();
    this.removeEventListeners();
  },

  /**
   * `play` handler only for resuming scene.
   */
  play: function () {
    if (!this.paused) { return; }
    this.paused = false;
    this.addEventListeners();
    if (this.pausedWasPlaying) {
      this.resumeAnimation();
      this.pausedWasPlaying = false;
    }
  },

  /**
   * Start animation from scratch.
   */
  createAndStartAnimation: function () {
    var data = this.data;

    this.updateConfig();
    this.animationIsPlaying = false;
    this.animation = anime(this.config);

    this.removeEventListeners();
    this.addEventListeners();

    // Wait for start events for animation.
    if (!data.autoplay || data.startEvents && data.startEvents.length) { return; }

    // Delay animation.
    if (data.delay) {
      setTimeout(this.beginAnimation, data.delay);
      return;
    }

    // Play animation.
    this.beginAnimation();
  },

  /**
   * This is before animation start (including from startEvents).
   * Set to initial state (config.from, time = 0, seekTime = 0).
   */
  beginAnimation: function () {
    this.updateConfig();
    this.time = 0;
    this.animationIsPlaying = true;
    this.stopRelatedAnimations();
    this.el.emit('animationbegin', this.eventDetail);
  },

  pauseAnimation: function () {
    this.animationIsPlaying = false;
  },

  resumeAnimation: function () {
    this.animationIsPlaying = true;
  },

  /**
   * startEvents callback.
   */
  onStartEvent: function () {
    if (!this.data.enabled) { return; }

    this.updateConfig();
    if (this.animation) {
      this.animation.pause();
    }
    this.animation = anime(this.config);

    // Include the delay before each start event.
    if (this.data.delay) {
      setTimeout(this.beginAnimation, this.data.delay);
      return;
    }
    this.beginAnimation();
  },

  /**
   * rawProperty: true and type: color;
   */
  updateConfigForRawColor: function () {
    var config = this.config;
    var data = this.data;
    var el = this.el;
    var from;
    var key;
    var to;

    if (this.waitComponentInitRawProperty(this.updateConfigForRawColor)) {
      return;
    }

    from = data.from || getRawProperty(el, data.property);
    to = data.to;

    // Use r/g/b vector for color type.
    this.setColorConfig(from, to);
    from = this.fromColor;
    to = this.toColor;

    this.targetsArray.length = 0;
    this.targetsArray.push(from);
    config.targets = this.targetsArray;
    for (key in to) { config[key] = to[key]; }

    config.update = (function () {
      var lastValue = {};
      lastValue.r = from.r;
      lastValue.g = from.g;
      lastValue.b = from.b;

      return function (anim) {
        var value;
        value = anim.animatables[0].target;
        // For animation timeline.
          if (value.r === lastValue.r &&
              value.g === lastValue.g &&
              value.b === lastValue.b) { return; }

        setRawProperty(el, data.property, value, data.type);
      };
    })();
  },

  /**
   * Stuff property into generic `property` key.
   */
  updateConfigForDefault: function () {
    var config = this.config;
    var data = this.data;
    var el = this.el;
    var from;
    var key;
    var isBoolean;
    var isNumber;
    var to;

    if (this.waitComponentInitRawProperty(this.updateConfigForDefault)) {
      return;
    }

    from = data.from || (
      isRawProperty(data)
        ? getRawProperty(el, data.property)
        : getComponentProperty(el, data.property)
    );
    to = data.to;

    isNumber = !isNaN(from || to);
    if (isNumber) {
      from = parseFloat(from);
      to = parseFloat(to);
    } else {
      from = from ? from.toString() : from;
      to = to ? to.toString() : to;
    }

    // Convert booleans to integer to allow boolean flipping.
    isBoolean = to === 'true' || to === 'false';
    if (isBoolean) {
      from = data.from === 'true' ? 1 : 0;
      to = data.to === 'true' ? 1 : 0;
    }

    this.targets.aframeProperty = from;
    config.targets = this.targets;
    config.aframeProperty = to;
    config.update = (function () {
      var lastValue = from;
      return function (anim) {
        var value;
        value = anim.animatables[0].target.aframeProperty;

        // Need to do a last value check for animation timeline since all the tweening
        // begins simultaenously even if the value has not changed. Also better for perf
        // anyways.
        if (value === lastValue) { return; }
        lastValue = value;

        if (isBoolean) {
          value = value >= 1 ? true : false;
        }

        if (isRawProperty(data)) {
          setRawProperty(el, data.property, value, data.type);
        } else {
          setComponentProperty(el, data.property, value);
        }
      };
    })();
  },

  /**
   * Extend x/y/z/w onto the config.
   * Update vector by modifying object3D.
   */
  updateConfigForVector: function () {
    var config = this.config;
    var data = this.data;
    var el = this.el;
    var key;
    var from;
    var to;

    // Parse coordinates.
    from = data.from
      ? AFRAME.utils.coordinates.parse(data.from)  // If data.from defined, use that.
      : getComponentProperty(el, data.property);  // If data.from not defined, get on the fly.
    to = AFRAME.utils.coordinates.parse(data.to);

    // Animate rotation through radians.
    if (data.property === PROP_ROTATION) {
      toRadians(from);
      toRadians(to);
    }

    // Set to and from.
    this.targetsArray.length = 0;
    this.targetsArray.push(from);
    config.targets = this.targetsArray;
    for (key in to) { config[key] = to[key]; }

    // If animating object3D transformation, run more optimized updater.
    if (data.property === PROP_POSITION || data.property === PROP_ROTATION ||
        data.property === PROP_SCALE) {
      config.update = (function () {
        var lastValue = {};
        lastValue.x = from.x;
        lastValue.y = from.y;
        lastValue.z = from.z;

        return function (anim) {
          var value = anim.animatables[0].target;
          // For animation timeline.
          if (value.x === lastValue.x &&
              value.y === lastValue.y &&
              value.z === lastValue.z) { return; }
          lastValue.x = value.x;
          lastValue.y = value.y;
          lastValue.z = value.z;
          el.object3D[data.property].set(value.x, value.y, value.z);
        };
      })();
      return;
    }

    // Animating some vector.
    config.update = (function () {
      var lastValue = {};
      lastValue.x = from.x;
      lastValue.y = from.y;
      lastValue.z = from.z;

      return function (anim) {
        var value = anim.animations[0].target;
        // For animation timeline.
        if (value.x === lastValue.x &&
            value.y === lastValue.y &&
            value.z === lastValue.z) { return; }
        lastValue.x = value.x;
        lastValue.y = value.y;
        lastValue.z = value.z;
        setComponentProperty(el, data.property, value);
      }
    })();
  },

  /**
   * Update the config before each run.
   */
  updateConfig: function () {
    var propType;

    // Route config type.
    propType = getPropertyType(this.el, this.data.property);
    if (isRawProperty(this.data) && this.data.type === TYPE_COLOR) {
      this.updateConfigForRawColor();
    } else if (propType === 'vec2' || propType === 'vec3' || propType === 'vec4') {
      this.updateConfigForVector();
    } else {
      this.updateConfigForDefault();
    }
  },

  /**
   * Wait for component to initialize.
   */
  waitComponentInitRawProperty: function (cb) {
    var componentName;
    var data = this.data;
    var el = this.el;
    var self = this;

    if (data.from) { return false; }

    if (!data.property.startsWith(STRING_COMPONENTS)) { return false; }

    componentName = splitDot(data.property)[1];
    if (el.components[componentName]) { return false; }

    el.addEventListener('componentinitialized', function wait (evt) {
      if (evt.detail.name !== componentName) { return; }
      cb();
      // Since the config was created async, create the animation now since we missed it
      // earlier.
      self.animation = anime(self.config);
      el.removeEventListener('componentinitialized', wait);
    });
    return true;
  },

  /**
   * Make sure two animations on the same property don't fight each other.
   * e.g., animation__mouseenter="property: material.opacity"
   *       animation__mouseleave="property: material.opacity"
   */
  stopRelatedAnimations: function () {
    var component;
    var componentName;
    for (componentName in this.el.components) {
      component = this.el.components[componentName];
      if (componentName === this.attrName) { continue; }
      if (component.name !== 'animation') { continue; }
      if (!component.animationIsPlaying) { continue; }
      if (component.data.property !== this.data.property) { continue; }
      component.animationIsPlaying = false;
    }
  },

  addEventListeners: function () {
    var data = this.data;
    var el = this.el;
    addEventListeners(el, data.startEvents, this.onStartEvent);
    addEventListeners(el, data.pauseEvents, this.pauseAnimation);
    addEventListeners(el, data.resumeEvents, this.resumeAnimation);
  },

  removeEventListeners: function () {
    var data = this.data;
    var el = this.el;
    removeEventListeners(el, data.startEvents, this.onStartEvent);
    removeEventListeners(el, data.pauseEvents, this.pauseAnimation);
    removeEventListeners(el, data.resumeEvents, this.resumeAnimation);
  },

  setColorConfig: function (from, to) {
    colorHelperFrom.set(from);
    colorHelperTo.set(to);
    from = this.fromColor;
    to = this.toColor;
    from.r = colorHelperFrom.r;
    from.g = colorHelperFrom.g;
    from.b = colorHelperFrom.b;
    to.r = colorHelperTo.r;
    to.g = colorHelperTo.g;
    to.b = colorHelperTo.b;
  }
});

/**
 * Given property name, check schema to see what type we are animating.
 * We just care whether the property is a vector.
 */
function getPropertyType (el, property) {
  var component;
  var componentName;
  var split;
  var propertyName;

  split = property.split('.');
  componentName = split[0];
  propertyName = split[1];
  component = el.components[componentName] || AFRAME.components[componentName];

  // Primitives.
  if (!component) { return null; }

  // Dynamic schema. We only care about vectors anyways.
  if (propertyName && !component.schema[propertyName]) { return null; }

  // Multi-prop.
  if (propertyName) { return component.schema[propertyName].type; }

  // Single-prop.
  return component.schema.type;
}

/**
 * Convert object to radians.
 */
function toRadians (obj) {
  obj.x = THREE.Math.degToRad(obj.x);
  obj.y = THREE.Math.degToRad(obj.y);
  obj.z = THREE.Math.degToRad(obj.z);
}

function addEventListeners (el, eventNames, handler) {
  var i;
  for (i = 0; i < eventNames.length; i++) {
    el.addEventListener(eventNames[i], handler);
  }
}

function removeEventListeners (el, eventNames, handler) {
  var i;
  for (i = 0; i < eventNames.length; i++) {
    el.removeEventListener(eventNames[i], handler);
  }
}

function getRawProperty (el, path) {
  var i;
  var split;
  var value;
  split = splitDot(path);
  value = el;
  for (i = 0; i < split.length; i++) {
    value = value[split[i]];
  }
  return value;
}

function setRawProperty (el, path, value, type) {
  var i;
  var split;
  var propertyName;
  var targetValue;

  // Walk.
  split = splitDot(path);
  targetValue = el;
  for (i = 0; i < split.length - 1; i++) { targetValue = targetValue[split[i]]; }
  propertyName = split[split.length - 1];

  // Raw color.
  if (type === TYPE_COLOR) {
    if ('r' in targetValue[propertyName]) {
      targetValue[propertyName].r = value.r;
      targetValue[propertyName].g = value.g;
      targetValue[propertyName].b = value.b;
    } else {
      targetValue[propertyName].x = value.r;
      targetValue[propertyName].y = value.g;
      targetValue[propertyName].z = value.b;
    }
    return;
  }

  targetValue[propertyName] = value;
}

function splitDot (path) {
  if (path in splitCache) { return splitCache[path]; }
  splitCache[path] = path.split('.');
  return splitCache[path];
}

function isRawProperty (data) {
  return data.isRawProperty || data.property.startsWith(STRING_COMPONENTS) ||
         data.property.startsWith(STRING_OBJECT3D);
}


/***/ }),
/* 139 */
/***/ (function(module, exports) {

/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Cubemap component for A-Frame.
 */
AFRAME.registerComponent('cubemap', {
  schema: {
    folder: {
      type: 'string'
    },
    edgeLength: {
      type: 'int',
      default: 5000
    },
    ext: {
      type: 'string',
      default: 'jpg'
    },
    transparent: {
      type: 'boolean',
      default: false
    }
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    // entity data
    var el = this.el;
    var data = this.data;

    // Path to the folder containing the 6 cubemap images
    var srcPath = data.folder;

    // Cubemap image files must follow this naming scheme
    // from: http://threejs.org/docs/index.html#Reference/Textures/CubeTexture
    var urls = [
      'posx', 'negx',
      'posy', 'negy',
      'posz', 'negz'
    ];
    // Apply extension
    urls = urls.map(function(val) {
      return val + "." + data.ext;
    });

    // Code that follows is adapted from "Skybox and environment map in Three.js" by Roman Liutikov
    // http://blog.romanliutikov.com/post/58705840698/skybox-and-environment-map-in-threejs

    var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib

    // Create shader material
    var skyBoxShader = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide,
      transparent: data.transparent
    });

    // Set skybox dimensions
    var edgeLength = data.edgeLength;
    var skyBoxGeometry = new THREE.CubeGeometry(edgeLength, edgeLength, edgeLength);

    // Create loader, set folder path, and load cubemap textures
    var loader = new THREE.CubeTextureLoader();
    loader.setPath(srcPath);
    loader.load(urls, function(texture) {
      // Clone ShaderMaterial (necessary for multiple cubemaps)
      var skyBoxMaterial = skyBoxShader.clone();
      skyBoxMaterial.uniforms['tCube'].value = texture; // Apply cubemap textures to shader uniforms

      // Set entity's object3D
      el.setObject3D('cubemap', new THREE.Mesh(skyBoxGeometry, skyBoxMaterial));
    });

  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () {
    this.el.removeObject3D('cubemap');
  }
});


/***/ }),
/* 140 */
/***/ (function(module, exports) {

/* global AFRAME */
var styleParser = AFRAME.utils.styleParser;

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('event-set', {
  schema: {
    default: '',
    parse: function (value) {
      return styleParser.parse(value);
    }
  },

  multiple: true,

  init: function () {
    this.eventHandler = null;
    this.eventName = null;
  },

  update: function (oldData) {
    this.removeEventListener();
    this.updateEventListener();
    this.addEventListener();
  },

  remove: function () {
    this.removeEventListener();
  },

  pause: function () {
    this.removeEventListener();
  },

  play: function () {
    this.addEventListener();
  },

  /**
   * Update source-of-truth event listener registry.
   * Does not actually attach event listeners yet.
   */
  updateEventListener: function () {
    var data = this.data;
    var el = this.el;
    var event;
    var target;
    var targetEl;

    // Set event listener using `_event`.
    event = data._event || this.id;
    target = data._target;

    // Decide the target to `setAttribute` on.
    targetEl = target ? el.sceneEl.querySelector(target) : el;

    this.eventName = event;
    this.eventHandler = function handler () {
      var propName;
      // Set attributes.
      for (propName in data) {
        if (propName === '_event' || propName === '_target') { continue; }
        AFRAME.utils.entity.setComponentProperty.call(this, targetEl, propName,
                                                      data[propName]);
      }
    };
  },

  addEventListener: function () {
    this.el.addEventListener(this.eventName, this.eventHandler);
  },

  removeEventListener: function () {
    this.el.removeEventListener(this.eventName, this.eventHandler);
  }
});


/***/ }),
/* 141 */
/***/ (function(module, exports) {

/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Haptics component for A-Frame.
 */
AFRAME.registerComponent('haptics', {
  dependencies: ['tracked-controls'],

  schema: {
    actuatorIndex: {default: 0},
    dur: {default: 100},
    enabled: {default: true},
    events: {type: 'array'},
    eventsFrom: {type: 'string'},
    force: {default: 1}
  },

  multiple: true,

  init: function () {
    var data = this.data;
    var i;
    var self = this;

    this.callPulse = function () { self.pulse(); };

    if (this.el.components['tracked-controls'].controller) {
      this.gamepad = this.el.components['tracked-controls'].controller;
      if (!this.gamepad || !this.gamepad.hapticActuators.length) { return; }
      this.addEventListeners();
    } else {
      this.el.addEventListener('controllerconnected', function init () {
        setTimeout(function () {
          self.gamepad = self.el.components['tracked-controls'].controller;
          if (!self.gamepad || !self.gamepad.hapticActuators.length) { return; }
          self.addEventListeners();
        }, 150);
      });
    }
  },

  remove: function () {
    this.removeEventListeners();
  },

  pulse: function (force, dur) {
    var actuator;
    var data = this.data;
    if (!data.enabled || !this.gamepad || !this.gamepad.hapticActuators) { return; }
    actuator = this.gamepad.hapticActuators[data.actuatorIndex];
    actuator.pulse(force || data.force, dur || data.dur);
  },

  addEventListeners: function () {
    var data = this.data;
    var i;
    var listenTarget;

    listenTarget = data.eventsFrom ? document.querySelector(data.eventsFrom) : this.el;
    for (i = 0; i < data.events.length; i++) {
      listenTarget.addEventListener(data.events[i], this.callPulse);
    }
  },

  removeEventListeners: function () {
    var data = this.data;
    var i;
    var listenTarget;

    listenTarget = data.eventsFrom ? document.querySelector(data.eventsFrom) : this.el;
    for (i = 0; i < data.events.length; i++) {
      listenTarget.removeEventListener(data.events[i], this.callPulse);
    }
  }
});


/***/ }),
/* 142 */
/***/ (function(module, exports) {

var positions = [];
var positionHelper = new THREE.Vector3();

/**
 * Layout component for A-Frame.
 * Some layouts adapted from http://www.vb-helper.com/tutorial_platonic_solids.html
 */
AFRAME.registerComponent('layout', {
  schema: {
    angle: {type: 'number', default: false, min: 0, max: 360, if: {type: ['circle']}},
    columns: {default: 1, min: 0, if: {type: ['box']}},
    margin: {default: 1, min: 0, if: {type: ['box', 'line']}},
    marginColumn: {default: 1, min: 0, if: {type: ['box']}},
    marginRow: {default: 1, min: 0, if: {type: ['box']}},
    orderAttribute: {default: ''},
    plane: {default: 'xy'},
    radius: {default: 1, min: 0, if: {type: ['circle', 'cube', 'dodecahedron', 'pyramid']}},
    reverse: {default: false},
    type: {default: 'line', oneOf: ['box', 'circle', 'cube', 'dodecahedron', 'line',
                                    'pyramid']},
    fill: {default: true, if: {type: ['circle']}},
    align: {default: 'end', oneOf: ['start', 'center', 'end']}
  },

  /**
   * Store initial positions in case need to reset on component removal.
   */
  init: function () {
    var self = this;
    var el = this.el;

    this.children = el.getChildEntities();
    this.initialPositions = [];

    this.children.forEach(function getInitialPositions (childEl) {
      if (childEl.hasLoaded) { return _getPositions(); }
      childEl.addEventListener('loaded', _getPositions);
      function _getPositions () {
        self.initialPositions.push(childEl.object3D.position.x);
        self.initialPositions.push(childEl.object3D.position.y);
        self.initialPositions.push(childEl.object3D.position.z);
      }
    });

    this.handleChildAttached = this.handleChildAttached.bind(this);
    this.handleChildDetached = this.handleChildDetached.bind(this);

    el.addEventListener('child-attached', this.handleChildAttached);
    el.addEventListener('child-detached', this.handleChildDetached);
  },

  /**
   * Update child entity positions.
   */
  update: function (oldData) {
    var children = this.children;
    var data = this.data;
    var definedData;
    var el = this.el;
    var numChildren;
    var positionFn;

    numChildren = children.length;

    // Calculate different positions based on layout shape.
    switch (data.type) {
      case 'box': {
        positionFn = getBoxPositions;
        break;
      }
      case 'circle': {
        positionFn = getCirclePositions;
        break;
      }
      case 'cube': {
        positionFn = getCubePositions;
        break;
      }
      case 'dodecahedron': {
        positionFn = getDodecahedronPositions;
        break;
      }
      case 'pyramid': {
        positionFn = getPyramidPositions;
        break;
      }
      default: {
        // Line.
        positionFn = getLinePositions;
      }
    }

    definedData = el.getDOMAttribute('layout');
    positions.length = 0;
    positions = positionFn(
      data, numChildren,
      typeof definedData === 'string'
        ? definedData.indexOf('margin') !== -1
        : 'margin' in definedData
    );
    if (data.reverse) { positions.reverse(); }
    setPositions(children, positions, data.orderAttribute);
  },

  /**
   * Reset positions.
   */
  remove: function () {
    this.el.removeEventListener('child-attached', this.handleChildAttached);
    this.el.removeEventListener('child-detached', this.handleChildDetached);
    setPositions(this.children, this.initialPositions);
  },

  handleChildAttached: function (evt) {
    // Only update if direct child attached.
    var el = this.el;
    if (evt.detail.el.parentNode !== el) { return; }
    this.children.push(evt.detail.el);
    this.update();
  },

  handleChildDetached: function (evt) {
    // Only update if direct child detached.
    if (this.children.indexOf(evt.detail.el) === -1) { return; }
    this.children.splice(this.children.indexOf(evt.detail.el), 1);
    this.initialPositions.splice(this.children.indexOf(evt.detail.el), 1);
    this.update();
  }
});

/**
 * Get positions for `box` layout.
 */
function getBoxPositions (data, numChildren, marginDefined) {
  var column;
  var marginColumn;
  var marginRow;
  var offsetColumn;
  var offsetRow;
  var row;
  var rows = Math.ceil(numChildren / data.columns);

  marginColumn = data.marginColumn;
  marginRow = data.marginRow;
  if (marginDefined) {
    marginColumn = data.margin;
    marginRow = data.margin;
  }

  offsetRow = getOffsetItemIndex(data.align, rows);
  offsetColumn = getOffsetItemIndex(data.align, data.columns);

  for (row = 0; row < rows; row++) {
    for (column = 0; column < data.columns; column++) {
      positionHelper.set(0, 0, 0);
      if (data.plane.indexOf('x') === 0) {
        positionHelper.x = (column - offsetColumn) * marginColumn;
      }
      if (data.plane.indexOf('y') === 0) {
        positionHelper.y = (column - offsetColumn) * marginColumn;
      }
      if (data.plane.indexOf('y') === 1) {
        positionHelper.y = (row - offsetRow) * marginRow;
      }
      if (data.plane.indexOf('z') === 1) {
        positionHelper.z = (row - offsetRow) * marginRow;
      }
      pushPositionVec3(positionHelper);
    }
  }

  return positions;
}
module.exports.getBoxPositions = getBoxPositions;

/**
 * Get positions for `circle` layout.
 */
function getCirclePositions (data, numChildren) {
  var i;
  var rad;

  for (i = 0; i < numChildren; i++) {
    rad;

    if (isNaN(data.angle)) {
      rad = i * (2 * Math.PI) / numChildren;
    } else {
      rad = i * data.angle * 0.01745329252;  // Angle to radian.
    }

    positionHelper.set(0, 0, 0);
    if (data.plane.indexOf('x') === 0) {
      positionHelper.x = data.radius * Math.cos(rad);
    }
    if (data.plane.indexOf('y') === 0) {
      positionHelper.y = data.radius * Math.cos(rad);
    }
    if (data.plane.indexOf('y') === 1) {
      positionHelper.y = data.radius * Math.sin(rad);
    }
    if (data.plane.indexOf('z') === 1) {
      positionHelper.z = data.radius * Math.sin(rad);
    }
    pushPositionVec3(positionHelper);
  }
  return positions;
}
module.exports.getCirclePositions = getCirclePositions;

/**
 * Get positions for `line` layout.
 * TODO: 3D margins.
 */
function getLinePositions (data, numChildren) {
  data.columns = numChildren;
  return getBoxPositions(data, numChildren, true);
}
module.exports.getLinePositions = getLinePositions;

/**
 * Get positions for `cube` layout.
 */
function getCubePositions (data, numChildren) {
  pushPositions(
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
    -1, 0, 0,
    0, -1, 0,
    0, 0, -1
  );
  scalePositions(data.radius / 2);
  return positions;
}
module.exports.getCubePositions = getCubePositions;

/**
 * Get positions for `dodecahedron` layout.
 */
function getDodecahedronPositions (data, numChildren) {
  var PHI = (1 + Math.sqrt(5)) / 2;
  var B = 1 / PHI;
  var C = 2 - PHI;
  var NB = -1 * B;
  var NC = -1 * C;
  pushPositions(
    -1, C, 0,
    -1, NC, 0,
    0, -1, C,
    0, -1, NC,
    0, 1, C,
    0, 1, NC,
    1, C, 0,
    1, NC, 0,
    B, B, B,
    B, B, NB,
    B, NB, B,
    B, NB, NB,
    C, 0, 1,
    C, 0, -1,
    NB, B, B,
    NB, B, NB,
    NB, NB, B,
    NB, NB, NB,
    NC, 0, 1,
    NC, 0, -1
  );
  scalePositions(data.radius / 2);
  return positions;
}
module.exports.getDodecahedronPositions = getDodecahedronPositions;

/**
 * Get positions for `pyramid` layout.
 */
function getPyramidPositions (data, numChildren) {
  var SQRT_3 = Math.sqrt(3);
  var NEG_SQRT_1_3 = -1 / Math.sqrt(3);
  var DBL_SQRT_2_3 = 2 * Math.sqrt(2 / 3);
  pushPositions(
    0, 0, SQRT_3 + NEG_SQRT_1_3,
    -1, 0, NEG_SQRT_1_3,
    1, 0, NEG_SQRT_1_3,
    0, DBL_SQRT_2_3, 0
  );
  scalePositions(data.radius / 2);
  return positions;
}
module.exports.getPyramidPositions = getPyramidPositions;

/**
 * Return the item index in a given list to calculate offsets from
 *
 * @param {string} align - One of `'start'`, `'center'`, `'end'`
 * @param {integer} numItems - Total number of items
 */
function getOffsetItemIndex (align, numItems) {
  switch (align) {
    case 'start':
      return numItems - 1;
    case 'center':
      return (numItems - 1) / 2;
    case 'end':
      return 0;
  }
}

/**
 * Multiply all coordinates by a scale factor and add translate.
 *
 * @params {array} positions - Array of coordinates in array form.
 * @returns {array} positions
 */
function scalePositions (scale) {
  var i;
  for (i = 0; i < positions.length; i++) {
    positions[i] = positions[i] * scale;
  }
};

/**
 * Set position on child entities.
 *
 * @param {array} els - Child entities to set.
 * @param {array} positions - Array of coordinates.
 */
function setPositions (els, positions, orderAttribute) {
  var i;
  var orderIndex;

  // Allow for controlling order explicitly since DOM order does not have as much
  // meaning in A-Frame.
  if (orderAttribute) {
    for (i = 0; i < els.length; i++) {
      orderIndex = parseInt(els[i].getAttribute(orderAttribute), 10) * 3;
      els[i].object3D.position.set(positions[orderIndex], positions[orderIndex + 1],
                                   positions[orderIndex + 2]);
    }
    return;
  }

  for (i = 0; i < positions.length; i += 3) {
    if (!els[i / 3]) { return; }
    els[i / 3].object3D.position.set(positions[i], positions[i + 1], positions[i + 2]);
  }
}

function pushPositions () {
  var i;
  for (i = 0; i < arguments.length; i++) {
    positions.push(i);
  }
}

function pushPositionVec3 (vec3) {
  positions.push(vec3.x);
  positions.push(vec3.y);
  positions.push(vec3.z);
}


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(155);

AFRAME.registerComponent('orbit-controls', {
  dependencies: ['camera'],

  schema: {
    autoRotate: {type: 'boolean'},
    autoRotateSpeed: {default: 2},
    dampingFactor: {default: 0.1},
    enabled: {default: true},
    enableDamping: {default: true},
    enableKeys: {default: true},
    enablePan: {default: true},
    enableRotate: {default: true},
    enableZoom: {default: true},
    initialPosition: {type: 'vec3'},
    keyPanSpeed: {default: 7},
    minAzimuthAngle: {type: 'number', default: Infinity},
    maxAzimuthAngle: {type: 'number', default: Infinity},
    maxDistance: {default: 1000},
    maxPolarAngle: {default: AFRAME.utils.device.isMobile() ? 90 : 120},
    minDistance: {default: 1},
    minPolarAngle: {default: 0},
    minZoom: {default: 0},
    panSpeed: {default: 1},
    rotateSpeed: {default: 0.05},
    screenSpacePanning: {default: false},
    target: {type: 'vec3'},
    zoomSpeed: {default: 0.5}
  },

  init: function () {
    var el = this.el;
    var oldPosition;

    this.controls = new THREE.OrbitControls(el.getObject3D('camera'),
                                            el.sceneEl.renderer.domElement);

    oldPosition = new THREE.Vector3();

    el.sceneEl.addEventListener('enter-vr', () => {
      if (!AFRAME.utils.device.checkHeadsetConnected() &&
          !AFRAME.utils.device.isMobile()) { return; }
      this.controls.enabled = false;
      if (el.hasAttribute('look-controls')) {
        el.setAttribute('look-controls', 'enabled', true);
        oldPosition.copy(el.getObject3D('camera').position);
        el.getObject3D('camera').position.set(0, 0, 0);
      }
    });

    el.sceneEl.addEventListener('exit-vr', () => {
      if (!AFRAME.utils.device.checkHeadsetConnected() &&
          !AFRAME.utils.device.isMobile()) { return; }
      this.controls.enabled = true;
      el.getObject3D('camera').position.copy(oldPosition);
      if (el.hasAttribute('look-controls')) {
        el.setAttribute('look-controls', 'enabled', false);
      }
    });

    document.body.style.cursor = 'grab';
    document.addEventListener('mousedown', () => {
      document.body.style.cursor = 'grabbing';
    });
    document.addEventListener('mouseup', () => {
      document.body.style.cursor = 'grab';
    });

    this.target = new THREE.Vector3();
    el.getObject3D('camera').position.copy(this.data.initialPosition);
  },

  update: function (oldData) {
    var controls = this.controls;
    var data = this.data;

    controls.target = this.target.copy(data.target);
    controls.autoRotate = data.autoRotate;
    controls.autoRotateSpeed = data.autoRotateSpeed;
    controls.dampingFactor = data.dampingFactor;
    controls.enabled = data.enabled;
    controls.enableDamping = data.enableDamping;
    controls.enableKeys = data.enableKeys;
    controls.enablePan = data.enablePan;
    controls.enableRotate = data.enableRotate;
    controls.enableZoom = data.enableZoom;
    controls.keyPanSpeed = data.keyPanSpeed;
    controls.maxPolarAngle = THREE.Math.degToRad(data.maxPolarAngle);
    controls.maxDistance = data.maxDistance;
    controls.minDistance = data.minDistance;
    controls.minPolarAngle = THREE.Math.degToRad(data.minPolarAngle);
    controls.minZoom = data.minZoom;
    controls.panSpeed = data.panSpeed;
    controls.rotateSpeed = data.rotateSpeed;
    controls.screenSpacePanning = data.screenSpacePanning;
    controls.zoomSpeed = data.zoomSpeed;
  },

  tick: function () {
    var controls = this.controls;
    var data = this.data;
    if (!data.enabled) { return; }
    if (controls.enabled && (controls.enableDamping || controls.autoRotate)) {
      this.controls.update();
    }
  }
});


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Particles component for A-Frame.
 *
 * ShaderParticleEngine by Squarefeet (https://github.com/squarefeet).
 */

var SPE = __webpack_require__(156);

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('particle-system', {

    schema: {
        preset: {
            type: 'string',
            default: '',
            oneOf: ['default', 'dust', 'snow', 'rain']
        },
        maxAge: {
            type: 'number'
        },
        positionSpread: {
            type: 'vec3'
        },
        type: {
            type: 'number'
        },
        rotationAxis: {
            type: 'string'
        },
        rotationAngle: {
            type: 'number'
        },
        accelerationValue: {
            type: 'vec3'
        },
        accelerationSpread: {
            type: 'vec3'
        },
        velocityValue: {
            type: 'vec3'
        },
        velocitySpread: {
            type: 'vec3'
        },
        color: {
            type: 'array'
        },
        size: {
            type: 'number'
        },
        direction: {
            type: 'number'
        },
        duration: {
            type: 'number'
        },
        particleCount: {
            type: 'number'
        },
        texture: {
            type: 'asset'
        },
        randomize: {
            type: 'boolean'
        },
        opacity: {
          type: 'number',
        },
        maxParticleCount: {
            type: 'number',
            default: 250000
        },
        blending: {
            type: 'number',
            default: THREE.AdditiveBlending,
            oneOf: [THREE.NoBlending,THREE.NormalBlending,THREE.AdditiveBlending,THREE.SubtractiveBlending,THREE.MultiplyBlending]
        },
        enabled: {
            type:'boolean',
            default:true
        }
    },


    init: function() {

        this.presets = [];

        /* preset settings can be overwritten */

        this.presets['default'] = {
            maxAge: (this.data.maxAge!==0?this.data.maxAge:6),
            positionSpread: (this.data.positionSpread.x!==0||this.data.positionSpread.y!==0||this.data.positionSpread.z!==0?this.data.positionSpread:{x:0,y:0,z:0}),
            type: (this.data.type!==0?this.data.type:SPE.distributions.BOX), /* SPE.distributions.SPHERE, SPE.distributions.DISC */
            rotationAxis: (this.data.rotationAxis!==''?this.data.rotationAxis:'x'),
            rotationAngle: (this.data.rotationAngle!==0?this.data.rotationAngle:0),
            accelerationValue: (this.data.accelerationValue.x!==0||this.data.accelerationValue.y!==0||this.data.accelerationValue.z!==0?this.data.accelerationValue:{x: 0, y: -10, z: 0}),
            accelerationSpread: (this.data.accelerationSpread.x!==0||this.data.accelerationSpread.y!==0||this.data.accelerationSpread.z!==0?this.data.accelerationSpread:{x: 10, y: 0, z: 10}),
            velocityValue: (this.data.velocityValue.x!==0||this.data.velocityValue.y!==0||this.data.velocityValue.z!==0?this.data.velocityValue:{x: 0, y: 25, z: 0}),
            velocitySpread: (this.data.velocitySpread.x!==0||this.data.velocitySpread.y!==0||this.data.velocitySpread.z!==0?this.data.velocitySpread:{x: 10, y: 7.5, z: 10}),
            color: (this.data.color.length?this.data.color:['#0000FF','#FF0000']),
            size: (this.data.size!==0?this.data.size:1),
            opacity: { value: (this.data.opacity!=0?this.data.opacity:1) },
            direction: (this.data.direction!==0?this.data.direction:1),
            duration: (this.data.duration!=0?this.data.duration:null),
            particleCount: (this.data.particleCount!==0?this.data.particleCount:1000),
            texture: (this.data.texture!==''?this.data.texture:'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/star2.png'),
            randomize: false
        };


        this.presets['dust'] = {
            maxAge: (this.data.maxAge!==0?this.data.maxAge:20),
            positionSpread: (this.data.positionSpread.x!==0||this.data.positionSpread.y!==0||this.data.positionSpread.z!==0?this.data.positionSpread:{x:100,y:100,z:100}),
            type: (this.data.type!==0?this.data.type:SPE.distributions.BOX), /* SPE.distributions.SPHERE, SPE.distributions.DISC */
            rotationAxis: (this.data.rotationAxis!==''?this.data.rotationAxis:'x'),
            rotationAngle: (this.data.rotationAngle!==0?this.data.rotationAngle:3.14),
            accelerationValue: (this.data.accelerationValue.x!==0||this.data.accelerationValue.y!==0||this.data.accelerationValue.z!==0?this.data.accelerationValue:{x: 0, y: 0, z: 0}),
            accelerationSpread: (this.data.accelerationSpread.x!==0||this.data.accelerationSpread.y!==0||this.data.accelerationSpread.z!==0?this.data.accelerationSpread:{x: 0, y: 0, z: 0}),
            velocityValue: (this.data.velocityValue.x!==0||this.data.velocityValue.y!==0||this.data.velocityValue.z!==0?this.data.velocityValue:{x: 1, y: 0.3, z: 1}),
            velocitySpread: (this.data.velocitySpread.x!==0||this.data.velocitySpread.y!==0||this.data.velocitySpread.z!==0?this.data.velocitySpread:{x: 0.5, y: 1, z: 0.5}),
            color: (this.data.color.length?this.data.color:['#FFFFFF']),
            size: (this.data.size!==0?this.data.size:1),
            opacity: { value: (this.data.opacity!=0?this.data.opacity:1) },
            direction: (this.data.direction!==0?this.data.direction:1),
            duration: (this.data.duration!=0?this.data.duration:null),
            particleCount: (this.data.particleCount!==0?this.data.particleCount:100),
            texture: (this.data.texture!==''?this.data.texture:'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/smokeparticle.png'),
            randomize: false
        };


        this.presets['snow'] = {
            maxAge: (this.data.maxAge!==0?this.data.maxAge:20),
            positionSpread: (this.data.positionSpread.x!==0||this.data.positionSpread.y!==0||this.data.positionSpread.z!==0?this.data.positionSpread:{x:100,y:100,z:100}),
            type: (this.data.type!==0?this.data.type:SPE.distributions.BOX), /* SPE.distributions.SPHERE, SPE.distributions.DISC */
            rotationAxis: (this.data.rotationAxis!==''?this.data.rotationAxis:'x'),
            rotationAngle: (this.data.rotationAngle!==0?this.data.rotationAngle:3.14),
            accelerationValue: (this.data.accelerationValue.x!==0||this.data.accelerationValue.y!==0||this.data.accelerationValue.z!==0?this.data.accelerationValue:{x: 0, y: 0, z: 0}),
            accelerationSpread: (this.data.accelerationSpread.x!==0||this.data.accelerationSpread.y!==0||this.data.accelerationSpread.z!==0?this.data.accelerationSpread:{x: 0.2, y: 0, z: 0.2}),
            velocityValue: (this.data.velocityValue.x!==0||this.data.velocityValue.y!==0||this.data.velocityValue.z!==0?this.data.velocityValue:{x: 0, y: 8, z: 0}),
            velocitySpread: (this.data.velocitySpread.x!==0||this.data.velocitySpread.y!==0||this.data.velocitySpread.z!==0?this.data.velocitySpread:{x: 2, y: 0, z: 2}),
            color: (this.data.color.length?this.data.color:['#FFFFFF']),
            size: (this.data.size!==0?this.data.size:1),
            opacity: { value: (this.data.opacity!=0?this.data.opacity:1) },
            direction: (this.data.direction!==0?this.data.direction:1),
            duration: (this.data.duration!=0?this.data.duration:null),
            particleCount: (this.data.particleCount!==0?this.data.particleCount:200),
            texture: (this.data.texture!==''?this.data.texture:'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/smokeparticle.png'),
            randomize: false
        };


        this.presets['rain'] = {
            maxAge: (this.data.maxAge!==0?this.data.maxAge:1),
            positionSpread: (this.data.positionSpread.x!==0||this.data.positionSpread.y!==0||this.data.positionSpread.z!==0?this.data.positionSpread:{x:100,y:100,z:100}),
            type: (this.data.type!==0?this.data.type:SPE.distributions.BOX), /* SPE.distributions.SPHERE, SPE.distributions.DISC */
            rotationAxis: (this.data.rotationAxis!==''?this.data.rotationAxis:'x'),
            rotationAngle: (this.data.rotationAngle!==0?this.data.rotationAngle:3.14),
            accelerationValue: (this.data.accelerationValue.x!==0||this.data.accelerationValue.y!==0||this.data.accelerationValue.z!==0?this.data.accelerationValue:{x: 0, y: 3, z: 0}),
            accelerationSpread: (this.data.accelerationSpread.x!==0||this.data.accelerationSpread.y!==0||this.data.accelerationSpread.z!==0?this.data.accelerationSpread:{x: 2, y: 1, z: 2}),
            velocityValue: (this.data.velocityValue.x!==0||this.data.velocityValue.y!==0||this.data.velocityValue.z!==0?this.data.velocityValue:{x: 0, y: 75, z: 0}),
            velocitySpread: (this.data.velocitySpread.x!==0||this.data.velocitySpread.y!==0||this.data.velocitySpread.z!==0?this.data.velocitySpread:{x: 10, y: 50, z: 10}),
            color: (this.data.color.length?this.data.color:['#FFFFFF']),
            size: (this.data.size!==0?this.data.size:0.4),
            opacity: { value: (this.data.opacity!=0?this.data.opacity:1) },
            direction: (this.data.direction!==0?this.data.direction:1),
            duration: (this.data.duration!=0?this.data.duration:null),
            particleCount: (this.data.particleCount!==0?this.data.particleCount:1000),
            texture: (this.data.texture!==''?this.data.texture:'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/raindrop.png'),
            randomize: false
        };


    },


    update: function (oldData) {

        // Remove old particle group.
        if (this.particleGroup) {
            this.el.removeObject3D('particle-system');
        }

        if (this.data.preset != '' && this.data.preset in this.presets) {

            this.initParticleSystem(this.presets[this.data.preset]);

        } else {

            this.initParticleSystem(this.presets['default']);
        }

        if(this.data.enabled === true) {
            this.startParticles()
        } else {
            this.stopParticles()
        }
    },


    tick: function(time, dt) {

        this.particleGroup.tick(dt / 1000);
    },


    remove: function() {

        // Remove particle system.
        if (!this.particleGroup) { return; }
        this.el.removeObject3D('particle-system');
    },

    startParticles: function() {
        this.particleGroup.emitters.forEach(function(em) { em.enable() });
    },

    stopParticles: function() {
        this.particleGroup.emitters.forEach(function(em) { em.disable() });
    },


    initParticleSystem: function(settings) {

        var loader = new THREE.TextureLoader();
        var particle_texture = loader.load(
            settings.texture,
            function (texture) {
                return texture;
            },
            function (xhr) {
              console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (xhr) {
              console.log('An error occurred');
            }
        );

        this.particleGroup = new SPE.Group({
            texture: {
                value: particle_texture
            },
            maxParticleCount: this.data.maxParticleCount,
            blending: this.data.blending
        });

        var emitter = new SPE.Emitter({
            maxAge: {
                value: settings.maxAge
            },
            type: {
                value: settings.type
            },
            position: {
                spread: new THREE.Vector3(settings.positionSpread.x, settings.positionSpread.y, settings.positionSpread.z),
                randomize: settings.randomize
                //spreadClamp: new THREE.Vector3( 2, 2, 2 ),
                //radius: 4
            },
            rotation: {
                axis: (settings.rotationAxis=='x'?new THREE.Vector3(1, 0, 0):(settings.rotationAxis=='y'?new THREE.Vector3(0, 1, 0):(settings.rotationAxis=='z'?new THREE.Vector3(0, 0, 1):new THREE.Vector3(0, 1, 0)))),
                angle: settings.rotationAngle,
                static: true
            },
            acceleration: {
                value: new THREE.Vector3(settings.accelerationValue.x, settings.accelerationValue.y, settings.accelerationValue.z),
                spread: new THREE.Vector3(settings.accelerationSpread.x, settings.accelerationSpread.y, settings.accelerationSpread.z)
            },
            velocity: {
                value: new THREE.Vector3(settings.velocityValue.x, settings.velocityValue.y, settings.velocityValue.z),
                spread: new THREE.Vector3(settings.velocitySpread.x, settings.velocitySpread.y, settings.velocitySpread.z)
            },
            color: {
                value: settings.color.map(function(c) { return new THREE.Color(c); })
            },
            size: {
                value: settings.size
            },
            /*wiggle: { value: 4, spread: 2 }, //settings.wiggle,*/
            /*drag: {
                value: settings.drag
            },*/
            direction: {
                value: settings.direction
            },
            duration: settings.duration,
            opacity: settings.opacity,
            particleCount: settings.particleCount
        });

        this.particleGroup.addEmitter(emitter);
        this.particleGroup.mesh.frustumCulled = false;
        this.el.setObject3D('particle-system', this.particleGroup.mesh);
    }
});


/***/ }),
/* 145 */
/***/ (function(module, exports) {

/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Particle Player component for A-Frame.
 */
AFRAME.registerComponent('particleplayer', {
 multiple: true,
  schema: {
    src: {type: 'selector'},
    on: {default: 'init'},
    count: {default: '100%'},
    dur: {default: 1000, type: 'int'},
    loop: {default: 'false'},
    delay: {default: 0, type: 'int'},
    scale: {default: 1.0, type: 'float'},
    pscale: {default: 1.0, type: 'float'},
    protation: {type: 'vec3'},
    cache: {default: 5, type: 'int'}, // number of simultaneous particle systems
    shader: {default: 'flat', oneOf: ['flat', 'lambert', 'phong', 'standard']},
    color: {default: '#fff', type: 'color'},
    blending: {default: 'additive', oneOf: ['normal', 'additive', 'multiply', 'substractive']},
    img: {type: 'selector'},
    interpolate: {default: false}
  },

  init: function () {
    this.framedata = null;
    this.restPositions = null; // position at first frame each particle is alive
    this.restRotations = null; 
    this.numFrames = 0;
    this.numParticles = 0; // total number of particles per system
    this.count = 0; // actual number of particles to spawn per event (data.count)
    this.systems = null;
    this.cache = null;
    this.material = null;
    this.geometry = null;
    this.frame = 0;
    this.lastFrame = 0;
    this.msPerFrame = 0;
    this.useRotation = false;
    this.sprite_rotation = false;
    this.protation = false;
    this.allParticlesEl = null;

    // temporal vars for preventing gc
    this.v = new THREE.Vector3();
    this.indexPool = null;
  },

  update: function(oldData) {
    var params;
    const BLENDINGS = {
      'normal': THREE.NormalBlending,
      'additive': THREE.AdditiveBlending,
      'substractive': THREE.SubstractiveBlending,
      'multiply': THREE.MultiplyBlending
    };
    const SHADERS = {
      'flat': THREE.MeshBasicMaterial,
      'lambert': THREE.MeshLambertMaterial,
      'phong': THREE.MeshPhongMaterial,
      'standard': THREE.MeshStandardMaterial
    }
    var data = this.data;

    if (oldData.on !== data.on) {
      if (oldData.on) { this.el.removeEventListener(oldData.on, this.start)}
      if (data.on !== 'play') {
        this.el.addEventListener(data.on, this.start.bind(this));
      }
    }

    this.loadParticlesJSON(data.src, data.scale);

    this.numFrames = this.framedata.length;
    this.numParticles = this.numFrames > 0 ? this.framedata[0].length : 0;

    if (data.count[data.count.length-1] == '%') {
      this.count = Math.floor(parseInt(data.count) * this.numParticles / 100.0);
    } else { 
      this.count = parseInt(data.count); 
    }
    this.count = Math.min(this.numParticles, Math.max(0, this.count));

    this.msPerFrame = data.dur / this.numFrames;
 
    this.indexPool = new Array(this.numParticles);


    params = {
      color: new THREE.Color(data.color),
      side: THREE.DoubleSide,
      blending: BLENDINGS[data.blending],
      map: data.img ? new THREE.TextureLoader().load(data.img.src) : null,
      depthWrite: false,
      opacity: data.opacity,
      transparent: data.img || data.blending !== 'normal' || data.opacity < 1 ? true : false
    };

    if (SHADERS[data.shader] !== undefined) {
      this.material = new SHADERS[data.shader](params);
    } else {
      this.material = new SHADERS['flat'](params);
    }
    
    var ratio = data.img ? data.img.width / data.img.height : 1;
    this.geometry = new THREE.PlaneBufferGeometry(0.1 * ratio * data.pscale, 0.1 * data.pscale);

    if (!this.allParticlesEl) {
      this.allParticlesEl = document.createElement('a-entity');
      this.allParticlesEl.id = "__json-particles-" + Math.floor(Math.random()*1000);
      this.el.appendChild(this.allParticlesEl);
    }

    if (this.sprite_rotation !== false){
      this.geometry.rotateX(this.sprite_rotation.x);
      this.geometry.rotateY(this.sprite_rotation.y);
      this.geometry.rotateZ(this.sprite_rotation.z);
    }
    else {
      this.geometry.rotateX(this.data.protation.x * Math.PI / 180);
      this.geometry.rotateY(this.data.protation.y * Math.PI / 180);
      this.geometry.rotateZ(this.data.protation.z * Math.PI / 180);
    }

    this.cacheParticles(data.cache);

    if (data.on === 'init') {
      this.start();
    }
  },

  loadParticlesJSON: function (json, scale) {
    var data = JSON.parse(json.data);
    var p; // particle
    var alive;
    var frames = data.frames;
    var velOffset = data.rotation ? 3 : 0;
    var F = data.precision;
    this.restPositions = [];
    this.restRotations = []; 

    this.useRotation = data.rotation;

    if (data.sprite_rotation !== false) {
      this.sprite_rotation = new THREE.Vector3();
      this.sprite_rotation.x = data.sprite_rotation[0] / F;
      this.sprite_rotation.y = data.sprite_rotation[1] / F;
      this.sprite_rotation.z = data.sprite_rotation[2] / F;
    }
    else { this.sprite_rotation = false; }

    this.framedata = new Array(frames.length);
    for (var f = 0; f < frames.length; f++) {
      this.framedata[f] = new Array(frames[f].length);
      for (var i = 0; i < frames[f].length; i++) {
        p = frames[f][i]; // data of particle i in frame f
        alive = p !== 0;

        this.framedata[f][i] = {
          position: alive ? 
            new THREE.Vector3(p[0] / F * scale, p[1] / F * scale, p[2] / F * scale) :
            null,
          alive: alive
        };

        if (data.rotation) {
          this.framedata[f][i].rotation = alive ? 
            new THREE.Euler(p[3] / F, p[4] / F, p[5] / F) :
            null;
        }

        if (alive && this.restPositions[i] === undefined) {
          this.restPositions[i] = this.framedata[f][i].position;
          if (data.rotation) {
            this.restRotations[i] = this.framedata[f][i].rotation;
          }
        }
      }
    }
  },

  cacheParticles: function (numParticleSystems) {
    var i;
    var p;
    var allParticles;
    var loop = parseInt(this.data.loop);
    
    //remove old particles
    allParticles = this.allParticlesEl.object3D;
    while (allParticles.children.length) {
      allParticles.remove(allParticles.children[0]);
    }

    this.cache = [];

    if (isNaN(loop)) { 
      loop = this.data.loop === 'true' ? Number.MAX_VALUE : 0; 
    }

    for (i = 0; i < numParticleSystems; i++) {
      var ps = {
        active: false,
        loopTotal: loop,
        loopCount: 0,
        time: 0,
        activeParticles: new Array(this.count),
        object3D: new THREE.Object3D()
      };

      ps.object3D.visible = false;

      for (p = 0; p < this.numParticles; p++) {
        var part = new THREE.Mesh(this.geometry, this.material);
        part.visible = false;
        ps.object3D.add(part);
        if (p < this.count) {
          ps.activeParticles[p] = p;
        }
      }

      allParticles.add(ps.object3D);
      this.cache.push(ps);
    }
  },

  start: function (evt) {
    if (this.data.delay > 0) {
      setTimeout( () => this.startAfterDelay(evt), this.data.delay);
    } else {
      this.startAfterDelay(evt);
    }
  },

  startAfterDelay: function (evt) { 
    // position, rotation
    var found = -1;
    var ps;
    var id;
    var oldestTime = 0;
    var position = evt ? evt.detail['position'] : null;
    var rotation = evt ? evt.detail['rotation'] : null;

    if (!(position instanceof THREE.Vector3)) { position = new THREE.Vector3(); }
    if (!(rotation instanceof THREE.Euler)) { rotation = new THREE.Euler(); }

    // find available (or oldest) particle system
    for (var i = 0; i < this.cache.length; i++) {
      if (this.cache[i].active === false){
        found = i;
        break;
      }
      if (this.cache[i].time > oldestTime) {
        found = i;
        oldestTime = this.cache[i].time;
      }
    }

    ps = this.cache[found];

    ps.active = true;
    ps.loopCount = 1;
    ps.object3D.visible = true;
    ps.object3D.position.copy(position);
    ps.object3D.rotation.copy(rotation);
    ps.time = 0;

    this.resetParticles(ps);
  },

  doLoop: function (ps) {
    ps.loopCount++;
    ps.frame = -1;
    ps.time = 0;
    this.resetParticles(ps);
  },

  resetParticle: function (part, i) {
    part.visible = false;
    if (this.restPositions[i]) { part.position.copy(this.restPositions[i]); }
    if (this.useRotation){
      if (this.restRotations[i]) { part.rotation.copy(this.restRotations[i]); }
    } else {
      //part.lookAt(this.camera.position); // lookAt does not support rotated or translated parents! :_(
    }
  },

/**
 * When starting or finishing (looping) animation, this resets particles
 * to their initial position and, if user asked for replaying less than 100%
 * of particles, randomly choose them.
 */
  resetParticles: function (ps) {
    var i;
    var pi;
    var part;
    var rand;
    var aux;

    // no picking, just hide and reset
    if (this.count === this.numParticles) {
      for (i = 0; i < this.numParticles; i++) { 
        this.resetParticle(ps.object3D.children[i], i);
      }
      return;
    }

    // hide particles from last animation and initialize indexPool
    for (i = 0; i < this.numParticles; i++) { 
      if (i < this.count) {
        ps.object3D.children[ ps.activeParticles[i] ].visible = false;
      }
      this.indexPool[i] = i;
    }

    // scramble indexPool
    for (i = 0; i < this.count - 1; i++) { 
      rand = i + Math.floor(Math.random() * (this.numParticles - i));
      ps.activeParticles[i] = this.indexPool[rand];
      this.indexPool[rand] = this.indexPool[i];
      this.resetParticle(ps.object3D.children[ps.activeParticles[i]], i);
    }
  },

  tick: function (time, delta) {
    var j, i; // loop vars
    var ps; // current particle system
    var frame; // current particle system frame
    var particle; // current particle
    var pi; // index of current particle
    var fdata; // all particles data in current frame
    var fdataNext; // next frame (for interpolation)
    var useRotation = this.useRotation;
    var frameTime; // time in current frame (for interpolation)
    var relTime; // current particle system relative time (0-1)
    var interpolate; // whether interpolate between frames or not

    for (i = 0; i < this.cache.length; i++) {
      ps = this.cache[i];
      if (!ps.active) continue;
      
      // if the duration is so short that there's no need to interpolate, don't do it
      // even if user asked for it.
      interpolate = this.data.interpolate && this.data.dur / this.numFrames > delta;

      relTime = ps.time / this.data.dur;
      frame = relTime * this.numFrames;
      fdata = this.framedata[Math.floor(frame)];
      if (interpolate) {
        frameTime = frame - Math.floor(frame);
        fdataNext = frame < this.numFrames - 1 ? this.framedata[Math.floor(frame) + 1] : null;
      }
      for (j = 0; j < ps.activeParticles.length; j++) {
        pi = ps.activeParticles[j];
        particle = ps.object3D.children[pi];
        if (!fdata[pi].alive){
          particle.visible = false;
          continue;
        } 

        particle.visible = true;

        if (interpolate && fdataNext && fdataNext[pi].alive) {
          particle.position.lerpVectors(fdata[pi].position, fdataNext[pi].position, frameTime);
        } else {
          particle.position.copy(fdata[pi].position);
        }

        if (useRotation) {
          particle.rotation.copy(fdata[pi].rotation);
        }
      }

      ps.time += delta;
      if (ps.time >= this.data.dur) {
        if (ps.loopCount < ps.loopTotal) {
          this.el.emit('loop');
          this.doLoop(ps);
        } else {
          this.el.emit('finished');
          ps.active = false;
          ps.object3D.visible = false;
        }
        continue;
      }
    }
  }

});


/***/ }),
/* 146 */
/***/ (function(module, exports) {

/**
 * Listen to event and forward to another entity or entities.
 */
AFRAME.registerComponent('proxy-event', {
  schema: {
    captureBubbles: {default: false},
    event: {type: 'string'},
    to: {type: 'string'},
    as: {type: 'string'},
    bubbles: {default: false}
  },

  multiple: true,

  init: function () {
    var data = this.data;
    var el = this.el;
    var to;
    var self = this;

    if (data.to === 'CHILDREN') {
      to = el.querySelectorAll('*');
    } else if (data.to === 'SELF') {
      to = [el];
    } else {
      to = document.querySelectorAll(data.to);
    }

    el.addEventListener(data.event, function (evt) {
      var data = self.data;
      var i;
      if (!data.captureBubbles && evt.target !== el) { return; }
      for (i = 0; i < to.length; i++) {
        to[i].emit(data.as || data.event, null, data.bubbles);
      }
    });
  }
});


/***/ }),
/* 147 */
/***/ (function(module, exports) {

/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Slice9 component for A-Frame.
 */
AFRAME.registerComponent('slice9', {
  schema: {
    width: {default: 1, min: 0},
    height: {default: 1, min: 0},
    left: {default: 0, min: 0},
    right: {default: 0, min: 0},
    bottom: {default: 0, min: 0},
    top: {default: 0, min: 0},
    side: {default: 'front', oneOf: ['front', 'back', 'double']},
    padding: {default: 0.1, min: 0.01},
    color: {type: 'color', default: '#fff'},
    opacity: {default: 1.0, min: 0, max: 1},
    transparent: {default: true},
    debug: {default: false},
    src: {type: 'map'}
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    var data = this.data;
    var material = this.material = new THREE.MeshBasicMaterial({color: data.color, opacity: data.opacity, transparent: data.transparent, wireframe: data.debug});
    var geometry = this.geometry = new THREE.PlaneBufferGeometry(data.width, data.height, 3, 3);

    var textureLoader = new THREE.TextureLoader();
    this.plane = new THREE.Mesh(geometry, material);
    this.el.setObject3D('mesh', this.plane);
    this.textureSrc = null;
  },

  updateMap: function () {
    var src = this.data.src;

    if (src) {
      if (src === this.textureSrc) { return; }
      // Texture added or changed.
      this.textureSrc = src;
      this.el.sceneEl.systems.material.loadTexture(src, {src: src}, setMap.bind(this));
      return;
    }

    // Texture removed.
    if (!this.material.map) { return; }
    setMap(null);


    function setMap (texture) {
      this.material.map = texture;
      this.material.needsUpdate = true;
      this.regenerateMesh();
    }
  },

  regenerateMesh: function () {
    var data = this.data;
    var pos = this.geometry.attributes.position.array;
    var uvs = this.geometry.attributes.uv.array;
    var image = this.material.map.image;

    if (!image) {return;}

    /*
      0--1------------------------------2--3
      |  |                              |  |
      4--5------------------------------6--7
      |  |                              |  |
      |  |                              |  |
      |  |                              |  |
      8--9-----------------------------10--11
      |  |                              |  |
      12-13----------------------------14--15
    */
    function setPos(id, x, y) {
      pos[3 * id] = x;
      pos[3 * id + 1] = y;
    }

    function setUV(id, u, v) {
      uvs[2 * id] = u;
      uvs[2 * id + 1] = v;
    }

    // Update UVS
    var uv = {
      left: data.left / image.width,
      right: data.right / image.width,
      top: data.top / image.height,
      bottom: data.bottom / image.height
    };

    setUV(1,  uv.left,  1);
    setUV(2,  uv.right, 1);

    setUV(4,  0,        uv.bottom);
    setUV(5,  uv.left,  uv.bottom);
    setUV(6,  uv.right, uv.bottom);
    setUV(7,  1,        uv.bottom);

    setUV(8,  0,        uv.top);
    setUV(9,  uv.left,  uv.top);
    setUV(10, uv.right, uv.top);
    setUV(11, 1,        uv.top);

    setUV(13, uv.left,  0);
    setUV(14, uv.right, 0);

    // Update vertex positions
    var w2 = data.width / 2;
    var h2 = data.height / 2;
    var left = -w2 + data.padding;
    var right = w2 - data.padding;
    var top = h2 - data.padding;
    var bottom = -h2 + data.padding;

    setPos(0, -w2,    h2);
    setPos(1, left,   h2);
    setPos(2, right,  h2);
    setPos(3, w2,     h2);

    setPos(4, -w2,    top);
    setPos(5, left,   top);
    setPos(6, right,  top);
    setPos(7, w2,     top);

    setPos(8, -w2,    bottom);
    setPos(9, left,   bottom);
    setPos(10, right, bottom);
    setPos(11, w2,    bottom);

    setPos(13, left,  -h2);
    setPos(14, right, -h2);
    setPos(12, -w2,   -h2);
    setPos(15, w2,    -h2);

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.uv.needsUpdate = true;
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
   update: function (oldData) {
     var data = this.data;

     this.material.color.setStyle(data.color);
     this.material.opacity = data.opacity;
     this.material.transparent = data.transparent;
     this.material.wireframe = data.debug;
     this.material.side = parseSide(data.side);

     var diff = AFRAME.utils.diff(data, oldData);
     if ('src' in diff) {
       this.updateMap();
     }
     else if ('width' in diff || 'height' in diff || 'padding' in diff || 'left' in diff || 'top' in diff || 'bottom' in diff || 'right' in diff) {
       this.regenerateMesh();
     }
   },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { }
});

function parseSide (side) {
  switch (side) {
    case 'back': {
      return THREE.BackSide;
    }
    case 'double': {
      return THREE.DoubleSide;
    }
    default: {
      // Including case `front`.
      return THREE.FrontSide;
    }
  }
}


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AND = '&&';
var QUOTE_RE = /'/g;
var OR = '||';
var COMPARISONS = ['==', '===', '!=', '!=='];
var tempTokenArray = [];
var tokenArray = [];

/**
 * Select value from store. Handles boolean operations, calls `selectProperty`.
 *
 * @param {object} state - State object.
 * @param {string} selector - Dot-delimited store keys (e.g., game.player.health).
 */
function select(state, selector, bindFor, bindForKey) {
  var comparisonResult;
  var firstValue;
  var i;
  var runningBool;
  var secondValue;
  var tokens;
  var value;

  // If just single selector, then grab value.
  tokens = split(selector, /\s+/);
  if (tokens.length === 1) {
    return selectProperty(state, selector, bindFor, bindForKey);
  }

  // Evaluate comparisons.
  tokenArray.length = 0;
  copyArray(tempTokenArray, tokens);
  for (i = 0; i < tempTokenArray.length; i++) {
    if (COMPARISONS.indexOf(tempTokenArray[i]) === -1) {
      tokenArray.push(tempTokenArray[i]);
      continue;
    }

    // Comparison (color === 'red').
    // Pop previous value since that is one of comparsion value.
    firstValue = selectProperty(state, tokenArray.pop());
    // Lookup second value.
    secondValue = tempTokenArray[i + 1].replace(QUOTE_RE, '');
    // Evaluate (equals or not equals).
    firstValue = firstValue === undefined ? 'undefined' : firstValue.toString();
    secondValue = secondValue === undefined ? 'undefined' : secondValue.toString();
    comparisonResult = tempTokenArray[i].indexOf('!') === -1 ? firstValue === secondValue : firstValue !== secondValue;
    tokenArray.push(comparisonResult);
    i++;
  }

  // Was single comparison.
  if (tokenArray.length === 1) {
    return tokenArray[0];
  }

  // If has boolean expression, evaluate.
  runningBool = tokenArray[0].constructor === Boolean ? tokenArray[0] : selectProperty(state, tokenArray[0], bindFor, bindForKey);
  for (i = 1; i < tokenArray.length; i += 2) {
    if (tokenArray[i] !== OR && tokenArray[i] !== AND) {
      continue;
    }
    // Check if was evaluated comparison (bool) or a selector (string).
    tokenArray[i + 1] = tokenArray[i + 1].constructor === Boolean ? tokenArray[i + 1] : selectProperty(state, tokenArray[i + 1]);

    // Evaluate boolean.
    if (tokenArray[i] === OR) {
      runningBool = runningBool || tokenArray[i + 1];
    } else if (tokenArray[i] === AND) {
      runningBool = runningBool && tokenArray[i + 1];
    }
  }
  return runningBool;
}
module.exports.select = select;

/**
 * Does actual selecting and walking of state.
 */
function selectProperty(state, selector, bindFor, bindForKey) {
  var i;
  var originalSelector;
  var splitted;
  var value;

  // If bindFor, select the array. Then later, we filter the array.
  if (bindFor && selector.startsWith(bindFor.for)) {
    originalSelector = selector;
    selector = bindFor.in;
  }

  // Walk.
  value = state;
  splitted = split(stripNot(selector), '.');
  for (i = 0; i < splitted.length; i++) {
    if (i < splitted.length - 1 && !(splitted[i] in value)) {
      console.error('[state] Not found:', splitted, splitted[i]);
    }
    value = value[splitted[i]];
  }

  if (bindFor && originalSelector.startsWith(bindFor.for)) {
    // Simple array.
    if (!bindFor.key) {
      return value[bindForKey];
    }
    // Array of objects.
    for (i = 0; i < value.length; i++) {
      if (value[i][bindFor.key] !== bindForKey) {
        continue;
      }
      value = selectProperty(value[i], originalSelector.replace(bindFor.for + '.', ''));
      break;
    }
  }

  // Boolean.
  if (selector[0] === '!' && selector[1] === '!') {
    return !!value;
  }
  if (selector[0] === '!') {
    return !value;
  }
  return value;
}
module.exports.selectProperty = selectProperty;

function clearObject(obj) {
  for (var key in obj) {
    delete obj[key];
  }
}
module.exports.clearObject = clearObject;

/**
 * Helper to compose object of handlers, merging functions handling same action.
 */
function composeHandlers() {
  var actionName;
  var i;
  var inputHandlers = arguments;
  var outputHandlers;

  outputHandlers = {};
  for (i = 0; i < inputHandlers.length; i++) {
    for (actionName in inputHandlers[i]) {
      if (actionName in outputHandlers) {
        // Initial compose/merge functions into arrays.
        if (outputHandlers[actionName].constructor === Array) {
          outputHandlers[actionName].push(inputHandlers[i][actionName]);
        } else {
          outputHandlers[actionName] = [outputHandlers[actionName], inputHandlers[i][actionName]];
        }
      } else {
        outputHandlers[actionName] = inputHandlers[i][actionName];
      }
    }
  }

  // Compose functions specified via array.
  for (actionName in outputHandlers) {
    if (outputHandlers[actionName].constructor === Array) {
      outputHandlers[actionName] = composeFunctions.apply(this, outputHandlers[actionName]);
    }
  }

  return outputHandlers;
}
module.exports.composeHandlers = composeHandlers;

function composeFunctions() {
  var functions = arguments;
  return function () {
    var i;
    for (i = 0; i < functions.length; i++) {
      functions[i].apply(this, arguments);
    }
  };
}
module.exports.composeFunctions = composeFunctions;

var NO_WATCH_TOKENS = ['||', '&&', '!=', '!==', '==', '==='];
function parseKeysToWatch(keys, str, isBindItem) {
  var i;
  var tokens;
  tokens = str.split(/\s+/);
  for (i = 0; i < tokens.length; i++) {
    if (NO_WATCH_TOKENS.indexOf(tokens[i]) === -1 && !tokens[i].startsWith("'") && keys.indexOf(tokens[i]) === -1) {
      if (isBindItem && tokens[i] === 'item') {
        continue;
      }
      keys.push(parseKeyToWatch(tokens[i]));
    }
  }
}
module.exports.parseKeysToWatch = parseKeysToWatch;

function parseKeyToWatch(str) {
  var dotIndex;
  str = stripNot(str.trim());
  dotIndex = str.indexOf('.');
  if (dotIndex === -1) {
    return str;
  }
  return str.substring(0, str.indexOf('.'));
}

function stripNot(str) {
  if (str.indexOf('!!') === 0) {
    return str.replace('!!', '');
  } else if (str.indexOf('!') === 0) {
    return str.replace('!', '');
  }
  return str;
}

/**
 * Cached split.
 */
var SPLIT_CACHE = {};
function split(str, delimiter) {
  if (!SPLIT_CACHE[delimiter]) {
    SPLIT_CACHE[delimiter] = {};
  }
  if (SPLIT_CACHE[delimiter][str]) {
    return SPLIT_CACHE[delimiter][str];
  }
  SPLIT_CACHE[delimiter][str] = str.split(delimiter);
  return SPLIT_CACHE[delimiter][str];
}
module.exports.split = split;

function copyArray(dest, src) {
  var i;
  dest.length = 0;
  for (i = 0; i < src.length; i++) {
    dest[i] = src[i];
  }
}
module.exports.copyArray = copyArray;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(2);
var diff = __webpack_require__(3);
var lib = __webpack_require__(0);
var wrapArray = __webpack_require__(4).wrapArray;

// Singleton state definition.
var State = {
  initialState: {},
  nonBindedStateKeys: [],
  handlers: {},
  computeState: function computeState() {/* no-op */}
};

var STATE_UPDATE_EVENT = 'stateupdate';
var TYPE_OBJECT = 'object';
var WHITESPACE_REGEX = /s+/;

AFRAME.registerState = function (definition) {
  AFRAME.utils.extend(State, definition);
};

AFRAME.registerSystem('state', {
  init: function init() {
    var _this = this;

    var key;

    this.diff = {};
    this.state = AFRAME.utils.clone(State.initialState);
    this.subscriptions = [];
    this.initEventHandlers();

    // Wrap array to detect dirty.
    for (key in this.state) {
      if (this.state[key] && this.state[key].constructor === Array) {
        this.state[key].__dirty = true;
        wrapArray(this.state[key]);
      }
    }

    this.lastState = AFRAME.utils.clone(this.state);

    this.eventDetail = {
      lastState: this.lastState,
      state: this.state
    };

    this.el.addEventListener('loaded', function () {
      var i;
      // Initial compute.
      State.computeState(_this.state, '@@INIT');
      // Initial dispatch.
      for (i = 0; i < _this.subscriptions.length; i++) {
        _this.subscriptions[i].onStateUpdate(_this.state);
      }
    });
  },

  /**
   * Dispatch action.
   */
  dispatch: function dispatch(actionName, payload) {
    var i;
    var key;
    var subscription;

    // Modify state.
    State.handlers[actionName](this.state, payload);

    // Post-compute.
    State.computeState(this.state, actionName, payload);

    // Get a diff to optimize bind updates.
    for (key in this.diff) {
      delete this.diff[key];
    }
    diff(this.lastState, this.state, this.diff, State.nonBindedStateKeys);

    // Notify subscriptions / binders.
    for (i = 0; i < this.subscriptions.length; i++) {
      if (this.subscriptions[i].name === 'bind-for') {
        // For arrays and bind-for, check __dirty flag on array rather than the diff.
        if (!this.state[this.subscriptions[i].keysToWatch[0]].__dirty) {
          continue;
        }
      } else {
        if (!this.shouldUpdate(this.subscriptions[i].keysToWatch, this.diff)) {
          continue;
        }
      }

      this.subscriptions[i].onStateUpdate();
    }

    // Unset array dirty.
    for (key in this.state) {
      if (this.state[key] && this.state[key].constructor === Array) {
        this.state[key].__dirty = false;
      }
    }

    // Store last state.
    // TODO: copyState messes with the diff.
    this.copyState(this.lastState, this.state);

    // Emit.
    this.eventDetail.action = actionName;
    this.eventDetail.payload = payload;
    this.el.emit(STATE_UPDATE_EVENT, this.eventDetail);
  },

  /**
   * Store last state through a deep extend, but not for arrays.
   */
  copyState: function copyState(lastState, state, isRecursive) {
    var key;

    for (key in state) {
      // Don't copy pieces of state keys that are non-binded or untracked.
      if (!isRecursive && State.nonBindedStateKeys.indexOf(key) !== -1) {
        continue;
      }

      // Nested state.
      if (state[key] && state[key].constructor === Object) {
        if (!(key in lastState)) {
          // Clone object if destination does not exist.
          lastState[key] = AFRAME.utils.clone(state[key]);
          continue;
        }
        // Recursively copy state.
        this.copyState(lastState[key], state[key], true);
        continue;
      }

      // Copy by value.
      lastState[key] = state[key];
    }
  },

  subscribe: function subscribe(component) {
    this.subscriptions.push(component);
  },

  unsubscribe: function unsubscribe(component) {
    this.subscriptions.splice(this.subscriptions.indexOf(component), 1);
  },

  /**
   * Check if state changes were relevant to this binding. If not, don't call.
   */
  shouldUpdate: function shouldUpdate(keysToWatch, diff) {
    var stateKey;
    for (stateKey in diff) {
      if (keysToWatch.indexOf(stateKey) !== -1) {
        return true;
      }
    }
    return false;
  },

  /**
   * Proxy events to action dispatches so components can just bubble actions up as events.
   * Handlers define which actions they handle. Go through all and add event listeners.
   */
  initEventHandlers: function initEventHandlers() {
    var actionName;
    var registeredActions = [];
    var self = this;

    registerListener = registerListener.bind(this);

    // Use declared handlers to know what events to listen to.
    for (actionName in State.handlers) {
      // Only need to register one handler for each event.
      if (registeredActions.indexOf(actionName) !== -1) {
        continue;
      }
      registeredActions.push(actionName);
      registerListener(actionName);
    }

    function registerListener(actionName) {
      var _this2 = this;

      this.el.addEventListener(actionName, function (evt) {
        _this2.dispatch(actionName, evt.detail);
      });
    }
  },

  /**
   * Render template to string with item data.
   */
  renderTemplate: function () {
    // Braces, whitespace, optional item name, item key, whitespace, braces.
    var interpRegex = /{{\s*(\w*\.)?([\w.]+)\s*}}/g;

    return function (template, data, asString) {
      var match;
      var str;

      str = template;

      // Data will be null if initialize pool for bind-for.updateInPlace.
      if (data) {
        while (match = interpRegex.exec(template)) {
          str = str.replace(match[0], (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === TYPE_OBJECT ? lib.select(data, match[2]) || '' : data);
        }
      }

      // Return as string.
      if (asString) {
        return str;
      }

      // Return as DOM.
      return document.createRange().createContextualFragment(str);
    };
  }(),

  select: lib.select
});

/**
 * Bind component property to a value in state.
 *
 * bind="geometry.width: car.width""
 * bind__material="color: enemy.color; opacity: enemy.opacity"
 * bind__visible="player.visible"
 */
AFRAME.registerComponent('bind', {
  schema: {
    default: {},
    parse: function parse(value) {
      // Parse style-like object.
      var data;
      var i;
      var properties;
      var pair;

      // Using setAttribute with object, no need to parse.
      if (value.constructor === Object) {
        return value;
      }

      // Using instanced ID as component namespace for single-property component,
      // nothing to separate.
      if (value.indexOf(':') === -1) {
        return value;
      }

      // Parse style-like object as keys to values.
      data = {};
      properties = lib.split(value, ';');
      for (i = 0; i < properties.length; i++) {
        pair = lib.split(properties[i].trim(), ':');
        data[pair[0]] = pair[1].trim();
      }
      return data;
    }
  },

  multiple: true,

  init: function init() {
    var bindForEl;
    var bindForName;
    var componentId;
    var data = this.data;
    var key;

    this.keysToWatch = [];
    this.onStateUpdate = this.onStateUpdate.bind(this);
    this.system = this.el.sceneEl.systems.state;

    // Whether we are binding by namespace (e.g., bind__foo="prop1: true").
    if (this.id) {
      componentId = lib.split(this.id, '__')[0];
    }
    this.isNamespacedBind = this.id && componentId in AFRAME.components && !AFRAME.components[componentId].isSingleProp || componentId in AFRAME.systems;

    this.lastData = {};
    this.updateObj = {};

    // Subscribe to store and register handler to do data-binding to components.
    this.system.subscribe(this);

    this.rootEl = this.el.closest('[data-bind-for-key]');
    this.onStateUpdate = this.onStateUpdate.bind(this);
  },

  update: function update() {
    var bindForEl;
    var data = this.data;
    var key;
    var property;

    // Index `keysToWatch` to only update state on relevant changes.
    this.keysToWatch.length = 0;
    if (typeof data === 'string') {
      lib.parseKeysToWatch(this.keysToWatch, data);
    } else {
      for (key in data) {
        lib.parseKeysToWatch(this.keysToWatch, data[key]);
      }
    }

    // Check if any properties are part of an iteration in bind-for.
    bindForEl = this.el.closest('[bind-for]');
    if (bindForEl && bindForEl !== this.el) {
      this.bindForEl = bindForEl;
      this.bindRootEl = this.el.closest('[data-bind-for-key]');
      this.bindFor = this.bindForEl.getAttribute('bind-for');
      this.bindForKey = this.bindRootEl.getAttribute('data-bind-for-key');
      this.keysToWatch.push(this.bindFor.in);
      this.rootEl.addEventListener('bindforupdate', this.onStateUpdate);
    } else {
      this.bindFor = '';
      this.bindForKey = '';
    }

    // Update.
    this.onStateUpdate();
  },

  /**
   * Handle state update.
   */
  onStateUpdate: function onStateUpdate() {
    // Update component with the state.
    var hasKeys = false;
    var el = this.el;
    var propertyName;
    var stateSelector;
    var state;
    var tempNode;
    var value;

    if (!el.parentNode) {
      return;
    }
    if (this.isNamespacedBind) {
      lib.clearObject(this.updateObj);
    }

    state = this.system.state;

    // Update bind-for-key if necessary if simple list of strings.
    // Sort of a hack.
    if (this.bindFor && this.bindForKey !== undefined && !this.bindFor.key) {
      tempNode = el;
      while (tempNode.parentNode && tempNode.parentNode !== this.bindForEl) {
        if (tempNode.parentNode) {
          tempNode = tempNode.parentNode;
        }
      }
      this.bindForKey = parseInt(tempNode.dataset.bindForKey, 10);
    }

    // Single-property bind.
    if (_typeof(this.data) !== TYPE_OBJECT) {
      try {
        value = lib.select(state, this.data, this.bindFor, this.bindForKey);
      } catch (e) {
        throw new Error('[aframe-state-component] Key \'' + this.data + '\' not found in state.' + (' #' + this.el.getAttribute('id') + '[' + this.attrName + ']'));
      }

      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== TYPE_OBJECT && _typeof(this.lastData) !== TYPE_OBJECT && this.lastData === value) {
        return;
      }

      AFRAME.utils.entity.setComponentProperty(el, this.id, value);
      this.lastData = value;
      return;
    }

    for (propertyName in this.data) {
      // Pointer to a value in the state (e.g., `player.health`).
      stateSelector = this.data[propertyName].trim();
      try {
        value = lib.select(state, stateSelector, this.bindFor, this.bindForKey);
        if (this.bindFor && value === undefined) {
          return;
        }
      } catch (e) {
        throw new Error('[aframe-state-component] Key \'' + stateSelector + '\' not found in state.' + (' #' + this.el.getAttribute('id') + '[' + this.attrName + ']'));
      }

      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== TYPE_OBJECT && _typeof(this.lastData[propertyName]) !== TYPE_OBJECT && this.lastData[propertyName] === value) {
        continue;
      }

      // Remove component if value is `undefined`.
      if (propertyName in AFRAME.components && value === undefined) {
        el.removeAttribute(propertyName);
        return;
      }

      // Set using dot-delimited property name.
      if (this.isNamespacedBind) {
        // Batch if doing namespaced bind.
        this.updateObj[propertyName] = value;
      } else {
        AFRAME.utils.entity.setComponentProperty(el, propertyName, value);
      }

      this.lastData[propertyName] = value;
    }

    // Batch if doing namespaced bind.
    for (hasKeys in this.updateObj) {
      // See if object is empty.
    }
    if (this.isNamespacedBind && hasKeys) {
      el.setAttribute(this.id, this.updateObj);
    }
  },

  remove: function remove() {
    this.system.unsubscribe(this);
    if (this.bindForEl) {
      this.bindForEl.removeEventListener('bindforupdate', this.onStateUpdate);
    }
  }
});

/**
 * Toggle component attach and detach based on boolean value.
 *
 * bind__raycastable="isRaycastable""
 */
AFRAME.registerComponent('bind-toggle', {
  schema: { type: 'string' },

  multiple: true,

  init: function init() {
    this.system = this.el.sceneEl.systems.state;
    this.keysToWatch = [];
    this.onStateUpdate = this.onStateUpdate.bind(this);

    // Subscribe to store and register handler to do data-binding to components.
    this.system.subscribe(this);

    this.onStateUpdate();
  },

  update: function update() {
    this.keysToWatch.length = 0;
    lib.parseKeysToWatch(this.keysToWatch, this.data);
  },

  /**
   * Handle state update.
   */
  onStateUpdate: function onStateUpdate() {
    var el = this.el;
    var state;
    var value;

    state = this.system.state;

    try {
      value = lib.select(state, this.data);
    } catch (e) {
      throw new Error('[aframe-state-component] Key \'' + this.data + '\' not found in state.' + (' #' + this.el.getAttribute('id') + '[' + this.attrName + ']'));
    }

    if (value) {
      el.setAttribute(this.id, '');
    } else {
      el.removeAttribute(this.id);
    }
  },

  remove: function remove() {
    this.system.unsubscribe(this);
  }
});

module.exports = {
  composeFunctions: lib.composeFunctions,
  composeHandlers: lib.composeHandlers,
  select: lib.select
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lib = __webpack_require__(0);

var ITEM_PREFIX_RE = /item./;
var ITEM_SELECTOR_RE = /item.(\w+)/;

/**
 * Render array from state.
 */
AFRAME.registerComponent('bind-for', {
  schema: {
    delay: { default: 0 },
    for: { type: 'string', default: 'item' },
    in: { type: 'string' },
    key: { type: 'string' },
    pool: { default: 0 },
    template: { type: 'string' },
    updateInPlace: { default: false }
  },

  init: function init() {
    // Subscribe to store and register handler to do data-binding to components.
    this.system = this.el.sceneEl.systems.state;
    this.onStateUpdate = this.onStateUpdate.bind(this);

    this.keysToWatch = [];
    this.renderedKeys = []; // Keys that are currently rendered.
    this.system.subscribe(this);

    if (this.el.children[0] && this.el.children[0].tagName === 'TEMPLATE') {
      this.template = this.el.children[0].innerHTML.trim();
    } else {
      this.template = document.querySelector(this.data.template).innerHTML.trim();
    }

    for (var _i = 0; _i < this.data.pool; _i++) {
      this.el.appendChild(this.generateFromTemplate(null, _i));
    }
  },

  update: function update() {
    this.keysToWatch[0] = lib.split(this.data.in, '.')[0];
    this.onStateUpdate();
  },

  /**
   * When items are swapped out, the old ones are removed, and new ones are added. All
   * entities will be reinitialized.
   */
  onStateUpdateNaive: function () {
    var activeKeys = [];

    return function () {
      var child;
      var data = this.data;
      var el = this.el;
      var list;
      var key;
      var keyValue;

      try {
        list = lib.select(this.system.state, data.in);
      } catch (e) {
        throw new Error('[aframe-state-component] Key \'' + data.in + '\' not found in state.' + (' #' + el.getAttribute('id') + '[' + this.attrName + ']'));
      }

      activeKeys.length = 0;
      for (var _i2 = 0; _i2 < list.length; _i2++) {
        var item = list[_i2];
        // If key not defined, use index (e.g., array of strings).
        activeKeys.push(data.key ? item[data.key].toString() : item.toString());
      }

      // Remove items by removing entities.
      var toRemoveEls = this.getElsToRemove(activeKeys, this.renderedKeys);
      for (i = 0; i < toRemoveEls.length; i++) {
        toRemoveEls[i].parentNode.removeChild(toRemoveEls[i]);
      }

      if (list.length) {
        this.renderItems(list, activeKeys, 0);
      }
    };
  }(),

  /**
   * Add or update item with delay support.
   */
  renderItems: function renderItems(list, activeKeys, i) {
    var _this = this;

    var data = this.data;
    var el = this.el;
    var itemEl;
    var item = list[i];

    // If key not defined, use index (e.g., array of strings).
    keyValue = data.key ? item[data.key].toString() : item.toString();

    if (this.renderedKeys.indexOf(keyValue) === -1) {
      // Add.
      itemEl = this.generateFromTemplate(item, i);
      el.appendChild(itemEl);
      this.renderedKeys.push(keyValue);
    } else {
      // Update.
      if (list.length && list[0].constructor === String) {
        // Update index for simple list.
        var _keyValue = data.key ? item[data.key].toString() : item.toString();
        itemEl = el.querySelector('[data-bind-for-value="' + _keyValue + '"]');
        itemEl.setAttribute('data-bind-for-key', i);
      } else {
        var bindForKey = this.getBindForKey(item, i);
        itemEl = el.querySelector('[data-bind-for-key="' + bindForKey + '"]');
      }
      itemEl.emit('bindforupdate', item, false);
    }

    if (!list[i + 1]) {
      return;
    }

    if (this.data.delay) {
      setTimeout(function () {
        _this.renderItems(list, activeKeys, i + 1);
      }, this.data.delay);
    } else {
      this.renderItems(list, activeKeys, i + 1);
    }
  },

  /**
   * When items are swapped out, this algorithm will update component values in-place using
   * bind-item.
   */
  onStateUpdateInPlace: function () {
    var activeKeys = [];

    return function () {
      var data = this.data;
      var el = this.el;
      var list;
      var key;
      var keyValue;

      try {
        list = lib.select(this.system.state, data.in);
      } catch (e) {
        throw new Error('[aframe-state-component] Key \'' + data.in + '\' not found in state.' + (' #' + el.getAttribute('id') + '[' + this.attrName + ']'));
      }

      // Calculate keys that should be active.
      activeKeys.length = 0;
      for (var _i3 = 0; _i3 < list.length; _i3++) {
        var item = list[_i3];
        keyValue = data.key ? item[data.key].toString() : item.toString();
        activeKeys.push(keyValue);
      }

      // Remove items by pooling. Do before adding.
      var toRemoveEls = this.getElsToRemove(activeKeys, this.renderedKeys);
      for (var _i4 = 0; _i4 < toRemoveEls.length; _i4++) {
        toRemoveEls[_i4].object3D.visible = false;
        toRemoveEls[_i4].setAttribute('data-bind-for-active', 'false');
        toRemoveEls[_i4].removeAttribute('data-bind-for-key');
        toRemoveEls[_i4].removeAttribute('data-bind-for-value');
        toRemoveEls[_i4].emit('bindfordeactivate', null, false);
        toRemoveEls[_i4].pause();
      }

      if (list.length) {
        this.renderItemsInPlace(list, activeKeys, 0);
      }
    };
  }(),

  /**
   * Add, takeover, or update item with delay support.
   */
  renderItemsInPlace: function renderItemsInPlace(list, activeKeys, i) {
    var _this2 = this;

    var data = this.data;
    var el = this.el;
    var itemEl;

    var item = list[i];
    var bindForKey = this.getBindForKey(item, i);
    var keyValue = data.key ? item[data.key].toString() : item.toString();

    // Add item.
    if (this.renderedKeys.indexOf(keyValue) === -1) {
      if (!el.querySelector(':scope > [data-bind-for-active="false"]')) {
        // No items available in pool. Generate new entity.
        var _itemEl = this.generateFromTemplate(item, i);
        _itemEl.addEventListener('loaded', function () {
          _itemEl.emit('bindforupdateinplace', item, false);
        });
        el.appendChild(_itemEl);
      } else {
        // Take over inactive item.
        itemEl = el.querySelector('[data-bind-for-active="false"]');
        itemEl.setAttribute('data-bind-for-key', bindForKey);
        itemEl.setAttribute('data-bind-for-value', keyValue);
        itemEl.object3D.visible = true;
        itemEl.play();
        itemEl.setAttribute('data-bind-for-active', 'true');
        itemEl.emit('bindforupdateinplace', item, false);
      }
      this.renderedKeys.push(keyValue);
    } else if (activeKeys.indexOf(keyValue) !== -1) {
      // Update item.
      if (list.length && list[0].constructor === String) {
        // Update index for simple list.
        itemEl = el.querySelector('[data-bind-for-value="' + keyValue + '"]');
        itemEl.setAttribute('data-bind-for-key', i);
      } else {
        itemEl = el.querySelector('[data-bind-for-key="' + bindForKey + '"]');
      }
      itemEl.emit('bindforupdateinplace', item, false);
    }

    if (!list[i + 1]) {
      return;
    }

    if (this.data.delay) {
      setTimeout(function () {
        _this2.renderItemsInPlace(list, activeKeys, i + 1);
      }, this.data.delay);
    } else {
      this.renderItemsInPlace(list, activeKeys, i + 1);
    }
  },

  /**
   * Generate entity from template.
   */
  generateFromTemplate: function generateFromTemplate(item, i) {
    var data = this.data;

    this.el.appendChild(this.system.renderTemplate(this.template, item));
    var newEl = this.el.children[this.el.children.length - 1];;

    // From pool.true
    if (!item) {
      newEl.setAttribute('data-bind-for-key', '');
      newEl.setAttribute('data-bind-for-active', 'false');
      return newEl;
    }

    var bindForKey = this.getBindForKey(item, i);
    newEl.setAttribute('data-bind-for-key', bindForKey);
    if (!data.key) {
      newEl.setAttribute('data-bind-for-value', item);
    }

    // Keep track of pooled and non-pooled entities if updating in place.
    newEl.setAttribute('data-bind-for-active', 'true');
    return newEl;
  },

  /**
   * Get entities marked for removal.
   *
   * @param {array} activeKeys - List of key values that should be active.
   * @param {array} renderedKeys - List of key values currently rendered.
   */
  getElsToRemove: function () {
    var toRemove = [];

    return function (activeKeys, renderedKeys) {
      var data = this.data;
      var el = this.el;

      toRemove.length = 0;
      for (var _i5 = 0; _i5 < el.children.length; _i5++) {
        if (el.children[_i5].tagName === 'TEMPLATE') {
          continue;
        }
        var key = data.key ? el.children[_i5].getAttribute('data-bind-for-key') : el.children[_i5].getAttribute('data-bind-for-value');
        if (activeKeys.indexOf(key) === -1 && renderedKeys.indexOf(key) !== -1) {
          toRemove.push(el.children[_i5]);
          renderedKeys.splice(renderedKeys.indexOf(key), 1);
        }
      }
      return toRemove;
    };
  }(),

  /**
   * Get value to use as the data-bind-for-key.
   * For items, will be value specified by `bind-for.key`.
   * For simple list, will be the index.
   */
  getBindForKey: function getBindForKey(item, i) {
    return this.data.key ? item[this.data.key].toString() : i.toString();
  },

  /**
   * Handle state update.
   */
  onStateUpdate: function onStateUpdate() {
    if (this.data.updateInPlace) {
      this.onStateUpdateInPlace();
    } else {
      this.onStateUpdateNaive();
    }
  }
});

/**
 * Handle parsing and update in-place updates under bind-for.
 */
AFRAME.registerComponent('bind-item', {
  schema: {
    type: 'string'
  },

  multiple: true,

  init: function init() {
    this.itemData = null;
    this.keysToWatch = [];
    this.prevValues = {};

    // Listen to root item for events.
    var rootEl = this.rootEl = this.el.closest('[data-bind-for-key]');
    if (!rootEl) {
      throw new Error('bind-item component must be attached to entity under a bind-for item.');
    }
    rootEl.addEventListener('bindforupdateinplace', this.updateInPlace.bind(this));
    rootEl.addEventListener('bindfordeactivate', this.deactivate.bind(this));

    this.el.sceneEl.systems.state.subscribe(this);
  },

  update: function update() {
    this.parseSelector();
  },

  /**
   * Run with bind-for tells to via event `bindforupdateinplace`, passing item data.
   */
  updateInPlace: function updateInPlace(evt) {
    var propertyMap = this.propertyMap;

    if (this.rootEl.getAttribute('data-bind-for-active') === 'false') {
      return;
    }

    if (evt) {
      this.itemData = evt.detail;
    }

    for (var property in propertyMap) {
      // Get value from item.
      var value = this.select(this.itemData, propertyMap[property]);

      // Diff against previous value.
      if (value === this.prevValues[property]) {
        continue;
      }

      // Update.
      AFRAME.utils.entity.setComponentProperty(this.el, property, value);

      this.prevValues[property] = value;
    }
  },

  onStateUpdate: function onStateUpdate() {
    this.updateInPlace();
  },

  select: function select(itemData, selector) {
    var value;

    if (selector.indexOf('=') !== -1) {
      // Interpolate.
      var match = selector.match(ITEM_SELECTOR_RE);
      if (match) {
        value = lib.select(itemData, match[0].replace(ITEM_PREFIX_RE, ''));
        selector = selector.replace(ITEM_SELECTOR_RE, "'" + value + "'");
      }

      value = lib.select(this.el.sceneEl.systems.state.state, selector);
    } else {
      // Get value from item.
      value = selector === 'item' ? itemData // Simple list.
      : lib.select(itemData, selector.replace(ITEM_PREFIX_RE, ''));
    }

    return value;
  },

  deactivate: function deactivate() {
    this.prevValues = {};
  },

  parseSelector: function parseSelector() {
    var propertyMap = this.propertyMap = {};
    this.keysToWatch.length = 0;

    var componentName = lib.split(this.id, '__')[0];

    // Different parsing for multi-prop components.
    if (componentName in AFRAME.components && !AFRAME.components[componentName].isSingleProp) {
      var propertySplitList = lib.split(this.data, ';');
      for (var _i6 = 0; _i6 < propertySplitList.length; _i6++) {
        var propertySplit = lib.split(propertySplitList[_i6], ':');
        propertyMap[this.id + '.' + propertySplit[0].trim()] = propertySplit[1].trim();
        lib.parseKeysToWatch(this.keysToWatch, propertySplit[1].trim(), true);
      }
      return;
    }

    propertyMap[this.id] = this.data;
    lib.parseKeysToWatch(this.keysToWatch, this.data, true);
  }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Computes the difference between two objects with ability to ignore keys.
 *
 * @param {object} a - First object to compare (e.g., oldData).
 * @param {object} b - Second object to compare (e.g., newData).
 * @returns {object}
 *   Difference object where set of keys note which values were not equal, and values are
 *   `b`'s values.
 */
module.exports = function () {
  var keys = [];

  return function (a, b, targetObject, ignoreKeys) {
    var aVal;
    var bVal;
    var bKey;
    var diff;
    var key;
    var i;
    var isComparingObjects;

    diff = targetObject || {};

    // Collect A keys.
    keys.length = 0;
    for (key in a) {
      keys.push(key);
    }

    if (!b) {
      return diff;
    }

    // Collect B keys.
    for (bKey in b) {
      if (keys.indexOf(bKey) === -1) {
        keys.push(bKey);
      }
    }

    for (i = 0; i < keys.length; i++) {
      key = keys[i];

      // Ignore specified keys.
      if (ignoreKeys && ignoreKeys.indexOf(key) !== -1) {
        continue;
      }

      aVal = a[key];
      bVal = b[key];
      isComparingObjects = aVal && bVal && aVal.constructor === Object && bVal.constructor === Object;
      if (isComparingObjects && !AFRAME.utils.deepEqual(aVal, bVal) || !isComparingObjects && aVal !== bVal) {
        diff[key] = bVal;
      }
    }
    return diff;
  };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fns = ['push', 'pop', 'shift', 'unshift', 'splice'];

function wrapArray(arr) {
  var i;
  if (arr.__wrapped) {
    return;
  }
  for (i = 0; i < fns.length; i++) {
    makeCallDirty(arr, fns[i]);
  }
  arr.__wrapped = true;
}
module.exports.wrapArray = wrapArray;

function makeCallDirty(arr, fn) {
  var originalFn = arr[fn];
  arr[fn] = function () {
    originalFn.apply(arr, arguments);
    arr.__dirty = true;
  };
}

/***/ })
/******/ ]);
});

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

/* global AFRAME */
var KEYBOARDS = __webpack_require__(157);

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

var FontFactors = {
  roboto: 17,
  aileronsemibold: 20,
  dejavu: 20.5,
  exo2bold: 20,
  exo2semibold: 20.3,
  kelsonsans: 22.8,
  monoid: 19.5,
  mozillavr: 9.5,
  sourcecodepro: 20.3
};

AFRAME.registerComponent('super-keyboard', {
  schema: {
    align: {default: 'left', oneOf: ['left', 'center', 'right']},
    blinkingSpeed: {type: 'int', default: 400},
    filters: {type: 'array'},
    // roboto aileronsemibold dejavu exo2bold exo2semibold kelsonsans monoid sourcecodepro
    font: {default: 'aileronsemibold'},
    hand: {type: 'selector'},
    imagePath: {default: '.'},
    injectToRaycasterObjects: {default: true},
    inputColor: {type: 'color', default: '#6699ff'},
    interval: {type: 'int', default: 50},
    keyBgColor: {type: 'color', default: '#000'},
    keyColor: {type: 'color', default: '#6699ff'},
    keyHoverColor: {type: 'color', default: '#1A407F'},
    keyPressColor: {type: 'color', default: '#5290F6'},
    label: {type: 'string', default: ''},
    labelColor: {type: 'color', default: '#aaa'},
    maxLength: {type: 'int', default: 0},
    model: {default: 'basic'},
    show: {default: true},
    value: {type: 'string', default: ''},
    width: {default: 0.8}
  },

  init: function () {
    this.el.addEventListener('click', this.click.bind(this));
    this.changeEventDetail = {};
    this.textInputObject = {};

    this.keys = null;
    this.focused = false;
    this.keyHover = null;
    this.prevCheckTime = null;
    this.shift = false;

    this.rawValue = this.data.value;
    this.defaultValue = this.data.value;

    this.userFilterFunc = null;
    this.intervalId = 0;

    // Create keyboard image.
    this.kbImg = document.createElement('a-entity');
    this.kbImg.classList.add('keyboardRaycastable');
    this.kbImg.classList.add('superKeyboardImage');
    this.kbImg.addEventListener('raycaster-intersected', this.hover.bind(this));
    this.kbImg.addEventListener('raycaster-intersected-cleared', this.blur.bind(this));
    this.el.appendChild(this.kbImg);

    // Create label.
    this.label = document.createElement('a-entity');
    this.label.setAttribute('text', {
      align: 'center',
      font: this.data.font,
      baseline: 'bottom',
      lineHeight: 40,
      value: this.data.label,
      color: this.data.labelColor,
      width: this.data.width,
      wrapCount: 30});
    this.el.appendChild(this.label);

    // Create input.
    this.textInput = document.createElement('a-entity');
    this.textInput.setAttribute('text', {
      align: this.data.align,
      font: this.data.font,
      value: this.data.value,
      color: this.data.inputColor,
      width: this.data.width,
      wrapCount: 20
    });
    this.el.appendChild(this.textInput);

    this.cursor = document.createElement('a-entity');
    this.cursor.object3D.position.set(0, 0, 0.001);
    this.cursor.setAttribute('material', {shader: 'flat', color: this.data.inputColor});
    this.textInput.appendChild(this.cursor);
    this.cursorUpdated = false;

    this.keyBgColor = new THREE.Color();
    this.keyHoverColor = new THREE.Color();
    this.keyPressColor = new THREE.Color();

    var self = this;
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 't') {
        var ss = '';
        var s = 'abcdefghijklmopqrstuvQWIEUTGASDLIGKBXACQWETL102394676457';
        var l = Math.floor(Math.random() * 20);
        for (var i = 0; i < l; i++) ss += s[Math.floor(Math.random() * s.length)];
        self.el.setAttribute('super-keyboard', {value: ss});
      }
    });

    document.addEventListener('show', this.open.bind(this));

    this.hand = null;
    this.handListenersSet = false;
    this.raycaster = null;
  },

  update: function (oldData) {
    var kbdata = KEYBOARDS[this.data.model];
    var w = this.data.width;
    var h = this.data.width / 2;
    var w2 = w / 2;
    var h2 = h / 2;

    if (kbdata === undefined) {
      console.error('super-keyboard ERROR: model "' + this.data.model + '" undefined.');
      return;
    }

    if (!oldData || this.defaultValue !== oldData.defaultValue) {
      this.rawValue = this.data.value;
      this.defaultValue = this.data.value;
      this.updateTextInput(this.filter(this.data.value));
    } else {
      this.updateTextInput(this.filter(this.rawValue));
    }

    if (this.data.width !== oldData.width ||
        this.data.height !== oldData.height ||
        this.data.keyColor !== oldData.keyColor) {
      this.kbImg.setAttribute('geometry', {primitive: 'plane', width: w, height: h});
      this.kbImg.setAttribute('material', {
        shader: 'flat',
        src: this.data.imagePath + '/' + kbdata.img,
        color: this.data.keyColor,
        transparent: true
      });
    }

    if (this.data.label !== oldData.label ||
        this.data.labelColor !== oldData.labelColor ||
        this.data.width !== oldData.width) {
      this.label.setAttribute('text', {
        value: this.data.label, color: this.data.labelColor, width: this.data.width});
      this.label.object3D.position.set(0, 0.3 * w, -0.02);
    }

    if (this.data.width !== oldData.width ||
        this.data.keyBgColor !== oldData.keyBgColor) {
      this.initKeyColorPlane();
    }

    var inputx = this.data.align !== 'center' ? kbdata.inputOffsetX * w : 0;
    if (this.data.align === 'right') { inputx *= -1; }

    if (this.data.font !== oldData.font ||
        this.data.inputColor !== oldData.inputColor ||
        this.data.width !== oldData.width ||
        this.data.align !== oldData.align) {
      this.textInput.setAttribute('text', {
        font: this.data.font,
        color: this.data.inputColor,
        width: w,
        wrapCount: kbdata.wrapCount,
        align: this.data.align
      });
    }

    // Some hack where the inputRect is stored in the Insert key.
    for (var i = 0; i < kbdata.layout.length; i++) {
      var kdata = kbdata.layout[i];
      if (kdata.key === 'Insert') {
        this.inputRect = kdata;
      }
    }

    this.textInput.object3D.position.set(
      inputx,
      (w / 4) - (this.inputRect.y + this.inputRect.h / 2) * w / 2 + kbdata.inputOffsetY * w,
      0.002
    );

    if (this.data.width !== oldData.width) {
      this.cursor.setAttribute('geometry', {
        primitive: 'plane', width: 0.03 * w, height: 0.01 * w});
    }

    this.updateCursorPosition();
    this.setupHand();

    this.keyBgColor.set(this.data.keyBgColor);
    this.keyHoverColor.set(this.data.keyHoverColor);
    this.keyPressColor.set(this.data.keyPressColor);

    if (this.data.show) {
      this.open();
    } else {
      this.close();
    }
  },

  tick: function (time) {
    var intersection;

    if (this.prevCheckTime && (time - this.prevCheckTime < this.data.interval)) { return; }
    if (!this.prevCheckTime) {
      this.prevCheckTime = time;
      return;
    }
    if (!this.raycaster) { return; }
    if (!this.focused) { return; }

    intersection = this.raycaster.getIntersection(this.kbImg);
    if (!intersection) { return; }

    var uv = intersection.uv;
    var keys = KEYBOARDS[this.data.model].layout;
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (uv.x > k.x && uv.x < k.x + k.w && (1.0 - uv.y) > k.y && (1.0 - uv.y) < k.y + k.h) {
        if (this.keyHover !== k) {
          // Update key hover.
          this.keyHover = k;
          this.updateKeyColorPlane(this.keyHover.key, this.keyHoverColor);
        }
        break;
      }
    }
  },

  play: function () {
    if (!this.cursorUpdated) { return; }
    this.startBlinking();
  },

  pause: function () {
    this.stopBlinking();
  },

  /**
   * The plane for visual feedback when a key is hovered or clicked
   */
  initKeyColorPlane: function () {
    var keyColorPlane = this.keyColorPlane = document.createElement('a-entity');
    keyColorPlane.classList.add('superKeyboardKeyColorPlane');
    keyColorPlane.object3D.position.z = 0.001;
    keyColorPlane.object3D.visible = false;
    keyColorPlane.setAttribute('geometry', {primitive: 'plane'});
    keyColorPlane.setAttribute('material', {shader: 'flat', color: this.data.keyBgColor,
                                            transparent: true});
    keyColorPlane.addEventListener('componentinitialized', function (evt) {
      if (evt.detail.name !== 'material') { return; }
      this.getObject3D('mesh').material.blending = THREE.AdditiveBlending;
    });
    this.el.appendChild(keyColorPlane);
  },

  /**
   * Move key color plane to appropriate position, scale, and change color.
   */
  updateKeyColorPlane: function (key, color) {
    var kbdata = KEYBOARDS[this.data.model];
    var keyColorPlane = this.keyColorPlane;

    // Unset.
    if (!key) {
      keyColorPlane.object3D.visible = false;
      return;
    }

    for (var i = 0; i < kbdata.layout.length; i++) {
      var kdata = kbdata.layout[i];
      if (kdata.key !== key) { continue; }
      var w = this.data.width;
      var h = this.data.width / 2;
      var w2 = w / 2;
      var h2 = h / 2;
      var keyw = kdata.w * w;
      var keyh = kdata.h * h;
      // Size.
      keyColorPlane.object3D.scale.x = keyw;
      keyColorPlane.object3D.scale.y = keyh;
      // Position.
      keyColorPlane.object3D.position.x = kdata.x * w - w2 + keyw / 2;
      keyColorPlane.object3D.position.y = (1 - kdata.y) * h - h2 - keyh / 2;
      // Color.
      keyColorPlane.getObject3D('mesh').material.color.copy(color);
      break;
    }
    keyColorPlane.object3D.visible = true;
  },

  setupHand: function () {
    if (this.hand && this.hand.ownRaycaster) {
      this.hand.removeAttribute('raycaster');
    }
    if (this.data.hand) {
      this.hand = this.data.hand;
    } else {
      this.hand = document.querySelector([
        '[cursor]',
        '[vive-controls]',
        '[tracked-controls]',
        '[oculus-touch-controls]',
        '[windows-motion-controls]',
        '[hand-controls]',
        '[daydream-controls] [cursor] > [raycaster]'
      ].join(','));
    }

    if (!this.hand) {
      console.error('super-keyboard: no controller found. Add <a-entity> with controller or specify with super-keyboard="hand: #selectorToController".');
    } else {
      if (!this.hand.hasLoaded) {
        this.hand.addEventListener('loaded', this.setupHand.bind(this));
        return;
      }
      var raycaster = this.hand.components['raycaster'];
      var params = {};

      if (!raycaster) {
        this.hand.ownRaycaster = true;
        params.showLine = this.data.show;
        params.enabled = this.data.show;
        if (this.data.injectToRaycasterObjects) {
          params.objects = '.keyboardRaycastable';
        }
        this.hand.setAttribute('raycaster', params);
      } else {
        this.hand.ownRaycaster = false;
        if (this.data.injectToRaycasterObjects) {
          var objs = raycaster.data.objects.split(',');
          if (objs.indexOf('.keyboardRaycastable') === -1) {
            objs.push('.keyboardRaycastable');
          }
          params.objects = objs.join(',').replace(/^,/, '');
          this.hand.setAttribute('raycaster', params);
        }
      }

      this.raycaster = this.hand.components.raycaster;
    }
  },

  filter: function (str) {
    if (str === '') { return ''; }
    for (var i = 0; i < this.data.filters.length; i++) {
      switch (this.data.filters[i]) {
        case 'custom': {
          if (this.userFilterFunc) str = this.userFilterFunc(str);
          break;
        }
        case 'allupper': {
          str = str.toUpperCase();
          break;
        }
        case 'alllower': {
          str = str.toLowerCase();
          break;
        }
        case 'title': {
          str = str.split(' ').map(function (s) { return s[0].toUpperCase() + s.substr(1); }).join(' ');
          break;
        }
        case 'numbers': {
          str = str.split('').filter(function (c) { return !isNaN(parseInt(c)) || c === '.'; }).join('');
          break;
        }
        case 'first': {
          str = str[0].toUpperCase() + str.substr(1);
          break;
        }
        case 'trim': {
          str = str.trim();
          break;
        }
      }
    }
    return this.data.maxLength > 0 ? str.substr(0, this.data.maxLength) : str;
  },

  click: function (ev) {
    if (!this.keyHover) { return; }

    switch (this.keyHover.key) {
      case 'Enter': {
        this.accept();
        break;
      }
      case 'Insert': {
        return;
      }
      case 'Delete': {
        this.rawValue = this.rawValue.substr(0, this.rawValue.length - 1);
        var newValue = this.filter(this.rawValue);
        this.el.setAttribute('super-keyboard', 'value', newValue);
        this.updateTextInput(newValue);
        this.changeEventDetail.value = newValue;
        this.el.emit('superkeyboardchange', this.changeEventDetail);
        break;
      }
      case 'Shift': {
        this.shift = !this.shift;
        this.keyHover.el.setAttribute('material', 'color',
          this.shift ? this.data.keyHoverColor : this.data.keyBgColor
        );
        break;
      }
      case 'Escape': {
        this.dismiss();
        break;
      }
      default: {
        if (this.data.maxLength > 0 && this.rawValue.length > this.data.maxLength) { break; }
        this.rawValue += this.shift ? this.keyHover.key.toUpperCase() : this.keyHover.key;
        var newValue = this.filter(this.rawValue);
        this.el.setAttribute('super-keyboard', 'value', newValue);
        this.updateTextInput(newValue);
        this.changeEventDetail.value = newValue;
        this.el.emit('superkeyboardchange', this.changeEventDetail);
        break;
      }
    }

    this.updateKeyColorPlane(this.keyHover.key, this.keyPressColor);
    var self = this;
    setTimeout(function () {
      self.updateKeyColorPlane(self.keyHover.key, self.keyHoverColor);
    }, 100);
    this.updateCursorPosition();
  },

  open: function () {
    this.el.object3D.visible = true;
    if (this.hand && this.hand.ownRaycaster) {
      this.hand.setAttribute('raycaster', {showLine: true, enabled: true});
    }
  },

  close: function () {
    this.el.object3D.visible = false;
    if (this.hand && this.hand.ownRaycaster) {
      this.hand.setAttribute('raycaster', {showLine: false, enabled: false});
    }
  },

  accept: function () {
    this.el.object3D.visible = false;
    if (this.hand && this.hand.ownRaycaster) {
      this.hand.setAttribute('raycaster', {showLine: false, enabled: false});
    }
    this.el.emit('superkeyboardinput', {value: this.data.value});
    this.data.show = false;
  },

  dismiss: function () {
    this.data.value = this.defaultValue;
    this.updateTextInput();
    this.el.object3D.visible = false;
    if (this.hand && this.hand.ownRaycaster) {
      this.hand.setAttribute('raycaster', {showLine: false, enabled: false});
    }
    this.el.emit('superkeyboarddismiss');
    this.data.show = false;
  },

  blur: function (ev) {
    this.focused = false;
    if (this.keyHover && this.keyHover.key !== 'Shift') {
      this.updateKeyColorPlane(this.keyHover.key, this.keyBgColor);
    }
    this.keyHover = null;
  },

  hover: function (ev) {
    this.focused = true;
  },

  startBlinking: function () {
    this.stopBlinking();
    this.intervalId = window.setInterval(this.blink.bind(this), this.data.blinkingSpeed);
  },

  stopBlinking: function () {
    window.clearInterval(this.intervalId);
    this.intervalId = 0;
  },

  blink: function () {
    this.cursor.object3D.visible = !this.cursor.object3D.visible;
  },

  setCustomFilter: function (f) {
    this.userFilterFunc = f;
  },

  addCustomModel: function (name, model) {
    if (!name) { return; }
    KEYBOARDS[name] = model;
  },

  updateCursorPosition: function () {
    var font = this.textInput.components.text.currentFont;
    if (!font) {
      var self = this;
      this.cursor.object3D.visible = false;
      window.setTimeout(function () {
        self.updateCursorPosition();
        self.startBlinking();
      }, 700);
      return;
    }

    var w = this.data.width;
    var kbdata = KEYBOARDS[this.data.model];
    var posy = -this.inputRect.h / 2 * w / 2.4 + kbdata.inputOffsetY * w;
    var ratio = this.data.width / this.textInput.components.text.data.wrapCount;
    var pos = 0;
    var fontFactor = FontFactors[this.textInput.components.text.data.font];
    if (fontFactor === undefined) { fontFactor = 20; }
    for (var i = 0; i < this.data.value.length; i++) {
      var char = findFontChar(font.chars, this.data.value.charCodeAt(i));
      pos += char.width + char.xadvance * (char.id === 32 ? 2 : 1);
    }
    if (this.data.align === 'center') {
      pos = pos * ratio * fontFactor * 0.0011 / 2.0 + 0.02 * w;
    } else if (this.data.align === 'left') {
      pos = pos * ratio * fontFactor * 0.0011 + 0.02 * w;
      pos -= w / 2;
    } else if (this.data.align === 'right') {
      pos = -pos * ratio * fontFactor * 0.0011 - 0.02 * w;
      pos += w / 2;
    }
    this.cursor.object3D.position.set(pos, posy, 0.001);
    this.cursorUpdated = true;
  },

  updateTextInput: function (value) {
    this.textInputObject.value = value || this.data.value;
    this.textInput.setAttribute('text', this.textInputObject);
  }
});

function findFontChar (chars, code) {
  for (var i = 0; i < chars.length; i++) {
    if (chars[i].id === code) { return chars[i]; }
  }
  return null;
}


/***/ }),
/* 150 */
/***/ (function(module, exports) {

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

// Single audio context.
var context;

/**
 * Audio visualizer system for A-Frame. Share AnalyserNodes between components that share the
 * the `src`.
 */
AFRAME.registerSystem('audioanalyser', {
  init: function () {
    this.analysers = {};
  },

  getOrCreateAnalyser: function (data) {
    if (!context) {
      context = new AudioContext();
    }
    var analysers = this.analysers;
    var analyser = context.createAnalyser();
    var audioEl = data.src;
    var src = audioEl.getAttribute('src');

    if (analysers[src]) {
      return analysers[src];
    }

    var source = context.createMediaElementSource(audioEl);
    source.connect(analyser);
    analyser.connect(context.destination);
    analyser.smoothingTimeConstant = data.smoothingTimeConstant;
    analyser.fftSize = data.fftSize;

    // Store.
    analysers[src] = analyser;
    return analysers[src];
  }
});

/**
 * Audio visualizer component for A-Frame using AnalyserNode.
 */
AFRAME.registerComponent('audioanalyser', {
  schema: {
    enableBeatDetection: { default: true },
    enableLevels: { default: true },
    enableWaveform: { default: true },
    enableVolume: { default: true },
    fftSize: { default: 2048 },
    smoothingTimeConstant: { default: 0.8 },
    src: { type: 'selector' },
    unique: { default: false }
  },

  init: function () {
    this.analyser = null;
    this.levels = null;
    this.waveform = null;
    this.volume = 0;
  },

  update: function () {
    var data = this.data;
    var self = this;
    var system = this.system;

    if (!data.src) {
      return;
    }

    // Get or create AnalyserNode.
    if (data.unique) {
      init(system.createAnalyser(data));
    } else {
      init(system.getOrCreateAnalyser(data));
    }

    function init(analyser) {
      self.analyser = analyser;
      self.levels = new Uint8Array(self.analyser.frequencyBinCount);
      self.waveform = new Uint8Array(self.analyser.fftSize);
      self.el.emit('audioanalyser-ready', { analyser: analyser });
    }
  },

  /**
   * Update spectrum on each frame.
   */
  tick: function () {
    var data = this.data;
    if (!this.analyser) {
      return;
    }

    // Levels (frequency).
    if (data.enableLevels || data.enableVolume) {
      this.analyser.getByteFrequencyData(this.levels);
    }

    // Waveform.
    if (data.enableWaveform) {
      this.analyser.getByteTimeDomainData(this.waveform);
    }

    // Average volume.
    if (data.enableVolume || data.enableBeatDetection) {
      var sum = 0;
      for (var i = 0; i < this.levels.length; i++) {
        sum += this.levels[i];;
      }
      this.volume = sum / this.levels.length;
    }

    // Beat detection.
    if (data.enableBeatDetection) {
      var BEAT_DECAY_RATE = 0.99;
      var BEAT_HOLD = 60;
      var BEAT_MIN = 0.15; // Volume less than this is no beat.

      volume = this.volume;
      if (!this.beatCutOff) {
        this.beatCutOff = volume;
      }
      if (volume > this.beatCutOff && volume > BEAT_MIN) {
        console.log('[audioanalyser] Beat detected.');
        this.el.emit('audioanalyser-beat');
        this.beatCutOff = volume * 1.5;
        this.beatTime = 0;
      } else {
        if (this.beatTime <= BEAT_HOLD) {
          this.beatTime++;
        } else {
          this.beatCutOff *= BEAT_DECAY_RATE;
          this.beatCutOff = Math.max(this.beatCutOff, BEAT_MIN);
        }
      }
    }
  }
});

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(401);

__webpack_require__(408);

__webpack_require__(202);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./active-color.js": 172,
	"./analyzer.js": 173,
	"./beat-loader.js": 174,
	"./console-shortcuts.js": 175,
	"./cursor-mesh.js": 176,
	"./debug-controller.js": 177,
	"./debug-cursor.js": 178,
	"./hand-swapper.js": 179,
	"./history.js": 180,
	"./keyboard-raycastable.js": 181,
	"./logoflicker.js": 182,
	"./materials.js": 183,
	"./menu-difficulty-select.js": 184,
	"./menu-selected-challenge-image.js": 185,
	"./pauser.js": 186,
	"./play-sound.js": 187,
	"./preloader.js": 188,
	"./raycastable.js": 189,
	"./recenter.js": 190,
	"./saber-controls.js": 191,
	"./search.js": 192,
	"./song-preview.js": 193,
	"./song.js": 194,
	"./stage-colors.js": 195,
	"./text-uppercase.js": 196,
	"./toggle-pause-play.js": 197,
	"./twister.js": 198
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 152;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./index.js": 201
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 153;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Provides a decorator functor for annotating functions in Component definitions so that they are automatically
 * bound and unbound from events without needing to call el.addEventListener or el.removeEventListener yourself.
 *
 * Decorations should be made in the Components definition object. Here is the simplest example:
 *
 * const {bindEvent} = require('event-binder');
 *
 * AFRAME.registerComponent("foo", {
 *   componentchanged: bindEvent( function(evt) {
 *     console.log(evt.detail);
 *   })
 * })
 *
 * By default the function will be bound to events corresponding to its property name, in this case: 'componentchanged'.
 * It will listen for events on its parent element, and will begin listening or end listening when init or remove is
 * called. However this can also be configured by passing a configuration object:
 *
 * AFRAME.registerComponent("foo", {
 *   whenSceneLoads: bindEvent( {
 *     event: "loaded",    // Event to listen for. Defaults to functions propery name.
 *     target: "a-scene",  // Selector string for which element to listen on, defaults to this.el
 *     listenIn: "init",   // Which function addEventListener is called in, defaults to 'init'
 *     removeIn: "remove", // Which function removeEventListener is called in, defaults to 'remove'
 *   }, function(evt) {
 *     console.log(evt.detail);
 *   })
 * })
 *
 * Functions will only be bound to events when a new component is created. Decorating a function with bindEvent()
 * in a components init, or tick functions for example will have no effect.
 *
 * Don't bind to arrow functions because they don't have their own this.
 *
 */

const decorate = __webpack_require__(98).decorate;

// Implements the automatic binding and unbinding of the chosen function. Wraps its listenIn and removeIn
// functions to add and remove the event listener at the correct times.
function BindToEventDecorator(_event, _target, _listenIn, _removeIn) {
  return function(propertyName, func) {
    const scope = this;
    const event = _event || propertyName;
    const target = !_target ? this.el : document.querySelector(_target);
    if (!target) {
      console.warn("Couldn't subscribe "+this.name+"."+propertyName+" to "+event+" on "+_target
        +" because querySelector returned undefined.");
      return;
    }
    const listenIn = _listenIn || "init";
    const removeIn = _removeIn || "remove";

    const listenFunc = this[listenIn];
    const removeFunc = this[removeIn];
    const boundFunc = func.bind(this);
    
    this[listenIn] = function() {
      if (listenFunc !== undefined) {
        listenFunc.apply(scope, arguments);
      }
      target.addEventListener(event, boundFunc);
    }

    this[removeIn] = function() {
      if (removeFunc !== undefined) {
        removeFunc.apply(scope, arguments);
      }
      target.removeEventListener(event, boundFunc);
    }

    return func;
  }
}

/*
 * Decorates a function with configurations for automatically binding to an event.
 *
 * @param p1 - If this is a function it will be decorated with default options and p2 is ignored. Otherwise this can be
 *   an object which fine tunes the binding.
 * @param p2 - If p1 is an object then this will be the function to bind to.
 *
 * @returns {function} Decorated function which wraps the input function.
 */
function bindEvent(p1, p2) {
  if (typeof p1 === "function") {
    return decorate(p1, BindToEventDecorator());
  } else if (typeof p1 === "object" && typeof p2 === "function") {
    return decorate(p2, BindToEventDecorator(p1.event, p1.target, p1.listenIn, p1.removeIn));
  } else {
    throw new Error("bindEvent must take: (function), or a ([object], function)")
  }
}

/*
 * Convenience function, will always bind/unbind listener in play/pause function, rather than the default init/remove
 */
function bindEventPlayPause (p1, p2) {
  if (typeof p1 === "function") {
    return decorate(p1, BindToEventDecorator(undefined, undefined, "play", "pause"));
  } else if (typeof p1 === "object" && typeof p2 === "function") {
    return decorate(p2, BindToEventDecorator(p1.event, p1.target, "play", "pause"));
  } else {
    throw new Error("bindEventPlayPause must take: (function), or a ([object], function)")
  }
}

module.exports.bindEvent = bindEvent;
module.exports.bindEventPlayPause = bindEventPlayPause;

/***/ }),
/* 155 */
/***/ (function(module, exports) {

/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finger swipe

THREE.OrbitControls = function ( object, domElement ) {

	this.object = object;

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// Set to false to disable this control
	this.enabled = true;

	// "target" sets the location of focus, where the object orbits around
	this.target = new THREE.Vector3();

	// How far you can dolly in and out ( PerspectiveCamera only )
	this.minDistance = 0;
	this.maxDistance = Infinity;

	// How far you can zoom in and out ( OrthographicCamera only )
	this.minZoom = 0;
	this.maxZoom = Infinity;

	// How far you can orbit vertically, upper and lower limits.
	// Range is 0 to Math.PI radians.
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians

	// How far you can orbit horizontally, upper and lower limits.
	// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
	this.minAzimuthAngle = - Infinity; // radians
	this.maxAzimuthAngle = Infinity; // radians

	// Set to true to enable damping (inertia)
	// If damping is enabled, you must call controls.update() in your animation loop
	this.enableDamping = false;
	this.dampingFactor = 0.25;

	// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
	// Set to false to disable zooming
	this.enableZoom = true;
	this.zoomSpeed = 1.0;

	// Set to false to disable rotating
	this.enableRotate = true;
	this.rotateSpeed = 1.0;

	// Set to false to disable panning
	this.enablePan = true;
	this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

	// Set to true to automatically rotate around the target
	// If auto-rotate is enabled, you must call controls.update() in your animation loop
	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	// Set to false to disable use of the keys
	this.enableKeys = true;

	// The four arrow keys
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	// Mouse buttons
	this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

	// for reset
	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.zoom0 = this.object.zoom;

	//
	// public methods
	//

	this.getPolarAngle = function () {

		return spherical.phi;

	};

	this.getAzimuthalAngle = function () {

		return spherical.theta;

	};

	this.saveState = function () {

		scope.target0.copy( scope.target );
		scope.position0.copy( scope.object.position );
		scope.zoom0 = scope.object.zoom;

	};

	this.reset = function () {

		scope.target.copy( scope.target0 );
		scope.object.position.copy( scope.position0 );
		scope.object.zoom = scope.zoom0;

		scope.object.updateProjectionMatrix();
		scope.dispatchEvent( changeEvent );

		scope.update();

		state = STATE.NONE;

	};

	// this method is exposed, but perhaps it would be better if we can make it private...
	this.update = function () {

		var offset = new THREE.Vector3();

		// so camera.up is the orbit axis
		var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
		var quatInverse = quat.clone().inverse();

		var lastPosition = new THREE.Vector3();
		var lastQuaternion = new THREE.Quaternion();

		return function update() {

			var position = scope.object.position;

			offset.copy( position ).sub( scope.target );

			// rotate offset to "y-axis-is-up" space
			offset.applyQuaternion( quat );

			// angle from z-axis around y-axis
			spherical.setFromVector3( offset );

			if ( scope.autoRotate && state === STATE.NONE ) {

				rotateLeft( getAutoRotationAngle() );

			}

			spherical.theta += sphericalDelta.theta;
			spherical.phi += sphericalDelta.phi;

			// restrict theta to be between desired limits
			spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

			// restrict phi to be between desired limits
			spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

			spherical.makeSafe();


			spherical.radius *= scale;

			// restrict radius to be between desired limits
			spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

			// move target to panned location
			scope.target.add( panOffset );

			offset.setFromSpherical( spherical );

			// rotate offset back to "camera-up-vector-is-up" space
			offset.applyQuaternion( quatInverse );

			position.copy( scope.target ).add( offset );

			scope.object.lookAt( scope.target );

			if ( scope.enableDamping === true ) {

				sphericalDelta.theta *= ( 1 - scope.dampingFactor );
				sphericalDelta.phi *= ( 1 - scope.dampingFactor );

			} else {

				sphericalDelta.set( 0, 0, 0 );

			}

			scale = 1;
			panOffset.set( 0, 0, 0 );

			// update condition is:
			// min(camera displacement, camera rotation in radians)^2 > EPS
			// using small-angle approximation cos(x/2) = 1 - x^2 / 8

			if ( zoomChanged ||
				lastPosition.distanceToSquared( scope.object.position ) > EPS ||
				8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

				scope.dispatchEvent( changeEvent );

				lastPosition.copy( scope.object.position );
				lastQuaternion.copy( scope.object.quaternion );
				zoomChanged = false;

				return true;

			}

			return false;

		};

	}();

	this.dispose = function () {

		scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
		scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
		scope.domElement.removeEventListener( 'wheel', onMouseWheel, false );

		scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
		scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
		scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		window.removeEventListener( 'keydown', onKeyDown, false );

		//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

	};

	//
	// internals
	//

	var scope = this;

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };

	var STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

	var state = STATE.NONE;

	var EPS = 0.000001;

	// current position in spherical coordinates
	var spherical = new THREE.Spherical();
	var sphericalDelta = new THREE.Spherical();

	var scale = 1;
	var panOffset = new THREE.Vector3();
	var zoomChanged = false;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var panStart = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();

	var dollyStart = new THREE.Vector2();
	var dollyEnd = new THREE.Vector2();
	var dollyDelta = new THREE.Vector2();

	function getAutoRotationAngle() {

		return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

	}

	function getZoomScale() {

		return Math.pow( 0.95, scope.zoomSpeed );

	}

	function rotateLeft( angle ) {

		sphericalDelta.theta -= angle;

	}

	function rotateUp( angle ) {

		sphericalDelta.phi -= angle;

	}

	var panLeft = function () {

		var v = new THREE.Vector3();

		return function panLeft( distance, objectMatrix ) {

			v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
			v.multiplyScalar( - distance );

			panOffset.add( v );

		};

	}();

	var panUp = function () {

		var v = new THREE.Vector3();

		return function panUp( distance, objectMatrix ) {

			v.setFromMatrixColumn( objectMatrix, 1 ); // get Y column of objectMatrix
			v.multiplyScalar( distance );

			panOffset.add( v );

		};

	}();

	// deltaX and deltaY are in pixels; right and down are positive
	var pan = function () {

		var offset = new THREE.Vector3();

		return function pan( deltaX, deltaY ) {

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			if ( scope.object.isPerspectiveCamera ) {

				// perspective
				var position = scope.object.position;
				offset.copy( position ).sub( scope.target );
				var targetDistance = offset.length();

				// half of the fov is center to top of screen
				targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

				// we actually don't use screenWidth, since perspective camera is fixed to screen height
				panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
				panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

			} else if ( scope.object.isOrthographicCamera ) {

				// orthographic
				panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
				panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

			} else {

				// camera neither orthographic nor perspective
				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
				scope.enablePan = false;

			}

		};

	}();

	function dollyIn( dollyScale ) {

		if ( scope.object.isPerspectiveCamera ) {

			scale /= dollyScale;

		} else if ( scope.object.isOrthographicCamera ) {

			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
			scope.object.updateProjectionMatrix();
			zoomChanged = true;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			scope.enableZoom = false;

		}

	}

	function dollyOut( dollyScale ) {

		if ( scope.object.isPerspectiveCamera ) {

			scale *= dollyScale;

		} else if ( scope.object.isOrthographicCamera ) {

			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
			scope.object.updateProjectionMatrix();
			zoomChanged = true;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			scope.enableZoom = false;

		}

	}

	//
	// event callbacks - update the object state
	//

	function handleMouseDownRotate( event ) {

		//console.log( 'handleMouseDownRotate' );

		rotateStart.set( event.clientX, event.clientY );

	}

	function handleMouseDownDolly( event ) {

		//console.log( 'handleMouseDownDolly' );

		dollyStart.set( event.clientX, event.clientY );

	}

	function handleMouseDownPan( event ) {

		//console.log( 'handleMouseDownPan' );

		panStart.set( event.clientX, event.clientY );

	}

	function handleMouseMoveRotate( event ) {

		//console.log( 'handleMouseMoveRotate' );

		rotateEnd.set( event.clientX, event.clientY );
		rotateDelta.subVectors( rotateEnd, rotateStart );

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		// rotating across whole screen goes 360 degrees around
		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

		// rotating up and down along whole screen attempts to go 360, but limited to 180
		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

		rotateStart.copy( rotateEnd );

		scope.update();

	}

	function handleMouseMoveDolly( event ) {

		//console.log( 'handleMouseMoveDolly' );

		dollyEnd.set( event.clientX, event.clientY );

		dollyDelta.subVectors( dollyEnd, dollyStart );

		if ( dollyDelta.y > 0 ) {

			dollyIn( getZoomScale() );

		} else if ( dollyDelta.y < 0 ) {

			dollyOut( getZoomScale() );

		}

		dollyStart.copy( dollyEnd );

		scope.update();

	}

	function handleMouseMovePan( event ) {

		//console.log( 'handleMouseMovePan' );

		panEnd.set( event.clientX, event.clientY );

		panDelta.subVectors( panEnd, panStart );

		pan( panDelta.x, panDelta.y );

		panStart.copy( panEnd );

		scope.update();

	}

	function handleMouseUp( event ) {

		// console.log( 'handleMouseUp' );

	}

	function handleMouseWheel( event ) {

		// console.log( 'handleMouseWheel' );

		if ( event.deltaY < 0 ) {

			dollyOut( getZoomScale() );

		} else if ( event.deltaY > 0 ) {

			dollyIn( getZoomScale() );

		}

		scope.update();

	}

	function handleKeyDown( event ) {

		//console.log( 'handleKeyDown' );

		switch ( event.keyCode ) {

			case scope.keys.UP:
				pan( 0, scope.keyPanSpeed );
				scope.update();
				break;

			case scope.keys.BOTTOM:
				pan( 0, - scope.keyPanSpeed );
				scope.update();
				break;

			case scope.keys.LEFT:
				pan( scope.keyPanSpeed, 0 );
				scope.update();
				break;

			case scope.keys.RIGHT:
				pan( - scope.keyPanSpeed, 0 );
				scope.update();
				break;

		}

	}

	function handleTouchStartRotate( event ) {

		//console.log( 'handleTouchStartRotate' );

		rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

	}

	function handleTouchStartDolly( event ) {

		//console.log( 'handleTouchStartDolly' );

		var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
		var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

		var distance = Math.sqrt( dx * dx + dy * dy );

		dollyStart.set( 0, distance );

	}

	function handleTouchStartPan( event ) {

		//console.log( 'handleTouchStartPan' );

		panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

	}

	function handleTouchMoveRotate( event ) {

		//console.log( 'handleTouchMoveRotate' );

		rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
		rotateDelta.subVectors( rotateEnd, rotateStart );

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		// rotating across whole screen goes 360 degrees around
		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

		// rotating up and down along whole screen attempts to go 360, but limited to 180
		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

		rotateStart.copy( rotateEnd );

		scope.update();

	}

	function handleTouchMoveDolly( event ) {

		//console.log( 'handleTouchMoveDolly' );

		var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
		var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

		var distance = Math.sqrt( dx * dx + dy * dy );

		dollyEnd.set( 0, distance );

		dollyDelta.subVectors( dollyEnd, dollyStart );

		if ( dollyDelta.y > 0 ) {

			dollyOut( getZoomScale() );

		} else if ( dollyDelta.y < 0 ) {

			dollyIn( getZoomScale() );

		}

		dollyStart.copy( dollyEnd );

		scope.update();

	}

	function handleTouchMovePan( event ) {

		//console.log( 'handleTouchMovePan' );

		panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

		panDelta.subVectors( panEnd, panStart );

		pan( panDelta.x, panDelta.y );

		panStart.copy( panEnd );

		scope.update();

	}

	function handleTouchEnd( event ) {

		//console.log( 'handleTouchEnd' );

	}

	//
	// event handlers - FSM: listen for events and reset state
	//

	function onMouseDown( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		switch ( event.button ) {

			case scope.mouseButtons.ORBIT:

				if ( scope.enableRotate === false ) return;

				handleMouseDownRotate( event );

				state = STATE.ROTATE;

				break;

			case scope.mouseButtons.ZOOM:

				if ( scope.enableZoom === false ) return;

				handleMouseDownDolly( event );

				state = STATE.DOLLY;

				break;

			case scope.mouseButtons.PAN:

				if ( scope.enablePan === false ) return;

				handleMouseDownPan( event );

				state = STATE.PAN;

				break;

		}

		if ( state !== STATE.NONE ) {

			document.addEventListener( 'mousemove', onMouseMove, false );
			document.addEventListener( 'mouseup', onMouseUp, false );

			scope.dispatchEvent( startEvent );

		}

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		switch ( state ) {

			case STATE.ROTATE:

				if ( scope.enableRotate === false ) return;

				handleMouseMoveRotate( event );

				break;

			case STATE.DOLLY:

				if ( scope.enableZoom === false ) return;

				handleMouseMoveDolly( event );

				break;

			case STATE.PAN:

				if ( scope.enablePan === false ) return;

				handleMouseMovePan( event );

				break;

		}

	}

	function onMouseUp( event ) {

		if ( scope.enabled === false ) return;

		handleMouseUp( event );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}

	function onMouseWheel( event ) {

		if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;

		event.preventDefault();
		event.stopPropagation();

		scope.dispatchEvent( startEvent );

		handleMouseWheel( event );

		scope.dispatchEvent( endEvent );

	}

	function onKeyDown( event ) {

		if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;

		handleKeyDown( event );

	}

	function onTouchStart( event ) {

		if ( scope.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:	// one-fingered touch: rotate

				if ( scope.enableRotate === false ) return;

				handleTouchStartRotate( event );

				state = STATE.TOUCH_ROTATE;

				break;

			case 2:	// two-fingered touch: dolly

				if ( scope.enableZoom === false ) return;

				handleTouchStartDolly( event );

				state = STATE.TOUCH_DOLLY;

				break;

			case 3: // three-fingered touch: pan

				if ( scope.enablePan === false ) return;

				handleTouchStartPan( event );

				state = STATE.TOUCH_PAN;

				break;

			default:

				state = STATE.NONE;

		}

		if ( state !== STATE.NONE ) {

			scope.dispatchEvent( startEvent );

		}

	}

	function onTouchMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {

			case 1: // one-fingered touch: rotate

				if ( scope.enableRotate === false ) return;
				if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?...

				handleTouchMoveRotate( event );

				break;

			case 2: // two-fingered touch: dolly

				if ( scope.enableZoom === false ) return;
				if ( state !== STATE.TOUCH_DOLLY ) return; // is this needed?...

				handleTouchMoveDolly( event );

				break;

			case 3: // three-fingered touch: pan

				if ( scope.enablePan === false ) return;
				if ( state !== STATE.TOUCH_PAN ) return; // is this needed?...

				handleTouchMovePan( event );

				break;

			default:

				state = STATE.NONE;

		}

	}

	function onTouchEnd( event ) {

		if ( scope.enabled === false ) return;

		handleTouchEnd( event );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}

	function onContextMenu( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

	}

	//

	scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );

	scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
	scope.domElement.addEventListener( 'wheel', onMouseWheel, false );

	scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
	scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
	scope.domElement.addEventListener( 'touchmove', onTouchMove, false );

	window.addEventListener( 'keydown', onKeyDown, false );

	// force an update at start

	this.update();

};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

Object.defineProperties( THREE.OrbitControls.prototype, {

	center: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .center has been renamed to .target' );
			return this.target;

		}

	},

	// backward compatibility

	noZoom: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
			return ! this.enableZoom;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
			this.enableZoom = ! value;

		}

	},

	noRotate: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
			return ! this.enableRotate;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
			this.enableRotate = ! value;

		}

	},

	noPan: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
			return ! this.enablePan;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
			this.enablePan = ! value;

		}

	},

	noKeys: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
			return ! this.enableKeys;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
			this.enableKeys = ! value;

		}

	},

	staticMoving: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
			return ! this.enableDamping;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
			this.enableDamping = ! value;

		}

	},

	dynamicDampingFactor: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
			return this.dampingFactor;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
			this.dampingFactor = value;

		}

	}

} );


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* shader-particle-engine 1.0.5
 * 
 * (c) 2015 Luke Moody (http://www.github.com/squarefeet)
 *     Originally based on Lee Stemkoski's original work (https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/js/ParticleEngine.js).
 *
 * shader-particle-engine may be freely distributed under the MIT license (See LICENSE at root of this repository.)
 */
/**
 * @typedef {Number} distribution
 * @property {Number} SPE.distributions.BOX Values will be distributed within a box.
 * @property {Number} SPE.distributions.SPHERE Values will be distributed within a sphere.
 * @property {Number} SPE.distributions.DISC Values will be distributed within a 2D disc.
 */

/**
 * Namespace for Shader Particle Engine.
 *
 * All SPE-related code sits under this namespace.
 *
 * @type {Object}
 * @namespace
 */
var SPE = {

    /**
     * A map of supported distribution types used
     * by SPE.Emitter instances.
     *
     * These distribution types can be applied to
     * an emitter globally, which will affect the
     * `position`, `velocity`, and `acceleration`
     * value calculations for an emitter, or they
     * can be applied on a per-property basis.
     *
     * @enum {Number}
     */
    distributions: {
        /**
         * Values will be distributed within a box.
         * @type {Number}
         */
        BOX: 1,

        /**
         * Values will be distributed on a sphere.
         * @type {Number}
         */
        SPHERE: 2,

        /**
         * Values will be distributed on a 2d-disc shape.
         * @type {Number}
         */
        DISC: 3,
    },


    /**
     * Set this value to however many 'steps' you
     * want value-over-lifetime properties to have.
     *
     * It's adjustable to fix an interpolation problem:
     *
     * Assuming you specify an opacity value as [0, 1, 0]
     *      and the `valueOverLifetimeLength` is 4, then the
     *      opacity value array will be reinterpolated to
     *      be [0, 0.66, 0.66, 0].
     *   This isn't ideal, as particles would never reach
     *   full opacity.
     *
     * NOTE:
     *     This property affects the length of ALL
     *       value-over-lifetime properties for ALL
     *       emitters and ALL groups.
     *
     *     Only values >= 3 && <= 4 are allowed.
     *
     * @type {Number}
     */
    valueOverLifetimeLength: 4
};

// Module loader support:
if ( true ) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (SPE),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
else if ( typeof exports !== 'undefined' && typeof module !== 'undefined' ) {
    module.exports = SPE;
}

/**
 * A helper class for TypedArrays.
 *
 * Allows for easy resizing, assignment of various component-based
 * types (Vector2s, Vector3s, Vector4s, Mat3s, Mat4s),
 * as well as Colors (where components are `r`, `g`, `b`),
 * Numbers, and setting from other TypedArrays.
 *
 * @author Luke Moody
 * @constructor
 * @param {Function} TypedArrayConstructor The constructor to use (Float32Array, Uint8Array, etc.)
 * @param {Number} size                 The size of the array to create
 * @param {Number} componentSize        The number of components per-value (ie. 3 for a vec3, 9 for a Mat3, etc.)
 * @param {Number} indexOffset          The index in the array from which to start assigning values. Default `0` if none provided
 */
SPE.TypedArrayHelper = function( TypedArrayConstructor, size, componentSize, indexOffset ) {
    'use strict';

    this.componentSize = componentSize || 1;
    this.size = ( size || 1 );
    this.TypedArrayConstructor = TypedArrayConstructor || Float32Array;
    this.array = new TypedArrayConstructor( size * this.componentSize );
    this.indexOffset = indexOffset || 0;
};

SPE.TypedArrayHelper.constructor = SPE.TypedArrayHelper;

/**
 * Sets the size of the internal array.
 *
 * Delegates to `this.shrink` or `this.grow` depending on size
 * argument's relation to the current size of the internal array.
 *
 * Note that if the array is to be shrunk, data will be lost.
 *
 * @param {Number} size The new size of the array.
 */
SPE.TypedArrayHelper.prototype.setSize = function( size, noComponentMultiply ) {
    'use strict';

    var currentArraySize = this.array.length;

    if ( !noComponentMultiply ) {
        size = size * this.componentSize;
    }

    if ( size < currentArraySize ) {
        return this.shrink( size );
    }
    else if ( size > currentArraySize ) {
        return this.grow( size );
    }
    else {
        console.info( 'TypedArray is already of size:', size + '.', 'Will not resize.' );
    }
};

/**
 * Shrinks the internal array.
 *
 * @param  {Number} size The new size of the typed array. Must be smaller than `this.array.length`.
 * @return {SPE.TypedArrayHelper}      Instance of this class.
 */
SPE.TypedArrayHelper.prototype.shrink = function( size ) {
    'use strict';

    this.array = this.array.subarray( 0, size );
    this.size = size;
    return this;
};

/**
 * Grows the internal array.
 * @param  {Number} size The new size of the typed array. Must be larger than `this.array.length`.
 * @return {SPE.TypedArrayHelper}      Instance of this class.
 */
SPE.TypedArrayHelper.prototype.grow = function( size ) {
    'use strict';

    var existingArray = this.array,
        newArray = new this.TypedArrayConstructor( size );

    newArray.set( existingArray );
    this.array = newArray;
    this.size = size;

    return this;
};


/**
 * Perform a splice operation on this array's buffer.
 * @param  {Number} start The start index of the splice. Will be multiplied by the number of components for this attribute.
 * @param  {Number} end The end index of the splice. Will be multiplied by the number of components for this attribute.
 * @returns {Object} The SPE.TypedArrayHelper instance.
 */
SPE.TypedArrayHelper.prototype.splice = function( start, end ) {
    'use strict';
    start *= this.componentSize;
    end *= this.componentSize;

    var data = [],
        array = this.array,
        size = array.length;

    for ( var i = 0; i < size; ++i ) {
        if ( i < start || i >= end ) {
            data.push( array[ i ] );
        }
        // array[ i ] = 0;
    }

    this.setFromArray( 0, data );

    return this;
};


/**
 * Copies from the given TypedArray into this one, using the index argument
 * as the start position. Alias for `TypedArray.set`. Will automatically resize
 * if the given source array is of a larger size than the internal array.
 *
 * @param {Number} index      The start position from which to copy into this array.
 * @param {TypedArray} array The array from which to copy; the source array.
 * @return {SPE.TypedArrayHelper} Instance of this class.
 */
SPE.TypedArrayHelper.prototype.setFromArray = function( index, array ) {
    'use strict';

    var sourceArraySize = array.length,
        newSize = index + sourceArraySize;

    if ( newSize > this.array.length ) {
        this.grow( newSize );
    }
    else if ( newSize < this.array.length ) {
        this.shrink( newSize );
    }

    this.array.set( array, this.indexOffset + index );

    return this;
};

/**
 * Set a Vector2 value at `index`.
 *
 * @param {Number} index The index at which to set the vec2 values from.
 * @param {Vector2} vec2  Any object that has `x` and `y` properties.
 * @return {SPE.TypedArrayHelper} Instance of this class.
 */
SPE.TypedArrayHelper.prototype.setVec2 = function( index, vec2 ) {
    'use strict';

    return this.setVec2Components( index, vec2.x, vec2.y );
};

/**
 * Set a Vector2 value using raw components.
 *
 * @param {Number} index The index at which to set the vec2 values from.
 * @param {Number} x     The Vec2's `x` component.
 * @param {Number} y     The Vec2's `y` component.
 * @return {SPE.TypedArrayHelper} Instance of this class.
 */
SPE.TypedArrayHelper.prototype.setVec2Components = function( index, x, y ) {
    'use strict';

    var array = this.array,
        i = this.indexOffset + ( index * this.componentSize );

    array[ i ] = x;
    array[ i + 1 ] = y;
    return this;
};

/**
 * Set a Vector3 value at `index`.
 *
 * @param {Number} index The index at which to set the vec3 values from.
 * @param {Vector3} vec2  Any object that has `x`, `y`, and `z` properties.
 * @return {SPE.TypedArrayHelper} Instance of this class.
 */
SPE.TypedArrayHelper.prototype.setVec3 = function( index, vec3 ) {
    'use strict';

    return this.setVec3Components( index, vec3.x, vec3.y, vec3.z );
};

/**
 * Set a Vector3 value using raw components.
 *
 * @param {Number} index The index at which to set the vec3 values from.
 * @param {Number} x     The Vec3's `x` component.
 * @param {Number} y     The Vec3's `y` component.
 * @param {Number} z     The Vec3's `z` component.
 * @return {SPE.TypedArrayHelper} Instance of this class.
 */
SPE.TypedArrayHelper.prototype.setVec3Components = function( index, x, y, z ) {
    'use strict';

    var array = this.array,
        i = this.indexOffset + ( index * this.componentSize );

    array[ i ] = x;
    array[ i + 1 ] = y;
    array[ i + 2 ] = z;
    return this;
};

/**
 * Set a Vector4 value at `index`.
 *
 * @param {Number} index The index at which to set the vec4 values from.
 * @param {Vector4} vec2  Any object that has `x`, `y`, `z`, and `w` properties.
 * @return {SPE.TypedArrayHelper} Instance of this class.
 */
SPE.TypedArrayHelper.prototype.setVec4 = function( index, vec4 ) {
    'use strict';

    return this.setVec4Components( index, vec4.x, vec4.y, vec4.z, vec4.w );
};

/**
 * Set a Vector4 value using raw components.
 *
 * @param {Number} index The index at which to set the vec4 values from.
 * @param {Number} x     The Vec4's `x` component.
 * @param {Number} y     The Vec4's `y` component.
 * @param {Number} z     The Vec4's `z` component.
 * @param {Number} w     The Vec4's `w` component.
 * @return {SPE.TypedArrayHelper} Instance of this class.
 */
SPE.TypedArrayHelper.prototype.setVec4Components = function( index, x, y, z, w ) {
    'use strict';

    var array = this.array,
        i = this.indexOffset + ( index * this.componentSize );

    array[ i ] = x;
    array[ i + 1 ] = y;
    array[ i + 2 ] = z;
    array[ i + 3 ] = w;
    return this;
};

/**
 * Set a Matrix3 value at `index`.
 *
 * @param {Number} index The index at which to set the matrix values from.
 * @param {Matrix3} mat3 The 3x3 matrix to set from. Must have a TypedArray property named `elements` to copy from.
 * @return {SPE.TypedArrayHelper} Instance of this class.
 */
SPE.TypedArrayHelper.prototype.setMat3 = function( index, mat3 ) {
    'use strict';

    return this.setFromArray( this.indexOffset + ( index * this.componentSize ), mat3.elements );
};

/**
 * Set a Matrix4 value at `index`.
 *
 * @param {Number} index The index at which to set the matrix values from.
 * @param {Matrix4} mat3 The 4x4 matrix to set from. Must have a TypedArray property named `elements` to copy from.
 * @return {SPE.TypedArrayHelper} Instance of this class.
 */
SPE.TypedArrayHelper.prototype.setMat4 = function( index, mat4 ) {
    'use strict';

    return this.setFromArray( this.indexOffset + ( index * this.componentSize ), mat4.elements );
};

/**
 * Set a Color value at `index`.
 *
 * @param {Number} index The index at which to set the vec3 values from.
 * @param {Color} color  Any object that has `r`, `g`, and `b` properties.
 * @return {SPE.TypedArrayHelper} Instance of this class.
 */
SPE.TypedArrayHelper.prototype.setColor = function( index, color ) {
    'use strict';

    return this.setVec3Components( index, color.r, color.g, color.b );
};

/**
 * Set a Number value at `index`.
 *
 * @param {Number} index The index at which to set the vec3 values from.
 * @param {Number} numericValue  The number to assign to this index in the array.
 * @return {SPE.TypedArrayHelper} Instance of this class.
 */
SPE.TypedArrayHelper.prototype.setNumber = function( index, numericValue ) {
    'use strict';

    this.array[ this.indexOffset + ( index * this.componentSize ) ] = numericValue;
    return this;
};

/**
 * Returns the value of the array at the given index, taking into account
 * the `indexOffset` property of this class.
 *
 * Note that this function ignores the component size and will just return a
 * single value.
 *
 * @param  {Number} index The index in the array to fetch.
 * @return {Number}       The value at the given index.
 */
SPE.TypedArrayHelper.prototype.getValueAtIndex = function( index ) {
    'use strict';

    return this.array[ this.indexOffset + index ];
};

/**
 * Returns the component value of the array at the given index, taking into account
 * the `indexOffset` property of this class.
 *
 * If the componentSize is set to 3, then it will return a new TypedArray
 * of length 3.
 *
 * @param  {Number} index The index in the array to fetch.
 * @return {TypedArray}       The component value at the given index.
 */
SPE.TypedArrayHelper.prototype.getComponentValueAtIndex = function( index ) {
    'use strict';

    return this.array.subarray( this.indexOffset + ( index * this.componentSize ) );
};

/**
 * A helper to handle creating and updating a THREE.BufferAttribute instance.
 *
 * @author  Luke Moody
 * @constructor
 * @param {String} type          The buffer attribute type. See SPE.ShaderAttribute.typeSizeMap for valid values.
 * @param {Boolean=} dynamicBuffer Whether this buffer attribute should be marked as dynamic or not.
 * @param {Function=} arrayType     A reference to a TypedArray constructor. Defaults to Float32Array if none provided.
 */
SPE.ShaderAttribute = function( type, dynamicBuffer, arrayType ) {
    'use strict';

    var typeMap = SPE.ShaderAttribute.typeSizeMap;

    this.type = typeof type === 'string' && typeMap.hasOwnProperty( type ) ? type : 'f';
    this.componentSize = typeMap[ this.type ];
    this.arrayType = arrayType || Float32Array;
    this.typedArray = null;
    this.bufferAttribute = null;
    this.dynamicBuffer = !!dynamicBuffer;

    this.updateMin = 0;
    this.updateMax = 0;
};

SPE.ShaderAttribute.constructor = SPE.ShaderAttribute;

/**
 * A map of uniform types to their component size.
 * @enum {Number}
 */
SPE.ShaderAttribute.typeSizeMap = {
    /**
     * Float
     * @type {Number}
     */
    f: 1,

    /**
     * Vec2
     * @type {Number}
     */
    v2: 2,

    /**
     * Vec3
     * @type {Number}
     */
    v3: 3,

    /**
     * Vec4
     * @type {Number}
     */
    v4: 4,

    /**
     * Color
     * @type {Number}
     */
    c: 3,

    /**
     * Mat3
     * @type {Number}
     */
    m3: 9,

    /**
     * Mat4
     * @type {Number}
     */
    m4: 16
};

/**
 * Calculate the minimum and maximum update range for this buffer attribute using
 * component size independant min and max values.
 *
 * @param {Number} min The start of the range to mark as needing an update.
 * @param {Number} max The end of the range to mark as needing an update.
 */
SPE.ShaderAttribute.prototype.setUpdateRange = function( min, max ) {
    'use strict';

    this.updateMin = Math.min( min * this.componentSize, this.updateMin * this.componentSize );
    this.updateMax = Math.max( max * this.componentSize, this.updateMax * this.componentSize );
};

/**
 * Calculate the number of indices that this attribute should mark as needing
 * updating. Also marks the attribute as needing an update.
 */
SPE.ShaderAttribute.prototype.flagUpdate = function() {
    'use strict';

    var attr = this.bufferAttribute,
        range = attr.updateRange;

    range.offset = this.updateMin;
    range.count = Math.min( ( this.updateMax - this.updateMin ) + this.componentSize, this.typedArray.array.length );
    // console.log( range.offset, range.count, this.typedArray.array.length );
    // console.log( 'flagUpdate:', range.offset, range.count );
    attr.needsUpdate = true;
};



/**
 * Reset the index update counts for this attribute
 */
SPE.ShaderAttribute.prototype.resetUpdateRange = function() {
    'use strict';

    this.updateMin = 0;
    this.updateMax = 0;
};

SPE.ShaderAttribute.prototype.resetDynamic = function() {
    'use strict';
    this.bufferAttribute.dynamic = this.dynamicBuffer;
};

/**
 * Perform a splice operation on this attribute's buffer.
 * @param  {Number} start The start index of the splice. Will be multiplied by the number of components for this attribute.
 * @param  {Number} end The end index of the splice. Will be multiplied by the number of components for this attribute.
 */
SPE.ShaderAttribute.prototype.splice = function( start, end ) {
    'use strict';

    this.typedArray.splice( start, end );

    // Reset the reference to the attribute's typed array
    // since it has probably changed.
    this.forceUpdateAll();
};

SPE.ShaderAttribute.prototype.forceUpdateAll = function() {
    'use strict';

    this.bufferAttribute.array = this.typedArray.array;
    this.bufferAttribute.updateRange.offset = 0;
    this.bufferAttribute.updateRange.count = -1;
    this.bufferAttribute.dynamic = false;
    this.bufferAttribute.needsUpdate = true;
};

/**
 * Make sure this attribute has a typed array associated with it.
 *
 * If it does, then it will ensure the typed array is of the correct size.
 *
 * If not, a new SPE.TypedArrayHelper instance will be created.
 *
 * @param  {Number} size The size of the typed array to create or update to.
 */
SPE.ShaderAttribute.prototype._ensureTypedArray = function( size ) {
    'use strict';

    // Condition that's most likely to be true at the top: no change.
    if ( this.typedArray !== null && this.typedArray.size === size * this.componentSize ) {
        return;
    }

    // Resize the array if we need to, telling the TypedArrayHelper to
    // ignore it's component size when evaluating size.
    else if ( this.typedArray !== null && this.typedArray.size !== size ) {
        this.typedArray.setSize( size );
    }

    // This condition should only occur once in an attribute's lifecycle.
    else if ( this.typedArray === null ) {
        this.typedArray = new SPE.TypedArrayHelper( this.arrayType, size, this.componentSize );
    }
};


/**
 * Creates a THREE.BufferAttribute instance if one doesn't exist already.
 *
 * Ensures a typed array is present by calling _ensureTypedArray() first.
 *
 * If a buffer attribute exists already, then it will be marked as needing an update.
 *
 * @param  {Number} size The size of the typed array to create if one doesn't exist, or resize existing array to.
 */
SPE.ShaderAttribute.prototype._createBufferAttribute = function( size ) {
    'use strict';

    // Make sure the typedArray is present and correct.
    this._ensureTypedArray( size );

    // Don't create it if it already exists, but do
    // flag that it needs updating on the next render
    // cycle.
    if ( this.bufferAttribute !== null ) {
        this.bufferAttribute.array = this.typedArray.array;
        this.bufferAttribute.needsUpdate = true;
        return;
    }

    this.bufferAttribute = new THREE.BufferAttribute( this.typedArray.array, this.componentSize );
    this.bufferAttribute.dynamic = this.dynamicBuffer;
};

/**
 * Returns the length of the typed array associated with this attribute.
 * @return {Number} The length of the typed array. Will be 0 if no typed array has been created yet.
 */
SPE.ShaderAttribute.prototype.getLength = function() {
    'use strict';

    if ( this.typedArray === null ) {
        return 0;
    }

    return this.typedArray.array.length;
};

SPE.shaderChunks = {
    // Register color-packing define statements.
    defines: [
        '#define PACKED_COLOR_SIZE 256.0',
        '#define PACKED_COLOR_DIVISOR 255.0'
    ].join( '\n' ),

    // All uniforms used by vertex / fragment shaders
    uniforms: [
        'uniform float deltaTime;',
        'uniform float runTime;',
        'uniform sampler2D texture;',
        'uniform vec4 textureAnimation;',
        'uniform float scale;',
    ].join( '\n' ),

    // All attributes used by the vertex shader.
    //
    // Note that some attributes are squashed into other ones:
    //
    // * Drag is acceleration.w
    attributes: [
        'attribute vec4 acceleration;',
        'attribute vec3 velocity;',
        'attribute vec4 rotation;',
        'attribute vec3 rotationCenter;',
        'attribute vec4 params;',
        'attribute vec4 size;',
        'attribute vec4 angle;',
        'attribute vec4 color;',
        'attribute vec4 opacity;'
    ].join( '\n' ),

    //
    varyings: [
        'varying vec4 vColor;',
        '#ifdef SHOULD_ROTATE_TEXTURE',
        '    varying float vAngle;',
        '#endif',

        '#ifdef SHOULD_CALCULATE_SPRITE',
        '    varying vec4 vSpriteSheet;',
        '#endif'
    ].join( '\n' ),


    // Branch-avoiding comparison fns
    // - http://theorangeduck.com/page/avoiding-shader-conditionals
    branchAvoidanceFunctions: [
        'float when_gt(float x, float y) {',
        '    return max(sign(x - y), 0.0);',
        '}',

        'float when_lt(float x, float y) {',
        '    return min( max(1.0 - sign(x - y), 0.0), 1.0 );',
        '}',

        'float when_eq( float x, float y ) {',
        '    return 1.0 - abs( sign( x - y ) );',
        '}',

        'float when_ge(float x, float y) {',
        '  return 1.0 - when_lt(x, y);',
        '}',

        'float when_le(float x, float y) {',
        '  return 1.0 - when_gt(x, y);',
        '}',

        // Branch-avoiding logical operators
        // (to be used with above comparison fns)
        'float and(float a, float b) {',
        '    return a * b;',
        '}',

        'float or(float a, float b) {',
        '    return min(a + b, 1.0);',
        '}',
    ].join( '\n' ),


    // From:
    // - http://stackoverflow.com/a/12553149
    // - https://stackoverflow.com/questions/22895237/hexadecimal-to-rgb-values-in-webgl-shader
    unpackColor: [
        'vec3 unpackColor( in float hex ) {',
        '   vec3 c = vec3( 0.0 );',

        '   float r = mod( (hex / PACKED_COLOR_SIZE / PACKED_COLOR_SIZE), PACKED_COLOR_SIZE );',
        '   float g = mod( (hex / PACKED_COLOR_SIZE), PACKED_COLOR_SIZE );',
        '   float b = mod( hex, PACKED_COLOR_SIZE );',

        '   c.r = r / PACKED_COLOR_DIVISOR;',
        '   c.g = g / PACKED_COLOR_DIVISOR;',
        '   c.b = b / PACKED_COLOR_DIVISOR;',

        '   return c;',
        '}',
    ].join( '\n' ),

    unpackRotationAxis: [
        'vec3 unpackRotationAxis( in float hex ) {',
        '   vec3 c = vec3( 0.0 );',

        '   float r = mod( (hex / PACKED_COLOR_SIZE / PACKED_COLOR_SIZE), PACKED_COLOR_SIZE );',
        '   float g = mod( (hex / PACKED_COLOR_SIZE), PACKED_COLOR_SIZE );',
        '   float b = mod( hex, PACKED_COLOR_SIZE );',

        '   c.r = r / PACKED_COLOR_DIVISOR;',
        '   c.g = g / PACKED_COLOR_DIVISOR;',
        '   c.b = b / PACKED_COLOR_DIVISOR;',

        '   c *= vec3( 2.0 );',
        '   c -= vec3( 1.0 );',

        '   return c;',
        '}',
    ].join( '\n' ),

    floatOverLifetime: [
        'float getFloatOverLifetime( in float positionInTime, in vec4 attr ) {',
        '    highp float value = 0.0;',
        '    float deltaAge = positionInTime * float( VALUE_OVER_LIFETIME_LENGTH - 1 );',
        '    float fIndex = 0.0;',
        '    float shouldApplyValue = 0.0;',

        // This might look a little odd, but it's faster in the testing I've done than using branches.
        // Uses basic maths to avoid branching.
        //
        // Take a look at the branch-avoidance functions defined above,
        // and be sure to check out The Orange Duck site where I got this
        // from (link above).

        // Fix for static emitters (age is always zero).
        '    value += attr[ 0 ] * when_eq( deltaAge, 0.0 );',
        '',
        '    for( int i = 0; i < VALUE_OVER_LIFETIME_LENGTH - 1; ++i ) {',
        '       fIndex = float( i );',
        '       shouldApplyValue = and( when_gt( deltaAge, fIndex ), when_le( deltaAge, fIndex + 1.0 ) );',
        '       value += shouldApplyValue * mix( attr[ i ], attr[ i + 1 ], deltaAge - fIndex );',
        '    }',
        '',
        '    return value;',
        '}',
    ].join( '\n' ),

    colorOverLifetime: [
        'vec3 getColorOverLifetime( in float positionInTime, in vec3 color1, in vec3 color2, in vec3 color3, in vec3 color4 ) {',
        '    vec3 value = vec3( 0.0 );',
        '    value.x = getFloatOverLifetime( positionInTime, vec4( color1.x, color2.x, color3.x, color4.x ) );',
        '    value.y = getFloatOverLifetime( positionInTime, vec4( color1.y, color2.y, color3.y, color4.y ) );',
        '    value.z = getFloatOverLifetime( positionInTime, vec4( color1.z, color2.z, color3.z, color4.z ) );',
        '    return value;',
        '}',
    ].join( '\n' ),

    paramFetchingFunctions: [
        'float getAlive() {',
        '   return params.x;',
        '}',

        'float getAge() {',
        '   return params.y;',
        '}',

        'float getMaxAge() {',
        '   return params.z;',
        '}',

        'float getWiggle() {',
        '   return params.w;',
        '}',
    ].join( '\n' ),

    forceFetchingFunctions: [
        'vec4 getPosition( in float age ) {',
        '   return modelViewMatrix * vec4( position, 1.0 );',
        '}',

        'vec3 getVelocity( in float age ) {',
        '   return velocity * age;',
        '}',

        'vec3 getAcceleration( in float age ) {',
        '   return acceleration.xyz * age;',
        '}',
    ].join( '\n' ),


    rotationFunctions: [
        // Huge thanks to:
        // - http://www.neilmendoza.com/glsl-rotation-about-an-arbitrary-axis/
        '#ifdef SHOULD_ROTATE_PARTICLES',
        '   mat4 getRotationMatrix( in vec3 axis, in float angle) {',
        '       axis = normalize(axis);',
        '       float s = sin(angle);',
        '       float c = cos(angle);',
        '       float oc = 1.0 - c;',
        '',
        '       return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,',
        '                   oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,',
        '                   oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,',
        '                   0.0,                                0.0,                                0.0,                                1.0);',
        '   }',
        '',
        '   vec3 getRotation( in vec3 pos, in float positionInTime ) {',
        '      if( rotation.y == 0.0 ) {',
        '           return pos;',
        '      }',
        '',
        '      vec3 axis = unpackRotationAxis( rotation.x );',
        '      vec3 center = rotationCenter;',
        '      vec3 translated;',
        '      mat4 rotationMatrix;',

        '      float angle = 0.0;',
        '      angle += when_eq( rotation.z, 0.0 ) * rotation.y;',
        '      angle += when_gt( rotation.z, 0.0 ) * mix( 0.0, rotation.y, positionInTime );',
        '      translated = rotationCenter - pos;',
        '      rotationMatrix = getRotationMatrix( axis, angle );',
        '      return center - vec3( rotationMatrix * vec4( translated, 0.0 ) );',
        '   }',
        '#endif'
    ].join( '\n' ),


    // Fragment chunks
    rotateTexture: [
        '    vec2 vUv = vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y );',
        '',
        '    #ifdef SHOULD_ROTATE_TEXTURE',
        '       float x = gl_PointCoord.x - 0.5;',
        '       float y = 1.0 - gl_PointCoord.y - 0.5;',
        '       float c = cos( -vAngle );',
        '       float s = sin( -vAngle );',

        '       vUv = vec2( c * x + s * y + 0.5, c * y - s * x + 0.5 );',
        '    #endif',
        '',

        // Spritesheets overwrite angle calculations.
        '    #ifdef SHOULD_CALCULATE_SPRITE',
        '        float framesX = vSpriteSheet.x;',
        '        float framesY = vSpriteSheet.y;',
        '        float columnNorm = vSpriteSheet.z;',
        '        float rowNorm = vSpriteSheet.w;',

        '        vUv.x = gl_PointCoord.x * framesX + columnNorm;',
        '        vUv.y = 1.0 - (gl_PointCoord.y * framesY + rowNorm);',
        '    #endif',

        '',
        '    vec4 rotatedTexture = texture2D( texture, vUv );',
    ].join( '\n' )
};

SPE.shaders = {
    vertex: [
        SPE.shaderChunks.defines,
        SPE.shaderChunks.uniforms,
        SPE.shaderChunks.attributes,
        SPE.shaderChunks.varyings,

        THREE.ShaderChunk.common,
        THREE.ShaderChunk.logdepthbuf_pars_vertex,
        THREE.ShaderChunk.fog_pars_vertex,
        
        SPE.shaderChunks.branchAvoidanceFunctions,
        SPE.shaderChunks.unpackColor,
        SPE.shaderChunks.unpackRotationAxis,
        SPE.shaderChunks.floatOverLifetime,
        SPE.shaderChunks.colorOverLifetime,
        SPE.shaderChunks.paramFetchingFunctions,
        SPE.shaderChunks.forceFetchingFunctions,
        SPE.shaderChunks.rotationFunctions,


        'void main() {',


        //
        // Setup...
        //
        '    highp float age = getAge();',
        '    highp float alive = getAlive();',
        '    highp float maxAge = getMaxAge();',
        '    highp float positionInTime = (age / maxAge);',
        '    highp float isAlive = when_gt( alive, 0.0 );',

        '    #ifdef SHOULD_WIGGLE_PARTICLES',
        '        float wiggleAmount = positionInTime * getWiggle();',
        '        float wiggleSin = isAlive * sin( wiggleAmount );',
        '        float wiggleCos = isAlive * cos( wiggleAmount );',
        '    #endif',

        //
        // Forces
        //

        // Get forces & position
        '    vec3 vel = getVelocity( age );',
        '    vec3 accel = getAcceleration( age );',
        '    vec3 force = vec3( 0.0 );',
        '    vec3 pos = vec3( position );',

        // Calculate the required drag to apply to the forces.
        '    float drag = 1.0 - (positionInTime * 0.5) * acceleration.w;',

        // Integrate forces...
        '    force += vel;',
        '    force *= drag;',
        '    force += accel * age;',
        '    pos += force;',


        // Wiggly wiggly wiggle!
        '    #ifdef SHOULD_WIGGLE_PARTICLES',
        '        pos.x += wiggleSin;',
        '        pos.y += wiggleCos;',
        '        pos.z += wiggleSin;',
        '    #endif',


        // Rotate the emitter around it's central point
        '    #ifdef SHOULD_ROTATE_PARTICLES',
        '        pos = getRotation( pos, positionInTime );',
        '    #endif',

        // Convert pos to a world-space value
        '    vec4 mvPos = modelViewMatrix * vec4( pos, 1.0 );',

        // Determine point size.
        '    highp float pointSize = getFloatOverLifetime( positionInTime, size ) * isAlive;',

        // Determine perspective
        '    #ifdef HAS_PERSPECTIVE',
        '        float perspective = scale / length( mvPos.xyz );',
        '    #else',
        '        float perspective = 1.0;',
        '    #endif',

        // Apply perpective to pointSize value
        '    float pointSizePerspective = pointSize * perspective;',


        //
        // Appearance
        //

        // Determine color and opacity for this particle
        '    #ifdef COLORIZE',
        '       vec3 c = isAlive * getColorOverLifetime(',
        '           positionInTime,',
        '           unpackColor( color.x ),',
        '           unpackColor( color.y ),',
        '           unpackColor( color.z ),',
        '           unpackColor( color.w )',
        '       );',
        '    #else',
        '       vec3 c = vec3(1.0);',
        '    #endif',

        '    float o = isAlive * getFloatOverLifetime( positionInTime, opacity );',

        // Assign color to vColor varying.
        '    vColor = vec4( c, o );',

        // Determine angle
        '    #ifdef SHOULD_ROTATE_TEXTURE',
        '        vAngle = isAlive * getFloatOverLifetime( positionInTime, angle );',
        '    #endif',

        // If this particle is using a sprite-sheet as a texture, we'll have to figure out
        // what frame of the texture the particle is using at it's current position in time.
        '    #ifdef SHOULD_CALCULATE_SPRITE',
        '        float framesX = textureAnimation.x;',
        '        float framesY = textureAnimation.y;',
        '        float loopCount = textureAnimation.w;',
        '        float totalFrames = textureAnimation.z;',
        '        float frameNumber = mod( (positionInTime * loopCount) * totalFrames, totalFrames );',

        '        float column = floor(mod( frameNumber, framesX ));',
        '        float row = floor( (frameNumber - column) / framesX );',

        '        float columnNorm = column / framesX;',
        '        float rowNorm = row / framesY;',

        '        vSpriteSheet.x = 1.0 / framesX;',
        '        vSpriteSheet.y = 1.0 / framesY;',
        '        vSpriteSheet.z = columnNorm;',
        '        vSpriteSheet.w = rowNorm;',
        '    #endif',

        //
        // Write values
        //

        // Set PointSize according to size at current point in time.
        '    gl_PointSize = pointSizePerspective;',
        '    gl_Position = projectionMatrix * mvPos;',

        THREE.ShaderChunk.logdepthbuf_vertex,
        THREE.ShaderChunk.fog_vertex,
        
        '}'
    ].join( '\n' ),

    fragment: [
        SPE.shaderChunks.uniforms,

        THREE.ShaderChunk.common,
        THREE.ShaderChunk.fog_pars_fragment,
        THREE.ShaderChunk.logdepthbuf_pars_fragment,

        SPE.shaderChunks.varyings,

        SPE.shaderChunks.branchAvoidanceFunctions,

        'void main() {',
        '    vec3 outgoingLight = vColor.xyz;',
        '    ',
        '    #ifdef ALPHATEST',
        '       if ( vColor.w < float(ALPHATEST) ) discard;',
        '    #endif',

        SPE.shaderChunks.rotateTexture,

        THREE.ShaderChunk.logdepthbuf_fragment,

        '    outgoingLight = vColor.xyz * rotatedTexture.xyz;',
		'    gl_FragColor = vec4( outgoingLight.xyz, rotatedTexture.w * vColor.w );',
        
        THREE.ShaderChunk.fog_fragment,

        '}'
    ].join( '\n' )
};

/**
 * A bunch of utility functions used throughout the library.
 * @namespace
 * @type {Object}
 */
SPE.utils = {
    /**
     * A map of types used by `SPE.utils.ensureTypedArg` and
     * `SPE.utils.ensureArrayTypedArg` to compare types against.
     *
     * @enum {String}
     */
    types: {
        /**
         * Boolean type.
         * @type {String}
         */
        BOOLEAN: 'boolean',

        /**
         * String type.
         * @type {String}
         */
        STRING: 'string',

        /**
         * Number type.
         * @type {String}
         */
        NUMBER: 'number',

        /**
         * Object type.
         * @type {String}
         */
        OBJECT: 'object'
    },

    /**
     * Given a value, a type, and a default value to fallback to,
     * ensure the given argument adheres to the type requesting,
     * returning the default value if type check is false.
     *
     * @param  {(boolean|string|number|object)} arg          The value to perform a type-check on.
     * @param  {String} type         The type the `arg` argument should adhere to.
     * @param  {(boolean|string|number|object)} defaultValue A default value to fallback on if the type check fails.
     * @return {(boolean|string|number|object)}              The given value if type check passes, or the default value if it fails.
     */
    ensureTypedArg: function( arg, type, defaultValue ) {
        'use strict';

        if ( typeof arg === type ) {
            return arg;
        }
        else {
            return defaultValue;
        }
    },

    /**
     * Given an array of values, a type, and a default value,
     * ensure the given array's contents ALL adhere to the provided type,
     * returning the default value if type check fails.
     *
     * If the given value to check isn't an Array, delegates to SPE.utils.ensureTypedArg.
     *
     * @param  {Array|boolean|string|number|object} arg          The array of values to check type of.
     * @param  {String} type         The type that should be adhered to.
     * @param  {(boolean|string|number|object)} defaultValue A default fallback value.
     * @return {(boolean|string|number|object)}              The given value if type check passes, or the default value if it fails.
     */
    ensureArrayTypedArg: function( arg, type, defaultValue ) {
        'use strict';

        // If the argument being checked is an array, loop through
        // it and ensure all the values are of the correct type,
        // falling back to the defaultValue if any aren't.
        if ( Array.isArray( arg ) ) {
            for ( var i = arg.length - 1; i >= 0; --i ) {
                if ( typeof arg[ i ] !== type ) {
                    return defaultValue;
                }
            }

            return arg;
        }

        // If the arg isn't an array then just fallback to
        // checking the type.
        return this.ensureTypedArg( arg, type, defaultValue );
    },

    /**
     * Ensures the given value is an instance of a constructor function.
     *
     * @param  {Object} arg          The value to check instance of.
     * @param  {Function} instance     The constructor of the instance to check against.
     * @param  {Object} defaultValue A default fallback value if instance check fails
     * @return {Object}              The given value if type check passes, or the default value if it fails.
     */
    ensureInstanceOf: function( arg, instance, defaultValue ) {
        'use strict';

        if ( instance !== undefined && arg instanceof instance ) {
            return arg;
        }
        else {
            return defaultValue;
        }
    },

    /**
     * Given an array of values, ensure the instances of all items in the array
     * matches the given instance constructor falling back to a default value if
     * the check fails.
     *
     * If given value isn't an Array, delegates to `SPE.utils.ensureInstanceOf`.
     *
     * @param  {Array|Object} arg          The value to perform the instanceof check on.
     * @param  {Function} instance     The constructor of the instance to check against.
     * @param  {Object} defaultValue A default fallback value if instance check fails
     * @return {Object}              The given value if type check passes, or the default value if it fails.
     */
    ensureArrayInstanceOf: function( arg, instance, defaultValue ) {
        'use strict';

        // If the argument being checked is an array, loop through
        // it and ensure all the values are of the correct type,
        // falling back to the defaultValue if any aren't.
        if ( Array.isArray( arg ) ) {
            for ( var i = arg.length - 1; i >= 0; --i ) {
                if ( instance !== undefined && arg[ i ] instanceof instance === false ) {
                    return defaultValue;
                }
            }

            return arg;
        }

        // If the arg isn't an array then just fallback to
        // checking the type.
        return this.ensureInstanceOf( arg, instance, defaultValue );
    },

    /**
     * Ensures that any "value-over-lifetime" properties of an emitter are
     * of the correct length (as dictated by `SPE.valueOverLifetimeLength`).
     *
     * Delegates to `SPE.utils.interpolateArray` for array resizing.
     *
     * If properties aren't arrays, then property values are put into one.
     *
     * @param  {Object} property  The property of an SPE.Emitter instance to check compliance of.
     * @param  {Number} minLength The minimum length of the array to create.
     * @param  {Number} maxLength The maximum length of the array to create.
     */
    ensureValueOverLifetimeCompliance: function( property, minLength, maxLength ) {
        'use strict';

        minLength = minLength || 3;
        maxLength = maxLength || 3;

        // First, ensure both properties are arrays.
        if ( Array.isArray( property._value ) === false ) {
            property._value = [ property._value ];
        }

        if ( Array.isArray( property._spread ) === false ) {
            property._spread = [ property._spread ];
        }

        var valueLength = this.clamp( property._value.length, minLength, maxLength ),
            spreadLength = this.clamp( property._spread.length, minLength, maxLength ),
            desiredLength = Math.max( valueLength, spreadLength );

        if ( property._value.length !== desiredLength ) {
            property._value = this.interpolateArray( property._value, desiredLength );
        }

        if ( property._spread.length !== desiredLength ) {
            property._spread = this.interpolateArray( property._spread, desiredLength );
        }
    },

    /**
     * Performs linear interpolation (lerp) on an array.
     *
     * For example, lerping [1, 10], with a `newLength` of 10 will produce [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].
     *
     * Delegates to `SPE.utils.lerpTypeAgnostic` to perform the actual
     * interpolation.
     *
     * @param  {Array} srcArray  The array to lerp.
     * @param  {Number} newLength The length the array should be interpolated to.
     * @return {Array}           The interpolated array.
     */
    interpolateArray: function( srcArray, newLength ) {
        'use strict';

        var sourceLength = srcArray.length,
            newArray = [ typeof srcArray[ 0 ].clone === 'function' ? srcArray[ 0 ].clone() : srcArray[ 0 ] ],
            factor = ( sourceLength - 1 ) / ( newLength - 1 );


        for ( var i = 1; i < newLength - 1; ++i ) {
            var f = i * factor,
                before = Math.floor( f ),
                after = Math.ceil( f ),
                delta = f - before;

            newArray[ i ] = this.lerpTypeAgnostic( srcArray[ before ], srcArray[ after ], delta );
        }

        newArray.push(
            typeof srcArray[ sourceLength - 1 ].clone === 'function' ?
            srcArray[ sourceLength - 1 ].clone() :
            srcArray[ sourceLength - 1 ]
        );

        return newArray;
    },

    /**
     * Clamp a number to between the given min and max values.
     * @param  {Number} value The number to clamp.
     * @param  {Number} min   The minimum value.
     * @param  {Number} max   The maximum value.
     * @return {Number}       The clamped number.
     */
    clamp: function( value, min, max ) {
        'use strict';

        return Math.max( min, Math.min( value, max ) );
    },

    /**
     * If the given value is less than the epsilon value, then return
     * a randomised epsilon value if specified, or just the epsilon value if not.
     * Works for negative numbers as well as positive.
     *
     * @param  {Number} value     The value to perform the operation on.
     * @param  {Boolean} randomise Whether the value should be randomised.
     * @return {Number}           The result of the operation.
     */
    zeroToEpsilon: function( value, randomise ) {
        'use strict';

        var epsilon = 0.00001,
            result = value;

        result = randomise ? Math.random() * epsilon * 10 : epsilon;

        if ( value < 0 && value > -epsilon ) {
            result = -result;
        }

        // if ( value === 0 ) {
        //     result = randomise ? Math.random() * epsilon * 10 : epsilon;
        // }
        // else if ( value > 0 && value < epsilon ) {
        //     result = randomise ? Math.random() * epsilon * 10 : epsilon;
        // }
        // else if ( value < 0 && value > -epsilon ) {
        //     result = -( randomise ? Math.random() * epsilon * 10 : epsilon );
        // }

        return result;
    },

    /**
     * Linearly interpolates two values of various types. The given values
     * must be of the same type for the interpolation to work.
     * @param  {(number|Object)} start The start value of the lerp.
     * @param  {(number|object)} end   The end value of the lerp.
     * @param  {Number} delta The delta posiiton of the lerp operation. Ideally between 0 and 1 (inclusive).
     * @return {(number|object|undefined)}       The result of the operation. Result will be undefined if
     *                                               the start and end arguments aren't a supported type, or
     *                                               if their types do not match.
     */
    lerpTypeAgnostic: function( start, end, delta ) {
        'use strict';

        var types = this.types,
            out;

        if ( typeof start === types.NUMBER && typeof end === types.NUMBER ) {
            return start + ( ( end - start ) * delta );
        }
        else if ( start instanceof THREE.Vector2 && end instanceof THREE.Vector2 ) {
            out = start.clone();
            out.x = this.lerp( start.x, end.x, delta );
            out.y = this.lerp( start.y, end.y, delta );
            return out;
        }
        else if ( start instanceof THREE.Vector3 && end instanceof THREE.Vector3 ) {
            out = start.clone();
            out.x = this.lerp( start.x, end.x, delta );
            out.y = this.lerp( start.y, end.y, delta );
            out.z = this.lerp( start.z, end.z, delta );
            return out;
        }
        else if ( start instanceof THREE.Vector4 && end instanceof THREE.Vector4 ) {
            out = start.clone();
            out.x = this.lerp( start.x, end.x, delta );
            out.y = this.lerp( start.y, end.y, delta );
            out.z = this.lerp( start.z, end.z, delta );
            out.w = this.lerp( start.w, end.w, delta );
            return out;
        }
        else if ( start instanceof THREE.Color && end instanceof THREE.Color ) {
            out = start.clone();
            out.r = this.lerp( start.r, end.r, delta );
            out.g = this.lerp( start.g, end.g, delta );
            out.b = this.lerp( start.b, end.b, delta );
            return out;
        }
        else {
            console.warn( 'Invalid argument types, or argument types do not match:', start, end );
        }
    },

    /**
     * Perform a linear interpolation operation on two numbers.
     * @param  {Number} start The start value.
     * @param  {Number} end   The end value.
     * @param  {Number} delta The position to interpolate to.
     * @return {Number}       The result of the lerp operation.
     */
    lerp: function( start, end, delta ) {
        'use strict';
        return start + ( ( end - start ) * delta );
    },

    /**
     * Rounds a number to a nearest multiple.
     *
     * @param  {Number} n        The number to round.
     * @param  {Number} multiple The multiple to round to.
     * @return {Number}          The result of the round operation.
     */
    roundToNearestMultiple: function( n, multiple ) {
        'use strict';

        var remainder = 0;

        if ( multiple === 0 ) {
            return n;
        }

        remainder = Math.abs( n ) % multiple;

        if ( remainder === 0 ) {
            return n;
        }

        if ( n < 0 ) {
            return -( Math.abs( n ) - remainder );
        }

        return n + multiple - remainder;
    },

    /**
     * Check if all items in an array are equal. Uses strict equality.
     *
     * @param  {Array} array The array of values to check equality of.
     * @return {Boolean}       Whether the array's values are all equal or not.
     */
    arrayValuesAreEqual: function( array ) {
        'use strict';

        for ( var i = 0; i < array.length - 1; ++i ) {
            if ( array[ i ] !== array[ i + 1 ] ) {
                return false;
            }
        }

        return true;
    },

    // colorsAreEqual: function() {
    //     var colors = Array.prototype.slice.call( arguments ),
    //         numColors = colors.length;

    //     for ( var i = 0, color1, color2; i < numColors - 1; ++i ) {
    //         color1 = colors[ i ];
    //         color2 = colors[ i + 1 ];

    //         if (
    //             color1.r !== color2.r ||
    //             color1.g !== color2.g ||
    //             color1.b !== color2.b
    //         ) {
    //             return false
    //         }
    //     }

    //     return true;
    // },


    /**
     * Given a start value and a spread value, create and return a random
     * number.
     * @param  {Number} base   The start value.
     * @param  {Number} spread The size of the random variance to apply.
     * @return {Number}        A randomised number.
     */
    randomFloat: function( base, spread ) {
        'use strict';
        return base + spread * ( Math.random() - 0.5 );
    },



    /**
     * Given an SPE.ShaderAttribute instance, and various other settings,
     * assign values to the attribute's array in a `vec3` format.
     *
     * @param  {Object} attribute   The instance of SPE.ShaderAttribute to save the result to.
     * @param  {Number} index       The offset in the attribute's TypedArray to save the result from.
     * @param  {Object} base        THREE.Vector3 instance describing the start value.
     * @param  {Object} spread      THREE.Vector3 instance describing the random variance to apply to the start value.
     * @param  {Object} spreadClamp THREE.Vector3 instance describing the multiples to clamp the randomness to.
     */
    randomVector3: function( attribute, index, base, spread, spreadClamp ) {
        'use strict';

        var x = base.x + ( Math.random() * spread.x - ( spread.x * 0.5 ) ),
            y = base.y + ( Math.random() * spread.y - ( spread.y * 0.5 ) ),
            z = base.z + ( Math.random() * spread.z - ( spread.z * 0.5 ) );

        // var x = this.randomFloat( base.x, spread.x ),
        // y = this.randomFloat( base.y, spread.y ),
        // z = this.randomFloat( base.z, spread.z );

        if ( spreadClamp ) {
            x = -spreadClamp.x * 0.5 + this.roundToNearestMultiple( x, spreadClamp.x );
            y = -spreadClamp.y * 0.5 + this.roundToNearestMultiple( y, spreadClamp.y );
            z = -spreadClamp.z * 0.5 + this.roundToNearestMultiple( z, spreadClamp.z );
        }

        attribute.typedArray.setVec3Components( index, x, y, z );
    },

    /**
     * Given an SPE.Shader attribute instance, and various other settings,
     * assign Color values to the attribute.
     * @param  {Object} attribute The instance of SPE.ShaderAttribute to save the result to.
     * @param  {Number} index     The offset in the attribute's TypedArray to save the result from.
     * @param  {Object} base      THREE.Color instance describing the start color.
     * @param  {Object} spread    THREE.Vector3 instance describing the random variance to apply to the start color.
     */
    randomColor: function( attribute, index, base, spread ) {
        'use strict';

        var r = base.r + ( Math.random() * spread.x ),
            g = base.g + ( Math.random() * spread.y ),
            b = base.b + ( Math.random() * spread.z );

        r = this.clamp( r, 0, 1 );
        g = this.clamp( g, 0, 1 );
        b = this.clamp( b, 0, 1 );


        attribute.typedArray.setVec3Components( index, r, g, b );
    },


    randomColorAsHex: ( function() {
        'use strict';

        var workingColor = new THREE.Color();

        /**
         * Assigns a random color value, encoded as a hex value in decimal
         * format, to a SPE.ShaderAttribute instance.
         * @param  {Object} attribute The instance of SPE.ShaderAttribute to save the result to.
         * @param  {Number} index     The offset in the attribute's TypedArray to save the result from.
         * @param  {Object} base      THREE.Color instance describing the start color.
         * @param  {Object} spread    THREE.Vector3 instance describing the random variance to apply to the start color.
         */
        return function( attribute, index, base, spread ) {
            var numItems = base.length,
                colors = [];

            for ( var i = 0; i < numItems; ++i ) {
                var spreadVector = spread[ i ];

                workingColor.copy( base[ i ] );

                workingColor.r += ( Math.random() * spreadVector.x ) - ( spreadVector.x * 0.5 );
                workingColor.g += ( Math.random() * spreadVector.y ) - ( spreadVector.y * 0.5 );
                workingColor.b += ( Math.random() * spreadVector.z ) - ( spreadVector.z * 0.5 );

                workingColor.r = this.clamp( workingColor.r, 0, 1 );
                workingColor.g = this.clamp( workingColor.g, 0, 1 );
                workingColor.b = this.clamp( workingColor.b, 0, 1 );

                colors.push( workingColor.getHex() );
            }

            attribute.typedArray.setVec4Components( index, colors[ 0 ], colors[ 1 ], colors[ 2 ], colors[ 3 ] );
        };
    }() ),

    /**
     * Assigns a random vector 3 value to an SPE.ShaderAttribute instance, projecting the
     * given values onto a sphere.
     *
     * @param  {Object} attribute The instance of SPE.ShaderAttribute to save the result to.
     * @param  {Number} index     The offset in the attribute's TypedArray to save the result from.
     * @param  {Object} base              THREE.Vector3 instance describing the origin of the transform.
     * @param  {Number} radius            The radius of the sphere to project onto.
     * @param  {Number} radiusSpread      The amount of randomness to apply to the projection result
     * @param  {Object} radiusScale       THREE.Vector3 instance describing the scale of each axis of the sphere.
     * @param  {Number} radiusSpreadClamp What numeric multiple the projected value should be clamped to.
     */
    randomVector3OnSphere: function(
        attribute, index, base, radius, radiusSpread, radiusScale, radiusSpreadClamp, distributionClamp
    ) {
        'use strict';

        var depth = 2 * Math.random() - 1,
            t = 6.2832 * Math.random(),
            r = Math.sqrt( 1 - depth * depth ),
            rand = this.randomFloat( radius, radiusSpread ),
            x = 0,
            y = 0,
            z = 0;


        if ( radiusSpreadClamp ) {
            rand = Math.round( rand / radiusSpreadClamp ) * radiusSpreadClamp;
        }



        // Set position on sphere
        x = r * Math.cos( t ) * rand;
        y = r * Math.sin( t ) * rand;
        z = depth * rand;

        // Apply radius scale to this position
        x *= radiusScale.x;
        y *= radiusScale.y;
        z *= radiusScale.z;

        // Translate to the base position.
        x += base.x;
        y += base.y;
        z += base.z;

        // Set the values in the typed array.
        attribute.typedArray.setVec3Components( index, x, y, z );
    },

    seededRandom: function( seed ) {
        var x = Math.sin( seed ) * 10000;
        return x - ( x | 0 );
    },



    /**
     * Assigns a random vector 3 value to an SPE.ShaderAttribute instance, projecting the
     * given values onto a 2d-disc.
     *
     * @param  {Object} attribute The instance of SPE.ShaderAttribute to save the result to.
     * @param  {Number} index     The offset in the attribute's TypedArray to save the result from.
     * @param  {Object} base              THREE.Vector3 instance describing the origin of the transform.
     * @param  {Number} radius            The radius of the sphere to project onto.
     * @param  {Number} radiusSpread      The amount of randomness to apply to the projection result
     * @param  {Object} radiusScale       THREE.Vector3 instance describing the scale of each axis of the disc. The z-component is ignored.
     * @param  {Number} radiusSpreadClamp What numeric multiple the projected value should be clamped to.
     */
    randomVector3OnDisc: function( attribute, index, base, radius, radiusSpread, radiusScale, radiusSpreadClamp ) {
        'use strict';

        var t = 6.2832 * Math.random(),
            rand = Math.abs( this.randomFloat( radius, radiusSpread ) ),
            x = 0,
            y = 0,
            z = 0;

        if ( radiusSpreadClamp ) {
            rand = Math.round( rand / radiusSpreadClamp ) * radiusSpreadClamp;
        }

        // Set position on sphere
        x = Math.cos( t ) * rand;
        y = Math.sin( t ) * rand;

        // Apply radius scale to this position
        x *= radiusScale.x;
        y *= radiusScale.y;

        // Translate to the base position.
        x += base.x;
        y += base.y;
        z += base.z;

        // Set the values in the typed array.
        attribute.typedArray.setVec3Components( index, x, y, z );
    },

    randomDirectionVector3OnSphere: ( function() {
        'use strict';

        var v = new THREE.Vector3();

        /**
         * Given an SPE.ShaderAttribute instance, create a direction vector from the given
         * position, using `speed` as the magnitude. Values are saved to the attribute.
         *
         * @param  {Object} attribute       The instance of SPE.ShaderAttribute to save the result to.
         * @param  {Number} index           The offset in the attribute's TypedArray to save the result from.
         * @param  {Number} posX            The particle's x coordinate.
         * @param  {Number} posY            The particle's y coordinate.
         * @param  {Number} posZ            The particle's z coordinate.
         * @param  {Object} emitterPosition THREE.Vector3 instance describing the emitter's base position.
         * @param  {Number} speed           The magnitude to apply to the vector.
         * @param  {Number} speedSpread     The amount of randomness to apply to the magnitude.
         */
        return function( attribute, index, posX, posY, posZ, emitterPosition, speed, speedSpread ) {
            v.copy( emitterPosition );

            v.x -= posX;
            v.y -= posY;
            v.z -= posZ;

            v.normalize().multiplyScalar( -this.randomFloat( speed, speedSpread ) );

            attribute.typedArray.setVec3Components( index, v.x, v.y, v.z );
        };
    }() ),


    randomDirectionVector3OnDisc: ( function() {
        'use strict';

        var v = new THREE.Vector3();

        /**
         * Given an SPE.ShaderAttribute instance, create a direction vector from the given
         * position, using `speed` as the magnitude. Values are saved to the attribute.
         *
         * @param  {Object} attribute       The instance of SPE.ShaderAttribute to save the result to.
         * @param  {Number} index           The offset in the attribute's TypedArray to save the result from.
         * @param  {Number} posX            The particle's x coordinate.
         * @param  {Number} posY            The particle's y coordinate.
         * @param  {Number} posZ            The particle's z coordinate.
         * @param  {Object} emitterPosition THREE.Vector3 instance describing the emitter's base position.
         * @param  {Number} speed           The magnitude to apply to the vector.
         * @param  {Number} speedSpread     The amount of randomness to apply to the magnitude.
         */
        return function( attribute, index, posX, posY, posZ, emitterPosition, speed, speedSpread ) {
            v.copy( emitterPosition );

            v.x -= posX;
            v.y -= posY;
            v.z -= posZ;

            v.normalize().multiplyScalar( -this.randomFloat( speed, speedSpread ) );

            attribute.typedArray.setVec3Components( index, v.x, v.y, 0 );
        };
    }() ),

    getPackedRotationAxis: ( function() {
        'use strict';

        var v = new THREE.Vector3(),
            vSpread = new THREE.Vector3(),
            c = new THREE.Color(),
            addOne = new THREE.Vector3( 1, 1, 1 );

        /**
         * Given a rotation axis, and a rotation axis spread vector,
         * calculate a randomised rotation axis, and pack it into
         * a hexadecimal value represented in decimal form.
         * @param  {Object} axis       THREE.Vector3 instance describing the rotation axis.
         * @param  {Object} axisSpread THREE.Vector3 instance describing the amount of randomness to apply to the rotation axis.
         * @return {Number}            The packed rotation axis, with randomness.
         */
        return function( axis, axisSpread ) {
            v.copy( axis ).normalize();
            vSpread.copy( axisSpread ).normalize();

            v.x += ( -axisSpread.x * 0.5 ) + ( Math.random() * axisSpread.x );
            v.y += ( -axisSpread.y * 0.5 ) + ( Math.random() * axisSpread.y );
            v.z += ( -axisSpread.z * 0.5 ) + ( Math.random() * axisSpread.z );

            // v.x = Math.abs( v.x );
            // v.y = Math.abs( v.y );
            // v.z = Math.abs( v.z );

            v.normalize().add( addOne ).multiplyScalar( 0.5 );

            c.setRGB( v.x, v.y, v.z );

            return c.getHex();
        };
    }() )
};

/**
 * An SPE.Group instance.
 * @typedef {Object} Group
 * @see SPE.Group
 */

/**
 * A map of options to configure an SPE.Group instance.
 * @typedef {Object} GroupOptions
 *
 * @property {Object} texture An object describing the texture used by the group.
 *
 * @property {Object} texture.value An instance of THREE.Texture.
 *
 * @property {Object=} texture.frames A THREE.Vector2 instance describing the number
 *                                    of frames on the x- and y-axis of the given texture.
 *                                    If not provided, the texture will NOT be treated as
 *                                    a sprite-sheet and as such will NOT be animated.
 *
 * @property {Number} [texture.frameCount=texture.frames.x * texture.frames.y] The total number of frames in the sprite-sheet.
 *                                                                   Allows for sprite-sheets that don't fill the entire
 *                                                                   texture.
 *
 * @property {Number} texture.loop The number of loops through the sprite-sheet that should
 *                                 be performed over the course of a single particle's lifetime.
 *
 * @property {Number} fixedTimeStep If no `dt` (or `deltaTime`) value is passed to this group's
 *                                  `tick()` function, this number will be used to move the particle
 *                                  simulation forward. Value in SECONDS.
 *
 * @property {Boolean} hasPerspective Whether the distance a particle is from the camera should affect
 *                                    the particle's size.
 *
 * @property {Boolean} colorize Whether the particles in this group should be rendered with color, or
 *                              whether the only color of particles will come from the provided texture.
 *
 * @property {Number} blending One of Three.js's blending modes to apply to this group's `ShaderMaterial`.
 *
 * @property {Boolean} transparent Whether these particle's should be rendered with transparency.
 *
 * @property {Number} alphaTest Sets the alpha value to be used when running an alpha test on the `texture.value` property. Value between 0 and 1.
 *
 * @property {Boolean} depthWrite Whether rendering the group has any effect on the depth buffer.
 *
 * @property {Boolean} depthTest Whether to have depth test enabled when rendering this group.
 *
 * @property {Boolean} fog Whether this group's particles should be affected by their scene's fog.
 *
 * @property {Number} scale The scale factor to apply to this group's particle sizes. Useful for
 *                          setting particle sizes to be relative to renderer size.
 */


/**
 * The SPE.Group class. Creates a new group, containing a material, geometry, and mesh.
 *
 * @constructor
 * @param {GroupOptions} options A map of options to configure the group instance.
 */
SPE.Group = function( options ) {
    'use strict';

    var utils = SPE.utils,
        types = utils.types;

    // Ensure we have a map of options to play with
    options = utils.ensureTypedArg( options, types.OBJECT, {} );
    options.texture = utils.ensureTypedArg( options.texture, types.OBJECT, {} );

    // Assign a UUID to this instance
    this.uuid = THREE.Math.generateUUID();

    // If no `deltaTime` value is passed to the `SPE.Group.tick` function,
    // the value of this property will be used to advance the simulation.
    this.fixedTimeStep = utils.ensureTypedArg( options.fixedTimeStep, types.NUMBER, 0.016 );

    // Set properties used in the uniforms map, starting with the
    // texture stuff.
    this.texture = utils.ensureInstanceOf( options.texture.value, THREE.Texture, null );
    this.textureFrames = utils.ensureInstanceOf( options.texture.frames, THREE.Vector2, new THREE.Vector2( 1, 1 ) );
    this.textureFrameCount = utils.ensureTypedArg( options.texture.frameCount, types.NUMBER, this.textureFrames.x * this.textureFrames.y );
    this.textureLoop = utils.ensureTypedArg( options.texture.loop, types.NUMBER, 1 );
    this.textureFrames.max( new THREE.Vector2( 1, 1 ) );

    this.hasPerspective = utils.ensureTypedArg( options.hasPerspective, types.BOOLEAN, true );
    this.colorize = utils.ensureTypedArg( options.colorize, types.BOOLEAN, true );

    this.maxParticleCount = utils.ensureTypedArg( options.maxParticleCount, types.NUMBER, null );


    // Set properties used to define the ShaderMaterial's appearance.
    this.blending = utils.ensureTypedArg( options.blending, types.NUMBER, THREE.AdditiveBlending );
    this.transparent = utils.ensureTypedArg( options.transparent, types.BOOLEAN, true );
    this.alphaTest = parseFloat( utils.ensureTypedArg( options.alphaTest, types.NUMBER, 0.0 ) );
    this.depthWrite = utils.ensureTypedArg( options.depthWrite, types.BOOLEAN, false );
    this.depthTest = utils.ensureTypedArg( options.depthTest, types.BOOLEAN, true );
    this.fog = utils.ensureTypedArg( options.fog, types.BOOLEAN, true );
    this.scale = utils.ensureTypedArg( options.scale, types.NUMBER, 300 );

    // Where emitter's go to curl up in a warm blanket and live
    // out their days.
    this.emitters = [];
    this.emitterIDs = [];

    // Create properties for use by the emitter pooling functions.
    this._pool = [];
    this._poolCreationSettings = null;
    this._createNewWhenPoolEmpty = 0;

    // Whether all attributes should be forced to updated
    // their entire buffer contents on the next tick.
    //
    // Used when an emitter is removed.
    this._attributesNeedRefresh = false;
    this._attributesNeedDynamicReset = false;

    this.particleCount = 0;


    // Map of uniforms to be applied to the ShaderMaterial instance.
    this.uniforms = {
        texture: {
            type: 't',
            value: this.texture
        },
        textureAnimation: {
            type: 'v4',
            value: new THREE.Vector4(
                this.textureFrames.x,
                this.textureFrames.y,
                this.textureFrameCount,
                Math.max( Math.abs( this.textureLoop ), 1.0 )
            )
        },
        fogColor: {
            type: 'c',
            value: null
        },
        fogNear: {
            type: 'f',
            value: 10
        },
        fogFar: {
            type: 'f',
            value: 200
        },
        fogDensity: {
            type: 'f',
            value: 0.5
        },
        deltaTime: {
            type: 'f',
            value: 0
        },
        runTime: {
            type: 'f',
            value: 0
        },
        scale: {
            type: 'f',
            value: this.scale
        }
    };

    // Add some defines into the mix...
    this.defines = {
        HAS_PERSPECTIVE: this.hasPerspective,
        COLORIZE: this.colorize,
        VALUE_OVER_LIFETIME_LENGTH: SPE.valueOverLifetimeLength,

        SHOULD_ROTATE_TEXTURE: false,
        SHOULD_ROTATE_PARTICLES: false,
        SHOULD_WIGGLE_PARTICLES: false,

        SHOULD_CALCULATE_SPRITE: this.textureFrames.x > 1 || this.textureFrames.y > 1
    };

    // Map of all attributes to be applied to the particles.
    //
    // See SPE.ShaderAttribute for a bit more info on this bit.
    this.attributes = {
        position: new SPE.ShaderAttribute( 'v3', true ),
        acceleration: new SPE.ShaderAttribute( 'v4', true ), // w component is drag
        velocity: new SPE.ShaderAttribute( 'v3', true ),
        rotation: new SPE.ShaderAttribute( 'v4', true ),
        rotationCenter: new SPE.ShaderAttribute( 'v3', true ),
        params: new SPE.ShaderAttribute( 'v4', true ), // Holds (alive, age, delay, wiggle)
        size: new SPE.ShaderAttribute( 'v4', true ),
        angle: new SPE.ShaderAttribute( 'v4', true ),
        color: new SPE.ShaderAttribute( 'v4', true ),
        opacity: new SPE.ShaderAttribute( 'v4', true )
    };

    this.attributeKeys = Object.keys( this.attributes );
    this.attributeCount = this.attributeKeys.length;

    // Create the ShaderMaterial instance that'll help render the
    // particles.
    this.material = new THREE.ShaderMaterial( {
        uniforms: this.uniforms,
        vertexShader: SPE.shaders.vertex,
        fragmentShader: SPE.shaders.fragment,
        blending: this.blending,
        transparent: this.transparent,
        alphaTest: this.alphaTest,
        depthWrite: this.depthWrite,
        depthTest: this.depthTest,
        defines: this.defines,
        fog: this.fog
    } );

    // Create the BufferGeometry and Points instances, ensuring
    // the geometry and material are given to the latter.
    this.geometry = new THREE.BufferGeometry();
    this.mesh = new THREE.Points( this.geometry, this.material );

    if ( this.maxParticleCount === null ) {
        console.warn( 'SPE.Group: No maxParticleCount specified. Adding emitters after rendering will probably cause errors.' );
    }
};

SPE.Group.constructor = SPE.Group;


SPE.Group.prototype._updateDefines = function() {
    'use strict';

    var emitters = this.emitters,
        i = emitters.length - 1,
        emitter,
        defines = this.defines;

    for ( i; i >= 0; --i ) {
        emitter = emitters[ i ];

        // Only do angle calculation if there's no spritesheet defined.
        //
        // Saves calculations being done and then overwritten in the shaders.
        if ( !defines.SHOULD_CALCULATE_SPRITE ) {
            defines.SHOULD_ROTATE_TEXTURE = defines.SHOULD_ROTATE_TEXTURE || !!Math.max(
                Math.max.apply( null, emitter.angle.value ),
                Math.max.apply( null, emitter.angle.spread )
            );
        }

        defines.SHOULD_ROTATE_PARTICLES = defines.SHOULD_ROTATE_PARTICLES || !!Math.max(
            emitter.rotation.angle,
            emitter.rotation.angleSpread
        );

        defines.SHOULD_WIGGLE_PARTICLES = defines.SHOULD_WIGGLE_PARTICLES || !!Math.max(
            emitter.wiggle.value,
            emitter.wiggle.spread
        );
    }

    this.material.needsUpdate = true;
};

SPE.Group.prototype._applyAttributesToGeometry = function() {
    'use strict';

    var attributes = this.attributes,
        geometry = this.geometry,
        geometryAttributes = geometry.attributes,
        attribute,
        geometryAttribute;

    // Loop through all the shader attributes and assign (or re-assign)
    // typed array buffers to each one.
    for ( var attr in attributes ) {
        if ( attributes.hasOwnProperty( attr ) ) {
            attribute = attributes[ attr ];
            geometryAttribute = geometryAttributes[ attr ];

            // Update the array if this attribute exists on the geometry.
            //
            // This needs to be done because the attribute's typed array might have
            // been resized and reinstantiated, and might now be looking at a
            // different ArrayBuffer, so reference needs updating.
            if ( geometryAttribute ) {
                geometryAttribute.array = attribute.typedArray.array;
            }

            // // Add the attribute to the geometry if it doesn't already exist.
            else {
                geometry.addAttribute( attr, attribute.bufferAttribute );
            }

            // Mark the attribute as needing an update the next time a frame is rendered.
            attribute.bufferAttribute.needsUpdate = true;
        }
    }

    // Mark the draw range on the geometry. This will ensure
    // only the values in the attribute buffers that are
    // associated with a particle will be used in THREE's
    // render cycle.
    this.geometry.setDrawRange( 0, this.particleCount );
};

/**
 * Adds an SPE.Emitter instance to this group, creating particle values and
 * assigning them to this group's shader attributes.
 *
 * @param {Emitter} emitter The emitter to add to this group.
 */
SPE.Group.prototype.addEmitter = function( emitter ) {
    'use strict';

    // Ensure an actual emitter instance is passed here.
    //
    // Decided not to throw here, just in case a scene's
    // rendering would be paused. Logging an error instead
    // of stopping execution if exceptions aren't caught.
    if ( emitter instanceof SPE.Emitter === false ) {
        console.error( '`emitter` argument must be instance of SPE.Emitter. Was provided with:', emitter );
        return;
    }

    // If the emitter already exists as a member of this group, then
    // stop here, we don't want to add it again.
    else if ( this.emitterIDs.indexOf( emitter.uuid ) > -1 ) {
        console.error( 'Emitter already exists in this group. Will not add again.' );
        return;
    }

    // And finally, if the emitter is a member of another group,
    // don't add it to this group.
    else if ( emitter.group !== null ) {
        console.error( 'Emitter already belongs to another group. Will not add to requested group.' );
        return;
    }

    var attributes = this.attributes,
        start = this.particleCount,
        end = start + emitter.particleCount;

    // Update this group's particle count.
    this.particleCount = end;

    // Emit a warning if the emitter being added will exceed the buffer sizes specified.
    if ( this.maxParticleCount !== null && this.particleCount > this.maxParticleCount ) {
        console.warn( 'SPE.Group: maxParticleCount exceeded. Requesting', this.particleCount, 'particles, can support only', this.maxParticleCount );
    }


    // Set the `particlesPerSecond` value (PPS) on the emitter.
    // It's used to determine how many particles to release
    // on a per-frame basis.
    emitter._calculatePPSValue( emitter.maxAge._value + emitter.maxAge._spread );
    emitter._setBufferUpdateRanges( this.attributeKeys );

    // Store the offset value in the TypedArray attributes for this emitter.
    emitter._setAttributeOffset( start );

    // Save a reference to this group on the emitter so it knows
    // where it belongs.
    emitter.group = this;

    // Store reference to the attributes on the emitter for
    // easier access during the emitter's tick function.
    emitter.attributes = this.attributes;



    // Ensure the attributes and their BufferAttributes exist, and their
    // TypedArrays are of the correct size.
    for ( var attr in attributes ) {
        if ( attributes.hasOwnProperty( attr ) ) {
            // When creating a buffer, pass through the maxParticle count
            // if one is specified.
            attributes[ attr ]._createBufferAttribute(
                this.maxParticleCount !== null ?
                this.maxParticleCount :
                this.particleCount
            );
        }
    }

    // Loop through each particle this emitter wants to have, and create the attributes values,
    // storing them in the TypedArrays that each attribute holds.
    for ( var i = start; i < end; ++i ) {
        emitter._assignPositionValue( i );
        emitter._assignForceValue( i, 'velocity' );
        emitter._assignForceValue( i, 'acceleration' );
        emitter._assignAbsLifetimeValue( i, 'opacity' );
        emitter._assignAbsLifetimeValue( i, 'size' );
        emitter._assignAngleValue( i );
        emitter._assignRotationValue( i );
        emitter._assignParamsValue( i );
        emitter._assignColorValue( i );
    }

    // Update the geometry and make sure the attributes are referencing
    // the typed arrays properly.
    this._applyAttributesToGeometry();

    // Store this emitter in this group's emitter's store.
    this.emitters.push( emitter );
    this.emitterIDs.push( emitter.uuid );

    // Update certain flags to enable shader calculations only if they're necessary.
    this._updateDefines( emitter );

    // Update the material since defines might have changed
    this.material.needsUpdate = true;
    this.geometry.needsUpdate = true;
    this._attributesNeedRefresh = true;

    // Return the group to enable chaining.
    return this;
};

/**
 * Removes an SPE.Emitter instance from this group. When called,
 * all particle's belonging to the given emitter will be instantly
 * removed from the scene.
 *
 * @param {Emitter} emitter The emitter to add to this group.
 */
SPE.Group.prototype.removeEmitter = function( emitter ) {
    'use strict';

    var emitterIndex = this.emitterIDs.indexOf( emitter.uuid );

    // Ensure an actual emitter instance is passed here.
    //
    // Decided not to throw here, just in case a scene's
    // rendering would be paused. Logging an error instead
    // of stopping execution if exceptions aren't caught.
    if ( emitter instanceof SPE.Emitter === false ) {
        console.error( '`emitter` argument must be instance of SPE.Emitter. Was provided with:', emitter );
        return;
    }

    // Issue an error if the emitter isn't a member of this group.
    else if ( emitterIndex === -1 ) {
        console.error( 'Emitter does not exist in this group. Will not remove.' );
        return;
    }

    // Kill all particles by marking them as dead
    // and their age as 0.
    var start = emitter.attributeOffset,
        end = start + emitter.particleCount,
        params = this.attributes.params.typedArray;

    // Set alive and age to zero.
    for ( var i = start; i < end; ++i ) {
        params.array[ i * 4 ] = 0.0;
        params.array[ i * 4 + 1 ] = 0.0;
    }

    // Remove the emitter from this group's "store".
    this.emitters.splice( emitterIndex, 1 );
    this.emitterIDs.splice( emitterIndex, 1 );

    // Remove this emitter's attribute values from all shader attributes.
    // The `.splice()` call here also marks each attribute's buffer
    // as needing to update it's entire contents.
    for ( var attr in this.attributes ) {
        if ( this.attributes.hasOwnProperty( attr ) ) {
            this.attributes[ attr ].splice( start, end );
        }
    }

    // Ensure this group's particle count is correct.
    this.particleCount -= emitter.particleCount;

    // Call the emitter's remove method.
    emitter._onRemove();

    // Set a flag to indicate that the attribute buffers should
    // be updated in their entirety on the next frame.
    this._attributesNeedRefresh = true;
};


/**
 * Fetch a single emitter instance from the pool.
 * If there are no objects in the pool, a new emitter will be
 * created if specified.
 *
 * @return {Emitter|null}
 */
SPE.Group.prototype.getFromPool = function() {
    'use strict';

    var pool = this._pool,
        createNew = this._createNewWhenPoolEmpty;

    if ( pool.length ) {
        return pool.pop();
    }
    else if ( createNew ) {
        return new SPE.Emitter( this._poolCreationSettings );
    }

    return null;
};


/**
 * Release an emitter into the pool.
 *
 * @param  {ShaderParticleEmitter} emitter
 * @return {Group} This group instance.
 */
SPE.Group.prototype.releaseIntoPool = function( emitter ) {
    'use strict';

    if ( emitter instanceof SPE.Emitter === false ) {
        console.error( 'Argument is not instanceof SPE.Emitter:', emitter );
        return;
    }

    emitter.reset();
    this._pool.unshift( emitter );

    return this;
};


/**
 * Get the pool array
 *
 * @return {Array}
 */
SPE.Group.prototype.getPool = function() {
    'use strict';
    return this._pool;
};


/**
 * Add a pool of emitters to this particle group
 *
 * @param {Number} numEmitters      The number of emitters to add to the pool.
 * @param {EmitterOptions|Array} emitterOptions  An object, or array of objects, describing the options to pass to each emitter.
 * @param {Boolean} createNew       Should a new emitter be created if the pool runs out?
 * @return {Group} This group instance.
 */
SPE.Group.prototype.addPool = function( numEmitters, emitterOptions, createNew ) {
    'use strict';

    var emitter;

    // Save relevant settings and flags.
    this._poolCreationSettings = emitterOptions;
    this._createNewWhenPoolEmpty = !!createNew;

    // Create the emitters, add them to this group and the pool.
    for ( var i = 0; i < numEmitters; ++i ) {
        if ( Array.isArray( emitterOptions ) ) {
            emitter = new SPE.Emitter( emitterOptions[ i ] );
        }
        else {
            emitter = new SPE.Emitter( emitterOptions );
        }
        this.addEmitter( emitter );
        this.releaseIntoPool( emitter );
    }

    return this;
};



SPE.Group.prototype._triggerSingleEmitter = function( pos ) {
    'use strict';

    var emitter = this.getFromPool(),
        self = this;

    if ( emitter === null ) {
        console.log( 'SPE.Group pool ran out.' );
        return;
    }

    // TODO:
    // - Make sure buffers are update with thus new position.
    if ( pos instanceof THREE.Vector3 ) {
        emitter.position.value.copy( pos );

        // Trigger the setter for this property to force an
        // update to the emitter's position attribute.
        emitter.position.value = emitter.position.value;
    }

    emitter.enable();

    setTimeout( function() {
        emitter.disable();
        self.releaseIntoPool( emitter );
    }, ( Math.max( emitter.duration, ( emitter.maxAge.value + emitter.maxAge.spread ) ) ) * 1000 );

    return this;
};


/**
 * Set a given number of emitters as alive, with an optional position
 * vector3 to move them to.
 *
 * @param  {Number} numEmitters The number of emitters to activate
 * @param  {Object} [position=undefined] A THREE.Vector3 instance describing the position to activate the emitter(s) at.
 * @return {Group} This group instance.
 */
SPE.Group.prototype.triggerPoolEmitter = function( numEmitters, position ) {
    'use strict';

    if ( typeof numEmitters === 'number' && numEmitters > 1 ) {
        for ( var i = 0; i < numEmitters; ++i ) {
            this._triggerSingleEmitter( position );
        }
    }
    else {
        this._triggerSingleEmitter( position );
    }

    return this;
};



SPE.Group.prototype._updateUniforms = function( dt ) {
    'use strict';

    this.uniforms.runTime.value += dt;
    this.uniforms.deltaTime.value = dt;
};

SPE.Group.prototype._resetBufferRanges = function() {
    'use strict';

    var keys = this.attributeKeys,
        i = this.attributeCount - 1,
        attrs = this.attributes;

    for ( i; i >= 0; --i ) {
        attrs[ keys[ i ] ].resetUpdateRange();
    }
};


SPE.Group.prototype._updateBuffers = function( emitter ) {
    'use strict';

    var keys = this.attributeKeys,
        i = this.attributeCount - 1,
        attrs = this.attributes,
        emitterRanges = emitter.bufferUpdateRanges,
        key,
        emitterAttr,
        attr;

    for ( i; i >= 0; --i ) {
        key = keys[ i ];
        emitterAttr = emitterRanges[ key ];
        attr = attrs[ key ];
        attr.setUpdateRange( emitterAttr.min, emitterAttr.max );
        attr.flagUpdate();
    }
};


/**
 * Simulate all the emitter's belonging to this group, updating
 * attribute values along the way.
 * @param  {Number} [dt=Group's `fixedTimeStep` value] The number of seconds to simulate the group's emitters for (deltaTime)
 */
SPE.Group.prototype.tick = function( dt ) {
    'use strict';

    var emitters = this.emitters,
        numEmitters = emitters.length,
        deltaTime = dt || this.fixedTimeStep,
        keys = this.attributeKeys,
        i,
        attrs = this.attributes;

    // Update uniform values.
    this._updateUniforms( deltaTime );

    // Reset buffer update ranges on the shader attributes.
    this._resetBufferRanges();


    // If nothing needs updating, then stop here.
    if (
        numEmitters === 0 &&
        this._attributesNeedRefresh === false &&
        this._attributesNeedDynamicReset === false
    ) {
        return;
    }

    // Loop through each emitter in this group and
    // simulate it, then update the shader attribute
    // buffers.
    for ( var i = 0, emitter; i < numEmitters; ++i ) {
        emitter = emitters[ i ];
        emitter.tick( deltaTime );
        this._updateBuffers( emitter );
    }

    // If the shader attributes have been refreshed,
    // then the dynamic properties of each buffer
    // attribute will need to be reset back to
    // what they should be.
    if ( this._attributesNeedDynamicReset === true ) {
        i = this.attributeCount - 1;

        for ( i; i >= 0; --i ) {
            attrs[ keys[ i ] ].resetDynamic();
        }

        this._attributesNeedDynamicReset = false;
    }

    // If this group's shader attributes need a full refresh
    // then mark each attribute's buffer attribute as
    // needing so.
    if ( this._attributesNeedRefresh === true ) {
        i = this.attributeCount - 1;

        for ( i; i >= 0; --i ) {
            attrs[ keys[ i ] ].forceUpdateAll();
        }

        this._attributesNeedRefresh = false;
        this._attributesNeedDynamicReset = true;
    }
};


/**
 * Dipose the geometry and material for the group.
 *
 * @return {Group} Group instance.
 */
SPE.Group.prototype.dispose = function() {
    'use strict';
    this.geometry.dispose();
    this.material.dispose();
    return this;
};

/**
 * An SPE.Emitter instance.
 * @typedef {Object} Emitter
 * @see SPE.Emitter
 */

/**
 * A map of options to configure an SPE.Emitter instance.
 *
 * @typedef {Object} EmitterOptions
 *
 * @property {distribution} [type=BOX] The default distribution this emitter should use to control
 *                         its particle's spawn position and force behaviour.
 *                         Must be an SPE.distributions.* value.
 *
 *
 * @property {Number} [particleCount=100] The total number of particles this emitter will hold. NOTE: this is not the number
 *                                  of particles emitted in a second, or anything like that. The number of particles
 *                                  emitted per-second is calculated by particleCount / maxAge (approximately!)
 *
 * @property {Number|null} [duration=null] The duration in seconds that this emitter should live for. If not specified, the emitter
 *                                         will emit particles indefinitely.
 *                                         NOTE: When an emitter is older than a specified duration, the emitter is NOT removed from
 *                                         it's group, but rather is just marked as dead, allowing it to be reanimated at a later time
 *                                         using `SPE.Emitter.prototype.enable()`.
 *
 * @property {Boolean} [isStatic=false] Whether this emitter should be not be simulated (true).
 * @property {Boolean} [activeMultiplier=1] A value between 0 and 1 describing what percentage of this emitter's particlesPerSecond should be
 *                                          emitted, where 0 is 0%, and 1 is 100%.
 *                                          For example, having an emitter with 100 particles, a maxAge of 2, yields a particlesPerSecond
 *                                          value of 50. Setting `activeMultiplier` to 0.5, then, will only emit 25 particles per second (0.5 = 50%).
 *                                          Values greater than 1 will emulate a burst of particles, causing the emitter to run out of particles
 *                                          before it's next activation cycle.
 *
 * @property {Boolean} [direction=1] The direction of the emitter. If value is `1`, emitter will start at beginning of particle's lifecycle.
 *                                   If value is `-1`, emitter will start at end of particle's lifecycle and work it's way backwards.
 *
 * @property {Object} [maxAge={}] An object describing the particle's maximum age in seconds.
 * @property {Number} [maxAge.value=2] A number between 0 and 1 describing the amount of maxAge to apply to all particles.
 * @property {Number} [maxAge.spread=0] A number describing the maxAge variance on a per-particle basis.
 *
 *
 * @property {Object} [position={}] An object describing this emitter's position.
 * @property {Object} [position.value=new THREE.Vector3()] A THREE.Vector3 instance describing this emitter's base position.
 * @property {Object} [position.spread=new THREE.Vector3()] A THREE.Vector3 instance describing this emitter's position variance on a per-particle basis.
 *                                                          Note that when using a SPHERE or DISC distribution, only the x-component
 *                                                          of this vector is used.
 * @property {Object} [position.spreadClamp=new THREE.Vector3()] A THREE.Vector3 instance describing the numeric multiples the particle's should
 *                                                               be spread out over.
 *                                                               Note that when using a SPHERE or DISC distribution, only the x-component
 *                                                               of this vector is used.
 * @property {Number} [position.radius=10] This emitter's base radius.
 * @property {Object} [position.radiusScale=new THREE.Vector3()] A THREE.Vector3 instance describing the radius's scale in all three axes. Allows a SPHERE or DISC to be squashed or stretched.
 * @property {distribution} [position.distribution=value of the `type` option.] A specific distribution to use when radiusing particles. Overrides the `type` option.
 * @property {Boolean} [position.randomise=false] When a particle is re-spawned, whether it's position should be re-randomised or not. Can incur a performance hit.
 *
 *
 * @property {Object} [velocity={}] An object describing this particle velocity.
 * @property {Object} [velocity.value=new THREE.Vector3()] A THREE.Vector3 instance describing this emitter's base velocity.
 * @property {Object} [velocity.spread=new THREE.Vector3()] A THREE.Vector3 instance describing this emitter's velocity variance on a per-particle basis.
 *                                                          Note that when using a SPHERE or DISC distribution, only the x-component
 *                                                          of this vector is used.
 * @property {distribution} [velocity.distribution=value of the `type` option.] A specific distribution to use when calculating a particle's velocity. Overrides the `type` option.
 * @property {Boolean} [velocity.randomise=false] When a particle is re-spawned, whether it's velocity should be re-randomised or not. Can incur a performance hit.
 *
 *
 * @property {Object} [acceleration={}] An object describing this particle's acceleration.
 * @property {Object} [acceleration.value=new THREE.Vector3()] A THREE.Vector3 instance describing this emitter's base acceleration.
 * @property {Object} [acceleration.spread=new THREE.Vector3()] A THREE.Vector3 instance describing this emitter's acceleration variance on a per-particle basis.
 *                           Note that when using a SPHERE or DISC distribution, only the x-component
 *                           of this vector is used.
 * @property {distribution} [acceleration.distribution=value of the `type` option.] A specific distribution to use when calculating a particle's acceleration. Overrides the `type` option.
 * @property {Boolean} [acceleration.randomise=false] When a particle is re-spawned, whether it's acceleration should be re-randomised or not. Can incur a performance hit.
 *
 *
 * @property {Object} [drag={}] An object describing this particle drag. Drag is applied to both velocity and acceleration values.
 * @property {Number} [drag.value=0] A number between 0 and 1 describing the amount of drag to apply to all particles.
 * @property {Number} [drag.spread=0] A number describing the drag variance on a per-particle basis.
 * @property {Boolean} [drag.randomise=false] When a particle is re-spawned, whether it's drag should be re-randomised or not. Can incur a performance hit.
 *
 *
 * @property {Object} [wiggle={}] This is quite a fun one! The values of this object will determine whether a particle will wiggle, or jiggle, or wave,
 *                                or shimmy, or waggle, or... Well you get the idea. The wiggle is calculated over-time, meaning that a particle will
 *                                start off with no wiggle, and end up wiggling about with the distance of the `value` specified by the time it dies.
 *                                It's quite handy to simulate fire embers, or similar effects where the particle's position should slightly change over
 *                                time, and such change isn't easily controlled by rotation, velocity, or acceleration. The wiggle is a combination of sin and cos calculations, so is circular in nature.
 * @property {Number} [wiggle.value=0] A number describing the amount of wiggle to apply to all particles. It's measured in distance.
 * @property {Number} [wiggle.spread=0] A number describing the wiggle variance on a per-particle basis.
 *
 *
 * @property {Object} [rotation={}] An object describing this emitter's rotation. It can either be static, or set to rotate from 0radians to the value of `rotation.value`
 *                                  over a particle's lifetime. Rotation values affect both a particle's position and the forces applied to it.
 * @property {Object} [rotation.axis=new THREE.Vector3(0, 1, 0)] A THREE.Vector3 instance describing this emitter's axis of rotation.
 * @property {Object} [rotation.axisSpread=new THREE.Vector3()] A THREE.Vector3 instance describing the amount of variance to apply to the axis of rotation on
 *                                                              a per-particle basis.
 * @property {Number} [rotation.angle=0] The angle of rotation, given in radians. If `rotation.static` is true, the emitter will start off rotated at this angle, and stay as such.
 *                                       Otherwise, the particles will rotate from 0radians to this value over their lifetimes.
 * @property {Number} [rotation.angleSpread=0] The amount of variance in each particle's rotation angle.
 * @property {Boolean} [rotation.static=false] Whether the rotation should be static or not.
 * @property {Object} [rotation.center=The value of `position.value`] A THREE.Vector3 instance describing the center point of rotation.
 * @property {Boolean} [rotation.randomise=false] When a particle is re-spawned, whether it's rotation should be re-randomised or not. Can incur a performance hit.
 *
 *
 * @property {Object} [color={}] An object describing a particle's color. This property is a "value-over-lifetime" property, meaning an array of values and spreads can be
 *                               given to describe specific value changes over a particle's lifetime.
 *                               Depending on the value of SPE.valueOverLifetimeLength, if arrays of THREE.Color instances are given, then the array will be interpolated to
 *                               have a length matching the value of SPE.valueOverLifetimeLength.
 * @property {Object} [color.value=new THREE.Color()] Either a single THREE.Color instance, or an array of THREE.Color instances to describe the color of a particle over it's lifetime.
 * @property {Object} [color.spread=new THREE.Vector3()] Either a single THREE.Vector3 instance, or an array of THREE.Vector3 instances to describe the color variance of a particle over it's lifetime.
 * @property {Boolean} [color.randomise=false] When a particle is re-spawned, whether it's color should be re-randomised or not. Can incur a performance hit.
 *
 *
 * @property {Object} [opacity={}] An object describing a particle's opacity. This property is a "value-over-lifetime" property, meaning an array of values and spreads can be
 *                               given to describe specific value changes over a particle's lifetime.
 *                               Depending on the value of SPE.valueOverLifetimeLength, if arrays of numbers are given, then the array will be interpolated to
 *                               have a length matching the value of SPE.valueOverLifetimeLength.
 * @property {Number} [opacity.value=1] Either a single number, or an array of numbers to describe the opacity of a particle over it's lifetime.
 * @property {Number} [opacity.spread=0] Either a single number, or an array of numbers to describe the opacity variance of a particle over it's lifetime.
 * @property {Boolean} [opacity.randomise=false] When a particle is re-spawned, whether it's opacity should be re-randomised or not. Can incur a performance hit.
 *
 *
 * @property {Object} [size={}] An object describing a particle's size. This property is a "value-over-lifetime" property, meaning an array of values and spreads can be
 *                               given to describe specific value changes over a particle's lifetime.
 *                               Depending on the value of SPE.valueOverLifetimeLength, if arrays of numbers are given, then the array will be interpolated to
 *                               have a length matching the value of SPE.valueOverLifetimeLength.
 * @property {Number} [size.value=1] Either a single number, or an array of numbers to describe the size of a particle over it's lifetime.
 * @property {Number} [size.spread=0] Either a single number, or an array of numbers to describe the size variance of a particle over it's lifetime.
 * @property {Boolean} [size.randomise=false] When a particle is re-spawned, whether it's size should be re-randomised or not. Can incur a performance hit.
 *
 *
 * @property {Object} [angle={}] An object describing a particle's angle. The angle is a 2d-rotation, measured in radians, applied to the particle's texture.
 *                               NOTE: if a particle's texture is a sprite-sheet, this value IS IGNORED.
 *                               This property is a "value-over-lifetime" property, meaning an array of values and spreads can be
 *                               given to describe specific value changes over a particle's lifetime.
 *                               Depending on the value of SPE.valueOverLifetimeLength, if arrays of numbers are given, then the array will be interpolated to
 *                               have a length matching the value of SPE.valueOverLifetimeLength.
 * @property {Number} [angle.value=0] Either a single number, or an array of numbers to describe the angle of a particle over it's lifetime.
 * @property {Number} [angle.spread=0] Either a single number, or an array of numbers to describe the angle variance of a particle over it's lifetime.
 * @property {Boolean} [angle.randomise=false] When a particle is re-spawned, whether it's angle should be re-randomised or not. Can incur a performance hit.
 *
 */

/**
 * The SPE.Emitter class.
 *
 * @constructor
 *
 * @param {EmitterOptions} options A map of options to configure the emitter.
 */
SPE.Emitter = function( options ) {
    'use strict';

    var utils = SPE.utils,
        types = utils.types,
        lifetimeLength = SPE.valueOverLifetimeLength;

    // Ensure we have a map of options to play with,
    // and that each option is in the correct format.
    options = utils.ensureTypedArg( options, types.OBJECT, {} );
    options.position = utils.ensureTypedArg( options.position, types.OBJECT, {} );
    options.velocity = utils.ensureTypedArg( options.velocity, types.OBJECT, {} );
    options.acceleration = utils.ensureTypedArg( options.acceleration, types.OBJECT, {} );
    options.radius = utils.ensureTypedArg( options.radius, types.OBJECT, {} );
    options.drag = utils.ensureTypedArg( options.drag, types.OBJECT, {} );
    options.rotation = utils.ensureTypedArg( options.rotation, types.OBJECT, {} );
    options.color = utils.ensureTypedArg( options.color, types.OBJECT, {} );
    options.opacity = utils.ensureTypedArg( options.opacity, types.OBJECT, {} );
    options.size = utils.ensureTypedArg( options.size, types.OBJECT, {} );
    options.angle = utils.ensureTypedArg( options.angle, types.OBJECT, {} );
    options.wiggle = utils.ensureTypedArg( options.wiggle, types.OBJECT, {} );
    options.maxAge = utils.ensureTypedArg( options.maxAge, types.OBJECT, {} );

    if ( options.onParticleSpawn ) {
        console.warn( 'onParticleSpawn has been removed. Please set properties directly to alter values at runtime.' );
    }

    this.uuid = THREE.Math.generateUUID();

    this.type = utils.ensureTypedArg( options.type, types.NUMBER, SPE.distributions.BOX );

    // Start assigning properties...kicking it off with props that DON'T support values over
    // lifetimes.
    //
    // Btw, values over lifetimes are just the new way of referring to *Start, *Middle, and *End.
    this.position = {
        _value: utils.ensureInstanceOf( options.position.value, THREE.Vector3, new THREE.Vector3() ),
        _spread: utils.ensureInstanceOf( options.position.spread, THREE.Vector3, new THREE.Vector3() ),
        _spreadClamp: utils.ensureInstanceOf( options.position.spreadClamp, THREE.Vector3, new THREE.Vector3() ),
        _distribution: utils.ensureTypedArg( options.position.distribution, types.NUMBER, this.type ),
        _randomise: utils.ensureTypedArg( options.position.randomise, types.BOOLEAN, false ),
        _radius: utils.ensureTypedArg( options.position.radius, types.NUMBER, 10 ),
        _radiusScale: utils.ensureInstanceOf( options.position.radiusScale, THREE.Vector3, new THREE.Vector3( 1, 1, 1 ) ),
        _distributionClamp: utils.ensureTypedArg( options.position.distributionClamp, types.NUMBER, 0 ),
    };

    this.velocity = {
        _value: utils.ensureInstanceOf( options.velocity.value, THREE.Vector3, new THREE.Vector3() ),
        _spread: utils.ensureInstanceOf( options.velocity.spread, THREE.Vector3, new THREE.Vector3() ),
        _distribution: utils.ensureTypedArg( options.velocity.distribution, types.NUMBER, this.type ),
        _randomise: utils.ensureTypedArg( options.position.randomise, types.BOOLEAN, false )
    };

    this.acceleration = {
        _value: utils.ensureInstanceOf( options.acceleration.value, THREE.Vector3, new THREE.Vector3() ),
        _spread: utils.ensureInstanceOf( options.acceleration.spread, THREE.Vector3, new THREE.Vector3() ),
        _distribution: utils.ensureTypedArg( options.acceleration.distribution, types.NUMBER, this.type ),
        _randomise: utils.ensureTypedArg( options.position.randomise, types.BOOLEAN, false )
    };

    this.drag = {
        _value: utils.ensureTypedArg( options.drag.value, types.NUMBER, 0 ),
        _spread: utils.ensureTypedArg( options.drag.spread, types.NUMBER, 0 ),
        _randomise: utils.ensureTypedArg( options.position.randomise, types.BOOLEAN, false )
    };

    this.wiggle = {
        _value: utils.ensureTypedArg( options.wiggle.value, types.NUMBER, 0 ),
        _spread: utils.ensureTypedArg( options.wiggle.spread, types.NUMBER, 0 )
    };

    this.rotation = {
        _axis: utils.ensureInstanceOf( options.rotation.axis, THREE.Vector3, new THREE.Vector3( 0.0, 1.0, 0.0 ) ),
        _axisSpread: utils.ensureInstanceOf( options.rotation.axisSpread, THREE.Vector3, new THREE.Vector3() ),
        _angle: utils.ensureTypedArg( options.rotation.angle, types.NUMBER, 0 ),
        _angleSpread: utils.ensureTypedArg( options.rotation.angleSpread, types.NUMBER, 0 ),
        _static: utils.ensureTypedArg( options.rotation.static, types.BOOLEAN, false ),
        _center: utils.ensureInstanceOf( options.rotation.center, THREE.Vector3, this.position._value.clone() ),
        _randomise: utils.ensureTypedArg( options.position.randomise, types.BOOLEAN, false )
    };


    this.maxAge = {
        _value: utils.ensureTypedArg( options.maxAge.value, types.NUMBER, 2 ),
        _spread: utils.ensureTypedArg( options.maxAge.spread, types.NUMBER, 0 )
    };



    // The following properties can support either single values, or an array of values that change
    // the property over a particle's lifetime (value over lifetime).
    this.color = {
        _value: utils.ensureArrayInstanceOf( options.color.value, THREE.Color, new THREE.Color() ),
        _spread: utils.ensureArrayInstanceOf( options.color.spread, THREE.Vector3, new THREE.Vector3() ),
        _randomise: utils.ensureTypedArg( options.position.randomise, types.BOOLEAN, false )
    };

    this.opacity = {
        _value: utils.ensureArrayTypedArg( options.opacity.value, types.NUMBER, 1 ),
        _spread: utils.ensureArrayTypedArg( options.opacity.spread, types.NUMBER, 0 ),
        _randomise: utils.ensureTypedArg( options.position.randomise, types.BOOLEAN, false )
    };

    this.size = {
        _value: utils.ensureArrayTypedArg( options.size.value, types.NUMBER, 1 ),
        _spread: utils.ensureArrayTypedArg( options.size.spread, types.NUMBER, 0 ),
        _randomise: utils.ensureTypedArg( options.position.randomise, types.BOOLEAN, false )
    };

    this.angle = {
        _value: utils.ensureArrayTypedArg( options.angle.value, types.NUMBER, 0 ),
        _spread: utils.ensureArrayTypedArg( options.angle.spread, types.NUMBER, 0 ),
        _randomise: utils.ensureTypedArg( options.position.randomise, types.BOOLEAN, false )
    };


    // Assign renaining option values.
    this.particleCount = utils.ensureTypedArg( options.particleCount, types.NUMBER, 100 );
    this.duration = utils.ensureTypedArg( options.duration, types.NUMBER, null );
    this.isStatic = utils.ensureTypedArg( options.isStatic, types.BOOLEAN, false );
    this.activeMultiplier = utils.ensureTypedArg( options.activeMultiplier, types.NUMBER, 1 );
    this.direction = utils.ensureTypedArg( options.direction, types.NUMBER, 1 );

    // Whether this emitter is alive or not.
    this.alive = utils.ensureTypedArg( options.alive, types.BOOLEAN, true );


    // The following properties are set internally and are not
    // user-controllable.
    this.particlesPerSecond = 0;

    // The current particle index for which particles should
    // be marked as active on the next update cycle.
    this.activationIndex = 0;

    // The offset in the typed arrays this emitter's
    // particle's values will start at
    this.attributeOffset = 0;

    // The end of the range in the attribute buffers
    this.attributeEnd = 0;



    // Holds the time the emitter has been alive for.
    this.age = 0.0;

    // Holds the number of currently-alive particles
    this.activeParticleCount = 0.0;

    // Holds a reference to this emitter's group once
    // it's added to one.
    this.group = null;

    // Holds a reference to this emitter's group's attributes object
    // for easier access.
    this.attributes = null;

    // Holds a reference to the params attribute's typed array
    // for quicker access.
    this.paramsArray = null;

    // A set of flags to determine whether particular properties
    // should be re-randomised when a particle is reset.
    //
    // If a `randomise` property is given, this is preferred.
    // Otherwise, it looks at whether a spread value has been
    // given.
    //
    // It allows randomization to be turned off as desired. If
    // all randomization is turned off, then I'd expect a performance
    // boost as no attribute buffers (excluding the `params`)
    // would have to be re-passed to the GPU each frame (since nothing
    // except the `params` attribute would have changed).
    this.resetFlags = {
        // params: utils.ensureTypedArg( options.maxAge.randomise, types.BOOLEAN, !!options.maxAge.spread ) ||
        //     utils.ensureTypedArg( options.wiggle.randomise, types.BOOLEAN, !!options.wiggle.spread ),
        position: utils.ensureTypedArg( options.position.randomise, types.BOOLEAN, false ) ||
            utils.ensureTypedArg( options.radius.randomise, types.BOOLEAN, false ),
        velocity: utils.ensureTypedArg( options.velocity.randomise, types.BOOLEAN, false ),
        acceleration: utils.ensureTypedArg( options.acceleration.randomise, types.BOOLEAN, false ) ||
            utils.ensureTypedArg( options.drag.randomise, types.BOOLEAN, false ),
        rotation: utils.ensureTypedArg( options.rotation.randomise, types.BOOLEAN, false ),
        rotationCenter: utils.ensureTypedArg( options.rotation.randomise, types.BOOLEAN, false ),
        size: utils.ensureTypedArg( options.size.randomise, types.BOOLEAN, false ),
        color: utils.ensureTypedArg( options.color.randomise, types.BOOLEAN, false ),
        opacity: utils.ensureTypedArg( options.opacity.randomise, types.BOOLEAN, false ),
        angle: utils.ensureTypedArg( options.angle.randomise, types.BOOLEAN, false )
    };

    this.updateFlags = {};
    this.updateCounts = {};

    // A map to indicate which emitter parameters should update
    // which attribute.
    this.updateMap = {
        maxAge: 'params',
        position: 'position',
        velocity: 'velocity',
        acceleration: 'acceleration',
        drag: 'acceleration',
        wiggle: 'params',
        rotation: 'rotation',
        size: 'size',
        color: 'color',
        opacity: 'opacity',
        angle: 'angle'
    };

    for ( var i in this.updateMap ) {
        if ( this.updateMap.hasOwnProperty( i ) ) {
            this.updateCounts[ this.updateMap[ i ] ] = 0.0;
            this.updateFlags[ this.updateMap[ i ] ] = false;
            this._createGetterSetters( this[ i ], i );
        }
    }

    this.bufferUpdateRanges = {};
    this.attributeKeys = null;
    this.attributeCount = 0;


    // Ensure that the value-over-lifetime property objects above
    // have value and spread properties that are of the same length.
    //
    // Also, for now, make sure they have a length of 3 (min/max arguments here).
    utils.ensureValueOverLifetimeCompliance( this.color, lifetimeLength, lifetimeLength );
    utils.ensureValueOverLifetimeCompliance( this.opacity, lifetimeLength, lifetimeLength );
    utils.ensureValueOverLifetimeCompliance( this.size, lifetimeLength, lifetimeLength );
    utils.ensureValueOverLifetimeCompliance( this.angle, lifetimeLength, lifetimeLength );
};

SPE.Emitter.constructor = SPE.Emitter;

SPE.Emitter.prototype._createGetterSetters = function( propObj, propName ) {
    'use strict';

    var self = this;

    for ( var i in propObj ) {
        if ( propObj.hasOwnProperty( i ) ) {

            var name = i.replace( '_', '' );

            Object.defineProperty( propObj, name, {
                get: ( function( prop ) {
                    return function() {
                        return this[ prop ];
                    };
                }( i ) ),

                set: ( function( prop ) {
                    return function( value ) {
                        var mapName = self.updateMap[ propName ],
                            prevValue = this[ prop ],
                            length = SPE.valueOverLifetimeLength;

                        if ( prop === '_rotationCenter' ) {
                            self.updateFlags.rotationCenter = true;
                            self.updateCounts.rotationCenter = 0.0;
                        }
                        else if ( prop === '_randomise' ) {
                            self.resetFlags[ mapName ] = value;
                        }
                        else {
                            self.updateFlags[ mapName ] = true;
                            self.updateCounts[ mapName ] = 0.0;
                        }

                        self.group._updateDefines();

                        this[ prop ] = value;

                        // If the previous value was an array, then make
                        // sure the provided value is interpolated correctly.
                        if ( Array.isArray( prevValue ) ) {
                            SPE.utils.ensureValueOverLifetimeCompliance( self[ propName ], length, length );
                        }
                    };
                }( i ) )
            } );
        }
    }
};

SPE.Emitter.prototype._setBufferUpdateRanges = function( keys ) {
    'use strict';

    this.attributeKeys = keys;
    this.attributeCount = keys.length;

    for ( var i = this.attributeCount - 1; i >= 0; --i ) {
        this.bufferUpdateRanges[ keys[ i ] ] = {
            min: Number.POSITIVE_INFINITY,
            max: Number.NEGATIVE_INFINITY
        };
    }
};

SPE.Emitter.prototype._calculatePPSValue = function( groupMaxAge ) {
    'use strict';

    var particleCount = this.particleCount;


    // Calculate the `particlesPerSecond` value for this emitter. It's used
    // when determining which particles should die and which should live to
    // see another day. Or be born, for that matter. The "God" property.
    if ( this.duration ) {
        this.particlesPerSecond = particleCount / ( groupMaxAge < this.duration ? groupMaxAge : this.duration );
    }
    else {
        this.particlesPerSecond = particleCount / groupMaxAge;
    }
};

SPE.Emitter.prototype._setAttributeOffset = function( startIndex ) {
    this.attributeOffset = startIndex;
    this.activationIndex = startIndex;
    this.activationEnd = startIndex + this.particleCount;
};


SPE.Emitter.prototype._assignValue = function( prop, index ) {
    'use strict';

    switch ( prop ) {
        case 'position':
            this._assignPositionValue( index );
            break;

        case 'velocity':
        case 'acceleration':
            this._assignForceValue( index, prop );
            break;

        case 'size':
        case 'opacity':
            this._assignAbsLifetimeValue( index, prop );
            break;

        case 'angle':
            this._assignAngleValue( index );
            break;

        case 'params':
            this._assignParamsValue( index );
            break;

        case 'rotation':
            this._assignRotationValue( index );
            break;

        case 'color':
            this._assignColorValue( index );
            break;
    }
};

SPE.Emitter.prototype._assignPositionValue = function( index ) {
    'use strict';

    var distributions = SPE.distributions,
        utils = SPE.utils,
        prop = this.position,
        attr = this.attributes.position,
        value = prop._value,
        spread = prop._spread,
        distribution = prop._distribution;

    switch ( distribution ) {
        case distributions.BOX:
            utils.randomVector3( attr, index, value, spread, prop._spreadClamp );
            break;

        case distributions.SPHERE:
            utils.randomVector3OnSphere( attr, index, value, prop._radius, prop._spread.x, prop._radiusScale, prop._spreadClamp.x, prop._distributionClamp || this.particleCount );
            break;

        case distributions.DISC:
            utils.randomVector3OnDisc( attr, index, value, prop._radius, prop._spread.x, prop._radiusScale, prop._spreadClamp.x );
            break;
    }
};

SPE.Emitter.prototype._assignForceValue = function( index, attrName ) {
    'use strict';

    var distributions = SPE.distributions,
        utils = SPE.utils,
        prop = this[ attrName ],
        value = prop._value,
        spread = prop._spread,
        distribution = prop._distribution,
        pos,
        positionX,
        positionY,
        positionZ,
        i;

    switch ( distribution ) {
        case distributions.BOX:
            utils.randomVector3( this.attributes[ attrName ], index, value, spread );
            break;

        case distributions.SPHERE:
            pos = this.attributes.position.typedArray.array;
            i = index * 3;

            // Ensure position values aren't zero, otherwise no force will be
            // applied.
            // positionX = utils.zeroToEpsilon( pos[ i ], true );
            // positionY = utils.zeroToEpsilon( pos[ i + 1 ], true );
            // positionZ = utils.zeroToEpsilon( pos[ i + 2 ], true );
            positionX = pos[ i ];
            positionY = pos[ i + 1 ];
            positionZ = pos[ i + 2 ];

            utils.randomDirectionVector3OnSphere(
                this.attributes[ attrName ], index,
                positionX, positionY, positionZ,
                this.position._value,
                prop._value.x,
                prop._spread.x
            );
            break;

        case distributions.DISC:
            pos = this.attributes.position.typedArray.array;
            i = index * 3;

            // Ensure position values aren't zero, otherwise no force will be
            // applied.
            // positionX = utils.zeroToEpsilon( pos[ i ], true );
            // positionY = utils.zeroToEpsilon( pos[ i + 1 ], true );
            // positionZ = utils.zeroToEpsilon( pos[ i + 2 ], true );
            positionX = pos[ i ];
            positionY = pos[ i + 1 ];
            positionZ = pos[ i + 2 ];

            utils.randomDirectionVector3OnDisc(
                this.attributes[ attrName ], index,
                positionX, positionY, positionZ,
                this.position._value,
                prop._value.x,
                prop._spread.x
            );
            break;
    }

    if ( attrName === 'acceleration' ) {
        var drag = utils.clamp( utils.randomFloat( this.drag._value, this.drag._spread ), 0, 1 );
        this.attributes.acceleration.typedArray.array[ index * 4 + 3 ] = drag;
    }
};

SPE.Emitter.prototype._assignAbsLifetimeValue = function( index, propName ) {
    'use strict';

    var array = this.attributes[ propName ].typedArray,
        prop = this[ propName ],
        utils = SPE.utils,
        value;

    if ( utils.arrayValuesAreEqual( prop._value ) && utils.arrayValuesAreEqual( prop._spread ) ) {
        value = Math.abs( utils.randomFloat( prop._value[ 0 ], prop._spread[ 0 ] ) );
        array.setVec4Components( index, value, value, value, value );
    }
    else {
        array.setVec4Components( index,
            Math.abs( utils.randomFloat( prop._value[ 0 ], prop._spread[ 0 ] ) ),
            Math.abs( utils.randomFloat( prop._value[ 1 ], prop._spread[ 1 ] ) ),
            Math.abs( utils.randomFloat( prop._value[ 2 ], prop._spread[ 2 ] ) ),
            Math.abs( utils.randomFloat( prop._value[ 3 ], prop._spread[ 3 ] ) )
        );
    }
};

SPE.Emitter.prototype._assignAngleValue = function( index ) {
    'use strict';

    var array = this.attributes.angle.typedArray,
        prop = this.angle,
        utils = SPE.utils,
        value;

    if ( utils.arrayValuesAreEqual( prop._value ) && utils.arrayValuesAreEqual( prop._spread ) ) {
        value = utils.randomFloat( prop._value[ 0 ], prop._spread[ 0 ] );
        array.setVec4Components( index, value, value, value, value );
    }
    else {
        array.setVec4Components( index,
            utils.randomFloat( prop._value[ 0 ], prop._spread[ 0 ] ),
            utils.randomFloat( prop._value[ 1 ], prop._spread[ 1 ] ),
            utils.randomFloat( prop._value[ 2 ], prop._spread[ 2 ] ),
            utils.randomFloat( prop._value[ 3 ], prop._spread[ 3 ] )
        );
    }
};

SPE.Emitter.prototype._assignParamsValue = function( index ) {
    'use strict';

    this.attributes.params.typedArray.setVec4Components( index,
        this.isStatic ? 1 : 0,
        0.0,
        Math.abs( SPE.utils.randomFloat( this.maxAge._value, this.maxAge._spread ) ),
        SPE.utils.randomFloat( this.wiggle._value, this.wiggle._spread )
    );
};

SPE.Emitter.prototype._assignRotationValue = function( index ) {
    'use strict';

    this.attributes.rotation.typedArray.setVec3Components( index,
        SPE.utils.getPackedRotationAxis( this.rotation._axis, this.rotation._axisSpread ),
        SPE.utils.randomFloat( this.rotation._angle, this.rotation._angleSpread ),
        this.rotation._static ? 0 : 1
    );

    this.attributes.rotationCenter.typedArray.setVec3( index, this.rotation._center );
};

SPE.Emitter.prototype._assignColorValue = function( index ) {
    'use strict';
    SPE.utils.randomColorAsHex( this.attributes.color, index, this.color._value, this.color._spread );
};

SPE.Emitter.prototype._resetParticle = function( index ) {
    'use strict';

    var resetFlags = this.resetFlags,
        updateFlags = this.updateFlags,
        updateCounts = this.updateCounts,
        keys = this.attributeKeys,
        key,
        updateFlag;

    for ( var i = this.attributeCount - 1; i >= 0; --i ) {
        key = keys[ i ];
        updateFlag = updateFlags[ key ];

        if ( resetFlags[ key ] === true || updateFlag === true ) {
            this._assignValue( key, index );
            this._updateAttributeUpdateRange( key, index );

            if ( updateFlag === true && updateCounts[ key ] === this.particleCount ) {
                updateFlags[ key ] = false;
                updateCounts[ key ] = 0.0;
            }
            else if ( updateFlag == true ) {
                ++updateCounts[ key ];
            }
        }
    }
};

SPE.Emitter.prototype._updateAttributeUpdateRange = function( attr, i ) {
    'use strict';

    var ranges = this.bufferUpdateRanges[ attr ];

    ranges.min = Math.min( i, ranges.min );
    ranges.max = Math.max( i, ranges.max );
};

SPE.Emitter.prototype._resetBufferRanges = function() {
    'use strict';

    var ranges = this.bufferUpdateRanges,
        keys = this.bufferUpdateKeys,
        i = this.bufferUpdateCount - 1,
        key;

    for ( i; i >= 0; --i ) {
        key = keys[ i ];
        ranges[ key ].min = Number.POSITIVE_INFINITY;
        ranges[ key ].max = Number.NEGATIVE_INFINITY;
    }
};

SPE.Emitter.prototype._onRemove = function() {
    'use strict';
    // Reset any properties of the emitter that were set by
    // a group when it was added.
    this.particlesPerSecond = 0;
    this.attributeOffset = 0;
    this.activationIndex = 0;
    this.activeParticleCount = 0;
    this.group = null;
    this.attributes = null;
    this.paramsArray = null;
    this.age = 0.0;
};

SPE.Emitter.prototype._decrementParticleCount = function() {
    'use strict';
    --this.activeParticleCount;

    // TODO:
    //  - Trigger event if count === 0.
};

SPE.Emitter.prototype._incrementParticleCount = function() {
    'use strict';
    ++this.activeParticleCount;

    // TODO:
    //  - Trigger event if count === this.particleCount.
};

SPE.Emitter.prototype._checkParticleAges = function( start, end, params, dt ) {
    'use strict';
    for ( var i = end - 1, index, maxAge, age, alive; i >= start; --i ) {
        index = i * 4;

        alive = params[ index ];

        if ( alive === 0.0 ) {
            continue;
        }

        // Increment age
        age = params[ index + 1 ];
        maxAge = params[ index + 2 ];

        if ( this.direction === 1 ) {
            age += dt;

            if ( age >= maxAge ) {
                age = 0.0;
                alive = 0.0;
                this._decrementParticleCount();
            }
        }
        else {
            age -= dt;

            if ( age <= 0.0 ) {
                age = maxAge;
                alive = 0.0;
                this._decrementParticleCount();
            }
        }

        params[ index ] = alive;
        params[ index + 1 ] = age;

        this._updateAttributeUpdateRange( 'params', i );
    }
};

SPE.Emitter.prototype._activateParticles = function( activationStart, activationEnd, params, dtPerParticle ) {
    'use strict';
    var direction = this.direction;

    for ( var i = activationStart, index, dtValue; i < activationEnd; ++i ) {
        index = i * 4;

        // Don't re-activate particles that aren't dead yet.
        // if ( params[ index ] !== 0.0 && ( this.particleCount !== 1 || this.activeMultiplier !== 1 ) ) {
        //     continue;
        // }

        if ( params[ index ] != 0.0 && this.particleCount !== 1 ) {
            continue;
        }

        // Increment the active particle count.
        this._incrementParticleCount();

        // Mark the particle as alive.
        params[ index ] = 1.0;

        // Reset the particle
        this._resetParticle( i );

        // Move each particle being activated to
        // it's actual position in time.
        //
        // This stops particles being 'clumped' together
        // when frame rates are on the lower side of 60fps
        // or not constant (a very real possibility!)
        dtValue = dtPerParticle * ( i - activationStart )
        params[ index + 1 ] = direction === -1 ? params[ index + 2 ] - dtValue : dtValue;

        this._updateAttributeUpdateRange( 'params', i );
    }
};

/**
 * Simulates one frame's worth of particles, updating particles
 * that are already alive, and marking ones that are currently dead
 * but should be alive as alive.
 *
 * If the emitter is marked as static, then this function will do nothing.
 *
 * @param  {Number} dt The number of seconds to simulate (deltaTime)
 */
SPE.Emitter.prototype.tick = function( dt ) {
    'use strict';

    if ( this.isStatic ) {
        return;
    }

    if ( this.paramsArray === null ) {
        this.paramsArray = this.attributes.params.typedArray.array;
    }

    var start = this.attributeOffset,
        end = start + this.particleCount,
        params = this.paramsArray, // vec3( alive, age, maxAge, wiggle )
        ppsDt = this.particlesPerSecond * this.activeMultiplier * dt,
        activationIndex = this.activationIndex;

    // Reset the buffer update indices.
    this._resetBufferRanges();

    // Increment age for those particles that are alive,
    // and kill off any particles whose age is over the limit.
    this._checkParticleAges( start, end, params, dt );

    // If the emitter is dead, reset the age of the emitter to zero,
    // ready to go again if required
    if ( this.alive === false ) {
        this.age = 0.0;
        return;
    }

    // If the emitter has a specified lifetime and we've exceeded it,
    // mark the emitter as dead.
    if ( this.duration !== null && this.age > this.duration ) {
        this.alive = false;
        this.age = 0.0;
        return;
    }


    var activationStart = this.particleCount === 1 ? activationIndex : ( activationIndex | 0 ),
        activationEnd = Math.min( activationStart + ppsDt, this.activationEnd ),
        activationCount = activationEnd - this.activationIndex | 0,
        dtPerParticle = activationCount > 0 ? dt / activationCount : 0;

    this._activateParticles( activationStart, activationEnd, params, dtPerParticle );

    // Move the activation window forward, soldier.
    this.activationIndex += ppsDt;

    if ( this.activationIndex > end ) {
        this.activationIndex = start;
    }


    // Increment the age of the emitter.
    this.age += dt;
};

/**
 * Resets all the emitter's particles to their start positions
 * and marks the particles as dead if the `force` argument is
 * true.
 *
 * @param  {Boolean} [force=undefined] If true, all particles will be marked as dead instantly.
 * @return {Emitter}       This emitter instance.
 */
SPE.Emitter.prototype.reset = function( force ) {
    'use strict';

    this.age = 0.0;
    this.alive = false;

    if ( force === true ) {
        var start = this.attributeOffset,
            end = start + this.particleCount,
            array = this.paramsArray,
            attr = this.attributes.params.bufferAttribute;

        for ( var i = end - 1, index; i >= start; --i ) {
            index = i * 4;

            array[ index ] = 0.0;
            array[ index + 1 ] = 0.0;
        }

        attr.updateRange.offset = 0;
        attr.updateRange.count = -1;
        attr.needsUpdate = true;
    }

    return this;
};

/**
 * Enables the emitter. If not already enabled, the emitter
 * will start emitting particles.
 *
 * @return {Emitter} This emitter instance.
 */
SPE.Emitter.prototype.enable = function() {
    'use strict';
    this.alive = true;
    return this;
};

/**
 * Disables th emitter, but does not instantly remove it's
 * particles fromt the scene. When called, the emitter will be
 * 'switched off' and just stop emitting. Any particle's alive will
 * be allowed to finish their lifecycle.
 *
 * @return {Emitter} This emitter instance.
 */
SPE.Emitter.prototype.disable = function() {
    'use strict';

    this.alive = false;
    return this;
};

/**
 * Remove this emitter from it's parent group (if it has been added to one).
 * Delgates to SPE.group.prototype.removeEmitter().
 *
 * When called, all particle's belonging to this emitter will be instantly
 * removed from the scene.
 *
 * @return {Emitter} This emitter instance.
 *
 * @see SPE.Group.prototype.removeEmitter
 */
SPE.Emitter.prototype.remove = function() {
    'use strict';
    if ( this.group !== null ) {
        this.group.removeEmitter( this );
    }
    else {
        console.error( 'Emitter does not belong to a group, cannot remove.' );
    }

    return this;
};


/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = {
  'basic': {wrapCount: 30, inputOffsetY: 0.008, inputOffsetX: 0.08, img: 'sk-basic.png', layout: [{'key': '1', 'x': 0.044, 'y': 0.226, 'w': 0.079, 'h': 0.152}, {'key': '2', 'x': 0.124, 'y': 0.226, 'w': 0.079, 'h': 0.152}, {'key': '3', 'x': 0.203, 'y': 0.226, 'w': 0.079, 'h': 0.152}, {'key': '4', 'x': 0.282, 'y': 0.226, 'w': 0.08, 'h': 0.152}, {'key': '5', 'x': 0.363, 'y': 0.226, 'w': 0.079, 'h': 0.152}, {'key': '6', 'x': 0.442, 'y': 0.226, 'w': 0.079, 'h': 0.152}, {'key': '7', 'x': 0.521, 'y': 0.226, 'w': 0.079, 'h': 0.152}, {'key': '8', 'x': 0.601, 'y': 0.226, 'w': 0.08, 'h': 0.152}, {'key': '9', 'x': 0.681, 'y': 0.226, 'w': 0.079, 'h': 0.152}, {'key': '0', 'x': 0.761, 'y': 0.226, 'w': 0.079, 'h': 0.152}, {'key': 'Delete', 'x': 0.846, 'y': 0.227, 'w': 0.108, 'h': 0.146}, {'key': 'Enter', 'x': 0.847, 'y': 0.526, 'w': 0.108, 'h': 0.244}, {'key': 'q', 'x': 0.044, 'y': 0.377, 'w': 0.079, 'h': 0.152}, {'key': 'w', 'x': 0.124, 'y': 0.377, 'w': 0.079, 'h': 0.152}, {'key': 'e', 'x': 0.203, 'y': 0.377, 'w': 0.079, 'h': 0.152}, {'key': 'r', 'x': 0.282, 'y': 0.377, 'w': 0.08, 'h': 0.152}, {'key': 't', 'x': 0.363, 'y': 0.377, 'w': 0.079, 'h': 0.152}, {'key': 'y', 'x': 0.442, 'y': 0.377, 'w': 0.079, 'h': 0.152}, {'key': 'u', 'x': 0.521, 'y': 0.377, 'w': 0.079, 'h': 0.152}, {'key': 'i', 'x': 0.601, 'y': 0.377, 'w': 0.08, 'h': 0.152}, {'key': 'o', 'x': 0.681, 'y': 0.377, 'w': 0.079, 'h': 0.152}, {'key': 'p', 'x': 0.761, 'y': 0.377, 'w': 0.079, 'h': 0.152}, {'key': 'l', 'x': 0.729, 'y': 0.53, 'w': 0.08, 'h': 0.154}, {'key': 'a', 'x': 0.092, 'y': 0.53, 'w': 0.08, 'h': 0.154}, {'key': 's', 'x': 0.171, 'y': 0.53, 'w': 0.08, 'h': 0.154}, {'key': 'd', 'x': 0.251, 'y': 0.53, 'w': 0.08, 'h': 0.154}, {'key': 'f', 'x': 0.331, 'y': 0.53, 'w': 0.079, 'h': 0.154}, {'key': 'g', 'x': 0.41, 'y': 0.53, 'w': 0.08, 'h': 0.154}, {'key': 'h', 'x': 0.49, 'y': 0.53, 'w': 0.079, 'h': 0.154}, {'key': 'j', 'x': 0.57, 'y': 0.53, 'w': 0.079, 'h': 0.154}, {'key': 'k', 'x': 0.649, 'y': 0.53, 'w': 0.08, 'h': 0.154}, {'key': 'z', 'x': 0.172, 'y': 0.684, 'w': 0.079, 'h': 0.154}, {'key': 'x', 'x': 0.251, 'y': 0.684, 'w': 0.08, 'h': 0.154}, {'key': 'c', 'x': 0.331, 'y': 0.684, 'w': 0.079, 'h': 0.154}, {'key': 'v', 'x': 0.41, 'y': 0.684, 'w': 0.08, 'h': 0.154}, {'key': 'b', 'x': 0.49, 'y': 0.684, 'w': 0.08, 'h': 0.154}, {'key': 'n', 'x': 0.57, 'y': 0.684, 'w': 0.079, 'h': 0.154}, {'key': 'm', 'x': 0.649, 'y': 0.684, 'w': 0.08, 'h': 0.154}, {'key': ' ', 'x': 0.27, 'y': 0.838, 'w': 0.415, 'h': 0.126}, {'key': 'Shift', 'x': 0.042, 'y': 0.827, 'w': 0.068, 'h': 0.142}, {'key': 'Escape', 'x': 0.876, 'y': 0.823, 'w': 0.078, 'h': 0.134}, {'key': 'Insert', 'x': 0.058, 'y': 0, 'w': 0.881, 'h': 0.149}]},
  'numpad': {wrapCount: 20, inputOffsetY: 0.005, inputOffsetX: 0.32, img: 'sk-numpad.png', layout: [{'key': '7', 'x': 0.313, 'y': 0.254, 'w': 0.088, 'h': 0.177}, {'key': '8', 'x': 0.401, 'y': 0.254, 'w': 0.088, 'h': 0.177}, {'key': '9', 'x': 0.49, 'y': 0.254, 'w': 0.088, 'h': 0.177}, {'key': '4', 'x': 0.313, 'y': 0.431, 'w': 0.088, 'h': 0.177}, {'key': '5', 'x': 0.401, 'y': 0.431, 'w': 0.088, 'h': 0.177}, {'key': '6', 'x': 0.49, 'y': 0.431, 'w': 0.088, 'h': 0.177}, {'key': '2', 'x': 0.401, 'y': 0.608, 'w': 0.088, 'h': 0.177}, {'key': '1', 'x': 0.313, 'y': 0.608, 'w': 0.088, 'h': 0.177}, {'key': '3', 'x': 0.49, 'y': 0.608, 'w': 0.088, 'h': 0.177}, {'key': '0', 'x': 0.313, 'y': 0.785, 'w': 0.177, 'h': 0.161}, {'key': '.', 'x': 0.49, 'y': 0.785, 'w': 0.088, 'h': 0.161}, {'key': 'Escape', 'x': 0.578, 'y': 0.785, 'w': 0.105, 'h': 0.161}, {'key': 'Enter', 'x': 0.578, 'y': 0.431, 'w': 0.105, 'h': 0.354}, {'key': 'Delete', 'x': 0.578, 'y': 0.254, 'w': 0.105, 'h': 0.177}, {'key': 'Insert', 'x': 0.294, 'y': 0.001, 'w': 0.409, 'h': 0.19}]}
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {module.exports = AlgoliaSearchCore;

var errors = __webpack_require__(53);
var exitPromise = __webpack_require__(166);
var IndexCore = __webpack_require__(159);
var store = __webpack_require__(169);

// We will always put the API KEY in the JSON body in case of too long API KEY,
// to avoid query string being too long and failing in various conditions (our server limit, browser limit,
// proxies limit)
var MAX_API_KEY_LENGTH = 500;
var RESET_APP_DATA_TIMER =
  process.env.RESET_APP_DATA_TIMER && parseInt(process.env.RESET_APP_DATA_TIMER, 10) ||
  60 * 2 * 1000; // after 2 minutes reset to first host

/*
 * Algolia Search library initialization
 * https://www.algolia.com/
 *
 * @param {string} applicationID - Your applicationID, found in your dashboard
 * @param {string} apiKey - Your API key, found in your dashboard
 * @param {Object} [opts]
 * @param {number} [opts.timeout=2000] - The request timeout set in milliseconds,
 * another request will be issued after this timeout
 * @param {string} [opts.protocol='https:'] - The protocol used to query Algolia Search API.
 *                                        Set to 'http:' to force using http.
 * @param {Object|Array} [opts.hosts={
 *           read: [this.applicationID + '-dsn.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]),
 *           write: [this.applicationID + '.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]) - The hosts to use for Algolia Search API.
 *           If you provide them, you will less benefit from our HA implementation
 */
function AlgoliaSearchCore(applicationID, apiKey, opts) {
  var debug = __webpack_require__(51)('algoliasearch');

  var clone = __webpack_require__(42);
  var isArray = __webpack_require__(71);
  var map = __webpack_require__(54);

  var usage = 'Usage: algoliasearch(applicationID, apiKey, opts)';

  if (opts._allowEmptyCredentials !== true && !applicationID) {
    throw new errors.AlgoliaSearchError('Please provide an application ID. ' + usage);
  }

  if (opts._allowEmptyCredentials !== true && !apiKey) {
    throw new errors.AlgoliaSearchError('Please provide an API key. ' + usage);
  }

  this.applicationID = applicationID;
  this.apiKey = apiKey;

  this.hosts = {
    read: [],
    write: []
  };

  opts = opts || {};

  this._timeouts = opts.timeouts || {
    connect: 1 * 1000, // 500ms connect is GPRS latency
    read: 2 * 1000,
    write: 30 * 1000
  };

  // backward compat, if opts.timeout is passed, we use it to configure all timeouts like before
  if (opts.timeout) {
    this._timeouts.connect = this._timeouts.read = this._timeouts.write = opts.timeout;
  }

  var protocol = opts.protocol || 'https:';
  // while we advocate for colon-at-the-end values: 'http:' for `opts.protocol`
  // we also accept `http` and `https`. It's a common error.
  if (!/:$/.test(protocol)) {
    protocol = protocol + ':';
  }

  if (protocol !== 'http:' && protocol !== 'https:') {
    throw new errors.AlgoliaSearchError('protocol must be `http:` or `https:` (was `' + opts.protocol + '`)');
  }

  this._checkAppIdData();

  if (!opts.hosts) {
    var defaultHosts = map(this._shuffleResult, function(hostNumber) {
      return applicationID + '-' + hostNumber + '.algolianet.com';
    });

    // no hosts given, compute defaults
    var mainSuffix = (opts.dsn === false ? '' : '-dsn') + '.algolia.net';
    this.hosts.read = [this.applicationID + mainSuffix].concat(defaultHosts);
    this.hosts.write = [this.applicationID + '.algolia.net'].concat(defaultHosts);
  } else if (isArray(opts.hosts)) {
    // when passing custom hosts, we need to have a different host index if the number
    // of write/read hosts are different.
    this.hosts.read = clone(opts.hosts);
    this.hosts.write = clone(opts.hosts);
  } else {
    this.hosts.read = clone(opts.hosts.read);
    this.hosts.write = clone(opts.hosts.write);
  }

  // add protocol and lowercase hosts
  this.hosts.read = map(this.hosts.read, prepareHost(protocol));
  this.hosts.write = map(this.hosts.write, prepareHost(protocol));

  this.extraHeaders = {};

  // In some situations you might want to warm the cache
  this.cache = opts._cache || {};

  this._ua = opts._ua;
  this._useCache = opts._useCache === undefined || opts._cache ? true : opts._useCache;
  this._useRequestCache = this._useCache && opts._useRequestCache;
  this._useFallback = opts.useFallback === undefined ? true : opts.useFallback;

  this._setTimeout = opts._setTimeout;

  debug('init done, %j', this);
}

/*
 * Get the index object initialized
 *
 * @param indexName the name of index
 * @param callback the result callback with one argument (the Index instance)
 */
AlgoliaSearchCore.prototype.initIndex = function(indexName) {
  return new IndexCore(this, indexName);
};

/**
* Add an extra field to the HTTP request
*
* @param name the header field name
* @param value the header field value
*/
AlgoliaSearchCore.prototype.setExtraHeader = function(name, value) {
  this.extraHeaders[name.toLowerCase()] = value;
};

/**
* Get the value of an extra HTTP header
*
* @param name the header field name
*/
AlgoliaSearchCore.prototype.getExtraHeader = function(name) {
  return this.extraHeaders[name.toLowerCase()];
};

/**
* Remove an extra field from the HTTP request
*
* @param name the header field name
*/
AlgoliaSearchCore.prototype.unsetExtraHeader = function(name) {
  delete this.extraHeaders[name.toLowerCase()];
};

/**
* Augment sent x-algolia-agent with more data, each agent part
* is automatically separated from the others by a semicolon;
*
* @param algoliaAgent the agent to add
*/
AlgoliaSearchCore.prototype.addAlgoliaAgent = function(algoliaAgent) {
  if (this._ua.indexOf(';' + algoliaAgent) === -1) {
    this._ua += ';' + algoliaAgent;
  }
};

/*
 * Wrapper that try all hosts to maximize the quality of service
 */
AlgoliaSearchCore.prototype._jsonRequest = function(initialOpts) {
  this._checkAppIdData();

  var requestDebug = __webpack_require__(51)('algoliasearch:' + initialOpts.url);


  var body;
  var cacheID;
  var additionalUA = initialOpts.additionalUA || '';
  var cache = initialOpts.cache;
  var client = this;
  var tries = 0;
  var usingFallback = false;
  var hasFallback = client._useFallback && client._request.fallback && initialOpts.fallback;
  var headers;

  if (
    this.apiKey.length > MAX_API_KEY_LENGTH &&
    initialOpts.body !== undefined &&
    (initialOpts.body.params !== undefined || // index.search()
    initialOpts.body.requests !== undefined) // client.search()
  ) {
    initialOpts.body.apiKey = this.apiKey;
    headers = this._computeRequestHeaders({
      additionalUA: additionalUA,
      withApiKey: false,
      headers: initialOpts.headers
    });
  } else {
    headers = this._computeRequestHeaders({
      additionalUA: additionalUA,
      headers: initialOpts.headers
    });
  }

  if (initialOpts.body !== undefined) {
    body = safeJSONStringify(initialOpts.body);
  }

  requestDebug('request start');
  var debugData = [];


  function doRequest(requester, reqOpts) {
    client._checkAppIdData();

    var startTime = new Date();

    if (client._useCache && !client._useRequestCache) {
      cacheID = initialOpts.url;
    }

    // as we sometime use POST requests to pass parameters (like query='aa'),
    // the cacheID must also include the body to be different between calls
    if (client._useCache && !client._useRequestCache && body) {
      cacheID += '_body_' + reqOpts.body;
    }

    // handle cache existence
    if (isCacheValidWithCurrentID(!client._useRequestCache, cache, cacheID)) {
      requestDebug('serving response from cache');

      var responseText = cache[cacheID];

      // Cache response must match the type of the original one
      return client._promise.resolve({
        body: JSON.parse(responseText),
        responseText: responseText
      });
    }

    // if we reached max tries
    if (tries >= client.hosts[initialOpts.hostType].length) {
      if (!hasFallback || usingFallback) {
        requestDebug('could not get any response');
        // then stop
        return client._promise.reject(new errors.AlgoliaSearchError(
          'Cannot connect to the AlgoliaSearch API.' +
          ' Send an email to support@algolia.com to report and resolve the issue.' +
          ' Application id was: ' + client.applicationID, {debugData: debugData}
        ));
      }

      requestDebug('switching to fallback');

      // let's try the fallback starting from here
      tries = 0;

      // method, url and body are fallback dependent
      reqOpts.method = initialOpts.fallback.method;
      reqOpts.url = initialOpts.fallback.url;
      reqOpts.jsonBody = initialOpts.fallback.body;
      if (reqOpts.jsonBody) {
        reqOpts.body = safeJSONStringify(reqOpts.jsonBody);
      }
      // re-compute headers, they could be omitting the API KEY
      headers = client._computeRequestHeaders({
        additionalUA: additionalUA,
        headers: initialOpts.headers
      });

      reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
      client._setHostIndexByType(0, initialOpts.hostType);
      usingFallback = true; // the current request is now using fallback
      return doRequest(client._request.fallback, reqOpts);
    }

    var currentHost = client._getHostByType(initialOpts.hostType);

    var url = currentHost + reqOpts.url;
    var options = {
      body: reqOpts.body,
      jsonBody: reqOpts.jsonBody,
      method: reqOpts.method,
      headers: headers,
      timeouts: reqOpts.timeouts,
      debug: requestDebug,
      forceAuthHeaders: reqOpts.forceAuthHeaders
    };

    requestDebug('method: %s, url: %s, headers: %j, timeouts: %d',
      options.method, url, options.headers, options.timeouts);

    if (requester === client._request.fallback) {
      requestDebug('using fallback');
    }

    // `requester` is any of this._request or this._request.fallback
    // thus it needs to be called using the client as context
    return requester.call(client, url, options).then(success, tryFallback);

    function success(httpResponse) {
      // compute the status of the response,
      //
      // When in browser mode, using XDR or JSONP, we have no statusCode available
      // So we rely on our API response `status` property.
      // But `waitTask` can set a `status` property which is not the statusCode (it's the task status)
      // So we check if there's a `message` along `status` and it means it's an error
      //
      // That's the only case where we have a response.status that's not the http statusCode
      var status = httpResponse && httpResponse.body && httpResponse.body.message && httpResponse.body.status ||

        // this is important to check the request statusCode AFTER the body eventual
        // statusCode because some implementations (jQuery XDomainRequest transport) may
        // send statusCode 200 while we had an error
        httpResponse.statusCode ||

        // When in browser mode, using XDR or JSONP
        // we default to success when no error (no response.status && response.message)
        // If there was a JSON.parse() error then body is null and it fails
        httpResponse && httpResponse.body && 200;

      requestDebug('received response: statusCode: %s, computed statusCode: %d, headers: %j',
        httpResponse.statusCode, status, httpResponse.headers);

      var httpResponseOk = Math.floor(status / 100) === 2;

      var endTime = new Date();
      debugData.push({
        currentHost: currentHost,
        headers: removeCredentials(headers),
        content: body || null,
        contentLength: body !== undefined ? body.length : null,
        method: reqOpts.method,
        timeouts: reqOpts.timeouts,
        url: reqOpts.url,
        startTime: startTime,
        endTime: endTime,
        duration: endTime - startTime,
        statusCode: status
      });

      if (httpResponseOk) {
        if (client._useCache && !client._useRequestCache && cache) {
          cache[cacheID] = httpResponse.responseText;
        }

        return {
          responseText: httpResponse.responseText,
          body: httpResponse.body
        };
      }

      var shouldRetry = Math.floor(status / 100) !== 4;

      if (shouldRetry) {
        tries += 1;
        return retryRequest();
      }

      requestDebug('unrecoverable error');

      // no success and no retry => fail
      var unrecoverableError = new errors.AlgoliaSearchError(
        httpResponse.body && httpResponse.body.message, {debugData: debugData, statusCode: status}
      );

      return client._promise.reject(unrecoverableError);
    }

    function tryFallback(err) {
      // error cases:
      //  While not in fallback mode:
      //    - CORS not supported
      //    - network error
      //  While in fallback mode:
      //    - timeout
      //    - network error
      //    - badly formatted JSONP (script loaded, did not call our callback)
      //  In both cases:
      //    - uncaught exception occurs (TypeError)
      requestDebug('error: %s, stack: %s', err.message, err.stack);

      var endTime = new Date();
      debugData.push({
        currentHost: currentHost,
        headers: removeCredentials(headers),
        content: body || null,
        contentLength: body !== undefined ? body.length : null,
        method: reqOpts.method,
        timeouts: reqOpts.timeouts,
        url: reqOpts.url,
        startTime: startTime,
        endTime: endTime,
        duration: endTime - startTime
      });

      if (!(err instanceof errors.AlgoliaSearchError)) {
        err = new errors.Unknown(err && err.message, err);
      }

      tries += 1;

      // stop the request implementation when:
      if (
        // we did not generate this error,
        // it comes from a throw in some other piece of code
        err instanceof errors.Unknown ||

        // server sent unparsable JSON
        err instanceof errors.UnparsableJSON ||

        // max tries and already using fallback or no fallback
        tries >= client.hosts[initialOpts.hostType].length &&
        (usingFallback || !hasFallback)) {
        // stop request implementation for this command
        err.debugData = debugData;
        return client._promise.reject(err);
      }

      // When a timeout occured, retry by raising timeout
      if (err instanceof errors.RequestTimeout) {
        return retryRequestWithHigherTimeout();
      }

      return retryRequest();
    }

    function retryRequest() {
      requestDebug('retrying request');
      client._incrementHostIndex(initialOpts.hostType);
      return doRequest(requester, reqOpts);
    }

    function retryRequestWithHigherTimeout() {
      requestDebug('retrying request with higher timeout');
      client._incrementHostIndex(initialOpts.hostType);
      client._incrementTimeoutMultipler();
      reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
      return doRequest(requester, reqOpts);
    }
  }

  function isCacheValidWithCurrentID(
    useRequestCache,
    currentCache,
    currentCacheID
  ) {
    return (
      client._useCache &&
      useRequestCache &&
      currentCache &&
      currentCache[currentCacheID] !== undefined
    );
  }


  function interopCallbackReturn(request, callback) {
    if (isCacheValidWithCurrentID(client._useRequestCache, cache, cacheID)) {
      request.catch(function() {
        // Release the cache on error
        delete cache[cacheID];
      });
    }

    if (typeof initialOpts.callback === 'function') {
      // either we have a callback
      request.then(function okCb(content) {
        exitPromise(function() {
          initialOpts.callback(null, callback(content));
        }, client._setTimeout || setTimeout);
      }, function nookCb(err) {
        exitPromise(function() {
          initialOpts.callback(err);
        }, client._setTimeout || setTimeout);
      });
    } else {
      // either we are using promises
      return request.then(callback);
    }
  }

  if (client._useCache && client._useRequestCache) {
    cacheID = initialOpts.url;
  }

  // as we sometime use POST requests to pass parameters (like query='aa'),
  // the cacheID must also include the body to be different between calls
  if (client._useCache && client._useRequestCache && body) {
    cacheID += '_body_' + body;
  }

  if (isCacheValidWithCurrentID(client._useRequestCache, cache, cacheID)) {
    requestDebug('serving request from cache');

    var maybePromiseForCache = cache[cacheID];

    // In case the cache is warmup with value that is not a promise
    var promiseForCache = typeof maybePromiseForCache.then !== 'function'
      ? client._promise.resolve({responseText: maybePromiseForCache})
      : maybePromiseForCache;

    return interopCallbackReturn(promiseForCache, function(content) {
      // In case of the cache request, return the original value
      return JSON.parse(content.responseText);
    });
  }

  var request = doRequest(
    client._request, {
      url: initialOpts.url,
      method: initialOpts.method,
      body: body,
      jsonBody: initialOpts.body,
      timeouts: client._getTimeoutsForRequest(initialOpts.hostType),
      forceAuthHeaders: initialOpts.forceAuthHeaders
    }
  );

  if (client._useCache && client._useRequestCache && cache) {
    cache[cacheID] = request;
  }

  return interopCallbackReturn(request, function(content) {
    // In case of the first request, return the JSON value
    return content.body;
  });
};

/*
* Transform search param object in query string
* @param {object} args arguments to add to the current query string
* @param {string} params current query string
* @return {string} the final query string
*/
AlgoliaSearchCore.prototype._getSearchParams = function(args, params) {
  if (args === undefined || args === null) {
    return params;
  }
  for (var key in args) {
    if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
      params += params === '' ? '' : '&';
      params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? safeJSONStringify(args[key]) : args[key]);
    }
  }
  return params;
};

/**
 * Compute the headers for a request
 *
 * @param [string] options.additionalUA semi-colon separated string with other user agents to add
 * @param [boolean=true] options.withApiKey Send the api key as a header
 * @param [Object] options.headers Extra headers to send
 */
AlgoliaSearchCore.prototype._computeRequestHeaders = function(options) {
  var forEach = __webpack_require__(47);

  var ua = options.additionalUA ?
    this._ua + ';' + options.additionalUA :
    this._ua;

  var requestHeaders = {
    'x-algolia-agent': ua,
    'x-algolia-application-id': this.applicationID
  };

  // browser will inline headers in the url, node.js will use http headers
  // but in some situations, the API KEY will be too long (big secured API keys)
  // so if the request is a POST and the KEY is very long, we will be asked to not put
  // it into headers but in the JSON body
  if (options.withApiKey !== false) {
    requestHeaders['x-algolia-api-key'] = this.apiKey;
  }

  if (this.userToken) {
    requestHeaders['x-algolia-usertoken'] = this.userToken;
  }

  if (this.securityTags) {
    requestHeaders['x-algolia-tagfilters'] = this.securityTags;
  }

  forEach(this.extraHeaders, function addToRequestHeaders(value, key) {
    requestHeaders[key] = value;
  });

  if (options.headers) {
    forEach(options.headers, function addToRequestHeaders(value, key) {
      requestHeaders[key] = value;
    });
  }

  return requestHeaders;
};

/**
 * Search through multiple indices at the same time
 * @param  {Object[]}   queries  An array of queries you want to run.
 * @param {string} queries[].indexName The index name you want to target
 * @param {string} [queries[].query] The query to issue on this index. Can also be passed into `params`
 * @param {Object} queries[].params Any search param like hitsPerPage, ..
 * @param  {Function} callback Callback to be called
 * @return {Promise|undefined} Returns a promise if no callback given
 */
AlgoliaSearchCore.prototype.search = function(queries, opts, callback) {
  var isArray = __webpack_require__(71);
  var map = __webpack_require__(54);

  var usage = 'Usage: client.search(arrayOfQueries[, callback])';

  if (!isArray(queries)) {
    throw new Error(usage);
  }

  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  } else if (opts === undefined) {
    opts = {};
  }

  var client = this;

  var postObj = {
    requests: map(queries, function prepareRequest(query) {
      var params = '';

      // allow query.query
      // so we are mimicing the index.search(query, params) method
      // {indexName:, query:, params:}
      if (query.query !== undefined) {
        params += 'query=' + encodeURIComponent(query.query);
      }

      return {
        indexName: query.indexName,
        params: client._getSearchParams(query.params, params)
      };
    })
  };

  var JSONPParams = map(postObj.requests, function prepareJSONPParams(request, requestId) {
    return requestId + '=' +
      encodeURIComponent(
        '/1/indexes/' + encodeURIComponent(request.indexName) + '?' +
        request.params
      );
  }).join('&');

  var url = '/1/indexes/*/queries';

  if (opts.strategy !== undefined) {
    url += '?strategy=' + opts.strategy;
  }

  return this._jsonRequest({
    cache: this.cache,
    method: 'POST',
    url: url,
    body: postObj,
    hostType: 'read',
    fallback: {
      method: 'GET',
      url: '/1/indexes/*',
      body: {
        params: JSONPParams
      }
    },
    callback: callback
  });
};

/**
* Search for facet values
* https://www.algolia.com/doc/rest-api/search#search-for-facet-values
* This is the top-level API for SFFV.
*
* @param {object[]} queries An array of queries to run.
* @param {string} queries[].indexName Index name, name of the index to search.
* @param {object} queries[].params Query parameters.
* @param {string} queries[].params.facetName Facet name, name of the attribute to search for values in.
* Must be declared as a facet
* @param {string} queries[].params.facetQuery Query for the facet search
* @param {string} [queries[].params.*] Any search parameter of Algolia,
* see https://www.algolia.com/doc/api-client/javascript/search#search-parameters
* Pagination is not supported. The page and hitsPerPage parameters will be ignored.
*/
AlgoliaSearchCore.prototype.searchForFacetValues = function(queries) {
  var isArray = __webpack_require__(71);
  var map = __webpack_require__(54);

  var usage = 'Usage: client.searchForFacetValues([{indexName, params: {facetName, facetQuery, ...params}}, ...queries])'; // eslint-disable-line max-len

  if (!isArray(queries)) {
    throw new Error(usage);
  }

  var client = this;

  return client._promise.all(map(queries, function performQuery(query) {
    if (
      !query ||
      query.indexName === undefined ||
      query.params.facetName === undefined ||
      query.params.facetQuery === undefined
    ) {
      throw new Error(usage);
    }

    var clone = __webpack_require__(42);
    var omit = __webpack_require__(101);

    var indexName = query.indexName;
    var params = query.params;

    var facetName = params.facetName;
    var filteredParams = omit(clone(params), function(keyName) {
      return keyName === 'facetName';
    });
    var searchParameters = client._getSearchParams(filteredParams, '');

    return client._jsonRequest({
      cache: client.cache,
      method: 'POST',
      url:
        '/1/indexes/' +
        encodeURIComponent(indexName) +
        '/facets/' +
        encodeURIComponent(facetName) +
        '/query',
      hostType: 'read',
      body: {params: searchParameters}
    });
  }));
};

/**
 * Set the extra security tagFilters header
 * @param {string|array} tags The list of tags defining the current security filters
 */
AlgoliaSearchCore.prototype.setSecurityTags = function(tags) {
  if (Object.prototype.toString.call(tags) === '[object Array]') {
    var strTags = [];
    for (var i = 0; i < tags.length; ++i) {
      if (Object.prototype.toString.call(tags[i]) === '[object Array]') {
        var oredTags = [];
        for (var j = 0; j < tags[i].length; ++j) {
          oredTags.push(tags[i][j]);
        }
        strTags.push('(' + oredTags.join(',') + ')');
      } else {
        strTags.push(tags[i]);
      }
    }
    tags = strTags.join(',');
  }

  this.securityTags = tags;
};

/**
 * Set the extra user token header
 * @param {string} userToken The token identifying a uniq user (used to apply rate limits)
 */
AlgoliaSearchCore.prototype.setUserToken = function(userToken) {
  this.userToken = userToken;
};

/**
 * Clear all queries in client's cache
 * @return undefined
 */
AlgoliaSearchCore.prototype.clearCache = function() {
  this.cache = {};
};

/**
* Set the number of milliseconds a request can take before automatically being terminated.
* @deprecated
* @param {Number} milliseconds
*/
AlgoliaSearchCore.prototype.setRequestTimeout = function(milliseconds) {
  if (milliseconds) {
    this._timeouts.connect = this._timeouts.read = this._timeouts.write = milliseconds;
  }
};

/**
* Set the three different (connect, read, write) timeouts to be used when requesting
* @param {Object} timeouts
*/
AlgoliaSearchCore.prototype.setTimeouts = function(timeouts) {
  this._timeouts = timeouts;
};

/**
* Get the three different (connect, read, write) timeouts to be used when requesting
* @param {Object} timeouts
*/
AlgoliaSearchCore.prototype.getTimeouts = function() {
  return this._timeouts;
};

AlgoliaSearchCore.prototype._getAppIdData = function() {
  var data = store.get(this.applicationID);
  if (data !== null) this._cacheAppIdData(data);
  return data;
};

AlgoliaSearchCore.prototype._setAppIdData = function(data) {
  data.lastChange = (new Date()).getTime();
  this._cacheAppIdData(data);
  return store.set(this.applicationID, data);
};

AlgoliaSearchCore.prototype._checkAppIdData = function() {
  var data = this._getAppIdData();
  var now = (new Date()).getTime();
  if (data === null || now - data.lastChange > RESET_APP_DATA_TIMER) {
    return this._resetInitialAppIdData(data);
  }

  return data;
};

AlgoliaSearchCore.prototype._resetInitialAppIdData = function(data) {
  var newData = data || {};
  newData.hostIndexes = {read: 0, write: 0};
  newData.timeoutMultiplier = 1;
  newData.shuffleResult = newData.shuffleResult || shuffle([1, 2, 3]);
  return this._setAppIdData(newData);
};

AlgoliaSearchCore.prototype._cacheAppIdData = function(data) {
  this._hostIndexes = data.hostIndexes;
  this._timeoutMultiplier = data.timeoutMultiplier;
  this._shuffleResult = data.shuffleResult;
};

AlgoliaSearchCore.prototype._partialAppIdDataUpdate = function(newData) {
  var foreach = __webpack_require__(47);
  var currentData = this._getAppIdData();
  foreach(newData, function(value, key) {
    currentData[key] = value;
  });

  return this._setAppIdData(currentData);
};

AlgoliaSearchCore.prototype._getHostByType = function(hostType) {
  return this.hosts[hostType][this._getHostIndexByType(hostType)];
};

AlgoliaSearchCore.prototype._getTimeoutMultiplier = function() {
  return this._timeoutMultiplier;
};

AlgoliaSearchCore.prototype._getHostIndexByType = function(hostType) {
  return this._hostIndexes[hostType];
};

AlgoliaSearchCore.prototype._setHostIndexByType = function(hostIndex, hostType) {
  var clone = __webpack_require__(42);
  var newHostIndexes = clone(this._hostIndexes);
  newHostIndexes[hostType] = hostIndex;
  this._partialAppIdDataUpdate({hostIndexes: newHostIndexes});
  return hostIndex;
};

AlgoliaSearchCore.prototype._incrementHostIndex = function(hostType) {
  return this._setHostIndexByType(
    (this._getHostIndexByType(hostType) + 1) % this.hosts[hostType].length, hostType
  );
};

AlgoliaSearchCore.prototype._incrementTimeoutMultipler = function() {
  var timeoutMultiplier = Math.max(this._timeoutMultiplier + 1, 4);
  return this._partialAppIdDataUpdate({timeoutMultiplier: timeoutMultiplier});
};

AlgoliaSearchCore.prototype._getTimeoutsForRequest = function(hostType) {
  return {
    connect: this._timeouts.connect * this._timeoutMultiplier,
    complete: this._timeouts[hostType] * this._timeoutMultiplier
  };
};

function prepareHost(protocol) {
  return function prepare(host) {
    return protocol + '//' + host.toLowerCase();
  };
}

// Prototype.js < 1.7, a widely used library, defines a weird
// Array.prototype.toJSON function that will fail to stringify our content
// appropriately
// refs:
//   - https://groups.google.com/forum/#!topic/prototype-core/E-SAVvV_V9Q
//   - https://github.com/sstephenson/prototype/commit/038a2985a70593c1a86c230fadbdfe2e4898a48c
//   - http://stackoverflow.com/a/3148441/147079
function safeJSONStringify(obj) {
  /* eslint no-extend-native:0 */

  if (Array.prototype.toJSON === undefined) {
    return JSON.stringify(obj);
  }

  var toJSON = Array.prototype.toJSON;
  delete Array.prototype.toJSON;
  var out = JSON.stringify(obj);
  Array.prototype.toJSON = toJSON;

  return out;
}

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function removeCredentials(headers) {
  var newHeaders = {};

  for (var headerName in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, headerName)) {
      var value;

      if (headerName === 'x-algolia-api-key' || headerName === 'x-algolia-application-id') {
        value = '**hidden for security purposes**';
      } else {
        value = headers[headerName];
      }

      newHeaders[headerName] = value;
    }
  }

  return newHeaders;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(137)))

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var buildSearchMethod = __webpack_require__(100);
var deprecate = __webpack_require__(164);
var deprecatedMessage = __webpack_require__(165);

module.exports = IndexCore;

/*
* Index class constructor.
* You should not use this method directly but use initIndex() function
*/
function IndexCore(algoliasearch, indexName) {
  this.indexName = indexName;
  this.as = algoliasearch;
  this.typeAheadArgs = null;
  this.typeAheadValueOption = null;

  // make sure every index instance has it's own cache
  this.cache = {};
}

/*
* Clear all queries in cache
*/
IndexCore.prototype.clearCache = function() {
  this.cache = {};
};

/*
* Search inside the index using XMLHttpRequest request (Using a POST query to
* minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
*
* @param {string} [query] the full text query
* @param {object} [args] (optional) if set, contains an object with query parameters:
* - page: (integer) Pagination parameter used to select the page to retrieve.
*                   Page is zero-based and defaults to 0. Thus,
*                   to retrieve the 10th page you need to set page=9
* - hitsPerPage: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.
* - attributesToRetrieve: a string that contains the list of object attributes
* you want to retrieve (let you minimize the answer size).
*   Attributes are separated with a comma (for example "name,address").
*   You can also use an array (for example ["name","address"]).
*   By default, all attributes are retrieved. You can also use '*' to retrieve all
*   values when an attributesToRetrieve setting is specified for your index.
* - attributesToHighlight: a string that contains the list of attributes you
*   want to highlight according to the query.
*   Attributes are separated by a comma. You can also use an array (for example ["name","address"]).
*   If an attribute has no match for the query, the raw value is returned.
*   By default all indexed text attributes are highlighted.
*   You can use `*` if you want to highlight all textual attributes.
*   Numerical attributes are not highlighted.
*   A matchLevel is returned for each highlighted attribute and can contain:
*      - full: if all the query terms were found in the attribute,
*      - partial: if only some of the query terms were found,
*      - none: if none of the query terms were found.
* - attributesToSnippet: a string that contains the list of attributes to snippet alongside
* the number of words to return (syntax is `attributeName:nbWords`).
*    Attributes are separated by a comma (Example: attributesToSnippet=name:10,content:10).
*    You can also use an array (Example: attributesToSnippet: ['name:10','content:10']).
*    By default no snippet is computed.
* - minWordSizefor1Typo: the minimum number of characters in a query word to accept one typo in this word.
* Defaults to 3.
* - minWordSizefor2Typos: the minimum number of characters in a query word
* to accept two typos in this word. Defaults to 7.
* - getRankingInfo: if set to 1, the result hits will contain ranking
* information in _rankingInfo attribute.
* - aroundLatLng: search for entries around a given
* latitude/longitude (specified as two floats separated by a comma).
*   For example aroundLatLng=47.316669,5.016670).
*   You can specify the maximum distance in meters with the aroundRadius parameter (in meters)
*   and the precision for ranking with aroundPrecision
*   (for example if you set aroundPrecision=100, two objects that are distant of
*   less than 100m will be considered as identical for "geo" ranking parameter).
*   At indexing, you should specify geoloc of an object with the _geoloc attribute
*   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
* - insideBoundingBox: search entries inside a given area defined by the two extreme points
* of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).
*   For example insideBoundingBox=47.3165,4.9665,47.3424,5.0201).
*   At indexing, you should specify geoloc of an object with the _geoloc attribute
*   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
* - numericFilters: a string that contains the list of numeric filters you want to
* apply separated by a comma.
*   The syntax of one filter is `attributeName` followed by `operand` followed by `value`.
*   Supported operands are `<`, `<=`, `=`, `>` and `>=`.
*   You can have multiple conditions on one attribute like for example numericFilters=price>100,price<1000.
*   You can also use an array (for example numericFilters: ["price>100","price<1000"]).
* - tagFilters: filter the query by a set of tags. You can AND tags by separating them by commas.
*   To OR tags, you must add parentheses. For example, tags=tag1,(tag2,tag3) means tag1 AND (tag2 OR tag3).
*   You can also use an array, for example tagFilters: ["tag1",["tag2","tag3"]]
*   means tag1 AND (tag2 OR tag3).
*   At indexing, tags should be added in the _tags** attribute
*   of objects (for example {"_tags":["tag1","tag2"]}).
* - facetFilters: filter the query by a list of facets.
*   Facets are separated by commas and each facet is encoded as `attributeName:value`.
*   For example: `facetFilters=category:Book,author:John%20Doe`.
*   You can also use an array (for example `["category:Book","author:John%20Doe"]`).
* - facets: List of object attributes that you want to use for faceting.
*   Comma separated list: `"category,author"` or array `['category','author']`
*   Only attributes that have been added in **attributesForFaceting** index setting
*   can be used in this parameter.
*   You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
* - queryType: select how the query words are interpreted, it can be one of the following value:
*    - prefixAll: all query words are interpreted as prefixes,
*    - prefixLast: only the last word is interpreted as a prefix (default behavior),
*    - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
* - optionalWords: a string that contains the list of words that should
* be considered as optional when found in the query.
*   Comma separated and array are accepted.
* - distinct: If set to 1, enable the distinct feature (disabled by default)
* if the attributeForDistinct index setting is set.
*   This feature is similar to the SQL "distinct" keyword: when enabled
*   in a query with the distinct=1 parameter,
*   all hits containing a duplicate value for the attributeForDistinct attribute are removed from results.
*   For example, if the chosen attribute is show_name and several hits have
*   the same value for show_name, then only the best
*   one is kept and others are removed.
* - restrictSearchableAttributes: List of attributes you want to use for
* textual search (must be a subset of the attributesToIndex index setting)
* either comma separated or as an array
* @param {function} [callback] the result callback called with two arguments:
*  error: null or Error('message'). If false, the content contains the error.
*  content: the server answer that contains the list of results.
*/
IndexCore.prototype.search = buildSearchMethod('query');

/*
* -- BETA --
* Search a record similar to the query inside the index using XMLHttpRequest request (Using a POST query to
* minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
*
* @param {string} [query] the similar query
* @param {object} [args] (optional) if set, contains an object with query parameters.
*   All search parameters are supported (see search function), restrictSearchableAttributes and facetFilters
*   are the two most useful to restrict the similar results and get more relevant content
*/
IndexCore.prototype.similarSearch = buildSearchMethod('similarQuery');

/*
* Browse index content. The response content will have a `cursor` property that you can use
* to browse subsequent pages for this query. Use `index.browseFrom(cursor)` when you want.
*
* @param {string} query - The full text query
* @param {Object} [queryParameters] - Any search query parameter
* @param {Function} [callback] - The result callback called with two arguments
*   error: null or Error('message')
*   content: the server answer with the browse result
* @return {Promise|undefined} Returns a promise if no callback given
* @example
* index.browse('cool songs', {
*   tagFilters: 'public,comments',
*   hitsPerPage: 500
* }, callback);
* @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
*/
IndexCore.prototype.browse = function(query, queryParameters, callback) {
  var merge = __webpack_require__(167);

  var indexObj = this;

  var page;
  var hitsPerPage;

  // we check variadic calls that are not the one defined
  // .browse()/.browse(fn)
  // => page = 0
  if (arguments.length === 0 || arguments.length === 1 && typeof arguments[0] === 'function') {
    page = 0;
    callback = arguments[0];
    query = undefined;
  } else if (typeof arguments[0] === 'number') {
    // .browse(2)/.browse(2, 10)/.browse(2, fn)/.browse(2, 10, fn)
    page = arguments[0];
    if (typeof arguments[1] === 'number') {
      hitsPerPage = arguments[1];
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
      hitsPerPage = undefined;
    }
    query = undefined;
    queryParameters = undefined;
  } else if (typeof arguments[0] === 'object') {
    // .browse(queryParameters)/.browse(queryParameters, cb)
    if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }
    queryParameters = arguments[0];
    query = undefined;
  } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
    // .browse(query, cb)
    callback = arguments[1];
    queryParameters = undefined;
  }

  // otherwise it's a .browse(query)/.browse(query, queryParameters)/.browse(query, queryParameters, cb)

  // get search query parameters combining various possible calls
  // to .browse();
  queryParameters = merge({}, queryParameters || {}, {
    page: page,
    hitsPerPage: hitsPerPage,
    query: query
  });

  var params = this.as._getSearchParams(queryParameters, '');

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/browse',
    body: {params: params},
    hostType: 'read',
    callback: callback
  });
};

/*
* Continue browsing from a previous position (cursor), obtained via a call to `.browse()`.
*
* @param {string} query - The full text query
* @param {Object} [queryParameters] - Any search query parameter
* @param {Function} [callback] - The result callback called with two arguments
*   error: null or Error('message')
*   content: the server answer with the browse result
* @return {Promise|undefined} Returns a promise if no callback given
* @example
* index.browseFrom('14lkfsakl32', callback);
* @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
*/
IndexCore.prototype.browseFrom = function(cursor, callback) {
  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/browse',
    body: {cursor: cursor},
    hostType: 'read',
    callback: callback
  });
};

/*
* Search for facet values
* https://www.algolia.com/doc/rest-api/search#search-for-facet-values
*
* @param {string} params.facetName Facet name, name of the attribute to search for values in.
* Must be declared as a facet
* @param {string} params.facetQuery Query for the facet search
* @param {string} [params.*] Any search parameter of Algolia,
* see https://www.algolia.com/doc/api-client/javascript/search#search-parameters
* Pagination is not supported. The page and hitsPerPage parameters will be ignored.
* @param callback (optional)
*/
IndexCore.prototype.searchForFacetValues = function(params, callback) {
  var clone = __webpack_require__(42);
  var omit = __webpack_require__(101);
  var usage = 'Usage: index.searchForFacetValues({facetName, facetQuery, ...params}[, callback])';

  if (params.facetName === undefined || params.facetQuery === undefined) {
    throw new Error(usage);
  }

  var facetName = params.facetName;
  var filteredParams = omit(clone(params), function(keyName) {
    return keyName === 'facetName';
  });
  var searchParameters = this.as._getSearchParams(filteredParams, '');

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' +
      encodeURIComponent(this.indexName) + '/facets/' + encodeURIComponent(facetName) + '/query',
    hostType: 'read',
    body: {params: searchParameters},
    callback: callback
  });
};

IndexCore.prototype.searchFacet = deprecate(function(params, callback) {
  return this.searchForFacetValues(params, callback);
}, deprecatedMessage(
  'index.searchFacet(params[, callback])',
  'index.searchForFacetValues(params[, callback])'
));

IndexCore.prototype._search = function(params, url, callback, additionalUA) {
  return this.as._jsonRequest({
    cache: this.cache,
    method: 'POST',
    url: url || '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
    body: {params: params},
    hostType: 'read',
    fallback: {
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(this.indexName),
      body: {params: params}
    },
    callback: callback,
    additionalUA: additionalUA
  });
};

/*
* Get an object from this index
*
* @param objectID the unique identifier of the object to retrieve
* @param attrs (optional) if set, contains the array of attribute names to retrieve
* @param callback (optional) the result callback called with two arguments
*  error: null or Error('message')
*  content: the object to retrieve or the error message if a failure occured
*/
IndexCore.prototype.getObject = function(objectID, attrs, callback) {
  var indexObj = this;

  if (arguments.length === 1 || typeof attrs === 'function') {
    callback = attrs;
    attrs = undefined;
  }

  var params = '';
  if (attrs !== undefined) {
    params = '?attributes=';
    for (var i = 0; i < attrs.length; ++i) {
      if (i !== 0) {
        params += ',';
      }
      params += attrs[i];
    }
  }

  return this.as._jsonRequest({
    method: 'GET',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID) + params,
    hostType: 'read',
    callback: callback
  });
};

/*
* Get several objects from this index
*
* @param objectIDs the array of unique identifier of objects to retrieve
*/
IndexCore.prototype.getObjects = function(objectIDs, attributesToRetrieve, callback) {
  var isArray = __webpack_require__(71);
  var map = __webpack_require__(54);

  var usage = 'Usage: index.getObjects(arrayOfObjectIDs[, callback])';

  if (!isArray(objectIDs)) {
    throw new Error(usage);
  }

  var indexObj = this;

  if (arguments.length === 1 || typeof attributesToRetrieve === 'function') {
    callback = attributesToRetrieve;
    attributesToRetrieve = undefined;
  }

  var body = {
    requests: map(objectIDs, function prepareRequest(objectID) {
      var request = {
        indexName: indexObj.indexName,
        objectID: objectID
      };

      if (attributesToRetrieve) {
        request.attributesToRetrieve = attributesToRetrieve.join(',');
      }

      return request;
    })
  };

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/*/objects',
    hostType: 'read',
    body: body,
    callback: callback
  });
};

IndexCore.prototype.as = null;
IndexCore.prototype.indexName = null;
IndexCore.prototype.typeAheadArgs = null;
IndexCore.prototype.typeAheadValueOption = null;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AlgoliaSearchCore = __webpack_require__(158);
var createAlgoliasearch = __webpack_require__(161);

module.exports = createAlgoliasearch(AlgoliaSearchCore, '(lite) ');


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(404);
var Promise = global.Promise || __webpack_require__(403).Promise;

// This is the standalone browser build entry point
// Browser implementation of the Algolia Search JavaScript client,
// using XMLHttpRequest, XDomainRequest and JSONP as fallback
module.exports = function createAlgoliasearch(AlgoliaSearch, uaSuffix) {
  var inherits = __webpack_require__(136);
  var errors = __webpack_require__(53);
  var inlineHeaders = __webpack_require__(162);
  var jsonpRequest = __webpack_require__(163);
  var places = __webpack_require__(168);
  uaSuffix = uaSuffix || '';

  if (undefined === 'debug') {
    __webpack_require__(51).enable('algoliasearch*');
  }

  function algoliasearch(applicationID, apiKey, opts) {
    var cloneDeep = __webpack_require__(42);

    opts = cloneDeep(opts || {});

    opts._ua = opts._ua || algoliasearch.ua;

    return new AlgoliaSearchBrowser(applicationID, apiKey, opts);
  }

  algoliasearch.version = __webpack_require__(170);
  algoliasearch.ua = 'Algolia for vanilla JavaScript ' + uaSuffix + algoliasearch.version;
  algoliasearch.initPlaces = places(algoliasearch);

  // we expose into window no matter how we are used, this will allow
  // us to easily debug any website running algolia
  global.__algolia = {
    debug: __webpack_require__(51),
    algoliasearch: algoliasearch
  };

  var support = {
    hasXMLHttpRequest: 'XMLHttpRequest' in global,
    hasXDomainRequest: 'XDomainRequest' in global
  };

  if (support.hasXMLHttpRequest) {
    support.cors = 'withCredentials' in new XMLHttpRequest();
  }

  function AlgoliaSearchBrowser() {
    // call AlgoliaSearch constructor
    AlgoliaSearch.apply(this, arguments);
  }

  inherits(AlgoliaSearchBrowser, AlgoliaSearch);

  AlgoliaSearchBrowser.prototype._request = function request(url, opts) {
    return new Promise(function wrapRequest(resolve, reject) {
      // no cors or XDomainRequest, no request
      if (!support.cors && !support.hasXDomainRequest) {
        // very old browser, not supported
        reject(new errors.Network('CORS not supported'));
        return;
      }

      url = inlineHeaders(url, opts.headers);

      var body = opts.body;
      var req = support.cors ? new XMLHttpRequest() : new XDomainRequest();
      var reqTimeout;
      var timedOut;
      var connected = false;

      reqTimeout = setTimeout(onTimeout, opts.timeouts.connect);
      // we set an empty onprogress listener
      // so that XDomainRequest on IE9 is not aborted
      // refs:
      //  - https://github.com/algolia/algoliasearch-client-js/issues/76
      //  - https://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
      req.onprogress = onProgress;
      if ('onreadystatechange' in req) req.onreadystatechange = onReadyStateChange;
      req.onload = onLoad;
      req.onerror = onError;

      // do not rely on default XHR async flag, as some analytics code like hotjar
      // breaks it and set it to false by default
      if (req instanceof XMLHttpRequest) {
        req.open(opts.method, url, true);

        // The Analytics API never accepts Auth headers as query string
        // this option exists specifically for them.
        if (opts.forceAuthHeaders) {
          req.setRequestHeader(
            'x-algolia-application-id',
            opts.headers['x-algolia-application-id']
          );
          req.setRequestHeader(
            'x-algolia-api-key',
            opts.headers['x-algolia-api-key']
          );
        }
      } else {
        req.open(opts.method, url);
      }

      // headers are meant to be sent after open
      if (support.cors) {
        if (body) {
          if (opts.method === 'POST') {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
            req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
          } else {
            req.setRequestHeader('content-type', 'application/json');
          }
        }
        req.setRequestHeader('accept', 'application/json');
      }

      if (body) {
        req.send(body);
      } else {
        req.send();
      }

      // event object not received in IE8, at least
      // but we do not use it, still important to note
      function onLoad(/* event */) {
        // When browser does not supports req.timeout, we can
        // have both a load and timeout event, since handled by a dumb setTimeout
        if (timedOut) {
          return;
        }

        clearTimeout(reqTimeout);

        var out;

        try {
          out = {
            body: JSON.parse(req.responseText),
            responseText: req.responseText,
            statusCode: req.status,
            // XDomainRequest does not have any response headers
            headers: req.getAllResponseHeaders && req.getAllResponseHeaders() || {}
          };
        } catch (e) {
          out = new errors.UnparsableJSON({
            more: req.responseText
          });
        }

        if (out instanceof errors.UnparsableJSON) {
          reject(out);
        } else {
          resolve(out);
        }
      }

      function onError(event) {
        if (timedOut) {
          return;
        }

        clearTimeout(reqTimeout);

        // error event is trigerred both with XDR/XHR on:
        //   - DNS error
        //   - unallowed cross domain request
        reject(
          new errors.Network({
            more: event
          })
        );
      }

      function onTimeout() {
        timedOut = true;
        req.abort();

        reject(new errors.RequestTimeout());
      }

      function onConnect() {
        connected = true;
        clearTimeout(reqTimeout);
        reqTimeout = setTimeout(onTimeout, opts.timeouts.complete);
      }

      function onProgress() {
        if (!connected) onConnect();
      }

      function onReadyStateChange() {
        if (!connected && req.readyState > 1) onConnect();
      }
    });
  };

  AlgoliaSearchBrowser.prototype._request.fallback = function requestFallback(url, opts) {
    url = inlineHeaders(url, opts.headers);

    return new Promise(function wrapJsonpRequest(resolve, reject) {
      jsonpRequest(url, opts, function jsonpRequestDone(err, content) {
        if (err) {
          reject(err);
          return;
        }

        resolve(content);
      });
    });
  };

  AlgoliaSearchBrowser.prototype._promise = {
    reject: function rejectPromise(val) {
      return Promise.reject(val);
    },
    resolve: function resolvePromise(val) {
      return Promise.resolve(val);
    },
    delay: function delayPromise(ms) {
      return new Promise(function resolveOnTimeout(resolve/* , reject*/) {
        setTimeout(resolve, ms);
      });
    },
    all: function all(promises) {
      return Promise.all(promises);
    }
  };

  return algoliasearch;
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = inlineHeaders;

var encode = __webpack_require__(407);

function inlineHeaders(url, headers) {
  if (/\?/.test(url)) {
    url += '&';
  } else {
    url += '?';
  }

  return url + encode(headers);
}


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = jsonpRequest;

var errors = __webpack_require__(53);

var JSONPCounter = 0;

function jsonpRequest(url, opts, cb) {
  if (opts.method !== 'GET') {
    cb(new Error('Method ' + opts.method + ' ' + url + ' is not supported by JSONP.'));
    return;
  }

  opts.debug('JSONP: start');

  var cbCalled = false;
  var timedOut = false;

  JSONPCounter += 1;
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  var cbName = 'algoliaJSONP_' + JSONPCounter;
  var done = false;

  window[cbName] = function(data) {
    removeGlobals();

    if (timedOut) {
      opts.debug('JSONP: Late answer, ignoring');
      return;
    }

    cbCalled = true;

    clean();

    cb(null, {
      body: data,
      responseText: JSON.stringify(data)/* ,
      // We do not send the statusCode, there's no statusCode in JSONP, it will be
      // computed using data.status && data.message like with XDR
      statusCode*/
    });
  };

  // add callback by hand
  url += '&callback=' + cbName;

  // add body params manually
  if (opts.jsonBody && opts.jsonBody.params) {
    url += '&' + opts.jsonBody.params;
  }

  var ontimeout = setTimeout(timeout, opts.timeouts.complete);

  // script onreadystatechange needed only for
  // <= IE8
  // https://github.com/angular/angular.js/issues/4523
  script.onreadystatechange = readystatechange;
  script.onload = success;
  script.onerror = error;

  script.async = true;
  script.defer = true;
  script.src = url;
  head.appendChild(script);

  function success() {
    opts.debug('JSONP: success');

    if (done || timedOut) {
      return;
    }

    done = true;

    // script loaded but did not call the fn => script loading error
    if (!cbCalled) {
      opts.debug('JSONP: Fail. Script loaded but did not call the callback');
      clean();
      cb(new errors.JSONPScriptFail());
    }
  }

  function readystatechange() {
    if (this.readyState === 'loaded' || this.readyState === 'complete') {
      success();
    }
  }

  function clean() {
    clearTimeout(ontimeout);
    script.onload = null;
    script.onreadystatechange = null;
    script.onerror = null;
    head.removeChild(script);
  }

  function removeGlobals() {
    try {
      delete window[cbName];
      delete window[cbName + '_loaded'];
    } catch (e) {
      window[cbName] = window[cbName + '_loaded'] = undefined;
    }
  }

  function timeout() {
    opts.debug('JSONP: Script timeout');
    timedOut = true;
    clean();
    cb(new errors.RequestTimeout());
  }

  function error() {
    opts.debug('JSONP: Script error');

    if (done || timedOut) {
      return;
    }

    clean();
    cb(new errors.JSONPScriptError());
  }
}


/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = function deprecate(fn, message) {
  var warned = false;

  function deprecated() {
    if (!warned) {
      /* eslint no-console:0 */
      console.warn(message);
      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};


/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports = function deprecatedMessage(previousUsage, newUsage) {
  var githubAnchorLink = previousUsage.toLowerCase()
    .replace(/[\.\(\)]/g, '');

  return 'algoliasearch: `' + previousUsage + '` was replaced by `' + newUsage +
    '`. Please see https://github.com/algolia/algoliasearch-client-javascript/wiki/Deprecated#' + githubAnchorLink;
};


/***/ }),
/* 166 */
/***/ (function(module, exports) {

// Parse cloud does not supports setTimeout
// We do not store a setTimeout reference in the client everytime
// We only fallback to a fake setTimeout when not available
// setTimeout cannot be override globally sadly
module.exports = function exitPromise(fn, _setTimeout) {
  _setTimeout(fn, 0);
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var foreach = __webpack_require__(47);

module.exports = function merge(destination/* , sources */) {
  var sources = Array.prototype.slice.call(arguments);

  foreach(sources, function(source) {
    for (var keyName in source) {
      if (source.hasOwnProperty(keyName)) {
        if (typeof destination[keyName] === 'object' && typeof source[keyName] === 'object') {
          destination[keyName] = merge({}, destination[keyName], source[keyName]);
        } else if (source[keyName] !== undefined) {
          destination[keyName] = source[keyName];
        }
      }
    }
  });

  return destination;
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = createPlacesClient;

var buildSearchMethod = __webpack_require__(100);

function createPlacesClient(algoliasearch) {
  return function places(appID, apiKey, opts) {
    var cloneDeep = __webpack_require__(42);

    opts = opts && cloneDeep(opts) || {};
    opts.hosts = opts.hosts || [
      'places-dsn.algolia.net',
      'places-1.algolianet.com',
      'places-2.algolianet.com',
      'places-3.algolianet.com'
    ];

    // allow initPlaces() no arguments => community rate limited
    if (arguments.length === 0 || typeof appID === 'object' || appID === undefined) {
      appID = '';
      apiKey = '';
      opts._allowEmptyCredentials = true;
    }

    var client = algoliasearch(appID, apiKey, opts);
    var index = client.initIndex('places');
    index.search = buildSearchMethod('query', '/1/places/query');
    index.getObject = function(objectID, callback) {
      return this.as._jsonRequest({
        method: 'GET',
        url: '/1/places/' + encodeURIComponent(objectID),
        hostType: 'read',
        callback: callback
      });
    };
    return index;
  };
}


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var debug = __webpack_require__(51)('algoliasearch:src/hostIndexState.js');
var localStorageNamespace = 'algoliasearch-client-js';

var store;
var moduleStore = {
  state: {},
  set: function(key, data) {
    this.state[key] = data;
    return this.state[key];
  },
  get: function(key) {
    return this.state[key] || null;
  }
};

var localStorageStore = {
  set: function(key, data) {
    moduleStore.set(key, data); // always replicate localStorageStore to moduleStore in case of failure

    try {
      var namespace = JSON.parse(global.localStorage[localStorageNamespace]);
      namespace[key] = data;
      global.localStorage[localStorageNamespace] = JSON.stringify(namespace);
      return namespace[key];
    } catch (e) {
      return localStorageFailure(key, e);
    }
  },
  get: function(key) {
    try {
      return JSON.parse(global.localStorage[localStorageNamespace])[key] || null;
    } catch (e) {
      return localStorageFailure(key, e);
    }
  }
};

function localStorageFailure(key, e) {
  debug('localStorage failed with', e);
  cleanup();
  store = moduleStore;
  return store.get(key);
}

store = supportsLocalStorage() ? localStorageStore : moduleStore;

module.exports = {
  get: getOrSet,
  set: getOrSet,
  supportsLocalStorage: supportsLocalStorage
};

function getOrSet(key, data) {
  if (arguments.length === 1) {
    return store.get(key);
  }

  return store.set(key, data);
}

function supportsLocalStorage() {
  try {
    if ('localStorage' in global &&
      global.localStorage !== null) {
      if (!global.localStorage[localStorageNamespace]) {
        // actual creation of the namespace
        global.localStorage.setItem(localStorageNamespace, JSON.stringify({}));
      }
      return true;
    }

    return false;
  } catch (_) {
    return false;
  }
}

// In case of any error on localStorage, we clean our own namespace, this should handle
// quota errors when a lot of keys + data are used
function cleanup() {
  try {
    global.localStorage.removeItem(localStorageNamespace);
  } catch (_) {
    // nothing to do
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = '3.29.0';


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 2017 Julian Garnier
 Released under the MIT license
*/
var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(e,r,p){if(p.get||p.set)throw new TypeError("ES3 does not support getters and setters.");e!=Array.prototype&&e!=Object.prototype&&(e[r]=p.value)};$jscomp.getGlobal=function(e){return"undefined"!=typeof window&&window===e?e:"undefined"!=typeof global&&null!=global?global:e};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(e){return $jscomp.SYMBOL_PREFIX+(e||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var e=$jscomp.global.Symbol.iterator;e||(e=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[e]&&$jscomp.defineProperty(Array.prototype,e,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(e){var r=0;return $jscomp.iteratorPrototype(function(){return r<e.length?{done:!1,value:e[r++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(e){$jscomp.initSymbolIterator();e={next:e};e[$jscomp.global.Symbol.iterator]=function(){return this};return e};$jscomp.array=$jscomp.array||{};$jscomp.iteratorFromArray=function(e,r){$jscomp.initSymbolIterator();e instanceof String&&(e+="");var p=0,m={next:function(){if(p<e.length){var u=p++;return{value:r(u,e[u]),done:!1}}m.next=function(){return{done:!0,value:void 0}};return m.next()}};m[Symbol.iterator]=function(){return m};return m};
$jscomp.polyfill=function(e,r,p,m){if(r){p=$jscomp.global;e=e.split(".");for(m=0;m<e.length-1;m++){var u=e[m];u in p||(p[u]={});p=p[u]}e=e[e.length-1];m=p[e];r=r(m);r!=m&&null!=r&&$jscomp.defineProperty(p,e,{configurable:!0,writable:!0,value:r})}};$jscomp.polyfill("Array.prototype.keys",function(e){return e?e:function(){return $jscomp.iteratorFromArray(this,function(e){return e})}},"es6-impl","es3");var $jscomp$this=this;
(function(e,r){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (r),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"===typeof module&&module.exports?module.exports=r():e.anime=r()})(this,function(){function e(a){if(!h.col(a))try{return document.querySelectorAll(a)}catch(c){}}function r(a,c){for(var d=a.length,b=2<=arguments.length?arguments[1]:void 0,f=[],n=0;n<d;n++)if(n in a){var k=a[n];c.call(b,k,n,a)&&f.push(k)}return f}function p(a){return a.reduce(function(a,d){return a.concat(h.arr(d)?p(d):d)},[])}function m(a){if(h.arr(a))return a;
h.str(a)&&(a=e(a)||a);return a instanceof NodeList||a instanceof HTMLCollection?[].slice.call(a):[a]}function u(a,c){return a.some(function(a){return a===c})}function C(a){var c={},d;for(d in a)c[d]=a[d];return c}function D(a,c){var d=C(a),b;for(b in a)d[b]=c.hasOwnProperty(b)?c[b]:a[b];return d}function z(a,c){var d=C(a),b;for(b in c)d[b]=h.und(a[b])?c[b]:a[b];return d}function T(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,c,d,k){return c+c+d+d+k+k});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
a=parseInt(c[1],16);var d=parseInt(c[2],16),c=parseInt(c[3],16);return"rgba("+a+","+d+","+c+",1)"}function U(a){function c(a,c,b){0>b&&(b+=1);1<b&&--b;return b<1/6?a+6*(c-a)*b:.5>b?c:b<2/3?a+(c-a)*(2/3-b)*6:a}var d=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(a);a=parseInt(d[1])/360;var b=parseInt(d[2])/100,f=parseInt(d[3])/100,d=d[4]||1;if(0==b)f=b=a=f;else{var n=.5>f?f*(1+b):f+b-f*b,k=2*f-n,f=c(k,n,a+1/3),b=c(k,n,a);a=c(k,n,a-1/3)}return"rgba("+
255*f+","+255*b+","+255*a+","+d+")"}function y(a){if(a=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(a))return a[2]}function V(a){if(-1<a.indexOf("translate")||"perspective"===a)return"px";if(-1<a.indexOf("rotate")||-1<a.indexOf("skew"))return"deg"}function I(a,c){return h.fnc(a)?a(c.target,c.id,c.total):a}function E(a,c){if(c in a.style)return getComputedStyle(a).getPropertyValue(c.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function J(a,c){if(h.dom(a)&&
u(W,c))return"transform";if(h.dom(a)&&(a.getAttribute(c)||h.svg(a)&&a[c]))return"attribute";if(h.dom(a)&&"transform"!==c&&E(a,c))return"css";if(null!=a[c])return"object"}function X(a,c){var d=V(c),d=-1<c.indexOf("scale")?1:0+d;a=a.style.transform;if(!a)return d;for(var b=[],f=[],n=[],k=/(\w+)\((.+?)\)/g;b=k.exec(a);)f.push(b[1]),n.push(b[2]);a=r(n,function(a,b){return f[b]===c});return a.length?a[0]:d}function K(a,c){switch(J(a,c)){case "transform":return X(a,c);case "css":return E(a,c);case "attribute":return a.getAttribute(c)}return a[c]||
0}function L(a,c){var d=/^(\*=|\+=|-=)/.exec(a);if(!d)return a;var b=y(a)||0;c=parseFloat(c);a=parseFloat(a.replace(d[0],""));switch(d[0][0]){case "+":return c+a+b;case "-":return c-a+b;case "*":return c*a+b}}function F(a,c){return Math.sqrt(Math.pow(c.x-a.x,2)+Math.pow(c.y-a.y,2))}function M(a){a=a.points;for(var c=0,d,b=0;b<a.numberOfItems;b++){var f=a.getItem(b);0<b&&(c+=F(d,f));d=f}return c}function N(a){if(a.getTotalLength)return a.getTotalLength();switch(a.tagName.toLowerCase()){case "circle":return 2*
Math.PI*a.getAttribute("r");case "rect":return 2*a.getAttribute("width")+2*a.getAttribute("height");case "line":return F({x:a.getAttribute("x1"),y:a.getAttribute("y1")},{x:a.getAttribute("x2"),y:a.getAttribute("y2")});case "polyline":return M(a);case "polygon":var c=a.points;return M(a)+F(c.getItem(c.numberOfItems-1),c.getItem(0))}}function Y(a,c){function d(b){b=void 0===b?0:b;return a.el.getPointAtLength(1<=c+b?c+b:0)}var b=d(),f=d(-1),n=d(1);switch(a.property){case "x":return b.x;case "y":return b.y;
case "angle":return 180*Math.atan2(n.y-f.y,n.x-f.x)/Math.PI}}function O(a,c){var d=/-?\d*\.?\d+/g,b;b=h.pth(a)?a.totalLength:a;if(h.col(b))if(h.rgb(b)){var f=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(b);b=f?"rgba("+f[1]+",1)":b}else b=h.hex(b)?T(b):h.hsl(b)?U(b):void 0;else f=(f=y(b))?b.substr(0,b.length-f.length):b,b=c&&!/\s/g.test(b)?f+c:f;b+="";return{original:b,numbers:b.match(d)?b.match(d).map(Number):[0],strings:h.str(a)||c?b.split(d):[]}}function P(a){a=a?p(h.arr(a)?a.map(m):m(a)):[];return r(a,
function(a,d,b){return b.indexOf(a)===d})}function Z(a){var c=P(a);return c.map(function(a,b){return{target:a,id:b,total:c.length}})}function aa(a,c){var d=C(c);if(h.arr(a)){var b=a.length;2!==b||h.obj(a[0])?h.fnc(c.duration)||(d.duration=c.duration/b):a={value:a}}return m(a).map(function(a,b){b=b?0:c.delay;a=h.obj(a)&&!h.pth(a)?a:{value:a};h.und(a.delay)&&(a.delay=b);return a}).map(function(a){return z(a,d)})}function ba(a,c){var d={},b;for(b in a){var f=I(a[b],c);h.arr(f)&&(f=f.map(function(a){return I(a,
c)}),1===f.length&&(f=f[0]));d[b]=f}d.duration=parseFloat(d.duration);d.delay=parseFloat(d.delay);return d}function ca(a){return h.arr(a)?A.apply(this,a):Q[a]}function da(a,c){var d;return a.tweens.map(function(b){b=ba(b,c);var f=b.value,e=K(c.target,a.name),k=d?d.to.original:e,k=h.arr(f)?f[0]:k,w=L(h.arr(f)?f[1]:f,k),e=y(w)||y(k)||y(e);b.from=O(k,e);b.to=O(w,e);b.start=d?d.end:a.offset;b.end=b.start+b.delay+b.duration;b.easing=ca(b.easing);b.elasticity=(1E3-Math.min(Math.max(b.elasticity,1),999))/
1E3;b.isPath=h.pth(f);b.isColor=h.col(b.from.original);b.isColor&&(b.round=1);return d=b})}function ea(a,c){return r(p(a.map(function(a){return c.map(function(b){var c=J(a.target,b.name);if(c){var d=da(b,a);b={type:c,property:b.name,animatable:a,tweens:d,duration:d[d.length-1].end,delay:d[0].delay}}else b=void 0;return b})})),function(a){return!h.und(a)})}function R(a,c,d,b){var f="delay"===a;return c.length?(f?Math.min:Math.max).apply(Math,c.map(function(b){return b[a]})):f?b.delay:d.offset+b.delay+
b.duration}function fa(a){var c=D(ga,a),d=D(S,a),b=Z(a.targets),f=[],e=z(c,d),k;for(k in a)e.hasOwnProperty(k)||"targets"===k||f.push({name:k,offset:e.offset,tweens:aa(a[k],d)});a=ea(b,f);return z(c,{children:[],animatables:b,animations:a,duration:R("duration",a,c,d),delay:R("delay",a,c,d)})}function q(a){function c(){return window.Promise&&new Promise(function(a){return p=a})}function d(a){return g.reversed?g.duration-a:a}function b(a){for(var b=0,c={},d=g.animations,f=d.length;b<f;){var e=d[b],
k=e.animatable,h=e.tweens,n=h.length-1,l=h[n];n&&(l=r(h,function(b){return a<b.end})[0]||l);for(var h=Math.min(Math.max(a-l.start-l.delay,0),l.duration)/l.duration,w=isNaN(h)?1:l.easing(h,l.elasticity),h=l.to.strings,p=l.round,n=[],m=void 0,m=l.to.numbers.length,t=0;t<m;t++){var x=void 0,x=l.to.numbers[t],q=l.from.numbers[t],x=l.isPath?Y(l.value,w*x):q+w*(x-q);p&&(l.isColor&&2<t||(x=Math.round(x*p)/p));n.push(x)}if(l=h.length)for(m=h[0],w=0;w<l;w++)p=h[w+1],t=n[w],isNaN(t)||(m=p?m+(t+p):m+(t+" "));
else m=n[0];ha[e.type](k.target,e.property,m,c,k.id);e.currentValue=m;b++}if(b=Object.keys(c).length)for(d=0;d<b;d++)H||(H=E(document.body,"transform")?"transform":"-webkit-transform"),g.animatables[d].target.style[H]=c[d].join(" ");g.currentTime=a;g.progress=a/g.duration*100}function f(a){if(g[a])g[a](g)}function e(){g.remaining&&!0!==g.remaining&&g.remaining--}function k(a){var k=g.duration,n=g.offset,w=n+g.delay,r=g.currentTime,x=g.reversed,q=d(a);if(g.children.length){var u=g.children,v=u.length;
if(q>=g.currentTime)for(var G=0;G<v;G++)u[G].seek(q);else for(;v--;)u[v].seek(q)}if(q>=w||!k)g.began||(g.began=!0,f("begin")),f("run");if(q>n&&q<k)b(q);else if(q<=n&&0!==r&&(b(0),x&&e()),q>=k&&r!==k||!k)b(k),x||e();f("update");a>=k&&(g.remaining?(t=h,"alternate"===g.direction&&(g.reversed=!g.reversed)):(g.pause(),g.completed||(g.completed=!0,f("complete"),"Promise"in window&&(p(),m=c()))),l=0)}a=void 0===a?{}:a;var h,t,l=0,p=null,m=c(),g=fa(a);g.reset=function(){var a=g.direction,c=g.loop;g.currentTime=
0;g.progress=0;g.paused=!0;g.began=!1;g.completed=!1;g.reversed="reverse"===a;g.remaining="alternate"===a&&1===c?2:c;b(0);for(a=g.children.length;a--;)g.children[a].reset()};g.tick=function(a){h=a;t||(t=h);k((l+h-t)*q.speed)};g.seek=function(a){k(d(a))};g.pause=function(){var a=v.indexOf(g);-1<a&&v.splice(a,1);g.paused=!0};g.play=function(){g.paused&&(g.paused=!1,t=0,l=d(g.currentTime),v.push(g),B||ia())};g.reverse=function(){g.reversed=!g.reversed;t=0;l=d(g.currentTime)};g.restart=function(){g.pause();
g.reset();g.play()};g.finished=m;g.reset();g.autoplay&&g.play();return g}var ga={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},S={duration:1E3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},W="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "),H,h={arr:function(a){return Array.isArray(a)},obj:function(a){return-1<Object.prototype.toString.call(a).indexOf("Object")},
pth:function(a){return h.obj(a)&&a.hasOwnProperty("totalLength")},svg:function(a){return a instanceof SVGElement},dom:function(a){return a.nodeType||h.svg(a)},str:function(a){return"string"===typeof a},fnc:function(a){return"function"===typeof a},und:function(a){return"undefined"===typeof a},hex:function(a){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)},rgb:function(a){return/^rgb/.test(a)},hsl:function(a){return/^hsl/.test(a)},col:function(a){return h.hex(a)||h.rgb(a)||h.hsl(a)}},A=function(){function a(a,
d,b){return(((1-3*b+3*d)*a+(3*b-6*d))*a+3*d)*a}return function(c,d,b,f){if(0<=c&&1>=c&&0<=b&&1>=b){var e=new Float32Array(11);if(c!==d||b!==f)for(var k=0;11>k;++k)e[k]=a(.1*k,c,b);return function(k){if(c===d&&b===f)return k;if(0===k)return 0;if(1===k)return 1;for(var h=0,l=1;10!==l&&e[l]<=k;++l)h+=.1;--l;var l=h+(k-e[l])/(e[l+1]-e[l])*.1,n=3*(1-3*b+3*c)*l*l+2*(3*b-6*c)*l+3*c;if(.001<=n){for(h=0;4>h;++h){n=3*(1-3*b+3*c)*l*l+2*(3*b-6*c)*l+3*c;if(0===n)break;var m=a(l,c,b)-k,l=l-m/n}k=l}else if(0===
n)k=l;else{var l=h,h=h+.1,g=0;do m=l+(h-l)/2,n=a(m,c,b)-k,0<n?h=m:l=m;while(1e-7<Math.abs(n)&&10>++g);k=m}return a(k,d,f)}}}}(),Q=function(){function a(a,b){return 0===a||1===a?a:-Math.pow(2,10*(a-1))*Math.sin(2*(a-1-b/(2*Math.PI)*Math.asin(1))*Math.PI/b)}var c="Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),d={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],a],Out:[[.25,
.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(b,c){return 1-a(1-b,c)}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(b,c){return.5>b?a(2*b,c)/2:1-a(-2*b+2,c)/2}]},b={linear:A(.25,.25,.75,.75)},f={},e;for(e in d)f.type=e,d[f.type].forEach(function(a){return function(d,f){b["ease"+a.type+c[f]]=h.fnc(d)?
d:A.apply($jscomp$this,d)}}(f)),f={type:f.type};return b}(),ha={css:function(a,c,d){return a.style[c]=d},attribute:function(a,c,d){return a.setAttribute(c,d)},object:function(a,c,d){return a[c]=d},transform:function(a,c,d,b,f){b[f]||(b[f]=[]);b[f].push(c+"("+d+")")}},v=[],B=0,ia=function(){function a(){B=requestAnimationFrame(c)}function c(c){var b=v.length;if(b){for(var d=0;d<b;)v[d]&&v[d].tick(c),d++;a()}else cancelAnimationFrame(B),B=0}return a}();q.version="2.2.0";q.speed=1;q.running=v;q.remove=
function(a){a=P(a);for(var c=v.length;c--;)for(var d=v[c],b=d.animations,f=b.length;f--;)u(a,b[f].animatable.target)&&(b.splice(f,1),b.length||d.pause())};q.getValue=K;q.path=function(a,c){var d=h.str(a)?e(a)[0]:a,b=c||100;return function(a){return{el:d,property:a,totalLength:N(d)*(b/100)}}};q.setDashoffset=function(a){var c=N(a);a.setAttribute("stroke-dasharray",c);return c};q.bezier=A;q.easings=Q;q.timeline=function(a){var c=q(a);c.pause();c.duration=0;c.add=function(d){c.children.forEach(function(a){a.began=
!0;a.completed=!0});m(d).forEach(function(b){var d=z(b,D(S,a||{}));d.targets=d.targets||a.targets;b=c.duration;var e=d.offset;d.autoplay=!1;d.direction=c.direction;d.offset=h.und(e)?b:L(e,b);c.began=!0;c.completed=!0;c.seek(d.offset);d=q(d);d.began=!0;d.completed=!0;d.duration>b&&(c.duration=d.duration);c.children.push(d)});c.seek(0);c.reset();c.autoplay&&c.restart();return c};return c};q.random=function(a,c){return Math.floor(Math.random()*(c-a+1))+a};return q});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ }),
/* 172 */
/***/ (function(module, exports) {

/**
 * Active color.
 */
AFRAME.registerComponent('active-color', {
  dependencies: ['material'],

  schema: {
    active: { default: false },
    color: { default: '#ffffff' }
  },

  init: function () {
    this.defaultColor = this.el.getAttribute('material').color;
  },

  update: function () {
    var el = this.el;

    if (this.data.active) {
      el.setAttribute('material', { 'color': this.data.color, 'opacity': 1 });
    } else {
      el.setAttribute('material', 'color', this.defaultColor);
      if (el.components.animation__mouseleave) {
        setTimeout(() => {
          el.emit('mouseleave', null, false);
        });
      }
    }
  }
});

AFRAME.registerComponent('active-text-color', {
  dependencies: ['text'],

  schema: {
    active: { default: false },
    color: { default: '#333' }
  },

  init: function () {
    this.defaultColor = this.el.getAttribute('text').color;
  },

  update: function () {
    var el = this.el;
    if (this.data.active) {
      el.setAttribute('text', 'color', this.data.color);
    } else {
      el.setAttribute('text', 'color', this.defaultColor);
    }
  }
});

/***/ }),
/* 173 */
/***/ (function(module, exports) {

AFRAME.registerComponent('analyser', {
  dependencies: ['audioanalyser'],
  schema: {
    height: { default: 1.0 },
    thickness: { default: 0.1 },
    separation: { default: 0.3 },
    scale: { default: 4.0 },
    mirror: { default: 3 }
  },

  init: function () {
    this.analyser = this.el.components.audioanalyser;
    this.columns = null;
    var material = this.el.sceneEl.systems.materials.black;
    var geometry = new THREE.BoxBufferGeometry();
    for (var i = 0; i < this.analyser.data.fftSize; i++) {
      for (var side = 0; side < 2; side++) {
        var column = new THREE.Mesh(geometry, material);
        this.el.object3D.add(column);
      }
    }
    this.columns = this.el.object3D.children;
  },

  update: function () {
    var z = 0;
    for (var i = 0; i < this.columns.length; i++) {
      this.columns[i].position.x = (i % 2 * 2 - 1) * this.data.mirror;
      this.columns[i].position.z = z;
      this.columns[i].scale.set(this.data.thickness, this.data.height, this.data.thickness);
      z -= this.data.separation;
    }
  },

  tick: function () {
    var v;
    var height = this.data.height;
    var n = this.columns.length / 2;

    for (var i = 0; i < n; i++) {
      v = height + this.analyser.levels[i] / 256.0 * this.data.scale;
      this.columns[i * 2 + 0].scale.y = v;
      this.columns[i * 2 + 1].scale.y = v;
    }
  }
});

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(55);

/**
 * Load beat data (all the beats and such).
 */
AFRAME.registerComponent('beat-loader', {
  schema: {
    challengeId: { type: 'string' },
    difficulty: { type: 'string' }
  },

  update: function () {
    if (!this.data.challengeId || !this.data.difficulty) {
      return;
    }
    this.loadBeats(this.data.challengeId, this.data.difficulty);
  },

  /**
   * XHR.
   */
  loadBeats: function (id, difficulty) {
    var el = this.el;
    var xhr;

    // Load beats.
    let url = utils.getS3FileUrl(this.data.challengeId, `${this.data.difficulty}.json`);
    xhr = new XMLHttpRequest();
    el.emit('beatloaderstart');
    console.log(`Fetching ${url}...`);
    xhr.open('GET', url);
    xhr.addEventListener('load', () => {
      this.handleBeats(JSON.parse(xhr.responseText));
    });
    xhr.send();
  },

  /**
   * TODO: Load the beat data into the game.
   */
  handleBeats: function (beatData) {
    this.el.sceneEl.emit('beatloaderfinish', beatData, false);
    console.log('Finished loading challenge data.');
  }
});

function updateQueryParam(uri, key, value) {
  var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  var separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  } else {
    return uri + separator + key + '=' + value;
  }
}

/***/ }),
/* 175 */
/***/ (function(module, exports) {

AFRAME.registerComponent('console-shortcuts', {
  play: function () {
    window.$ = val => document.querySelector(val);
    window.$$ = val => document.querySelectorAll(val);
    window.$$$ = val => document.querySelector(`[${val}]`).getAttribute(val);
    window.$$$$ = val => document.querySelector(`[${val}]`).components[val];
    window.scene = this.el;
    window.state = this.el.systems.state.state;
  }
});

/***/ }),
/* 176 */
/***/ (function(module, exports) {

/**
 * Cursor mesh to show at intersection point with respective hand.
 */
AFRAME.registerComponent('cursor-mesh', {
  schema: {
    cursorEl: { type: 'selector' }
  },

  init: function () {
    this.scenePivotEl = document.getElementById('scenePivot');
  },

  tick: function () {
    var cursor;
    var cursorEl = this.data.cursorEl;
    var el = this.el;
    var i;
    var intersection;
    var intersectedEl;
    var intersectionPoint;
    var object3D = this.el.object3D;
    var scenePivotEl = this.scenePivotEl;

    cursor = cursorEl.components.cursor;
    if (!cursor) {
      return;
    }

    // Look for valid intersection target.
    intersectedEl = cursorEl.components.cursor.intersectedEl;
    if (intersectedEl) {
      el.object3D.visible = true;
    } else {
      el.object3D.visible = false;
      return;
    }

    // Update cursor mesh.
    intersection = cursorEl.components.raycaster.getIntersection(intersectedEl);
    el.object3D.position.copy(intersection.point);

    if (scenePivotEl) {
      el.object3D.rotation.copy(scenePivotEl.object3D.rotation);
    }
  }
});

/***/ }),
/* 177 */
/***/ (function(module, exports) {

/**
 * Keyboard bindings to control controller.
 * Position controller in front of camera.
 */
AFRAME.registerComponent('debug-controller', {
  init: function () {
    var primaryHand;
    var secondaryHand;

    if (!AFRAME.utils.getUrlParameter('debug')) {
      return;
    }

    console.log('%c debug-controller enabled ', 'background: #111; color: red');

    this.isCloning = false;
    this.isDeleting = false;
    this.isTriggerDown = false;

    primaryHand = document.getElementById('rightHand');
    secondaryHand = document.getElementById('leftHand');

    if (AFRAME.utils.getUrlParameter('debug') === 'oculus') {
      primaryHand.emit('controllerconnected', { name: 'oculus-touch-controls' });
      secondaryHand.emit('controllerconnected', { name: 'oculus-touch-controls' });
      primaryHand.setAttribute('controller', 'controllerType', 'oculus-touch-controls');
      secondaryHand.setAttribute('controller', 'controllerType', 'oculus-touch-controls');
    } else {
      primaryHand.emit('controllerconnected', { name: 'vive-controls' });
      secondaryHand.emit('controllerconnected', { name: 'vive-controls' });
      primaryHand.setAttribute('controller', 'controllerType', 'vive-controls');
      secondaryHand.setAttribute('controller', 'controllerType', 'vive-controls');
    }

    // Enable raycaster.
    this.el.emit('enter-vr', null, false);

    document.addEventListener('keydown', evt => {
      var primaryPosition;
      var primaryRotation;
      var secondaryPosition;
      var secondaryRotation;

      if (!evt.shiftKey) {
        return;
      }

      // <space> for trigger.
      if (evt.keyCode === 32) {
        if (this.isTriggerDown) {
          primaryHand.emit('triggerup');
          this.isTriggerDown = false;
        } else {
          primaryHand.emit('triggerdown');
          this.isTriggerDown = true;
        }
        return;
      }

      // <q> for secondary trigger.
      if (evt.keyCode === 81) {
        if (this.isSecondaryTriggerDown) {
          secondaryHand.emit('triggerup');
          this.isSecondaryTriggerDown = false;
        } else {
          secondaryHand.emit('triggerdown');
          this.isSecondaryTriggerDown = true;
        }
        return;
      }

      // <n> secondary grip.
      if (evt.keyCode === 78) {
        if (this.secondaryGripDown) {
          secondaryHand.emit('gripup');
          this.secondaryGripDown = false;
        } else {
          secondaryHand.emit('gripdown');
          this.secondaryGripDown = true;
        }
      }

      // <m> primary grip.
      if (evt.keyCode === 77) {
        if (this.primaryGripDown) {
          primaryHand.emit('gripup');
          this.primaryGripDown = false;
        } else {
          primaryHand.emit('gripdown');
          this.primaryGripDown = true;
        }
      }

      // Menu button <1>.
      if (evt.keyCode === 49) {
        secondaryHand.emit('menudown');
      }

      // Position bindings.
      if (evt.ctrlKey) {
        secondaryPosition = secondaryHand.getAttribute('position');
        if (evt.keyCode === 72) {
          secondaryPosition.x -= 0.01;
        } // h.
        if (evt.keyCode === 74) {
          secondaryPosition.y -= 0.01;
        } // j.
        if (evt.keyCode === 75) {
          secondaryPosition.y += 0.01;
        } // k.
        if (evt.keyCode === 76) {
          secondaryPosition.x += 0.01;
        } // l.
        if (evt.keyCode === 59 || evt.keyCode === 186) {
          secondaryPosition.z -= 0.01;
        } // ;.
        if (evt.keyCode === 222) {
          secondaryPosition.z += 0.01;
        } // ;.
        secondaryHand.setAttribute('position', AFRAME.utils.clone(secondaryPosition));
      } else {
        primaryPosition = primaryHand.getAttribute('position');
        if (evt.keyCode === 72) {
          primaryPosition.x -= 0.01;
        } // h.
        if (evt.keyCode === 74) {
          primaryPosition.y -= 0.01;
        } // j.
        if (evt.keyCode === 75) {
          primaryPosition.y += 0.01;
        } // k.
        if (evt.keyCode === 76) {
          primaryPosition.x += 0.01;
        } // l.
        if (evt.keyCode === 59 || evt.keyCode === 186) {
          primaryPosition.z -= 0.01;
        } // ;.
        if (evt.keyCode === 222) {
          primaryPosition.z += 0.01;
        } // ;.
        primaryHand.setAttribute('position', AFRAME.utils.clone(primaryPosition));
      }

      // Rotation bindings.
      if (evt.ctrlKey) {
        secondaryRotation = secondaryHand.getAttribute('rotation');
        if (evt.keyCode === 89) {
          secondaryRotation.x -= 10;
        } // y.
        if (evt.keyCode === 79) {
          secondaryRotation.x += 10;
        } // o.
        if (evt.keyCode === 85) {
          secondaryRotation.y -= 10;
        } // u.
        if (evt.keyCode === 73) {
          secondaryRotation.y += 10;
        } // i.
        secondaryHand.setAttribute('rotation', AFRAME.utils.clone(secondaryRotation));
      } else {
        primaryRotation = primaryHand.getAttribute('rotation');
        if (evt.keyCode === 89) {
          primaryRotation.x -= 10;
        } // y.
        if (evt.keyCode === 79) {
          primaryRotation.x += 10;
        } // o.
        if (evt.keyCode === 85) {
          primaryRotation.y -= 10;
        } // u.
        if (evt.keyCode === 73) {
          primaryRotation.y += 10;
        } // i.
        primaryHand.setAttribute('rotation', AFRAME.utils.clone(primaryRotation));
      }
    });
  },

  play: function () {
    var primaryHand;
    var secondaryHand;

    if (!AFRAME.utils.getUrlParameter('debug')) {
      return;
    }

    primaryHand = document.getElementById('rightHand');
    secondaryHand = document.getElementById('leftHand');

    secondaryHand.object3D.position.set(-0.2, 1.5, -0.5);
    primaryHand.object3D.position.set(0.2, 1.5, -0.5);
    secondaryHand.setAttribute('rotation', { x: 35, y: 0, z: 0 });
    primaryHand.setAttribute('rotation', { x: 35, y: 0, z: 0 });
  }
});

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Log cursor events.
 */
AFRAME.registerComponent('debug-cursor', {
  init: function () {
    if (undefined === 'production') {
      return;
    }

    this.el.addEventListener('mouseenter', evt => {
      this.log('mouseenter', evt.detail.intersectedEl, 'green');
    });

    this.el.addEventListener('mouseleave', evt => {
      this.log('mouseleave', evt.detail.intersectedEl, 'red');
    });

    this.el.addEventListener('click', evt => {
      this.log('click', evt.detail.intersectedEl, 'blue');
    });
  },

  log: function (event, intersectedEl, color) {
    if (intersectedEl.id) {
      console.log(`%c[${event}] ${intersectedEl.id}`, `color: ${color}`);
    } else {
      console.log(`%c[${event}]`, `color: ${color}`);
      console.log(intersectedEl);
    }
  }
});

/***/ }),
/* 179 */
/***/ (function(module, exports) {

const events = ['triggerdown', 'gripdown', 'abuttondown', 'bbuttondown', 'xbuttondown', 'ybuttondown', 'trackpaddown'];

/**
 * Swap left or right-handed mode.
 */
AFRAME.registerComponent('hand-swapper', {
  schema: {
    enabled: { default: false }
  },

  init: function () {
    this.swapHand = this.swapHand.bind(this);
    events.forEach(event => {
      this.el.addEventListener(event, this.swapHand);
    });
  },

  swapHand: function () {
    if (!this.data.enabled) {
      return;
    }

    // Handled via state.
    this.el.sceneEl.emit('activehandswap', null, false);
  }
});

/***/ }),
/* 180 */
/***/ (function(module, exports) {

/**
 * Update window title and history.
 */
AFRAME.registerComponent('history', {
  schema: {
    challengeId: { type: 'string' },
    songName: { type: 'string' },
    songSubName: { type: 'string' }
  },

  update: function () {
    const data = this.data;
    history.pushState('', data.songName, updateQueryParam(window.location.href, 'challenge', data.challengeId));
    document.title = `Super Saber - ${data.songName}`;
  }
});

/***/ }),
/* 181 */
/***/ (function(module, exports) {

AFRAME.registerComponent('keyboard-raycastable', {
  dependencies: ['super-keyboard'],

  play: function () {
    // TODO: bind-toggle__raycastable for when search is activated.
    this.el.components['super-keyboard'].kbImg.setAttribute('bind-toggle__raycastable', 'menu.active');
  }
});

/***/ }),
/* 182 */
/***/ (function(module, exports) {

AFRAME.registerComponent('logoflicker', {
  dependencies: ['text'],

  schema: {
    delay: { default: 1000.0 }
  },

  init: function () {
    this.setOff = this.setOff.bind(this);
    this.setOn = this.setOn.bind(this);

    this.defaultColor = new THREE.Color().setStyle(this.el.components.text.data.color);
    this.color = new THREE.Color().setStyle('#0A0228');
    this.colorUniform = this.el.components.text.material.uniforms.color.value;

    this.sparks = document.getElementById('logosparks');
    this.sparkPositions = [{ position: new THREE.Vector3(0, 0.1, 0) }, { position: new THREE.Vector3(0.5, 1.2, 0) }, { position: new THREE.Vector3(0, 1.2, 0) }];

    this.setOn();
  },

  setOff: function () {
    this.colorUniform.x = this.color.r;
    this.colorUniform.y = this.color.g;
    this.colorUniform.z = this.color.b;
    this.colorUniform.needsUpdate = true;

    this.sparks.emit('logoflicker', this.sparkPositions[Math.floor(Math.random() * this.sparkPositions.length)], false);

    setTimeout(this.setOn, 50 + Math.floor(Math.random() * 100));
  },

  setOn: function () {
    this.colorUniform.x = this.defaultColor.r;
    this.colorUniform.y = this.defaultColor.g;
    this.colorUniform.z = this.defaultColor.b;
    this.colorUniform.needsUpdate = true;

    setTimeout(this.setOff, Math.floor(this.data.delay * 3 / 10 + Math.random() * this.data.delay));
  }
});

/***/ }),
/* 183 */
/***/ (function(module, exports) {

AFRAME.registerSystem('materials', {
  init: function () {
    this.black = new THREE.MeshLambertMaterial({ color: 0x000000, flatShading: true });
    this.default = new THREE.MeshLambertMaterial({ color: 0xff0000, flatShading: true });
    this.neon = new THREE.MeshBasicMaterial({ color: 0x9999ff, fog: false });
  }
});

AFRAME.registerComponent('materials', {
  schema: {
    default: 'black',
    oneOf: ['black', 'default', 'neon']
  },
  update: function () {
    this.el.object3D.traverse(o => o.material = this.system[this.data]);
  }
});

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var bindEvent = __webpack_require__(99).bindEvent;

/**
 * Select difficulty.
 */
AFRAME.registerComponent('menu-difficulty-select', {
  init: function () {
    this.el.sceneEl.addEventListener('menuchallengeselect', () => {
      setTimeout(() => {
        this.el.components.layout.update();
      });
    });
  },

  click: bindEvent(function (evt) {
    this.el.sceneEl.emit('menudifficultyselect', evt.target.closest('.difficultyOption').dataset.difficulty, false);
  })
});

/***/ }),
/* 185 */
/***/ (function(module, exports) {

/**
 * Reuse images from the search results to not create another texture.
 */
AFRAME.registerComponent('menu-selected-challenge-image', {
  schema: {
    selectedChallengeId: { type: 'string' }
  },

  init: function () {
    this.searchResultEls = document.getElementById('searchResultList');
  },

  update: function () {
    const data = this.data;
    const el = this.el;

    if (!data.selectedChallengeId) {
      return;
    }

    const imageEl = this.searchResultEls.querySelector(`[data-id="${data.selectedChallengeId}"] .searchResultImage`);
    el.getObject3D('mesh').material.map = imageEl.getObject3D('mesh').material.map;
    el.getObject3D('mesh').material.needsUpdate = true;
  }
});

/***/ }),
/* 186 */
/***/ (function(module, exports) {

const events = ['menudown', 'abuttondown', 'bbuttondown', 'xbuttondown', 'ybuttondown'];

/**
 * Tell app to pause game if playing.
 */
AFRAME.registerComponent('pauser', {
  schema: {
    enabled: { default: true }
  },

  init: function () {
    this.pauseGame = this.pauseGame.bind(this);

    events.forEach(event => {
      this.el.addEventListener(event, this.pauseGame);
    });
  },

  pauseGame: function () {
    if (!this.data.enabled) {
      return;
    }
    this.el.sceneEl.emit('pausegame', null, false);
  }
});

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var SoundPool = __webpack_require__(200);

AFRAME.registerSystem('play-sound', {
  init: function () {
    this.lastSoundPlayed = '';
    this.lastSoundPlayedTime = 0;
    this.pools = {};
  },

  createPool: function (sound, volume) {
    if (this.pools[sound]) {
      return;
    }
    this.pools[sound] = new SoundPool(sound, volume);
  },

  playSound: function (sound, volume) {
    if (!this.pools[sound]) {
      this.createPool(sound, volume);
    }
    this.pools[sound].play();

    this.lastSoundPlayed = sound;
    this.lastSoundTime = this.el.time;
  }
});

/**
 * Play sound on event.
 */
AFRAME.registerComponent('play-sound', {
  schema: {
    enabled: { default: true },
    event: { type: 'string' },
    sound: { type: 'string' },
    volume: { type: 'number', default: 1 }
  },

  multiple: true,

  init: function () {
    this.el.addEventListener(this.data.event, evt => {
      if (!this.data.enabled) {
        return;
      }
      this.system.playSound(this.src, this.data.volume);
    });
  },

  update: function () {
    this.src = this.data.sound;
    if (this.data.sound.startsWith('#')) {
      this.src = document.querySelector(this.data.sound).getAttribute('src');
    }
  }
});

/***/ }),
/* 188 */
/***/ (function(module, exports) {

AFRAME.registerComponent('gpu-preloader', {
  init: function () {
    setTimeout(() => {
      this.preloadFont();
      this.preloadKeyboard();
    }, 1000);

    setTimeout(() => {
      this.el.object3D.visible = false;
    }, 2000);
  },

  preloadFont: function () {
    var text;
    text = document.querySelector('[text]');
    if (text.components.text.texture) {
      this.preloadTexture(text.components.text.texture);
    } else {
      text.addEventListener('textfontset', () => {
        this.preloadTexture(text.components.text.texture);
      });
    }
  },

  preloadKeyboard: function () {
    var kbd;
    kbd = document.getElementById('kb');
    kbd.object3D.traverse(node => {
      if (node.material && node.material.map) {
        this.preloadTexture(node.material.map);
      }
    });
  },

  preloadTexture: function (texture) {
    this.el.sceneEl.renderer.setTexture2D(texture, 0);
  }
});

/***/ }),
/* 189 */
/***/ (function(module, exports) {

AFRAME.registerComponent('raycastable', {});

/***/ }),
/* 190 */
/***/ (function(module, exports) {

/**
 * Pivot the scene when user enters VR to face the links.
 */
AFRAME.registerComponent('recenter', {
  schema: {
    enabled: { default: true },
    target: { default: '' }
  },

  init: function () {
    var sceneEl = this.el.sceneEl;
    this.matrix = new THREE.Matrix4();
    this.frustum = new THREE.Frustum();
    this.rotationOffset = 0;
    this.euler = new THREE.Euler();
    this.euler.order = 'YXZ';
    this.menuPosition = new THREE.Vector3();
    this.recenter = this.recenter.bind(this);
    this.checkInViewAfterRecenter = this.checkInViewAfterRecenter.bind(this);
    this.target = document.querySelector(this.data.target);

    // Delay to make sure we have a valid pose.
    sceneEl.addEventListener('enter-vr', () => setTimeout(this.recenter, 100));
    // User can also recenter the menu manually.
    sceneEl.addEventListener('menudown', this.recenter);
    sceneEl.addEventListener('thumbstickdown', this.recenter);
    window.addEventListener('vrdisplaypresentchange', this.recenter);
  },

  recenter: function () {
    var euler = this.euler;
    if (!this.data.enabled) {
      return;
    }
    euler.setFromRotationMatrix(this.el.sceneEl.camera.el.object3D.matrixWorld, 'YXZ');
    this.el.object3D.rotation.y = euler.y + this.rotationOffset;
    // Check if the menu is in camera frustum in next tick after a frame has rendered.
    setTimeout(this.checkInViewAfterRecenter, 0);
  },

  /*
   * Sometimes the quaternion returns the yaw in the [-180, 180] range.
   * Check if the menu is in the camera frustum after recenter it to
   * decide if we apply an offset or not.
   */
  checkInViewAfterRecenter: function () {
    var bottomVec3 = new THREE.Vector3();
    var topVec3 = new THREE.Vector3();

    return function () {
      var camera = this.el.sceneEl.camera;
      var frustum = this.frustum;
      var menuPosition = this.menuPosition;

      camera.updateMatrix();
      camera.updateMatrixWorld();
      frustum.setFromMatrix(this.matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));

      // Check if menu position (and its bounds) are within the frustum.
      // Check bounds in case looking angled up or down, rather than menu central.
      menuPosition.setFromMatrixPosition(this.target.object3D.matrixWorld);
      bottomVec3.copy(menuPosition).y -= 3;
      topVec3.copy(menuPosition).y += 3;

      if (frustum.containsPoint(menuPosition) || frustum.containsPoint(bottomVec3) || frustum.containsPoint(topVec3)) {
        return;
      }

      this.rotationOffset = this.rotationOffset === 0 ? Math.PI : 0;
      // Recenter again with the new offset.
      this.recenter();
    };
  }(),

  remove: function () {
    this.el.sceneEl.removeEventListener('enter-vr', this.recenter);
  }
});

/***/ }),
/* 191 */
/***/ (function(module, exports) {

AFRAME.registerComponent('saber-controls', {
  schema: {
    hand: { default: 'right', oneOf: ['left', 'right'] },
    bladeEnabled: { default: true }
  },

  colors: {
    right: '#78aaff', // Blue
    left: '#ffa8a8' // Red
  },

  init: function () {
    var el = this.el;
    var data = this.data;
    el.addEventListener('controllerconnected', this.initSaber.bind(this));

    const hand = { hand: data.hand, model: false };
    el.setAttribute('oculus-touch-controls', hand);
    el.setAttribute('vive-controls', hand);
    el.setAttribute('windows-motion-controls', hand);
  },

  update: function () {
    if (!this.bladeEl) {
      return;
    }
    this.bladeEl.object3D.visible = this.data.bladeEnabled;
    if (this.data.bladeEnabled) {
      this.bladeElPivot.object3D.scale.set(0.0001, 0.001, 0.0001);
      this.bladeEl.emit('drawblade');
    }
  },

  tick: function () {
    if (!this.bladeEl || !this.bladeEl.getObject3D('mesh')) {
      return;
    }
    this.boundingBox.setFromObject(this.bladeEl.getObject3D('mesh'));
  },

  initSaber: function (evt) {
    var el = this.el;
    var saberHandleEl = document.createElement('a-entity');
    var bladeEl = this.bladeEl = document.createElement('a-entity');
    var bladeElPivot = this.bladeElPivot = document.createElement('a-entity');
    var saberPivotEl = document.createElement('a-entity');
    var highlightTop = document.createElement('a-entity');
    var highlightBottom = document.createElement('a-entity');
    var controllerConfig = this.config[evt.detail.name];

    this.boundingBox = new THREE.Box3();

    bladeEl.setAttribute('material', { shader: 'flat', color: this.colors[this.data.hand] });
    bladeEl.setAttribute('geometry', { primitive: 'box', height: 0.9, depth: 0.020, width: 0.020 });
    bladeEl.setAttribute('position', '0 -0.55 0');
    bladeEl.setAttribute('play-sound', { event: 'drawblade', sound: "#saberDraw" });
    bladeEl.object3D.visible = this.data.bladeEnabled;

    // For blade saber draw animation.
    bladeElPivot.appendChild(bladeEl);
    bladeElPivot.setAttribute('animation', 'property: scale; from: 0 0 0; to: 1.0 1.0 1.0; dur: 750; easing: linear; startEvents: drawblade');

    saberHandleEl.setAttribute('material', { shader: 'flat', color: '#151515' });
    saberHandleEl.setAttribute('geometry', { primitive: 'box', height: 0.2, depth: 0.025, width: 0.025 });
    saberHandleEl.setAttribute('position', '0 0 0');

    highlightTop.setAttribute('material', { shader: 'flat', color: this.colors[this.data.hand] });
    highlightTop.setAttribute('geometry', { primitive: 'box', height: 0.18, depth: 0.005, width: 0.005 });
    highlightTop.setAttribute('position', '0 0 0.0125');

    highlightBottom.setAttribute('material', { shader: 'flat', color: this.colors[this.data.hand] });
    highlightBottom.setAttribute('geometry', { primitive: 'box', height: 0.18, depth: 0.005, width: 0.005 });
    highlightBottom.setAttribute('position', '0 0 -0.0125');

    saberHandleEl.appendChild(highlightTop);
    saberHandleEl.appendChild(highlightBottom);

    saberPivotEl.setAttribute('rotation', '90 0 0');
    saberPivotEl.appendChild(saberHandleEl);
    saberPivotEl.appendChild(bladeElPivot);
    el.appendChild(saberPivotEl);

    this.controllerConnected = true;
    this.controllerType = evt.detail.name;

    el.setAttribute('cursor', controllerConfig.cursor || {});
  },

  config: {
    'oculus-touch-controls': {
      cursor: {
        downEvents: ['triggerdown', 'gripdown', 'abuttondown', 'bbuttondown', 'xbuttondown', 'ybuttondown'],
        upEvents: ['triggerup', 'gripup', 'abuttonup', 'bbuttonup', 'xbuttonup', 'ybuttonup']
      }
    },

    'vive-controls': {
      cursor: {
        downEvents: ['trackpaddown', 'triggerdown', 'gripdown'],
        upEvents: ['trackpadup', 'triggerup', 'gripup']
      }
    },

    'windows-motion-controls': {
      cursor: {
        downEvents: ['trackpaddown', 'triggerdown', 'gripdown'],
        upEvents: ['trackpadup', 'triggerup', 'gripup']
      }
    }
  }
});

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var algoliasearch = __webpack_require__(160);
var bindEvent = __webpack_require__(99).bindEvent;

var client = algoliasearch('QULTOY3ZWU', 'be07164192471df7e97e6fa70c1d041d');
var algolia = client.initIndex('supersaber');

/**
 * Search (including the initial list of popular searches).
 * Attached to super-keyboard.
 */
AFRAME.registerComponent('search', {
  init: function () {
    this.eventDetail = { results: [] };
    this.popularHits = null;
    this.queryObject = { hitsPerPage: 100, query: '' };

    // Populate popular.
    this.search('');

    // Less hits on normal searches.
    this.queryObject.hitsPerPage = 30;
  },

  superkeyboardchange: bindEvent(function (evt) {
    this.search(evt.detail.value);
  }),

  search: function (query) {
    // Use cached for popular hits.
    if (!query && this.popularHits) {
      this.eventDetail.results = popularHits;
      this.el.sceneEl.emit('searchresults', this.eventDetail);
      return;
    }

    this.queryObject.query = query;
    algolia.search(this.queryObject, (err, content) => {
      // Cache popular hits.
      if (!query) {
        this.popularHits = content.hits;
      }
      this.eventDetail.results = content.hits;
      this.el.sceneEl.emit('searchresults', this.eventDetail);
    });
  }
});

/**
 * Click listener for search result.
 */
AFRAME.registerComponent('search-result-list', {
  click: bindEvent(function (evt) {
    this.el.sceneEl.emit('menuchallengeselect', evt.target.closest('.searchResult').dataset.id, false);
  })
});

AFRAME.registerComponent('search-result-image', {
  dependencies: ['material'],

  schema: {
    id: { type: 'string' }
  },

  init: function () {
    this.materialUpdateObj = { color: '#223' };

    this.el.addEventListener('materialtextureloaded', () => {
      this.el.setAttribute('material', 'color', '#FFF');
    });
  },

  update: function () {
    this.el.components.material.material.map = null;
    this.el.components.material.material.needsUpdate = true;

    this.materialUpdateObj.src = `https://s3-us-west-2.amazonaws.com/supersaber/${this.data.id}-image.jpg`;
    this.el.setAttribute('material', this.materialUpdateObj);
  }
});

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(55);

/**
 * Song preview when search result selected with smart logic for preloading.
 */
AFRAME.registerComponent('song-preview-system', {
  schema: {
    selectedChallengeId: { type: 'string' }
  },

  init: function () {
    this.audio = null;
    this.audioStore = {};
    this.preloadedAudioIds = [];
    this.preloadQueue = [];

    // anime.js animation to fade in volume.
    this.volumeTarget = { volume: 0 };
    this.animation = AFRAME.anime({
      targets: this.volumeTarget,
      delay: 250,
      duration: 1500,
      easing: 'easeInQuad',
      volume: 0.5,
      autoplay: false,
      loop: false,
      update: () => {
        this.audio.volume = this.volumeTarget.volume;
      }
    });
  },

  update: function (oldData) {
    const data = this.data;

    if (oldData.selectedChallengeId && oldData.selectedChallengeId !== data.selectedChallengeId) {
      this.stopSong();
    }

    // Selected challenge ID updated.
    if (data.selectedChallengeId && oldData.selectedChallengeId !== data.selectedChallengeId) {
      // If not yet preloaded, pause the preload queue until this song is loaded.
      if (!this.preloadedAudioIds.includes(data.selectedChallengeId) && data.selectedChallengeId !== this.currentLoadingId) {
        this.prioritizePreloadSong();
      }

      this.playSong(data.selectedChallengeId);
    }
  },

  /**
   * Song was selected so pause preload queue, prioritize its loading, and try to play ASAP.
   */
  prioritizePreloadSong: function () {
    const data = this.data;
    const preloadQueue = this.preloadQueue;

    console.log(`[song-preview] Prioritizing loading of ${data.selectedChallengeId}`);
    this.priorityLoadingChallengeId = data.selectedChallengeId;

    this.audioStore[data.selectedChallengeId].addEventListener('loadeddata', () => {
      console.log(`[song-preview] Finished load of priority ${data.selectedChallengeId}`);
      this.preloadedAudioIds.push(data.selectedChallengeId);
      this.priorityLoadingChallengeId = '';
      // Resume preloading queue.
      if (preloadQueue.length) {
        console.log(`[song-preview] Resuming queue with ${preloadQueue[0].challengeId}`);
        this.preloadMetadata(preloadQueue[0]);
      }
    });

    // Preload.
    this.audioStore[data.selectedChallengeId].src = utils.getS3FileUrl(data.selectedChallengeId, 'song.ogg');

    // Remove from preload queue.
    for (let i = 0; i < preloadQueue.length; i++) {
      if (preloadQueue[i].challengeId === data.selectedChallengeId) {
        preloadQueue.splice(i, 1);
        break;
      }
    }
  },

  /**
   * Create an audio element and queue to preload. If the queue is empty, preload it
   * immediately.
   */
  queuePreloadSong: function (challengeId, previewStartTime) {
    if (this.audioStore[challengeId]) {
      return;
    }

    const audio = document.createElement('audio');
    audio.crossOrigin = 'anonymous';
    // audio.currentTime = previewStartTime;
    audio.volume = 0;
    this.audioStore[challengeId] = audio;

    let src = utils.getS3FileUrl(challengeId, 'song.ogg');
    if (this.currentLoadingId) {
      // Audio currently loading, add to queue.
      this.preloadQueue.push({
        audio: audio,
        challengeId: challengeId,
        src: src
      });
    } else {
      // Empty queue, preload now.
      this.preloadMetadata({
        audio: audio,
        challengeId: challengeId,
        src: src
      });
    }
  },

  /**
   * Preload metadata of audio file for quick play.
   * Set `src` and `preload`.
   * A preload queue is set up so we only preload one at a time to not bog down
   * the network. If a song is selected to preview, we can bump it to the front of the
   * queue.
   */
  preloadMetadata: function (preloadItem) {
    const audio = preloadItem.audio;
    console.log(`[song-preview] Preloading song preview ${preloadItem.challengeId}`);

    audio.addEventListener('loadedmetadata', () => {
      // Song preloaded.
      console.log(`[song-preview] Finished preloading song preview ${preloadItem.challengeId}`);
      this.preloadedAudioIds.push(preloadItem.challengeId);
      this.currentLoadingId = '';

      // Move on to next song in queue if any.
      console.log(`[song-preview] ${this.preloadQueue.length} in queue`);
      if (this.preloadQueue.length && !this.priorityLoadingChallengeId) {
        this.preloadMetadata(this.preloadQueue.shift());
      }
    });

    audio.preload = 'metadata';
    audio.src = preloadItem.src;
    this.currentLoadingId = preloadItem.challengeId;
  },

  stopSong: function () {
    if (!this.audio) {
      return;
    }
    if (this.animation) {
      this.animation.pause();
    }
    if (!this.audio.paused) {
      this.audio.pause();
    }
  },

  playSong: function (challengeId) {
    if (!challengeId) {
      return;
    }
    this.audio = this.audioStore[challengeId];
    this.audio.volume = 0;
    this.volumeTarget.volume = 0;
    this.audio.play();
    this.animation.restart();
    this.updateAnalyser();
  },

  updateAnalyser: function () {
    document.getElementById('introSong').pause();
    document.getElementById('audioanalyser').setAttribute('audioanalyser', 'src', this.audio);
  },

  /**
   * Stop song from preloading.
   */
  clearSong: function (challengeId) {
    let audio = this.audioStore[challengeId];
    audio.preload = 'none';

    // Remove from queue if in there.
    let index;
    for (let i = 0; i < this.preloadQueue.length; i++) {
      if (this.preloadQueue[i].id === challengeId) {
        index = i;
        break;
      }
    }
    if (!index) {
      return;
    }
    this.preloadQueue.splice(i, 1);
  }
});

/**
 * Data component attached to search result for song preview system.
 */
AFRAME.registerComponent('song-preview', {
  schema: {
    challengeId: { type: 'string' },
    previewStartTime: { type: 'number' }
  },

  update: function (oldData) {
    if (oldData.challengeId && this.data.challengeId !== oldData.challengeId) {
      this.el.sceneEl.components['song-preview-system'].clearSong(oldData.challengeId);
    }

    this.el.sceneEl.components['song-preview-system'].queuePreloadSong(this.data.challengeId, this.data.previewStartTime);
  }
});

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

const utils = __webpack_require__(55);

/**
 * Active challenge song / audio.
 */
AFRAME.registerComponent('song', {
  schema: {
    challengeId: { default: '' },
    isPlaying: { default: false }
  },

  init: function () {
    // Use audio element for audioanalyser.
    this.audio = document.createElement('audio');
    this.audio.setAttribute('id', 'song');
    this.el.sceneEl.appendChild(this.audio);
  },

  update: function (oldData) {
    var el = this.el;
    var data = this.data;

    // Changed challenge.
    if (data.challengeId !== oldData.challengeId) {
      let songUrl = utils.getS3FileUrl(data.challengeId, 'song.ogg');
      this.audio.addEventListener('canplaythrough', () => {
        this.audio.currentTime = 0;
      }, false);
      this.audio.src = data.challengeId ? songUrl : '';
    }

    // Keep playback state up to date.
    if (data.isPlaying && data.challengeId && this.audio.paused) {
      console.log(`Playing ${this.audio.src}...`);
      this.audio.play();
      return;
    } else if ((!data.isPlaying || !data.challengeId) && !this.audio.paused) {
      this.audio.pause();
    }
  }
});

/***/ }),
/* 195 */
/***/ (function(module, exports) {

AFRAME.registerComponent('stage-colors', {
  schema: {
    default: 'red',
    oneOf: ['red', 'blue']
  },

  init: function () {
    this.neonRed = new THREE.Color(0xff9999);
    this.neonBlue = new THREE.Color(0x9999ff);
    this.defaultRed = new THREE.Color(0xff0000);
    this.defaultBlue = new THREE.Color(0x0000ff);
    this.mineEnvMap = {
      red: new THREE.TextureLoader().load('assets/img/mineenviro-red.jpg'),
      blue: new THREE.TextureLoader().load('assets/img/mineenviro-blue.jpg')
    };
    this.mineColor = { red: new THREE.Color(0x070304), blue: new THREE.Color(0x030407) };
    this.mineEmission = { red: new THREE.Color(0x090707), blue: new THREE.Color(0x070709) };
    this.mineMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.38,
      metalness: 0.48,
      color: this.mineColor[this.data],
      emissive: this.mineEmission[this.data],
      envMap: this.mineEnvMap[this.data]
    });
  },

  update: function () {
    var red = this.data == 'red';
    document.getElementById('backglow').setAttribute('material', { color: red ? '#f10' : '#00acfc' });
    document.getElementById('sky').setAttribute('material', { color: red ? '#770100' : '#15252d' });
    this.el.sceneEl.setAttribute('fog', { color: red ? '#a00' : '#007cb9' });
    this.el.sceneEl.systems.materials.neon.color = red ? this.neonRed : this.neonBlue;
    this.el.sceneEl.systems.materials.default.color = red ? this.defaultRed : this.defaultBlue;
    this.mineMaterial.color = this.mineColor[this.data];
    this.mineMaterial.emissive = this.mineEmission[this.data];
    this.mineMaterial.envMap = this.mineEnvMap[this.data];
  }

});

/***/ }),
/* 196 */
/***/ (function(module, exports) {

AFRAME.registerComponent('text-uppercase', {
  schema: {
    value: { type: 'string' }
  },

  update: function () {
    this.el.setAttribute('text', 'value', this.data.value.toUpperCase());
  }
});

/***/ }),
/* 197 */
/***/ (function(module, exports) {

AFRAME.registerComponent('toggle-pause-play', {
  schema: {
    isPlaying: { default: false }
  },

  update: function () {
    const action = this.data.isPlaying ? 'pause' : 'play';
    parent.postMessage(JSON.stringify({ verify: 'game-action', action }), '*');
  }
});

/***/ }),
/* 198 */
/***/ (function(module, exports) {

AFRAME.registerComponent('twister', {
  schema: {
    twist: { default: 0 },
    vertices: { default: 4, type: 'int' },
    count: { default: 20, type: 'int' },
    positionIncrement: { default: 2 },
    radiusIncrement: { default: 0.5 },
    thickness: { default: 0.4 }
  },

  init: function () {
    this.currentTwist = 0;
    this.animate = false;
  },

  update: function (oldData) {
    var radius = 4;
    var segment;
    var lastSegment;

    if (Math.abs(this.data.twist - this.currentTwist) > 0.001) {
      this.animate = true;
    }

    this.clearSegments();
    lastSegment = this.el.object3D;

    for (var i = 0; i < this.data.count; i++) {
      segment = this.createSegment(radius);
      segment.position.y = this.data.positionIncrement;
      lastSegment.add(segment);
      lastSegment = segment;
      radius += this.data.radiusIncrement;
    }
  },

  createSegment: function (radius) {
    const R = this.data.thickness;
    var points = [new THREE.Vector2(radius - R, R), new THREE.Vector2(radius - R, -R), new THREE.Vector2(radius + R, -R), new THREE.Vector2(radius + R, R), new THREE.Vector2(radius - R, R)];
    var material = this.el.sceneEl.systems.materials.black;
    var geometry = new THREE.LatheBufferGeometry(points, this.data.vertices);
    var segment = new THREE.Mesh(geometry, material);
    return segment;
  },

  clearSegments: function () {
    this.el.object3D.remove(this.el.object3D.children[0]);
  },

  tick: function (time, delta) {
    if (!this.animate) {
      return;
    }
    if (Math.abs(this.data.twist - this.currentTwist) < 0.001) {
      this.animate = false;
    }

    this.currentTwist += (this.data.twist - this.currentTwist) * delta * 0.001;

    var child = this.el.object3D.children[0];
    while (child) {
      child.rotation.y = this.currentTwist;
      child = child.children[0];
    }
  }
});

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(151);

function requireAll(req) {
  req.keys().forEach(req);
}

__webpack_require__(138);
__webpack_require__(150);
__webpack_require__(139);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(142);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(146);
__webpack_require__(148);
__webpack_require__(147);
__webpack_require__(149);
__webpack_require__(145);

requireAll(__webpack_require__(152));
requireAll(__webpack_require__(153));

/***/ }),
/* 200 */
/***/ (function(module, exports) {

module.exports = function SoundPool(src, volume) {
  var currSound = 0;
  var i;
  var pool = [];
  var sound;

  sound = new Audio(src);
  sound.volume = volume;
  pool.push(sound);

  return {
    play: function () {
      // Dynamic size pool.
      if (pool[currSound].currentTime !== 0 || !pool[currSound].ended) {
        sound = new Audio(src);
        sound.volume = volume;
        pool.push(sound);
        currSound++;
      }

      if (pool[currSound].currentTime === 0 || pool[currSound].ended) {
        pool[currSound].play();
      }
      currSound = (currSound + 1) % pool.length;
    }
  };
};

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(55);

const challengeDataStore = {};
const hasInitialChallenge = !!AFRAME.utils.getUrlParameter('challenge');
const SEARCH_PER_PAGE = 6;

/**
 * State handler.
 *
 * 1. `handlers` is an object of events that when emitted to the scene will run the handler.
 *
 * 2. The handler function modifies the state.
 *
 * 3. Entities and components that are `bind`ed automatically update:
 *    `bind__<componentName>="<propertyName>: some.item.in.state"`
 */
AFRAME.registerState({
  initialState: {
    activeHand: localStorage.getItem('hand') || 'right',
    challenge: {
      author: '',
      difficulty: '',
      id: AFRAME.utils.getUrlParameter('challenge'),
      image: '',
      isLoading: false,
      songName: '',
      songSubName: ''
    },
    inVR: false,
    menu: {
      active: true,
      playButtonText: 'Play'
    },
    menuDifficulties: [],
    menuSelectedChallenge: {
      author: '',
      difficulty: '',
      downloads: '',
      downloadsText: '',
      id: '',
      image: '',
      songName: '',
      songSubName: ''
    },
    score: {
      maxStreak: 0,
      score: 0,
      streak: 0
    },
    search: {
      active: true,
      page: 0,
      hasNext: false,
      hasPrev: false,
      results: []
    },
    searchResultsPage: []
  },

  handlers: {
    /**
     * Swap left-handed or right-handed mode.
     */
    activehandswap: state => {
      state.activeHand = state.activeHand === 'right' ? 'left' : 'right';
      localStorage.setItem('activeHand', state.activeHand);
    },

    beatloaderfinish: state => {
      state.challenge.isLoading = false;
    },

    beatloaderstart: state => {
      state.challenge.isLoading = true;
    },

    /**
     * Song clicked from menu.
     */
    menuchallengeselect: (state, id) => {
      // Copy from challenge store populated from search results.
      let challengeData = challengeDataStore[id];
      Object.assign(state.menuSelectedChallenge, challengeData);

      // Populate difficulty options.
      state.menuDifficulties.length = 0;
      for (let i = 0; i < challengeData.difficulties.length; i++) {
        state.menuDifficulties.unshift(challengeData.difficulties[i]);
      }
      state.menuDifficulties.sort(difficultyComparator);
      // Default to easiest difficulty.
      state.menuSelectedChallenge.difficulty = state.menuDifficulties[0];

      state.menuSelectedChallenge.image = utils.getS3FileUrl(id, 'image.jpg');
      state.menuSelectedChallenge.downloadsText = `${challengeData.downloads} Plays`;
    },

    menudifficultyselect: (state, difficulty) => {
      state.menuSelectedChallenge.difficulty = difficulty;
    },

    pausegame: state => {
      state.menu.active = true;
    },

    /**
     * Start challenge.
     * Transfer staged challenge to the active challenge.
     */
    playbuttonclick: state => {
      // Reset score.
      state.score.maxStreak = 0;
      state.score.score = 0;
      state.score.streak = 0;

      // Set challenge. `beat-loader` is listening.
      Object.assign(state.challenge, state.menuSelectedChallenge);

      // Reset menu.
      state.menu.active = false;
      state.menuSelectedChallenge.id = '';
    },

    searchprevpage: function (state) {
      if (state.search.page === 0) {
        return;
      }
      state.search.page--;
      computeSearchPagination(state);
    },

    searchnextpage: function (state) {
      if (state.search.page > Math.floor(state.search.results.length / SEARCH_PER_PAGE)) {
        return;
      }
      state.search.page++;
      computeSearchPagination(state);
    },

    /**
     * Update search results. Will automatically render using `bind-for` (menu.html).
     */
    searchresults: (state, payload) => {
      var i;
      state.search.page = 0;
      state.search.results = payload.results;
      for (i = 0; i < payload.results.length; i++) {
        let result = payload.results[i];
        result.songSubName = result.songSubName || 'Unknown Artist';
        result.shortSongName = truncate(result.songName, 24).toUpperCase();
        result.shortSongSubName = truncate(result.songSubName, 32);
        challengeDataStore[result.id] = result;
      }
      computeSearchPagination(state);
    },

    'enter-vr': state => {
      state.inVR = true;
    },

    'exit-vr': state => {
      state.inVR = false;
    }
  },

  /**
   * Post-process the state after each action.
   */
  computeState: state => {
    state.leftRaycasterActive = state.menu.active && state.activeHand === 'left' && state.inVR;
    state.rightRaycasterActive = state.menu.active && state.activeHand === 'right' && state.inVR;
  }
});

function computeSearchPagination(state) {
  let numPages = Math.ceil(state.search.results.length / SEARCH_PER_PAGE);
  state.search.hasPrev = state.search.page > 0;
  state.search.hasNext = state.search.page < numPages - 1;

  state.searchResultsPage.length = 0;
  for (i = state.search.page * SEARCH_PER_PAGE; i < state.search.page * SEARCH_PER_PAGE + SEARCH_PER_PAGE; i++) {
    if (!state.search.results[i]) {
      break;
    }
    state.searchResultsPage.push(state.search.results[i]);
  }
}

function truncate(str, length) {
  if (!str) {
    return '';
  }
  if (str.length >= length) {
    return str.substring(0, length - 3) + '...';
  }
  return str;
}

const DIFFICULTIES = ['Easy', 'Normal', 'Hard', 'Expert', 'ExpertPlus'];
function difficultyComparator(a, b) {
  const aIndex = DIFFICULTIES.indexOf(a);
  const bIndex = DIFFICULTIES.indexOf(b);
  if (aIndex < bIndex) {
    return -1;
  }
  if (aIndex > bIndex) {
    return 1;
  }
  return 0;
}

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(209);
module.exports = __webpack_require__(19).RegExp.escape;


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(60);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(26);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(36);
var gOPS = __webpack_require__(64);
var pIE = __webpack_require__(50);
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
/* 207 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 208 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(207)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(103) });

__webpack_require__(29)('copyWithin');


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(22)(4);

$export($export.P + $export.F * !__webpack_require__(21)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(72) });

__webpack_require__(29)('fill');


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(22)(2);

$export($export.P + $export.F * !__webpack_require__(21)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(22)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(29)(KEY);


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(22)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(29)(KEY);


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(22)(0);
var STRICT = __webpack_require__(21)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(20);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(114);
var isArrayIter = __webpack_require__(80);
var toLength = __webpack_require__(8);
var createProperty = __webpack_require__(74);
var getIterFn = __webpack_require__(96);

$export($export.S + $export.F * !__webpack_require__(62)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(56)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(60) });


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(17);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(49) != Object || !__webpack_require__(21)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(17);
var toInteger = __webpack_require__(25);
var toLength = __webpack_require__(8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(22)(1);

$export($export.P + $export.F * !__webpack_require__(21)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(74);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(105);

$export($export.P + $export.F * !__webpack_require__(21)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(105);

$export($export.P + $export.F * !__webpack_require__(21)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(78);
var cof = __webpack_require__(18);
var toAbsoluteIndex = __webpack_require__(40);
var toLength = __webpack_require__(8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(22)(3);

$export($export.P + $export.F * !__webpack_require__(21)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(21)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39)('Array');


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(204);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(26);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(11)(proto, TO_PRIMITIVE, __webpack_require__(205));


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(12)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(106) });


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(16);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(117);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(84);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(83);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(116) });


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(117) });


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(84) });


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(83);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(83);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(14);
var cof = __webpack_require__(18);
var inheritIfRequired = __webpack_require__(79);
var toPrimitive = __webpack_require__(26);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(35).f;
var gOPD = __webpack_require__(15).f;
var dP = __webpack_require__(7).f;
var $trim = __webpack_require__(45).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(34)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(12)(global, NUMBER, $Number);
}


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(113) });


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(113);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(125);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(126);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(25);
var aNumberValue = __webpack_require__(102);
var repeat = __webpack_require__(91);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(102);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(119) });


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(34) });


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(120) });


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(31).onFreeze;

__webpack_require__(24)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(17);
var $getOwnPropertyDescriptor = __webpack_require__(15).f;

__webpack_require__(24)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(24)('getOwnPropertyNames', function () {
  return __webpack_require__(121).f;
});


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(16);

__webpack_require__(24)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(24)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(24)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(24)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(208) });


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(36);

__webpack_require__(24)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(31).onFreeze;

__webpack_require__(24)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(31).onFreeze;

__webpack_require__(24)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(87).set });


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(48);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(12)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(125);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(126);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var global = __webpack_require__(2);
var ctx = __webpack_require__(20);
var classof = __webpack_require__(48);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(10);
var anInstance = __webpack_require__(32);
var forOf = __webpack_require__(33);
var speciesConstructor = __webpack_require__(68);
var task = __webpack_require__(93).set;
var microtask = __webpack_require__(85)();
var newPromiseCapabilityModule = __webpack_require__(86);
var perform = __webpack_require__(127);
var userAgent = __webpack_require__(70);
var promiseResolve = __webpack_require__(128);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(38)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(44)($Promise, PROMISE);
__webpack_require__(39)(PROMISE);
Wrapper = __webpack_require__(19)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(62)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(34);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(106);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(7);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(26);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(15).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(81)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(15);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(16);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(15);
var getPrototypeOf = __webpack_require__(16);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(124) });


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(87);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(7);
var gOPD = __webpack_require__(15);
var getPrototypeOf = __webpack_require__(16);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(37);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(79);
var dP = __webpack_require__(7).f;
var gOPN = __webpack_require__(35).f;
var isRegExp = __webpack_require__(61);
var $flags = __webpack_require__(59);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(12)(global, 'RegExp', $RegExp);
}

__webpack_require__(39)('RegExp');


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(58)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(58)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(58)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(58)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(61);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(133);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(59);
var DESCRIPTORS = __webpack_require__(6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(12)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(13)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(13)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(13)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(13)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(89)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(90);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(77)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(13)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(13)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(13)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(40);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(90);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(77)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(13)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(89)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(82)(String, 'String', function (iterated) {
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
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(13)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(17);
var toLength = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(91)
});


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(13)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(90);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(77)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(13)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(13)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(13)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(45)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(14);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var META = __webpack_require__(31).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(67);
var setToStringTag = __webpack_require__(44);
var uid = __webpack_require__(41);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(131);
var wksDefine = __webpack_require__(95);
var enumKeys = __webpack_require__(206);
var isArray = __webpack_require__(60);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(26);
var createDesc = __webpack_require__(37);
var _create = __webpack_require__(34);
var gOPNExt = __webpack_require__(121);
var $GOPD = __webpack_require__(15);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(36);
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
  __webpack_require__(35).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(50).f = $propertyIsEnumerable;
  __webpack_require__(64).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(30)) {
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(69);
var buffer = __webpack_require__(94);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(40);
var toLength = __webpack_require__(8);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(68);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(39)(ARRAY_BUFFER);


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(69).ABV, {
  DataView: __webpack_require__(94).DataView
});


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(109);
var validate = __webpack_require__(46);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(57)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(110);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var aFunction = __webpack_require__(10);
var arraySpeciesCreate = __webpack_require__(73);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(29)('flatMap');


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(110);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var toInteger = __webpack_require__(25);
var arraySpeciesCreate = __webpack_require__(73);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(29)('flatten');


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(56)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(29)('includes');


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(85)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(18)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(18);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(65)('Map');


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(66)('Map');


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(108)('Map') });


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(118);
var fround = __webpack_require__(116);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(118) });


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(63), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(63), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(123)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(124);
var toIObject = __webpack_require__(17);
var gOPD = __webpack_require__(15);
var createProperty = __webpack_require__(74);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(26);
var getPrototypeOf = __webpack_require__(16);
var getOwnPropertyDescriptor = __webpack_require__(15).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(63), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(26);
var getPrototypeOf = __webpack_require__(16);
var getOwnPropertyDescriptor = __webpack_require__(15).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(63), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(123)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(19);
var microtask = __webpack_require__(85)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(32);
var redefineAll = __webpack_require__(38);
var hide = __webpack_require__(11);
var forOf = __webpack_require__(33);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(39)('Observable');


/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(19);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(68);
var promiseResolve = __webpack_require__(128);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(86);
var perform = __webpack_require__(127);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(134);
var from = __webpack_require__(104);
var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(16);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(16);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(16);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(65)('Set');


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(66)('Set');


/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(108)('Set') });


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(89)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var toLength = __webpack_require__(8);
var isRegExp = __webpack_require__(61);
var getFlags = __webpack_require__(59);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(81)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(129);
var userAgent = __webpack_require__(70);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(129);
var userAgent = __webpack_require__(70);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(45)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(45)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95)('asyncIterator');


/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95)('observable');


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(65)('WeakMap');


/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(66)('WeakMap');


/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(65)('WeakSet');


/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(66)('WeakSet');


/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(97);
var getKeys = __webpack_require__(36);
var redefine = __webpack_require__(12);
var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(43);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(93);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(70);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(329);
__webpack_require__(268);
__webpack_require__(270);
__webpack_require__(269);
__webpack_require__(272);
__webpack_require__(274);
__webpack_require__(279);
__webpack_require__(273);
__webpack_require__(271);
__webpack_require__(281);
__webpack_require__(280);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(275);
__webpack_require__(267);
__webpack_require__(278);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(235);
__webpack_require__(237);
__webpack_require__(236);
__webpack_require__(285);
__webpack_require__(284);
__webpack_require__(255);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(316);
__webpack_require__(321);
__webpack_require__(328);
__webpack_require__(319);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(317);
__webpack_require__(322);
__webpack_require__(324);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(318);
__webpack_require__(320);
__webpack_require__(323);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(230);
__webpack_require__(232);
__webpack_require__(231);
__webpack_require__(234);
__webpack_require__(233);
__webpack_require__(219);
__webpack_require__(217);
__webpack_require__(223);
__webpack_require__(220);
__webpack_require__(226);
__webpack_require__(228);
__webpack_require__(216);
__webpack_require__(222);
__webpack_require__(213);
__webpack_require__(227);
__webpack_require__(211);
__webpack_require__(225);
__webpack_require__(224);
__webpack_require__(218);
__webpack_require__(221);
__webpack_require__(210);
__webpack_require__(212);
__webpack_require__(215);
__webpack_require__(214);
__webpack_require__(229);
__webpack_require__(97);
__webpack_require__(301);
__webpack_require__(306);
__webpack_require__(133);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(286);
__webpack_require__(132);
__webpack_require__(134);
__webpack_require__(135);
__webpack_require__(341);
__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(336);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(334);
__webpack_require__(337);
__webpack_require__(335);
__webpack_require__(338);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(294);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(300);
__webpack_require__(299);
__webpack_require__(344);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(385);
__webpack_require__(388);
__webpack_require__(387);
__webpack_require__(389);
__webpack_require__(390);
__webpack_require__(386);
__webpack_require__(391);
__webpack_require__(392);
__webpack_require__(366);
__webpack_require__(369);
__webpack_require__(365);
__webpack_require__(363);
__webpack_require__(364);
__webpack_require__(367);
__webpack_require__(368);
__webpack_require__(350);
__webpack_require__(384);
__webpack_require__(349);
__webpack_require__(383);
__webpack_require__(395);
__webpack_require__(397);
__webpack_require__(348);
__webpack_require__(382);
__webpack_require__(394);
__webpack_require__(396);
__webpack_require__(347);
__webpack_require__(393);
__webpack_require__(346);
__webpack_require__(351);
__webpack_require__(352);
__webpack_require__(353);
__webpack_require__(354);
__webpack_require__(355);
__webpack_require__(357);
__webpack_require__(356);
__webpack_require__(358);
__webpack_require__(359);
__webpack_require__(360);
__webpack_require__(362);
__webpack_require__(361);
__webpack_require__(371);
__webpack_require__(372);
__webpack_require__(373);
__webpack_require__(374);
__webpack_require__(376);
__webpack_require__(375);
__webpack_require__(378);
__webpack_require__(377);
__webpack_require__(379);
__webpack_require__(380);
__webpack_require__(381);
__webpack_require__(345);
__webpack_require__(370);
__webpack_require__(400);
__webpack_require__(399);
__webpack_require__(398);
module.exports = __webpack_require__(19);


/***/ }),
/* 402 */
/***/ (function(module, exports) {


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
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    return promise.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(137), __webpack_require__(52)))

/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = __webpack_require__(406);
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$applicationCache: true,
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 408 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ })
/******/ ]);