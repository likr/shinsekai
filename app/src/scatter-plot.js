import angular from 'angular';
import shinsekai from '../../src';

const template = `
<div>
  <form>
    <div class="form-group">
      <label>X Variable</label>
      <div>
        <label class="radio-inline" ng-repeat="variable in scatterPlot.variables">
          <input type="radio" ng-model="scatterPlot.xVariable" ng-change="scatterPlot.updateXVariable()" value="{{variable}}"/> {{variable}}
        </label>
      </div>
    </div>
    <div class="form-group">
      <label>Y Variable</label>
      <div>
        <label class="radio-inline" ng-repeat="variable in scatterPlot.variables">
          <input type="radio" ng-model="scatterPlot.yVariable" ng-change="scatterPlot.updateYVariable()" value="{{variable}}"/> {{variable}}
        </label>
      </div>
    </div>
    <div class="form-group">
      <label>X Ticks</label>
      <input type="number" class="form-control" ng-model="scatterPlot.xTicks" min="1" max="15"/>
    </div>
    <div class="form-group">
      <label>Y Ticks</label>
      <input type="number" class="form-control" ng-model="scatterPlot.yTicks" min="1" max="15"/>
    </div>
  </form>
</div>
<div>
  <svg ng-attr-width="{{scatterPlot.width + 100}}" ng-attr-height="{{scatterPlot.height + 100}}">
    <g transform="translate(50,550)"
        ss-axis="'bottom'"
        ss-ticks="scatterPlot.xTicks"
        ss-scale="scatterPlot.xScale"
        ss-format="scatterPlot.labelFormat"
        ss-dur="0.3"/>
    <g transform="translate(50,50)"
        ss-axis="'left'"
        ss-ticks="scatterPlot.yTicks"
        ss-scale="scatterPlot.yScale"
        ss-format="scatterPlot.labelFormat"
        ss-dur="0.3"/>
    <g transform="translate(50,50)">
      <circle
          r="5"
          ss-cx="scatterPlot.xScale.scale(datum[scatterPlot.xVariable])"
          ss-cy="scatterPlot.yScale.scale(datum[scatterPlot.yVariable])"
          ss-fill="scatterPlot.color(datum.species)"
          ss-dur="0.3"
          ng-repeat="datum in scatterPlot.data"/>
    </g>
  </svg>
</div>
`;

const moduleName = 'shinsekai-example.scatter-plot';

angular.module(moduleName, [shinsekai]);

angular.module(moduleName).directive('scatterPlot', (Transform, Scale) => {
  const width = 500,
        height = 500;

  return {
    restrict: 'E',
    template: template,
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
