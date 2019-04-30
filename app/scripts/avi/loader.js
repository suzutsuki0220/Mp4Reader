const decode = require('../decode');

const CHUNK_HEADER_SIZE = 8;
const LIST_HEADER_SIZE = 12;

// sizeが正しくない時は代替えの値を返す
function getValidSize(buf) {
    const size = buf.readUIntLE(4, 4);
    if (size > buf.length - CHUNK_HEADER_SIZE) {
        return {
            byte: buf.length - CHUNK_HEADER_SIZE,
            broken: true
        };
    }

    return {
        byte: size,
        broken: false
    };
}

// determine LIST (RIFF-List or List) or Chunk
function isList(fourCC) {
    return fourCC === "RIFF" || fourCC === "LIST" ? true : false;
}

function getChildAtom(movie_data, atom, index) {
    let payload_offset = 0;
    while (payload_offset < atom.payload.length) {
        const atom_index = index.concat(atom.children.length);
        const child = getAtom(movie_data, atom.payload_position + payload_offset, atom_index);
        if (child.size === CHUNK_HEADER_SIZE || child.maybe_broken === true) {
            break;
        }
        atom.children.push(child);
        payload_offset += child.size;
    }
}

function getAtom(movie_data, offset, index) {
    const buf = movie_data.slice(offset);

    const fourCC = decode.typeString(buf, 0);
    const payload_start = isList(fourCC) ? LIST_HEADER_SIZE : CHUNK_HEADER_SIZE;
    const size = getValidSize(buf);
    let atom = {
        index: index,  // 出現する順序
        size: size.byte + CHUNK_HEADER_SIZE,
        type: isList(fourCC) ? fourCC + " - " + decode.typeString(buf, CHUNK_HEADER_SIZE) : fourCC,
        maybe_broken: size.broken,
        children: [],
        payload_position: offset + payload_start,
        payload: buf.slice(payload_start, (size.byte + CHUNK_HEADER_SIZE))
    };

    if (size.broken === false && isList(fourCC) === true) {
        getChildAtom(movie_data, atom, index);
    }

    return atom;
}

module.exports.get = getAtom;
