import angular from 'angular';

angular.module('shinsekai', []);

angular.module('shinsekai').directive('ssAnimate', () => {
  return {
    restrict: 'A',
    scope: {
      end: '=ssEnd'
    },
    link: (scope, elementWrapper, attrs) => {
      const element = elementWrapper[0];
      element.addEventListener('endEvent', () => {
        scope.end(attrs.attributename);
      });
    }
  };
});

angular.module('shinsekai').directive('ssvg', ($window) => {
  const attributes = {
    circle: [
      'cx',
      'cy',
      'r',
      'fill',
      'opacity'
    ],
    rect: [
      'x',
      'y',
      'width',
      'height:',
      'fill',
      'opacity'
    ],
    line: [
      'x1',
      'y1',
      'x2',
      'y2',
      'fill',
      'stroke',
      'opacity'
    ],
    text: [
      'x',
      'y',
      'fill',
      'stroke',
      'opacity'
    ]
  };

  return {
    restrict: 'A',
    scope: {
      cx: '=ssCx',
      cy: '=ssCy',
      r: '=ssR',
      x: '=ssX',
      y: '=ssY',
      x1: '=ssX1',
      y1: '=ssY1',
      x2: '=ssX2',
      y2: '=ssY2',
      width: '=ssWidth',
      height: '=ssHeight',
      fill: '=ssFill',
      stroke: '=ssStroke',
      opacity: '=ssOpacity',
      dur: '=ssDur',
      delay: '=ssDelay'
    },
    template: `
      <animate ng-repeat="attr in attrs"
        ng-if="attr.from() !== attr.to()"
        ss-animate
        ss-end="onend"
        attributeName="{{::attr.name}}"
        ng-attr-dur="{{dur}}"
        ng-attr-from="{{attr.from()}}"
        ng-attr-to="{{attr.to()}}"
        ng-attr-begin="{{now() + delay}}"
        ng-attr-end="{{now() + delay + dur}}"
        fill="freeze"/>
    `,
    templateNamespace: 'svg',
    link: (scope, elementWrapper, attrs) => {
      const element = elementWrapper[0],
            svg = element.ownerSVGElement;

      scope.now = () => svg.getCurrentTime();
      scope.attrs = attributes[element.tagName].map((attrName) => {
        attrs.$set(attrName, scope[attrName]);
        scope[`${attrName}0`] = scope[attrName];
        return {
          name: attrName,
          from: () => scope[`${attrName}0`],
          to: () => scope[attrName]
        };
      });
      scope.onend = (attrName) => {
        scope.$apply(() => {
          attrs.$set(attrName, scope[attrName]);
          scope[`${attrName}0`] = scope[attrName];
        });
      };
    }
  };
});

export default 'shinsekai';
