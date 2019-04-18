const jsUtils = require('js-utils');

const output_limit = 100000;

function table_header() {
    return '<table class="table is-narrow is-striped monospace">'
    + '<thead><tr><th>ADDRESS</th><th>00&nbsp;01&nbsp;02&nbsp;03&nbsp;04&nbsp;05&nbsp;06&nbsp;07&nbsp;08&nbsp;09&nbsp;0a&nbsp;0b&nbsp;0c&nbsp;0d&nbsp;0e&nbsp;0f</th><th>0123456789abcdef<th></tr></thead>'
    + '<tbody>';
}

function table_row(address, binary) {
    var hex = "";
    var str = "";

    for (var i=0; i<binary.length; i++) {
        hex += hex ? "&nbsp;" : "";
        hex += binary.toString('hex', i, i+1);
        str += jsUtils.character.escapeControlChar(binary.readUInt8(i));
    }

    return '<tr>'
    + '<th>' + jsUtils.value.zeroPadding(address.toString(16), 8) + '</th>'
    + '<td>' + hex + '</td><td>' + str + '</td>'
    + '</tr>';
}

function table_footer() {
    return "</tbody></table>";
}

module.exports.outputHex = function(binary, start = 0) {
    var str = "";
    var i = start;
    const end = binary.length - start > output_limit ? output_limit + start : binary.length - start;
    if (binary.length - start > output_limit) {
        str += "<p class='notification is-warning'>Limited output due to large size (" + output_limit + " Bytes over)</p>";
    }
    str += table_header();
    while (i < end) {
        str += table_row(i, binary.slice(i, i+0x10));
        i += 0x10;
    }
    str += table_footer();

    return str;
};
