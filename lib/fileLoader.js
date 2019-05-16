const fs = require('fs');
const aviLoader = require('./avi/loader');
const mp4Loader = require('./mp4/loader');
const decode = require('./decode');

var load_name = '';

const AVI_PATTERN = /\.(avi|wav)$/i;
const MP4_PATTERN = /\.(mov|mp4|m4v|m4a)$/i;

function appropriateLoader(filename) {
    if (AVI_PATTERN.test(filename.toLowerCase())) {
        return aviLoader;
    } else if (MP4_PATTERN.test(filename.toLowerCase())) {
        return mp4Loader;
    } else {
        throw new Error('non compliant media file')
    }
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
