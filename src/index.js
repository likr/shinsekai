import angular from 'angular';
import shinsekai from './shinsekai';

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

angular.module('hoge').directive('main', () => {
  return {
    restrict: 'E',
    templateUrl: 'main.html',
    scope: {
    },
    controllerAs: 'main',
    controller: class {
      constructor(width, height, circles, rects, lines, texts) {
        this.width = width;
        this.height = height;
        this.circles = circles;
        this.rects = rects;
        this.lines = lines;
        this.texts = texts;
      }
    }
  };
});
