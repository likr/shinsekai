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

  const addAttribute = (svg, element, value0Key, valueKey, scope, attrName) => {
    scope[value0Key] = scope[valueKey];
    scope.$watch(valueKey, () => {
      const duration = scope.ssDur || 1,
            delay = scope.ssDelay || 0.1,
            animate = createAnimate(
              attrName, scope[value0Key], scope[valueKey],
              svg.getCurrentTime() + delay, duration);
      element.appendChild(animate);
      animate.addEventListener('endEvent', () => {
        element.setAttribute(attrName, scope[value0Key]);
        element.removeChild(animate);
      });
      scope[value0Key] = scope[valueKey];
    });
  };

  return {
    restrict: 'A',
    scope: {
      ssCx: '=',
      ssCy: '=',
      ssR: '=',
      ssX: '=',
      ssY: '=',
      ssWidth: '=',
      ssHeight: '=',
      ssFill: '=',
      ssOpacity: '=',
      ssDur: '=',
      ssDelay: '='
    },
    link: (scope, elementWrapper, attrs) => {
      const element = elementWrapper[0],
            svg = element.ownerSVGElement;

      addAttribute(svg, element, 'fill0', 'ssFill', scope, 'fill');
      addAttribute(svg, element, 'opacity0', 'ssOpacity', scope, 'opacity');
      if (element.tagName === 'circle') {
        addAttribute(svg, element, 'cx0', 'ssCx', scope, 'cx');
        addAttribute(svg, element, 'cy0', 'ssCy', scope, 'cy');
        addAttribute(svg, element, 'r0', 'ssR', scope, 'r');
      }
      if (element.tagName === 'rect') {
        addAttribute(svg, element, 'x0', 'ssX', scope, 'x');
        addAttribute(svg, element, 'y0', 'ssY', scope, 'y');
        addAttribute(svg, element, 'width0', 'ssWidth', scope, 'width');
        addAttribute(svg, element, 'height0', 'ssHeight', scope, 'height');
      }
    }
  };
});

export default 'shinsekai';
