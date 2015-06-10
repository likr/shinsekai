(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.shinsekai = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = window.angular;
module.exports = exports["default"];

},{"babel-runtime/core-js/object/define-property":3}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":7}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":8}],4:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],5:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":3}],6:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],7:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
require('../modules/core.iter-helpers');
module.exports = require('../modules/$').core.getIterator;
},{"../modules/$":15,"../modules/core.iter-helpers":22,"../modules/es6.string.iterator":24,"../modules/web.dom.iterable":25}],8:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":15}],9:[function(require,module,exports){
var $ = require('./$');
function assert(condition, msg1, msg2){
  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
}
assert.def = $.assertDefined;
assert.fn = function(it){
  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
  return it;
};
assert.obj = function(it){
  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
assert.inst = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
module.exports = assert;
},{"./$":15}],10:[function(require,module,exports){
var $        = require('./$')
  , TAG      = require('./$.wks')('toStringTag')
  , toString = {}.toString;
function cof(it){
  return toString.call(it).slice(8, -1);
}
cof.classof = function(it){
  var O, T;
  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
};
cof.set = function(it, tag, stat){
  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
};
module.exports = cof;
},{"./$":15,"./$.wks":21}],11:[function(require,module,exports){
var $          = require('./$')
  , global     = $.g
  , core       = $.core
  , isFunction = $.isFunction;
function ctx(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
}
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
function $def(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {}).prototype
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    if(isGlobal && !isFunction(target[key]))exp = source[key];
    // bind timers to global for call from export context
    else if(type & $def.B && own)exp = ctx(out, global);
    // wrap global constructors for prevent change them in library
    else if(type & $def.W && target[key] == out)!function(C){
      exp = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      exp.prototype = C.prototype;
    }(out);
    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
    // export
    exports[key] = exp;
    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
  }
}
module.exports = $def;
},{"./$":15}],12:[function(require,module,exports){
module.exports = function($){
  $.FW   = false;
  $.path = $.core;
  return $;
};
},{}],13:[function(require,module,exports){
var $def            = require('./$.def')
  , $redef          = require('./$.redef')
  , $               = require('./$')
  , cof             = require('./$.cof')
  , $iter           = require('./$.iter')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , FF_ITERATOR     = '@@iterator'
  , KEYS            = 'keys'
  , VALUES          = 'values'
  , Iterators       = $iter.Iterators;
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  $iter.create(Constructor, NAME, next);
  function createMethod(kind){
    function $$(that){
      return new Constructor(that, kind);
    }
    switch(kind){
      case KEYS: return function keys(){ return $$(this); };
      case VALUES: return function values(){ return $$(this); };
    } return function entries(){ return $$(this); };
  }
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || createMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = $.getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    cof.set(IteratorPrototype, TAG, true);
    // FF fix
    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
  }
  // Define iterator
  if($.FW)$iter.set(proto, _default);
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = $.that;
  if(DEFAULT){
    methods = {
      keys:    IS_SET            ? _default : createMethod(KEYS),
      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
      entries: DEFAULT != VALUES ? _default : createMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$redef(proto, key, methods[key]);
    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
  }
};
},{"./$":15,"./$.cof":10,"./$.def":11,"./$.iter":14,"./$.redef":16,"./$.wks":21}],14:[function(require,module,exports){
'use strict';
var $                 = require('./$')
  , cof               = require('./$.cof')
  , assertObject      = require('./$.assert').obj
  , SYMBOL_ITERATOR   = require('./$.wks')('iterator')
  , FF_ITERATOR       = '@@iterator'
  , Iterators         = require('./$.shared')('iterators')
  , IteratorPrototype = {};
// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
setIterator(IteratorPrototype, $.that);
function setIterator(O, value){
  $.hide(O, SYMBOL_ITERATOR, value);
  // Add iterator for FF iterator protocol
  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
}

module.exports = {
  // Safari has buggy iterators w/o `next`
  BUGGY: 'keys' in [] && !('next' in [].keys()),
  Iterators: Iterators,
  step: function(done, value){
    return {value: value, done: !!done};
  },
  is: function(it){
    var O      = Object(it)
      , Symbol = $.g.Symbol
      , SYM    = Symbol && Symbol.iterator || FF_ITERATOR;
    return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
  },
  get: function(it){
    var Symbol  = $.g.Symbol
      , ext     = it[Symbol && Symbol.iterator || FF_ITERATOR]
      , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
    return assertObject(getIter.call(it));
  },
  set: setIterator,
  create: function(Constructor, NAME, next, proto){
    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
    cof.set(Constructor, NAME + ' Iterator');
  }
};
},{"./$":15,"./$.assert":9,"./$.cof":10,"./$.shared":17,"./$.wks":21}],15:[function(require,module,exports){
'use strict';
var global = typeof self != 'undefined' ? self : Function('return this')()
  , core   = {}
  , defineProperty = Object.defineProperty
  , hasOwnProperty = {}.hasOwnProperty
  , ceil  = Math.ceil
  , floor = Math.floor
  , max   = Math.max
  , min   = Math.min;
// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
var DESC = !!function(){
  try {
    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
var hide = createDefiner(1);
// 7.1.4 ToInteger
function toInteger(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
}
function desc(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
}
function simpleSet(object, key, value){
  object[key] = value;
  return object;
}
function createDefiner(bitmap){
  return DESC ? function(object, key, value){
    return $.setDesc(object, key, desc(bitmap, value));
  } : simpleSet;
}

function isObject(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
}
function isFunction(it){
  return typeof it == 'function';
}
function assertDefined(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
}

var $ = module.exports = require('./$.fw')({
  g: global,
  core: core,
  html: global.document && document.documentElement,
  // http://jsperf.com/core-js-isobject
  isObject:   isObject,
  isFunction: isFunction,
  that: function(){
    return this;
  },
  // 7.1.4 ToInteger
  toInteger: toInteger,
  // 7.1.15 ToLength
  toLength: function(it){
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  },
  toIndex: function(index, length){
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  },
  has: function(it, key){
    return hasOwnProperty.call(it, key);
  },
  create:     Object.create,
  getProto:   Object.getPrototypeOf,
  DESC:       DESC,
  desc:       desc,
  getDesc:    Object.getOwnPropertyDescriptor,
  setDesc:    defineProperty,
  setDescs:   Object.defineProperties,
  getKeys:    Object.keys,
  getNames:   Object.getOwnPropertyNames,
  getSymbols: Object.getOwnPropertySymbols,
  assertDefined: assertDefined,
  // Dummy, fix for not array-like ES3 string in es5 module
  ES5Object: Object,
  toObject: function(it){
    return $.ES5Object(assertDefined(it));
  },
  hide: hide,
  def: createDefiner(0),
  set: global.Symbol ? simpleSet : hide,
  each: [].forEach
});
/* eslint-disable no-undef */
if(typeof __e != 'undefined')__e = core;
if(typeof __g != 'undefined')__g = global;
},{"./$.fw":12}],16:[function(require,module,exports){
module.exports = require('./$').hide;
},{"./$":15}],17:[function(require,module,exports){
var $      = require('./$')
  , SHARED = '__core-js_shared__'
  , store  = $.g[SHARED] || $.hide($.g, SHARED, {})[SHARED];
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$":15}],18:[function(require,module,exports){
// true  -> String#at
// false -> String#codePointAt
var $ = require('./$');
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String($.assertDefined(that))
      , i = $.toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l
      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$":15}],19:[function(require,module,exports){
var sid = 0;
function uid(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
}
uid.safe = require('./$').g.Symbol || uid;
module.exports = uid;
},{"./$":15}],20:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var $           = require('./$')
  , UNSCOPABLES = require('./$.wks')('unscopables');
if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
module.exports = function(key){
  if($.FW)[][UNSCOPABLES][key] = true;
};
},{"./$":15,"./$.wks":21}],21:[function(require,module,exports){
var global = require('./$').g
  , store  = require('./$.shared')('wks');
module.exports = function(name){
  return store[name] || (store[name] =
    global.Symbol && global.Symbol[name] || require('./$.uid').safe('Symbol.' + name));
};
},{"./$":15,"./$.shared":17,"./$.uid":19}],22:[function(require,module,exports){
var core  = require('./$').core
  , $iter = require('./$.iter');
core.isIterable  = $iter.is;
core.getIterator = $iter.get;
},{"./$":15,"./$.iter":14}],23:[function(require,module,exports){
var $          = require('./$')
  , setUnscope = require('./$.unscope')
  , ITER       = require('./$.uid').safe('iter')
  , $iter      = require('./$.iter')
  , step       = $iter.step
  , Iterators  = $iter.Iterators;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , kind  = iter.k
    , index = iter.i++;
  if(!O || index >= O.length){
    iter.o = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

setUnscope('keys');
setUnscope('values');
setUnscope('entries');
},{"./$":15,"./$.iter":14,"./$.iter-define":13,"./$.uid":19,"./$.unscope":20}],24:[function(require,module,exports){
var set   = require('./$').set
  , $at   = require('./$.string-at')(true)
  , ITER  = require('./$.uid').safe('iter')
  , $iter = require('./$.iter')
  , step  = $iter.step;

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  set(this, ITER, {o: String(iterated), i: 0});
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , index = iter.i
    , point;
  if(index >= O.length)return step(1);
  point = $at(O, index);
  iter.i += point.length;
  return step(0, point);
});
},{"./$":15,"./$.iter":14,"./$.iter-define":13,"./$.string-at":18,"./$.uid":19}],25:[function(require,module,exports){
require('./es6.array.iterator');
var $           = require('./$')
  , Iterators   = require('./$.iter').Iterators
  , ITERATOR    = require('./$.wks')('iterator')
  , ArrayValues = Iterators.Array
  , NL          = $.g.NodeList
  , HTC         = $.g.HTMLCollection
  , NLProto     = NL && NL.prototype
  , HTCProto    = HTC && HTC.prototype;
if($.FW){
  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
}
Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;
},{"./$":15,"./$.iter":14,"./$.wks":21,"./es6.array.iterator":23}],26:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var template = '\n<line\n    stroke="#000"\n    ss-x1="axis.orient === \'left\' ? 0 : axis.scale.yMin"\n    ss-y1="axis.orient === \'left\' ? axis.scale.yMin : 0"\n    ss-x2="axis.orient === \'left\' ? 0 : axis.scale.yMax"\n    ss-y2="axis.orient === \'left\' ? axis.scale.yMax : 0"/>\n<g\n    ss-transform="axis.transform(tick.y)"\n    ss-dur="axis.duration"\n    ss-delay="axis.delay"\n    ng-repeat="tick in axis.values track by $index">\n  <line\n      y1="0"\n      x2="0"\n      stroke="#000"\n      ss-x1="axis.orient === \'left\' ? -10 : 0"\n      ss-y2="axis.orient === \'left\' ? 0 : 10"/>\n  <text\n      ng-attr-text-anchor="{{axis.orient === \'left\' ? \'end\' : \'middle\'}}"\n      ss-x="axis.orient === \'left\' ? -10 : 0"\n      ss-y="axis.orient === \'left\' ? 0 : 30">\n    {{axis.format(tick.x)}}\n  </text>\n</g>\n';

