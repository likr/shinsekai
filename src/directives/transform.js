import angular from 'angular';
import transformService from '../services/transform';

const moduleName = 'shinsekai.directives.transform';

angular.module(moduleName, [transformService])
  .directive('ssTransform', (Transform) => {
    return {
      restrict: 'A',
      link: (scope, elementWrapper, attrs) => {
        const transform = scope.$eval(attrs.ssTransform),
              transformString = transform instanceof Transform
                ? transform.toString()
                : transform;
        attrs.$set('transform', transformString);
      }
    };
  });

export default moduleName;
