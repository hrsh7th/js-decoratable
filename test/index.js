var assert = require('assert');
var decoratable = require('../index');

describe('decoratable', function() {

  it('basic usage', function() {
    var add = decoratable(function add(x, y) { return x + y; });
    add.use(function plus1(x, y, next) { return next(x, y) + 1; });
    assert.ok(add(1, 1) === 3);
  });

  it('invoke sequence', function() {
    var i = 0;
    var _1;
    var _2;
    var _3;
    var _4;

    var sequence = decoratable(function (x, y) {
      _4 = ++i;
      return x + y;
    });

    sequence.use(function(x, y, next) {
      _3 = ++i;
      return next(x, y);
    });

    sequence.use(function(x, y, next) {
      _2 = ++i;
      return next(x, y);
    });

    sequence.use(function(x, y, next) {
      _1 = ++i;
      return next(x, y);
    });

    assert.ok(sequence(1, 1) === 2);
    assert.ok(_1 === 1);
    assert.ok(_2 === 2);
    assert.ok(_3 === 3);
    assert.ok(_4 === 4);

  });

  it('example', function() {
    var SomeClass = function(map) {
      this._map = map;
    };

    SomeClass.prototype.get = decoratable(function(key) {
      return this._map[key];
    });

    SomeClass.prototype.get.use(function defaults(key, next) {
      var v = next(key);
      if (v === undefined) {
        return 1234567890;
      }
      return v;
    });

    var instance = new SomeClass({ id: 1, name: 'john', created: undefined });
    assert.equal(instance.get('created'), 1234567890);
  });

});

