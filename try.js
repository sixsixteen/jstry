Object.prototype.attempt = function(x) {
  var value_unwrap = function() { 
    return this[x];
  }.bind(this);
  return {
    "unwrap": value_unwrap,
    "attempt": function(y) {
      if (typeof this[x] === "object") {
        var unwrap = function() {
          return this[x][y];
        }.bind(this);
        var attempt = Object.prototype.attempt.bind(this[x][y]);
      }
      else {
        var unwrap = value_unwrap;
        var attempt = Object.prototype.attempt.bind({});
      }
      return {
        "unwrap": unwrap,
        "attempt": attempt
      };
    }.bind(this)
  };
};
