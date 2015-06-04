import angular from 'angular';

const template = `
<line
    stroke="#000"
    ss-x1="axis.orient === 'left' ? 0 : axis.scale.yMin"
    ss-y1="axis.orient === 'left' ? axis.scale.yMin : 0"
    ss-x2="axis.orient === 'left' ? 0 : axis.scale.yMax"
    ss-y2="axis.orient === 'left' ? axis.scale.yMax : 0"/>
<g
    ss-transform="axis.transform(i)"
    ss-dur="axis.duration"
    ss-delay="axis.delay"
    ng-repeat="i in axis.indices">
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
    {{axis.format(axis.x(i))}}
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
          const indices = [];
          for (let i = 0; i <= this.ticks; ++i) {
            indices.push(i);
          }
          this.indices = indices;
        });
      }

      x(i) {
        return (this.scale.xMax - this.scale.xMin) * i / this.ticks + this.scale.xMin;
      }

      y(i) {
        return this.scale.scale(this.x(i));
      }

      transform(i) {
        return this.orient === 'left'
          ? `translate(0,${this.y(i)})`
          : `translate(${this.y(i)},0)`;
      }
    }
  };
}]);

export default 'shinsekai.ss-axis';
