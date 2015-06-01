import angular from 'angular';
import shinsekai from '../../src';

const moduleName = 'shinsekai-example.line-chart';

angular.module(moduleName, [shinsekai]);

angular.module(moduleName).factory('data', ($interval) => {
  const data = [];
  $interval(() => {
    data.push({
      a: Math.random() * 100,
      b: Math.random() * 100,
      c: Math.random() * 100
    });
  }, 150, 21);
  return data;
});

angular.module(moduleName).directive('lineChart', (Path, Transform, Scale, data) => {
  const height = 500,
        width = 800;
  return {
    restrict: 'E',
    templateUrl: 'components/line-chart.html',
    scope: {
    },
    controllerAs: 'lineChart',
    controller: class {
      constructor() {
        this.data = data;
        this.variables = ['a', 'b', 'c'];
        this.height = height;
        this.width = width;
        this.xScale = new Scale()
          .domain(0, 20)
          .range(0, width);
        this.yScale = new Scale()
          .domain(0, 100)
          .range(height, 0);
      }

      path(key) {
        if (this.data.length < 2) {
          return '';
        }
        const path = new Path(
          this.xScale.scale(0),
          this.yScale.scale(this.data[0][key]));
        for (let i = 1; i < this.data.length; ++i) {
          path.lineTo(
            this.xScale.scale(i),
            this.yScale.scale(this.data[i][key]));
        }
        return path.toString();
      }

      pathEnter(key) {
        if (this.data.length < 2) {
          return '';
        }
        const path = new Path(
          this.xScale.scale(0),
          this.yScale.scale(this.data[0][key]));
        for (let i = 1; i < this.data.length - 1; ++i) {
          path.lineTo(
            this.xScale.scale(i),
            this.yScale.scale(this.data[i][key]));
        }
        path.lineTo(
          this.xScale.scale(this.data.length - 1),
          this.yScale.scale(0));
        return path.toString();
      }

      color(key) {
        return {
          a: '#f00',
          b: '#0f0',
          c: '#00f'
        }[key];
      }

      transform() {
        return new Transform();
      }
    }
  };
});
export default moduleName;

