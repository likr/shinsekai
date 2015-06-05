import angular from 'angular';
import shinsekai from '../../src';

const template = `
<svg ng-attr-width="{{random.width + 100}}" ng-attr-height="{{random.height + 100}}">
  <g transform="translate(50,50)">
    <circle
        ss-cx="random.xScale.scale(circle.x)"
        ss-cy="random.yScale.scale(circle.y)"
        ss-r="circle.r"
        ss-fill="circle.color"
        ss-stroke="circle.strokeColor"
        ss-opacity="circle.opacity"
        ss-cx-enter="random.xScale.scale(0)"
        ss-cy-enter="random.yScale.scale(0)"
        ss-r-enter="5"
        ss-fill-enter="'#000'"
        ss-stroke-enter="'#000'"
        ss-opacity-enter="1"
        ss-dur="circle.duration"
        ss-delay="circle.delay"
        ng-repeat="circle in random.circles"/>
    <ellipse
        ss-cx="random.xScale.scale(ellipse.x)"
        ss-cy="random.yScale.scale(ellipse.y)"
        ss-rx="ellipse.rx"
        ss-ry="ellipse.ry"
        ss-fill="ellipse.color"
        ss-stroke="ellipse.strokeColor"
        ss-opacity="ellipse.opacity"
        ss-cx-enter="random.xScale.scale(0)"
        ss-cy-enter="random.yScale.scale(0)"
        ss-rx-enter="5"
        ss-ry-enter="5"
        ss-fill-enter="'#000'"
        ss-stroke-enter="'#000'"
        ss-opacity-enter="1"
        ss-dur="ellipse.duration"
        ss-delay="ellipse.delay"
        ng-repeat="ellipse in random.ellipses"/>
    <rect
        ss-x="random.xScale.scale(rect.x)"
        ss-y="random.yScale.scale(rect.y)"
        ss-width="rect.width"
        ss-height="rect.height"
        ss-fill="rect.color"
        ss-stroke="rect.strokeColor"
        ss-opacity="rect.opacity"
        ss-x-enter="random.xScale.scale(0)"
        ss-y-enter="random.yScale.scale(0)"
        ss-width-enter="10"
        ss-height-enter="10"
        ss-fill-enter="'#000'"
        ss-stroke-enter="'#000'"
        ss-opacity-enter="1"
        ss-dur="rect.duration"
        ss-delay="rect.delay"
        ng-repeat="rect in random.rects"/>
    <line
        ss-x1="random.xScale.scale(line.x1)"
        ss-y1="random.yScale.scale(line.y1)"
        ss-x2="random.xScale.scale(line.x2)"
        ss-y2="random.yScale.scale(line.y2)"
        ss-stroke="line.color"
        ss-opacity="line.opacity"
        ss-x1-enter="random.xScale.scale(0)"
        ss-y1-enter="random.yScale.scale(0)"
        ss-x2-enter="random.xScale.scale(0)"
        ss-y2-enter="random.yScale.scale(0)"
        ss-stroke-enter="'#000'"
        ss-opacity-enter="1"
        ss-dur="line.duration"
        ss-delay="line.delay"
        ng-repeat="line in random.lines"/>
    <text
        ss-x="random.xScale.scale(text.x)"
        ss-y="random.yScale.scale(text.y)"
        ss-fill="text.color"
        ss-opacity="text.opacity"
        ss-x-enter="random.xScale.scale(0)"
        ss-y-enter="random.yScale.scale(0)"
        ss-fill-enter="'#000'"
        ss-opacity-enter="1"
        ss-dur="text.duration"
        ss-delay="text.delay"
        ng-repeat="text in random.texts">
      {{text.text}}
    </text>
    <path
        fill="none"
        ss-d="random.path(path.points)"
        ss-stroke="path.color"
        ss-opacity="path.opacity"
        ss-d-enter="random.initialPath(path.points)"
        ss-stroke-enter="'#000'"
        ss-opacity-enter="1"
        ss-dur="path.duration"
        ss-delay="path.delay"
        ng-repeat="path in random.paths"/>
    <polygon
        fill="none"
        ss-points="random.points(polygon.points)"
        ss-stroke="polygon.color"
        ss-opacity="polygon.opacity"
        ss-points-enter="random.initialPoints(polygon.points)"
        ss-stroke-enter="'#000'"
        ss-opacity-enter="1"
        ss-dur="polygon.duration"
        ss-delay="polygon.delay"
        ng-repeat="polygon in random.polygons"/>
    <polyline
        fill="none"
        ss-points="random.points(polyline.points)"
        ss-stroke="polyline.color"
        ss-opacity="polyline.opacity"
        ss-points-enter="random.initialPoints(polyline.points)"
        ss-stroke-enter="'#000'"
        ss-opacity-enter="1"
        ss-dur="polyline.duration"
        ss-delay="polyline.delay"
        ng-repeat="polyline in random.polylines"/>
  </g>
  <g transform="translate(50,850)" ss-axis="'bottom'" ss-ticks="10" ss-scale="random.xScale"/>
  <g transform="translate(50,50)" ss-axis="'left'" ss-ticks="10" ss-scale="random.yScale"/>
</svg>
`;

