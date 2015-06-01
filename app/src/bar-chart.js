import angular from 'angular';
import shinsekai from '../../src';

const moduleName = 'shinsekai-example.bar-chart';

angular.module(moduleName, [shinsekai]);

angular.module(moduleName).directive('barChart', (Scale) => {
  const height = 500,
        width = 800,
        initialLabel = 'label',
        initialValue = 50;
  return {
    restrict: 'E',
    templateUrl: 'bar-chart.html',
    scope: {
    },
    controllerAs: 'barChart',
    controller: class {
      constructor() {
        this.data = [];
        this.newLabel = initialLabel;
        this.newValue = initialValue;
        this.height = height;
        this.width = width;
        this.yScale = new Scale()
          .domain(0, 100)
          .range(height, 0);
      }

      add() {
        this.data.push({
          label: this.newLabel,
          value: this.newValue,
          color: `hsl(${Math.random() * 360},100%,50%)`
        });
        this.newLabel = initialLabel;
        this.newValue = +(Math.random() * 100).toFixed();
      }

      clear() {
        this.data = [];
      }
    }
  };
});
export default moduleName;