_angular2['default'].module('shinsekai.ss-axis', []).directive('ssAxis', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',
    template: template,
    scope: {},
    bindToController: {
      orient: '=ssAxis',
      ticks: '=ssTicks',
      scale: '=ssScale',
      format: '=ssFormat',
      delay: '=ssDelay',
      duration: '=ssDur'
    },
    controllerAs: 'axis',
    controller: (function () {
      function AxisController() {
        var _this = this;

        _classCallCheck(this, AxisController);

        if (this.format == null) {
          this.format = function (x) {
            return x;
          };
        }

        $rootScope.$watch(function () {
          return _this.ticks;
        }, function () {
          _this.values = new Array(_this.ticks);
          for (var i = 0; i <= _this.ticks; ++i) {
            var x = (_this.scale.xMax - _this.scale.xMin) * i / _this.ticks + _this.scale.xMin,
                y = _this.scale.scale(x);
            _this.values[i] = { x: x, y: y };
          }
        });
      }

      _createClass(AxisController, [{
        key: 'transform',
        value: function transform(y) {
          return this.orient === 'left' ? 'translate(0,' + y + ')' : 'translate(' + y + ',0)';
        }
      }]);

      return AxisController;
    })()
  };
}]);

exports['default'] = 'shinsekai.ss-axis';
module.exports = exports['default'];

},{"angular":1,"babel-runtime/core-js/object/define-property":3,"babel-runtime/helpers/class-call-check":4,"babel-runtime/helpers/create-class":5,"babel-runtime/helpers/interop-require-default":6}],27:[function(require,module,exports){
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _svg = require('./svg');

var _svg2 = _interopRequireDefault(_svg);

var _transform = require('./transform');

var _transform2 = _interopRequireDefault(_transform);

var _axis = require('./axis');

var _axis2 = _interopRequireDefault(_axis);

var _logo = require('./logo');

var _logo2 = _interopRequireDefault(_logo);

_angular2['default'].module('shinsekai.directives', [_svg2['default'], _transform2['default'], _axis2['default'], _logo2['default']]);

exports['default'] = 'shinsekai.directives';
module.exports = exports['default'];

},{"./axis":26,"./logo":29,"./svg":30,"./transform":31,"angular":1,"babel-runtime/core-js/object/define-property":3,"babel-runtime/helpers/interop-require-default":6}],28:[function(require,module,exports){
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var insertDummy = function insertDummy(svg, $window) {
  // insert dummy animate element for firefox implementation
  var dummy = $window.document.getElementById('ss-dummy-animate');
  if (dummy == null) {
    var animate = $window.document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('id', 'ss-dummy-animate');
    svg.appendChild(animate);
  }
};

exports['default'] = insertDummy;
module.exports = exports['default'];

},{"babel-runtime/core-js/object/define-property":3}],29:[function(require,module,exports){
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var template = '\n<g id="Layer_1">\n  <g>\n    <path fill="#F3B534" d="M14.1,300.069v-4.341c2.601,1.14,4.826,1.709,6.675,1.709c1.295,0,2.315-0.302,3.06-0.906\n      c0.745-0.604,1.118-1.424,1.118-2.461c0-0.82-0.234-1.513-0.702-2.076c-0.468-0.564-1.355-1.233-2.661-2.008l-1.616-0.94\n      c-2.165-1.276-3.694-2.498-4.586-3.666c-0.892-1.167-1.338-2.532-1.338-4.093c0-2.085,0.731-3.76,2.195-5.024\n      c1.463-1.265,3.397-1.897,5.802-1.897c1.926,0,4.097,0.291,6.512,0.872v4.05c-2.47-0.968-4.423-1.453-5.859-1.453\n      c-1.11,0-1.999,0.259-2.668,0.777c-0.669,0.519-1.003,1.2-1.003,2.042c0,0.695,0.234,1.305,0.702,1.829\n      c0.468,0.524,1.349,1.168,2.644,1.931l1.73,1.008c2.328,1.367,3.933,2.626,4.814,3.777c0.881,1.151,1.322,2.552,1.322,4.204\n      c0,2.347-0.833,4.187-2.497,5.52c-1.665,1.333-3.961,2-6.888,2C18.921,300.924,16.668,300.639,14.1,300.069z"/>\n    <path fill="#F3B534" d="M42.372,300.291v-26.985h4.831v11.758c1.578-2.643,3.612-3.965,6.104-3.965c1.6,0,2.862,0.53,3.787,1.589\n      s1.387,2.507,1.387,4.341v13.262H53.65v-12.014c0-2.13-0.675-3.196-2.023-3.196c-1.534,0-3.009,1.134-4.423,3.401v11.809H42.372z"\n      />\n    <path fill="#F3B534" d="M72.145,278.365v-4.221h4.831v4.221H72.145z M72.145,300.291v-18.765h4.831v18.765H72.145z"/>\n    <path fill="#F3B534" d="M90.836,300.291v-18.765h4.831v3.538c1.578-2.643,3.612-3.965,6.104-3.965c1.6,0,2.862,0.53,3.787,1.589\n      s1.387,2.507,1.387,4.341v13.262h-4.831v-12.014c0-2.13-0.675-3.196-2.023-3.196c-1.534,0-3.009,1.134-4.423,3.401v11.809H90.836z\n      "/>\n    <path fill="#F3B534" d="M120.136,299.693v-3.708c2.394,1.048,4.439,1.572,6.137,1.572c1.98,0,2.97-0.706,2.97-2.119\n      c0-0.911-0.816-1.709-2.448-2.393l-1.632-0.684c-1.773-0.752-3.041-1.561-3.803-2.427c-0.762-0.866-1.143-1.937-1.143-3.213\n      c0-1.777,0.647-3.159,1.942-4.145c1.295-0.985,3.106-1.478,5.435-1.478c1.458,0,3.193,0.222,5.206,0.667v3.555\n      c-1.937-0.706-3.542-1.06-4.814-1.06c-2.002,0-3.003,0.649-3.003,1.948c0,0.854,0.74,1.578,2.219,2.17l1.404,0.564\n      c2.1,0.832,3.561,1.675,4.382,2.529c0.822,0.854,1.232,1.954,1.232,3.298c0,1.766-0.699,3.199-2.097,4.298\n      c-1.398,1.1-3.218,1.649-5.459,1.649C124.51,300.719,122.333,300.377,120.136,299.693z"/>\n    <path fill="#F3B534" d="M161.921,299.659c-2.296,0.706-4.472,1.06-6.528,1.06c-2.993,0-5.354-0.889-7.083-2.666\n      s-2.595-4.204-2.595-7.28c0-2.905,0.792-5.244,2.375-7.015s3.675-2.658,6.275-2.658c2.622,0,4.537,0.866,5.745,2.598\n      c1.208,1.732,1.812,4.472,1.812,8.22h-11.115c0.327,3.578,2.204,5.366,5.631,5.366c1.621,0,3.449-0.393,5.484-1.179V299.659z\n      M150.741,289.063h6.431c0-3.201-0.985-4.802-2.954-4.802C152.215,284.261,151.056,285.862,150.741,289.063z"/>\n    <path fill="#F3B534" d="M174.737,300.291v-26.985h4.831v16.97h0.31l6.382-8.75h4.015l-5.892,8.032l7.736,10.732h-5.875\n      l-6.365-9.382h-0.31v9.382H174.737z"/>\n    <path fill="#F3B534" d="M212.49,298.275c-1.61,1.629-3.335,2.444-5.173,2.444c-1.567,0-2.84-0.501-3.819-1.504\n      c-0.979-1.002-1.469-2.301-1.469-3.896c0-2.073,0.792-3.671,2.375-4.793s3.849-1.684,6.798-1.684h1.289v-1.709\n      c0-1.948-1.061-2.922-3.183-2.922c-1.882,0-3.786,0.559-5.712,1.675v-3.486c2.187-0.866,4.352-1.299,6.496-1.299\n      c4.689,0,7.034,1.954,7.034,5.862v8.306c0,1.47,0.451,2.205,1.354,2.205c0.164,0,0.375-0.022,0.637-0.068l0.114,2.837\n      c-1.023,0.319-1.926,0.479-2.709,0.479c-1.98,0-3.253-0.814-3.819-2.444H212.49z M212.49,295.557v-3.811h-1.142\n      c-3.123,0-4.684,1.025-4.684,3.076c0,0.695,0.226,1.279,0.677,1.752c0.451,0.473,1.009,0.709,1.673,0.709\n      C210.145,297.284,211.304,296.708,212.49,295.557z"/>\n    <path fill="#F3B534" d="M231.182,278.365v-4.221h4.831v4.221H231.182z M231.182,300.291v-18.765h4.831v18.765H231.182z"/>\n  </g>\n  <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="125.0101" y1="257.9332" x2="125.0101" y2="9.9778">\n    <stop  offset="0" style="stop-color:#FBD071"/>\n    <stop  offset="0.2618" style="stop-color:#FBA516"/>\n  </linearGradient>\n  <polygon fill="url(#SVGID_1_)" points="159.278,199.395 138.1,199.395 133.1,78.513 133.1,52.334 138.1,26.158 130.01,9.978\n    120.01,9.978 111.92,26.158 116.92,52.334 116.92,78.513 111.92,199.395 90.742,199.395 103.831,215.575 90.742,257.933\n    100.742,257.933 116.92,225.575 133.1,225.575 149.278,257.933 159.278,257.933 146.189,215.575   "/>\n  <path fill="#FBA516" d="M103.1,69.576l10-7.177v2.241l-8.07,5.759v0.114l8.07,5.759v2.242l-10-7.178V69.576z"/>\n  <path fill="#FBA516" d="M146.92,71.335l-10,7.178v-2.242l8.07-5.759v-0.114l-8.07-5.759v-2.241l10,7.177V71.335z"/>\n  <g>\n    <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="29.1186" y1="215.5735" x2="29.1186" y2="173.2155">\n      <stop  offset="0" style="stop-color:#9348FA"/>\n      <stop  offset="0.0602" style="stop-color:#A04EF6"/>\n      <stop  offset="0.2389" style="stop-color:#C25EEA"/>\n      <stop  offset="0.4213" style="stop-color:#DD6BE1"/>\n      <stop  offset="0.6068" style="stop-color:#F074DB"/>\n      <stop  offset="0.7972" style="stop-color:#FB79D7"/>\n      <stop  offset="1" style="stop-color:#FF7BD6"/>\n    </linearGradient>\n    <circle fill="url(#SVGID_2_)" cx="29.119" cy="194.395" r="21.179"/>\n    <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="45.6611" y1="176.8809" x2="45.6611" y2="199.3934">\n      <stop  offset="0" style="stop-color:#E93400"/>\n      <stop  offset="1" style="stop-color:#F4AC0B"/>\n    </linearGradient>\n    <path fill="url(#SVGID_3_)" d="M41.025,176.881v22.513h8.655c0.389-1.606,0.618-3.274,0.618-4.999\n      C50.298,187.113,46.621,180.693,41.025,176.881z"/>\n    <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="49.1146" y1="130.8607" x2="49.1146" y2="199.3934">\n      <stop  offset="0" style="stop-color:#FDBE57"/>\n      <stop  offset="0.3618" style="stop-color:#E3242B"/>\n      <stop  offset="1" style="stop-color:#751056"/>\n    </linearGradient>\n    <path fill="url(#SVGID_4_)" d="M41.025,130.861v46.02c5.596,3.812,9.273,10.232,9.273,17.514c0,1.725-0.229,3.393-0.618,4.999\n      h7.525v-68.533H41.025z"/>\n  </g>\n  <linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="218.9909" y1="225.5732" x2="218.9909" y2="140.8571">\n    <stop  offset="0" style="stop-color:#54E5D4"/>\n    <stop  offset="1" style="stop-color:#2A78FF"/>\n  </linearGradient>\n  <rect x="205.901" y="140.857" fill="url(#SVGID_5_)" width="26.179" height="84.716"/>\n  <linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="185.4516" y1="189.3962" x2="185.4516" y2="104.6809">\n    <stop  offset="0" style="stop-color:#94EA35"/>\n    <stop  offset="0.2714" style="stop-color:#BBEC36"/>\n    <stop  offset="0.5376" style="stop-color:#DAEE37"/>\n    <stop  offset="0.6853" style="stop-color:#E6EF37"/>\n    <stop  offset="0.8824" style="stop-color:#F8D554"/>\n    <stop  offset="1" style="stop-color:#FFCB60"/>\n  </linearGradient>\n  <rect x="177.362" y="104.681" fill="url(#SVGID_6_)" width="16.18" height="84.715"/>\n  <g>\n    <g>\n      <linearGradient id="SVGID_7_" gradientUnits="userSpaceOnUse" x1="74.5651" y1="108.5003" x2="74.5651" y2="98.5003">\n        <stop  offset="0" style="stop-color:#54E5D4"/>\n        <stop  offset="1" style="stop-color:#E2E900"/>\n      </linearGradient>\n      <circle fill="url(#SVGID_7_)" cx="74.565" cy="103.5" r="5"/>\n      <linearGradient id="SVGID_8_" gradientUnits="userSpaceOnUse" x1="74.5651" y1="124.6807" x2="74.5651" y2="114.6807">\n        <stop  offset="0" style="stop-color:#54E5D4"/>\n        <stop  offset="1" style="stop-color:#E2E900"/>\n      </linearGradient>\n      <circle fill="url(#SVGID_8_)" cx="74.565" cy="119.681" r="5"/>\n      <defs>\n        <filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="69.565" y="130.861" width="10" height="10">\n          <feFlood  style="flood-color:white;flood-opacity:1" result="back"/>\n          <feBlend  in="SourceGraphic" in2="back" mode="normal"/>\n        </filter>\n      </defs>\n      <mask maskUnits="userSpaceOnUse" x="69.565" y="130.861" width="10" height="10" id="SVGID_9_">\n        <g filter="url(#Adobe_OpacityMaskFilter)">\n        </g>\n      </mask>\n      <linearGradient id="SVGID_10_" gradientUnits="userSpaceOnUse" x1="74.5651" y1="140.8611" x2="74.5651" y2="130.8611">\n        <stop  offset="0" style="stop-color:#54E5D4"/>\n        <stop  offset="1" style="stop-color:#E2E900"/>\n      </linearGradient>\n      <circle mask="url(#SVGID_9_)" fill="url(#SVGID_10_)" cx="74.565" cy="135.861" r="5"/>\n    </g>\n    <g>\n      <linearGradient id="SVGID_11_" gradientUnits="userSpaceOnUse" x1="74.5651" y1="140.8611" x2="74.5651" y2="98.5003">\n        <stop  offset="0" style="stop-color:#FDD53F"/>\n        <stop  offset="0.49" style="stop-color:#ACDF43"/>\n        <stop  offset="0.8055" style="stop-color:#74E39F"/>\n        <stop  offset="1" style="stop-color:#54E5D4"/>\n      </linearGradient>\n      <circle fill="url(#SVGID_11_)" cx="74.565" cy="103.5" r="5"/>\n      <linearGradient id="SVGID_12_" gradientUnits="userSpaceOnUse" x1="74.5651" y1="140.8611" x2="74.5651" y2="98.5003">\n        <stop  offset="0" style="stop-color:#FDD53F"/>\n        <stop  offset="0.49" style="stop-color:#ACDF43"/>\n        <stop  offset="0.8055" style="stop-color:#74E39F"/>\n        <stop  offset="1" style="stop-color:#54E5D4"/>\n      </linearGradient>\n      <circle fill="url(#SVGID_12_)" cx="74.565" cy="119.681" r="5"/>\n      <linearGradient id="SVGID_13_" gradientUnits="userSpaceOnUse" x1="74.5651" y1="140.8611" x2="74.5651" y2="98.5003">\n        <stop  offset="0" style="stop-color:#FDD53F"/>\n        <stop  offset="0.49" style="stop-color:#ACDF43"/>\n        <stop  offset="0.8055" style="stop-color:#74E39F"/>\n        <stop  offset="1" style="stop-color:#54E5D4"/>\n      </linearGradient>\n      <circle fill="url(#SVGID_13_)" cx="74.565" cy="135.861" r="5"/>\n    </g>\n  </g>\n</g>\n<g id="Layer_2">\n  <rect fill="#FFFFFF" width="1" height="1"/>\n  <rect x="249" y="308" fill="#FFFFFF" width="1" height="1"/>\n</g>\n';

var moduleName = 'shinsekai.directives.logo';

_angular2['default'].module(moduleName, []).directive('ssLogo', [function () {
  return {
    restrict: 'A',
    template: template
  };
}]);

exports['default'] = moduleName;
module.exports = exports['default'];

},{"angular":1,"babel-runtime/core-js/object/define-property":3,"babel-runtime/helpers/interop-require-default":6}],30:[function(require,module,exports){
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _insertDummy = require('./insert-dummy');

var _insertDummy2 = _interopRequireDefault(_insertDummy);

var capitalize = function capitalize(s) {
  return s[0].toUpperCase() + s.substr(1);
};

var createAnimate = function createAnimate($window, attr, value0, value, now, duration) {
  var animate = $window.document.createElementNS('http://www.w3.org/2000/svg', 'animate');
  animate.setAttribute('attributeName', attr);
  animate.setAttribute('dur', '' + duration + 's');
  animate.setAttribute('fill', 'freeze');
  animate.setAttribute('from', value0);
  animate.setAttribute('to', value);
  animate.setAttribute('begin', now);
  animate.setAttribute('end', now + duration);
  return animate;
};

var all = ['circle', 'ellipse', 'rect', 'line', 'path', 'polygon', 'polyline', 'text'];
var attributes = {
  cx: ['circle', 'ellipse'],
  cy: ['circle', 'ellipse'],
  r: ['circle'],
  rx: ['ellipse'],
  ry: ['ellipse'],
  x: ['rect', 'text'],
  y: ['rect', 'text'],
  width: ['rect'],
  height: ['rect'],
  x1: ['line'],
  y1: ['line'],
  x2: ['line'],
  y2: ['line'],
  d: ['path'],
  points: ['polygon', 'polyline'],
  fill: all,
  stroke: all,
  opacity: all
};

var moduleName = 'shinsekai.directives.attributes';

_angular2['default'].module(moduleName, []);

var directiveDefinition = function directiveDefinition(attrName, directiveName, tags) {
  return ['$window', function ($window) {
    return {
      restrict: 'A',
      link: function link(scope, elementWrapper, attrs) {
        var element = elementWrapper[0],
            tagName = element.tagName,
            svg = element.ownerSVGElement;
        if (tags.indexOf(tagName) < 0) {
          throw new Error('' + attrName + ' is not allowed for ' + tagName);
        }

        (0, _insertDummy2['default'])(svg, $window);

        var oldValue = attrs[directiveName + 'Enter'] == null ? scope.$eval(attrs[directiveName]) : scope.$eval(attrs[directiveName + 'Enter']);
        element.setAttribute(attrName, oldValue);
        scope.$watch(attrs[directiveName], function () {
          var dur = scope.$eval(attrs.ssDur),
              delay = scope.$eval(attrs.ssDelay),
              newValue = scope.$eval(attrs[directiveName]);
          if (attrName === 'd' || attrName === 'points') {
            if (attrs[directiveName + 'Update'] != null) {
              oldValue = scope.$eval(attrs[directiveName + 'Update']);
            }
          }
          if (dur > 0) {
            (function () {
              var now = delay == null ? svg.getCurrentTime() : svg.getCurrentTime() + delay,
                  animate = createAnimate($window, attrName, oldValue, newValue, now, dur);
              element.appendChild(animate);
              animate.addEventListener('endEvent', function () {
                element.setAttribute(attrName, oldValue);
                element.removeChild(animate);
              });
              oldValue = newValue;
            })();
          } else if (delay > 0) {
            $window.setTimeout(function () {
              element.setAttribute(attrName, newValue);
            }, delay * 1000);
          } else {
            element.setAttribute(attrName, newValue);
          }
        });
      }
    };
  }];
};

for (var attrName in attributes) {
  var tags = attributes[attrName],
      directiveName = 'ss' + capitalize(attrName);
  _angular2['default'].module(moduleName).directive(directiveName, directiveDefinition(attrName, directiveName, tags));
}

exports['default'] = moduleName;
module.exports = exports['default'];

},{"./insert-dummy":28,"angular":1,"babel-runtime/core-js/object/define-property":3,"babel-runtime/helpers/interop-require-default":6}],31:[function(require,module,exports){
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _servicesTransform = require('../services/transform');

var _servicesTransform2 = _interopRequireDefault(_servicesTransform);

var _insertDummy = require('./insert-dummy');

var _insertDummy2 = _interopRequireDefault(_insertDummy);

var parse = function parse(t) {
  var result = [];
  for (var i in t = t.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
    var c = t[i].match(/[\w\.\-]+/g);
    result.push({
      type: c.shift(),
      values: c
    });
  }
  return result;
};

var moduleName = 'shinsekai.directives.transform';

_angular2['default'].module(moduleName, [_servicesTransform2['default']]).directive('ssTransform', ['$window', 'Transform', function ($window, Transform) {
  var validate = function validate(newTransform, oldTransform) {
    if (newTransform.length !== oldTransform.length) {
      return false;
    }
    return newTransform.every(function (t, i) {
      return t.type === oldTransform[i].type;
    });
  };

  var createAnimateTransform = function createAnimateTransform(type, from, to, begin, duration) {
    var animate = $window.document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
    animate.setAttribute('attributeName', 'transform');
    animate.setAttribute('type', type);
    animate.setAttribute('dur', '' + duration + 's');
    animate.setAttribute('fill', 'freeze');
    animate.setAttribute('from', from);
    animate.setAttribute('to', to);
    animate.setAttribute('begin', begin);
    animate.setAttribute('end', begin + duration);
    return animate;
  };

  return {
    restrict: 'A',
    link: function link(scope, elementWrapper, attrs) {
      var element = elementWrapper[0],
          svg = element.ownerSVGElement;
      (0, _insertDummy2['default'])(svg, $window);

      var update = function update(newValue, oldValue) {
        if (newValue === oldValue) {
          return;
        }

        var dur = scope.$eval(attrs.ssDur),
            delay = scope.$eval(attrs.ssDelay);
        if (dur > 0) {
          (function () {
            var newTransform = parse(newValue),
                oldTransform = parse(oldValue),
                begin = delay == null ? svg.getCurrentTime() : svg.getCurrentTime() + delay;
            if (validate(newTransform, oldTransform)) {
              (function () {
                var count = 0;
                var animates = [],
                    onEndEvent = function onEndEvent() {
                  if (++count === newTransform.length) {
                    element.setAttribute('transform', newValue);
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                      for (var _iterator = _getIterator(animates), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var a = _step.value;

                        element.removeChild(a);
                      }
                    } catch (err) {
                      _didIteratorError = true;
                      _iteratorError = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                          _iterator['return']();
                        }
                      } finally {
                        if (_didIteratorError) {
                          throw _iteratorError;
                        }
                      }
                    }
                  }
                };
                for (var i = 0; i < newTransform.length; ++i) {
                  var type = newTransform[i].type,
                      from = oldTransform[i].values.join(' '),
                      to = newTransform[i].values.join(' '),
                      animate = createAnimateTransform(type, from, to, begin, dur);
                  animates.push(animate);
                  animate.addEventListener('endEvent', onEndEvent);
                  element.appendChild(animate);
                }
              })();
            } else {
              element.setAttribute('transform', newValue);
            }
          })();
        } else if (delay > 0) {
          $window.setTimeout(function () {
            element.setAttribute('transform', newValue);
          }, delay * 1000);
        } else {
          element.setAttribute('transform', newValue);
        }
      };

      if (attrs.ssTransformEnter == null) {
        element.setAttribute('transform', scope.$eval(attrs.ssTransform));
      } else {
        update(scope.$eval(attrs.ssTransform), scope.$eval(attrs.ssTransformEnter));
      }

      scope.$watch(attrs.ssTransform, update);
    }
  };
}]);

