module.exports = decoratable;

/**
 * create decoratable function.
 *
 * @param {Function} fn
 * @return {Function}
 */
function decoratable(fn) {

  var fns = [];

  /**
   * decoratable function.
   */
  var d = function() {
    var next = bindWith(fn, this);
    for (var i = 0; i < fns.length; i++) {
      next = bindWith(fns[i], this, next);
    }
    return next.apply(this, arguments);
  };

  /**
   * use decorate function.
   *
   * @param {Function} fn
   */
  d.use = function(fn) {
    fns.push(fn);
    return this;
  };

  return d;
}

/**
 * bind context with optional next.
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @param {Function?} next
 * @return {Function}
 */
var slice = Array.prototype.slice;
function bindWith(fn, ctx, next) {
  return function() {
    var args = slice.call(arguments);
    if (typeof next === 'function') args = args.concat(next);
    return fn.apply(ctx, args);
  };
}

