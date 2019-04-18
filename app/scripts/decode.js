const dateTime = require('js-utils').datetime;

function convert2epocString(creation_time) {
    const DIFFERENCE = 2082844800;  /* seconds between 1904-01-01 and Epoch */
    const epoc = creation_time >= DIFFERENCE ? creation_time - DIFFERENCE : creation_time;

    return dateTime.toUTCString(epoc * 1000);
}

function getLanguageString(int5x3) {
    const CONST_SMALL_A = 0x60;
    const b = new Array(
        (int5x3 >> 10 & 0b11111) + CONST_SMALL_A,
        (int5x3 >>  5 & 0b11111) + CONST_SMALL_A,
        (int5x3 & 0b11111) + CONST_SMALL_A
    );
    return String.fromCharCode(b[0], b[1], b[2]);
}

module.exports.typeString = function(buffer, offset) {
    return buffer.toString('ascii', offset, offset+4);
};

module.exports.dateTime = function(buffer, offset) {
    return convert2epocString(buffer.readUIntBE(offset, 4));
};

module.exports.languageString = function(buffer, offset) {
    return getLanguageString(buffer.readUIntBE(offset, 2));
};
