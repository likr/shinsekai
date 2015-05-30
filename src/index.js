import angular from 'angular';
import shinsekai from './shinsekai';
import Path from './path';

angular.module('hoge', [shinsekai]);

angular.module('hoge').constant('width', 500);
angular.module('hoge').constant('height', 500);
angular.module('hoge').constant('delay', 2000);
angular.module('hoge').constant('count', Infinity);

angular.module('hoge').factory('circles', ($interval, width, height, delay, count) => {
  const n = 10,
        circles = [];
  for (let i = 0; i < n; ++i) {
    circles.push({
      x: width / 2,
      y: height / 2,
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
      circle.x = Math.random() * width;
      circle.y = Math.random() * height;
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

angular.module('hoge').factory('ellipses', ($interval, width, height, delay, count) => {
  const n = 10,
        ellipses = [];
  for (let i = 0; i < n; ++i) {
    ellipses.push({
      x: width / 2,
      y: height / 2,
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
      ellipse.x = Math.random() * width;
      ellipse.y = Math.random() * height;
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

angular.module('hoge').factory('rects', ($interval, width, height, delay, count) => {
  const n = 10,
        rects = [];
  for (let i = 0; i < n; ++i) {
    rects.push({
      x: width / 2,
      y: height / 2,
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
      rect.x = Math.random() * width;
      rect.y = Math.random() * height;
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

angular.module('hoge').factory('texts', ($interval, width, height, delay, count) => {
  const n = 10,
        texts = [];
  for (let i = 0; i < n; ++i) {
    texts.push({
      text: 'imai',
      x: width / 2,
      y: height / 2,
      color: '#000',
      opacity: 0.5,
      duration: 1,
      delay: 0
    });
  }

  $interval(() => {
    for (const text of texts) {
      text.x = Math.random() * width;
      text.y = Math.random() * height;
      text.color = `hsl(${Math.random() * 360},100%,50%)`;
      text.opacity = Math.random();
      text.duration = Math.random() + 0.5;
      text.delay = Math.random() * 0.5;
    }
  }, delay, count);
  return texts;
});

angular.module('hoge').factory('lines', ($interval, width, height, delay, count) => {
  const n = 10,
        lines = [];
  for (let i = 0; i < n; ++i) {
    lines.push({
      x1: width / 2,
      y1: height / 2,
      x2: width / 2,
      y2: height / 2,
      color: '#000',
      opacity: 0.5,
      duration: 1,
      delay: 0
    });
  }

  $interval(() => {
    for (const line of lines) {
      line.x1 = Math.random() * width;
      line.y1 = Math.random() * height;
      line.x2 = Math.random() * width;
      line.y2 = Math.random() * height;
      line.color = `hsl(${Math.random() * 360},100%,50%)`;
      line.opacity = Math.random();
      line.duration = Math.random() + 0.5;
      line.delay = Math.random() * 0.5;
    }
  }, delay, count);
  return lines;
});

angular.module('hoge').factory('paths', ($interval, width, height, delay, count) => {
  const n = 5,
        paths = [];
  for (let i = 0; i < n; ++i) {
    paths.push({
      x1: width / 2,
      y1: height / 2,
      x2: width / 2,
      y2: height / 2,
      x3: width / 2,
      y3: height / 2,
      color: '#000',
      opacity: 0.5,
      duration: 1,
      delay: 0
    });
  }

  $interval(() => {
    for (const path of paths) {
      path.x1 = Math.random() * width;
      path.y1 = Math.random() * height;
      path.x2 = Math.random() * width;
      path.y2 = Math.random() * height;
      path.x3 = Math.random() * width;
      path.y3 = Math.random() * height;
      path.color = `hsl(${Math.random() * 360},100%,50%)`;
      path.opacity = Math.random();
      path.duration = Math.random() + 0.5;
      path.delay = Math.random() * 0.5;
    }
  }, delay, count);
  return paths;
});

angular.module('hoge').factory('polygons', ($interval, width, height, delay, count) => {
  const n = 10,
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
      polygons[i].points.push([width / 2, height / 2]);
    }
  }

  $interval(() => {
    for (const polygon of polygons) {
      for (const point of polygon.points) {
        point[0] = Math.random() * width;
        point[1] = Math.random() * height;
      }
      polygon.y1 = Math.random() * height;
      polygon.x2 = Math.random() * width;
      polygon.y2 = Math.random() * height;
      polygon.x3 = Math.random() * width;
      polygon.y3 = Math.random() * height;
      polygon.color = `hsl(${Math.random() * 360},100%,50%)`;
      polygon.opacity = Math.random();
      polygon.duration = Math.random() + 0.5;
      polygon.delay = Math.random() * 0.5;
    }
  }, delay, count);
  return polygons;
});

angular.module('hoge').directive('main', () => {
  return {
    restrict: 'E',
    templateUrl: 'main.html',
    scope: {
    },
    controllerAs: 'main',
    controller: class {
      constructor(width, height, circles, ellipses, rects, lines, texts, paths, polygons) {
        this.width = width;
        this.height = height;
        this.circles = circles;
        this.ellipses = ellipses;
        this.rects = rects;
        this.lines = lines;
        this.texts = texts;
        this.paths = paths;
        this.polygons = polygons;
      }

      pathFrom(x, y) {
        return new Path(x, y);
      }

      points(points) {
        return points.map(p => `${p[0]},${p[1]}`).join(' ');
      }
    }
  };
});
