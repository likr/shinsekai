import angular from 'angular';
import shinsekai from '../../src';

const rootTemplate = `
<div>
  <div ng-repeat="d in pieChart.data">
    <label>
      <input type="checkbox" ng-model="pieChart.show[d.label]"> {{d.label}}
    </label>
  </div>
</div>
<div>
  <svg ng-attr-width="{{pieChart.width}}" ng-attr-height="{{pieChart.height}}">
    <g chart data="pieChart.filteredData" r="pieChart.r"/>
  </svg>
</div>
`;

const chartTemplate = `
<g ss-transform="chart.chartTransform">
  <g ng-repeat="d in chart.data">
    <path
        ss-d="chart.d(d)"
        ss-transform="chart.rotate(d)"
        ss-fill="d.color"/>
  </g>
</g>
<g ss-transform="chart.legendTransform">
  <g
      ss-transform="chart.legendItemTransform($index)"
      ss-transform-enter="'translate(0,0)'"
      ss-dur="0.3"
      ss-delay="0.3"
      ng-repeat="d in chart.data">
    <rect
        width="10"
        height="10"
        ss-fill="d.color"/>
    <text x="20" y="10">
      {{d.label}}
    </text>
  </g>
</g>
`;

const moduleName = 'shinsekai-example.pie-chart';

angular.module(moduleName, [shinsekai]);

angular.module(moduleName).factory('pieChartData', () => {
  const n = 4,
        data = [];
  for (let i = 0; i < n; ++i) {
    data.push({
      label: `Data${i}`,
      value: [60, 10, 10, 10][i],
      color: `hsl(${360 * i / n},100%,50%)`
    });
  }
  return data;
});

angular.module(moduleName).directive('chart', ($rootScope, Path) => {
  return {
    restrict: 'A',
    template: chartTemplate,
    scope: {
    },
    bindToController: {
      data: '=',
      r: '='
    },
    controllerAs: 'chart',
    controller: class {
      constructor() {
        this.chartTransform = `translate(${this.r},${this.r})`;
        this.legendTransform = `translate(${2 * this.r + 10},10)`;
        this.rotates = {};
        this.shapes = {};

        $rootScope.$watchCollection(() => this.data, () => {
          const {data, r} = this;
          let sum = 0;
          for (const d of data) {
            sum += d.value;
          }
          sum *= 1.0001;

          let theta = -Math.PI / 2;
          data.forEach((d) => {
            const angle = 2 * Math.PI * d.value / sum;
            this.shapes[d.label] = new Path(r * Math.cos(angle), r * Math.sin(angle))
              .arc(r, r, 0, d.value > sum / 2 ? 1 : 0, 0, r, 0)
              .lineTo(0, 0)
              .close()
              .toString();
            this.rotates[d.label] = theta * 180 / Math.PI;
            theta += angle;
          });
        });
      }

      d(d) {
        return this.shapes[d.label];
      }

      rotate(d) {
        return `rotate(${this.rotates[d.label] || 0})`;
      }

      legendItemTransform(i) {
        return `translate(0,${20 * i})`;
      }
    }
  };
});

angular.module(moduleName).directive('pieChart', ($rootScope, pieChartData) => {
  const r = 100,
        height = 2 * r,
        width = 2 * r + 200;
  return {
    restrict: 'E',
    template: rootTemplate,
    scope: {
    },
    controllerAs: 'pieChart',
    controller: class {
      constructor($scope) {
        this.height = height;
        this.width = width;
        this.r = r;
        this.data = pieChartData;
        this.filteredData = [];
        this.show = {};
        for (const d of pieChartData) {
          this.show[d.label] = true;
        }

        $rootScope.$watchCollection(() => this.show, () => {
          this.filteredData = pieChartData.filter((d) => this.show[d.label]);
        });
      }
    }
  };
});

export default moduleName;
