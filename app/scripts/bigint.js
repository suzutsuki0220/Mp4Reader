const bigInteger = require('big-integer')

module.exports.getBigint = function(high, low) {
    return bigInteger(high).shiftLeft(32).add(low);
}