exports['default'] = moduleName;
module.exports = exports['default'];

},{"../services/transform":35,"./insert-dummy":28,"angular":1,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/define-property":3,"babel-runtime/helpers/interop-require-default":6}],32:[function(require,module,exports){
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _transform = require('./transform');

var _transform2 = _interopRequireDefault(_transform);

var _scale = require('./scale');

var _scale2 = _interopRequireDefault(_scale);

_angular2['default'].module('shinsekai.services', [_path2['default'], _transform2['default'], _scale2['default']]);

exports['default'] = 'shinsekai.services';
module.exports = exports['default'];

},{"./path":33,"./scale":34,"./transform":35,"angular":1,"babel-runtime/core-js/object/define-property":3,"babel-runtime/helpers/interop-require-default":6}],33:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var Path = (function () {
  function Path(x, y) {
    _classCallCheck(this, Path);

    this.d = 'M' + x + ',' + y;
  }

  _createClass(Path, [{
    key: 'lineTo',
    value: function lineTo(x, y) {
      this.d += 'L' + x + ',' + y;
      return this;
    }
  }, {
    key: 'arc',
    value: function arc(rx, ry, rotate, f1, f2, x, y) {
      this.d += 'A' + rx + ' ' + ry + ',' + rotate + ',' + f1 + ',' + f2 + ',' + x + ' ' + y;
      return this;
    }
  }, {
    key: 'close',
    value: function close() {
      this.d += 'Z';
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.d;
    }
  }]);

  return Path;
})();

