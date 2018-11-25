// バイナリファイルを読み込むサンプル
//   https://nodejs.org/api/buffer.html

const fs = require('fs');

const parent_types = [
    'moov',
    'trak',
    'mdia',
    'edts',
    'udta',
    'minf',
    'stbl',
    'mvex'
];

function hasChildAtom(type) {
    for (var i=0; i<parent_types.length; i++) {
        if (parent_types[i] === type) {
            return true;
        }
    }
    return false;
}

function getAtom(buf) {
    const size = buf.readUIntBE(0, 4);
    const type = buf.toString('ascii', 4, 8);
    const payload = buf.slice(8, size);

    let atom = {
        size: size,
        type: type,
        payload: payload
    };

    atom.children = new Array();
    if (hasChildAtom(type) === true) {
        let offset = 0;
        while (offset < payload.length) {
            const atom_child = getAtom(payload.slice(offset));
            atom.children.push(atom_child);
            offset += atom_child.size;
        }
    }

    return atom;
}

module.exports.load = function(filename, callback) {
    var afterReadWork = function(err, content) {
        if (err) {
            throw new Error(err);
        }

        var buf = Buffer.from(content, 'binary');

        var data = new Array();
        var offset = 0;
        while (offset < buf.length) {
            const atom = getAtom(buf.slice(offset));
            data.push(atom);
            offset += atom.size;
        }

        callback(data);
    };

    fs.readFile(filename, afterReadWork);
};