const moduleName = 'shinsekai-example.random';

angular.module(moduleName, [shinsekai]);

angular.module(moduleName).constant('size', 100);
angular.module(moduleName).constant('width', 800);
angular.module(moduleName).constant('height', 800);
angular.module(moduleName).constant('delay', 2000);
angular.module(moduleName).constant('count', Infinity);

angular.module(moduleName).factory('circles', ($interval, size, delay, count) => {
  const n = 10,
        circles = [];
  $interval(() => {
    if (circles.length < n) {
      circles.push({});
    }
    for (const circle of circles) {
      circle.x = Math.random() * size;
      circle.y = Math.random() * size;
      circle.r = Math.random() * 9 + 1;
      circle.color = `hsl(${Math.random() * 360},100%,50%)`;
      circle.strokeColor = `hsl(${Math.random() * 360},100%,50%)`;
      circle.opacity = Math.random();
      circle.duration = Math.random() + 0.5;
      circle.delay = Math.random() * 0.5;
    }
  }, delay, count);
  return circles;
});

angular.module(moduleName).factory('ellipses', ($interval, size, delay, count) => {
  const n = 10,
        ellipses = [];
  $interval(() => {
    if (ellipses.length < n) {
      ellipses.push({});
    }
    for (const ellipse of ellipses) {
      ellipse.x = Math.random() * size;
      ellipse.y = Math.random() * size;
      ellipse.rx = Math.random() * 9 + 1;
      ellipse.ry = Math.random() * 9 + 1;
      ellipse.color = `hsl(${Math.random() * 360},100%,50%)`;
      ellipse.strokeColor = `hsl(${Math.random() * 360},100%,50%)`;
      ellipse.opacity = Math.random();
      ellipse.duration = Math.random() + 0.5;
      ellipse.delay = Math.random() * 0.5;
    }
  }, delay, count);
  return ellipses;
});

angular.module(moduleName).factory('rects', ($interval, size, delay, count) => {
  const n = 10,
        rects = [];
  $interval(() => {
    if (rects.length < n) {
      rects.push({});
    }
    for (const rect of rects) {
      rect.x = Math.random() * size;
      rect.y = Math.random() * size;
      rect.width = Math.random() * 15 + 5;
      rect.height = Math.random() * 15 + 5;
      rect.color = `hsl(${Math.random() * 360},100%,50%)`;
      rect.strokeColor = `hsl(${Math.random() * 360},100%,50%)`;
      rect.opacity = Math.random();
      rect.duration = Math.random() + 0.5;
      rect.delay = Math.random() * 0.5;
    }
  }, delay, count);
  return rects;
});

angular.module(moduleName).factory('texts', ($interval, size, delay, count) => {
  const n = 10,
        texts = [];
  $interval(() => {
    if (texts.length < n) {
      texts.push({
        text: 'imai'
      });
    }
    for (const text of texts) {
      text.x = Math.random() * size;
      text.y = Math.random() * size;
      text.color = `hsl(${Math.random() * 360},100%,50%)`;
      text.opacity = Math.random();
      text.duration = Math.random() + 0.5;
      text.delay = Math.random() * 0.5;
    }
  }, delay, count);
  return texts;
});