_angular2['default'].module('shinsekai.path', []).factory('Path', [function () {
  return Path;
}]);

exports['default'] = 'shinsekai.path';
module.exports = exports['default'];

},{"angular":1,"babel-runtime/core-js/object/define-property":3,"babel-runtime/helpers/class-call-check":4,"babel-runtime/helpers/create-class":5,"babel-runtime/helpers/interop-require-default":6}],34:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var Scale = (function () {
  function Scale() {
    _classCallCheck(this, Scale);

    this.xMin = 0;
    this.xMax = 1;
    this.yMin = 0;
    this.yMax = 1;
  }

  _createClass(Scale, [{
    key: 'domain',
    value: function domain(xMin, xMax) {
      this.xMin = xMin;
      this.xMax = xMax;
      return this;
    }
  }, {
    key: 'range',
    value: function range(yMin, yMax) {
      this.yMin = yMin;
      this.yMax = yMax;
      return this;
    }
  }, {
    key: 'scale',
    value: function scale(x) {
      var xMin = this.xMin;
      var xMax = this.xMax;
      var yMin = this.yMin;
      var yMax = this.yMax;

      return (yMax - yMin) * (x - xMin) / (xMax - xMin) + yMin;
    }
  }]);

  return Scale;
})();

_angular2['default'].module('shinsekai.scale', []).factory('Scale', [function () {
  return Scale;
}]);

