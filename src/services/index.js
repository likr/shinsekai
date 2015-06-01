import angular from 'angular';
import path from './path';
import transform from './transform';
import scale from './scale';

angular.module('shinsekai.services', [
  path,
  transform,
  scale
]);

export default 'shinsekai.services';
