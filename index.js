import angular from 'angular';

angular.module('shinsekai', []);

angular.module('shinsekai').directive('ssCircle', ($window) => {
  const createAnimate = (id, attr, value0, value, now) => {
    const animate = $window.document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${id}`);
    animate.setAttribute('attributeName', attr);
    animate.setAttribute('dur', '1s');
    animate.setAttribute('fill', 'freeze');
    animate.setAttribute('from', value0);
    animate.setAttribute('to', value);
    animate.setAttribute('begin', now);
    animate.setAttribute('end', now + 1);
    return animate;
  };

  const addAttribute = (svg, circle, domId, value0Key, valueKey, scope, attrName) => {
    scope[value0Key] = scope[valueKey];
    scope.$watch(valueKey, () => {
      const animate = createAnimate(domId, attrName, scope[value0Key], scope[valueKey], svg.getCurrentTime());
      svg.appendChild(animate);
      animate.addEventListener('endEvent', function () {
        circle.setAttribute(attrName, scope[value0Key]);
        svg.removeChild(animate);
      });
      scope[value0Key] = scope[valueKey];
    });
  };

  let id = 0;

  return {
    restrict: 'E',
    replace: true,
    template: '<circle/>',
    templateNamespace: 'svg',
    scope: {
      ssCx: '=',
      ssCy: '=',
      ssR: '='
    },
    link: (scope, element, attrs) => {
      const circle = element[0],
            svg = circle.ownerSVGElement;

      const domId = `ss-id-${id++}`;
      circle.setAttribute('id', domId);

      addAttribute(svg, circle, domId, 'x0', 'ssCx', scope, 'cx');
      addAttribute(svg, circle, domId, 'y0', 'ssCy', scope, 'cy');
      addAttribute(svg, circle, domId, 'r0', 'ssR', scope, 'r');
    }
  };
});

angular.module('hoge', ['shinsekai']);

angular.module('hoge').factory('data', ($interval) => {
  const width = 400,
        height = 400,
        n = 10,
        points = [];
  for (let i = 0; i < n; ++i) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 9 + 1
    });
  }

  $interval(() => {
    for (const point of points) {
      point.x = Math.random() * width;
      point.y = Math.random() * height;
      point.r = Math.random() * 9 + 1;
    }
  }, 2000);
  return points;
});

angular.module('hoge').directive('main', () => {
  return {
    restrict: 'E',
    templateUrl: 'main.html',
    scope: {
    },
    controllerAs: 'main',
    controller: class {
      constructor(data) {
        this.data = data;
      }
    }
  };
});
