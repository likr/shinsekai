import angular from 'angular';
import shinsekai from '../../src';

const template = `
<div>
  <form>
    <div class="form-group">
      <label>Label</label>
      <input class="form-control" ng-model="barChart.newLabel"/>
    </div>
    <div class="form-group">
      <label>Value</label>
      <input type="number" class="form-control" ng-model="barChart.newValue" min="0" max="100"/>
    </div>
  </form>
  <div>
    <button class="btn btn-default" ng-click="barChart.add()">Add</button>
    <button class="btn btn-default" ng-click="barChart.clear()">Clear</button>
  </div>
</div>
<div>
  <svg ng-attr-width="{{barChart.width + 100}}" ng-attr-height="{{barChart.height + 200}}">
    <g transform="translate(50,50)">
      <g
          ss-transform="barChart.transform().translate(30 * $index + 5, 0).toString()"
          ng-repeat="datum in barChart.data">
        <rect
            width="20"
            ss-y="barChart.yScale.scale(datum.value)"
            ss-y-enter="barChart.yScale.scale(0)"
            ss-height="barChart.yScale.scale(0) - barChart.yScale.scale(datum.value)"
            ss-height-enter="0"
            ss-fill="datum.color"
            ss-dur="0.3"/>
        <text
            text-anchor="end"
            ss-transform="barChart.transform().translate(20, barChart.yScale.scale(0) + 10).rotate(-60).toString()">
          {{datum.label}}
        </text>
      </g>
    </g>
    <g transform="translate(50,50)" ss-axis="'left'" ss-ticks="10" ss-scale="barChart.yScale"/>
    <g ss-transform="barChart.transform().translate(50, barChart.height + 50).toString()">
      <line
          x1="0"
          y1="0"
          y2="0"
          stroke="#000"
          ss-x2="barChart.width"/>
    </g>
  </svg>
</div>
`;

const moduleName = 'shinsekai-example.bar-chart';

angular.module(moduleName, [shinsekai]);

angular.module(moduleName).directive('barChart', (Transform, Scale) => {
  const height = 500,
        width = 800,
        initialLabel = 'label',
        initialValue = 50;
  return {
    restrict: 'E',
    template: template,
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

      transform() {
        return new Transform();
      }
    }
  };
});
export default moduleName;

