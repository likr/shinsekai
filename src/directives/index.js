import angular from 'angular';
import ssvg from './svg';
import transform from './transform';
import axis from './axis';

angular.module('shinsekai.directives', [
  ssvg,
  transform,
  axis
]);

export default 'shinsekai.directives';
