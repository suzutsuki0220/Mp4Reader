const bigValue = require('../bigint');
const decode = require('../decode');
const jsUtils = require('js-utils');

function getFullBox(payload) {
    return {
        version: payload.readUIntBE(0, 1),
        flag: payload.readUIntBE(1, 3),
        size: 4
    };
}

function getCreationAndModificationTime(version, payload, offset) {
    if (version === 1) {
        return {
            data: [
                {key: "Creation Time", value: bigValue.getIntStringBE(payload, offset)},
                {key: "Modification Time", value: bigValue.getIntStringBE(payload, offset+8)}
            ],
            size: 16
        };
    } else { // if (version == 0)
        return {
            data: [
                {key: "Creation Time", value: decode.dateTime(payload, offset)},
                {key: "Modification Time", value: decode.dateTime(payload, offset+4)},
            ],
            size: 8
        };
    }
}

module.exports.parseFileTypeBox = function(payload) {
    const kv_array = [
        {key: "Major Brand", value: payload.slice(0, 4).toString('ascii')},
        {key: "Minor Version", value: payload.readUIntBE(4, 4)},
        {key: "Compatible Brands", value: payload.slice(8, 12).toString('ascii')}
    ];

    return kv_array;
};

module.exports.parseMovieHeaderBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    const timedata = getCreationAndModificationTime(fullbox.version, payload, offset);
    kv_array = kv_array.concat(timedata.data);
    offset += timedata.size;

    kv_array = kv_array.concat([
        {key: "Timescale", value: payload.readUIntBE(offset, 4)},
        {key: "Duration", value: fullbox.version === 1 ? bigValue.getIntStringBE(offset+4) : payload.readUIntBE(offset+4, 4)}
    ]);
    offset += fullbox.version === 1 ? 12 : 8;

    kv_array = kv_array.concat([
        {key: "Rate", value: payload.readUIntBE(offset, 4)},
        {key: "Volume", value: payload.readUIntBE(offset+4, 2)},
        /* reserved(0): 10, display_matrix[4*9]: 36, predefined: 24 */
        {key: "Next Track ID", value: payload.readUIntBE(offset+76, 4)}
    ])

    return kv_array;
}

module.exports.parseTrackHeaderBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    const timedata = getCreationAndModificationTime(fullbox.version, payload, offset);
    kv_array = kv_array.concat(timedata.data);
    offset += timedata.size;

    kv_array = kv_array.concat([
        {key: "Track ID", value: payload.readUIntBE(offset, 4)},
        /* reserved: 4 */
        {key: "Duration", value: fullbox.version === 1 ? bigValue.getIntStringBE(payload, offset+8) : payload.readUIntBE(offset+8, 4)}
    ]);
    offset += fullbox.version === 1 ? 16 : 12;

    kv_array = kv_array.concat([
        {key: "Layer", value: payload.readUIntBE(offset+8, 2)},
        {key: "Alternate Group", value: payload.readUIntBE(offset+10, 2)},
        {key: "Volume", value: payload.readUIntBE(offset+12, 2)},
        /* reserved(0): 2, display_matrix[4*9]: 36 */
        {key: "Width", value: payload.readUIntBE(offset+52, 4) >> 16},  // 16.16 fixed point (雑に小数部を消す)
        {key: "Height", value: payload.readUIntBE(offset+56, 4) >> 16}  // 16.16 fixed point (雑に小数部を消す)
    ])

    return kv_array;
}

module.exports.parseMediaHeaderBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    const timedata = getCreationAndModificationTime(fullbox.version, payload, offset);
    kv_array = kv_array.concat(timedata.data);
    offset += timedata.size;

    kv_array = kv_array.concat([
        {key: "Timescale", value: payload.readUIntBE(offset, 4)},
        {key: "Duration", value: fullbox.version === 1 ? bigValue.getIntStringBE(payload, offset+4) : payload.readUIntBE(offset+4, 4)}
    ]);
    offset += fullbox.version === 1 ? 12 : 8;

    kv_array = kv_array.concat([
        {key: "Language", value: decode.languageString(payload, offset)},
        {key: "Quality", value: payload.readUIntBE(offset+2, 2)}
    ])

    return kv_array;
}

module.exports.parseTrackReferenceBox = function(payload) {
    var kv_array = [];
    for (var offset = 0; offset < payload.length; offset + 4) {
        kv_array.push({
            key: "track ID " + offset / 4,
            value: payload.readUintBE(offset, 4)
        });
    }

    return kv_array;
};

module.exports.parseHandlerReferenceBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    kv_array = kv_array.concat([
        {key: "Pre Defined", value: payload.readUIntBE(offset, 4)},
        {key: "Handler Type", value: payload.slice(offset+4, offset+8).toString('ascii')},
        /* reserved 32 * 3 */
        {key: "Name", value: payload.slice(offset+20).toString('ascii')}
    ]);

    return kv_array;
}

module.exports.parseVideoMediaHeaderBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    kv_array = kv_array.concat([
        {key: "Graphicsmode", value: payload.readUIntBE(offset, 2)},
        {key: "Opcolor", value: "{" + payload.readUIntBE(offset+2, 2) + ", " + payload.readUIntBE(offset+4, 2) + ", " + payload.readUIntBE(offset+6, 2) + "}"}
    ]);

    return kv_array;
};

module.exports.parseSoundMediaHeaderBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    kv_array = kv_array.concat([
        {key: "Balance", value: payload.readUIntBE(offset, 2)}
    ]);

    return kv_array;
}

module.exports.parseHintMediaHeaderBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    kv_array = kv_array.concat([
        {key: "maxPDUsize", value: payload.readUIntBE(offset, 2)},
        {key: "avgPDUsize", value: payload.readUIntBE(offset+2, 2)},
        {key: "maxbitrate", value: payload.readUIntBE(offset+4, 4)},
        {key: "avgbitrate", value: payload.readUIntBE(offset+8, 4)}
    ]);

    return kv_array;
}

module.exports.parseMovieFragmentHeaderBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    kv_array = kv_array.concat([
        {key: "Sequence Number", value: payload.readUIntBE(offset, 4)}
    ]);

    return kv_array;
}

module.exports.parseTrackFragmentHeaderBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    kv_array = kv_array.concat([
        {key: "Track ID", value: payload.readUIntBE(offset, 4)}
    ]);
    if (payload.size >= 32) {  // optional fields
        kv_array = kv_array.concat([
            {key: "Base Data Offset", value: bigValue.getIntStringBE(payload+4, offset)},
            {key: "Sample Description Index", value: payload.readUIntBE(offset+12, 4)},
            {key: "Default Sample Duration", value: payload.readUIntBE(offset+16, 4)},
            {key: "Default Sample Size", value: payload.readUIntBE(offset+20, 4)},
            {key: "Default Sample Flags", value: payload.readUIntBE(offset+24, 4)}
        ]);
    }

    return kv_array;
}

module.exports.parseTrackFragmentRunBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    const sample_count = payload.readUIntBE(offset, 4);
    kv_array = kv_array.concat([
        {key: "Sample Count", value: sample_count},
        {key: "Data Offset", value: payload.readIntBE(offset+4, 4)},   // optional
        {key: "First Sample Flags", value: payload.readUIntBE(offset+8, 4)}   // optional
    ]);
    offset += 12;

/* TODO: check tr_flags (fullbox.flag)
    for (var i=0; i<3; i++) {
        kv_array = kv_array.concat([
            {key: i + " Sample Duration", value: payload.readUIntBE(offset, 4)},
            {key: i + " Sample Size", value: payload.readUIntBE(offset+4, 4)},
            {key: i + " Sample Flags", value: payload.readUIntBE(offset+8, 4)},
            {key: i + " Sample Composition Time Offset", value: payload.readUIntBE(offset+12, 4)}
        ]);
        offset += 16;
    }
*/

    return kv_array;
}

module.exports.parseMovieExtendsHeaderBox = function(payload) {
    const fullbox = getFullBox(payload);
    var offset = fullbox.size;
    var kv_array = [
        {key: "Version", value: fullbox.version}
    ];
    if (fullbox.version === 1) {
        kv_array = kv_array.concat([
            {key: "Fragment Duration", value: bigValue.getIntStringBE(payload, offset)}
        ])
    } else {
        kv_array = kv_array.concat([
            {key: "Fragment Duration", value: payload.readUIntBE(offset, 4)},
        ]);
    }

    return kv_array;
}

function getDateTimeFromByte(payload, offset=0) {
    const year  = 2000 + payload.readUInt8(offset + 0);
    const month = payload.readUInt8(offset + 1);
    const day   = payload.readUInt8(offset + 2);
    const hour  = payload.readUInt8(offset + 3);
    const min   = payload.readUInt8(offset + 4);
    const sec   = payload.readUInt8(offset + 5);

    const epoc = Date.UTC(year, month - 1, day, hour, min, sec);

    return jsUtils.datetime.toUTCString(epoc);
}

module.exports.parseGpsX = function(payload) {
    var offset = 0;
    var waypoints = new Array();

    do {
        waypoints.push({
            "Latitude":  payload.readDoubleLE(offset),
            "Longitude": payload.readDoubleLE(offset+8),
            "Altitude":  payload.readInt32LE(offset+16),
            "Speed":     payload.readInt16LE(offset+20),
            "Datetime":  getDateTimeFromByte(payload, offset+22),
            "Heading":   payload.readUInt8(offset+28)
        });

        offset += 32;
    } while(offset < payload.length);

    return waypoints;
}
