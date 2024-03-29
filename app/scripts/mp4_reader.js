const file = jsUtils.file;
const hex = require('./scripts/hex.js');
//const readfile = require('./scripts/read_file.js');
const viewStatus = require('./scripts/view_status.js');
//const atomTable = require('./scripts/mp4/atom_table.js');

let mp4data;
let fileData;
let selected_atom = {type: '', payload: '', parentInfo: {}};

function openFileDialog() {
    const dialog = require('electron').remote.dialog;

    const filenames = dialog.showOpenDialog(null, {
        properties: ['openFile'],
        title: 'select a data file',
        defaultPath: '.',
        filters: [
            {name: 'movie file', extensions: ['mp4', 'm4a', 'm4v', 'mov', 'avi', 'wav']}
        ]});

    if (filenames && filenames.length > 0) {
        document.getElementById('data_path').value = filenames[0];
        fileLoader.load(filenames[0], output);
    }
}

function makeAtomListId(index_array) {
    return 'atom_item' + index_array.toString().replace(/,/g, '-');
}

function activeListItem(index_array) {
    const list_items = document.getElementsByClassName('atom_list');
    for (var i=0; i<list_items.length; i++) {
        list_items[i].style.backgroundColor = '';
    }

    document.getElementById(makeAtomListId(index_array)).style = "background: hsl(0, 0%, 96%);";
}

function outputChild(data) {
    var tag = "";
    tag += '<ul>';
    for (var i=0; i<data.length; i++) {
        tag += '<li id="' + makeAtomListId(data[i].index) + '" class="atom_list">';
        tag += '<a href="javascript:showPayload([' + data[i].index.toString() + '])">' + data[i].type + '</a>';
        tag += ' (' + data[i].payload.length + ')</li>';
        if (data[i].children.length !== 0) {
            tag += outputChild(data[i].children);
        }
    }
    tag += '</ul>';

    return tag;
}

function output(atoms, binary) {
    mp4data = atoms;
    fileData = binary;

    var str = '<div class="content">' + outputChild(atoms) + '</div>';

//    var str = "Atom size: " + data.atom_size + '<br>\n'
//            + "Type: " + data.type + '<br>\n'
//            + "Version: " + data.version + '<br>\n'

//    viewStatus.setStatus(data.status);
//    viewStatus.setSize(data.size);
    viewStatus.setStructure(str);
}

function switchPayloadViewMode(selected) {
    document.getElementById('payload_view_preview').classList.remove('is-active');
    document.getElementById('payload_view_hex').classList.remove('is-active');

    document.getElementById(selected).classList.add('is-active');
    viewStatus.setPayload(makePayloadElem(selected_atom));
}

function previewAtom(atom) {
    const tb = atomTable.atom[atom.type];
    if (!tb) {
        return 'unknown atom type';
    }

    return tb.parser ? tb.display(tb.parser(atom.payload, atom.parentInfo)) : 'unable to preview';
}

function makeDisplay(atom) {
    if (document.getElementById('payload_view_preview').classList.contains('is-active')) {
        return previewAtom(atom);
    } else if (document.getElementById('payload_view_hex').classList.contains('is-active')) {
        return hex.outputHex(atom.payload);
    } else {
        return 'missing preview mode';
    }
}

function makePayloadElem(atom) {
    const type = atom.type;
    const broken_notice = atom.maybe_broken ? makeBrokenNotice() : '';

    return {
        title:       type,
        description: atomTable.atom[type] ? atomTable.atom[type].description : '',
        preview:     broken_notice + makeDisplay(atom)
    };
}

function makeBrokenNotice() {
    return "<p class='notification is-danger'><i class='fas fa-exclamation-triangle'></i> selected atom may be damaged</p>";
}

function showPayload(index) {
    var get_atom = mp4data[index[0]];
    for (var i=1; i<index.length; i++) {
        get_atom = get_atom.children[index[i]];
    }

    selected_atom = get_atom;
    activeListItem(index);
    viewStatus.setPayload(makePayloadElem(get_atom));
}

function downloadAtom() {
    const path = require('path');
    const filename = path.basename(fileLoader.getFileName()) + "." + selected_atom.type + ".bin";

    file.saveBlob(selected_atom.payload, filename);
}

function downloadPirtial(offset, size) {
    const path = require('path');
    const filename = path.basename(fileLoader.getFileName()) + "_" + offset + '-' + (offset + size) + ".bin";

    file.saveBlob(fileData.slice(offset, offset + size), filename);
}
