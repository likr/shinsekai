import angular from 'angular';
import ssvg from './svg';
import axis from './axis';
import path from './path';
import transform from './transform';

angular.module('shinsekai', [
  ssvg,
  axis,
  path,
  transform
]);

export default 'shinsekai';
