import angular from 'angular';

angular.module('shinsekai.ss-axis', []).directive('ssAxis', () => {
  return {
    restrict: 'A',
    template: `
      <line ng-if="axis.orient === 'left'" ssvg x1="0" y1="0" x2="0" ss-y2="axis.length" stroke="#000"/>
      <g ng-if="axis.orient === 'left'" ng-repeat="value in axis.values">
        <line ssvg x1="-10" ss-y1="axis.length - value" x2="0" ss-y2="axis.length - value" stroke="#000"/>
        <text ssvg x="-10" ss-y="axis.length - value" text-anchor="end">{{value}}</text>
      </g>
      <line ng-if="axis.orient === 'bottom'" ssvg x1="0" y1="0" ss-x2="axis.length" y2="0" stroke="#000"/>
      <g ng-if="axis.orient === 'bottom'" ng-repeat="value in axis.values">
        <line ssvg ss-x1="value" y1="0" ss-x2="value" y2="10" stroke="#000"/>
        <text ssvg ss-x="value" y="30" text-anchor="middle">{{value}}</text>
      </g>
    `,
    scope: {
    },
    bindToController: {
      orient: '=ssOrient',
      ticks: '=ssTicks',
      length: '=ssLength',
      xStart: '=ssXStart',
      xStop: '=ssXStop'
    },
    controllerAs: 'axis',
    controller: class AxisController {
      constructor() {
        this.values = [];
        for (let i = 0; i <= this.ticks; ++i) {
          this.values.push(i * (this.xStop - this.xStart) / this.ticks + this.xStart);
        }
      }
    }
  };
});

export default 'shinsekai.ss-axis';
