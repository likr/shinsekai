import angular from 'angular';

angular.module('shinsekai.ss-axis', []).directive('ssAxis', () => {
  return {
    restrict: 'A',
    template: `
      <line stroke="#000" ssvg
          ss-x1="axis.orient === 'left' ? 0 : axis.scale.yMin"
          ss-y1="axis.orient === 'left' ? axis.scale.yMin : 0"
          ss-x2="axis.orient === 'left' ? 0 : axis.scale.yMax"
          ss-y2="axis.orient === 'left' ? axis.scale.yMax : 0"/>
      <g ng-repeat="value in axis.values">
        <line stroke="#000" ssvg
            ss-x1="axis.orient === 'left' ? -10 : value.y"
            ss-y1="axis.orient === 'left' ? value.y : 0"
            ss-x2="axis.orient === 'left' ? 0 : value.y"
            ss-y2="axis.orient === 'left' ? value.y : 10"/>
        <text ng-attr-text-anchor="{{axis.orient === 'left' ? 'end' : 'middle'}}" ssvg
            ss-x="axis.orient === 'left' ? -10 : value.y"
            ss-y="axis.orient === 'left' ? value.y : 30">
          {{value.x}}
        </text>
      </g>
    `,
    scope: {
    },
    bindToController: {
      orient: '=ssAxis',
      ticks: '=ssTicks',
      scale: '=ssScale'
    },
    controllerAs: 'axis',
    controller: class AxisController {
      constructor($attrs) {
        this.values = [];
        for (let i = 0; i <= this.ticks; ++i) {
          const x = (this.scale.xMax - this.scale.xMin) * i / this.ticks;
          this.values.push({
            x: x,
            y: this.scale.scale(x)
          });
        }
      }
    }
  };
});

export default 'shinsekai.ss-axis';
