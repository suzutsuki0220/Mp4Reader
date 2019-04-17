// バイナリファイルを読み込むサンプル
//   https://nodejs.org/api/buffer.html

const fs = require('fs');
const mp4Atom = require('./mp4_atom');

var load_name = '';

function hasChildAtom(type) {
    for (var atom in mp4Atom.atom) {
        if (atom === type) {
            return mp4Atom.atom[atom].hasChild;
        }
    }
    return false;
}

function getAtom(mp4data, offset, index) {
    const buf = mp4data.slice(offset);

    const size = buf.readUIntBE(0, 4);
    let atom = {
        index: index,  // 出現する順序
        size: size,
        type: buf.toString('ascii', 4, 8),
        maybe_broken: size > buf.length ? true : false,
        payload_position: offset + 8,
        payload: buf.slice(8, size)
    };

    atom.children = new Array();
    if (hasChildAtom(atom.type) === true) {
        let payload_offset = 0;
        while (payload_offset < atom.payload.length) {
            const atom_index = index.concat(atom.children.length);
            const atom_child = getAtom(mp4data, atom.payload_position + payload_offset, atom_index);
            if (atom_child.size == 0 || atom_child.size > atom.payload.length - payload_offset) {
                break;
            }
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
            const atom = getAtom(mp4_data, offset, [atoms.length]);
            atoms.push(atom);
            offset += atom.size;
        }

        callback(atoms);
    };

    fs.readFile(filename, afterReadWork);
    load_name = filename;
};

module.exports.getFileName = function() {
    return load_name;
};
