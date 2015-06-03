import angular from 'angular';
import ngRoute from 'angular-route';
import simple from './simple';
import random from './random';
import barChart from './bar-chart';
import lineChart from './line-chart';
import pieChart from './pie-chart';
import scatterPlot from './scatter-plot'

const moduleName = 'shinsekai-example';

angular.module(moduleName, [
  ngRoute,
  simple,
  random,
  barChart,
  lineChart,
  pieChart,
  scatterPlot
]);

angular.module(moduleName).config(($routeProvider) => {
  $routeProvider
    .when('/simple', {
      template: '<simple></simple>'
    })
    .when('/random', {
      template: '<random></random>'
    })
    .when('/bar-chart', {
      template: '<bar-chart></bar-chart>'
    })
    .when('/line-chart', {
      template: '<line-chart></line-chart>'
    })
    .when('/pie-chart', {
      template: '<pie-chart></pie-chart>'
    })
    .when('/scatter-plot', {
      controller: ($scope, data) => {
        $scope.data = data;
      },
      resolve: {
        data: ($http) => {
          return $http.get('data/iris.json')
            .then((response) => {
              return response.data;
            });
        }
      },
      template: '<scatter-plot data="data"></scatter-plot>'
    })
    .otherwise('/random');
});