angular.module(moduleName).factory('lines', ($interval, size, delay, count) => {
  const n = 10,
        lines = [];
  $interval(() => {
    if (lines.length < n) {
      lines.push({});
    }
    for (const line of lines) {
      line.x1 = Math.random() * size;
      line.y1 = Math.random() * size;
      line.x2 = Math.random() * size;
      line.y2 = Math.random() * size;
      line.color = `hsl(${Math.random() * 360},100%,50%)`;
      line.opacity = Math.random();
      line.duration = Math.random() + 0.5;
      line.delay = Math.random() * 0.5;
    }
  }, delay, count);
  return lines;
});

angular.module(moduleName).factory('paths', ($interval, size, delay, count) => {
  const n = 5,
        paths = [];
  $interval(() => {
    if (paths.length < n) {
      const points = [];
      for (let j = 0; j < 3; ++j) {
        points.push([size / 2, size / 2]);
      }
      paths.push({
        points: points
      });
    }
    for (const path of paths) {
      for (const point of path.points) {
        point[0] = Math.random() * size;
        point[1] = Math.random() * size;
      }
      path.color = `hsl(${Math.random() * 360},100%,50%)`;
      path.opacity = Math.random();
      path.duration = Math.random() + 0.5;
      path.delay = Math.random() * 0.5;
    }
  }, delay, count);
  return paths;
});

angular.module(moduleName).factory('polygons', ($interval, size, delay, count) => {
  const n = 5,
        polygons = [];
  $interval(() => {
    if (polygons.length < n) {
      const points = [];
      for (let j = 0; j < polygons.length + 3; ++j) {
        points.push([size / 2, size / 2]);
      }
      polygons.push({
        points: points
      });
    }
    for (const polygon of polygons) {
      for (const point of polygon.points) {
        point[0] = Math.random() * size;
        point[1] = Math.random() * size;
      }
      polygon.color = `hsl(${Math.random() * 360},100%,50%)`;
      polygon.opacity = Math.random();
      polygon.duration = Math.random() + 0.5;
      polygon.delay = Math.random() * 0.5;
    }
  }, delay, count);
  return polygons;
});

angular.module(moduleName).factory('polylines', ($interval, size, delay, count) => {
  const n = 5,
        polylines = [];
  $interval(() => {
    if (polylines.length < n) {
      const points = [];
      for (let j = 0; j < polylines.length + 3; ++j) {
        points.push([size / 2, size / 2]);
      }
      polylines.push({
        points: points
      });
    }
    for (const polyline of polylines) {
      for (const point of polyline.points) {
        point[0] = Math.random() * size;
        point[1] = Math.random() * size;
      }
      polyline.color = `hsl(${Math.random() * 360},100%,50%)`;
      polyline.opacity = Math.random();
      polyline.duration = Math.random() + 0.5;
      polyline.delay = Math.random() * 0.5;
    }
  }, delay, count);
  return polylines;
});

angular.module(moduleName).directive('random', (Path, Scale) => {
  return {
    restrict: 'E',
    template: template,
    scope: {
    },
    controllerAs: 'random',
    controller: class {
      constructor(size, width, height, circles, ellipses, rects, lines, texts, paths, polygons, polylines) {
        this.size = size;
        this.width = width;
        this.height = height;
        this.circles = circles;
        this.ellipses = ellipses;
        this.rects = rects;
        this.lines = lines;
        this.texts = texts;
        this.paths = paths;
        this.polygons = polygons;
        this.polylines = polylines;
        this.xScale = new Scale()
          .domain(0, size)
          .range(0, width);
        this.yScale = new Scale()
          .domain(0, size)
          .range(height, 0);
      }

      path(points) {
        const path = new Path(this.xScale.scale(points[0][0]), this.yScale.scale(points[0][1]));
        for (let i = 1; i < points.length; ++i) {
          path.lineTo(this.xScale.scale(points[i][0]), this.yScale.scale(points[i][1]));
        }
        return path.close().toString();
      }

      points(points) {
        return points.map(p => `${this.xScale.scale(p[0])},${this.yScale.scale(p[1])}`).join(' ');
      }

      initialPath(points) {
        return this.path(points.map(() => [0, 0]));
      }

      initialPoints(points) {
        return this.points(points.map(() => [0, 0]));
      }
    }
  };
});

export default moduleName;
