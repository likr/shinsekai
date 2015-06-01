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

const createAnimate = ($window, attr, value0, value, now, duration) => {
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

const all = [
  'circle',
  'ellipse',
  'rect',
  'line',
  'path',
  'polygon',
  'polyline',
  'text'
];
const attributes = {
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


const moduleName = 'shinsekai.directives.attributes';

angular.module(moduleName, []);

const directiveDefinition = (attrName, directiveName, tags) => {
  return ['$window', ($window) => {
    return {
      restrict: 'A',
      link: (scope, elementWrapper, attrs) => {
        const element = elementWrapper[0],
              tagName = element.tagName,
              svg = element.ownerSVGElement;
        if (tags.indexOf(tagName) < 0) {
          throw new Error(`${attrName} is not allowed for ${tagName}`);
        }

        insertDummy(svg, $window);

        let oldValue = attrs[directiveName + 'Enter'] == null
          ? scope.$eval(attrs[directiveName])
          : scope.$eval(attrs[directiveName + 'Enter']);
        element.setAttribute(attrName, oldValue);
        scope.$watch(attrs[directiveName], () => {
          const dur = scope.$eval(attrs.ssDur),
                delay = scope.$eval(attrs.ssDelay),
                newValue = scope.$eval(attrs[directiveName]);
          if (attrName === 'd' || attrName === 'points') {
            if (attrs[directiveName + 'Update'] != null) {
              oldValue = scope.$eval(attrs[directiveName + 'Update']);
            }
          }
          if (dur > 0) {
            const now = delay == null
                    ? svg.getCurrentTime()
                    : svg.getCurrentTime() + delay,
                  animate = createAnimate($window, attrName, oldValue, newValue, now, dur);
            element.appendChild(animate);
            animate.addEventListener('endEvent', () => {
              element.setAttribute(attrName, oldValue);
              element.removeChild(animate);
            });
            oldValue = newValue;
          } else if (delay > 0) {
            $window.setTimeout(() => {
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

for (const attrName in attributes) {
  const tags = attributes[attrName],
        directiveName = `ss${capitalize(attrName)}`;
  angular.module(moduleName)
    .directive(directiveName, directiveDefinition(attrName, directiveName, tags));
}

export default moduleName;
