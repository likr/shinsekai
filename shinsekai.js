(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.shinsekai = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":5}],2:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],3:[function(require,module,exports){
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
},{"babel-runtime/core-js/object/define-property":1}],4:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],5:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":7}],6:[function(require,module,exports){
module.exports = function($){
  $.FW   = false;
  $.path = $.core;
  return $;
};
},{}],7:[function(require,module,exports){
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
},{"./$.fw":6}],8:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = window.angular;
module.exports = exports["default"];

},{"babel-runtime/core-js/object/define-property":1}],9:[function(require,module,exports){
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

_angular2['default'].module('shinsekai.ss-axis', []).directive('ssAxis', [function () {
  return {
    restrict: 'A',
    template: '\n      <line\n          stroke="#000"\n          ss-x1="axis.orient === \'left\' ? 0 : axis.scale.yMin"\n          ss-y1="axis.orient === \'left\' ? axis.scale.yMin : 0"\n          ss-x2="axis.orient === \'left\' ? 0 : axis.scale.yMax"\n          ss-y2="axis.orient === \'left\' ? axis.scale.yMax : 0"/>\n      <g ng-repeat="i in axis.indices()">\n        <line\n            stroke="#000"\n            ss-x1="axis.orient === \'left\' ? -10 : axis.y(i)"\n            ss-y1="axis.orient === \'left\' ? axis.y(i) : 0"\n            ss-x2="axis.orient === \'left\' ? 0 : axis.y(i)"\n            ss-y2="axis.orient === \'left\' ? axis.y(i) : 10"\n            ss-dur="axis.duration"\n            ss-delay="axis.delay"/>\n        <text\n            ng-attr-text-anchor="{{axis.orient === \'left\' ? \'end\' : \'middle\'}}"\n            ss-x="axis.orient === \'left\' ? -10 : axis.y(i)"\n            ss-y="axis.orient === \'left\' ? axis.y(i) : 30"\n            ss-dur="axis.duration"\n            ss-delay="axis.delay">\n          {{axis.format(axis.x(i))}}\n        </text>\n      </g>\n    ',
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
        _classCallCheck(this, AxisController);

        if (this.format == null) {
          this.format = function (x) {
            return x;
          };
        }
      }

      _createClass(AxisController, [{
        key: 'indices',
        value: function indices() {
          var indices = [];
          for (var i = 0; i <= this.ticks; ++i) {
            indices.push(i);
          }
          return indices;
        }
      }, {
        key: 'x',
        value: function x(i) {
          return (this.scale.xMax - this.scale.xMin) * i / this.ticks + this.scale.xMin;
        }
      }, {
        key: 'y',
        value: function y(i) {
          return this.scale.scale(this.x(i));
        }
      }]);

      return AxisController;
    })()
  };
}]);

exports['default'] = 'shinsekai.ss-axis';
module.exports = exports['default'];

},{"angular":8,"babel-runtime/core-js/object/define-property":1,"babel-runtime/helpers/class-call-check":2,"babel-runtime/helpers/create-class":3,"babel-runtime/helpers/interop-require-default":4}],10:[function(require,module,exports){
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

_angular2['default'].module('shinsekai.directives', [_svg2['default'], _transform2['default'], _axis2['default']]);

exports['default'] = 'shinsekai.directives';
module.exports = exports['default'];

},{"./axis":9,"./svg":11,"./transform":12,"angular":8,"babel-runtime/core-js/object/define-property":1,"babel-runtime/helpers/interop-require-default":4}],11:[function(require,module,exports){
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var capitalize = function capitalize(s) {
  return s[0].toUpperCase() + s.substr(1);
};

var insertDummy = function insertDummy(svg, $window) {
  // insert dummy animate element for firefox implementation
  var dummy = $window.document.getElementById('ss-dummy-animate');
  if (dummy == null) {
    var animate = $window.document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('id', 'ss-dummy-animate');
    svg.appendChild(animate);
  }
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

        insertDummy(svg, $window);

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

},{"angular":8,"babel-runtime/core-js/object/define-property":1,"babel-runtime/helpers/interop-require-default":4}],12:[function(require,module,exports){
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _servicesTransform = require('../services/transform');

var _servicesTransform2 = _interopRequireDefault(_servicesTransform);

var moduleName = 'shinsekai.directives.transform';

_angular2['default'].module(moduleName, [_servicesTransform2['default']]).directive('ssTransform', function (Transform) {
  return {
    restrict: 'A',
    link: function link(scope, elementWrapper, attrs) {
      var transform = scope.$eval(attrs.ssTransform),
          transformString = transform instanceof Transform ? transform.toString() : transform;
      attrs.$set('transform', transformString);
    }
  };
});

exports['default'] = moduleName;
module.exports = exports['default'];

},{"../services/transform":16,"angular":8,"babel-runtime/core-js/object/define-property":1,"babel-runtime/helpers/interop-require-default":4}],13:[function(require,module,exports){
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

},{"./path":14,"./scale":15,"./transform":16,"angular":8,"babel-runtime/core-js/object/define-property":1,"babel-runtime/helpers/interop-require-default":4}],14:[function(require,module,exports){
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

},{"angular":8,"babel-runtime/core-js/object/define-property":1,"babel-runtime/helpers/class-call-check":2,"babel-runtime/helpers/create-class":3,"babel-runtime/helpers/interop-require-default":4}],15:[function(require,module,exports){
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

},{"angular":8,"babel-runtime/core-js/object/define-property":1,"babel-runtime/helpers/class-call-check":2,"babel-runtime/helpers/create-class":3,"babel-runtime/helpers/interop-require-default":4}],16:[function(require,module,exports){
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

},{"angular":8,"babel-runtime/core-js/object/define-property":1,"babel-runtime/helpers/class-call-check":2,"babel-runtime/helpers/create-class":3,"babel-runtime/helpers/interop-require-default":4}],17:[function(require,module,exports){
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

},{"./directives":10,"./services":13,"angular":8,"babel-runtime/core-js/object/define-property":1,"babel-runtime/helpers/interop-require-default":4}]},{},[17])(17)
});