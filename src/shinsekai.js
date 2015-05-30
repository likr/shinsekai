import angular from 'angular';

angular.module('shinsekai', []);

angular.module('shinsekai').directive('ssvg', ($window) => {
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
    scope[value0Key] = scope[valueKey];
    scope.$watch(valueKey, () => {
      const duration = scope.ssDur || 1,
            delay = scope.ssDelay || 0.1,
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
  };

  const attributes = {
    circle: [
      'cx',
      'cy',
      'r',
      'fill',
      'opacity'
    ],
    rect: [
      'x',
      'y',
      'width',
      'height',
      'fill',
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
    ]
  };

  return {
    restrict: 'A',
    scope: {
      cx: '=ssCx',
      cy: '=ssCy',
      r: '=ssR',
      x: '=ssX',
      y: '=ssY',
      x1: '=ssX1',
      y1: '=ssY1',
      x2: '=ssX2',
      y2: '=ssY2',
      width: '=ssWidth',
      height: '=ssHeight',
      fill: '=ssFill',
      stroke: '=ssStroke',
      opacity: '=ssOpacity',
      dur: '=ssDur',
      delay: '=ssDelay'
    },
    link: (scope, elementWrapper, attrs) => {
      const element = elementWrapper[0],
            svg = element.ownerSVGElement;

      for (const attrName of attributes[element.tagName]) {
        addAttribute(svg, element, `${attrName}0`, attrName, scope);
      }
    }
  };
});

export default 'shinsekai';
