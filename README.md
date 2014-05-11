decoratable
==============

define decoratable function. like connect middleware.

example
--------------

```js
var decoratable = require('decoratable');

/**
 * define class.
 */
function SomeClass(values) {
  this._values = values;
}

/**
 * get value.
 */
SomeClass.prototype.get = decoratable(function(key) {
  return this._values[key];
});

/**
 * decorate default value.
 */
SomeClass.prototype.get.use(function(key, next) {
  var v = next(key);
  if ((key === 'created' || key === 'updated') && v === undefined) {
    return Date.now();
  }
  return v;
});

/**
 * instantiate.
 */
var ins = new SomeClass({ created: 1234567890 });
ins.get('created'); //=> 1234567890
ins.get('updated'); //=> Date.now() results.
```

