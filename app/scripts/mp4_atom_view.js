const bigInt = require('./bigint');
const dateTime = require('js-utils').datetime;

function makeTable(kv_array) {
    var data = "";
    for (var i=0; i<kv_array.length; i++) {
        data += "<tr><th>" + kv_array[i].key + "</th><td>" + kv_array[i].value + "</td></tr>";
    }
    return "<table>" + data + "</table>";
}

function getFullBox(payload) {
    return {
        version: payload.readUIntBE(0, 1),
        flag: payload.readUIntBE(1, 3),
        size: 4
    };
}

function convert2epoc(creation_time) {
    const DIFFERENCE = 2082844800;  /* seconds between 1904-01-01 and Epoch */
    return creation_time >= DIFFERENCE ? creation_time - DIFFERENCE : creation_time;
}

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
    const kv_array = [
        {key: "Major Brand", value: payload.slice(0, 4).toString('ascii')},
        {key: "Minor Version", value: payload.readUIntBE(4, 4)},
        {key: "Compatible Brands", value: payload.slice(8, 12).toString('ascii')}
    ];

    return makeTable(kv_array);
};

module.exports.parseMovieHeaderBox = function(payload) {
    var offset;
    const fullbox = getFullBox(payload);
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    if (fullbox.version == 1) {
        kv_array = kv_array.concat([
            {key: "Creation Time", value: bigInt.getBigint(payload.readUIntBE(4, 4), payload.readUIntBE(0, 4)).toString()},
            {key: "Modification Time", value: bigInt.getBigint(payload.readUIntBE(12, 4), payload.readUIntBE(8, 4)).toString()},
            {key: "Timescale", value: payload.readUIntBE(16, 4)},
            {key: "Duration", value: bigInt.getBigint(payload.readUIntBE(24, 4), payload.readUIntBE(20, 4)).toString()}
        ]);
        offset = 28
    } else {  // if (version == 0)
        kv_array = kv_array.concat([
            {key: "Creation Time", value: dateTime.toString(convert2epoc(payload.readUIntBE(4, 4)) * 1000)},
            {key: "Modification Time", value: dateTime.toString(convert2epoc(payload.readUIntBE(8, 4)) * 1000)},
            {key: "Timescale", value: payload.readUIntBE(12, 4)},
            {key: "Duration", value: payload.readUIntBE(16, 4)}
        ]);
        offset = 20
    }
    kv_array = kv_array.concat([
        {key: "Rate", value: payload.readUIntBE(offset, 4)},
        {key: "Volume", value: payload.readUIntBE(offset+4, 2)},
        /* reserved(0): 10, display_matrix[4*9]: 36, predefined: 24 */
        {key: "Next Track ID", value: payload.readUIntBE(offset+76, 4)}
    ])

    return makeTable(kv_array);
}
