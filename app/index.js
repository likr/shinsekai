import angular from 'angular';
import shinsekai from '../src';

angular.module('hoge', [shinsekai]);

angular.module('hoge').constant('size', 100);
angular.module('hoge').constant('width', 800);
angular.module('hoge').constant('height', 800);
angular.module('hoge').constant('delay', 2000);
angular.module('hoge').constant('count', Infinity);

angular.module('hoge').factory('circles', ($interval, size, delay, count) => {
  const n = 10,
        circles = [];
  for (let i = 0; i < n; ++i) {
    circles.push({
      x: size / 2,
      y: size / 2,
      r: 5,
      color: '#000',
      strokeColor: '#000',
      opacity: 0.5,
      duration: 1,
      delay: 0
    });
  }

  $interval(() => {
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

angular.module('hoge').factory('ellipses', ($interval, size, delay, count) => {
  const n = 10,
        ellipses = [];
  for (let i = 0; i < n; ++i) {
    ellipses.push({
      x: size / 2,
      y: size / 2,
      rx: 5,
      ry: 5,
      color: '#000',
      strokeColor: '#000',
      opacity: 0.5,
      duration: 1,
      delay: 0
    });
  }

  $interval(() => {
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

angular.module('hoge').factory('rects', ($interval, size, delay, count) => {
  const n = 10,
        rects = [];
  for (let i = 0; i < n; ++i) {
    rects.push({
      x: size / 2,
      y: size / 2,
      width: 5,
      height: 5,
      color: '#000',
      strokeColor: '#000',
      opacity: 0.5,
      duration: 1,
      delay: 0
    });
  }

  $interval(() => {
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

angular.module('hoge').factory('texts', ($interval, size, delay, count) => {
  const n = 10,
        texts = [];
  for (let i = 0; i < n; ++i) {
    texts.push({
      text: 'imai',
      x: size / 2,
      y: size / 2,
      color: '#000',
      opacity: 0.5,
      duration: 1,
      delay: 0
    });
  }

  $interval(() => {
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

angular.module('hoge').factory('lines', ($interval, size, delay, count) => {
  const n = 10,
        lines = [];
  for (let i = 0; i < n; ++i) {
    lines.push({
      x1: size / 2,
      y1: size / 2,
      x2: size / 2,
      y2: size / 2,
      color: '#000',
      opacity: 0.5,
      duration: 1,
      delay: 0
    });
  }

  $interval(() => {
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

angular.module('hoge').factory('paths', ($interval, size, delay, count) => {
  const n = 5,
        paths = [];
  for (let i = 0; i < n; ++i) {
    paths.push({
      points: [],
      color: '#000',
      opacity: 0.5,
      duration: 1,
      delay: 0
    });
    for (let j = 0; j < 3; ++j) {
      paths[i].points.push([size / 2, size / 2]);
    }
  }

  $interval(() => {
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

angular.module('hoge').factory('polygons', ($interval, size, delay, count) => {
  const n = 5,
        polygons = [];
  for (let i = 0; i < n; ++i) {
    polygons.push({
      points: [],
      color: '#000',
      opacity: 0.5,
      duration: 1,
      delay: 0
    });
    for (let j = 0; j < i + 3; ++j) {
      polygons[i].points.push([size / 2, size / 2]);
    }
  }

  $interval(() => {
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

angular.module('hoge').factory('polylines', ($interval, size, delay, count) => {
  const n = 5,
        polylines = [];
  for (let i = 0; i < n; ++i) {
    polylines.push({
      points: [],
      color: '#000',
      opacity: 0.5,
      duration: 1,
      delay: 0
    });
    for (let j = 0; j < i + 3; ++j) {
      polylines[i].points.push([size / 2, size / 2]);
    }
  }

  $interval(() => {
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

angular.module('hoge').directive('main', (Path, Scale) => {
  return {
    restrict: 'E',
    templateUrl: 'main.html',
    scope: {
    },
    controllerAs: 'main',
    controller: class {
      constructor(size, width, height, circles, ellipses, rects, lines, texts, paths, polygons, polylines) {
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
        const path = new Path(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; ++i) {
          path.lineTo(points[i][0], points[i][1]);
        }
        return path.close().toString();
      }

      points(points) {
        return points.map(p => `${this.xScale.scale(p[0])},${this.yScale.scale(p[1])}`).join(' ');
      }
    }
  };
});
