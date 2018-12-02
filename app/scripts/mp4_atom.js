function outputHex(payload) {
    var str = "";
    var i = 0;
    while (i < payload.length) {
        str += str ? " " : "";
        str += payload.toString('hex', i, i+1);
        i++;
    }
    return str;
}

module.exports.atom = {
    ftyp: {
        description: "File Type Box",
        hasChild: false,
        display: outputHex
    },
    trak: {
        description: "Track Box",
        hasChild: true,
        display: outputHex
    },
    moov: {
        description: "Movie Box",
        hasChild: true,
        display: outputHex
    },
    mdat: {
        description: "Media Data Box",
        hasChild: false,
        display: outputHex
    },
    mdia: {
        description: "Media Information in a track",
        hasChild: true,
        display: outputHex
    },
    udta: {
        description: "User Data",
        hasChild: true,
        display: outputHex
    },
    edts: {
        description: "Edit list container",
        hasChild: true,
        display: outputHex
    },
    minf: {
        description: "Media information container",
        hasChild: true,
        display: outputHex
    },
    stbl: {
        description: "sample table box",
        hasChild: true,
        display: outputHex
    },
    mvex: {
        description: "movie extends box",
        hasChild: true,
        display: outputHex
    }
};
