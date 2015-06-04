import angular from 'angular';
import transformService from '../services/transform';
import insertDummy from './insert-dummy';

const parse = (t) => {
  const result = [];
  for (let i in t = t.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
    const c = t[i].match(/[\w\.\-]+/g);
    result.push({
      type: c.shift(),
      values: c
    });
  }
  return result;
};

const moduleName = 'shinsekai.directives.transform';

angular.module(moduleName, [transformService])
  .directive('ssTransform', ($window, Transform) => {
    const validate = (newTransform, oldTransform) => {
      if (newTransform.length !== oldTransform.length) {
        return false;
      }
      return newTransform.every((t, i) => t.type === oldTransform[i].type);
    };

    const createAnimateTransform = (type, from, to, begin, duration) => {
      const animate = $window.document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
      animate.setAttribute('attributeName', 'transform');
      animate.setAttribute('type', type);
      animate.setAttribute('dur', `${duration}s`);
      animate.setAttribute('fill', 'freeze');
      animate.setAttribute('from', from);
      animate.setAttribute('to', to);
      animate.setAttribute('begin', begin);
      animate.setAttribute('end', begin + duration);
      return animate;
    };

    return {
      restrict: 'A',
      link: (scope, elementWrapper, attrs) => {
        const element = elementWrapper[0],
              svg = element.ownerSVGElement;
        insertDummy(svg, $window);

        const update = (newValue, oldValue) => {
          if (newValue === oldValue) {
            return;
          }

          const dur = scope.$eval(attrs.ssDur),
                delay = scope.$eval(attrs.ssDelay);
          if (dur > 0) {
            const newTransform = parse(newValue),
                  oldTransform = parse(oldValue),
                  begin = delay == null
                    ? svg.getCurrentTime()
                    : svg.getCurrentTime() + delay;
            if (validate(newTransform, oldTransform)) {
              let count = 0;
              const animates = [],
                    onEndEvent = () => {
                      if (++count === newTransform.length) {
                        element.setAttribute('transform', newValue);
                        for (const a of animates) {
                          element.removeChild(a);
                        }
                      }
                    };
              for (let i = 0; i < newTransform.length; ++i) {
                const type = newTransform[i].type,
                      from = oldTransform[i].values.join(' '),
                      to = newTransform[i].values.join(' '),
                      animate = createAnimateTransform(type, from, to, begin, dur);
                animates.push(animate);
                animate.addEventListener('endEvent', onEndEvent);
                element.appendChild(animate);
              }
            } else {
              element.setAttribute('transform', newValue);
            }
          } else if (delay > 0) {
            $window.setTimeout(() => {
              element.setAttribute('transform', newValue);
            }, delay * 1000);
          } else {
            element.setAttribute('transform', newValue);
          }
        };

        if (attrs.transformEnter == null) {
          element.setAttribute('transform', scope.$eval(attrs.ssTransform));
        } else {
          update(scope.$eval(attrs.ssTransform), scope.$eval(attrs.ssTransformEnter));
        }

        scope.$watch(attrs.ssTransform, update);
      }
    };
  });

export default moduleName;
