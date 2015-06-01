import angular from 'angular';

const capitalize = (s) => {
  return s[0].toUpperCase() + s.substr(1);
};

const insertDummy = (svg, $window) => {
  // insert dummy animate element for firefox implementation
  const dummy = $window.document.getElementById('ss-dummy-animate');
  if (dummy == null) {
    const animate = $window.document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('id', 'ss-dummy-animate');
    svg.appendChild(animate);
  }
};

angular.module('shinsekai.ssvg', []).directive('ssvg', ($window) => {
  const createAnimate = (attr, value0, value, now, duration) => {
    const animate = $window.document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', attr);
    animate.setAttribute('dur', `${duration}s`);
    animate.setAttribute('fill', 'freeze');
    animate.setAttribute('from', value0);
    animate.setAttribute('to', value);
    animate.setAttribute('begin', now);
    animate.setAttribute('end', now + duration);
    return animate;
  };

  const addAttribute = (svg, element, value0Key, valueKey, scope) => {
    if (scope[valueKey] == null) {
      return;
    }
    if (scope[valueKey + 'Enter'] != null) {
      scope[value0Key] = scope[valueKey + 'Enter'];
    } else {
      scope[value0Key] = scope[valueKey];
    }
    element.setAttribute(valueKey, scope[value0Key]);
    if (scope.dur > 0 || scope.delay > 0) {
      scope.$watch(valueKey, (newValue, oldValue) => {
        const duration = scope.dur,
              delay = scope.delay,
              animate = createAnimate(
                valueKey, scope[value0Key], scope[valueKey],
                svg.getCurrentTime() + delay, duration);
        element.appendChild(animate);
        animate.addEventListener('endEvent', () => {
          element.setAttribute(valueKey, scope[value0Key]);
          element.removeChild(animate);
        });
        scope[value0Key] = scope[valueKey];
      });
    }
  };

  const attributes = {
    circle: [
      'cx',
      'cy',
      'r',
      'fill',
      'stroke',
      'opacity'
    ],
    rect: [
      'x',
      'y',
      'width',
      'height',
      'fill',
      'stroke',
      'opacity'
    ],
    line: [
      'x1',
      'y1',
      'x2',
      'y2',
      'fill',
      'stroke',
      'opacity'
    ],
    text: [
      'x',
      'y',
      'fill',
      'stroke',
      'opacity'
    ],
    path: [
      'd',
      'fill',
      'stroke',
      'opacity'
    ],
    ellipse: [
      'cx',
      'cy',
      'rx',
      'ry',
      'fill',
      'stroke',
      'opacity'
    ],
    polygon: [
      'points',
      'fill',
      'stroke',
      'opacity'
    ],
    polyline: [
      'points',
      'fill',
      'stroke',
      'opacity'
    ]
  };

  const isolatedScope = {
    dur: '=ssDur',
    delay: '=ssDelay'
  };
  for (const tagName in attributes) {
    for (const attrName of attributes[tagName]) {
      if (isolatedScope[attrName] == null) {
        const val = `=ss${capitalize(attrName)}`;
        isolatedScope[attrName] = val;
        isolatedScope[attrName + 'Enter'] = val + 'Enter';
      }
    }
  }

  return {
    restrict: 'A',
    scope: isolatedScope,
    link: (scope, elementWrapper, attrs) => {
      const element = elementWrapper[0],
            svg = element.ownerSVGElement;
      insertDummy(svg, $window);
      for (const attrName of attributes[element.tagName] || []) {
        addAttribute(svg, element, `${attrName}0`, attrName, scope);
      }
    }
  };
});

export default 'shinsekai.ssvg';
