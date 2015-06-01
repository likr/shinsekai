# shinsekai
Component based visualization framework for Angular

# Install

## bower

```
bower install shinsekai
```

```
<script src="angular.js"></script>
<script src="shinsekai.js"></script>
```

### npm

```
npm install shinsekai
```

```
var angular = require('angular'),
    shinsekai = require('shinsekai');

angular.module('example', [shinsekai]);
```

# Usage


```
<!-- Normal SVG -->
<circle r="5" cx="50" cy="50"/>

<!-- SVG with data binding -->
<circle ss-r="ctrl.r" ss-cx="ctrl.cx" ss-cy="ctrl.cy"/>

<!-- SVG with data binding and animation -->
<circle ss-r="ctrl.r" ss-cx="ctrl.cx" ss-cy="ctrl.cy" ss-dur="0.3" ss-delay="0.2"/>
```

# Example

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>shinsekai.js Example</title>
</head>
<body ng-app="shinsekai-example">
<div ng-controller="MainController as ctrl">
  <div>
    <label>r</label>
    <input type="number" min="0" max="50" step="5" ng-model="ctrl.r"/>
  </div>
  <div>
    <label>x</label>
    <input type="number" min="0" max="500" step="50" ng-model="ctrl.x"/>
  </div>
  <div>
    <label>y</label>
    <input type="number" min="0" max="500" step="50" ng-model="ctrl.y"/>
  </div>
  <div>
    <label>color</label>
    <input type="color" ng-model="ctrl.color"/>
  </div>
  <div>
    <svg width="500" height="500">
      <circle ss-r="ctrl.r" ss-cx="ctrl.x" ss-cy="ctrl.y" ss-fill="ctrl.color" ss-dur="0.5"/>
    </svg>
  </div>
</div>
<script src="angular.js"></script>
<script src="shinsekai.js"></script>
<script>
angular.module('shinsekai-example', ['shinsekai'])
  .controller('MainController', function () {
    this.r = 20;
    this.x = 250;
    this.y = 250;
    this.color = '#000';
  });
</script>
</body>
</html>
```

# Lisence

MIT