import angular from 'angular';
import shinsekai from './shinsekai';

angular.module('hoge', [shinsekai]);

angular.module('hoge').factory('data', ($interval) => {
  const width = 400,
        height = 400,
        n = 10,
        points = [];
  for (let i = 0; i < n; ++i) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 9 + 1,
      opacity: Math.random(),
      duration: Math.random() + 0.5
    });
  }

  $interval(() => {
    for (const point of points) {
      point.x = Math.random() * width;
      point.y = Math.random() * height;
      point.r = Math.random() * 9 + 1;
      point.opacity = Math.random();
      point.duration = Math.random() + 0.5;
    }
  }, 2000);
  return points;
});

angular.module('hoge').directive('main', () => {
  return {
    restrict: 'E',
    templateUrl: 'main.html',
    scope: {
    },
    controllerAs: 'main',
    controller: class {
      constructor(data) {
        this.data = data;
      }
    }
  };
});
