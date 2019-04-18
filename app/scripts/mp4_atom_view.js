const bigInt = require('./bigint');
const decode = require('./decode');

function makeTable(kv_array) {
    var data = "";
    for (var i=0; i<kv_array.length; i++) {
        data += "<tr><th>" + kv_array[i].key + "</th><td>" + kv_array[i].value + "</td></tr>";
    }
    return "<table class='table is-bordered is-striped'>" + data + "</table>";
}

function getFullBox(payload) {
    return {
        version: payload.readUIntBE(0, 1),
        flag: payload.readUIntBE(1, 3),
        size: 4
    };
}

module.exports.parseFileTypeBox = function(payload) {
    const kv_array = [
        {key: "Major Brand", value: payload.slice(0, 4).toString('ascii')},
        {key: "Minor Version", value: payload.readUIntBE(4, 4)},
        {key: "Compatible Brands", value: payload.slice(8, 12).toString('ascii')}
    ];

    return makeTable(kv_array);
};

module.exports.parseMovieHeaderBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    if (fullbox.version == 1) {
        kv_array = kv_array.concat([
            {key: "Creation Time", value: bigInt.getBigint(payload.readUIntBE(offset+4, 4), payload.readUIntBE(offset+0, 4)).toString()},
            {key: "Modification Time", value: bigInt.getBigint(payload.readUIntBE(offset+12, 4), payload.readUIntBE(offset+8, 4)).toString()},
            {key: "Timescale", value: payload.readUIntBE(offset+16, 4)},
            {key: "Duration", value: bigInt.getBigint(payload.readUIntBE(offset+24, 4), payload.readUIntBE(offset+20, 4)).toString()}
        ]);
        offset += 28
    } else {  // if (version == 0)
        kv_array = kv_array.concat([
            {key: "Creation Time", value: decode.dateTime(payload, offset)},
            {key: "Modification Time", value: decode.dateTime(payload, offset+4)},
            {key: "Timescale", value: payload.readUIntBE(offset+8, 4)},
            {key: "Duration", value: payload.readUIntBE(offset+12, 4)}
        ]);
        offset += 16
    }
    kv_array = kv_array.concat([
        {key: "Rate", value: payload.readUIntBE(offset, 4)},
        {key: "Volume", value: payload.readUIntBE(offset+4, 2)},
        /* reserved(0): 10, display_matrix[4*9]: 36, predefined: 24 */
        {key: "Next Track ID", value: payload.readUIntBE(offset+76, 4)}
    ])

    return makeTable(kv_array);
}

module.exports.parseTrackHeaderBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    if (fullbox.version == 1) {
        kv_array = kv_array.concat([
            {key: "Creation Time", value: bigInt.getBigint(payload.readUIntBE(offset+4, 4), payload.readUIntBE(offset+0, 4)).toString()},
            {key: "Modification Time", value: bigInt.getBigint(payload.readUIntBE(offset+12, 4), payload.readUIntBE(offset+8, 4)).toString()},
            {key: "Track ID", value: payload.readUIntBE(offset+16, 4)},
            /* reserved: 4 */
            {key: "Duration", value: bigInt.getBigint(payload.readUIntBE(offset+28, 4), payload.readUIntBE(offset+24, 4)).toString()}
        ]);
        offset += 32
    } else {  // if (version == 0)
        kv_array = kv_array.concat([
            {key: "Creation Time", value: decode.dateTime(payload, offset)},
            {key: "Modification Time", value: decode.dateTime(payload, offset+4)},
            {key: "Track ID", value: payload.readUIntBE(offset+8, 4)},
            /* reserved: 4 */
            {key: "Duration", value: payload.readUIntBE(offset+16, 4)}
        ]);
        offset += 20
    }
    kv_array = kv_array.concat([
        {key: "Layer", value: payload.readUIntBE(offset+8, 2)},
        {key: "Alternate Group", value: payload.readUIntBE(offset+10, 2)},
        {key: "Volume", value: payload.readUIntBE(offset+12, 2)},
        /* reserved(0): 2, display_matrix[4*9]: 36 */
        {key: "Width", value: payload.readUIntBE(offset+52, 4) >> 16},  // 16.16 fixed point (雑に小数部を消す)
        {key: "Height", value: payload.readUIntBE(offset+56, 4) >> 16}  // 16.16 fixed point (雑に小数部を消す)
    ])

    return makeTable(kv_array);
}

module.exports.parseMediaHeaderBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    if (fullbox.version == 1) {
        kv_array = kv_array.concat([
            {key: "Creation Time", value: bigInt.getBigint(payload.readUIntBE(offset+4, 4), payload.readUIntBE(offset+0, 4)).toString()},
            {key: "Modification Time", value: bigInt.getBigint(payload.readUIntBE(offset+12, 4), payload.readUIntBE(offset+8, 4)).toString()},
            {key: "Time Scale", value: payload.readUIntBE(offset+16, 4)},
            {key: "Duration", value: bigInt.getBigint(payload.readUIntBE(offset+24, 4), payload.readUIntBE(offset+20, 4)).toString()}
        ]);
        offset += 28
    } else {  // if (version == 0)
        kv_array = kv_array.concat([
            {key: "Creation Time", value: decode.dateTime(payload, offset)},
            {key: "Modification Time", value: decode.dateTime(payload, offset+4)},
            {key: "Time Scale", value: payload.readUIntBE(offset+8, 4)},
            {key: "Duration", value: payload.readUIntBE(offset+12, 4)}
        ]);
        offset += 16
    }
    kv_array = kv_array.concat([
        {key: "Language", value: decode.languageString(payload, offset)},
        {key: "Quality", value: payload.readUIntBE(offset+2, 2)}
    ])

    return makeTable(kv_array);
}