exports['default'] = 'shinsekai.scale';
module.exports = exports['default'];

},{"angular":1,"babel-runtime/core-js/object/define-property":3,"babel-runtime/helpers/class-call-check":4,"babel-runtime/helpers/create-class":5,"babel-runtime/helpers/interop-require-default":6}],35:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var Transform = (function () {
  function Transform() {
    _classCallCheck(this, Transform);

    this.transforms = [];
  }

  _createClass(Transform, [{
    key: 'translate',
    value: function translate(x) {
      var y = arguments[1] === undefined ? 0 : arguments[1];

      this.transforms.push({
        type: 'translate',
        args: [x, y]
      });
      return this;
    }
  }, {
    key: 'scale',
    value: function scale(x, y) {
      if (y == null) {
        y = x;
      }
      this.transforms.push({
        type: 'scale',
        args: [x, y]
      });
      return this;
    }
  }, {
    key: 'rotate',
    value: function rotate(a, x, y) {
      if (x != null && y != null) {
        this.transforms.push({
          type: 'rotate',
          args: [a, x, y]
        });
      } else {
        this.transforms.push({
          type: 'rotate',
          args: [a]
        });
      }
      return this;
    }
  }, {
    key: 'skewX',
    value: function skewX(a) {
      this.transforms.push({
        type: 'skewX',
        args: [a]
      });
      return this;
    }
  }, {
    key: 'skewY',
    value: function skewY(a) {
      this.transforms.push({
        type: 'skewY',
        args: [a]
      });
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.transforms.map(function (t) {
        return '' + t.type + '(' + t.args.join(',') + ')';
      }).join('');
    }
  }]);

  return Transform;
})();

_angular2['default'].module('shinsekai.transform', []).factory('Transform', [function () {
  return Transform;
}]);

exports['default'] = 'shinsekai.transform';
module.exports = exports['default'];

},{"angular":1,"babel-runtime/core-js/object/define-property":3,"babel-runtime/helpers/class-call-check":4,"babel-runtime/helpers/create-class":5,"babel-runtime/helpers/interop-require-default":6}],36:[function(require,module,exports){
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _directives = require('./directives');

var _directives2 = _interopRequireDefault(_directives);

var _services = require('./services');

var _services2 = _interopRequireDefault(_services);

_angular2['default'].module('shinsekai', [_directives2['default'], _services2['default']]);

exports['default'] = 'shinsekai';
module.exports = exports['default'];

},{"./directives":27,"./services":32,"angular":1,"babel-runtime/core-js/object/define-property":3,"babel-runtime/helpers/interop-require-default":6}]},{},[36])(36)
});