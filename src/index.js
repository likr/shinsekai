import angular from 'angular';
import ssvg from './svg';
import axis from './axis';
import path from './path';
import transform from './transform';
import scale from './scale';

angular.module('shinsekai', [
  ssvg,
  axis,
  path,
  transform,
  scale
]);

export default 'shinsekai';
