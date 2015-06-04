import angular from 'angular';
import shinsekai from '../../src';

const template = `
<div>
  <a href="http://www.city.kobe.lg.jp/information/data/statistics/toukei/sanren/index.html">平成17年 神戸市産業連関表</a>
</div>
<div>
  <svg ng-attr-width={{heatmap.width}} ng-attr-height={{heatmap.height}}>
    <g transform="translate(150,150)">
      <text
          text-anchor="begin"
          x="5"
          y="14"
          ss-transform="heatmap.transform(24 * $index, 0, -90)"
          ng-repeat="label in heatmap.data.keys">
        {{label}}
      </text>
    </g>
    <g transform="translate(150,150)">
      <text
          text-anchor="end"
          x="-5"
          y="14"
          ss-transform="heatmap.transform(0, 24 * $index)"
          ng-repeat="label in heatmap.data.keys">
        {{label}}
      </text>
    </g>
    <g transform="translate(150,150)">
      <g
          ss-transform="heatmap.transform(0, 24 * $index)"
          ng-repeat="row in heatmap.data.values">
        <rect
            width="20"
            height="20"
            ss-fill="heatmap.color(val)"
            ss-transform="heatmap.transform(24 * $index, 0)"
            ng-repeat="val in row track by $index"/>
      </g>
    </g>
  </svg>
</div>
`;

const moduleName = 'shinsekai-example.scatter-plot';

angular.module(moduleName, [shinsekai]);

angular.module(moduleName).factory('heatmapData', () => {
  const keys = [
    '農林業',
    '製造業',
    '建設',
    '電気・ガス・水道',
    '商業',
    '金融・保険',
    '不動産',
    '運輸',
    '情報通信',
    '公務',
    'サービス',
    'その他',
    '分類不明'
  ];
  const values = [
    [2730, 120467, 862, 0, 120, 0, 1, 1, 0, 16, 14635, 0, 0],
    [2944, 1042144, 181048, 26381, 38774, 18457, 2088, 91584, 20877, 28863, 359106, 1092, 5871],
    [56, 5879, 835, 7819, 4557, 1547, 24066, 7555, 1883, 4641, 10781, 13, 0],
    [201, 40898, 3723, 17511, 24789, 3445, 3814, 19562, 6955, 15283, 75634, 94, 1070],
    [691, 185634, 41098, 7248, 19241, 3569, 1055, 22280, 5859, 6283, 128517, 293, 973],
    [310, 39029, 8721, 6840, 61624, 63743, 50546, 40256, 10579, 1449, 54302, 313, 33322],
    [12, 6181, 1618, 1884, 30631, 8220, 6236, 37424, 9224, 384, 25487, 14, 190],
    [808, 80503, 33307, 9253, 57559, 11133, 2379, 103625, 10552, 12969, 58516, 1005, 2558],
    [72, 25492, 6902, 6674, 46105, 32758, 2531, 14176, 45754, 14961, 88579, 25, 1371],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15892],
    [415, 226131, 53315, 25832, 73092, 67812, 25202, 92622, 64273, 23537, 195894, 511, 5797],
    [0, 68288, 4137, 41263, 0, 0, 0, 1, 0, 7, 5505, 138, 18],
    [199, 10454, 4885, 1269, 6602, 1318, 3734, 6305, 7712, 141, 14382, 34, 0]
  ];
  return {keys, values};
});

angular.module(moduleName).directive('heatmap', (Scale) => {
  class LogScale extends Scale {
    domain(xMin, xMax) {
      return super.domain(Math.log(xMin + 1), Math.log(xMax + 1));
    }

    scale(x) {
      return super.scale(Math.log(x + 1));
    }
  }

  return {
    restrict: 'E',
    template: template,
    scope: {
    },
    controllerAs: 'heatmap',
    controller: class {
      constructor(heatmapData) {
        this.width = 600;
        this.height = 600;
        this.data = heatmapData;

        let minVal = Infinity,
            maxVal = -Infinity;
        for (const row of this.data.values) {
          for (const val of row) {
            minVal = Math.min(minVal, val);
            maxVal = Math.max(maxVal, val);
          }
        }

        this.colorScale = new LogScale()
          .domain(minVal, maxVal)
          .range(240, 0);
      }

      transform(x, y, rotate=0) {
        return `translate(${x},${y})rotate(${rotate})`;
      }

      color(val) {
        return `hsl(${this.colorScale.scale(val)},100%,50%)`;
      }
    }
  };
});

export default moduleName;
