const fs = require('fs');
const loaders = [
    require('./avi/loader'),
    require('./mp4/loader')
];
const decode = require('./decode');

var load_name = '';

function appropriateLoader(filename) {
    for (var i=0; i<loaders.length; i++) {
        if (loaders[i].extension_patterns.test(filename.toLowerCase())) {
            return loaders[i];
        }
    }

    return null;
}

function getAtoms(loader, movie_data) {
    var atoms = new Array();

    var offset = 0;
    while (offset < movie_data.length) {
        const atom = loader.get(movie_data, offset, [atoms.length]);
        atoms.push(atom);
        offset += atom.size;
    }

    return atoms;
}

module.exports.load = function(filename, callback) {
    var afterReadWork = function(err, content) {
        if (err) {
            throw new Error(err);
        }

        const movie_data = Buffer.from(content, 'binary');
        const loader = appropriateLoader(filename);
        if (loader === null) {
            throw new Error('non compliant media file')
        }

        const atoms = getAtoms(loader, movie_data);
        callback(atoms, movie_data);
    };

    fs.readFile(filename, afterReadWork);
    load_name = filename;
};

module.exports.isSupportFile = function(filename) {
    return appropriateLoader(filename) !== null ? true : false;
};

module.exports.getFileName = function() {
    return load_name;
};
