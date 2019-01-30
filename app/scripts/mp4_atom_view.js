module.exports.outputHex = function(payload) {
    var str = "";
    var i = 0;
    while (i < payload.length) {
        str += str ? " " : "";
        str += payload.toString('hex', i, i+1);
        i++;
    }
    return str;
};

module.exports.parseFileTypeBox = function(payload) {
    const major_brand = payload.slice(0, 4).toString('ascii');
    const minor_version = payload.readUIntBE(4, 4);
    const compatible_brands = payload.slice(8, 12).toString('ascii');

    return "<table><tr><th>Major Brand</th><td>" + major_brand + "</td></tr>"
    + "<tr><th>Minor Version</th><td>" + minor_version + "</td></tr>"
    + "<tr><th>Compatible Brands</th><td>" + compatible_brands + "</td></tr>"
    + "</table>";
};

module.exports.parseHeader = function(payload) {
    const version = 1;  // TODO: get from ftyp box

    var creation_time, modification_time, timescale, duration;
    if (version == 1) {
        creation_time = payload.readUIntBE(0, 8);
        modification_time = payload.readUIntBE(8, 8);
        timescale = payload.readUIntBE(16, 4);
        duration = payload.readUIntBE(20, 8);
    } else {  // if (version == 0)
        creation_time = payload.readUIntBE(0, 4);
        modification_time = payload.readUIntBE(4, 4);
        timescale = payload.readUIntBE(8, 4);
        duration = payload.readUIntBE(12, 4);
    }
    // TODO: version によってオフセットが変わる
//    const rate = payload.readIntBE()

    var str = "<table><tr><th>Creation Time</th><td>" + creation_time + "</td></tr>"
    + "<tr><th>Modification Time</th><td>" + modification_time + "</td></tr>"
    + "<tr><th>Timescale</th><td>" + timescale + "</td></tr>"
    + "<tr><th>Duration</th><td>" + duration + "</td></tr>"
    + "</table>";

    return str;
}
