import angular from 'angular';
import ssvg from './svg';
import transform from './transform';
import axis from './axis';
import logo from './logo';

angular.module('shinsekai.directives', [
  ssvg,
  transform,
  axis,
  logo
]);

export default 'shinsekai.directives';
