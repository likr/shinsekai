import angular from 'angular';
import shinsekai from '../../src';

const template = `
<div>
  <form>
    <div class="form-group">
      <label>n</label>
      <input class="form-control" type="number" min="0" step="50" ng-model="points.n"/>
    </div>
    <button class="btn btn-default" ng-click="points.run()">Run</button>
  </form>
</div>
<div>
  <svg ng-attr-width="{{::points.width}}" ng-attr-height="{{::points.height}}">
    <circle
      ss-cx="point.x"
      ss-cy="point.y"
      ss-r="::point.r"
      ss-fill="::point.color"
      ss-dur="::1"
      ng-repeat="point in points.data"/>
  </svg>
</div>
`;

const moduleName = 'shinsekai-example.points';

angular.module(moduleName, [shinsekai]);

angular.module(moduleName).directive('points', ($interval) => {
  return {
    restrict: 'E',
    template: template,
    scope: {
    },
    controllerAs: 'points',
    controller: class {
      constructor() {
        this.width = 800;
        this.height = 800;
        this.n = 500;
        this.data = [];
      }

      run() {
        if (this.currentLoop) {
          $interval.cancel(this.currentLoop);
        }
        const {width, height, n} = this;
        this.data = new Array(n);
        for (let i = 0; i < n; ++i) {
          this.data[i] = {
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 10,
            color: `hsl(${Math.random() * 360},100%,50%)`
          };
        }
        this.currentLoop = $interval(() => {
          for (const point of this.data) {
            point.x = Math.random() * width;
            point.y = Math.random() * height;
          }
        }, 1000);
      }
    }
  };
});

export default moduleName;
