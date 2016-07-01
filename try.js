/***
 * @summary A Ruby inspired library for safely accessing nested object properties.
 * 
 * @author Garrett Maring
 * @author Marcus Buffett
 *
 */

/* try & unwrap */
Object.defineProperty(Object.prototype, "try", {
  value: function(x) {
    return Object.defineProperty(typeof this[x] === "object" ? this[x] : {} , "unwrap", {
      set: function(value) { this[x] = value }.bind(this),
      get: function() {
        return function(undefinedFallbackValue) {
          if (undefinedFallbackValue !== undefined && this[x] === undefined) {
            return undefinedFallbackValue
          }

          return this[x]
        }.bind(this)
      }.bind(this),
      configurable: true
    })
  }
})

/* tryAll */
Object.prototype.tryAll = function() {
  return Array.prototype.slice.call(arguments).reduce(function(accum_obj, accessor) {
    return accum_obj.try(accessor)
  }, this).unwrap()
}


/* trySafe */
exports.trySafe = function() {
  var args = Array.prototype.slice.call(arguments)
  return Object.assign({}, args[0]).tryAll(args.slice(1))
}
