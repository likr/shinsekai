import angular from 'angular';
import shinsekai from './shinsekai';

angular.module('hoge', [shinsekai]);

angular.module('hoge').factory('circles', ($interval) => {
  const width = 400,
        height = 400,
        n = 10,
        circles = [];
  for (let i = 0; i < n; ++i) {
    circles.push({
      x: width / 2,
      y: height / 2,
      r: 5,
      fill: '#000',
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
      circle.color = `hsl(${Math.random() * 360},100%, 50%)`;
      circle.opacity = Math.random();
      circle.duration = Math.random() + 0.5;
      circle.delay = Math.random() * 0.5;
    }
  }, 2000);
  return circles;
});

angular.module('hoge').factory('rects', ($interval) => {
  const width = 400,
        height = 400,
        n = 10,
        rects = [];
  for (let i = 0; i < n; ++i) {
    rects.push({
      x: width / 2,
      y: height / 2,
      width: 5,
      height: 5,
      fill: '#000',
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
      rect.color = `hsl(${Math.random() * 360},100%, 50%)`;
      rect.opacity = Math.random();
      rect.duration = Math.random() + 0.5;
      rect.delay = Math.random() * 0.5;
    }
  }, 2000);
  return rects;
});

angular.module('hoge').directive('main', () => {
  return {
    restrict: 'E',
    templateUrl: 'main.html',
    scope: {
    },
    controllerAs: 'main',
    controller: class {
      constructor(circles, rects) {
        this.circles = circles;
        this.rects = rects;
      }
    }
  };
});
