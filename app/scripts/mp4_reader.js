const readfile = require('./scripts/read_file');
const viewStatus = require('./scripts/view_status');

function openFileDialog() {
    const dialog = require('electron').remote.dialog;

    const filenames = dialog.showOpenDialog(null, {
        properties: ['openFile'],
        title: 'select a data file',
        defaultPath: '.',
        filters: [
            {name : 'MPEG4 media', extensions: ['mp4', 'm4a', 'm4v', 'mov']}
        ]});

    if (filenames && filenames.length > 0) {
        document.f1.data_path.value = filenames[0];
        readfile.load(filenames[0], output);
    }
}

function output(data) {
    console.log(data);

    var str;
    str += '<ul>';
    for (var i=0; i<data.length; i++) {
        str += '<li>' + data[i].type + ' (' + data[i].size + ')</li>';
    }
    str += '</ul>';

//    var str = "Atom size: " + data.atom_size + '<br>\n'
//            + "Type: " + data.type + '<br>\n'
//            + "Version: " + data.version + '<br>\n'

//    viewStatus.setStatus(data.status);
//    viewStatus.setSize(data.size);
    viewStatus.setData(str);
}
