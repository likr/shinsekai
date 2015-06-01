import angular from 'angular';
import ngRoute from 'angular-route';
import random from './random';

const moduleName = 'shinsekai-example';

angular.module(moduleName, [
  ngRoute,
  random
]);

angular.module(moduleName).config(($routeProvider) => {
  $routeProvider
    .when('/random', {
      template: '<random></random>'
    })
    .when('/bar-chart', {
      template: '<bar-chart></bar-chart>'
    })
    .otherwise('/random');
});
