import angular from 'angular';
import shinsekai from '../../src';

const moduleName = 'shinsekai-example.scatter-plot';

angular.module(moduleName, [shinsekai]);

angular.module(moduleName).directive('scatterPlot', (Transform, Scale) => {
  const width = 500,
        height = 500;

  return {
    restrict: 'E',
    templateUrl: 'components/scatter-plot.html',
    scope: {
    },
    bindToController: {
      data: '='
    },
    controllerAs: 'scatterPlot',
    controller: class {
      constructor($scope) {
        this.width = width;
        this.height = height;
        this.variables = [
          'sepalLength',
          'sepalWidth',
          'petalLength',
          'petalWidth'
        ];
        this.xVariable = this.variables[0];
        this.yVariable = this.variables[1];
        this.xTicks = 10;
        this.yTicks = 10;
        this.xScale = new Scale()
          .range(0, width);
        this.yScale = new Scale()
          .range(height, 0);
        this.updateXVariable();
        this.updateYVariable();
      }

      color(specy) {
        if (specy === 'setosa') {
          return '#f00';
        } else if (specy === 'versicolor') {
          return '#0f0';
        } else if (specy === 'virginica') {
          return '#00f';
        }
        return null;
      }

      transform() {
        return new Transform();
      }

      updateXVariable() {
        const values = this.data.map(d => d[this.xVariable]),
              min = Math.min(...values),
              max = Math.max(...values);
        this.xScale.domain(min, max);
      }

      updateYVariable() {
        const values = this.data.map(d => d[this.yVariable]),
              min = Math.min(...values),
              max = Math.max(...values);
        this.yScale.domain(min, max);
      }

      labelFormat(x) {
        return x.toFixed(2);
      }
    }
  };
});

export default moduleName;
