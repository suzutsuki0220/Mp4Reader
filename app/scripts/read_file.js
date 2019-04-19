// バイナリファイルを読み込むサンプル
//   https://nodejs.org/api/buffer.html

const fs = require('fs');
const mp4Atom = require('./mp4_atom');
const decode = require('./decode');

var load_name = '';

// atom先頭のsizeが正しくない時は代替えの値を返す
function getValidSize(buf) {
    const size = buf.readUIntBE(0, 4);
    if (size > buf.length || size < 8) { // size値がbufferサイズを超えているか、size + type 分のサイズが無い場合は異常値
        return {
            byte: buf.length,
            broken: true
        };
    }

    return {
        byte: size,
        broken: false
    };
}

function hasChildAtom(type) {
    return mp4Atom.atom[type] ? mp4Atom.atom[type].hasChild : false;
}

function getChildAtom(mp4data, atom, index) {
    let payload_offset = 0;
    while (payload_offset < atom.payload.length) {
        const atom_index = index.concat(atom.children.length);
        const atom_child = getAtom(mp4data, atom.payload_position + payload_offset, atom_index);
        if (atom_child.size === 0 || atom_child.size > atom.payload.length - payload_offset) {
            break;
        }
        atom.children.push(atom_child);
        payload_offset += atom_child.size;
    }
}

function getAtom(mp4data, offset, index) {
    const buf = mp4data.slice(offset);

    const size = getValidSize(buf);
    let atom = {
        index: index,  // 出現する順序
        size: size.byte,
        type: decode.typeString(buf, 4),
        maybe_broken: size.broken,
        children: [],
        payload_position: offset + 8,
        payload: buf.slice(8, size.byte)
    };

    if (hasChildAtom(atom.type) === true) {
        getChildAtom(mp4data, atom, index);
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
