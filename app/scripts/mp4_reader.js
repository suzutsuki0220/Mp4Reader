const readfile = require('./scripts/read_file');
const viewStatus = require('./scripts/view_status');
const mp4Atom = require('./scripts/mp4_atom');

var mp4data;

function openFileDialog() {
    const dialog = require('electron').remote.dialog;

    const filenames = dialog.showOpenDialog(null, {
        properties: ['openFile'],
        title: 'select a data file',
        defaultPath: '.',
        filters: [
            {name: 'MPEG4 media', extensions: ['mp4', 'm4a', 'm4v', 'mov']}
        ]});

    if (filenames && filenames.length > 0) {
        document.f1.data_path.value = filenames[0];
        readfile.load(filenames[0], output);
    }
}

function outputChild(data) {
    var tag = "";
    tag += '<ul>';
    for (var i=0; i<data.length; i++) {
        tag += '<li>';
        tag += '<a href="javascript:showPayload([' + data[i].index.toString() + '])">' + data[i].type + '</a>';
        tag += ' (' + data[i].size + ')</li>';
        if (data[i].children.length !== 0) {
            tag += outputChild(data[i].children);
        }
    }
    tag += '</ul>';

    return tag;
}

function output(atoms) {
    mp4data = atoms;

    var str = '<div class="content">' + outputChild(atoms) + '</div>';

//    var str = "Atom size: " + data.atom_size + '<br>\n'
//            + "Type: " + data.type + '<br>\n'
//            + "Version: " + data.version + '<br>\n'

//    viewStatus.setStatus(data.status);
//    viewStatus.setSize(data.size);
    viewStatus.setStructure(str);
}

function showPayload(index) {
    var i = 0;
    var get_atom = mp4data[index[0]];
    for (var i=1; i<index.length; i++) {
        get_atom = get_atom.children[index[i]];
    }

    const type = get_atom.type;
    const payload = get_atom.payload;

    if (mp4Atom.atom[type]) {
        viewStatus.setPayload(mp4Atom.atom[type].description + '<br>' + mp4Atom.atom[type].display(payload));
    } else {
        viewStatus.setPayload('unknown');
    }
}
