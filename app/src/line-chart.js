import angular from 'angular';
import shinsekai from '../../src';

const template = `
<svg ng-attr-width="{{lineChart.width + 100}}" ng-attr-height="{{lineChart.height + 100}}">
  <g ss-transform="lineChart.transform().translate(50,550).toString()"
      ss-axis="'bottom'"
      ss-ticks="20"
      ss-scale="lineChart.xScale"
      ss-format="lineChart.xLabelFormat"/>
  <g transform="translate(50,50)"
      ss-axis="'left'"
      ss-ticks="10"
      ss-scale="lineChart.yScale"
      ss-format="lineChart.yLabelFormat"/>
  <g transform="translate(50,50)">
    <g ng-repeat="variable in lineChart.variables">
      <circle
          r="5"
          ss-cx="lineChart.xScale.scale($index)"
          ss-cy="lineChart.yScale.scale(datum[variable])"
          ss-cy-enter="lineChart.yScale.scale(0)"
          ss-fill="lineChart.color(variable)"
          ss-dur="0.1"
          ng-repeat="datum in lineChart.data"/>
      <path
          fill="none"
          ss-stroke="lineChart.color(variable)"
          ss-d="lineChart.path(variable)"
          ss-d-update="lineChart.pathEnter(variable)"
          ss-dur="0.1"
          />
    </g>
  </g>
</svg>
`;

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
    template: template,
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
