const bigInteger = require('big-integer');

function getBigint(high, low) {
    return bigInteger(high).shiftLeft(32).add(low);
};

module.exports.getIntStringBE = function(payload, offset) {
    return getBigint(payload.readUIntBE(offset+4, 4), payload.readUIntBE(offset, 4)).toString();
};
