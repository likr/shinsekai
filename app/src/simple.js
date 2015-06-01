import angular from 'angular';
import shinsekai from '../../src';

const moduleName = 'shinsekai-example.simple';

angular.module(moduleName, [shinsekai]);

angular.module(moduleName).directive('simple', () => {
  return {
    restrict: 'E',
    templateUrl: 'components/simple.html',
    scope: {
    },
    controllerAs: 'simple',
    controller: class {
      constructor() {
        this.x = 150;
      }

      update() {
        this.x = this.x === 150 ? 450 : 150;
      }
    }
  };
});

export default moduleName;
