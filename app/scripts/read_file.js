const fs = require('fs');
const aviLoader = require('./avi/file_loader');
const mp4Loader = require('./mp4/file_loader');
const decode = require('./decode');

var load_name = '';

function appropriateLoader(filename) {
    // TODO: check avi/mp4
    return mp4Loader;
}

module.exports.load = function(filename, callback) {
    var afterReadWork = function(err, content) {
        if (err) {
            throw new Error(err);
        }

        const movie_data = Buffer.from(content, 'binary');
        const loader = appropriateLoader(filename);

        var atoms = new Array();
        var offset = 0;
        while (offset < movie_data.length) {
            const atom = loader.get(movie_data, offset, [atoms.length]);
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
