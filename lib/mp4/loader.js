const table = require('./atom_table');
const decode = require('../decode');
const parser = require('./atom_parser')

// atom先頭のsizeが正しくない時は代替えの値を返す
function getValidSize(buf) {
    const size = buf.readUIntBE(0, 4);
    if (size === 1) {
        //const largeSize = buf.readBigUInt64BE(8);  // readBigUint64BE is not a function
        const largeSize = buf.readUIntBE(10, 6);
        return {
            byte: largeSize,
            broken: false,
            payloadOffset: 16
        };
    } else if (size > buf.length || size < 8) { // size値がbufferサイズを超えているか、size + type 分のサイズが無い場合は異常値
        return {
            byte: buf.length,
            broken: true,
            payloadOffset: 8
        };
    }

    return {
        byte: size,
        broken: false,
        payloadOffset: 8
    };
}

function hasChildAtom(type) {
    return table.atom[type] ? table.atom[type].hasChild : false;
}

function getChildAtom(mp4data, atom, index) {
    let payload_offset = 0;
    const parentInfo = { ...atom.parentInfo };  // copy object
    while (payload_offset < atom.payload.length) {
        const atom_index = index.concat(atom.children.length);
        const atom_child = getAtom(mp4data, atom.payload_position + payload_offset, atom_index, parentInfo);
        if (atom_child.size === 0 || atom_child.size > atom.payload.length - payload_offset) {
            break;
        }
        atom.children.push(atom_child);
        payload_offset += atom_child.size;
    }
}

function getAtom(mp4data, offset, index, parentInfo = {}) {
    const buf = mp4data.slice(offset);

    const size = getValidSize(buf);
    let atom = {
        index: index,  // 出現する順序
        size: size.byte,
        type: decode.typeString(buf, 4),
        maybe_broken: size.broken,
        children: [],
        payload_position: offset + size.payloadOffset,
        payload: buf.slice(size.payloadOffset, size.byte),
        parentInfo: parentInfo
    };
    setParentInfo(atom);

    if (hasChildAtom(atom.type) === true) {
        getChildAtom(mp4data, atom, index);
    }

    return atom;
}

function setParentInfo(atom) {
    if (atom.type === 'hdlr') {
        const kv = parser.parseHandlerReferenceBox(atom.payload);
        handler = kv.find(k => k.key === 'Handler Type');
        atom.parentInfo['handlerType'] = handler.value;
    }
}

module.exports.extension_patterns = /\.(mov|mp4|m4v|m4a)$/i;
module.exports.get = getAtom;
