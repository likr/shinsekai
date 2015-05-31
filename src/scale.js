import angular from 'angular';

class Scale {
  constructor() {
    this.xMin = 0;
    this.xMax = 1;
    this.yMin = 0;
    this.yMax = 1;
  }

  domain(xMin, xMax) {
    this.xMin = xMin;
    this.xMax = xMax;
    return this;
  }

  range(yMin, yMax) {
    this.yMin = yMin;
    this.yMax = yMax;
    return this;
  }

  scale(x) {
    const {xMin, xMax, yMin, yMax} = this;
    return (yMax - yMin) * (x - xMin) / (xMax - xMin) + yMin;
  }
}

angular.module('shinsekai.scale', []).factory('Scale', () => {
  return Scale;
});

export default 'shinsekai.scale';
