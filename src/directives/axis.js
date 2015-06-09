import angular from 'angular';

const template = `
<line
    stroke="#000"
    ss-x1="axis.orient === 'left' ? 0 : axis.scale.yMin"
    ss-y1="axis.orient === 'left' ? axis.scale.yMin : 0"
    ss-x2="axis.orient === 'left' ? 0 : axis.scale.yMax"
    ss-y2="axis.orient === 'left' ? axis.scale.yMax : 0"/>
<g
    ss-transform="axis.transform(tick.y)"
    ss-dur="axis.duration"
    ss-delay="axis.delay"
    ng-repeat="tick in axis.values track by $index">
  <line
      y1="0"
      x2="0"
      stroke="#000"
      ss-x1="axis.orient === 'left' ? -10 : 0"
      ss-y2="axis.orient === 'left' ? 0 : 10"/>
  <text
      ng-attr-text-anchor="{{axis.orient === 'left' ? 'end' : 'middle'}}"
      ss-x="axis.orient === 'left' ? -10 : 0"
      ss-y="axis.orient === 'left' ? 0 : 30">
    {{axis.format(tick.x)}}
  </text>
</g>
`;

angular.module('shinsekai.ss-axis', []).directive('ssAxis', ['$rootScope', ($rootScope) => {
  return {
    restrict: 'A',
    template: template,
    scope: {
    },
    bindToController: {
      orient: '=ssAxis',
      ticks: '=ssTicks',
      scale: '=ssScale',
      format: '=ssFormat',
      delay: '=ssDelay',
      duration: '=ssDur'
    },
    controllerAs: 'axis',
    controller: class AxisController {
      constructor() {
        if (this.format == null) {
          this.format = (x) => x;
        }

        $rootScope.$watch(() => this.ticks, () => {
          this.values = new Array(this.ticks);
          for (let i = 0; i <= this.ticks; ++i) {
            const x = (this.scale.xMax - this.scale.xMin) * i / this.ticks + this.scale.xMin,
                  y = this.scale.scale(x);
            this.values[i] = {x, y};
          }
        });
      }

      transform(y) {
        return this.orient === 'left' ? `translate(0,${y})` : `translate(${y},0)`;
      }
    }
  };
}]);

export default 'shinsekai.ss-axis';
