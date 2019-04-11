const output_limit = 100000;

module.exports.outputHex = function(binary, start = 0) {
    var str = "";
    var i = start;
    const end = binary.length - start > output_limit ? output_limit + start : binary.length - start;
    if (binary.length - start > output_limit) {
        str += "<p class='notification is-warning'>Limited output due to large size (" + output_limit + " Bytes over)</p>";
    }
    while (i < end) {
        str += str ? " " : "";
        str += binary.toString('hex', i, i+1);
        i++;
    }
    return str;
};
