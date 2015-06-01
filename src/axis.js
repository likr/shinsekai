import angular from 'angular';

angular.module('shinsekai.ss-axis', []).directive('ssAxis', [() => {
  return {
    restrict: 'A',
    template: `
      <line
          stroke="#000"
          ssvg
          ss-x1="axis.orient === 'left' ? 0 : axis.scale.yMin"
          ss-y1="axis.orient === 'left' ? axis.scale.yMin : 0"
          ss-x2="axis.orient === 'left' ? 0 : axis.scale.yMax"
          ss-y2="axis.orient === 'left' ? axis.scale.yMax : 0"/>
      <g ng-repeat="i in axis.indices">
        <line
            stroke="#000"
            ssvg
            ss-x1="axis.orient === 'left' ? -10 : axis.y(i)"
            ss-y1="axis.orient === 'left' ? axis.y(i) : 0"
            ss-x2="axis.orient === 'left' ? 0 : axis.y(i)"
            ss-y2="axis.orient === 'left' ? axis.y(i) : 10"/>
        <text
            ng-attr-text-anchor="{{axis.orient === 'left' ? 'end' : 'middle'}}"
            ssvg
            ss-x="axis.orient === 'left' ? -10 : axis.y(i)"
            ss-y="axis.orient === 'left' ? axis.y(i) : 30">
          {{axis.format(axis.x(i))}}
        </text>
      </g>
    `,
    scope: {
    },
    bindToController: {
      orient: '=ssAxis',
      ticks: '=ssTicks',
      scale: '=ssScale',
      format: '=ssFormat'
    },
    controllerAs: 'axis',
    controller: class AxisController {
      constructor() {
        if (this.format == null) {
          this.format = (x) => x;
        }

        this.indices = [];
        for (let i = 0; i <= this.ticks; ++i) {
          this.indices.push(i);
        }
      }

      x(i) {
        return (this.scale.xMax - this.scale.xMin) * i / this.ticks + this.scale.xMin;
      }

      y(i) {
        return this.scale.scale(this.x(i));
      }
    }
  };
}]);

export default 'shinsekai.ss-axis';
