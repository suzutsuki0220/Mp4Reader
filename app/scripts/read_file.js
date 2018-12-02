// バイナリファイルを読み込むサンプル
//   https://nodejs.org/api/buffer.html

const fs = require('fs');
const mp4Atom = require('./mp4_atom');

function hasChildAtom(type) {
    for (var atom in mp4Atom.atom) {
        if (atom === type) {
            return mp4Atom.atom[atom].hasChild;
        }
    }
    return false;
}

function getAtom(mp4data, offset) {
    const buf = mp4data.slice(offset);

    const size = buf.readUIntBE(0, 4);
    const payload = buf.slice(8, size);
    const maybe_broken = size > buf.length ? true : false;

    let atom = {
        size: size,
        type: buf.toString('ascii', 4, 8),
        maybe_broken: maybe_broken,
        payload_position: offset + 8,
        payload: payload
    };

    atom.children = new Array();
    if (hasChildAtom(atom.type) === true) {
        let payload_offset = 0;
        while (payload_offset < atom.payload_size) {
            const atom_child = getAtom(mp4data, atom.payload_position + payload_offset);
            atom.children.push(atom_child);
            payload_offset += atom_child.size;
        }
    }

    return atom;
}

module.exports.load = function(filename, callback) {
    var afterReadWork = function(err, content) {
        if (err) {
            throw new Error(err);
        }

        var mp4_data = Buffer.from(content, 'binary');

        var atoms = new Array();
        var offset = 0;
        while (offset < mp4_data.length) {
            const atom = getAtom(mp4_data, offset);
            atoms.push(atom);
            offset += atom.size;
        }

        callback(atoms);
    };

    fs.readFile(filename, afterReadWork);
};
