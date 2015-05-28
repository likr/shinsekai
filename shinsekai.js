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

  const addAttribute = (svg, circle, value0Key, valueKey, scope, attrName) => {
    scope[value0Key] = scope[valueKey];
    scope.$watch(valueKey, () => {
      const duration = scope.ssDur || 1,
            animate = createAnimate(attrName, scope[value0Key], scope[valueKey], svg.getCurrentTime(), duration);
      circle.appendChild(animate);
      animate.addEventListener('endEvent', () => {
        circle.setAttribute(attrName, scope[value0Key]);
        circle.removeChild(animate);
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
      ssDur: '='
    },
    link: (scope, element, attrs) => {
      const circle = element[0],
            svg = circle.ownerSVGElement;

      addAttribute(svg, circle, 'x0', 'ssCx', scope, 'cx');
      addAttribute(svg, circle, 'y0', 'ssCy', scope, 'cy');
      addAttribute(svg, circle, 'r0', 'ssR', scope, 'r');
    }
  };
});

export default 'shinsekai';
