import angular from 'angular';

class Transform {
  constructor() {
    this.transforms = [];
  }

  translate(x, y=0) {
    this.transforms.push({
      type: 'translate',
      args: [x, y]
    });
    return this;
  }

  scale(x, y) {
    if (y == null) {
      y = x;
    }
    this.transforms.push({
      type: 'scale',
      args: [x, y]
    });
    return this;
  }

  rotate(a, x, y) {
    if (x != null && y != null) {
      this.transforms.push({
        type: 'rotate',
        args: [a, x, y]
      });
    } else {
      this.transforms.push({
        type: 'rotate',
        args: [a]
      });
    }
    return this;
  }

  skewX(a) {
    this.transforms.push({
      type: 'skewX',
      args: [a]
    });
    return this;
  }

  skewY(a) {
    this.transforms.push({
      type: 'skewY',
      args: [a]
    });
    return this;
  }

  toString() {
    return this.transforms.map(t => `${t.type}(${t.args.join(',')})`).join('');
  }
}

angular.module('shinsekai.transform', []).factory('Transform', () => {
  return Transform;
});

export default 'shinsekai.transform';
