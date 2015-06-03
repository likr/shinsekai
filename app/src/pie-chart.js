import angular from 'angular';
import shinsekai from '../../src';

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
    template: `
      <g ng-attr-transform="translate({{2 * chart.r + 10}},10)">
        <g ng-repeat="d in chart.data">
          <rect
              width="10"
              height="10"
              ss-y="$index * 20"
              ss-y-enter="0"
              ss-fill="d.color"
              ss-dur="0.3"
              ss-delay="0.3"/>
          <text
              x="20"
              ss-y="$index * 20 + 10"
              ss-y-enter="10"
              ss-dur="0.3"
              ss-delay="0.3">
            {{d.label}}
          </text>
        </g>
      </g>
      <g ng-repeat="d in chart.data">
        <path
            ss-d="chart.shapes[d.label]"
            ss-fill="d.color"/>
      </g>
    `,
    scope: {
    },
    bindToController: {
      data: '=',
      r: '='
    },
    controllerAs: 'chart',
    controller: class {
      constructor() {
        this.shapes = {};

        $rootScope.$watchCollection(() => this.data, () => {
          const {data, r} = this;
          let sum = 0;
          for (const d of data) {
            sum += d.value;
          }
          sum *= 1.0001;

          let angle = -Math.PI / 2;
          data.forEach((d) => {
            const xO = r,
                  yO = r,
                  theta = angle + 2 * Math.PI * d.value / sum;
            this.shapes[d.label] = new Path(r * Math.cos(theta) + xO, r * Math.sin(theta) + yO)
              .arc(r, r, 0,
                d.value > sum / 2 ? 1 : 0, 0,
                r * Math.cos(angle) + xO,
                r * Math.sin(angle) + yO)
              .lineTo(xO, yO)
              .close()
              .toString();
            angle = theta;
          });
        });
      }

      shape(d) {
        return this.shapes[d.label];
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
    templateUrl: 'components/pie-chart.html',
    scope: {
    },
    controllerAs: 'pieChart',
    controller: class {
      constructor($scope) {
        this.height = height;
        this.width = width;
        this.r = r;
        this.allData = pieChartData;
        this.filteredData = [];
        this.show = {};
        for (const d of pieChartData) {
          this.show[d.label] = true;
        }

        $rootScope.$watchCollection(() => this.show, () => {
          this.filteredData = pieChartData.filter((d) => this.show[d.label]);
        });
      }

      data() {
        return this.filteredData;
      }
    }
  };
});

export default moduleName;
